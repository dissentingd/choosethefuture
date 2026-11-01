# ChooseTheFuture Project Plan

This is the product and delivery roadmap. [`SITEPLAN.md`](SITEPLAN.md) describes the site experience and its information architecture. [`docs/PROVIDER-COMPATIBILITY.md`](docs/PROVIDER-COMPATIBILITY.md) records the current OpenHands/Paperclip integration assessment. [`docs/DECISIONS.md`](docs/DECISIONS.md) is the authoritative record of settled decisions.

## Project objective

Help people choose which open-source projects deserve attention, then let users contribute coding-agent capacity to tasks those projects’ maintainers have approved.

ChooseTheFuture will include a public directory, a hosted task-coordination service, and the **ChooseTheFuture Connector**. Maintainers choose a supported agent-workflow integration for their project, such as OpenHands or Paperclip. The connector routes tasks through that integration and automatically submits completed work for maintainer review. It should interoperate with alternative clients through MCP and provider-specific adapters.

GitHub remains the source of project issues and pull requests where maintainers choose to use it. Maintainers control project participation, provider selection, task eligibility, and acceptance of submissions. Users choose which projects their connector may serve and contribute agent capacity. Where agents run and whose model access they use depends on the selected integration and must be explicit.

## Product principles

- **People choose the destination.** Votes express interest; connector enrollment is a separate, explicit choice to contribute agent capacity.
- **The coordinator stays provider-neutral.** ChooseTheFuture manages cross-user task eligibility and leases, but does not dictate the project’s agent-management platform or host agent execution.
- **Projects retain authority.** Maintainers enroll projects, approve tasks for agent work, and review/accept submissions.
- **Coordination is a ChooseTheFuture responsibility.** A service tracks eligibility, issues atomic task claims, expires abandoned claims, and records submission status. OpenHands is an execution runtime, not the task marketplace or queue owner.
- **Interoperability is a product requirement.** The ChooseTheFuture Connector is client-neutral in identity. OpenHands is the pilot integration; Paperclip, MCP, and other adapters can follow.
- **ChooseTheFuture is accountable for what it submits.** Pull requests are opened by the ChooseTheFuture GitHub App, gated before publication, and followed up by a ChooseTheFuture agent during review.
- **Measure separate outcomes separately.** Interest, task claims, submitted work, and accepted contributions are different signals.

## Milestone 0 — Define the pilot contract

**Purpose:** make project participation, user consent, and submission behavior explicit before implementation.

### Work

- Select a small pilot cohort of open-source projects with maintainers willing to approve bounded tasks for agent work.
- Define how maintainers enroll repositories and designate issues/tasks as eligible, paused, or closed.
- Define a repository-readiness checklist: whether agent-assisted work is welcome and where; the canonical contribution guide and agent-readable instructions; verified setup and check commands with prerequisites; and the expected review process and submission evidence.
- Require each published task to state its outcome, scope and exclusions, completion criteria, coordination expectations, and maintainer review availability. Check the source issue and repository for existing PRs or active work before making a task eligible.
- Define how projects disclose or attribute agent assistance, and how maintainers pause contributions or mark guidance and tasks stale.
- Pilot with OpenHands as the single workflow integration; defer Paperclip until the OpenHands path works end to end.
- Validate the GitHub App submission path: minimum permissions, and opening an upstream pull request from a branch on a ChooseTheFuture-owned fork.
- Define how users choose approved projects, configure model access, set run limits, pause, and revoke connector access.
- Decide and disclose, per integration, where agents run and whether model access belongs to the user, maintainer, or another explicitly configured provider.
- Define the pre-submission gate, per-repository pull-request pacing, pull-request disclosure text, and how the review-response agent escalates to a person.
- Specify what task and run metadata the coordinator stores; keep model credentials and workspaces outside the coordinator.
- Validate the Windows and macOS installation and execution options, including the sandbox boundary and runtime update strategy.

### Deliverables

- Project onboarding and maintainer task-readiness checklist, including repository instructions, reproducible verification, contribution/disclosure policy, task freshness, and review capacity.
- User consent, project allowlist, and connector-control requirements.
- End-to-end task, claim-expiry, and submission flow.
- Provider capability comparison and pilot configuration for each supported integration.
- Installer/runtime feasibility findings for Windows and macOS.

