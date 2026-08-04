# elevaite365 Help Centre

MkDocs (Material) self-help wiki for elevaite365, the no-code test automation tool for Microsoft Dynamics 365.

Content is ported from the previous Frappe wiki at `elevaite365.s.frappe.cloud/wiki`.

## Run it locally

```bash
source .venv/bin/activate && mkdocs serve
```

Then open <http://127.0.0.1:8000>. Edits to `docs/` reload live.

Fresh machine:

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
```

## Two projects, one site

This repo builds two MkDocs projects into a single published site:

| Project | Config | Publishes to |
| --- | --- | --- |
| Help Centre | `mkdocs.yml` | `/Wiki/` |
| Agreements | `agreements/mkdocs.yml` | `/Wiki/agreements/` |

Agreements is separate so it has its own sidebar rather than appearing in the Help Centre nav. The two are only linked by ordinary hyperlinks.

Brand assets have one source of truth in `docs/assets/`. `build.sh` copies `brand.css`, `logo.png` and `navbg.png` into `agreements/docs/assets/` at build time, and that copy is gitignored. Edit the originals, never the copies.

## Build

```bash
./build.sh
```

Builds both projects into `site/`, which is untracked. `strict: true` is set in both configs, so broken internal links and anchors fail the build locally and in CI.

Previewing one project at a time:

```bash
.venv/bin/mkdocs serve
```

```bash
./serve-agreements.sh
```

The second runs on port 8001.

Cross-project links are written as raw HTML with relative paths (`agreements/` and `../`) rather than Markdown links. MkDocs validates Markdown links against the current project's files and would reject a path belonging to the other project; raw HTML is left alone. Relative paths also keep the links correct whatever base path the site is published at.

Because the two projects build separately, a link from one into the other is not checked by either build. If you rename an agreement page, update the Help Centre links by hand.

## Deploying

Hosted on GitHub Pages, built by [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Every push to `main` builds the site and publishes it. No `gh-pages` branch and no committed `site/` directory: the workflow uploads the build as a Pages artifact.

**Required repository setting.** Go to **Settings > Pages > Build and deployment** and set **Source** to **GitHub Actions**. If it is left on *Deploy from a branch*, GitHub runs Jekyll over the repository root and publishes a rendered `README.md` instead of the built site.

The site publishes to <https://elevaite365-mike.github.io/Wiki/>.

### Moving to a custom domain

1. Add a DNS `CNAME` record for the domain pointing at `elevaite365-mike.github.io`.
2. Create `docs/CNAME` containing just the hostname, for example `help.elevaite365.com`. MkDocs copies it into the build output.
3. Set `site_url` in `mkdocs.yml` to the same address, so canonical URLs and the sitemap match.
4. In **Settings > Pages**, set the custom domain and tick **Enforce HTTPS** once the certificate is issued.

Page links are relative, so nothing else needs to change.

Dependencies are pinned in `requirements.txt` so a CI build matches your local one. Bump them deliberately, not by accident.

## Structure

```text
mkdocs.yml              site config + nav (add every new page here)
docs/
  index.md              landing page
  quickstart/           introduction → team → apps → environments → users → components → scenarios
  tests/                creating test scripts, using the recorder
  commands/             full command reference, grouped by category
  help/                 tips & best practices, video library, glossary, support
  assets/
    logo.png            wordmark, pulled from the roadmap site
    brand.css           the entire theme
    img/                screenshots ported from the old wiki
```

### Commands are grouped, not one page each

The old wiki had one page per command, most of them a few lines. Here they're grouped by category (`mouse-keyboard`, `entering-data`, `verification`, …) with an anchor per command, and `commands/index.md` carries a full A-to-Z table linking to each anchor. Search still finds individual commands by name.

The four repeated Advanced options, click position, click count, force, timeout, are documented once on `commands/index.md` and linked from each command instead of being restated a dozen times.

## Theme

Brand tokens are sampled from [roadmap.elevaite365.com](https://roadmap.elevaite365.com/) and live at the top of `docs/assets/brand.css`:

| Token | Value | Used for |
| --- | --- | --- |
| Brand orange | `#FF613C` | Header, buttons, fills, accents |
| Orange deep | `#D8431C` | Body links, active nav, hovers |
| Paper | `#F2F1ED` | Page background |
| Ink | `#2F2E3E` | Body text |
| Heading | `#18181B` | Headings |
| Typeface | Inter | |
| Radius | 8px | |

Single light scheme (`elevaite`), no dark mode. Change a colour in one place, the `:root` block, and it propagates.

`orange-deep` is the brand orange darkened to the same hue. Small text in `#FF613C` on the paper background sits at about 2.5:1 contrast, below the WCAG AA minimum of 4.5:1, so links and active nav use the deeper shade while everything large or filled uses the brand orange itself.

## Writing conventions

- One page = one job. If a page needs two nav entries to describe it, split it.
- Lead with the task, not the feature.
- Every new page gets a `nav:` entry in `mkdocs.yml`, otherwise `--strict` fails the build.
- Cross-link with relative paths (`../commands/loop.md`) so `--strict` can validate them.

## Content status

All 43 pages of the old wiki have been ported. Two things need your attention before publishing:

**Missing screenshots.** Twelve images on the old wiki live under `/private/files/` and return 403 to anyone not logged in, they are broken on the old wiki too. Their places are marked with `<!-- TODO screenshot: ... -->` comments in the Markdown. Re-export and drop them into `docs/assets/img/`. Affected pages: `tests/test-recorder.md` (4), `quickstart/create-scenarios.md` (5), `commands/entering-data.md` (2), `commands/d365-finance-operations.md` (1). The five public images did port and are in place.

**A duplicated source page.** `/wiki/toggle-checkbox`, listed under D365 Finance & Operations, contained a verbatim copy of the Expand Or Collapse Section page, so there is no F&O Toggle Checkbox content to port. The Business Central `Toggle Checkbox (BC)` page exists and is ported; note its body described F&O rather than BC, and has been written up under Business Central to match where it sits in the old sidebar. Worth confirming.

Copy has been lightly edited for typos and consistency; the substance is unchanged.

## Videos

Twelve demo videos from the three unlisted YouTube playlists are embedded in the articles they document, using privacy-mode (`youtube-nocookie.com`) lazy-loaded iframes. `help/videos.md` is the index, every video, the article it maps to, and links to the source playlists.

Two videos have no article to sit in:

- **Dialog/Alert Command**: there is no Dialog/Alert command page; the old wiki never documented one
- **AI Self Repair**: the feature isn't documented anywhere in the ported content

Both are listed in the video library marked *Not yet documented*. Write those two pages and the marker can go.
