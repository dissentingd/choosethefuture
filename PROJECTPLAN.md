# ChooseTheFuture Project Plan

This is the product and delivery roadmap. [`SITEPLAN.md`](SITEPLAN.md) describes the site experience and its information architecture.

## Project objective

Help people choose which open-source projects deserve attention, then let users contribute coding-agent capacity to tasks those projects’ maintainers have approved.

ChooseTheFuture will include a public directory, a hosted task-coordination service, and the **ChooseTheFuture Connector**. Maintainers choose a supported agent-workflow integration for their project, such as OpenHands or Paperclip. The connector routes tasks through that integration and automatically submits completed work for maintainer review. It should interoperate with alternative clients through MCP and provider-specific adapters.

GitHub remains the source of project issues and pull requests where maintainers choose to use it. Maintainers control project participation, provider selection, task eligibility, and acceptance of submissions. Users choose which projects their connector may serve and contribute agent capacity. Where agents run and whose model access they use depends on the selected integration and must be explicit.

## Product principles

- **People choose the destination.** Votes express interest; connector enrollment is a separate, explicit choice to contribute agent capacity.
- **The coordinator stays provider-neutral.** ChooseTheFuture manages cross-user task eligibility and leases, but does not dictate the project’s agent-management platform or host agent execution.
- **Projects retain authority.** Maintainers enroll projects, approve tasks for agent work, and review/accept submissions.
- **Coordination is a ChooseTheFuture responsibility.** A service tracks eligibility, issues atomic task claims, expires abandoned claims, and records submission status. OpenHands is an execution runtime, not the task marketplace or queue owner.
- **Interoperability is a product requirement.** The ChooseTheFuture Connector is client-neutral in identity. OpenHands and Paperclip are the planned first integrations; MCP and adapters can support others over time.
- **Measure separate outcomes separately.** Interest, task claims, submitted work, and accepted contributions are different signals.

## Milestone 0 — Define the pilot contract

**Purpose:** make project participation, user consent, and submission behavior explicit before implementation.

### Work

- Select a small pilot cohort of open-source projects with maintainers willing to approve bounded tasks for agent work.
- Define how maintainers enroll repositories and designate issues/tasks as eligible, paused, or closed.
- Have each pilot maintainer choose a workflow integration, initially comparing OpenHands and Paperclip.
- Define how users choose approved projects, configure model access, set run limits, pause, and revoke connector access.
- Decide and disclose, per integration, where agents run and whether model access belongs to the user, maintainer, or another explicitly configured provider.
- Define a submission path, such as a pull request or patch submission, that leaves review and merge decisions to maintainers.
- Specify what task and run metadata the coordinator stores; keep model credentials and workspaces outside the coordinator.
- Validate the Windows and macOS installation and execution options, including the sandbox boundary and runtime update strategy.

### Deliverables

- Project onboarding and maintainer task-readiness checklist.
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
- Add maintainer-approved goals and bounded tasks, with source issue links, acceptance context, exclusions, and last-reviewed dates.
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
- Ingest or retrieve maintainer-approved task eligibility and project-selected provider settings from supported integrations.
- Provide task discovery filtered by the user’s project allowlist.
- Atomically issue temporary task leases; expire or release claims after failure, cancellation, or timeout.
- Track task, provider-run status, and submission links without storing model credentials or full workspaces.
- Apply per-project and global safety limits and provide maintainer pause controls.

### ChooseTheFuture Connector

- Provide a user-facing connector that routes each task to the workflow integration selected by that project's maintainer.
- Keep model credentials out of the ChooseTheFuture coordinator; their location and use are explicit for each provider mode.
- Let users select approved projects and set visible concurrency, usage, and pause/revoke controls.
- Claim eligible tasks, prepare or request a separate workspace per task through the provider, and submit results automatically for maintainer review.
- Return clear run summaries and submission links; do not merge automatically or require users to manually review each result.
- Keep the connector identity provider-neutral and expose task operations through a stable API/MCP interface plus provider adapters.

### Deliverables

- Hosted coordinator prototype with atomic leases and expiry.
- Connector proof of concept with OpenHands and Paperclip adapters, validated with pilot maintainers who select their preferred integration.
- Submission path and maintainer review feedback.
- Documented threat boundaries and data handling.

### Exit check

Two connector instances cannot claim the same task at once. A user can opt into projects using different workflow integrations, receive an eligible task through the connector, and have the result submitted for maintainer review. Execution and credential placement are visible and credentials are not sent to the ChooseTheFuture coordinator.

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
- How will maintainers enroll repositories and approve tasks without extensive setup?
- Which separate hosting and database services should operate the coordinator?
- What GitHub integration should enroll issues and receive submissions while preserving maintainer control?
- Which provider modes should be supported first: user-local, maintainer-hosted, or both? Whose model access does each mode use?
- Which Windows/macOS connector/provider packaging and isolation approach can meet low-friction installation goals?
- How will provider-specific task IDs and statuses map to one ChooseTheFuture task lease?
- What MCP tools and client adapters are needed for useful cross-client task execution?
- What task metadata and outcomes can be tracked without collecting model credentials or unnecessary workspace data?
- What operating budget and support capacity are needed for the coordinator and installer updates?

## Main risks and responses

| Risk | Response |
|---|---|
| Votes are mistaken for a binding roadmap or agent enrollment | Explain that support, maintainer task approval, and connector enrollment are separate actions. |
| Multiple connectors start the same or stale task | Use coordinator-owned atomic claims with expiry, plus maintainer-controlled eligibility. |
| Provider integrations have different execution and credential models | Make provider mode explicit per project, document its data flow, and validate each mode before broad release. |
| Agent execution exposes unrelated files or credentials | Use per-task workspaces and a clear provider-specific sandbox boundary; never send model credentials to the coordinator. |
| Users do not understand model usage or automatic submissions | Show project allowlists, activity, limits, pause/revoke controls, and the fact that maintainers review submissions. |
| Coordinator outages strand tasks or leave claims stuck | Use expiring leases, idempotent status updates, retries, and a maintainer pause mechanism. |
| More agent submissions overwhelm maintainers | Start with low concurrency, bounded tasks, maintainer opt-in, and the ability to pause enrollment. |
| Users misunderstand whose model usage pays for a run | Disclose the execution and credential model for each provider/project; keep credentials out of the ChooseTheFuture coordinator. |

## Current state

The repository has a concept landing page, GitHub Pages deployment, README, product/site plans, and an architecture map. The project directory, voting, maintainer task enrollment, coordinator service, and connector are not implemented. The agreed direction is a provider-neutral ChooseTheFuture Connector that routes each project’s work through the integration selected by its maintainer; OpenHands and Paperclip are the planned first integrations. The coordinator manages task eligibility and temporary claims and may be hosted separately from GitHub Pages. Provider execution/credential modes, Windows/macOS installation, sandboxing, and MCP/client interoperability remain to be validated.
