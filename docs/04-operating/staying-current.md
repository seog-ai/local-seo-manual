---
title: Staying current when the ground moves
sidebar_position: 6
description: Google changes local search without announcing most of it. A maintenance routine — what to watch, how to re-probe, and how to tell a real change from folklore.
---

# Staying current when the ground moves

The expensive part of this job is not learning it. It is noticing, before a client does, that something you know stopped being true. Google retires capabilities without announcing them, edits policy pages with no version history, and changes ranking behaviour it never described in the first place. The industry fills each silence with confident guesses within days.

What you sell on a retainer is being right about a system that moves. This chapter is the routine that keeps that true — around two and a half hours a month, plus a rule for deciding what a given rumour is even about.

## Three kinds of change, detected three ways

Almost everyone applies one method — reading the news — to all three. It works for the first, is slow and unreliable for the second, and is actively harmful for the third.

| Kind of change | Example | Announced? | How you detect it |
| --- | --- | --- | --- |
| **Policy** | Two review-solicitation practices banned on 17 April 2026 | No — new text on a help page | Diff the pages you cite |
| **Capability** | Q&A API discontinued 3 November 2025, public panel phased out from that December; per-post metrics gone since February 2023 | Rarely, and late | Re-probe; treat any unexpected failure as a signal |
| **Behaviour** | "The pack got more local this month" | Never | Your own stored series, over months |

Policy changes are *findable* but nobody pushes them to you. The two new review-solicitation clauses appeared on Google's prohibited-content page on 17 April 2026 with no announcement; they were spotted the same day by Amy Toman, a volunteer Google Diamond Product Expert reading the page, and reached the industry through her post rather than through Google. Standing agency advice was in breach for weeks. Capability changes are worse, because the failure is silent and lands on your side — something errors inside a job nobody watches, and you find out when a client asks why the posts stopped.

Behaviour changes are what everybody writes about and nobody can establish. Positions move constantly, because rank is a sort over near-tied scores and a sort is discontinuous ([reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid.md)). One account's movement is never evidence of a system change, and almost every "I've noticed Google is now…" post was built from exactly that.

Dated entries for the first two kinds — what changed, when, and what it broke — are in [the local search changelog](../05-reference/local-search-changelog.md). Read it before you accept anyone's account of what Google "just" did.

## Documentation is a lagging indicator

Google's deprecation schedule for the Business Profile surface carries a recent stamp and a stale record: read on **2026-07-27**, its most recent discontinuation entry was dated **July 2024**, and it still did not list the Q&A API that Google itself discontinued on 3 November 2025 — sixteen months later, and eight months before we looked. The retirement was announced, but on the Q&A API's own change log, not on the page whose job is to list retirements. That is not sloppiness. It is a property of all vendor documentation: **it records intent at some past moment, not current state.**

> Documentation establishes what was intended. Only a call establishes what is.

## Facts have half-lives, and yours are not equal

A flat re-check schedule wastes time on durable things and misses volatile ones. Sort what you know by how fast it rots.

| Class of fact | Example | Re-check |
| --- | --- | --- |
| Mechanism | Rank is a function of a coordinate | Years — when a surface is replaced, not on a calendar |
| Structure | Which post types exist; which fields trigger re-verification | Twice a year |
| Policy text | What you may ask a customer for | Quarterly; changes silently, more than once a year |
| Capability | Whether a specific write path still works | Quarterly, and on any unexpected failure |
| Published rates | AI Overview incidence, ranking-factor weights | Annually, when an edition lands — vendor surveys either way |
| AI engine behaviour | How an assistant gets the user's location | Months. The fastest-rotting material in this manual |

The last row deserves a warning. ChatGPT shipped opt-in device-location sharing on iOS and web on **26 March 2026** — off by default, and Android still listed as coming *(as read 2026-07-27; re-check before citing)*. Every AI-visibility series crossing that date holds a discontinuity that has nothing to do with the business being measured. Dating engine changes is what separates that chart from a random walk with a story attached.

## The watchlist, in tiers

Weight every source by one question: **can I reproduce what it claims, and is it dated?** Anything failing both is entertainment.

**Tier 1 — primary text.** Business Profile representation guidelines; the Business Profile API policies (which do publish a *last updated* date — still 2025-08-28 when re-read on 2026-07-27); the Maps user-contributed-content policy; the Maps Platform terms. These decide what you may do and what you may quote, and they change with no announcement, no changelog and no feed.

