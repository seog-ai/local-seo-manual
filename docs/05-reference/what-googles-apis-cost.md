---
title: What Google's APIs actually cost
sidebar_position: 2
description: Every Google SKU a local-SEO workflow touches, in USD, with the field-mask rule that sets the price — and the full derivation of a $0.00 geo-grid search.
---

# What Google's APIs actually cost

## Scope and sourcing

Every dollar figure below is **Google's own published list price**, in USD, per 1,000 requests, at the 0–100,000-requests-per-month volume tier. The rates were audited against Google's Places API (New) pricing and SKU-details pages on **2026-07-03**; the pricing page carried its own last-updated date of **2026-06-29** at that time.

Three rules govern what is here.

**Rows we have not audited are omitted, not guessed.** Google publishes four price tiers for most Places SKUs. Only the tiers a real workflow lands on were checked line by line, and the rest are marked *not audited* rather than filled in from memory. A price table with one invented row is worse than a short one.

**Nothing here is what any tool charges.** These are input costs — what Google bills the holder of the API key. What a product built on top of them charges is a different question and not this chapter's.

**Prices move.** The March 2025 restructuring changed both the SKU boundaries and the free-tier mechanism for Google Maps Platform. Re-read the SKU table before you quote a number to a client, and carry the date with the figure when you do.

---

## The rule that sets the price

### LSM-PLACES-01 · A Places request is billed at the highest SKU tier any field in its mask belongs to

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST https://places.googleapis.com/v1/places:searchText` with an identical body twice — once with `X-Goog-FieldMask: places.id`, once with `X-Goog-FieldMask: places.id,places.rating` — then read Cloud Console → Billing → Reports, grouped by SKU, the following day. Two different SKU lines appear.

Google prices Places API (New) by *field mask*, not by endpoint. Each field belongs to a tier — Essentials, Pro, Enterprise, Enterprise + Atmosphere — and a request is billed once, at the tier of the most expensive field it asked for. The number of fields is irrelevant. Thirty Pro fields plus one Enterprise field is an Enterprise request. One Enterprise field alone is the same Enterprise request.

This is the fact that decides the cost of local-SEO tooling, and it is why two tools doing visibly identical work can differ in Google fees by more than a hundredfold — the arithmetic is in `LSM-PLACES-06`.

**What to do instead:** Build a mask per use case, never one shared mask reused everywhere. Ask what the *answer* needs, then delete every field the answer does not use, then check which tier the survivors sit in.

### LSM-PLACES-02 · Published USD rates for the Maps Platform SKUs a local-SEO workflow touches

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Open `developers.google.com/maps/billing-and-pricing/pricing` and `.../sku-details`, find the Places API (New) table, and read each row below. Both pages state their own last-updated date; ours read 2026-06-29.

