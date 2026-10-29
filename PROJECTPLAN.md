# ChooseTheFuture Project Plan

This is the product and delivery roadmap. [`SITEPLAN.md`](SITEPLAN.md) describes the site experience and its information architecture.

## Project objective

Help people choose which open-source projects deserve attention, then let users contribute coding-agent capacity to tasks those projects’ maintainers have approved.

ChooseTheFuture will include a public directory, a hosted task-coordination service, and the **ChooseTheFuture Connector**. The connector manages a local OpenHands runtime, uses the user’s configured model access on their machine, and automatically submits completed work for maintainer review. The connector should interoperate with alternative clients through MCP and other adapters.

GitHub remains the source of project issues and pull requests where maintainers choose to use it. Maintainers control project participation, task eligibility, and acceptance of submissions. Users choose which projects their connector may serve and contribute the associated agent capacity and model usage.

## Product principles

- **People choose the destination.** Votes express interest; connector enrollment is a separate, explicit choice to contribute agent capacity.
- **Agent execution stays with the user.** The connector manages the local runtime; ChooseTheFuture does not run users’ agents or collect model credentials on its servers.
- **Projects retain authority.** Maintainers enroll projects, approve tasks for agent work, and review/accept submissions.
- **Coordination is a ChooseTheFuture responsibility.** A service tracks eligibility, issues atomic task claims, expires abandoned claims, and records submission status. OpenHands is an execution runtime, not the task marketplace or queue owner.
- **Interoperability is a product requirement.** The ChooseTheFuture Connector is client-neutral in identity; OpenHands is the initial runtime, with MCP and adapters supporting other clients over time.
- **Measure separate outcomes separately.** Interest, task claims, submitted work, and accepted contributions are different signals.

## Milestone 0 — Define the pilot contract

**Purpose:** make project participation, user consent, and submission behavior explicit before implementation.

### Work

- Select a small pilot cohort of open-source projects with maintainers willing to approve bounded tasks for agent work.
- Define how maintainers enroll repositories and designate issues/tasks as eligible, paused, or closed.
- Define how users choose approved projects, configure model access, set run limits, pause, and revoke connector access.
- Define a submission path, such as a pull request or patch submission, that leaves review and merge decisions to maintainers.
- Specify what task and run metadata the coordinator stores; keep model credentials and user workspaces local.
- Validate the Windows and macOS installation and execution options, including the sandbox boundary and runtime update strategy.

### Deliverables

- Project onboarding and maintainer task-readiness checklist.
- User consent, project allowlist, and connector-control requirements.
- End-to-end task, claim-expiry, and submission flow.
- Installer/runtime feasibility findings for Windows and macOS.

### Exit check

Pilot maintainers agree how tasks become eligible and how submissions arrive. Users can understand what model usage they are contributing, which projects are enabled, and how to stop the connector.

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

**Purpose:** prove that approved work can be claimed, executed locally, and submitted without duplicate task assignments.

### Coordinator service

- Host the coordination API and database separately from the static GitHub Pages site as needed.
- Ingest or retrieve maintainer-approved task eligibility from supported GitHub/project integrations.
- Provide task discovery filtered by the user’s project allowlist.
- Atomically issue temporary task leases; expire or release claims after failure, cancellation, or timeout.
- Track task/run status and links to submissions without storing model credentials or full user workspaces.
- Apply per-project and global safety limits and provide maintainer pause controls.

### ChooseTheFuture Connector

- Provide a user-facing installer/desktop experience that installs and manages the local OpenHands runtime.
- Keep configured model access on the user’s machine and out of the coordinator service.
- Let users select approved projects and set visible concurrency, usage, and pause/revoke controls.
- Claim eligible tasks, prepare a separate workspace per task, run OpenHands, and submit results automatically for maintainer review.
- Return clear run summaries and submission links; do not merge automatically or require users to manually review each result.
- Keep the connector identity client-neutral and expose the task workflow through a stable API/MCP interface.

### Deliverables

- Hosted coordinator prototype with atomic leases and expiry.
- Connector proof of concept using a local OpenHands runtime and one pilot project.
- Submission path and maintainer review feedback.
- Documented threat boundaries and data handling.

### Exit check

Two connector instances cannot claim the same task at once. A user can opt into a project, run a bounded task locally, and have a submission reach the maintainer without exposing model credentials to ChooseTheFuture.

## Milestone 3 — Make installation and interoperability practical

**Purpose:** make the connector approachable to nontechnical users and useful across agent clients.

### Work

- Build guided Windows and macOS installers that manage runtime setup, configuration, updates, and troubleshooting.
- Validate a safe task-workspace boundary that does not expose unrelated personal files or credentials to agents.
- Implement the ChooseTheFuture MCP interface for compatible clients.
- Add adapters for useful clients that do not support the required MCP workflow.
- Integrate with GitHub Issues and Projects where it reduces maintainer overhead; keep issue and merge authority with project maintainers.
- Add clear activity history, failure recovery, claim renewal/expiry, pause, and uninstall/revoke behavior.

### Exit check

A nontechnical user can install the connector, choose projects, configure model access, and understand what it is doing. Maintainers can pause eligibility and review clearly attributed submissions.

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
4. **Capacity use:** task claims, local runs, failures, and model usage where users choose to report it.
5. **Submission:** pull requests or patches created from agent runs.
6. **Outcome:** submissions accepted or merged when confirmed by project activity or maintainers.
7. **Project health:** maintainer participation, task freshness, paused/stale projects, and maintainer feedback.

Do not optimize for raw vote totals, task volume, or pull-request volume alone.

## Dependencies and decisions

- Which identity and authorization flow supports both public browsing and explicit connector project allowlists?
- How will maintainers enroll repositories and approve tasks without extensive setup?
- Which separate hosting and database services should operate the coordinator?
- What GitHub integration should enroll issues and receive submissions while preserving maintainer control?
- Which Windows/macOS runtime packaging and isolation approach can meet low-friction installation goals?
- What MCP tools and client adapters are needed for useful cross-client task execution?
- What task metadata and outcomes can be tracked without collecting model credentials or unnecessary workspace data?
- What operating budget and support capacity are needed for the coordinator and installer updates?

## Main risks and responses

| Risk | Response |
|---|---|
| Votes are mistaken for a binding roadmap or agent enrollment | Explain that support, maintainer task approval, and connector enrollment are separate actions. |
| Multiple connectors start the same or stale task | Use coordinator-owned atomic claims with expiry, plus maintainer-controlled eligibility. |
| Agent execution exposes unrelated local files or credentials | Use per-task workspaces, a clear sandbox boundary, and local credential handling; validate the design before broad release. |
| Users do not understand model usage or automatic submissions | Show project allowlists, activity, limits, pause/revoke controls, and the fact that maintainers review submissions. |
| Coordinator outages strand tasks or leave claims stuck | Use expiring leases, idempotent status updates, retries, and a maintainer pause mechanism. |
| More agent submissions overwhelm maintainers | Start with low concurrency, bounded tasks, maintainer opt-in, and the ability to pause enrollment. |
| Users assume model tokens or credentials are pooled | Keep model access local; state that users contribute their own agent capacity and model usage. |

## Current state

The repository has a concept landing page, GitHub Pages deployment, README, and product/site plans. The project directory, voting, maintainer task enrollment, coordinator service, and connector are not implemented. The agreed direction is a ChooseTheFuture Connector that manages a local OpenHands runtime, with model access configured locally and automatic submissions for maintainer review. The coordinator will manage task eligibility and temporary claims and may be hosted separately from GitHub Pages. Windows/macOS installer design, sandboxing, and MCP/client interoperability remain to be validated.
