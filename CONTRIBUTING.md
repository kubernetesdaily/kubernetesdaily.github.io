# KubeDaily content guide

How to write, edit, and publish container and Kubernetes content on KubeDaily. Follow this and your guide, lab, or fix will read consistently and pass review quickly.

## Content types at a glance

| Type | URL | Metadata | Best for |
| --- | --- | --- | --- |
| **Blog guide** | `/blog/<id>/` | `priv/static/kubedaily/data/blog.json` | Explaining a concept, decision, or practice |
| **Lab** | `/labs/<id>/` | `priv/static/kubedaily/data/labs.json` | Step-by-step hands-on practice |
| **Tool entry** | `/tools/` | `priv/static/kubedaily/entries.js` | Pointing readers at a maintained project |
| **Threat Model & Security** | `/threat-model` | `priv/static/kubedaily/js/threat-model-data.js` | Adding attack vectors, multi-engine policies, or runbooks |

## Adding or editing a blog guide

1. Create `priv/static/kubedaily/blog/<your-id>.md` (lowercase, hyphens, ASCII).
2. Add a JSON entry to the `blogs` array in `data/blog.json`:

```json
{
  "id": "my-kubernetes-guide",
  "title": "Kubernetes Rolling Updates: A Practical Guide",
  "date": "March 3, 2025",
  "excerpt": "One sentence that would make a reader click and tells search engines what to expect.",
  "author": "Your Name",
  "file": "/blog/my-kubernetes-guide.md",
  "category": "Kubernetes",
  "tags": ["kubernetes", "deployments", "reliability"]
}
```

3. Start from [`docs/templates/guide.md`](docs/templates/guide.md) or [`docs/templates/lab.md`](docs/templates/lab.md). Use the actual publication date, not the example above. Write the Markdown (structure below), then verify:

```sh
mix format --check-formatted
mix test
mix assets.deploy && mix kubedaily.export --output _site
```

Your guide appears at `/blog/<id>/` and is added to the sitemap automatically. **The `id` must match the filename and stay stable** — it becomes the public URL; changing it breaks links.

## Adding or editing a lab

Labs are Markdown files in `priv/static/kubedaily/labs/` plus an entry in `data/labs.json` with `id`, `title`, `description`, `category`, `path`, `contributors`, and `tags`. Every lab must include a **Before you start** section (prerequisites, safe environment), a **Practice** section with concrete exercises, and a **Clean up** section if it creates resources.

## Contributing to Threat Model & Security Architecture

The Threat Model & Security Studio (`/threat-model`) combines interactive Draw.io vector architecture, multi-engine admission policies, a hardening scorecard, MITRE ATT&CK matrix, KinD attack playbooks, and emergency runbooks:

1. **Draw.io Diagram Sources**:
   - Source files are in `priv/static/kubedaily/threat-model/` and `priv/static/kubedaily/diagrams/`.
   - After editing in Draw.io, compile to optimized interactive SVGs using `mix kubedaily.drawio` or `node scripts/compile_drawio.js`.
2. **Policy-as-Code Data (`priv/static/kubedaily/js/threat-model-data.js`)**:
   - Every scenario and defense control must include 3 engines: **Kyverno v1**, **In-Tree CEL** (`ValidatingAdmissionPolicy` [K8s 1.30+ GA]), and **OPA Gatekeeper** (Rego).
   - Follow the schema for `attackScenarios`, `defenseControls`, `KUBEDAILY_SCORECARD_DATA`, `KUBEDAILY_MITRE_MATRIX`, `KUBEDAILY_ATTACK_PLAYBOOKS`, and `KUBEDAILY_INCIDENT_RUNBOOKS`.
3. **Brand Integrity**: All diagrams, policies, and documentation must carry **100% KubeDaily branding**. Never reference or link third-party diagram clones or forks.

## Markdown conventions

These render reliably on the site today:

