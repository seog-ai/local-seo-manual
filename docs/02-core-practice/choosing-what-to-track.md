---
title: Building a tracked set that tells the truth
sidebar_position: 2
description: How many keywords to track, which ones, measured from where, and how often — treating a tracked set as a sample rather than a wish list.
---

# Building a tracked set that tells the truth

A tracked keyword set is a sample. You cannot measure every query that could produce a business, so you pick a handful and treat what they do as evidence about the rest. That is what a pollster does, and it fails the way a poll fails: not by measuring wrong, but by measuring the wrong people and reporting the result with a straight face.

Most sets in the wild are not samples. They are wish lists with a bias baked in — the terms someone hoped to rank for, plus the ones that looked good on the first report. Such a set produces numbers that are true and meaningless.

[Chapter 6](../01-foundations/what-people-actually-search.md) gave you a set built from your own vocabulary and a suggestion list. This chapter replaces the guesswork with Google's own record of what people typed, prunes what is left to rows that can tell you something, and then decides how often to look.

## What the sample unit really is

The first correction: a tracked row is not a phrase. It is a phrase measured from a point, in a language. Confirm it in the app rather than take it on faith — adding the same phrase with a different **Search from** location produces a second, independent row with its own history, not an edit of the first. Identity is the combination: business, phrase, location, language.

![The Rankings screen with one tracked keyword: the add form showing Search from, Language and Radius, a red "Already tracking this keyword here" message, and a Local visibility card reading 1/1 in top 3](../../static/img/screens/rankings-tracked.png)

*The add form is the identity rule made visible: the phrase, plus **Search from**, **Language** and **Radius**. Re-enter the same phrase for the same point and it is refused — "Already tracking this keyword here" — while the same phrase from another origin is accepted as its own row. Note the **Local visibility** card below: with one keyword tracked, every figure reads 1/1 and `#1`. That is a property of the sample, not of the business.*

Distance is one of the three forces ([relevance, distance, prominence](../01-foundations/relevance-distance-prominence.md)), so "where you rank for `plumber`" is not a fact about your business. It is a fact about your business *at a coordinate*. Two rows for one phrase from two neighbourhoods are two observations. `plumber` and `plumbers` from the same door are one observation billed twice.

The second correction is depth, and it is the censoring rule from [rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number.md) applied to a keyword list rather than a grid. A rank check reads the top of the local results — here, the top twenty — so **Not ranked** means *not found in the window we looked at*, and the truth could be 22, or 400, or nowhere. It matters the moment anyone averages your positions. Never write a number where the tool wrote nothing.

> **Note** · If your practice business is a pure service-area business — a trade with a hidden address — keyword rank checking cannot work for it at all, in this tool or any other built the same way. That is structural rather than a bug, and it has [its own chapter](../03-advanced/service-area-businesses.md). The cadence and sampling parts here still apply to it.

## The one source that is not a guess

If you have owner access to the profile, Google will tell you the search terms that actually produced it — not estimates, not a national planner average, but the queries that put this business in front of somebody. It replaces trade vocabulary with customer vocabulary and surfaces terms stranger than anything you would have invented, and almost nobody consults it before building a set.

It has three properties that most reporting quietly ignores.

**It is a survivor's list.** Every term in it is one you *already appeared for*. A query where you were invisible produced no impression, so it is not in the report and cannot be. That makes it excellent for fixing your words and useless for finding your gaps. Gaps come from the other direction: the intent cells you have not filled ([chapter 6](../01-foundations/what-people-actually-search.md)) and who sits above you.

**There is no month attached to a number.** Ask for a window and you get one line per term with one total for the whole window. Not a series, not twelve points — one number, with no month field anywhere in it. The only honest way to build a month-by-month trend is to ask for each month separately, twelve times, and stack the answers yourself.

