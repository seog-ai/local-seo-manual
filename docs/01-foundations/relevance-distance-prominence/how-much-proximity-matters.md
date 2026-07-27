---
title: How much proximity really matters
sidebar_position: 2
description: The published numbers on proximity — a 55% opinion poll, the largest grid study and its censored tail — and why distance barely moves an AI answer.
---

# How much proximity really matters

Everyone agrees distance is the biggest force in the map pack. The published numbers behind that agreement are weaker than the confidence people quote them with, and one surface over they stop applying altogether.

## Proximity, quantified — and then corrected

### The 55% is a poll, not a measurement

Everyone quotes a number for proximity. The most-repeated one — roughly 55% — comes from Whitespark's *Local Search Ranking Factors* (2026 edition, published 6 November 2025): 47 practitioners ranking 187 factors. It is an opinion survey: no experiment, no confidence interval, no stated method for turning votes into percentages. The industry's best consensus, and not a measurement.

**It is also not on the same scale** as the other figures from that survey you will meet later in this manual — profile signals at 32% of local-pack weight, reviews at 20%, citations somewhere in the single digits ([citations and NAP consistency](../../02-core-practice/citations-and-nap/index.md)). Those are shares of a whole; the 55% is proximity's standing as a single named factor, quoted outside that split. Do not add them together, and do not let anyone else.

**Treat the small shares as approximate.** The report itself sits behind a form, and the second-hand summaries of it disagree with each other — citations appear as 6% in some and 7% in others, with wider disagreement still on on-page and links. When two write-ups of one survey cannot agree on a number to the percentage point, the number was never precise enough to carry an argument.

### The largest dataset, and its censored tail

**The largest actual dataset is different in kind.** rankings.io's [Google Maps proximity study](https://rankings.io/data-studies/proximity-data-study/) scanned roughly 1,100 law firms — 20 in each of the 50 largest US cities, plus a second pass at a 5-mile radius in the ten largest — on 15×15 grids of 225 points at a 10-mile radius, for the single keyword *car accident lawyer*. It reports:

| Finding | Value |
| --- | --- |
| Firms ranking #1 at their own address | 56% |
| Average change across the first mile | −8 positions (−5 to −12 depending on the city) |
| Fitted exponential decay constant | λ = 2.3 (the study's own worked example: −9.4 positions at 0.59 mi) |
| Firms out of the top 20 at the grid's outer edge | 27% (Pittsburgh) to 92% (Queens) |

That last row is the one people misquote by attaching a mileage to it. The study says only "at the largest distance", and notes that the largest distance is not identical in every city — so it means the edge of a 10-mile-radius grid, not a specific number of miles.

Read the first row again: barely more than half ranked first *at their own front door*, for their own core term. Proximity is enormous and still not sufficient.

**Now the correction, which matters more than the numbers.** The study measured with a tracker that only sees the top 20 and **imputed a constant value of 25 for every observation past that ceiling** — the authors say so themselves. A business genuinely 400th, or absent altogether, was recorded as 25.

That pulls the tail toward the centre, so the curve is biased optimistic exactly where decay is steepest. The real drop-off past the first mile is worse than λ ≈ 2.3 says, by an unknown amount.

**The other limits are ordinary but disqualifying** if you quote the study as a law:

- One keyword ("car accident lawyer"), one vertical.
- One point in time, no repeat measurement.
- No confidence intervals.
- Grids centred on the firm rather than on demand.
- Never replicated.

> **Carry the *shape*, not the constant.** Decay is steep in the first mile, and how far your visibility reaches is mostly a function of how crowded your market is — the 27%-versus-92% spread is the real finding.

That censoring problem is not a quirk of one study; it is the defect underneath every "average map rank" figure in the category, and Part III takes it apart.

## Proximity in an AI answer: almost nothing

Here the triad stops holding, and no local SEO curriculum has caught up with it.

Local Falcon's May 2025 whitepaper on AI Overviews and local visibility ran 60,000 queries across 4,423 businesses in 20 countries, including 430 US businesses on 7×7 grids at roughly 0.67-mile spacing — about 21,000 geographic data points. Its central finding: **the correlation between distance and rank inside an AI Overview is 0.001**. Effectively zero.

Distance still affected inclusion, barely: businesses within a mile of the search point appeared in 72.0% of answers, against 68.5% for those one to two miles out; average position 3.39 versus 3.49. Once you are in the answer, where the searcher stands has no detectable bearing on your place in it.

**Treat that as directional, not settled.** It covers Google's AI Overviews only — no ChatGPT, no Perplexity, no AI Mode. The data runs to 7 May 2025, over a year stale, and predates both AI Mode's rollout and ChatGPT shipping opt-in device-location sharing on 26 March 2026. Vendor-published, unreplicated.

The direction is at least coherent with how assistants appear to assemble a local answer: retrieval on entity and reputation signals, not a distance sort *(inference)*. So the force that dominates the map pack is close to irrelevant one surface over, and the two slow, hard forces carry across both. [How an AI assistant answers a local question](../how-ai-answers-a-local-question/index.md) is the mechanism; [Does the AI recommend this business?](../../03-advanced/ai-visibility/index.md) is the measurement.

## What you actually control

| Force | Control | Speed | Where the work is |
| --- | --- | --- | --- |
| Relevance | High | Days | Category, services, description, attributes, site content |
| Distance | Almost none | n/a | Location and service-area decisions only |
| Prominence | High, indirectly | Months | Reviews, listings, mentions, organic ranking |

Two of the three are yours. The one that is not is where most people spend their frustration.

---

**Next:** [Labs: find which force is holding you back →](./labs-find-your-constraint.md)
