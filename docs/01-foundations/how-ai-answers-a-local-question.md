---
title: How an AI assistant answers a local question
sidebar_position: 5
description: What happens between "best plumber near me" and a named recommendation — retrieval, grounding, citation, and why every assistant gives a different answer.
---

# How an AI assistant answers a local question

Ask Google for a plumber and you get a ranked list of places. Ask ChatGPT the same thing and you get three names in a paragraph, with links underneath. These look like the same answer in different clothing. They are not. They are produced by different machinery, from different data, with location entering at a completely different point.

This chapter is about that machinery. Not how to change the answer — that is [Part III](../03-advanced/changing-the-ai-answer.md) — but what the answer actually *is*, so that when you measure it later you know what you are measuring.

## The four steps

Every assistant answering a local question does roughly the same four things. The differences between engines live inside step two.

**1. It decides whether to look anything up.** Asked "what is a French drain", a model answers from what it already knows. Asked "best plumber in Leeds", it cannot — that is a fact about the world that changes weekly. So it calls a search tool. The decision is made by the model, not by a rule, which is the first place variance creeps in.

**2. It searches.** This is the step that decides who gets named, and the step nobody looks at. The model issues text queries to a search backend and gets back pages. Different assistants are wired to different backends: Google's assistant grounds in Google Search and Google's own place data; others call a web-search tool over a different index, sometimes supplemented by a third-party place provider. Same question, different result sets, before a word of the answer is written.

**3. It reads and writes.** The model reads what came back — a Yelp category page, a "10 best plumbers in Leeds" listicle, two business homepages, a Reddit thread — and composes prose grounded in it. The businesses it names are, overwhelmingly, businesses that appeared in the text of those pages.

**4. It attaches sources.** The links underneath are the documents consulted. They are not a ranking, and not proof that a given source caused a given name. They are a bibliography — and the most useful part of the output for your purposes, because they tell you which pages the machine was reading when it chose who to recommend.

The consequence of step three is the most important thing in this chapter: **an AI assistant does not read the map pack.** It reads pages *about* your market. Your map-pack position and your presence in an AI answer are outputs of two retrieval systems reading two different corpora. They correlate — both favour well-reviewed, well-established businesses — but they are not the same question, and a business can be strong in one and absent from the other.

## Where location enters, and where it does not

In the map pack, location *is* the query. The search happens at a coordinate, the results are computed for that coordinate, and distance is a first-class ranking force — which is why rank is [a map rather than a number](./rank-is-a-map-not-a-number.md), and why [proximity dominates](./relevance-distance-prominence.md) at short range.

In an AI answer, location is a *string*. It arrives one of three ways: you typed a place name, the assistant inferred one from context, or the assistant had your device location and put it into the search query. Then it is passed to a text search, and from there the system is doing retrieval over documents. Nothing in the pipeline computes the distance from you to a business and weighs it.

Two things follow.

First, the proximity decay that governs a geo-grid is much weaker inside an AI answer *(inference — our reading of the mechanism, consistent with the observation that a city-level query returns roughly the same businesses regardless of which neighbourhood you ask from; we have not run a controlled test)*. A business that vanishes from the map pack two miles from its door can still be named by an assistant, because the assistant is not measuring the two miles.

Second, **location handling in these products is young and changes under you.** ChatGPT did not share device location with its search tool by default; an opt-in setting for it shipped in late March 2026. That single change invalidates much of the published "we tested AI local search" writing, because earlier tests were measuring an engine that often had no reliable idea where the user was standing. Check anything you read on this subject against its publication date before acting on it. *(Stated as of 2026-07; re-check before citing.)*

This is why probe design matters. To learn what an assistant says about your market, the question must carry the location explicitly and must not name the business:

> Someone near latitude `lat`, longitude `lng` asks: "`keyword`". Recommend the specific local businesses that best answer this, by name, citing your sources.

