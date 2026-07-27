---
title: Spam, fake listings, and the market you are measured against
sidebar_position: 6
description: Local spam is a measurement problem before it is a fairness problem — how to detect it to an evidence standard, report it, and stop it distorting your numbers.
---

# Spam, fake listings, and the market you are measured against

The listing above you may be a mailbox with a keyword-stuffed name and forty reviews that arrived in one week. Everyone treats that as a fairness problem, and it is one. It is also a measurement problem, and almost nobody treats it as that: your position, the local average, the target you set for a client — every one of those is computed against a market that includes businesses which do not exist.

This chapter is about detecting that to a standard you could defend, reporting it without losing a week, and knowing what it does to your numbers.

## What is actually out there

Google publishes removal figures annually. From its 2025 Trust and Safety summary, [published 16 April 2026](https://blog.google/products-and-platforms/products/maps/new-ways-were-protecting-businesses-on-maps/): "over 13 million fake Business Profiles" removed during 2025, "over 292 million policy-violating reviews" blocked or removed, restrictions on "more than 782,000 policy-violating accounts", and "79 million inaccurate or unverified edits" blocked.

Read what those numbers are before quoting them. They are **removals, not prevalence**. Thirteen million removed says nothing about how many remain, and a rising count is equally consistent with more spam and with better enforcement. Anyone selling you a "% of listings are fake" figure has estimated it.

The nearest thing to a prevalence measurement is old and narrow. Sterling Sky's [Google Maps spam study](https://www.sterlingsky.ca/google-maps-spam-study/) (published 11 April 2022) worked through 5,306 listings across 16 industries over a four-year period, measuring for each trade the share of listings Google removed after they were reported. It found wildly different rates by trade — garage-door repair worst at 87.6%, then junk cars and personal-injury law; funeral services, realtors and dentists at the bottom, all under 13%. How listings were selected is not fully published, so treat **the ordering as the finding and the percentages as indicative**. Spam concentrates in high-ticket, urgent, one-off services where the customer never returns and cannot tell providers apart. Assume contamination in every set you measure there.

The same announcement added something owners should watch their inbox for: Google said it would begin emailing verified, active owners about significant profile edits **before those edits publish**, so a suggested change can be reviewed rather than discovered.

## Five families, and the clause each one breaks

Quotations are from Google's *Guidelines for representing your business on Google* (support.google.com/business/answer/3038177, read 2026-07-27). This is our reading of published policy, not legal advice.

**1. Keyword-stuffed names.** `Best 24/7 Emergency Plumber Leeds | Boiler Repair` is not a business name. It is a query with a company attached.

> "Including unnecessary information in your business name isn't permitted, and could result in the suspension of your Business Profile."

**2. Ineligible addresses.** Virtual offices, mail centres, unstaffed co-working desks, pins dropped in a field to catch a suburb.

> "P.O. boxes or mailboxes located at remote locations aren't acceptable."

> "If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile."

> "Businesses can't list an office at a co-working space unless that office maintains clear signage, receives customers at the location during business hours, and is staffed during business hours by your business staff."

Note the precision of the last clause: signage **and** customers received **and** your own staff present. Written that way because "we have a desk there" was the standard defence.

**3. Duplicates.** One real business, several pins, each catching a different neighbourhood.

> "Do not create more than one page for each location of your business, either in a single account or multiple accounts."

**4. Lead-generation networks.** The hardest family and the most damaging. The listing looks ordinary; the phone routes to a call broker who sells your emergency to whichever contractor bids. There may be no company behind the name — only a number and a domain. Google's complaint form treats this as first-class, offering **Phone number** and **Website** alongside title and address, because the fraud is in the routing rather than the façade.

**5. Review manipulation.** Gating, incentives, staff quotas, outright purchase — the verbatim policy text is in [Reviews](../02-core-practice/reviews.md). This is the family you are **least** able to detect on somebody else.

## Why this is a measurement problem

**Rank is relative, so a contaminated pack contaminates your rank.** If two of the five listings above you are ineligible, "we are #6" and "we are #4 among businesses that meet Google's own criteria" are both true and answer different questions. Neither is dishonest. Reporting one without saying which you meant is.

**Spam sets the target you are chasing.** The competitor comparison averages rating, review count and photos across the rivals *you* chose to track, then turns the gaps into instructions — *get N more reviews to reach the average*. Track one listing with 400 purchased reviews and that instruction is set by fraud. The arithmetic is correct and the target is wrong. Membership of the set is your judgement, and the one most people never make consciously.

**Removals and reinstatements move your rank with no action from you.** The most common false positive in the discipline. You file a report in March, a listing vanishes in April, your position improves, and the April report says the campaign worked. It might have. You cannot tell unless the removal date sits in your change log — the discipline in [Did it work?](../02-core-practice/did-it-work.md).

**A geo-grid cannot be audited for this.** A grid scan stores a position per point and nothing else: no names, no ratings, no identities. It can show visibility collapsing on the north side of town and never tell you the cause was one mailbox. Names come only from per-keyword rank checks, so keep those running where contamination is plausible in your trade ([reading a geo-grid](./reading-a-geo-grid.md)).

**And competitor review fraud is mostly invisible to you.** Without owner access, public place data returns about five reviews per business, ordered by relevance rather than date. Exact count, exact average, a sample of five — enough to notice an implausible ratio, nowhere near enough to characterise a corpus. Anyone offering fake-review analysis of a competitor is extrapolating from five, or scraping, which Google's terms prohibit ([storing Google data legally](../05-reference/storing-google-data-legally.md)).

## Signal, case, verdict

Automated detection produces **signals**. The scoring behind the spam check — stuffed name, duplicate, implausible rating, thin profile, no website, needing two independent signals before anything escalates — is published in full in [Reading a competitor off their public data](../02-core-practice/competitors.md), so you can run it by hand in any market. It is a triage instrument: cheap, stored-data-only, blind to everything you have not tracked.

A **case** is something else: first-hand dated observation, about half an hour per listing.

| Test | What you do | What a failure looks like |
| --- | --- | --- |
| **Name** | The exact name in quotes in a web search; then the storefront photos | Appears on Google and nowhere else — no site, no invoices, no van, no door |
| **Address** | Street View the pin; then the address string in quotes | A mail centre, a residential door, a lock-up; or a suite shared by thirty company names |
| **Phone** | Call in stated hours as a customer, ask for the company by name and a visitable address; then the number in quotes | A generic greeting that cannot name the company; one number attached to eleven names across four towns |
| **Registry** | Company registry, plus the trade licence where the trade needs one | No entity, or an entity elsewhere under a different name |
| **Reviewer** | Open a few reviewer profiles | Accounts whose whole history is a handful of reviews in one week across the same few businesses |

The reviewer test is the one most likely to convince you of something false, because you are working from five reviews Google chose for relevance. Corroboration only.

A **verdict** is what you write after the case, and only three are worth having: *legitimate*, *sloppy but real*, or *ineligible, verified, here is why*. Only the third is reportable. "Looks spammy" is not a verdict; it is a feeling with a screenshot.

## Reporting, and what it is actually worth

There is no report button in SEOG, and there should not be — reporting happens in Google's own surfaces, tied to your own Google account, and both paths are free.

**Suggest an edit**, on the profile in Maps, is the light path: correct a stuffed name back to the real one, or use the removal option for a place that does not exist. It is also reversible in ten seconds — a verified owner changes the name straight back from their dashboard — so expect a loop rather than a fix.

**The Business Redressal Complaint Form** is the heavy path, for documented, repeated or networked cases. It asks who you are, the affected organisation, the type of malicious content — title, address, phone number, website, or *this business doesn't exist* — the public Maps URL, and a written explanation, with a spreadsheet upload for multiple listings. Before spending an evening on one, read the form's own sentence about what happens next (support.google.com/business/contact/business_redressal_form, read 2026-07-27):

> "We cannot guarantee that any action will be taken on your complaint after you complete and submit this form. After we receive your complaint, you will not be updated on its status."

That should set your time budget: you are filing evidence into a process with no receipt, no status and no appeal. Sterling Sky's [guide to fighting Maps spam](https://www.sterlingsky.ca/ultimate-guide-fighting-spam-google-maps/) (updated 29 August 2025), the most detailed public account, puts the Redressal Form's turnaround at "about two weeks", warns separately that a reported listing which was *verified* may simply be put back — "be prepared for someone at Google My Business (GMB) to incorrectly reinstate the listing. It happens all the time" — and concludes that spam fighting is usually not a long-term strategy in its own right. Fake reviews are a third path — flag the review, not the listing.

So: **time-box it.** Pick a fixed budget — an hour a month is defensible — spend it on the one or two strongest cases sitting directly above you for a keyword that matters, log them, stop. Every hour beyond that is one not spent on reviews, completeness and content, which compound and cannot be reinstated away from you. And do not report a rival because they beat you: a frivolous complaint costs the spammer nothing and costs you the ability to say honestly that your reports are evidenced.

## Labs

### Lab 23.1 — Audit the competitive set you are already measured in

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **free** · Time: ~20 min
>
> You need: a tracked keyword with a stored rank check ([choosing what to track](../02-core-practice/choosing-what-to-track.md)).

1. Open **Rankings** and select a keyword to open its detail. Nothing here fetches anything; every number was recorded when the check ran. Note that date — a competitive set is as stale as the scan behind it.
2. Find **Who ranks above you** — one row per rival with position, name, rating and review count. **Read the positions, not the heading.** What is stored is the top three results with your own listing removed, so if you rank #2 the row shown at #3 is *below* you. Exactly the kind of label that quietly becomes a false claim in a client deck.
3. Read **Rivals beating you in search**, under **Local visibility** at the top of the page: which names appear across how many of your tracked keywords. A name in most of them is the one to audit first.
4. Apply the name test to every name: the exact string, in quotation marks, in a web search. Mark each *plausible*, *stuffed* or *unknown*.
5. Write the count: of the listings recorded above you on your main keyword, how many survive?

![Keyword detail page: the business at #1, with two rivals listed at positions 2 and 3 under a heading reading Who ranks above you](../../static/img/screens/keyword-detail.png)

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

> **Without SEOG.** Labs 23.2 and 23.4 already run in a browser. By hand, 23.1 is a search from a fixed location with the pack written down — names, positions, date; 23.3 is a spreadsheet with one row per rival and a filter column. What you lose is the recording, which is the part that fails. [Doing it without SEOG](../99-appendix/doing-it-without-seog.md) is the long form.

## Common mistakes

**Reporting the rival who beats you fairly.** "This listing is spam" resolves, under the five tests, to "this business has more reviews than us" more often than anyone admits.

**Sending a heuristic score to a client.** "Our system flagged three competitors as likely spam" reads as a finding and is a triage output. When the client's cousin turns out to own one, you will not enjoy the follow-up. Send verdicts with evidence, or send nothing.

**Letting fraud set your targets.** The most expensive one, because it is invisible: a quarter spent chasing a review count that was bought.

**Claiming credit for a removal.** Your rank improved the week a fake vanished. Without the removal date in your change log you cannot separate the two, and the version of you writing the report has every incentive not to notice.

**Copying the tactic because it is working.** The tempting moment arrives ten minutes after the audit, and the trade is asymmetric: a spam operator rebuilds a disposable listing in a week, while you lose the profile your business runs on and enter an appeals process slower than the reporting one ([suspensions and reinstatement](./suspensions-and-reinstatement.md)). Apply to yourself the test you applied to them — **is this the name on the storefront, the invoices and the website?**

## Check yourself

Answer against your own practice business, with your Lab 23.1 notes open.

1. **Of the listings recorded above you on your main keyword, how many survive the name test — and what would move each remaining one from signal to case?** If you cannot name the missing observation, the audit is not finished.
2. **Your tracked set includes one rival you believe is inflating its reviews. State your "get N more reviews" target both ways, and say which one goes in the client report and why.**
3. **A competitor listing disappeared last month and your average position improved by 1.4. What single recorded fact would let you attribute that correctly, and do you have it?**
4. **Thirty minutes, two candidates: one ranking above you for your best keyword, one three miles away in a category you barely touch. Which do you work, and why?**
5. **A client asks you to report four competitors who "are obviously fake". What do you say, and what do you ask for before filing anything?**

---

**Next:** [Suspensions and getting reinstated →](./suspensions-and-reinstatement.md)
