---
title: Building a keyword set that spans the intents
sidebar_position: 2
description: Why a suggestion generator can only produce discovery keywords, why your tracked set is also your AI prompt set, and how to build a first list of six to ten.
---

# Building a keyword set that spans the intents

The taxonomy is only worth having if the list you track spans it. Most lists do not, and the reason is mechanical: of the four intents, a suggestion generator can construct only one.

## Why a keyword tool can only hand you one intent

**Suggestions are permutations of three strings the tool already holds** — in the lab below, and in every tool built the same way: your category, your city, and your business name.

That gives a predictable skeleton: `category`, `category near me`, `category in city`, `best category`, `top category`, `best category in city`, `your name`, `your name near me`. The skeleton is topped up with head terms lifted from Google's autocomplete, seeded with the same category. Then a fixed priority ordering decides which ones you see first.

![The Rankings page with an AI keyword-suggestion panel reading "Get AI-suggested keywords to track, based on your business and area", beside a Suggest keywords button](../../../static/img/screens/rankings-tracked.png)

*Read the panel's own description literally: suggestions are built "based on your business and area". That is the entire seed — and it is why the list that comes back can only ever contain one of the four intents.*

Now look at what that machinery can and cannot produce.

| The generator emits | Because the seed contains | Intent it lands in |
| --- | --- | --- |
| `category`, `category near me`, `category in city` | your category and your city | **Discovery** |
| `best category`, `top category in city` | the same two, plus a superlative | Nominally comparison — see below |
| `your name`, `your name near me` | your business name | Neither trust nor logistics |
| Leading words of nearby business names | a places autocomplete top-up | Discovery vocabulary |

| It cannot produce | Because it would need | Intent lost |
| --- | --- | --- |
| `cheapest emergency locksmith glasgow` | the customer's words, not your category name | **Comparison** |
| `Acme vs Riverside` | a rival the customer has in mind | **Comparison** |
| `is Acme Plumbing legit` | a *worry* | **Trust** |
| `does Acme deliver on Sundays` | a *fact about the business* | **Logistics** |

Two of those rows deserve a sentence each.

**The superlatives are a fringe, not a category.** `best category` is a superlative applied to *your own category name*. The vocabulary a real comparison query uses is the customer's, and the generator has never met a customer.

**The autocomplete top-up is not what it sounds like.** It is a *places* autocomplete — it returns predicted businesses near you, and the tool lifts the leading words of each name. That is closer to a list of your neighbours' trading names than to a record of what anyone typed. Useful vocabulary; still category vocabulary.

> The missing intents are missing not because they were filtered out, but because **nothing in the input could have generated them.**

So a suggestion list is, in practice, a discovery list with a superlative fringe *(inference — read off the construction of the suggestion generator, not from testing every tool on the market)*.

### The volume number does not choose the set

One more thing, because it is the belief that does the most damage: the volume figure does **not** choose the list.

**The ordering happens before the number arrives.** Suggestions are ordered by a fixed priority table before any volume is looked up; the number is fetched afterwards and pasted beside each chip, blank where there is none — which is most branded rows.

**And the number is not local.** The figure itself is planner-style data requested against a country-level geographic target: a national monthly average, not the number of people who will search that phrase within three miles of your door. Use it to break ties, never to pick the set.

What the generator cannot reach — a comparison in the customer's words, a trust query, a logistics query — is what you write yourself. That is the actual work of this chapter.

## The tracked set is also your AI prompt set

When you check whether an AI assistant recommends a business, something has to be asked. The question is built from a tracked keyword and the coordinate that keyword is anchored to — in effect, *someone near this point asks this; name the local businesses that answer it*.

> The keyword you track **is** the question the assistant is asked ([how an AI assistant answers a local question](../how-ai-answers-a-local-question/index.md)).

Two consequences follow:

**A set of four discovery synonyms produces four nearly identical AI probes.** You pay four times and learn one thing. Worse, you learn it four times in a row and mistake the repetition for evidence.

**Not every intent makes a sensible probe.** A branded trust query (`Acme Plumbing reviews`) is a perfectly reasonable thing to watch and a nearly useless AI probe: it names the business, so of course the answer discusses the business. A probe that names its subject begs its own answer.

Comparison queries are the opposite — a weak map-pack keyword, and the strongest AI probe you have, because they ask the engine to choose.

| Intent | Useful as a rank-tracked keyword | Useful as an AI probe |
| --- | --- | --- |
| Discovery | Yes — this is the core | Yes |
| Comparison | Weakly | Yes — the strongest probe |
| Trust | As a watch item, not a position | No — branded, begs the answer |
| Logistics | No | No |

**This is the reason to build one list with an intent tag on every row**, rather than a keyword list for rank tracking and a separate prompt list for AI visibility.

Two lists built independently cannot be reconciled later, and any report that puts a rank trend and an AI mention rate side by side is quietly comparing two different populations.

The reusable version of this list lives in the appendix ([the local prompt corpus](../../99-appendix/the-local-prompt-corpus.md)); the measurement method that consumes it is in [Part III](../../03-advanced/ai-visibility/index.md).

## Building a first set that spans

Six to ten keywords is enough to start, and more than ten is usually four synonyms wearing hats. A workable first shape:

- **Three or four discovery queries.** Your main category, one service-specific variant, one neighbourhood or city variant. These are the ones that earn money and the ones you will grid-scan.
- **Two comparison queries.** Phrased the way a customer would phrase them, superlative included.
- **One or two trust queries.** Branded. You are watching what is said, not where you rank.
- **One logistics query.** Branded and factual. Its purpose is to catch a wrong field before a customer does.

Two rules that save you from the most common mess:

1. **One row per question, not one row per phrasing.** `plumber near me` and `plumber nearby` are the same question. Pick the one your customers actually say and drop the other.
2. **A second row is justified by a different *place*, not a different word.** Tracking `plumber` from two neighbourhoods measures two genuinely different things, because distance is a real force. Tracking `plumber` and `plumbers` measures nothing twice.

Where the words themselves come from is a separate problem, and there is a better source than your own imagination: Google reports to the owner the search terms that actually produced their profile. That is the subject of [building a tracked set that tells the truth](../../02-core-practice/choosing-what-to-track/index.md), and it will change your list.

---

**Next:** [Tracking your first keyword set →](./tracking-your-first-keyword-set.md)
