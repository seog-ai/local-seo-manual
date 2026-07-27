---
title: Rank is a map, not a number
sidebar_position: 4
description: Why a single position for a local keyword is meaningless, what a geo-grid is, how grid size and spacing work, and how to read a heatmap honestly.
---

# Rank is a map, not a number

"What's my rank for *coffee shop*?" is a malformed question. Not a hard one — malformed, in the way that "how far away is it?" is malformed until you say from where. Local rank is a function of the searcher's location, and until you supply that location the question has no answer. It has a range of answers, and somebody has quietly picked one for you.

This chapter replaces the number with the right object: a field of positions across an area. Once you see rank as a surface, most of the arguments in local SEO reporting resolve themselves.

## The question has a missing argument

When someone searches for a plumber, Google knows where they are. It does not ask. On a phone it is device location; on a laptop it is the network address, or a place the browser remembered, or a city the person typed.

That location is an *input to ranking*, not a filter applied afterwards. The [three forces](./relevance-distance-prominence.md) include distance, and distance is measured from the searcher, not from you. Change the searcher's position by a mile and you have changed one of the three inputs.

So the honest signature of a local rank is not `rank(keyword)`. It is closer to `rank(keyword, latitude, longitude, moment, language)`. A rank tracker that prints one number has silently frozen four of those five arguments and shown you the value at a single coordinate.

Which coordinate? Almost always the business's own address — a reasonable default, and also the single most flattering point on the map, because it is where your distance term is zero and every competitor's is not. **The number on a conventional rank report is, by construction, close to your best possible result.** Nobody is lying. The instrument is pointed at the one spot where the news is good.

## Proximity decay

Walk away from the front door and your position degrades. This is not a penalty and it is not something you did wrong — it is arithmetic. Every step away from your own address moves some competitor closer to the searcher than you are, and Google re-sorts accordingly.

The previous chapter put published magnitudes on that decay, along with the reasons those magnitudes are softer than they look. The point here is structural rather than numeric: **whatever the decay curve is, one number cannot represent a surface.**

Two things make that surface less tidy than the word "decay" suggests.

**It is not a circle.** Decay follows competitor density, not geometry. If every rival clusters on one side of town, your visibility extends much further in the other direction. A river, a motorway or a city boundary can produce a sharp edge. *(Inference — a pattern practitioners read routinely in grids, not something Google documents.)*

**It is not smooth.** Rank is a sort order, and a sort order jumps. Two points 400 metres apart can differ by six positions because that step reordered three businesses whose scores were nearly tied.

## A geo-grid is the instrument

A geo-grid measures rank the way you would measure temperature across a room: sample it at many points and look at the field. Pick a centre, lay out an n×n lattice of points at a fixed spacing, run the *same* search from each point as though a person were standing there, and record where the business appears. What you get back is n² positions with coordinates attached. Drawn on a map with colour, that is a heatmap.

![A real 3x3 geo-grid scan over Helsinki: nine amber rank pins carrying positions between 4 and 7, with avg rank 4.8 and top-3 coverage 0% below the map](../../static/img/screens/geo-grid.png)

*A real scan, not an illustration: nine live searches for one keyword, one from each point. The pins read #4, #5 and #7 depending on where the searcher stands — same keyword, same minute, different answers. The two figures under the map compress all nine into `Avg rank 4.8` and `Top-3 coverage 0%`, which is where the trouble in the rest of this chapter starts. Note what those two numbers do and do not agree about: the business was **found at every single point**, and still scores zero on the headline coverage metric, because "top 3" is a threshold and #4 is on the wrong side of it.*

Doing it by hand is possible and instructive — an incognito window plus a location override in your browser's dev tools produces one grid point at a time, and twenty-five of them is an afternoon. See [Doing all of this without SEOG](../99-appendix/doing-it-without-seog.md).

### Two knobs, not one

A grid has two independent parameters doing different jobs.

- **Extent** — how much ground the grid covers. It tells you where your visibility ends.
- **Spacing (resolution)** — how far apart the points are. It tells you how fine a feature the grid can see.

Independent in principle; not in the app, where grid points are spaced **one mile apart** and the preset sets n. So the three presets change extent, and only extent.

