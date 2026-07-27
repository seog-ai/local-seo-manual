---
title: Writing a report a client can check
sidebar_position: 1
description: What an honest local-SEO report contains, the padding used to make one look busy, and the six-point rubric that tells the two apart.
---

# Writing a report a client can check

The client never watches you work. They read a document, once a month, and decide from it whether to keep paying. That makes the report the product in the only sense that matters commercially — and it is the most consistently dishonest artefact in this industry, because every incentive points one way and almost nobody checks.

This chapter is the document: what it must contain, what gets put in instead, and a rubric for telling those apart — as useful for grading the report you *inherit* as the one you write.

## The report is a liability document

If you are coming to this from engineering and thinking about selling it, notice what recurs. Fixes are one-off. The report is what you ship every period, forever, and what renewal is decided on. It is also what you may have to defend — to a successor consultant hired to review you, or to the client in a year with four reports side by side. Write every sentence as though the next reader is paid to find the flaw in it. That one constraint removes most of what is wrong with local SEO reporting and costs nothing to adopt.

A second consequence people miss: **what you report is what you have agreed to be judged on.** Lead with map-pack coverage and you have signed up to move map-pack coverage; lead with calls and you have signed up for an outcome you only partly control. Pick it on purpose, in month zero — [The ninety-day plan](./the-ninety-day-plan.md) is where that becomes a schedule.

## The four questions

An honest report answers four questions, in this order. Everything else is decoration.

**1. What did you do?** Dated, specific, verifiable by someone who is not you. *"Rewrote the business description on 4 March; confirmed live on Google the same day by re-reading the published field"* is a row. *"Profile optimisation"* is a category label pretending to be a row.

**2. What happened?** Numbers measured the same way as last time, each carrying its conditions: a rank reading carries surface, query, coordinate and date; a grid reading carries centre, preset and keyword row; an owner metric carries its window. A number without its conditions is not a measurement, it is a rumour with a decimal point.

**3. What of that is attributable to the work?** Sorted into verified, plausible and unattributable — the three buckets from [Did it work?](../02-core-practice/did-it-work.md). This classification *is* the judgement the client is buying, and it is the only section that costs you something to write honestly. Which is why it gets skipped.

**4. What next, and why that?** Next period's work, with the reason it is next rather than one of the other twenty things that are also wrong. A fifth is optional and underrated: **what you deliberately did not do**. It turns a to-do list into a plan.

Two pages answering those four beats forty pages of charts. A report that cannot be reduced to them is not a short report — it is an incomplete one in a large coat.

## The padding taxonomy

Here is what goes in instead, and why each is tempting.

**The metric dump.** Every number the tool can export, no interpretation. Tempting because exporting is free and interpreting is not, and because volume reads as effort. It costs the client the two numbers that mattered — now on page 19 — and trains them to skim, so when a real finding arrives nobody reads it.

**Input counts presented as outcomes.** *"12 posts published, 40 citations submitted, 8 keywords optimised."* The tell: not one of those numbers describes anything a customer could experience. Be fair about it — input counts are the correct answer to question 1. The dishonesty is filing them under question 2.

**The unsegmented rank.** *"Average position 4.2."* No surface, no coordinate, no date, no found rate beside it — and average rank counts only the points where you appear, so disappearing from your worst locations *improves* it ([Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number.md)). A rising average with a falling found rate is a decline in a good mood.

**The tracked set that quietly changed.** Easy keywords added, hard ones dropped, the aggregate reported as movement. The most effective way to show improvement while producing none, it needs no skill, and it is invisible unless the set is written where the client can compare. It works on any axis — a new grid preset, a longer window, a different denominator — so freeze all of them and make every change a dated line.

**The headline chosen afterwards.** Six outcome metrics move every month and one moved a lot. Choosing which to lead with *after* seeing them is how a report becomes a horoscope. Decide the headline metric in month zero.

**The screenshot.** One AI answer naming the client; one map-pack screenshot showing position 1. Samples of one, taken signed-in, on office Wi-Fi, at the coordinate where the business looks best. Assistant answers vary run to run for the same prompt — only a rate over a window of runs compares to an earlier rate ([Does the AI recommend this business?](../03-advanced/ai-visibility.md)).

