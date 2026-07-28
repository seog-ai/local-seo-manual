---
title: What to measure instead of a rank
sidebar_position: 2
description: Where SEOG itself gets this wrong, what other rank tools do about it, and the owner-side measurements that work for a hidden-address business.
---

# What to measure instead of a rank

The two walls are Google's, and no vendor can engineer around them. What follows is where this tool fails to say so on screen, what other tools do instead, and the measurements that survive.

## This is our defect too, and here is exactly where

A chapter that says "no tool can do this" while its own tool silently pretends otherwise is worthless. So, precisely:

**SEOG will run a grid scan on a pure service-area business and charge you for it.** Nothing on the Rankings screen warns you first. You get grey pins, an avg rank of `—` and top-3 coverage of `0%`.

**The summary above the map then gives advice that cannot work.** On an all-grey scan it says the business did not appear in the top 20 at any point checked, and that growing reviews and putting the term in the profile can help it start showing up.

For an uncompetitive storefront that is good advice. For a hidden-address business it is false: no quantity of reviews puts a record into a result set it is excluded from.

**Competitor discovery makes a stronger false claim.** Its list is headed by a sentence saying you did not appear in the top 20, so every result below outranks you. The first clause is right for the wrong reason and the second does not follow. You were not outranked; you were not in the population.

**The audits are fine, one by luck and one by design.** None of the profile audit's eleven checks demands an address. The website audit is deliberately correct: it drops the address and map-embed checks for this business type rather than failing them ([the website half](../../02-core-practice/the-website-half/index.md)).

**The add-business path already handles it, though not for the reason its own copy gives.** The name search *does* surface hidden-address profiles — it is one of the few places SEOG asks Google to include them, precisely so they are findable. What it cannot do is import one: with no coordinate to store, the attempt is refused with *"This looks like a service-area business — add it with 'Import from your Google account' below."*

The consequence is the useful one: **every pure service-area business in SEOG arrived through the owner connection by construction**, so the one family of measurement that does work was available from the first minute.

(The helper text under that section still explains the refusal by saying such profiles "don't appear in search". They now do; the sentence is stale, and goes on the same disclosure fix list as the Rankings and Competitors gaps above.)

The gap is on Rankings and Competitors. It is a disclosure gap rather than a data gap, and until it closes this chapter stays a draft.

## What other tools do about it

Two mechanisms, both described in [why two tools disagree](../why-two-tools-disagree/index.md).

| Tool family | First wall — is the business in the data? | Second wall — is there a centre? |
| --- | --- | --- |
| **Ranked place data** — SEOG's family | Hits it: the business is not in the results, so no number is produced | Never reached |
| **Rendered consumer search pages from a spoofed location** | Passes it: it can see a hidden-address business, because the pack a human sees contains it, so a number is produced | Hits it: it has to invent a centre, and its gradient is uninterpretable for the same reason ours would be |

So the accurate claim is not "no tool returns a figure".

> **For a pure service-area business a map-pack rank is either unmeasurable or uninterpretable, and no tool manages the third thing.**

## What to measure instead

The good news is unusually good: what survives is closer to money than a rank ever was.

| Measurement | Works for a pure SAB? | Where | Cost |
| --- | --- | --- | --- |
| Profile views, calls, website clicks, messages, bookings | **Yes** — owner data, no coordinate involved | Overview → performance panel | paid |
| Direction requests | Technically yes, practically near zero — no address to navigate to | same | — |
| The search terms people actually used | **Yes** | Overview → search-keywords card | paid |
| Reviews: volume, rating, recency, reply rate | **Yes** | Reviews | free to read |
| AI visibility across engines | **Yes** — and no coordinate problem | AI Visibility | paid per check |
| Citation and NAP consistency | Partly — name and phone only; there is no address to compare | AI Visibility → Citations | paid |
| Website audit | **Yes**, with address and map-embed checks dropped | Website | paid to refresh |
| Competitor set and the bar it sets | Yes, from a typed area — but your own row is absent | Competitors | paid |
| Map-pack position, geo-grid | **No** | — | — |

Three deserve a sentence each.

**Owner performance is the spine** — profile views, calls, website clicks, direction requests, messages and bookings, as daily history running back about eighteen months, which is as far as Google's performance data goes.

One thing to know about the top tile: Google reports views as four separate metrics (desktop and mobile, Search and Maps) and the app adds them into a single **Profile views** series, so that number cannot be split back into "found us on Maps" and "found us in Search" here.

Its harder limit must be stated in every report: Google publishes **no geographic breakdown** at all — the only sub-entity breakdowns the performance data offers are day-of-week and time-of-day, and neither currently carries any metric (verified against Google's performance API reference, 2026-07-27).

So "calls went up 40%" can never be attributed to a town ([what Google's reporting hides](../../05-reference/what-googles-reporting-hides.md)).

**The search-terms report is the closest thing to a keyword measurement you get.** Two caveats govern its use.

1. **It is not a position, and not quite a volume either.** Google defines each figure as the number of *unique users* who used that term in the month, so a term you appear for often may be a term you appear for badly, and a hundred searches by one person count once. The app's column is headed **Impressions** — read it as Google's definition, not the word.
2. **Low-volume terms come back as a privacy threshold rather than a count**, rendered as `<N` where N is whatever threshold Google returns rather than a fixed number. You cannot sum a column containing those and present the total as a number.

**AI visibility is the one surface where a service-area business is not disadvantaged.** An assistant asked "who's the best emergency plumber near Kilburn" consults no coordinate index; it answers from text.

The town-centroid anchor that is meaningless as a grid centre is exactly right as a probe location, because the probe asks about the town. Run it as a rate over repeated runs across engines — the method in [measuring AI visibility](../ai-visibility/index.md).

None of this needs a tool. The performance series and the search terms are in Google's own Business Profile interface, free, for anyone with owner access; the AI probes are a browser and a fixed prompt list. [Doing it without SEOG](../../99-appendix/doing-it-without-seog.md) has the manual version.

## What you promise a service-area client

Rewrite the engagement before you sign it, not after the first report. Do not promise a rank. Promise:

- profile completeness;
- a review programme with a stated inflow target;
- the published search terms each month;
- calls and clicks against a dated baseline;
- an AI-visibility rate across a fixed prompt set.

All measurable, all defensible, none requiring a coordinate.

If you inherit an account whose old reports carried a grid, explain the mechanism and stop producing the picture — you are replacing a coloured map with call volume ([what you inherit with a client](../../04-operating/what-you-inherit-with-a-client/index.md)).

One temptation to kill now: **do not add a street address to make the business trackable.** Publishing an address at which you do not serve customers — a home, a mailbox, a co-working desk — goes against Google's guidelines, and Google states plainly that it *"reserves the right to suspend access to Business Profiles"* over guideline violations ([Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177), verified 2026-07-27).

What that costs in practice is the part to be careful about: the profile comes off Search and Maps until an appeal succeeds, and practitioner accounts of the severe case — what the trade calls a hard suspension, not Google's own term — report that reviews and rankings usually return on successful reinstatement.

"Usually" is the operative word, and reinstatement is not guaranteed, so the honest framing to a client is that you are risking the listing itself for a metric, not that the reviews are certainly gone ([suspensions and reinstatement](../suspensions-and-reinstatement/index.md)).

---

**Next:** [Labs: classify the business, build a rank-free scoreboard →](./service-area-labs.md)
