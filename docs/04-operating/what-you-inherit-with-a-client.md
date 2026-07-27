---
title: What you inherit with a client
sidebar_position: 4
description: Connecting a client's profile transfers duties, not just access — the consent, notice, retention and exit rules you take on, and the history you inherit.
---

# What you inherit with a client

A client grants you access to their Google Business Profile. Three things arrive in that moment and only one of them is access. The second is a history you did not make and are now answerable for. The third is a set of duties — written down, dated, enforceable, and read by almost nobody in this industry.

This is the least glamorous chapter in Part IV and the one that decides whether doing this for money is a business or a slowly accumulating liability.

> **Our reading, not legal advice.** Every rule below is quoted verbatim with its source and that source's date, so you can check it yourself. The interpretation after each quote is ours. If money or a licence depends on the answer, ask a lawyer, not a manual.

## The moment you become a "third party"

Google's Business Profile APIs policies divide the world into the merchant who owns a listing and the tools that act on their behalf. The instant you manage a profile for someone else, you are on the second side of that line.

> "You can only use the Business Profile APIs to create, manage, and report on business listings that you either own or are authorized to manage on behalf of the business owner, or to develop tools for end-clients to similarly manage their listings."
>
> — Business Profile APIs policies, *General API policies*. Page stamped **last updated 2025-08-28 UTC**; re-read 2026-07-27.

Work through a tool the merchant signed into themselves and the vendor carries the API-side obligations — scopes, token handling, storage limits — while you carry the client-side ones: authorization, notice, a clean exit. Build your own integration, the instinct of most developers who reach this chapter, and **you carry both**. Editing by hand in a browser puts you outside the *API* policies quoted here, but not outside the profile terms and representation guidelines that govern the listing itself *(inference — Google publishes no single document stating this)*.

## Ask for the right level of access

Most onboarding damage happens in the first ten minutes, when someone says "just make me the owner, it's easier". It is not easier.

> "As the owner, you have full control over the profile. You can add or remove users, manage profile info, and even delete the profile."
>
> "Managers, formerly known as 'site managers,' have mostly the same access to the profile as owners. The only exception is they can't add or remove users or remove the profile."
>
> — *Manage your Business Profile owners & managers*, Google Business Profile Help. Retrieved 2026-07-27.

**Ask for Manager.** You can do every piece of work in this manual as a manager. What you cannot do is delete the profile or remove the client from their own listing — exactly the power you should not want. It also lets the client remove you in one click when the engagement ends, and an exit that depends on your cooperation is a bad exit even when you are trustworthy: it fails when you are unreachable, ill, or out of business.

Primary ownership is the version to refuse: a primary owner cannot simply be removed, ownership has to be transferred first, and offboarding becomes a task only you can perform. If a client's previous agency holds primary ownership, that is the first item of work.

![A business overview before any Google connection, showing a "Connect to unlock your owner data" panel beside a list headed "What you unlock": 18 months of performance, full review history, one-click profile fixes, publish Google posts, search-keyword history](../../static/img/screens/overview.png)

*Read the "What you unlock" list as a duty list rather than a feature list. Every line is something you gain the power to see or change on someone else's business — eighteen months of their performance data, their complete review history, the ability to write to their live listing. The four obligations in the next section all follow from that panel, and they attach the moment it is dismissed.*

Then there is a clock:

> "When you become a profile owner or manager, you have to wait 7 days before you can manage some profile features."
>
> — *Manage your Business Profile owners & managers*, Google Business Profile Help. Retrieved 2026-07-27.

The same page lists what is withheld inside that window: deleting or undeleting the profile, removing other owners or managers, and transferring primary ownership. Ordinary field editing is not on that list, which is the basis for treating it as unaffected — Google says "some profile features" and does not claim the list is exhaustive *(inference)*. So: get access on day one, spend week one on the diagnostic and the baseline — read-only work anyway — and schedule anything touching user administration after the clock expires. [The ninety-day plan](./the-ninety-day-plan.md) assumes that shape.

### When the client cannot grant access

