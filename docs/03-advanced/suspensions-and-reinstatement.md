---
title: Suspensions, and how to come back
sidebar_position: 7
description: How to tell a suspension from a rank drop, what actually triggers one, the reinstatement procedure, and the edit cap that surprises people.
---

# Suspensions, and how to come back

A client calls and says they have disappeared from Google. Usually they are wrong about what happened, and a wrong diagnosis leads straight to the wrong action — filing an appeal for something that is not a suspension, or creating a second listing that turns a recoverable situation into a guidelines violation.

So: the differential diagnosis first, the recovery procedure second. Then what an outage does to every number you have been reporting for six months, because that damage outlasts the suspension.

## Which kind of gone is it?

"Gone from Google" describes at least six states. Only two are suspensions.

| State | What you see publicly | What the owner dashboard says | What it is |
| --- | --- | --- | --- |
| **Rank drop** | Not in the pack; still findable by name | Verified, normal | A ranking outcome, not enforcement |
| **Pending re-verification** | May be temporarily unpublished | Pending / "verify now" | Consequence of a critical edit |
| **Marked closed** | "Permanently" or "Temporarily closed" | Verified, closed status | Someone set it — you, Google, or an accepted user edit |
| **Duplicate consolidated** | One listing where there were two | Yours may vanish from the list | A merge, not a removal |
| **Soft suspension** | Listing there, looks normal to customers | Unverified / management lost | Enforcement against the *ownership* |
| **Hard suspension** | Removed from Search and Maps | Suspended | Enforcement against the *listing* |

Separating them takes five minutes and three checkpoints, in order.

1. **Search the exact business name plus the city**, in a private window. A knowledge panel means the listing exists — and a business absent for `emergency plumber` but present for its own name has a ranking problem, not this one ([Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number.md)).
2. **Open Maps and search the exact name plus the street.** Catches the closed-status cases, which read as a disappearance in a rank report and are a two-click fix.
3. **Open the profile in Google's own dashboard.** The only checkpoint that sees a soft suspension, which is invisible from outside.

Skipping step 3 is how people spend a week optimising a listing that was fine and an account that was not.

## Hard and soft

The terms are industry vocabulary; Google's documentation uses neither *(the underlying states are what the dashboard shows)*. A **soft suspension** removes your verified ownership. The listing stays live and customers see no difference — what you lose is control: no editing, no review replies, and anything reading the profile through an owner login stops returning data. It usually resolves by re-verifying, not by appealing.

A **hard suspension** removes the listing from Search and Maps, and the reviews go with it. That is the one that costs money by the day, and the one the reinstatement process exists for. So **check the dashboard before you tell anyone what happened** — only one of the two is an emergency.

## What actually triggers it

Nobody outside Google can rank these by weight, and anyone publishing a percentage breakdown of suspension causes is showing you their sample, not the mechanism. What is observable is the *shape*: suspensions cluster around claims of identity — who you are and where you are — and almost never around content quality. A thin description does not get you suspended. An address you cannot document does.

**The address does not hold up.** Virtual offices, mail-forwarding addresses, coworking desks, a registered-agent address, a unit number that does not exist, a service-area business showing a street address it does not staff. The largest cluster in every practitioner account, and the hardest to argue out of: the fix is usually "change the address", not "explain the address". [Service-area businesses](./service-area-businesses.md) covers the rules that keep SABs clear of it.

**The name does not match the real world.** A keyword in the name field is the most-reported violation in local search, and anyone who notices can report it — including the competitor sitting below you ([Spam and fake listings](./spam-and-fake-listings.md) covers the redressal machinery).

**The entity does not hold up.** A category describing something not sold at that location, a website redirecting to a lead-generation domain, two profiles at one address for one business — each a mismatch between what the profile claims and what Google corroborates elsewhere.

**A pattern of edits.** Critical fields changed in bursts, ownership changing hands, an edit that contradicts what Google already believes. This is the category behind the "I only changed the phone number" reports: the phone number was not the trigger, the sequence was.

**Category-level scrutiny.** Some verticals face harder verification — locksmiths, garage-door repair, addiction treatment. Google acknowledges advanced verification for some categories without publishing the list, so treat vertical-specific advice as observation, not documentation.

