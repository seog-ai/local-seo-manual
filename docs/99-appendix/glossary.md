---
title: Glossary
sidebar_position: 2
description: Every term this manual uses, defined in one or two sentences, marked as Google's vocabulary or ours, and linked to the chapter that teaches it.
---

# Glossary

Local SEO runs on borrowed vocabulary. Some of it is Google's, some was invented by practitioners and adopted by everyone, and some is this manual's — and the three get mixed together until nobody in a meeting is sure whether "average rank" is a defined quantity or a house style. This page separates them.

Each entry is meant to be quotable on its own, without the chapter around it. Where a term has a precise definition somewhere in the manual, the link goes to the chapter that establishes it; where it has a probe-verified fact behind it, the `LSM-` identifier is named so you can find the entry in [Part V](../05-reference/how-to-read-this-reference.md).

> **How to read the markers.** An unmarked term is Google's own published vocabulary or a standard technical term. *(industry)* means practitioners use it consistently but Google does not — you will not find it in any Google document, and Google is not bound by it. *(ours)* means it is this manual's or the app's word for something that has no agreed name. The distinction matters: you can quote Google on the first, cite convention on the second, and must define the third yourself when you use it with a client.
>
> Last reviewed **2026-07-27**. Terms describing Google's surfaces go stale; the chapters they link to carry the dates.

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [J](#j) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w) · [Z](#z)

---

## A

**Accessibility tree.** The structured representation a browser exposes to assistive technology and to automated agents — roles, names, states — rather than the rendered pixels. An agent booking an appointment reads this, so a button that is a styled `div` with no accessible name does not exist to it. See [Making the site readable by agents](../02-core-practice/making-the-site-readable-by-agents/index.md).

**Action plan** *(ours)*. The merged, weighted list of failing profile-audit checks and uncovered AI-readiness factors shown on the business overview, ordered by recoverable points within impact tiers. It is generated from current state, so if the state does not change, neither does the plan. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Agent-readiness score** *(ours)*. A site score for whether an automated agent can read and act on the page — distinct from a human usability score. It feeds one 8-point factor of the AI-readiness rubric. See [Making the site readable by agents](../02-core-practice/making-the-site-readable-by-agents/index.md).

**Aggregator punt** *(ours)*. An AI answer that declines to name businesses and points at a directory instead — "have a look at Yelp". It is not a miss, and it must leave the recommendation-rate denominator rather than count against you (`LSM-AI-19`). See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md).

**AI local pack** *(industry)*. A generated local answer that appears **in place of** the map pack on a subset of queries, mostly mobile. Sterling Sky's *State of Local SEO in 2026* (published 2026-02-27) reports that it shows **one or two businesses rather than three** and carries no call button, and — counting unique businesses across their ranking reports — that AI local packs surfaced **32% as many businesses as the traditional 3-pack** (5,943 against 18,330). Note the direction: that is 32% *as many*, or 68% *fewer*; several secondary write-ups have restated it as "32% fewer", which is a different and wrong claim. Google does not document the surface at all. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**AI Mode.** Google's conversational search surface, generally available in the US from 2025-06-05. Its citations overlap AI Overview citations far less than most people assume. See [the changelog](../05-reference/local-search-changelog.md).

