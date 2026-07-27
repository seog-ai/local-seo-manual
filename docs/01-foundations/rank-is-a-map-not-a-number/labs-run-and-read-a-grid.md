---
title: "Labs: run and read your first grid"
sidebar_position: 3
description: Three labs — run a 3×3 scan, count searches against ground covered, and read the shape of the grid before you read its numbers.
---

# Labs: run and read your first grid

One paid scan, then two free readings of it: the arithmetic of what a preset buys, and the shape of the map before any average.

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

![The keyword detail panel before any scan: a 5x5 map of coloured pins under a banner reading Example scan, and a search-volume box carrying a Test data badge](../../../static/img/screens/keyword-detail.png)

*Step 2, and the thing to be suspicious of. The banner says **Example scan** and the twenty-five pins below it are an illustration drawn on your real map — not your positions. The search-volume box higher up carries a **Test data** badge for the same reason. On this screen only the position, the rival names and their ratings and review counts are measured.*

**What good looks like.** Nine pins, the centre usually your best result. You now have nine measurements where you had one — and can see that the one you had was the friendliest of the nine.

**If it went wrong.**
- *Every pin is grey.* Three realistic causes: you genuinely do not reach the top twenty anywhere yet; the keyword is too broad for a 2-mile grid; or the business has a hidden address, in which case grid tracking cannot work at all — see [Why map-pack rank tracking cannot work for service-area businesses](../../03-advanced/service-area-businesses/index.md).
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

**If it went wrong.** If the honest description is *scatter*, that is a finding, not a failure — it usually means prominence is too low for geography to be deciding anything yet, and the fix is reviews and profile completeness rather than anything spatial.

If your sentence and the summary disagree, note that the summary only claims a compass split when the gap is large enough to be meaningful; a genuine plateau produces no direction claim at all.

**What you just learned.** The shape carries the diagnosis. The average carries a summary of the shape with the worst points deleted from it.

## Common mistakes

**Reporting the average without the found rate.** The most common way a local SEO report misleads with nobody intending it. "Average rank 3.4" over a grid where you appeared at six of twenty-five points is arithmetic done on your best neighbourhood and presented as your market.

**Comparing two grids with different parameters.** Change the size, the spacing or the centre and the scans are not comparable — you changed which places were sampled, so any movement is partly an artefact of the change. Identical parameters or no comparison. Developed in [Did it work?](../../02-core-practice/did-it-work/index.md).

**Treating a grey pin as a number.** It is the absence of a number. Anything you substitute for it is an assumption, and it belongs in the report next to the result it produced.

**Buying extent when you needed resolution.** Running a 7×7 to investigate a three-block anomaly spends forty extra searches and still cannot see the anomaly. Ask first whether the question is about *how far* or *how fine*.

**Calling the grid "my Google visibility".** It is one keyword, on one surface — the map pack — at one moment, read to a depth of twenty. It says nothing about the organic results below the pack, and nothing at all about what an AI assistant says when asked the same question. That surface has no grid, and it is where we go next.

## Check yourself

Answer these against your own scan, not from memory.

1. **Your tracker says #3. From where?** If you cannot name the coordinate the check ran from, you cannot defend the number. On a tracked keyword the detail panel shows chips for the **Search from** label, the language and the radius — but only for the ones you set yourself.

   Leave all three on their defaults, as Lab 3.1 does, and there are no chips at all: the origin is the business address, the language is Google's default for the region, the radius is three miles. A parameter you cannot see is still a parameter.
2. **At how many of your nine points did you appear at all?** Say that before you say your average rank. If they disagree in tone — strong average, weak found rate — the average is the one lying.
3. **A competitor claims "we rank #1 for *emergency plumber*".** What single question tells you whether the claim means anything? (*From what location, and how many locations were checked.*)
4. **Your grid is a clean cliff — green to the north, grey to the south.** Name two plausible causes that have nothing to do with your profile, and one way to check each.
5. **You want to know whether you win the block your shop is on.** Which preset do you use? (*None. One-mile spacing cannot resolve a block; you need a hand-run grid at tighter spacing.*)

---

**Next:** [How an AI assistant answers a local question →](../how-ai-answers-a-local-question/index.md)
