/**
 * Build-time SEO head injection for the manual.
 *
 * Docusaurus emits a BreadcrumbList per page and nothing else, and it emits no
 * `og:type`. That leaves the two things a search or answer engine most wants
 * missing: what the page IS (an article, with a licence) and who publishes it
 * (an entity it can resolve and re-use across seog.ai).
 *
 * This runs in `postBuild` over the generated HTML rather than as a swizzled
 * theme component on purpose: `useDoc()` is not reliably available during this
 * site's SSG pass (it throws `ReactContextError` for every doc route), and the
 * built HTML already carries everything needed — canonical URL, title and
 * description are in the head, put there by the theme.
 */

const fs = require('fs/promises');
const path = require('path');

const SITE_URL = 'https://learn.seog.ai';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LICENSE = 'https://creativecommons.org/licenses/by/4.0/';
const SOCIAL_CARD = `${SITE_URL}/img/social-card.png`;

/**
 * Pages that must never be indexed and get no article markup: the client-side
 * search UI (also Disallowed in robots.txt and absent from the sitemap) and the
 * 404 page, which Netlify-style hosts serve at arbitrary URLs.
 */
const NOINDEX_ROUTES = new Set(['/search/', '/search', '/404.html']);

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'SEOG',
  url: 'https://seog.ai',
  logo: `${SITE_URL}/img/logo.png`,
  sameAs: ['https://x.com/seog_ai', 'https://github.com/seog-ai'],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: 'The Local SEO Manual',
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
  license: LICENSE,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * TechArticle rather than Article: every chapter is instructional, and Part V is
 * written to be cited fact by fact. No `datePublished`/`dateModified` — the
 * production image builds from a shallow clone with no usable git history, and a
 * guessed date on a manual that dates its own facts would be worse than none.
 */
const techArticle = ({ url, title, description }) => ({
  '@type': 'TechArticle',
  '@id': `${url}#article`,
  headline: title,
  ...(description ? { description } : {}),
  url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  inLanguage: 'en',
  isPartOf: { '@id': SITE_ID },
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  license: LICENSE,
  image: SOCIAL_CARD,
});

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const match = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : undefined;
};

/** Everything the head already knows about this page. */
function readHead(html, siteTitle) {
  const rawTitle = match(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  return {
    canonical: match(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/),
    // "Chapter | The Local SEO Manual" → "Chapter". The homepage title is the
    // site title alone and stays as-is.
    title: rawTitle?.endsWith(` | ${siteTitle}`)
      ? rawTitle.slice(0, -` | ${siteTitle}`.length)
      : rawTitle,
    description: match(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/),
  };
}

function headTagsFor({ canonical, title, description }) {
  // Use the canonical verbatim: Docusaurus emits a trailing slash only for
  // index routes, and a JSON-LD `url` that disagrees with the canonical is a
  // second URL for the same page.
  const url = canonical;
  const isHome = url.slice(SITE_URL.length).replace(/\/$/, '') === '';
  const graph = isHome
    ? [organization, website, techArticle({ url, title, description })]
    : [techArticle({ url, title, description })];

  // `<` is escaped so a title or description can never close the script tag.
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c');

  return [
    `<meta property="og:type" content="${isHome ? 'website' : 'article'}">`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('');
}

/**
 * Google renders roughly 60 characters of title. " | The Local SEO Manual" is
 * 23 of them, which pushed 47 of 117 pages into truncation while only 6 chapter
 * titles are too long on their own.
 *
 * So the suffix is kept when it fits and dropped when it would cost words the
 * reader needs — the brand still travels in og:site_name and in the domain. The
 * rule is applied to the raw HTML rather than to `titleDelimiter` because
 * Docusaurus has no per-page switch for it.
 */
const TITLE_BUDGET = 60;

function trimTitleSuffix(html, siteTitle) {
  const suffix = ` | ${siteTitle}`;
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (!titleTag) return html;

  const full = titleTag[1];
  if (!full.endsWith(suffix)) return html; // homepage: site title alone
  // Entities cost one character in a SERP, not six.
  if (decode(full).length <= TITLE_BUDGET) return html;

  const bare = full.slice(0, -suffix.length);
  return html
    .replace(titleTag[0], titleTag[0].replace(full, bare))
    .replace(
      new RegExp(`(<meta[^>]*property="og:title"[^>]*content=")${escapeRe(full)}(")`),
      `$1${bare}$2`,
    );
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function* htmlFiles(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

module.exports = function structuredDataPlugin(context) {
  const siteTitle = context.siteConfig.title;

  return {
    name: 'seog-structured-data',

    async postBuild({ outDir }) {
      let articles = 0;
      let noindexed = 0;
      let trimmed = 0;

      for await (const file of htmlFiles(outDir)) {
        const html = await fs.readFile(file, 'utf8');
        const head = readHead(html, siteTitle);
        const route = head.canonical?.slice(SITE_URL.length);

        // /search and the 404 page: keep them out of the index, and give them no
        // article markup — neither is a document.
        if (!head.canonical || !head.title || NOINDEX_ROUTES.has(route)) {
          if (!html.includes('name="robots"')) {
            await fs.writeFile(
              file,
              html.replace(
                '</head>',
                '<meta name="robots" content="noindex,follow"></head>',
              ),
            );
            noindexed += 1;
          }
          continue;
        }

        const withTags = html.replace('</head>', `${headTagsFor(head)}</head>`);
        const final = trimTitleSuffix(withTags, siteTitle);
        if (final !== withTags) trimmed += 1;
        await fs.writeFile(file, final);
        articles += 1;
      }

      console.log(
        `[seog-structured-data] og:type + JSON-LD on ${articles} pages, ` +
          `title suffix dropped on ${trimmed}, noindex on ${noindexed}`,
      );
    },
  };
};