**Tier 2 — Google's announcements.** Company blog, Search Central, "what's new" in Business Profile Help. A minority of changes, skewed to the flattering ones.

**Tier 3 — full-time watchers.** Search Engine Roundtable; Sterling Sky, Near Media and Whitespark; PPC Land for policy text; and the Business Profile community forum, where Product Experts meet the edge cases first. Fast and often right, but second-hand.

**Tier 4 — noise.** Undated posts, agency blogs recycling each other, generated "complete guide" pages. The tell: no date, no source, no way to reproduce, and a call to action.

Nothing in Tier 3 or 4 is ever the basis for an action. It is the basis for a *check* against Tier 1, or a probe.

## The diff habit

Tier 1 documents have no version history, so the highest-value twenty minutes of your month is making one yourself. Keep a dated local copy of every page you cite; once a month take a fresh copy and diff it. When a clause moves you see the exact words that changed, on a date you can name — which is what you need when a client asks why the deliverable you sent in March says something different from what they read last night.

Two constraints. This is a handful of pages read as a human would, saved for your own records: do not build a crawler over Google properties, and do not accumulate anything redistributable ([storing Google data legally](../05-reference/storing-google-data-legally.md)). And help-centre pages are heavily scripted and archive badly, so public archives are a partial fallback at best *(inference — observed while trying to recover prior wording)*.

You have watched the app do this to something else: the **Activity** panel on `/b/{businessId}/competitors` compares each refreshed competitor snapshot against the stored one and raises a line when the difference crosses a threshold — a rating drop, a burst of reviews, a batch of new photos — and only for the rivals you have left on the watch list. Two states, a comparison, and a rule about what counts as news. Apply that by hand to four policy pages and you have change detection for the part of your business nobody will notify you about.

## Re-probing, and probe hygiene

For capability questions the only instrument is a call. A **probe** is one request whose response reads as a verdict, stated precisely enough that a stranger can repeat it. Part V of this manual is a probe log rather than a documentation summary, and this section is why ([how to read this reference](../05-reference/how-to-read-this-reference.md)).

Four verdicts are possible. **Works.** **Gone** — it used to and now refuses. **Never worked** — the interface offers it and the programmatic path never did. **Undocumented but working** — liable to vanish; never promise it without a fallback.

The third turns on one distinction, and the *shape* of the failure gives it to you. A *validation* error means the system understood you and declined; a *server* error on well-formed input usually means the path was never built. That is how video-on-a-post was settled: Google's interface publishes video to a post, and the API fails with a server error on identical content *(probe-verified 2026-07-22)*. Interface parity is not API parity ([the capability matrix](../05-reference/gbp-capability-matrix.md), [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md)).

Hygiene, because this is where people damage listings they do not own:

1. **Probe on a listing you own.** Never a client's. A probe is an experiment and experiments fail.
2. **Prefer probes that create nothing** — where the *failure* is the answer. If it must write, write something you would have published anyway, then remove it.
3. **Record input, output, date and verdict.** A probe you cannot restate is an anecdote.
4. **Re-stamp the date even when nothing changed.** "Last verified 2026-07-22, unchanged" is a fact, and a valuable one.
5. **Do not loop.** One probe answers a yes/no question; a thousand answer it a thousand times while looking like something else. Breadth of distinct places, not call volume, is the signature that gets accounts restricted.

On the AI surfaces the equivalent is a fixed prompt set run against unchanged anchors, so a change in the answer is a change in the engine, not in your question ([AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md)).

## Real change, or folklore? Five questions

Run any claim through these in order. Most die on the first two.

1. **Is it dated and sourced?** An undated claim is unusable whether or not it is true, because you cannot tell what it contradicts. The date is worth more than the claim.
2. **Is this a change, or a first noticing?** Most "Google just started doing X" is somebody meeting a year-old behaviour. The test: does anyone hold a *dated observation of the previous state*? Usually nobody does — so nobody can say when it changed, so nobody knows that it did.
3. **Could the observation survive normal churn?** A claim built on one business over one week is noise with a narrative wrapped round it.
4. **Did the instrument change instead?** A tool default, a grid preset, an engine's location handling — each produces a step that looks exactly like a change in the world ([why two tools disagree](../03-advanced/why-two-tools-disagree.md)). Rule out your own equipment before you accuse Google.
5. **Does it cash out into a different action?** If your response is what you would have done anyway, the claim is untestable. The ones worth an afternoon would make you **stop** doing something.

