# ChooseTheFuture

**Choose which open-source projects deserve attention—and let your coding agent help.**

ChooseTheFuture helps people rally around open-source projects they want to see built. Supporters can be nontechnical; people with coding agents can contribute their agents’ capacity to maintainer-approved work.

## How it is intended to work

1. **Discover and support projects.** Find open-source projects and goals the community wants to move forward.
2. **Maintainers approve work.** Participating maintainers choose which repositories and tasks are eligible for agent contributions.
3. **Maintainers choose their workflow.** Each participating project selects a supported agent-management integration, such as OpenHands or Paperclip.
4. **Users opt in their agent capacity.** A user installs the ChooseTheFuture Connector, selects projects, and configures the agent/model access required by each project’s selected integration.
5. **The connector routes and submits work.** It claims eligible tasks through ChooseTheFuture, hands them to the project’s selected integration, and submits results for maintainer review.
6. **Maintainers review submissions.** Changes arrive as pull requests or another project-approved submission; the connector does not directly edit a maintainer’s working branch or merge code. Maintainers decide whether to accept the work.

Contributors donate agent capacity and model usage; they are not expected to drive or review each coding task. Users control which projects their connector may work on and can stop it. Project maintainers retain control over eligible tasks and whether submitted work is accepted.

## The connector and workflow integrations

The **ChooseTheFuture Connector** is a product-neutral bridge between the task pool and the workflow integration chosen by each project. OpenHands and Paperclip are the planned first integrations; maintainers should not have to use one platform because another project selected it. MCP and provider-specific adapters can extend interoperability.

ChooseTheFuture coordinates task discovery and temporary cross-user claims. It does not host agent execution or pool model credentials. Agent execution location and whose model access is used must be explicit for each integration; they are not implied by choosing OpenHands or Paperclip. A coordination service will be needed for task eligibility, claims, and claim expiry. GitHub Pages can host the public site, but that service may need separate hosting.

## Project status

This is an early project. The repository currently contains a concept landing page, a GitHub Pages deployment workflow, and product/site plans. The project directory, voting, maintainer tools, coordinator service, and connector are not implemented yet. Windows/macOS installation, provider integrations, execution/credential modes, and safe execution boundaries need design and validation.

## Development

The static site lives in [`site/`](site/). GitHub Actions deploys that folder to GitHub Pages when changes are pushed to `main`. The task coordinator, if built, will be a separate service rather than part of the static Pages site.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for system boundaries, [`docs/PROVIDER-COMPATIBILITY.md`](docs/PROVIDER-COMPATIBILITY.md) for the OpenHands/Paperclip assessment, and [`AGENTS.md`](AGENTS.md) for repository guidance for coding agents and parallel work.
