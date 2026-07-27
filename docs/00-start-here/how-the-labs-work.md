---
title: How the labs work
sidebar_position: 2
description: The lab format used throughout the manual, the workbench you will run them in, and the difference between reading data and fetching it.
---

# How the labs work

Theory in this manual is followed by labs. A lab is a short, concrete exercise you run on a real business, with a stated cost and a stated "what good looks like" so you can tell whether you did it right.

Every lab looks like this:

### Lab 0.1 — Read a lab

> **Lab** · Where: this page · Cost: **free** · Time: 1 min
>
> You need: nothing.

1. Read the block above.
2. Note the four facts it always gives you: *where* the work happens, what it *costs*, how long it *takes*, and what you need to have done first.

**What good looks like.** You know, before starting any lab, whether it will cost you anything.

**Why it matters.** Local SEO tools meter live searches against Google. A guide that does not tell you what an action costs is not respecting your money.

---

## The workbench

The labs run in **SEOG** (`app.seog.ai`). Creating an account is free and takes about a minute — you will do it in [Set up your workbench](./set-up-your-workbench.md). New accounts start with credits included, which is enough to work through the practical chapters on one business.

We built SEOG, and we wrote this manual. That is worth knowing up front, and it is also why the labs can be precise: we can tell you exactly which screen to open and exactly what you should see, which no tool-agnostic guide can do.

## Reading is free. Fetching is not.

This is the single most useful economic fact in local SEO tooling, and it is not a SEOG quirk — it is true of every serious tool in this space, because it reflects what actually costs money.

**Reading stored data is free and unlimited.** Once something has been fetched from Google on your behalf, it is yours. Opening your rankings, re-reading your reviews, scrolling your grid history, comparing snapshots you took last month — free, as many times as you like, forever. Paid data is never lost and never re-charged.

**Fetching new data costs.** A rank check is a live search against Google. A geo-grid scan is one live search *per grid point* — a 7×7 scan is 49 of them. An AI draft is a call to a language model. Publishing a reply writes to Google's API. These cost real money to run, so they are metered.

![The Rankings screen for a tracked keyword: position #1, summary tiles, a list of rivals, a "Checked 2h ago" timestamp and a "Check now" button](../../static/img/screens/rankings-tracked.png)

*Both halves of the rule on one screen. The position, the summary tiles and the rivals list are stored results — open this page fifty times today and it costs nothing. "Checked 2h ago" tells you when the data was last fetched, and only the buttons that go back to Google — **Track**, **Check now** — spend anything.*

Two habits follow from this, and they are worth forming early:

1. **Look at what you already have before fetching more.** Most questions a beginner tries to answer with a fresh scan are answerable from last week's scan. This is the biggest difference between someone who spends a little on tooling and someone who spends ten times as much for the same insight.
2. **Fetch on a schedule that matches how fast the thing actually moves.** Map-pack positions drift over weeks, not hours. Scanning daily tells you nothing that scanning fortnightly would not, and costs fourteen times as much.

> **Note** · SEOG shows the exact price on the button before you run anything, and refunds automatically if the action fails. Nothing in this manual will surprise you with a charge. Costs in labs are marked **free** (reads stored data) or **paid** (fetches new data) rather than with hard numbers, because prices change and a manual should not lie to you six months from now.

## Doing the labs without SEOG

Every lab names the underlying concept and where the raw data comes from, so nothing here is locked to one tool. If you want to work by hand:

| Lab type | Do it manually with |
| --- | --- |
| Rank checks | Incognito search plus a location override in Chrome DevTools |
| Geo-grid | Repeat the above from a dozen coordinates, record in a spreadsheet |
| Profile audit | The Google Business Profile dashboard, read every field |
| Citations | Search `"Business Name" "Phone"` and check each result by hand |
| Reviews | The GBP dashboard review tab |
| AI visibility | Ask ChatGPT, Gemini or Perplexity the question yourself, record the answer |

It all works. It is simply slow, and it does not keep history — which turns out to matter enormously, because local SEO is judged on movement over weeks, and you cannot see movement you did not record. That is the real argument for tooling, and it is worth understanding rather than taking on faith.

## Conventions used throughout

| Convention | Meaning |
| --- | --- |
| `/b/{businessId}/rankings` | A page inside the SEOG app. `{businessId}` is your business — the app fills it in. |
| **Bold UI names** | Something you click, exactly as it is labelled on screen |
| *Inference* | Not documented by Google; our reading of observed behaviour |
| Cost: **free** | Reads stored data; run it as often as you like |
| Cost: **paid** | Fetches new data; the exact price is shown before you confirm |

---

**Next:** [Set up your workbench →](./set-up-your-workbench.md)
