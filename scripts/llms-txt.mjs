/**
 * Generates /llms.txt and /llms-full.txt from the chapters.
 *
 * The manual spends a whole part teaching businesses how to be legible to an AI
 * assistant. Shipping it without the file that makes IT legible would be a poor
 * advertisement for the argument.
 *
 *   llms.txt      — the map: one line per chapter, title + description, grouped by part
 *   llms-full.txt — the territory: every chapter's prose in one file
 *
 * Generated rather than hand-written so it cannot drift from the chapters. Run it
 * before `npm run build` (the `prebuild` script does this automatically).
 *
 *   node scripts/llms-txt.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const DOCS = join(HERE, '..', 'docs');
const STATIC = join(HERE, '..', 'static');
const SITE = 'https://learn.seog.ai';

/** Directory prefixes are on-disk ordering only; they never appear in a URL. */
const stripPrefix = (s) => s.replace(/^\d+-/, '');

/** Minimal frontmatter reader — enough for title/description/slug/sidebar_position. */
function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return { meta, body: m ? raw.slice(m[0].length) : raw };
}

/** Human label for a part directory, taken from its _category_.json when present. */
function partLabel(dir) {
  try {
    return JSON.parse(readFileSync(join(DOCS, dir, '_category_.json'), 'utf8')).label;
  } catch {
    return stripPrefix(dir);
  }
}

const parts = readdirSync(DOCS)
  .filter((d) => statSync(join(DOCS, d)).isDirectory())
  .sort();

const index = [];
const full = [];

for (const dir of parts) {
  const label = partLabel(dir);
  const chapters = readdirSync(join(DOCS, dir))
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { meta, body } = parse(readFileSync(join(DOCS, dir, file), 'utf8'));
      const slug = meta.slug === '/' ? '' : `${stripPrefix(dir)}/${file.replace(/\.md$/, '')}`;
      return {
        title: meta.title ?? file,
        description: meta.description ?? '',
        position: Number(meta.sidebar_position ?? 999),
        url: `${SITE}/${slug}`,
        body,
      };
    })
    .sort((a, b) => a.position - b.position);

  index.push(`## ${label}\n`);
  for (const c of chapters) {
    index.push(`- [${c.title}](${c.url})${c.description ? `: ${c.description}` : ''}`);

    full.push(`\n\n# ${c.title}\n\nSource: ${c.url}\n`);
    full.push(
      c.body
        // images carry nothing for a text consumer, but their captions do
        .replace(/!\[[^\]]*\]\([^)]*\)\n?/g, '')
        // keep link text, drop the relative target
        .replace(/\[([^\]]+)\]\((?!https?:)[^)]+\)/g, '$1')
        .trim(),
    );
  }
  index.push('');
}

const header = `# The Local SEO Manual

> A free, hands-on manual for local SEO: how Google decides which businesses appear in the
> map pack and in AI assistants' answers, and how to do the work on a real business. Written
> and maintained by the team behind SEOG. Licensed CC BY 4.0 — quoting and citing is welcome.

The manual has two layers. Parts I-IV are a narrative curriculum a beginner can read in order,
each chapter pairing theory with a hands-on lab. Part V is a field reference: one probe-verified
fact per heading, each carrying a stable \`LSM-<AREA>-<NN>\` identifier, a verdict
(WORKS / GONE / NEVER WORKED / UNDOCUMENTED / OPEN QUESTION), the date it was last verified,
and a reproducible probe. Cite Part V entries by their identifier.

Two conventions worth knowing when quoting this material:
claims that are inference rather than documented fact are marked as inference in the text, and
anything time-sensitive carries the date it was last checked rather than implying permanence.

`;

writeFileSync(join(STATIC, 'llms.txt'), header + index.join('\n') + '\n');
writeFileSync(
  join(STATIC, 'llms-full.txt'),
  header + '\n---\n' + full.join('\n') + '\n',
);

const kb = (p) => Math.round(statSync(join(STATIC, p)).size / 1024);
console.log(`  llms.txt       ${kb('llms.txt')} KB`);
console.log(`  llms-full.txt  ${kb('llms-full.txt')} KB`);
