# Container content, discovery, and SEO improvements

Branch: `improve-discovery-and-learning`. Preserve Phoenix, existing content URLs, kubedaily.com, and the GitHub Pages exporter. Nothing pushed or deployed.

## Content and contribution

- Removed the mistakenly added Elixir learning collection, routes, navigation, and promotional section. The underlying Phoenix implementation remains unchanged in technology.
- Added guides on Docker multi-stage image builds, Kubernetes resource requests/limits, and health probes, plus a kubectl create–diagnose–repair–cleanup lab.
- Added roadmap-sourced guides: the Pods and Deployments production checklist, an image scanning security guide, and a GitHub Actions container CI beginner's guide. The blog catalog now holds 16 articles and the guides cross-link to labs and each other.
- Added article heading anchors and outlines, suppressed duplicate leading Markdown H1 titles, and provided GitHub edit/contribution links on labs and articles.
- Rewrote CONTRIBUTING.md with catalog examples, Markdown conventions, publishing steps, and review guidance. Added guide/lab templates and a pull-request checklist.
- Updated ignore rules so new Markdown/catalog sources are visible to Git, while new digest/gzip artifacts remain ignored.
- Missing catalog Markdown now fails the export instead of silently publishing only the description.

## Look and readability

- Blog and labs listing pages share a calm header, a working client-side search, live result counts, empty states, and a no-JavaScript fallback. Cards link with trailing-slash URLs and h3 headings for a cleaner outline.
- Reading pages use a shared measure, taller line height, and inline-styled links. Tables of contents are collapsible and count their sections. Labs and articles end with next-step navigation and a back-to-top link.
- A persistent reading-width toggle (standard/wide) widens prose to ~88ch, uncaps the reading shell, and lets code blocks and tables extend beyond the text column; verified with computed layout values on article and lab pages.
- On phones the article body comes first; metadata and outline follow. Heroes are more compact on small screens.
- Earlier improvements retained: Docker CTA, learning-path cards, home tool search, persistent directory input focus, filtering/sorting, shareable URLs, pagination, skip navigation, active nav, and copy-code buttons.

## SEO and discovery

- Canonical and sitemap URLs use GitHub Pages directory-style trailing slashes.
- Article structured data now parses legacy human-readable dates as well as ISO dates, preserving publication years.
- RSS is generated from the current blog catalog on each export; no undefined titles, doubled blog paths, or removed entries. The legacy feed location is preserved as a copy; the head advertises `/rss.xml`.
- Shared route inventory keeps the exporter and sitemap aligned.
- Earlier improvements retained: Docker CTA, learning-path cards, home tool search, persistent directory input focus, filtering/sorting, shareable URLs, pagination, skip navigation, active nav, and copy-code buttons.

## Verify locally

```sh
mix deps.get
npm ci --prefix assets
mix format --check-formatted
mix test
mix assets.deploy
mix kubedaily.export --output _site
python3 -m http.server 4180 --bind 127.0.0.1 --directory _site
```

In another terminal: `npm run test:browser --prefix assets`.
Browser tests use Google Chrome; alternatively install Playwright Chromium and set `PLAYWRIGHT_CHANNEL=chromium`. Override `SITE_URL` for a different preview.

Content tests check catalog sources, dates, routes, missing-file failures, Markdown outlines, and repeatable RSS generation. Browser tests check discovery and clipboard behavior plus article metadata, edit links, mobile width, sitemap and feed output.

The Docker/Kubernetes commands in the new articles have been reviewed, but have not been executed against a container daemon or cluster in this session. Review and test them in disposable environments before publishing. External references have not been exhaustively link-checked.

## Verification results

- 63 ExUnit tests passed; 5 Playwright browser tests passed.
- Formatter, asset build, static export, and whitespace checks passed.
- Parsed exported XML: all 16 RSS article links and 28 sitemap URLs resolve to exported pages; no removed collection navigation remains.
- New articles each render one H1, publication structured data, canonical URLs, working outlines, and GitHub edit links. Mobile article overflow found by the test was fixed.
- Listing search, counts, and empty states verified in the browser on desktop and mobile; before/after screenshots reviewed for the readability pass. Wide-reading mode verified by clicking the toggle and comparing computed prose/code widths on both reader types, including persistence across reloads.
- Rendering the older archive still emits a missing `</center>` warning and two unclosed-fence diagnostics. These inherited Markdown issues need a dedicated content cleanup; passing tests do not mean the legacy archive is lint-clean.

## Before publishing

Review `git diff`, commit source changes, and open a pull request. Do not commit `_site`, test results, or incidental compressed/digested asset churn. The Pages workflow deploys on merge to main. Local verification uses Elixir 1.20 / OTP 29; repository CI pins Elixir 1.18 / OTP 27 and has not run remotely.

## Follow-up maintenance

Inherited Hex and npm advisories and the retired Earmark renderer remain a separate tested maintenance task. Do not expose a development server publicly or accept unreviewed Markdown: the current renderer publishes repository-authored HTML, not sanitized arbitrary user input.

The repository already tracks some generated digest/gzip assets. Future source/generated separation will make reviews smaller. Always build/export before serving, rather than serving stale precompressed files from a source checkout.

## Publishing state

Pushed to `origin/improve-discovery-and-learning` as commit `297c386` (working tree clean except `_site`/test artifacts, which are ignored). Open the pull request at:

https://github.com/kubernetesdaily/kubernetesdaily.github.io/pull/new/improve-discovery-and-learning

The tracked `priv/static/kubedaily/.DS_Store` was removed from the index and `.DS_Store` is now ignored. The `gh` CLI is not installed locally, so the pull request itself is one click away at the link above.
