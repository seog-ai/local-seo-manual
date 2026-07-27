---
title: Verifying and fixing listings
sidebar_position: 3
description: Four labs — verify six platforms, cross-check your own site, work the gap AI actually cites, and fix one listing at source — plus the mistakes citation packages cause.
---

# Verifying and fixing listings

Everything above is the theory of resolution and retrieval. The labs below run it on one real business: verify first, prioritise second, and fix only what contradicts.

## Labs

### Lab 12.1 — Verify your listings

> **Lab** · Where: **AI Visibility** → **Listings consistency** → **Check now** (`/b/{businessId}/ai-visibility`) · Cost: **paid** · Time: ~3 min
>
> You need: a business added (Lab 0.3). Owner access is **not** required — this reads public listings and compares them against the profile data already stored.

![The AI Visibility page, with the Authority and Sources cited by AI cards and, at the foot of the page, a Listings consistency card that has not been checked yet](../../../static/img/screens/ai-visibility-full.png)

*Where the lab starts, on a business with no owner connection because it needs none. Listings consistency sits at the very foot of the AI Visibility page, names the six platforms it will check, and reads "Not checked yet" — while the Authority card above still reports "0 of 0 listings consistent" and Sources cited by AI is empty. The percentage tiles at the top of the page carry an **EXAMPLE** badge: they are illustrations of the layout, not measurements of this business.*

1. Press **Check now** on the Listings consistency card. It checks six platforms: Apple Maps, TripAdvisor, Facebook, LinkedIn, Yelp and Foursquare.
2. Read the summary line — *N of 6 listings consistent* — then, for every **Mismatch** row, the field lines beneath it, each showing the platform's value against Google's.
3. Copy the six verdicts into a table with one extra column: **who can change this**. Some listings you control, some you must claim first, some belong to a franchisor.

**What good looks like.** Six rows, each with one of the four verdicts. A mismatch shows both values, so you see what disagrees rather than being told that something does.

**If it went wrong.** All six *Not found* usually means the profile has no stored phone or address to match on — check the business record, and verify one platform by hand before believing a clean sweep of negatives. A not-found is also sometimes correct and irrelevant: a law firm has no TripAdvisor presence to find.

**What you just learned.** Verification is a different act from listing-building, far cheaper, and it comes first. You cannot fix a contradiction you have not located.

---

### Lab 12.2 — Cross-check your own site

> **Lab** · Where: **Website** (`/b/{businessId}/website`) → the website-support block's **Check now** · Cost: **paid** · Time: ~4 min
>
> You need: a business with a website on its profile.

1. Run **Check now** on the website-support block (the lower one — the page-top button also refreshes Search Console and costs more).
2. Read three rows: **Phone matches profile**, **Address on the site**, **Business name matches**. Note anything marked **Partial** or **Could not verify**. The rest of that checklist, and how it is weighted, belongs to [the website half](../the-website-half/index.md); the result you buy here is stored, so re-reading it there costs nothing.
3. On a failing phone row, note which of two very different problems it is: no phone on the homepage, or the site showing a *different* number from the profile.

**What good looks like.** Three verdicts with a specific cause on each, and a fix on the failing ones.

**If it went wrong.** *Could not verify* on all three usually means the site renders with JavaScript, so a text check cannot read it — reported as unverifiable rather than counted as a failure, because a JavaScript site is not a failing site. For a pure service-area business the address row is deliberately absent: a hidden-address business has no street address to publish. See [Service-area businesses](../../03-advanced/service-area-businesses/index.md).

**What you just learned.** Your own website is a citation, and the only one you fully control. Cheapest to fix, least defensible to have wrong.

---

### Lab 12.3 — Work the gap, not the list

> **Lab** · Where: **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **free** · Time: ~10 min
>
> You need: Lab 12.1, and ideally some live AI answer checks already run.

1. On the same page, scroll to **Sources cited by AI** and write down every row tagged **Directory** or **Social** with its citation count. Ignore *Reference* and *Web*.
2. Intersect that list with every platform from Lab 12.1 whose status is **not** *Consistent*, and rank the intersection by citation count. Everything else goes below a line labelled "not this month".
3. Read the **Authority** card's *Presence on the sources AI cites* row and check its "listed on N of M" figure against your own count.

