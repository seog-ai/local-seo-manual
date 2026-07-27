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
| Every v4 call 404s on a connected profile | [LSM-GBP-01](#lsm-gbp-01--v4-resource-names-need-the-account-segment--a-bare-locationsid-404s-everything) |
| `429` / edits refused after a burst | [LSM-GBP-02](#lsm-gbp-02--10-edits-per-minute-per-profile-shared-across-every-kind-of-edit) |
| PATCH returns 200, profile unchanged | [LSM-GBP-07](#lsm-gbp-07--a-2xx-patch-is-an-accepted-edit-not-a-published-one) |
| Reply "sent" but not visible on Maps | [LSM-REVIEWS-01](#lsm-reviews-01--a-2xx-on-the-reply-put-is-not-proof-the-reply-is-public), [LSM-GBP-11](#lsm-gbp-11--a-locations-owning-account-is-not-recoverable-from-the-location-alone) |
| `REVIEW_NOT_SYNCED` / no reply target | [LSM-REVIEWS-03](#lsm-reviews-03--only-reviews-read-through-the-owner-v4-path-are-replyable) |
| Attribute you tried to clear is still set | [LSM-GBP-04](#lsm-gbp-04--attribute-ids-in-the-mask-but-absent-from-the-body-are-unset) |
| Listing went "pending" after an edit | [LSM-GBP-08](#lsm-gbp-08--editing-name-category-or-address-can-force-re-verification) |
| Photo uploaded, not visible yet | [LSM-GBP-12](#lsm-gbp-12--uploaded-photos-are-reviewed-before-they-appear--google-documents-2448-hours) |

---

## Local Posts

### LSM-POSTS-01 · Local Posts exist only on the legacy My Business v4 surface

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** `GET https://mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/localPosts` with a `business.manage` access token

Returns 200 on a real connected location (`{}` when the location has no posts). None of the eight split-out v1 APIs took posts over; there is no replacement endpoint and no sunset date on Google's deprecation schedule. The surface is legacy but still receiving features — `RecurrenceInfo` shipped 2026-04-07, and the reference page carried a `Last updated 2026-04-15 UTC` stamp when re-read on 2026-07-27.

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

`OFFER` posts are a separate case: Google attaches a "View Offer" button automatically, and an explicit `callToAction` on an `OFFER` is invalid.

**What to do instead:** drive the CTA field off the action type in your own form, and hide the URL input entirely when `CALL` is selected. This is the single most common 400 on an otherwise valid post.

### LSM-POSTS-06 · `sourceUrl` is the only supported media transport for a post

**Verdict:** WORKS
**Last verified:** 2026-07-27 (documentation re-read; behaviour probed 2026-07-22)
**Source:** v4 `LocalPost` reference, `Last updated 2026-04-15 UTC` — verbatim: *"The media associated with the post. sourceUrl is the only supported data field for a LocalPost MediaItem."*

The three-step bytes handshake that uploads photos to a location's gallery (`media:startUpload` → PUT bytes → create with `dataRef`) does **not** work for posts. A post photo must already be reachable at a public URL that Google's fetcher can pull. Fetch failures surface as `PHOTO_FETCH_FAILED` / `PHOTO_UPLOAD_FAILED`.

**What to do instead:** stage the image on public object storage first and pass the URL. Do not transcode to WebP on the way — serve the JPEG or PNG that Google's own media policy names.

### LSM-POSTS-07 · Local Posts reject video with HTTP 500

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-22
**Probe:** `POST accounts/{a}/locations/{l}/localPosts` with `media: [{mediaFormat: "VIDEO", sourceUrl: "<public mp4>"}]` → HTTP **500 INTERNAL**, reproduced twice

Not a 400, not a validation message — a server error. The Business Profile web interface accepts video on a post, so operators reasonably assume the API does too; the UI reaches video through internal endpoints that are not part of the public surface. No official page states that posts are photo-only, but every official example is photo-only, no error code names video, and no release note has ever shipped it.

UI parity is not API parity, and a deterministic 500 that reproduces on demand is a property of the endpoint, not of the caller.

**What to do instead:** plan post media as photos permanently. Video on a profile is possible through the separate v4 **location media** API (gallery video, published limits 30 seconds / 75 MB / 720p or better) — that is a different feature from posts, appearing in the photo gallery rather than on a post.

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

| `state` | Means |
| --- | --- |
| `PROCESSING` | submitted, under review, not visible |
| `LIVE` | published and visible |
| `REJECTED` | refused for content policy; never publishes |
| `SCHEDULED` | accepted, holding for `scheduledTime` |
| `RECURRING` | part of a recurrence |

A 200 means Google accepted the request. Whether anything appears on the profile is a separate question, answered by `state` on the create response and by re-reading the post afterwards.

**What to do instead:** record `state` at creation and re-read it before telling anyone the post is live. A workflow that reports success on the HTTP status will report success for rejected posts, permanently.

### LSM-POSTS-12 · A phone number in post text is an explicit policy violation

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Business Profile photos & videos policy and posts content policy* (`support.google.com/business/answer/7213077`), read 2026-07-27; the page carries no revision date. Verbatim: *"To avoid the risk of abuse, we do not allow your post content to include a phone number."*

This is the most common real-world cause of `REJECTED`. It applies to the post body, and there is no exception for a phone number the profile already publishes.

*This is our reading of published terms, not legal advice.*

**What to do instead:** block phone-shaped strings before publishing and offer the `CALL` action type instead, which uses the profile's verified number and carries no URL ([LSM-POSTS-05](#lsm-posts-05--every-cta-type-requires-a-url-except-call-which-must-not-have-one)). Note that a "no phone numbers" filter will also catch some dates and prices; treat high-confidence patterns as hard blocks and ambiguous digit groups as warnings, or you will refuse legitimate posts.

### LSM-POSTS-13 · Chain-detected locations are refused from posting entirely

**Verdict:** WORKS
**Last verified:** 2026-07-22
**Probe:** create a post on a location Google has classified as a chain → error body containing `LOCATION_DISABLED_FOR_LOCAL_POST_API`

This is an official error code, returned wholesale — the location cannot post through the API at all, regardless of content. The widely repeated "more than 10 locations" threshold for chain detection is community lore; Google publishes no threshold and the classification is not exposed as a readable field.

**What to do instead:** detect the code and say so plainly rather than retrying. There is no request-level workaround; posting for that location has to happen in the Business Profile interface.

### LSM-POSTS-14 · Per-post metrics do not exist through any API

**Verdict:** GONE
**Last verified:** 2026-07-22
**Probe:** `reportInsights` on the v4 localPosts surface — discontinued 2023-02-20. The Performance v1 API's metric set (11 daily metrics, probed 2026-07-13) contains no post-level dimension.

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
**Source:** v4 `LocalPost` reference, `Last updated 2026-04-15 UTC` — `ALERT` is documented as *"High-priority, and timely announcements related to an ongoing event"*, and Google's guidance elsewhere describes it as not always available for authoring. We have never created one.

**What to close it:** attempt an `ALERT` create on a verified location and record the response.

**Consequence:** do not offer `ALERT` in a composer. Build `STANDARD`, `EVENT` and `OFFER`, which are all confirmed authorable.

---

## Profile writes

### LSM-GBP-01 · v4 resource names need the account segment — a bare `locations/{id}` 404s everything

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** call any v4 endpoint with a resource path built from the Business Information location name alone — `v4/locations/{id}/reviews` — and compare against `v4/accounts/{a}/locations/{l}/reviews`. The first 404s; the second returns data.

This is the highest-yield trap in the whole owner-side API, because the two APIs disagree about what a location is called:

| API | Location resource name | Account segment |
| --- | --- | --- |
| Business Information v1 | `locations/{locationId}` | absent |
| My Business v4 (reviews, media, localPosts) | `accounts/{a}/locations/{l}` | **required** |

The failure is subtle because it is a *derivation* bug, not a call bug. Splitting the Business Information name on `/locations/` to recover an account yields nothing usable, and the malformed value gets persisted at connection time. Every later v4 call — review sync, reply publish, post create, media upload — 404s against a profile that is genuinely connected, and the connection itself looks healthy.

**What to do instead:** capture the owning account at the moment you list locations (`accounts/{a}/locations`), and store it alongside the location. Validate stored account names against `^accounts/` before use and re-resolve anything that fails, because a value that merely exists is not a value that is well formed.

### LSM-GBP-02 · 10 edits per minute per profile, shared across every kind of edit

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile API usage limits (`developers.google.com/my-business/content/limits`), `Last updated 2026-05-07 UTC` — verbatim: *"Edits: 10 per minute per Google Business Profile (cannot be increased)"*

| Limit | Value | Scope |
| --- | --- | --- |
| Default requests | 300 QPM | per API, per project |
| Edits | 10 per minute | per profile — **cannot be increased** |
| Update Location requests | 10,000 QPD | per project |
| Create Location requests | 300 QPD | per project |

The parenthetical is the important part. Quota increases are available for the per-project request limits and are not available for the edit cap.

The cap is per *profile*, not per feature, which makes it a single shared budget. A profile-field write, an attribute update, an undo, a post create and a post delete all draw on the same ten. A bulk operation that looks safe in isolation — nine attribute writes — leaves one edit for everything else happening on that profile in the same minute.

**What to do instead:** enforce one budget per profile across every write path you own, not one per feature. Feature-scoped limiters each staying "under 10" will collectively blow the cap and produce refusals that look random.

### LSM-GBP-03 · Business Information writes need an explicit `updateMask`; attributes are a different resource

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

### LSM-GBP-04 · Attribute ids in the mask but absent from the body are UNSET

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `PATCH locations/{id}/attributes?attributeMask=attributes/a,attributes/b` with a body containing only `attributes/a` → `attributes/b` is cleared

This is the documented semantics of a mask, and it is the only way to clear an attribute — there is no delete call. It is also how an attribute write silently erases neighbouring values: a mask listing five ids and a body carrying three unsets the other two.

**What to do instead:** build the mask from the body, not from the picker's full option list. When you need an undo, read the live values of exactly the ids you are about to touch *before* writing, and restore from that snapshot — a stored mirror of what you last wrote is not the same thing as what is on the profile now.

### LSM-GBP-05 · The open state is called `OPEN` on the write API and `OPERATIONAL` on the read API

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

### LSM-GBP-06 · The 750-character description limit is folklore, not a documented one

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Add or edit your business description* (`support.google.com/business/answer/3038177`), read 2026-07-27 — the page describes what the description should contain and prohibits promotional pricing and links, and states **no character limit**.

750 is quoted as gospel across the industry and we truncate at it defensively. We have not probed where the API actually rejects, and Google's own help page does not state a number.

**What to close it:** patch `profile.description` with 751, 1,000 and 1,500 characters and record the first rejection.

**Consequence:** write descriptions at 750 or under — the cost of being wrong in that direction is zero — but do not tell a client "the limit is 750" as though Google said so. It currently does not.

### LSM-GBP-07 · A 2xx PATCH is an accepted edit, not a published one

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** patch a field, then immediately re-read the location. The write returns 200; the read can still show the old value while Google reviews the change.

Most profile edits go through review before they become public — usually minutes, sometimes days, and an edit can be rejected or altered by Google rather than applied. Business Information exposes `locations.getGoogleUpdated`, which returns Google's own version of a location, so the divergence between what you wrote and what Google decided is observable.

**What to do instead:** treat every applied edit as unconfirmed until a subsequent read of the live profile shows it. A rejected edit re-reads as the old value, so a re-read is also how a failed change resurfaces honestly instead of disappearing into your own mirror. Reporting "we updated the hours" off the HTTP status is how a fix that Google reverted stays in a client report for a quarter.

### LSM-GBP-08 · Editing name, category or address can force re-verification

**Verdict:** WORKS
**Last verified:** 2026-07-23
**Source:** Google's verification guidance plus consistent operator experience; the API returns no distinct signal, so this is a property of the profile lifecycle rather than of the call.

The write succeeds like any other. What follows is the problem: the listing can go into a pending or temporarily unpublished state for hours to days, can drop out of Search and Maps until approved, can have the change silently reverted, and in rare cases can trigger a suspension that needs manual reinstatement.

| Field | Re-verification risk |
| --- | --- |
| Phone, website, hours, open status, description, attributes, photos | Standard review |
| Business name (`title`) | Can force re-verification |
| Primary or additional category | Can force re-verification |
| Address / service area | Can force re-verification |

*(inference)* The grouping is drawn from which fields define the entity's identity to Google rather than from any published list; treat it as a risk ranking, not a contract.

**What to do instead:** separate these three fields from routine edits in any tool or process you build, and make them a deliberate decision with an explicit acknowledgement rather than a form save. Never batch a name change with unrelated cleanup — if the listing goes pending, you want exactly one variable to explain it.

### LSM-GBP-09 · Location photos upload by a three-step bytes handshake, with no public URL required

**Verdict:** WORKS
**Last verified:** 2026-07-13
**Probe:** `POST v4/accounts/{a}/locations/{l}/media:startUpload` → `POST /upload/v1/media/{resourceName}?upload_type=media` with the raw bytes → `POST v4/accounts/{a}/locations/{l}/media` with `{mediaFormat: "PHOTO", dataRef: {resourceName}}`

Three calls per photo. Gallery media is the exact inverse of post media ([LSM-POSTS-06](#lsm-posts-06--sourceurl-is-the-only-supported-media-transport-for-a-post)): the location surface takes bytes and does not need a public URL, the posts surface takes only a public URL and refuses bytes. Google's own error text on the wrong path says it supports uploading media from bytes for locations.

**What to do instead:** budget three API calls per gallery photo when planning quota, and do not attempt to share one upload implementation between gallery photos and post photos. They are different transports with opposite requirements.

### LSM-GBP-10 · You can delete photos you uploaded; you cannot delete customer photos, replace atomically or reorder

**Verdict:** WORKS
**Last verified:** 2026-07-23
**Probe:** `DELETE v4/accounts/{a}/locations/{l}/media/{mediaId}` succeeds for owner-uploaded media. There is no endpoint that removes customer-contributed media, no replace call, and no position field on a media item.

"Replace this photo" is delete plus upload, in that order, as two edits against the shared budget ([LSM-GBP-02](#lsm-gbp-02--10-edits-per-minute-per-profile-shared-across-every-kind-of-edit)). Deletion is not undoable through the API — Google does not hand the bytes back.

Owner-uploaded photo view counts are also absent: the media resource probed on 2026-07-13 carried no view-count field.

**What to do instead:** keep your own copy of every image you upload, confirm deletions before you make them, and route complaints about a bad customer photo to Google's reporting flow rather than looking for an API for it.

### LSM-GBP-11 · A location's owning account is not recoverable from the location alone

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-14
**Probe:** partially run. With one personal account, guessing `accounts[0]` from `accounts.list` resolves correctly and v4 calls succeed. We have not run the multi-account case.

A personal Google account has exactly one Business Profile account, so the guess is safe there. Users who administer several accounts — agencies, most obviously — break the assumption, and the location resource carries no back-reference to its owner.

The open part is what a *write* does when the account is wrong. A v4 call against a valid-but-wrong `accounts/{a}/locations/{l}` path is the leading suspect for a reply that returns 2xx and never appears ([LSM-REVIEWS-01](#lsm-reviews-01--a-2xx-on-the-reply-put-is-not-proof-the-reply-is-public)), but we have not reproduced it deliberately.

**What to close it:** publish a reply through a path whose account segment belongs to a different account you administer, and record the status code and whether the reply appears.

**Consequence:** thread the account from the list call that produced the location and never infer it. Log the exact resource path on every write, so "sent but not visible" is diagnosable after the fact rather than being a guess.

### LSM-GBP-12 · Uploaded photos are reviewed before they appear — Google documents 24–48 hours

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Business Profile Help, *Manage photos and videos for your Business Profile* (`support.google.com/business/answer/6103862`), read 2026-07-27 — verbatim: *"It can take up to 24–48 hours before your photos and videos show on your Business Profile."*

The upload call returns a media resource name immediately. Visibility is a separate, later event, and review can end in the photo not appearing at all.

**What to do instead:** never verify a photo upload by looking at the profile straight afterwards, and do not report a photo count from your own upload log. Count what Google lists back, at least a day later.

---

## Review replies

### LSM-REVIEWS-01 · A 2xx on the reply PUT is not proof the reply is public

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `PUT v4/accounts/{a}/locations/{l}/reviews/{r}/reply` with `{comment}`, then `GET v4/accounts/{a}/locations/{l}/reviews/{r}` and check for `reviewReply.comment`

The PUT can succeed while the reply never surfaces. The two causes we have identified are a profile that is not in a verified state and a write aimed at the wrong account or location path — the second is unconfirmed and tracked at [LSM-GBP-11](#lsm-gbp-11--a-locations-owning-account-is-not-recoverable-from-the-location-alone).

Write-to-read propagation is usually immediate; a single short retry covers the rest. Nothing about the status code distinguishes "published" from "accepted and lost".

**What to do instead:** read the review back and require your own reply text to be present before reporting success anywhere — to a client, to a dashboard, or to a billing record. A read-back is one extra call and it converts a class of silent failure into a visible error.

This is also the concrete argument against an unattended reply loop: a pipeline that publishes on a trigger and never reads back cannot distinguish a published reply from a lost one, and will report a month of replies that nobody outside your system ever saw. Draft with a model if you like; keep a human between the draft and the PUT, and read the result back.

### LSM-REVIEWS-02 · The reply length cap is unconfirmed

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-27
**Probe:** not run. We truncate replies at 4,096 characters before sending and have never observed the server's rejection point. The v4 `reviews.updateReply` reference (`Last updated 2026-04-07 UTC`) states no limit for the `comment` field.

4,096 is the number the integration ecosystem uses. It may well be right. It is not something we can currently defend.

**What to close it:** publish a 4,097-character reply to a review on a test profile and record the response.

**Consequence:** stay well under 4,096 — which you should anyway, since a reply longer than a few sentences is read by nobody — and do not cite a number as Google's.

### LSM-REVIEWS-03 · Only reviews read through the owner v4 path are replyable

**Verdict:** WORKS
**Last verified:** 2026-07-14
**Probe:** attempt a reply against a review identifier obtained from the Places API → there is no addressable v4 reply target for it

Review identifiers are not shared between surfaces. A review read from Places carries a Places identifier; the reply endpoint takes a v4 review name under `accounts/{a}/locations/{l}/reviews/`. The same human review has two different ids depending on how you fetched it.

**What to do instead:** sync reviews through the owner API before offering a reply action at all. If you migrate a stored review set from a Places-sourced sample to owner-sourced history, reconcile the two id spaces deliberately — matching on rating plus publish time within a small tolerance, tolerating author renames — or you will duplicate every review in your own store.

### LSM-REVIEWS-04 · A published reply can disappear, and re-reading is the only way to notice

**Verdict:** WORKS
**Last verified:** 2026-07-21
**Probe:** `GET v4/accounts/{a}/locations/{l}/reviews/{r}` on a review whose reply you previously published, and check whether `reviewReply` is still present

Google is the source of truth for reply text and reply time. A reply can be removed on Google's side — by moderation, or by the review itself being removed — and nothing pushes that event to you. A local record saying "replied" survives the reply.

**What to do instead:** re-verify replies rather than trusting your own mirror, and let an incoming state from Google overwrite yours in both directions: a reply present on Google that you do not have is an upsert, and a reply gone from Google is a deletion. Owner-side response-rate figures computed from a local table that only ever grows will drift upward and never come back.

---

## Media policy

*This section is our reading of published terms, not legal advice.*

### LSM-POLICY-01 · Profile media must be media you captured — AI-generated and stock imagery is out of policy

**Verdict:** WORKS
**Last verified:** 2026-07-27
**Source:** Google Maps contribution policies, *Photos & videos posting criteria* (`support.google.com/contributionpolicy/answer/7411351`), read 2026-07-27; page carries no revision date. Verbatim:

> Use media that you captured. Upload media of a place that you captured using a camera.

> Create the media at the location you're posting to. Relevant photos and videos are created at the location you're posting about.

and, in the prohibited list:

> screenshots, stock photos, GIFs, collages, heavily edited or otherwise manipulated photos, or imagery created by other parties

An AI-generated image is imagery created by another party and was not captured with a camera at the location. It fails both criteria, and community reporting is consistent that such images are auto-rejected.

**What to do instead:** generate post and profile **text** with a model if you want to; source **images** from the business — the owner's phone is fine, and better than fine. This is a policy constraint, not a quality preference, and building AI image generation into a profile workflow is building a rejection pipeline. If you need to fill a thin gallery quickly, book an hour of the owner's time and shoot twenty photos on site.

### LSM-POLICY-02 · The published quality bar is "represent reality", which rules out heavy manipulation

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