**The recycled action plan.** Identical to last month's — not always deception, so be precise: a generated plan is computed from *current state*, so if the state did not change, the plan cannot. Shipping it as "this month's recommendations" is padding. Shipping it as an appendix labelled *current state*, with the real plan above it, is fine.

**Ranking for the business name.** *"#1 for `<business name>`."* A knowledge panel, not a competitive result. It reports that Google can read.

## How a client can tell

Six checks, no partial credit, about fifteen minutes and no tooling.

| Check | Passes when | Fails when |
| --- | --- | --- |
| **Conditions** | Every number carries surface/query/coordinate/date, or its window, or its preset | Bare numbers, or one "as of" date for the whole document |
| **Frozen set** | The tracked keywords and locations are listed, and any change to them is a dated line | The set is not stated anywhere, or differs from last month with no note |
| **Falsifiability** | Movements are split into verified, plausible and unattributable | Everything appears under achievements |
| **Spot-check** | You can pick one work item and verify it yourself in five minutes | Work is described only as categories: "optimisation", "authority building" |
| **Cost of admission** | Something in it was expensive to admit — a failed test, a claim declined | Uniformly positive, every month |
| **Movement in the plan** | Next steps reference last period's result and have changed | Next steps are last month's list |

The cheapest is the last: put two consecutive months side by side and diff the "next steps" section. One minute, and it tells you whether anyone was thinking.

Now the uncomfortable recommendation. **Give this rubric to your own clients.** Handing someone the instrument for grading you is a costly signal, and costly signals are the only credible kind in a market where every supplier's website says the same things.

## What the generated PDF is, and what it is not

The app generates a report as a PDF. Knowing what is in it — and what is not — stops you mistaking it for the deliverable. As generated on 2026-07-27, in order:

- A header: business name, address and category, the **generation date**, and the date the data was **last synced** (the second appears only once the business has been refreshed at least once). Two dates, deliberately, because they answer different questions.
- **Key metrics**: profile score, rating with its review count, photo count.
- **Google performance** for a fixed recent window, owner-only. If the profile is not connected it says so in words rather than leaving a suggestive blank.
- The **business profile** as stored: status, phone, website, price, hours, description, attribute groups.
- The **profile audit**: every check, grouped into the five categories with a per-category percentage, failures first, each with its remedy.
- **AI visibility readiness**: score out of 100, tier, and the nine factors with weights and actions.
- The **implementation plan**: the merged, prioritised list, each item tagged with impact and points.

Now the part that matters. **It is a state document, not a period document.** No keyword positions, no geo-grid, no competitor set, no review texts, no change log, no before-and-after of any kind. It renders the business as it stands today, so it cannot, by construction, answer question 2 or question 3.

The PDF is therefore your **evidence annexe**, not your report. The narrative is yours to write, and it is the part worth money. If a supplier's monthly deliverable is a generated PDF with a covering email, the client is paying a retainer for a button.

![The Reports panel open on a business overview, showing a PDF reports header with a Generate action and the message "No reports yet. Generate your first one."](../../static/img/screens/reports.png)

*The button in question. It is one click and it produces a competent artefact — which is exactly why it is dangerous to hand over unaccompanied. Everything the client actually asked ("did it work, what did you do, what next") lives in the narrative you write around this, not inside it.*

Two details that bite later. The performance section covers a fixed recent window of the report's own choosing, **not** the period you had selected on screen — the section heading names the window it used (28 days as generated on 2026-07-27), so quote it from there rather than from the Performance panel's selector. And the app keeps the ten most recent reports per business, so an eleventh prunes the oldest: on a monthly cadence your engagement baseline goes first. Copy each dated PDF into your own archive on generation day.

## The three-layer package

**Layer 1 — the page.** The four questions, in plain language, no tool vocabulary, one page. The client must be able to act on this alone, having opened nothing else.

**Layer 2 — the annexe.** The dated PDF, grid exports labelled with keyword, preset and date, read-back evidence for anything published to Google, and the change log.

**Layer 3 — the raw data.** On request. Never in the deliverable.

One rule welds them: **nothing in layer 1 may lack support in layer 2.** Which is why you write layer 1 first and check it afterwards — a claim whose support you cannot find gets deleted, not softened. Softening is how "we cannot attribute this" becomes "we're seeing encouraging signals".

