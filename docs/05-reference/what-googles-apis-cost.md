---
title: What Google's APIs actually cost
sidebar_position: 2
description: Every Google SKU a local-SEO workflow touches, in USD, with the field-mask rule that sets the price — and the full derivation of a $0.00 geo-grid search.
---

# What Google's APIs actually cost

## Scope and sourcing

Every dollar figure below is **Google's own published list price**, in USD, per 1,000 requests, at the 0–100,000-requests-per-month volume tier. The rates were first audited against Google's Places API (New) pricing and SKU-details pages on **2026-07-03**, when the pricing page carried its own last-updated date of **2026-06-29**. They were re-read on **2026-07-27** against a pricing page then stamped **`Last updated 2026-07-20 UTC`**: every Places rate below was unchanged, and several rows previously marked *not audited* were filled in from that second reading.

Three rules govern what is here.

**Rows we have not audited are omitted, not guessed.** Google publishes four price tiers for most Places SKUs and five for Place Details, which alone has an `Essentials` step between IDs-only and Pro. Only the tiers a real workflow lands on were checked line by line, and the rest are marked *not audited* rather than filled in from memory. A price table with one invented row is worse than a short one.

**Nothing here is what any tool charges.** These are input costs — what Google bills the holder of the API key. What a product built on top of them charges is a different question and not this chapter's.

**Prices move.** The March 2025 restructuring changed both the SKU boundaries and the free-tier mechanism for Google Maps Platform. Re-read the SKU table before you quote a number to a client, and carry the date with the figure when you do.

---

## The rule that sets the price

### LSM-PLACES-01 · A Places request is billed at the highest SKU tier any field in its mask belongs to

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `POST https://places.googleapis.com/v1/places:searchText` with an identical body twice — once with `X-Goog-FieldMask: places.id`, once with `X-Goog-FieldMask: places.id,places.rating` — then read Cloud Console → Billing → Reports, grouped by SKU, the following day. Two different SKU lines appear.

Google prices Places API (New) by *field mask*, not by endpoint. Each field belongs to a tier — Essentials (IDs Only), Essentials, Pro, Enterprise, Enterprise + Atmosphere — and a request is billed once, at the tier of the most expensive field it asked for. The number of fields is irrelevant. Thirty Pro fields plus one Enterprise field is an Enterprise request. One Enterprise field alone is the same Enterprise request.

This is the fact that decides the cost of local-SEO tooling, and it is why two tools doing visibly identical work can differ in Google fees by more than a hundredfold — the arithmetic is in `LSM-PLACES-06`.

**What to do instead:** Build a mask per use case, never one shared mask reused everywhere. Ask what the *answer* needs, then delete every field the answer does not use, then check which tier the survivors sit in.

### LSM-PLACES-02 · Published USD rates for the Maps Platform SKUs a local-SEO workflow touches

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Probe:** Open `developers.google.com/maps/billing-and-pricing/pricing` and `.../sku-details`, find the Places API (New) table, and read each row below. Both pages state their own last-updated date; on the 2026-07-27 reading the pricing page read `Last updated 2026-07-20 UTC`.

