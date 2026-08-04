# Project instructions

## Writing rules

These apply to every page in `docs/`, to this file, to the README, and to commit messages.

**Never use em dashes.** Not in prose, not in tables, not in headings. Use a comma, a colon, parentheses, or a full stop, or split the sentence. Before finishing any writing task, check the changed files:

```bash
grep -rn "$(printf '\u2014')" docs README.md CLAUDE.md
```

That command must return nothing. It builds the character with `printf` so this file does not contain one itself.

**Write in a human voice.** The published wiki should not read as machine written. Avoid the usual tells:

- "It's not just X, it's Y" constructions
- Three-item lists used for rhythm rather than because there are three things
- Stacked hedges ("generally, in most cases, it may")
- Closing sentences that restate the section you just wrote
- Enthusiasm the reader did not ask for ("Great news!", "Let's dive in!")

Prefer short declarative sentences, concrete nouns and plain verbs. Vary sentence length. When a clause is not earning its place, cut it rather than smoothing it.

## Docs conventions

- One page, one job. If a page needs two nav entries to describe it, split it.
- Lead with the task, not the feature.
- Every new page needs a `nav:` entry in `mkdocs.yml`, or the strict build fails.
- Cross-link with relative paths (`../commands/loop.md`) so the strict build can validate them, including `#anchors`.
- Do not document behaviour you have not confirmed. If a detail is unknown, leave a `<!-- TODO -->` and say so, rather than inventing a plausible value.

## Build

```bash
./build.sh
```

Builds the Help Centre (`mkdocs.yml`) and the Agreements sub-site (`agreements/mkdocs.yml`) into `site/`. Must pass with no warnings before any change is considered done.

Agreements is a separate project so it gets its own sidebar. Its pages live in `agreements/docs/`, not `docs/`. Links between the two projects are absolute and include the `/Wiki/` base path.
