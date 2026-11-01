# ChooseTheFuture Architecture

This document records the agreed system boundaries so product, coordinator, connector, and provider-integration work can proceed in parallel. It describes intended behavior, not implemented functionality. Settled decisions are recorded in [`DECISIONS.md`](DECISIONS.md); this document follows them. See [`PROJECTPLAN.md`](../PROJECTPLAN.md) for milestones, [`SITEPLAN.md`](../SITEPLAN.md) for the user experience, and [`PROVIDER-COMPATIBILITY.md`](PROVIDER-COMPATIBILITY.md) for the OpenHands/Paperclip adapter assessment.

## System outline

```text
Maintainers
  ├─ install the ChooseTheFuture GitHub App on a repository (opt-in)
  └─ mark bounded issues eligible for agent work (for example with a label)
        ↓ webhooks
ChooseTheFuture coordinator (hosted API + database; the App's backend)
  ├─ ingests eligible tasks from App webhooks
  ├─ serves eligible tasks to users who opted into that project
  ├─ grants atomic, expiring cross-user task leases
  ├─ accepts submission patches and runs the pre-submission gate
  └─ pushes to a ChooseTheFuture fork and opens the pull request as the App
        ↕ authenticated task/status/submission requests (no GitHub write credentials)
ChooseTheFuture Connector (user-facing client)
  ├─ shows enabled projects and controls
  ├─ routes each leased task through the provider adapter
  └─ returns a submission patch, run summary, and check results
        ↓
Agent runtime
  ├─ OpenHands integration (pilot)
  └─ future supported integrations (Paperclip deferred)
        ↓
Pull request from the ChooseTheFuture App, reviewed by maintainers;
review feedback answered by a ChooseTheFuture agent
```

The public site can remain static and deploy through GitHub Pages. The coordinator needs an API and durable task/lease storage, so it needs separate hosting. GitHub Actions is not the task queue or agent runtime.

## Component responsibilities

### Public site

- Explain the project in accessible language and list community-backed projects.
- Show maintainer-approved goals and tasks, source links, availability, and the project's selected integration where useful.
- Keep project support separate from connector enrollment.
- Avoid implying that votes set a project roadmap or that popularity guarantees work will be accepted.

### Coordinator service

- Act as the backend of the ChooseTheFuture GitHub App. A maintainer installing the App on a repository is the project's enrollment and consent record.
- Track task eligibility from App webhooks (for example an eligibility label), as controlled by maintainers.
- Record which supported workflow integration each project uses and the non-secret connection metadata needed to route work.
- Filter task discovery by projects a user has explicitly enabled in the connector.
- Issue an atomic lease to one connector at a time using the coordinator's own database; GitHub issue assignment is not the lease authority. Expire/release leases after completion, failure, cancellation, or timeout. Lease state may be mirrored to GitHub for maintainer visibility.
- Accept submission patches from connectors, run the pre-submission gate (repository checks reported, change within task scope, optional automated review), and enforce per-repository and global pull-request rate limits.
- Push accepted patches to a branch on a ChooseTheFuture-owned fork and open the pull request against the upstream repository as the App. Hold the App's credentials; never send them to connectors.
- Route maintainer review comments on ChooseTheFuture pull requests to a ChooseTheFuture agent for response, escalating to the organization as needed.
- Track minimum handoff, run, and submission metadata needed for status, deduplication, and operations.
- Never store model-provider credentials or agent workspaces. Submission patches are stored only as long as needed to open and update the pull request.

Hosting provider, database, and maintainer authentication beyond App installation are not yet selected.

### ChooseTheFuture Connector

- Provide a consistent ChooseTheFuture user experience across supported project integrations.
- Let users select projects, configure provider access as required, set controls, see activity, pause work, and revoke access.
- Claim tasks through the coordinator and route them to the workflow integration selected by that project.
- Return task/run status and a submission patch (with run summary and check results) to the coordinator. The connector never holds GitHub write credentials and never pushes or opens pull requests itself.
- Use provider adapters so the connector does not assume every project runs the same integration. The pilot ships only the OpenHands adapter.
- Before running a task, check the contributor's provider settings locally against the project's declared training policy, and decline the task on a conflict or when the settings cannot be confirmed. Provider account details stay on the contributor's machine.
- Present a ChooseTheFuture identity; providers are integrations, not the product identity.

