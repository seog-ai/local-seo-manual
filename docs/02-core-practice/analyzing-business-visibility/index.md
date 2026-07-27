---
title: Diagnosing a business in thirty minutes
sidebar_position: 1
description: A repeatable first-pass diagnostic — read the audit, tell missing from invisible, order the work by weight, and freeze a dated baseline before you change anything.
---

# Diagnosing a business in thirty minutes

Someone hands you a business and asks what is wrong with it. Thirty minutes later you should be able to answer in writing: a verdict in three sentences, an ordered list of work, and a dated baseline that will let you prove, in six weeks, that what you did mattered.

It is the same routine for your own coffee shop and for a prospect you are trying to win. Everything else in Part II changes one thing and re-measures it; this is the measurement you change things *against*.

One rule sits underneath it: **you never touch a profile you have not measured.** An unmeasured change is an unprovable change, and unprovable work is most of why this industry has the reputation it has.

## What a diagnostic produces

1. **A verdict.** Three or four sentences a non-specialist can read: what this business is, where it is visible, where it is not, and the single biggest constraint.
2. **An ordered work list.** Not everything that is wrong — the things worth doing, in the order you will do them.
3. **A frozen baseline.** The numbers as they were today, in a form you cannot accidentally overwrite next month.

Not on that list: a complete inventory of defects. Any local business has thirty things you could improve, and listing all thirty avoids the hard part — deciding what to do first.

## Two rubrics, and why they disagree

Two scored rubrics sit in front of you, on two screens, and beginners mash them into one impression of "the score". They measure different things, and are calibrated differently on purpose.

### The profile audit

The **Profile score** on the overview is a *completeness* audit of the profile as it can be observed: eleven pass/fail checks, each weighted, grouped into five categories. The score is the share of total weight you passed.

| Check | Category | Weight | Passes when |
| --- | --- | --- | --- |
| Phone number added | Contact | 10 | Present |
| Website linked | Contact | 9 | Present |
| Opening hours listed | Visibility | 10 | Present |
| Marked operational | Visibility | 4 | Not closed or temporarily closed |
| Business description | Content | 8 | Present |
| At least 5 photos | Content | 9 | Photos ≥ 5 |
| Rating 4.0 or higher | Reputation | 8 | Rating ≥ 4.0 |
| At least 20 reviews | Reputation | 10 | Reviews ≥ 20 |
| Accessibility info | Attributes | 7 | One or more set, *or* the category offers none |
| Payment options | Attributes | 5 | One or more set, *or* the category offers none |
| Service attributes | Attributes | 6 | One or more set, *or* the category offers none |

The eleven weights total **86**. The action plan labels each step with its raw weight, so a fix tagged `+10 pts` recovers 10 of 86 — about 11.6 percentage points, slightly more than the label suggests. The colour follows one band everywhere in the app: green from 80, amber from 50, red below.

![Overview for AIEmployees: profile score 36% in red, and an action plan of seven steps carrying +10, +10 and +9 point labels](../../../static/img/screens/owner-overview.png)

*A 36% profile taken apart into the rows that produced it. Each step names the failing check, its category and its raw weight — the first three, phone and reviews and photos, are 29 of the 86 points on offer. This is the table above rendered as a to-do list, which is the only form in which a score is useful.*

**Two choices there are worth stealing whatever tool you use.**

- **The photo bar is modest at five** because the publicly observable photo list caps out at around ten images *(observed; Google does not document the limit)* — a stricter bar would be one the instrument cannot see over.
- **The attribute checks pass automatically** when Google's catalogue offers no options of that kind for the category. An audit that demands the impossible trains people to ignore red rows.

### The AI-readiness rubric

The **AI readiness** score on the AI Visibility screen asks a different question: how likely is an AI answer to surface this business at all. Nine all-or-nothing factors, weights totalling exactly 100.

| Factor | Weight | Passes when |
| --- | --- | --- |
| Review volume | 22 | Reviews ≥ 25 |
| Rating | 18 | Rating ≥ 4.2 |
| Website to cite | 12 | Present |
| Fresh reviews | 10 | A review inside the last 60 days |
| Rich description | 9 | Present |
| Structured attributes | 8 | One or more set, any group |
| AI-agent-ready website | 8 | Agent-readiness score ≥ 90 |
| Review engagement | 7 | Replies on ≥ 50% of reviews |
| Opening hours | 6 | Present |

Tiers: **70+ is strong, 40–69 is building, below 40 is low.**

![AI Visibility screen: an AI readiness card scoring 53 of 100, tiered "Building", with each of the nine factors marked pass or fail and its weight beside it](../../../static/img/screens/owner-ai-visibility-full.png)

*The same business on the AI Visibility screen — 53 of 100, in the building tier, with every factor shown as passed or failed against its weight. Review volume scores 0 of 22 on three reviews, and it is the heaviest single factor on the sheet. The three tiles at the top are **Presence**, **Recommendations** and **Authority**; the first two carry an **Example** badge until a live check is run, and nothing in any of them fed the 53.*

**Now read the two tables together.** They set different bars on the same two inputs, because they are asking different questions:

| | Profile audit | AI readiness |
| --- | --- | --- |
| Reviews bar | 20 | 25 |
| Rating bar | 4.0 | 4.2 |
| The question it asks | Is this profile complete enough to compete in the pack? | Is this reputation strong enough that a language model would name this business to a stranger? |

That is not an inconsistency to be tidied away. The second bar is higher because the AI surfaces recommend far fewer businesses than the pack lists — the subject of [how an AI assistant answers a local question](../../01-foundations/how-ai-answers-a-local-question/index.md).

**And one line is a thesis written as arithmetic:** **22 + 18 = 40**, exactly the *building* threshold. A business passing review volume and rating and *nothing else* lands precisely on the boundary; everything else is upside.

That calibration was held deliberately when the rubric was rebalanced, and it encodes a claim you should accept or argue with:

> **Reputation is the gateway to AI answers, and no amount of structured data compensates for a thin one.**

### What neither score is

Neither predicts your ranking. Both are computed from stored profile and review data without looking at a single search result, so a business can score 100% on the audit and still not appear in the pack a mile from its door — the audit cannot see distance, and [proximity dominates at short range](../../01-foundations/relevance-distance-prominence/index.md).

A score is a *diagnostic input*, never a finding. "Your profile score is 62%" is not a sentence a client should be sent. "Three of the eleven completeness checks fail, and the two that matter are hours and photos" is.

---

**Next:** [Turning failing checks into a plan →](./turning-failing-checks-into-a-plan.md)
