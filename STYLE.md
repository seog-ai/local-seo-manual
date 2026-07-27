# Style and standards

This manual has two layers, and they are written differently. Read the section for the layer you are editing.

Everything here is enforceable in review. A pull request that breaks a **MUST** does not merge.

---

## 1. Rules for both layers

### The dual-surface rule

Every page is read in two places: rendered at learn.seog.ai, and as raw Markdown on GitHub. The repo is half the distribution.

- **MUST** be plain GitHub-flavored Markdown. No MDX components, no JSX, no imports.
- **MUST NOT** use Docusaurus `:::note` / `:::tip` admonitions. They render as literal `:::note` garbage on GitHub. Use a blockquote instead.
- Tables, fenced code, blockquotes, headings and links are the entire toolkit. This is a feature.
- Mermaid diagrams are allowed (GitHub renders them natively) but use them only when a diagram genuinely beats a sentence.

### Voice

Write like an experienced practitioner explaining something to a competent colleague who happens not to know this particular thing.

- Second person. "You add a keyword", not "the user adds a keyword".
- Short sentences. Concrete nouns. If a sentence has three clauses, it is probably two sentences.
- **MUST NOT** use marketing register. Banned outright: "in today's digital landscape", "unlock", "supercharge", "game-changer", "leverage" as a verb, "it's important to note that", "dive in", "elevate", "seamless", "robust".
- No hedging padding. "This can sometimes potentially help in certain cases" means you do not know. Say what you know and mark what you do not.
- Humour is allowed if it is dry and load-bearing. Enthusiasm is not.

### Honesty

Google documents almost nothing about local ranking, and the industry fills the gap with confident folklore. The manual's entire value is being the thing that does not do that.

- **MUST** mark inference as inference. If it is observed behaviour rather than documented fact, write *(inference)* and say what the observation was.
- **MUST NOT** invent numbers. No made-up percentages, no "studies show" without a link, no illustrative statistics presented as real ones. If you need an example number, label it as an example.
- **MUST** date anything that can go stale. "Verified 2026-07-13" beats an implication of permanent truth.
- When something is genuinely unknown, "nobody outside Google knows this, and anyone who tells you otherwise is guessing" is a legitimate and valuable sentence.

### How to mention SEOG

The labs run in SEOG. That is the deal, it is disclosed on the homepage, and it is fine. What kills a manual like this is reading as an advertisement.

- **MUST** treat SEOG as an instrument, the way a chemistry manual treats a specific microscope. "Open Rankings and add the keyword" — not "SEOG's powerful rankings engine lets you...".
- **MUST NOT** use comparative or superlative claims about SEOG. Never "the best tool for", never a competitor comparison. Ever.
- **MUST** state, in any chapter where it applies, how to do the same thing without SEOG. The appendix chapter *Doing all of this without SEOG* is the long form; chapters reference it rather than repeating it.
- Teach the concept first, always. A reader must finish the chapter understanding the *idea*, such that they could execute it by hand. The lab is where they execute it quickly.
- If a chapter's honest conclusion is that a SEOG feature is the wrong tool for something, say so. That sentence buys more credibility than ten pages of praise.

### Never publish

These are hard prohibitions, for legal, competitive and safety reasons.

- **Our pricing mechanics.** No credit-to-dollar conversion, no markup multiples, no per-feature margins, no cost-vs-charged data. Labs say **free** or **paid**, never a number.

- **Third-party API rates, and any recipe for minimising them.** No SKU tables, no per-request or per-1,000 figures, no worked "this costs $X" derivations, and above all no field-mask-to-free-tier technique. Google publishes its own current prices; link to them and let the reader do their own arithmetic against their own volumes.

  This rule was reversed on 2026-07-27, and the reversal is deliberate. An earlier draft treated publishing Google's cost structure as the manual's unfair advantage. It is also a build guide: the manual's stated audience is technical people who ship things, and handing that audience a costed recipe for running rank tracking at the floor is handing them the one genuinely non-obvious part of building a competing platform. The distribution goal and the content do not get to conflict.

  What *is* publishable is the **shape**: that requests are priced by what they ask for, that owner-side data behaves differently from place search, and that cadence dominates efficiency. Those help a buyer evaluate a vendor. None of them is a build recipe.
- **Anti-abuse thresholds.** No rate-limit values, daily ceilings or alert thresholds. Publish the design principle ("breadth of distinct places, not call volume, is the signature of dataset-building"), never the numbers.
- **Deployment detail of our own infrastructure.** Publish patterns and principles; never our endpoint configuration, session-key layout, token schemes or middleware config.
- **Anything built from aggregated customer data.** Original studies run only on businesses we own or that gave written consent, with the method published so others can reproduce it on their own data.
- **Turnkey scrapers or dataset builders.** Google's terms name copying business names, addresses and reviews as prohibited scraping. Publish the compliant architecture; never a harness that produces a redistributable dataset.
- **Automated review replies or AI-generated profile imagery as recommended practice.** Both are against Google policy. Document them as constraints, with the policy text. Never recommend them.

