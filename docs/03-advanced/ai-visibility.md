---
title: Measuring AI visibility
sidebar_position: 3
description: A defensible method for "does the AI recommend this business" — probe design, geo-anchoring, run counts, variance, the presence matrix, and the limits you must state.
---

# Measuring AI visibility

Everyone in this industry now has a slide with an AI answer on it. Almost none of them have a method. The gap between "I asked ChatGPT and it named my client" and a number you can defend is made of four things: the unit of observation, how many times you run it, what leaves the denominator, and what the result is allowed to mean.

[How an assistant answers a local question](../01-foundations/how-ai-answers-a-local-question.md) established the machinery: these engines retrieve from different corpora, location arrives as a string, one run is a sample. This chapter turns that into a procedure with error bars, then says what it still cannot prove.

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

Keep the answer text. It is what makes the record auditable, and the first thing tooling discards. Full field list: [the AI visibility record schema](../99-appendix/ai-visibility-record-schema.md).

## Three axes, two denominators

Named, cited and stance are three different wins, and they produce three rates. Two of those rates run over every answer and one does not — getting that split wrong is how most AI-visibility numbers become meaningless.

**Mention rate** — named or cited, over *every* live answer in the window. A refusal counts against you: the question is "if someone asks this, how often does my name come out?", and an engine that refused did not produce your name.

**Citation rate** — your own domain among the cited sources, over *every* live answer. Strictly your domain, not a page about you. This is the "did the machine read my site" number, usually far lower than the mention rate. No dashboard I know of prints it beside the mention rate, this one included; read it off the **Sources cited by AI** table, where your own domain is pinned at the top with a count of the answers citing it.

**Recommendation rate** — you are among the businesses put forward, over only the answers that **recommended specific businesses at all**. Refusals, generic advice and aggregator punts leave this denominator, because the question is different: "when this engine names names, does it name mine?"

If a tool reports one number called "AI visibility", ask which denominator it used; if it cannot say, it is a single-axis string match wearing a suit. Stance survives no string match at all, so it is read by a person or a classifier model — in the app, the **Framing** row on **How AI recommends you**. Mechanism: [AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md).

## The probe set

Three dimensions, all chosen before you spend anything.

**Questions.** Unbranded, always — a question containing your name measures the model's agreeableness. The set spans intent the way a tracked-keyword set does ([choosing what to track](../02-core-practice/choosing-what-to-track.md) applies unchanged), plus one addition: assistants get asked longer, more conversational questions than search boxes do, so two-word service terms alone under-sample the surface.

**Anchors.** The probe carries coordinates in its text. In the app those come from the tracked keyword's **Search from** field, falling back to the business's own location when blank — so measuring one question from two points means tracking that keyword twice, once per location. The radius and language options beside it are Places-side dimensions for rank checks; the AI probe carries only the coordinates. And a coordinate in a prompt is an instruction, not a position: expect anchors to move AI answers far less than they move a grid, and inconsistently between engines *(inference — a mechanism argument from the retrieval pipeline; we have not run a controlled anchor-displacement test)*. Set them anyway: "we asked from the client's neighbourhood" is defensible, "wherever the model assumed" is not.

**Engines.** Separate populations, grounded in different indexes and different place data. Averaging them into one score hides the only interesting finding, which is that they disagree.

## Run counts

One run is not a measurement. Neither is three. Here is the arithmetic, so you can stop arguing about it: for a rate over `n` runs, the worst-case standard error is `0.5 / √n`.

| Runs per cell | Worst-case standard error |
| --- | --- |
| 5 | ~22 points |
| 20 | ~11 points |
| 80 | ~5.6 points |

To halve the error bar you must quadruple the runs. No prompt gets around this.

Concretely: three mentions in five runs is 60%, with a 95% interval of roughly **23% to 88%**. Two in five is 40%, interval roughly **12% to 77%**. Those overlap across nearly their whole range. **A cell that went from 2/5 to 3/5 did not improve** — it did nothing you can detect, and anyone reporting it as a gain is reporting noise with a percentage sign on it.

Five runs still buy direction: zero-of-five and five-of-five are genuinely different states, and most probes sit at an extreme rather than the ambiguous middle. It is a working floor, and the app's rates use exactly that — a rolling window of the **five most recent live checks per keyword × engine**.

