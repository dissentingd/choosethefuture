# Provider Compatibility Spike

**Status:** documentation assessment plus a local Paperclip sign-in attempt; no agent task was run through either integration.  
**Research date:** 2026-10-30.

This spike asks whether the ChooseTheFuture Connector can support projects whose maintainers prefer OpenHands or Paperclip. These are both planned first integrations, but they occupy different architectural layers. This document records the fit, defines a provider-neutral task handoff, and lists the live checks still needed.

## Finding

The connector can support both without making either a universal requirement, provided it treats them as **different provider adapters** behind one ChooseTheFuture task lifecycle:

- **OpenHands** provides agent execution through Agent Server conversations/workspaces. Its local Agent Server exposes REST and WebSocket APIs. OpenHands Cloud exposes a separate asynchronous API for starting conversations and also has an Automation Service for webhooks, dispatch, run history, and sandbox lifecycle.
- **Paperclip** provides a task and agent orchestration control plane. Its company-scoped issues can be atomically checked out by a single agent; adapters launch or call the runtime and capture run state. It supports built-in and external adapters.

These are not equivalent APIs. OpenHands can be an execution provider directly. Paperclip can manage the task and agent workflow, then run one of its supported agent adapters. Paperclip's documented adapter list does not include OpenHands; using OpenHands under Paperclip would require a custom Paperclip adapter or another explicit bridge. A project that selects Paperclip can instead use a runtime Paperclip already supports, subject to its own setup and credential model.

The product can still present a maintainer-selected integration per project. Internally, preserve capability differences rather than pretending the integrations are interchangeable.

## Capability comparison

| Concern | OpenHands | Paperclip | ChooseTheFuture responsibility |
|---|---|---|---|
| Agent execution | Agent Server creates conversations in a configured workspace; Cloud starts conversations asynchronously in managed sandboxes. | Paperclip invokes a configured runtime through its adapter layer; it is primarily the control plane. | Route work through the project's selected adapter and expose execution mode to the user. |
| Task/agent management | Agent Server exposes conversations, events, and workspaces; its API is not itself the cross-project ChooseTheFuture task queue. OpenHands Automation adds scheduling and event dispatch. | Company-scoped issues, agent assignment, heartbeats, approvals, run history, and atomic single-assignee checkout. | Own cross-user eligibility and leases so two users cannot claim the same ChooseTheFuture task, regardless of provider. |
| Task handoff | Start a conversation with task instructions and an explicit workspace/repository context. Local Agent Server and OpenHands Cloud use different API shapes. | Create or map a Paperclip issue, assign/trigger an agent, or use an adapter that receives the task context. | Define a stable task envelope and map it to provider-specific objects. |
| Status and recovery | Local Agent Server exposes conversation events and WebSocket streaming. Cloud start is asynchronous and run state is tracked through Cloud/Automation APIs. | Run lifecycle and task checkout/status are tracked by Paperclip; adapters return run/session state and errors. | Correlate provider task/run IDs to the ChooseTheFuture claim; recover or expire orphaned claims. |
| Runtime choice | OpenHands runtime/workspace mode is configured by its deployment or client. | Maintainers select a Paperclip agent and its adapter; external adapters can connect custom runtimes. | Show where work runs and whose model access is used. Keep credentials out of the coordinator. |
| Submission | Agent can create a PR or another artifact through configured Git/GitHub access; exact identity and permissions depend on the deployment. | The selected Paperclip runtime/agent can produce a PR or artifact; Paperclip tracks task/run status, not ChooseTheFuture acceptance. | Record the result as a submission for maintainer review; never merge automatically. |
| Connector implementation | Direct Agent Server / Cloud API adapter. | Paperclip REST/API integration, an MCP path where supported, or a custom Paperclip adapter. | Keep a shared lifecycle contract and separate provider-specific translation. |

## Proposed connector contract

The coordinator owns the external lease. Each provider adapter gets the following task envelope after the coordinator grants a lease:

```json
{
  "taskId": "ctf-task-id",
  "claimId": "ctf-lease-id",
  "projectId": "ctf-project-id",
  "repository": "https://github.com/owner/repo",
  "sourceIssue": "https://github.com/owner/repo/issues/123",
  "title": "Maintainer-approved task",
  "instructions": "Bounded task description and acceptance context",
  "submissionPolicy": "pull-request",
  "provider": {
    "integration": "paperclip",
    "instanceRef": "project-provider-config",
    "executionMode": "maintainer-hosted",
    "credentialOwner": "maintainer"
  }
}
```

The `provider` example is illustrative, not a finalized schema. `instanceRef`, execution mode, and credential owner are non-secret routing metadata. Actual keys/tokens remain in the selected provider's configuration.

Provider adapters should implement these operations (or report an unsupported capability explicitly):

1. **Validate configuration** and confirm the project-selected integration is reachable.
2. **Start or hand off a task** using `claimId` as an idempotency key; return provider task/run identifiers.
3. **Report status** as queued, running, submitted, failed, cancelled, or unknown, with a concise reason for failure.
4. **Cancel or stop work** when the user pauses, the maintainer disables the task, or the coordinator revokes the lease.
5. **Return a submission reference** (PR URL, patch/artifact handle, or supported equivalent), summary, and available check results.
6. **Reconcile completion** with the coordinator so claims are released on success and recoverable on interruption.

