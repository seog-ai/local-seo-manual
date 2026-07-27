---
title: The 2026 inventory and who decides each surface
sidebar_position: 2
description: What has actually been measured about AI local packs, AI Overviews and assistant recommendations — and why six surfaces with five different selectors disagree.
---

# The 2026 inventory and who decides each surface

The previous page named the six surfaces. This one puts dated numbers on them, then asks the question that matters more than any of the numbers: for each surface, who is doing the choosing.

## The 2026 inventory, with dates on it

Most "what is local SEO" pages describe a three-result pack and one machine. Here is what has actually been measured, and by whom. Every figure below is vendor-published and observational — useful, but none of it is a controlled experiment, and the methodologies are only partly disclosed.

**The AI local pack surfaces roughly a third as many businesses as the pack it displaces.** Sterling Sky's *The State of Local SEO in 2026* (published June 2026) reports AI local packs surfacing **5,943 unique businesses where regular 3-packs surfaced 18,330** across the same tracked set — about **32% coverage**, so two businesses in three vanish.

Read the figure carefully: several write-ups render it as "32% fewer businesses", which is the opposite of what the two counts say.

In the same tracking, AI local packs appeared on about **7%** of tracked keywords, showed **one or two** businesses instead of three, and **had no call button**; across 322 markets, 88% had fewer unique businesses in the AI pack than in the traditional one.

Nothing is published on which businesses survive the cut or why, and Google's documentation does not acknowledge the surface at all.

**AI Overviews are common on local searches, and much rarer on local-intent ones.** Whitespark's May 2025 study — 540 queries across three US cities and six industries — found AI Overviews on about 68% of the set overall but on only about **15% of queries with clear local intent**, where the local pack appeared in 93%.

Local Falcon's May 2025 whitepaper (60,000 queries) put overall incidence at 40.2%, with the same gradient running down the intent types:

- reason 59.9%
- informational 58.3%
- instructional 54.4%
- transactional 47.4%
- commercial 17.2%
- navigational 10.5%

The two headline rates are not comparable — different query sets, different intent taxonomies — but the gradient is. **The more the query looks like a purchase, the less likely a generated answer is to intercept it, for now.**

**The assistants recommend far fewer businesses than the pack does.** SOCi's 2026 Local Visibility Index (~350,000 locations) reported recommendation rates of 1.2% for ChatGPT, 7.4% for Perplexity and 11% for Gemini, against 35.9% for the Google local 3-pack:

| Surface | Recommendation rate |
| --- | --- |
| ChatGPT | 1.2% |
| Perplexity | 7.4% |
| Gemini | 11% |
| Google local 3-pack | 35.9% |

The same study reported profile accuracy of roughly 68% on ChatGPT and Perplexity versus ~100% on Gemini — which tracks with Gemini being Maps-grounded — and only 45% overlap in retail between the brands that win Google local and the brands the assistants recommend.

Treat the exact percentages as soft; the methodology is not fully published. Treat the *shape* as solid: these are different populations of winners.

**One surface has already been retired.** The questions-and-answers API was switched off on 3 November 2025; on 3 December 2025 Google confirmed it was removing the public Q&A panel from business profiles, rolling out over the following months and replacing it with Gemini-powered "Ask Maps".

A capability that a whole category of tooling was built on stopped existing, and a surprising amount of current published advice still describes it as live. Dated facts are in [the local search changelog](../../05-reference/local-search-changelog.md).

## Who decides, and why the answers diverge

Each surface has its own selector.

**The pack and the finder share a selector.** Both are chosen by Google's local ranking system, described in terms of relevance, distance and prominence — the subject of [the next-but-one chapter](../relevance-distance-prominence/index.md). Local organic is chosen by ordinary web ranking, which is why directories and listicles beat business homepages there.

**The generated surfaces do not.** The AI Overview is generated over Google's index; the AI local pack is generated over something local, and nobody outside Google knows what. Assistants each retrieve from their own stack.

They diverge because they are grounded differently, not because any of them is broken.

One measurement worth carrying: Ahrefs, comparing 540,000 query pairs of September 2025 US data, found AI Mode and AI Overview citations — two surfaces from *the same company* — overlapping only 13.7% (16.3% across just the top three citations).

If Google cannot agree with itself about which sources to cite, an assistant from a different company disagreeing with your map pack is the normal condition, not an anomaly to be fixed.

Which gives the manual its spine question, and you should ask it before every piece of work you do:

> **Which surface am I trying to appear on, and who decides that surface?**

"Improve our Google ranking" does not survive contact with that question. "Get into the map pack for `emergency plumber` within two miles of the shop" does, and it tells you what to measure.

## What is the same everywhere

The picture above is fragmenting, but not infinitely. Underneath all six surfaces sit a small number of shared inputs, and this is what stops the job from being six jobs.

- **They are all ranking a business entity, not a website.** The profile — name, address, category, hours, attributes — is the object. The website is a supporting signal attached to it. That is [the next chapter](../the-business-entity/index.md), and it is the single idea that reorganises most people's mental model.
- **Reputation is the heaviest shared input.** Review volume, rating and recency feed both the pack and the assistants' answers. In SEOG's AI-readiness score, review count and rating together are enough to reach the middle tier on their own — a deliberate calibration, defended in [Diagnosing a business in thirty minutes](../../02-core-practice/analyzing-business-visibility/index.md).
- **Consistency of the entity's facts across the web** matters to every surface, and disproportionately to the AI ones. Whitespark's 2026 Local Search Ranking Factors survey puts citation signals at roughly 7% of local-pack weight (write-ups of it quote 6–7%) — small, and a poll of practitioners rather than a measurement.

  The case for doing the work anyway is now mostly an AI case, and it is a mechanism argument rather than a statistic: [Citations and NAP consistency](../../02-core-practice/citations-and-nap/index.md) sets out what is and is not knowable there.

What does **not** follow is "do good local SEO and the AI surfaces come along". A 45% brand overlap between Google-local winners and AI-recommended winners says the opposite. Shared inputs, different selectors.


---

**Next:** [Surface labs and common mistakes →](./labs-and-common-mistakes.md)