Two consequences. **Run the same number of checks in every cell**, or your rate is dominated by whichever cell you clicked most. And **the whole-matrix rate deserves less credit than its `n` suggests**: eight probes × three engines × five runs is 120 observations, implying a 4.6-point bar, but they are not independent — same business, same market, overlapping questions — and clustering inflates the true interval by an unknowable amount.

## Variance is a finding, not noise

The most useful number here is the one people throw away: how often runs of the *same* cell agree with each other. Call it **consistency** — of the cells with two or more runs, the share where every run gave the same verdict. It is on no screen, here or anywhere; you tally it yourself, which is much of why nobody reports it.

It is exquisitely sensitive to run count. With two runs and a true probability of 50%, the pair agrees half the time *by chance*; at five runs, coin-flipping produces all-agree only about 6% of the time. That is why uniform `n` is a rule and not a preference.

- **High consistency, low mention rate.** The engine has a settled opinion and you are not in it — a content and reputation problem, and the state that responds to work. See [changing the AI answer](./changing-the-ai-answer.md).
- **Low consistency.** The query is contested and you are near the cut. Small reputation moves plausibly flip these cells, and it is where you will most easily fool yourself: a re-run after a change looks like a win about half the time.
- **High consistency, high mention rate.** You are established there — spend the runs on a probe you are losing.

## The presence matrix

A presence matrix is the method on one screen: **rows are probes, columns are engines, cells are rates over runs**. Read it in three passes, in this order.

**Rows first.** A probe where you are absent on every engine is not an AI problem. Three independently-grounded systems reading three different corpora all concluded you are not a plausible answer — a relevance or reputation finding, which no prompt work fixes.

**Then columns.** Present on two engines and absent on the third is a *grounding* finding: that engine's corpus does not carry you. The cited-sources list under it usually names the corpus, and that is where the work goes — the same phenomenon as [why two tools disagree](./why-two-tools-disagree.md), from the other direction.

**Then cells, by reading the answers.** Every rate here is a count of judgements about text, made by string matching and a classifier that are fallible in ways you only see by reading.

Two warnings specific to this instrument, both of them the chapter's own thesis arriving on one screen.

A cell shows the **latest** check's verdict while the **Presence** tile shows a **rate over the window**, so they will disagree — a business at 3/5 reads "Not mentioned" whenever the most recent run missed. Tile for the rate, cell for the last observation, never one as the other.

And the page carries *two* mention rates over *two* denominators. **Presence** is computed over the rolling window — up to five checks per keyword × engine. The larger **AI mention rate** band beneath it, with the per-engine fractions, counts only the **latest** live check in each cell, so its denominator is one-per-cell. Run five uniform passes and Presence sits on 120 observations while the band below it sits on 24. They are both correct and they are not the same number; quote the one whose denominator you can state.

Before any of it has been run, the page gives you the shape of the instrument and none of its readings.

![The whole AI Visibility page on a business with no live checks: Presence, Recommendations and Authority tiles, an AI mention rate band below them, a sample See if AI recommends you card, an empty Sources cited by AI card, and Authority and AI readiness breakdowns at the foot](../../static/img/screens/ai-visibility-full.png)

*The method's cards in page order, cold. Read the pills, not the numbers: **Presence** and **Recommendations** carry an **Example** pill and so does the **AI mention rate** band — those three figures are the interface's own placeholders. **Authority** does not, because it is a real score computed from stored data (here, reviews alone). Under them, **See if AI recommends you** is a fixture whose rows are engines rather than this business's keywords. **Sources cited by AI** is empty because a source list only exists after a paid check, and **How AI recommends you** has judged nothing. Neither score at the foot is a measurement of AI answers *in this state*: the page's own footnote calls the readiness figure an estimate from profile signals, and every Authority row that depends on live answers reads "no data yet".*

## Calibrating the instrument

Every automated verdict is an approximation, and defensible measurement means knowing which way each errs. These three are properties of the SEOG implementation, verified against the code on **2026-07-27**; your own tooling has equivalents, so go and find them.

**Three different matchers decide three different things, and only one of them is strict.** *Named* — the mention axis — is a plain case-insensitive substring test: does the answer text contain your business name. So *The Coffee Shop* scores a mention off a sentence containing "the coffee shop", whoever it meant, and short or generic names inflate the rate. The self-match behind the recommendations card and the "#N" beside a cell is looser still: containment in *either* direction, so a longer or shorter variant of your name counts. Your own-domain count on the sources table is the strict one — a domain-equality test, which is why a cited page titled "Joe Coffee — Yelp" is filed as *Yelp* there and not as you. Read the sources table, not the cell, when the question is "did the engine read *my site*".

