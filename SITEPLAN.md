# ChooseTheFuture Site Plan

## 1. Product summary

ChooseTheFuture is a public place where people decide which open-source projects deserve more attention. Its connector lets users opt their coding-agent capacity into maintainer-approved tasks.

The site connects two groups:

- **Supporters** who care about what gets built, even if they do not code.
- **Agent contributors** who choose projects for the ChooseTheFuture Connector and contribute agent capacity through the project’s selected provider.

ChooseTheFuture combines a public project directory with a task-coordination service and a user-facing connector. Maintainers choose a supported workflow integration for each project, such as OpenHands or Paperclip; the connector routes work through that integration. Users opt into projects and contribute agent capacity. Where agents run and whose model access they use depends on the selected integration and must be explicit. ChooseTheFuture does not host agent runs or pool credentials. Maintainers decide which tasks are eligible and review submitted contributions.

## 2. Product goals

1. Make it easy for a non-technical person to discover projects and express what they want to see built.
2. Turn that interest into a clear way for users to contribute coding-agent capacity to maintainer-approved work.
3. Direct attention toward current, project-relevant work rather than vague requests to “build the whole thing.”
4. Help projects receive reviewable submissions without requiring them to hand control of their repositories to ChooseTheFuture.
5. Show what happened after people expressed interest: whether goals are active, paused, completed, or awaiting project input.

### Boundaries and non-goals

- Hosting users’ agent runs or pooling model credentials and subscriptions.
- Replacing GitHub, project issue trackers, or maintainer review.
- Automatically merging code or claiming that votes obligate a project to follow a roadmap.
- Ranking software quality based on vote counts or raw pull-request volume.
- Requiring contributors to manually drive or approve each coding task after opting in; maintainer review remains required for submissions.

## 3. Audiences and needs

### Supporter

May not know how to code or what a repository issue means. Wants to understand the project in plain language, see why it matters, and signal support without creating an account just to browse.

**Needs:** clear summaries, visible progress, a simple “I want this” action, and an easy way to share a project.

### Agent contributor

Installs the ChooseTheFuture Connector, chooses which projects it may work on, and contributes agent capacity through each project’s selected workflow integration. They need understandable setup, clear project/task controls, and confidence that submissions go to maintainers for review.

**Needs:** clear consent and project allowlisting, simple setup, visible activity and controls, and a connector that works with the project’s chosen integration without requiring them to operate coding sessions manually.

### Project maintainer

Wants interested people to find the project, but needs contributions to fit project priorities and remain reviewable.

**Needs:** control over project enrollment and eligible tasks, a way to pause or correct stale guidance, and assurance that submissions remain subject to their review and merge decisions.

## 4. Information architecture

Primary navigation:

- **Explore projects** — the public directory and filters.
- **How it works** — explains choosing, opting in agent capacity, and maintainer review in plain language.
- **For project maintainers** — explains how to add a project and keep its guidance current.
- **Connector** — explains installation, project selection, model access, and contribution controls.
- **About** — the purpose, boundaries, and principles of ChooseTheFuture.

Core pages:

1. **Home** — clear explanation and routes into the project directory.
2. **Project directory** — searchable and filterable project cards.
3. **Project page** — project overview, community goals, current work, status, and participation actions.
4. **Goal or task detail** — a focused outcome, acceptance context, source links, and task availability.
5. **Submit a project** — a lightweight nomination form; publication follows a review step.
6. **Maintainer settings** — update a brief, approved tasks, eligibility, and pause state.
7. **Connector setup and settings** — install the connector, select projects, configure the selected integrations, and control agent activity.

## 5. Key user flows

### A. Support a project

1. Arrive at Home from a shared link or search.
2. Read a one-sentence explanation: “Choose the open-source projects you want to see built.”
3. Browse projects without signing in.
4. Open a project page and read its plain-language purpose, recent status, and goals.
5. Choose **Support this goal** or **Follow project**.
6. See confirmation and an optional share link. Support means interest, not a binding promise to contribute time or tokens.

### B. Contribute agent capacity

1. Install the ChooseTheFuture Connector.
2. Explicitly choose which enrolled projects it may serve and configure any access required by each project’s selected integration.
3. The coordinator offers eligible tasks from those projects; the connector claims a task with a temporary lease to prevent duplicate assignments.
4. The connector runs the agent in a separate task workspace and automatically submits the result, for example as a pull request, for maintainer review.
5. The user can monitor activity, change limits, pause the connector, or revoke project access. They contribute agent capacity rather than manually driving each task.
6. The connector routes each project’s tasks through its maintainer-selected integration, such as OpenHands or Paperclip. Alternative clients can connect through MCP or a supported adapter where available.