| Preset | Grid | Points | Span at one-mile spacing |
| --- | --- | --- | --- |
| Quick | 3×3 | 9 | ~2 mi across |
| Standard | 5×5 | 25 | ~4 mi across |
| Detailed | 7×7 | 49 | ~6 mi across |

This is a real limitation and worth naming: **a one-mile grid cannot answer a question about half a mile.** If you want to know which side of the high street you win, no preset here will tell you — you need tighter spacing, which means running the points yourself. A grid resolves nothing smaller than its own step size.

An n×n scan is exactly n² live searches. Nine for 3×3, twenty-five for 5×5, forty-nine for 7×7. Not "about" — each point is one independent search run from that point's coordinates.

## Resolution is a statistical choice, not a budget one

Almost everyone learns grid size as a spending decision: small grid cheap, big grid expensive, choose by the client's budget. That framing is mostly wrong, and it is worth understanding why before you form the habit.

A rank measurement needs exactly one thing from Google: **which places came back, in what order.** Not their ratings, not their phone numbers, not their hours — you are looking for your own entry in a list and reading off its index.

Google prices a place search by *how much it tells you about each result*. Ask for the rich profile of every result and you are in the expensive tier. Ask for nothing but which places came back, in order, and the request lands in a tier Google's own published price list marks **unlimited, at no charge** (checked 2026-07-27 — API pricing changes, so check it again before you build anything on it). Critically, asking for less does not change the results or their order — only how much of each result is described back to you. The position is the index either way.