Sometimes nobody at the business can get in: a former employee verified the listing, an agency claimed it in 2019 and folded. The documented route is slower and less certain than clients expect.

> "The current profile owner is then notified by email and has 3 days to respond."
>
> "If you don't get a response after 3 days, you may have the option to claim the profile."
>
> "The option to claim a profile isn't always available."
>
> — *Request ownership of a Business Profile*, Google Business Profile Help. Retrieved 2026-07-27.

Read the third quote as carefully as the first two: recovery can fail, and it can fail after weeks. Price it as its own piece of work with an honest "this may not succeed" attached, and never put ranking commitments on a timeline that depends on it.

## The four duties that arrive with the connection

### 1. Authorization before you speak for them

> "Business owners have the ability to respond to reviews of their business on Google. If you respond to reviews on behalf of your end-client, you must receive their authorization first. All responses to reviews must follow Google's Prohibited and restricted content policies."
>
> "...you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent."
>
> — Business Profile APIs policies, *Third-party policy > Reviews* and *Prohibited practices > Automated use of your Business Profile project*. Last updated 2025-08-28 UTC.

The OAuth click is not the authorization; it is a technical grant. The clause asks for the client's actual permission to speak in their voice, and the defensible form is written: a document naming the location, what you may publish without asking, and what always comes back for approval. Put one- and two-star replies in the second list whatever the client says — those are the ones that get screenshotted.

"Prior specific and express consent" is also what makes a fully automatic review responder non-compliant rather than merely tasteless, and it is why this manual recommends automated replies nowhere. Human-approved drafting is fine: a model writes, a person reads, a person publishes. In the app, the reply composer requires ticking an explicit acknowledgement that the text is about to appear publicly on the live profile before **Publish to Google** unlocks — consent per publication, not once at signup. That shape survives the clause whatever you build or buy. [Reviews](../02-core-practice/reviews.md) covers the craft; this is the constraint around it.

### 2. Notice within 48 hours of any change you make

> "...be transparent to end-clients about any changes you or your tool makes to their accounts. If your tool makes any changes to an end-client's account, such as when you add a new manager to the account, provide notice to the end-client of the change within 48 hours after the change is made."
>
> — Business Profile APIs policies, *Third-party policy > Transparency*. Last updated 2025-08-28 UTC.

The compliant artefact and the professional artefact are the same artefact: a dated change log per client, pushed to them rather than parked in a portal they never open. One line per event — what changed, from what to what, who approved it, when it published.

Build it in week one. It costs almost nothing, it makes the monthly report write itself ([reporting to a client](./reporting-to-a-client.md)), and the first time a client asks "who changed our hours?" it is the difference between an answer and an argument.

### 3. A quick and easy exit, completed inside seven business days

> "You must provide your end-client with a quick and easy way to stop use of your APIs. When an end-client gives notice that they no longer use your APIs to manage their Business Profile accounts, you have seven business days to provide them the ability to disassociate their Business Profile account from your services and developer project, and regain exclusive control of their Business Profile account(s). If your tool had permission to manage or otherwise change the end-client's account, you must also relinquish and remove those permissions accordingly."
>
> — Business Profile APIs policies, *Third-party policy > Termination of end-client relationship*. Last updated 2025-08-28 UTC.

"Regain exclusive control" is the phrase to sit with. Holding a former client's access as leverage over an unpaid invoice is not hardball negotiating; it is a breach of the terms under which you were allowed to touch the listing at all. Whatever the dispute, the access goes back.

Seven business days is the ceiling, not the target. Write the offboarding steps at kickoff, while everyone is friendly, and put them in the contract — Lab 29.3.

### 4. Thirty calendar days on stored Google content

> "You cannot pre-fetch, cache, index, or store any content provided through the Business Profile APIs ("Content") for use outside of your Business Profile project except for limited amounts of Content... Stored Content must meet the following requirements: It must be stored temporarily for no more than 30 calendar days. It must be stored securely. It cannot be manipulated or aggregated in any way."
>
> — Business Profile APIs policies, *Prohibited practices > Content storage*. Last updated 2025-08-28 UTC.