| SKU (Google's name) | USD / 1,000 | What puts a request on it |
| --- | --- | --- |
| Places API Text Search Essentials (IDs Only) | **$0.00** | `places:searchText` whose mask contains only Essentials fields |
| Places API Text Search Enterprise | **$35.00** | any Enterprise field in a Text Search mask — `places.rating`, `places.userRatingCount`, `places.nationalPhoneNumber`, `places.websiteUri` |
| Places API Nearby Search Enterprise | **$35.00** | the same fields, on `places:searchNearby` |
| Places API Place Details Enterprise | **$20.00** | `GET places/{placeId}` with an Enterprise field and no Atmosphere field |
| Places API Place Details Enterprise + Atmosphere | **$25.00** | any Atmosphere field — `reviews`, `editorialSummary`, `paymentOptions`, `parkingOptions`, `allowsDogs`, `serves*` |
| Places API Place Details Photos | **$7.00** | one resolution of one photo through the photo media endpoint |
| Autocomplete Requests | **$2.83** | `places:autocomplete` sent without a session token |
| Dynamic Maps | **$7.00** | one Maps JavaScript map load in a browser (first 10,000 per month are free) |

Pro-tier and Essentials-tier rows for Place Details and Nearby Search are deliberately absent: they were not audited, and the SKU page is the authority for them.

Two structural facts about the money that the table does not show. Volume tiers exist above 100,000 requests per month and the rate falls at each one; every figure here is the top-of-list 0–100,000 rate, which is the tier essentially every agency operates in. And since March 2025 the monthly free allowance is granted **per SKU** rather than as one flat dollar credit across the platform, so "free tier" is a different quantity for every row above — read the allowance off the same table as the price.

**What to do instead:** Cost a workflow by counting *requests per SKU*, not requests. A hundred Text Search Enterprise requests cost $3.50; a hundred Place Details Enterprise requests cost $2.00; a hundred Place Details Enterprise + Atmosphere requests cost $2.50. Same call count, three different bills.

### LSM-PLACES-03 · Which fields promote a Places request to which tier

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Compare your `X-Goog-FieldMask` against the per-SKU field lists on Google's SKU-details page, field by field. The most expensive match is your bill.

| Tier | Fields it contains (examples) | Text Search | Place Details |
| --- | --- | --- | --- |
| Essentials (IDs only) | `places.id`, `places.name`, `places.attributions`, `nextPageToken` | $0.00 | not audited |
| Pro | `displayName`, `formattedAddress`, `location`, `types`, `primaryTypeDisplayName`, `photos`, `businessStatus`, `googleMapsUri`, `viewport` | not audited | not audited |
| Enterprise | `rating`, `userRatingCount`, `nationalPhoneNumber`, `internationalPhoneNumber`, `websiteUri`, `regularOpeningHours`, `priceLevel`, `priceRange` | $35.00 | $20.00 |
| Enterprise + Atmosphere | `reviews`, `editorialSummary`, `paymentOptions`, `parkingOptions`, `allowsDogs`, `delivery`, `takeout`, `dineIn`, `outdoorSeating`, `restroom`, `serves*` | not audited | $25.00 |

Three traps live in that table.

**`places.name` is not the business name.** In the New API, `name` is the resource name — the string `places/ChIJ…`. The human-readable name is `displayName`, which is a **Pro** field. A mask written from intuition rather than from the docs will pick up `displayName` and leave the free tier without the author noticing.

**The four cheapest-sounding fields are Enterprise.** Rating, review count, phone number and website URL are exactly what an audit wants, and each one on its own moves a search from $0.00 to $35.00 per thousand.

**One attribute pulls the whole request into Atmosphere.** Asking for `paymentOptions` on a profile fetch costs the same as asking for all thirty attribute fields — but it costs $5.00 per thousand more than asking for none of them.

Two newer fields, `generativeSummary` and `reviewSummary`, are treated here as Atmosphere-tier. That classification was never independently confirmed, because the profile mask it appears in already contains `editorialSummary`, which is unambiguously Atmosphere — the tier is settled before the summaries are considered. If you build a mask containing a summary field and *nothing else* above Pro, verify the tier yourself.

**What to do instead:** Before shipping any mask, sort its fields by tier and ask whether the top one earns its place. Removing a single field is sometimes a 100% cost reduction.

---

## The free search

### LSM-PLACES-04 · An IDs-only field mask on Text Search bills at $0.00

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST places:searchText` with `X-Goog-FieldMask: places.id` and a `locationBias` circle. The response contains `places[]` with an `id` on each entry and nothing else. The billing report shows the line "Places API Text Search Essentials (IDs Only)" at $0.00.

Google lists the Essentials (IDs Only) SKU for Text Search at $0.00 per request. The same endpoint, the same query, the same location bias and the same `maxResultCount` produce a response containing only place identifiers, and that response is free.

Google's SKU table lists an equivalent Essentials (IDs Only) SKU for Nearby Search. That one has not been probed here.

**What to do instead:** Split every search into two questions — *which places, in what order* (free) and *what are they called and how good are they* (billed). Most tools ask both at once out of habit, and pay Enterprise rates for the half they discard.

### LSM-PLACES-05 · The field mask changes the response, not the result set or its order

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-03
**Probe:** Issue two `places:searchText` calls within the same minute, from the same coordinate, with identical bodies, differing only in `X-Goog-FieldMask` — `places.id` on one, `places.id,places.displayName,places.rating` on the other. Diff the two `id` sequences element by element.

Google documents the field mask as a response-shaping mechanism: it selects which fields are returned. It does not document the mask as an input to ranking, and in observation the two calls above return the same place IDs in the same order. This is the load-bearing assumption behind every free rank measurement — if it were false, an IDs-only scan would be measuring a different search than a full-field scan, and the price advantage would be worthless.

It is filed as `UNDOCUMENTED` rather than `WORKS` because Google nowhere *states* that ranking is mask-independent. The observation is reproducible by anyone with a key; the guarantee is not written down anywhere.

**What to do instead:** Run the diff probe yourself before you build a measurement product on it, and re-run it when Google changes the Places pricing structure. A dated observation that contradicts this entry is the most useful thing anyone could send us.

### LSM-PLACES-06 · The search half of a geo-grid scan costs $0.00; only the map render is billed

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** For each grid point, `POST places:searchText` with `X-Goog-FieldMask: places.id`, `maxResultCount: 20` and a `locationBias` circle centred on that point. Find your own place ID in the returned array; its 1-based index is your position at that point. Then read the billing report grouped by SKU.

A geo-grid measures one keyword at many coordinates. Each coordinate needs exactly one thing: the ordered list of place identities the search returned there. Identity is an Essentials field. Rank is the array index. Nothing above the free tier is required to produce the map.

**The full derivation, for a 7×7 grid at 1,000 m spacing.**

A centred grid runs from `−floor(n/2)` to `+floor(n/2)` in both axes, so it has `(2·floor(n/2)+1)²` points. For `n = 7` that is `(2·3+1)² = 49`. (The same formula means an even request rounds up to the next odd square: a "6×6" grid is also 49 points, and a "4×4" is 25. A grid without a centre point cannot be centred on the business.)

| Line item | Requests | SKU | USD / 1,000 | Cost |
| --- | --- | --- | --- | --- |
| Grid searches | 49 | Text Search Essentials (IDs Only) | $0.00 | **$0.0000** |
| Map render the result is drawn on | 1 | Dynamic Maps | $7.00 | **$0.0070** |
| **Total** | | | | **$0.0070** |

Every figure in this entry is list price. The monthly free allowance is per SKU and is applied on top of it.

The same scan with a mask carrying `rating` and `userRatingCount` — the default mask of most search code:

| Line item | Requests | SKU | USD / 1,000 | Cost |
| --- | --- | --- | --- | --- |
| Grid searches | 49 | Text Search Enterprise | $35.00 | **$1.7150** |
| Map render | 1 | Dynamic Maps | $7.00 | **$0.0070** |
| **Total** | | | | **$1.7220** |

The difference is **$1.7150 per scan**, which is 99.59% of the second total. At the first table's rate the map render is the entire bill, and the first 10,000 Dynamic Maps loads each month are free — so for an operator running fewer than 10,000 scans a month, an IDs-only geo-grid programme costs **nothing at all** in Google fees.

At agency scale, 10 clients × 5 keywords × 4 scans per month = 200 scans = 9,800 grid searches per month:

| Mask | Monthly Google cost | Annual |
| --- | --- | --- |
| `places.id` | $0.00 (map loads inside the free allowance) | $0.00 |
| Rich mask (Enterprise) | $343.00 | $4,116.00 |

**What this does not buy.** An IDs-only response contains identities, not names. "You are 4th here" is free; "and the three above you are these businesses" costs one Place Details request per unknown identity, at whatever tier that mask lands on, and Google's terms limit how long you may keep the answer — see [Storing Google data legally](./storing-google-data-legally.md). The honest summary is that **rank is free and competitive identity is not**, which is a good trade if you resolve each competitor once rather than once per scan.

**What to do instead:** Treat the grid search and the competitor lookup as separate purchases. Scan often; resolve identities rarely. Reading what a grid then means is [Reading a geo grid](../03-advanced/reading-a-geo-grid.md).

---

## What Places will not give you at any price

### LSM-PLACES-07 · One Text Search request returns at most 20 places

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST places:searchText` with `maxResultCount: 20` at a dense urban coordinate and count `places[]`. It never exceeds 20.

A rank check built on a single request therefore has a floor, not a range: the possible answers are 1–20 and "not found". "Not found" means *outside the top 20 at this coordinate on this date*, and nothing else — not absent from Google, not unranked, not penalised.

Paging past 20 exists in the API surface, and each additional page is a separate request billed at the same SKU. On a 49-point grid that multiplies the whole scan by the number of pages, which is why deep grids are usually built to record "beyond 20" rather than to chase it.

**What to do instead:** Report the floor explicitly. A heat map cell that means "worse than 20th" should never be rendered in the same visual language as a cell that means "no result", and a client-facing average that silently treats "not found" as 21 is an invented number.

### LSM-PLACES-08 · The Places API returns at most five reviews per place, chosen by Google

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET places/{placeId}` with `X-Goog-FieldMask: reviews` against a place with several hundred reviews. The `reviews[]` array contains at most five, and there is no pagination parameter for it.

The five are Google's selection, not the five most recent and not a random sample. The request is billed at Place Details Enterprise + Atmosphere ($25.00 / 1,000) because `reviews` is an Atmosphere field, so it is simultaneously the most expensive Places call in ordinary use and the thinnest data.

The owner-side path is different in kind: the Business Profile reviews endpoint pages full history 50 reviews at a time, at no charge — see `LSM-GBP-01`.

**What to do instead:** Never compute a rate from Places reviews. Response rate, sentiment mix, review velocity and "reviews mentioning X" are all statistics over a 5-item sample of a population that may number thousands. Compute them from owner data or state the sample size next to every figure. [Why two tools disagree](../03-advanced/why-two-tools-disagree.md) is mostly this problem wearing different hats.

### LSM-PLACES-09 · The owner-written business description is not in the public place record

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET places/{placeId}` with `X-Goog-FieldMask: editorialSummary,generativeSummary` and compare against the same location's `profile.description` read through the owner-side Business Information API.

The public record carries Google's own editorial summary and model-generated summaries. It does not carry the description the owner typed into their profile. The two are different fields with different authors, and no public mask exposes the second one.

**What to do instead:** On a business you do not have owner access to, report the description as **unknown**, never as **missing**. Telling an owner they have no description when they wrote one is the most reliable way to lose a first meeting, and it is a mistake this API makes very easy.

### LSM-PLACES-10 · Text Search excludes pure service-area businesses unless you ask for them, and returns no location when you do

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST places:searchText` for the exact name of a business that hides its address, first with the default body, then with `includePureServiceAreaBusinesses: true`. The first returns nothing; the second returns the place with no `formattedAddress` and no `location`.

A business that hides its street address is invisible to a default Text Search. When the flag is set it becomes visible, but the response carries no address and no coordinates — so anything that geocodes results, measures distance, or plots a grid centre from the search response cannot use it.

**What to do instead:** Route service-area businesses through the owner connection, where the location record exists, and treat their absence from any Text-Search-based tool as an instrument limitation rather than a ranking finding. [Service-area businesses](../03-advanced/service-area-businesses.md) covers the workflow.

### LSM-PLACES-11 · Text Search drops low-prominence businesses that Autocomplete still returns

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-03
**Probe:** Query the exact name of a new or low-review business through `places:searchText`, then through `places:autocomplete` with the same text and location bias. The second returns a `placePrediction` for a business the first omitted entirely.

Text Search ranks by prominence and truncates, so a genuinely existing, publicly visible profile can be absent from its results while the Maps search box finds it instantly. Google does not document a minimum prominence for inclusion.

Autocomplete costs $2.83 per 1,000 against $35.00 for an Enterprise Text Search, so the fallback is also the cheaper call — though resolving a prediction into a usable place record needs a Place Details request, and that is billed normally.

**What to do instead:** Before concluding a business "is not in Google's index", try the name through Autocomplete. Absence from Text Search is evidence about prominence, not about existence.

### LSM-PLACES-12 · A Places photo must be resolved through a billed request before it can be displayed

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET https://places.googleapis.com/v1/{photoName}/media?maxWidthPx=1280&skipHttpRedirect=true`. With the flag it returns JSON `{ "photoUri": "https://lh3.googleusercontent.com/…" }` instead of a 302; that URI loads without an API key.

A place record's `photos` field contains resource names, not image URLs. Each name needs its own media request, billed at Place Details Photos ($7.00 / 1,000), before there is anything to put in an `<img>` tag. Ten photos is ten requests, $0.07, every time the URIs are re-resolved.

`skipHttpRedirect=true` matters for a second reason: it keeps the API key server-side. The 302 path requires the key on the request that the browser would otherwise make.

**What to do instead:** Cache the resolved URI for as long as it stays valid and no longer, and treat photo resolution as a cost that scales with *views* unless you deliberately decouple it from page loads. What you may and may not retain from a place record is in [Storing Google data legally](./storing-google-data-legally.md).

### LSM-PLACES-13 · Autocomplete without a session token bills as a standalone request

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST places:autocomplete` with a body containing only `input` and an optional `locationBias`, and no `sessionToken`. The billing report shows the "Autocomplete Requests" SKU at $2.83 / 1,000.

Per-keystroke autocomplete is the classic way to run up a Maps bill by accident: a ten-character query typed into a naive search box is ten requests, not one.

**What to do instead:** Debounce input, send Autocomplete on a deliberate action rather than on every keystroke, and read `LSM-PLACES-14` before assuming session tokens would have been cheaper.

### LSM-PLACES-14 · Whether session-token Autocomplete is cheaper for an add-a-business flow

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-03
**Probe:** Our Autocomplete calls carry no `sessionToken`, so every one is metered as a standalone request against the $2.83 / 1,000 SKU. The session-based SKUs were never exercised and therefore never observed on a billing report — which is the reason this entry is open rather than answered.

Google publishes a separate session-based billing model in which an Autocomplete sequence followed by a Place Details request is billed as a session rather than per request. Whether that is cheaper depends on how many requests a session contains and on which Place Details tier terminates it — both of which are decided by interface design, not by API behaviour, so there is no general answer.

**What to do instead:** Do not assume either direction. Run the same add-a-business flow twice in one billing month — once with a `sessionToken` threaded from the first keystroke through the terminating Place Details call, once without — then diff the SKU lines. Publish the request counts alongside the totals, because the answer is a function of them.

---

## The half that costs nothing

### LSM-GBP-01 · Business Profile, Search Console, PageSpeed and Ads keyword metrics carry no per-call charge

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Exercise each API below with a connected account, then open Cloud Console → Billing → Reports for the project the credentials belong to. None of them produces a SKU line.

| API | Per-call charge | The real constraint |
| --- | --- | --- |
| Business Profile — accounts, locations, attributes | $0.00 | per-project quota, and access to the API itself is application-gated |
| Business Profile — reviews and review replies (v4) | $0.00 | quota; 50 reviews per page |
| Business Profile Performance — daily metrics, search keywords | $0.00 | quota; and the shape of the endpoint (`LSM-GBP-03`) |
| Local Posts | $0.00 | quota and endpoint validation |
| Search Console — Search Analytics | $0.00 | quota, and row limits per query |
| PageSpeed Insights | $0.00 | quota; unkeyed use is rate-limited harder |
| Google Ads — keyword historical metrics | $0.00 | requires an Ads account and an approved developer token |

Everything an *owner* can read about their own profile is free of charge. Everything a *stranger* reads about a business through Places is billed. The dividing line in the cost model is not the kind of data — it is whether you are authenticated as the business. The three non-profile APIs in the table sit on the free side for their own reasons, but the practical effect is the same: outside Places and the Maps renderers, Google's local-SEO surface area does not bill per call.

**What to do instead:** Connect the profile before optimising the API bill. The single cheapest change available to most local-SEO tooling is moving a data need from the Places side of that line to the owner side: full review history, the owner-written description, real impression counts and the search terms people used are all free, and none of them are purchasable from Places at any price.

### LSM-GBP-02 · One performance call returns the whole daily series

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `fetchMultiDailyMetricsTimeSeries` with every `dailyMetric` requested at once and a `dailyRange` spanning the full available window (we request 548 days). One response contains one series per metric across the entire range.

There is no per-metric call and no per-month call. Profile views, calls, direction requests and website clicks come back together, day by day, in a single unbilled request.

The horizon is set by Google and has moved before; measure it rather than assuming it. What the numbers themselves do and do not count is a separate problem — see [What Google's own reporting hides](./what-googles-reporting-hides.md).

**What to do instead:** Fetch once, slice locally. Any interface that re-calls Google when the user switches from "last 30 days" to "last 90 days" is spending quota to recompute a subset it already holds.

### LSM-GBP-03 · The search-keywords endpoint returns a range aggregate, not a monthly series

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Call the search-keywords impressions endpoint with a 12-month `monthlyRange` and read the result: one impression figure per keyword for the whole range. Then call it twelve times with one-month ranges and read twelve figures per keyword.

The endpoint's name implies a time series and its response is a single aggregate over whatever window you asked for. A real month-by-month trend costs one call per month — and each of those calls may page, so a twelve-month trend is twelve to thirty-six requests.

They are free in dollars. They are not free in quota, and they are not free in latency.

**What to do instead:** Decide up front whether you need the trailing total (one call) or the trend (one call per month), and store the monthly values as you fetch them so the series is built once rather than re-fetched on every view.

---

## AI probes

### LSM-AI-01 · Grounding a Gemini answer in Google Search is billed per grounded prompt at $35.00 / 1,000

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Send a `generateContent` request with the Google Search grounding tool enabled, then read the billing report: the grounding SKU appears as its own line, priced per grounded prompt, separately from token usage.

At $0.035 per grounded prompt, the grounding charge dominates the token charge — by about sevenfold in the example that follows. Using round example token counts rather than measured ones: 250 input tokens and 2,000 output tokens on a model listed at $0.0003 / 1k in and $0.0025 / 1k out is $0.0001 + $0.0050 = **$0.0051** of tokens against **$0.0350** of grounding, so grounding is 87% of the call.

Google publishes a free daily quota of grounded prompts. A single call cannot observe whether that quota is already spent, so any honest cost model bills grounded prompts at the full rate and treats the free quota as an unbudgeted saving.

**What to do instead:** Budget an AI-visibility programme by *number of grounded probes*, not by prompt length. Since a single answer is a sample and any real measurement is a rate over repeated runs, sample size is the entire cost driver. Trimming prompts to save money is optimising the 13%.

### LSM-AI-02 · Server-side web search on the assistant vendors is billed per search, not per token

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Send one request with the vendor's server-side web-search tool enabled and a tool-use cap, then read the usage report: search uses appear as a separate per-search line item alongside input and output tokens.

Anthropic's server-side `web_search` tool and OpenAI's Responses `web_search` tool were both priced at **$10.00 per 1,000 searches** when this was audited on 2026-07-03. A probe that permits three tool uses therefore costs up to **$0.030** in search fees before a single token is counted — more than the token cost of most short probes.

**What to do instead:** Cap tool uses per probe explicitly and treat the cap as the budget lever. And re-verify these two rates before quoting them: model and tool pricing from AI vendors has changed faster than anything else in this chapter, and an AI cost figure more than a quarter old should be treated as folklore.

---

## What is deliberately not in this chapter

**Retention and caching rules.** They change the cost model more than any price does — a workflow that may not cache is a workflow that pays again — but they are terms, not prices. They live in [Storing Google data legally](./storing-google-data-legally.md).

**Write-side limits.** What the API refuses to publish, and how it fails when it refuses, is in [Write limits and failure modes](./write-limits-and-failure-modes.md).

**What the work costs in labour.** API fees are the small half of the budget for almost every engagement. The other half is in [What the work costs](../04-operating/what-the-work-costs.md).

---

**Next:** [The GBP capability matrix →](./gbp-capability-matrix.md)
