---
title: AI visibility record schema
sidebar_position: 5
description: The fields one AI-visibility observation must carry to stay comparable — types, why each exists, a JSON example, and the derivations that belong at read time rather than write time.
---

# AI visibility record schema

Every AI-visibility number you will ever report is a projection of a pile of individual observations. If those observations were stored as booleans, the pile is worthless:

- you cannot recompute a metric you have redefined;
- you cannot audit a match you now suspect;
- you cannot tell a client what the machine actually said about their market.

This page specifies the observation. One question, put to one engine, from one anchor, at one moment — recorded in enough detail that a run captured today is still comparable to one captured in a year, by a different person, using different tooling.

It is tool-agnostic. A spreadsheet satisfies it; so does a table in Postgres. Two sections near the end say what one working implementation stores against it, and where that implementation falls short, because the gaps are the instructive part.

## The unit and its key

The **observation** is one run: one prompt, one engine, one response. Not "this business's AI visibility", not "this keyword's score" — one run.

Runs group into a **cell**: everything sharing the same question, anchor and engine. A cell is where rates live, because a rate needs repetition ([LSM-AI-16](../05-reference/ai-engine-probe-recipes.md#lsm-ai-16--one-run-is-a-sample-not-a-measurement)). A single observation carries no rate and should never be rendered as a percentage.

The identity of a cell is the tuple below. Change any element and you have started a new series, not continued an old one.

| Key element | Change it and… |
| --- | --- |
| Question text | You are asking a different question. A paraphrase is a different probe. |
| Anchor coordinate | You are asking from somewhere else. Never pool answers from two anchors. |
| Engine | Findings do not transfer between engines. |
| Prompt template version | The instruction clause moved; before and after are not comparable ([LSM-AI-14](../05-reference/ai-engine-probe-recipes.md#lsm-ai-14--the-prompt-must-demand-named-businesses-and-sources-or-neither-axis-is-measurable)). |

Records are **append-only**. You never update an observation; a re-run is a new row. This is the only property that makes a rolling window meaningful, and the only one that lets you recompute history when a metric definition changes.

## The record

Four blocks: what you asked, what came back, what you concluded, and the housekeeping that lets you find the row again.

### Identity and inputs

| Field | Type | Required | Why it must be stored |
| --- | --- | --- | --- |
| `schemaVersion` | string | yes | Old rows must remain readable after you add fields. |
| `observationId` | string | yes | A stable handle for "the run where it said this". |
| `observedAt` | ISO-8601 timestamp, UTC | yes | Every rate is a rate as of a date range. Local timestamps in a mixed-timezone team are a slow-burning mess. |
| `batchId` | string | no | Marks a uniform pass across cells. Without it you cannot tell one sweep from five stragglers. |
| `subject.businessId` | string | yes | Which business this run was about. |
| `subject.name` | string | yes | **The name used for matching, snapshotted.** See below — this is the field people drop, and it costs the most. |
| `subject.domain` | string or null | yes | Same reason. Bare hostname, lowercased, no `www.`. |
| `probe.questionId` | string | yes | Stable handle for the question, so a typo fix does not fork the series silently. |
| `probe.questionText` | string | yes | Verbatim, as sent. Not tidied. |
| `probe.promptTemplateId` | string | yes | Which wrapper carried the question. A prompt edit resets the series. |
| `probe.anchorLat` / `anchorLng` | number or null | yes | The coordinate the prompt carried. Stored on the row, not referenced from a mutable keyword record. |
| `probe.anchorLabel` | string or null | no | Human-readable, for the report. Never the thing you group by. |
| `probe.language` | BCP-47 string | no | Answers differ by language. If you only ever probe in one, record it once and say so. |
| `engine.id` | enum | yes | The assistant as a product: `gemini`, `chatgpt`, `claude`, and so on. |
| `engine.vendor` | enum | yes | Who ran it. "Gemini" and "the grounded Vertex call" are not interchangeable claims. |
| `engine.surface` | enum | yes | `assistant-api`, `assistant-app`, `serp-ai-overview`. Different instruments; see [LSM-AI-33](../05-reference/ai-engine-probe-recipes.md#lsm-ai-33--an-assistant-probe-cannot-tell-you-whether-google-rendered-an-ai-overview). |
| `engine.model` | string or null | yes | The model identifier the vendor returned. Vendors roll models under a stable product name; a step change in your series is a model change until proven otherwise. |
| `engine.searchTool` | boolean | yes | Whether retrieval was enabled. An ungrounded answer is a different measurement. |
| `engine.toolCalls` | integer or null | no | How many searches the run actually made. Also your cost line ([LSM-AI-32](../05-reference/ai-engine-probe-recipes.md#lsm-ai-32--openai-returns-cited-sources-as-url_citation-annotations-and-bills-web-searches-apart-from-tokens)). |

### The answer

| Field | Type | Required | Why it must be stored |
| --- | --- | --- | --- |
| `outcome.live` | boolean | yes | False for fixture or demo rows. Set at write time, never inferred later ([LSM-AI-23](../05-reference/ai-engine-probe-recipes.md#lsm-ai-23--fixture-answers-poison-every-rate-unless-they-are-flagged-at-write-time)). |
| `outcome.status` | enum | yes | `answered`, `refused`, `error`. Three states that all look like "not mentioned" if you collapse them. |
| `outcome.finishReason` | string or null | yes | Truncation returns an empty source list rather than an error ([LSM-AI-27](../05-reference/ai-engine-probe-recipes.md#lsm-ai-27--a-too-small-output-token-budget-returns-zero-grounding-metadata-not-an-error)). Without this field, "the engine cited nobody" and "my budget was too small" are indistinguishable. |
| `outcome.answerText` | string or null | yes | Verbatim, every part joined ([LSM-AI-29](../05-reference/ai-engine-probe-recipes.md#lsm-ai-29--gemini-25-splits-a-reply-across-parts--reading-parts0-truncates-it)). The one field from which every other conclusion is re-derivable. |
| `outcome.sources[]` | array | yes | Ordered. Empty array and `null` mean different things: none returned versus not captured. |
| `sources[].position` | integer | yes | 1-based, as returned. |
| `sources[].domain` | string or null | yes | Null when the engine gave a page title and no resolvable host — a null, not a zero ([LSM-AI-26](../05-reference/ai-engine-probe-recipes.md#lsm-ai-26--gemini-grounding-chunks-carry-a-redirect-uri-not-the-publishers-url)). |
| `sources[].title` | string | yes | Frequently the only publisher identity you get. |
| `sources[].origin` | enum | yes | `cited` (the model attributed a statement to it), `searched` (retrieved and possibly ignored), `inserted` (your pipeline added it). Mixing these is how "the AI cited you" gets said about a page the model never quoted ([LSM-AI-31](../05-reference/ai-engine-probe-recipes.md#lsm-ai-31--claudes-inline-citations-are-a-subset-of-the-pages-it-searched)). |

### The judgements

These are conclusions, not observations. Store them for convenience, but keep them re-derivable — that is the point of `answerText`.

| Field | Type | Required | Why it must be stored |
| --- | --- | --- | --- |
| `derived.named` | boolean | yes | Business name present in the answer text. |
| `derived.domainCited` | boolean | yes | `subject.domain` among the sources whose `origin` is `cited`. Independent of `named` ([LSM-AI-20](../05-reference/ai-engine-probe-recipes.md#lsm-ai-20--mention-and-citation-are-independent-axes-and-must-be-recorded-separately)). |
| `derived.selfSourcePosition` | integer or null | no | Where in the source list, if anywhere. Not a rank. |
| `derived.matchMethod` | string | yes | How `named` was decided. Bidirectional substring containment inflates in a predictable direction ([LSM-AI-22](../05-reference/ai-engine-probe-recipes.md#lsm-ai-22--substring-self-matching-cannot-separate-you-from-a-similarly-named-business)); a report that does not name its match method cannot be checked. |
| `derived.judgeStatus` | enum | yes | `ok`, `unparseable`, `not_run`. |
| `derived.isRecommendation` | boolean or null | yes | Did the answer put forward specific businesses at all? Null when unjudged — never false ([LSM-AI-25](../05-reference/ai-engine-probe-recipes.md#lsm-ai-25--an-unparseable-judge-reply-must-store-null-never-a-false)). |
| `derived.entities[]` | array or null | yes | Every business named, in order, each with `name`, `kind` (`local`, `chain`, `aggregator`, `unknown`) and `stance` (`recommended`, `listed`, `hedged`, `negative`). The non-self entries are a competitive set you got for free. |
| `derived.selfPosition` | integer or null | yes | 1-based position among `entities`. This is the ordering number that means something. |
| `derived.selfStance` | enum or null | yes | Being named as the cheap-but-inconsistent option is not a win. |

`kind` is what separates a real rival from an aggregator punt, and the punt distinction is what keeps the recommendation denominator honest ([LSM-AI-19](../05-reference/ai-engine-probe-recipes.md#lsm-ai-19--refusals-and-aggregator-punts-must-leave-the-denominator-not-count-as-a-miss)).

## A complete record

An answer that named the business without citing its site — the most common shape.

```json
{
  "schemaVersion": "1.0",
  "observationId": "obs_2026-07-21_0914_gemini_q3",
  "observedAt": "2026-07-21T09:14:02Z",
  "batchId": "2026-07-21-pass-3",
  "subject": {
    "businessId": "biz_4417",
    "name": "Northgate Dental",
    "domain": "northgatedental.example"
  },
  "probe": {
    "questionId": "q-emergency-dentist-ancoats",
    "questionText": "who's the best emergency dentist near Ancoats, Manchester?",
    "promptTemplateId": "local-recommend-v2",
    "anchorLat": 53.4839,
    "anchorLng": -2.2265,
    "anchorLabel": "Ancoats, Manchester",
    "language": "en-GB"
  },
  "engine": {
    "id": "gemini",
    "vendor": "google",
    "surface": "assistant-api",
    "model": "<model id as returned by the vendor>",
    "searchTool": true,
    "toolCalls": 2
  },
  "outcome": {
    "live": true,
    "status": "answered",
    "finishReason": "STOP",
    "answerText": "For urgent dental care around Ancoats, locals point to Northgate Dental, which takes same-day emergencies, and to City Centre Dental Care. Reviews for Northgate are strong on wait times.",
    "sources": [
      { "position": 1, "domain": "yelp.com", "title": "Emergency dentists in Manchester - Yelp", "origin": "cited" },
      { "position": 2, "domain": null, "title": "The 10 best emergency dentists in Manchester", "origin": "cited" },
      { "position": 3, "domain": "citycentredental.example", "title": "City Centre Dental Care", "origin": "searched" }
    ]
  },
  "derived": {
    "named": true,
    "domainCited": false,
    "selfSourcePosition": null,
    "matchMethod": "substring-bidirectional",
    "judgeStatus": "ok",
    "isRecommendation": true,
    "entities": [
      { "name": "Northgate Dental", "kind": "local", "stance": "recommended" },
      { "name": "City Centre Dental Care", "kind": "local", "stance": "listed" }
    ],
    "selfPosition": 1,
    "selfStance": "recommended"
  }
}
```

And a refusal, which is a real outcome and not a miss. Note what stays populated and what goes null.

```json
{
  "schemaVersion": "1.0",
  "observationId": "obs_2026-07-21_0916_chatgpt_q3",
  "observedAt": "2026-07-21T09:16:44Z",
  "batchId": "2026-07-21-pass-3",
  "subject": { "businessId": "biz_4417", "name": "Northgate Dental", "domain": "northgatedental.example" },
  "probe": {
    "questionId": "q-emergency-dentist-ancoats",
    "questionText": "who's the best emergency dentist near Ancoats, Manchester?",
    "promptTemplateId": "local-recommend-v2",
    "anchorLat": 53.4839, "anchorLng": -2.2265,
    "anchorLabel": "Ancoats, Manchester", "language": "en-GB"
  },
  "engine": {
    "id": "chatgpt", "vendor": "openai", "surface": "assistant-api",
    "model": "<model id as returned by the vendor>", "searchTool": true, "toolCalls": 1
  },
  "outcome": {
    "live": true,
    "status": "answered",
    "finishReason": "stop",
    "answerText": "I can't rank dental practices, but you can find emergency dentists near Ancoats through the NHS 111 service or on Yelp.",
    "sources": [
      { "position": 1, "domain": "yelp.com", "title": "Emergency dentists in Manchester - Yelp", "origin": "cited" }
    ]
  },
  "derived": {
    "named": false,
    "domainCited": false,
    "selfSourcePosition": null,
    "matchMethod": "substring-bidirectional",
    "judgeStatus": "ok",
    "isRecommendation": false,
    "entities": [{ "name": "Yelp", "kind": "aggregator", "stance": "listed" }],
    "selfPosition": null,
    "selfStance": null
  }
}
```

That second row belongs in the mention-rate denominator and **not** in the recommendation-rate denominator. One row, two different treatments, decidable only because `isRecommendation` was stored apart from `named`.

## The four fields people drop

Everything above earns its place, but four omissions do specific, silent damage.

**The subject's name and domain, snapshotted.** Match flags are usually recomputed at read time against the *current* business record. So a rebrand, or a website move, retroactively changes every historical rate — a series that says "we were mentioned 2 of 5 times last March" quietly becomes a different number, with no event anywhere to explain it.

Storing the identity that was used for matching costs two short strings and makes history immutable. *(Established by reading the SEOG implementation on 2026-07-27, where the presence pillar re-derives both flags from the live business row.)*

**The anchor, on the row.** Storing a foreign key to a tracked-keyword record is not storing the input, because that record is editable. Someone changes the keyword's **Search from** value in March and every observation from January is now attributed to the new coordinate. Copy the numbers onto the observation.

**`finishReason`.** The failure it catches is dangerous precisely because it looks like a finding: a truncated grounded call returns a 200 with zero sources, which reads as "nobody is being cited for this query", which is comforting and fabricated.

**`origin` on each source.** Once "the model cited this" and "the model looked at this" and "we inserted this ourselves" are one undifferentiated list, the citation axis cannot be reconstructed at any price.

## Store primitives, derive rates at read time

The rule: **a stored field describes what happened; a metric is computed when you look.** Metric definitions change — yours will, within a year — and only re-derivable history survives that.

Two failure modes follow from breaking it, and both are observable in working software.

**Two definitions, two answers, same rows.** In SEOG, the per-engine `mentioned/checked` fractions near the top of the AI Visibility page count a stored `cited` flag on each cell's *latest* check, while the **Presence** tile recomputes mention and citation from `answerText` and the stored source list across the last five live checks per cell.

Different flag, different window, same page, so the two can legitimately disagree. Neither is wrong; a report that quotes one while describing the other is. *(Code-verified 2026-07-27.)*

**A derived judgement mutating a primitive.** Same implementation, sharper lesson. At write time, when the business name appears in the answer text but no returned source matches it, the pipeline **prepends a synthetic source** carrying the business's own name and domain, and stores that merged list as `sources`.

Downstream, "is my own domain among the cited sources" is then true for a business that was merely named in prose — so on rows written this way, the citation axis collapses into the mention axis for any business that has a website on file, and the "#1" beside a source is usually just "named in the answer".

*(Established by reading the write path and the read path on 2026-07-27; the unit tests exercise the reader with hand-built rows the writer would not produce, which is why the collapse does not show up as a failing test.)*

**The fix is structural, not clever:** store the engine's source list exactly as returned, mark anything you add with `origin: "inserted"`, and let "named" be a separate boolean. Then both axes remain measurable forever, and nobody has to remember which page computes what.

> **Note** · This is a general hazard, not a quirk of one product. Any pipeline that helpfully normalises data on the way in has destroyed the ability to ask a different question later. Normalise on the way out.

## The minimum viable record

If you are working in a spreadsheet — which is a completely valid way to do this — these are the columns you cannot drop. One row per run.

```
observed_at, question_id, question_text, anchor_lat, anchor_lng,
engine, model, live, status, answer_text,
named, domain_cited, sources, is_recommendation, self_position, self_stance
```

Sixteen columns, one of which (`answer_text`) will make your spreadsheet ugly. Keep it anyway: it is the column that lets you re-score everything when you decide, six weeks in, that your stance judgements were too generous.

The two rules that make the sheet a measurement rather than a diary: every cell gets the **same number of runs**, and every run's date goes in. A window counted in runs cannot tell you whether five runs spanned an afternoon or a year ([LSM-AI-17](../05-reference/ai-engine-probe-recipes.md#lsm-ai-17--report-rates-over-a-rolling-window-per-keywordengine-not-the-latest-answer)).

## What SEOG stores against this schema

One implementation, as of **2026-07-27**, so you can see how a shipped instrument maps to the specification and where the gaps are. Yours will have a different set; go and find it.

| Schema field | In SEOG |
| --- | --- |
| `observedAt`, `subject.businessId`, `engine.id` | Stored on the row |
| `outcome.live` | Stored, as a `demo` flag set at write time; fixture rows are excluded from the pillar rates |
| `engine.vendor` | Stored, as the provider that actually answered |
| `outcome.answerText` | Stored verbatim, and shown in full when you expand a keyword row |
| `outcome.sources[]` | Stored as `{ title, domain }` pairs, ordered — with the synthetic self-insertion described above |
| `derived.isRecommendation`, `entities`, `selfPosition`, `selfStance` | Stored as the judge's output, or null when the judge could not parse the reply |
| `derived.selfSourcePosition` | Stored, as a 1-based index of the business among the source list — but the list it indexes into is the one carrying the synthetic self-insertion described above, so on those rows it is a position among sources the engine did not all return |
| `derived.named`, `derived.domainCited` | **Derived at read time** from the current business name and website |
| `probe.anchorLat` / `anchorLng` | **Not on the row.** Taken at run time from the tracked keyword's **Search from** values, falling back to the business's own coordinates |
| `probe.questionText` | **Not on the row.** Referenced through the tracked keyword |
| `probe.promptTemplateId`, `engine.model`, `outcome.finishReason`, `engine.toolCalls`, `sources[].origin` | **Not stored** |

**Read that table as a worked example of the trade-off**, rather than a list of defects. Everything in the top half makes the instrument auditable — storing the verbatim answer is what lets you re-check any judgement later.

Everything in the bottom half is a question you cannot answer from history: which prompt produced this, which model version, was the empty source list real.

**If you are keeping records that must survive a prompt change or a model roll**, write the missing fields down beside the run yourself. A dated note saying "pass 3, template v2, run through the Gemini engine on 2026-07-21" costs a line and rescues the series.

## Getting rows out

**Free reads, in the app.** Open **AI Visibility** (`/b/{businessId}/ai-visibility`), expand a keyword row, and each engine panel shows the verdict, how long ago the check ran, the verbatim answer with your name highlighted, and the ordered source list.

Note that the panel gives elapsed time — "checked 3 days ago" — not a calendar date, so if the date is the thing you are recording, work it out and write it down at the moment you read it.

The **Sources cited by AI** card aggregates domains across the window. Nothing here spends anything; only **Check** does.

There is **no CSV or JSON export button** as of 2026-07-27. Transcribing by hand is the manual path.

**Through an agent connected to the platform's MCP server, three tools matter.**

- `get_ai_presence_matrix` and `get_ai_overview` are **free** reads that return the stored rows — including the answer text and the source list — for a whole business or one keyword.
- `check_ai_overview` runs a fresh check for one keyword against one engine and is **paid**, because it spends a live model call.

That asymmetry is the shape of the whole discipline: looking at what you already measured is free, and measuring again is not.

Doing this with no platform at all is a script against the vendor APIs plus this schema as your table definition — the long form is in [Doing it without SEOG](./doing-it-without-seog.md), and the prompts to put in `questionText` are in [the local prompt corpus](./the-local-prompt-corpus.md).

## Versioning

Add fields; never repurpose one. `schemaVersion` exists so a reader can tell an old row from a new one without guessing.

- **Adding a field** is a minor bump. Old rows carry null for it, and null must be distinguishable from false everywhere it appears.
- **Changing what a field means** is a new field with a new name. There is no such thing as a careful in-place redefinition — you will forget, and the person reading your 2026 numbers in 2028 certainly will.
- **Never backfill a derived field** across historical rows using today's logic. Recompute at read time, or store the new derivation under a new name beside the old one.
- **Never delete a run** because it looks wrong. A refusal, an error and a truncated answer are all data about the engine. Deleting the ugly rows is how a mention rate becomes fiction.

## Where these records go wrong

**A boolean where a null belongs.** "Not recommended" and "we could not tell" are different facts, and collapsing them makes the metric degrade silently in the pessimistic direction exactly when the judge is misbehaving.

**Fixture rows counted as data.** Flagging them in the interface is not enough — they must leave every *rate*. This has happened in production software, and the symptom is a client saying the page only shows test data.

**One row per keyword instead of one row per run.** Overwriting yesterday's observation with today's destroys the only thing that makes an AI answer measurable: repetition.

**A rate stored instead of computed.** The moment you persist "60%", you have lost the ability to say 3 of 5, to widen the window, or to fix the denominator when you realise refusals were in it.

**Answers from two anchors pooled into one number.** The anchor is part of the cell's identity. Merging them produces a figure that describes no location anyone can point to.

---

**Pairs with:** [The AI visibility method](../03-advanced/ai-visibility/index.md) · [AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md) · [How an AI assistant answers a local question](../01-foundations/how-ai-answers-a-local-question/index.md) · [The local prompt corpus](./the-local-prompt-corpus.md) · [Glossary](./glossary.md)