Trigger and enforcement are usually weeks apart, which is why almost every account begins "it happened for no reason": the reason happened in March, the suspension in May, and nobody kept a record joining them. An appeal that names no corrected violation is an appeal asking Google to re-examine an unchanged listing. The app records each fix it applies with the value it replaced — that is what undo restores from — but surfaces only a count, *N profile edits applied since your last refresh*, and there is no browsable history screen. **Your own dated change log is still the artefact that matters**, as [Did it work?](../02-core-practice/did-it-work.md) sets it up.

## The edit cap, and why it bites hardest here

Google caps profile edits at ten per minute, per profile. [The profile is the product](../02-core-practice/the-profile-is-the-product.md) introduces it; the mechanism is in [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md). Three things surprise people, and all three surface during exactly the scramble a suspension produces.

**The budget is per profile, not per tool or per person.** Two people fixing the same listing in two browsers share one allowance. So do two tools, and so do a bulk hours update and a scheduled post landing in the same minute. The failure lands on whichever arrived last, which is why the symptom presents as an unrelated bug in an unrelated system.

**Every write counts, including the ones that feel like corrections.** Undo is a write. Re-applying a rejected value is a write. Each photo is a write. So is publishing a post. A panicked "let me put everything back" is the most reliable way to hit the ceiling.

**Hitting the cap leaves you in a partial state.** A run that stops halfway has applied some edits and not others, and a half-applied identity change — new name, old address — is exactly the inconsistency that reads badly. SEOG refuses the write before it reaches Google and tells you to try again in a minute: better than a silent failure, but not a queue. Nothing is retried for you.

So the rule is **pace your edits and verify each one**: the cap makes bulk work unattributable long before it makes it slow. [Multi-location and franchise work](./multi-location-and-franchise.md) plans around it.

## What a suspension does to your measurements

**Rank checks record a real absence with a false cause.** During a hard suspension every keyword check comes back *not in the results* and every grid scan comes back empty. The readings are correct — the business genuinely was not there — but they are not a *ranking* measurement. Six months later the chart shows a crater and a recovery, and whoever reads it credits whatever work was running at the time. Annotate the window at the point of use; do not delete the readings, because deleting evidence to make a chart look sensible is how a change log stops being usable.

**A profile refresh on a delisted listing looks like success.** When the underlying place record is gone the re-pull finds nothing, the stored copy is left exactly as it was, and the header stamps *Synced just now*. Every field reads the same because it is the same — the last known good copy, preserved. Useful (it is the pack you appeal with), and a trap if you read the fresh timestamp as fresh data. *(Verified against current behaviour, 2026-07-27.)*

**The profile-score trend keeps drawing**, because a snapshot is still written from the preserved values. **Review counts stall rather than drop**, because there is nothing to sync from. Neither is a signal of anything, and neither should be reported as one — [Why two tools disagree](./why-two-tools-disagree.md) generalises the point.

So: **only signals that go out to Google and look for the listing detect a suspension** — a rank check, a grid scan, or your own eyes in a private window. Everything computed from stored data will tell you the business is fine.

## Getting reinstated

What follows is our reading of a process Google documents thinly and changes without notice. Not legal advice, and the entry points move. *(Last reviewed 2026-07-27.)*

**1. Stop editing.** Every further edit is noise in the record, spends the write budget, and can extend a pending state.

**2. Establish which state you are in.** The three checkpoints above. A soft suspension needs re-verification, not an appeal, and filing the wrong one wastes the clock.

**3. Find and fix the violation before you appeal.** People invert this, and inverting it is the main reason appeals fail. If the listing still breaks the guidelines when it is re-examined you get the same answer, and you have spent your best shot. Read Google's *Guidelines for representing your business on Google* directly rather than a summary — it is the operative document, and it is revised.

**4. Assemble the evidence.** It varies by cause; the recurring set is exterior photographs showing permanent signage with the street visible, interior photographs, a lease or utility bill, the business registration, a trade licence for regulated categories, vehicle signage for a service-area business. Every document must carry the *same* name and address as the profile, character for character.

**5. File one appeal, from the account that owns the profile.** Start from the suspended profile in Google's own dashboard, not from a URL in a blog post — the standalone entry point has moved more than once, and retired forms are a common way an appeal goes nowhere. Parallel appeals, or appeals from a second account, are the fastest route to a refusal.