Exact installer packaging, supported operating-system versions, provider authentication, where runs execute, whose model access is used, sandbox/isolation, and update channel remain open decisions. The system must make these choices explicit per integration/project. Docker is not a prerequisite assumed by this plan.

### Provider integrations

- A provider adapter translates ChooseTheFuture's task and submission lifecycle into the selected system's task/run model.
- OpenHands is the pilot integration. Paperclip is deferred until the OpenHands path works end to end; do not assume their APIs, control-plane roles, or runtime behavior are interchangeable.
- OpenHands primarily provides agent execution; Paperclip primarily provides agent/workflow orchestration through adapters. Give them separate adapter contracts where their responsibilities differ.
- Keep ChooseTheFuture's cross-user lease authoritative. A provider may also coordinate its own internal agent assignments, but that must not create two independent owners for the same external task.
- Validate each provider's execution placement and credential model. The provider selection alone does not imply local-user execution or maintainer-hosted execution.
- Keep integration-specific behavior behind documented interfaces so future providers can be added without redesigning the task coordinator.

### Client interoperability

- Expose task discovery, claims, task context, progress, provider selection, and submission status through a stable ChooseTheFuture interface.
- Provide an MCP interface for compatible clients and provider/client-specific adapters where needed.
- Validate how each client receives a repository workspace, invokes the selected provider, and returns a reviewable submission; MCP support alone does not guarantee those capabilities.

## Task and submission lifecycle

Maintainers install the ChooseTheFuture App on a repository and mark which issues are eligible. A user opts into that project through the connector. The coordinator grants an expiring lease before work is handed to the selected integration so multiple users do not run the same task. The selected provider executes the work according to its configured operating mode. The connector returns a submission patch, run summary, and check results to the coordinator. The coordinator runs its pre-submission gate, pushes the change to a ChooseTheFuture fork, and opens a pull request as the App. Maintainers review and decide whether to accept or merge it; a ChooseTheFuture agent answers review feedback. Users do not need to manually drive or approve every task after opting in.

The coordinator should make transitions idempotent and recoverable. A disconnected connector or provider must not leave a task claimed forever; expired or failed work should return to an eligible state according to maintainer policy. The adapter must reconcile provider run status with the coordinator lease and submission status.

## Trust boundaries

- App installation and task eligibility determine what work enters the pool.
- User project allowlists determine what their connector may claim.
- Provider-specific execution boundaries protect local or hosted resources from repository code and task content. Each task needs an appropriate isolated workspace.
- Model credentials stay with the user- or maintainer-selected provider/runtime and are not sent to the ChooseTheFuture coordinator.
- GitHub App credentials stay with the coordinator and are never sent to connectors or agent workspaces.
- The coordinator receives task metadata, status, and the submission patch. It does not receive model credentials, agent workspaces, or unrelated files.
- Submission patches from connectors are untrusted input; the coordinator's gate checks them before publishing under the ChooseTheFuture name.
- Pull requests are untrusted proposals to maintainers. Maintainers retain review and merge authority; the system must not merge automatically. The App does not need write access to upstream repository contents.

## Decisions to resolve during implementation

- Coordinator hosting, database, authentication, and availability targets.
- The App's minimum permission set, and validation that an upstream installation can open a pull request from a branch on a separately installed ChooseTheFuture fork.
- The eligibility signal maintainers use (label name, issue template, or both) and how pause/withdrawal is expressed.
- Pre-submission gate contents and initial per-repository/global rate limits.
- How the review-response agent runs, and when it escalates to a person.
- Whether contributors can optionally be credited on a pull request.
- Whether OpenHands runs on the contributor's machine, on maintainer infrastructure, or through OpenHands Cloud for the pilot—and whose model access is used.
- How the OpenHands adapter identifies its run and reconciles status with the lease.
- How installers manage provider software and define per-task isolation on Windows and macOS.
- Which MCP tools and non-MCP adapters are required for the first interoperable release.
