# ChooseTheFuture Site Plan

## 1. Product summary

ChooseTheFuture is a public place where people decide which open-source projects deserve more attention and invite their own AI coding agents to help those projects move forward.

The site connects two groups:

- **Supporters** who care about what gets built, even if they do not code.
- **Agent contributors** who can use a coding agent to make a focused contribution in their own workspace.

ChooseTheFuture is a directory, coordination signal, and prompt guide. It does not pool tokens, run agents, grant repository access, or promise that a project will accept a contribution. Each project keeps its own roadmap and review process.

## 2. Product goals

1. Make it easy for a non-technical person to discover projects and express what they want to see built.
2. Turn that interest into a clear next step for people with spare coding-agent capacity.
3. Direct attention toward current, project-relevant work rather than vague requests to “build the whole thing.”
4. Help projects receive contributions through their existing processes, without requiring them to hand control to ChooseTheFuture.
5. Show what happened after people expressed interest: whether goals are active, paused, completed, or awaiting project input.

### Not goals for the first release

- Hosting or dispatching coding agents.
- Collecting, pooling, transferring, or measuring users’ model tokens or subscriptions.
- Replacing GitHub, project issue trackers, or maintainer review.
- Automatically merging code or claiming that votes obligate a project to follow a roadmap.
- Ranking software quality based on vote counts or raw pull-request volume.

## 3. Audiences and needs

### Supporter

May not know how to code or what a repository issue means. Wants to understand the project in plain language, see why it matters, and signal support without creating an account just to browse.

**Needs:** clear summaries, visible progress, a simple “I want this” action, and an easy way to share a project.

### Agent contributor

Uses a coding agent and wants to spend a session on work that is useful to a real project. Needs current project guidance, a bounded task, and a prompt that asks the agent to inspect the repository before changing anything.

**Needs:** task status, links to source issues and contribution rules, a copyable prompt, and an explicit reminder to review the result personally.

### Project maintainer

Wants interested people to find the project, but needs contributions to fit project priorities and remain reviewable.

**Needs:** control over the project brief, approved goals and tasks, a way to pause or correct stale guidance, and no implication that community votes override maintainer decisions.

## 4. Information architecture

Primary navigation:

- **Explore projects** — the public directory and filters.
- **How it works** — explains choosing, prompting, reviewing, and contributing in plain language.
- **For project maintainers** — explains how to add a project and keep its guidance current.
- **About** — the purpose, boundaries, and principles of ChooseTheFuture.

Core pages:

1. **Home** — clear explanation and routes into the project directory.
2. **Project directory** — searchable and filterable project cards.
3. **Project page** — project overview, community goals, current work, status, and participation actions.
4. **Goal or task detail** — a focused outcome, acceptance context, source links, and generated agent prompt.
5. **Submit a project** — a lightweight nomination form; publication follows a review step.
6. **Maintainer settings** — later phase; update a brief, goals, task status, and pause state.

## 5. Key user flows

### A. Support a project

1. Arrive at Home from a shared link or search.
2. Read a one-sentence explanation: “Choose the open-source projects you want to see built.”
3. Browse projects without signing in.
4. Open a project page and read its plain-language purpose, recent status, and goals.
5. Choose **Support this goal** or **Follow project**.
6. See confirmation and an optional share link. Support means interest, not a binding promise to contribute time or tokens.

### B. Use a coding agent

1. Open a project goal or current task.
2. Check its status, last update, repository link, and project contribution guidance.
3. Select **Get a prompt for my coding agent**.
4. Review the prompt before copying it. It should name the goal/task and link to project-owned instructions.
5. Paste it into the contributor’s own coding agent and workspace.
6. Review the generated changes, then follow the project’s normal issue or pull-request process.
7. Optionally return to ChooseTheFuture and record an outcome or link to the resulting pull request.

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
2. Short explanation that people can support projects and invite their own coding agents.
3. Primary action: **Explore projects**.
4. Secondary action: **How it works**.
5. Three short steps: choose, invite an agent, review and contribute.
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
6. **How to help** — support, share, open the issue, or copy an agent prompt.
7. **Project guidance** — contribution rules, areas to avoid, and last-reviewed date.

### Goal/task page and prompt panel