### Legal register

The compliance material is our reading of published terms, not legal advice.

- **MUST** carry that disclaimer in any section quoting terms of service.
- **MUST** quote the clause verbatim with its section number and document date, then interpret separately. Never paraphrase a clause and present the paraphrase as the rule.
- **MUST** present open questions as open. A verdict we cannot defend is worse than an honest "the terms do not address this".

---

## 2. Narrative chapters (Parts I–IV)

These teach. A beginner reads them in order and becomes competent.

### Required shape

```markdown
---
title: <sentence-case title>
sidebar_position: <n>
description: <one sentence, <=160 chars, written for a search result>
---

# <Title>

<Opening: 2-4 sentences that state the problem this chapter solves. No throat-clearing,
no "in this chapter we will". Start with the actual idea.>

## <Concept sections — as many as the idea needs>

<Theory. What the mechanism is, what Google measures, why it behaves this way.>

## Labs

### Lab N.M — <imperative title>

> **Lab** · Where: **<UI name>** (`/b/{businessId}/<path>`) · Cost: **free|paid** · Time: ~N min
>
> You need: <prerequisite, referencing an earlier lab by number>

1. <Numbered, unambiguous steps. Name what is on screen exactly.>

**What good looks like.** <How the reader knows they did it right.>

**If it went wrong.** <The two or three realistic failure modes.>

**What you just learned.** <The transferable idea — not a recap of the clicks.>

## Common mistakes

<2-5 real ones, each with why it is tempting and what it costs.>

## Check yourself

<3-5 questions with answers the reader can verify against their own business.
Not trivia — diagnostic questions that require the chapter's model.>

---

**Next:** [<next chapter title> →](<relative link>)
```

### Rules

- **MUST NOT** contain raw API surface — no endpoint names, field masks, HTTP status codes, or SKU tables. That material belongs in Part V. Link to it: `See [LSM-GBP-014](../05-reference/write-limits-and-failure-modes.md) for the mechanism.`
- Every lab **MUST** map to a feature that actually exists. The real screens are `/b/{businessId}/` + `overview`, `rankings`, `reviews`, `competitors`, `ai-visibility`, `website`, `posts`, `profile`; plus `/businesses`, `/businesses/new`, `/billing`, `/settings/agents`.
- Lab cost is **free** if it reads stored data, **paid** if it fetches from Google or calls a model. Check the feature registry rather than guessing.
- **MUST NOT** describe UI that does not exist. If unsure whether a button is there, read `frontend/app/(app)/b/[businessId]/**` in the seog workspace or the product guide at `docs/docs/product/*.md`.
- Chapters are 1,200–3,000 words. Under 1,200 usually means the concept was not developed. Over 3,000 usually means it is two chapters.

---

## 3. Reference chapters (Part V)

These do not teach. They settle questions, and they are written to be cited — by practitioners in client deliverables, and by language models answering questions.

### Required shape

One fact per heading. Every fact carries a stable ID and a verification stamp.

```markdown
### LSM-GBP-014 · Local Posts reject video with HTTP 500

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-22
**Probe:** `POST accounts/{a}/locations/{l}/localPosts` with `mediaFormat: VIDEO` and a public mp4 `sourceUrl`

Google's Business Profile UI accepts video on a post. The API returns HTTP 500 INTERNAL —
not a 400 — for the same content. UI parity is not API parity.

**What to do instead:** <the practical consequence>
```

### Rules

- **MUST** use the ID scheme `LSM-<AREA>-<NN>`, where AREA is one of `PLACES`, `GBP`, `POSTS`, `REVIEWS`, `POLICY`, `AI`, `MEASURE`. IDs are permanent — never renumber, never reuse. A retired fact is marked superseded and kept.
- **MUST** carry `Last verified: YYYY-MM-DD`. An honest "last verified 2026-07-13, not re-checked since" is strictly better than a silent stale claim.
- **MUST** state the probe or the source. A fact nobody can reproduce is an opinion.
- Verdicts are one of: `WORKS`, `GONE`, `NEVER WORKED`, `UNDOCUMENTED`, `OPEN QUESTION`.
- **MUST NOT** narrate or teach. No "as we saw in chapter 4". Each entry stands alone, because each entry will be read alone.
- Tables over prose wherever the content is tabular. Extraction should be trivial.

---

## 4. Before you open a pull request

- `npm run build` passes. It catches broken links; `npm run start` does not.
- No `:::` admonitions, no MDX.
- Every new fact in Part V has an ID, a verdict, a date and a probe.
- Every lab names a real screen and states a cost.
- Nothing from the **Never publish** list appears anywhere.
- Read your chapter on GitHub, not just on the site. If it looks broken there, it is broken.
