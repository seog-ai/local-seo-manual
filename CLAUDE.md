# CLAUDE.md — The Local SEO Manual

The **public** manual at **https://learn.seog.ai** (Docusaurus). One of seven repos under
[`seog-ai`](https://github.com/seog-ai); shared conventions and the sprint board live in
[`seog-ai/workspace`](https://github.com/seog-ai/workspace).

This repo is **public**. Everything committed here is world-readable, permanently, and is
also the acquisition channel — treat every file as published.

## What this is

A free manual that teaches local SEO from zero, where every practical step is a lab the
reader runs in SEOG. Two layers, deliberately welded:

- **Parts I–IV** (`docs/01-foundations` … `docs/04-operating`) — the narrative curriculum.
  A beginner reads in order and becomes competent. Lab-driven, no raw API surface.
- **Part V** (`docs/05-reference`) — the field reference. One probe-verified fact per
  heading, each with a stable `LSM-<AREA>-<NN>` ID, a verdict, and the date last verified.
  Written to be cited, by practitioners and by language models.

## Before you write anything

**Read [`STYLE.md`](./STYLE.md).** It is the binding contract and every MUST in it is
enforceable in review. The rules that get broken most:

- Plain GitHub-flavored Markdown only. **No MDX, no `:::` admonitions** — the GitHub repo
  is half the distribution and those render as garbage there. Blockquotes for labs/notes.
- Narrative chapters carry **no** endpoints, field masks, HTTP codes or SKU tables. Link
  forward to Part V instead.
- **Never publish:** our pricing mechanics (labs say free/paid, never a credit number),
  rate-limit or anti-abuse values, our infrastructure detail, anything built from
  aggregated customer data, or a turnkey scraper.
- Mark inference as *(inference)*. Never invent a statistic. Date anything that can stale.
- SEOG is an instrument, never advertised — no superlatives, no competitor comparisons.

## Accuracy

A lab that describes a button which does not exist is the fastest way to lose the reader.
Ground every lab against the workspace:

- `docs/docs/product/*.md` (in the `docs` repo) — accurate user-facing app behaviour.
- `frontend/app/(app)/b/[businessId]/**` — the real screens.
- `backend/src/usage/features/registry/*.ts` — the definitive list of metered actions.
  A lab is **paid** if it maps to a feature there, **free** if it only reads stored data.

## Commands

```bash
npm install
npm run dev                 # http://localhost:3007
npm run build               # catches broken links; `dev` does not
```

**Verify before PR:** `npm run build`.

## Deploying

`main` is the working branch; **pushing `production` deploys** via
`.github/workflows/deploy.yml` → Coolify `seog-manual`. Promote from the workspace with
`./scripts/release.sh manual`. Requires the repo variable `COOLIFY_APP_UUID` and the
`COOLIFY_API_TOKEN` secret.