**AI Overview.** A generated answer block at the top of a Google results page, with cited links beneath or beside it. Common on informational local searches, much rarer on transactional ones. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**AI readiness score** *(ours)*. Nine all-or-nothing weighted factors totalling exactly 100, estimating how likely an AI answer is to surface the business at all. Tiers: 70+ strong, 40–69 building, below 40 low. Review volume (22) and rating (18) together reach the middle tier on their own, which is a deliberate claim about what drives AI recommendation. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Anonymized query.** A search term Search Console omits from the query table to protect user privacy while still counting it in the totals. It is why the rows in a query export never sum to the reported clicks or impressions (`LSM-MEASURE-14`). See [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

**Attribute.** A structured profile field drawn from Google's per-category catalogue — wheelchair access, payment types, "serves vegan". You cannot invent one; the category decides which exist, and many categories offer none of a given kind. Attributes are a separate API resource from the rest of the profile, so a location write cannot touch them (`LSM-GBP-04`). See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

**Attribution.** The display requirement attached to Google Maps content: the Google Maps logo, or the exact text "Google Maps" where space is constrained, inside the same visual container as the content. "Powered by Google" no longer appears in any current document (`LSM-POLICY-21`, `LSM-POLICY-22`). See [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Autocomplete.** Google's query-suggestion endpoint. Useful as a source of real phrasings, and one of the few places that still surfaces businesses which Text Search drops for low prominence (`LSM-PLACES-11`). See [What people actually search](../01-foundations/what-people-actually-search/index.md).

**Average position** (Search Console). The topmost position your site reached for a query, averaged and weighted by impressions. It is not the average of your pages' positions, and a window average is not the average of the daily averages (`LSM-MEASURE-15`). See [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

**Average rank** *(industry)*. On a geo-grid, the mean position over the points **where the business appeared**. Points where it did not appear are deleted before the arithmetic, so average rank *improves* when you vanish from your worst neighbourhoods. Never quote it without the found rate. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

## B

**Baseline.** A dated, frozen record of the state of a business before you change anything — a document you cannot edit, not a number you remember. Without one, no later claim of improvement is defensible. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Bias radius.** A radius that weights a search toward a circle without excluding what lies outside it; results further out still appear, ranked lower. Contrast **restriction radius**. Two tools both saying "5 km radius" can mean opposite things. See [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md).

**Branded query.** A search containing the business name. You appear by definition, so ranking is not the contest — the contest is what the searcher finds when they arrive. Reporting "#1 for our own name" reports that Google can read. See [What people actually search](../01-foundations/what-people-actually-search/index.md).

## C

**Cadence.** How often you re-measure. It is a statistical decision, not an administrative one: measure faster than the thing moves and you are reading your instrument's noise. See [Building a tracked set that tells the truth](../02-core-practice/choosing-what-to-track/index.md).

**Can't verify.** One of four listing-check verdicts: a listing is known to exist but its details could not be read. Reporting it as **not found** tells you to create a listing that already exists, and following that instruction produces a duplicate. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**Cannibalisation.** Two of your own locations competing for the same catchment, which most tools will report to you as competition. The productive responses are differentiation and acceptance; de-optimising a branch almost never is. See [Multi-location and franchise](../03-advanced/multi-location-and-franchise/index.md).

**Case** *(ours)*. First-hand, dated evidence about a suspect listing — a call placed, a Street View check, a registry lookup — as opposed to an automated **signal**. About half an hour per listing, and the only thing worth reporting. See [Spam and fake listings](../03-advanced/spam-and-fake-listings/index.md).

**Censoring** (right-censoring). The condition where a measurement is known only to be worse than some bound. A grid point that reads twenty deep and does not find you tells you your position is *somewhere past 20* — 22, or 400, or not eligible at all — and no arithmetic can recover which. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Chain detection.** Google refusing Local Posts on locations it treats as chain-managed, returning `LOCATION_DISABLED_FOR_LOCAL_POST_API`. The threshold is not published, and `Metadata.canOperateLocalPost` tells you in advance (`LSM-GBP-21`, `LSM-GBP-22`). See [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).

**Citation.** A mention of a business's name, address and phone on a third-party site, with or without a link. The word is also used for a source cited by an AI answer — two different things that this manual keeps apart. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**Citation rate.** The share of live AI answers that cite **your own domain** among their sources, over every live answer. Strictly your domain, not a page about you. Usually far lower than the mention rate, and rarely printed beside it. See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md).

**Compass sentence** *(ours)*. The "strongest to the west, weakest to the south" line under a grid scan. Each point is assigned to whichever of **four** directions — north, south, east or west — its dominant offset from the grid centre points to; the sentence then names the best-averaging and worst-averaging of those four. It counts a missing pin as 21, and claims a direction only when best and worst differ by at least two positions — so "no direction claimed" means the gap was small, not that there is no gradient. Because the buckets are only the four cardinals, it can never say "south-east": a genuinely diagonal gradient gets reported as whichever cardinal is closer, which is a real limitation of the summary and a reason to read the map rather than the sentence. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Comparison intent** *(ours)*. See **intent**.

**Consistent.** Listing-check verdict: a listing was located and its fields resolve to your profile. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**Critical field** *(ours)*. Name, primary category and address — the three profile fields whose edit can force re-verification, temporarily unpublish the listing, and in rare cases trigger a suspension. Never edited on a Friday, never batched with anything else. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

**Cumulative Layout Shift.** How much a page moves around while it loads. Long treated as a comfort metric; it is also a correctness metric, because an agent that resolved a coordinate before the layout settled clicks the wrong thing. See [Making the site readable by agents](../02-core-practice/making-the-site-readable-by-agents/index.md).

## D

**`dataState`.** The Business Profile Performance parameter controlling whether the freshest, still-changing days are returned. It defaults to `final`, which omits them — so a series can look shorter than the range you asked for (`LSM-MEASURE-12`). See [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

**Depth.** How many results a rank instrument reads before it stops. Both a single check and a grid point here read twenty. Past the depth you are not ranked 21 — you are **not measured**, and two tools censoring at different depths cannot produce comparable averages. See [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md).

**Discovery intent** *(ours)*. See **intent**.

**Distance.** The second of Google's three published local ranking factors: how far the business is from the searcher, or from the location named in the query. The one you cannot change, and at short range the one that dominates. See [Relevance, distance, prominence](../01-foundations/relevance-distance-prominence/index.md).

**Duplicate.** A second profile for the same location. Explicitly prohibited by Google's representation guidelines, and a routine consequence of trusting a "not found" verdict from an automated checker. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

## E

**Edit cap.** Ten profile edits per minute per profile, shared across every kind of edit and not raisable (`LSM-GBP-18`). It bites hardest during a reinstatement, when you want to fix several fields at once. See [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).

**Entity.** The business record Google actually ranks — identity, fields, reputation — as opposed to the website, which is a supporting signal attached to it. The single idea that reorganises most people's mental model of the work. See [Google is not ranking your website](../01-foundations/the-business-entity/index.md).

**Entity resolution.** The matching process that decides whether two records describe the same business. It is what NAP consistency is *for*: not a score Google keeps, but the mechanism by which a mention becomes attached to you rather than to nobody. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**Example panel** *(ours)*. A card in the app showing stand-in numbers behind a visible **Example** or **Test data** badge, so the furniture is legible before you have run anything. Example data never mixes with live data; reading a badged panel as a measurement is the most common beginner error in the interface. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md) (Lab 1.2).

**Experiment card** *(ours)*. The written pre-registration of an AI-visibility intervention — lever, prediction, measurement window, cost, and what result would falsify it — completed before any money is spent. See [Changing the AI answer](../03-advanced/changing-the-ai-answer/index.md).

## F

**Field mask.** The list of fields a Places request asks for. It decides the billing tier: the same call, with the same result set, costs nothing or the top SKU rate depending on which fields the mask names (`LSM-PLACES-01`). See [What the Places API will and will not give you](../05-reference/what-places-returns.md).

**Found rate** *(ours)*. Points where the business appeared, over **all** points scanned — the denominator information that average rank throws away. Quote it first, every time: "top 20 at 9 of 25 points". See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

## G

**GBP** — Google Business Profile. The product formerly called Google My Business: the owner dashboard, and by extension the family of owner-authenticated APIs behind it. Distinct from Places, which serves the public record under different terms. See [Google is not ranking your website](../01-foundations/the-business-entity/index.md).

**Geo-grid.** A lattice of coordinates, each one searched independently for the same keyword, with the resulting positions drawn on a map. The instrument that turns "our rank" into a distribution. See [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

**Google Maps Content.** A defined term in the Maps Platform terms, and it is defined to include business listings — which is why arguments of the form "a place record is just data" do not survive contact with the document (`LSM-POLICY-12`). See [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Grey pin** *(ours)*. A grid point where the business did not appear inside the scan depth. Censored, not rank 21, and every summary statistic has to decide what to do with it. Grey pins count against top-3 coverage and are deleted from average rank. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Grounding.** Supplying a language model with retrieved documents or place data at answer time, so its answer is drawn from them rather than from weights. Gemini is grounded in Google Maps data; other assistants ground in web retrieval, which is why the same question produces disjoint answers. See [How an AI assistant answers a local question](../01-foundations/how-ai-answers-a-local-question/index.md).

## H

**Hard suspension** *(industry)*. The listing is removed from Search and Maps, and the reviews go with it. The one that costs money by the day, and the one the reinstatement process exists for. Google's documentation uses neither "hard" nor "soft". See [Suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement/index.md).

**Hours.** The opening-hours profile field. A ranking field in disguise, because "open now" is a filter applied before ranking rather than a display detail. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

## I

**Impression** (GBP Performance). One unique user per day, per metric — not one view. There is no "profile views" metric at all; the number every dashboard prints is a sum of four impression enums, and summing them double-counts a user who arrived by two routes (`LSM-MEASURE-01`, `LSM-MEASURE-02`). See [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

**Intent** *(ours)*. The four-way classification this manual uses for local queries — **discovery** ("I need this kind of thing near me"), **comparison** ("I have candidates, help me pick"), **trust** ("I have a name, should I use them?") and **logistics** ("I have decided, I need one fact"). Google publishes no local intent taxonomy. Only two of the four are rank problems at all. See [What people actually search](../01-foundations/what-people-actually-search/index.md).

## J

**Judge pass** *(ours)*. A second model call that classifies the **stance** of an AI answer toward a business, because keyword matching cannot separate "I'd recommend Acme" from "Acme has mixed reviews". An unparseable judge reply must store null, never a false (`LSM-AI-24`, `LSM-AI-25`). See [AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md).

## K

**Keyword.** The phrase you track. Meaningless as a unit of measurement without a surface, a coordinate, a depth and a date attached — the sample unit is the *combination*, not the phrase. See [Building a tracked set that tells the truth](../02-core-practice/choosing-what-to-track/index.md).

**Knowledge panel.** The branded result panel that appears when someone searches a business by name. Evidence that the listing exists, which makes it the first checkpoint in an absence triage — and worthless as evidence of ranking. See [Suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement/index.md).

## L

**Lab.** A numbered exercise in this manual. A lab is **free** when it reads data already stored and **paid** when it fetches from Google or calls a model; the header of every lab states which, and the app states the price on the button before you confirm. See [How the labs work](../00-start-here/how-the-labs-work.md) and [What things cost](./what-things-cost.md).

**Lead-generation network.** The spam family where an ordinary-looking listing's phone number routes to a broker who sells the call on. Often there is no company behind the name — only a number and a domain. The hardest family to detect and the most damaging. See [Spam and fake listings](../03-advanced/spam-and-fake-listings/index.md).

**Lighthouse.** Google's open-source page audit, scoring performance, accessibility, best practices and SEO. A score is a diagnostic input; the failing checks are the finding. Several of its checks are marked "not applicable" for reasons that are themselves work. See [The website half](../02-core-practice/the-website-half/index.md).

**Limited Use.** The restriction in Google's API Services User Data Policy on what you may do with data obtained through a user's OAuth grant. It reaches data you **derived or aggregated**, not only raw API responses (`LSM-POLICY-04`, `LSM-POLICY-34`). See [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Listicle layer** *(ours)*. The "best X in \[city\]" pages, round-ups and directory articles that AI answers cite. When your probes keep citing four such pages, those pages are functionally the ranking, and getting added to them is ordinary outreach. See [Changing the AI answer](../03-advanced/changing-the-ai-answer/index.md).

**`llms.txt`.** A proposed plain-text file listing a site's key pages for language models. At least one first-party Google audit scores its presence; there is no published evidence it affects AI retrieval. Twenty minutes of work, then stop. See [Making the site readable by agents](../02-core-practice/making-the-site-readable-by-agents/index.md).

**Local finder.** The full scrollable list behind "More places", with its own map and filters. Where a business at position 7 actually lives — which is why "we cannot find ourselves anywhere" is usually a ranking problem rather than a disappearance. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**Local organic.** The ordinary blue links below the map pack, selected by Google's web ranking rather than its local ranking system. This is why directories and listicles beat business homepages there. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**Local pack.** See **map pack**.

**Local Post.** A short dated post on a business profile. It exists only on the legacy My Business v4 API surface (`LSM-POSTS-01`); one photo, no video, `summary` capped at 1,500 characters, and per-post metrics do not exist through any API (`LSM-POSTS-14`). See [Publishing without getting rejected](../02-core-practice/publishing-without-getting-rejected/index.md).

**Local Services Ads.** Google's separate paid local placement, sold on leads rather than clicks and shown above the pack. You cannot rank into it; count it as a block when auditing a results page. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**`LocalBusiness` schema.** The schema.org type describing a local business in structured data. Worth shipping for rich results and machine legibility; not a ranking lever, and no published evidence it enters AI retrieval. See [The website half](../02-core-practice/the-website-half/index.md).

**Logistics intent** *(ours)*. See **intent**.

**LSM ID.** The permanent identifier on every fact in Part V, formed `LSM-<AREA>-<NN>` where AREA is one of `PLACES`, `GBP`, `POSTS`, `REVIEWS`, `POLICY`, `AI`, `MEASURE`. The intent is that an ID is never renumbered and never reused, and that a retired fact is marked superseded and kept rather than deleted. Cite the ID with the entry's `Last verified` date so the date travels with the claim. **Known defect, 2026-07-27:** several Part V chapters currently number from `01` independently, so a few IDs — `LSM-GBP-03` among them — appear on more than one entry in different chapters. Until that is reconciled, cite the ID *and* the chapter it appears in, and treat a bare ID from a third party as ambiguous. See [How to read this reference](../05-reference/how-to-read-this-reference.md).

## M

**Map pack.** The block of three business listings beside a map, at or near the top of a local results page. Google calls it "local results"; everyone else calls it the map pack or the 3-pack. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**MCP** — Model Context Protocol. The open protocol by which an AI agent calls a tool server, and the interface through which an agent can drive a local-SEO stack. It has no confirmation channel, so anything irreversible has to be gated by the client's approval policy rather than by the server. See [Running local SEO with an AI agent](../04-operating/running-local-seo-with-an-ai-agent/index.md).

**Mention rate.** The share of live AI answers that name or cite the business, over **every** live answer in the window — refusals included, because an engine that refused did not produce your name. See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md).

**Minimum detectable effect (MDE).** The smallest change your instrument can distinguish from its own run-to-run noise. Set it before you look at the result, or you will find whatever size of effect the data happens to offer. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Mismatch.** Listing-check verdict: a listing was located and at least one field carries a different value from your profile. Both values should be shown, because which one is wrong is a judgement. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

## N

**NAP.** Name, address, phone — the identity triple used to resolve a business across sources. The acronym is industry shorthand of long standing; the underlying mechanism is entity resolution, not a score. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**Noise floor.** The variation an instrument produces when you run it twice having changed nothing. Every claim of improvement is a claim that the movement exceeded the noise floor, and you cannot know that until you have measured yours. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Not found.** Listing-check verdict: no listing was located at all. The dangerous one, because it is the verdict that instructs you to create something — and it must never be merged with **can't verify**. See [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

## O

**Observe-only path** *(ours)*. Working a business you do not control: every read in this manual works, nothing writes to Google, and your diagnostic simply carries more **unknown** rows. A legitimate way to learn the whole discipline and to audit a prospect. See [Set up your workbench](../00-start-here/set-up-your-workbench.md).

**Ordinal.** A measurement whose order is real and whose gaps are not. Rank is ordinal: #1 → #2 and #11 → #12 are the same one-position event to a mean, and completely different events in the world. You may average ordinals; you may not believe the answer without saying what you did. See [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

**Ordinary field** *(ours)*. Any profile field that is not name, category or address — phone, website, hours, description, attributes, photos. Passes through Google's review and usually publishes in about ten minutes. Can still be rejected, silently. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

**Origin.** The coordinate a rank check is run from. Change only the origin and the answer changes, which is the whole reason a single rank number is not a measurement. See [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md).

**Owner connection** *(ours)*. The OAuth link between a tool and the business's Google Business Profile. Without it several fields — the owner-written description, the full review history, all performance data — are **unknown** rather than missing. See [Set up your workbench](../00-start-here/set-up-your-workbench.md).

## P

**Personalisation.** Google tailoring results to a signed-in user's history and device. It is the reason checking your own rank on your own phone is not verification — and it is *not* a source of variation in a server-side grid scan, which runs with no user, no history and no device. See [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md).

**Pillar** *(ours)*. One of the weighted groups in the AI-visibility rubric. The Authority pillar is published in full: own-citation share 25, coverage of cited domains 25, review authority 25, listings consistency 15, local top-10 rankings 10. Its exclusions — `llms.txt`, domain authority — are a claim you can argue with. See [Changing the AI answer](../03-advanced/changing-the-ai-answer/index.md).

**Place ID.** Google's stable identifier for a place. Exempt from the Places caching restrictions and storable indefinitely, which makes it the anchor every compliant local data model is built on (`LSM-POLICY-08`). See [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Places API.** Google's public place-data API — the record any member of the public can see, served under Maps Platform terms. It returns at most five reviews per place, chosen by Google, and does not carry the owner-written description (`LSM-PLACES-08`, `LSM-PLACES-09`). Not the same data, and not the same rules, as GBP. See [What the Places API will and will not give you](../05-reference/what-places-returns.md).

**Practice business** *(ours)*. The single real business you run every lab against, chosen at the start so that each lab builds on the last. See [Set up your workbench](../00-start-here/set-up-your-workbench.md).

**Presence matrix** *(ours)*. The keyword × engine grid of AI probe results, with a rate in each cell rather than a latest answer. A cell with one run in it cannot carry a consistency figure and must be excluded (`LSM-AI-18`). See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md) and the [AI visibility record schema](./ai-visibility-record-schema.md).

**Prompt corpus** *(ours)*. A versioned, unbranded, geo-anchored set of question templates used to probe AI engines, held fixed so that two measurements are comparable. A prompt that names the business cannot measure whether the business is recommended (`LSM-AI-13`). See [The local prompt corpus](./the-local-prompt-corpus.md).

**Preset** *(ours)*. One of the three geo-grid sizes — 9, 25 or 49 points. Because point spacing is fixed at one mile, the presets buy **ground, not detail**: a 49-point scan is the same sampling density over roughly nine times the area, and no preset resolves anything smaller than a mile. See [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

**Primary category.** The single category that decides which queries a profile is even a candidate for. The highest-leverage field on the profile and one of the three critical fields, so changing it is both the biggest available move and the riskiest. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

**Profile score** *(ours)*. A completeness audit of the publicly observable profile: eleven weighted pass/fail checks totalling 86 points, grouped into Contact, Visibility, Content, Reputation and Attributes. It predicts nothing about ranking — it cannot see distance — and it is only useful decomposed back into the checks that produced it. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Prohibited scraping.** Google's Maps Platform terms name copying and saving business names, addresses and user reviews as prohibited scraping (`LSM-POLICY-10`). This is the clause that governs what a local-SEO tool may build, and it is why this manual publishes compliant architecture and never a harness. See [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Prominence.** The third of Google's three published local ranking factors: how well known a business is, from information across the web as well as offline. The factor you influence most slowly and most durably. See [Relevance, distance, prominence](../01-foundations/relevance-distance-prominence/index.md).

**Proximity decay** *(industry)*. The fall in position as the searcher moves away from the business. Steep at short range for most categories, which is why a grid centred on the business flatters it. See [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

## Q

**Q&A panel.** The public questions-and-answers block that used to sit on business profiles. Google started removing it on 2025-12-03 and discontinued the API on 2025-11-03, replacing it with a Gemini-powered "Ask Maps" (`LSM-GBP-63`, `LSM-GBP-64`). A large amount of current published advice still describes it as live. See [the changelog](../05-reference/local-search-changelog.md).

**QPM** — queries per minute. The unit in which Business Profile API quota is granted, per API and per Google Cloud project. Approved projects get 300 QPM per API; **0 QPM means the API is not approved for your project**, not that you exhausted it (`LSM-GBP-19`). See [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).

## R

**Rank.** A position on one named surface, for one query, measured from one coordinate, to one depth, on one date. Anything with fewer arguments than that is not a measurement. See [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

**Read-back rule** *(ours)*. After any write to Google — a profile field, a review reply, a post — re-read it from Google before believing it. A 2xx response is an accepted edit, not a published one (`LSM-GBP-07`, `LSM-REVIEWS-02`), and a rejection is silent. See [Reviews](../02-core-practice/reviews/index.md).

**Recommendation rate.** The share of AI answers **that named specific businesses at all** in which yours was named. Refusals, generic advice and aggregator punts leave this denominator, which is what makes it a different number from the mention rate rather than a stricter one. See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md).

**Refresh** *(ours)*. A priced fetch of live data from Google, scoped to one domain — profile, rankings, map, reviews, competitors, check. They are separate buttons on purpose so you pay for the domain you asked about; **Refresh all** re-pulls profile and reviews and does *not* re-check keyword positions, grid or competitors. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Reinstatement.** The appeal process following a hard suspension: an identity pack, a form, and a wait. Preparing the pack before you need it is most of the work. See [Suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement/index.md).

**Relevance.** The first of Google's three published local ranking factors: how well the profile matches what someone searched for. Mostly a function of primary category, services and the fields you can actually write. See [Relevance, distance, prominence](../01-foundations/relevance-distance-prominence/index.md).

**Restriction radius.** A hard filter — nothing outside the circle exists in the result set. A business two miles outside a restriction is deleted, promoting everyone inside by one, so the same business reads better under a restriction than under a **bias** radius. See [Why two tools disagree](../03-advanced/why-two-tools-disagree/index.md).

**Re-verification.** Google requiring proof of the business again after a critical edit. The listing can go pending, drop out of Search and Maps for hours to days, and in rare cases end in a suspension. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

**Review gating.** Routing satisfied customers to Google and dissatisfied ones to a private inbox. Prohibited under Google's contributed-content policy as selective solicitation, and enforcement can strip the rating with no appeal. See [Reviews](../02-core-practice/reviews/index.md).

**Review reply.** An owner response published under a review. Moderated and rejectable, capped at 4,096 **bytes** rather than characters, and replyable only through the owner path (`LSM-REVIEWS-03`, `LSM-REVIEWS-05`). Automating replies without prior specific and express consent is prohibited (`LSM-POLICY-28`), so the default in this manual is manual-first. See [Reviews](../02-core-practice/reviews/index.md).

## S

**SEOG.** The platform the labs in this manual run in — an instrument, in the sense a chemistry manual names a particular microscope. Every concept here is executable by hand; [Doing it without SEOG](./doing-it-without-seog.md) is the long form of how.

**Service-area business (SAB).** A business that serves customers at *their* location rather than its own. A **pure** SAB — one that hides its address entirely — carries no storefront address and no coordinates in the public record (`LSM-GBP-20`), which means most rank instruments cannot measure it at all and will tell you so only if they are honest. See [Service-area businesses](../03-advanced/service-area-businesses/index.md).

**Signal** *(ours)*. An automated spam indicator — a stuffed name, an implausible rating, a missing website. Cheap, stored-data-only and blind to everything untracked. A signal is triage; it is not a verdict and it is not reportable. See [Spam and fake listings](../03-advanced/spam-and-fake-listings/index.md).

**Snapshot.** A dated capture of state you can diff against later — one metrics snapshot per business per calendar day, or a manual capture of a competitor's public listing. No second snapshot, no trend line: a tool that draws one from a single reading is inventing it. See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**Soft suspension** *(industry)*. Enforcement against the *ownership* rather than the listing: your verified access is removed, the listing stays live, and customers see no difference. Invisible from outside, so only the owner dashboard reveals it. See [Suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement/index.md).

**Spanning set** *(ours)*. A tracked keyword set deliberately covering all four intents rather than a pile of discovery terms. Two of the four intents are not rank problems at all, so a set that spans forces you to measure things a rank tracker cannot show you. See [What people actually search](../01-foundations/what-people-actually-search/index.md).

**Stance** *(ours)*. How an AI answer frames a business it names: recommended, listed, hedged or negative. Independent of whether you were mentioned, invisible to string matching, and readable only by a person or a judge model. See [Does the AI recommend this business?](../03-advanced/ai-visibility/index.md).

**Structured data.** Machine-readable markup — in practice JSON-LD — describing the entities on a page. Worth shipping for rich results and for legibility to retrieval systems; the mythology around it as a ranking lever is not supported. See [The website half](../02-core-practice/the-website-half/index.md).

**Surface.** One of the six places a local query can be answered: map pack, local finder, local organic, AI Overview, AI local pack, standalone assistant. Each has its own selector, and every measurement must name one. "Which surface am I trying to appear on, and who decides that surface?" is the manual's spine question. See [What local SEO actually is](../01-foundations/what-is-local-seo/index.md).

**Survivorship bias.** A review history contains only the reviews that survived; deleted ones leave no trace, so a rating trend reconstructed from stored reviews is systematically wrong in a direction you cannot estimate (`LSM-MEASURE-19`). See [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

## T

**Text Search.** The Places endpoint behind most rank checks. Returns at most 20 places per request, excludes pure service-area businesses unless you explicitly ask for them, and returns no location for them when you do (`LSM-PLACES-07`, `LSM-PLACES-10`). See [What the Places API will and will not give you](../05-reference/what-places-returns.md).

**Threat score** *(ours)*. A 0–100 competitor score: 30 points for a rating above yours, up to 40 for review volume relative to yours, up to 30 for momentum across two snapshots. 70+ high, 40–69 medium, below 40 low. It contains **no position** by design — it scores prominence and momentum, the parts you can read from outside. See [Reading a competitor off their public data](../02-core-practice/competitors/index.md).

**Thirty-day cap.** Business Profile API content may be stored for 30 calendar days and "cannot be manipulated or aggregated" (`LSM-POLICY-27`). Places content has a stricter default — no caching at all, with narrow exemptions for place IDs and coordinates. The two regimes do not transfer. Its everyday consequence is easy to miss: a compliant tool must age raw Google content out on a rolling window, so synced review text, competitor field values, cached performance series and generated report PDFs are not permanent records, while identifiers and *derived* measurements — rank positions, profile scores, grid coverage — are. Anything you will need as evidence later has to be exported. See [Storing Google data legally](../05-reference/storing-google-data-legally.md) and [What things cost](./what-things-cost.md).

**Top-3 coverage** *(industry)*. Grid points where the business ranked 1–3, over **all** points scanned. Grey pins count against it, which is why it can fall on the same scan where average rank rises. See [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid/index.md).

**Tracked set.** The keywords you have decided to measure. Freeze it and write it where the client can compare: quietly adding easy keywords and dropping hard ones is the most effective way to show improvement while producing none. See [Building a tracked set that tells the truth](../02-core-practice/choosing-what-to-track/index.md).

**Trust intent** *(ours)*. See **intent**.

## U

**Unknown** *(ours)*. The third state of a profile field, alongside present and absent: **not observable from where you are standing**. Telling an owner they have no description when they wrote one last year is an expensive way to lose a room, so when you cannot see something, write unknown — never "missing". See [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**`updateMask`.** The parameter naming which fields a Business Information write touches. Required and unforgiving: an attribute id named in the mask but absent from the body is **unset**, not left alone (`LSM-GBP-03`, `LSM-GBP-04`). See [GBP capability matrix](../05-reference/gbp-capability-matrix.md).

## V

**Verdict** (Part V). One of exactly five: `WORKS`, `GONE`, `NEVER WORKED`, `UNDOCUMENTED`, `OPEN QUESTION`. They answer different questions rather than expressing degrees of confidence, and every verdict describes a machine surface, never a product capability. See [How to read this reference](../05-reference/how-to-read-this-reference.md).

**Verdict** (spam investigation). One of three worth having: *legitimate*, *sloppy but real*, or *ineligible, verified, here is why*. Only the third is reportable. "Looks spammy" is a feeling with a screenshot. See [Spam and fake listings](../03-advanced/spam-and-fake-listings/index.md).

**`VoiceOfMerchantState`.** The Business Profile field exposing whether Google currently trusts the merchant — the machine-readable signal that a listing has lost its standing (`LSM-GBP-08`). See [GBP capability matrix](../05-reference/gbp-capability-matrix.md).

## W

**Write budget** *(ours)*. Planning a set of profile edits against the ten-per-minute cap, the silent-rejection problem and the re-verification risk on critical fields — instead of discovering all three during a reinstatement. See [The profile is the product](../02-core-practice/the-profile-is-the-product/index.md).

## Z

**Zero-click.** A query answered on the results page itself, with no visit to anything — most logistics queries, answered straight out of your profile's structured fields. You do not win these by ranking; you win them by having the field filled in correctly and identically everywhere. See [What people actually search](../01-foundations/what-people-actually-search/index.md).

---

**Missing a term?** The manual adds vocabulary as chapters land, and terms marked *(ours)* are the ones most likely to need argument. Corrections and additions go through [Contributing](./contributing.md).
