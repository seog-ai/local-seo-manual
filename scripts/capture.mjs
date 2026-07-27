/**
 * Screenshot + screen-recording capture for The Local SEO Manual.
 *
 * Drives a REAL local seog instance and captures every screen the labs refer to,
 * so the manual never shows a mockup. Re-run it when the UI changes — that is the
 * whole point of it being a script rather than a folder of hand-taken PNGs.
 *
 * Prerequisites (see manual/scripts/README.md):
 *   - dev-postgres + dev-redis up, backend on :4001, frontend on :3005
 *   - a demo account that is onboarded, on a plan with no locked sections, and
 *     carrying enough credits for the paid captures
 *
 * Usage:
 *   node scripts/capture.mjs                 # everything
 *   node scripts/capture.mjs overview grid   # only the named steps
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'static', 'img', 'screens');
const VID = join(HERE, '..', 'static', 'video');

const APP = process.env.MANUAL_APP_URL ?? 'http://localhost:3005';
const EMAIL = process.env.MANUAL_EMAIL ?? 'manual.demo@seog.ai';
const PASSWORD = process.env.MANUAL_PASSWORD ?? 'ManualDemo2026';

const only = process.argv.slice(2);
const want = (step) => only.length === 0 || only.includes(step);

for (const d of [OUT, VID]) if (!existsSync(d)) mkdirSync(d, { recursive: true });

/** Chrome/Next dev affordances that must never appear in a published screenshot. */
const HIDE_CSS = `
  [data-nextjs-dev-tools-button], nextjs-portal, #__next-dev-tools-indicator,
  [aria-label="Open Next.js Dev Tools"], [data-nextjs-toast] { display: none !important; }
  /* freeze spinners so screenshots are deterministic */
  *, *::before, *::after { animation-play-state: paused !important; }
`;

async function shot(page, name, { full = false } = {}) {
  await page.addStyleTag({ content: HIDE_CSS }).catch(() => {});
  await page.waitForTimeout(600);
  const path = join(OUT, `${name}.png`);
  await page.screenshot({ path, fullPage: full });
  console.log(`  ✓ ${name}.png${full ? ' (full page)' : ''}`);
  return path;
}

/** Wait for the app's own loading state to settle rather than a blind sleep. */
async function settle(page, ms = 1500) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function dismissCookies(page) {
  const accept = page.getByRole('button', { name: /^Accept$/ });
  if (await accept.isVisible().catch(() => false)) {
    await accept.click().catch(() => {});
    await page.waitForTimeout(300);
  }
}