### C. Add or maintain a project

1. A project owner or community member submits a project nomination.
2. An editor checks that the project is open source, has an identifiable repository, and has a useful project brief.
3. The project is published with an explicit maintainer participation state: **maintainer-confirmed**, **community-submitted**, or **not recently confirmed**.
4. Maintainers can confirm ownership and supply goals/tasks, contribution rules, exclusions, and a last-reviewed date.
5. Maintainers can mark work active, blocked, paused, or complete. Stale guidance is visibly flagged and can be hidden from “ready to contribute” views.

## 6. Page design

### Home

**Purpose:** explain the idea quickly and welcome non-technical supporters.

Recommended content order:

1. Headline about choosing what gets built.
2. Short explanation that people can support projects and opt agent capacity into maintainer-approved work.
3. Primary action: **Explore projects**.
4. Secondary action: **How it works**.
5. Three short steps: choose, opt in an agent, and let maintainers review submissions.
6. A small set of current community-backed projects once real projects are available.
7. A project-maintainer invitation.

Do not present sample votes, testimonials, adoption numbers, or active projects as real before they exist.

### Project directory

Each card should show:

- Project name, logo or fallback icon, and one-line plain-language purpose.
- A concrete example of what the project enables.
- Number of supporters, labelled as an interest signal.
- Number of current goals with available work, if the project provides them.
- Maintainer-confirmation and last-reviewed indicators.
- **View project** and a low-friction support action.

Useful filters: topic, project status, has current tasks, and maintainer participation. Avoid engagement bait and a single “best project” score. Default ordering can be recently updated, with a separate “most supported” view.

### Project page

Recommended sections:

1. **What this project is** — plain-language summary and repository link.
2. **Why people care** — user or community need, written without assuming technical knowledge.
3. **Community support** — supporters and active goal interest, with a clear explanation that popularity is not a commitment from maintainers.
4. **What the project is working toward** — goals with status and project ownership.
5. **Work to pick up** — small current tasks, if supplied or approved by maintainers.
6. **How to help** — support or share the project, or opt it into the connector.
7. **Project guidance** — contribution rules, areas to avoid, and last-reviewed date.

### Goal/task page and task availability

Show the goal in outcome terms, its current status, acceptance context, related issue/PR links, maintainer notes, last update, and whether maintainer-approved tasks are available to connector users. Identify the selected workflow integration and clearly describe where work runs and whose model access it uses. Task eligibility and temporary claim status should be clear. The connector should provide the selected provider with the maintainer-approved task, acceptance context, and project instructions; acquire a temporary claim before handoff; keep work bounded; and attach a concise summary of changes, checks, and limitations to the submission. It submits work for maintainer review and never merges automatically. Model credentials must not be sent to the ChooseTheFuture coordinator or included in task content and submissions.

## 7. Voting and participation semantics

- A vote means **“I want this project or goal to receive attention.”** It does not itself enroll the voter’s agent or commit them to agent capacity, funding, or labor.
- Let users change or remove their support.
- Show support counts as a signal, not as a quality score or binding roadmap.
- Separate support from contribution outcomes. Track task claims, submissions, and accepted work as distinct events.
- Prefer a sign-in method that does not require a GitHub account, since many supporters are not developers. The exact authentication and abuse-control approach should be validated in the pilot.
- Connector enrollment is a separate, explicit choice to contribute agent capacity and model usage. Users select allowed projects and can pause or revoke access.
- Do not imply that voting shares model credentials or automatically enrolls a user’s agent.

## 8. Content model

### Project

- Name, slug, summary, description, topics, logo or image.
- Repository URL and project website.
- Project ownership/maintainer contact state.
- Selected workflow integration and non-secret connection/configuration metadata.
- Execution mode and model-access responsibility, clearly disclosed for the integration.
- Contribution guide URL and project-specific exclusions.
- Maintainer participation state and last-confirmed date.
- Goals, current tasks, support totals, and activity links.

### Goal

- Title and outcome description.
- Why it matters, desired result, and acceptance context.
- Status: proposed, active, paused, blocked, or complete.
- Project/maintainer source links and last-updated date.
- Related tasks and agent instructions.

### Task

- Short bounded description and source issue link.
- Labels for skills or areas, if useful.
- Maintainer eligibility: draft, ready for agent work, paused, or closed.
- Claim/submission status: available, claimed, running, submitted, expired, failed, or complete.
- Maintainer notes, exclusions, and acceptance criteria.

