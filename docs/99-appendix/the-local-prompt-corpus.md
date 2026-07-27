---
title: The local prompt corpus
sidebar_position: 4
description: A versioned, citable set of unbranded geo-anchored local queries for AI-visibility testing — 46 templates across four intents, with the rules for filling, running and reporting them.
---

# The local prompt corpus

Two people measure whether an AI engine recommends a plumber in Leeds. One asks *"best plumber Leeds"*. The other asks *"I need a plumber today in Leeds — who can actually come out?"*. They get different businesses, publish different numbers, and neither result can be checked against the other, because neither published the question.

This page is the fix: a fixed, numbered, versioned set of local query templates, with the rules for filling them in and the rules for what you are allowed to conclude. Copy it, fork it, cite the version you used. It is meant to be reused by people who have never heard of us, and it works with any engine, any tool, and a spreadsheet.

**Corpus version 1.0 · published 2026-07-27.** Nothing on this page is a measurement. It is the instrument.

## Why a shared corpus is worth having

An AI-visibility number is a rate over runs of a *question*. Change the question and you have changed the instrument, which means:

- **Two businesses are only comparable if they were asked the same thing.** "Our client is mentioned 4/5 and the market average is 2/5" is meaningless unless both sides ran the same templates.
- **Two dates are only comparable if the question did not move.** A prompt edit resets the series ([LSM-AI-14](../05-reference/ai-engine-probe-recipes.md#lsm-ai-14--the-prompt-must-demand-named-businesses-and-sources-or-neither-axis-is-measurable)). If you cannot say which version of the question produced last quarter's number, you do not have a trend.
- **A published method can be attacked, which is the point.** A corpus with IDs is falsifiable. Somebody can tell you row C-09 is badly worded, and you can fix C-09 in v1.1 and say so.

The four intents below — discovery, comparison, trust, logistics — are the manual's taxonomy, not Google's; Google publishes no local query-intent classification. They earn their place because each is answered by a different surface and moved by a different lever. The long argument is in [what people actually search](../01-foundations/what-people-actually-search.md).

## The shape of a row

Every row is a template with slots. Fill the slots, wrap it in the carrier prompt, run it.

| Slot | Means | Example fill |
| --- | --- | --- |
| `{category}` | What a customer calls the business, not what the trade calls it | `plumber`, `coffee shop`, `dentist` |
| `{service}` | One specific job inside that category | `boiler repair`, `root canal`, `tax return` |
| `{city}` | The town or city, as a customer would say it | `Leeds`, `Bristol` |
| `{area}` | A neighbourhood, district or landmark | `Shoreditch`, `the city centre` |
| `{lat}` `{lng}` | Decimal coordinates of the point you are asking *from* | `53.7965`, `-1.5478` |
| `{constraint}` | A qualifier a customer would actually say aloud | `open on Sunday`, `that takes walk-ins`, `wheelchair accessible` |
| `{audience}` | Who it is for | `with young kids`, `for a nervous patient` |
| `{brand}` | The business name — **branded rows only** | `Acme Plumbing` |
| `{rival}` | A named competitor — **branded rows only** | `Riverside Plumbing` |

Three columns qualify each row.

**Register** — how the question is phrased, which matters because a search box and an assistant get asked differently.

| Register | Shape | Where it belongs |
| --- | --- | --- |
| `term` | 2–5 words, keyword-shaped | Rank tracking; still valid as a probe |
| `spoken` | A short question a person would say out loud | Both |
| `conversational` | A full sentence carrying context or a constraint | Probes; useless as a tracked keyword |

The register ladder exists because assistants are asked longer questions than search boxes are, so a probe set made only of `term` rows under-samples the surface. Whether register *changes which businesses get named* is not established here *(inference — the mechanism is that a longer prompt gives the model more retrieval material; we have run no controlled register test)*. The probe that would settle it is at the end of this page.

**Rank** — is this row worth a slot in a rank tracker? `yes` / `weak` / `no`.

**Probe** — is this row valid as an AI-visibility probe? `yes` / `flagged` (valid but must be kept in its own series) / `audit` (run it, but never pool it into a visibility rate) / `no`.

## The carrier prompt

A template is not a probe until it is geo-anchored and instructed. Assistant APIs have no location parameter — the coordinate can only go in the prose ([LSM-AI-11](../05-reference/ai-engine-probe-recipes.md#lsm-ai-11--an-assistant-api-has-no-location-parameter--the-coordinate-goes-in-the-prompt-text)). This is the carrier, reproduced verbatim so that a hand-run probe and a tooled one are the same measurement:

```text
Someone near latitude {lat}, longitude {lng} asks: "{filled template}".
Recommend the specific local businesses that best answer this, by name, citing your sources.
```

Each clause is load-bearing:

- **`Someone near latitude…`** — third person, so the model is answering about a place rather than about you. The coordinate is a hint the model may honour, ignore or reinterpret; it is not a constraint on retrieval.
- **`"{filled template}"`** — quoted, so the customer's phrasing survives intact instead of being absorbed into your instructions.
- **`the specific local businesses… by name`** — without it, assistants routinely answer with criteria and advice, and there is nothing to extract.
- **`citing your sources`** — without it, several engines return no source list at all, which makes the citation axis *unmeasurable* for that run rather than negative ([LSM-AI-20](../05-reference/ai-engine-probe-recipes.md)).

Two things that will quietly ruin a run:

**Do not append "answer only in JSON".** On a grounded Gemini call it stops the search tool engaging: you get well-formed JSON, often a negative result, and zero grounding metadata ([LSM-AI-28](../05-reference/ai-engine-probe-recipes.md#lsm-ai-28--demanding-json-only-in-a-grounded-gemini-prompt-stops-the-search-tool-engaging)). Ask in natural language; convert to JSON in a second, ungrounded call.

**Do not edit the carrier mid-series.** A wording change is an instrument change. If you must edit it, bump your corpus version, note the date, and start a new series.

## Corpus v1.0

Forty-six templates. IDs are permanent: `D-07` will always mean what it means here, and a retired row is marked retired rather than reused.

### Discovery — someone needs the category and has no name in mind

Unbranded by construction. This is what the map pack exists to answer, and it is where most people's entire tracked set lives.

| ID | Template | Register | Rank | Probe |
| --- | --- | --- | --- | --- |
| D-01 | `{category}` | term | yes | yes |
| D-02 | `{category} near me` | term | yes | no — the carrier already states the coordinate, so this is D-01 billed twice |
| D-03 | `{category} in {city}` | term | yes | yes |
| D-04 | `{category} {area}` | term | yes | yes |
| D-05 | `{service} {city}` | term | yes | yes |
| D-06 | `emergency {category} {city}` | term | yes | yes |
| D-07 | `24 hour {category} near {area}` | term | yes | flagged — temporal |
| D-08 | `{category} open now {city}` | term | weak | audit — the engine's "now" is not the searcher's |
| D-09 | `affordable {category} in {city}` | term | yes | yes |
| D-10 | `{category} that {constraint} in {city}` | term | weak | yes |
| D-11 | `where can I get {service} near {area}?` | spoken | no | yes |
| D-12 | `who does {service} around {area}?` | spoken | no | yes |
| D-13 | `I need a {category} today in {city} — who can actually come out?` | conversational | no | yes |
| D-14 | `I've just moved to {area} and need a {category}. Where do people go?` | conversational | no | yes |
| D-15 | `is there a {category} in {area} that does {service}?` | conversational | no | yes |
| D-16 | `{category} in {city} {audience}` | term | weak | yes |

D-02 is in the corpus because it is one of the highest-volume phrasings a search box receives, and leaving it out would make the tracked-keyword half of the corpus wrong. As a probe it is redundant: the carrier already supplies the geography, so `near me` adds nothing but tokens.

### Comparison — someone has candidates and wants a reason to pick

The weakest rank-tracking rows and the strongest probes. A comparison query asks the engine to *choose*, which is exactly the behaviour an AI-visibility measurement is trying to observe.

| ID | Template | Register | Rank | Probe |
| --- | --- | --- | --- | --- |
| C-01 | `best {category} in {city}` | term | weak | yes |
| C-02 | `top {category} near {area}` | term | weak | yes |
| C-03 | `best {category} for {service} in {city}` | term | weak | yes |
| C-04 | `best {category} in {city} {audience}` | term | weak | yes |
| C-05 | `{category} in {city} with the best reviews` | term | no | yes |
| C-06 | `most reliable {category} in {city}` | spoken | no | yes |
| C-07 | `which {category} in {city} should I use for {service}?` | spoken | no | yes |
| C-08 | `who's the best {category} near {area}, and why?` | spoken | no | yes — the `why` clause is what makes stance readable |
| C-09 | `I've got three quotes for {service} in {city}. How do I choose who to go with?` | conversational | no | yes |
| C-10 | `what's the difference between the main {category}s in {area}?` | conversational | no | yes |
| C-11 | `I need {service} in {city} and I care more about {constraint} than price. Who fits?` | conversational | no | yes |
| C-12 | `alternatives to {rival} in {city}` | term | weak | flagged — names a rival, not you |
| C-13 | `{brand} vs {rival}` | term | weak | no — branded |
| C-14 | `is {brand} or {rival} better for {service}?` | spoken | no | no — branded |

C-12 is the one row that names a business without begging its own answer, because the business it names is not yours. It is a legitimate displacement probe — *when someone is already looking at a competitor, does the engine offer you?* — and it must live in its own series, never pooled with the unbranded rows, because naming any business changes what the model retrieves.

### Trust — someone has your name and is deciding whether to use you

Branded and subjective. You will "rank" #1 for all of these because it is your name, which is why rank is not the point: what matters is what the searcher finds when they arrive.

| ID | Template | Register | Rank | Probe |
| --- | --- | --- | --- | --- |
| T-01 | `{brand} reviews` | term | watch | no — branded |
| T-02 | `{brand} {city} reviews` | term | watch | no — branded |
| T-03 | `is {brand} any good?` | spoken | no | audit |
| T-04 | `{brand} complaints` | term | watch | no — branded |
| T-05 | `is {brand} legit?` | spoken | no | audit |
| T-06 | `has anyone used {brand} for {service}?` | conversational | no | audit |
| T-07 | `what do people say about {brand}?` | conversational | no | audit |
| T-08 | `is {brand} licensed and insured?` | spoken | no | audit |

`watch` means: track it to see what appears alongside you, not to record a position. A page of `#1`s is the easiest report to produce and the least informative.

### Logistics — someone has decided and needs one fact

Branded and objective. Answered straight out of your profile's structured fields, frequently with no click to anything. Useless as visibility probes and genuinely useful as a **fact-accuracy audit**: engines that are not grounded in Google's place data are reading pages *about* you, and pages about you go stale.

| ID | Template | Register | Rank | Probe |
| --- | --- | --- | --- | --- |
| L-01 | `{brand} opening hours` | term | no | audit |
| L-02 | `is {brand} open on {day}?` | spoken | no | audit |
| L-03 | `{brand} phone number` | term | no | audit |
| L-04 | `where is {brand}?` | term | no | audit |
| L-05 | `is there parking at {brand}?` | spoken | no | audit |
| L-06 | `does {brand} do {service}?` | spoken | no | audit |
| L-07 | `does {brand} take walk-ins?` | spoken | no | audit |
| L-08 | `how do I book with {brand}?` | spoken | no | audit |

An accuracy audit records something different from a visibility probe: not *were you named* but *was the fact correct*. Run the eight L rows once per engine, mark each answer right, wrong or absent, and you have a defensible finding — "one engine had our Sunday hours wrong on 2026-07-27" — that costs almost nothing and is immediately fixable. One vendor index reports profile accuracy around two-thirds on the web-grounded assistants against near-total accuracy on the Maps-grounded one; the methodology is only partly published, so treat the figures as soft and the mechanism as sound ([chapter 1](../01-foundations/what-is-local-seo.md) carries the citation and its caveats).

## Filling the slots: four worked packs

Templates are easy to misfill. The commonest error is writing the trade's vocabulary into `{category}` — `HVAC preventative maintenance` rather than `boiler service`. These four packs are complete, fictional instantiations of the same seven rows, so you can see the shape before doing your own.

| ID | Emergency trade | Café | Dental clinic | Accountant |
| --- | --- | --- | --- | --- |
| D-03 | `plumber in Leeds` | `coffee shop in Bristol` | `dentist in Leeds` | `accountant in Bristol` |
| D-05 | `boiler repair Leeds` | `cold brew Bristol` | `emergency dentist Leeds` | `self assessment help Bristol` |
| D-13 | `I need a plumber today in Leeds — who can actually come out?` | `I'm in Bristol city centre and want somewhere to work from for two hours with good coffee. Where?` | `I've got toothache and need someone in Leeds today. Who takes emergencies?` | `my tax return is due in Bristol and I've left it late. Who takes new clients?` |
| C-01 | `best plumber in Leeds` | `best coffee shop in Bristol` | `best dentist in Leeds` | `best accountant in Bristol` |
| C-08 | `who's the best plumber near Headingley, and why?` | `who's the best coffee shop near Stokes Croft, and why?` | `who's the best dentist near Chapel Allerton, and why?` | `who's the best accountant near Clifton, and why?` |
| T-03 | `is Acme Plumbing any good?` | `is Bramble Café any good?` | `is Northgate Dental any good?` | `is Halliday & Co any good?` |
| L-02 | `is Acme Plumbing open on Sunday?` | `is Bramble Café open on Monday?` | `is Northgate Dental open on Saturday?` | `is Halliday & Co open on Friday?` |

The business names are invented. Substitute real ones only for the business you are actually measuring.

Two filling rules that save the set:

1. **`{category}` is the word a customer would say to a friend.** If you would not say it out loud in a pub, it is not a category fill.
2. **`{area}` beats `{city}` for probes when the city is large.** `best dentist in London` is a question with no answer; `best dentist near Chapel Allerton` is one a person would actually ask.

## Building a set from the corpus

You cannot run 46 rows. Probe cost multiplies keywords × engines × runs, and a five-run window on three engines turns even six rows into 90 calls before a single rate exists ([LSM-AI-36](../05-reference/ai-engine-probe-recipes.md#lsm-ai-36--probe-cost-multiplies-keywords--engines--runs)). Probing thirty rows once produces thirty anecdotes; probing six rows five times produces six measurements.

Select by **cell**, not by preference. A cell is an intent crossed with a place, and you fill each cell once:

| Cell | Rows to draw from | How many |
| --- | --- | --- |
| Discovery / primary area | D-01, D-03, D-04, D-05 | 2 |
| Discovery / second area | the same rows, different `{area}` and coordinate | 1 |
| Discovery / conversational | D-11 … D-15 | 1 |
| Comparison / term | C-01, C-02, C-03 | 1 |
| Comparison / conversational | C-08, C-09, C-10, C-11 | 1 |
| Trust — audit series | T-03, T-05, T-07 | 1 |
| Logistics — accuracy series | L-01 … L-08 | run once, not on a schedule |

That is a six-row unbranded probe set plus two audit series. The unbranded six are the ones that carry a visibility rate. Everything else is reported separately or not at all.

The second discovery cell deserves defending because people cut it first. It is the *same* template from a *different* coordinate, and it is the only duplicate worth paying for: the default probe point is the business's own coordinates, which is the single most flattering point available ([LSM-AI-12](../05-reference/ai-engine-probe-recipes.md#lsm-ai-12--the-default-probe-point-is-the-businesss-own-coordinates-which-is-the-most-flattering-point-available)). Whether moving the coordinate moves an assistant's answer at all is an open question ([LSM-AI-15](../05-reference/ai-engine-probe-recipes.md#lsm-ai-15--whether-moving-the-coordinate-moves-an-assistants-answer-is-unestablished)) — which is a reason to record it, not a reason to skip it.

## What must travel with every run

A corpus is only citable if the record says which row produced the answer. These fields are specific to the corpus; the full per-run record is in [the AI visibility record schema](./ai-visibility-record-schema.md).

| Field | Example | Why |
| --- | --- | --- |
| Corpus version | `LSM-corpus 1.0` | Rows change between versions |
| Row ID | `C-08` | The unit somebody else can reproduce |
| Slot fills | `{category}=dentist, {area}=Chapel Allerton` | Two people can fill C-08 differently |
| Filled query, verbatim | `who's the best dentist near Chapel Allerton, and why?` | The only field that makes the rest checkable |
| Carrier version | `carrier 1.0` | A carrier edit resets the series |
| Coordinate | `53.8321, -1.5460` | An input to the run, never a property of the result |
| Engine and call shape | `gemini / grounded generateContent` | Findings never transfer between engines |
| Series tag | `unbranded` / `displacement` / `audit` | Keeps flagged rows out of the headline rate |

The series tag is the field people skip and then regret. Without it, a C-12 displacement run and a C-01 visibility run land in the same average, and the average is now about nothing.

## Running it

> **Procedure · by hand** · Where: any assistant, in a browser · Cost: **free** · Time: ~30 min
>
> You need: your slot fills written down, and the coordinate you are asking from.

1. Fill six unbranded rows using the cell table above. Write the filled text out in full — do not run a template with a slot still in it.
2. Wrap each in the carrier prompt with your coordinates.
3. Open a *fresh* chat per run. Conversation history contaminates the next answer.
4. Paste the answer verbatim into a spreadsheet, one row per run, with every field from the table above.
5. Repeat the whole pass five times. Same rows, same fills, same coordinate.
6. Only now count anything.

**What good looks like.** Thirty rows of stored answer text, six cells with five runs each, and no cell you ran more often than the others because it was going well.

**If it went wrong.** If an engine answers with generic advice and names nobody, that run leaves the recommendation denominator rather than counting as a miss ([LSM-AI-19](../05-reference/ai-engine-probe-recipes.md#lsm-ai-19--refusals-and-aggregator-punts-must-leave-the-denominator-not-count-as-a-miss)). If it names businesses but not yours, that is a miss and belongs in the numerator's complement. They are different outcomes and must be stored as different values.

> **Procedure · in the app** · Where: **Rankings** (`/b/{businessId}/rankings`), then **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **paid** · Time: ~25 min
>
> You need: your six filled unbranded rows.

1. In **Rankings**, add each filled row with **Track**. The AI check runs on active tracked keywords, so a row that is not tracked cannot be probed.
2. For the second-area cell, add the same phrase again with a different **Search from** value. It saves as its own row, because a keyword's identity includes its location.
3. In **AI Visibility**, scroll to **Where AI mentions you**, select exactly your six rows, and read the count on the bar: `N keywords × M engines = K checks`.
4. Press **Check N selected** and let the batch counter finish. Repeat four more times with the identical selection, recording the date of each pass.
5. Read the rates from the tiles and the **Sources cited by AI** table. Both are free — they read what the paid checks stored.

**What good looks like.** Five passes with an identical selection, and a note of the dates. Uniform run counts are what make the consistency figure interpretable.

**If it went wrong.** A cell reading **Sample** means that engine is not connected: fixture rows, excluded from every rate, an unmeasured column rather than a zero. Do not let a branded row into the selection — the whole batch is then measuring the model's agreeableness.

Without any tool this is the spreadsheet from the first procedure, and it is completely valid. It simply does not keep history, which is most of the argument for tooling ([doing it without SEOG](./doing-it-without-seog.md)).

## Rows that must never be pooled

Four exclusions, each with a mechanism rather than a preference behind it.

**Branded rows never enter a visibility rate.** A prompt containing your name puts the name in the context window, so the answer is a comment on your own input. You have measured recall, not visibility ([LSM-AI-13](../05-reference/ai-engine-probe-recipes.md#lsm-ai-13--a-prompt-that-names-the-business-cannot-measure-whether-the-business-is-recommended)). This includes the subtle case: filling `{category}` with the way your marketing describes you — `artisanal third-wave espresso bar` — is a branded prompt in disguise.

**Displacement rows (C-12) keep their own series.** Naming any business changes retrieval, even when it is not yours.

**Temporal rows (D-07, D-08) keep their own series or stay out.** "Open now" and "24 hour" depend on what the engine believes the time is, which you do not control and cannot record accurately *(inference — the mechanism is that the model has no reliable clock for the searcher's timezone; we have not measured how often it errs)*.

**Rows with a short or generic `{brand}`.** If the business name is a common word or a substring of a nearby brand — *Coffee* in a market containing *Coffee Republic* — automatic self-matching over the answer text will over-count in the most flattering possible direction ([LSM-AI-22](../05-reference/ai-engine-probe-recipes.md#lsm-ai-22--substring-self-matching-cannot-separate-you-from-a-similarly-named-business)). Verify those matches by eye against the stored answer, and say in the report that the rate is an upper bound.

> **Scope note.** This corpus is for measuring the visibility of a business you own or are engaged to work on. Running it at scale across every business in a market to assemble a redistributable dataset of names, addresses and reviews is a different activity with its own terms-of-service exposure — see [storing Google data legally](../05-reference/storing-google-data-legally.md). The line is not the prompt; it is what you keep and who you give it to.

## Known biases of corpus v1.0

Stated so that anyone citing it can weigh them, and so v1.1 has somewhere to start.

- **English, and British-leaning.** The phrasings, and the assumption that `{city}` and `{area}` are the natural geographic units, come from English-language local search. Other languages carry local intent differently and this corpus has not been tested in any of them.
- **Weighted to services over retail.** Discovery and comparison rows assume a business someone hires or visits deliberately. Impulse and footfall retail are under-represented.
- **No price rows.** `how much does {service} cost in {city}` is a real and growing query shape, and it is absent because we have not decided whether an engine naming price ranges without naming businesses is a punt or a distinct outcome.
- **No multi-location rows.** A chain asking "which of *our* branches gets named" needs a different design; see [multi-location and franchise](../03-advanced/multi-location-and-franchise.md).
- **Service-area businesses are poorly served.** `{area}` assumes a place the business is *in*. A trade covering forty postcodes from a hidden address needs rows anchored to the customer's location rather than the business's, and this version does not distinguish them ([service-area businesses](../03-advanced/service-area-businesses.md)).
- **The register ladder is untested.** Three registers are offered because assistants are asked longer questions than search boxes are. Whether register changes *which businesses are named*, holding everything else constant, is unmeasured.

Two open questions this corpus was built to make answerable, and which nobody has published answers to:

**Does register change the answer?** Take one market, one engine, one coordinate. Run D-03 and D-13 — the same underlying need at two registers — twenty times each. Compare mention rates against the run-to-run noise floor, not against each other ([LSM-AI-16](../05-reference/ai-engine-probe-recipes.md#lsm-ai-16--one-run-is-a-sample-not-a-measurement)). Twenty runs still leaves roughly an 11-point worst-case error bar, so only a large difference is readable.

**Do comparison rows really out-perform discovery rows as probes?** The claim in this manual is a mechanism argument: comparison queries ask the engine to choose, so they produce more named businesses and more readable stance. Nobody has published the rate at which each intent produces a *recommending* answer at all. Run the six discovery and six comparison rows twenty times each on one engine, count how many answers named any business, and you have it.

If you run either, publish the query set, the run count and the date. Two of the three are missing from most work in this area.

## Versioning, forking and citing

**Version 1.0 · 2026-07-27 · 46 rows (D-01…D-16, C-01…C-14, T-01…T-08, L-01…L-08).** Initial publication.

IDs are permanent. A row that turns out to be badly worded is corrected in place with a note, or retired and left in the table marked retired — never renumbered, never reused for something else, because someone's stored records point at it.

To cite:

```text
The Local SEO Manual, "The local prompt corpus", version 1.0 (2026-07-27).
https://learn.seog.ai/appendix/the-local-prompt-corpus
```

To fork: the repository is public at `github.com/seog-ai/local-seo-manual`. Copy the tables, change what your market needs, and say in your version what you changed and which version you started from. A fork that keeps the IDs stable stays comparable with everyone else's data; a fork that silently renumbers does not.

Corrections are the most valuable contribution here — particularly a row that reliably produces refusals, a vertical the packs handle badly, or a language the templates do not survive. [Contributing](./contributing.md) has the process; include what you ran, when, and against which engine.

---

**Pairs with:** [What people actually search](../01-foundations/what-people-actually-search.md) · [How an AI assistant answers a local question](../01-foundations/how-ai-answers-a-local-question.md) · [Building a tracked set that tells the truth](../02-core-practice/choosing-what-to-track.md) · [Measuring AI visibility](../03-advanced/ai-visibility.md) · [AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md) · [The AI visibility record schema](./ai-visibility-record-schema.md)
