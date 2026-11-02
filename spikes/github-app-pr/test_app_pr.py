#!/usr/bin/env python3
"""Tests whether a GitHub App can open a pull request from a fork it doesn't share an installation with.

See README.md in this folder for setup. Never prints tokens or key contents.

Requires: pip install cryptography
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

API = 'https://api.github.com'
BRANCH = 'ctf-app-pr-test'
TEST_FILE = 'ctf-app-pr-test.txt'
results = []


def report(name, passed, detail=''):
    results.append((name, passed))
    label = {True: 'PASS', False: 'FAIL', None: 'INFO'}[passed]
    print(f'[{label}] {name}' + (f': {detail}' if detail else ''))


def b64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode()


def app_jwt(app_id, key_path):
    now = int(time.time())
    header = b64url(json.dumps({'alg': 'RS256', 'typ': 'JWT'}).encode())
    claims = b64url(json.dumps({'iat': now - 60, 'exp': now + 540, 'iss': str(app_id)}).encode())
    with open(key_path, 'rb') as handle:
        key = serialization.load_pem_private_key(handle.read(), password=None)
    signature = key.sign(f'{header}.{claims}'.encode(), padding.PKCS1v15(), hashes.SHA256())
    return f'{header}.{claims}.{b64url(signature)}'


def api(method, path, token, body=None):
    request = urllib.request.Request(f'{API}{path}', method=method)
    request.add_header('Authorization', f'Bearer {token}')
    request.add_header('Accept', 'application/vnd.github+json')
    request.add_header('X-GitHub-Api-Version', '2022-11-28')
    data = None
    if body is not None:
        data = json.dumps(body).encode()
        request.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(request, data) as response:
            raw = response.read()
            return response.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as error:
        raw = error.read()
        try:
            return error.code, json.loads(raw)
        except ValueError:
            return error.code, {'message': raw.decode(errors='replace')[:200]}


def message(payload):
    text = payload.get('message', '') if isinstance(payload, dict) else ''
    errors = payload.get('errors') if isinstance(payload, dict) else None
    return f'{text} {errors}' if errors else text


def installation_token(app_id, key_path, account):
    jwt = app_jwt(app_id, key_path)
    status, installations = api('GET', '/app/installations', jwt)
    if status != 200:
        sys.exit(f'Could not list installations for App {app_id}: {status} {message(installations)}')
    for install in installations:
        if install['account']['login'].lower() == account.lower():
            status, payload = api('POST', f"/app/installations/{install['id']}/access_tokens", jwt, {})
            if status != 201:
                sys.exit(f'Could not get a token for {account}: {status} {message(payload)}')
            print(f"App {app_id} on {account}: permissions {json.dumps(payload.get('permissions'))}")
            return payload['token']
    sys.exit(f'App {app_id} is not installed on {account}.')


def ensure_fork(token, upstream, fork):
    status, _ = api('GET', f'/repos/{fork}', token)
    if status == 200:
        report('Fork exists and the publishing App can see it', True, fork)
        return True
    org = fork.split('/')[0]
    status, payload = api('POST', f'/repos/{upstream}/forks', token, {'organization': org})
    report('Publishing App can create the fork', status in (200, 202), f'{status} {message(payload)}')
    if status not in (200, 202):
        return False
    for _ in range(12):
        time.sleep(5)
        if api('GET', f'/repos/{fork}', token)[0] == 200:
            return True
    report('Fork became available', False, 'timed out after 60 seconds')
    return False


def push_branch(token, fork):
    status, repo = api('GET', f'/repos/{fork}', token)
    if status != 200:
        report('Publishing App can read the fork', False, f'{status} {message(repo)}')
        return None
    base = repo['default_branch']
    status, ref = api('GET', f'/repos/{fork}/git/ref/heads/{base}', token)
    if status != 200:
        report('Publishing App can read the default branch', False, f'{status} {message(ref)}')
        return None
    status, payload = api('POST', f'/repos/{fork}/git/refs', token, {'ref': f'refs/heads/{BRANCH}', 'sha': ref['object']['sha']})
    if status == 422:
        print(f'Branch {BRANCH} already exists on the fork; reusing it.')
    elif status != 201:
        report('Publishing App can create a branch on the fork', False, f'{status} {message(payload)}')
        return None
    status, existing = api('GET', f'/repos/{fork}/contents/{TEST_FILE}?ref={BRANCH}', token)
    body = {
        'message': 'Test commit from the ChooseTheFuture App pull request test',
        'content': base64.b64encode(f'Test at {int(time.time())}\n'.encode()).decode(),
        'branch': BRANCH,
    }
    if status == 200:
        body['sha'] = existing['sha']
    status, payload = api('PUT', f'/repos/{fork}/contents/{TEST_FILE}', token, body)
    report('Publishing App can push to the fork', status in (200, 201), f'{status} {message(payload)}')
    return base if status in (200, 201) else None


def open_pr(token, upstream, fork, base):
    head = f"{fork.split('/')[0]}:{BRANCH}"
    status, open_prs = api('GET', f'/repos/{upstream}/pulls?state=open&head={head}', token)
    if status == 200 and open_prs:
        report('Upstream token can see the existing pull request', True, open_prs[0]['html_url'])
        return open_prs[0]['number']
    status, payload = api('POST', f'/repos/{upstream}/pulls', token, {
        'title': 'ChooseTheFuture App pull request test',
        'body': 'Automated test of the ChooseTheFuture App submission path. Safe to close.',
        'head': head,
        'base': base,
        'maintainer_can_modify': False,
    })
    report('Upstream token can open a pull request from the fork', status == 201, payload.get('html_url') if status == 201 else f'{status} {message(payload)}')
    return payload.get('number') if status == 201 else None


def check_no_upstream_write(token, upstream, base):
    """Attempts a write that should be refused, and undoes it if it isn't."""
    status, ref = api('GET', f'/repos/{upstream}/git/ref/heads/{base}', token)
    if status != 200:
        report('Upstream token cannot write code', None, f'could not read the branch to test: {status} {message(ref)}')
        return
    probe = 'ctf-write-probe'
    status, payload = api('POST', f'/repos/{upstream}/git/refs', token, {'ref': f'refs/heads/{probe}', 'sha': ref['object']['sha']})
    if status == 201:
        api('DELETE', f'/repos/{upstream}/git/refs/heads/{probe}', token)
    report('Upstream token cannot write code', status != 201, f'write attempt returned {status}')