| SKU (Google's name) | USD / 1,000 | Free per month | What puts a request on it |
| --- | --- | --- | --- |
| Places API Text Search Essentials (IDs Only) | **$0.00** | Unlimited | `places:searchText` whose mask contains only Essentials fields |
| Places API Text Search Pro | **$32.00** | not audited | any Pro field and nothing higher — `places.displayName`, `places.formattedAddress`, `places.location`, `places.types` |
| Places API Text Search Enterprise | **$35.00** | not audited | any Enterprise field in a Text Search mask — `places.rating`, `places.userRatingCount`, `places.nationalPhoneNumber`, `places.websiteUri` |
| Places API Text Search Enterprise + Atmosphere | **$40.00** | not audited | any Atmosphere field on a Text Search mask |
| Places API Nearby Search Enterprise | **$35.00** | not audited | the same Enterprise fields, on `places:searchNearby` |
| Places API Place Details Essentials (IDs Only) | **$0.00** | Unlimited | `GET places/{placeId}` whose mask holds only `attributions`, `id`, `name`, `movedPlace`, `movedPlaceId`, `photos` |
| Places API Place Details Essentials | **$5.00** | 10,000 | `addressComponents`, `addressDescriptor`, `adrFormatAddress`, `formattedAddress`, `location`, `plusCode`, `postalAddress`, `shortFormattedAddress`, `types`, `viewport` |
| Places API Place Details Pro | **$17.00** | not audited | any Pro field and nothing higher |
| Places API Place Details Enterprise | **$20.00** | not audited | `GET places/{placeId}` with an Enterprise field and no Atmosphere field |
| Places API Place Details Enterprise + Atmosphere | **$25.00** | not audited | any Atmosphere field — `reviews`, `editorialSummary`, `paymentOptions`, `parkingOptions`, `allowsDogs`, `serves*` |
| Places API Place Details Photos | **$7.00** | not audited | one resolution of one photo through the photo media endpoint |
| Autocomplete Requests | **$2.83** | 10,000 | `places:autocomplete` outside a billable session — see `LSM-PLACES-14` |
| Autocomplete Session Usage | **$0.00** | Unlimited | Autocomplete requests inside a session that terminates in a Place Details call |
| Dynamic Maps | **$7.00** | 10,000 | one Maps JavaScript map load in a browser |

Google's table writes the free column as `Unlimited` for the rows that never bill, and as a request count for the rest. The four `not audited` cells are not zero and not guessed: the SKU page is the authority for them.

**There is no Nearby Search Essentials (IDs Only) SKU.** Nearby Search publishes Pro, Enterprise and Enterprise + Atmosphere tiers only, so the free-identity trick in `LSM-PLACES-04` is available on `places:searchText` and not on `places:searchNearby`. That asymmetry, and not a preference, is why a cost-controlled geo grid is built on Text Search.

Two structural facts about the money that the table does not show. Volume tiers exist above 100,000 requests per month and the rate falls at each one; every figure here is the top-of-list 0–100,000 rate, which is the tier essentially every agency operates in. And since March 2025 the monthly free allowance is granted **per SKU** rather than as one flat dollar credit across the platform, so "free tier" is a different quantity for every row above — which is why the allowance now has its own column.

**What to do instead:** Cost a workflow by counting *requests per SKU*, not requests. A hundred Text Search Enterprise requests cost $3.50; a hundred Place Details Enterprise requests cost $2.00; a hundred Place Details Enterprise + Atmosphere requests cost $2.50. Same call count, three different bills.

### LSM-PLACES-03 · Which fields promote a Places request to which tier

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Probe:** Compare your `X-Goog-FieldMask` against the per-SKU field lists on Google's SKU-details page, field by field. The most expensive match is your bill.

| Tier | Fields it contains (examples) | Text Search | Place Details |
| --- | --- | --- | --- |
| Essentials (IDs only) | `id`, `name`, `attributions`, `movedPlace`, `movedPlaceId`, `nextPageToken` — plus `photos`, which is IDs-only on Place Details but **Pro** on Text Search | $0.00 | $0.00 |
| Essentials | `formattedAddress`, `addressComponents`, `location`, `plusCode`, `types`, `viewport` — Place Details only; these are **Pro** on Text Search | — | $5.00 |
| Pro | `displayName`, `primaryType`, `primaryTypeDisplayName`, `businessStatus`, `googleMapsUri`, `accessibilityOptions`, `pureServiceAreaBusiness`, `openingDate` | $32.00 | $17.00 |
| Enterprise | `rating`, `userRatingCount`, `nationalPhoneNumber`, `internationalPhoneNumber`, `websiteUri`, `regularOpeningHours`, `priceLevel`, `priceRange` | $35.00 | $20.00 |
| Enterprise + Atmosphere | `reviews`, `editorialSummary`, `paymentOptions`, `parkingOptions`, `allowsDogs`, `delivery`, `takeout`, `dineIn`, `outdoorSeating`, `restroom`, `serves*` | $40.00 | $25.00 |

The two `movedPlace` fields joined the Essentials (IDs Only) list after Places began reporting relocations; they were read off Google's field lists on 2026-07-27 and are the reason a rank tracker can detect a moved profile without leaving the free tier.

**The tier ladders are not the same on both endpoints, and the same field name can sit two tiers apart.** Google's own Place Details field lists, read 2026-07-27, put `formattedAddress`, `location`, `types` and `viewport` in **Place Details Essentials** ($5.00) — while on Text Search the same names are **Pro** ($32.00). `photos` is stranger still: it is in the **Place Details Essentials (IDs Only)** list, which never bills, and in the **Text Search Pro** list, which does. Never carry a tier judgement from one endpoint to the other; read the list for the endpoint you are calling.

Three further traps live in that table.

**`places.name` is not the business name.** In the New API, `name` is the resource name — the string `places/ChIJ…`. The human-readable name is `displayName`, which is a **Pro** field. A mask written from intuition rather than from the docs will pick up `displayName` and leave the free tier without the author noticing.

**The four cheapest-sounding fields are Enterprise.** Rating, review count, phone number and website URL are exactly what an audit wants, and each one on its own moves a search from $0.00 to $35.00 per thousand.

**One attribute pulls the whole request into Atmosphere.** Asking for `paymentOptions` on a profile fetch costs the same as asking for all thirty attribute fields — but it costs $5.00 per thousand more than asking for none of them.

**The AI summary fields are Atmosphere, and this is now confirmed rather than assumed.** An earlier version of this entry treated `generativeSummary` and `reviewSummary` as Atmosphere-tier by inference, on the grounds that the profile mask they appear in already carries `editorialSummary`. On 2026-07-27 both names were found stated outright in Google's Place Details Enterprise + Atmosphere field list, alongside `reviews` and `editorialSummary`. A mask containing a summary field and *nothing else* above Pro is therefore an Enterprise + Atmosphere request at $25.00 per thousand.

**What to do instead:** Before shipping any mask, sort its fields by tier and ask whether the top one earns its place. Removing a single field is sometimes a 100% cost reduction.

---

## The free search

### LSM-PLACES-04 · An IDs-only field mask on Text Search bills at $0.00

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's pricing and SKU pages re-read 2026-07-27
**Probe:** `POST places:searchText` with `X-Goog-FieldMask: places.id` and a `locationBias` circle. The response contains `places[]` with an `id` on each entry and nothing else. The billing report shows the line "Places API Text Search Essentials (IDs Only)", which Google's pricing table marks `Unlimited` in the free column and carries no per-request rate.

Google lists the Essentials (IDs Only) SKU for Text Search as free without a volume cap. The same endpoint, the same query, the same location bias and the same page size produce a response containing only place identifiers, and that response is free.

**Correction, 2026-07-27.** This entry previously stated that Google's SKU table lists an equivalent Essentials (IDs Only) SKU for Nearby Search, unprobed. That was wrong. `places:searchNearby` publishes Pro, Enterprise and Enterprise + Atmosphere tiers only — there is no Nearby Search Essentials row on either the pricing page or the SKU-details page, and the Nearby Search reference documents no IDs-only tier. **A Nearby Search cannot be made free.** Anything that needs free identities has to be expressed as a Text Search.

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
**Probe:** For each grid point, `POST places:searchText` with `X-Goog-FieldMask: places.id`, `pageSize: 20` and a `locationBias` circle centred on that point. Find your own place ID in the returned array; its 1-based index is your position at that point. Then read the billing report grouped by SKU. (Google's Text Search reference, read 2026-07-27, marks the older `maxResultCount` **deprecated in favour of `pageSize`**, and states that if both are sent `pageSize` wins. Existing code sending `maxResultCount` still works; new code should not.)

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

**What this does not buy.** An IDs-only response contains identities, not names. "You are 4th here" is free; "and the three above you are these businesses" costs one Place Details request per unknown identity, at whatever tier that mask lands on. A name alone needs `displayName`, which is a **Pro** field on Place Details — $17.00 per 1,000, so resolving ten unknown competitors is $0.017 once. Adding their rating and review count to the same fetch makes it Enterprise at $20.00. Google's terms also limit how long you may keep the answer — see [Storing Google data legally](./storing-google-data-legally.md). The honest summary is that **rank is free and competitive identity is not**, which is a good trade if you resolve each competitor once rather than once per scan.

**What to do instead:** Treat the grid search and the competitor lookup as separate purchases. Scan often; resolve identities rarely. Reading what a grid then means is [Reading a geo grid](../03-advanced/reading-a-geo-grid.md).

---

## What Places will not give you at any price

### LSM-PLACES-07 · One Text Search request returns at most 20 places

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's Text Search reference re-read 2026-07-27
**Probe:** `POST places:searchText` with `pageSize: 20` at a dense urban coordinate and count `places[]`. It never exceeds 20. Google's Text Search reference states the cap in the same terms: "If `pageSize` is greater than 20, the API will return no more than 20 results per page."

A rank check built on a single request therefore has a floor, not a range: the possible answers are 1–20 and "not found". "Not found" means *outside the top 20 at this coordinate on this date*, and nothing else — not absent from Google, not unranked, not penalised.

Paging past 20 exists in the API surface, and each additional page is a separate request billed at the same SKU. On a 49-point grid that multiplies the whole scan by the number of pages, which is why deep grids are usually built to record "beyond 20" rather than to chase it.

**Paging does not run forever either.** The same reference page, read 2026-07-27, states that "Text Search (New) returns a maximum of 60 results across all pages, although this limit is subject to change." Three pages is the ceiling, so the deepest honest answer a Text Search can give is 1–60 and "not found" — at three times the request count of a single page.

**What to do instead:** Report the floor explicitly. A heat map cell that means "worse than 20th" should never be rendered in the same visual language as a cell that means "no result", and a client-facing average that silently treats "not found" as 21 is an invented number.

### LSM-PLACES-08 · The Places API returns at most five reviews per place, chosen by Google

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET places/{placeId}` with `X-Goog-FieldMask: reviews` against a place with several hundred reviews. The `reviews[]` array contains at most five, and there is no pagination parameter for it.

The five are Google's selection, not the five most recent and not a random sample. The request is billed at Place Details Enterprise + Atmosphere ($25.00 / 1,000) because `reviews` is an Atmosphere field, so it is simultaneously the most expensive Places call in ordinary use and the thinnest data.

The owner-side path is different in kind: the Business Profile reviews endpoint pages full history 50 reviews at a time, at no charge — see `LSM-GBP-31`.

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

Autocomplete costs $2.83 per 1,000 against $35.00 for an Enterprise Text Search, so the fallback is also the cheaper call — though resolving a prediction into a usable place record needs a Place Details request, and that is billed normally. If the Autocomplete call carries a session token and that Place Details request terminates the session, the Place Details request is the *entire* bill (`LSM-PLACES-14`).

**What to do instead:** Before concluding a business "is not in Google's index", try the name through Autocomplete. Absence from Text Search is evidence about prominence, not about existence.

### LSM-PLACES-12 · A Places photo must be resolved through a billed request before it can be displayed

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET https://places.googleapis.com/v1/{photoName}/media?maxWidthPx=1280&skipHttpRedirect=true`. With the flag it returns JSON `{ "photoUri": "https://lh3.googleusercontent.com/…" }` instead of a 302; that URI loads without an API key.

A place record's `photos` field contains resource names, not image URLs. Each name needs its own media request, billed at Place Details Photos ($7.00 / 1,000), before there is anything to put in an `<img>` tag. Ten photos is ten requests, $0.07, every time the URIs are re-resolved.

The asymmetry is worth naming: on a Place Details fetch the `photos` field is itself in the Essentials (IDs Only) list and costs nothing, so *discovering* that a profile has forty photos is free and *showing* any of them is not. A gallery is priced by what you render, not by what you read.

`skipHttpRedirect=true` matters for a second reason: it keeps the API key server-side. The 302 path requires the key on the request that the browser would otherwise make.

**What to do instead:** Cache the resolved URI for as long as it stays valid and no longer, and treat photo resolution as a cost that scales with *views* unless you deliberately decouple it from page loads. What you may and may not retain from a place record is in [Storing Google data legally](./storing-google-data-legally.md).

### LSM-PLACES-13 · Autocomplete without a session token bills as a standalone request

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's session-pricing page read 2026-07-27
**Probe:** `POST places:autocomplete` with a body containing only `input` and an optional `locationBias`, and no `sessionToken`. The billing report shows the "Autocomplete Requests" SKU at $2.83 / 1,000.

Per-keystroke autocomplete is the classic way to run up a Maps bill by accident: a ten-character query typed into a naive search box is ten requests, not one. The same is true of a request that carries a `sessionToken` but is never followed by a Place Details call: Google's session-pricing page states that in that case "Autocomplete (New) requests revert to the per-request pricing model and are billed per the SKU: Autocomplete Requests." An abandoned session is a full-price session.

**What to do instead:** Debounce input, send Autocomplete on a deliberate action rather than on every keystroke — and read `LSM-PLACES-14`, because a session token that actually terminates changes this bill to zero.

### LSM-PLACES-14 · A session token makes the Autocomplete requests free when the session ends in a Pro-or-higher Place Details call

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** `developers.google.com/maps/documentation/places/web-service/session-pricing`, `Last updated 2026-07-20 UTC`. This is a documentary reading, not a billing-report observation — see the caveat below.

Google's session-based billing model has three outcomes, and only one of them is the per-request price:

| How the session ends | The Autocomplete requests bill at | Plus |
| --- | --- | --- |
| A Place Details call asking Pro, Enterprise or Atmosphere fields | **Autocomplete Session Usage** — no charge | the Place Details request at its own tier |
| A Place Details call asking Essentials fields only | the **first 12** at Autocomplete Requests ($2.83 / 1,000); the 13th onward at Autocomplete Session Usage (no charge) | Places API Place Details Essentials |
| Nothing — the user abandons the flow | **Autocomplete Requests**, $2.83 / 1,000, every one | — |

So the earlier framing of this entry — that there was "no general answer" — was too cautious. For an add-a-business flow there *is* one, because such a flow always terminates in a Place Details request carrying at least `displayName`, which is a **Pro** field. In that shape the keystrokes cost nothing and the whole bill is the single terminating fetch. The only design that loses is the one that never resolves a place, and that design was already paying full price without a token.

**The residual uncertainty is narrow and worth stating.** The rule above is read off Google's documentation; it has not been observed on our own billing report, because our Autocomplete calls carry no `sessionToken` and the session SKUs have therefore never been exercised here. Documentation is strong evidence for a published price and weaker evidence for what a meter does.

**What to do instead:** Thread a `sessionToken` from the first keystroke through the terminating Place Details call, and make sure the flow terminates. Then confirm it on your own bill: run the same flow twice in one billing month, once with the token and once without, and diff the SKU lines. Publish the request counts alongside the totals, because the second row of that table is a function of them.

---

## The half that costs nothing

### LSM-GBP-31 · Business Profile, Search Console, PageSpeed and Ads keyword metrics carry no per-call charge

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's Business Profile pricing and prerequisites pages re-read 2026-07-27
**Probe:** Exercise each API below with a connected account, then open Cloud Console → Billing → Reports for the project the credentials belong to. None of them produces a SKU line.
**Source:** for the Business Profile family only, Google's Business Profile APIs pricing page, `Last updated 2025-08-28 UTC`, states it in one sentence: "The Google My Business API is available to registered users at no charge." The Search Console, PageSpeed and Ads rows below rest on the billing-report probe, not on that quote. Access is gated separately — the prerequisites page requires an applicant to "Manage a Google Business Profile that is verified and active for 60+ days", and says the approval shows up as quota: "If your quota is 0 QPM (Queries Per Minute), your project has not yet been approved. If your quota is set to 300 QPM, your project is approved."

| API | Per-call charge | The real constraint |
| --- | --- | --- |
| Business Profile — accounts, locations, attributes | $0.00 | per-project quota, and access to the API itself is application-gated |
| Business Profile — reviews and review replies (v4) | $0.00 | quota; 50 reviews per page |
| Business Profile Performance — daily metrics, search keywords | $0.00 | quota; and the shape of the endpoint (`LSM-GBP-33`) |
| Local Posts | $0.00 | quota and endpoint validation |
| Search Console — Search Analytics | $0.00 | quota, and row limits per query |
| PageSpeed Insights | $0.00 | quota; unkeyed use is rate-limited harder |
| Google Ads — keyword historical metrics | $0.00 | requires an Ads account and an approved developer token |

Everything an *owner* can read about their own profile is free of charge. Everything a *stranger* reads about a business through Places is billed. The dividing line in the cost model is not the kind of data — it is whether you are authenticated as the business. The three non-profile APIs in the table sit on the free side for their own reasons, but the practical effect is the same: outside Places and the Maps renderers, Google's local-SEO surface area does not bill per call.

**What to do instead:** Connect the profile before optimising the API bill. The single cheapest change available to most local-SEO tooling is moving a data need from the Places side of that line to the owner side: full review history, the owner-written description, real impression counts and the search terms people used are all free, and none of them are purchasable from Places at any price.

### LSM-GBP-32 · One performance call returns the whole daily series

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `fetchMultiDailyMetricsTimeSeries` with every `dailyMetric` requested at once and a `dailyRange` spanning the full available window (we request 548 days). One response contains one series per metric across the entire range.

There is no per-metric call and no per-month call. Profile views, calls, direction requests and website clicks come back together, day by day, in a single unbilled request.

The horizon is set by Google and has moved before; measure it rather than assuming it. What the numbers themselves do and do not count is a separate problem — see [What Google's own reporting hides](./what-googles-reporting-hides.md).

**What to do instead:** Fetch once, slice locally. Any interface that re-calls Google when the user switches from "last 30 days" to "last 90 days" is spending quota to recompute a subset it already holds.

### LSM-GBP-33 · The search-keywords endpoint returns a range aggregate, not a monthly series

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** Call the search-keywords impressions endpoint with a 12-month `monthlyRange` and read the result: one impression figure per keyword for the whole range. Then call it twelve times with one-month ranges and read twelve figures per keyword.

The endpoint's name implies a time series and its response is a single aggregate over whatever window you asked for. A real month-by-month trend costs one call per month — and each of those calls may page, so a twelve-month trend is twelve to thirty-six requests.

They are free in dollars. They are not free in quota, and they are not free in latency.

**What to do instead:** Decide up front whether you need the trailing total (one call) or the trend (one call per month), and store the monthly values as you fetch them so the series is built once rather than re-fetched on every view.

---

## AI probes

### LSM-AI-01 · Grounding a Gemini answer in Google Search is billed per grounded prompt, at a rate set by the model generation

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's Gemini API pricing page re-read 2026-07-27
**Probe:** Send a `generateContent` request with the Google Search grounding tool enabled, then read the billing report: the grounding charge appears as its own line, priced per grounded prompt, separately from token usage.
**Source:** `ai.google.dev/gemini-api/docs/pricing`, read 2026-07-27.

**Correction, 2026-07-27.** This entry previously stated the grounding rate flatly as $35.00 / 1,000. That is the Gemini 2.5 rate and not a platform-wide one. Google's pricing page publishes two:

| Model generation | Free allowance | Rate after it |
| --- | --- | --- |
| Gemini 2.5 | "1,500 RPD (free, limit shared with Flash RPD)" | **$35 / 1,000 grounded prompts** |
| Gemini 3 | "5,000 prompts per month (free, shared across Gemini 3)" | **$14 / 1,000 search queries** |

Note that the free allowance is quoted **per day** on 2.5 and **per month** on 3, and that Google's wording changes from "grounded prompts" to "search queries" between them — one is a unit of prompting and one is a unit of searching, and a prompt that triggers several searches is not obviously the same quantity in both. Anything quoting a single grounding rate without naming a model is quoting half a price.

On the Gemini 2.5 rate, the grounding charge dominates the token charge by roughly sevenfold. Using round example token counts rather than measured ones: 250 input tokens and 2,000 output tokens on Gemini 2.5 Flash, listed at $0.30 / 1M in and $2.50 / 1M out, is $0.0001 + $0.0050 = **$0.0051** of tokens against **$0.0350** of grounding, so grounding is 87% of the call. On the Gemini 3 rate the grounding line falls to **$0.0140** per prompt; whether it still dominates depends on that generation's token prices, which were not audited here.

A single call cannot observe whether the free allowance is already spent, so any honest cost model bills grounded prompts at the full rate and treats the free allowance as an unbudgeted saving.

**What to do instead:** Budget an AI-visibility programme by *number of grounded probes*, not by prompt length, and record which model generation the budget assumes. Since a single answer is a sample and any real measurement is a rate over repeated runs, sample size is the entire cost driver. On the 2.5 rate, trimming prompts to save money is optimising the 13%.

### LSM-AI-02 · Server-side web search on the assistant vendors adds a per-search charge on top of tokens, not instead of them

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); vendor pricing re-read 2026-07-27
**Probe:** Send one request with the vendor's server-side web-search tool enabled and a tool-use cap, then read the usage report: search uses appear as their own line — Anthropic reports `usage.server_tool_use.web_search_requests` — alongside input and output tokens.

**Correction, 2026-07-27.** This entry was previously headed "billed per search, not per token", which is wrong in the direction that costs money. Both charges apply. Anthropic's web-search documentation, read 2026-07-27, states it exactly: "Web search is available on the Claude API for **$10 per 1,000 searches**, plus standard token costs for search-generated content. Web search results retrieved throughout a conversation are counted as input tokens, in search iterations executed during a single turn and in subsequent conversation turns." The retrieved pages land in the context window and are billed there, so a search-heavy probe pays twice — and pays the token half again on every later turn of the same conversation.

Anthropic also documents two boundaries worth knowing: "Each web search counts as one use, regardless of the number of results returned," and "If an error occurs during web search, the web search will not be billed."

OpenAI's Responses `web_search` tool read at the same **$10.00 per 1,000 calls** on 2026-07-27, but from secondary sources rather than from the vendor's pricing page, and its treatment of retrieved content as input tokens differs by model — some models bill a fixed block per call. Treat the OpenAI figure as the weaker of the two and verify it against the model you actually call.

A probe that permits three tool uses therefore costs up to **$0.030** in search fees *before* the retrieved pages are counted as input tokens — which, on a long answer, is the larger half.

**What to do instead:** Cap tool uses per probe explicitly and treat the cap as the budget lever, but budget the token side as well: the cap bounds the search fee and not the context it drags in. And re-verify these rates before quoting them — model and tool pricing from AI vendors has changed faster than anything else in this chapter, and an AI cost figure more than a quarter old should be treated as folklore.

---

## What is deliberately not in this chapter

**Retention and caching rules.** They change the cost model more than any price does — a workflow that may not cache is a workflow that pays again — but they are terms, not prices. They live in [Storing Google data legally](./storing-google-data-legally.md).

**Write-side limits.** What the API refuses to publish, and how it fails when it refuses, is in [Write limits and failure modes](./write-limits-and-failure-modes.md).

**What the work costs in labour.** API fees are the small half of the budget for almost every engagement. The other half is in [What the work costs](../04-operating/what-the-work-costs.md).

---

**Next:** [The GBP capability matrix →](./gbp-capability-matrix.md)