The user opts into projects. The user or maintainer who owns the selected provider configures its model and repository access in that provider. The connector must show whose model usage is consumed and where work runs before the user opts into a project. The coordinator receives task metadata and status only; it must not receive model credentials or workspace contents. The provider/runtime may run locally or on infrastructure selected by the project/user.

## Paperclip integration options

### Option A: Paperclip manages the run

The connector maps a leased ChooseTheFuture task to a Paperclip company issue, assigns it to a configured Paperclip agent, and tracks the Paperclip run and resulting submission. Paperclip can use one of its existing adapters or a custom adapter. The ChooseTheFuture claim remains the outer cross-user lease; Paperclip checkout handles assignment within that Paperclip company.

**Use when:** a maintainer already runs Paperclip and wants its agent roster, task board, and run visibility.

**Needs validation:** how to authenticate to a maintainer's Paperclip instance, map CTF tasks without duplicating source-of-truth state, and attribute model/runtime costs if users are contributing capacity.

### Option B: Paperclip runs as a runtime under the connector

The connector can offer Paperclip as the user's local agent-management environment, but that adds Paperclip installation, its database/control plane, and agent-adapter setup to the user experience. It may be appropriate for advanced users, but it conflicts with the minimal setup goal unless the connector can provision and maintain the complete stack.

**Use when:** users explicitly want a local Paperclip workspace to manage several agents.

**Needs validation:** Windows/macOS packaging, local service lifecycle, storage/update management, and how users' model credentials are configured without exposing them to the coordinator.

### Option C: Paperclip custom adapter for OpenHands

If a project wants Paperclip's board and agent management while requiring OpenHands execution, a custom Paperclip adapter could invoke OpenHands Agent Server or another OpenHands endpoint. This keeps Paperclip's orchestration and OpenHands execution separate. It is additional integration work and should only be built if a pilot maintainer explicitly needs both.

## Recommended first implementation boundary

- Keep ChooseTheFuture's task eligibility and cross-user lease authoritative.
- Implement an OpenHands adapter for direct task-to-agent execution.
- Implement a Paperclip adapter for maintainers who choose Paperclip as their workflow control plane.
- Do not require Paperclip to use OpenHands, and do not require OpenHands users to install Paperclip.
- Keep the shared task/status/submission contract provider-neutral. Model provider-specific capabilities and execution/credential mode explicitly.
- Do not mirror the entire Paperclip project board into ChooseTheFuture. Store only the external IDs and statuses required to reconcile one leased task and its submission.

This is an adapter-level plan, not proof that both integrations can meet all desired modes. In particular, “maintainer selects Paperclip” and “each user contributes their own model access” may require a distributed Paperclip worker or a custom bridge; public docs alone do not establish that flow.

## Live validation checklist

The provider-specific checks below should be run with one sample task per integration before finalizing its adapter contract. The cross-provider coordinator checks belong to integration testing once the coordinator exists.

### OpenHands

- Start a task from the supported path (local Agent Server or Cloud) with the repository workspace and task instructions.
- Capture running/completed/failed state and recover after a connector restart.
- Produce a pull request or patch using the selected execution and Git identity.
- Confirm the required user/maintainer setup and model-credential location.

### Paperclip

- Create or map a Paperclip issue from one CTF task and assign it to a configured Paperclip agent.
- Confirm atomic checkout, heartbeat/run lifecycle, status recovery, and cancellation semantics.
- Run through an existing supported adapter; separately determine whether an OpenHands adapter is wanted.
- Produce a submission and reconcile it to the external CTF lease without making Paperclip or CTF silently override the other.
- Confirm Windows/macOS install and execution expectations, especially if users contribute their own model access.

### Cross-provider

- Start one connector task through each provider against a configured coordinator.
- Start two connectors against one CTF task and verify only one CTF claim is granted.
- Expire/release a claim and ensure provider work is stopped or marked orphaned before reassignment.
- Verify errors and provider outages do not leave tasks permanently claimed or duplicate submissions.

## Validation status

OpenHands and Paperclip have both been installed locally. Paperclip onboarding reached model connection, but the model sign-in did not complete, so no live run, API handshake, or submission has been tested through either integration. The checklist above remains the next hands-on validation.

## Primary references

- OpenHands [Agent Server API](https://github.com/OpenHands/software-agent-sdk/blob/main/openhands-agent-server/openhands/agent_server/README.md)
- OpenHands [Cloud API](https://github.com/OpenHands/docs/blob/main/openhands/usage/cloud/cloud-api.mdx)
- OpenHands [Automation Service](https://github.com/OpenHands/automation)
- Paperclip [Architecture](https://github.com/paperclipai/paperclip/blob/master/docs/start/architecture.md)
- Paperclip [Adapter overview](https://github.com/paperclipai/paperclip-docs/blob/main/docs/reference/adapters/overview.md)
- Paperclip [Issue API and atomic checkout](https://github.com/paperclipai/paperclip-docs/blob/main/docs/reference/api/issues.md)
- Paperclip [Custom adapter guide](https://github.com/paperclipai/paperclip/blob/master/docs/adapters/creating-an-adapter.md)
- Paperclip [MCP integration](https://github.com/paperclipai/paperclip-docs/blob/main/docs/how-to/add-mcp-server-to-agent.md)
