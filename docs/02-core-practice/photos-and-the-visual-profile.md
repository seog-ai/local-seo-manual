---
title: Photos, and what you cannot do with them
sidebar_position: 4
description: What profile photos do, what Google's media policy requires, and the four things you cannot do with them — reorder, replace, remove a customer's, or measure.
---

# Photos, and what you cannot do with them

The photo strip is the part of a listing a customer judges fastest and the part an owner controls least. You can add images. You can remove the ones you added. You cannot order them, cannot swap one out in place, cannot delete the blurry shot a customer took of your bins, and cannot find out how any single image performed.

That gap between what people assume they control and what is actually controllable is where most photo advice in this industry goes wrong. This chapter is mostly about the limits, because the limits are the part nobody tells you.

## What photos are actually for

Two different jobs, and it helps to keep them separate.

**Conversion.** Three results sit in the map pack. All three are close enough, all three are open, all three have decent ratings. The photos are what makes someone tap one of them. That effect is immediate and it is the reason photos are worth work even if they never moved a ranking at all.

**Evidence.** A profile with a storefront shot, an interior, the products and the team is a profile someone maintains. Google's guidance on improving local ranking lists adding photos alongside complete data, accurate hours and review management. But the three factors Google actually names — relevance, distance, prominence — do not include photos. See [Relevance, distance, prominence](../01-foundations/relevance-distance-prominence.md) for what those three are and are not.

So how much do photos move a position? Nobody outside Google knows, and anyone who gives you a percentage is guessing. Google's help materials have long asserted that profiles with photos get more direction requests and more website clicks. No method is published behind that claim, and the obvious confound is untouched: businesses that upload photos are businesses that maintain their profile at all. Treat it as a claim, not a measurement.

The honest working model *(inference, from how the rest of the profile behaves)*: photos are completeness evidence and conversion material. Do them because the second job is certain, not because the first one is.

## The gallery is not a folder you own

Go back to [the entity model](../01-foundations/the-business-entity.md). Photos sit in the *contents* group, and the contents group has more than one author.

A live gallery is fed by at least three sources: **you**, uploading as the owner; **customers**, uploading from Maps, forever, without asking; and **Google**, from Street View and its own imagery.

You have delete rights over exactly one of those. This is not a tooling limitation that a better product would solve — the media surface Google exposes to software only offers up owner-managed items for removal. Customer photos come down when the customer removes them, or when Google acts on a policy report. That is the whole list.

So the most common photo request an agency receives — "get rid of that one" — usually has one honest answer: *I can flag it and wait, and I cannot promise anything.*

## What you can and cannot do

