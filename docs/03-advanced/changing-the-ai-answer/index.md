---
title: Changing the AI answer
sidebar_position: 1
description: The levers that actually move an AI recommendation, ranked by evidence — and how to run a change you can attribute rather than one you hope worked.
---

# Changing the AI answer

You have a mention rate now. It is 20%, or it is zero, and someone wants to know what you are going to do about it on Monday. This chapter answers that, and then the harder half: how you will tell, in six weeks, whether it was you.

Local AI visibility is new enough that nobody has a long track record in it, and it already ships in packages. Some of what is in those packages reaches the machine, and you can watch it happen. Some of it cannot work, mechanically. Most has never been tested by anyone in either direction. Sorting the three is the whole job.

## There are only three places to intervene

An assistant answering a local question retrieves documents and writes prose grounded in them — the four steps are in [How an AI assistant answers a local question](../../01-foundations/how-ai-answers-a-local-question/index.md).

**You control none of the model**, the sampling, the retrieval weighting or the query it decides to issue. What is left is the corpus, and the corpus has exactly three attackable properties:

1. **Which documents exist, and what they say about you.** Your profile, directory records, third-party pages about your market, your own site.
2. **Whether the machine can tell they are all about one business.** Entity resolution — the subject of [citations and NAP consistency](../../02-core-practice/citations-and-nap/index.md).
3. **What those documents say about your quality.** Reviews, ratings, and the language other people use about you.

Every lever with evidence behind it is one of these three. Hold a vendor proposal against the list and ask which one each line item is. A line mapping to none of them is either a misunderstanding of the mechanism or a content package with a new label on it.

## Read the source list; that is your intervention plan

Every answer arrives with a bibliography, and it is free to read once a check has been paid for. The **Sources cited by AI** card on `/b/{businessId}/ai-visibility` aggregates the cited domains across your recent live answers, ranked by how many cite each, and tags every row: **You**, **Directory**, **Social**, **Reference** or **Web**.

Directory and social rows carry the note *You can influence this*, because those are records you can claim and correct. A Wikipedia row is a *Reference*; a "12 best plumbers in Leeds" listicle lands in *Web*.

Two disciplines make the card useful rather than decorative.

**It is per-market and per-keyword.** The claim "ChatGPT gets its local data from *[some platform]*" circulates constantly with no traceable source, and even if it held in somebody's market it would not hold in yours. A dental practice in Manchester and a taqueria in Austin share almost nothing in that table. Read your own.

**Named and cited are separate wins.** Your name in the answer is the customer-visible outcome. Your *domain* in the source list is evidence the model read your own content rather than someone's page about you.

The common case is named-but-not-cited: the engine read a directory record and a listicle, named you off those, and cited them. When that is your pattern, the lever is a document you do not own — and no amount of work on your own site changes it.

## The ladder, graded by evidence

Four grades, and the grade matters more than the position.

- **Visible mechanism** — you can see the transmission path in the output: the document is named in the source list, you can change what it says, and you can re-probe. Not proof of causation for any single answer, but the strongest evidence this discipline currently offers.
- **Correlational** — vendor studies report co-occurrence. Where several have looked the *ordering* has been reproduced; the magnitudes have not, and the methods are only partly published.
- **Untested** — plausible mechanism, no published controlled test either way. Honest to try, dishonest to sell.
- **Non-signal** — reasoned or measured not to move retrieval. Several are still worth doing, for other reasons.

| Lever | Grade | The honest note |
| --- | --- | --- |
| Presence and correctness on the directory/social domains **your own probes cite** | Visible mechanism | The cited set is the shortlist; the rest is speculation |
| Reviews — volume, rating, recency, replies | Visible mechanism | Reaches Maps-grounded engines directly, web-grounded ones through the pages that sort on it |
| Being named on the third-party pages that get cited | Visible mechanism | Hardest lever, least worked, rules attached |
| Entity consistency across those documents | Untested, strong mechanism | Whitespark's Local Search Ranking Factors survey puts citation signals in single digits of *map-pack* weight — summaries of it report 6% and 7% — and that is the map pack, not AI; the AI case is a mechanism argument |
| Unlinked brand mentions and branded search volume | Correlational | The largest published study reports brand mentions as the strongest correlate it measured, well ahead of link metrics, with the same ordering on all three engines it tested — see below |
| Depth and specificity of your own site's content | Correlational for **cited**, untested for **named** | Wins the axis you were probably not measuring |
| Profile completeness beyond the basics | Untested | Transmits to Maps-grounded engines only *(inference)* |
| Schema markup | Correlational | Do it for rich results, which is a real reason |
| Google Business Profile posts | Untested | No published evidence they enter AI retrieval either way |
| `llms.txt` | Non-signal for retrieval | Google's own Lighthouse "Agentic Browsing" audit checks whether you have one, and Google has said it is not a Search ranking signal; twenty minutes, then stop |
| Domain authority and backlink counts | Correlational, weakly | Roughly half the correlation of brand mentions in the study below, and that study is about brands on the open web, not local businesses. Previously listed here as a non-signal, which overstated it |
| Copy written to be quoted, or instructions hidden for the model | Non-signal, plus risk | The retrieval system reads pages *about* you, not your prose |
| Paid placement in an assistant's local recommendations | Nothing to buy | No published mechanism for buying a local recommendation slot as of **2026-07**. If a vendor says otherwise, ask which product and read its documentation |

