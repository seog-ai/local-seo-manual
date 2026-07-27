---
title: The four duties, and the history you inherit
sidebar_position: 2
description: Authorization, notice within 48 hours, a seven-day exit and a 30-day storage cap — plus the replies, the rating and the assets you become answerable for.
---

# The four duties, and the history you inherit

Access is granted, at the right level, and the seven-day clock is running. What arrives with it is a set of obligations — written down, dated and enforceable — and a history somebody else made.

## The four duties that arrive with the connection

### 1. Authorization before you speak for them

> "Business owners have the ability to respond to reviews of their business on Google. If you respond to reviews on behalf of your end-client, you must receive their authorization first. All responses to reviews must follow Google's Prohibited and restricted content policies."
>
> "...you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent."
>
> — Business Profile APIs policies, *Third-party policy > Reviews* and *Prohibited practices > Automated use of your Business Profile project*. Last updated 2025-08-28 UTC.

**The OAuth click is not the authorization**; it is a technical grant. The clause asks for the client's actual permission to speak in their voice, and the defensible form is written — a document naming:

- the location;
- what you may publish without asking;
- what always comes back for approval.

Put one- and two-star replies in that last list whatever the client says — those are the ones that get screenshotted.

"Prior specific and express consent" is also what makes a fully automatic review responder non-compliant rather than merely tasteless, and it is why this manual recommends automated replies nowhere.

**Human-approved drafting is fine:** a model writes, a person reads, a person publishes. In the app, the reply composer requires ticking an explicit acknowledgement that the text is about to appear publicly on the live profile before **Publish to Google** unlocks — consent per publication, not once at signup.

That shape survives the clause whatever you build or buy. [Reviews](../../02-core-practice/reviews/index.md) covers the craft; this is the constraint around it.

### 2. Notice within 48 hours of any change you make

> "...be transparent to end-clients about any changes you or your tool makes to their accounts. If your tool makes any changes to an end-client's account, such as when you add a new manager to the account, provide notice to the end-client of the change within 48 hours after the change is made."
>
> — Business Profile APIs policies, *Third-party policy > Transparency*. Last updated 2025-08-28 UTC.

The compliant artefact and the professional artefact are the same artefact: a dated change log per client, pushed to them rather than parked in a portal they never open. One line per event — what changed, from what to what, who approved it, when it published.

Build it in week one. It costs almost nothing, it makes the monthly report write itself ([reporting to a client](../reporting-to-a-client/index.md)), and the first time a client asks "who changed our hours?" it is the difference between an answer and an argument.

### 3. A quick and easy exit, completed inside seven business days

> "You must provide your end-client with a quick and easy way to stop use of your APIs. When an end-client gives notice that they no longer use your APIs to manage their Business Profile accounts, you have seven business days to provide them the ability to disassociate their Business Profile account from your services and developer project, and regain exclusive control of their Business Profile account(s). If your tool had permission to manage or otherwise change the end-client's account, you must also relinquish and remove those permissions accordingly."
>
> — Business Profile APIs policies, *Third-party policy > Termination of end-client relationship*. Last updated 2025-08-28 UTC.

**"Regain exclusive control" is the phrase to sit with.** Holding a former client's access as leverage over an unpaid invoice is not hardball negotiating; it is a breach of the terms under which you were allowed to touch the listing at all. Whatever the dispute, the access goes back.

Seven business days is the ceiling, not the target. Write the offboarding steps at kickoff, while everyone is friendly, and put them in the contract — Lab 29.3.

### 4. Thirty calendar days on stored Google content

> "You cannot pre-fetch, cache, index, or store any content provided through the Business Profile APIs ("Content") for use outside of your Business Profile project except for limited amounts of Content... Stored Content must meet the following requirements: It must be stored temporarily for no more than 30 calendar days. It must be stored securely. It cannot be manipulated or aggregated in any way."
>
> — Business Profile APIs policies, *Prohibited practices > Content storage*. Last updated 2025-08-28 UTC.

**This is the clause that reshapes the product a developer was about to build.** The obvious differentiator — "we keep every review and every insight forever, so you have the full history" — is what the text most directly forbids.

