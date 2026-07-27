---
title: Auditing a market, from signal to filed report
sidebar_position: 2
description: Four labs that audit the set you are measured in, turn one suspect listing into a dated case, recompute your targets without the fakes, and log a single report.
---

# Auditing a market, from signal to filed report

The five tests, the three verdicts and the two reporting paths are on the previous page. What follows works them through a market you actually manage, one sitting at a time.

## Labs

### Lab 23.1 — Audit the competitive set you are already measured in

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **free** · Time: ~20 min
>
> You need: a tracked keyword with a stored rank check ([choosing what to track](../../02-core-practice/choosing-what-to-track/index.md)).

1. Open **Rankings** and select a keyword to open its detail. Nothing here fetches anything; every number was recorded when the check ran. Note that date — a competitive set is as stale as the scan behind it.
2. Find **Who ranks above you** — one row per rival with position, name, rating and review count. **Read the positions, not the heading.** What is stored is the top three results with your own listing removed, so if you rank #2 the row shown at #3 is *below* you. Exactly the kind of label that quietly becomes a false claim in a client deck.
3. Read **Rivals beating you in search**, under **Local visibility** at the top of the page: which names appear across how many of your tracked keywords. A name in most of them is the one to audit first.
4. Apply the name test to every name: the exact string, in quotation marks, in a web search. Mark each *plausible*, *stuffed* or *unknown*.
5. Write the count: of the listings recorded above you on your main keyword, how many survive?

