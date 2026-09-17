# Maintenance pass: verified scope and remaining work

## Delivered in this branch

- Phoenix 1.7.24 and LiveView 1.2.12, preserving controllers, views and static export.
- NimblePublisher 2.1 and MDEx Native/CommonMark replace retired Earmark throughout application code. Reviewed repository HTML remains enabled; this renderer is not a sanitizer for untrusted submissions.
- Updated compatible HTTP/build dependencies and npm lockfile; added LazyHTML for the current LiveView test API.
- Fixed Helm's missing code boundaries and Docker's mismatched closing fence. Replaced obsolete Hugo/center wrappers in CertManager and Okteto with Markdown links.
- Removed 15 tracked generated Markdown copies and two Finder metadata files. Original source files and hashed image assets remain.
- Added renderer/Helm regression tests and a lightweight catalog fence parity check. The parity check is intentionally a basic guard, not a complete CommonMark validator; semantic rendering assertions cover the known Helm defect.
- Replaced two renderer-whitespace snapshots with structural HTML assertions.

## Local acceptance results

- `mix format --check-formatted`: passed.
- `mix credo`: passed.
- `mix test`: 66 passed.
- `mix assets.deploy`: passed.
- `mix kubedaily.export --output _site`: passed.
- `npm run test:browser --prefix assets`: 5 passed.
- `npm audit --prefix assets`: zero vulnerabilities reported.
- `mix hex.audit`: FAILS, with the three findings below. No exclusions were added.

Local environment: Elixir 1.20 / OTP 29; remote CI still uses Elixir 1.18 / OTP 27. Remote CI must verify this branch before merging. Native Markdown and LazyHTML dependencies also need validation in the Linux CI/container environment.

## Remaining dependency findings

| Dependency | Advisory | Constraint |
| --- | --- | --- |
| cowlib 2.20.0 | EEF-CVE-2026-43966 | Latest stable release at inspection still flagged |
| cowlib 2.20.0 | EEF-CVE-2026-43969 | Latest stable release at inspection still flagged |
| decimal 2.4.1 | EEF-CVE-2026-32686 | AppSignal 2.15.10 requires decimal `~> 2.0`; attempting decimal 3.1 failed resolution |

Do not bypass the constraints with an untested override or describe the audit as clean. Next steps are an upstream cowlib fix and a separately tested AppSignal upgrade/removal decision. GitHub Pages serves static files, not this application's Cowboy server; other Phoenix deployments still need their own risk assessment.

## Track A status

PR #14 was already merged on GitHub when inspected. Its Pages deployment succeeded. Live RSS parsed with 16 items and sitemap with 28 URLs. Main CI had failed Credo; this branch contains the corrected pipeline and a newer Credo compatible with the local Elixir version. Do not claim main CI is green until the new branch checks run.

## Incomplete scope (not claimed as verified)

- New tutorial commands have NOT been run end-to-end. A checksum-verified kind v0.33.0 binary created a disposable cluster successfully; the cluster was deleted without running the tutorial scenarios. Existing kubeconfig was not changed (a dedicated temporary kubeconfig was used).
- Five additional roadmap guides remain to be written/reviewed/cataloged. The architecture draft was moved outside the repository and is not part of this delivery.
- Complete post-deploy route/browser checks and remote CI review remain after merge.
- No CI toolchain bump was made: 1.18 remains compatible with the declared Elixir minimum of 1.16.