### Four rows deserve more than a table cell

**The correlational rows rest on one study, so read its shape before you quote it.** Ahrefs published Spearman correlations between AI brand visibility and a set of familiar metrics across ChatGPT, AI Mode and AI Overviews, over roughly 75,000 brands with a Domain Rating above 40.

The ordering is the finding, and it is the same on all three engines:

| Metric | Correlation |
| --- | --- |
| Branded web mentions | around 0.66–0.71 |
| Branded anchors | around 0.51–0.63 |
| Branded search volume | around 0.35–0.47 |
| Domain Rating | only around 0.27–0.33 |
| Backlink counts | weaker still |

The authors say "correlation isn't causation" themselves, and two limits matter more here than the coefficients: the sample is established web brands, not the single-location businesses this manual is about, and a strong brand plausibly earns both the mentions and the citations.

> **Take the *ordering* — brand mentions above link metrics — and leave the magnitudes at the door.** *(Figures read from the published study on 2026-07-27.)*

**Reviews are the heaviest lever, and the rubrics say so out loud.** In the AI-readiness score, review volume and rating are worth 22 and 18 of 100 — enough together to reach the middle tier ([diagnosing a business in thirty minutes](../../02-core-practice/analyzing-business-visibility/index.md)).

In the Authority pillar on the same page, review authority is worth 25 of 100 and is itself a blend:

- **30% volume** — full marks around 50 reviews.
- **30% rating** — scaled from 3.0 to 5.0.
- **20% recency** — full marks inside 30 days, half inside 90.
- **20% reply share.**

Which says something a bare review count hides: **200 old unanswered reviews score worse than 60 recent ones that get replies.**

**The listicle layer is the under-worked one.** When your probes cite three "best X in *[your city]*" pages and a local news round-up, those pages are functionally the ranking. Being added is ordinary outreach: find who wrote it, show them why the omission is wrong, ask.

What you may not do:

- Buy placement without disclosure.
- Spin up your own directory to cite yourself.
- Seed recommendations in forums under an assumed identity — this last one is against every major platform's rules and gets discovered publicly.

**Our own instrument excludes two popular levers from the score that matters most.** The Authority pillar weights:

| Authority row | Weight |
| --- | --- |
| Own-citation share | 25 |
| Coverage of the cited domains | 25 |
| Reviews | 25 |
| Listings consistency | 15 |
| Local top-10 rankings | 10 |

`llms.txt` and domain-authority metrics have no row in it — not unmeasured, *excluded*, because no published work supports them as AI retrieval signals.

Be exact about the scope of that, because the same page contradicts a sloppier version of it: the separate **AI readiness** estimate lower down *does* carry an "AI-agent-ready website" factor worth 8 of 100, and `llms.txt` is one of the things it looks for, by way of Google's Lighthouse audit. Agent-readiness and retrieval are different claims, and the rubric splits them deliberately.

> **A rubric's exclusions are a claim, and a claim you can argue with beats a score you cannot take apart.** If evidence lands, the rubric should change and this paragraph should be dated as wrong. *(Weights read from the code on 2026-07-27.)*

![The Authority card on an owner-connected profile: five weighted rows, of which only Review authority carries data, scoring 72 at weight 25 from 3 reviews rated 5.0 with 100% answered](../../../static/img/screens/owner-ai-visibility-full.png)

*The Authority pillar with its weights showing. Only **Review authority** scores — 72, at weight 25, off three reviews rated 5.0★ with every one answered — while **Your site cited by AI**, **Presence on the sources AI cites**, **Listings consistency** and **Local top-10 rankings** all read "no data yet" until the checks that feed them have been run. Note what has no row here: no domain authority, and no `llms.txt` — which does appear further down the same screenshot, inside the **AI readiness** breakdown, as one input to a factor worth 8. Different rubric, different claim. That readiness breakdown also gives this three-review profile full marks for fresh reviews and review engagement while volume costs it 0 of 22.*

---

**Next:** [Proving the change was you →](./proving-it-was-you.md)