def report_fork_actions(token, fork):
    status, payload = api('GET', f'/repos/{fork}/actions/permissions', token)
    if status == 200:
        report('GitHub Actions on the fork (for running checks, D6)', None, f"enabled={payload.get('enabled')}")
    else:
        report('GitHub Actions on the fork (for running checks, D6)', None, f'could not read: {status} {message(payload)}')


def cleanup(pr_token, push_token, upstream, fork):
    head = f"{fork.split('/')[0]}:{BRANCH}"
    status, prs = api('GET', f'/repos/{upstream}/pulls?state=open&head={head}', pr_token)
    for pr in prs if status == 200 else []:
        closed, _ = api('PATCH', f"/repos/{upstream}/pulls/{pr['number']}", pr_token, {'state': 'closed'})
        print(f"Closed pull request {pr['number']}: {closed}")
    status, _ = api('DELETE', f'/repos/{fork}/git/refs/heads/{BRANCH}', push_token)
    print(f'Deleted test branch on the fork: {status}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--upstream', default=os.environ.get('CTF_UPSTREAM'), help='owner/repo that receives the pull request')
    parser.add_argument('--fork', default=os.environ.get('CTF_FORK'), help='org/repo the pull request comes from')
    parser.add_argument('--pr-app-id', default=os.environ.get('CTF_PR_APP_ID'))
    parser.add_argument('--pr-key', default=os.environ.get('CTF_PR_KEY'), help='path to the PEM key')
    parser.add_argument('--push-app-id', default=os.environ.get('CTF_PUSH_APP_ID'))
    parser.add_argument('--push-key', default=os.environ.get('CTF_PUSH_KEY'), help='path to the PEM key')
    parser.add_argument('--cleanup', action='store_true', help='close the test pull request and delete the test branch')
    args = parser.parse_args()
    missing = [name for name in ('upstream', 'fork', 'pr_app_id', 'pr_key', 'push_app_id', 'push_key') if not getattr(args, name)]
    if missing:
        parser.error(f"missing: {', '.join(missing)}")

    upstream_owner = args.upstream.split('/')[0]
    fork_owner = args.fork.split('/')[0]
    pr_token = installation_token(args.pr_app_id, args.pr_key, upstream_owner)
    push_token = installation_token(args.push_app_id, args.push_key, fork_owner)

    if args.cleanup:
        cleanup(pr_token, push_token, args.upstream, args.fork)
        return 0

    if ensure_fork(push_token, args.upstream, args.fork):
        report_fork_actions(push_token, args.fork)
        base = push_branch(push_token, args.fork)
        if base:
            open_pr(pr_token, args.upstream, args.fork, base)
            check_no_upstream_write(pr_token, args.upstream, base)

    failed = [name for name, passed in results if passed is False]
    print(f"\n{'All checks passed.' if not failed else 'Failed: ' + '; '.join(failed)}")
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
