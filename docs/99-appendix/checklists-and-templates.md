---
title: Checklists and templates
sidebar_position: 3
description: Copy-pasteable checklists for a new-business audit, profile completeness, monthly maintenance and client onboarding, plus review-response templates written to be edited.
---

# Checklists and templates

Every list on this page exists because somebody forgot the item on it. They are meant to be copied — open the [raw Markdown on GitHub](https://github.com/seog-ai/local-seo-manual/blob/main/docs/99-appendix/checklists-and-templates.md), take the block you need, and paste it into whatever you keep client notes in.

Nothing here replaces the chapter that explains it. A checklist tells you *what*; it is a terrible teacher of *why*, and a practitioner who works from lists without the model behind them ticks the wrong boxes confidently. Each block names its chapter.

## How to use these

**Three states, not two.** Every line is *done*, *not done*, or **unknown — cannot be observed from here**. That third state is the whole difference between a diagnostic and a template with a business name pasted in. Without an owner connection to the Google Business Profile, several lines below can only ever be *unknown*, and writing "missing" instead is how you tell an owner they have no description on the afternoon they wrote one.

**Date and sign everything.** A checklist with no date is a claim about the present tense, forever. Put the date and your name in the header block, and keep the completed copy — it is your baseline, and in three months it is the only evidence of what the starting state was.

**Cost markers.** Lines marked **paid** fetch new data from Google or call a model. Lines marked **free** read data you already have. Reading stored data is free and unlimited in any serious tool; that is not a pricing quirk, it is what actually costs money ([how the labs work](../00-start-here/how-the-labs-work.md)). Most of the work below is free. Doing it without SEOG changes the tools and none of the steps — [Doing all of this without SEOG](./doing-it-without-seog.md).

---

## 1. New-business audit

Thirty to sixty minutes, run once, before you change anything. The reasoning is [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

```
Business:
Audited by:
Date:
Owner connection:   yes / no        (decides how many lines can be answered)
Access level held:  owner / manager / none
```

**Ground rules**

- [ ] Fix nothing during the audit. A defect repaired in minute five is a hole in the baseline and a result you can never claim.
- [ ] Read the "Synced" / "Checked" stamp on every card before reading the number on it. An old number is not a wrong number, but it is a different one.

**Read what is already stored — free**

- [ ] Profile score, and the five category segments under it. Note which segments are visibly unfilled.
- [ ] Rating, review count, photo count.
- [ ] Every row of **Action plan — your next steps**, with its `+N pts` value.
- [ ] **AI readiness** score and tier on the AI Visibility screen, plus each of the nine factors expanded.
- [ ] Which overview panels show a clearly-labelled **Example** preview rather than your data. That list is a to-do list, not a fault.
- [ ] Number of tracked keywords. Zero is a legitimate answer and a finding.

**Assign a cause to every failing item — free**

For each failing check, exactly one of three words. Guessing is not an option.

- [ ] `absent` — the field is empty.
- [ ] `below threshold` — present but under the bar (12 reviews against 20).
- [ ] `unknown` — you cannot observe it from where you are standing.

**Look outside the profile — free, in a browser**

- [ ] Run the main service keyword in a private window, desktop and mobile, and list the answer blocks in order until the first ordinary blue link. Ads count; label them.
- [ ] Read the pack's primary categories and compare them with the client's.
- [ ] Open the listing in Maps and read "From the business" — the owner-written description, which no public data feed carries.
- [ ] Read the three most recent owner replies. Tone, specificity, anything defensive.

**Buy only what stored data cannot answer — paid**

- [ ] One rank check or one grid scan on the single keyword the business actually sells on. Record keyword text, language, centre and detail preset beside the result; without those four the reading is not comparable to anything later.
- [ ] A listings-consistency check, if identity fragmentation is plausible (recent move, rebrand, call-tracking numbers).
- [ ] A report PDF, generated *after* the fetches above and *before* any edit. That is the freeze.

**Deliverables — all three, or the audit is not done**

- [ ] **A verdict.** Three or four sentences a non-specialist can read: what this business is, where it is visible, where it is not, the single biggest constraint. No number is a conclusion.
- [ ] **An ordered work list.** Not everything wrong — the things worth doing, in the order you will do them, each tagged with its clock: *write* (minutes), *behaviour* (weeks), *aggregate* (a quarter).
- [ ] **A frozen baseline.** The dated PDF plus your notes, filed as `business-baseline-YYYY-MM-DD`, in a place you will not overwrite.

> **The finding this list cannot produce.** Everything above is computed from profile and review data without looking at a single search result. It will never tell you the market is hard or that the constraint is proximity rather than completeness. That comes from a rank map, and it is often the most important sentence in the engagement — [Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number/index.md).

---

## 2. Profile completeness

The scored version of "is this profile filled in". Weights are the ones used in the manual's labs and published so you can reproduce the audit by hand or argue with it; they are a prioritisation rubric, not Google's ranking weights. Full discussion: [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility/index.md).

**The eleven completeness checks — 86 points total**

- [ ] `10` Phone number present
- [ ] `9` Website linked
- [ ] `10` Opening hours listed
- [ ] `4` Marked operational — not closed, not temporarily closed
- [ ] `8` Business description present *(owner-only: unknown without a connection)*
- [ ] `9` At least 5 photos
- [ ] `8` Rating 4.0 or higher
- [ ] `10` At least 20 reviews
- [ ] `7` Accessibility attributes set, **or** the category offers none
- [ ] `5` Payment attributes set, **or** the category offers none
- [ ] `6` Service attributes set, **or** the category offers none

Two calibrations worth stealing whatever tool you use. The photo bar sits at five because the publicly observable photo list caps out around ten *(observed; Google does not document the limit)*, so a higher bar would be one the instrument cannot see over. And the attribute checks pass automatically when Google's catalogue offers nothing of that kind for the category — an audit that demands the impossible trains people to ignore red rows.

**The nine AI-readiness factors — 100 points total**

- [ ] `22` Review volume — 25 or more
- [ ] `18` Rating — 4.2 or higher
- [ ] `12` Website on the profile
- [ ] `10` A review inside the last 60 days
- [ ] `9` Rich description present
- [ ] `8` Structured attributes — one or more set, any group
- [ ] `8` Agent-readable website — readiness score 90 or above
- [ ] `7` Review engagement — replied to at least half *(denominator trap: without owner access you hold a small sample of reviews against Google's full count, so this ratio is near zero by construction and measures nothing)*
- [ ] `6` Opening hours

Tiers: **70+ strong, 40–69 building, below 40 low.** Volume plus rating alone total exactly 40 — a business that passes those two and nothing else lands precisely on the boundary. That is a deliberate claim about where reputation sits, not an accident of arithmetic.

**Before you edit any field**

- [ ] Classify it. **Ordinary** — phone, website, hours, open status, description, attributes, photos: passes through review and usually publishes in about ten minutes. **Critical** — name, primary category, address: can force re-verification and take the listing out of Search and Maps for hours to days. *(The two-class split is our operating model, not a Google document; well-evidenced, last reviewed 2026-07-27.)*
- [ ] Not a Friday, not the busiest week, if it is critical.
- [ ] One field at a time. A listing that goes pending after three simultaneous edits tells you nothing about which one did it.
- [ ] Budget check: Google caps profile edits at **10 per minute per profile**, shared across description patches, hours, attributes, photo uploads and posts alike. Bulk work is paced, not parallelised — [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).

**The five-step safe edit**

- [ ] 1. Write down the current value, verbatim, in a file. This is your real undo.
- [ ] 2. Change one field. Then stop.
- [ ] 3. Wait out the review window — about ten minutes ordinary, longer for critical, and check whether the listing went pending.
- [ ] 4. Re-read the field **from Google**, not from your tool's cached copy.
- [ ] 5. If it reverted, it was rejected. That is information. Do not re-apply it harder — rewrite it plainly.

**Photo constraints** ([Photos, and what you cannot do with them](../02-core-practice/photos-and-the-visual-profile/index.md))

- [ ] JPEG or PNG. Not WebP, not HEIC — convert if your phone shoots HEIC.
- [ ] Under 5 MB, and not tiny.
- [ ] Roughly 4:3, landscape. Thumbnails centre-crop.
- [ ] Photographs you captured. Google's media policy asks for **"media that you captured"** and excludes stock and **"imagery created by other parties"**; AI-generated imagery falls on the wrong side of that line and this manual recommends it nowhere.
- [ ] Accept what you cannot do: no reorder, no atomic replace, no removing a customer's photo, no per-photo metrics since 2023-02-20.

---

## 3. Monthly maintenance

The recurring list, once an engagement exists. Sequencing logic is in [The ninety-day plan](../04-operating/the-ninety-day-plan/index.md); cadence logic is in [Building a tracked set that tells the truth](../02-core-practice/choosing-what-to-track/index.md).

**Weekly — mostly free**

- [ ] Replies cleared. Filter `Unanswered` + `Low (1–2★)` + `Newest` first; that is the queue costing money today.
- [ ] Review asks going out. Confirm with the named person, not with yourself.
- [ ] One post published, if posting is part of the engagement. Same slot every week beats a burst that stops in week seven.
- [ ] Any published reply from last week still visible on Google — re-check one at random (**paid**, and cheap insurance).

**Monthly**

- [ ] Refresh the whole tracked keyword set in **one action** so every row carries one timestamp (**paid**). Rows checked ad hoc cannot be read across.
- [ ] Geo-grid on one or two money keywords, **identical parameters** to last month: same keyword row, same language chip, same centre, same detail preset (**paid**).
- [ ] Re-snapshot competitors. Alerts are a diff computed when you re-snapshot, not a background watch — an empty **Activity** panel means nobody looked (**paid**).
- [ ] Profile refresh, then read the score. It moves when the *stored* copy updates, not when you make the edit.
- [ ] Owner search terms, if connected. Google's data is monthly by construction; asking more often returns the same window.
- [ ] Photos: add two or three, taken this month. A trickle reads as maintained; a dump of forty reads as a one-off and burns the edit budget.
- [ ] Update the change log: date, what changed, where, evidence it landed.

**Quarterly**

- [ ] Citations re-verified, and only the *mismatches* worked — starting with platforms an assistant actually cited for your keywords (**paid**).
- [ ] Website audit re-run; work the red rows in weight order (**paid**).
- [ ] AI-visibility probe set re-run, uniform across keywords and engines, and reported as a **rate over runs** rather than an answer (**paid**).
- [ ] The tracked set reviewed: anything that would not change a decision if it moved five positions comes out.
- [ ] Attribution pass: sort every movement into verified, plausible, unattributable.

**Not on any list, and say so out loud**

- [ ] Daily rank checks. Positions drift over weeks; a daily series on a weekly signal is a chart of jitter at fourteen times the price.
- [ ] Anything shipped in the final fortnight before a measurement. It contaminates the only reading anyone will read, and it cannot have taken effect yet.
- [ ] Automated review replies. Not a productivity win — a policy problem, below.

**Before the report leaves the building**

Six checks, no partial credit, about fifteen minutes ([Writing a report a client can check](../04-operating/reporting-to-a-client/index.md)).

- [ ] **Conditions.** Every number carries surface, query, coordinate and date — or its window, or its preset.
- [ ] **Frozen set.** The tracked keywords and locations are listed, and any change to them is a dated line.
- [ ] **Falsifiability.** Movements split into verified / plausible / unattributable, in the document, not in your head.
- [ ] **Spot-check.** A stranger can pick one work item and verify it themselves in five minutes.
- [ ] **Cost of admission.** Something in it was expensive to admit. A uniformly positive report, every month, is a tell.
- [ ] **Movement in the plan.** Next steps reference last period's result and have changed since last month.
- [ ] Archive the generated PDF into your own storage **the day you generate it**. Two separate mechanisms delete it otherwise: only the ten most recent reports are kept per business, so on a busy account the engagement baseline is the first thing pruned — and, more decisively, a report freezes Google content and so ages out on the thirty-day retention window whatever its position in that queue. A baseline you did not download is not a baseline. This is the single line on this page most often skipped and most expensive to have skipped.
- [ ] Somebody's name is on it. Automated assembly is fine; automated judgement with nobody's name on it is a printout, not a report.

---

## 4. Client onboarding

What arrives with the access, and what you owe from the moment it does. Long form: [What you inherit with a client](../04-operating/what-you-inherit-with-a-client/index.md).

> **Our reading of published terms, not legal advice.** Clauses below are quoted verbatim from Google's Business Profile APIs policies (page stamped **last updated 2025-08-28 UTC**, re-read 2026-07-27) and Google Business Profile Help (retrieved 2026-07-27). The interpretation after each is ours. If money or a licence depends on the answer, ask a lawyer.

**Access — day 0**

- [ ] Ask for **Manager**, not Owner. Every piece of work in this manual runs as a manager; what you cannot do is delete the profile or remove the client from their own listing, which is exactly the power you should not want.
- [ ] Refuse primary ownership. It cannot simply be removed — ownership has to be transferred — so offboarding becomes a task only you can perform.
- [ ] Record who else holds owner and manager access, by name. If you cannot fill this row, that is your first finding.
- [ ] Note the 7-day clock: *"When you become a profile owner or manager, you have to wait 7 days before you can manage some profile features."* Ordinary editing is unaffected; user administration is not. Schedule anything touching it after the window.
- [ ] If nobody at the business can get in, price recovery as its own work with an honest "this may not succeed" attached. Google notifies the current owner and gives them **3 days** to respond, and *"the option to claim a profile isn't always available."*

**The four duties, from the moment you connect**

- [ ] **Authorization in writing.** *"If you respond to reviews on behalf of your end-client, you must receive their authorization first."* The OAuth click is a technical grant, not permission to speak in their voice. Name the location, what you may publish without asking, and what always comes back for approval. Put 1- and 2-star replies in the second list whatever the client says.
- [ ] **Notice within 48 hours** of any change your tool makes: *"provide notice to the end-client of the change within 48 hours after the change is made."* One dated change log per client, pushed to them, one line per event.
- [ ] **A quick and easy exit inside seven business days**, with permissions relinquished. Holding a former client's access over an unpaid invoice is a breach of the terms you were allowed to touch the listing under.
- [ ] **Thirty calendar days** on stored Google content: *"It must be stored temporarily for no more than 30 calendar days… It cannot be manipulated or aggregated in any way."* What you may keep long-term is a different class of thing — measurements you computed and documents you generated and delivered. A mirror of Google's content is not. [Storing Google data legally](../05-reference/storing-google-data-legally.md).

**Inheritance inventory — week 1, free**

- [ ] Every profile field marked *inherited as-is*, *known wrong*, or *unknown*. Fix nothing yet.
- [ ] Domain, DNS, CMS and Search Console property: who controls each. "Unknown" is a legitimate entry and also a task.
- [ ] Disciplinary record, asked directly: ever suspended, ever re-verified, any change to name, address or category in the last twelve months, and how you know.
- [ ] How reviews are currently collected, in the client's own words. A tablet in reception routing low scores to a private form is an inherited policy breach you are now the manager of record for.
- [ ] Every existing owner reply read. Flag any that name a customer, dispute a complaint, disclose an order number, promise compensation, or read as sarcastic — *"your past replies … will stay on the Business Profile"* after the person who wrote them leaves.
- [ ] The numbers the previous provider reported last, and the sentence you will say at kickoff about why yours will differ. A client who hears it in week one hears an expert; one who works it out in week six hears an excuse.

**Set in writing at kickoff**

- [ ] What you will be judged on. What you report is what you have agreed to be measured by — pick it on purpose, in month zero.
- [ ] The measurement dates, before the work dates. Baseline, then three readings, fortnightly at minimum, none in the final week.
- [ ] The freeze rule: no new profile or website changes after the start of the final fortnight, reviews excepted.
- [ ] No ranking guarantee, in the same document as the plan. Nobody outside Google knows how long a local change takes to affect ranking.

**Offboarding pack — written at kickoff, executed in an afternoon**

- [ ] Client removes your user from their Business Profile.
- [ ] Client revokes the connected app from their own Google Account permissions.
- [ ] You stop scheduled work.
- [ ] You delete or return stored data.
- [ ] You hand over the baseline, every dated export, the change log and the inventory.
- [ ] Target inside seven business days, in the contract, beside the sentence that access is returned regardless of any outstanding invoice.
- [ ] No step requires you personally. If one does, the engagement has a design flaw — usually accepting primary ownership.

---

## 5. Review-response templates

> **These are not macros, and they must not be automated.** Google's Business Profile APIs policies state: *"you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent."* An unattended responder that watches for new reviews and posts a generated reply is named there as abusive behaviour, and the merchant's account carries the consequence. A model drafting and a human publishing is fine. That is the shape every template below assumes. Our reading of published policy, not legal advice; [Reviews](../02-core-practice/reviews/index.md) has the full quotes.

A reply is not for the reviewer, who has moved on. It is for the next person reading reviews while deciding whether to call — and that person can tell the difference between a sentence written about this business and a sentence that would fit under any review of any business.

**The four rules, applied to every template below**

1. **Name the specific thing.** "The bathroom fitting on Tuesday" beats "your recent experience".
2. **Say what changed**, not an apology loop.
3. **No personal data.** This is public. No surnames, no order numbers, no addresses, no medical or legal detail.
4. **Do not litigate.** The audience is not the reviewer.

Placeholders are in braces. If you can send one of these with only the braces filled, you have not finished — delete every sentence that could appear anywhere else.

**Five stars, with detail**

```
Thanks {first name} — glad {the specific thing they mentioned} worked out.
{One concrete sentence only this business could write: who did the work,
what was involved, what happens next time.}
```

**Five stars, no text** (a bare rating; there is nothing to answer, so answer briefly or not at all)

```
Thanks for the rating — good to have you as a customer.
```

**Four stars, one specific complaint inside a positive review**

```
Thanks {first name}. Fair point about {the thing they flagged} — {what you
have changed, or what you are doing about it, in one sentence}. {One line
acknowledging the part that went well.}
```

**Three stars, mixed**

```
Thanks for writing this up, {first name} — it is the useful kind of review.
{Name the part that fell short, in their words, not yours.} {What changed
as a result, with a date if there is one.} If you would like to talk it
through, {the ordinary contact route already public on the profile}.
```

**One or two stars, a real service failure**

Do not send this on the day. Draft it, have a second person read it, follow up privately, fix the process, then publish.

```
{First name}, I am sorry — {restate what went wrong, in one clear sentence,
without qualifiers}. That is not how we work. {What has changed since, or
what you are checking.} Please contact us at {the public contact route} and
ask for {role, not a surname} so we can put it right.
```

**One or two stars, where the account is factually wrong**

The hardest case, and the one most often botched. You correct the record once, calmly, and stop.

```
Thanks for the feedback, {first name}. Our record of the visit differs from
this account — {one factual sentence, no adjectives}. We would rather sort
it out directly than in public; {the public contact route} reaches us and we
will look at it properly.
```

Never: a second reply, a timeline, a quoted invoice, or the phrase "as you know".

**A review that names a staff member**

Unprompted naming is good — specific, credible, exactly what the next reader wants. **Asking** for it has been prohibited since 17 April 2026: *"merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member."* Reply to it; never engineer it.

```
Thanks {first name} — {staff first name} will be pleased. {One sentence
about the work itself, so the reply is about the job and not about the
review.}
```

**Suspected fake, or clearly not a customer**

A reply is not the remedy. Report it, then leave one flat sentence so the next reader sees the business is present and unbothered.

```
We have no record of this visit. If we have got that wrong, please contact
us at {the public contact route} — we would like to look into it.
```

**A review left for the wrong business**

```
Thanks for the note — this looks like it may be meant for another business;
we have no record of {the thing described}. If we have that wrong, do get in
touch at {the public contact route}.
```

**Never appears in any reply**

- [ ] A discount, voucher or compensation offer. Incentivised content is prohibited, and offering one publicly invites the pattern.
- [ ] A customer's surname, order number, address, or any health or legal detail.
- [ ] A request to remove or amend the review.
- [ ] A second reply to the same review. One is a response; two is an argument with an audience.
- [ ] Anything you would not want screenshotted, because the ones that get screenshotted are exactly these.

**Asking for reviews — the compliant version**

The clauses quoted in this block come from Google's **prohibited and restricted content policy for Maps user contributions** (`support.google.com/contributionpolicy`, retrieved 2026-07-27) — a different document from the Business Profile APIs policies quoted in section 4, governing the merchant's conduct rather than a developer's. Both bind an agency running reviews for a client.

- [ ] Same link, same moment, **every** customer. Not only the ones you know are happy: *"selectively solicit positive reviews from customers"* is prohibited, and a form routing five-star answers to Google and one-star answers to a private inbox is that clause verbatim.
- [ ] No incentive of any kind, and no steering the score. The permission reads, in full: *"Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives to do so or attempting to influence the rating"* — the second half matters as much as the first, and rules out "if you were happy, leave us five stars" even where nothing is being given away.
- [ ] No per-staff quotas — prohibited since 17 April 2026: *"merchants requesting that staff solicit a certain number of reviews"*.
- [ ] No script telling the customer what to write or which rating to leave.
- [ ] Asking unhappy customers too, by design. A 4.6 from 200 outsells a 5.0 from 11, and a rating with no negatives reads as filtered.

**After publishing — the read-back rule**

- [ ] Confirm by reading the review back from Google and finding **your own text** in it. A success response on the write is a receipt, not evidence. Google can accept a reply cleanly and never show it — two known causes are a profile not in good standing, and a reply written against the right location under the wrong owning account.
- [ ] Re-check anything older than a month before you put a response rate in a client report. Confirmation decays: replies disappear with the reviews they hang from.
- [ ] Evaluating somebody else's tooling? One question: *how do you know the reply published?* "The API returned success" is the wrong answer.

---

## 6. Pre-publish check for a Google post

Run before you spend anything. A rejected post is not explained — you get the state and nothing else. Full chapter: [Publishing without getting rejected](../02-core-practice/publishing-without-getting-rejected/index.md).

- [ ] **No phone number in the text.** Google's post content policy: *"we do not allow your post content to include a phone number"*. This is the number one rejection cause and the most natural thing an owner writes. Use the **Call** button, which takes the verified number from the profile.
- [ ] Post text under **1,500 characters**; event or offer title under **58**. Neither figure is in Google's current documentation; both are enforced, and both were established by sending a longer value and reading the error *(verified 2026-07-22)*.
- [ ] Events and offers carry a **complete** interval — start date, start time, end date, end time. "Runs from Friday" is not a schedule Google accepts.
- [ ] Offers take **no button**. Google attaches its own; an explicit one fails.
- [ ] One photo, JPEG or PNG, at least 400×300, roughly 4:3, taken by you. No video — the interface publishes it, the API does not. The photo cannot be changed after publishing.
- [ ] No regulated goods wrapped in a promotion with a call to action: alcohol, gambling, tobacco and vaping, firearms, pharmaceuticals, financial services.
- [ ] Hotels: the restriction is wider than the post type. Google's post content policy reads *"Hotels can't create 'offer' posts, or any post that mentions or includes links to deals, promotions, special offers, or discounts"* — so a What's New post from a hotel that mentions a discount is prohibited too, not just the Offer format. *(The published clause names hotels only; whether Google applies it to motels, inns, lodges and B&Bs is an open question we have not been able to source — assume it does and check before you sell a posting retainer to one.)*
- [ ] Not all-capitals; not six or more emoji in a short post. Neither is a documented threshold; both correlate with rejection *(inference)*.
- [ ] Multi-location client: publish **one test post on one location** before selling a posting retainer. Some locations are refused from posting entirely, and detection is Google-internal with no way to test in advance.
- [ ] Scheduled a batch? Check the states afterwards. Google reviews scheduled posts up front, so a post scheduled for next Tuesday can be marked not approved today.
- [ ] Promise no per-post analytics. They stopped existing in February 2023. A dashboard showing views per post did not get them from Google.

---

## What is deliberately not here

**An automated reply macro set.** Templates that can be sent unedited are templates that read like it, and the automation itself is a policy problem rather than a productivity gain. Everything above is written to be edited by the person whose name goes on it.

**A directory submission list.** The list is the same for every business in every market, which should be the tell. The upgrade is a join you can only compute on your own business: the domains AI actually cited for your keywords, intersected with the listings verified to exist for you. Work the gap, not the list — [Citations and NAP consistency](../02-core-practice/citations-and-nap/index.md).

**A ranking guarantee template.** There is no honest version.

**Anything about AI-generated profile or post imagery.** Google's media policy asks for imagery you captured and excludes imagery created by other parties. It is a constraint, documented in [Photos, and what you cannot do with them](../02-core-practice/photos-and-the-visual-profile/index.md); it is not a technique.

---

These lists are current as of **2026-07-27**. The policy quotes carry their own source dates because those move independently — the April 2026 review-solicitation additions invalidated a decade of standard agency advice with no announcement, and the next one will arrive the same way. [Staying current](../04-operating/staying-current/index.md) is how you find out before a client does.

---

**Next:** [The local prompt corpus →](./the-local-prompt-corpus.md)
