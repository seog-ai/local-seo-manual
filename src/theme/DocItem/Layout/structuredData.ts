// Structured data for the manual.
//
// Docusaurus emits a BreadcrumbList per page and nothing else. That leaves the
// two things a search or answer engine actually wants missing: what the page IS
// (an article, with a date and a licence) and who publishes it (an entity it can
// resolve). Both are built here from the doc's own metadata so nothing has to be
// maintained per chapter.

const SITE_URL = 'https://learn.seog.ai';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export type DocSeoInput = {
  title: string;
  description: string;
  permalink: string;
  /** Unix seconds, from the docs plugin's `showLastUpdateTime`. */
  lastUpdatedAt?: number;
};

const absolute = (permalink: string) =>
  `${SITE_URL}${permalink.startsWith('/') ? permalink : `/${permalink}`}`;

/** The publisher. Referenced by @id from every article, declared once. */
export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'SEOG',
  url: 'https://seog.ai',
  logo: `${SITE_URL}/img/logo.png`,
  sameAs: ['https://x.com/seog_ai', 'https://github.com/seog-ai'],
};

/** The site itself, plus the on-site search endpoint. Homepage only. */
export const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: 'The Local SEO Manual',
  description:
    'A free, hands-on manual for local SEO: how Google ranks businesses in the map pack, and how to do the work on a real business.',
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
  license: 'https://creativecommons.org/licenses/by/4.0/',
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
 * TechArticle rather than Article: every chapter is instructional and dated, and
 * Part V is written to be cited fact-by-fact. `dateModified` comes from git via
 * the docs plugin, so it stays honest without a frontmatter field to forget.
 */
export function techArticle(doc: DocSeoInput) {
  const url = absolute(doc.permalink);
  return {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline: doc.title,
    description: doc.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    image: `${SITE_URL}/img/social-card.png`,
    ...(doc.lastUpdatedAt
      ? { dateModified: new Date(doc.lastUpdatedAt * 1000).toISOString() }
      : {}),
  };
}

/** One @graph per page: the article, plus the site/publisher nodes on `/`. */
export function docGraph(doc: DocSeoInput) {
  const isHome = doc.permalink === '/';
  return {
    '@context': 'https://schema.org',
    '@graph': isHome
      ? [organization, website, techArticle(doc)]
      : [techArticle(doc)],
  };
}