## 9. Trust, quality, and moderation

- Clearly distinguish maintainer-confirmed information from community-submitted information.
- Give every brief and task a visible last-reviewed date.
- Let maintainers pause or remove a goal from the active contribution list.
- Require explicit maintainer enrollment and task eligibility before connector users can claim work.
- Make task claims atomic and expiring so simultaneous connectors do not start the same task.
- Keep each task in its own workspace; keep model credentials in the selected provider’s configuration, not in task content, the repository workspace, or the ChooseTheFuture coordinator.
- Submit changes as pull requests or another project-approved submission; do not directly edit a maintainer’s working branch or merge automatically.
- Make connector project allowlists and pause/revoke controls visible to users.
- Link back to source issues, repositories, and project-owned guidance.
- Distinguish ChooseTheFuture task coordination from maintainer-provided instructions and project policy.
- Provide a simple way to report stale, incorrect, unsafe, or unwanted project guidance.
- Do not reward raw pull-request volume. Show useful outcomes with context and maintainer confirmation where possible.
- Keep user-generated submissions moderated before public listing to reduce spam and misleading project claims.

## 10. Visual and interaction direction

The experience should feel welcoming, hopeful, and credible—not like a developer dashboard or cryptocurrency marketplace.

- Use plain language; explain “open source” and “coding agent” where needed.
- Lead with people and outcomes, then explain the software workflow.
- Keep project cards visual and scannable, with clear status labels.
- Use one primary action per view and readable body text.
- Make all actions work with keyboard, visible focus, sufficient contrast, and screen readers.
- Support reduced motion and small screens.
- Avoid cryptocurrency imagery, developer-only jargon, and gamified contribution leaderboards. Explain model usage plainly and show the user’s connector controls.

## 11. MVP scope and sequence

### Phase 1: Useful public directory

- Home, directory, project pages, and project nomination form.
- Small manually curated project cohort.
- Project briefs and goals stored in a simple, reviewable format.
- Clear maintainer-confirmation and last-reviewed states.
- External links to project issues, contribution rules, and repositories.
- Responsive static site on GitHub Pages.

### Phase 2: Support and task coordination

- Lightweight supporter identity and changeable project/goal votes.
- Goal and task pages with maintainer-controlled eligibility.
- Coordinator service for task discovery, atomic claims, lease expiry, and submission status. Host separately from the static GitHub Pages site as needed.
- Connector prototype with project-selected OpenHands and Paperclip integrations; make each integration’s execution and credential model explicit and submit results for maintainer review.
- Basic abuse controls and moderation queue.

### Phase 3: Connector usability and client interoperability

- Maintainer claim/verification and self-service project updates.
- Guided Windows and macOS installer that configures the connector and selected provider with minimal setup; validate each supported execution/sandbox mode during feasibility work.
- MCP interface and adapters for alternative coding-agent clients.
- Maintainer task enrollment and status integration with GitHub Issues and Projects where useful.
- Stale-task reminders and project update notifications.
- Community goal proposals with clear moderation and maintainer response states.

Do not centralize user model credentials or agent execution, automatically merge contributions, or build elaborate reputation systems unless later evidence shows a clear need.

## 12. MVP success measures

Measure whether the site creates a useful loop, not just traffic:

- Supporters can explain what the project does and what their vote means.
- Visitors can find a current, project-approved next step.
- Users can install the connector, opt in selected projects, and contribute agent capacity without manually driving each coding task.
- Maintainers receive scoped submissions they can review and accept or decline.
- Maintainers confirm the guidance remains current and find the resulting contributions manageable.
- The share of projects with current briefs and maintainer confirmation remains visible.

Keep interest counts separate from task claims, submitted work, and accepted contributions; each measures a different part of the loop.

## 13. Decisions to validate in the pilot

- Which identity method makes voting easy for non-technical supporters while limiting duplicate votes?
- Should project owners approve every goal before it appears, or can community-proposed goals be shown separately?
- What is the lightest way to keep task status fresh without creating work for maintainers?
- What task and submission status can the coordinator collect while keeping model credentials and workspaces outside the coordinator?
- Which provider integrations beyond OpenHands and Paperclip should be supported?
- Where does each provider run, and whose model access does it use?
- Which Windows/macOS installer and provider-specific isolation approaches can meet the low-friction installation goal?
- How should the directory balance popular projects with new or under-discovered projects?
