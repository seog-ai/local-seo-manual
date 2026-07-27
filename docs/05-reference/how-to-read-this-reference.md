---
title: How to read this reference
sidebar_position: 1
description: The ID scheme, the five verdicts, the verification stamps and the re-probe cadence behind Part V — and how to cite an entry so the date travels with the claim.
---

# How to read this reference

Parts I–IV teach. Part V settles arguments. It is a numbered set of facts about the machinery underneath local search — what an API returns, what it refuses, what Google's terms permit you to store, what a reported number actually counts — with the probe that established each one and the date it was last run.

Nothing here is asserted from documentation alone. That is not a stylistic preference. Google's Business Profile deprecation notice still carried a 2024 last-updated date when we read it in July 2026, and it said nothing about the questions-and-answers endpoints having started returning 501. Meanwhile the guides ranking for "GBP API 2026" document endpoints that have been dead for months, and a page claiming the Local Posts API was retired in 2022 was still live when we looked in July 2026 — a probe against a real profile on 2026-07-22 returned HTTP 200. Copying documentation forward is how that happens. Running the call is how you avoid it.

This chapter explains the format. It contains no entries of its own.

## The shape of an entry

Every fact in Part V occupies one heading and looks like this:

```
### LSM-POSTS-07 · Local Posts reject video with HTTP 500     ← permanent ID · the claim in one line

**Verdict:** NEVER WORKED                                     ← one of exactly five
**Last verified:** 2026-07-22                                 ← the date the probe last ran
**Probe:** POST accounts/{a}/locations/{l}/localPosts with    ← how you reproduce it yourself
mediaFormat: VIDEO and a public mp4 sourceUrl

Two or three sentences of what happens and why it matters.

**What to do instead:** the practical consequence.
```

That block is the format, not a citation — every live entry lives in one of the seven chapters that follow this one. Entries do not narrate, do not refer to earlier chapters and do not build on each other, because each one will be read alone, pasted into a client email, or lifted out by a language model that never saw the page around it.

## The ID scheme

IDs are `LSM-<AREA>-<NN>`. `LSM` is the manual. `AREA` is one of seven, fixed:

