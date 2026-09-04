# Contributing to KubeDaily

KubeDaily is built in public for people learning and operating the container ecosystem. We welcome improvements to guides, labs, tool listings, and the site itself.

## Good contributions

- Fix an unclear command, outdated link, typo, or broken example.
- Propose a hands-on lab for containers, containerd, Docker, Kubernetes, delivery, security, networking, observability, or platform operations.
- Write a practical blog guide based on a real problem and a reproducible solution.
- Add or improve a maintained container or cloud-native tool in the directory.

## Before opening a pull request

1. Search existing issues and pull requests to avoid duplicate work.
2. Keep the scope focused and explain why the change helps a reader.
3. Use official documentation as the source for version-sensitive commands.
4. Never include secrets, personal credentials, production endpoints, or private customer data.

## Content locations

| Content | Location |
| --- | --- |
| Blog posts | `priv/static/kubedaily/blog/` |
| Blog metadata | `priv/static/kubedaily/data/blog.json` |
| Labs | `priv/static/kubedaily/labs/` |
| Lab metadata | `priv/static/kubedaily/data/labs.json` |
| Tool directory | `priv/static/kubedaily/entries.js` |
| Public roadmap | `lib/school_house/kube_daily.ex` |

## Check your work

```sh
mix format --check-formatted
mix assets.deploy
mix kubedaily.export --output _site
mix test
```

Open an issue first if you want feedback on a large new lab, guide series, or structural change. Thank you for helping make container learning clearer and more practical.