**The "#N" beside a mentioned cell is a position in the source list, not a rank.** The expanded row calls it "source #N" and the cell does not. A business named in the prose but absent from the sources is inserted at the top of that list, so "#1" usually means "named in the answer". The genuine ordering figure is **Avg position** on the recommendations card — position among the businesses named. Two things called position on one screen; only one is about competitive standing.

**The stance classifier is itself a model.** Answers it cannot parse are dropped rather than guessed — the correct failure mode, since it shrinks the denominator honestly instead of inventing a verdict, but it means your recommendation denominator is smaller than your check count and must be reported as the number it actually is.

## What this method cannot tell you

State these out loud in any deliverable, or a client will discover them for you.

**It is not causal.** You changed something and the rate moved; so did the index, possibly the model version, possibly the retrieval configuration — none announced, versioned or visible. The nearest available control is the same probe set run against a comparable business you did *not* work on, both movements reported side by side. Not a trial. Far better than nothing.

**The window is counted, not dated.** Five runs might span an afternoon or a year and the rate cannot tell. Fix it in the procedure: run every cell in one batch, on a fixed cadence, and record the date.

**Engines change under you.** OpenAI shipped opt-in device-location sharing in ChatGPT on **26 March 2026**, on iOS and web first, off by default and enabled per user; measurements taken before it were of an engine that frequently had no reliable idea where the user was. *(Verified 2026-07-27 against OpenAI's release and contemporaneous trade coverage; re-check before citing.)* Any series longer than a few months holds undocumented discontinuities — treat a step change as a suspect before a result.

**Your probes are not your customers.** You are sampling a distribution of your own construction; nothing here is a traffic number. [Did it work?](../02-core-practice/did-it-work.md) is where measurement meets outcomes.

Without SEOG this is a spreadsheet, the geo-anchored prompt from [chapter 5](../01-foundations/how-ai-answers-a-local-question.md), and the discipline to run every cell the same number of times and paste every answer in. Slow, and completely valid. [Doing it without SEOG](../99-appendix/doing-it-without-seog.md) has the long form.

## Labs

### Lab 20.1 — Design the probe set and anchor it

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **paid** · Time: ~15 min
>
> You need: a tracked keyword set (Lab 8.2), and ideally [Lab 5.3](../01-foundations/how-ai-answers-a-local-question.md) done by hand.

1. On paper, write the probe set: three to six unbranded questions, spanning at least one transactional term and one conversational phrasing.
2. Check them against your tracked keywords — anything active is already a probe row, since the AI check runs on active tracked keywords. Add what is missing with **Track**; the price is on the button.
3. Now the anchor. Add one of those questions a *second* time with a different **Search from** value — a neighbourhood or nearby town, not your own address. It saves as a separate row because the location is part of its identity.
4. Before running anything, write down what you expect the twin to do differently. A prediction you record is a test; one made afterwards is a story.

**What good looks like.** A written probe set, every row unbranded, one question present twice with two anchors, and a stated cell count: probes × connected engines.

**If it went wrong.** The twin will not save — same keyword, same location label and same language is the same row, so it needs a different **Search from** value. At your keyword quota: prune first, because a probe set you cannot afford to run five times is not a probe set.

**What you just learned.** The probe set is a design artefact, fixed before measurement rather than discovered during it. Changing the questions mid-series destroys comparability exactly as changing the instrument would.

### Lab 20.2 — Run a uniform matrix

> **Lab** · Where: **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **paid** · Time: ~20 min
>
> You need: Lab 20.1. Note which engines show **Not connected** — those produce clearly-labelled sample rows, and samples never count toward any rate.

![The top of the AI Visibility page with nothing tracked: three engine tiles of which two read Not connected, above a card headed "See if AI recommends you" listing Google AI Overview, ChatGPT and Claude with mention marks](../../static/img/screens/ai-visibility.png)

*What the page shows when no keyword is tracked yet. The three engine tiles sit in the **AI mention rate** band; two of them read **Not connected** — unmeasured columns, not zeros — and the fractions beside them are labelled *(example)*. Below the band, the card reads **See if AI recommends you**: its rows are engines rather than your probes, and it says **Example** on its own subtitle. It is a fixture — the real **Where AI mentions you** matrix from step 1 replaces it the moment one keyword is tracked.*

1. Scroll to **Where AI mentions you**. Every tracked keyword is a row, every engine a column.
2. Select your Lab 20.1 probes with the row checkboxes. The bar reads `N keywords × M engines = K checks` — your cell count for one pass — and the projected price is on the button.
3. Press **Check N selected** and wait for the batch counter. Do not leave the page: the batch stops when you navigate away.
4. Repeat, same selection, nothing else changed — four more times, so every cell has five runs. Space them out if you like, but record the date of each pass; the window counts runs, not days.

**What good looks like.** Five passes, an identical selection each time, and a note of the dates. The uniformity is what makes consistency interpretable.

**If it went wrong.** A cell shows **Sample**: that engine is not connected, its rows are fixture data excluded from every rate, and the column is unmeasured rather than zero. A pass returns fewer results than expected: checks can fail without stopping the batch, so re-run rather than scoring a miss.

**What you just learned.** The expensive part of this method is the repetition, and it is not optional. Budget for `n`, or do not claim a rate.

### Lab 20.3 — Read the rates, then put an error bar on them

> **Lab** · Where: **AI Visibility** (`/b/{businessId}/ai-visibility`) · Cost: **free** · Time: ~20 min
>
> You need: Lab 20.2 complete, with the same number of runs in every cell.

1. Read the **Presence** tile: the mention rate, and beneath it "mentioned in X of Y recent live answers" — your denominator. Write both down.
2. Open **Sources cited by AI** and find your own domain, pinned at the top with a **You** badge and a count of answers citing it. That count over the same Y is your citation rate — two numbers the screen never puts side by side.
3. Read **How AI recommends you**: **Included**, **Top pick**, **Avg position**, **Framing**. Write down how many *recommending answers* the denominator holds — smaller than your check count, and the difference is refusals and unparseable answers.
4. Write every cell as a fraction — `3/5`, not `60%` — with its worst-case error bar. Take the two cells with the largest apparent gap and ask whether their intervals overlap; if they do, strike the comparison out before someone else does.
5. Tally consistency yourself: how many cells had all five runs agree. It is on no screen, and it tells you whether the rest is signal.
6. Expand one row and read the actual answer on each engine. Check by eye: is the name match real, is the assigned stance the one you would assign, and is your domain genuinely in the source list or is it a directory page carrying your name.
7. Write the finding in three sentences carrying their denominators: *"Across N probes on three engines, five runs each, between DATE and DATE: mentioned in X of Y answers; own domain cited in Z. Absent on every engine for QUERY."*

**What good looks like.** A finding sentence carrying its own denominators and dates, and at least one comparison struck out for overlapping intervals. Striking one out is the exercise succeeding.

**If it went wrong.** The recommendations card says nothing has been judged: every answer refused or named no specific business — itself a strong finding, so record it. The tiles show an **Example** pill: no live checks have landed, and none of those numbers are about your business.

**What you just learned.** The discipline is not producing the rate, it is refusing to over-read it. "This movement is inside the error bar", said in front of a client, is the most credibility-building sentence available in this field.

## Common mistakes

**Reporting a percentage on five runs.** "60% AI visibility" reads as precision and is a 3/5 with a 65-point interval. Report fractions — they carry their own sample size. Same for averaging engines: 4/5 on one and 1/5 on another is two findings, not a mean.

**Running more checks on the probes you are winning.** Entirely natural, and it corrupts both the overall rate and the consistency tally. Uniform `n` across cells, including the humiliating ones.

**Treating a refusal as a loss.** An answer naming no businesses did not reject you, it left the question: in the mention-rate denominator, out of the recommendation denominator. Collapsing that is how "the AI never recommends us" gets said about an engine that recommends nobody.

**Re-measuring immediately after a change.** The index has not caught up and the window still holds pre-change runs. Change, wait, then run a full uniform pass.

## Check yourself

1. **Your mention rate is 12/24 and your own domain is cited in 2 of those 24. Say what is happening, and where the work goes.** (The engines are learning about you from other people's pages. Work the sources they cite, not your blog.)
2. **A cell moved from 1/5 to 3/5 after a month of review work. What are you entitled to say?** Name the interval, name the confounds, and say what would make the claim defensible.
3. **You tally consistency at 55%. What must you know about your run counts before that means anything?**
4. **You are absent on every engine for one probe and present on all three for another. Which finding is about the engines, and which about the business?**
5. **A client wants one number for AI visibility. Give them one — then name the three things that must travel with it, or it is not a measurement.** (Denominator, date range, engine split.)

---

**Next:** [Changing the AI answer →](./changing-the-ai-answer.md)