This is the clause that reshapes the product a developer was about to build. The obvious differentiator — "we keep every review and every insight forever, so you have the full history" — is what the text most directly forbids. Public Places data sits under a separate and also restrictive regime; both are laid out fact by fact in [storing Google data legally](../05-reference/storing-google-data-legally.md).

What you can hold long-term is a different class of thing: measurements *you* computed and documents you generated and delivered. A position you recorded, a score you calculated, a dated PDF you sent — that is work product. A mirror of Google's content is not.

One consequence lands daily: a stored *previous value* of a profile field ages out with everything else, so undo is not permanent. If restoring a field might matter, write the old value down before changing it. Write limits and their failure modes are catalogued in [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).

Honest open question: whether the 30-day cap covers a merchant's *own* data, pulled under their own grant and shown back only to them, is not addressed anywhere in the text. The storage requirements are written unconditionally. Anyone who tells you this is settled is describing a preference, not the rule.

### Two more clauses aimed straight at developers

> "You cannot provide indirect access to your Business Profile project. End users of your Business Profile APIs need to manually sign in to use it."
>
> "You're only allowed to use the GoogleLocations endpoint to find the status of locations of merchants that already have a business relationship with your company... Use of this endpoint for any other purpose, which includes lead generation or other analysis, is against Google's policies and will result in immediate revocation of your API access."
>
> — Business Profile APIs policies, *Prohibited practices*. Last updated 2025-08-28 UTC.

The first kills the reseller architecture — one integration, many agencies driving it programmatically. Each agency needs its own project; end users sign in themselves. The second kills the prospecting crawler that scans a city for weak profiles and emails the owners, by name, with the penalty in the same sentence. It is also why this manual publishes compliant architecture and never a scraper. [Running local SEO with an AI agent](./running-local-seo-with-an-ai-agent.md) stays inside those lines.

## The history you inherit

**Google does not hand you a change log.** You see the current state, not who set it or when. Anything you want to prove later — that the description was empty, the category wrong, the rating 4.1 — has to be captured by you before you touch anything. That is the argument for the frozen baseline in [diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility.md), and an inherited client is where it earns its keep.

**Replies you did not write are now yours.**

> "Even after you remove yourself, your past replies to reviews, posts, comments, and other actions will stay on the Business Profile."
>
> — *Manage your Business Profile owners & managers*, Google Business Profile Help. Retrieved 2026-07-27.

The previous manager left; their words did not. A defensive 2023 reply that names a customer, disputes their account of events, or quotes an invoice number is a live document under your client's business name, and nobody who finds it will care who typed it. Read every existing reply in week one — Lab 29.2.

**A rating you did not earn.** Ask in plain words how reviews have been collected. If the answer involves sending the link only to happy customers, or a tablet in reception that routes low scores to a private form, you have inherited a practice that breaches Google's policies and are now the manager of record for it. Say no in writing before you publish anything — and see [spam and fake listings](../03-advanced/spam-and-fake-listings.md) for the easier case, where the problem is on someone else's profile.

**The assets that are not on Google.** Who owns the domain registration, the CMS login, the Search Console property, the analytics. A domain registered to a former agency is a hostage situation that surfaces at the worst possible moment. Reach the registrar in week one or write down explicitly that you could not — [the website half](../02-core-practice/the-website-half.md).

**The numbers they were shown last.** The previous provider reported from a different tool, with a different method, from different coordinates. Their "average position 2.4" and your first honest measurement will not match, and yours will usually look worse. Say so at kickoff, before your first report lands ([why two tools disagree](../03-advanced/why-two-tools-disagree.md)). A client who hears it from you in week one hears an expert; one who works it out in week six hears an excuse.

**The listing's disciplinary record.** Ask directly: ever suspended, ever re-verified, any change to name, address or category in the last year? The answer changes what is safe on day one, because edits to those three fields are the ones most often reported to send a listing back into verification and occasionally into suspension — [suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement.md), and [publishing without getting rejected](../02-core-practice/publishing-without-getting-rejected.md) for avoiding it.

