# ChooseTheFuture

**Choose which open-source projects deserve attention—and let your coding agent help.**

ChooseTheFuture helps people rally around open-source projects they want to see built. Supporters can be nontechnical; people with coding agents can contribute their agents’ capacity to maintainer-approved work.

## How it is intended to work

1. **Discover and support projects.** Find open-source projects and goals the community wants to move forward.
2. **Maintainers opt in and approve work.** A maintainer installs the ChooseTheFuture GitHub App on a repository and marks which issues are eligible for agent contributions.
3. **Users opt in their agent capacity.** A user installs the ChooseTheFuture Connector, selects projects, and configures the agent/model access it needs.
4. **The connector does the work.** It leases an eligible task from the ChooseTheFuture coordinator, runs it through the agent integration (OpenHands for the pilot), and returns the finished change to the coordinator.
5. **ChooseTheFuture submits it.** The coordinator checks the change and opens a pull request as the ChooseTheFuture App. The ChooseTheFuture organization is the accountable author, and a ChooseTheFuture agent answers review feedback.
6. **Maintainers decide.** Nothing is pushed to a maintainer’s repository or merged automatically. Maintainers decide whether to accept the work.

Contributors donate agent capacity and model usage; they are not expected to drive or review each coding task. Users control which projects their connector may work on and can stop it. Project maintainers retain control over eligible tasks and whether submitted work is accepted.

## The connector and workflow integrations

The **ChooseTheFuture Connector** is a product-neutral bridge between the task pool and an agent workflow integration. The pilot supports OpenHands; Paperclip and other integrations may follow once that path works end to end. MCP and provider-specific adapters can extend interoperability.

ChooseTheFuture coordinates task discovery, temporary cross-user leases, and pull-request submission. It does not host agent execution or pool model credentials, and contributors' connectors never hold ChooseTheFuture's GitHub credentials. Agent execution location and whose model access is used must be explicit. The coordinator runs separately from the GitHub Pages site. Settled decisions are recorded in [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Project status

This is an early project. The repository currently contains a concept landing page, a GitHub Pages deployment workflow, and product/site plans. The project directory, voting, maintainer tools, coordinator service, and connector are not implemented yet. Windows/macOS installation, provider integrations, execution/credential modes, and safe execution boundaries need design and validation.

## Development

The static site lives in [`site/`](site/). GitHub Actions deploys that folder to GitHub Pages when changes are pushed to `main`. The task coordinator, if built, will be a separate service rather than part of the static Pages site.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for system boundaries, [`docs/PROVIDER-COMPATIBILITY.md`](docs/PROVIDER-COMPATIBILITY.md) for the OpenHands/Paperclip assessment, and [`AGENTS.md`](AGENTS.md) for repository guidance for coding agents and parallel work.