(Substitute your own coordinates and your own keyword for the three placeholders.)

Unbranded, so the answer is not begged. Geo-anchored with coordinates rather than a place name, so the same prompt can be run from different points and compared. Explicitly asking for sources, so step four produces something readable. You will meet this prompt again as the basis of a real method in [Part III](../03-advanced/ai-visibility.md); for now the point is that "I asked ChatGPT if I'm the best plumber in Leeds and it said yes" is not data.

## Named, cited, and recommended are three different things

When people say "the AI mentions us", they usually mean one of three things, and conflating them makes the number meaningless.

| Axis | What it means | Why it matters |
| --- | --- | --- |
| **Named** | Your business name appears in the answer text | The customer-visible outcome |
| **Cited** | Your own domain appears in the source list | Evidence the model read *your* content, not someone's page about you |
| **Stance** | *Recommended*, *listed*, *hedged*, or *negative* | "Also worth a look, though reviews are mixed" is not a recommendation |

These come apart constantly. The common case is **named but not cited**: the assistant read your Yelp page and your Google profile, named you off those, and cited Yelp. You got the customer; your website contributed nothing. The inverse — cited but not named — happens when the model reads your site for background and recommends someone else.

Stance is the axis people skip, and the one a naive keyword search over the answer text gets wrong. A string match for your name cannot tell "the standout choice" from "a popular option, though several reviews mention delays". Both contain your name. Only one sells anything.

## A chatbot always answers, so "presence" is a category error

A Google AI Overview genuinely does or does not appear on a results page. Whether it appears is a real, measurable quantity. Ask an assistant a question and it *always* answers — there is no state in which ChatGPT declines to produce text. So a metric called "AI presence", built by asking a chat assistant a question and checking whether an answer came back, is 100% by construction, for every business, forever.

The AI-visibility panel you are about to open still carries a presence flag left over from an earlier design that read real AI Overviews off a results page. For the chat engines it is always true, and it should not be read as "an AI Overview appeared". We name this about our own instrument because the same artefact sits inside every competing dashboard reporting a chat-engine "presence rate", and nobody else labels it.

For chat engines, the axes that carry information are **named** and **cited**. Everything else is decoration.

## One run is not a measurement

Ask the same assistant the same local question twice and you will often get a different set of businesses. Not a different ordering — a different set. Sampling temperature, tool-call variation and a moving index all contribute.

One hard consequence: a screenshot is an anecdote. The only stable quantity is a *rate over runs* — of the last N checks of this keyword on this engine, in how many were you named? [Part III](../03-advanced/ai-visibility.md) makes that rigorous, including how large the window needs to be and what leaves the denominator. In Part I, learn the reflex: **one AI answer is not evidence of anything.**

## Claims you will see repeated, and what they are worth

Local AI visibility is sixteen months old as a discipline and already has folklore. Some of it may be true. None of the following is verifiable from a primary source we could find, and you should know which is which before repeating it to a client.

| Claim in circulation | Evidentiary status |
| --- | --- |
| "70% of ChatGPT's local results come from Foursquare" | Repeated across dozens of posts with no traceable primary source — no original study, method or vendor statement behind it. Treat as unsourced. |
| "Google's assistant is near-perfect on profile details; others are around two-thirds accurate" | One vendor index reports figures of this shape, and [chapter 1](./what-is-local-seo.md) quotes it with its caveats; the method behind it is not fully published, so treat the percentages as soft. The *mechanism* is real — an assistant grounded in Google's own place data reads the profile itself, one grounded in general web search reads pages about the business — but a mechanism is not a measurement. *(inference)* |
| "An `llms.txt` file makes AI engines cite you" | As a file engines fetch, a measurable non-signal. Separately, Google's own site-quality tooling now scores whether one exists. Both are true at once; the manual names the contradiction rather than resolving it — see [Making the site readable by an AI agent](../02-core-practice/making-the-site-readable-by-agents.md). |
| "Schema markup causes AI mentions" | Correlated with visibility; no published work shows causation. Worth doing for other reasons. |
| "Backlinks and domain authority drive AI recommendations" | Reported correlations for classic authority metrics sit close to noise; brand and reputation signals sit far above them. Ranked properly in [Changing the answer](../03-advanced/changing-the-ai-answer.md). |