Public Places data sits under a separate and also restrictive regime; both are laid out fact by fact in [storing Google data legally](../../05-reference/storing-google-data-legally.md).

**What you can hold long-term is a different class of thing:** measurements *you* computed and documents you generated and delivered. A position you recorded, a score you calculated, a dated PDF you sent — that is work product. A mirror of Google's content is not.

**One consequence lands daily.** A stored *previous value* of a profile field ages out with everything else, so undo is not permanent. If restoring a field might matter, write the old value down before changing it. Write limits and their failure modes are catalogued in [write limits and failure modes](../../05-reference/write-limits-and-failure-modes.md).

Honest open question: whether the 30-day cap covers a merchant's *own* data, pulled under their own grant and shown back only to them, is not addressed anywhere in the text. The storage requirements are written unconditionally. Anyone who tells you this is settled is describing a preference, not the rule.

### Two more clauses aimed straight at developers

> "You cannot provide indirect access to your Business Profile project. End users of your Business Profile APIs need to manually sign in to use it."
>
> "You're only allowed to use the GoogleLocations endpoint to find the status of locations of merchants that already have a business relationship with your company... Use of this endpoint for any other purpose, which includes lead generation or other analysis, is against Google's policies and will result in immediate revocation of your API access."
>
> — Business Profile APIs policies, *Prohibited practices*. Last updated 2025-08-28 UTC.

**The first kills the reseller architecture** — one integration, many agencies driving it programmatically. Each agency needs its own project; end users sign in themselves.

**The second kills the prospecting crawler** that scans a city for weak profiles and emails the owners, by name, with the penalty in the same sentence. It is also why this manual publishes compliant architecture and never a scraper. [Running local SEO with an AI agent](../running-local-seo-with-an-ai-agent/index.md) stays inside those lines.

## The history you inherit

**Google does not hand you a change log.** You see the current state, not who set it or when.

Anything you want to prove later — that the description was empty, the category wrong, the rating 4.1 — has to be captured by you before you touch anything. That is the argument for the frozen baseline in [diagnosing a business in thirty minutes](../../02-core-practice/analyzing-business-visibility/index.md), and an inherited client is where it earns its keep.

**Replies you did not write are now yours.**

> "Even after you remove yourself, your past replies to reviews, posts, comments, and other actions will stay on the Business Profile."
>
> — *Manage your Business Profile owners & managers*, Google Business Profile Help. Retrieved 2026-07-27.

The previous manager left; their words did not.

A defensive 2023 reply that names a customer, disputes their account of events, or quotes an invoice number is a live document under your client's business name, and nobody who finds it will care who typed it. Read every existing reply in week one — Lab 29.2.

**A rating you did not earn.** Ask in plain words how reviews have been collected.

If the answer involves sending the link only to happy customers, or a tablet in reception that routes low scores to a private form, you have inherited a practice that breaches Google's policies and are now the manager of record for it. Say no in writing before you publish anything — and see [spam and fake listings](../../03-advanced/spam-and-fake-listings/index.md) for the easier case, where the problem is on someone else's profile.

**The assets that are not on Google.** Who owns the domain registration, the CMS login, the Search Console property, the analytics. A domain registered to a former agency is a hostage situation that surfaces at the worst possible moment. Reach the registrar in week one or write down explicitly that you could not — [the website half](../../02-core-practice/the-website-half/index.md).

**The numbers they were shown last.** The previous provider reported from a different tool, with a different method, from different coordinates. Their "average position 2.4" and your first honest measurement will not match, and yours will usually look worse.

Say so at kickoff, before your first report lands ([why two tools disagree](../../03-advanced/why-two-tools-disagree/index.md)). A client who hears it from you in week one hears an expert; one who works it out in week six hears an excuse.

**The listing's disciplinary record.** Ask directly: ever suspended, ever re-verified, any change to name, address or category in the last year?

The answer changes what is safe on day one, because edits to those three fields are the ones most often reported to send a listing back into verification and occasionally into suspension — [suspensions and reinstatement](../../03-advanced/suspensions-and-reinstatement/index.md), and [publishing without getting rejected](../../02-core-practice/publishing-without-getting-rejected/index.md) for avoiding it.

---

**Next:** [What you are liable for now →](./what-you-are-liable-for.md)