## What you are liable for now

- **Every edit publishes to a live listing.** Google reviews edits before they appear, and can reject or silently revert one. On timing Google is explicit: *"Edits usually take up to 10 minutes to review, but sometimes it can take up to 30 days"* (*Understand what happens to your Business Profile edits*, retrieved 2026-07-27). Plan for minutes; be able to survive weeks.
- **Some edits can pull the listing back into verification,** and a listing awaiting re-verification can stop appearing in Search and Maps. Google states that a request for extra information "is likely because some of your business details were recently updated" — but it does not publish *which* details. **Open question:** practitioner reports converge on name, address and primary category; that list is second-hand, so treat it as a working assumption rather than a rule ([suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement.md)).
- **A published reply is public and effectively permanent.** Editing it later does not un-say it, and it must comply with Google's prohibited and restricted content policies.
- **Attribution follows the data into your deliverables.** Google-sourced content shown to a client carries an attribution requirement; white-labelling a report does not remove it.
- **Your client's behaviour becomes your operational problem.** If they gate reviews or stuff keywords into the business name while you hold manager access, you are the one managing the profile when it is suspended.
- **You still cannot promise a ranking**, and inheriting a client is where the pressure to promise one is highest, because the previous provider probably did. [What the work costs](./what-the-work-costs.md) is the honest version of that conversation.

## Labs

### Lab 29.1 — Build the inheritance inventory

> **Lab** · Where: **Overview**, **Profile**, **Website** (`/b/{businessId}/overview`, `/profile`, `/website`) · Cost: **free** · Time: ~25 min
>
> You need: the business added to your portfolio (Lab 0.3), ideally the baseline from [Lab 7.1](../02-core-practice/analyzing-business-visibility.md).

1. Open **Overview** and press no refresh button — everything here is stored, and every refresh control fetches from Google and is priced. Write down the "Synced" stamp in the header: that is how old your picture is.
2. Write the access row: who is primary owner, who are the owners, who are the managers, what level you hold. If you cannot answer all four from the client's Business Profile, that is your first finding.
3. Open **Profile** and go field by field — name, category, hours, phone, website, description, attributes — marking each *inherited as-is*, *known wrong*, or *unknown*. Fix nothing yet.
4. Open **Website**. Record the domain, and beside it who controls the registrar, the DNS, the CMS and the Search Console property. "Unknown" is a legitimate entry and also a task.
5. Add two rows: the disciplinary record (ever suspended, ever re-verified, any name/address/category change in twelve months, and how you know), and how reviews are currently solicited, in the client's own words.
6. Save it with the date in the filename, beside your baseline documents.

**What good looks like.** One dated page with at least three honest *unknown* entries. An inventory with no unknowns on a client you met last week is a fiction.

**If it went wrong.** Owner-only fields are invisible because the profile is not connected — record that as the inventory's first line rather than guessing values. You caught yourself fixing things while reading: stop, and note that the baseline is now contaminated.

**What you just learned.** Inheriting is a data-collection problem before it is an SEO problem, and the entries that matter most are the ones you marked unknown.

### Lab 29.2 — Take ownership of the replies you did not write

> **Lab** · Where: **Reviews** (`/b/{businessId}/reviews`) · Cost: **paid** · Time: ~20 min
>
> You need: Lab 29.1. Full value needs the Business Profile connected; without it you get the small recent public sample instead of the history.

1. Press **Sync reviews** in the page header. Connected, this pulls the owner review history; unconnected, only the handful of recent reviews public data exposes. Note which case you are in — it changes what this lab can prove.
2. In the filter bar, choose the **Answered** tab and leave the sort on **Newest**. These replies are already live under your client's name. (The filters live in the URL, so whatever view you end up with is a link you can send.)
3. Read every one. Flag any that name or describe an individual customer, dispute the facts of a complaint, disclose an order or account number, promise compensation, or read as sarcastic.
4. For each flagged reply write one line: what it says, why it is a risk, and whether you propose to edit it, leave it, or escalate.
5. Take that list to the client before changing anything. Editing an old reply is still publishing publicly, which is what the acknowledgement gate on the publish step is for.
6. Switch to **Unanswered**, sorted by **Lowest rating**. That is your actual queue, and its length belongs in the kickoff report.