Then choose one response, out loud. **Log it** — no action, correct for most changes and the option the industry almost never takes. **Verify it** — a diff or a probe, converting a rumour into a dated fact you own. **Act on it** — only on verified changes.

## Your own change log

Two columns, dated, per engagement. **Column A: what you changed** — edits, replies, posts, citations, site work. **Column B: what changed underneath you** — Google policy and capability changes, engine changes, and changes to your own instruments: a new tool, a different grid preset, a keyword's search point moved.

Column A you get for free: fetched cards are stamped with their fetch time, profile-score snapshots are written at most once per business per day and draw **Profile score over time**, keywords keep their position history, and grid scans are dated ([did it work?](../02-core-practice/did-it-work.md)).

Column B you keep by hand. No tool has it, including this one — the app records what *it* did, not what Google did, and a chart that steps for external reasons looks identical to one that steps because you were good. Without column B, every step gets attributed to column A by whoever tells the story first. Sometimes that helps you. Eventually it will not.

## The routine, and what it costs

**Weekly, about twenty minutes.** Skim Tier 2 and Tier 3. Log dated, sourced items. Act on nothing.

**Monthly, about thirty.** Diff your Tier 1 pages. Re-read the log for anything that reached "verify" and stalled.

**Quarterly, about two hours.** Re-probe the capabilities your service depends on, and re-date your notes including the unchanged ones. Reconcile your log against [the local search changelog](../05-reference/local-search-changelog.md), and read the new ranking-factors survey when an edition lands.

**On trigger.** A write that used to work fails; a client forwards an article; a series steps.

That sums to about two and a half hours a month — the whole maintenance cost of remaining the person who is right, and the most defensible line on an invoice. Your client can read the same posts you can; what they cannot do is tell which apply to them.

Which is also how to communicate a change: **before they read about it**, in three sentences. What changed and when. Whether it affects them. What you are doing. When the honest answer is "this does not affect you", send that too — manufacturing urgency out of a routine update spends credibility you will want the day something real happens ([reporting to someone who is paying for it](./reporting-to-a-client.md)).

> **Without SEOG** · Nothing here needs a platform. The diff habit is a folder and a text comparison; the change log is a spreadsheet; probes are calls you make yourself. A tool buys you column A kept automatically, stamped with dates you did not have to remember — [doing all of this without SEOG](../99-appendix/doing-it-without-seog.md).

## Labs

### Lab 31.1 — Build the source file and take the first snapshot

> **Lab** · Where: your own browser (no SEOG) · Cost: **free** · Time: ~30 min
>
> You need: nothing. Do this before you take a paying client.

1. Create a folder `sources/`, with a subfolder named for today's date.
2. Open each Tier 1 document. Save the readable text into the dated folder, and add a `README` line: the URL, the date you read it, and any *last updated* date the page publishes.
3. In the same `README`, write one sentence per document: **what would change for my clients if this page changed.** A document you cannot answer that for does not belong in the file.
4. Add a line for your instruments — rank tool, grid preset, AI prompt set — and today's date. Set a monthly reminder titled with the folder path, not the words "check SEO news".

**What good looks like.** Four dated text files and a `README` where every entry has a stated consequence.

**If it went wrong.** *No last-updated date on the page* — most have none, so your read date is the anchor, which is why the folder exists. *You cannot state a consequence for one page* — either you do not understand what it governs, or you copied it off someone else's list.

**What you just learned.** A source without a date is not a source. Version control can be imposed on documents that lack it, which turns "I think the policy used to say something else" into a diff.

### Lab 31.2 — Find where the rules are cached, and date them

> **Lab** · Where: **Posts** (`/b/{businessId}/posts`) · Cost: **free** · Time: ~15 min
>
> You need: your practice business added (Lab 0.3). This lab publishes nothing.

1. Open **Posts** and begin composing a **What's New** post. Do not publish.
2. Paste a very long body — a few thousand characters of any filler. The live issue list appears as you type. Read it: it names a limit. Write the number down.
3. Switch the type to **Event** and give it an over-long title. Note the second, much smaller limit, and the requirement for a complete start **and** end date and time.
4. Now answer the question this lab exists for: **where did those numbers come from, and when were they last true?** Neither appears in Google's current documentation; both were established by sending an over-long value and reading the field-level error that came back ([publishing without getting rejected](../02-core-practice/publishing-without-getting-rejected.md), verified 2026-07-22). Note what it would cost to re-establish them today — not nothing, since the only way to test a write limit is to attempt a write. Close the composer without publishing.