### Exit check

Pilot maintainers agree how tasks become eligible, which workflow integration their project uses, and how submissions arrive. Users can understand which projects are enabled, where tasks run, whose model access is used, and how to stop the connector.

## Milestone 1 — Launch the public directory and enroll projects

**Purpose:** prove people can find projects and maintainers can describe appropriate work.

### Work

- Publish the public project directory and plain-language project pages.
- Add project nomination and maintainer confirmation processes.
- Add maintainer-approved goals and bounded tasks, with source issue links, acceptance context, exclusions, completion criteria, verification evidence, and last-reviewed dates. Check for existing or active work before publication.
- Let people support projects and goals independently from contributing agent capacity.
- Keep task enrollment under maintainer control; community interest alone never makes a task eligible.

### Deliverables

- Responsive public directory hosted on GitHub Pages.
- Curated pilot projects with maintainer-confirmed guidance and tasks.
- Separate interest actions and connector enrollment messaging.
- Pilot feedback on task quality and project onboarding.

### Exit check

Nontechnical visitors can understand what projects do and what support means. Maintainers can identify bounded tasks suitable for agent execution.

## Milestone 2 — Build the coordinator and connector prototype

**Purpose:** prove that approved work can be claimed, routed through different project-selected integrations, and submitted without duplicate task assignments.

### Coordinator service

- Host the coordination API and database separately from the static GitHub Pages site as needed.
- Run as the ChooseTheFuture GitHub App's backend; ingest maintainer-approved task eligibility from App webhooks.
- Provide task discovery filtered by the user’s project allowlist.
- Atomically issue temporary task leases; expire or release claims after failure, cancellation, or timeout.
- Accept submission patches, run the pre-submission gate, push to a ChooseTheFuture fork, and open pull requests as the App.
- Track task, provider-run status, and submission links without storing model credentials or full workspaces.
- Apply per-project and global safety limits and provide maintainer pause controls.
- Route review comments on ChooseTheFuture pull requests to a review-response agent.

### ChooseTheFuture Connector

- Provide a user-facing connector that routes each leased task through the OpenHands adapter.
- Keep model credentials out of the ChooseTheFuture coordinator; their location and use are explicit for each provider mode.
- Let users select approved projects and set visible concurrency, usage, and pause/revoke controls.
- Claim eligible tasks, prepare or request a separate workspace per task through the provider, and return a submission patch, run summary, and check results to the coordinator. Never hold GitHub write credentials.
- Return clear run summaries and submission links; do not merge automatically or require users to manually review each result.
- Keep the connector identity provider-neutral and expose task operations through a stable API/MCP interface plus provider adapters.

### Deliverables

- Hosted coordinator prototype with atomic leases and expiry, running as the ChooseTheFuture GitHub App.
- Connector proof of concept with the OpenHands adapter.
- App-opened pull requests through the pre-submission gate, with maintainer review feedback.
- Documented threat boundaries and data handling.

### Exit check

Two connector instances cannot claim the same task at once. A user can opt into a project, receive an eligible task through the connector, and have the result opened as a ChooseTheFuture App pull request for maintainer review. Execution and credential placement are visible; model credentials are not sent to the coordinator, and GitHub App credentials are not sent to the connector.

## Milestone 3 — Make installation and interoperability practical

**Purpose:** make the connector approachable to nontechnical users and useful across agent clients.

### Work

- Build guided Windows and macOS installers that manage connector and selected-provider setup, configuration, updates, and troubleshooting.
- Validate a safe task-workspace boundary for each supported execution mode; do not expose unrelated personal files or credentials to agents.
- Implement the ChooseTheFuture MCP interface for compatible clients.
- Add adapters for useful clients that do not support the required MCP workflow.
- Integrate with GitHub Issues and Projects where it reduces maintainer overhead; keep issue and merge authority with project maintainers.
- Add clear activity history, failure recovery, claim renewal/expiry, pause, and uninstall/revoke behavior.

### Exit check

A nontechnical user can install the connector, choose projects, configure the required provider access, and understand where work runs and whose model usage it consumes. Maintainers can pause eligibility and review clearly attributed submissions.

## Milestone 4 — Expand carefully