| Action | Possible? | Why |
| --- | --- | --- |
| Add a photo you captured | Yes | — |
| Remove a photo you uploaded as the owner | Yes | — |
| Remove a customer's photo | **No** | Only owner-managed media is exposed for deletion. Report it and wait |
| Reorder the gallery | **No** | No ordering control exists |
| Choose which image is the cover | **Not reliably** | The Google dashboard takes a cover preference; what appears varies by surface and query *(inference — compare a listing's cover on mobile Maps and desktop Search)* |
| Replace one image in place | **No** | There is no atomic replace. Delete, then add. The gallery is briefly one photo short |
| See views for a single photo | **No** | Discontinued February 2023 (below) |
| Get a reason when an image is refused | **No** | The upload simply fails; no per-photo reason comes back |

Two of these deserve more than a table row.

**No atomic replace** means "swap the old logo for the new one" is two operations with a gap between them, and if the second fails you are down a photo. Every upload also draws on the shared per-profile edit budget described in [the profile is the product](./the-profile-is-the-product.md) — ten edits a minute, spent by posts, hours changes and description edits alike — so a bulk photo run can starve a scheduled post. [Write limits and failure modes](../05-reference/write-limits-and-failure-modes.md) has the mechanism.

**No ordering control** means any tool offering a "set cover photo" button is either driving the Google dashboard on your behalf or overstating what it does. Worth asking before you buy one.

## The photo count in every dashboard is a ceiling reading

Here is the fact that quietly breaks a lot of reporting. The public data Google exposes about a place includes a list of photos, and that list is capped — around ten entries, in every read we have taken *(verified 2026-07-13)*. Any tool without owner access counts that list and calls the result "photos". So does SEOG, and so does every competitor comparison you will ever see.

Three consequences:

1. **A count of 10 is not a count.** It means "at least ten". A business with 11 photos and a business with 400 read identically.
2. **Competitor photo averages saturate.** "You: 8. Competitors average 10." reads like a small gap. It could be a gap of hundreds.
3. **Below the cap, the number is real and useful.** A business showing 2 is genuinely showing 2, and that is a finding.

This is why the profile audit's photo check passes at five rather than at some impressive-sounding number: five sits below the ceiling, so it can actually be verified from public data. A tool that demanded "at least 25 photos" from public data would be scoring you against a number it cannot see.

The only place a true count exists is the owner's own Google dashboard. If the count matters to the decision, go and look there.

## You cannot measure a photo

Per-photo view counts stopped existing on **2023-02-20**, when Google discontinued the old reporting surface. The performance data that replaced it carries no photo metrics at all — no per-image views, no per-image actions *(probe-verified 2026-07-13; see [What Google's reporting hides](../05-reference/what-googles-reporting-hides.md))*.

So when a dashboard shows "your top-performing photo", exactly one of two things is true: it was scraped, or it was invented. There has been no third option since early 2023. Do not put that panel in a client report — [Reporting to a client](../04-operating/reporting-to-a-client.md) covers what to promise instead.

What you *can* do is measure at the profile level, before and after: direction requests, calls and website clicks over the weeks around a gallery overhaul. A weak instrument, since everything else moved too, but an honest one. [Did it work?](./did-it-work.md) is about using it properly rather than fooling yourself.

## The media policy, and the AI-image problem

> This is our reading of Google's published guidelines, not legal advice. Google's Business Profile photo and video guidelines are a help-centre page without clause numbers, so the phrases below are quoted as published and read on **2026-07-22**.

Google's media policy asks for **"media that you captured"** and rules out stock imagery, collages, and **"imagery created by other parties"**. Interpret that separately from the quote: the policy is about provenance, not quality. A beautiful photograph you did not take is a violation. A mediocre one you took on a phone is not.

Which puts the current fashion for AI-generated profile and post imagery in an awkward place. An image a model produced is, on any plain reading, imagery you did not capture and that another party created. Community reports describe AI images being auto-rejected on upload *(inference — no official statement names generated imagery specifically, and Google's wording predates the current tools)*. The risk is live, the upside is cosmetic, and the downside lands on a client's public listing.

**This manual does not recommend AI-generated imagery on a Google Business Profile, and neither should you.** Use it for a blog header if you like. Not here.

The practical constraints that go with the policy:

- **JPEG or PNG.** Not WebP, not HEIC. If your phone shoots HEIC by default, convert before uploading.
- **Under 5 MB per image**, and not tiny — very small files are refused.
- **Roughly 4:3, landscape**, because thumbnails get centre-cropped and a portrait shot loses its subject.
- **Photos are reviewed like any other edit.** Usually minutes. Sometimes longer. "I uploaded it and nothing changed" is normally this.

The same policy governs images attached to posts, with tighter rules again — see [Publishing without getting rejected](./publishing-without-getting-rejected.md).

## What to shoot

Photos answer the questions a customer has before they commit to walking in. Shoot the answers.

| Shot | The question it answers |
| --- | --- |
| The storefront, from the direction people approach | "Will I recognise it from the street?" |
| The entrance and the parking situation | "Where do I actually go?" |
| Interior, wide, lights on | "What am I walking into?" |
| The thing you sell, close, in real conditions | "Is this what I want?" |
| The team, faces visible | "Who am I dealing with?" |

Take them yourself, on a phone, in daylight. That is not a compromise — it is what the policy asks for, and profiles that look photographed tend to read as more trustworthy than profiles that look art-directed.

Add over time rather than dumping forty at once. A steady trickle keeps the profile looking maintained and keeps the per-profile edit allowance free for changes that are time-sensitive.

---

## Labs

### Lab 10.1 — Audit the gallery

> **Lab** · Where: **Profile** (`/b/{businessId}/profile`) · Cost: **free** · Time: ~10 min
>
> You need: Lab 0.3 (a business added). Steps 4–6 need Lab 0.4 (Google Business Profile connected).

1. Open **Profile**. The top card, **Business profile**, carries a pill reading `N photos`. Write down N. Do not press **Refresh profile** — that is a paid live fetch and you do not need it yet.
2. Scroll the photo strip. Click one to open the lightbox and arrow through the set. Note the **Google Maps** attribution in the corner; that is not decoration, it is a condition of showing this data at all ([storing Google data legally](../05-reference/storing-google-data-legally.md)).
3. If N is 10, write "at least 10, true count unknown" rather than "10". That is the ceiling from the previous section.
4. Scroll to **Make changes** and open the **Photos** field, on the **Apply with SEOG** tab. The panel lists **Current photos** — the removable set, owner-managed media only.
5. Compare the two lists by eye. Images in the public strip that are absent from **Current photos** are, in the main, not yours. Match on subject, not on file: the two lists are served as different renderings of the same photo, so crops and sizes differ.
6. Record three numbers: shown publicly, removable, and the difference.

**What good looks like.** You can name, for this business, exactly how many of its public photos you have any power over. For a well-photographed local business with an active review base, the difference is usually larger than the owner expects.

**If it went wrong.** No **Make changes** section at all means the Google Business Profile is not connected — steps 1–3 still work and are the observe-only version of this lab. An empty **Current photos** with the note *"No removable photos found. (Customer-contributed photos can't be removed via the API.)"* is not a bug: it means every visible photo came from somebody else.

**Observe-only alternative.** Run steps 1–3 on your practice business, then open **Competitors** and read the comparison row for photos. Note how many of the numbers sit at exactly 10, and write one sentence explaining why that row is nearly useless at the top of the range.

**What you just learned.** A public photo count is a capped sample and a gallery has several authors. Both facts are invisible in every dashboard that reports "photos: 10" without a footnote.

---

### Lab 10.2 — Upload photos you captured

> **Lab** · Where: **Profile** → **Photos** field (`/b/{businessId}/profile?field=photos`) · Cost: **paid** · Time: ~10 min plus shooting time
>
> You need: Lab 0.4 (Google Business Profile connected), and photos you took yourself. Skip if you are on the observe-only path — you must not write to a listing you do not manage.

1. Take three photos on your phone: the storefront from the street, one interior, one of the product or workspace. Daylight, no filters, nothing borrowed.
2. Convert to JPEG or PNG if your phone shoots HEIC, and check each is under 5 MB.
3. Open **Profile**. If the audit card lists **Add more photos** under *Needs work*, use its **Fix below** link — it jumps straight to the right field. Otherwise open the **Photos** field yourself.
4. Under **Add photos**, choose your files (up to ten per upload) and press **Upload to Google**. The price is shown on the button before you confirm.
5. Watch the count on the **Business profile** card. Then re-read the audit: the **At least 5 photos** check flips to passed once the profile crosses five.

**What good looks like.** The photo count increases by exactly the number of images that succeeded, and the profile score moves if the photo check just passed. On Google's side the images appear after review — usually minutes.

**If it went wrong.** *"Google rejected the photos — try different images"* means nothing in the batch landed; the charge is refunded automatically when an action delivers nothing. A partial result is normal and expected: uploads are attempted per image, so two can succeed while a third fails. Common causes are the wrong format, a file over the size limit, or an image too small. Note that you get no reason back per image — that is the API, not the tool.

**What you just learned.** An upload is a write to a live public record, not a file save. It queues behind Google's review, it consumes the same per-profile edit allowance as every other change, and the only evidence you will ever get about whether it worked is the count going up.

---

### Lab 10.3 — Try to remove the wrong photo

> **Lab** · Where: **Profile** → **Photos** field · Cost: **paid** · Time: ~5 min
>
> You need: Lab 10.2. Best done on a photo you uploaded in that lab, so the removal costs you nothing you wanted to keep.

1. First, find a photo in the **public** strip you would genuinely want gone — an old menu, a dark shot, a competitor's van in frame. Real businesses always have one.
2. Look for that exact image in **Current photos**. If it is not there, you cannot remove it. Write down which image it was and stop trying.
3. Now remove one of your own: hover a photo in **Current photos**, press the remove (bin) icon, and confirm on the second step. The confirmation shows the price and exists because this cannot be undone from here — the image bytes are not kept anywhere.
4. Confirm the count on the **Business profile** card went down by one.
5. For the photo from step 1 that you could not touch, write down the only real path: report it on Google Maps for a policy violation, then wait on a decision you do not control. If it is not a violation, it stays.

**What good looks like.** You end the lab able to state precisely, for this business, which photos are removable and which are permanent facts about the listing.

**If it went wrong.** *"That photo does not belong to this business"* means the image is not owner-managed media for this location — the same wall as step 2, hit from the other side.

**What you just learned.** Deletion power is scoped to media you created. Everything else is a request to Google, not an action you take. Say that sentence to a client before they ask, not after.

---

## Common mistakes

**Buying a stock photo pack for a client's listing.** Tempting because it is fast and the images are pretty. It breaches a policy that asks for media you captured, it risks rejection, and it makes the listing look like every other listing in the category. The cost is a profile that converts worse than the phone photos it replaced.

**Reporting the public photo count as a count.** Tempting because it is the number the tool shows. Above the ceiling it carries no information, so "we grew from 8 to 10 photos" may describe adding two images or adding two hundred. Say "at least 10", or go and read the owner dashboard.

**Promising photo performance reporting.** Tempting because clients ask for it and some tools display it. The data has not existed since February 2023. You will either have to invent it later or explain why the panel disappeared.

**Bulk-uploading a whole library in one session.** Tempting because you finally have the photos. It burns the shared per-profile edit allowance, can collide with anything else scheduled against that profile, and produces one lump of evidence instead of a maintained profile.

**Accepting "remove that photo" as a task.** Tempting because saying no is uncomfortable. If it is a customer photo you have agreed to something you cannot do, and you will be judged on it in a month.

## Check yourself

1. Your business shows 10 photos and your closest competitor shows 10. What have you learned about the gap between you? *(Nothing. Both are at the ceiling of what public data reports. The comparison only carries information below the cap.)*
2. A client wants a one-star reviewer's photo of a dirty table taken down. What do you tell them, and what do you actually do? *(That it cannot be removed programmatically, by you or by any tool. Report it on Maps if it breaches policy, warn that the outcome is Google's, and shift the effort to adding better photos of the same room.)*
3. Your report template has a "top-performing photo" panel. Where would that number come from? *(Nowhere legitimate — per-photo metrics ended 2023-02-20. Cut the panel.)*
4. A supplier offers 50 AI-generated interior shots, brand-matched, for less than a photographer. What is the argument against, in one sentence? *(The media policy asks for imagery you captured and excludes imagery created by other parties, so the entire batch is at rejection risk on a live listing.)*
5. Download any photo from any Google Business Profile and inspect its file metadata. What survived the trip? Now reconsider what "geotag your photos for local ranking" is claiming — and whether anything the searcher receives could carry that signal. *(You will need to check rather than assume; that is the point of the question.)*

---

**Next:** [Reviews: getting them, and answering them →](./reviews.md)
