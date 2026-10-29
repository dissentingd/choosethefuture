# ChooseTheFuture Project Plan

This is the build roadmap for ChooseTheFuture as a product and community. It describes the order of work, what each stage should deliver, and what evidence should justify moving on. It is separate from [`SITEPLAN.md`](SITEPLAN.md), which describes the website’s pages and user interactions.

## Project objective

Build a public place where people—especially people who do not code—can choose which open-source projects deserve attention, then help interested coding-agent users direct their own agent sessions toward that work.

ChooseTheFuture coordinates interest and points contributors toward projects. People use their own accounts and workspaces. Each project keeps control of its repository, roadmap, contribution process, and review decisions.

## Product principles

- **People choose the destination.** Votes and follows express interest; they do not transfer tokens, promise labor, or bind maintainers.
- **Agents stay with their users.** ChooseTheFuture does not run agents or collect agent credentials or usage budgets.
- **Projects retain authority.** Project maintainers set priorities, approve contribution guidance, and review contributions.
- **Start with useful direction.** A clear project brief and a focused next step matter more than elaborate orchestration.
- **Measure separate outcomes separately.** Interest, agent sessions, submitted work, and accepted contributions are different signals.

## Milestone 0 — Establish the pilot and operating rules

**Purpose:** make the first community experiment concrete before building a complex platform.

### Work

- Define how projects enter the pilot and who can confirm project information.
- Select a small mix of open-source projects that welcome outside contributions and have active maintainers. Include ambitious examples people can rally around, while keeping the first test small enough to support manually.
- For each pilot project, prepare a plain-language brief, a few community goals, contribution links, current status, and any areas where agent contributions are unwelcome.
- Define what a vote means, how votes can be changed, and how stale or disputed project information is handled.
- Draft the first project-specific coding-agent prompt and ask maintainers to review it.
- Write a short privacy statement: ChooseTheFuture does not receive users’ tokens, connect to their agents, or see their work unless they choose to link a public contribution.

### Deliverables

- Pilot selection criteria and a project onboarding checklist.
- Maintainer-approved project briefs and goal records.
- A reviewed prompt template and contribution guidance.
- A lightweight moderation and correction process.

### Exit check

Pilot maintainers agree that the displayed goals and prompts are accurate, and a non-technical reader can explain what supporting a project does and does not commit them to.

## Milestone 1 — Run a concierge pilot

**Purpose:** test the full idea with people and projects before automating it.

### Work

- Publish the current concept landing page and a small manually curated project directory.
- Let supporters register interest in a project or goal using the simplest practical mechanism.
- Provide a copyable prompt for one maintainer-approved task or goal per project.
- Invite technical contributors to use their own coding agents, review the output, and submit work through the projects’ normal processes.
- Follow up with contributors and maintainers to record what happened. Do not infer an agent session from a prompt copy.

### Deliverables

- Public pilot directory with clear maintainer-confirmation and last-updated labels.
- A simple interest signal for each project/goal.
- Copyable agent prompts and direct links to repositories, issues, and contribution rules.
- A short pilot report describing participation, submitted work, maintainer feedback, and problems encountered.

### Exit check

People who are not developers can find and support a project without needing to understand GitHub. Agent users can identify a useful next step, and at least some maintainers find the resulting contributions reviewable and welcome. If that loop does not happen, revise the pitch or project guidance before expanding the software.

## Milestone 2 — Build the first functional MVP

**Purpose:** replace the manual directory and interest tracking with a dependable public product.

### Supporter features

- Browse and search a directory of projects.
- Read plain-language project summaries, goals, status, maintainer participation, and last-reviewed dates.
- Vote for or follow a project or goal; allow users to change or remove their support.
- View what a vote means and does not mean before taking the action.
- Share projects and goals without requiring recipients to sign in.

### Agent-contributor features

- Find a current goal or task with project-approved contribution guidance.
- Preview and copy a prompt that links to the repository and instructions.
- See a reminder to inspect current project guidance, check for duplicate work, make a focused change, review it personally, and use the normal contribution process.
- Optionally link to a resulting issue or pull request; do not request agent credentials or token details.

