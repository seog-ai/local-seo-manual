# Manual tooling

Three scripts. None of them runs during a deploy — this directory is a **separate dependency root** (`scripts/package.json`) precisely so the site's `npm ci --include=dev` never installs Playwright while building a docs image.

```bash
cd scripts && npm install     # once
npx playwright install chromium
```

Node resolves `playwright` from `scripts/node_modules` because ESM resolution walks up from the importing file, so the scripts run from the repo root:

```bash
node scripts/capture.mjs
node scripts/social-card.mjs
python3 scripts/illustrate.py
```

---

## `capture.mjs` — screenshots from a real app

Drives a **live local seog instance** and captures every screen the labs reference. The manual's screenshots are never mockups, and this is a script rather than a folder of hand-taken PNGs so they can be regenerated the moment the UI moves.

**Prerequisites:** `dev-postgres` + `dev-redis` up, backend on `:4001`, frontend on `:3005`, and an account that is onboarded, on a plan with no locked sections, and carrying enough credits for the paid captures.

```bash
# public-view set (a healthy profile)
MANUAL_BUSINESS_ID=<id> node scripts/capture.mjs

# owner-connected set (a profile with real, fixable problems)
MANUAL_PREFIX=owner- MANUAL_EMAIL=<owner> MANUAL_PASSWORD=<pw> \
  MANUAL_BUSINESS_ID=<id> node scripts/capture.mjs overview reviews posts profile website aivisibility

# only some steps
node scripts/capture.mjs overview keyword
```

| Variable | Meaning |
| --- | --- |
| `MANUAL_APP_URL` | default `http://localhost:3005` |
| `MANUAL_EMAIL` / `MANUAL_PASSWORD` | the account to drive |
| `MANUAL_BUSINESS_ID` | which business to capture |
| `MANUAL_PREFIX` | namespaces the output files, so two example businesses coexist |
| `MANUAL_QUERY` | search term for the add-business capture |
| `MANUAL_KEYWORD` | keyword to track in the rankings capture |
| `MANUAL_RECORD` | set to record video into `static/video/` |

### Two things this script exists to get right

**1. It never captures sample data as if it were measurement.** Two screens ship illustrative placeholders, labelled as such by the UI itself:

- The grid that renders on first view of a keyword is an *"Example scan"*. `GridHeatmap.tsx` is explicit — *"No auto-scan on mount: a scan is a paid, explicit action."* So the `keyword` step **presses Check now and waits for the nine live searches** before shooting.
- The search-volume box carries a **"Test data"** badge when no volume provider is configured. That number must never be captioned as real.

Both were captured and nearly published as real before anyone noticed. See `static/img/screens/README.md`.

**2. Selectors are scoped to `<main>`.** The app shell contains a `Search… ⌘K` button and a command-palette input that come **first** in the DOM and match every obvious selector — `getByRole('textbox')`, `getByRole('button', {name: /^Search/})`. Unscoped selectors open a modal over the page instead of doing the thing, and the screenshots come out with a palette floating over them.

---

## `illustrate.py` — generated art

Nano Banana 2 (`gemini-3-pro-image`) via Vertex AI, for the hero, the OG background and one opener per part.

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/vertex-sa.json
python3 scripts/illustrate.py            # all
python3 scripts/illustrate.py hero       # one
```

**The model is served from the `global` Vertex location only.** Regional endpoints (`us-central1`) return `404 NOT_FOUND` for it.

Deliberately narrow in scope. Everything explanatory is a screenshot or a Mermaid diagram; generated art is used only where a real capture is impossible. For a technical audience, decorative AI illustration is the fastest way to look low-effort, and it would undercut exactly the credibility the probe-verified reference is buying.

Every prompt forbids text. Models render lettering unreliably, and a cover with a misspelt word costs more trust than a good picture earns.

Rate limits are real — a full run may 429 partway. Re-running a single name is cheap.

---

## `social-card.mjs` — the Open Graph card

Renders `static/img/social-card.png` (1200×630) by screenshotting an HTML template over the generated background.

The typography is composited **here, in HTML**, not asked of the image model — for the same reason the prompts forbid text. This is the asset that travels when someone shares a chapter, so it must be pixel-crisp and correctly spelled.

Run it after `illustrate.py`; it embeds the background as a data URI, so there is no network dependency at render time.
