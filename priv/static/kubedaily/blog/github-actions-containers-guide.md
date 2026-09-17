# GitHub Actions for Container Projects: A Beginner's Guide

A container project needs the same three pipeline jobs whether it is a weekend tool or a platform service: build the image, prove it works, and publish it in a way people can trust. This guide walks through a minimal, honest GitHub Actions workflow for exactly that — using this site's own practices as the example.

## The workflow at a glance

```yaml
name: container-ci
on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  build-test-publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - name: Build (no push) on PRs
        uses: docker/build-push-action@v6
        with:
          context: .
          load: true
          tags: kubedaily-hello:ci

      - name: Scan the image
        uses: aquasecurity/trivy-action@0.28.0
        with:
          image-ref: kubedaily-hello:ci
          severity: HIGH,CRITICAL
          exit-code: "1"

      - name: Publish on main
        if: github.ref == 'refs/heads/main'
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Read it as three stages: **build** (every commit), **scan** (fail the build on new criticals, as in the [image scanning guide](/blog/image-scanning-security-guide/)), **publish** (only from `main`). PRs get a loaded local image, never a push.

## Why each piece is there

**Least privilege, twice.** The top-level `permissions: contents: read` blocks unnecessary tokens for all jobs; the job re-grants only `packages: write` because it pushes to GHCR. Pipelines are part of your supply chain — a workflow with blanket permissions is an easy target.

**`load: true` instead of pushing on PRs.** Pull requests build the image locally into the job (`load: true`), so the scan step examines the real artifact while nothing unreviewed leaves the machine. Only merged code publishes.

**BuildKit cache.** `cache-from/cache-to: type=gha` stores layers in the Actions cache. Dependency layers change rarely; source layers rebuild fast. This is the single biggest speed win for container CI.

**A mutable `latest` for convenience, digests for truth.** The example publishes `:latest` for people who want to pull the current build. Anything consuming images in production should pin digests, per the [Deployments checklist](/blog/pods-deployments-checklist/).

## Version-pin deliberately, update automatically

Actions are pinned by tag here (`@v4`, `@v6`) because tags are readable. Tags are mutable, though — for defense in depth, pin third-party actions to commit SHAs and let Dependabot keep them current:

```yaml
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

Dependabot config (`.github/dependabot.yml`) with both `github-actions` and `docker` ecosystems keeps the workflow and the images moving together.

## Secrets: in and out

Pass registry credentials only as secrets: `${{ secrets.GITHUB_TOKEN }}` for GHCR needs no setup; third-party registries use repository or environment secrets. Never echo secrets into logs or bake them into images — build-time `ARG` values survive in image history. Multi-stage builds that copy only artifacts are one layer of protection; scanning for secrets (as Trivy does) is another.

## First run: what to look at

```text
# In the Actions tab:
# 1. Build step — image builds from the Dockerfile
# 2. Trivy step — findings list, or a green pass
# 3. Publish — only on main
```

Common first failures: wrong `context` (Dockerfile not where the workflow expects), missing `packages: write` (403 on push), and scanner failures that are actually pre-existing base-image findings. For the third case, start in report-only mode (`exit-code: "0"`) and tighten after you know the baseline.

## Practice

Put the workflow above on a small container project of yours. Break it three times on purpose: a failing scan (ship a known-vulnerable old base), a missing permission, and a bad tag. Read each error message before fixing it — CI literacy is mostly error-message literacy.

## Take away

Build on every commit, scan what you built, publish only what you trust, and grant the pipeline the least power it needs. Everything else — matrices, environments, deployments — layers on top of these three jobs.

Further reading: [Docker build-push-action](https://github.com/docker/build-push-action), [Trivy GitHub Action](https://github.com/aquasecurity/trivy-action), [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions).