So the search half of a geo-grid scan has a wholesale cost of zero, at any grid size, at any volume. What remains genuinely chargeable is drawing the result on a real Google map, which happens once per scan and does not depend on n. The derivation — which requested fields push a call into which billed tier, with the tier prices — is [What Google's APIs actually cost](../05-reference/what-googles-apis-cost.md).

The consequence is not "grids are free" — every tool prices its own work, this one included, and you should read the price on the button before pressing it. The consequence is about *reasoning*:

> **Choose the grid for the question, not for the invoice.** If the question is "do I hold my immediate neighbourhood", 3×3 answers it and 7×7 adds noise. If the question is "where does my visibility stop", 3×3 cannot answer it at any price, because the answer is outside the grid.

## Reading your first heatmap

Read the shape first. Read the numbers second, and read them suspiciously.

Pins are coloured by position. The legend under the map carries five swatches: green for top 3, yellow for 4–10, orange for 11–20, red for 20+, grey for not found. The red one is vestigial — a grid reads exactly twenty deep, so a point either comes back with a position of 20 or better or comes back with nothing, and in a real scan you will only ever see the other four. The distinction that matters is **coloured versus grey**.

Five shapes cover most real grids. The causes below are inference from repeated reading, not documented behaviour.

| Shape | What it looks like | Usual cause |
| --- | --- | --- |
| **Smooth decay** | Green centre fading outward in rings | Healthy and proximity-dominated. The normal case. |
| **Plateau** | The same colour nearly everywhere | Strong prominence across the area, or a thin market. Check which. |
| **Cliff** | Good on one side, grey on the other, sharp edge | A boundary: competitor cluster, city line, river or motorway. |
| **Ring** | Weak at the centre, better further out | A dominant near neighbour sitting on top of you, or a centre point that is not really your address. |
| **Scatter** | No spatial structure at all | Low prominence. Position is decided by tie-breaks, not geography. |

*Above* the map the app prints a plain-language reading of the same thing — coverage, the average, the found rate ("you appear in the top 20 at 9 of 9 points"), and the compass direction you are strongest and weakest in ("strongest to the west and weakest to the south-east"). Treat that as a second opinion to check your own reading against. It only claims a direction when the gap between the best and worst side is large enough to mean something, so a genuine plateau produces no direction claim at all.

*Beneath* the map sit the two summary figures, which have **different denominators** and are routinely misread because of it:

- **Avg rank** — your average position *across the points where you appear*. Grey pins are not in it.
- **Top-3 coverage** — the share of *all* points where you rank in the top 3.

A business found at 2 of 25 points, at #1 in both, shows an average rank of 1.0 and top-3 coverage of 8%. The first number is true and nearly useless. **Never quote the average without the found rate beside it** — how many of the points you appeared at, out of how many were checked.

## Two properties to carry forward

Part III makes both of these rigorous. Learn them now as habits.

### Rank is ordinal

Position is a label of order, not a measured quantity. The step from #1 to #2 is enormous — the map pack shows three results, so it moves you down inside the only box anyone sees. The step from #11 to #12 is nothing; both are invisible. Arithmetic treats those two steps as identical, which is why "improved by 4.2 positions on average" sounds like a result and means very little.

You are allowed to do arithmetic on ordinals. You are not allowed to believe the answer without saying what you did.

### Not found is censored, not bad

A grey pin does not mean rank 21. It does not mean 25, or 50, or 100. It means the measurement ran out of depth before it found you: your true position is *somewhere worse than 20*, and the instrument cannot say where.

Statisticians call this right-censoring. It matters because every average over a grid must do *something* with those pins, and whatever it does is a choice that moves the result — [Reading a geo-grid without fooling yourself](../03-advanced/reading-a-geo-grid.md) has you score one grid four ways and watch the number travel. For now, one rule: [when you report a grid](../04-operating/reporting-to-a-client.md), give the found rate alongside anything else, and never let a grey pin quietly become a number.

## Labs

### Lab 4.1 — Run your first grid

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **paid** · Time: ~5 min
>
> You need: one tracked keyword — Lab 3.1.

1. Open **Rankings** and click the keyword you added in Lab 3.1.
2. Scroll to **Geographic visibility**. If you have never scanned this keyword you will see an **Example scan** — a clearly labelled illustration drawn on the real map of your area. Those pins are not your data.
3. Leave the detail level on **Quick** (`3×3 · ~2 mi`, `9 searches`).
4. Read the price on the **Check now** button *before* you press it. Then press it.
5. When the map appears, find the small solid dot at the grid centre — hover it and it reads **Your business**. Each numbered pin carries your position at that point. (The dot marks the grid's *centre*, which is your address unless you gave the keyword a **Search from** location, in which case it is that.)
6. Write down two things: your position at the **centre** pin, and your position at each of the **four corner** pins.

![The keyword detail panel before any scan: a 5x5 map of coloured pins under a banner reading Example scan, and a search-volume box carrying a Test data badge](../../static/img/screens/keyword-detail.png)

*Step 2, and the thing to be suspicious of. The banner says **Example scan** and the twenty-five pins below it are an illustration drawn on your real map — not your positions. The search-volume box higher up carries a **Test data** badge for the same reason. On this screen only the position, the rival names and their ratings and review counts are measured.*

**What good looks like.** Nine pins, the centre usually your best result. You now have nine measurements where you had one — and can see that the one you had was the friendliest of the nine.

**If it went wrong.**
- *Every pin is grey.* Three realistic causes: you genuinely do not reach the top twenty anywhere yet; the keyword is too broad for a 2-mile grid; or the business has a hidden address, in which case grid tracking cannot work at all — see [Why map-pack rank tracking cannot work for service-area businesses](../03-advanced/service-area-businesses.md).
- *No map renders.* The business has no stored coordinates. Check the address on the business record.
- *The pins still look like the example.* Confirm a **Checked …** timestamp appeared next to the button.

**What you just learned.** A rank is a reading taken at a coordinate. Nine coordinates give nine readings, and their spread is the actual answer to "how visible am I".

### Lab 4.2 — Count the calls, then count the ground

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **free** · Time: ~5 min
>
> You need: Lab 4.1.

1. Under **Geographic visibility**, read the three preset cards. Each states its point count: `9 searches`, `25 searches`, `49 searches`.
2. Confirm the rule: an n×n grid is exactly n² searches. 3² = 9. 5² = 25. 7² = 49. Extend it — 9×9 would be 81.
3. Now the other half. At one-mile spacing an n×n grid spans (n−1) miles across, so it covers roughly (n−1)² square miles: 3×3 covers ~4, 5×5 covers ~16, 7×7 covers ~36.
4. Divide points by area: 2.25, 1.56, 1.36. Sampling density barely moves, and it is heading for exactly one point per square mile — because the spacing, not the preset, sets it.

**What good looks like.** You can state the trade-off precisely: **the presets buy ground, not detail.** A Detailed scan is not a sharper picture of the same area; it is the same sampling density over roughly nine times the area.

**If it went wrong.** If your area figures came out as n² square miles, you counted points instead of gaps. Nine points a mile apart have only two gaps per side, so the lattice spans two miles, not three.

**What you just learned.** Size and resolution are different parameters solving different problems, and a tool exposing only one has made a decision for you. When you need resolution rather than extent, you need a tighter hand-run grid.

### Lab 4.3 — Read the shape before the number

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **free** · Time: ~10 min
>
> You need: the stored scan from Lab 4.1. Re-reading a stored scan is free, so do this as often as you like.

1. Reopen the keyword. The scan you already ran loads from storage — nothing is re-fetched.
2. **Do not read the numbers yet** — neither the plain-language summary above the map nor the Avg rank / Top-3 coverage line below it. Cover both if you have to; the summary states the average in its second sentence.
3. Describe the grid in one sentence using exactly one of: *smooth decay, plateau, cliff, ring, scatter*.
4. Name the compass direction where you are weakest. Open Google Maps at that corner of the grid and search your keyword there. Who is winning that ground?
5. Now uncover the plain-language summary above the map, including its "strongest to the … weakest to the …" claim. Does it agree with your sentence?
6. Finally read **Avg rank** and **Top-3 coverage** — and write the found rate next to them: *appeared at N of 9 points*.

**What good looks like.** Your one-sentence shape and the generated summary agree, and you can name a specific business responsible for your weak direction. You end with three figures, not two, and the third is what makes the other two safe to quote.

**If it went wrong.** If the honest description is *scatter*, that is a finding, not a failure — it usually means prominence is too low for geography to be deciding anything yet, and the fix is reviews and profile completeness rather than anything spatial. If your sentence and the summary disagree, note that the summary only claims a compass split when the gap is large enough to be meaningful; a genuine plateau produces no direction claim at all.

**What you just learned.** The shape carries the diagnosis. The average carries a summary of the shape with the worst points deleted from it.

## Common mistakes

**Reporting the average without the found rate.** The most common way a local SEO report misleads with nobody intending it. "Average rank 3.4" over a grid where you appeared at six of twenty-five points is arithmetic done on your best neighbourhood and presented as your market.

**Comparing two grids with different parameters.** Change the size, the spacing or the centre and the scans are not comparable — you changed which places were sampled, so any movement is partly an artefact of the change. Identical parameters or no comparison. Developed in [Did it work?](../02-core-practice/did-it-work.md).

**Treating a grey pin as a number.** It is the absence of a number. Anything you substitute for it is an assumption, and it belongs in the report next to the result it produced.

**Buying extent when you needed resolution.** Running a 7×7 to investigate a three-block anomaly spends forty extra searches and still cannot see the anomaly. Ask first whether the question is about *how far* or *how fine*.

**Calling the grid "my Google visibility".** It is one keyword, on one surface — the map pack — at one moment, read to a depth of twenty. It says nothing about the organic results below the pack, and nothing at all about what an AI assistant says when asked the same question. That surface has no grid, and it is where we go next.

## Check yourself

Answer these against your own scan, not from memory.

1. **Your tracker says #3. From where?** If you cannot name the coordinate the check ran from, you cannot defend the number. On a tracked keyword the detail panel shows chips for the **Search from** label, the language and the radius — but only for the ones you set yourself. Leave all three on their defaults, as Lab 3.1 does, and there are no chips at all: the origin is the business address, the language is Google's default for the region, the radius is three miles. A parameter you cannot see is still a parameter.
2. **At how many of your nine points did you appear at all?** Say that before you say your average rank. If they disagree in tone — strong average, weak found rate — the average is the one lying.
3. **A competitor claims "we rank #1 for *emergency plumber*".** What single question tells you whether the claim means anything? (*From what location, and how many locations were checked.*)
4. **Your grid is a clean cliff — green to the north, grey to the south.** Name two plausible causes that have nothing to do with your profile, and one way to check each.
5. **You want to know whether you win the block your shop is on.** Which preset do you use? (*None. One-mile spacing cannot resolve a block; you need a hand-run grid at tighter spacing.*)

---

**Next:** [How an AI assistant answers a local question →](./how-ai-answers-a-local-question.md)
