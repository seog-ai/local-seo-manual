---
title: Write limits and failure modes
sidebar_position: 5
description: The write-side catalogue — character caps, media rules, the video-in-posts 500, native scheduling, the shared edit budget, and why an HTTP 200 is not a publication.
---

# Write limits and failure modes

Reads fail loudly. Writes fail quietly: the call returns 200, the field does not change, and nobody finds out until a client asks why the hours are still wrong. This chapter catalogues the refusals, caps and silent failures on the write path into a Google Business Profile, each with the call that reproduces it.

Every entry stands alone. `Last verified` is the day the probe last ran, never the day the prose was edited.

## Failure-mode index

Search this table by the string you actually saw.

| What you observe | Entry |
| --- | --- |
| `HTTP 500 INTERNAL` on post create | [LSM-POSTS-07](#lsm-posts-07--local-posts-reject-video-with-http-500) |
| `Must be at most 1500 characters` | [LSM-POSTS-02](#lsm-posts-02--post-summary-is-capped-at-1500-characters) |
| `Must be at most 58 characters` | [LSM-POSTS-03](#lsm-posts-03--eventtitle-is-capped-at-58-characters) |
| `LOCATION_DISABLED_FOR_LOCAL_POST_API` | [LSM-POSTS-13](#lsm-posts-13--chain-detected-locations-are-refused-from-posting-entirely) |
| Post created, then `state: REJECTED` | [LSM-POSTS-11](#lsm-posts-11--http-200-on-create-is-not-publication--state-is-the-answer), [LSM-POSTS-12](#lsm-posts-12--a-phone-number-in-post-text-is-an-explicit-policy-violation) |
| Every v4 call 404s on a connected profile | [LSM-GBP-101](#lsm-gbp-101--v4-resource-names-need-the-account-segment--a-bare-locationsid-404s-everything) |
| `429` / edits refused after a burst | [LSM-GBP-102](#lsm-gbp-102--10-edits-per-minute-per-profile-shared-across-every-kind-of-edit) |
| PATCH returns 200, profile unchanged | [LSM-GBP-107](#lsm-gbp-107--a-2xx-patch-is-an-accepted-edit-not-a-published-one) |
| Reply "sent" but not visible on Maps | [LSM-REVIEWS-101](#lsm-reviews-101--a-2xx-on-the-reply-put-is-not-proof-the-reply-is-public), [LSM-GBP-111](#lsm-gbp-111--a-locations-owning-account-is-not-recoverable-from-the-location-alone) |
| `REVIEW_NOT_SYNCED` / no reply target | [LSM-REVIEWS-103](#lsm-reviews-103--only-reviews-read-through-the-owner-v4-path-are-replyable) |
| Attribute you tried to clear is still set | [LSM-GBP-104](#lsm-gbp-104--attribute-ids-in-the-mask-but-absent-from-the-body-are-unset) |
| Listing went "pending" after an edit | [LSM-GBP-108](#lsm-gbp-108--editing-the-name-or-the-address-can-force-re-verification--google-says-so-for-both-in-different-strengths) |
| Photo uploaded, not visible yet | [LSM-GBP-112](#lsm-gbp-112--uploaded-photos-are-reviewed-before-they-appear--google-documents-2448-hours) |
| `PHOTO_FETCH_FAILED` / `PHOTO_UPLOAD_FAILED` | [LSM-POSTS-06](#lsm-posts-06--sourceurl-is-the-only-supported-media-transport-for-a-post) |
| Hotel profile, offer post refused | [LSM-POSTS-19](#lsm-posts-19--hotels-may-not-post-offers-or-any-post-mentioning-a-deal) |

---

## Local Posts

### LSM-POSTS-01 · Local Posts exist only on the legacy My Business v4 surface

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** `GET https://mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/localPosts` with a `business.manage` access token
**Corroborating source:** Google's deprecation schedule (`developers.google.com/my-business/content/sunset-dates`, `Last updated 2025-08-28 UTC`, read 2026-07-27). The `localPosts` collection is **not** on it. The only Local Posts entry on the schedule is the metrics method `accounts.locations.localPosts.reportInsights` (support ended 2022-11-21, discontinued 2023-02-20) — see [LSM-POSTS-14](#lsm-posts-14--per-post-metrics-do-not-exist-through-any-api).

Returns 200 on a real connected location (`{}` when the location has no posts). None of the eight split-out v1 APIs took posts over; there is no replacement endpoint and no sunset date published for the collection itself. The surface is legacy but still receiving features — `RecurrenceInfo` shipped 2026-04-07, and the reference page carried a `Last updated 2026-04-15 UTC` stamp when re-read on 2026-07-27.

Note what an absence from a sunset schedule is and is not. It is evidence that Google has announced no retirement date. It is not a commitment that none is coming, and the Q&A endpoints went to HTTP 501 without ever appearing on that page.

Third-party guides claiming the Local Posts API was retired in 2022 were still live and still wrong when we checked on 2026-07-22.

**What to do instead:** nothing — post through v4. Isolate the v4 client behind an interface so a future migration is a swap, but do not delay building on it.

### LSM-POSTS-02 · Post `summary` is capped at 1,500 characters

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a `STANDARD` post with a 1,501-character `summary` → HTTP 400, field-level `ValidationError`, message `Must be at most 1500 characters`. Nothing is created.

The limit is enforced by the API but scrubbed from Google's current published pages. It is real, it is field-level, and the 400 is clean — no partial post is left behind.

**What to do instead:** count characters client-side before you send, and treat the API's `INVALID_ARGUMENT` as authoritative over any documentation, ours included.

### LSM-POSTS-03 · `event.title` is capped at 58 characters

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create an `EVENT` post with a 59-character `event.title` → HTTP 400, `Must be at most 58 characters`

Same shape as the summary cap: field-level validation error, nothing created. 58 is an odd number and it is not in any current official page; it came back from the API verbatim.

**What to do instead:** budget titles at 58 characters. If a title must be longer, move the detail into `summary`.

### LSM-POSTS-04 · EVENT and OFFER posts require a full four-field schedule with no timezone

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create an `EVENT` post with `event.schedule` missing `endTime` → HTTP 400

`EVENT` and `OFFER` need `event.title` plus a complete `TimeInterval`: `startDate`, `startTime`, `endDate`, `endTime`. A partial interval is rejected. The v4 interval carries **no timezone field** — dates and times are bare `{year, month, day}` and `{hours, minutes}` structs.

| Field | Shape | Required |
| --- | --- | --- |
| `event.title` | string, ≤58 chars | yes |
| `event.schedule.startDate` | `{year, month, day}` | yes |
| `event.schedule.startTime` | `{hours, minutes}` | yes |
| `event.schedule.endDate` | `{year, month, day}` | yes |
| `event.schedule.endTime` | `{hours, minutes}` | yes |

**What to do instead:** carry event dates and times as timezone-less strings end to end (`YYYY-MM-DD` and `HH:mm`). Converting them through an ISO datetime with a zone, then back, silently shifts the event by the offset — a 7 p.m. event becomes a midnight one for anyone whose server runs in UTC.

### LSM-POSTS-05 · Every CTA type requires a `url` except `CALL`, which must not have one

**Verdict:** WORKS
**Last verified:** 2026-07-22 (enum re-read on the v4 reference 2026-07-27, page stamped `Last updated 2026-04-15 UTC`)
**Probe:** create a post with `callToAction: {actionType: "CALL", url: "https://…"}` → rejected; the same post with `url` omitted → accepted

| `actionType` | `url` | Note |
| --- | --- | --- |
| `BOOK`, `ORDER`, `SHOP`, `LEARN_MORE`, `SIGN_UP` | required | plain https link |
| `CALL` | must be absent | uses the profile's verified phone |
| `GET_OFFER` | — | deprecated; use the `OFFER` topic type |

The enum was re-read in full on 2026-07-27 and is `ACTION_TYPE_UNSPECIFIED`, `BOOK`, `ORDER`, `SHOP`, `LEARN_MORE`, `SIGN_UP`, `GET_OFFER` (marked deprecated), `CALL`.

`OFFER` posts are a separate case: Google attaches a "View Offer" button automatically, and an explicit `callToAction` on an `OFFER` is invalid.

**What to do instead:** drive the CTA field off the action type in your own form, and hide the URL input entirely when `CALL` is selected. In our own composer this was a frequent source of otherwise-valid posts being refused, which is why the rule is enforced client-side *(inference — we have not counted 400s by cause across any population, and no such figure should be quoted from this entry)*.

### LSM-POSTS-06 · `sourceUrl` is the only supported media transport for a post

**Verdict:** WORKS
**Last verified:** 2026-07-27 (documentation re-read; behaviour probed 2026-07-22)
**Source:** v4 `LocalPost` reference, `Last updated 2026-04-15 UTC` — verbatim: *"The media associated with the post. sourceUrl is the only supported data field for a LocalPost MediaItem."*

The three-step bytes handshake that uploads photos to a location's gallery (`media:startUpload` → PUT bytes → create with `dataRef`) does **not** work for posts. A post photo must already be reachable at a public URL that Google's fetcher can pull.

Fetch failures surface as two codes from Google's shared `ErrorCode` enum (`developers.google.com/my-business/reference/rest/Shared.Types/ErrorCode`, `Last updated 2024-10-16 UTC`, read 2026-07-27), verbatim: `PHOTO_FETCH_FAILED` — *"Fetch photo from the specified URL failed."* — and `PHOTO_UPLOAD_FAILED` — *"Upload photo from the specified URL failed."* Both mean Google could not retrieve your URL, so check that it is publicly reachable without authentication before you look anywhere else.

**What to do instead:** stage the image on public object storage first and pass the URL. Do not transcode to WebP on the way — serve the JPEG or PNG that Google's own media policy names.

### LSM-POSTS-07 · Local Posts reject video with HTTP 500

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-22
**Probe:** `POST accounts/{a}/locations/{l}/localPosts` with `media: [{mediaFormat: "VIDEO", sourceUrl: "<public mp4>"}]` → HTTP **500 INTERNAL**, reproduced twice

Not a 400, not a validation message — a server error. The Business Profile web interface accepts video on a post, so operators reasonably assume the API does too; the UI reaches video through internal endpoints that are not part of the public surface. No official page states that posts are photo-only, but every official example is photo-only, no error code names video, and no release note has ever shipped it.

UI parity is not API parity, and a deterministic 500 that reproduces on demand is a property of the endpoint, not of the caller.

**What to do instead:** plan post media as photos permanently. Video on a profile is a different feature, reached through the separate v4 **location media** surface and appearing in the gallery rather than on a post. Google's published video bounds, from *Manage photos and videos for your Business Profile* (`support.google.com/business/answer/6103862`, read 2026-07-27, no revision date on the page), are verbatim: *"Up to 30 seconds long"*, *"Up to 75 MB"*, *"720p or higher"*.

*(Open sub-question: we have probed that posts refuse video, not that the location-media surface accepts it through the API. The bounds above are the ones Google publishes for profile video generally; nobody here has uploaded a video through the v4 media handshake and recorded the result.)*

### LSM-POSTS-08 · One photo per post, and post media is immutable after creation

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-22
**Probe:** not run. `media[]` is an array on the wire; we designed for exactly one item and never probed a two-item create, so we cannot say whether the second photo errors or is silently dropped.

Every third-party scheduler we checked, and consistent community reporting, says only one photo survives. That is convergent hearsay, not a probe. What *is* settled is that changing a post's photo means deleting the post and creating a new one — there is no patch path that swaps media without republishing.

**What to close it:** create a post with two distinct `sourceUrl` items and read the post back. If the response echoes both, the constraint is a rendering limit, not an API limit. Send us the result and this entry changes.

**Consequence:** design post composers for a single image, and treat "edit the photo" as delete-and-recreate — which costs the post its age and its accumulated position in the profile's post list.

### LSM-POSTS-09 · `scheduledTime` is writable — Google publishes the post itself

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a post with `scheduledTime` set to an RFC3339 instant in the future → HTTP 200, the instant echoed back in the response, `state: SCHEDULED`; deleting the post before that instant cancels the publication

Scheduling is native. Google holds the post and publishes it at the stated time, on Google's infrastructure.

**What to do instead:** never build a queue, cron job or worker that wakes up and publishes a post at a time you stored. A native scheduled post publishes while your own system is down, cannot double-post, and has nothing to crash. Set `scheduledTime` and delete the post to cancel.

### LSM-POSTS-10 · A scheduled post is reviewed up front and can be rejected before its publish time

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a scheduled post and re-read it before the scheduled instant — the state sequence observed is `PROCESSING` → `SCHEDULED`, and a policy-violating post reaches `REJECTED` without ever publishing

Scheduling does not defer review. Google evaluates the content when you submit it, not when it goes live, so a post scheduled for next Tuesday can be dead on Thursday.

**What to do instead:** check state after submission rather than after the publish time. "Scheduled for Tuesday" is a claim about intent; `REJECTED` outranks it and the post will never appear.

### LSM-POSTS-11 · HTTP 200 on create is not publication — `state` is the answer

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create any post → the response body carries `state`, which is output-only
**Source:** the `LocalPostState` enum on the v4 `LocalPost` reference (`Last updated 2026-04-15 UTC`), re-read in full 2026-07-27

| `state` | Google's own description |
| --- | --- |
| `LOCAL_POST_STATE_UNSPECIFIED` | state not specified |
| `PROCESSING` | "This post is being processed and is not appearing in search results" |
| `LIVE` | "This post is published and is currently appearing in search results" |
| `REJECTED` | "This post was rejected due to content policy violation" |
| `SCHEDULED` | "This post is scheduled for the future and is not appearing in search results" |
| `RECURRING` | "This post is a recurring post and is currently appearing in search results" |

A 200 means Google accepted the request. Whether anything appears on the profile is a separate question, answered by `state` on the create response and by re-reading the post afterwards.

**What to do instead:** record `state` at creation and re-read it before telling anyone the post is live. A workflow that reports success on the HTTP status will report success for rejected posts, permanently.

### LSM-POSTS-12 · A phone number in post text is an explicit policy violation

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Business Profile photos & videos policy and posts content policy* (`support.google.com/business/answer/7213077`), read 2026-07-27; the page carries no revision date. Verbatim: *"To avoid the risk of abuse, we do not allow your post content to include a phone number."*

The ban is unconditional in the text quoted above: it applies to the post body, and Google states no exception for a phone number the profile already publishes. The same page directs you to the "Call now" button instead.

Practitioners commonly report this as a leading cause of `REJECTED`, and it matches what we see, but neither Google nor we publish a breakdown of rejection causes — so do not carry a share or a ranking out of this entry *(inference)*.

*This is our reading of published terms, not legal advice.*

**What to do instead:** block phone-shaped strings before publishing and offer the `CALL` action type instead, which uses the profile's verified number and carries no URL ([LSM-POSTS-05](#lsm-posts-05--every-cta-type-requires-a-url-except-call-which-must-not-have-one)). Note that a "no phone numbers" filter will also catch some dates and prices; treat high-confidence patterns as hard blocks and ambiguous digit groups as warnings, or you will refuse legitimate posts.

### LSM-POSTS-13 · Chain-detected locations are refused from posting entirely

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a post on a location Google has classified as a chain → HTTP 400 whose error body carries the reason `LOCATION_DISABLED_FOR_LOCAL_POST_API`
**Source:** Google's shared `ErrorCode` enum (`developers.google.com/my-business/reference/rest/Shared.Types/ErrorCode`, `Last updated 2024-10-16 UTC`, read 2026-07-27) lists it verbatim as *"Location Disabled for Local Post API."*

This is an official error code, returned wholesale — the location cannot post through the API at all, regardless of content. Note that Google's own gloss is a restatement of the code name and explains nothing about the cause; the attribution to chain classification is ours, from observing which locations return it *(inference)*.

The widely repeated "more than 10 locations" threshold for chain detection is community lore. Google publishes no threshold, and the classification is not exposed as a readable field, so there is no way to check in advance whether a location will be refused.

**What to do instead:** detect the code and say so plainly rather than retrying. There is no request-level workaround; posting for that location has to happen in the Business Profile interface.

### LSM-POSTS-14 · Per-post metrics do not exist through any API

**Verdict:** GONE
**Last verified:** 2026-07-22
**Probe:** read Google's deprecation schedule (`developers.google.com/my-business/content/sunset-dates`, `Last updated 2025-08-28 UTC`, read 2026-07-27), then read the Performance v1 `DailyMetric` enum and look for a post-level metric.
**Source:** the schedule lists `accounts.locations.localPosts.reportInsights` with support ended **2022-11-21** and discontinuation **2023-02-20**. The `DailyMetric` enum (last updated 2024-10-16, re-read 2026-07-27) holds 12 values — 11 real metrics plus `DAILY_METRIC_UNKNOWN` — and none of them is post-scoped. See [LSM-MEASURE-03](./what-googles-reporting-hides.md#lsm-measure-03--the-performance-api-returns-no-rating-review-count-or-ranking-metric--every-such-trend-was-manufactured-by-the-tool-showing-it) for that enum in full.

Views, clicks and CTA taps for an individual post are unobtainable programmatically. What a post exposes is its `state` and its `searchUrl`.

**What to do instead:** do not promise post analytics in a client report. Measure posting at the profile level — the Performance metrics move or they do not — and be explicit that per-post attribution is not available rather than inventing a proxy for it.

### LSM-POSTS-15 · Post photo bounds: JPG/PNG, 10 KB–5 MB, and a minimum the API does not publish

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27 (documentation), 2026-07-22 (implementation)
**Source:** Google Business Profile Help, *Manage photos and videos for your Business Profile* (`support.google.com/business/answer/6103862`), read 2026-07-27 — verbatim: *"Format: JPG or PNG. Size: Between 10 KB and 5 MB. Recommended resolution: 720 px tall, 720 px wide"*, with *"Minimum resolution: 250 px tall, 250 px wide"*.

Those bounds are published for **profile** media. A post-specific minimum of 400×300 appears in stale search snippets and has been removed from the live help page; we enforce 400×300 defensively and have not probed the endpoint's actual floor. So the honest position: 250 px is documented for profile photos, 400×300 is folklore we chose to respect, and the number the posts endpoint really enforces is unknown.

**What to close it:** create posts with a 300×300 and a 260×200 image and record which are accepted.

**Consequence:** aim for roughly 4:3 at about 1200×900. Post thumbnails centre-crop near 4:3, so a tall image loses its subject regardless of which minimum is enforced.

### LSM-POSTS-16 · Recurring posts (`RecurrenceInfo`) exist and are unprobed

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-22
**Probe:** not run. `RecurrenceInfo` shipped on the v4 LocalPost resource on 2026-04-07 and `RECURRING` is a documented state; we have never created one.

**What to close it:** create a post with `RecurrenceInfo` populated, read it back, and record whether Google generates the repeats natively the way it handles `scheduledTime` ([LSM-POSTS-09](#lsm-posts-09--scheduledtime-is-writable--google-publishes-the-post-itself)).

**Consequence:** until somebody probes it, treat recurrence as unavailable rather than building a repeat scheduler on the assumption that it is not.

### LSM-POSTS-17 · There is no product post topic type in the API

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-27
**Probe:** read the `LocalPostTopicType` enum on the v4 `LocalPost` reference (`Last updated 2026-04-15 UTC`). The values are `LOCAL_POST_TOPIC_TYPE_UNSPECIFIED`, `STANDARD`, `EVENT`, `OFFER`, `ALERT`. There is no product value.

Product listings on a Business Profile are a different surface from posts and are not creatable through this endpoint.

**What to do instead:** treat products as manual work in the Business Profile interface, and do not model them as a post type in any workflow you build.

### LSM-POSTS-18 · `ALERT` posts exist in the enum but are not reliably authorable

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Source:** the `LocalPostTopicType` enum on the v4 `LocalPost` reference (`Last updated 2026-04-15 UTC`, re-read 2026-07-27) lists `ALERT` alongside `STANDARD`, `EVENT` and `OFFER`. We have never created one.

We have **not** located a Google page stating that `ALERT` is restricted or gated, and this entry previously implied one existed ("Google's guidance elsewhere describes it as not always available for authoring") without naming it. Treat the restriction as unverified: what is certain is only that the value is in the enum and that nobody here has successfully authored one.

**What to close it:** attempt an `ALERT` create on a verified location and record the response.

**Consequence:** do not offer `ALERT` in a composer. Build `STANDARD`, `EVENT` and `OFFER`, which are all confirmed authorable.

### LSM-POSTS-19 · Hotels may not post offers, or any post mentioning a deal

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Business Profile photos & videos policy and posts content policy* (`support.google.com/business/answer/7213077`), read 2026-07-27; the page carries no revision date. Verbatim: *"Hotels can't create "offer" posts, or any post that mentions or includes links to deals, promotions, special offers, or discounts."* The same page confirms hotels may post otherwise: *"Hotel businesses can create local posts to provide relevant, timely info to customers."*

The restriction is wider than the `OFFER` topic type. A `STANDARD` post from a hotel that mentions a discount is prohibited by the same sentence, so a composer that merely disables the `OFFER` button has implemented half of it.

*This is our reading of published terms, not legal advice.*

**Verdict scope:** the policy is documented and current. We have **not** probed whether the API refuses a hotel `OFFER` create or whether Google accepts it and rejects the post afterwards — our own implementation treats it as a warning rather than a hard block. Either way the post does not reach customers.

**What to do instead:** derive the constraint from the profile's primary category rather than asking the operator, and warn on deal language in hotel post text as well as blocking the topic type.

---

## Profile writes

### LSM-GBP-101 · v4 resource names need the account segment — a bare `locations/{id}` 404s everything

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** call any v4 endpoint with a resource path built from the Business Information location name alone — `v4/locations/{id}/reviews` — and compare against `v4/accounts/{a}/locations/{l}/reviews`. The first 404s; the second returns data.

The two APIs disagree about what a location is called, and nothing warns you:

| API | Location resource name | Account segment |
| --- | --- | --- |
| Business Information v1 | `locations/{locationId}` | absent |
| My Business v4 (reviews, media, localPosts) | `accounts/{a}/locations/{l}` | **required** |

The failure is subtle because it is a *derivation* bug, not a call bug. Splitting the Business Information name on `/locations/` to recover an account yields nothing usable, and the malformed value gets persisted at connection time. Every later v4 call — review sync, reply publish, post create, media upload — 404s against a profile that is genuinely connected, and the connection itself looks healthy.

**What to do instead:** capture the owning account at the moment you list locations (`accounts/{a}/locations`), and store it alongside the location. Validate stored account names against `^accounts/` before use and re-resolve anything that fails, because a value that merely exists is not a value that is well formed.

### LSM-GBP-102 · 10 edits per minute per profile, shared across every kind of edit

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile API usage limits (`developers.google.com/my-business/content/limits`), `Last updated 2026-05-07 UTC` — verbatim: *"Edits: 10 per minute per Google Business Profile (cannot be increased)"*

| Limit | Value | Scope as published |
| --- | --- | --- |
| Default requests | 300 QPM | each API |
| Edits | 10 per minute | per Google Business Profile — **cannot be increased** |
| Update Location requests | 10,000 QPD | Business Information API |
| Create Location requests | 300 QPD | Business Information API |
| SearchGoogleLocation requests | 300 QPD | Business Information API |

Exceeding a limit returns HTTP 429. The parenthetical on the edit row is the important part: quota increases are available for the request limits and are explicitly not available for the edit cap.

The cap is per *profile*, not per feature, which makes it a single shared budget across the write paths it covers. A profile-field write, an attribute update and an undo all draw on the same ten. A bulk operation that looks safe in isolation — nine attribute writes — leaves one edit for everything else happening on that profile in the same minute.

**Where the published scope stops.** Google prints the edit limit in the Business Information API section. It does not say whether a v4 Local Post create or delete is counted as an "edit" against the same ten. We assume it is and enforce one shared budget across profile writes and post writes, because the failure mode of assuming otherwise is worse *(inference — an engineering decision, not a documented rule)*.

**What would settle it:** issue ten Business Information edits inside a minute, then immediately create a post on the same profile, and record whether the post create returns 429. If it succeeds, the budgets are separate.

**What to do instead:** enforce one budget per profile across every write path you own, not one per feature. Feature-scoped limiters each staying "under 10" will collectively blow the cap and produce refusals that look random.

### LSM-GBP-103 · Business Information writes need an explicit `updateMask`; attributes are a different resource

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `PATCH mybusinessbusinessinformation.googleapis.com/v1/locations/{id}?updateMask=phoneNumbers.primaryPhone` with the matching body

Every scalar profile write is a `locations.patch` with a mask naming exactly the field being written. Attributes are **not** on the location resource — they live at `locations/{id}/attributes` and are written with `attributeMask`, a separate parameter on a separate call.

| Field | Endpoint | Mask parameter | Mask value |
| --- | --- | --- | --- |
| Business name | `locations.patch` | `updateMask` | `title` |
| Phone | `locations.patch` | `updateMask` | `phoneNumbers.primaryPhone` |
| Website | `locations.patch` | `updateMask` | `websiteUri` |
| Opening hours | `locations.patch` | `updateMask` | `regularHours` |
| Open/closed status | `locations.patch` | `updateMask` | `openInfo.status` |
| Description | `locations.patch` | `updateMask` | `profile.description` |
| Attributes | `locations.updateAttributes` | `attributeMask` | comma-separated attribute ids |

**What to do instead:** route every write through one masked-patch choke point and pass the mask in from the field definition. Omitting the mask, or sending a body wider than the mask, is how an unrelated field gets wiped.

### LSM-GBP-104 · Attribute ids in the mask but absent from the body are UNSET

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `PATCH locations/{id}/attributes?attributeMask=attributes/a,attributes/b` with a body containing only `attributes/a` → `attributes/b` is cleared

This is the documented semantics of a mask, and it is the only way to clear an attribute — there is no delete call. It is also how an attribute write silently erases neighbouring values: a mask listing five ids and a body carrying three unsets the other two.

**What to do instead:** build the mask from the body, not from the picker's full option list. When you need an undo, read the live values of exactly the ids you are about to touch *before* writing, and restore from that snapshot — a stored mirror of what you last wrote is not the same thing as what is on the profile now.

### LSM-GBP-105 · The open state is called `OPEN` on the write API and `OPERATIONAL` on the read API

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** write `openInfo.status: "OPEN"` through Business Information, then read the same business through the Places API — the returned `businessStatus` is `OPERATIONAL`

| State | Business Information (`openInfo.status`) | Places (`businessStatus`) |
| --- | --- | --- |
| Trading | `OPEN` | `OPERATIONAL` |
| Temporarily closed | `CLOSED_TEMPORARILY` | `CLOSED_TEMPORARILY` |
| Permanently closed | `CLOSED_PERMANENTLY` | `CLOSED_PERMANENTLY` |

The two vocabularies agree on both closed values and disagree on the open one. Nothing signals the mismatch: writing `OPERATIONAL` to `openInfo.status` is simply an invalid enum value, and a comparison between a stored `OPERATIONAL` and a fresh `OPEN` reports a change that did not happen.

**What to do instead:** map at both boundaries and keep one canonical value internally. Any code that compares a read-side status to a write-side status without translating is a false-diff generator.

### LSM-GBP-106 · The 750-character description limit is folklore, not a documented one

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Add or edit your business description* (`support.google.com/business/answer/3038177`), read 2026-07-27, no revision date on the page. It states **no character limit**. What it does state, verbatim, is what the description must not do: *"Display low-quality, irrelevant, or distracting content. For example, misspellings, gimmicky character use, gibberish, etc."*, *"Focus on special promotions, prices, and offer sales."*, and *"Display links. No links of any type are allowed."*

750 is quoted as gospel across the industry and we truncate at it defensively. We have not probed where the API actually rejects, and Google's own help page does not state a number.

Those three prohibitions are worth more attention than the missing number, because they are documented and they are what a description actually gets refused for. A description under 750 characters that opens with a discount and a link breaks two published rules while satisfying a limit Google never set.

**What to close it:** patch `profile.description` with 751, 1,000 and 1,500 characters and record the first rejection.

**Consequence:** write descriptions at 750 or under — the cost of being wrong in that direction is zero — but do not tell a client "the limit is 750" as though Google said so. It currently does not.

### LSM-GBP-107 · A 2xx PATCH is an accepted edit, not a published one

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** patch a field, then immediately re-read the location. The write returns 200; the read can still show the old value while Google reviews the change.
**Source:** Google Business Profile Help, *Edit your Business Profile* (`support.google.com/business/answer/3039617`), read 2026-07-27, no revision date on the page — verbatim: *"We review your changes before we update them live on your profile."*

Google says review happens; it does not publish how long it takes. Our own observation is minutes to days, and an edit can be rejected or altered by Google rather than applied *(the duration range is ours, not Google's)*. Business Information exposes `locations.getGoogleUpdated`, which returns Google's own version of a location, so the divergence between what you wrote and what Google decided is observable.

**What to do instead:** treat every applied edit as unconfirmed until a subsequent read of the live profile shows it. A rejected edit re-reads as the old value, so a re-read is also how a failed change resurfaces honestly instead of disappearing into your own mirror. Reporting "we updated the hours" off the HTTP status is how a fix that Google reverted stays in a client report for a quarter.

### LSM-GBP-108 · Editing the name or the address can force re-verification — Google says so for both, in different strengths

**Verdict:** WORKS for name and address. OPEN QUESTION for category.
**Last verified:** 2026-07-27 (documentation); behaviour last observed 2026-07-23
**Source:** Google Business Profile Help, *Edit your Business Profile* (`support.google.com/business/answer/3039617`), read 2026-07-27, no revision date on the page. Two separate sentences, quoted verbatim and deliberately not merged:

> If you change your business name after it's verified, you might need to verify your business again.

> If you move your business to a new address after it's verified, you must verify your business again.

The write succeeds like any other; the API returns no distinct signal, so this is a property of the profile lifecycle rather than of the call.

| Field | What Google publishes |
| --- | --- |
| Business name (`title`) | "**might** need to verify your business again" |
| Address | "**must** verify your business again" |
| Primary or additional category | *nothing on this page* — see below |
| Phone, website, hours, open status, description, attributes, photos | covered only by the general "We review your changes before we update them live" |

**Correction, 2026-07-27:** this entry previously grouped name, category and address together as "can force re-verification", sourced to "Google's verification guidance plus consistent operator experience". That flattened a real distinction. Google's own wording is *might* for a name change and *must* for an address change, and it says nothing about category on this page. Category is now carried as an open question rather than asserted.

**What would settle the category case:** change a primary category on a verified test profile and record whether a verification prompt follows. Until somebody does, treat category as higher-risk than a phone edit on the reasoning that it helps define the entity, but do not tell a client Google requires re-verification for it *(inference)*.

**Also inference, and worth separating from the quotes above:** that a pending listing can drop out of Search and Maps until approved, that a change can be silently reverted, and that an edit can trigger a suspension needing manual reinstatement. These are consistent operator reports and match what we have seen; Google does not state them on this page.

**What to do instead:** separate name, address and category from routine edits in any tool or process you build, and make them a deliberate decision with an explicit acknowledgement rather than a form save. Never batch a name change with unrelated cleanup — if the listing goes pending, you want exactly one variable to explain it.

### LSM-GBP-109 · Location photos upload by a three-step bytes handshake, with no public URL required

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** `POST v4/accounts/{a}/locations/{l}/media:startUpload` (empty body) → `POST https://mybusiness.googleapis.com/upload/v1/media/{resourceName}?upload_type=media` with the raw bytes → `POST v4/accounts/{a}/locations/{l}/media` with `{mediaFormat: "PHOTO", locationAssociation: {category: "ADDITIONAL"}, dataRef: {resourceName}}`

The third call needs a `locationAssociation`; omitting it is a separate failure from omitting the `dataRef`.

Three calls per photo. Gallery media is the exact inverse of post media ([LSM-POSTS-06](#lsm-posts-06--sourceurl-is-the-only-supported-media-transport-for-a-post)): the location surface takes bytes and does not need a public URL, the posts surface takes only a public URL and refuses bytes. Google's own error text on the wrong path says it supports uploading media from bytes for locations.

**What to do instead:** budget three API calls per gallery photo when planning quota, and do not attempt to share one upload implementation between gallery photos and post photos. They are different transports with opposite requirements.

### LSM-GBP-110 · You can delete photos you uploaded; you cannot delete customer photos, replace atomically or reorder

**Verdict:** WORKS
**Last verified:** 2026-07-23
**Probe:** `DELETE v4/accounts/{a}/locations/{l}/media/{mediaId}` succeeds for owner-uploaded media. There is no endpoint that removes customer-contributed media and no replace call.
**Source:** the v4 `MediaItem` resource (`developers.google.com/my-business/reference/rest/v4/accounts.locations.media`, `Last updated 2025-08-28 UTC`), field list re-read 2026-07-27: `name`, `mediaFormat`, `locationAssociation`, `googleUrl`, `thumbnailUrl`, `createTime`, `dimensions`, `insights`, `attribution`, `description`, and `sourceUrl`/`dataRef` as a union. **No ordering or position field** — confirmed against the published field list, so reordering a gallery through the API is not possible.

"Replace this photo" is delete plus upload, in that order, as two edits against the shared budget ([LSM-GBP-102](#lsm-gbp-102--10-edits-per-minute-per-profile-shared-across-every-kind-of-edit)). Deletion is not undoable through the API — Google does not hand the bytes back.

**Correction, 2026-07-27 — and a live disagreement.** This entry previously stated that owner-uploaded photo view counts "are absent: the media resource probed on 2026-07-13 carried no view-count field". That is wrong as a statement about the API's surface. The `MediaItem` resource documents an `insights` field carrying a `MediaInsights` object with `viewCount`, described as *"The number of times the media item has been viewed."*

What is true is narrower and still useful: **our 2026-07-13 probe of a real location's media items came back without a populated view count.** Google's reference says the field exists; our response did not carry a value for it. We do not know which of these explains it — the field may need an explicit read mask, may be populated only for some media, or may be documented-but-dead the way `reportInsights` was before it was formally retired.

**Verdict on view counts specifically:** OPEN QUESTION. **What would close it:** list media on a location with long-established photos, request the `insights` field explicitly, and record whether `viewCount` comes back populated, absent, or zero. Report the read mask you used — it is the most likely explanation.

**What to do instead:** keep your own copy of every image you upload, confirm deletions before you make them, and route complaints about a bad customer photo to Google's reporting flow rather than looking for an API for it. Do not promise a client per-photo view counts until somebody has closed the question above.

### LSM-GBP-111 · A location's owning account is not recoverable from the location alone

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-14
**Probe:** partially run. With one personal account, guessing `accounts[0]` from `accounts.list` resolves correctly and v4 calls succeed. We have not run the multi-account case.

A personal Google account has exactly one Business Profile account, so the guess is safe there. Users who administer several accounts — agencies, most obviously — break the assumption, and the location resource carries no back-reference to its owner.

The open part is what a *write* does when the account is wrong. A v4 call against a valid-but-wrong `accounts/{a}/locations/{l}` path is the leading suspect for a reply that returns 2xx and never appears ([LSM-REVIEWS-101](#lsm-reviews-101--a-2xx-on-the-reply-put-is-not-proof-the-reply-is-public)), but we have not reproduced it deliberately.

**What to close it:** publish a reply through a path whose account segment belongs to a different account you administer, and record the status code and whether the reply appears.

**Consequence:** thread the account from the list call that produced the location and never infer it. Log the exact resource path on every write, so "sent but not visible" is diagnosable after the fact rather than being a guess.

### LSM-GBP-112 · Uploaded photos are reviewed before they appear — Google documents 24–48 hours

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Manage photos and videos for your Business Profile* (`support.google.com/business/answer/6103862`), read 2026-07-27 — verbatim: *"It can take up to 24–48 hours before your photos and videos show on your Business Profile."*

The upload call returns a media resource name immediately. Visibility is a separate, later event, and review can end in the photo not appearing at all.

**What to do instead:** never verify a photo upload by looking at the profile straight afterwards, and do not report a photo count from your own upload log. Count what Google lists back, at least a day later.

---

## Review replies

### LSM-REVIEWS-101 · A 2xx on the reply PUT is not proof the reply is public

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `PUT v4/accounts/{a}/locations/{l}/reviews/{r}/reply` with `{comment}`, then `GET v4/accounts/{a}/locations/{l}/reviews/{r}` and check for `reviewReply.comment`

The PUT can succeed while the reply never surfaces. The two causes we have identified are a profile that is not in a verified state and a write aimed at the wrong account or location path — the second is unconfirmed and tracked at [LSM-GBP-111](#lsm-gbp-111--a-locations-owning-account-is-not-recoverable-from-the-location-alone).

Write-to-read propagation is usually immediate; a single short retry covers the rest. Nothing about the status code distinguishes "published" from "accepted and lost".

**What to do instead:** read the review back and require your own reply text to be present before reporting success anywhere — to a client, to a dashboard, or to a billing record. A read-back is one extra call and it converts a class of silent failure into a visible error.

This is also the concrete argument against an unattended reply loop: a pipeline that publishes on a trigger and never reads back cannot distinguish a published reply from a lost one, and will report a month of replies that nobody outside your system ever saw. Draft with a model if you like; keep a human between the draft and the PUT, and read the result back.

### LSM-REVIEWS-102 · The reply length cap is unconfirmed

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Probe:** not run. We truncate replies at 4,096 characters before sending and have never observed the server's rejection point. The v4 `reviews.updateReply` method reference (`Last updated 2026-04-07 UTC`, re-read 2026-07-27) does not describe the `comment` field at all — it says only that the request body is a `ReviewReply` — so it neither states a limit nor rules one out.

4,096 is the number the integration ecosystem uses, and it is the number our own code enforces. It may well be right. It is not something we can currently defend, and the code comment asserting it as "the v4 API caps reply comments at 4096 chars" is stating an assumption as a fact.

**What to close it:** publish a 4,097-character reply to a review on a test profile and record the response.

**Consequence:** stay well under 4,096 — which you should anyway, since a reply longer than a few sentences is read by nobody — and do not cite a number as Google's.

### LSM-REVIEWS-103 · Only reviews read through the owner v4 path are replyable

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** attempt a reply against a review identifier obtained from the Places API → there is no addressable v4 reply target for it

Review identifiers are not shared between surfaces. A review read from Places carries a Places identifier; the reply endpoint takes a v4 review name under `accounts/{a}/locations/{l}/reviews/`. The same human review has two different ids depending on how you fetched it.

**What to do instead:** sync reviews through the owner API before offering a reply action at all. If you migrate a stored review set from a Places-sourced sample to owner-sourced history, reconcile the two id spaces deliberately — matching on rating plus publish time within a small tolerance, tolerating author renames — or you will duplicate every review in your own store.

### LSM-REVIEWS-104 · A published reply can disappear, and re-reading is the only way to notice

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `GET v4/accounts/{a}/locations/{l}/reviews/{r}` on a review whose reply you previously published, and check whether `reviewReply` is still present

Google is the source of truth for reply text and reply time. A reply can be removed on Google's side — by moderation, or by the review itself being removed — and nothing pushes that event to you. A local record saying "replied" survives the reply.

**What to do instead:** re-verify replies rather than trusting your own mirror, and let an incoming state from Google overwrite yours in both directions: a reply present on Google that you do not have is an upsert, and a reply gone from Google is a deletion. Owner-side response-rate figures computed from a local table that only ever grows will drift upward and never come back.

---

## Media policy

*This section is our reading of published terms, not legal advice.*

### LSM-POLICY-101 · Profile media must be media you captured — AI-generated and stock imagery is out of policy

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Maps contribution policies, *Photos & videos posting criteria* (`support.google.com/contributionpolicy/answer/7411351`), read 2026-07-27; page carries no revision date. Under the heading "Use media you captured", verbatim and in full:

> Upload media of a place that you captured using a camera. Avoid screenshots, stock photos, GIFs, collages, heavily edited or otherwise manipulated photos, or imagery created by other parties.

Under "Create media at the location", verbatim:

> Relevant photos and videos are created at the location you're posting about.

**Where the quote ends and we begin.** Google's text does not name AI-generated imagery. Our reading is that an AI-generated image was not "captured using a camera", was not "created at the location", and is "imagery created by other parties" — so it fails the stated criteria on three counts *(interpretation, not a Google statement)*. Operator reports that such images are rejected are consistent but are not something we can cite to a primary source; if you have a documented rejection, it belongs in this entry.

**What to do instead:** generate post and profile **text** with a model if you want to; source **images** from the business — the owner's phone is fine, and better than fine. This is a policy constraint, not a quality preference, and building AI image generation into a profile workflow is building a rejection pipeline. If you need to fill a thin gallery quickly, book an hour of the owner's time and shoot twenty photos on site.

### LSM-POLICY-102 · The published quality bar is "represent reality", which rules out heavy manipulation

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Manage photos and videos for your Business Profile* (`support.google.com/business/answer/6103862`), read 2026-07-27. Verbatim: *"The photo should be in focus and well lit, and have no significant alterations or excessive use of filters. In other words, the image should represent reality."* The contribution policy adds: *"Using filters is OK as long as the media still provides a clear, accurate depiction of the place. Avoid heavy filters."*

A photo can pass every technical bound in [LSM-POSTS-15](#lsm-posts-15--post-photo-bounds-jpgpng-10-kb5-mb-and-a-minimum-the-api-does-not-publish) and still be refused on this clause.

**What to do instead:** light retouching is fine; anything that changes what the place looks like is not. When a photo is rejected and the format, size and dimensions are all in range, this clause is the next thing to check.

---

## What is not in this chapter

Read limits, quota values for read endpoints and the full owner-API surface live in [The GBP capability matrix](./gbp-capability-matrix.md). What each Google API charges is in [What Google's APIs actually cost](./what-googles-apis-cost.md). Retention and attribution obligations for data you receive back from these calls are in [Storing Google data legally](./storing-google-data-legally.md).

Counter-evidence changes entries here faster than anything else. If you ran one of these probes and got a different answer, [contributing](../99-appendix/contributing.md) has the format: the call you made, what came back, and the date.

---

**Next:** [What Google's own reporting hides →](./what-googles-reporting-hides.md)