**6. Wait, touch nothing, and re-file only with new evidence.** Google publishes no service level; reported turnarounds run from days to weeks, so treat any number you read as one person's sample. Nothing new to submit means you have not found the violation yet. Past that the ladder ends at the Google Business Profile Help Community — a real path, not a guarantee.

## What comes back

A reinstated listing generally returns with its reviews, because the reviews belong to the profile *(observed; Google does not document what survives a reinstatement)*. Verify everything else rather than assuming it — hours, attributes, photos, posts — because what you get back is the record Google restored, not necessarily the record you had.

And reinstatement is not recovery. Position does not snap back when the listing does, and the first fortnight of readings belongs to the outage rather than to your work. Re-measure against the pre-suspension baseline, give it weeks, and make no critical edit while you watch it come back — you will not be able to separate the two effects.

## Labs

### Lab 24.1 — Run the absence triage on a listing that is fine

> **Lab** · Where: your browser and **Overview** (`/b/{businessId}/overview`) · Cost: **free** · Time: ~15 min
>
> You need: your practice business added (Lab 0.3). Owner access (Lab 0.4) makes checkpoint 3 possible.

1. In a private window, search the **exact business name plus the city**. Record whether a knowledge panel appears, and screenshot it.
2. In Google Maps, search the **exact name plus the street**. Record whether the pin is there, and whether the listing carries "Temporarily closed" or "Permanently closed".
3. Open the profile in Google's own dashboard. Record the state word against the location — verified, pending, suspended, or a prompt to verify.
4. In the app, open **Overview** and press nothing. Read the **Synced** stamp in the header, the rating and review count on the stat row, and the **Marked operational** row in the audit.
5. Write the four checkpoints into a one-page template with blank fields — what you fill in at 8am on the day it matters, when you will not be thinking clearly.

![Overview of a connected business: "Not synced yet" beside the Refresh all button, a stat row reading profile score 36%, rating 5.0 from 3 reviews, 1 photo, and a seven-step action plan below it](../../static/img/screens/owner-overview.png)

*Checkpoint 4, on a connected profile. The score, the rating and the review count are all read from the stored copy, and the stamp beside **Refresh all** is the only thing on the page that says how old that copy is — nothing here goes out to Google and looks for the listing, which is why nothing here can see a suspension.*

**What good looks like.** Four filled checkpoints for a healthy listing, so you know what "fine" reads like at each one. Most people have never looked at checkpoint 3 on a working profile, and so cannot recognise a changed one.

**If it went wrong.** You searched a service term instead of the name: that measures ranking, not existence. No dashboard access means checkpoint 3 is closed to you — write that in the client file, because it is a real gap in what you can diagnose ([Set up your workbench](../00-start-here/set-up-your-workbench.md) has the public-versus-owner split).

**What you just learned.** Absence has at least six causes demanding different actions. Only the dashboard sees a soft suspension, and stored data sees none of them.

---

### Lab 24.2 — Build the identity pack before you need it

> **Lab** · Where: **Overview** then **Profile** (`/b/{businessId}/profile`) · Cost: **paid** · Time: ~30 min
>
> You need: Lab 0.4 (the Google Business Profile connected) and Lab 9.1.

1. On **Overview**, press **Refresh all** in the page header — a priced re-pull of the profile fields and reviews. The pack must be built from what Google holds *today*, not from a mirror captured in March.
2. Open **Profile**. Copy verbatim into a text file: business name, the address as displayed, phone, website, opening hours, open status, the text under **Currently on Google**, and the photo count.
3. Add what the app cannot hold: photograph the exterior yourself with permanent signage and the street both visible, and the interior; collect the lease or a utility bill, the business registration, a trade licence if the category is regulated, and vehicle signage for a service-area business.
4. Check every document against the profile character for character. `Ltd` versus `Limited`, `St` versus `Street`, a suite number in one and missing from the other — each is a weakness in a future appeal.
5. Diff the pack against the website's contact page and the main directories from Lab 12.1, then save the folder as `businessname-identity-pack-YYYY-MM-DD` alongside the baseline from Lab 7.3.

![Profile page showing open status, category, price band, photo count, phone, website, opening hours and the attributes Google carries](../../static/img/screens/profile.png)

*Step 2 is a transcription job off this screen: open status, category, photo count, phone, website, hours, attributes. Copy them character for character — `St` against `Street` between the profile and your lease is exactly the mismatch an appeal turns on.*

