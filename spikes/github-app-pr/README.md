# GitHub App pull request test

Decision D4 in [`docs/DECISIONS.md`](../../docs/DECISIONS.md) assumes the ChooseTheFuture App can open a pull request from a ChooseTheFuture fork without write access to the upstream repository's code. This test finds out whether that works.

## Why there are three setups

GitHub's documentation raises three doubts:

- An App has one set of permissions on every installation. An App that can push to the fork would ask each maintainer for code write access if installed on their repository too.
- Creating a fork through an App requires it to be installed on the source repository as well as the destination.
- Pull request creation is described as needing write access to the head branch, which an upstream installation's token doesn't have on the fork.

| Setup | How it works | If it works |
|---|---|---|
| **A. Two Apps** (preferred) | One App on the upstream can only open pull requests. A second, installed only on the organization, owns the fork and pushes. | D4 holds as written. |
| **B. One App** | One App with both sets of permissions, installed on both. | Works, but maintainers must grant code write access, so D4 and the maintainers page need to change. |
| **C. Machine account** | A normal GitHub user in the organization owns the fork and opens the pull request, like any outside contributor. The App still handles webhooks. | No bot badge, and it's the fallback in D1. |

Run A first. Only try B or C if it fails.

## Setup

1. **Create the organization** at <https://github.com/account/organizations/new>. `ChooseTheFuture` was available on 2026-11-02.
2. **Register two test Apps** under the organization, in its **Settings → Developer settings → GitHub Apps**. Turn the webhook off on both. Using test names keeps the real App names free.

   | | `ctf-test-pr` | `ctf-test-publisher` |
   |---|---|---|
   | Repository permissions | Pull requests: read and write; Issues: read | Contents: read and write; Administration: read and write; Actions: read |
   | Where it can be installed | Any account | Only on this account |
   | Install on | The upstream test repository only | The organization, all repositories |

3. **Generate a private key** for each App and save both outside this repository, for example in `~/.ctf-test/`. Don't commit them or paste them anywhere.
4. **Create an upstream test repository**, public and with a README, on an account other than the organization:

   ```bash
   gh repo create dissentingd/ctf-app-pr-test --public --add-readme
   ```

5. **Fork it into the organization** if the test can't: for setup A the publishing App isn't installed on the source, so expect the automatic fork to fail, and use GitHub's Fork button.

## Run

Python 3 with `cryptography` is required. The script never prints tokens or key contents.

```bash
python spikes/github-app-pr/test_app_pr.py --upstream dissentingd/ctf-app-pr-test --fork ChooseTheFuture/ctf-app-pr-test --pr-app-id <id> --pr-key ~/.ctf-test/pr.pem --push-app-id <id> --push-key ~/.ctf-test/publisher.pem
```

For setup B, pass the same App ID and key for both, after giving that App both sets of permissions and installing it on both accounts.

## What it checks

1. The fork exists, or the publishing App can create it.
2. The publishing App can push a branch to the fork.
3. The upstream token can open a pull request from that branch.
4. The upstream token **can't** write code upstream. It tries to create a branch, and deletes the branch if the attempt succeeds, which would count as a failure.
5. Whether GitHub Actions is enabled on the fork. It's reported for information, because D6 needs checks to run there and GitHub usually leaves Actions off on new forks.

## Clean up

Add `--cleanup` to the same command to close the test pull request and delete the test branch. Then delete the test repository, the fork, and both test Apps.

Record the outcome in D4, then register the real App.
