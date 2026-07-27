---
title: Location pages, limits, and triaging a portfolio
sidebar_position: 2
description: Why every profile needs its own page, the four budgets that constrain a portfolio, and how to triage locations worst-first instead of monitoring all of them.
---

# Location pages, limits, and triaging a portfolio

The unit of measurement is one location, and so is the unit of work. What follows is the site structure a chain needs, the four budgets that bind a portfolio, and how to decide which locations get your attention this week.

## Per-location pages

Each profile's website link should point at **that location's page**, not the shared homepage. A homepage serving as the destination for eleven profiles cannot be the canonical answer for any of them, and it makes every citation, every AI answer and every "which branch is this" question ambiguous. No other structural decision on a multi-location site has more downstream consequences.

A location page earns its place when it does three things:

1. **Carries that location's name, address and phone exactly as the profile does.** Not approximately — [citations and NAP consistency](../../02-core-practice/citations-and-nap/index.md) explains why formatting drift is the whole game.
2. **Says something only true of that location.** Its staff, its parking, its neighbourhood, its actual photographs.
3. **Is readable by an agent** — machine-readable location data, one entity per page, no ambiguity about which branch it describes. That is [making the site readable by agents](../../02-core-practice/making-the-site-readable-by-agents/index.md), where multi-location sites most often fail silently.

**The failure mode is the cloned template** — forty pages generated from one, with the town name swapped. Google's Search spam policies name *scaled content abuse* as a violation. Read the current wording yourself rather than my summary, and note it is a **Search** policy, so the consequence lands on your pages, not the profiles.

The practical test is simpler: delete the town name; could a reader still tell which branch the page described? If not, it is not a location page.

## Where the limits actually bite

Four budgets constrain a portfolio, and they scale differently.

**Money and time.** Every fetch is per-location. A grid scan is one live search per grid point, so a Detailed scan of one keyword at one branch is dozens of searches — multiply by keywords, then by locations.

A portfolio's tracked set must therefore be designed as a portfolio: two or three keywords per location on a real cadence beats fifteen scanned once and never again. [Choosing what to track](../../02-core-practice/choosing-what-to-track/index.md) is the method; at scale it becomes a budget.

**Writes.** Google enforces a ceiling on profile edits per minute, and it is **per profile** — not per account, not per group. That cuts both ways: one field across thirty branches is not limited in aggregate, while a long fix list on *one* branch will hit it.

The numbers are in [write limits and failure modes](../../05-reference/write-limits-and-failure-modes.md); the shape says parallelise across locations rather than slow down globally.

**Owner access.** One connected Google account can hold many accounts and many locations, and the import picker walks all of them. The list is long and you import one at a time. There is no "import all".

**Quota.** Your plan caps how many locations the portfolio holds — a counter sits beside **Add business** on `/businesses` — and tracked keywords and competitors have hard ceilings *per location*. Neither bites with one business; both shape the design with twenty.

### Three things this tool does not do

Said plainly, so you can plan around them:

- **No groups.** The portfolio is a flat list. Run forty locations across six clients and the grouping lives in your notes.
- **No bulk edit.** Every profile write is one location at a time. Use Google's bulk upload for real bulk changes.
- **No portfolio report.** Reports are per location; a chain-level deliverable is assembled by you — [reporting to a client](../../04-operating/reporting-to-a-client/index.md).

![My Businesses page: a location counter reading 1 of 10 businesses beside the Add business button, above a single flat card](../../../static/img/screens/businesses.png)

*The portfolio in this capture holds one location, and two of the constraints are already on the screen: the plan's location counter sits beside **Add business**, and the estate is a flat list of cards — there is no grouping control anywhere on the page.*

## Triage instead of monitoring

You cannot look at forty locations weekly. Trying is how the two branches that needed attention get the same fifteen seconds as the thirty-eight that were fine.

The account dashboard sorts the portfolio worst-first on a composite score computed from stored data — no calls to Google, so opening it is free and repeatable. Its inputs:

| Signal | Contribution |
| --- | --- |
| Profile score below 80 | 1 point per point of deficit |
| Open fixes | 6 per fix |
| Unanswered reviews | 5 per review |
| Tracked keywords that slipped since the last check | 12 each |
| Website score below 50 | 20 |
| Never synced, or last synced over 14 days ago | 15 |

**A healthy location renders as All quiet.** Each card shows only the chips that are actionable — *N fixes*, *N to answer*, *N slipping*, *Profile weak*, a website score — and nothing else. That principle is worth stealing whatever you use: a triage board must stay silent about locations that are fine, or the reader learns to skim it.

**Now the caveats**, because heuristics are what Part III is for. The score is not evidence. It is blind to market difficulty and to distance, so a location comprehensively beaten in a hard market while holding a spotless profile sits near the bottom looking quiet.

It also weights *staleness* alongside *health*, so a location you have not refreshed climbs without anything being wrong.

> **Read the chips, not the ordering.** The ordering tells you where to look; only the chips say what is wrong.

---

**Next:** [Labs: the triage ordering, branch overlap, and your own branch as a competitor →](./multi-location-labs.md)
