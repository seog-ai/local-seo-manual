---
title: Citations and NAP consistency
sidebar_position: 1
description: A citation is your business's record on someone else's site. Consistency is not string matching but entity resolution — here is what actually breaks it.
---

# Citations and NAP consistency

Your business exists in more places than its Google profile. Apple Maps holds a record. Facebook has a page. Yelp has a listing that somebody — possibly not you — created. Each is another system's answer to *what is this business, and where is it*.

When those answers disagree, something has to decide which is right. That decision is the subject of this chapter, and understanding it is the difference between doing citation work and buying it.

## What a citation is

A **citation** is any published record of your business's identity on a site that is not yours. There are two kinds:

- **Structured** — a directory listing with fields: Yelp, Apple Maps, Foursquare, Facebook, TripAdvisor, a trade body's member list.
- **Unstructured** — a mention in prose. A local newspaper writes "Kaffa Roastery on Pursimiehenkatu" and that sentence is a citation, with no fields and no link.

**NAP** is the three identifying fields: name, address, phone. The shorthand is slightly wrong — a website and a category identify too — but it names the fields that break most often. A citation is not a backlink; most do not link to you.

## Consistency is an entity-resolution problem

**Google does not award tidiness points.** What Google — and Apple, and any assistant grounded in web search — has to do is **entity resolution**: take many records from many sources and decide which describe the same real-world thing.

Every record has three outcomes and only one is good.

| Outcome | What happens to the record |
| --- | --- |
| **Matched** | Its evidence attaches to your entity. |
| **Discarded** | The system cannot tell it is you, so the evidence is lost. |
| **Mis-matched** | It attaches to something else, usually a duplicate of your own business, splitting your reputation between two listings. |

**A record that cannot be resolved is not neutral** — it is either wasted or actively harmful. That is a much better reason to care than "Google likes it", and it is the work queue implied by [the entity model](../../01-foundations/the-business-entity/index.md).

### What a resolver actually tolerates

Because the same shop is legitimately written a dozen ways, a resolver has to be *tolerant* — demand identical strings and it matches almost nothing. Below is what the matcher behind Lab 12.1 does, so you can predict its verdicts before it produces them.

| Field | Folded together (same business) | Kept apart (different business) |
| --- | --- | --- |
| **Name** | Case, accents, punctuation, apostrophes. A dropped legal suffix — Oy, Ltd, LLC, Inc, GmbH. One name containing the other: "Starbucks" and "Starbucks Coffee". | A genuinely different trading name. |
| **Phone** | All formatting. Country code against the domestic trunk zero — `+358 9 …` and `09 …` are the same line, because the comparison runs on the national tail. | A **different line**: a call-tracking number, a superseded number, a mobile where the listing carries the landline. |
| **Address** | Street/St, Avenue/Ave, North/N. Suite, unit and floor designators, which carry no location identity. Extra detail on one side — postcode, country. | A **different house number**, an immediate no-match. Or too little overlap in the remaining tokens. |

The values on one side of every comparison come from your own profile record:

![The Profile page for Kaffa Roastery, showing category, price band, photos, phone number, website, opening hours and Google attributes](../../../static/img/screens/profile.png)

*This is what a listing gets compared against — the stored profile, not your letterhead. Google renders the phone as "050 3065499"; a directory holding "+358 50 3065499" is the same line and folds to a match, because the comparison runs on the national tail. A directory holding a different number does not, and that is the row worth your afternoon.*

**Read that table twice**, because it inverts what most people are told. "Ave" versus "Avenue" does not break resolution. Neither does a missing suite number, a dropped "Ltd", or a phone written with brackets.

What breaks resolution is a **different fact**: a different house number, a different phone line. Those two are worth hunting; a fifty-row consistency report that does not separate them from cosmetic variance is noise wearing a suit.

> **A note on certainty.** We can describe the matcher we can read; Google's is not published and nobody outside Google knows its tolerances. But every resolver faces the same problem, and one distinction survives any sane implementation: *a different value is a break, a different rendering is not* *(inference)*.

### What actually breaks it

- **Call-tracking numbers.** One on the website, another in a paid directory, the real one on the profile — the entity now has three phone identities. If you must track calls, keep the profile number visible on the site; never put a tracking number into a directory listing.
- **A move, or a rebrand.** The old address and the old name survive on directories for years, because nobody deletes anything.
- **A listing you did not create.** Yelp, Foursquare and Apple all hold records built from data feeds — you may have a listing carrying whatever an aggregator believed in 2019.
- **A duplicate you made yourself**, by "creating" a listing on a platform that already had one. See Lab 12.4.

## How much does this actually weigh?

**For the map pack, less than the industry sells.** The field's long-running annual practitioner survey — [Whitespark's Local Search Ranking Factors](https://whitespark.ca/local-search-ranking-factors/), 2026 edition, published November 2025 — puts **citation signals at roughly 7% of local-pack weight**, behind everything else that is usually measured:

| Factor group | Share of local-pack weight |
| --- | --- |
| Profile signals | ~32% |
| Reviews | ~20% |
| On-page signals | ~19% |
| Links | ~15% |
| **Citation signals** | **~7%** |

*(The percentage table sits inside the report rather than on its landing page; these figures were cross-checked against two independent summaries of it.)*

Two caveats matter more than the number.

**It is an opinion survey** — 47 local search experts scoring 187 factors, which is expert consensus about a system none of the respondents can see inside — so treat it as the best available prior, not a finding.

**And a small average weight is not a small effect**: citation influence looks threshold-shaped *(inference)*, invisible for most businesses and then expensive the moment there is a real contradiction.

So if citations are not how you win the map pack, why is this chapter in Part II? Because the weight moved somewhere else.

---

**Next:** [Citations for AI answers, and the four verdicts →](./ai-answer-citations-and-verdicts.md)
