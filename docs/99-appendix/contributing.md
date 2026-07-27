---
title: Contributing, and how this manual is verified
sidebar_position: 7
description: How to send a correction that changes an entry, the review standard a pull request is held to, the LSM ID rules, and what this manual will not publish.
---

# Contributing, and how this manual is verified

The most valuable thing you can send is a dated observation that contradicts something written here. Not a suggestion, not a disagreement — a call you made, what came back, and the day you made it. That is the only kind of evidence this manual is built from, and it is the only kind that changes an entry.

Everything else — typos, broken links, a lab step that no longer matches the app, a chapter that is missing the obvious next section — is welcome too, and easier. This page tells you where each one goes, what it has to carry, and what a reviewer will check before it merges.

The source is at [github.com/seog-ai/local-seo-manual](https://github.com/seog-ai/local-seo-manual). Every page on the site has an **Edit this page** link at the bottom that opens the exact Markdown file on GitHub. There is no contributor licence agreement to sign and no account to create beyond a GitHub one.

## The one-minute version

| What you have | Where it goes | What it must carry |
| --- | --- | --- |
| A behavioural claim that contradicts a Part V entry | Issue, or a pull request editing that entry | The call, the response, the date — see the template below |
| A fact you probed yourself that is not here | Pull request adding an entry | ID, verdict, `Last verified`, probe |
| A typo, a broken link, a wrong screen name | Pull request | Nothing else |
| A lab step that no longer matches the app | Issue | What you saw, and the date you saw it |
| A whole new chapter | Issue first | An outline, and why it is not a section of an existing chapter |
| A translation | Issue first | Which locale, and who will maintain it when the English moves |

Corrections outrank additions. A manual whose value is dated evidence rots continuously, and the people finding the rot are the people using it.

## What a good correction looks like

Paste this into an issue and fill it in. It is short on purpose.

```
What I ran:      <the exact call, query or document section — enough to repeat>
Where from:      <account / project state, or the coordinates and device for a search>
What came back:  <status code and the verbatim error string, or the result in order>
When:            <YYYY-MM-DD, and the timezone if it could matter>
Contradicts:     <the entry ID and the sentence in it you are contradicting>
```

A worked example of one that would change an entry. **It is invented, including the date and the response — do not cite it as an observation:**

```
What I ran:      POST v4/accounts/{a}/locations/{l}/localPosts, mediaFormat VIDEO,
                 public mp4 sourceUrl, 12 MB, business.manage token
Where from:      own single-location profile, verified, not chain-detected
What came back:  HTTP 400 INVALID_ARGUMENT — "Media format not supported"
When:            <the day you ran it>
Contradicts:     the entry recording a 500 on this call; I got a 400
```

A report of that shape is actionable in five minutes, because it moves the error from a server error to a validation error — exactly the distinction the entry rests on. The entry gets re-probed, re-dated, and your observation named in it.

Compare with one that cannot be used: *"the posts API is broken now."* Nobody can tell what you called, on what kind of location, or when. It is not wrong — it may well be the first sighting of a real change — but it is not yet evidence, and turning it into evidence is work only you can do, because only you have the account it happened on.

Four things make the difference between the two:

- **Quote error strings verbatim.** The literal message is often the whole fact. Two of the Local Posts character limits in Part V exist only because the API said the number out loud in a validation error.
- **Say where you were standing.** For an API claim that means the account, project and verification state. For a search claim it means the coordinates, the device and whether you were signed in — a rank observed from an unstated location is not an observation.
- **Date it.** An undated contradiction cannot be resolved against a dated entry, because there is no way to tell which of you is describing the past.
- **For anything involving an AI engine, send a rate, not an answer.** One run is a sample. The prompt set, the number of runs and the date are the measurement; the transcript is an illustration. [AI engine probe recipes](../05-reference/ai-engine-probe-recipes.md) has the method.

Probe on a listing you own, never a client's, and prefer probes where the *failure* is the answer — [probe hygiene](../04-operating/staying-current.md) covers why, and what happens to people who ignore it.

## Three things that feel like corrections and are not

**A documentation link that contradicts a probe.** Google's published pages lag its API, sometimes by years, and the reference is built on calls precisely because of that. A doc that disagrees with a working call does not overturn the call. It is still worth sending — the gap between what a page says and what an endpoint does is itself a fact, and it usually becomes a `POLICY` entry or a changelog line rather than a correction to a behavioural one.

**Disagreement without an observation.** "That is not my experience" is the beginning of a correction, not one. Run the thing, write down what happened, then send it. If your run agrees with the entry, that is also worth sending: a second account reproducing a result is the single cheapest way to strengthen a fact established on one.

**One AI answer.** Screenshots of an assistant naming — or failing to name — a business circulate constantly. A single generation is not a measurement of anything, and an entry will not move on one.

## How this manual is verified

Nothing here is asserted from documentation alone. When two sources conflict, they are ranked in this order, and the ranking is the whole method:

1. **A dated call you can reproduce.** Strongest for behaviour. Weakest at scale: it proves the account, project and date it ran on, and nothing else.
2. **A clause quoted verbatim, with its section number and the document's own revision date.** Strongest for policy. Never a paraphrase presented as the rule — the paraphrase is where the errors get in.
3. **A named third-party study with a disclosed method.** Useful for scale, which the first two cannot reach. Vendor-published and rarely controlled, so it is cited with its sample size and its owner's name attached.
4. **Everything else.** Not evidence. Forum consensus, an undated blog post, a conference slide, a tool's dashboard number with no stated source.

Four supporting rules keep it honest.

**`Last verified` is the date the probe last ran.** Not the date the prose was edited. Fixing a typo in an entry does not refresh its stamp; only re-running the probe does. Note that the *site* also shows a "Last updated" timestamp under each page, derived from the git history — that is a different thing, it moves on every edit, and it is not a verification date.

**Retired facts stay.** A capability that stops working keeps its ID and gains the verdict `GONE` with the date the change was seen; the old date stays visible. A dead entry with two dates on it is evidence about how fast this ground moves. A deleted one is a broken citation in somebody's client report.

**Screenshots come from a real running instance**, captured by a script (`scripts/capture.mjs`) rather than taken by hand, so they can be regenerated when the app changes. None is a mock-up. The manifest at `static/img/screens/README.md` records which business each capture is of and which panels in it carry the app's own *Example* or *Test data* labels.

**The audit trail is public.** Every entry is plain Markdown in a public repository, and every change to it — including every date change — is in the commit history. If you want to know when a fact was rewritten and what it said before, `git log` on the file answers it.

What is deliberately absent is as much of the method as what is present: no facts derived from aggregated customer data, no extraction harness, no tool pricing. The reasons are in [what this manual will not publish](#what-this-manual-will-not-publish) below.

## The review standard

A pull request is read in this order. The first five block a merge; everything after is fixed in review rather than refused.

**Blocking:**

1. **An undated behavioural claim.** Anything that could change without notice carries a date, or it does not go in.
2. **A lab that names a screen, button or path that does not exist.** The fastest way to lose a reader is to tell them to click something that is not there. The real screens are listed below.
3. **A Part V entry missing an ID, a verdict, a `Last verified` date or a probe.** All four, every time. A fact nobody can reproduce is an opinion with a heading.
4. **Anything on the never-publish list.**
5. **An invented number.** No illustrative statistics presented as real ones, no "studies show" without a link, no percentage that cannot be traced to a named source. If you need an example figure, label it as an example.

**Fixed in review:** prose, structure, ordering, over-length chapters, link style, an entry filed under the wrong area.

Two mechanical rules catch most of the rest. `:::note` admonitions and MDX components render as literal garbage on GitHub, which is half the distribution, so the manual uses blockquotes and plain Markdown only. And endpoints, status codes, field masks and price tables belong in Part V — a narrative chapter links to the entry by ID instead, which is what lets it stay true when the mechanism changes.

Inference is marked `*(inference)*` and says what the observation was. "Nobody outside Google knows this, and anyone who tells you otherwise is guessing" is an acceptable sentence and frequently the accurate one.

## The LSM ID rules

Every fact in Part V has a permanent identifier, because entries get cited in client deliverables and quoted by language models that never saw the page around them. The scheme and the verdicts are defined in [How to read this reference](../05-reference/how-to-read-this-reference.md); this section is the part you need in order to *add* one.

**Format.** `LSM-<AREA>-<NN>`, where `AREA` is one of exactly seven: `PLACES`, `GBP`, `POSTS`, `REVIEWS`, `POLICY`, `AI`, `MEASURE`. Area is chosen by subject, not by which product technically serves the endpoint — a Local Posts fact is `POSTS` even though Local Posts is a Business Profile API, because that is where a reader goes looking.

**Allocation.** Take the highest number currently in use in that area *anywhere in the manual* and add one. Never fill a gap.

```bash
# the next number in an area
grep -rho 'LSM-POSTS-[0-9]*' docs/ | sort -u -t- -k3 -n | tail -1
```

**Gaps are deliberate.** A missing number means an ID was retired or a block was reallocated. Reusing it silently repoints every existing citation at a different fact, which is the one failure mode this whole scheme exists to prevent.

**Uniqueness is repo-wide, not per chapter.** An ID is defined exactly once, by the `###` heading of its entry. Check before you allocate:

```bash
# any ID defined more than once
grep -rho '^### LSM-[A-Z]*-[0-9]*' docs/ | sed 's/### //' | sort | uniq -d
```

> **Known defect, 2026-07-27.** That check does not currently come back clean. Several numbers are defined in more than one Part V chapter — an artefact of chapters being drafted in parallel against the same area sequences. It is a defect, not a second namespace. Reconciliation is one entry at a time: the more widely cited entry keeps the number, the other is reallocated to the top of its area's sequence and carries a line recording the ID it used to have. Until that finishes, cite an entry by ID **and** page URL **and** date, not by ID alone. One known false positive in that command: the format example in *How to read this reference* sits inside a code fence and is not a real entry.

**Corrections keep the ID.** If a fact was wrong, the entry is rewritten under the same ID with a line saying what it previously claimed. Someone following a two-year-old citation should discover that it was wrong, rather than find nothing at all.

**Lab numbers work the same way.** Labs are numbered `Lab <chapter>.<n>` and are cross-referenced by number in later chapters' prerequisites. Append a new lab at the end of its chapter; never renumber an existing one to make room.

## Contributing a lab

A lab is a short exercise a reader runs on a real business, with a stated cost and a falsifiable "what good looks like". Five rules:

**Name a real screen.** The screens are `/b/{businessId}/` plus `overview`, `rankings`, `reviews`, `competitors`, `ai-visibility`, `website`, `posts` or `profile`; plus `/businesses`, `/businesses/new`, `/billing` and `/settings/agents`. Bold the control exactly as it is labelled on screen. If you are unsure a button exists, open the screen and look.

**State the cost correctly.** A lab is **free** if every step reads data already stored on the account, and **paid** if any step fetches from Google or calls a model. There is a test you can run from outside: anything that goes back to Google carries its price on the button before you confirm, so if a step's button shows a price, the lab is paid. Never write a number — prices change, and a manual should not lie to you a year from now.

**Say what good looks like, and how it fails.** "What good looks like" has to be something the reader can check against their own screen. Then two or three realistic failure modes, phrased as what they will actually see.

**Prefer labs that write nothing.** Most of this manual works read-only on a business the reader does not own, and that is a feature — it is how someone learns before they have a client. If a lab must write to Google, say plainly that it needs a profile the reader owns.

**Never instruct something against Google's policy.** Two come up constantly and are both out: automated review replies, and AI-generated imagery on a profile. They can be documented as constraints, quoting the policy text — never recommended, and never demonstrated in a lab.

## Screenshots

Send the *conditions*, not the file, where you can — a regenerable capture beats a pasted PNG that nobody can reproduce. If you do send images:

- **No mock-ups.** Real app, real data, or it does not go in.
- **Keep Google's attribution in frame.** Any capture showing Maps or Places content must retain the visible "Map data ©2026 Google" credit. Cropping it out breaks the attribution condition that comes attached to the data, and the manual has a chapter about exactly that ([storing Google data legally](../05-reference/storing-google-data-legally.md)).
- **Never present sample data as measurement.** Several app panels show clearly-labelled placeholder rows before anything is tracked. If a screenshot contains one, the caption says so.
- **Caption what to look at.** An uncaptioned screenshot is decoration.
- **Use your own business, not a client's.** Nothing containing someone else's data, your account identifiers, or a token should ever reach a public repository.

## What this manual will not publish

Six categories, with the reason each one is out. They apply to contributions exactly as they apply to us.

| Not published | Why |
| --- | --- |
| Tool pricing — ours or anyone's | What *Google* charges is a fact about the market everyone operates in and is published in full. What a tool charges on top is commercial, changes on its own schedule, and would go stale in a document built to be cited. Labs say free or paid. |
| Rate-limit, quota-abuse or alerting thresholds | Publishing the number tells you how to stay just under it. The design principle is publishable and more useful: breadth of distinct places, not call volume, is the signature of dataset-building. |
| Anything derived from aggregated customer data | Original measurements run only on businesses the author owns or that gave written consent, with the method published so anyone can reproduce it on their own data. |
| A scraper or dataset builder | Google's terms name copying business names, addresses and reviews as prohibited. The compliant architecture is published in full; a harness that produces a redistributable dataset is not. |
| Automated review replies, and AI-generated profile imagery, as recommended practice | Both are against Google policy. Document them as constraints with the policy text. |
| Deployment or configuration detail of a specific installation | Patterns and principles, yes. Somebody's endpoint layout, session-key scheme or middleware config, no. |

One more register rule. Compliance material is a reading of published terms, not legal advice, and any section quoting terms of service says so. Quote the clause with its section number and the document's revision date, then interpret it in a separate paragraph. Where the terms are silent, the entry says they are silent — an open question stated as open is worth more than a verdict that cannot be defended.

## Mechanics

```bash
npm install
npm run dev      # http://localhost:3007
npm run build    # run this before opening a pull request
```

`npm run build` is the only check that catches broken links and anchors; `npm run dev` does not. Read its output rather than its exit code — broken links are configured to **warn**, not fail, so that one stale relative link cannot block a deploy of thirty-plus pages. A clean exit with warnings in the log is not a clean build.

Chapters live in `docs/<part>/<slug>.md`. Filenames are lowercase and hyphenated and are part of the public URL, so renaming one breaks inbound links — prefer a new file with a pointer over a rename. Every page needs `title`, `sidebar_position` and a one-sentence `description` under 160 characters, written for a search result rather than for the sidebar.

Keep the pull request description to two things: what changed, and what evidence supports it. Commit subjects are imperative and prefixed — `docs: correct the video-on-posts error code`, `fix: broken anchor in the capability matrix`.

The full contract is [`STYLE.md`](https://github.com/seog-ai/local-seo-manual/blob/main/STYLE.md) in the repository root. Every **MUST** in it is enforceable in review; this page is the practical half of it.

**Licensing.** The manual is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). By opening a pull request you agree that your contribution is published under the same licence. You keep authorship, and it stays in the commit history permanently.

## What happens after you send it

Four outcomes. None of them is silence:

- **The entry is re-probed and re-dated**, naming your observation. This is the common one for a well-formed contradiction.
- **The entry gains a second dated observation** and says the two disagree. Two dated results that conflict — different account, different project state, different day — are more informative than either alone, and pretending otherwise would be the dishonest option.
- **The entry is demoted to `OPEN QUESTION`** with a note on what would settle it. That is a real result, not a failure to reach one.
- **Nothing changes, with a reason.** Usually because the report was of a different call than the entry describes, which is where most disagreements land once both sides are written down precisely.

The correction rate is the health metric for a manual like this. An entry rewritten twice with its history intact is more trustworthy than one never touched, because at least you know somebody is checking. If you find something wrong here, you are the somebody.
