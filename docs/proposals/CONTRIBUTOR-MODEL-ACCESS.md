# Proposal: contributor model access and donation budgets

**Status:** proposed, not decided. Nothing here is a settled decision until it is recorded in [`DECISIONS.md`](../DECISIONS.md). Where this proposal would change a recorded decision, it says so.
**Date:** 2026-11-16.

ChooseTheFuture has two sides: projects that submit work, and contributors who donate agent capacity, "like SETI@home for coding" ([About page](../../site/about.html)). The project side is designed in detail: App installation, eligibility labels, leases, the pre-submission gate, and pull requests opened by the App. The contributor side mostly says "bring your own model access". This proposal fills that gap. It covers:

1. How contributors connect the model access they want to donate.
2. Contributing a model that runs on their own hardware.
3. How contributors set how much they donate, and how it is split between projects.
4. What happens to a contributor's share when a project runs out of work.

## 1. Connecting model access

### Goal

At signup, contributors should be able to connect an account they already have with one click and an authorization: **Connect ChatGPT**, **Connect Claude**, **Connect Gemini**, and so on, plus an option to use their own model.

### What vendors currently allow

Checked 2026-11-16, mostly from secondary reporting; each vendor's own terms must be re-checked before building (see [Sources](#sources)).

| Vendor | Can a third-party app use the consumer subscription? | Workable path |
|---|---|---|
| OpenAI (ChatGPT Plus/Pro) | **Yes, for approved apps.** "Sign in with ChatGPT" lets participating apps draw on a user's plan allowance. Users can cap each app's usage in ChatGPT settings. | Apply to OpenAI's program. Otherwise an OpenAI API key. |
| Anthropic (Claude Pro/Max) | **No.** Since early 2026, subscription login is limited to Claude Code and Claude.ai. Third parties may not offer Claude login or route requests through subscription credentials, and this is enforced. | Anthropic API key only. |
| Google (Gemini consumer plans) | **No.** The Gemini CLI terms treat using the consumer Google login from third-party tools as a violation, and accounts have been suspended for it. | Gemini API key or Vertex AI. |
| Aggregators (e.g. OpenRouter) | Not a subscription, but OpenRouter documents an OAuth flow that issues a user-controlled key with a spending limit. **Not yet verified for this proposal.** | One click covering many models, paid from the contributor's credit. |

**Proposed connection options:**

- **Connect ChatGPT**, if OpenAI accepts ChooseTheFuture into its program.
- **Connect OpenRouter**, or another aggregator with a supported OAuth flow.
- **Use an API key** for Anthropic, OpenAI, Google and other providers.
- **Use my own model** (section 2).

**ChooseTheFuture must not offer a button that reuses a Claude or Gemini consumer login.** It breaks those vendors' terms and puts contributors' accounts at risk of suspension. If a vendor later opens an approved third-party program, add a button for it then.

### Where the connection lives

This is the main design choice.

- **Option A: connect in the connector app (recommended).** The Connect buttons are in the downloaded ChooseTheFuture Connector. The authorization opens in the browser and returns to the connector on the contributor's machine. The resulting token or key is stored in the operating system's keychain and is used only by the agent runtime on that machine. The website handles signup, project selection and allocation settings, none of which are secret. This matches the current decisions: the coordinator never receives model credentials and runs no agents (D3, [ARCHITECTURE](../ARCHITECTURE.md), [AGENTS.md](../../AGENTS.md)).
- **Option B: connect on the website.** Contributors connect on choosethefuture.org and never install anything. The ChooseTheFuture servers would then have to store every contributor's tokens and run the agents on ChooseTheFuture infrastructure. **This reverses settled decisions** ("does not host agent runs or pool model credentials"). It would make the coordinator a high-value target for credential theft, and put the cost of running agents on ChooseTheFuture.

Under option A, **every contributor installs the connector**, not only those running their own model, because something has to run the agent.

**Decision needed:** confirm option A, or record a decision to change the hosting and credential boundary.

## 2. Contributing a self-hosted model

Contributors can point the connector at a model they run themselves, through an OpenAI-compatible local endpoint such as Ollama, LM Studio or vLLM. This needs no vendor account. Nothing leaves the machine except the finished patch, so the training-off requirement (D10) is met automatically.

It works like SETI@home. The connector polls the coordinator for an eligible task, runs it locally, and uploads a submission patch. Unlike a SETI work unit, a task is a full agent session: a repository checkout, many model calls, and running the project's checks in a sandbox. Self-hosted contributors therefore need:

- disk space for workspaces, and the same per-task isolation as other contributors;
- a minimum model capability. A short benchmark run when the model is connected decides whether the connector takes real tasks, because weak models would mostly fail the pre-submission gate (D6) and waste maintainer and CI time.

**Decision needed:** whether the pilot supports self-hosted models. The pilot runtime, OpenHands, can generally use OpenAI-compatible endpoints, but this has not been tested ([PROVIDER-COMPATIBILITY](../PROVIDER-COMPATIBILITY.md)).

## 3. Donation budget and project split

### Budget

Contributors set how much they donate per period with a slider. Usage is measured differently for each kind of access, so the slider uses that access's own unit:

| Access type | Budget unit | Enforced by |
|---|---|---|
| API key | Tokens or currency per day/week/month | The connector, from usage reported in API responses |
| ChatGPT (approved app) | The per-app cap the contributor sets in ChatGPT | OpenAI, with the connector also stopping at the contributor's chosen limit |
| Aggregator OAuth | The key's spending limit | The aggregator, with the connector also stopping at it |
| Self-hosted model | Hours per day, and tasks at once | The connector |

The connector enforces the budget on the contributor's machine and stops claiming tasks when it is spent. Usage figures sent to the coordinator are self-reported and can't be verified. They are fine for showing totals and project activity, but should not be used for rewards or rankings.

### Splitting between projects

Contributors give each project they enabled a percentage of their budget. One task may use 50,000 tokens and another two million, so the budget can't be split into exact per-project pools in advance. Instead, the percentages are **scheduling weights**: when the connector picks its next task, it favours the project furthest below its share, so spending matches the chosen split over time. The connector shows actual spending per project next to the target.

## 4. When a project runs out of work

### Goal

When a project a contributor supports is closed or completed, their share should go to less popular projects automatically.

### Conflict with current principles

Automatic reallocation clashes with a principle the plans repeat: a contributor's connector works only on projects they explicitly enabled (ARCHITECTURE, trust boundaries; PROJECTPLAN product principles). The opt-in matters for three reasons:

- **Security.** The agent runs untrusted repository code on the contributor's machine.
- **Training policy.** Each project may declare its own policy, which the contributor acknowledges (D10).
- **Consent.** Contributors chose specific causes.

### Proposed approach

During setup, ask once:

> When a project you support has no more work, where should its share go?
> (a) to underserved projects that match the topics you choose,
> (b) to your other projects, or
> (c) nowhere: pause that share.

If the contributor picks (a), they approve the categories and the training policies they accept up front, and are notified each time a share moves, with a one-click way to undo it. With no answer, the default is (b). Contributors can change their choice at any time.

"Underserved" needs a definition the coordinator can compute. One example: projects with eligible tasks, few active contributors, and low recent completions, ranked independently of vote counts.

"Closed or completed" also needs a definition, because most projects never truly finish. Proposal: the project has had no eligible tasks for 14 days, its maintainer paused it, or the App was uninstalled.

**Decision needed:** whether reallocation is opt-in as proposed, and the default.

## Summary of decisions needed

1. Connection model: connect in the connector (option A), or move to hosted runs and stored credentials (option B, which reverses current decisions).
2. Which connections to offer first, and whether to apply to OpenAI's Sign in with ChatGPT program.
3. Whether the pilot supports self-hosted models, and the minimum capability check.
4. Budget units and the project-split mechanism.
5. Reallocation consent, its default, and the definitions of "underserved" and "no more work".

Most of this concerns the connector. Under D12 its detail belongs in the connector repository, so once decided, this repository should keep only the product-level requirements.

## Sources

Consulted 2026-11-16. Several are secondary reports; confirm against each vendor's current terms before building.

- [The Register: Anthropic clarifies ban on third-party Claude access](https://www.theregister.com/2026/02/20/anthropic_clarifies_ban_third_party_claude_access)
- [WinBuzzer: Anthropic bans Claude subscription OAuth in third-party apps](https://winbuzzer.com/2026/02/19/anthropic-bans-claude-subscription-oauth-in-third-party-apps-xcxwbn/)
- [OpenAI: Sign in with ChatGPT quickstart](https://developers.openai.com/siwc/quickstart)
- [OpenAI: Codex authentication](https://developers.openai.com/codex/auth)
- [The New Stack: Sign in with ChatGPT](https://thenewstack.io/sign-in-with-chatgpt/)
- [Gemini CLI FAQ](https://geminicli.com/docs/resources/faq/)
- [Gemini CLI: Terms of Service and Privacy Notice](https://geminicli.com/docs/tos-privacy)