Show the goal in outcome terms, its current status, acceptance context, related issue/PR links, maintainer notes, and last update. A prompt panel should:

- State that it is generated by ChooseTheFuture and is not a maintainer instruction unless explicitly marked as maintainer-provided.
- Link to the project’s repository and contribution guidance.
- Ask the agent to inspect the current code and project instructions first.
- Ask it to check whether the task is still open and whether duplicate work is visible.
- Bound the change to the selected goal and ask for a concise summary of changes, checks, and limitations.
- Tell the person to review all changes and submit them through the project’s normal process.
- Never ask for credentials, token transfer, direct pushes, or automatic merges.

## 7. Voting and participation semantics

- A vote means **“I want this project or goal to receive attention.”** It does not mean the voter is committing tokens, agent time, funding, or labor.
- Let users change or remove their support.
- Show support counts as a signal, not as a quality score or binding roadmap.
- Separate support from contribution outcomes. Track submitted or merged work only when linked or confirmed; do not infer it from copied prompts.
- Prefer a sign-in method that does not require a GitHub account, since many supporters are not developers. The exact authentication and abuse-control approach should be validated in the pilot.
- Consider an optional “I may try an agent session” pledge separately from votes; keep it non-binding and private by default.

## 8. Content model

### Project

- Name, slug, summary, description, topics, logo or image.
- Repository URL and project website.
- Project ownership/maintainer contact state.
- Contribution guide URL and project-specific exclusions.
- Maintainer participation state and last-confirmed date.
- Goals, current tasks, support totals, and activity links.

### Goal

- Title and outcome description.
- Why it matters, desired result, and acceptance context.
- Status: proposed, active, paused, blocked, or complete.
- Project/maintainer source links and last-updated date.
- Related tasks and prompt context.

### Task

- Short bounded description and source issue link.
- Labels for skills or areas, if useful.
- Status: available, in progress, blocked, or complete.
- Maintainer notes, exclusions, and acceptance criteria.

## 9. Trust, quality, and moderation

- Clearly distinguish maintainer-confirmed information from community-submitted information.
- Give every brief and task a visible last-reviewed date.
- Let maintainers pause or remove a goal from the active contribution list.
- Link back to source issues, repositories, and project-owned guidance.
- Treat generated prompts as navigational help, not authority or endorsement.
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
- Avoid token imagery, compute meters, developer-only jargon, and gamified contribution leaderboards.

## 11. MVP scope and sequence

### Phase 1: Useful public directory

- Home, directory, project pages, and project nomination form.
- Small manually curated project cohort.
- Project briefs and goals stored in a simple, reviewable format.
- Clear maintainer-confirmation and last-reviewed states.
- External links to project issues, contribution rules, and repositories.
- Responsive static site on GitHub Pages.

### Phase 2: Support and agent prompts

- Lightweight supporter identity and changeable project/goal votes.
- Goal and task pages with copyable, previewable prompts.
- Optional links for reporting contribution attempts and outcomes.
- Basic abuse controls and moderation queue.

### Phase 3: Maintainer tools and sustainable updates

- Maintainer claim/verification and self-service project updates.
- GitHub issue syncing where maintainers want it.
- Stale-task reminders and project update notifications.
- Community goal proposals with clear moderation and maintainer response states.

Do not build agent execution, token pooling, account-level usage measurement, automatic merging, or elaborate reputation systems unless later evidence shows a clear need.

## 12. MVP success measures

Measure whether the site creates a useful loop, not just traffic:

- Supporters can explain what the project does and what their vote means.
- Visitors can find a current, project-approved next step.
- Agent users copy a prompt, review the work, and submit focused contributions.
- Maintainers confirm the guidance remains current and find the resulting contributions manageable.
- The share of projects with current briefs and maintainer confirmation remains visible.

Keep interest counts separate from agent sessions and accepted contributions; each measures a different part of the loop.

## 13. Decisions to validate in the pilot

- Which identity method makes voting easy for non-technical supporters while limiting duplicate votes?
- Should project owners approve every goal before it appears, or can community-proposed goals be shown separately?
- What is the lightest way to keep task status fresh without creating work for maintainers?
- Which outcome signals can be collected reliably without requiring access to a contributor’s agent account?
- How should the directory balance popular projects with new or under-discovered projects?
