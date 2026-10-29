# ChooseTheFuture Architecture

This document records the agreed system boundaries so product, backend, connector, and integration work can proceed in parallel. It describes the intended direction, not implemented functionality. See [`PROJECTPLAN.md`](../PROJECTPLAN.md) for milestones and [`SITEPLAN.md`](../SITEPLAN.md) for the user-facing experience.

## System outline

```text
Maintainers
  └─ enroll projects and mark bounded tasks eligible
        ↓
ChooseTheFuture coordinator (hosted API + database)
  ├─ serves eligible tasks to opted-in users
  ├─ grants atomic, expiring task claims
  └─ tracks run and submission status
        ↕ authenticated task/status requests
ChooseTheFuture Connector (user's Windows/macOS machine)
  ├─ installs and manages the local OpenHands runtime
  ├─ applies the user's project allowlist and run controls
  ├─ creates a separate workspace for each task
  └─ submits completed work for maintainer review
        ↓
GitHub issue / pull request or another project-approved submission path
```

The public site can remain static and deploy through GitHub Pages. The coordinator needs an API and durable task/lease storage, so it may need separate hosting. GitHub Actions is not the task queue or agent runtime.

## Component responsibilities

### Public site

- Explain the project in accessible language and list community-backed projects.
- Show maintainer-approved goals and tasks, their source links, and availability.
- Keep project support separate from connector enrollment.
- Avoid implying that votes set a project roadmap or that popularity guarantees work will be accepted.

### Coordinator service

- Register projects and maintainers, subject to an enrollment/verification process.
- Track task eligibility as controlled by maintainers.
- Filter task discovery by projects a user has explicitly enabled in the connector.
- Issue an atomic lease to one connector at a time; expire/release leases after completion, failure, cancellation, or timeout.
- Track minimum run and submission metadata needed for status, deduplication, and operations.
- Never store model-provider credentials or agent workspaces.

Hosting provider, database, GitHub integration mechanism, and maintainer authentication are not yet selected.

### ChooseTheFuture Connector

- Provide a guided local installation and manage the local OpenHands runtime so users do not need to configure it separately.
- Keep user model access local to their machine/runtime.
- Let users select allowed projects, set controls, see activity, pause work, and revoke access.
- Claim tasks through the coordinator, run each task in its own workspace, and submit output automatically for maintainer review.
- Report task state and the resulting submission to the coordinator.
- Present a ChooseTheFuture identity; OpenHands is an implementation/runtime dependency, not the product identity.

Exact installer packaging, supported operating-system versions, runtime lifecycle, sandbox/isolation mechanism, model-provider setup, and update channel remain open decisions. Docker is not a prerequisite assumed by this plan.

### Client interoperability

- Expose task discovery, claims, task context, progress, and submission-status operations through a stable ChooseTheFuture interface.
- Provide an MCP interface for compatible clients and adapters for other clients as demand warrants.
- Keep task coordination separate from the agent runtime, so an alternative client does not require replacing the coordinator.
- Validate how each client receives a repository workspace and returns a reviewable submission; MCP support alone does not guarantee those runtime capabilities.

## Task and submission lifecycle

Maintainers decide whether a task is eligible. A user opts a project into their connector. The coordinator grants an expiring claim before execution so multiple connectors do not start the same task. The connector executes locally and submits a pull request, patch, or another maintainer-approved artifact. Maintainers review and decide whether to accept or merge it. The contributor does not have to manually review each result after opting into the connector.

The coordinator should make transitions idempotent and recoverable. A disconnected connector must not leave a task claimed forever; expired or failed work should return to an eligible state according to maintainer policy.

## Trust boundaries

- Maintainer project enrollment and task eligibility determine what work enters the pool.
- User project allowlists determine what their connector may claim.
- The connector/runtime boundary protects the user's machine and credentials from repository code and task content. Each task needs a separate workspace and a validated isolation design.
- The coordinator receives task metadata and status, not model credentials or user workspace contents.
- Submissions are untrusted proposals. Maintainers retain review and merge authority; the system must not merge automatically.

## Decisions to resolve during implementation

- Coordinator hosting, database, authentication, and availability targets.
- GitHub App and webhook permissions for maintainer enrollment, task ingestion, and submission tracking.
- Whether submissions use a contributor fork, a service-created branch/PR, patch upload, or more than one option.
- How the local installer packages and updates OpenHands and defines per-task isolation on Windows and macOS.
- How to handle model setup, usage limits, retry behavior, cancellation, and opt-in consent.
- Which MCP tools and non-MCP adapters are required for the first interoperable release.