**What good looks like.** A dated folder in which every profile field is a verbatim copy of what Google had that day, with no mismatch between the profile, the documents, the site and the main citations.

**If it went wrong.** The description reads back blank or unfamiliar on an unconnected profile — public data does not carry the owner's text. If **Refresh all** changed a field you did not, that is information rather than an error: someone else edited the profile, or Google accepted a user-suggested edit.

**What you just learned.** A reinstatement pack is built from evidence that has to exist *before* the suspension. The photograph you will be asked for is of the sign that came down last month.

---

### Lab 24.3 — Write the outage protocol and pre-date the annotation

> **Lab** · Where: your own notes · Cost: **free** · Time: ~20 min
>
> You need: Lab 24.1, Lab 24.2, and the change log from Lab 17.4.

1. In the change log, add a row type `OUTAGE` with four fields: start date, end date, kind (pending / soft / hard), link to the evidence.
2. Write the first-hour protocol as five numbered lines: who runs the triage, the freeze-all-edits rule, who tells the client and in what words, where the pack lives, who files. Name people, not roles.
3. Write the annotation rule in one sentence — suggested: *any rank check, grid scan or report dated inside an OUTAGE window is labelled at the point of use and never deleted.*
4. Write the three things you will not do: no second listing, no second appeal from a second account, no edits while the listing is pending. Put the protocol in the folder with the identity pack.

**What good looks like.** A one-page document a colleague could execute without calling you, and a change log with somewhere to put an outage.

**If it went wrong.** If step one is "file the appeal", reorder it — diagnosis and correction come first in every case.

**What you just learned.** An outage is two events at once: a business emergency and a measurement artefact. Handling the first and forgetting the second leaves a chart nobody can read six months later, including you.

---

> **Without SEOG.** Nothing here needs a platform: the triage is a browser and the owner dashboard, the pack is a folder, the protocol is a page of text. What a tool contributes is a dated record of the profile as it was and the edits you applied — exactly the material an appeal is built from. [Doing it without SEOG](../99-appendix/doing-it-without-seog.md) has the manual equivalents.

## Common mistakes

**Appealing before correcting.** If the listing still breaks the guidelines when it is re-examined, the answer is the same and you have spent your strongest submission. Find the violation, fix it, then file.

**Creating a new listing to get back online.** The most natural reaction and the worst available move: you now have a duplicate, which is itself a violation and complicates the appeal for the original. The revenue you save in week one costs you the profile the reviews are on.

**Reading an outage as a ranking result.** A suspension-shaped crater gets attributed to SEO work by whoever reads the chart next — including you, in six months, with no memory of the outage. That is what the annotation rule prevents.

**Treating reinstatement as recovery.** The listing being back starts the measurement rather than ending it. "We recovered", said on the day it returns, will be contradicted by the next fortnight of data.

## Check yourself

Answer against your own practice business, in writing.

1. **A client says they have disappeared from Google. Name the three checkpoints you run before saying anything, and which one distinguishes a soft suspension.** (Name-plus-city in a private window; the Maps listing; the owner dashboard. Only the dashboard — publicly, a soft-suspended listing looks normal.)
2. **Which of your instruments would notice a hard suspension, and which would tell you the business is fine?** (Anything that goes out and looks: a rank check, a grid scan, your own eyes. Anything from stored data — profile score, audit, score trend — keeps reading the preserved copy, and a refresh will even stamp a fresh sync time.)
3. **You changed the phone number six weeks ago and the listing suspended yesterday. What can you conclude?** (Very little without a change log. Trigger and enforcement are routinely weeks apart, so the question is what *else* changed in that window — and if you cannot answer it, that is the finding.)
4. **A bulk holiday-hours update across a portfolio starts failing partway through. What is the mechanism, and the risk beyond the failure?** (Ten writes per minute per profile, shared across every kind of write. The risk is the partial state: some profiles updated, some not, no record of which — see [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).)
5. **The listing is reinstated on the 12th. What do you tell the client that day, and what do you hold back?** (That day: it is back, and here is what returned with it. Held back: any claim about recovered position — that needs a fortnight of readings against the pre-suspension baseline.)

---

**Next:** [Multi-location and franchise work →](./multi-location-and-franchise.md)