> **Without SEOG** · Layer 2 by hand is the Google Business Profile dashboard's own exports, screenshots of each published change, and a spreadsheet with one row per coordinate and one column per date. Layer 1 was always a text file. Identical discipline, identical failure mode: nobody hand-records conditions consistently for six months. See [Doing all of this without SEOG](../99-appendix/doing-it-without-seog.md).

## Cadence, and the trap of monthly

Clients pay monthly. Local visibility moves over quarters. Reporting *outcomes* monthly on a quarterly signal manufactures noise — and manufacturing noise is how you end up under pressure to manufacture wins. Split the cadence instead, and agree it before anyone has an incentive to prefer otherwise:

| Every month | Every quarter |
| --- | --- |
| What was done, dated, with evidence it landed | The measurement: same keywords, same presets, same centres |
| What is next, and why | Attribution, in the three buckets |
| Anything that failed | A revised plan for the next quarter |

Two rules make it hold. **Re-measure on a pre-committed date, not a convenient one** — measuring when the numbers look good builds a machine that only prints good news. And **three readings before you call a trend**; a line fits any two points.

## Automating the package without automating the lie

For a technical reader most of this is a solved problem, and it is worth being precise about which part.

Reading stored data is free; fetching new data from Google costs. A reporting pipeline should therefore be almost entirely reads — stored keyword history, stored grid scans, the profile-score series, stored review data — with the paid fetches on your pre-committed measurement date and nowhere else. If assembling the report costs about what measuring costs, you built it wrong ([How the labs work](../00-start-here/how-the-labs-work.md); the client-facing version is [What the work costs](./what-the-work-costs.md)). An agent connected to the app can queue the PDF, poll until it is ready, pull the period's stored history and lay out layers 1 and 2 — see [Running local SEO with an AI agent](./running-local-seo-with-an-ai-agent.md).

What is not automatable is question 3. Ask a language model why a number moved and it will produce a fluent cause, because producing fluent causes is what it does. It has no access to the change log in your head, the competitor suspended in week two, or the fact that this trade is dead in August. So it will attribute. The sentence that *declines* to attribute is the one you are paid for, and a person whose name is on the document has to write it.

Hence the last rule: **automated assembly, signed judgement.** A report with no named author is a report nobody has to defend.

## Labs

### Lab 26.1 — Write the page before you generate the evidence

> **Lab** · Where: **Overview → Reports** (`/b/{businessId}/overview`) · Cost: **paid** · Time: ~30 min
>
> You need: your frozen baseline (Lab 7.3), a re-measurement (Lab 17.1 or 17.2), and the change log from Lab 17.4.

1. Open a blank file. From your change log and your memory, write the four answers in plain language, one page maximum. **Write no numbers yet** — put `[?]` where a number belongs.
2. Fill each `[?]` from **stored** data only: the keyword position chart, the grid trend line, **Profile score over time**, **Review momentum**. Write each number's conditions beside it. Any `[?]` you cannot fill this way is a claim you cannot currently support — leave it marked.
3. Open **Reports** in the overview page header and press **Generate**. The price is on the button. The row moves through **Queued** and **Generating**; download it when it reads **Ready**.
4. For every claim on your page, find its support in the annexe or a stored screen you can screenshot. **Anything unsupported gets deleted, not softened.**
5. Mark every surviving movement V, P or U, writing each P's caveat in the words you would say out loud. Save the page and the dated PDF into one dated folder.

**What good looks like.** A page a non-specialist could act on alone, and an annexe where any claim on it is locatable in under a minute. Deleting at least one claim at step 4 is the normal outcome and the point of the exercise.

**If it went wrong.**
- *The row reads **Failed**.* Generation is deterministic and is not retried, because a retry would fail identically. The badge is all the menu shows — the reason is recorded against the report rather than rendered beside it — and a failed run is refunded automatically.
- *A row is tagged **Free analysis**.* A report generated for this place before the account existed. A valid dated artefact, but not one you produced this period.
- *You have no verified items.* You measured a period you did not work in. Say exactly that; "no changes shipped this period, here is why" is survivable, invented activity is not.
- *The performance figures do not match your reporting period.* They will not — that section uses a fixed window of its own. Quote it with the window named, or use the Performance panel instead.

