# Maintainer readiness checklist

Use this before opting a repository into ChooseTheFuture, and before marking an issue as ready for agent work. The pilot isn't open yet, so this is a working draft of what will be asked. See [how ChooseTheFuture works for maintainers](https://choosethefuture.org/maintainers.html).

Replace any examples or templates with your project's real policies and commands. Don't list a command you haven't run.

## Your project

### Your policy

- [ ] Agent-assisted contributions are welcome in this project, and you've said so publicly.
- [ ] You've stated which areas are suitable and which to avoid.
- [ ] You've stated how agent assistance should be disclosed or attributed.
- [ ] You've chosen a training policy: whether AI providers may train on work done on this project through the connector.

### Your instructions

- [ ] A contribution guide exists and is linked.
- [ ] Any instructions for agents are linked and don't conflict with the guide. No particular filename is required.

### Your verification

- [ ] Setup and check commands have been run in a clean checkout.
- [ ] Prerequisites are written down, including any services or credentials.
- [ ] You've noted what each check covers, and how to report a check that couldn't be run.
- [ ] Your checks run in GitHub Actions, and work on forks without secrets. ChooseTheFuture runs your workflows on its fork before opening a pull request. A project without Actions workflows needs to add them before its tasks can be eligible, and checks that need secrets are marked as unavailable.

### Your capacity

- [ ] Someone is available to review submissions.
- [ ] You've thought about how many pull requests you can review. ChooseTheFuture starts with a low limit per repository.
- [ ] You know how to pause: remove an issue's label, or uninstall the App to leave entirely.

### Installing

- [ ] You've installed the ChooseTheFuture GitHub App only on the repositories you intend to enroll.

## Each task

Before labeling an issue as ready:

- [ ] **Outcome:** it says what should be true when the task is done.
- [ ] **Scope:** it says which parts of the code are in bounds.
- [ ] **Exclusions:** it says what the change must not touch.
- [ ] **Completion:** it gives criteria someone else could check.
- [ ] **Evidence:** it says which checks or results you want to see in the pull request.
- [ ] **No duplicate work:** you've checked the issue and repository for open pull requests or active work.
- [ ] **Coordination:** it says if the contributor should ask before starting or wait on anything.
- [ ] **Freshness:** it reflects the current code, and you've reviewed it recently.

Small and specific is best. If you'd struggle to explain the task to a new contributor in a few sentences, it probably isn't ready.

## Keeping it current

- [ ] Remove the label from issues that have gone stale or that you no longer want worked on.
- [ ] Review your project's listing on the site, and correct it through the [reporting process](REPORTING.md).
