/**
 * Builds the Open Graph / social card at static/img/social-card.png.
 *
 * The typography is composited here, in HTML, rather than asked of the image
 * model: generated lettering is unreliable, and a shared card with a misspelt
 * title destroys more credibility than a nice picture buys. The model only
 * supplies the background texture (scripts/illustrate.py -> og-background.png).
 *
 *   node scripts/social-card.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const IMG = join(HERE, '..', 'static', 'img');
// hero.png, not og-background.png: the generated "sparse" background puts its
// density on the left, which is exactly where the headline sits, so the veil
// hid all of it and the right half came out empty. The hero art is anchored
// right instead, where there is nothing competing with it.
const BG = join(IMG, 'art', 'hero.png');

const bgData = existsSync(BG)
  ? `data:image/png;base64,${readFileSync(BG).toString('base64')}`
  : null;

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #ffffff; position: relative;
  }
  .bg {
    position: absolute; inset: 0;
    background-image: ${bgData ? `url('${bgData}')` : 'none'};
    background-size: contain; background-repeat: no-repeat;
    background-position: right center;
    opacity: 0.9;
  }
  /* Wipe the art out entirely under the text, then let it come through on the
     right. The headline must never sit on top of texture. */
  .veil {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, #fff 0%, #fff 47%, rgba(255,255,255,0.88) 56%, rgba(255,255,255,0.0) 78%);
  }
  .wrap { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 76px; }
  .eyebrow {
    font-size: 21px; font-weight: 650; letter-spacing: 0.14em; text-transform: uppercase;
    color: #004ac6; margin-bottom: 26px;
  }
  h1 {
    font-size: 76px; line-height: 1.04; font-weight: 750; letter-spacing: -0.025em;
    color: #0d1117; max-width: 15ch;
  }
  p {
    margin-top: 26px; font-size: 29px; line-height: 1.42; color: #3d4450; max-width: 24ch; font-weight: 400;
  }
  .rule { margin-top: 34px; width: 92px; height: 5px; background: #004ac6; border-radius: 3px; }
  .foot {
    position: absolute; left: 76px; bottom: 46px; display: flex; align-items: baseline; gap: 16px;
    font-size: 23px; color: #5b6472;
  }
  .foot strong { color: #0d1117; font-weight: 650; }
  .dot { width: 5px; height: 5px; border-radius: 50%; background: #b6bcc6; align-self: center; }
</style>
<div class="bg"></div>
<div class="veil"></div>
<div class="wrap">
  <div class="eyebrow">Free &middot; Open source</div>
  <h1>The Local SEO Manual</h1>
  <p>Learn local SEO by ranking a real business.</p>
  <div class="rule"></div>
</div>
<div class="foot">
  <strong>learn.seog.ai</strong>
  <span class="dot"></span>
  <span>39 chapters &middot; hands-on labs &middot; a probe-verified field reference</span>
</div>`;

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const out = join(IMG, 'social-card.png');
  await page.screenshot({ path: out });
  await browser.close();
  console.log(`  wrote ${out}${bgData ? '' : ' (no background art — run scripts/illustrate.py og-background)'}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