The consequence is uncomfortable. A month-over-month keyword chart built from one request is placing values in months Google never put them in: either the tool made twelve requests, or the chart is decoration. The honest version is in the lab below — the card starts as a plain **Keyword / Impressions** table labelled *trailing 12 months*, and grows **Trend** and **Last month** columns only once you buy the twelve separate asks. The mechanism is in [what Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

**Low-volume terms come back as a ceiling, not a count.** Google withholds exact counts below a privacy threshold and returns the threshold instead — those cells render as `<40` rather than `40` (40 is an example; the threshold is Google's), because the real number is *below* what is shown. Your long tail is a set of upper bounds, and any total summed from them is one too. Label it on a client report: "under 40" and "40" look similar, and one of them you cannot defend. *(Verified against Google's owner-side reporting, July 2026.)*

## Pruning: which rows earn a slot

You now have more candidates than slots. Pruning is where a set becomes a sample instead of a pile.

Sort them into cells rather than into a ranked list. A cell is an intent crossed with a place: *discovery / town centre*, *discovery / north suburb*, *comparison / anywhere*, *trust / branded*. Fill each cell once. A second row in a filled cell buys a duplicate; the first row in an empty cell buys a new fact.

Then put every survivor through three questions.

1. **If this number moved five positions, would I do anything differently?** If not, it is a row you will read and ignore. Ignoring is fine; paying to be able to ignore is not.
2. **Is any other row likely to move with it?** Near-duplicate queries return near-identical result sets and drift together *(inference — from duplicate rows in one market moving in step, not a controlled study)*. Four rows that all rose is one observation reported four times.
3. **Can I name who I am competing with on it?** If you cannot name two businesses that contest the term, you cannot interpret its number.

Six to ten rows survive this for a single-location business — an information limit rather than a budget one. Past ten, new rows are almost always synonyms, and synonyms are correlated observations that inflate confidence without adding evidence.

One last thing before you prune, because it is the mechanism by which sets flatter their owners: **portfolio numbers are a function of the sample.** The Rankings page shows a **Local visibility** card — *In top 3*, *In top 10*, *Avg position*, *Not ranked*. (The overview carries a card of the same name showing your latest grid scan; this is the portfolio one.) Remove four branded rows you sit at `#1` for and every figure gets worse with nothing having changed on Google. Add four synonyms of a term you win and they all improve. This is why branded terms accumulate: they are the cheapest way to make a report look like progress.

*Avg position* is computed only over rows where you were found, so a keyword dropping out of the top twenty *leaves* the average — a business can lose its hardest keyword and watch its average improve. Read the *Not ranked* count in the same glance, always.

## Cadence is a statistical decision

"How often should I check rankings?" is usually answered with a habit — weekly, because reports are weekly. It has an actual answer, from two properties of what you are measuring.

**How fast does the signal move?** Local positions drift over weeks, and the levers behind them are slower still: a profile edit publishes quickly but its effect on placement is not observable the same afternoon, reviews accumulate over months, and citation corrections propagate at the pace of whoever maintains the directory *(inference — observed lag, not anything Google documents)*. Owner search-term data is monthly by construction and planner volume is a monthly average, so re-reading either more often cannot change the number.

**How big is the noise?** Two identical checks a day apart do not always agree; results are personalised, geographically sensitive and re-ranked continuously. You can measure your own noise floor rather than guess at it — [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid.md) runs that experiment, and it is worth doing once, early, on your own market.

Together they give the rule: **sample faster than the thing changes, slower than the noise.** A daily series on a signal that moves monthly is a chart of jitter with a monthly trend hidden inside, at fourteen times the price — cost scales linearly with observations and information does not.

A defensible starting cadence for one business:

| What | Interval | Why |
| --- | --- | --- |
| Rank check across the set | Fortnightly, or monthly | Positions drift over weeks; faster reads as noise |
| Geo-grid on one or two money keywords | Monthly, identical parameters | The comparison is the point, and parameter changes kill it |
| Owner search terms | Monthly | Google's data is monthly; asking more often returns the same window |
| Search volume | Monthly at most | It is a monthly average |
| After a change | Timed to the lever, not the calendar | See [did it work?](./did-it-work.md) |

Two disciplines make a cadence worth having.

**Refresh the whole set at once.** Rows sharing a timestamp are comparable. A set checked ad hoc — this one Tuesday, that one a fortnight later — cannot be read across, because a difference between two rows might be ranking or might be date.

**Identical parameters or no comparison.** Changing the origin, radius, language or grid size destroys comparability silently. The numbers still line up in a table, which is the problem, and it is the most common way a monthly report lies without anybody lying.

The exception to a fixed interval is not a faster clock but an event: you changed something, a competitor changed something, or a symptom suggests the listing's state has changed. Between events, read stored data freely — most questions a beginner tries to answer with a fresh scan are answerable from last month's.

## Labs

### Lab 8.1 — Load the terms Google says people actually used

> **Lab** · Where: **Overview** (`/b/{businessId}/overview`) · Cost: **paid** · Time: ~10 min
>
> You need: Lab 0.3 (a practice business) and Lab 0.4 (a connected Google Business Profile). This lab needs **owner access** — the search-terms card only exists for a profile you control.

1. Open **Overview** and scroll to the **Performance** panel.
2. Press **Load performance data**. One paid click buys the full daily history; switching periods afterwards is free, since it slices data you own. That single load also covers the outcome tiles above the chart — views, calls, direction requests — which are read properly in [Did it work?](./did-it-work.md). Ignore them for now.
3. Below the chart, find **What people searched to find you**. Its subtitle reads *trailing 12 months* — one number per term for the whole year, which is what Google returns.
4. Copy the top ten terms into a table and mark which were on the set you built in Lab 6.2.
5. Mark every value displayed as `<` a number. Those are the terms Google withheld; the true count is below what is shown.
6. Press **Load trend** to buy the month-by-month construction. The subtitle changes to *month by month, last 12 months* and the card grows **Trend** and **Last month** columns.

**What good looks like.** Several of the top ten are terms you would never have written, longer and more specific than your own phrasing. Your business name sits near the top — for most established businesses it is the largest single term, and it is not a discovery win.

**If it went wrong.** No card means no live Google connection, or one not yet linked to a location (the panel shows a link-location card instead). *"No keyword data yet — Google reports monthly"* means a new or low-traffic profile, not a failure.

**Observe-only readers.** Without owner access this report does not exist for you, in any tool. The substitute is the paid suggestion list on **Rankings** plus autocomplete typed by hand — but be clear about the loss: suggestions tell you what people search in your category, never what they searched to find *this business*. The same terms sit in the Business Profile dashboard's performance section; see [doing it without SEOG](../99-appendix/doing-it-without-seog.md).

**What you just learned.** There is a source that is not a guess, and it is a survivor's list: it corrects your vocabulary and cannot show your gaps. And a "monthly" report is not automatically a monthly series — where no month is attached to a number, a trend line is either constructed deliberately or invented accidentally.

### Lab 8.2 — Prune and span

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **free** to remove, **paid** to add · Time: ~20 min
>
> You need: Lab 6.2 (a first tracked set). Lab 8.1 improves it, but is not required.

1. On paper, list every row you track, with its position and its intent tag from chapter 6.
2. Put each through the three questions above.
3. Remove what fails. Select the keyword, use the delete control on its detail panel, confirm **Stop tracking**. Read the dialog first: removing a keyword deletes its rank history, and that cannot be undone. Screenshot the position chart of anything you may want later.
4. Add the terms worth tracking from Lab 8.1 with **Track**. Each add runs a first live check, so this part is paid.
5. Before and after, write down the four figures on the **Local visibility** card.

![A tracked keyword's detail panel: position #1 marked "First check", a search-volume row carrying a Test data badge, an example geo-grid over Helsinki, and a "Who ranks above you" list](../../static/img/screens/keyword-detail.png)

*The detail panel from step 3 — the delete control is the small bin beside **Check now**, and **Who ranks above you** answers the third pruning question for you. Read the rest sceptically: the position and its "Checked 2h ago" stamp came from a live check, but the search-volume row carries a **Test data** badge (no volume provider was configured on this instance) and the map is the card's labelled example scan, shown until you run a real one.*

**What good looks like.** Fewer rows than you started with, every survivor naming a distinct question or place — and your headline numbers *worse* while the set got more honest. That contrast is the lesson.

**If it went wrong.** If the tracker refuses a new keyword you are at your plan's allowance; the counter under the input shows the slots used. Remove a near-duplicate rather than upgrading — that is the exercise. Re-adding a row you removed starts a fresh history from today.

**What you just learned.** Portfolio metrics are properties of the sample, not the business. Anyone can improve them without touching Google, which is why a report should state what is in the set and what changed since last month.

### Lab 8.3 — Set the cadence and justify it in writing

> **Lab** · Where: **Overview** (`/b/{businessId}/overview`) · Cost: **paid** · Time: ~10 min
>
> You need: Lab 8.2.

1. On **Overview**, find **Rankings at a glance** and press **Refresh rankings**. This rank-checks every tracked keyword in one action, so the whole set carries one timestamp.
2. Write today's date at the top of a note, and the next scan date under it.
3. Under that, write one sentence per lever you are waiting on: what you changed, what you expect it to move, and when it could plausibly show. If you cannot name what you are waiting for, you have picked a habit rather than an interval.
4. Put the next date in a calendar. Between now and then, read your stored data freely — it costs nothing.
5. Return to **Rankings** more than a week after the last check and the page shows an ageing banner with the data's age in days. That is information, not an instruction.

**What good looks like.** One dated, uniform refresh across the set, plus a written interval with a reason. "Monthly, because the only lever in flight is review acquisition and that takes months" is a good one.

**If it went wrong.** If your justification turned out to be "weekly, because the client report is weekly", you have found a real conflict rather than made a mistake. Report weekly if you must; measure on the cadence the signal deserves, and never present a week's wobble as a result.

**What you just learned.** Cadence comes from how fast the signal moves and how noisy the instrument is, not from the invoicing calendar — and a uniform timestamp is what makes rows comparable at all.

## Common mistakes

**Tracking the terms you wish you ranked for.** Tempting, because the head term feels like the prize. It costs you the month: aspirational head terms return *Not ranked* on every row for a long time, and a flat line cannot distinguish progress from nothing. The mirror image is a page of branded `#1`s — impossible to argue with, which is what makes it worthless.

**Reading a thresholded value as a count.** `<40` is not 40. It is "somewhere under 40", and it is the shape of most of your long tail. Sum a column of them and you have an upper bound that everyone will read as a total.

**Charting a month-over-month keyword trend from a single pull.** The data has no month attached. If nobody made a request per month, the months on that chart were assigned by the tool rather than by Google — and you will be asked to defend them eventually.

## Check yourself

**1. Your top-ten search-terms report is dominated by terms containing your business name. What does that tell you?**
That unbranded discovery is thin. Branded impressions are people who already know you looking you up — a finding you would have missed entirely by tracking only the terms you chose yourself.

**2. You remove three duplicate rows and your *In top 3* figure falls from 6/10 to 3/7. Did your visibility fall?**
No. Nothing changed on Google; you changed the denominator and the composition of the sample. Portfolio metrics describe a set, not a business — which is why a report should disclose changes to the tracked set.

**3. A keyword shows *Not ranked* three checks in a row. What number goes on the report?**
None. Write "not found in the top twenty", with the depth stated. Writing 21, or 25, or 100 imputes a value you did not measure, and every average built on it inherits the invention.

**4. Your client asks for daily rank tracking. What do you say?**
That you will report as often as they like, but measure on an interval matched to how fast positions move, because a daily series on a weekly-moving signal mostly measures the instrument. Then offer the alternative: the same spend spread across more places and more intents instead of more days.

---

Your set now describes the market rather than your hopes about it, with a defensible interval attached. The next chapters change things — profile fields, photos, reviews — each measured against the baseline you froze last chapter, using the set you just built.

---

**Next:** [The profile is the product →](./the-profile-is-the-product.md)
