# Contributing to ChooseTheFuture

Thanks for your interest. ChooseTheFuture is early, so the most useful contributions right now are corrections, clearer wording, and well-argued questions about the plans.

## Ways to help

- **Suggest a project** for the directory with the [nomination form](https://github.com/dissentingd/choosethefuture/issues/new?template=project-nomination.yml).
- **Report a problem** with a listing or page, using the [reporting process](docs/REPORTING.md).
- **Question a decision.** Open an issue that names the decision in [`docs/DECISIONS.md`](docs/DECISIONS.md) and says what you'd change and why.
- **Improve the site or documentation** with a pull request.

## AI-assisted contributions

Read [`AI-TRAINING.md`](AI-TRAINING.md) before using AI coding tools or agents on this repository. In short:

- AI-assisted development is welcome through the ChooseTheFuture Connector, once it exists.
- Any other AI-assisted development needs prior written permission. Ask with the [permission request form](https://github.com/dissentingd/choosethefuture/issues/new?template=ai-development-permission.yml).
- Say in your pull request if AI tools helped, and name your permission if you used one.

Don't submit AI-generated work you haven't read and can't explain. A person is responsible for every pull request opened outside the ChooseTheFuture system.

## Making a change

1. For anything larger than a small fix, open an issue first so we can agree on the approach.
2. Keep each pull request focused on one change.
3. Read [`docs/DECISIONS.md`](docs/DECISIONS.md) and [`AGENTS.md`](AGENTS.md). If your change contradicts a recorded decision, propose changing the decision rather than working around it.
4. State what you checked. Only claim checks you actually ran.

### Previewing the site

The site is plain HTML, CSS, and JavaScript in [`site/`](site/), with no build step. Serve it locally, then open <http://localhost:8765>:

```bash
python -m http.server 8765 --directory site
```

Project listings live in [`site/data/projects.json`](site/data/projects.json). Please check your change at phone and desktop widths, and with a keyboard. Pushes to `main` deploy to GitHub Pages automatically.

The repository has no automated tests or linter yet.

## Licensing your contribution

ChooseTheFuture is source-available under noncommercial licenses; see the [README](README.md#license). By submitting a contribution, you confirm that:

1. You wrote it, or otherwise have the right to submit it, and you've identified any third-party material and its license.
2. You license it under the same terms as the part of the repository it belongs to: [PolyForm Noncommercial 1.0.0](LICENSE) for source code and [CC BY-NC 4.0](LICENSE-CONTENT) for everything else.
3. You also grant David Borowski II a perpetual, worldwide, royalty-free, non-exclusive license to use your contribution and to license it to others, including for the commercial uses and AI training that [`AI-TRAINING.md`](AI-TRAINING.md) says may be permitted in writing.

The third point exists so that a written permission can cover the whole repository, rather than only the parts one person wrote. You keep the copyright in your contribution.

## Conduct

Be respectful and assume good faith. Maintainers may edit, close, or remove anything that is abusive, off-topic, or spam, using the [reporting process](docs/REPORTING.md).

## Security

Please don't report security problems in public issues. See [`SECURITY.md`](SECURITY.md).
