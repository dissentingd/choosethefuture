# ChooseTheFuture

**Choose which open-source projects deserve attention—and let your coding agent help.**

ChooseTheFuture helps people rally around open-source projects they want to see built. Supporters can be nontechnical; people with coding agents can contribute their agents’ capacity to maintainer-approved work.

## How it is intended to work

1. **Discover and support projects.** Find open-source projects and goals the community wants to move forward.
2. **Maintainers approve work.** Participating maintainers choose which repositories and tasks are eligible for agent contributions.
3. **Users opt in their agents.** A user installs the ChooseTheFuture Connector, chooses projects they want to contribute to, and configures their local model access.
4. **The connector runs and submits work.** The connector manages a local OpenHands runtime, claims eligible tasks through ChooseTheFuture, runs the agent locally, and submits the result for maintainer review.
5. **Maintainers review submissions.** The connector submits changes as pull requests or another project-approved submission; it does not directly edit a maintainer’s working branch or merge code. Maintainers decide whether to accept the work.

Contributors donate agent capacity and model usage; they are not expected to drive or review each coding task. Users control which projects their connector may work on and can stop it. Project maintainers retain control over eligible tasks and whether submitted work is accepted.

## The connector and interoperability

The **ChooseTheFuture Connector** is the user-facing bridge between the task pool and coding-agent clients. The initial direction is for it to install and manage the local OpenHands runtime, minimizing setup for users. ChooseTheFuture will also pursue interoperability with alternative clients, including an MCP interface and client adapters where needed.

The connector uses the user’s configured model access locally. ChooseTheFuture coordinates task discovery and temporary task claims; it does not pool model credentials or run users’ agents on its servers. A coordination service will be needed for task eligibility, claims, and claim expiry. GitHub Pages can host the public site, but that service may need separate hosting.

## Project status

This is an early project. The repository currently contains a concept landing page, a GitHub Pages deployment workflow, and product/site plans. The project directory, voting, maintainer tools, coordinator service, and connector are not implemented yet. The local runtime packaging, Windows/macOS installation experience, and safe execution boundary need design and validation.

## Development

The static site lives in [`site/`](site/). GitHub Actions deploys that folder to GitHub Pages when changes are pushed to `main`. The task coordinator, if built, will be a separate service rather than part of the static Pages site.
