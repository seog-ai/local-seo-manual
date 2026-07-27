---
title: Storing Google data legally
sidebar_position: 4
description: What Google's published terms permit you to store from the Places and Business Profile APIs — every clause quoted verbatim with its section number and revision date, plus the questions the documents do not answer.
draft: true
---

> **Unpublished draft.** This chapter is held back from publication pending review by counsel.
> It is in the repository so it can be read and corrected, not because it is finished. Do not
> cite it as settled, and do not treat any entry in it as advice.

# Storing Google data legally

Every entry below is our reading of published terms, not legal advice. We are engineers who read the documents and quoted them; we are not your lawyers, and nothing here is a substitute for one.

Two things make this material worth writing down anyway. The first is that the industry's most repeated storage rule — that you may cache Places data for thirty days — does not appear in the terms at all, in the current version or in the archived one we compared it against ([LSM-POLICY-03](#lsm-policy-03--the-30-day-places-caching-allowance-does-not-exist-in-the-terms)). The second is that the two Google APIs a local SEO tool touches are governed by **two different documents with two different rules**, and conclusions from one do not transfer to the other ([LSM-POLICY-01](#lsm-policy-01--two-separate-regimes-govern-google-local-data-and-their-rules-do-not-transfer)).

**What this chapter is not.** It is not a claim that any particular product is in breach. We cannot see other operators' contracts. Google negotiates enterprise agreements; some tools buy their place data from third-party providers whose licences permit storage; some are billed from the EEA and governed by separate documents we have not read. A tool that shows you a two-year history of a competitor's review count may have an arrangement we know nothing about. These entries state what the published, generally-available terms say. Drawing a conclusion about a specific product from them requires facts about that product that are not public.

## How to read a policy entry

Behavioural entries elsewhere in Part V carry a **Probe** — an API call you can re-run. Policy entries carry a **Source** instead: the document, the section number, and the document's own revision date. You verify one by opening the document and reading the section, which is a reproducible act with a different failure mode from an API call. A few entries carry both, where there is also something observable (a string that is absent from a page, a URL that 404s).

The five verdicts map onto documents like this.

| Verdict | For a policy entry, means |
| --- | --- |
| `WORKS` | The clause is present and in force in the cited document, as of the verified date |
| `GONE` | Language that used to be in the terms, or used to be Google's published guidance, and no longer is |
| `NEVER WORKED` | A permission the industry widely believes exists, which is not in the current document or in the archived version we compared |
| `UNDOCUMENTED` | The documents are silent on the point, and the silence is itself the fact |
| `OPEN QUESTION` | The clause exists but its application to a common architecture cannot be settled from the text |

All documents below were fetched and quoted on **2026-07-16**. Each entry's `Last verified` is that date. The re-probe trigger for this area is a change to the source document's own revision date; several of these documents changed within a month of being read, so check the stamps before relying on an entry.

## The controlling documents

> Our reading of published terms, not legal advice.

| Document | URL | Its own revision date | Governs |
| --- | --- | --- | --- |
| Google Maps Platform Terms of Service | `cloud.google.com/maps-platform/terms` | Last modified June 23, 2026 | Everything from Places API |
| Google Maps Platform Service Specific Terms | `cloud.google.com/maps-platform/terms/maps-service-terms` | Last modified June 10, 2026 | The per-API caching grants |
| Policies and attributions for Places API | `developers.google.com/maps/documentation/places/web-service/policies` | Last updated 2026-07-10 UTC | Display and attribution of Places content |
| Place IDs guide | `developers.google.com/maps/documentation/places/web-service/place-id` | Last updated 2026-07-10 UTC | Place ID storage and refresh |
| Business Profile APIs policies | `developers.google.com/my-business/content/policies` | Last updated 2025-08-28 UTC | Owner-consented GBP data |
| Business Profile third-party policies | `support.google.com/business/answer/7353941` | **No revision date shown** (© 2026 page) | Agencies managing others' profiles |
| Google API Services User Data Policy | Google API Services User Data Policy page | Last updated February 15, 2024 | All OAuth-scope data |
| Google OAuth 2.0 Policies | Google Identity OAuth policies page | Changelog entries through December 15, 2025 | Token handling |
| GMP Service Specific Terms (archived) | `cloud.google.com/archive/maps-platform/terms/maps-service-terms-20250501` | Last modified May 01, 2025 | Version comparison only |

