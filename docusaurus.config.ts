import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// The Local SEO Manual — https://learn.seog.ai
//
// A PUBLIC site (unlike docs.seog.ai, there is no password gate). Two rules
// shape this config:
//
//   1. Docs are served at the ROOT (`routeBasePath: '/'`). The manual IS the
//      site, so every chapter is `learn.seog.ai/<part>/<chapter>` with no
//      `/docs/` segment eating relevance. `docs/00-start-here/about.md` is the
//      homepage via `slug: /` frontmatter.
//   2. Every page must also read well as raw Markdown on GitHub — the repo is
//      half the distribution. That is why there are no custom MDX components in
//      the content and admonitions are used sparingly.
const config: Config = {
  title: 'The Local SEO Manual',
  tagline: 'Learn local SEO by ranking a real business',
  favicon: 'img/favicon.png',

  url: 'https://learn.seog.ai',
  baseUrl: '/',

  organizationName: 'seog-ai',
  projectName: 'local-seo-manual',

  // Chapters cross-link heavily by hand. Warn instead of failing so one stale
  // relative link never blocks a deploy of 30+ pages.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    mermaid: true,
    // v4 moves the broken-markdown-link handler under markdown.hooks; setting it
    // at the top level still works but logs a deprecation on every build.
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          editUrl: 'https://github.com/seog-ai/local-seo-manual/tree/main/',
          // Chapters are numbered on disk (00-, 01-…) for GitHub browsing, but
          // the numbers must not leak into the public URLs.
          numberPrefixParser: true,
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
          // Real per-page dates from git (the docs plugin already tracks them for
          // "Last updated"). Without this every URL looks equally stale and a
          // re-crawl after an edit is left to chance.
          lastmod: 'date',
          // /search is a client-side UI with no content of its own; it is also
          // Disallowed in robots.txt. Listing it would be asking for a crawl of a
          // page we then refuse.
          ignorePatterns: ['/search'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // og:type + TechArticle/Organization/WebSite JSON-LD, injected into the
    // built HTML. See plugins/structured-data/index.js for why it is a
    // postBuild pass and not a swizzled theme component.
    './plugins/structured-data',
    // Offline/local search — a manual without search is a PDF. No Algolia
    // dependency, index is built at build time.
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'A free, hands-on manual for local SEO: how Google ranks businesses in the map pack, and how to do the work on a real business — with practical labs you run in SEOG.',
      },
      {
        name: 'keywords',
        content:
          'local SEO, map pack, Google Business Profile, local search, GBP optimization, local rank tracking, geo grid, local SEO course, local SEO guide',
      },
      // Docusaurus emits og:title/description/image/url but no og:site_name and
      // no og:type. og:type is per-page (article vs website) and is injected by
      // the structured-data plugin at build time.
      { property: 'og:site_name', content: 'The Local SEO Manual' },
      { name: 'twitter:site', content: '@seog_ai' },
    ],
    mermaid: { theme: { light: 'neutral', dark: 'dark' } },
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: false },
    },
    navbar: {
      title: 'The Local SEO Manual',
      logo: { alt: 'SEOG', src: 'img/logo.png', srcDark: 'img/logo-dark.png' },
      items: [
        { type: 'docSidebar', sidebarId: 'manual', position: 'left', label: 'Manual' },
        { to: '/essentials', position: 'left', label: 'Essentials' },
        { to: "/reference/gbp-capability-matrix", position: "left", label: "Field reference" },
        {
          href: 'https://github.com/seog-ai/local-seo-manual',
          position: 'right',
          className: 'navbar-github',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
        },
        {
          href: 'https://app.seog.ai/sign-up',
          label: 'Start the labs — free',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'The manual',
          items: [
            { label: 'Start here', to: '/' },
            { label: 'Local SEO Essentials', to: '/essentials' },
            { label: 'Foundations', to: '/foundations/what-is-local-seo' },
            { label: 'Core practice', to: '/core-practice/analyzing-business-visibility' },
            { label: 'What labs cost', to: '/appendix/what-things-cost' },
          ],
        },
        {
          title: 'Do the work',
          items: [
            { label: 'Create a free account', href: 'https://app.seog.ai/sign-up' },
            { label: 'SEOG', href: 'https://seog.ai' },
            { label: 'Product guide', href: 'https://docs.seog.ai/product/intro' },
          ],
        },
        {
          title: 'Contribute',
          items: [
            { label: 'GitHub', href: 'https://github.com/seog-ai/local-seo-manual' },
            { label: 'Report an error', href: 'https://github.com/seog-ai/local-seo-manual/issues' },
            { label: 'Contributing guide', to: '/appendix/contributing' },
          ],
        },
      ],
      copyright: `The Local SEO Manual — free to read, free to share (CC BY 4.0). Built by the team behind <a href="https://seog.ai">SEOG</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
