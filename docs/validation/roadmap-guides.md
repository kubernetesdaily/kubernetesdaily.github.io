# Five roadmap guides: validation scope

Published source/catalog IDs:

- `kubernetes-architecture-guide`
- `statefulsets-guide`
- `networkpolicy-security-guide`
- `helm-production-checklist`
- `image-signing-security-guide`

## Repeatable publication checks

Run from the repository root:

```bash
mix format --check-formatted
mix credo
mix test
mix assets.deploy
mix kubedaily.export --output _site
python3 scripts/check-roadmap-guides.py
```

The Python check verifies the five catalog entries, blog listing links, one H1 and canonical per exported page, internal links/anchors, RSS membership, and all sitemap paths. It does not run commands copied from tutorials, contact a registry, or prove NetworkPolicy enforcement.

Browser checks use the exported site served locally and `npm run test:browser --prefix assets`.

## Tutorial limits

These guides explicitly separate disposable exercises from production advice. NetworkPolicy requires a supporting CNI; API acceptance alone is not enforcement. The signing guide is a fail-closed verification template requiring publisher-specific identity/issuer/digest inputs, not a preconfigured signed artifact. No signing keys, registry publication or authentication workflow was exercised. Helm examples target Helm 3, not Helm 4.

Do not treat publication checks as end-to-end tutorial validation. Hands-on results, when available, are recorded separately. Resource-creating exercises require context checks, unique namespaces and cleanup; none are intended for a production cluster.
