---
title: Why two tools disagree
sidebar_position: 1
description: Two rank trackers, one business, two numbers. The seven conditions that make a rank reading mean something, and how to tell which one is wrong.
---

# Why two tools disagree

Two rank trackers, the same business, the same keyword, the same afternoon. One says #3. One says #11. A client is in the room and somebody is about to be called wrong.

Almost always, nobody is. The two tools measured different things and printed the results in the same font.

This chapter is the list of things they could have measured differently, in the order they bite, plus a procedure for settling the argument — including the uncomfortable case where your own tool disagrees with itself and is right both times.

## A rank is a reading, and a reading has conditions

[Rank is a map, not a number](../../01-foundations/rank-is-a-map-not-a-number/index.md) established that a local position is a function of the searcher's coordinate. That was the beginner's version. The full argument list is longer, and every argument you do not state is one somebody else quietly chose for you.

| Condition | The question it answers | Where you find it |
| --- | --- | --- |
| **Instrument** | What did the tool actually query? | Ask. Almost nobody publishes it. |
| **Origin** | Which coordinate did the search run from? | The location chip; blank means the business address. |
| **Radius — and its kind** | How far, and does it *weight* results or *exclude* them? | The radius chip. The kind is nearly never published. |
| **Depth** | How many results were read before "not found"? | Here, twenty. Elsewhere, ask. |
| **Language** | Which language was requested? | The language chip; blank means the provider's default. |
| **Moment** | When was the reading taken? | The "Checked …" stamp on every fetched card. |
| **Identity** | How did the tool decide a result was *you*? | Ask. Name matching is common and quietly wrong. |

> **A number with seven unstated arguments is not a measurement. It is a rumour with a decimal point.**

## The instrument is never the surface

Start with the one nobody says out loud: **no rank tracker observes the map pack.** The pack is rendered to a human, in a browser session, in a place, with a history.

A tool observes a proxy instead. Three are common:

- a result page fetched with a location parameter attached;
- a ranked place search against Google's places data;
- a third-party search API resold under another name.

Different corpora, different orderings, no two agreeing about a marginal business.

**SEOG's rank check and geo-grid are the second kind:** a ranked place search run from an explicit coordinate. A deliberate trade — reproducible, and it takes a coordinate as a real argument rather than a hint ([what the Places API will and will not give you](../../05-reference/what-places-returns.md)).

It is not what a human sees, and two of its properties bite immediately.

**It returns Google's relevance ordering for the query, and drops businesses Google's own search box still finds.** A new or thin listing can be missing from a ranked place search while remaining findable by someone typing its name into Maps, which resolves names through a different mechanism. So "the tool cannot find us but Maps can" is the expected result for a low-prominence business, not a defect.

**It excludes hidden-address businesses by default.** A pure service-area business is left out unless the caller explicitly asks for it, and the rank paths do not ask. That is why map-pack rank tracking cannot work for that business model at all — [service-area businesses](../service-area-businesses/index.md) is the whole chapter.

So the first question when a tool disagrees with your own eyes is not "is it broken", but "what is this thing looking at, and is that what I care about".

## The origin, and the origin you did not set

**The heaviest condition by far.** A local rank is largely a distance calculation, so moving the origin a mile moves the number more than most of the work you will do all quarter.

An origin gets set three ways:

1. **Explicit coordinates.**
2. **A place name** the tool geocodes.
3. **Nothing at all** — and the third is where tools silently diverge.

**"Nothing" is not "no location".** Google documents the fallback plainly: omit both the bias circle and the restriction circle and a ranked place search *"uses IP biasing by default"* — the network address of whoever made the call stands in for a location.

On a laptop at home that is roughly your city; on a hosted tool the caller is a datacenter server, whose network location is somewhere you have never been or nowhere identifiable at all. Same query, same code, different machine, different answer.

Any product offering "national" rank tracking for a local query is reporting from a coordinate neither of you chose.

**Here the origin is never left to that fallback.** It is the keyword's own search point when you set one, the business coordinates otherwise. But note the trap.

**A keyword with no location chip is not a keyword with no location.** It is measured from the business's front door — the most flattering point on the map, the one coordinate where your distance term is zero and every rival's is not.

An unstated default is still a condition; write it down as if it were a setting, because it is one.

![The Rankings add-keyword form with Search from, Language and Radius all left at their defaults](../../../static/img/screens/rankings-tracked.png)

*Three conditions, all unset and all still in force: **Search from** falls back to the business address, **Language** to the provider's default, **Radius** to three miles. The fields do not say "none" — they name what was chosen for you. Note the "Checked 2h ago" stamp in the corner: that is condition six.*

## Radius is two different words

Two tools both say "5 km radius" and mean opposite things.

| | A **bias** radius | A **restriction** radius |
| --- | --- | --- |
| What the circle does | Weights the search toward it | Filters hard on it |
| A result outside it | Still appears, ranked lower | Does not exist |

**The distinction is invisible in a settings panel and enormous in the output.** Under a restriction, a business two miles out is deleted, promoting everyone inside the circle by one — so the same business, on the same day, from the same point, reads better under a restriction than under a bias.

Both are legitimate; only one models what a searcher sees. Both appear in this app doing different jobs: rank checks and grid points use a bias circle, competitor discovery a restriction circle, so that "nearby rivals" means nearby.

And a bias radius is an input to the *ordering*, not a viewport — change only the radius and the position can move with nothing happening in the world.

### The two radii inside one tool

The uncomfortable one, and you should know it before a client finds it.

**A single rank check uses the keyword's own radius** — three miles by default, or whatever the radius chip says. A geo-grid scan does not use that number at all. Each grid point searches with a circle the size of the **grid's own point spacing**, which the web presets fix at one mile.

So the centre pin of a grid and the "Check now" number are two readings of the same keyword, from the same coordinate, minutes apart, at different radii. They can legitimately differ, and the radius chip describes only the first. Lab 22.1 has you produce the disagreement deliberately.

**A third setting exists** depending on how you reach the instrument: a grid run through the agent surface defaults to tighter point spacing than the web presets, so an agent-run 5×5 covers less ground — and each point searches a smaller circle — than a Standard scan pressed by hand.

Mix the two and your own history stops being comparable with itself ([running local SEO with an AI agent](../../04-operating/running-local-seo-with-an-ai-agent/index.md)).

---

**Next:** [Settling the disagreement →](./settling-the-disagreement.md)