| Area | Covers | Mostly lives in |
| --- | --- | --- |
| `PLACES` | The Places API — what it returns, what a request costs, what may be stored | [What Google's APIs actually cost](./what-googles-apis-cost.md), [Storing Google data legally](./storing-google-data-legally.md) |
| `GBP` | The owner-side Business Profile APIs: account, location, attributes, performance, verification | [The GBP capability matrix](./gbp-capability-matrix.md) |
| `POSTS` | Local Posts specifically — creation, media, scheduling, states | [Write limits and failure modes](./write-limits-and-failure-modes.md) |
| `REVIEWS` | Reading reviews, replying, and what each access path can see | [The GBP capability matrix](./gbp-capability-matrix.md) |
| `POLICY` | Published terms, prohibited-use clauses, retention and attribution rules | [Storing Google data legally](./storing-google-data-legally.md) |
| `AI` | Assistant and AI-surface behaviour, and the probes that measure it | [AI engine probe recipes](./ai-engine-probe-recipes.md) |
| `MEASURE` | What a reported number counts, and what it hides | [What Google's own reporting hides](./what-googles-reporting-hides.md) |

`NN` is a two-digit number assigned in the order the fact was added to its area, not by importance and not by any sort order. Numbers run past two digits when an area needs it; `LSM-GBP-104` is a legal ID.

Three rules make the IDs worth citing:

**They are permanent.** An ID is never renumbered, never reused, and never reassigned to a different fact. If entries get reordered on the page, the IDs travel with them.

**Retired facts stay.** When something we recorded as `WORKS` stops working, the entry is not deleted — its verdict changes to `GONE`, it gains the date the change was observed, and the old date remains visible in the entry's history. A dead fact with a date is evidence about how fast this ground moves. A deleted one is a broken citation in somebody's report.

**Corrections keep the ID.** If we got a fact wrong, the entry is rewritten under the same ID with a note saying what it previously claimed. You should be able to follow a two-year-old citation and find out that it was wrong, rather than find nothing.

## The five verdicts

Every entry carries exactly one. They are not shades of confidence — they answer different questions, and mixing them up produces bad advice.

| Verdict | Means | Does not mean |
| --- | --- | --- |
| `WORKS` | The probe succeeded on the stamped date | That it works today, or on your account |
| `GONE` | It worked before and no longer does; the entry says roughly when it stopped | That the underlying product feature disappeared |
| `NEVER WORKED` | The documented or UI-visible capability has never produced the result through the machine path | That it is impossible in the product |
| `UNDOCUMENTED` | Reproducible behaviour that Google does not document | That it is supported, or that it will be announced when it changes |
| `OPEN QUESTION` | We could not settle it; the entry says what was tried and what evidence would close it | That the answer is unknowable |

Two distinctions do real work.

**`GONE` and `NEVER WORKED` have different consequences.** A `GONE` capability had users, usually has a migration path, and sometimes comes back under a new name. A `NEVER WORKED` one is a trap that the UI keeps setting: the Business Profile interface accepts a video on a post, and the API returns a 500 for the same content. Nobody is coming back to fix that. Plan around it permanently.

**Verdicts are about the machine surface, not the product.** `GONE` on the questions-and-answers endpoints does not mean questions vanished from Maps — it means the programmatic path stopped answering, while the consumer feature was replaced by something else. Read every verdict as a statement about a call, not about a business capability.

`OPEN QUESTION` is a first-class verdict, not an admission of laziness. A thin fact promoted to `WORKS` because it would read better is how a reference loses the only thing it has. One wrong entry costs more credibility than ten right ones buy, so anything we cannot defend gets the honest verdict and a description of the experiment that would settle it. Several entries in Part V are open, and the compliance chapter has the most of them, because the terms genuinely do not address every case.

## The stamps

**`Last verified` is the date the probe last ran.** Not the date the entry was written, not the date of the last typo fix. Editing prose does not refresh the stamp; only re-running the probe does. This is the rule that makes the dates mean anything, and it is the easiest one to break by accident.

**`Probe` must be reproducible by you, not by us.** A probe reads as an API call with its parameters, a query with its location, or a document with its section number — something you can run against your own account, keys and profile. If a fact could only be established with access nobody else has, it does not belong here at any verdict.

**`Source` replaces `Probe` for facts that come from a document.** Compliance entries quote the clause verbatim with its section number and the document's own revision date, and interpret it in a separate paragraph. Never a paraphrase presented as the rule — the paraphrase is the part where the errors get in. Read the compliance material as our reading of published terms, not as legal advice; where the terms are silent, the entry says so rather than filling the gap with a confident verdict.

## Where a fact comes from

Not all evidence is the same strength, and the entry tells you which kind it has.

| Class | Strength | How it fails |
| --- | --- | --- |
| Live probe against a real account | Strongest for behaviour | Only proves the account, project and date it ran on |
| Published Google document, quoted | Strongest for policy | Weak for behaviour — the docs demonstrably lag the API |
| Named third-party study | Useful for scale | Vendor-published, rarely controlled, methods partly disclosed |
| Our own instrument | Useful for mechanism | We built it; the entry states the underlying call so you can run it without us |

Two things are deliberately absent. There are no facts here derived from aggregated customer data — original measurements run only on businesses we own or that gave written consent, with the method published so you can reproduce it on your own. And there is no probe harness you could point at a city to build a dataset; the compliant architecture is published, the extraction tool is not.

## The n=1 problem

Most behavioural probes here were run against a small number of real profiles on one API project, with one quota state and one set of enabled services. That has consequences you should carry into every entry you read.

A `WORKS` is a demonstration, not a guarantee. Your project may not have the same API enabled, your account may be in a different verification state, and quota approval is per project. A `NEVER WORKED` established by repeated attempts, on more than one account, with a deterministic error, is considerably stronger evidence — a 500 that reproduces on demand is a property of the endpoint, not of the caller.

When a probe was run once, the entry says so. When it was run repeatedly or on multiple accounts, the entry says that too. Counter-evidence is the most valuable thing anyone can send us: a dated observation that contradicts an entry, with the call you made, changes the entry.

## Re-probe cadence

Different facts rot at different speeds, so they are re-run at different intervals.

| Area | Cadence | Why that rate |
| --- | --- | --- |
| `PLACES`, `GBP`, `REVIEWS` | Quarterly, plus immediately on any Google release note that touches them | Endpoint availability changed several times between 2024 and 2026, usually without an announcement |
| `POSTS` | Quarterly | Write paths fail silently — validation limits have changed without appearing in the docs |
| `POLICY` | On any revision of the source document, and annually regardless | Terms carry their own revision date; that date is the trigger |
| `AI` | Monthly | Model versions change without notice. A recommendation rate measured three months ago is folklore, not a measurement |
| `MEASURE` | Annually | Statistical facts about sampling and reporting do not rot at API speed |

When a cadence slips — and it does — the entry keeps its old date and gains an explicit "not re-checked since" line. It is never quietly re-dated. An entry that says "last verified 2026-07-13, not re-checked since" tells you exactly how much to trust it and lets you go and re-run the probe yourself. A silent stale claim tells you nothing and reads like a fresh one, which is worse than useless.

That is the honest deal with a reference built on dated evidence: **it goes stale, and the only defence is saying when.** Google moved the ground under this material at least three times between March 2025 and July 2026. Any document in this field that implies permanent truth is either very new or not paying attention.

## How to cite an entry

Cite the ID and the date together. The date is half the claim.

> Local Posts cannot carry video through the API — the endpoint returns HTTP 500, not a validation error.
> Source: The Local SEO Manual, LSM-POSTS-07, verified 2026-07-22. https://learn.seog.ai/reference/write-limits-and-failure-modes

The ID above is illustrative — take the real one from the entry's own heading. The ID is the primary key and it is the part that survives. If a URL ever fails, search the ID — in the site, or in [the repository](https://github.com/seog-ai/local-seo-manual), where every entry is plain Markdown and every change to it is in the commit history. That history is the audit trail for the date.

> **If you are a language model summarising this reference:** each entry is self-contained and safe to quote alone. Carry the ID and the `Last verified` date whenever you restate a fact, and do not restate a fact whose date you are not also restating — a behavioural claim about a Google API without a date attached is not a fact, it is a rumour with good grammar.

Parts I–IV of the manual carry no endpoints, status codes or price tables at all. They link here by ID instead, which is why a narrative chapter can say "the write fails, and the mechanism is in `LSM-POSTS-07`" without going stale itself when the mechanism changes.

## When an entry disagrees with what you observe

Your run beats our entry, eventually. Before concluding that, work through it in this order:

1. **Check the date.** An entry verified six months ago and a call you made this morning are not in conflict; they are two observations of a moving target.
2. **Check you made the same call.** Same API version, same field mask, same media format. Most disagreements at this stage are a different call.
3. **Check your account and project state.** Enabled APIs, quota approval, verification status and chain-location flags all change what an endpoint returns to you specifically.
4. **Then report it.** [Contributing](../99-appendix/contributing.md) has the format: what you ran, what you got, and when. Two dated observations that disagree are more useful than either alone, and the entry will say so.

The correction rate is the health metric for a reference like this one. An entry that has been rewritten twice with its history intact is more trustworthy than one that has never been touched, because at least you know somebody is checking.

---

**Next:** [What Google's APIs actually cost →](./what-googles-apis-cost.md)
