---
title: Publishing to a Google Business Profile without getting rejected
sidebar_position: 9
description: Google post types, the undocumented character caps, the media and button rules, native scheduling, and the complete rejection checklist.
---

# Publishing to a Google Business Profile without getting rejected

A post is the only part of a Google Business Profile you write fresh, whenever you like, in your own words. Everything else is either a structured field you fill in once or content other people wrote about you.

Two things make posts worth a chapter. Several of the rules that decide whether a post survives Google's review are not in Google's documentation — one of them used to be and was removed. And the commonest rejection cause is something owners do deliberately, believing it helps.

## What a post actually is

A short, dated update attached to your profile. It can appear on the panel that shows when someone searches your name, and on your listing in Maps. It carries text, optionally one photo, optionally a button, and — for two of the three types — a start and end time.

Every post goes through content review before it becomes visible. Review is not instant and not always successful, so a post has a state: in review, live, or not approved. That state is the only per-post signal that exists.

Does posting improve map-pack position? Nobody outside Google knows, and anyone who tells you otherwise is guessing. What is observable is narrower: a post is surface a customer can act on while looking at your listing, and it is dated, so it tells a human the business is still trading. Treat it as a conversion and freshness surface, not a ranking lever.

## The three types you can publish

Google's own interface offers more types than any tool can write for you. Through the API every tool writes through, three are available:

| Type | Requires | Optional | Button |
| --- | --- | --- | --- |
| **What's New** | Post text | Photo, button | Any one button |
| **Event** | Title, full start **and** end date and time, text | Photo, button | Any one button |
| **Offer** | Title, full start **and** end date and time | Coupon code, redeem link, terms, photo | None — Google adds "View Offer" itself |

Two rules catch people out. Events and offers need a **complete** interval — start date, start time, end date, end time; "runs from Friday" is not a schedule Google accepts. And an offer takes **no button**: Google attaches its own, so an explicit one fails.

The rest are out of reach: product posts cannot be created through the API at all, and Google's alert type is gated — its own reference calls it "not always available for authoring". For those, post by hand. See [the capability matrix](../05-reference/gbp-capability-matrix.md).

## The limits that are no longer documented

Post text is capped at **1,500 characters**. An event or offer title is capped at **58 characters**.

Neither number appears in Google's current documentation. The 1,500 figure circulates on forums with no citation; the 58 is third-party lore. Both are real, and both were confirmed the only way they now can be — by sending a longer value and reading the field-level error that comes back. Nothing is created when it fails. (Verified 2026-07-22; the mechanism and the exact error text are in [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md).)

Fifty-eight feels arbitrary until you hit it, which you will, on your second offer post: "Half price first service for new customers in Kingsbridge" does not fit.

The 1,500 cap is not a target. A post is read on a phone, next to a map. The first line does the work.

## One photo, and it has to be yours

Post media is photos only, effectively one per post. No video, no gallery, no carousel.

**Video is not a limitation you can work around.** Google's own interface publishes video on a post; the API returns a server error for the same content — not a validation error saying video is unsupported, a deterministic internal failure (probe-verified 2026-07-22). UI parity is not API parity. A tool advertising scheduled video posts is either driving Google's interface with a browser or not doing what it claims.

**Use photographs you took.** Google's media policy asks for media you captured and excludes stock imagery and images created by other parties. AI-generated images fall on the wrong side of that line, and an industry is currently bolting image generation onto post publishing. Do not. Same rule as your gallery — [photos and the visual profile](./photos-and-the-visual-profile.md).

**Format.** JPEG or PNG, at least 400×300, roughly 4:3, because post thumbnails centre-crop to about that shape.

**The photo cannot be changed after publishing.** Changing it means deleting the post and publishing a new one, which resets its review and its date.

## Buttons, and the phone number trap

You can attach one button: Book, Order online, Shop, Learn more, Sign up, or Call. Every one needs a link — except Call, which takes none, because it uses the verified phone number already on your profile. That exception matters more than it looks.

> **Policy** · Google's post content policy states plainly that "we do not allow your post content to include a phone number". The policy text is Google's, quoted verbatim; our reading of it is not legal advice.

A phone number in the text is the number one rejection trigger in practice, and the most natural thing an owner writes — "call us on 0161 496 0000 to book". The Call button exists so you do not need to: write the offer, attach the button, and the number comes from the profile, where Google can verify it.

Good composers block this before you spend anything. SEOG treats a high-confidence phone pattern as a hard error, and a looser digit grouping — a date, a price — as a warning you can publish through.

## The rest of the rejection list

In rough order of how often they bite:

1. **A phone number in the text.** Most of them.
2. **Regulated goods promoted with an offer or a button.** Alcohol, gambling, tobacco and vaping, firearms, pharmaceuticals, financial services. Mentioning them is not automatically fatal; wrapping them in a promotion with a call to action is what draws scrutiny.
3. **Hotels publishing offer posts.** Google does not allow it. A category rule almost nobody knows, and it costs hospitality clients real posts. Hotels, motels, inns, lodges and B&Bs: What's New and Event only.
4. **Low-quality signals.** All-capitals reads as shouting; six or more emoji in a short post reads as gimmicky. Neither is a documented threshold; both correlate with rejection *(inference — from observed rejections and Google's low-quality content guidance)*, so treat them as warnings and rewrite.
5. **Chain-detected locations, refused wholesale.** Some locations are refused from posting entirely, with a specific error saying posting is disabled there. The repeated "more than ten locations" threshold is community lore, not contract — detection is Google-internal, with no way to test before trying. Never sell a posting retainer to a multi-location client before publishing one test post on one of their locations ([multi-location and franchise](../03-advanced/multi-location-and-franchise.md)).

A rejected post is not explained. You get the state and nothing else — which is why the checklist runs before publishing.

## Scheduling is Google's job

Scheduling is native. When you publish, you can hand Google the time you want the post to appear, and Google holds it and publishes it itself (probe-verified 2026-07-22). No queue runs on your side. If your tool is offline or your laptop is shut, the post still goes out. Deleting it before its time is what cancels it.

Two consequences, and the second is undocumented.

**A publisher queue is unnecessary.** Most commercial schedulers run their own job that wakes up and posts for you. Every such subsystem is a failure mode: a missed run is a missed post, and you hear about it from the client. A tool that hands the time to Google has nothing to fail.

**Google reviews scheduled posts up front.** A post scheduled for next Tuesday can be marked not approved today. This is the real answer to "my scheduled post was rejected before it went live", which sounds impossible and is ordinary. So checking states after scheduling a batch is not optional.

## What you can measure afterwards: almost nothing

Per-post analytics do not exist. Google discontinued its per-post insights report in February 2023, and the reporting that replaced it carries no post-level metrics. No views, no clicks, no button taps, per post, from any legitimate source. What remains is the state and a link to the post on Google.

Be blunt about this with clients and vendors: if a dashboard shows views per post, those numbers did not come from Google's reporting — ask where they came from. Evaluate posting at the profile level over time, using the metrics Google does report plus your tracked keywords ([did it work?](./did-it-work.md)). Full inventory: [what Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

One more constraint before any bulk edit: Google caps how many edits a profile accepts per minute, and it is one budget shared across every kind of edit — posts, hours, description, photos, attributes. A bulk hours update can push a post publish into a refusal ([write limits and failure modes](../05-reference/write-limits-and-failure-modes.md)).

## Labs

### Lab 15.1 — Compose against the real limits

> **Lab** · Where: **Posts** (`/b/{businessId}/posts`) · Cost: **free** · Time: ~10 min
>
> You need: Lab 0.3 (a practice business). A connected profile is *not* required — validation runs before anything touches Google, so observe-only readers can do all of it.

1. Open **Posts**. The composer sits at the top with three type tabs — **What's New**, **Event**, **Offer** — and your posts below.
2. In **Post text**, paste a block longer than 1,500 characters. The counter turns red, an error says the text must be at most 1,500 characters, and **Publish to Google** goes disabled. Trim back under the cap and watch it clear.
3. Switch to **Event**. In **Title**, keep typing past 58 characters: the field stops accepting them and the counter parks at 58/58. Same Google limit as the post text, enforced at a different moment.
4. Leave the dates empty and press **Publish to Google**. Nothing is spent — the missing-field errors appear instead, saying Google requires full start and end dates and times.
5. Type a phone number into **Post text**. A hard error tells you to use the **Call** button instead. Delete it, then pick **Call** in the **Button** selector: the link field disappears, because Call uses your profile's verified phone.
6. Switch to **Offer** and look for the button selector. It is gone.

**What good looks like.** Four different blocks fired without spending anything, and you can state both caps from memory.

**If it went wrong.** An untouched composer stays quiet by design, and "you have not filled this in" errors only appear once you attempt to publish — that is what step 4 is for.

**What you just learned.** The caps and type rules are real, enforced by Google, and mostly absent from its documentation. Pre-publish validation is not a convenience: skip it and you get a rejected post you cannot un-publish and cannot get an explanation for.

### Lab 15.2 — Draft, edit, publish

> **Lab** · Where: **Posts** (`/b/{businessId}/posts`) · Cost: **paid** (the AI draft and the publish are each metered) · Time: ~10 min
>
> You need: Lab 0.4 — a connected profile with owner access. Without one the page shows a connect card; do Lab 15.1 instead and return when you have owner access.

1. On **What's New**, pick a template under **Start from a template**. *Helpful tip* is the safest first post: no offer, no dates.
2. Press **Draft with AI**. The draft is written from the business's own details plus the template you chose, and fills the post text.
3. **Edit it.** Cut anything not true of this business, any phone number, and anything that sounds machine-written, because it was.
4. Press **Add a photo** and upload a real photograph you took — JPEG or PNG, at least 400×300, roughly 4:3. Staging it costs nothing.
5. Press **Publish to Google**, then read the state chip on the new card. Expect **In review** first.

**What good looks like.** A card with your text and photo, an **In review** chip that becomes **Live on Google**, and a **View on Google** link that opens the post on the real listing.

**If it went wrong.** A prompt to connect your profile means it is not linked with owner access. A refusal saying Google has disabled posting for this location is the chain rule — retrying changes nothing. A "Google limits profile edits" message means the profile's shared edit budget went on something else; wait a minute and republish.

**What you just learned.** Publishing is a write that Google then reviews. A tool reporting success means Google accepted the request, not that it approved the content.

### Lab 15.3 — Schedule one, and prove Google holds it

> **Lab** · Where: **Posts** (`/b/{businessId}/posts`) · Cost: **paid** · Time: ~5 min now, one minute later
>
> You need: Lab 15.2.

1. Compose a second short What's New post — write these two sentences yourself.
2. Turn on **Schedule this post**. A date and time field appears, defaulted to tomorrow at 10:00 local. Note the line beside it: Google publishes at this time, and deleting the post before then cancels it.
3. Try a time one minute from now. It is refused — a scheduled time must be far enough ahead to survive the round trip.
4. Set a time a day or two out and press **Schedule on Google**; the button relabelled itself when you flipped the toggle. The card now reads **Scheduled for** your chosen date and time.
5. Close the tab and do nothing until the time passes.

**What good looks like.** The post appears at the time you chose, with your tool closed and your account logged out. Nothing on your side ran.

**If it went wrong.** A chip reading **Not approved** *before* the publish time is the up-front review in action — Google rejected a post it had not published yet. Work the rejection list, fix the text, schedule a replacement.

**What you just learned.** The scheduling queue belongs to Google. Any layer between you and it — a cron job, a worker, a subscription that must stay live — is added risk, not added capability.

### Lab 15.4 — Refresh the state, then remove the test post

> **Lab** · Where: **Posts** (`/b/{businessId}/posts`) · Cost: **paid** (both re-reading states and deleting go to Google) · Time: ~3 min
>
> You need: Lab 15.2, and ideally Lab 15.3.

1. Press **Check statuses**, top right. It only appears once you have at least one post.
2. Read the notice underneath — a count of statuses updated from Google, or a confirmation they are current. This is the entirety of per-post telemetry.
3. See what changed on the cards: In review may have become Live on Google, or Not approved.
4. Delete the Lab 15.2 post with the bin icon, then check the live profile: it is gone from Google too.
5. If the Lab 15.3 post has not published yet, delete it and watch it never arrive.

**What good looks like.** You can state precisely what Google tells you about a post: its state, and a link to it. Nothing about who saw it.

**If it went wrong.** A chip saying the status is unknown means the stored copy and Google have drifted — check again. A card labelled as simulated means no live profile is connected.

**What you just learned.** Deletion is permanent and immediate on Google as well as in your tool, and it doubles as the only way to cancel a scheduled post or replace a published photo.

## Doing this without SEOG

You can write posts directly in Google's Business Profile interface, and you should know how, because it does things no tool can: video, product posts, editing a published post's photo. What you give up is validation against undocumented limits, a record of what you published and when, and working a portfolio without logging into each profile ([doing it without SEOG](../99-appendix/doing-it-without-seog.md)).

## Common mistakes

**Putting the phone number in the post so people can call.** Tempting, because it is the point of the post. It is the biggest cause of rejection, and the Call button works better anyway — one tap, using the number Google has already verified.

**Publishing the AI draft as written.** A draft removes the blank page. Shipped unedited it reads like every other business in the category, and it occasionally invents a service you do not offer. Generated *images* are worse: a policy violation and a real rejection cause.

**Trusting a scheduler's queue.** If a tool holds your posts and publishes them itself, every outage on its side is a missing post on a client's profile. Google will hold the post. Prefer the tool that lets it.

**Selling a posting retainer to a chain before testing one location.** Chain-detected locations are refused wholesale, with no advance check. One test post tells you whether the service is deliverable at all.

## Check yourself

**1. Your tool reported a successful publish. The post never appeared. What do you check first, and what did that success message prove?**
Check the post's state and refresh it from Google. Success means Google accepted the write, not that it approved the content — in review and not approved both follow a successful publish.

**2. A client asks for views and clicks per post. What do you tell them, and what do you offer instead?**
That per-post metrics were discontinued in February 2023 and no legitimate source has them. Offer profile-level performance across the posting period plus your tracked keywords, and say explicitly that you measure the profile, not the post.

**3. You schedule four weeks of posts on the 1st. When is the earliest a rejection can arrive?**
The same day — Google reviews scheduled posts up front, so a post set for the 28th can be rejected on the 1st.

**4. A hotel client wants an offer post reading "20% OFF ROOMS — CALL 555-0148 TO BOOK!". Name every reason it fails, then rewrite it.**
Four: hotels may not publish offer posts at all; there is a phone number in the text; the text is all capitals; and an offer post cannot carry a Call button anyway. The rewrite is a What's New or Event post, sentence case, describing the deal, with the Call button attached and the number nowhere in the text.

---

Posts are the last thing you *write* on the profile. The next chapter turns the instruments outward, onto the businesses ranking above you.

---

**Next:** [Reading a competitor off their public data →](./competitors.md)
