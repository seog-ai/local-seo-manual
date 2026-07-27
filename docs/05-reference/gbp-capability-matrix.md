---
title: The GBP capability matrix
sidebar_position: 3
description: What every Google Business Profile API actually does in 2026 — alive, dead, or never worked — with the probe, the date, and how to tell an empty endpoint from a retired one.
---

# The GBP capability matrix

Google's Business Profile machinery is eight separate v1 APIs plus a legacy v4 remnant that still holds the most valuable capabilities. Parts of it were retired without appearing on Google's own deprecation schedule. Parts of it are documented as retired and answer HTTP 200.

This chapter records what each surface does, what it refuses, the call that establishes it, and the date that call last ran.

Every entry stands alone. Cite it by ID and carry the date.

---

## The matrix

Two tables. The first is the live surface. The second mirrors Google's own deprecation schedule and adds the column Google does not have.

### Table A — the surface, as probed

Hosts are abbreviated: `mybusiness` = `mybusiness.googleapis.com`, `businessinformation` = `mybusinessbusinessinformation.googleapis.com`, `accountmanagement` = `mybusinessaccountmanagement.googleapis.com`, `performance` = `businessprofileperformance.googleapis.com`.

| Surface | Host / version | Carries | Verdict | Last probed | Entry |
| --- | --- | --- | --- | --- | --- |
| Account Management | `accountmanagement` v1 | Accounts list, admins, invitations | WORKS | 2026-07-13 | [LSM-GBP-02](#lsm-gbp-02--account-management-v1-works-and-a-personal-account-has-no-admins-subresource) |
| Business Information | `businessinformation` v1 | Location read/write, categories, hours, service area, `getGoogleUpdated` | WORKS | 2026-07-21 | [LSM-GBP-03](#lsm-gbp-03--business-information-v1-serves-the-whole-location-surface-including-the-per-category-attribute-catalogue) |
| Business Information — attributes | `businessinformation` v1 | Attribute catalogue + values | WORKS | 2026-07-21 | [LSM-GBP-04](#lsm-gbp-04--attributes-are-a-separate-resource--locationspatch-cannot-write-them) |
| Performance | `performance` v1 | 11 daily metrics, monthly search keywords | WORKS | 2026-07-13 | [LSM-GBP-05](#lsm-gbp-05--performance-v1-serves-11-daily-metrics-and-the-published-constraint-on-them-is-quota-not-price) |
| Verifications | v1 | Verification history, `VoiceOfMerchantState` | WORKS | 2026-07-13 | [LSM-GBP-08](#lsm-gbp-08--verifications-v1-exposes-voiceofmerchantstate--the-machine-readable-suspension-signal) |
| Notifications | v1 | Pub/Sub push, six event types | WORKS | 2026-07-13 | [LSM-GBP-09](#lsm-gbp-09--notifications-v1-offers-pubsub-push-for-six-event-types-and-is-silent-until-you-configure-it) |
| Place Actions | v1 | Booking / order action links | OPEN QUESTION | 2026-07-13 | [LSM-GBP-10](#lsm-gbp-10--place-actions-v1-answers-403-service_disabled-on-a-project-where-it-has-not-been-enabled) |
| Lodging | v1 | Hotel attributes | OPEN QUESTION — never probed | — | — |
| **Reviews** | `mybusiness` **v4** | Full history, replies | WORKS | 2026-07-14 | [LSM-REVIEWS-01](#lsm-reviews-01--full-review-history-exists-only-on-the-legacy-v4-api-the-public-places-api-caps-at-five) |
| **Media (photos)** | `mybusiness` **v4** | Photo list / upload / delete | WORKS | 2026-07-21 | [LSM-GBP-15](#lsm-gbp-15--v4-media-is-the-only-photo-write-surface-and-it-uploads-by-a-three-step-bytes-handshake) |
| **Local Posts** | `mybusiness` **v4** | Post CRUD, scheduling, recurrence | WORKS | 2026-07-22 | [LSM-GBP-13](#lsm-gbp-13--v4-localposts-is-alive-and-google-is-still-shipping-features-for-it) |
| **Food menus** | `mybusiness` **v4** | Menu structures | OPEN QUESTION — never probed | — | — |
| Q&A | `mybusinessqanda` v1 | Questions and answers | GONE | 2026-07-13 | [LSM-GBP-12](#lsm-gbp-12--the-qa-api-is-gone-and-google-never-added-it-to-the-deprecation-table) |
| Post insights | `mybusiness` v4 `reportInsights` | Per-post views and clicks | GONE | 2026-07-27 (documentation) | [LSM-GBP-14](#lsm-gbp-14--per-post-metrics-have-no-api-at-all) |
| Business Calls | v1 | Call history | GONE | 2026-07-27 (documentation) | Table B |

The bold rows are the point. **Four of the most commercially valuable capabilities — reviews, photos, posts and menus — live only in the legacy v4 API**, which has no successor and is still receiving features. Anyone who tells you "v4 is deprecated, migrate off it" has not read the FAQ.

### Table B — Google's deprecation schedule, mirrored

Google publishes its deprecation table at `developers.google.com/my-business/content/sunset-dates` with five columns: **Deprecated Resource · Type · Replacement Resource · Support Ended · Discontinuation Date**. Those five are reproduced below as read on **2026-07-27**; the page's own stamp on that read was **`Last updated 2025-08-28 UTC`**.

That stamp is worth pausing on. The schedule has not been touched since August 2025 — which is *before* the Q&A API was discontinued on 2025-11-03. The table is not merely incomplete; it has not been maintained through the most recent retirement on this surface.

The column Google does not have is the last one: **what the endpoint returns when you call it now, and when that call ran**. A deprecation schedule states intent at some past moment. Only a call establishes present state, and the two disagree in both directions on this surface.

| Deprecated Resource | Type | Replacement Resource | Support Ended | Discontinuation Date | **Observed response · last call** |
| --- | --- | --- | --- | --- | --- |
| `accounts.locations.getHealthProviderAttributes` | Method | None | 2024-06-17 | 2024-07-01 | not probed |
| `accounts.locations.updateHealthProviderAttributes` | Method | None | 2024-06-17 | 2024-07-01 | not probed |
| `accounts.locations.insuranceNetworks` | API | None | 2024-06-17 | 2024-07-01 | not probed |
| My Business Business Calls API | API | None | 2023-02-21 | 2023-05-30 | not probed |
| `locations.associate`, `locations.clearLocationAssociation` | Method | None | 2023-02-21 | 2023-05-30 | not probed |
| `accounts.locations.reportInsights` | Method | `locations.fetchMultiDailyMetricsTimeSeries` | 2022-11-21 | 2023-03-30 | replacement WORKS · 2026-07-13 |
| `accounts.locations.localPosts.reportInsights` | Method | None | 2022-11-21 | 2023-02-20 | no replacement exists · [LSM-GBP-14](#lsm-gbp-14--per-post-metrics-have-no-api-at-all) |
| *(absent from Google's table)* | API | None stated | — | 2025-11-03 | **Q&A: GONE** · 2026-07-13 · [LSM-GBP-12](#lsm-gbp-12--the-qa-api-is-gone-and-google-never-added-it-to-the-deprecation-table) |

**This is a selection, not the whole schedule.** On the 2026-07-27 read the page carried roughly two dozen rows. The ones omitted above are almost all individual retired Insights enum values — `QUERIES_DIRECT`, `QUERIES_INDIRECT`, `QUERIES_CHAIN`, `VIEWS_MAPS`, `VIEWS_SEARCH`, `ACTIONS_WEBSITE`, `ACTIONS_PHONE`, `ACTIONS_DRIVING_DIRECTIONS`, `PHOTOS_VIEWS_MERCHANT`, `PHOTOS_VIEWS_CUSTOMERS`, `PHOTOS_COUNT_MERCHANT`, `PHOTOS_COUNT_CUSTOMERS`, `LOCAL_POST_VIEWS_SEARCH`, `LOCAL_POST_ACTIONS_CALL_TO_ACTION` — plus `DrivingDirectionMetricsRequest` / `LocationDrivingDirectionMetrics` and `MediaInsights`. Go and read the page rather than treating the table above as a mirror of it. Three of those omitted rows matter here: `LOCAL_POST_VIEWS_SEARCH` and `LOCAL_POST_ACTIONS_CALL_TO_ACTION` are the post-level metrics themselves, retired individually ([LSM-GBP-14](#lsm-gbp-14--per-post-metrics-have-no-api-at-all)), and `MediaInsights` is the photo-view metric ([LSM-GBP-15](#lsm-gbp-15--v4-media-is-the-only-photo-write-surface-and-it-uploads-by-a-three-step-bytes-handshake)).

Two rows do the work. `localPosts.reportInsights` is the entry whose Replacement Resource is *None* and for which no replacement has appeared since — that is why per-post metrics are unobtainable in 2026. And the last row is not Google's; it is the retirement that Google's deprecation table does not record.

---

## The discrimination technique

### LSM-GBP-11 · An empty endpoint and a retired one are distinguishable by status code alone

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** issue the same authenticated `GET` against a live-but-empty collection (`v4/accounts/{a}/locations/{l}/localPosts` on a location with no posts) and against a retired one, and compare status codes rather than bodies

The single most common mistake when auditing this surface is reading an empty body as a dead endpoint, or a wrong resource name as a retirement. The status code separates seven distinct states, and each has a different fix.

| Observed | What it means | What to do |
| --- | --- | --- |
| `200` with `{}` or an empty array | Alive. The resource is empty. | Nothing. This is a working endpoint with no data. |
| `404` | The path does not exist **as you wrote it** — retired resource group, wrong API version, or a malformed resource name | Verify the resource name before concluding retirement. See [LSM-GBP-17](#lsm-gbp-17--business-information-returns-bare-locationsid-names-and-v4-needs-the-account-segment). |
| `501` `API_UNSUPPORTED` | The API host answers; the method is retired | Stop building. There is no parameter that fixes this. |
| `403` `SERVICE_DISABLED` (with an activation URL) | Alive; not enabled on your Cloud project | Enable the API in the console. One click, not a code change. |
| Quota showing `0 QPM`, or `429` | Alive; your project has no approved quota | Submit the Business Profile API access request. 300 QPM means approved ([LSM-GBP-19](#lsm-gbp-19--approved-quota-is-300-qpm-per-api-per-project-and-0-qpm-means-not-approved)). |
| `400` `INVALID_ARGUMENT` with a field-level message | Alive and validating. Your body is wrong. | Read the field name in the error. Google's validators are more current than Google's docs. |
| `500` `INTERNAL`, reproducing on demand | Alive; the code path behind it is broken or was never finished | Treat as permanent. A deterministic 500 is a property of the endpoint, not of your call. |

The `200`-with-empty-body case is what makes this necessary. On 2026-07-22 a `GET` of `localPosts` against a real connected location returned **HTTP 200 with an empty JSON object** — the location simply had no posts. Third-party guides that describe the Local Posts API as retired were, at that moment, describing an endpoint that answered normally.

**The false positive that catches everyone:** a `404` from a *live* endpoint because the resource name was assembled wrong. v4 requires `accounts/{a}/locations/{l}/…`; Business Information hands you a bare `locations/{l}`. Build the v4 path from that and every call 404s, which looks exactly like a retired API.

**What to do instead:** before recording any endpoint as dead, re-issue the call with a resource name you copied verbatim from the API that produced it, on a project with confirmed quota, with the API enabled. Only a `501` or a 404 that survives all three is evidence of retirement.

---

## The API surface

### LSM-GBP-01 · The Business Profile surface is eight v1 APIs plus a legacy v4 remnant

**Verdict:** WORKS
**Last verified:** 2026-07-13 (probe); documentation re-read and re-confirmed 2026-07-27
**Source:** the Business Profile APIs FAQ at `developers.google.com/my-business/content/faq`, `Last updated 2025-08-28 UTC`, listing the split-out APIs; probe of each host with a `business.manage` token

Google split the old My Business API into eight named services: Account Management, Lodging, Place Actions, Notifications, Verifications, Business Information, Q&A and Business Profile Performance. The FAQ states that what remains is "Google My Business API 4.9, that includes the following important feature API calls: `FoodMenus`, `Media`, `Reviews`, `LocalPosts`".

That sentence is the whole architecture. The v1 APIs got the administrative surface. The revenue-relevant surface — reviews, photos, posts, menus — stayed in v4 and has no announced successor.

**Note on the FAQ itself:** as read on 2026-07-27 it still lists "My Business Q&A API" among the eight current APIs, more than eight months after Google discontinued it ([LSM-GBP-12](#lsm-gbp-12--the-qa-api-is-gone-and-google-never-added-it-to-the-deprecation-table)).

**What to do instead:** design any client with the v4 calls behind a seam. Not because v4 is going away on a known date — nothing says it is — but because the one API carrying your most valuable capabilities is the one with no migration path published.

### LSM-GBP-02 · Account Management v1 works, and a PERSONAL account has no admins subresource

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** `GET accountmanagement/v1/accounts` with a `business.manage` token, then `GET accounts/{a}/admins`

The accounts list returns normally. On an account of type `PERSONAL` the admins and invitations subresources are not usable — there is nothing to administer, because a personal account has exactly one owner.

**Consequence:** agency-style multi-user management (inviting a manager, listing who has access) requires an `ORGANIZATION` account and location groups. If you are building against a personal account you will not discover this from the reference, only from the account you happen to be testing on.

### LSM-GBP-03 · Business Information v1 serves the whole location surface, including the per-category attribute catalogue

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `GET businessinformation/v1/{account}/locations?readMask=…` and `PATCH businessinformation/v1/locations/{l}?updateMask=…`

Read and write both work: title, categories, regular and special hours, `openInfo`, phone numbers, website, `serviceArea`, `serviceItems`, `profile.description`, plus `locations.getGoogleUpdated` — which returns Google's own version of the location so you can diff it against yours and see what Google changed underneath you.

The category taxonomy and the attribute metadata list are served from the same API. On the probed category, 39 attributes were available and 4 were set — a ratio worth internalising, because most profiles leave most of their category's attributes unset.

**What to do instead:** always send an explicit `updateMask`. A patch without one is the fastest way to blank fields you did not intend to touch.

### LSM-GBP-04 · Attributes are a separate resource — `locations.patch` cannot write them

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `GET businessinformation/v1/locations/{l}/attributes`, then `PATCH .../attributes?attributeMask={ids}`

Attributes look like fields on the location and are not. They are read at `locations/{l}/attributes`, written with a dedicated `updateAttributes` PATCH carrying an `attributeMask`, and the catalogue of what is even offered comes from a third call (`attributes?parent=locations/{l}`) that varies by category.

The mask has a semantic that costs people data: **an attribute id present in `attributeMask` but absent from the request body is unset.** That is the documented way to clear a value, and it is also how a partial write silently deletes attributes you did not mean to remove.

**What to do instead:** read the current values immediately before writing, and include in the mask only the ids you are deliberately changing. The read-before-write is also the only way to build a working undo, since Google returns no previous state.

### LSM-GBP-05 · Performance v1 serves 11 daily metrics, and the published constraint on them is quota, not price

**Verdict:** WORKS
**Last verified:** 2026-07-13 (probe); enum re-read against the reference 2026-07-27
**Probe:** `GET performance/v1/locations/{l}:fetchMultiDailyMetricsTimeSeries` with a 90-day range and every `dailyMetrics` value
**Source:** `DailyMetric` enum reference, `Last updated 2024-10-16 UTC` — twelve enum values, of which one is the `DAILY_METRIC_UNKNOWN` sentinel

Eleven metrics exist, not counting the `DAILY_METRIC_UNKNOWN` sentinel:

| Metric | Counts |
| --- | --- |
| `BUSINESS_IMPRESSIONS_DESKTOP_MAPS` | Impressions on Maps, desktop |
| `BUSINESS_IMPRESSIONS_DESKTOP_SEARCH` | Impressions on Search, desktop |
| `BUSINESS_IMPRESSIONS_MOBILE_MAPS` | Impressions on Maps, mobile |
| `BUSINESS_IMPRESSIONS_MOBILE_SEARCH` | Impressions on Search, mobile |
| `WEBSITE_CLICKS` | Website button clicks |
| `CALL_CLICKS` | Call button clicks |
| `BUSINESS_DIRECTION_REQUESTS` | Direction requests |
| `BUSINESS_CONVERSATIONS` | Message conversations received |
| `BUSINESS_BOOKINGS` | Bookings via Reserve with Google |
| `BUSINESS_FOOD_ORDERS` | Food orders from the profile |
| `BUSINESS_FOOD_MENU_CLICKS` | Menu interaction clicks |

Google publishes no per-call price for the Business Profile APIs: the usage-limits page states the constraint as queries per minute and per day, and there is no SKU table for this family the way there is for the Maps Platform APIs. The binding constraint is quota, not money — the opposite of the Places API on the public side. *(Inference: absence of a published rate is not the same as a written guarantee that the surface is free, and we have not found a Google sentence saying so in terms.)*

**Stale-stamp warning:** the `DailyMetric` reference page carried `Last updated 2024-10-16 UTC` when read on 2026-07-27. Age of the page is not evidence the enum changed, but it is a reason to enumerate the values from a live call rather than from the page.

**What to do instead:** the four impression metrics are usually summed into one "profile views" series for reporting. Do that explicitly and say so in the report, because a client comparing your number to the one in Google's own interface will otherwise find four numbers where you showed one.

### LSM-GBP-06 · The "monthly" search-keywords endpoint returns one range aggregate per keyword, not a monthly series

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-14
**Probe:** `GET performance/v1/locations/{l}/searchkeywords/impressions/monthly` with `monthlyRange.start_month` and `end_month` three months apart, then count the values returned per keyword

The endpoint is named `monthly` and takes a `monthlyRange`. It does not return one value per month. It returns **one aggregate over the whole requested range, per keyword**. A three-month request yields one number, not three.

Any tool that renders that single number as a monthly trend line is fabricating the shape of the series. This is the most commonly mis-implemented endpoint in the family, and the mistake is invisible — the chart looks fine.

**What to do instead:** to obtain a true month-by-month series, issue **one request per month**, each with a `monthlyRange` of exactly that month, and stitch the results. An aggregate over a single month *is* that month's value. The cost is one call per month per location, so it belongs behind a deliberate user action rather than a page load.

### LSM-GBP-07 · Low-volume search-keyword values come back thresholded, not exact

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** the same `searchkeywords/impressions/monthly` call on a low-volume location; inspect `insightsValue` for `threshold` rather than `value`

Below a privacy floor, Google returns a threshold instead of a count — the value is expressed as "fewer than N", not as a number. Both shapes arrive in the same field position, so a client that reads the field naively converts "fewer than 15" into "15".

**Consequence:** a keyword report built from thresholded values overstates low-volume terms, and the error is systematic rather than random — it always rounds up, and it hits exactly the long-tail keywords that people are most excited to discover.

**What to do instead:** carry the thresholded flag through to the interface and render it as `<N`. If a total is computed across thresholded rows, label the total as an upper bound.

### LSM-GBP-08 · Verifications v1 exposes `VoiceOfMerchantState` — the machine-readable suspension signal

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** `GET v1/locations/{l}/VoiceOfMerchantState` and `GET v1/locations/{l}/verifications`

Verification history is readable, and alongside it sits `VoiceOfMerchantState`, which reports whether the location currently has control of its own profile. It is the closest thing to a programmatic "are we suspended?" check that exists.

**What to do instead:** poll it on connect and on any unexplained drop in impressions. A suspension discovered from a client's phone call is a suspension discovered several days late.

### LSM-GBP-09 · Notifications v1 offers Pub/Sub push for six event types, and is silent until you configure it

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** `GET v1/accounts/{a}/notificationSetting` — returns successfully with no topic configured

Six event types are available: `NEW_REVIEW`, `UPDATED_REVIEW`, `GOOGLE_UPDATE`, `NEW_CUSTOMER_MEDIA`, `DUPLICATE_LOCATION`, `VOICE_OF_MERCHANT_UPDATED`. The setting is per account, and until you PATCH a Pub/Sub topic onto it, nothing is delivered and the endpoint reports exactly that.

`GOOGLE_UPDATE` is the interesting one: it fires when Google changes the profile itself, which — paired with `locations.getGoogleUpdated` ([LSM-GBP-03](#lsm-gbp-03--business-information-v1-serves-the-whole-location-surface-including-the-per-category-attribute-catalogue)) — makes an unrequested edit detectable within minutes rather than at the next audit.

**What to do instead:** push, not polling. With a hard cap of 300 QPM per API per project, polling a portfolio of locations for new reviews burns quota that a single subscription would not.

### LSM-GBP-10 · Place Actions v1 answers 403 `SERVICE_DISABLED` on a project where it has not been enabled

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-13
**Probe:** call any Place Actions v1 method on a project where the API has not been enabled in the Cloud console

The response is a `403` naming `SERVICE_DISABLED`, with an activation URL — the signature of a live API that is simply not switched on for your project, not of a retired one ([LSM-GBP-11](#lsm-gbp-11--an-empty-endpoint-and-a-retired-one-are-distinguishable-by-status-code-alone)).

This is an OPEN QUESTION rather than a WORKS because **we have not exercised the API after enabling it.** What is established is the shape of the refusal; what is not established is whether booking and order action links behave as documented once the switch is flipped.

**What would settle it:** enable Place Actions on a project with approved quota, create a booking action link on a real location, and confirm it appears on the profile. If you run that, the result is worth sending in.

### LSM-GBP-12 · The Q&A API is gone, and Google never added it to the deprecation table

**Verdict:** GONE
**Last verified:** 2026-07-13 (probe); Google's pages re-read and re-confirmed 2026-07-27
**Probe:** any `mybusinessqanda/v1` method with a valid token → `501` `API_UNSUPPORTED`
**Source:** Q&A API change log at `developers.google.com/my-business/content/qanda/change-log`, `Last updated 2025-11-06 UTC`. Entry **v1: 2025-11-03**: "The My Business Q&A API was discontinued on November 3, 2025. You can no longer read or post questions and answers using the API." The same log's earlier entry **v1: 2025-09-15** gave the notice: "On November 3, 2025, we will be discontinuing the My Business Q&A API as we are in the process of updating the Q&A functionality and user experience."

The discontinuation is real and Google states it plainly — on the Q&A API's own change log, twice, with seven weeks' notice. It does **not** appear on the deprecation schedule at `content/sunset-dates`, whose most recent Discontinuation Date is 2024-07-01 and whose own page stamp on 2026-07-27 was `Last updated 2025-08-28 UTC` — six weeks before Google even announced the retirement. The Business Profile APIs FAQ, read the same day, still lists "My Business Q&A API" among the eight current APIs. So does the Q&A API's own REST reference, `Last updated 2024-10-16 UTC`, which carries no retirement notice at all: only the change log records it.

So four of Google's own pages disagree about whether this API exists. The change log is the correct one, and it is the *only* one that is correct.

This matters beyond Q&A. It is the demonstration that **the deprecation schedule is not a complete record of retirements**, which means an endpoint's absence from that table is not evidence it is alive.

**What to do instead:** treat per-API change logs as the authority and the deprecation schedule as a partial index. Any tool or client deliverable that still promises Q&A monitoring through the API is describing something that stopped existing.

**Open on the consumer side.** The API retirement is settled. What happened to the *panel* on public profiles is not, at least not from a Google source we can cite. Third-party accounts consistently report that the questions-and-answers panel began disappearing from Search and Maps around 3 December 2025, replaced by a Gemini-powered "Ask" / "Ask Maps" experience with no API behind it. We have found no Google announcement, help-centre page or change log fixing that date. Treat the December date as reported rather than established, and treat the direction of travel — panel replaced by generative answers — as well attested but undated by Google. **What would settle it:** a Google help-centre or Search/Maps blog post naming the consumer rollout date.

### LSM-GBP-13 · v4 `localPosts` is alive, and Google is still shipping features for it

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** `GET mybusiness/v4/accounts/{a}/locations/{l}/localPosts` with a stored `business.manage` token → HTTP 200, empty object (location had no posts)
**Source:** `accounts.locations.localPosts` reference, `Last updated 2026-04-15 UTC` (enums re-read 2026-07-27); Google My Business API change log, `Last updated 2026-07-24 UTC`

Local Posts is routinely described as retired. It is not. The endpoint answers, the reference page carried `Last updated 2026-04-15 UTC`, and the v4 change log records a **new** capability shipped on 2026-04-07: "You can now schedule recurring posts by setting RecurrenceInfo when creating a LocalPost", with daily, weekly and monthly occurrence patterns and an optional `seriesEndTime`.

`LocalPostState` values are `LIVE`, `PROCESSING`, `REJECTED`, `SCHEDULED` and `RECURRING`, plus the `LOCAL_POST_STATE_UNSPECIFIED` sentinel. Topic types are `STANDARD`, `EVENT`, `OFFER` and `ALERT`, plus `LOCAL_POST_TOPIC_TYPE_UNSPECIFIED`; `ALERT` is documented as "High-priority, and timely announcements related to an ongoing event. These types of posts are not always available for authoring". There is no product topic type in the enum, so product posts are not creatable through the API at all.

Call-to-action types are `BOOK`, `ORDER`, `SHOP`, `LEARN_MORE`, `SIGN_UP` and `CALL`, plus the `ACTION_TYPE_UNSPECIFIED` sentinel. `url` is required on every type **except** `CALL`, where it must be unset — `CALL` uses the profile's verified phone number.

*Correction, 2026-07-27:* an earlier version of this entry listed a deprecated `GET_OFFER` action type. On a re-read of the reference dated 2026-04-15, `GET_OFFER` **does not appear in the `ActionType` enum**. It is present in older copies of the reference and in third-party material, and the `OFFER` topic type covers the use case. Treat `GET_OFFER` as removed from the current enum rather than as a deprecated-but-present value; if you have a live response containing it, that observation would change this paragraph.

**What to do instead:** stop citing the "Local Posts API was retired in 2022" pages; a page making that claim was still ranking in July 2026. The write-side failure modes — character limits, media restrictions, rejection triggers — are in [write limits and failure modes](./write-limits-and-failure-modes.md).

### LSM-GBP-14 · Per-post metrics have no API at all

**Verdict:** GONE
**Last verified:** 2026-07-27 (documentation); no replacement found on any probe since 2026-07-13
**Source:** Google's deprecation schedule (`content/sunset-dates`, page stamp `Last updated 2025-08-28 UTC`, re-read 2026-07-27), row `accounts.locations.localPosts.reportInsights` — Type `Method`, Replacement Resource **None**, Support Ended 2022-11-21, Discontinuation Date **2023-02-20**. The same schedule separately retires the two post-level metric values, `LOCAL_POST_VIEWS_SEARCH` and `LOCAL_POST_ACTIONS_CALL_TO_ACTION`.

`reportInsights` for local posts was discontinued on 2023-02-20 with no replacement, and none has appeared. The Business Profile Performance API that replaced location-level insights has **zero post-level metrics** — none of the 11 values in its `DailyMetric` enum is scoped to a post ([LSM-GBP-05](#lsm-gbp-05--performance-v1-serves-11-daily-metrics-and-the-published-constraint-on-them-is-quota-not-price)). That is a two-sided confirmation: the old metrics are on the retirement schedule, and the new enum does not contain replacements for them.

What a post exposes through the API is its `state` and a `searchUrl`. Views, clicks and CTA taps are not obtainable programmatically in 2026, by anybody.

**What to do instead:** do not promise post performance reporting, and be suspicious of any tool that shows it — the number is either from the Business Profile interface (typed in by a human, or scraped) or invented. Report posts as an activity count with the profile-level metric series alongside, and say plainly that per-post attribution is not available.

### LSM-GBP-15 · v4 media is the only photo-write surface, and it uploads by a three-step bytes handshake

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `POST v4/accounts/{a}/locations/{l}/media:startUpload` → `POST {upload host}/upload/v1/media/{resourceName}?upload_type=media` with raw bytes → `POST v4/accounts/{a}/locations/{l}/media` with `dataRef.resourceName`

Photos are written only through v4. There is no media surface on any v1 API. The upload is three calls: reserve a slot, PUT the bytes against the returned reference, then create the media item citing that reference and a `locationAssociation` category.

Notably, this path needs **no publicly reachable staging URL** — the bytes go directly to Google. That is the opposite of how post media works, and the difference trips people who assume one media model.

Listing media returns `name` and `googleUrl` per item. The probe saw **no** `insights.viewCount` on returned media items — consistent with Google's deprecation schedule, which carries a `MediaInsights` row.

**What to do instead:** do not promise per-photo view counts. And when building an undo, capture the created media resource names at upload time — deletion is by name, and there is no other way to identify which photos a given action added.

### LSM-GBP-16 · Post `scheduledTime` is writable — Google publishes at the instant itself

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a `localPost` with a future RFC 3339 `scheduledTime` → HTTP 200, value echoed back, state `SCHEDULED`; delete the post → the schedule is cancelled

The reference describes `scheduledTime` as "If set, determines when a post will be published. This can be set by the user to schedule posts in advance." The probe confirms it is accepted on create and honoured — the post sits in `SCHEDULED` and Google publishes it.

Scheduled posts are moderated **up front**: they move `PROCESSING` → `SCHEDULED`, and can be `REJECTED` before the publish time ever arrives.

**What to do instead:** never build a queue-and-publish-later job for Google posts. A background publisher adds a failure mode, a clock dependency and an unattended write to somebody's profile, in exchange for a capability Google already provides. Set `scheduledTime` and let Google hold it.

### LSM-GBP-17 · Business Information returns bare `locations/{id}` names, and v4 needs the account segment

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-14
**Probe:** list locations via `businessinformation/v1/{account}/locations`, inspect `name` on each returned location, then attempt any v4 call built from that `name`

Business Information returns location resource names as bare `locations/{id}`. Every v4 call — reviews, media, posts — requires `accounts/{a}/locations/{l}/…`. The owning account is therefore **not recoverable from the location name by string manipulation**, and any attempt to derive it produces a path that 404s on every v4 endpoint.

This is the single most expensive gotcha on the surface, because the symptom is indistinguishable from a retired API. A whole integration can look "dead" when what is wrong is a missing path segment.

**What to do instead:** thread the owning account through from the `accounts.list` response that produced the location list, and persist it with the connection. When a stored connection lacks it, re-resolve by listing accounts rather than guessing — and never assume `accounts[0]`, which silently succeeds against the wrong account on any multi-account user. A `2xx` write against the wrong account is worse than a failure: it reports success and nothing appears.

### LSM-GBP-18 · Profile edits are capped at 10 per minute per profile and the cap cannot be raised

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Business Profile APIs usage limits at `developers.google.com/my-business/content/limits`, `Last updated 2026-05-07 UTC`, re-read 2026-07-27 — Business Information API: "10 per minute per Google Business Profile (cannot be increased)"

Alongside it on the same page: Create Location requests 300 QPD, `SearchGoogleLocation` requests 300 QPD, Update Location requests 10000 QPD. Every other listed API — Account Management, Performance, Verifications, Lodging, Place Actions, Notifications — sits at 300 QPM. The 10-edits-per-minute ceiling is the only limit on the page Google marks as non-increasable.

**Consequence:** bulk profile work is rate-limited by construction. A ten-field fix applied across a portfolio cannot be pushed in a burst, and a client that tries will get refusals partway through a batch — leaving the profile half-edited unless the caller tracks what landed.

**What to do instead:** enforce the cap on your side before the call, per location, and make partial application recoverable. Discovering Google's ceiling by hitting it means discovering it in the middle of a write.

### LSM-GBP-19 · Approved quota is 300 QPM per API per project, and 0 QPM means not approved

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Business Profile APIs prerequisites at `developers.google.com/my-business/content/prereqs`, `Last updated 2025-08-28 UTC`, re-read 2026-07-27: "If your quota is 0 QPM (Queries Per Minute), your project has not yet been approved." … "If your quota is set to 300 QPM, your project is approved."

Quota is per API, per project. Approval is not automatic on enabling the API — it is a separate request, and until it is granted every call fails in a way that reads like a broken integration.

**Consequence:** a project can have an API enabled, a valid token, correct resource names, and still fail every call. Check the quota page before debugging anything else.

**What to do instead:** confirm 300 QPM on **each** API you intend to call. Approval on one does not grant it on the others — a project approved for Business Profile generally but showing 0 QPM on Account Management cannot list accounts, and therefore cannot build a single v4 path ([LSM-GBP-17](#lsm-gbp-17--business-information-returns-bare-locationsid-names-and-v4-needs-the-account-segment)).

### LSM-GBP-20 · Pure service-area businesses carry no `storefrontAddress` and no `latlng`

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Probe:** `GET businessinformation/v1/{account}/locations` with a `readMask` including `storefrontAddress,serviceArea,latlng` against a hidden-address business

Both fields are simply absent. `serviceArea.places.placeInfos` carries the declared service areas instead, each with a `placeName` and a `placeId`. The absence is data, not an error, and it is the normal state for a plumber, a mobile mechanic or an agency working from home.

**Consequence:** any code path that assumes a location has coordinates will either crash or — far worse — substitute `0, 0`, which is a real point in the Gulf of Guinea. Every geographic feature built on that value silently produces nonsense.

**What to do instead:** never persist `0, 0`. Derive an anchor point from the first declared service area, or ask the operator for a base location. And note the separate consequence on the public side: hidden-address businesses are excluded from Places text search unless the request explicitly opts them in, which is why they are effectively invisible to conventional rank tracking — see [service-area businesses](../03-advanced/service-area-businesses.md).

### LSM-GBP-21 · `Metadata.canOperateLocalPost` tells you in advance whether a location may post

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Business Information `locations` reference, `Last updated 2024-10-16 UTC` (re-read 2026-07-27): `Metadata.canOperateLocalPost` — "Indicates if the listing can manage local posts." The whole `Metadata` object is output-only.

Some locations cannot use the Local Posts API at all. Locations Google internally detects as chains are refused with the error code `LOCATION_DISABLED_FOR_LOCAL_POST_API`. Almost nobody checks first, because the flag is buried in `Metadata` and most `readMask` values omit it.

The same `Metadata` object also carries `canDelete` — "Indicates whether the location can be deleted using the API" — and `placeId`, "If this location appears on Google Maps, this field is populated with the place ID for the location", which is the only bridge between the owner surface and Places-keyed data.

**What is settled and what is not:** the flag and the error code are documented. The **trigger** is not. The widely repeated "more than ten locations makes you a chain" threshold appears in no Google document we can find; treat it as community lore, and treat the flag as the only reliable answer. That half is an open question — see [LSM-GBP-22](#lsm-gbp-22--the-chain-detection-threshold-behind-location_disabled_for_local_post_api-is-not-published).

**What to do instead:** include `metadata` in your `readMask` and check `canOperateLocalPost` before offering a posting interface. Telling an operator their post failed is a much worse experience than telling them up front that Google does not allow posting on their profile.

### LSM-GBP-22 · The chain-detection threshold behind `LOCATION_DISABLED_FOR_LOCAL_POST_API` is not published

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Probe:** none that succeeded — we have the documented error code and the `canOperateLocalPost` flag, and no reproduction of the condition that sets it

Google documents the error code. Google does not document what makes a location a "chain" for this purpose. The commonly cited figure — ten or more locations — is repeated across third-party guides with no primary source, and the flag demonstrably applies to some brands below any such count *(inference, from scattered forum reports; we have not reproduced it)*.

**What would settle it:** a set of accounts of known location counts, each checked for `canOperateLocalPost`, with the counts and outcomes published. That is a study anybody with a multi-location portfolio can run, and nobody appears to have run it.

**What to do instead:** do not predict eligibility from location count. Read the flag.

### LSM-GBP-23 · The 750-character profile description limit is not in the API reference

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Probe:** read the Business Information `locations` reference `Profile.description` field description; we have **not** probed the boundary with an oversized value

The reference, `Last updated 2024-10-16 UTC`, describes the field as "Required. Description of the location in your own voice, not editable by anyone else." **It states no character limit.** The 750-character figure that every third-party guide and every tool enforces comes from Google's help centre and from convention, not from the API reference.

This is exactly the shape of a fact that turns out to be true and undocumented, or false and universally repeated. We enforce 750 defensively and have not established it.

**What would settle it:** `PATCH …/locations/{l}?updateMask=profile.description` with a 751-character body, and again at 800 and 1,000. Record the status code and the verbatim error message. If it is a field-level `INVALID_ARGUMENT` naming a maximum, that maximum is the answer.

**What to do instead:** truncate at 750 until somebody probes it. Compare with [LSM-REVIEWS-05](#lsm-reviews-05--the-review-reply-cap-is-4096-bytes-not-4096-characters), where the reference does state a limit and states it in bytes.

### LSM-GBP-24 · There is no compliant path to AI-generated profile or post imagery

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-27
**Source:** Maps User Generated Content Policy Help, "Tips for posting media to Maps" (`support.google.com/contributionpolicy/answer/7411351`), re-read 2026-07-27: "Use media that you captured. Upload media of a place that you captured using a camera. Avoid screenshots, stock photos, GIFs, collages, heavily edited or otherwise manipulated photos, or imagery created by other parties." Business Profile photo requirements (`support.google.com/business/answer/6103862`), same read: "The photo should be in focus and well lit, and have no significant alterations or excessive use of filters. In other words, the image should represent reality."

The media APIs will accept the bytes. That is not the question. The policy requires media *you captured with a camera* and explicitly excludes imagery created by other parties, and requires that the image represent reality. A generated image satisfies neither clause.

The technical requirements from the photo-requirements page, re-confirmed verbatim on 2026-07-27 and worth having: **"JPG or PNG"; "Between 10 KB and 5 MB"; minimum "250 px tall, 250 px wide"; recommended "720 px tall, 720 px wide".** Video: **"Up to 30 seconds long", "Up to 75 MB", "720p or higher".**

**Open on enforcement:** whether Google detects and auto-rejects generated imagery, and how, is not established. Community reports describe rejections; we have not reproduced one and have no mechanism to cite *(inference)*.

**What to do instead:** photograph the place. If a business has no usable photos, that is a task for the engagement, not a problem to route around with a generator. This is our reading of published policy, not legal advice; the retention and attribution obligations that attach to Google media are in [storing Google data legally](./storing-google-data-legally.md).

---

## Reviews

### LSM-REVIEWS-01 · Full review history exists only on the legacy v4 API; the public Places API caps at five

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** `GET mybusiness/v4/accounts/{a}/locations/{l}/reviews?pageSize=50`, following `nextPageToken` — compare the count with the `reviews[]` array from a Places API `places/{id}` request
**Source:** Places API (New) `Place` reference, `reviews` field, re-read 2026-07-27: "List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned."

Two access paths, and the gap between them is the largest single difference between owning a profile and observing one.

| Path | Auth | Reviews returned | Replies | Sort |
| --- | --- | --- | --- | --- |
| Places API (New) | API key, public | **Maximum 5** — "List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned." | Not exposed | By relevance |
| My Business v4 | OAuth `business.manage`, owner | Full history, paginated at 50 per page | `reviewReply` object per review | Newest first |

The v4 response also carries `totalReviewCount` and `averageRating` for the location — Google's own authoritative totals, which is the only trustworthy denominator for a response-rate metric.

**What to do instead:** never compute a reply rate, a rating trend or a review-velocity figure from the public path. Five relevance-sorted reviews are a sample chosen by Google for display, not a sample drawn for measurement, and a response rate computed over them is meaningless. Without owner access, report review counts and rating from the profile's own totals and mark everything else unknown.

### LSM-REVIEWS-02 · A review reply `PUT` can return 2xx without the reply appearing

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-14
**Probe:** `PUT v4/accounts/{a}/locations/{l}/reviews/{id}/reply`, then immediately `GET v4/accounts/{a}/locations/{l}/reviews/{id}` and inspect `reviewReply`

The write can succeed at the HTTP level and the reply can still not be visible. The reproducible cause is a resource-name mismatch: a reply addressed to the wrong account or location segment can return a success status ([LSM-GBP-17](#lsm-gbp-17--business-information-returns-bare-locationsid-names-and-v4-needs-the-account-segment)). Verification state and moderation are further causes ([LSM-REVIEWS-04](#lsm-reviews-04--owner-replies-are-moderated-and-can-be-rejected)).

There is exactly one trustworthy proof that a reply published: **read the review back and find your text in `reviewReply`.**

**What to do instead:** treat every reply as a two-call operation — write, then read back — and surface the confirmation state to whoever pressed the button. A "sent" tick driven by a 200 is a promise the status code does not make. Log the exact resource path you wrote to; when a reply goes missing, that log is the difference between a five-minute diagnosis and a week of guessing.

### LSM-REVIEWS-03 · Reviews cannot be deleted through the API — only replies can

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-27
**Source:** `accounts.locations.reviews` reference, `Last updated 2026-07-24 UTC` — the resource exposes exactly four methods: `deleteReply`, `get`, `list`, `updateReply`

There is no `delete` on a review. There never has been. The only deletion available to an owner is removing their own reply.

**Consequence:** every product claiming programmatic removal of a review is describing either the consumer flagging flow (a human report, adjudicated by Google, usually rejected) or something that does not exist.

**What to do instead:** flag policy-violating reviews through the Business Profile interface and treat the outcome as uncertain. Removal is not a capability you can promise a client, and the [spam and fake listings](../03-advanced/spam-and-fake-listings.md) chapter covers what the flagging path actually achieves.

### LSM-REVIEWS-04 · Owner replies are moderated and can be REJECTED

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** `accounts.locations.reviews` reference, `Last updated 2026-07-24 UTC`; v4 change log entries dated 2026-04-01 (`ReviewReplyState` retrievable) and 2026-07-01 (`PolicyViolation` included in `ReviewReply` for rejected replies)

A reply has a moderation state — `PENDING`, `REJECTED` or `APPROVED` — exposed as `reviewReplyState`. When rejected, `policyViolation` is populated: "Optional. Output only. The policy violation that resulted in rejection. Only populated if reviewReplyState is REJECTED."

**Established from Google's reference, not from a probe.** We have not induced a rejection, and our own client predates both fields and does not read them. How often replies are rejected, and for what, is an open question.

**What to do instead:** read `reviewReplyState` after publishing rather than assuming an accepted write is an approved reply. A reply sitting in `PENDING` is not visible to customers, and a `REJECTED` one never will be — with a machine-readable reason attached that most tooling currently throws away.

### LSM-REVIEWS-05 · The review reply cap is 4,096 **bytes**, not 4,096 characters

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** `accounts.locations.reviews` reference, `Last updated 2026-07-24 UTC` — `ReviewReply.comment`: "The body of the reply as plain text with markups. The maximum length is 4096 bytes."

Bytes, not characters. In UTF-8 an accented Latin character costs two bytes and most CJK characters cost three, so a reply that fits in 4,096 characters can exceed 4,096 bytes by a wide margin.

**Consequence:** a client that truncates at 4,096 *characters* will fail on non-ASCII text — and will fail for exactly the businesses whose reviews are in Japanese, Greek, Arabic or Russian.

**What to do instead:** measure the encoded byte length, not the string length. Compare with [LSM-GBP-23](#lsm-gbp-23--the-750-character-profile-description-limit-is-not-in-the-api-reference), where the reference states no limit at all.

### LSM-REVIEWS-06 · There is no compliant automated review-reply path

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-27
**Source:** Business Profile APIs policies, `Last updated 2025-08-28 UTC`, under Prohibited practices — Automated use of your Business Profile project: "You may not use the Business Profile APIs to engage in abusive behaviors, which includes but isn't limited to fraudulent, abusive, or otherwise invalid activity. For example, you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent." And under Third-party policy — Reviews: "Business owners have the ability to respond to reviews of their business on Google. If you respond to reviews on behalf of your end-client, you must receive their authorization first. All responses to reviews must follow Google's Prohibited and restricted content policies."

The endpoint will publish whatever you send it. The policy is the constraint, and it is explicit: replies may not be automated or triggered **without the user's prior specific and express consent**. An unattended auto-responder — new review arrives, model writes, system publishes — has never been a permitted configuration, whatever the API allows.

Note what is *not* prohibited: drafting. A model may write the reply. A human must approve each one, and the operator must have authorised replies on their behalf in the first place.

**What to do instead:** draft with AI, publish with a human. If an auto-mode is ever built, it needs an explicit, specific, per-account opt-in that names the behaviour — not a buried checkbox, and not a general terms acceptance. This is our reading of published terms, not legal advice.

### LSM-REVIEWS-07 · Rating-only reviews have no text, and `starRating` is an enum, not a number

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** page `v4/accounts/{a}/locations/{l}/reviews` on a location with rating-only reviews and inspect `comment` and `starRating`

`comment` is legitimately absent on a rating-only review — that is a real review with a real star value and no words. And `starRating` arrives as `ONE`, `TWO`, `THREE`, `FOUR` or `FIVE`, not as an integer.

**Consequence:** a naive mapper turns an unrecognised or absent `starRating` into `0`, which then drags a computed average toward zero. A rating computed from mapped values will disagree with Google's own `averageRating` in the same response, and Google's is the correct one.

**What to do instead:** use the `averageRating` and `totalReviewCount` the API returns rather than recomputing them, and treat a missing `comment` as a category of review rather than as missing data. A profile with many rating-only reviews is a genuinely different situation from one with many written ones, and only the second gives you anything to reply to.

### LSM-REVIEWS-08 · v4 gained four review capabilities in 2026, which is why it is not going away quietly

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google My Business API change log at `developers.google.com/my-business/content/change-log`, `Last updated 2026-07-24 UTC`

| Date | Change |
| --- | --- |
| 2026-07-24 | `reviewReplyUrl` can now be retrieved using `accounts.locations.reviews.get`, `.list` and `.batchGetReviews` |
| 2026-07-01 | `PolicyViolation` included in `ReviewReply`, giving visibility into why a reply was rejected during moderation |
| 2026-04-20 | `ReviewMediaItems` can now be retrieved as part of reviews, via the same three endpoints |
| 2026-04-07 | Recurring posts via `RecurrenceInfo` on create; and food menus can carry up to 200 dish photos via `accounts.locations.updateFoodMenus` |
| 2026-04-01 | `ReviewReplyState` can be retrieved as part of reviews, showing the moderation status of submitted replies |

Six capability additions across five dated change-log entries between 2026-04-01 and 2026-07-24 — four of them to reviews, on an API the industry describes as legacy. `ReviewMediaItems` in particular is new capability, not maintenance: customer-uploaded photos attached to reviews were previously unreachable.

**Consequence:** the standard advice to migrate off v4 has no destination. There is no v1 API for reviews, media, posts or menus, and Google is actively investing in the v4 ones.

**What to do instead:** build on v4 and isolate it behind an interface. Re-read this change log quarterly — it is the highest-signal page on the whole surface, and it is where the Q&A retirement was recorded while the deprecation schedule stayed silent.

---

## Re-probe notes

Every behavioural entry above was established against a small number of real profiles on a single API project with approved quota. A `WORKS` demonstrates that the call succeeded for that project on that date; it is not a guarantee for yours. Your project may have a different API enabled, your account may be in a different verification state, and quota approval is per project and per API.

The strongest entries here are the ones with deterministic failures reproduced more than once. The weakest are the OPEN QUESTIONs, and each of those names the experiment that would close it.

A dated observation that contradicts an entry — with the call you made and what came back — changes the entry. That is the only mechanism this reference has for staying true.

---

**Next:** [Storing Google data legally →](./storing-google-data-legally.md)
