---
title: Running local SEO with an AI agent
sidebar_position: 3
description: Connect an agent to your local-SEO stack over MCP — what it may read, what it may write, how irreversible actions get confirmed, and the limits that do not go away.
---

# Running local SEO with an AI agent

Most of the work in Parts I–III is reading. Pull the numbers, compare them to last month, decide which difference is real, write it up. An agent is genuinely good at that. A small remainder is *writing* — a reply that appears in public under a review, a field on a live listing that Google may re-verify — and an agent must not do that unsupervised.

This chapter is about where that line sits, and about making the line something a schema enforces rather than something you asked for politely in a prompt.

## The split is decided by the shape of the work, not by the model

Run a portfolio of local-SEO clients for a month and log your hours. The distribution is lopsided in a specific way:

- **Reading and assembling** — positions, review deltas, competitor movement, action plans, turning six screens into one paragraph a client will read. Most of the hours. Almost none of the risk.
- **Deciding** — is that a real change or scan noise, is this keyword worth tracking, does this profile edit invite a suspension. Few hours. All of the judgement.
- **Writing** — a handful of actions per client per month that land on a public surface. Least time. All of the risk.

Automation pays best where volume is high and risk is low, which is exactly the first bucket. It pays worst in the third. An agent that assembles your Monday-morning digest across twenty businesses saves a day a week. An agent that publishes review replies while you sleep saves twenty minutes and puts a merchant's account in play — [and is against Google's API policy anyway](#the-one-thing-an-agent-must-never-do-alone).

So the useful mental model is not "an agent that does local SEO". It is **an agent that does the reading and the assembling, and hands you a queue of decisions**. Everything below is engineering to keep it in that shape.

## Connecting one

SEOG exposes its product surface over the [Model Context Protocol](https://modelcontextprotocol.io), so any MCP-capable client — Claude Code, Codex, Gemini CLI, Cursor — can drive the same domain services the app's buttons call. As of 2026-07-27 that is **90 tools** on a customer account.

Three facts about the credential matter more than the setup steps:

**It is an account token, not an OAuth grant.** Every call runs as your SEOG account and reaches only your account's businesses. There is no anonymous mode and no way for the token to exceed what your own login can do — the server assembles the tool set from your account's permissions, so a token cannot grant you a capability you do not already have.

**It is shown once.** The plaintext appears at creation and is never displayed again; the app stores a hash and a short display prefix. Treat it like an SSH key: never in a repo, never in a transcript you paste somewhere, and scrub it from logs.

**It is revocable and attributable.** Each token has a name, a created date and a last-used stamp, and revoking it takes effect immediately. Every action an agent takes lands in the same usage record as a click in the app, under the same account — which is what makes an agent-run practice auditable at all.

Mint one at **Settings → Agents & MCP** (`/settings/agents`), then register the server. In Claude Code:

```bash
claude mcp add --transport http seog https://api.seog.ai/mcp \
  --header "Authorization: Bearer $SEOG_MCP_TOKEN"
```

For clients configured by file — Codex, Gemini CLI, Cursor — the same thing as JSON:

```json
{
  "mcpServers": {
    "seog": {
      "type": "http",
      "url": "https://api.seog.ai/mcp",
      "headers": { "Authorization": "Bearer YOUR_TOKEN" }
    }
  }
}
```

Verify by listing tools (`/mcp` in Claude Code) before you ask the agent to do anything. A connected server with zero tools is a different problem from a refused call, and knowing which you have saves an hour.

The server is stateless: each request authenticates, builds the tool set your credential resolves to, runs, and closes. There is no session to keep warm and nothing to reconnect.

> **Note** · There is a second agent surface: an in-app assistant that lives inside the product and confirms its actions in the chat window. It is a different thing with a different confirmation model. This chapter is about *your* agent, running in *your* terminal, on your infrastructure and your schedule.

## What it can read, and what it can write

Five classes, and the boundaries between them are the whole design. Costs follow one rule: **anything that calls an external API — Google or a model — is paid; reading data you already have is free.** Undo and delete are paid too, because each one replays a write against Google.

| Class | What it touches | Cost | Examples |
| --- | --- | --- | --- |
| Stored reads | Data already in your account | free | `list_businesses`, `list_keywords`, `review_stats`, `get_action_plan`, `get_latest_grid_scan`, `compare_competitors`, `list_citations` |
| Local writes | Your own bookkeeping, invisible to Google | free | `update_business`, `toggle_keyword`, `set_recommendation_status`, `draft_review_response` |
| Fetches | A live call to Google or a model | paid | `check_keyword`, `refresh_rankings`, `sync_reviews`, `run_grid_scan`, `draft_post_content`, `check_citations` |
| Public writes | The live Google listing | paid | `apply_profile_fix`, `apply_business_description`, `publish_review_reply`, `publish_post` |
| Irreversible | Deletes stored history or public content | either | `delete_business`, `delete_post`, `delete_profile_photo`, `remove_keyword`, `remove_competitor` |

Two consequences worth internalising before you let an agent loose.

**The free/paid boundary is a budget boundary, and it maps onto a real distinction.** `list_keywords` returns the positions from the last check; `check_keyword` goes and asks Google again. An agent that does not understand the difference will re-fetch data it already holds, which is the single most expensive beginner mistake — the same one described in [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility.md), just faster and in a loop. Two free tools exist specifically so the agent can budget: one returns the balance and plan, one returns the live price of every charged action. Instruct it to call both before any multi-business sweep.

**Bundles beat loops.** `refresh_rankings` re-checks every active keyword for a business in one charged run; calling `check_keyword` once per keyword costs more for the same result. The same holds for `refresh_competitors` and `refresh_website_all`. A model left to its own devices will happily write the loop.

**Two things stay in the browser, for transport reasons rather than policy.** Photo upload needs the file bytes, and connecting Google or Search Console needs a consent screen. An agent can list and delete profile photos and check the connection status; it cannot upload an image or complete OAuth.

## The confirmation model

An agent has no hands to wring. If you ask it to "tidy up the profile", nothing in the request distinguishes *fix the phone number* from *delete four photos*. There are three layers between a vague instruction and a public consequence, and they are not equally strong. Know which is which.

### Layer 1 — the schema

Tools whose effect cannot be undone take a **required** `confirm` argument that must literally be `true`. Its description, which the agent reads:

> "Must be true. This action is IRREVERSIBLE — confirm with the user, quoting exactly what will be deleted, before setting it."

Omit it and the call fails validation before any code runs. This covers deleting a business and its whole history, deleting a post or a photo from the live listing, and removing a keyword or a competitor with their snapshots.

Be clear-eyed about what this is. **The agent supplies the flag itself**, so it is not a permission — it is a speed bump against a tool fired on a vague instruction, and it works because the model has to construct an explicit acknowledgement rather than pattern-match a plausible call. It exists because MCP has no confirmation channel: the in-app assistant can stop and ask, an agent calling a tool directly cannot, so the acknowledgement had to move into the argument list.

### Layer 2 — the tool description

Publishing tools carry the instruction in their own description. `publish_review_reply` says the reply is publicly visible under the review and to have the user approve the exact wording first. `apply_profile_fix` says that editing the business **name** can put the listing into re-verification — the mechanism and the rest of the write-failure surface are in [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md). Tools that return Google content carry the attribution and no-caching obligation in the description too, because the agent is the party that has to honour it ([storing Google data legally](../05-reference/storing-google-data-legally.md)).

This layer is guidance. A model can ignore guidance. Treat it as a floor, not a control.

### Layer 3 — your client, and this is the real one

The enforceable boundary lives on your side, in the approval policy of the MCP client you are running: which tools auto-run, which prompt, which are blocked outright. Allowlist the stored reads. Prompt on every fetch. Prompt or block on every public write. That configuration — not the server, not the prompt — is what actually stands between "summarise this week" and something appearing on a client's listing.

If you take one engineering decision from this chapter, take that one. The server's job is to make the risky actions *legible*; your client's job is to make them *gated*.

Errors help here more than people expect. Failures come back as sentences an agent can act on: an exhausted balance returns what the action costs, what you have, and where to top up; a plan problem names the plan and the feature. **Relay them and stop.** A retry loop against an insufficient balance just fails repeatedly, and against a rate ceiling it is worse than useless.

## The one thing an agent must never do alone

There is a category of product that watches for new reviews and posts an AI-written reply automatically. Do not build it, and do not let your agent become it by accident.

Google's *Business Profile APIs policies* (developers.google.com/my-business/content/policies, last updated 2025-08-28), under abusive behaviours:

> "You may not use the Business Profile APIs to engage in abusive behaviors, which includes but isn't limited to fraudulent, abusive, or otherwise invalid activity. For example, you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent."

And under Third-party policy > Reviews:

> "Business owners have the ability to respond to reviews of their business on Google. If you respond to reviews on behalf of your end-client, you must receive their authorization first."

This is our reading of published terms, not legal advice. But read it slowly: **automating review replies without prior specific and express consent is named as abusive behaviour**, and the merchant's account carries the risk, not your script. The same clause covers automated listing edits — which is why an agent applying profile fixes on a schedule is the same problem wearing a different hat.

A human approving each reply before it goes out is fine, and is the loop every lab below uses. The full argument, including why unedited drafts read badly to the next customer, is in [Reviews](../02-core-practice/reviews.md). The parallel constraint on AI-generated profile imagery is in [Photos and the visual profile](../02-core-practice/photos-and-the-visual-profile.md) — also a policy constraint, also not a feature.

## Honest limits

**An agent cannot tell you whether a change is real.** It will report that a position moved from 7 to 4 with the same confidence whether that is a genuine improvement or two scans taken from different points on different days. The discipline that separates those is [Did it work?](../02-core-practice/did-it-work.md), and it stays yours.

**Nothing schedules your agent.** There is no cron in the platform for this. Weekly digests happen because *you* run them from a scheduler you own — which is a feature, since a schedule you control is a schedule you can stop.

**Breadth is watched, and volume is not the signal.** Bulk extraction of place data is prohibited by Google's terms, so the raw-Google tools carry abuse guardrails. The design principle is worth knowing even if the numbers are not published: **the number of distinct places an account touches in a day is the signature of directory-building, not the number of calls.** A twenty-business portfolio refreshed several times a day looks nothing like a scraper, and is not throttled. Something walking a city block by block is. If you are building an agent that touches thousands of unrelated businesses, you are building the thing the terms forbid — see [Spam and fake listings](../03-advanced/spam-and-fake-listings.md) for where that line sits.

**Some accounts get fewer tools, by design.** Partner and white-label accounts do not receive the tools that return raw Google content. If a tool is "not found" on such an account, that is a compliance boundary rather than a bug, and no amount of retrying will produce it.

**The agent is non-deterministic, and your instructions are not code.** The same prompt twice will not produce the same tool sequence twice. Anything that must happen the same way every time — the exact set of paid calls in a weekly run, for instance — belongs in a script that calls the tools, with the agent doing the writing-up around it.

## Doing this without SEOG

The pattern generalises. Build a small MCP server over the Google Business Profile API and the Places API, back it with your own store, and expose the same five classes. Three things will take most of the effort, and none of them is the MCP part: the OAuth dance and its token refresh; the write surface, where the documented capability and the actual capability differ enough to need a table of their own ([the capability matrix](../05-reference/gbp-capability-matrix.md) and [write limits](../05-reference/write-limits-and-failure-modes.md)); and the storage rules, which constrain what you may keep and for how long ([storing Google data legally](../05-reference/storing-google-data-legally.md)). Budget for the API costs in [what Google's APIs cost](../05-reference/what-googles-apis-cost.md). The long form is [Doing it without SEOG](../99-appendix/doing-it-without-seog.md).

## Labs

### Lab 28.1 — Connect an agent and inventory what it can do

> **Lab** · Where: **Settings → Agents & MCP** (`/settings/agents`) and your terminal · Cost: **free** · Time: ~20 min
>
> You need: your practice business added (Lab 0.3) and any MCP-capable client installed.

1. Open **Settings → Agents & MCP**. In the **MCP access** card, copy the **Connection endpoint**.
2. In the field at the bottom, name a token for the machine it will live on — `laptop agent` — and press **Generate token**. The banner says *Copy this now — it won't be shown again*. It means it. Put it in your shell environment or a password manager, not in a file in a repo.
3. Register the server with your client. The **Set up your agent** card below has both paths — **Claude Code plugin** and **Any MCP client** — with copyable commands.
4. List the tools. Count them, and note that the count is the same set your own login can reach.
5. Now ask the agent for a free inventory, in one message: *"Using the SEOG tools, list my businesses, then for the first one give me its action plan, its tracked keywords with current positions, and its review stats. Do not call anything that costs credits."*
6. Read the tool calls in the transcript, not just the answer. Write down which tools it chose.
7. Go back to **Settings → Agents & MCP** and check the token row: **Last used** should now show a timestamp.

**What good looks like.** A digest built entirely from stored reads, a transcript you can audit call by call, and a last-used stamp that proves the token is live. Nothing was charged.

**If it went wrong.** Tools list but every call is refused — the token is wrong or was revoked; reissue it. The agent called a fetch despite the instruction — that is the lesson of Layer 3, and Lab 28.3 fixes it. A tool you expected is absent — check whether the account is a partner or white-label one, where the raw-Google tools are withheld by design.

**What you just learned.** An agent's first useful act is an audit of its own reach. You now know the tool surface, and you have seen that a prompt instruction ("do not spend") is a request, not a constraint.

### Lab 28.2 — A supervised weekly run

> **Lab** · Where: your terminal, driving **Rankings**, **Reviews** and **Competitors** · Cost: **paid** · Time: ~20 min
>
> You need: Lab 28.1, and at least two tracked keywords ([Lab 8.1](../02-core-practice/choosing-what-to-track.md)).

1. Start with the budget. Ask: *"Check my credit balance and the price list, then tell me what a weekly refresh of rankings and reviews for this one business would cost. Do not run anything yet."* Both tools are free reads.
2. Read its plan. If it proposes calling `check_keyword` once per keyword instead of `refresh_rankings` once, correct it and note that you had to.
3. Approve exactly two paid calls: refresh the rankings for all active keywords in one run, and sync reviews.
4. Then the free half: *"Now, without spending anything more, give me unanswered reviews needing a response, review stats, the competitor comparison and any unread competitor alerts."*
5. Ask for drafts, not publications: *"Draft a reply to each unanswered review. Publish nothing."*
6. Read every draft. Rewrite at least one — you will want to; see [Reviews](../02-core-practice/reviews.md) for what a good one does.
7. Ask for the whole thing as a digest a client could read: what moved, what did not, what needs a decision from them.

**What good looks like.** Exactly two paid calls in the transcript, a digest with deltas rather than raw output, and a queue of drafts awaiting your judgement. You should be able to point at each charge and say which question it answered.

**If it went wrong.** It looped a per-keyword check — expensive, and the classic failure; put the bundle rule in your guardrail file in Lab 28.3. It ran out of credits and retried — read the error, which states the cost and the balance, and stop the sweep; the free reads still work and the digest can be finished from them. It published something — your client's approval policy is too loose, and that is now the most urgent thing on your list.

**What you just learned.** The economics of an agent-run practice are set at the fetch boundary, not by the agent's cleverness. And a supervised loop — draft, human reads, human approves — costs you minutes per client, which is what makes it survivable at portfolio scale.

### Lab 28.3 — Write the guardrail file

> **Lab** · Where: your agent's working directory · Cost: **free** · Time: ~20 min
>
> You need: Labs 28.1 and 28.2, and the notes on where the agent misbehaved.

1. In the directory you run the agent from, create the instructions file your client reads on startup (`CLAUDE.md`, `AGENTS.md`, or your client's equivalent).
2. Write the rules as constraints, not preferences. At minimum: never call a paid tool that was not explicitly requested; check the balance and the price list before any multi-business run; prefer the bundled refresh over per-item loops; never publish a review reply, a post, or a profile edit without quoting the exact text and receiving a yes; never pass a confirmation flag on a delete without quoting exactly what will be deleted; report tool errors verbatim and stop rather than retrying.
3. Add the policy rule in plain words: automated review replies and automated listing edits require the merchant's prior specific and express consent, so every publish waits for a human.
4. Now configure the client's tool permissions — the layer that actually enforces. Auto-approve the stored reads. Prompt on everything that fetches. Prompt or deny on everything that publishes or deletes.
5. Test the boundary. Ask for something the rules forbid: *"Reply to every unanswered review and publish the replies."* The correct outcome is a refusal or a request for approval, never a publication.
6. Test the second boundary. Ask it to delete a tracked keyword. It should quote the keyword and what will be lost, and wait.
7. Keep the file in version control alongside whatever scheduler runs your weekly job.

**What good looks like.** Two deliberately bad instructions, two refusals, and a file you would be comfortable handing to a colleague who runs the same portfolio next month.

**If it went wrong.** The agent complied with the forbidden request — the prompt-layer rule is not enough on its own, which is the point; tighten the client's permissions until the test fails safely. It refused something harmless — your rules are written as bans rather than as approval requirements; rewrite them as "ask first", not "never".

**What you just learned.** The instruction file documents intent; the permission configuration enforces it. Anyone who ships an autonomous local-SEO agent with only the first has not understood the difference — and the surface it can damage is a client's public listing.

## Common mistakes

**Treating the prompt as a permission system.** "Don't spend credits" in an instructions file is a hint. Approval policy in the client is a control. The gap between them is where the surprise invoices and the unapproved publications live.

**Automating the last mile because the first mile automated so well.** The reading automates beautifully, which builds the confidence to automate the writing. That is precisely the step the policy prohibits and the step where the account risk lives. The correct end state is a human approving a queue that an agent assembled, not an empty queue.

**Letting the agent choose between a stored read and a fresh fetch.** Given both, a model biased toward completeness will fetch. Name the tool you want in the instruction, and put the bundle-over-loop rule in the guardrail file.

**Interpreting a missing tool as a broken connection.** On partner and white-label accounts the raw-Google tools are withheld deliberately. Retrying, reinstalling and reissuing tokens will not produce them, and the hour spent trying is a real cost of not reading the boundary.

**Reporting an agent's output without checking it.** A digest that reads well is not a digest that is right. Every number in a client-facing report needs the same scrutiny it would get if you had typed it yourself — [Reporting to a client](./reporting-to-a-client.md) does not become optional because a machine drafted the paragraph.

## Check yourself

1. **A tool call fails because the balance is exhausted. What should the agent do next, and what is the failure mode you are guarding against?** (Relay the cost, the balance and the top-up path, then stop; finish the digest from free reads. The failure mode is a retry loop that fails identically each time.)
2. **Your instructions file says "never publish without approval" and the agent publishes anyway. Which layer failed, and which layer should have caught it?** (Layer 2, guidance the model can ignore; Layer 3, the client's approval policy, is what enforces.)
3. **Name three tools your agent should call before any paid work on a new client, and say why each is free.** (Any of: business list, action plan, tracked keywords, review stats, balance, price list — all read data already held or account state, and none calls an external API.)
4. **Why is `confirm: true` a speed bump rather than a permission — and what would a real permission look like?** (The caller supplies it, so it constrains carelessness rather than authority. A real permission is the client-side gate, or revoking the token.)
5. **A prospect asks you to build them a bot that replies to every new Google review automatically. What do you tell them?** (That the API policy names automated review replies without prior specific and express consent as abusive behaviour, that their account carries the risk, and that a drafted queue with one-click human approval gets most of the time saving with none of it.)

---

**Next:** [What you inherit with a client →](./what-you-inherit-with-a-client.md)