Two scope notes that change which documents apply to you. The Terms of Service and Service Specific Terms above are the **non-EEA** versions — see [LSM-POLICY-38](#lsm-policy-38--eea-billed-customers-are-governed-by-separate-documents-not-read-here). And the Business Profile third-party policies page displays no last-updated date at all, so there is no way to tell from the page whether the version you are reading is the version you read last year.

## The storage decision table

> Our reading of published terms, not legal advice. This table is a summary of the entries below; where the two disagree, the entry and its quote win.

| Data | Source API | May you store it? | For how long | Entry |
| --- | --- | --- | --- | --- |
| Place ID | Places | Yes | Indefinitely (refresh at 12 months) | [POLICY-04](#lsm-policy-04--place-ids-are-exempt-from-the-caching-restrictions-and-may-be-stored-indefinitely) |
| Latitude / longitude | Places | Yes | ≤ 30 consecutive calendar days, then delete | [POLICY-05](#lsm-policy-05--places-latitudelongitude-may-be-cached-for-30-consecutive-calendar-days-then-must-be-deleted) |
| Business name | Places | No | — | [POLICY-06](#lsm-policy-06--copying-and-saving-business-names-addresses-or-user-reviews-is-named-as-prohibited-scraping) |
| Address | Places | No | — | [POLICY-06](#lsm-policy-06--copying-and-saving-business-names-addresses-or-user-reviews-is-named-as-prohibited-scraping) |
| Rating, review count | Places | No | — | [POLICY-02](#lsm-policy-02--the-default-rule-for-places-content-is-no-caching-at-all) |
| Review text, author | Places | No | — | [POLICY-06](#lsm-policy-06--copying-and-saving-business-names-addresses-or-user-reviews-is-named-as-prohibited-scraping) |
| Opening hours, attributes, photo references | Places | No | — | [POLICY-02](#lsm-policy-02--the-default-rule-for-places-content-is-no-caching-at-all) |
| Any content from the Business Profile APIs | GBP | Limited amounts, for performance only | ≤ 30 calendar days, unaggregated | [POLICY-23](#lsm-policy-23--business-profile-api-content-is-capped-at-30-calendar-days-and-cannot-be-manipulated-or-aggregated) |
| The merchant's own reviews via their own OAuth grant | GBP | **Unsettled** | — | [POLICY-33](#lsm-policy-33--open-whether-the-30-day-gbp-cap-applies-to-a-merchants-own-data-under-their-own-oauth-grant) |
| Your own computed metrics (scores, positions, deltas) | Yours | Yes — but see the GBP aggregation wording | — | [POLICY-23](#lsm-policy-23--business-profile-api-content-is-capped-at-30-calendar-days-and-cannot-be-manipulated-or-aggregated), [POLICY-36](#lsm-policy-36--open-whether-a-rank-time-series-keyed-on-place-ids-is-google-maps-content) |
| Data you bought from a licensed third-party provider | Not Google | Per that provider's licence | Per that licence | — |

---

## Places: what may be stored

> Our reading of published terms, not legal advice.

### LSM-POLICY-01 · Two separate regimes govern Google local data, and their rules do not transfer

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service (last modified 2026-06-23) and Business Profile APIs policies (last updated 2025-08-28 UTC), read side by side

Public place data and owner-consented profile data come from different APIs under different contracts. Nothing about the Places rules constrains GBP, and nothing about the GBP rules loosens Places.

| | Places API | Business Profile APIs |
| --- | --- | --- |
| What it returns | Public data on any business | Data on profiles you own or are authorised to manage |
| Access | An API key | The merchant's OAuth grant (`business.manage`) |
| Governing document | GMP Terms of Service + Service Specific Terms | Business Profile APIs policies + User Data Policy |
| Storage rule | No caching except place ID and lat/lng | ≤ 30 calendar days, unaggregated |
| Attribution | Google Maps logo or text required | Google-provided attribution must survive unaltered |

**Consequence:** Every storage question has to be asked twice — once per source. The same field (a rating, a review) carries different obligations depending on which API delivered it, which means a data model that mixes the two in one row is a model you cannot reason about.

### LSM-POLICY-02 · The default rule for Places content is no caching at all

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(b) (No Caching), last modified June 23, 2026

> No Caching. Customer will not cache Google Maps Content except as expressly permitted under the Maps Service Specific Terms.

The clause is a default-deny. It does not enumerate what you may not store; it prohibits everything and defers the exceptions to a second document. The Places API's exceptions in that second document are two, and they are entries [LSM-POLICY-04](#lsm-policy-04--place-ids-are-exempt-from-the-caching-restrictions-and-may-be-stored-indefinitely) and [LSM-POLICY-05](#lsm-policy-05--places-latitudelongitude-may-be-cached-for-30-consecutive-calendar-days-then-must-be-deleted). Google's own plain-language restatement on the Places policies page (last updated 2026-07-10 UTC) reads: "You must not pre-fetch, cache, or store Places API content beyond the allowed exceptions, although the `place_id` is exempt from caching restrictions."

**What to do instead:** Design so that Google fields are read at display time and not persisted — store the place ID plus your own derived values, and re-issue the request when you need the content again. If you need durable historical business attributes, they have to come from somewhere other than the Places API.

### LSM-POLICY-03 · The "30-day Places caching allowance" does not exist in the terms

**Verdict:** NEVER WORKED
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms §B.14 "Places API (Legacy and New)" (last modified June 10, 2026), compared against the archived Service Specific Terms §5.4 (last modified May 01, 2025)
**Probe:** Read §B.14 in full in the current document, then §5.4 in the archived document, and look for any grant covering a field other than latitude and longitude. There is none in either.

The widely repeated rule is that Places data may be cached for thirty days. What the terms grant for thirty days is latitude and longitude, and nothing else. The current section:

> 14.3 Caching. Customer may temporarily cache latitude and longitude values from the Places API for up to 30 consecutive calendar days, after which Customer must delete the cached latitude and longitude values.

And the same grant a year earlier, in the archived version:

> 5.4 Caching. Customer can temporarily cache latitude (lat) and longitude (lng) values from the Places API for up to 30 consecutive calendar days, after which Customer must delete the cached latitude and longitude values. Customer can cache Places API Place ID (place_id) values, in accordance with the Places API Policies.

Two further points close the likely escape routes. The section is titled "Places API (Legacy and New)", so one rule set covers both — there is no laxer legacy regime to fall back on. And the March 2025 Essentials/Pro/Enterprise SKU restructuring changed pricing, not caching: the archived May 2025 text and the June 2026 text grant the same two things.

*(Inference)* Our reading of where the folklore comes from: other Maps Platform APIs **do** have per-field caching tables — Address Validation, Air Quality, Pollen, Weather, Solar — and several of their rows read "30 consecutive calendar days". The pattern is real; it just does not apply to Places.

**Consequence:** If your architecture rests on a thirty-day Places cache, it rests on a clause that is not in the document. Read §B.14 yourself before believing this entry, and read it again before believing the blog post that told you otherwise.

### LSM-POLICY-04 · Place IDs are exempt from the caching restrictions and may be stored indefinitely

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms §A.3 (Google ID Caching), last modified June 10, 2026; Policies and attributions for Places API, "Exceptions from caching restrictions", last updated 2026-07-10 UTC; Place IDs guide, last updated 2026-07-10 UTC

> Customer may cache the Google ID values from the Services that return such field and allow caching, in accordance with its Documentation. For example, Customer may cache (a) place_id from Places API, Directions API, Geolocation API and Routes API, (b) pano_ID, from Street View Static API, and (c) video_ID from Aerial View API.

The developer documentation states the same permission in plainer terms and adds a refresh recommendation:

> Place IDs are exempt from the caching restrictions stated in Section 3.2.3(b) of the Google Maps Platform Terms of Service. You can therefore store place ID values for later use. … Because Place IDs may change due to updates on the Google Maps database, Google recommends refreshing place IDs if they are more than 12 months old. You can refresh Place IDs at no charge by making a Place Details request, specifying only the place ID field in the fields parameter.

**What to do instead:** Make the place ID your primary key for every business you track, including competitors, and hang your own derived data off it. Refresh IDs older than twelve months with an IDs-only Place Details request, which is not billed. Note the interaction with [LSM-POLICY-09](#lsm-policy-09--on-termination-you-must-delete-all-content-from-the-services): "indefinitely" lasts as long as the agreement does.

### LSM-POLICY-05 · Places latitude/longitude may be cached for 30 consecutive calendar days, then must be deleted

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms §B.14.3 (Caching), last modified June 10, 2026

> 14.3 Caching. Customer may temporarily cache latitude and longitude values from the Places API for up to 30 consecutive calendar days, after which Customer must delete the cached latitude and longitude values.

Three words in that sentence do work. **"Temporarily"** frames the grant as a cache, not a store. **"Consecutive"** means the clock does not reset because you stopped looking at the row; it runs from when you cached the value. **"Delete"** is an affirmative act — the clause does not say "stop using", it says delete, which implies a scheduled job and, in practice, a record that the job ran.

**What to do instead:** Put a deletion sweep on any Places-sourced coordinate column and make it auditable. If the coordinate is load-bearing for something long-lived — a map pin on a saved report — either regenerate it from the place ID at render time or source it from an API whose grant is broader; the Geocoding contrast in [LSM-POLICY-07](#lsm-policy-07--geocoding-has-an-indefinite-per-field-caching-grant-that-places-does-not) is the relevant comparison.

### LSM-POLICY-06 · Copying and saving business names, addresses or user reviews is named as prohibited scraping

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(a) (No Scraping), last modified June 23, 2026

> No Scraping. Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services. For example, Customer will not: (i) pre-fetch, index, store, reshare, or rehost Google Maps Content outside the services; (ii) bulk download Google Maps tiles, Street View images, geocodes, directions, distance matrix results, roads information, places information, elevation values, and time zone details; (iii) copy and save business names, addresses, or user reviews; or (iv) use Google Maps Content with text-to-speech services.

This clause matters because it is specific. A general no-caching rule invites argument about what counts as a cache; sub-clause (iii) names the three fields a local SEO tool most wants to keep, and names them as examples of scraping rather than of caching. Sub-clause (i) independently prohibits "pre-fetch, index, store, reshare, or rehost" — five verbs, of which at least two describe any competitor-tracking table with a `name` column in it.

**Consequence:** "We only cache it for performance" is not responsive to §3.2.3(a). The clause does not turn on duration or intent; it names the act of copying and saving those fields.

### LSM-POLICY-07 · Geocoding has an indefinite per-field caching grant that Places does not

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms §B.6.3.2 (Geocoding API Caching), last modified June 10, 2026 — cited here as a contrast provision

> 6.3.2 Customer may indefinitely cache latitude (lat), longitude (lng), formatted_address, and the structured address values from the Geocoding API solely to support the direct, End User facing functionality of the Customer Application that initiated the request (e.g., displaying the address of a location in a weather application, associating location data with a photograph), only where the cache is not used as a replacement for making an additional call to the Services. Cached data must be logically isolated to the specific End User it is associated with and must not be used across multiple End Users.

The entry exists to close an argument by analogy. Google plainly knows how to grant durable per-field storage, with conditions, when it intends to — and did not do so for Places. That is a deliberate difference between two sections of the same document, not an oversight you may read across.

Note also the conditions attached even to the grant that exists: purpose-limited to the End User whose request produced the data, not usable as a substitute for calling again, and **logically isolated per End User**. A shared competitor-profiles table serving every customer would not satisfy those conditions even if Places had this clause.

**Consequence:** Do not build on "Geocoding allows it, so Places must". The absence of a parallel clause in §B.14 is the point.

### LSM-POLICY-08 · "Google Maps Content" is defined to include business listings

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §20 (Definitions), last modified June 23, 2026

> "Google Maps Content" means any content provided through the Services (whether created by Google or its third-party licensors), including map and terrain data, imagery, traffic data, and places data (including business listings).

The definition is what makes every restriction in §3.2.3 bite on a competitor profile. A rating, a review count, an opening-hours block and a photo reference are all "places data (including business listings)", and therefore all inherit the caching, scraping, derivation and redistribution rules.

The same section defines the boundary of your licence:

> "Customer Application" means any web page or application (including all source code and features) that has material value independent of the Services and is owned or controlled by Customer, or that Customer is authorized to use.

**Consequence:** There is no field in a Places response that is outside the definition except the ones expressly carved out. And "material value independent of the Services" is a definitional test, not marketing language — an application whose value *is* the Google data is not a Customer Application under this definition.

### LSM-POLICY-09 · On termination you must delete all content from the Services

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §10.6 (Effects of Termination), last modified June 23, 2026

> If this Agreement terminates: (a) all rights and access to the Services will terminate; (b) all Fees owed by Customer to Google are immediately due upon receipt of the final electronic bill or as stated in the final invoice; and (c) Customer will delete the Software and any content from the Services by the termination effective date.

"Any content from the Services" is broader than the caching rules, and it has no carve-out for the fields you were otherwise permitted to keep. *(Inference)* On the plain text this reaches stored place IDs too: the permission to hold them comes from an agreement that has ended.

Worth recording alongside it: the pre-2018 Maps APIs terms contained a "delete when Google updates the data" obligation, and that language no longer appears. The current operative deletion triggers, on our reading, are per-field TTL expiry and termination.

**What to do instead:** Write the deletion runbook while you still have an agreement. A termination-triggered obligation you have never tested is a promise, not a control.

---

## Places: prohibited uses

> Our reading of published terms, not legal advice.

### LSM-POLICY-10 · "Customer will not" is defined to include "will not permit a third party to"

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2 (License Requirements and Restrictions), last modified June 23, 2026

> In this Section 3.2 (License Requirements and Restrictions), the phrase "Customer will not" means "Customer will not, and will not permit a third party to".

One sentence that converts every restriction in §3.2 into a duty to control other people. Your clients, your agency partners, your white-label resellers and any AI agent acting through your product are all third parties whose conduct you are answerable for.

**Consequence:** Restrictions have to be pushed down contractually *and* enforced technically. "Our customer did that, not us" is not available as a reading of §3.2, and a feature that lets a customer bulk-extract place data makes their extraction your restriction to have prevented.

### LSM-POLICY-11 · Using Google Maps Content to train, test, validate or fine-tune models is prohibited

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(c) (No Creating Content From Google Maps Content), last modified June 23, 2026

> No Creating Content From Google Maps Content. Customer will not create content based on Google Maps Content. For example, Customer will not: … (vii) use Google Maps Content to improve machine learning and artificial intelligence models, including to train, test, validate or fine-tune the models.

The verb list is unusually complete: **train, test, validate, fine-tune**. Evaluation sets and benchmark corpora are named as clearly as training sets, which forecloses the "we only used it to measure" reading.

Whether passing Places content through a model at inference time is caught is a separate and unsettled question — [LSM-POLICY-37](#lsm-policy-37--open-whether-inference-time-llm-use-of-google-maps-content-is-caught-by-the-training-prohibition).

**Consequence:** If you capture prompts and responses for later model work, Google Maps Content has to be excluded from that capture at the point of logging, not filtered out later.

### LSM-POLICY-12 · Point-in-polygon analysis on Places coordinates is named as prohibited content creation

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(c) (No Creating Content From Google Maps Content), last modified June 23, 2026

> Customer will not create content based on Google Maps Content. For example, Customer will not: … (iv) use latitude/longitude values from the Places API as an input for point-in-polygon analysis;

This example is aimed at exactly the operation a geographic analysis wants to perform: take the coordinates a Places response gave you, and ask which region, catchment or service area they fall inside.

**What to do instead:** Where the geometry question is about *your own* business or a customer-supplied service area, use coordinates you did not get from the Places API. Where it is about a competitor's location, note that the coordinate is both a 30-day-TTL field ([LSM-POLICY-05](#lsm-policy-05--places-latitudelongitude-may-be-cached-for-30-consecutive-calendar-days-then-must-be-deleted)) and a prohibited input to this specific analysis.

### LSM-POLICY-13 · Listings and directory services, and augmenting an advertising product, are prohibited uses

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(d) (No Re-Creating Google Products or Features), last modified June 23, 2026

> Customer will not use the Services to create a product or service with features that are substantially similar to or that re-create the features of another Google product or service. Customer's product or service must contain substantial, independent value and features beyond the Google products or services. For example, Customer will not: (i) re-distribute the Google Maps Core Services or pass them off as if they were Customer's services; (ii) use the Google Maps Core Services to create a substitute of the Google Maps Core Services, Google Maps, or Google Maps mobile apps, or their features; (iii) use the Google Maps Core Services in a listings or directory service or to create or augment an advertising product

The middle sentence is the operative test and it is not an example: your product **must contain substantial, independent value** beyond Google's. A screen that lists businesses near a point, with their ratings, is close to example (iii) by construction.

**Consequence:** The compliant framing for competitor work is analysis of one customer's own position — computed positions, deltas, scores — rather than a browsable inventory of businesses. Whether a given competitor feature crosses that line is a judgement about a specific product that this entry cannot make for you.

### LSM-POLICY-14 · Selling, reselling, sublicensing or distributing the Services is prohibited

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.1 (General Restrictions) and §3.1 (License Grant), last modified June 23, 2026

> Customer will not: … (b) sell, resell, sublicense, transfer, or distribute the Services;

The licence it restricts is narrow on its face:

> Subject to the Agreement's terms, during the Term, Google grants to Customer a non-exclusive, non-transferable, non-sublicensable, license to use the Services in Customer Application(s).

Reselling the Services themselves is reserved to Google-authorised Resellers, a defined term in §20 with its own ordering mechanics in §19.

**Consequence:** You may sell software that uses Google data. You may not sell Google data access as the product, and you may not sublicense your access to a partner. In a white-label arrangement, the partner is a distributor of *your* application — not a licensee of Google's Services — and the paperwork should say so.

### LSM-POLICY-15 · Places content may be shown without a map, but never with or near a non-Google map

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms §B.14.1–14.2 (last modified June 10, 2026); Google Maps Platform Terms of Service §3.2.3(e) (last modified June 23, 2026)

> 14.1 Use without a Google Map. Customer may use Google Maps Content from the Places API in Customer Applications without a corresponding Google Map. 14.2 No use with a non-Google map. Customer must not use Google Maps Content from the Places API in conjunction with a non-Google map.

And the general clause:

> To avoid quality issues and/or brand confusion, Customer will not use the Google Maps Core Services with or near a non-Google Map in a Customer Application. For example, Customer will not (i) display or use Places content on a non-Google Map, (ii) display Street View imagery and non-Google Maps on the same screen, or (iii) link a Google Map to non-Google Maps Content or a non-Google Map.

Map-free display is expressly permitted, which is often the surprising half. The prohibition is specifically on the combination.

**Consequence:** A grid visualisation plotting Places-derived results on Leaflet, Mapbox or OpenStreetMap is the named prohibited case. Use a Google map, or no map — a table of coordinates and positions is compliant where the same data on a rival basemap is not.

### LSM-POLICY-16 · Modifying the Services' search results is prohibited

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(g) (No Modifying Search Results Integrity), last modified June 23, 2026

> Customer will not modify any of the Google Maps Core Services' search results.

Read together with the ordering-disclosure requirement in [LSM-POLICY-21](#lsm-policy-21--review-lists-need-an-ordering-and-filtering-notice-and-france-requires-visitdate), the effect is that content is displayed as returned, and any re-ordering or filtering you apply on top has to be disclosed rather than presented as Google's own ranking.

**Consequence:** Do not truncate review text, re-score ratings, or silently drop results from a list you present as a search result. If your product applies its own sort, say so on the screen.

---

## Attribution

> Our reading of published terms, not legal advice.

### LSM-POLICY-17 · "Powered by Google" is not in any current document

**Verdict:** GONE
**Last verified:** 2026-07-16
**Source:** Policies and attributions for Places API, "Google Maps attribution requirements" note, last updated 2026-07-10 UTC
**Probe:** Full-text search the Places policies page, the GMP Terms of Service and the Service Specific Terms for the string `Powered by Google`. Zero hits in all three, as of 2026-07-16.

The attribution string moved twice: from "Powered by Google" to "Google", and now to "Google Maps". Google's own note on the transition:

> The following updated attribution requirements now use "Google Maps" instead of only "Google." We acknowledge that your existing implementations may use the attribution of "Google," in alignment with prior guidance, and you may continue using "Google" as an attribution for now. For new implementations, use "Google Maps" as described in this section. In the future, we will provide timelines and instructions to help you transition existing "Google" attributions to "Google Maps" attributions.

Note what is and is not tolerated. Existing **"Google"** attributions may continue "for now". "Powered by Google" is not mentioned as a tolerated legacy form — it simply is not in the documents.

**What to do instead:** Any new surface uses the Google Maps logo, or the exact text `Google Maps`. Assign someone to watch the policies page for the migration timeline Google says it will publish; that page changed as recently as 2026-07-10.

### LSM-POLICY-18 · Attribution is the Google Maps logo, with exact text as the space-constrained fallback

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Policies and attributions for Places API — "Display Google Maps attribution", "Logo attribution", "Text attribution", last updated 2026-07-10 UTC

> You must follow Google Maps attribution requirements when displaying Content from Google Maps Platform APIs in your app or website. You don't need to add extra attribution if the Content is shown on a Google Map where the attribution is already visible.

> Attribution should take the form of the Google Maps logo whenever possible. In cases where space is limited, the text Google Maps is acceptable. It must always be clear to end users which content is provided by Google Maps.

| Form | Published requirement |
| --- | --- |
| Logo | Official asset, unmodified, aspect ratio preserved; outlined variant on busy backgrounds, non-outlined on plain |
| Logo size | Minimum height 16dp, maximum 19dp |
| Logo clear space | 10dp left, right and top; 5dp bottom |
| Text | The exact string `Google Maps` — no capitalisation change, no wrapping onto two lines, no localisation |
| Text rendering | Prevent browser translation with the HTML attribute `translate="no"` |
| Text style | Roboto (or sans-serif fallback), weight 400, 12–16sp, white / `#1F1F1F` / `#5E5E5E`, 4.5:1 contrast |

Verbatim, on modification of the text:

> Don't modify the text Google Maps in any way: Don't change the capitalization of Google Maps Don't wrap Google Maps onto multiple lines Don't localize Google Maps into another language. Prevent browsers from translating Google Maps by using the HTML attribute translate="no".

The `translate="no"` requirement is the one most often missed, because the failure is invisible until a browser auto-translates the page and silently breaks the attribution.

**Consequence:** Where a rendered Google map is present, its own attribution covers the content on it. Everywhere else — cards, tables, lists, PDFs, emails — the mark has to be added deliberately.

### LSM-POLICY-19 · Attribution must sit in the same visual container, and Google content must be visually distinguished

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Policies and attributions for Places API — "Visual requirements", last updated 2026-07-10 UTC; Google Maps Platform Terms of Service §3.2.2(b), last modified June 23, 2026

> Position attribution near the top or bottom of the content, and within the same visual container. For a single line of content, attribution can be positioned to the right or left. Visually distinguish Google Maps Platform Content from other content by using UI cues such as a border, background color, shadow, or sufficient whitespace. Don't misrepresent Google Maps by attributing it with non-Google Maps Platform content. Verify that the attribution is always visible and legible. Never remove, hide, obscure, or modify it.

And the contractual backstop:

> Customer will display all attribution that (i) Google provides through the Services (including branding, logos, and copyright and trademark notices); or (ii) is specified in the Maps Service Specific Terms. Customer will not modify, obscure, or delete such attribution.

Two obligations run in opposite directions and are easy to breach at once. You must attribute Google's content — and you must **not** attribute your own content to Google. A dashboard mixing Google fields with your computed scores under one "Google Maps" mark misrepresents the second set as Google's.

**Consequence:** Mixed views need visual segregation, not just a footer. And in white-label or partner-branded deployments, theming cannot restyle the mark away: §3.2.2(b) forbids modifying, obscuring or deleting it regardless of whose brand is on the page.

### LSM-POLICY-20 · Every displayed review and photo needs author attribution and a live link to the source on Google Maps

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Policies and attributions for Places API — "Attribute all content to the content author" and "Provide direct access to the source content on Google Maps", last updated 2026-07-10 UTC

> You must always credit the author when displaying photos or reviews. Each photo and review includes an author attribution (author's avatar image, name, and profile link). Visual requirements for author attribution: Attribute the author using all available resources (avatar, name, and profile link) when space allows. For reviews, If space is limited, the minimum requirement is to display the author's avatar. For photos, if space is limited (such as in a gallery or for thumbnails), the author attribution can be omitted, provided that the user is able to access a larger version of the image that includes the full author attribution. Position author attribution so it is clearly associated with the author's photo or review.

(The capitalisation inside that quote is verbatim from the page.) And separately:

> For each photo and review, end-users must always have access to view the individual source photo or review on Google Maps using the provided googleMapsUri.

Third-party attribution strings the API returns must also be rendered:

> When we do, the text of your attribution must say the name "Google Maps" and the relevant data provider(s), such as "Map data: Google, Maxar Technologies." When Google provides third-party attribution, only including "Google Maps" or the Google logo is not proper attribution.

**Consequence:** The `googleMapsUri` requirement has an architectural implication that is easy to miss: a review displayed from a stale stored copy cannot reliably satisfy it, and a review printed into a static document cannot satisfy it at all unless the link is live and embedded. See [LSM-POLICY-35](#lsm-policy-35--open-whether-places-content-in-a-generated-pdf-or-email-is-display-or-storage) for the unsettled part.

### LSM-POLICY-21 · Review lists need an ordering and filtering notice, and France requires visitDate

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Policies and attributions for Places API — "Describe how reviews are ordered and filtered", "Display the month and year that reviewers visited places in France", "Compliance with applicable laws", last updated 2026-07-10 UTC

> Include a clear notice that describes how reviews are being ordered and filtered including any search criteria applied. By default, reviews are ordered by relevance.

> When displaying reviews of places in France and French territories, the Places API returns a visitDate (the month and year in which the author visited the place), which must be displayed alongside the content.

The page also warns that its softer-sounding items may be hard requirements elsewhere:

> You are required to adhere to all the applicable laws at all times. Note that practices labeled as (recommended) in these policies may still be mandated by law.

That sentence covers the items marked "(recommended)" on the page — relative publish dates, a content-reporting link, a translation notice, and an explanation of ranking factors. *(Inference)* Search-adjacent products serving EU users should assume the ranking-factors explainer is a legal duty rather than a suggestion, and confirm it against the applicable regulation.

**What to do instead:** Put a one-line ordering notice on any review list — "newest first" or "ordered by relevance (Google default)" — and treat the "(recommended)" list as a jurisdiction question rather than an optional polish item.

### LSM-POLICY-22 · Your terms must bind users to the Google Maps End User Additional Terms, and flow that down

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.2(a)(i)–(iii), last modified June 23, 2026; Policies and attributions for Places API, page summary, last updated 2026-07-10 UTC

> The Customer Application's terms of service will (A) notify users that the Customer Application includes Google Maps features and content; and (B) state that use of Google Maps features and content is subject to the then-current versions of the: (1) Google Maps End User Additional Terms of Service at https://maps.google.com/help/terms_maps/; and (2) Google Privacy Policy at https://policies.google.com/privacy.

> If the Customer Application allows users to include the Google Maps Core Services in Downstream Products, then Customer will contractually require that all Downstream Products' terms of service satisfy the same notice and flow-down requirements … If users of the Customer Application (and Downstream Products, if any) fail to comply with the applicable terms of the Google Maps/Google Earth Additional Terms of Service, then Customer will take appropriate enforcement action, including Suspending or terminating those users' use of Google Maps features and content in the Customer Application or Downstream Products.

The Places policies page adds the standalone requirement:

> Applications using the Places API must provide publicly accessible Terms of Use and a Privacy Policy that incorporate Google's Terms of Service and Privacy Policy, respectively.

**Consequence:** This is two obligations, not one. Publish the notice in your own terms, and — if partners or clients re-offer your product under their brand — contractually require the same notice in theirs, plus the ability to suspend a non-compliant one. Both links must point at the then-current versions, which means linking rather than copying the text.

---

## Business Profile: the owner-data regime

> Our reading of published terms, not legal advice.

### LSM-POLICY-23 · Business Profile API content is capped at 30 calendar days and "cannot be manipulated or aggregated"

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > Content storage, last updated 2025-08-28 UTC

> You cannot pre-fetch, cache, index, or store any content provided through the Business Profile APIs ("Content") for use outside of your Business Profile project except for limited amounts of Content. You can store limited amounts of Content only to improve the performance of your project. Stored Content must meet the following requirements: It must be stored temporarily for no more than 30 calendar days. It must be stored securely. It cannot be manipulated or aggregated in any way. At no time may you store Content in order to prevent Google from tracking usage of your Business Profile project.

Four constraints, written unconditionally: **limited amounts**, **performance purpose only**, **30 calendar days**, **not manipulated or aggregated**. The text contains no exception for the merchant's own data obtained through the merchant's own OAuth grant — whether one should be read in is [LSM-POLICY-33](#lsm-policy-33--open-whether-the-30-day-gbp-cap-applies-to-a-merchants-own-data-under-their-own-oauth-grant), and it is the sharpest unresolved question in this chapter.

The aggregation wording deserves separate attention. On a literal reading, computing a monthly average rating or a review-count trend from stored GBP Content is manipulation or aggregation of Stored Content.

**Consequence:** A tool that shows a merchant three years of their own review history is doing something the plain text of this policy does not authorise, and is relying — knowingly or not — on a reading that the document does not state. That is a position to take deliberately, document, and put in front of counsel. It is not a position to arrive at by never reading the clause.

### LSM-POLICY-24 · Automating review replies without prior specific and express consent is prohibited

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > Automated use of your Business Profile project, last updated 2025-08-28 UTC

> You may not use the Business Profile APIs to engage in abusive behaviors, which includes but isn't limited to fraudulent, abusive, or otherwise invalid activity. For example, you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent.

Three words carry the requirement: **prior**, **specific**, **express**. A general grant of permission at sign-up is not specific. An OAuth consent screen is not consent to a particular reply. "Prior" rules out notifying afterwards.

**What to do instead:** Keep a human approval step between a drafted reply and the push to Google. An AI that drafts and a person who approves is a defensible architecture; an AI that replies on a trigger is the named prohibited case, and no amount of quality in the reply changes that. If you want an auto-reply mode at all, it needs an explicit, specific, per-purpose opt-in that a reviewer would recognise as consent to that exact action.

### LSM-POLICY-25 · Replying on a client's behalf requires explicit approval, and verbal consent is not sufficient

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Third-party policy > Reviews, last updated 2025-08-28 UTC; Business Profile third-party policies (`support.google.com/business/answer/7353941`, no revision date shown)

> Business owners have the ability to respond to reviews of their business on Google. If you respond to reviews on behalf of your end-client, you must receive their authorization first. All responses to reviews must follow Google's Prohibited and restricted content policies.

The third-party policies page is stricter about the form that authorisation takes:

> You can claim and manage a Business Profile only if you obtained the business owner's express consent as required by the applicable law. … To respond to reviews on behalf of the end customer, you must have an explicit approval. Verbal consent isn't sufficient. … all end customers must retain ownership or co-ownership of their Business Profile at all times.

**Consequence:** Agencies need a written or digital consent record for review replies specifically, separate from the general engagement. And the ownership rule is absolute in the text: an arrangement where the agency holds sole ownership of a client's profile does not satisfy "at all times".

### LSM-POLICY-26 · No indirect or programmatic third-party access to your Business Profile project

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > Automated use of your Business Profile project, last updated 2025-08-28 UTC

> You cannot allow agencies, end-clients, or other third parties to use your Business Profile project, or your own APIs, in a way that allows those third parties to avoid applying for their own Business Profile project. Any automatic or programmatic use of Business Profile by agencies or end-clients requires them to use their own Business Profile project. You cannot provide indirect access to your Business Profile project. End users of your Business Profile APIs need to manually sign in to use it. They're not allowed automatic access to make manual or programmatic changes to their accounts. For example, if you're a tool provider that licenses listings-management software to agencies and end-clients, you cannot develop your own API that allows your clients to access the Business Profile APIs through automatic or programmatic computer scripts. Note: This policy doesn't restrict your own use of the Business Profile APIs in a programmatic or automated way.

The closing note is as important as the prohibition. **Your own** background automation on behalf of consented merchants is expressly unrestricted; what is prohibited is handing third parties a programmatic path through your project.

A related clause blocks the obvious workaround:

> If you provide the Business Profile APIs to end-clients or other third-party clients, you cannot require them to apply for their own Business Profile project in order to use the Business Profile APIs. We deny end-client applications for such projects.

**Consequence:** You may not require clients to get their own project, and you may not let them script against yours. Whether an agent acting for a signed-in user falls on the permitted or prohibited side is [LSM-POLICY-34](#lsm-policy-34--open-whether-an-ai-agent-acting-for-a-signed-in-user-satisfies-manually-sign-in), and it is unresolved.

### LSM-POLICY-27 · One customer's Business Profile data must not be compared with or shared with another customer

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile third-party policies — Insights (`support.google.com/business/answer/7353941`, no revision date shown)

> You must not compare or share one customer's Business Profile-specific data with your other customers.

Short, and it forecloses a whole product category: benchmark panels built from the owner-connected data of the customers you already have.

**What to do instead:** Build any benchmark from public data or from a third-party provider whose licence permits it, and enforce tenant isolation on owner-connected metrics so a cross-customer aggregate is not merely a policy rule but an impossible query.

### LSM-POLICY-28 · The GoogleLocations endpoint may never be used for lead generation

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > GoogleLocation, last updated 2025-08-28 UTC

> You're only allowed to use the GoogleLocations endpoint to find the status of locations of merchants that already have a business relationship with your company, and only to use the endpoint to create or claim those locations on Business Profile. Use of this endpoint for any other purpose, which includes lead generation or other analysis, is against Google's policies and will result in immediate revocation of your API access.

This is the only clause in either regime that states its own sanction, and the sanction is immediate revocation of API access rather than a cure period.

**Consequence:** Prospecting tools and free-audit lead magnets must not touch this endpoint. "Other analysis" is broad enough to cover competitor research as well as prospecting.

### LSM-POLICY-29 · Seven business days to disassociate, 48 hours to disclose a change

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Third-party policy > Termination of end-client relationship and > Transparency, last updated 2025-08-28 UTC

> You must provide your end-client with a quick and easy way to stop use of your APIs. When an end-client gives notice that they no longer use your APIs to manage their Business Profile accounts, you have seven business days to provide them the ability to disassociate their Business Profile account from your services and developer project, and regain exclusive control of their Business Profile account(s). If your tool had permission to manage or otherwise change the end-client's account, you must also relinquish and remove those permissions accordingly.

> When you report and manage Business Profile data, be transparent to your customers. Also, be transparent to end-clients about any changes you or your tool makes to their accounts. If your tool makes any changes to an end-client's account, such as when you add a new manager to the account, provide notice to the end-client of the change within 48 hours after the change is made.

| Obligation | Deadline | Trigger |
| --- | --- | --- |
| Disassociate account, relinquish permissions | 7 business days | End-client gives notice |
| Notify end-client of a change your tool made | 48 hours | The change is made |
| Provide a "quick and easy way" to stop | Standing | — |

**Consequence:** Disconnect must be a self-serve control in the product, not a support ticket, and it has to actually remove manager permissions rather than just stop calling the API. The 48-hour notice duty is separate from Google's own automatic notifications.

### LSM-POLICY-30 · Limited Use covers data you derived or aggregated, not just raw API responses

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google API Services User Data Policy — Additional Requirements for Specific API Scopes > Limited Use, last updated February 15, 2024

> Limited Use: Your use of data obtained via the product's specified scopes must comply with the below requirements. These requirements apply to the raw data obtained from the scopes and data aggregated, anonymized, or derived from them. Limit your use of data to providing or improving user-facing features that are prominent in the requesting application's user interface; Transfers of data are not allowed, except: To provide or improve your appropriate access or user-facing features that are visible and prominent in the requesting application's user interface and only with the user's consent; For security purposes (for example, investigating abuse); To comply with applicable laws; or, As part of a merger, acquisition, or sale of assets of the developer after obtaining explicit prior consent from the user.

> All other transfers, uses, or sales of user data are prohibited, including: Transferring or selling user data to third parties like advertising platforms, data brokers, or any information resellers. Transferring, selling, or using user data for serving ads, including retargeting, personalized or interest-based advertising. Transferring, selling, or using user data to determine credit-worthiness or for lending purposes.

The first sentence is the one people miss: **anonymising or aggregating does not escape the policy.** A metric computed from OAuth-scope data inherits the restriction.

The same document adds two duties that bear on retention:

> Your privacy policy and in-product privacy notifications must thoroughly disclose the manner in which your application accesses, uses, stores, or shares Google user data. Your use of Google user data must be limited to the practices explicitly disclosed in your published privacy policy… If you change the way your application uses Google user data, you must notify users and prompt them to consent to an updated privacy policy before you make use of Google user data in a new way or for a different purpose than originally disclosed.

> You must disclose all user data that you access, use, store, delete, or share, as well as any actions you take on a user's behalf.

**Consequence:** Your privacy policy is not boilerplate — it is the enumerated limit of what you are permitted to do, and it must name the *actions* you take on the user's behalf (posting a review reply is an action) as well as the data you hold.

### LSM-POLICY-31 · Tokens must be revoked and then permanently deleted, and encrypted at rest

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** Google OAuth 2.0 Policies — "Handle user tokens securely" (changelog entries through December 15, 2025)

> OAuth 2.0 tokens are entrusted to you by users who give you permission to act and access data on their behalf. Never transmit tokens in plaintext, and always store encrypted tokens at rest to provide an extra layer of protection in the event of a data breach. Revoke tokens when you no longer need access to a user's account or when your app no longer needs access to permissions that a user previously granted. After the tokens are revoked, delete them permanently from your application or system.

Revocation and deletion are two separate steps and both are required. Dropping a row is not revocation; a revoked-but-stored token is not deletion.

**Consequence:** Disconnect and account-deletion paths must call the revocation endpoint and then remove the stored credential. Any cached access token — including one parked in a shared cache for convenience — is a token that must be encrypted at rest.

### LSM-POLICY-32 · The User Data Policy sets no numeric retention cap and no deletion-on-revocation rule for data

**Verdict:** UNDOCUMENTED
**Last verified:** 2026-07-16
**Source:** Google API Services User Data Policy, last updated February 15, 2024 — read in full for a retention period or a data-deletion trigger

The document has no clause stating how long OAuth-scope data may be kept, and none requiring deletion when a user revokes access. The token-deletion duty in [LSM-POLICY-31](#lsm-policy-31--tokens-must-be-revoked-and-then-permanently-deleted-and-encrypted-at-rest) is about tokens, not about the data those tokens fetched.

The retention obligations that do apply arrive indirectly: from the disclosed-practices limit in the same document (you may only do what your privacy policy says you do), and — for Business Profile data specifically — from the 30-day cap in [LSM-POLICY-23](#lsm-policy-23--business-profile-api-content-is-capped-at-30-calendar-days-and-cannot-be-manipulated-or-aggregated).

**Consequence:** The silence is not permission. Because your privacy policy becomes the binding limit, an unstated retention period means you have no documented basis for the retention you actually practise. State one, and honour it.

---

## What the terms do not settle

> Our reading of published terms, not legal advice. These entries are open because the documents do not answer them — not because we did not look.

### LSM-POLICY-33 · OPEN · Whether the 30-day GBP cap applies to a merchant's own data under their own OAuth grant

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > Content storage, last updated 2025-08-28 UTC

The clause opens with a scope qualifier and then lists three unconditional requirements:

> You cannot pre-fetch, cache, index, or store any content provided through the Business Profile APIs ("Content") for use outside of your Business Profile project except for limited amounts of Content. … It must be stored temporarily for no more than 30 calendar days. It must be stored securely. It cannot be manipulated or aggregated in any way.

**The permissive reading:** the prohibition is scoped to storage "for use outside of your Business Profile project". Serving a merchant their own data, inside the project that the merchant authorised, is use *inside* the project, so the sub-requirements never engage.

**The restrictive reading:** the three "Stored Content must" requirements are written without qualification, and apply to any Content you store at all. On this reading, a merchant's own review history is capped at thirty days like everything else.

| | Supports the permissive reading | Supports the restrictive reading |
| --- | --- | --- |
| Text | "for use outside of your Business Profile project" scopes the opening sentence | The three sub-requirements carry no scope qualifier |
| Structure | The exception clause exists for a reason | The stated purpose of the exception is performance, not user features |
| Elsewhere | The policies bless the tool-for-end-clients model in general | No owner-data carve-out appears anywhere in the document |

**What would close it:** written clarification from Google through the support channel the policies page links, or a published Google statement addressing owner-consented data specifically. Nothing in the current text settles it.

**Consequence:** Whichever reading you adopt, adopt it deliberately, write down why, and have it reviewed. The failure mode we would flag is not choosing the wrong reading — it is holding years of merchant data without knowing that a live question exists.

### LSM-POLICY-34 · OPEN · Whether an AI agent acting for a signed-in user satisfies "manually sign in"

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-16
**Source:** Business Profile APIs policies — Prohibited practices > Automated use of your Business Profile project, last updated 2025-08-28 UTC

> You cannot provide indirect access to your Business Profile project. End users of your Business Profile APIs need to manually sign in to use it. They're not allowed automatic access to make manual or programmatic changes to their accounts. … Note: This policy doesn't restrict your own use of the Business Profile APIs in a programmatic or automated way.

The clause was written before agentic tooling was common, and it does not address it. A merchant who signed in manually, granted OAuth, and then instructs an assistant to fetch their reviews is describable two ways: as the merchant using your product through a client of their choosing, or as programmatic third-party access to your project.

Both readings survive the text. The explicit example in the policy — a tool provider developing "your own API that allows your clients to access the Business Profile APIs through automatic or programmatic computer scripts" — is closer to the second, and the note preserving your own automation is closer to the first.

**What would close it:** a Google statement on agent-mediated access, or a policy revision that names it. Until then, mitigations rather than conclusions: human sign-in before any grant, a human approval step before any write ([LSM-POLICY-24](#lsm-policy-24--automating-review-replies-without-prior-specific-and-express-consent-is-prohibited)), no bulk operations, and no path for an agency or partner to drive another party's profile programmatically.

### LSM-POLICY-35 · OPEN · Whether Places content in a generated PDF or email is display or storage

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(a)–(b) (last modified June 23, 2026) and Policies and attributions for Places API (last updated 2026-07-10 UTC), read for any provision addressing offline or fixed-media artifacts

No document in either regime addresses PDFs, emails or other fixed artifacts containing Places content. The relevant provisions cut both ways: a report rendered on demand from a fresh API call is arguably display within the Customer Application, while a PDF written to object storage and re-served later is "store, reshare, or rehost" on the face of §3.2.3(a).

One requirement leans against static documents specifically. Reviews must give end users access to the source on Google Maps via `googleMapsUri` ([LSM-POLICY-20](#lsm-policy-20--every-displayed-review-and-photo-needs-author-attribution-and-a-live-link-to-the-source-on-google-maps)) — hard to satisfy in a printed page and impossible from a stale copy. Note also that some other Maps APIs (Solar, for instance) have express fixed-media provisions, and Places does not: *(inference)* the absence of a carve-out where Google wrote one elsewhere is evidence, not silence.

**What would close it:** an express Places provision on fixed media, or counsel's judgement on a specific artifact and retention period.

**Consequence:** The conservative position is to keep Places content out of stored deliverables, source report content from the owner's own GBP connection or a licensed third-party provider, and delete any generated artifact that does contain it on a defined schedule.

### LSM-POLICY-36 · OPEN · Whether a rank time-series keyed on place IDs is Google Maps Content

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(a)–(c) and §20 (Definitions), last modified June 23, 2026

Rank tracking stores which place IDs appeared in which positions for a query, over time. Place IDs are storable indefinitely ([LSM-POLICY-04](#lsm-policy-04--place-ids-are-exempt-from-the-caching-restrictions-and-may-be-stored-indefinitely)) and a position you observed is arguably your own measurement rather than Google's content.

The counter-argument is that the *ordering* of a search result is itself content provided through the Services — §20 defines Google Maps Content as "any content provided through the Services … including … places data (including business listings)" — and that recording it repeatedly is indexing under §3.2.3(a)(i) or creating content from Google Maps Content under §3.2.3(c).

This question is load-bearing for the entire rank-tracking category, and the documents do not resolve it.

**What would close it:** a Google statement on observation records, or a provision distinguishing measurements of the Services from the Services' content.

**Consequence:** The narrower a stored rank record is, the more defensible it is. A record of `{place ID, position, query, coordinate, timestamp}` carries no Google-authored text; the same record with names, ratings and review counts attached is the version this question is hardest about.

### LSM-POLICY-37 · OPEN · Whether inference-time LLM use of Google Maps Content is caught by the training prohibition

**Verdict:** OPEN QUESTION
**Last verified:** 2026-07-16
**Source:** Google Maps Platform Terms of Service §3.2.3(c)(vii), last modified June 23, 2026

> use Google Maps Content to improve machine learning and artificial intelligence models, including to train, test, validate or fine-tune the models.

The enumerated verbs are train, test, validate and fine-tune. Passing content into a model's context at inference time — to summarise a profile, draft a reply, or answer a question — is not named, and the governing phrase is "to improve … models", which inference does not obviously do.

Against that: providers vary in whether API traffic can be retained or used for improvement, and a prompt that leaves your control is content you can no longer prove was not used for training. The prohibition is on *your* use, but §3.2 makes you answerable for third parties too ([LSM-POLICY-10](#lsm-policy-10--customer-will-not-is-defined-to-include-will-not-permit-a-third-party-to)).

**What would close it:** Google guidance naming inference, or a revision that enumerates it.

**Consequence:** If you pass Google Maps Content to a model, use a provider tier with training disabled by contract, keep it out of any prompt/response corpus you retain, and document the position. Do not read the absence of "inference" from the verb list as a permission.

### LSM-POLICY-38 · EEA-billed customers are governed by separate documents not read here

**Verdict:** WORKS
**Last verified:** 2026-07-16
**Source:** GMP Service Specific Terms, introductory scope statement, last modified June 10, 2026

> These Service Specific Terms apply to Customers who do not have a billing account address in the European Economic Area.

Every Maps Platform quote in this chapter comes from the **non-EEA** Terms of Service and Service Specific Terms. Separate EEA versions have governed EEA-billed customers since 2025-07-08. We have not read them, so nothing in this chapter should be taken as a statement about their contents.

**Consequence:** Check the billing address on the Google Cloud account before relying on any Maps Platform entry here — including for a white-label partner running its own Google project. The Business Profile policies and the User Data Policy are not split this way; the Maps Platform documents are.

---

## One implemented reading

> Our reading of published terms, not legal advice. This section describes a position, not a rule — it is what one operator did, published so you can criticise it.

Faced with [LSM-POLICY-02](#lsm-policy-02--the-default-rule-for-places-content-is-no-caching-at-all) and [LSM-POLICY-23](#lsm-policy-23--business-profile-api-content-is-capped-at-30-calendar-days-and-cannot-be-manipulated-or-aggregated), SEOG adopted a **refresh-or-purge** pattern in July 2026. The shape of it, which is portable to any stack:

1. **Age every Google-derived field on its last refresh**, not its creation. Content a live fetch re-populated inside the window is current data, not a stale cache.
2. **Past the window, strip rather than delete the row.** Keep the place ID, your own derived values (positions, scores, trends) and anything the user wrote. Blank the Google-authored fields.
3. **Make the empty state a real UI state.** A stripped row renders as "refresh to update" rather than as a bug, because the alternative — quietly refetching to keep the screen full — reintroduces exactly the background fetching the pattern exists to avoid.
4. **Keep an inventory.** Every table and every object-storage prefix holding Google-derived content, with its source API, whether it is raw or derived, and which purge covers it. A new table storing Google content and not listed in the inventory is the failure mode; a written inventory is what makes that visible in review.
5. **Attribute at the page level, not per field.** One mark inside the container that holds the Google content ([LSM-POLICY-19](#lsm-policy-19--attribution-must-sit-in-the-same-visual-container-and-google-content-must-be-visually-distinguished)), with your computed metrics visually separated so they are not attributed to Google.

Three positions inside that pattern are ours and are not settled by any text quoted above, and we mark them as open rather than solved: keeping the customer's own identity fields (name, address, coordinates) beyond the window as **customer-asserted data** rather than Google content; retaining derived metrics against the GBP "cannot be … aggregated" wording ([LSM-POLICY-33](#lsm-policy-33--open-whether-the-30-day-gbp-cap-applies-to-a-merchants-own-data-under-their-own-oauth-grant)); and treating a generated report as a transient artifact ([LSM-POLICY-35](#lsm-policy-35--open-whether-places-content-in-a-generated-pdf-or-email-is-display-or-storage)).

There is a real cost to the pattern, and pretending otherwise would be dishonest: **you lose long-run history of Google-authored fields.** A competitor's review count eighteen months ago is not recoverable if you never stored it. Tools that show that history either have a licence that permits it, a reading of the terms different from ours, or an exposure. Which of the three is a question about that tool, not about this chapter.

If you need durable historical business attributes, the compliant routes are: data the merchant supplies or authorises about their own business, data from a third-party provider whose licence expressly permits storage, and your own measurements. Not the Places API.

---

**Next:** [Write limits and failure modes →](./write-limits-and-failure-modes.md)