![Keyword detail page: the business at #1, with two rivals listed at positions 2 and 3 under a heading reading Who ranks above you](../../../static/img/screens/keyword-detail.png)

*Step 2, in one screen. This business ranks **#1** for the keyword, and the card headed "Who ranks above you" still lists two names — because what is stored is the top three with your own listing removed. Read the positions, not the heading, before either name goes in a client deck. (Two panels on this screen are illustrative, and the app says so: the grid is labelled "Example scan", and the search-volume figure carries a "Test data" badge. Neither is a measurement.)*

**What good looks like.** A verdict beside each name and a count at the bottom. In most markets the honest answer is "all of them — they are simply better", worth writing down because it closes the question.

**If it went wrong.** No **Who ranks above you** card means that keyword has no stored check yet. A rival you know exists is missing: only the top few results are recorded per check, so absence is not evidence.

**What you just learned.** Every rank check quietly records your competitive set — and you should read what an instrument stores, not what its heading says it stores.

### Lab 23.2 — Take one listing from signal to case

> **Lab** · Where: your browser and a phone (no SEOG) · Cost: **free** · Time: ~30 min
>
> You need: one candidate — the highest-scoring listing from the spam check in Lab 16.3, or the most stuffed name from Lab 23.1.

1. Open the listing in Google Maps. Copy its public Maps URL — the identifier every report asks for — and screenshot the profile with today's date visible.
2. Work the five tests from the table above in order, stopping early only if one of them clears the listing. Screenshot Street View; count the other names at the address; make the phone call yourself.
3. Write each result as one dated line. "Called 2026-07-27 14:10, answered *service department*, would not name the company or give an address" is evidence. "Phone seems dodgy" is not.
4. Write the dossier on one page: the claim, the clause it breaks, three dated observations, the Maps URL.

**What good looks like.** A page on which every line is a dated observation rather than an adjective. If the strongest line is "the name looks spammy", you have a signal and no case.

**If it went wrong.** A person answered, named the business and gave a visitable address — a pass, and worth saying out loud, because a detection habit that never clears anyone is not detection. Street View imagery years out of date is weak evidence; note its capture date.

**What you just learned.** The distance between a heuristic flag and a defensible accusation is thirty minutes of dated observation. That is why the complaint form asks for evidence and not scores.

### Lab 23.3 — Recompute your market with the fakes taken out

> **Lab** · Where: **Competitors** (`/b/{businessId}/competitors`) · Cost: **free** · Time: ~10 min
>
> You need: Lab 16.1 (rivals tracked) and at least one verdict from Lab 23.2.

1. Read **You vs. competitors (N)** in the right column — Rating, Reviews and Photos, each with your value, the set average and the best rival's. Copy **To beat them** word for word into a note.
2. On paper, not in the app, recompute the three averages with every listing you verified as ineligible removed. Recompute the best-rival column too — often the distorted one, since the inflated listing tends to be the leader.
3. Put the two versions of **To beat them** side by side. The difference is the distortion you would otherwise have reported as a target.
4. Decide, with the reason written down: keep the listing tracked because it competes today, or press **Remove** on its card because targets should be set by businesses that will still exist next quarter. Both are defensible; the unexamined default is not. If you remove it, copy its stored numbers out first.
5. Add one sentence to your reporting notes naming which set your numbers come from.

**What good looks like.** Two versions of the same target, and a written reason for the one you will report.

**If it went wrong.** No comparison card means nothing is tracked yet. Two identical versions mean your set is clean — record that, because "we checked, and the market is real" is a finding a client should hear once.

**What you just learned.** An average is only as honest as its membership list, and membership is your judgement rather than a fact the tool hands you — the most common way a correct calculation produces a wrong instruction.

### Lab 23.4 — File one report, then log it

> **Lab** · Where: Google Maps and Google's complaint form (no SEOG) · Cost: **free** · Time: ~15 min, plus two diary entries
>
> You need: the dossier from Lab 23.2. Do not attempt this lab without one.

1. Choose the path. A wrong name or a place that does not exist: *Suggest an edit* in Maps, including its removal option. A documented, repeated or networked case, or one already edited back: the Business Redressal Complaint Form. Fake reviews: flag the review.
2. Re-read the form's statement quoted above and decide whether this case is worth your time under that constraint. Deciding *no* is a legitimate outcome of this lab.
3. File exactly one, using the dossier verbatim.
4. Log it in your own tracker, not your memory: date filed, listing name, Maps URL, path used, the claim, and the listing's name and address **as they stood at filing**.
5. Diarise checks at two weeks and at six. At each, record the outcome — unchanged, edited, removed, or removed-then-reinstated — and when the change first showed.

**What good looks like.** A log entry and two diary dates. The log is the deliverable: one report is an anecdote, twelve with outcomes is a picture of your market.

**If it went wrong.** Nothing happens and nobody tells you why — the documented behaviour of the form, not a failure of your submission. The name reverts within days: that is the pattern the heavy path exists to document, so file again *with the reversion in evidence*.

**What you just learned.** The report is not the deliverable; the log is. The removal date is what lets you tell a campaign result from a competitor disappearing.

> **Without SEOG.** Labs 23.2 and 23.4 already run in a browser. By hand, 23.1 is a search from a fixed location with the pack written down — names, positions, date; 23.3 is a spreadsheet with one row per rival and a filter column. What you lose is the recording, which is the part that fails. [Doing it without SEOG](../../99-appendix/doing-it-without-seog.md) is the long form.

## Common mistakes

**Reporting the rival who beats you fairly.** "This listing is spam" resolves, under the five tests, to "this business has more reviews than us" more often than anyone admits.

**Sending a heuristic score to a client.** "Our system flagged three competitors as likely spam" reads as a finding and is a triage output. When the client's cousin turns out to own one, you will not enjoy the follow-up. Send verdicts with evidence, or send nothing.

**Letting fraud set your targets.** The most expensive one, because it is invisible: a quarter spent chasing a review count that was bought.

**Claiming credit for a removal.** Your rank improved the week a fake vanished. Without the removal date in your change log you cannot separate the two, and the version of you writing the report has every incentive not to notice.

**Copying the tactic because it is working.** The tempting moment arrives ten minutes after the audit, and the trade is asymmetric: a spam operator rebuilds a disposable listing in a week, while you lose the profile your business runs on and enter an appeals process slower than the reporting one ([suspensions and reinstatement](../suspensions-and-reinstatement/index.md)).

Apply to yourself the test you applied to them — **is this the name on the storefront, the invoices and the website?**

## Check yourself

Answer against your own practice business, with your Lab 23.1 notes open.

1. **Of the listings recorded above you on your main keyword, how many survive the name test — and what would move each remaining one from signal to case?** If you cannot name the missing observation, the audit is not finished.
2. **Your tracked set includes one rival you believe is inflating its reviews. State your "get N more reviews" target both ways, and say which one goes in the client report and why.**
3. **A competitor listing disappeared last month and your average position improved by 1.4. What single recorded fact would let you attribute that correctly, and do you have it?**
4. **Thirty minutes, two candidates: one ranking above you for your best keyword, one three miles away in a category you barely touch. Which do you work, and why?**
5. **A client asks you to report four competitors who "are obviously fake". What do you say, and what do you ask for before filing anything?**

---

**Next:** [Suspensions and getting reinstated →](../suspensions-and-reinstatement/index.md)