**What good looks like.** A worklist of one to four items instead of thirty, each with a reason attached: *this platform is cited in N answers for my keywords and my listing there is wrong or missing.*

**If it went wrong.** *Sources cited by AI* is empty until you have run live AI answer checks — a separate, paid measurement covered in [Does the AI recommend this business?](../../03-advanced/ai-visibility/index.md). An empty *intersection*, though, is a real result: citation work is not your bottleneck this month, and [Reviews](../reviews/index.md) probably is.

**What you just learned.** The difference between a checklist and a diagnosis. A checklist is the same for everyone; a diagnosis comes from this business's own measurements, and it is short.

---

### Lab 12.4 — Fix one at source, then re-verify

> **Lab** · Where: the platform's own dashboard, then **AI Visibility** → **Check now** · Cost: **paid** (the re-check) · Time: ~15 min plus a wait of days
>
> You need: Lab 12.1 with at least one **Mismatch**, and Lab 12.3's ranking.

1. Take the highest-ranked mismatch from Lab 12.3 and decide which value is *correct* before touching anything. Usually the Google profile is the source of truth — but not always; if the business moved recently, both records may be stale.
2. Search the platform by name **and** by address before editing, to confirm there is not already a second record. This is the step people skip.
3. Fix it in that platform's own dashboard, claiming the listing first if you must. Nothing you do in SEOG changes a Yelp page. Write down the date.
4. Wait — a week is realistic; Apple Maps and Yelp both moderate edits — then press **Check now** again and confirm the row turned **Consistent**.
5. Citation fixes also appear on the Action Plan on the **Overview** page, grouped under *Listings*, and clear when a later check finds the listing consistent.

**What good looks like.** One row changed status because of something you did on a platform you do not own, with a date for the change and a date for the confirmation.

**If it went wrong.** Still a mismatch after a week means the platform has not published the edit, you edited a different location record (chains and franchises hold several), or the platform regenerates your listing from a data feed you have not corrected.

**What you just learned.** Citation work has a latency measured in weeks, runs through systems you do not control, and has no undo button — the real argument for changing your NAP as rarely as you can.

> **Doing this without SEOG.** Search `"Business Name" "phone number"` and `"Business Name" "street address"` in quotes and open every result, recording what each shows. Then search your business name directly on each platform that matters in your category. Budget about an hour per business, and accept today's picture with no history and no cheap re-check. See [Doing it without SEOG](../../99-appendix/doing-it-without-seog.md).

## Common mistakes

**Buying a citation package.** Tempting because it converts a vague problem into an invoice. It costs money now and maintenance forever, on records nobody cites.

**Deploying call-tracking numbers across directories.** Tempting because attribution is hard and marketing wants the data. It costs the clearest identity signal your entity has, on every surface at once.

**Auditing for formatting.** Tempting because it automates easily and produces an impressive report. It costs the attention that should have gone to the one directory carrying a number you disconnected in 2022.

**Creating a listing because a tool said "not found".** Tempting because the tool phrased it as a task. It costs a duplicate: split reviews, two records competing for resolution.

## Check yourself

Answer these against your own practice business.

1. **A directory lists you at "12 High Street, Suite 4" and your profile says "12 High St". Same or different?** Same — the abbreviation folds and the unit designator carries no location identity. Change it to "14 High Street" and it is a different business immediately: the house number is the strongest token in an address.

2. **Your checker reports "no Yelp listing found". What must you do before creating one?** Look, by hand, by name and by address. Acting on a false negative is how duplicates get made, and a duplicate is worse than the missing listing you were fixing.

3. **Citation signals sit around 7% of local-pack weight in the 2026 practitioner survey. Does that mean citations do not matter?** It means they are not how you win the map pack. They matter as retrieval material for AI answers, where absence from a cited directory is a missing document rather than a small deduction, and as the thing that stops your entity fragmenting.

4. **You are consistent on all six checked platforms, but AI answers for your keywords cite three directories not on that list. What is your worklist?** Those three, in citation-count order. Six-of-six is a good state to maintain and a bad place to keep spending.

---

**Next:** [The website half — pages, schema and Search Console →](../the-website-half/index.md)
