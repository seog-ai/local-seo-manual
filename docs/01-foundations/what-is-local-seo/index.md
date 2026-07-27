---
title: What local SEO actually is
sidebar_position: 1
description: Local search has six separate answer surfaces, each with its own selection rules — what they are, what triggers each, and which one you are trying to win.
---

# What local SEO actually is

Local SEO is the practice of making a business appear when someone nearby searches for what it sells. That used to be one job with one target: three results in a box next to a map.

It is now at least six targets, chosen by different machines, from partly different data — and a business can own one of them while being invisible on the rest.

This chapter is the map of those surfaces. Every decision later in the manual — which keyword to track, which number to report, whether a change worked — depends on being able to say *which surface* you are talking about.

## What makes a search "local"

A query is local when the answer depends on where the person is standing. That happens two ways.

**Explicitly** — the query names a place. `dentist in Leeds`, `thai food downtown austin`.

**Implicitly** — the query names no place, and the search engine supplies one. `dentist near me`, or just `dentist` typed on a phone. Most local searches are this kind. The searcher never states a location because they assume the machine knows it, and it does.

The consequence is the single most important structural fact in this discipline:

> **The same words produce different results at different coordinates.**

There is no such thing as "our rank for plumber" — only "our rank for plumber, measured from this point, on this surface, on this date". [Rank is a map, not a number](../rank-is-a-map-not-a-number/index.md) makes that rigorous. For now, just stop trusting any sentence of the form "we rank #3".

![A 3x3 grid scan over Helsinki for one keyword, with a rank number on the pin at each of the nine measurement points](../../../static/img/screens/geo-grid.png)

*One keyword, nine live searches run from nine coordinates around Helsinki — a real scan, not a mock-up. The pins carry different positions a couple of kilometres apart, which is exactly what a single "we rank #3" would hide. Ignore the search-volume figure further up that page: it carries a **Test data** badge, because no volume provider was configured on the machine that took the capture.*

**Local intent is a spectrum, not a switch.** `emergency plumber` is almost pure local intent. `how do I stop a dripping tap` is almost none. `best plumber in Bristol for a boiler swap` is both, which is exactly why it gets answered by a different machine than the first one does.

## The six answer surfaces

These are the manual's names for them. Google officially calls the first one "local results"; the rest are industry vocabulary or have no name at all, because Google has not given them one.

| Surface | What you see | Typically triggered by | Who selects the businesses |
| --- | --- | --- | --- |
| **Map pack** | A small map plus three listings with rating, hours, and call/directions/website buttons | A service or product query with local intent | Google's local ranking system |
| **Local finder** | The full scrollable list behind "More places", with filters and its own map | Clicking through from the pack, or searching in Maps directly | The same local ranking system, deeper |
| **Local organic** | Ordinary blue links below the pack — directories, "best X in Y" listicles, business homepages | The same query | Google's web ranking |
| **AI Overview** | A generated answer at the top with cited links | Informational, longer and more conversational phrasings | Google's generative layer over its index |
| **AI local pack** | A generated local answer containing one or two businesses, in place of the pack | A subset of local queries; so far observed only on mobile, and only in the US | Undocumented |
| **Standalone assistant** | A named recommendation in ChatGPT, Gemini, Perplexity or Claude, sometimes with sources | The person asking an assistant instead of a search box | Each vendor's own retrieval and place data |

The same question, then, fans out into six answers chosen by five different selectors:

Three of these are routinely confused, so be precise about them.

**The local finder is not the map pack.** It is the deep list behind "More places", and it is where a business at position 7 actually lives. People who "cannot find themselves anywhere" are usually visible immediately in the finder — which is the difference between a ranking problem and a panic.

**The AI Overview and the AI local pack are different things.** An AI Overview is a generated block that answers a question and links to sources; a business is lucky to be named in one.

The AI local pack is a generated *local* result that lists businesses the way the pack does. The practitioner who has tracked it most closely — Joy Hawkins of Sterling Sky — describes it as **displacing** the traditional 3-pack rather than sitting above it.

That is a materially worse outcome for a business than an AI Overview, because there is nothing left underneath to fall back to. Google has published nothing about the surface, so the displacement claim rests on one vendor's observation *(open question)*.

**A standalone assistant is not a search engine with a nicer voice.** It answers from its own retrieval stack. Gemini is grounded in Google Maps data; ChatGPT and Perplexity are grounded in something else. This is why the same question can produce three disjoint answers, which you will see for yourself in Lab 1.3, and why [How an AI assistant answers a local question](../how-ai-answers-a-local-question/index.md) is a chapter rather than a paragraph.

> **Note** · There is a seventh thing on the page and it is not a ranking surface: ads.
>
> Sterling Sky's *The State of Local SEO in 2026* reports local pack ads on 1% of its mobile reports at the start of 2025 and almost 22% by December 2025, and Local Services Ads on roughly 11% of tracked queries at the start of 2025 and 31% by November. That is one agency's tracking sample, not a census.
>
> You cannot rank your way into those slots — count them separately when you audit a page, or you will misread how much room is actually available.

---

**Next:** [The 2026 inventory and who decides each surface →](./the-2026-inventory.md)