### Project data and moderation

- Store project, goal, and task records with status, source links, maintainer-confirmation state, and last-reviewed date.
- Provide a way to nominate a project and correct stale or inaccurate information.
- Moderate new public listings before publication.
- Let maintainers pause goals or mark them blocked or complete.

### Deliverables

- Responsive project directory and project pages.
- Lightweight supporter identity and voting, using an approach that works for non-technical people.
- Project and goal editing workflow for the initial maintainers or editors.
- Prompt generation based on project-owned information.
- Basic privacy, moderation, accessibility, and correction guidance.

### Exit check

A supporter can discover and support a goal; an agent user can get current guidance and submit a focused contribution; maintainers can correct or pause guidance; and the site reports interest separately from contribution outcomes.

## Milestone 3 — Make project participation sustainable

**Purpose:** reduce manual upkeep without shifting control away from project owners.

### Work

- Add maintainer claim and confirmation flows.
- Let maintainers update briefs, goals, task status, exclusions, and review dates.
- Add optional GitHub issue links or syncing only where maintainers want it; keep project-owned issue trackers authoritative.
- Add stale-guidance reminders and a visible “last checked” state.
- Offer notifications for project status changes and goals a supporter follows.

### Exit check

Maintainers can keep project information current with low effort, and stale or paused goals are not presented as ready work.

## Milestone 4 — Grow the community carefully

**Purpose:** increase participation while maintaining trust and contribution quality.

### Work

- Invite additional projects through community nominations and maintainer referrals.
- Help supporters share goals and explain the idea in accessible language.
- Improve discovery so new or under-supported projects can be found, not only those with the largest existing audiences.
- Publish transparent aggregate outcomes: interest, linked contribution attempts, submitted pull requests, and accepted work where verifiable.
- Review abuse, duplicate-vote, project-staleness, and low-quality-contribution patterns before adding more automation.

### Exit check

Growth brings more maintained project pages and useful contributions, rather than only more votes, copied prompts, or low-quality pull requests.

## Product measures

Track each stage of the loop independently:

1. **Discovery:** project page visits and shares.
2. **Interest:** votes and follows, including changes and removals.
3. **Direction:** prompt previews and copies, without treating a copy as completed work.
4. **Contribution:** user-linked issues or pull requests.
5. **Outcome:** merged or otherwise accepted work when confirmed by project activity or maintainers.
6. **Project health:** maintainer participation, brief freshness, paused/stale goals, and maintainer feedback.

Do not optimize for raw vote totals, prompt copies, or pull-request volume alone.

## Dependencies and decisions

Resolve these through the pilot where possible:

- Which project categories and goals attract supporters who will also stay engaged?
- What low-friction identity method can support changeable votes without requiring a GitHub account?
- How often must maintainers reconfirm project briefs and tasks?
- Which contribution outcomes can be tracked reliably without connecting to a user’s coding agent?
- What moderation capacity is available for nominations and corrections?
- What hosting and data services are needed once voting and editing move beyond the static GitHub Pages site?

## Main risks and responses

| Risk | Response |
|---|---|
| Popularity is mistaken for a binding roadmap | Label support as interest and keep project decisions with maintainers. |
| Many agents produce duplicate or unwanted changes | Use current, scoped tasks; ask contributors to check status and existing work; make maintainer opt-in visible. |
| Project information becomes stale | Show last-reviewed dates, allow pausing, and add maintainer reminders before automated syncing. |
| Non-technical supporters feel excluded | Keep browsing and voting language plain; make technical details optional and progressive. |
| The site rewards quantity over quality | Track contribution outcomes separately and avoid PR-volume leaderboards. |
| Users assume tokens or agent accounts are being pooled | State clearly that people use their own agent accounts and environments. |

## Current state

The repository has a concept landing page, a GitHub Pages workflow, a project README, and a detailed site blueprint. The project directory, voting, maintainer tools, prompt generation, and contribution tracking are not yet implemented. The next product step is to prepare and run the concierge pilot, not to build an agent execution platform.
