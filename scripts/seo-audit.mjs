#!/usr/bin/env node
/**
 * Post-build SEO audit.
 *
 * Runs over `build/` after every `npm run build` (including the production image
 * build), so a chapter cannot ship without the head tags that make it findable.
 *
 * ERRORS fail the build — they are things that break indexing or produce a
 * duplicate URL. WARNINGS only print: SERP truncation is cosmetic and no
 * chapter should be blocked from deploying over a long title.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD = path.resolve(import.meta.dirname, '..', 'build');
const SITE_URL = 'https://learn.seog.ai';
const SITE_TITLE = 'The Local SEO Manual';

// Google renders roughly 580px of title and ~155-160 chars of description.
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

const errors = [];
const warnings = [];

// Lengths are measured on the decoded text: an apostrophe is one character in a
// SERP but six (&#x27;) in the built HTML.
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const attr = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : undefined;
};

async function* htmlFiles(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

const canonicals = new Map();

for await (const file of htmlFiles(BUILD)) {
  const rel = path.relative(BUILD, file);
  const html = await fs.readFile(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  const description = attr(
    html,
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/,
  );
  const canonical = attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  const ogType = attr(html, /<meta[^>]*property="og:type"[^>]*content="([^"]+)"/);
  const hasArticleLd = html.includes('"@type":"TechArticle"');

  // Every JSON-LD block must parse. An unescaped quote in a title would
  // otherwise ship markup that every consumer silently drops.
  for (const [, block] of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(block);
    } catch (err) {
      errors.push(`${rel}: invalid JSON-LD (${err.message})`);
    }
  }

  if (noindex) continue; // /search and 404: deliberately not documents

  if (!title) errors.push(`${rel}: no <title>`);
  if (!description) errors.push(`${rel}: no meta description`);
  if (!canonical) errors.push(`${rel}: no canonical`);
  if (!ogType) errors.push(`${rel}: no og:type`);
  if (!hasArticleLd) errors.push(`${rel}: no TechArticle JSON-LD`);

  if (canonical) {
    if (!canonical.startsWith(SITE_URL)) {
      errors.push(`${rel}: canonical is off-site (${canonical})`);
    }
    const seen = canonicals.get(canonical);
    if (seen) errors.push(`${rel}: canonical collides with ${seen}`);
    else canonicals.set(canonical, rel);
  }

  const bare = title?.endsWith(` | ${SITE_TITLE}`)
    ? title.slice(0, -` | ${SITE_TITLE}`.length)
    : title;
  if (bare && !bare.trim()) errors.push(`${rel}: empty title`);
  if (title && title.length > TITLE_MAX) {
    warnings.push(`${rel}: title ${title.length} chars (>${TITLE_MAX})`);
  }
  if (description && (description.length < DESC_MIN || description.length > DESC_MAX)) {
    warnings.push(`${rel}: description ${description.length} chars`);
  }
}

// The sitemap must exist, must not advertise the search page, and must not be
// empty — a silent sitemap regression is invisible until traffic drops.
const sitemap = await fs.readFile(path.join(BUILD, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length === 0) errors.push('sitemap.xml: no URLs');
if (locs.some((l) => l === `${SITE_URL}/search`)) {
  errors.push('sitemap.xml: /search is listed');
}
if (!sitemap.includes('<lastmod>')) warnings.push('sitemap.xml: no lastmod dates');

const robots = await fs.readFile(path.join(BUILD, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  errors.push('robots.txt: sitemap not declared');
}

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);

console.log(
  `[seo-audit] ${canonicals.size} indexable pages, ${locs.length} sitemap URLs, ` +
    `${errors.length} errors, ${warnings.length} warnings`,
);

if (errors.length) process.exit(1);