**What you just learned.** Writing the narrative before looking at the numbers inverts the usual order, and that is why it works: you cannot cherry-pick a headline metric if you wrote the headline before you saw the metrics.

### Lab 26.2 — Grade a report against the rubric

> **Lab** · Where: your own files (no SEOG) · Cost: **free** · Time: ~20 min
>
> You need: a local SEO report **you did not write** — one a prospect shows you, a published sample, or your Lab 26.1 page graded by somebody else.

1. Score the six rubric checks, pass or fail, no partial credit.
2. Go number by number and mark whether each states its conditions. Write the ratio down.
3. Find the tracked keyword set. If it is not stated anywhere, that is a fail on check 2 whatever the set contains.
4. If you have two consecutive periods, diff the "next steps" sections.
5. Write the single question you would ask its author that they would least like to answer.

**What good looks like.** A score out of six and one sharp question. Note that a low score is not proof of bad work. It is proof the work is unverifiable, which from the client's chair is the same thing until the day it isn't.

**If it went wrong.** *It is entirely screenshots.* Grade it anyway; "unverifiable" is a grade, and it is the grade. *You wrote it yourself and scored six.* You are not the right grader — hand it to someone with no stake in it.

**What you just learned.** The rubric is cheap to apply and expensive to pass. That asymmetry is what makes handing it to your own clients worth doing.

### Lab 26.3 — Fix the cadence before you have a reason not to

> **Lab** · Where: your notes, plus free screens in the app · Cost: **free** · Time: ~15 min
>
> You need: Lab 26.1.

1. Write two recurring dates: the monthly work-report date and the quarterly (or fortnightly) measurement date. Put them in a calendar now, while nothing is at stake.
2. Freeze the tracked set: every keyword row with its text, language chip, location chip, and the grid preset you will always use for it. It is an appendix in every report; changes to it are dated lines.
3. Write, in advance, the sentence you will send when a measurement lands badly. One sentence. This is the whole lab.
4. Set the archive rule: ten reports are kept per business and an eleventh prunes the oldest, so copy each PDF into your own storage on generation day — starting with the baseline, the first one you lose.
5. Write the standing caveat that appears in every report: what you do **not** measure, and why.

**What good looks like.** Dates in a calendar, a written frozen set, an archive rule, and a bad-news sentence drafted before there is any bad news.

**What you just learned.** Every failure mode in this chapter is a decision made under pressure on reporting day. Making those decisions in advance, in writing, when nothing rides on them, is the whole defence.

## Common mistakes

**Generating the report first and writing the story around it.** The order determines the story, and reversing it is free.

**Leading with the profile score.** It is a diagnostic input, and a completeness audit that cannot see distance ([Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility.md)). Put it on the front page and the client starts optimising it — ticking low-weight attribute boxes — and you taught them to.

**Reporting inputs under the outcomes heading.** Rarely a lie in intent. Always a lie in effect, because the reader takes a heading at its word.

**Smoothing a bad month.** A client who later discovers it does not lose confidence in that month. They lose it in every month, including the true ones — and they are right to.

**Shipping an unsigned report.** Automated assembly is fine. Automated judgement with nobody's name on it is not a report, it is a printout.

## Check yourself

1. **Pick any number in your most recent report and state its conditions.** Surface, query, coordinate, date — or window, or preset. If you cannot, either the conditions go in or the number comes out.
2. **Your tracked set changed this period. Where does the client learn that, in whose words?** If the answer is "they would have to compare two PDFs", it is not disclosed.
3. **A client asks what they got for this month's fee, and every movement is P or U.** What do you send? (Question 1 in full, question 4 with reasons, the honest sentence about the rest.)
4. **You inherit last quarter's report from a previous supplier. Which two rubric checks do you run first, and why those?** ([What you inherit with a client](./what-you-inherit-with-a-client.md) covers the rest of the handover.)
5. **Which claims in your last report would survive a successor paid to find the flaw?** If the answer is "all of them", you have not tried it.

---

**Next:** [The ninety-day plan →](./the-ninety-day-plan.md)