**Purpose:** increase useful participation while maintaining project trust and contribution quality.

### Work

- Add projects through community nominations and maintainer referrals.
- Expand supported MCP clients and task-management integrations based on pilot demand.
- Publish aggregate outcomes: community interest, tasks claimed, submissions opened, and work accepted where verifiable.
- Review failure, duplicate-work, abuse, stale-task, and low-quality submission patterns before scaling concurrency.

### Exit check

Growth brings more maintained project information and useful submissions, not only more votes or unreviewed agent activity.

## Product measures

Track each stage independently:

1. **Discovery:** project visits and shares.
2. **Interest:** votes and follows, including changes and removals.
3. **Enrollment:** users who install the connector and select projects.
4. **Capacity use:** task claims, runs, failures, and model usage where users choose to report it.
5. **Submission:** pull requests or patches created from agent runs.
6. **Outcome:** submissions accepted or merged when confirmed by project activity or maintainers.
7. **Project health:** maintainer participation, task freshness, paused/stale projects, and maintainer feedback.

Do not optimize for raw vote totals, task volume, or pull-request volume alone.

## Dependencies and decisions

- Which identity and authorization flow supports both public browsing and explicit connector project allowlists?
- What eligibility signal (label, issue template, or both) should maintainers use, and how do they pause?
- Which separate hosting and database services should operate the coordinator?
- What is the ChooseTheFuture App's minimum permission set, and does the fork-based pull-request path work across installations?
- Which OpenHands mode should the pilot use: contributor-local Agent Server, maintainer-hosted, or OpenHands Cloud? Whose model access does it use?
- Should contributors be optionally credited on pull requests?
- Which Windows/macOS connector/provider packaging and isolation approach can meet low-friction installation goals?
- How will provider-specific task IDs and statuses map to one ChooseTheFuture task lease?
- What MCP tools and client adapters are needed for useful cross-client task execution?
- What task metadata and outcomes can be tracked without collecting model credentials or unnecessary workspace data?
- What operating budget and support capacity are needed for the coordinator and installer updates?

## Main risks and responses

| Risk | Response |
|---|---|
| Votes are mistaken for a binding roadmap or agent enrollment | Explain that support, maintainer task approval, and connector enrollment are separate actions. |
| Low-quality submissions damage the ChooseTheFuture name, since it authors every pull request | Pre-submission gate, low per-repository pacing, and a review-response agent that follows up or withdraws work. |
| Connector compromise publishes malicious changes under the ChooseTheFuture identity | Connectors never hold GitHub credentials; the coordinator treats patches as untrusted and gates them. |
| Multiple connectors start the same or stale task | Use coordinator-owned atomic claims with expiry, plus maintainer-controlled eligibility. |
| Provider integrations have different execution and credential models | Make provider mode explicit per project, document its data flow, and validate each mode before broad release. |
| Agent execution exposes unrelated files or credentials | Use per-task workspaces and a clear provider-specific sandbox boundary; never send model credentials to the coordinator. |
| Users do not understand model usage or automatic submissions | Show project allowlists, activity, limits, pause/revoke controls, and the fact that maintainers review submissions. |
| Coordinator outages strand tasks or leave claims stuck | Use expiring leases, idempotent status updates, retries, and a maintainer pause mechanism. |
| More agent submissions overwhelm maintainers | Start with low concurrency, bounded tasks, maintainer opt-in, and the ability to pause enrollment. |
| Users misunderstand whose model usage pays for a run | Disclose the execution and credential model for each provider/project; keep credentials out of the ChooseTheFuture coordinator. |

## Current state

The repository has a concept landing page, GitHub Pages deployment, README, product/site plans, and an architecture map. The project directory, voting, maintainer task enrollment, coordinator service, and connector are not implemented. The agreed direction (see [`docs/DECISIONS.md`](docs/DECISIONS.md)) is a provider-neutral ChooseTheFuture Connector piloted with OpenHands, and a coordinator that runs as the ChooseTheFuture GitHub App: maintainers opt in by installing it, it issues leases, and it opens every pull request under the ChooseTheFuture name. Maintainer outreach resumes once these tools work. The OpenHands execution/credential mode, the App's fork-based pull-request path, Windows/macOS installation, sandboxing, and MCP/client interoperability remain to be validated.