**What good looks like.** A short list of flagged legacy replies with a proposed action each, plus a count of unanswered reviews and the date of the oldest.

**If it went wrong.** The **Answered** tab is nearly empty on a business you know has replies — you are on the unconnected path reading a small recent sample, not the history. Say that in the report rather than concluding the previous provider never replied.

**What you just learned.** Removing a person from a profile does not remove their words from it. Every published reply is a permanent statement by the business, which is why authorization is a thing to obtain rather than a box to clear.

### Lab 29.3 — Rehearse the exit

> **Lab** · Where: your own documents, plus **Overview** (`/b/{businessId}/overview`) · Cost: **free** · Time: ~15 min
>
> You need: Labs 29.1 and 29.2.

1. Write the offboarding pack as a numbered list in execution order. At minimum: the client removes your user from their Business Profile; the client revokes any connected app's access from their own Google Account permissions; you stop scheduled work; you delete or return the stored data; you hand over the baseline, the dated exports and the change log.
2. Put a target on it inside seven business days, and write that target into your contract template beside the sentence that access is returned regardless of any outstanding invoice.
3. Verify you can find each control before you need it. In the app, open the **⋮** actions menu at the right-hand end of the overview header — past **Refresh all** and the reports menu — and read the **Remove business** confirmation: it permanently deletes that business's rankings, reviews and competitors, and it cannot be undone. Then press **Cancel**. Do not run it on a live client.
4. List by name what the client keeps: the dated baseline, every report you generated, the change log, the Lab 29.1 inventory. That list is what "regain exclusive control" looks like done well.

**What good looks like.** A one-page checklist you could execute in an afternoon, with a named owner per step and no step only you can perform.

**If it went wrong.** A step requires you personally — a design flaw in the engagement, most often caused by accepting primary ownership. Fix it now, not at the end.

**What you just learned.** The exit is a feature of the engagement, designed at the start, not an argument at the end. The pack is both your compliance answer and the reason the client's next provider says you were the good one. Doing this without SEOG changes the tools and none of the steps — [doing it without SEOG](../99-appendix/doing-it-without-seog.md).

## Common mistakes

**Accepting primary ownership because it is one fewer email.** It feels like trust and traps both sides: the client cannot remove you alone, and the exit depends on a transfer only you can perform.

**Treating the OAuth grant as the authorization.** The technical connection proves the client clicked a button. The policy asks for permission to act for them — and a fully automated review responder fails "prior specific and express consent" no matter how good the drafting model is.

**Fixing during the audit.** Especially tempting on an inherited profile, where the defects are visible and someone else made them. Every fix made before the baseline is frozen is a result you cannot claim later, and a change you may not be able to undo once the stored previous value ages out.

**Planning the archive you are not allowed to keep.** "A complete permanent history of your Google data" is the pitch the storage clause is written most unconditionally against. Sell your own measurements and your delivered documents instead — those you can keep, and they are the more defensible product anyway.

## Check yourself

Answer against a real business you manage or want to manage, not in the abstract.

1. **Name your access level on the profile, and every other owner and manager on it.** If you cannot, Lab 29.1 is not done.
2. **The client emails at 5pm on Friday to end the engagement. Write the steps, in order, with a completion date each.** Every step should be executable by them or by you, and none should need both.
3. **Which duties apply when your tool publishes a reply at 2am to a review that arrived overnight?** At least three: authorization first, the consent standard on anything automated, and notice to the client within 48 hours.
4. **What may you still hold about this client in two months, and what must have gone?** The distinction to reach is derived-and-generated versus stored Google content; the mechanism is in [storing Google data legally](../05-reference/storing-google-data-legally.md).
5. **You inherit a 4.7-rated profile and a review tablet in reception that routes anything under four stars to a private feedback form. What do you do first, and what do you put in writing?**

---

**Next:** [What the work costs →](./what-the-work-costs.md)
