# ChooseTheFuture Decisions

This is the record of settled product and architecture decisions. Other documents describe how these decisions play out; when they disagree, this file wins and the other document should be corrected. Record new decisions here with a date, and mark anything still unproven as **to validate** rather than assuming it works.

## 2026-11-01 — Submission identity, coordinator role, and pilot scope

### D1. Submissions are opened by a ChooseTheFuture GitHub App

Every pull request created through ChooseTheFuture is opened by an organization-owned **ChooseTheFuture GitHub App**, not by individual contributors' GitHub accounts. The ChooseTheFuture organization is the accountable author of every submission.

- Pull requests carry GitHub's bot badge and state plainly that the change was produced by an agent through ChooseTheFuture.
- Contributors' agent capacity produces the work; the contributor's identity is not attached to the pull request unless a later decision adds optional attribution.
- A plain machine user account with a personal access token is a fallback only; the App is preferred for scoped, short-lived, per-repository permissions.

### D2. Review feedback is answered by ChooseTheFuture

Maintainer review comments on a ChooseTheFuture pull request are answered by a ChooseTheFuture agent, escalating to the ChooseTheFuture organization as needed. Contributors are not expected to follow up on review. This is disclosed on each pull request and on the maintainer page.

### D3. Connectors never hold GitHub write credentials

The connector on a contributor's machine never receives the App's credentials or any token that can write to GitHub under the ChooseTheFuture identity.

- The connector returns the finished change to the coordinator as a **submission patch** with a run summary and check results.
- The coordinator validates the patch, pushes it to a branch on a ChooseTheFuture-owned fork, and opens the pull request against the upstream repository as the App.
- **This revises an earlier boundary.** The coordinator now receives the submission patch. It still never receives agent workspaces, unrelated files, or model credentials.

### D4. Maintainers opt in by installing the App

A project joins ChooseTheFuture when its maintainer installs the ChooseTheFuture GitHub App on the repository and marks issues eligible (for example with a label). Installation is the consent record; uninstalling or removing labels withdraws eligibility.

- The App receives issue and label events through webhooks so the coordinator can ingest eligible tasks.
- The App does not need write access to upstream repository contents: branches live on the ChooseTheFuture fork, and the upstream installation needs only the permissions required to read issues and open and update pull requests.
- **To validate:** that an installation token on the upstream repository can open a pull request whose head branch lives on a ChooseTheFuture fork installed separately, and the exact minimum permission set.

### D5. The coordinator is kept for the pilot and owns leases

The coordinator is part of the pilot, not deferred. It runs as the App's backend: it receives webhooks, stores eligible tasks, issues leases, accepts submission patches, and opens pull requests.

- Task leases are issued with an atomic update in the coordinator's database. GitHub issue assignment is not the lease authority, because it is not a compare-and-set operation.
- The coordinator may reflect lease state back to GitHub (for example a comment or label) for maintainer visibility.

### D6. Quality gate and pacing before any pull request opens

Because every submission is published under the ChooseTheFuture name, the coordinator applies a gate before opening a pull request: the repository's own checks must be run and reported, the change must stay within the task's stated scope, and an automated review step may be added. Pull requests are rate-limited per repository and globally, starting low.

### D7. Pilot with one integration: OpenHands

The pilot supports a single workflow integration, **OpenHands**. Paperclip and other integrations are deferred until the OpenHands path works end to end. The adapter contract stays provider-neutral so a second integration can be added without redesigning the coordinator, but no second adapter is built for the pilot.

### D8. Maintainer outreach follows working tools

Maintainer demand is treated as present. Structured outreach to identify pilot maintainers resumes once the coordinator, App, and connector work well for their purpose.

## 2026-11-01 — License and training policy

### D9. ChooseTheFuture is noncommercial, with gated commercial AI training

The repository is licensed like PublicSewing: PolyForm Noncommercial 1.0.0 for source code ([`LICENSE`](../LICENSE)) and CC BY-NC 4.0 for everything else ([`LICENSE-CONTENT`](../LICENSE-CONTENT)), copyright David Borowski II. It is source-available, not OSI open source. The license texts are unmodified. [`AI-TRAINING.md`](../AI-TRAINING.md) is a clarification and policy document, not added license terms:

- Noncommercial AI training is already permitted by the licenses.
- Commercial AI training is not licensed, and requires express prior written permission, requested by issue with the same disclosures Dicklesworthstone asks for: organisation, account/provider setup, local or hosted processing, training/retention/sharing settings, and purpose.
- AI-assisted development with provider-side training off is welcome through the ChooseTheFuture Connector only, because the connector enforces that setting. AI-assisted development outside the connector requires written permission, requested by issue with the same disclosures. Unlike the OpenAI/Anthropic rider used by Dicklesworthstone's repositories, provider processing through the connector is not otherwise restricted.

### D10. The connector enforces each project's training policy through setup acknowledgment

Participating projects can declare a training policy. Provider training toggles generally can't be read by local software, so the ChooseTheFuture Connector enforces the policy during setup (decided 2026-11-01):

1. It gives the contributor instructions for turning off provider-side training for the model access they connect.
2. It requires them to read the connector's terms of use, which oblige them to keep training off. The training-off requirement is part of those terms.
3. It requires them to accept those terms and acknowledge that they have turned training off. The connector runs no tasks until they have.

The acknowledgment is recorded locally and covers the model access the contributor connected; connecting different model access repeats the steps. The coordinator does not receive the contributor's provider account details.

- **Still to write:** the connector's terms of use.
- **Still to decide:** whether the connector also refuses configurations it can tell would allow training (for example, a provider's free tier), and how often acknowledgment is renewed.
- The policy vocabulary, at least "no commercial training without permission" and "no training", is still to be defined, along with where projects declare it.

### D11. Permission for the maintainer's own AI-assisted development

Until the connector exists, David Borowski II grants written permission under [`AI-TRAINING.md`](../AI-TRAINING.md) for AI-assisted development on this repository in Claude Code sessions he runs, with provider-side training on the account confirmed off (2026-11-01). This permission covers only those sessions; anyone else still needs the connector or their own written permission.