**What good looks like.** Two numbers, a date, and a clear statement that the validator is a *cached probe result* — second-hand knowledge with an expiry, exactly like documentation.

**If it went wrong.** *No issue list appears* — validation runs only once the composer is touched; type into the body first. *You published by accident* — delete the post, and note that the deletion is itself a write against Google.

**What you just learned.** Every rule your tooling enforces was a fact somebody verified on a date, and almost nothing exposes that date. "Probed 22 July 2026, not re-checked since" is honesty the market does not offer, and it costs nothing to be first.

### Lab 31.3 — Referee a change claim against your own record

> **Lab** · Where: your browser, plus **Overview** and **Rankings** · Cost: **free** · Time: ~25 min
>
> You need: a change claim from the last ninety days — a blog post, a forum thread, a client's forwarded email — and a few weeks of your own stored history.

1. Write the claim in one sentence, then fill in three fields: **who observed it**, **on what date**, **what the observation was**. Leave blanks; do not infer.
2. Run the five questions in order. Stop at the first it fails and record which.
3. If it survives all five, look for it in your own record. Open **Overview** and read **Profile score over time**; open **Rankings**, select a keyword, read its position history. You want a step at or shortly after the claimed date — not a trend, a step.
4. Write down what else could have produced whatever you found: a refresh you ran, a preset you changed, a rival's listing appearing or vanishing, an ordinary re-sort.
5. Deliver a verdict in one of three forms — **not established** (naming the failing question), **consistent with my data but not attributable**, or **verified, here is the probe or the diff** — and log it in column B with today's date. Including the rejected ones. Especially those.

**What good looks like.** Most claims land at "not established", usually failing question 2, and you can name the failing question rather than express a general suspicion.

**If it went wrong.** *History too short to show a step* — record that as the finding and repeat in six weeks. *A step that lines up beautifully* — work step 4 harder than feels necessary.

**What you just learned.** Refereeing is not scepticism, it is a completed form. Your own dated history is what lets you argue about a change rather than repeat what you read.

## Common mistakes

**Acting on the news.** Reading a change and implementing it is the industry default and the source of most untraceable work. The chain is log → verify → act, and most items stop at step one. Skipping to step three also destroys attribution: you made two changes that month and cannot separate them ([did it work?](../02-core-practice/did-it-work.md)).

**Asking an assistant whether something is still supported.** The training material is Google's out-of-date documentation plus generated "2026 guide" articles derived from it, several of which rank today and describe capabilities dead for months. The answer will be fluent, confident and up to two years behind. Use an assistant to find the primary page, never to tell you whether it is current.

**Never logging instrument changes.** You switched grid presets in month two, the coverage line stepped, and the report attributed it to the category fix. Nobody lied — the instrument change was not written down, so it could not enter the explanation.

**An urgent email about every update.** Tempting because it demonstrates vigilance, and it inverts: after the third one the client stops reading anything you send about a change.

## Check yourself

Answer against your actual files and clients, not in the abstract.

1. **Name the primary documents your service depends on, and the date you last read each.** Any you cannot date is one you are quoting from memory in front of paying customers.
2. **"Google started favouring businesses that post weekly, since June."** Which of the five questions does it fail first? *(Question 2 — nobody holds a dated observation of the previous state.)*
3. **Name one capability your delivery depends on that would fail silently, with a client noticing before you do.** Write its probe and its cadence. If you cannot name one, you have not looked at what runs unattended.
4. **Which fact in your standard client report has the shortest half-life?** For most people it is something about an AI surface, and most reports do not date it.
5. **A well-evidenced change lands and does not affect your clients. What do you send, and why send anything?** *(Three sentences: what changed, that it does not affect them, why not. Because the next one might, and that message's value depends on this one existing.)*

---

That closes Part IV, and the teaching half of this manual. What follows does not teach — it settles questions, one dated fact per heading, with the probe that established each. It is also what goes stale fastest, which is why every entry carries the date it was last checked, and why a correction with a probe attached is the most useful thing anyone sends us ([contributing](../99-appendix/contributing.md)).

**Next:** [How to read this reference →](../05-reference/how-to-read-this-reference.md)