Nobody outside these vendors knows how retrieval is weighted, and anyone quoting a precise figure for it is guessing or repeating a guess. What you *can* know is what a given engine actually said, on a given day, for a given question — because you can ask it and write the answer down.

## Labs

### Lab 5.1 — Read the AI panel cold

> **Lab** · Where: **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **free** · Time: ~10 min
>
> You need: a business added (Lab 0.3). Ideally at least one tracked keyword (Lab 3.1).

1. Open **AI Visibility** from the business menu. Run nothing. Click no buttons.
2. Read the three tiles across the top: **Presence**, **Recommendations**, **Authority**. If any of them carries a small **Example** pill, that number is illustrative and is not about your business — note which ones.
3. Read the **AI mention rate** block below it, and the three engine tiles beside it (**Gemini**, **ChatGPT**, **Claude**). Note which show a **Not connected** badge.
4. Scroll to **Where AI mentions you**. This is the keyword × engine matrix. Each cell is one of: *Mentioned*, *Not mentioned*, *Sample*, or a dash for never checked. Write down how many cells are actually live.
5. Scroll on to **Sources cited by AI**, **Authority**, and finally **AI readiness** at the bottom. Read the readiness score and its tier, but do not press **Check now** yet.

**What good looks like.** You can say in one sentence how much of that screen is a measurement of your business and how much is a placeholder. On a new business the honest answer is usually "almost none of it" — and the page says so, which is the point.

**If it went wrong.** If the matrix is replaced by a sample layout, you have no tracked keywords yet; add one first (Lab 3.1). If an engine says **Not connected**, checks on it return clearly-labelled sample rows rather than live data — and sample rows never count toward any rate.

**What you just learned.** Every AI-visibility dashboard shows this mix of measured, unmeasured and illustrative numbers. Telling them apart at a glance is the skill; reading the percentages is not.

### Lab 5.2 — Run the readiness check and read all nine factors

> **Lab** · Where: **AI Visibility → AI readiness** (`/b/{businessId}/ai-visibility`) · Cost: **paid** · Time: ~10 min
>
> You need: Lab 5.1.

1. On the **AI readiness** card, press **Check now**. The price is shown on the button before you confirm.
2. When it finishes, read the score and tier — 70+ is *Strong*, 40–69 is *Building*, below 40 is *Low*.
3. Open **What goes into this score** and read all nine rows. Each shows either `+weight` (passed) or `0 / weight` (failed).
4. Write down every failing factor with its weight, in descending weight order. That list is your work order, and you will use it again in [the ninety-day plan](../04-operating/the-ninety-day-plan.md).
5. Note which two factors, passed together, would already put you at the *Building* threshold.

**What good looks like.** A ranked list of gaps with a number beside each, not a vague sense that the profile "needs work". You should also notice that the two heaviest factors by a wide margin are review volume and rating — reputation is the gateway to AI answers, and the rubric is built to say so.

**If it went wrong.** If the score does not move after a Google edit, remember the check re-pulls profile and review data, and a Google edit takes time to publish. If the AI-agent-readiness factor reads as unmeasured rather than failed, no website analysis has run yet — a different screen and a different lab ([Making the site readable by an AI agent](../02-core-practice/making-the-site-readable-by-agents.md)).

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

**What you just learned.** The businesses in step 3(d) are a competitor set the AI itself chose for your query — free, and often more honest than one you would have written. You will use this in [Reading a competitor off their public data](../02-core-practice/competitors.md).

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

**Next:** [What people actually search, and how to model it →](./what-people-actually-search.md)
