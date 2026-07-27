---
title: Checking what assistants say about you
sidebar_position: 3
description: Three labs — read the AI panel cold, run the readiness check, and probe two assistants by hand — plus the mistakes that turn one AI answer into a bad report.
---

# Checking what assistants say about you

Three labs turn the last two pages into something you have seen for yourself. Lab 5.3 uses the geo-anchored prompt shape from [the opening page](./index.md#where-location-enters-and-where-it-does-not).

## Labs

### Lab 5.1 — Read the AI panel cold

> **Lab** · Where: **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **free** · Time: ~10 min
>
> You need: a business added (Lab 0.3). Ideally at least one tracked keyword (Lab 3.1).

1. Open **AI Visibility** from the business menu. Run nothing. Click no buttons.
2. Read the three tiles across the top: **Presence**, **Recommendations**, **Authority**. If any of them carries a small **Example** pill, that number is illustrative and is not about your business — note which ones.
3. Read the **AI mention rate** block below it, and the three engine tiles beside it (**Gemini**, **ChatGPT**, **Claude**). Note which show a **Not connected** badge.
4. Scroll to **Where AI mentions you**. This is the keyword × engine matrix. Each cell is one of: *Mentioned*, *Not mentioned*, *Sample*, or a dash for never checked. Write down how many cells are actually live.
5. Keep scrolling: **How AI recommends you** — which holds the co-mention list headed *Who AI recommends alongside (or instead of) you* — then **Authority** and **Sources cited by AI**, then the **AI readiness** card. Read the readiness score and its tier, but do not press **Check now** yet.
6. Two of those sections are instruments for other jobs, so note them and move on: the co-mention list belongs to [reading a competitor off their public data](../../02-core-practice/competitors/index.md), and **Listings consistency**, at the foot of the page, to [citations and NAP consistency](../../02-core-practice/citations-and-nap/index.md).

**What good looks like.** You can say in one sentence how much of that screen is a measurement of your business and how much is a placeholder. On a new business the honest answer is usually "almost none of it" — and the page says so, which is the point.

**If it went wrong.** If the matrix is replaced by a sample layout, you have no tracked keywords yet; add one first (Lab 3.1). If an engine says **Not connected**, checks on it return clearly-labelled sample rows rather than live data — and sample rows never count toward any rate.

**What you just learned.** Every AI-visibility dashboard shows this mix of measured, unmeasured and illustrative numbers. Telling them apart at a glance is the skill; reading the percentages is not.

### Lab 5.2 — Run the readiness check and read all nine factors

> **Lab** · Where: **AI Visibility → AI readiness** (`/b/{businessId}/ai-visibility`) · Cost: **paid** · Time: ~10 min
>
> You need: Lab 5.1.

1. On the **AI readiness** card, press **Check now**. The price is shown on the button before you confirm.
2. When it finishes, read the score and tier — 70+ is *Strong*, 40–69 is *Building*, below 40 is *Low readiness*.
3. Open **What goes into this score** and read all nine rows. Each shows either `+weight` (passed) or `0 / weight` (failed).
4. Write down every failing factor with its weight, in descending weight order. That list is your work order, and you will use it again in [the ninety-day plan](../../04-operating/the-ninety-day-plan/index.md).
5. Note which two factors, passed together, would already put you at the *Building* threshold.

![The AI readiness card on an owner-connected profile, scoring 53 out of 100 and tiered Building, above a list of nine weighted factors: review volume 0/22, rating +18, website to cite +12, AI-agent-ready website 0/8, fresh reviews +10, rich description 0/9, structured attributes 0/8, review engagement +7, opening hours +6](../../../static/img/screens/owner-ai-visibility-full.png)

*The readiness card on an owner-connected profile, at the foot of the same page. The nine rows are the entire rubric: each shows the weight it earned or the weight it lost. Review volume is the heaviest factor and this business is scoring zero on it, with the threshold stated on the row. Note the card reads **Not checked yet** while still showing a score — the estimate is built from stored profile signals, so the check re-pulls the data behind it rather than asking any assistant anything.*

**What good looks like.** A ranked list of gaps with a number beside each, not a vague sense that the profile "needs work". You should also notice that the two heaviest factors by a wide margin are review volume and rating — reputation is the gateway to AI answers, and the rubric is built to say so.

**If it went wrong.** If the score does not move after a Google edit, remember the check re-pulls profile and review data, and a Google edit takes time to publish. If the AI-agent-readiness factor reads as unmeasured rather than failed, no website analysis has run yet — a different screen and a different lab ([Making the site readable by an AI agent](../../02-core-practice/making-the-site-readable-by-agents/index.md)).

**What you just learned.** Readiness is an *estimate from profile signals*, computed without asking any AI anything. It is not a measurement of what assistants say about you — that is the matrix above it. Two layers, two meanings; conflating them is the most common mistake in this subject.

### Lab 5.3 — Ask it yourself

> **Lab** · Where: any two AI assistants, in a browser · Cost: **free** · Time: ~15 min
>
> You need: one keyword your business should plausibly win.

1. Take the prompt shape from earlier in this chapter. Fill in your business's coordinates (read them off Google Maps) and your keyword. Do not name your business.
2. Put it to two different assistants — pick two of ChatGPT, Google's Gemini, Claude or Perplexity.
3. For each answer, record four things separately: (a) is your business **named**, (b) is your **domain** in the source list, (c) what **stance** does the sentence about you take, (d) which other businesses were named.
4. Now compare the two source lists. Count how many domains appear in both.
5. Run the *same* prompt on the *same* assistant a second time, a few minutes later. Record whether the named set is identical.

**What good looks like.** Four honest records, and two observations you will not forget: the two engines' source lists barely overlap, and the same engine did not return the same list twice. Both are this chapter's thesis, arrived at by hand.

**If it went wrong.** If both engines return generic advice ("check Yelp or ask around") rather than named businesses, your keyword is too broad or the location is ambiguous — add the city name and re-run. An answer naming no businesses is not a failure of your business; it is an answer that left the question, and in a proper method it leaves the denominator too.

**What you just learned.** The businesses in step 3(d) are a competitor set the AI itself chose for your query — free, and often more honest than one you would have written. You will use this in [Reading a competitor off their public data](../../02-core-practice/competitors/index.md).

## Common mistakes

**Treating an AI answer as a ranking.** There is no position one. The order of names in a paragraph is weak evidence of preference at best, and the source list is a bibliography, not a leaderboard. People screenshot "we're first in ChatGPT" and build reports on it; the same prompt an hour later frequently puts someone else first.

**Optimising the website for AI when the AI is reading Yelp.** The expensive one. If your probe cites four directory pages and no business websites, what moves the answer is your presence and consistency on those four directories — not another blog post. The source list tells you where to work, and it is on screen for free after any check you have already paid for.

**Asking a branded question.** "Is *Acme Plumbing* the best plumber in Leeds?" — your own name in place of the example — gets a warm paragraph from almost any assistant, almost always. It measures the model's agreeableness, not your visibility. Unbranded or it is not a probe.

**Assuming what is true of one engine is true of all.** Different grounding, different index, different place data. A finding on Gemini is a finding about Gemini — which is why a single-engine "AI visibility score" is a narrower claim than it sounds.

## Check yourself

1. You are named in an assistant's answer but your domain is not in its source list. Which axis did you win, and where should the work go next?
2. You rank #1 in the map pack at your own front door and are never named by any assistant. Name two mechanisms from this chapter that could produce that, and which one you could test today.
3. A vendor's report says "AI presence: 100%". What is the likely explanation, and what would you ask them to prove it is a measurement?
4. The same geo-anchored prompt run twice returns two different sets of three businesses. Is one run wrong? What is the smallest honest thing those two runs let you say?
5. Which two of the nine readiness factors carry the most weight, and why would a rubric built around AI answers put those first?

---

**Next:** [What people actually search, and how to model it →](../what-people-actually-search/index.md)
