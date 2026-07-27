---
title: Measuring AI visibility
sidebar_position: 1
description: A defensible method for "does the AI recommend this business" — probe design, geo-anchoring, run counts, variance, the presence matrix, and the limits you must state.
---

# Measuring AI visibility

Everyone in this industry now has a slide with an AI answer on it. Almost none of them have a method.

The gap between "I asked ChatGPT and it named my client" and a number you can defend is made of four things:

1. The unit of observation.
2. How many times you run it.
3. What leaves the denominator.
4. What the result is allowed to mean.

[How an assistant answers a local question](../../01-foundations/how-ai-answers-a-local-question/index.md) established the machinery: these engines retrieve from different corpora, location arrives as a string, one run is a sample. This chapter turns that into a procedure with error bars, then says what it still cannot prove.

## The unit of observation

In map-pack work the unit is obvious: one keyword, one coordinate, one moment, one integer out. For AI visibility it must be constructed, and constructing it badly is why most published "AI visibility studies" are uninterpretable.

The unit is a **probe**: one question, put to one engine, from one geographic anchor, at one moment. Every probe produces a record with these fields, and a record missing any of them is not evidence.

| Field | Why it is in the record |
| --- | --- |
| Question text | Exact string, unbranded. A paraphrase is a different probe. |
| Engine | Findings never transfer between engines. |
| Anchor | The coordinates the question carried. |
| Timestamp | Index and model both move under you. |
| Did it recommend businesses at all? | Refusals and "check Yelp" punts are a distinct outcome. |
| Named | Your name appears in the answer text. |
| Cited | Your own domain appears in the source list. |
| Stance | *Recommended*, *listed*, *hedged*, *negative*. |
| Other businesses named, in order | The competitive set, chosen by the machine. |
| Sources cited | Where the answer came from. |
| The answer text | So a human can check the four judgements above. |

Keep the answer text. It is what makes the record auditable, and the first thing tooling discards. Full field list: [the AI visibility record schema](../../99-appendix/ai-visibility-record-schema.md).

## Three axes, two denominators

Named, cited and stance are three different wins, and they produce three rates. Two of those rates run over every answer and one does not — getting that split wrong is how most AI-visibility numbers become meaningless.

**Mention rate** — named or cited, over *every* live answer in the window. A refusal counts against you: the question is "if someone asks this, how often does my name come out?", and an engine that refused did not produce your name.

**Citation rate** — your own domain among the cited sources, over *every* live answer. Strictly your domain, not a page about you. This is the "did the machine read my site" number, usually far lower than the mention rate.

No dashboard I know of prints it beside the mention rate, this one included; read it off the **Sources cited by AI** table, where your own domain is pinned at the top with a count of the answers citing it.

**Recommendation rate** — you are among the businesses put forward, over only the answers that **recommended specific businesses at all**. Refusals, generic advice and aggregator punts leave this denominator, because the question is different: "when this engine names names, does it name mine?"

> **If a tool reports one number called "AI visibility", ask which denominator it used.** If it cannot say, it is a single-axis string match wearing a suit.

Stance survives no string match at all, so it is read by a person or a classifier model — in the app, the **Framing** row on **How AI recommends you**. Mechanism: [AI engine probe recipes](../../05-reference/ai-engine-probe-recipes.md).

## The probe set

Three dimensions, all chosen before you spend anything.

**Questions.** Unbranded, always — a question containing your name measures the model's agreeableness.

The set spans intent the way a tracked-keyword set does ([choosing what to track](../../02-core-practice/choosing-what-to-track/index.md) applies unchanged), plus one addition: assistants get asked longer, more conversational questions than search boxes do, so two-word service terms alone under-sample the surface.

**Anchors.** The probe carries coordinates in its text. In the app those come from the tracked keyword's **Search from** field, falling back to the business's own location when blank — so measuring one question from two points means tracking that keyword twice, once per location.

The radius and language options beside it are Places-side dimensions for rank checks; the AI probe carries only the coordinates.

And a coordinate in a prompt is an instruction, not a position: expect anchors to move AI answers far less than they move a grid, and inconsistently between engines *(inference — a mechanism argument from the retrieval pipeline; we have not run a controlled anchor-displacement test)*. Set them anyway: "we asked from the client's neighbourhood" is defensible, "wherever the model assumed" is not.

**Engines.** Separate populations, grounded in different indexes and different place data. Averaging them into one score hides the only interesting finding, which is that they disagree.

## Run counts

One run is not a measurement. Neither is three. Here is the arithmetic, so you can stop arguing about it: for a rate over `n` runs, the worst-case standard error is `0.5 / √n`.

| Runs per cell | Worst-case standard error |
| --- | --- |
| 5 | ~22 points |
| 20 | ~11 points |
| 80 | ~5.6 points |

> **To halve the error bar you must quadruple the runs. No prompt gets around this.**

Concretely: three mentions in five runs is 60%, with a 95% interval of roughly **23% to 88%**. Two in five is 40%, interval roughly **12% to 77%**. Those overlap across nearly their whole range.

**A cell that went from 2/5 to 3/5 did not improve** — it did nothing you can detect, and anyone reporting it as a gain is reporting noise with a percentage sign on it.

Five runs still buy direction: zero-of-five and five-of-five are genuinely different states, and most probes sit at an extreme rather than the ambiguous middle. It is a working floor, and the app's rates use exactly that — a rolling window of the **five most recent live checks per keyword × engine**.

Two consequences.

1. **Run the same number of checks in every cell**, or your rate is dominated by whichever cell you clicked most.
2. **The whole-matrix rate deserves less credit than its `n` suggests.** Eight probes × three engines × five runs is 120 observations, implying a 4.6-point bar, but they are not independent — same business, same market, overlapping questions — and clustering inflates the true interval by an unknowable amount.

## Variance is a finding, not noise

The most useful number here is the one people throw away: how often runs of the *same* cell agree with each other. Call it **consistency** — of the cells with two or more runs, the share where every run gave the same verdict.

It is on no screen, here or anywhere; you tally it yourself, which is much of why nobody reports it.

It is exquisitely sensitive to run count. With two runs and a true probability of 50%, the pair agrees half the time *by chance*; at five runs, coin-flipping produces all-agree only about 6% of the time. That is why uniform `n` is a rule and not a preference.

- **High consistency, low mention rate.** The engine has a settled opinion and you are not in it — a content and reputation problem, and the state that responds to work. See [changing the AI answer](../changing-the-ai-answer/index.md).
- **Low consistency.** The query is contested and you are near the cut. Small reputation moves plausibly flip these cells, and it is where you will most easily fool yourself: a re-run after a change looks like a win about half the time.
- **High consistency, high mention rate.** You are established there — spend the runs on a probe you are losing.

---

**Next:** [Reading the presence matrix →](./the-presence-matrix.md)
