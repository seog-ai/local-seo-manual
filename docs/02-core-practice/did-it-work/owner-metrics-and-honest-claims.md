---
title: Owner metrics and what you may honestly claim
sidebar_position: 2
description: Google splits impressions four ways, reports the last few days late and counts clicks rather than outcomes — how to read it, and where every claim belongs.
---

# Owner metrics and what you may honestly claim

Tier 3 is where the owner-side numbers live, and they are the tier a client actually reads. Before you quote any of them, you need the three distortions built into how Google reports them — and the vocabulary for saying which movements you are willing to stand behind.

## Google's owner numbers, and their three distortions

Connect a Google Business Profile and you get the owner side: how many people saw the profile and what they did next. It is the closest thing to an outcome metric local SEO has, and slipperier than it looks.

### There is no "profile views" number

Google publishes impressions as four separate counts, and never a combined one:

- desktop Maps
- desktop Search
- mobile Maps
- mobile Search

Any single "views" figure is therefore a construction whoever showed it to you performed. A report built from one of the four is a quarter of the truth, and such reports exist. The app sums all four into one **Profile views** series; if you build this yourself, sum them or say which you used.

**Summing has its own edge**, worth a footnote in a client report. Google defines each of those four as deduplicated per unique user per day — *"Multiple impressions by a unique user within a single day are counted as a single impression"* — but documents no deduplication *across* the four.

So a customer who saw you on mobile Search and again on mobile Maps the same day plausibly counts once in each and twice in the sum *(inference from the per-metric definition; we have not probed a controlled single-user case)*.

A month of "3,000 views" is at most 3,000 people-days, and fewer people. The mechanism is [What Google's reporting hides](../../05-reference/what-googles-reporting-hides.md).

### Zeros at the right-hand edge are usually reporting lag, not a collapse

**The documented half first.** Google's own legacy Insights reference warns that *"in some cases, the data may still be missing for days close to the request date"*, and nothing in the response marks a day as provisional — so a value read today and the same day re-read next week can differ without either being wrong.

**What is not settled is the mechanism.** Whether Google omits a zero-activity day from the series entirely or returns it explicitly as zero is undocumented, and we have no probe on file *(open question — [What Google's reporting hides](../../05-reference/what-googles-reporting-hides.md) carries the probe that would close it)*.

Either way the practice is the same:

1. Back-fill absent dates to zero.
2. Keep count of how many dates Google actually returned.
3. Exclude the trailing few days from every total and every comparison.

If the last day or two of every metric read zero while the preceding weeks look healthy, treat it as lag and check again in a week. That tail also drags each tile's trend badge, which compares roughly the first week of the window against the last. Read the sparkline, not just the percentage.

### A click-to-call is not a call

Google's own definitions are the whole argument here.

| Metric | What Google counts | What it does *not* tell you |
| --- | --- | --- |
| **Calls** | *"the number of times the business profile call button was clicked"* | Whether the call connected, was answered, or lasted two seconds. That is not in the data — Google does not report it, so no tool has it. |
| **Direction requests** | The number of times directions were requested | The number of people who arrived |
| **Website clicks** | Clicks out | Sessions in your analytics, which this will not match *(inference on that gap's direction: consent banners and blockers make analytics the lower number)* |
| **Bookings** | Narrower than it sounds: bookings made through Reserve with Google | Every appointment you took |

### The search-terms table is a separate dataset

The search-terms table further down the page plays by separate rules: Google aggregates it monthly, not daily, and low-volume terms come back with the count withheld.

What you get instead is a threshold — documented as *"the threshold below which the actual value falls"* — which the app renders as `<N`. Any total built from those rows is an upper bound, and it inflates most for the smallest businesses. Label it as one ([Building a tracked set that tells the truth](../choosing-what-to-track/index.md)).

## What you may honestly claim

Sort every observed movement into one of three buckets, out loud, in the report.

| Bucket | What qualifies | How you say it |
| --- | --- | --- |
| **Verified** | The change landed: the field reads what you wrote, the reply appears in a read-back, the schema validates. | "Done, confirmed on Google on 14 March." |
| **Plausible** | Movement is in the right direction, began after the change, and is *local to what you changed* — that keyword, those pins, that metric. | "Coverage rose 24% → 40% in the four weeks after the category change. Consistent with it; not proven by it." |
| **Unattributable** | Everything else: market shifts, seasonality, a competitor's suspension, an update — anything you cannot separate from those. | "Calls are up 30%, but the whole market moved the same way, so we are not claiming it." |

Three habits keep the middle bucket honest.

**Change one lever at a time when you can.** Ship four fixes in a week and you have bought one uninterpretable result. When the timeline will not allow it — usually — stagger by *domain*: profile this fortnight, reviews next, website after.

**Keep a dated change log.** Date, what changed, where, who did it. The app stamps its own side; it does not know you rewrote three service pages on the 9th.

**Assume the market moved too.** Rank is a sort order, so a competitor's improvement drops you with nothing happening to you. Before blaming a fall on your own work, check whether the ground moved under everyone — [Reading a competitor off their public data](../competitors/index.md).

And never assemble the before-picture *after* the change: the baseline you froze in [Diagnosing a business in thirty minutes](../analyzing-business-visibility/index.md) is your only honest anchor.

> **Without SEOG** · By hand this is a spreadsheet — one row per coordinate, one column per date, a note on every column recording that reading's conditions — plus the Performance section of the Google Business Profile dashboard. It works, slowly, and fails where discipline matters most: nobody hand-records conditions consistently for six months. See [Doing all of this without SEOG](../../99-appendix/doing-it-without-seog.md).

---

**Next:** [Re-measuring in practice →](./re-measuring-in-practice.md)
