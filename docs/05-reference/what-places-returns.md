---
title: What the Places API will and will not give you
sidebar_position: 2
description: The hard limits of Google's public place data — how deep a search reads, how many reviews you get, what is missing, and what owner-only endpoints return.
---

# What the Places API will and will not give you

This chapter is about **capability**, not price: what the public place record contains, what it caps, and what it silently omits. Those limits are the ones that break tools and mislead reports, and they are the same for everybody.

> **On costs.** An earlier version of this chapter published a worked map of Google's SKU pricing and a derivation of how cheaply a rank scan can be run. That has been removed deliberately.
>
> Google publishes its own current prices, and pricing changes often enough that any table here would be wrong before it was useful — [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing) and the [Places API usage-and-billing page](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing) are the sources, and they are the only ones you should build a budget on.
>
> The one structural fact worth carrying is below, because it changes how you read any vendor's costs — including ours.

## The rule that shapes every request

### LSM-PLACES-01 · A Places request is billed by the most expensive field in its mask, not by the endpoint

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Probe:** Issue the same `places:searchText` query twice with different `X-Goog-FieldMask` values and compare the SKUs that appear in the billing report.

Google prices Places API (New) by **field mask**. Every field belongs to a tier, and a request is billed once, at the tier of the most expensive field it asked for. The *number* of fields is irrelevant — thirty cheap fields plus one expensive field is an expensive request.

Two consequences a practitioner should carry:

- **Asking for less genuinely costs less.** A request that asks only what it needs can land in a materially cheaper tier than one that asks for everything "just in case".
- **Two tools doing visibly identical work can have wildly different underlying costs**, purely because of what they request per call. When a vendor's pricing seems impossible, this is usually why — and it is a fair question to ask them.

The current tier membership of each field is published by Google and moves; read it at source rather than trusting any reproduction, including this one.

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

The five are Google's selection, not the five most recent and not a random sample. Asking for `reviews` also promotes the request to the most expensive tier Places has, so this is simultaneously the priciest call in ordinary use and the thinnest data it returns.

**The owner-side path is different in kind:** the Business Profile reviews endpoint pages the full history 50 reviews at a time. Complete history is an owner-connection capability, not something the public record will ever give you.

**What to do instead:** Never compute a rate from Places reviews. Response rate, sentiment mix, review velocity and "reviews mentioning X" are all statistics over a 5-item sample of a population that may number thousands. Compute them from owner data or state the sample size next to every figure. [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md) is mostly this problem wearing different hats.

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

**What to do instead:** Route service-area businesses through the owner connection, where the location record exists, and treat their absence from any Text-Search-based tool as an instrument limitation rather than a ranking finding. [Service-area businesses](../03-advanced/service-area-businesses/index.md) covers the workflow.

### LSM-PLACES-11 · Text Search drops low-prominence businesses that Autocomplete still returns

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-03
**Probe:** Query the exact name of a new or low-review business through `places:searchText`, then through `places:autocomplete` with the same text and location bias. The second returns a `placePrediction` for a business the first omitted entirely.

Text Search ranks by prominence and truncates, so a genuinely existing, publicly visible profile can be absent from its results while the Maps search box finds it instantly. Google does not document a minimum prominence for inclusion.

Autocomplete sits in a cheaper tier than a full Text Search, so the fallback is also the cheaper call — though resolving a prediction into a usable place record needs a Place Details request, which is billed on its own terms.

**What to do instead:** Before concluding a business "is not in Google's index", try the name through Autocomplete. Absence from Text Search is evidence about prominence, not about existence.

### LSM-PLACES-12 · A Places photo must be resolved through a billed request before it can be displayed

**Verdict:** WORKS
**Last verified:** 2026-07-03
**Probe:** `GET https://places.googleapis.com/v1/{photoName}/media?maxWidthPx=1280&skipHttpRedirect=true`. With the flag it returns JSON `{ "photoUri": "https://lh3.googleusercontent.com/…" }` instead of a 302; that URI loads without an API key.

A place record's `photos` field contains resource names, not image URLs. Each name needs its own media request before there is anything to put in an `<img>` tag. Ten photos is ten requests, every time the URIs are re-resolved — which is why resolved URLs are worth caching for as long as Google's terms allow.

**The asymmetry is worth naming.** On a Place Details fetch, *discovering* that a profile has forty photos sits in a much cheaper tier than *showing* any of them. A gallery is priced by what you render, not by what you read.

`skipHttpRedirect=true` matters for a second reason: it keeps the API key server-side. The 302 path requires the key on the request that the browser would otherwise make.

**What to do instead:** Cache the resolved URI for as long as it stays valid and no longer, and treat photo resolution as a cost that scales with *views* unless you deliberately decouple it from page loads. What you may and may not retain from a place record is in [Storing Google data legally](./storing-google-data-legally.md).

### LSM-PLACES-13 · Autocomplete without a session token bills as a standalone request

**Verdict:** WORKS
**Last verified:** 2026-07-03 (probe); Google's session-pricing page read 2026-07-27
**Probe:** `POST places:autocomplete` with a body containing only `input` and an optional `locationBias`, and no `sessionToken`. The billing report shows a standalone "Autocomplete Requests" SKU rather than folding the call into a session.

Per-keystroke autocomplete is the classic way to run up a Maps bill by accident: a ten-character query typed into a naive search box is ten requests, not one.

The same is true of a request that carries a `sessionToken` but is never followed by a Place Details call: Google's session-pricing page states that in that case "Autocomplete (New) requests revert to the per-request pricing model and are billed per the SKU: Autocomplete Requests." An abandoned session is a full-price session.

**What to do instead:** Debounce input and send Autocomplete on a deliberate action rather than on every keystroke. Google also documents a session-token mechanism that changes how a typing session is billed when it ends in a Place Details call — read that on Google's own billing page, which is where the current rules live.

## What the owner-only endpoints return

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

## What is deliberately not in this chapter

**Pricing.** No SKU rates, no per-call costs, no worked cost derivations — see the note at the top. Google's own pricing pages are authoritative and current; anything written here would be neither.

**What any tool charges you.** What a vendor charges is a product decision, not an API fact, and it does not belong in a reference about Google's APIs. That includes ours.
