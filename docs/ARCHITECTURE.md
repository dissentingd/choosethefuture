# ChooseTheFuture Architecture

This document records the agreed system boundaries so product, coordinator, connector, and provider-integration work can proceed in parallel. It describes intended behavior, not implemented functionality. See [`PROJECTPLAN.md`](../PROJECTPLAN.md) for milestones, [`SITEPLAN.md`](../SITEPLAN.md) for the user experience, and [`PROVIDER-COMPATIBILITY.md`](PROVIDER-COMPATIBILITY.md) for the OpenHands/Paperclip adapter assessment.

## System outline

```text
Maintainers
  ├─ enroll a project
  ├─ approve bounded tasks for agent work
  └─ choose a supported workflow integration (for example OpenHands or Paperclip)
        ↓
ChooseTheFuture coordinator (hosted API + database)
  ├─ serves eligible tasks to users who opted into that project
  ├─ grants atomic, expiring cross-user task claims
  └─ tracks handoff, run, and submission status
        ↕ authenticated task/status requests
ChooseTheFuture Connector (user-facing client)
  ├─ shows enabled projects and controls
  ├─ connects to each project's selected provider integration
  ├─ routes work through the provider-specific adapter
  └─ submits completed work for maintainer review
        ↓
Project-selected workflow system and agent runtime
  ├─ OpenHands integration (planned)
  ├─ Paperclip integration (planned)
  └─ future supported integrations
        ↓
GitHub pull request / patch or another project-approved submission path
```

The public site can remain static and deploy through GitHub Pages. The coordinator needs an API and durable task/lease storage, so it may need separate hosting. GitHub Actions is not the task queue or agent runtime.

## Component responsibilities

### Public site

- Explain the project in accessible language and list community-backed projects.
- Show maintainer-approved goals and tasks, source links, availability, and the project's selected integration where useful.
- Keep project support separate from connector enrollment.
- Avoid implying that votes set a project roadmap or that popularity guarantees work will be accepted.

### Coordinator service

- Register projects and maintainers, subject to an enrollment/verification process.
- Track task eligibility as controlled by maintainers.
- Record which supported workflow integration each project uses and the non-secret connection metadata needed to route work.
- Filter task discovery by projects a user has explicitly enabled in the connector.
- Issue an atomic lease to one connector at a time across all integration providers; expire/release leases after completion, failure, cancellation, or timeout.
- Track minimum handoff, run, and submission metadata needed for status, deduplication, and operations.
- Never store model-provider credentials or agent workspaces.

Hosting provider, database, GitHub integration mechanism, and maintainer authentication are not yet selected.

### ChooseTheFuture Connector

- Provide a consistent ChooseTheFuture user experience across supported project integrations.
- Let users select projects, configure provider access as required, set controls, see activity, pause work, and revoke access.
- Claim tasks through the coordinator and route them to the workflow integration selected by that project.
- Return task/run status and submissions to the coordinator.
- Use provider adapters so the connector does not assume every project runs OpenHands or Paperclip.
- Present a ChooseTheFuture identity; providers are integrations, not the product identity.

Exact installer packaging, supported operating-system versions, provider authentication, where runs execute, whose model access is used, sandbox/isolation, and update channel remain open decisions. The system must make these choices explicit per integration/project. Docker is not a prerequisite assumed by this plan.

### Provider integrations

- A provider adapter translates ChooseTheFuture's task and submission lifecycle into the selected system's task/run model.
- OpenHands and Paperclip are the planned first integrations; do not assume their APIs, control-plane roles, or runtime behavior are interchangeable.
- OpenHands primarily provides agent execution; Paperclip primarily provides agent/workflow orchestration through adapters. Give them separate adapter contracts where their responsibilities differ.
- Keep ChooseTheFuture's cross-user lease authoritative. A provider may also coordinate its own internal agent assignments, but that must not create two independent owners for the same external task.
- Validate each provider's execution placement and credential model. The provider selection alone does not imply local-user execution or maintainer-hosted execution.
- Keep integration-specific behavior behind documented interfaces so future providers can be added without redesigning the task coordinator.

### Client interoperability

- Expose task discovery, claims, task context, progress, provider selection, and submission status through a stable ChooseTheFuture interface.
- Provide an MCP interface for compatible clients and provider/client-specific adapters where needed.
- Validate how each client receives a repository workspace, invokes the selected provider, and returns a reviewable submission; MCP support alone does not guarantee those capabilities.

## Task and submission lifecycle

Maintainers enroll a project, select its workflow integration, and decide which tasks are eligible. A user opts into that project through the connector. The coordinator grants an expiring claim before work is handed to the selected integration so multiple users do not run the same task. The selected provider executes or coordinates the work according to its configured operating mode. The connector reports the result and submits a pull request, patch, or another maintainer-approved artifact. Maintainers review and decide whether to accept or merge it. Users do not need to manually drive or approve every task after opting in.

The coordinator should make transitions idempotent and recoverable. A disconnected connector or provider must not leave a task claimed forever; expired or failed work should return to an eligible state according to maintainer policy. The adapter must reconcile provider run status with the coordinator lease and submission status.

## Trust boundaries

- Maintainer project enrollment, provider selection, and task eligibility determine what work enters the pool.
- User project allowlists determine what their connector may claim.
- Provider-specific execution boundaries protect local or hosted resources from repository code and task content. Each task needs an appropriate isolated workspace.
- Model credentials stay with the user- or maintainer-selected provider/runtime and are not sent to the ChooseTheFuture coordinator.
- The coordinator receives task metadata and status, not model credentials or user workspace contents.
- Submissions are untrusted proposals. Maintainers retain review and merge authority; the system must not merge automatically.

## Decisions to resolve during implementation

- Coordinator hosting, database, authentication, and availability targets.
- How maintainers select and configure OpenHands, Paperclip, and future providers.
- GitHub App/webhook permissions for maintainer enrollment, task ingestion, and submission tracking.
- Whether each provider runs locally, on maintainer infrastructure, or through another supported host—and whose model access is used.
- How a provider adapter creates/identifies the corresponding task and reconciles status without duplicating task ownership.
- Whether submissions use a contributor fork, a service-created branch/PR, patch upload, or more than one option.
- How installers manage provider software and define per-task isolation on Windows and macOS.
- Which MCP tools and non-MCP adapters are required for the first interoperable release.
