# Container Image Scanning: A Practical Security Guide

Scanning answers a narrow but vital question: which *known* vulnerabilities ship inside this image? It does not make an image safe — it tells you where known risk lives so you can decide what to fix first. This guide covers how scanning fits into a realistic workflow, what scanners can and cannot see, and how to stop triaging the same findings forever.

## What a scanner actually checks

Most scanners (Trivy, Grype, and similar tools) compare the packages and libraries in your image layers against public vulnerability databases:

- **OS packages** from the base image: `apt`, `apk`, `yum` packages.
- **Language dependencies**: npm, pip, Go modules, and friends from your build.
- **Secrets** accidentally baked into layers — credentials in a `COPY` step are a classic.
- Some tools also flag misconfigurations in Dockerfiles and IaC.

What scanners cannot see: unknown vulnerabilities, business-logic flaws, whether your application actually *uses* the vulnerable code path, or whether the image is configured safely at runtime. Treat results as a prioritized inventory, not a verdict.

## Scan before push, and again on a schedule

The cheapest place to fail a build is CI, before anything is published:

```bash
# Scan a locally built image; fail the build on high severity findings
trivy image --exit-code 1 --severity HIGH,CRITICAL kubedaily-hello:local
```

The exit code makes the gate real: `--exit-code 1` turns findings into a failed CI step. Start with a report-only mode to learn your baseline, then tighten.

Scanning at build time is not enough on its own. New vulnerabilities are disclosed *after* you ship, so images need periodic rescans for as long as they run. A registry or admission-time scan (for example, blocking deployment of images with critical findings) closes that loop. Scheduled rebuilds of base images are what actually fix the underlying packages.

## Reading results without drowning

```bash
# One image, compact view
trivy image --severity HIGH,CRITICAL kubedaily-hello:local
```

Three habits keep triage sane:

1. **Fix the base first.** Most findings in a typical image come from the base image's OS packages. Moving to a smaller, more current base (or a distroless variant) removes entire classes of findings at once.
2. **Deduplicate by source.** The same CVE often appears via several dependency paths. Fix the dependency that pulls it in, not each report line.
3. **Accept findings explicitly, with an expiry.** Some vulnerabilities are unreachable in your application. Record the waiver, the reason, and a review date — silently ignoring findings is how the same CVE survives three quarters.

## Make it part of the pipeline

A durable workflow looks like this:

- Build → scan → **fail on new criticals**, so existing debt does not block delivery but no new risk slips in.
- Publish an SBOM alongside the image (for example with `syft`), so "what was in version X?" is a query, not an archaeology project.
- Rescan images in registries on a schedule; alert on new criticals in images that are still deployed.
- Track *mean time to fix* for criticals as a team metric. Vulnerability management is a habit, not a tool.

## What scanning does not do

A clean scan is not a clean bill of health. It says nothing about your application code, your runtime controls, or whether the image should run as root with full network access. Combine scanning with the practices in the [image build guide](/blog/docker-image-build-guide/): minimal bases, non-root users, and no secrets in layers.

## Practice

Build the small image from the [Docker build guide](/blog/docker-image-build-guide/), scan it, and identify the single highest-severity finding. Rebuild with a newer base image and compare. Note what changed, what did not, and which findings (if any) you would waive — and write the waiver text as if a teammate had to act on it.

## Take away

Scan early to block new risk, rescan continuously to catch new disclosures, fix bases before chasing per-package findings, and make every accepted risk explicit and expiring.

Further reading: [Trivy documentation](https://trivy.dev/), [Syft SBOM generator](https://github.com/anchore/syft), [NIST vulnerability database](https://nvd.nist.gov/).
