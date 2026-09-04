# KubeDaily

[![Continuous Integration](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/pages.yml)

Practical, community-led learning for the **container and cloud-native ecosystem**.

🌐 [kubedaily.com](https://kubedaily.com) · 🧰 [Tool directory](https://kubedaily.com/tools/) · 🧪 [Hands-on labs](https://kubedaily.com/labs/) · 🗺️ [Content roadmap](https://kubedaily.com/roadmap/)

## What you’ll find

| Area | What it covers |
| --- | --- |
| Labs | Docker, containerd, Helm, Kubernetes, and practical operating workflows. |
| Blog | Field guides for containers, delivery, security, platform engineering, and operations. |
| Tools | A searchable directory of container and cloud-native projects, including GitHub star badges where available. |
| Roadmap | 1,000 planned container-ecosystem blog and lab titles across eight focused tracks. |

## Run locally

Requirements: Elixir/Erlang, Node.js, and npm.

```sh
mix setup
mix phx.server
```

Open [http://localhost:4000](http://localhost:4000).

## Build the GitHub Pages site

The live site is exported as static HTML for GitHub Pages.

```sh
mix assets.deploy
mix kubedaily.export --output _site
python3 -m http.server 4173 --directory _site
```

Then visit `http://localhost:4173`.

## Content map

| Content | Location |
| --- | --- |
| Blog posts | `priv/static/kubedaily/blog/` |
| Blog metadata | `priv/static/kubedaily/data/blog.json` |
| Labs | `priv/static/kubedaily/labs/` |
| Lab metadata | `priv/static/kubedaily/data/labs.json` |
| Tool directory | `priv/static/kubedaily/entries.js` |
| Public roadmap | `lib/school_house/kube_daily.ex` |

## Contribute

Contributions are welcome—from a corrected command to a complete lab or field guide. Start with [CONTRIBUTING.md](CONTRIBUTING.md), then open an issue or pull request with a focused, reproducible change.

```sh
mix format --check-formatted
mix assets.deploy
mix kubedaily.export --output _site
mix test
```

## Deployment

The GitHub Pages workflow builds the assets, exports `_site`, and deploys the result when changes reach `main`.