async function login(page) {
  await page.goto(`${APP}/sign-in`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  if (page.url().includes('/sign-in')) {
    await page.locator('input[type="email"]').fill(EMAIL);
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL((u) => !u.pathname.includes('/sign-in'), { timeout: 20000 });
  }
  await dismissCookies(page);
  console.log(`  logged in → ${page.url()}`);
}

/** Walks the 3-step wizard, capturing each step, if the account is not onboarded. */
async function onboarding(page) {
  if (!page.url().includes('/onboarding')) {
    console.log('  (already onboarded — skipping wizard capture)');
    return;
  }
  await shot(page, 'onboarding-step1');
  await page.getByRole('button', { name: 'Business owner' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await settle(page, 800);

  await shot(page, 'onboarding-step2');
  for (const goal of ['Rankings', 'Reviews', 'Competitors']) {
    const b = page.getByRole('button', { name: new RegExp(goal, 'i') }).first();
    if (await b.isVisible().catch(() => false)) await b.click().catch(() => {});
  }
  await page.getByRole('button', { name: /Continue|Finish/ }).first().click();
  await settle(page, 800);

  await shot(page, 'onboarding-step3');
  const finish = page.getByRole('button', { name: /Finish|Skip/ }).first();
  if (await finish.isVisible().catch(() => false)) await finish.click();
  await page.waitForURL((u) => !u.pathname.includes('/onboarding'), { timeout: 20000 }).catch(() => {});
  await settle(page);
}

/** Adds the practice business by Places search, capturing the search + result. */
async function addBusiness(page, query) {
  if (!page.url().includes('/businesses/new')) {
    await page.goto(`${APP}/businesses/new`, { waitUntil: 'domcontentloaded' });
  }
  await settle(page, 800);
  await shot(page, 'add-business-empty');

  // Everything here must be scoped to <main>: the app shell also has a "Search… ⌘K"
  // button and a command-palette input, both of which match the obvious selectors
  // and come FIRST in the DOM. Clicking the header one opens a modal over the page.
  const main = page.locator('main');
  const box = main.getByPlaceholder(/Bella/i).first();
  await box.click();
  await box.fill(query);
  await page.waitForTimeout(500);
  await shot(page, 'add-business-typed');

  const searchBtn = main.getByRole('button', { name: /^Search/ }).first();
  if (await searchBtn.isEnabled().catch(() => false)) await searchBtn.click();
  else await box.press('Enter');

  await settle(page, 3500);
  await shot(page, 'add-business-results');

  // Import the first result and return the new business id from the URL.
  const result = page.locator('main button, main [role="button"]').filter({ hasText: /,/ }).first();
  if (await result.isVisible().catch(() => false)) {
    await result.click().catch(() => {});
    await page.waitForURL(/\/b\/[0-9a-f-]{36}\//, { timeout: 45000 }).catch(() => {});
    await settle(page, 2500);
  }
  const m = page.url().match(/\/b\/([0-9a-f-]{36})\//);
  if (m) console.log(`  imported business ${m[1]}`);
  return m?.[1] ?? null;
}

const steps = {
  async overview(page, id) {
    await page.goto(`${APP}/b/${id}/overview`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'overview');
    await shot(page, 'overview-full', { full: true });
  },
  async rankings(page, id) {
    await page.goto(`${APP}/b/${id}/rankings`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'rankings-empty');
    await shot(page, 'rankings-full', { full: true });
  },
  async reviews(page, id) {
    await page.goto(`${APP}/b/${id}/reviews`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'reviews');
    await shot(page, 'reviews-full', { full: true });
  },
  async competitors(page, id) {
    await page.goto(`${APP}/b/${id}/competitors`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'competitors');
  },
  async aivisibility(page, id) {
    await page.goto(`${APP}/b/${id}/ai-visibility`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'ai-visibility');
    await shot(page, 'ai-visibility-full', { full: true });
  },
  async website(page, id) {
    await page.goto(`${APP}/b/${id}/website`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'website');
  },
  async posts(page, id) {
    await page.goto(`${APP}/b/${id}/posts`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'posts');
  },
  async profile(page, id) {
    await page.goto(`${APP}/b/${id}/profile`, { waitUntil: 'domcontentloaded' });
    await settle(page, 2500);
    await shot(page, 'profile');
    await shot(page, 'profile-full', { full: true });
  },
  async businesses(page) {
    await page.goto(`${APP}/businesses`, { waitUntil: 'domcontentloaded' });
    await settle(page, 1500);
    await shot(page, 'businesses');
  },
  async billing(page) {
    await page.goto(`${APP}/billing`, { waitUntil: 'domcontentloaded' });
    await settle(page, 1500);
    await shot(page, 'billing');
  },
};

const main = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    recordVideo: process.env.MANUAL_RECORD ? { dir: VID, size: { width: 1440, height: 900 } } : undefined,
  });
  const page = await context.newPage();

  try {
    await login(page);
    if (want('onboarding')) await onboarding(page);

    // Resolve the business to capture: the first one on the account.
    const businesses = await page.evaluate(async (app) => {
      const r = await fetch(`${app}/api/businesses`, { credentials: 'include' }).catch(() => null);
      if (!r || !r.ok) return null;
      return r.json().catch(() => null);
    }, APP);
    console.log('  businesses payload:', JSON.stringify(businesses)?.slice(0, 300));

    let id = process.env.MANUAL_BUSINESS_ID ?? null;
    if (!id && Array.isArray(businesses?.items)) id = businesses.items[0]?.id;
    if (!id && Array.isArray(businesses)) id = businesses[0]?.id;

    if (!id) {
      console.log('  no business on the account — running add-business capture');
      id = await addBusiness(page, process.env.MANUAL_QUERY ?? 'coffee helsinki');
    }

    if (!id) {
      console.log('  → import did not complete; re-run with MANUAL_BUSINESS_ID=<id>');
    } else {
      console.log(`  business: ${id}`);
      for (const [name, fn] of Object.entries(steps)) {
        if (!want(name)) continue;
        try {
          await fn(page, id);
        } catch (e) {
          console.log(`  ✗ ${name}: ${e.message.split('\n')[0]}`);
        }
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