- `#` title, then `##` sections. Use `##` for major sections and `###` for subsections — the lab page outline and copy buttons are built from headings and code blocks.
- Fenced code blocks with a language tag: ` ```bash `, ` ```yaml `, ` ```json `. Always prefer them over indented code.
- Tables, links, bold, and lists are supported.
- Images: place files in `priv/static/kubedaily/blog/` and reference with an absolute path (`![caption](/kubedaily/blog/image.png)`).

Do **not** use raw HTML, inline `style`, or `<script>`: content is rendered server-side and published as-is to all visitors. If you need a capability the renderer lacks, open an issue first.

## Writing standards (also what reviewers look for)

- **Teach the "why", not only the "how".** Every guide should answer *why* this approach, not just *which commands*.
- **Be honest about limits.** Say what a technique does not solve. If something is only correct in some environments, say where.
- **Commands must be safe to paste.** Prefix shell sessions without the prompt (`$` or `➜`), use comments to explain flags, and never include real cluster names, tokens, or customer data. Distinguish destructive commands clearly.
- **Link to official docs** for version-sensitive behavior instead of duplicating it: `https://kubernetes.io/docs/...`.
- **Version honesty:** if a command depends on a version, say which, or write it so it works broadly.
- **No secrets, ever:** no tokens, internal hostnames, production endpoints, or customer data in text, logs, or screenshots. Review every code block before submitting.

## SEO: writing for readers and search engines

Search engines read the same things readers do. Getting these right helps both:

- **Title** states the topic and the outcome: *"Kubernetes Health Checks: Liveness, Readiness, and Startup Probes"*. Avoid clickbait and vague titles like *"Kubernetes tips you need"*.
- **Excerpt** (the `excerpt` field) is the meta description. One or two sentences, up to ~160 characters, containing the words a practitioner would search for. This text appears in search results and link previews.
- **The first paragraph** should confirm the reader is in the right place and preview what they'll be able to do.
- **Headings** are the page outline: use descriptive `##` sections (`## What requests and limits control`, not `## Details`). The lab reader builds an on-page outline from them.
- **Tags** use real practitioner terms (e.g. `OOMKilled`, `NetworkPolicy`) — they are displayed as topic labels. There are no dedicated tag pages.
- **Internal links:** link to related KubeDaily labs and guides with absolute paths (`/labs/Learn-k8s/`) so navigation stays correct on GitHub Pages.
- **One page, one intent.** If a guide covers two big topics, it's two guides. Each gets its own URL, title, and excerpt.

Pre-merge self-check: `grep '<title>\|name="description"\|<h1>' _site/blog/<your-id>/index.html` — title and description should match your catalog entry.

## Reviewing and improving existing content

Found an outdated command or a broken link? Small fixes are the most valuable contributions:

1. Edit the Markdown file directly (on GitHub via the pencil icon, or locally).
2. Keep the change scoped — one fix per pull request when practical.
3. In the PR description, say what was wrong and how you verified the fix.

For larger rewrites, open an issue first with the problem you're solving.

## Local verification checklist

```sh
mix format --check-formatted                 # Elixir formatting
python3 scripts/check_all_fences.py          # balanced markdown code fences
node -c priv/static/kubedaily/js/threat-model-data.js # JavaScript syntax
git diff --check                             # whitespace and formatting hygiene
mix test                                     # full test suite (67+ tests)
mix assets.deploy                            # build CSS/JS assets
mix kubedaily.export --output _site          # verify the static export succeeds
```

The export fails on any non-200 page or missing catalog Markdown file. New Markdown and catalog files are visible to Git; generated digest and gzip files remain ignored. Then serve and click through your page:

```sh
python3 -m http.server 4180 --bind 127.0.0.1 --directory _site
# open http://127.0.0.1:4180/blog/<your-id>/
```

## Publishing

Merge to `main` triggers the GitHub Pages workflow: build, export, deploy to kubedaily.com. Content changes are live a few minutes after CI completes.

## Code of conduct and licensing

Be constructive and precise. Contributions are made under the repository's existing license; by submitting a pull request you agree your contribution may be distributed under it.

Thank you for improving container and Kubernetes learning for everyone.
