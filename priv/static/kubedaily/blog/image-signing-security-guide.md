# Image signing: security guide

A signature can establish who authorized a particular image digest under a chosen trust policy. It does not establish that the image is vulnerability-free, that the signer reviewed the source, or that the cluster will refuse unsigned images.

This guide uses cosign verification without publishing images, requesting signing credentials, or generating private keys.

## Before you start

Allow 15 minutes. Install a supported cosign version using the [official installation instructions](https://docs.sigstore.dev/cosign/system_config/installation/). You need network access and an image whose publisher documents its signature identity and issuer. Verification of private registries may need registry read access; do not paste credentials into commands or guides.

```bash
cosign version
```

The commands below use Bash variables and intentionally reject unset inputs. Populate them from a publisher's independent, trusted documentation, not from a signature whose trust you are trying to establish.

## Define the trust policy first

For keyless signing, the certificate binds an ephemeral signing key to an identity issued through an OIDC provider. Verification needs both the expected identity and expected issuer. Trusting every identity from a large shared issuer is usually too broad.

For example, a CI identity may encode the repository, workflow path and Git ref. A change to any of those can require a policy update. Do not solve an unexpected verification failure by widening the identity pattern to match everyone.

| Check | Why it matters |
| --- | --- |
| Image digest | Binds the decision to immutable content rather than a movable tag |
| Certificate identity | Selects the expected release workflow or person |
| OIDC issuer | Selects the identity provider that vouched for the signer |
| Transparency evidence | Supports auditing and verification under the selected policy |
| Deployment enforcement | Prevents the verified artifact being substituted later |

## Verify a published image

Set `IMAGE_DIGEST` to a full registry reference ending in `@sha256:...`, and set `EXPECTED_IDENTITY` and `EXPECTED_ISSUER` to the publisher's exact documented values. This template will stop rather than silently verify an unspecified target:

```bash
: "${IMAGE_DIGEST:?Set a full publisher image reference pinned by digest}"
: "${EXPECTED_IDENTITY:?Set the exact documented certificate identity}"
: "${EXPECTED_ISSUER:?Set the documented OIDC issuer}"

cosign verify "$IMAGE_DIGEST" \
  --certificate-identity "$EXPECTED_IDENTITY" \
  --certificate-oidc-issuer "$EXPECTED_ISSUER"
```

Expected: successful exit and verified signature payloads. Inspect the digest in the output. Keep normal certificate and transparency verification enabled; do not add bypass flags just to make a release pass. Signature storage and offline bundle requirements vary across cosign versions and registries, so use documentation matching the installed version.

Failure is a stop condition, not automatically proof of compromise. Possible causes include the wrong identity/ref, an unsigned digest, signature availability, registry authentication, network failures or trust-root problems. Investigate each without weakening policy.

## Carry the decision into deployment

Verify the digest that will actually be deployed and record it in the reviewed manifest. Do not verify `image:tag` and later deploy that same mutable tag: it might have moved between verification and use.

For multi-platform images, understand whether the signature covers an OCI index or a platform-specific manifest. Confirm that your admission controller's policy and your delivery workflow agree on what they resolve and verify.

A local CLI success does not configure admission. Roll out a maintained signature-verifying admission policy separately, first in a test environment, with:

- explicit allowed identities and registries;
- tests for valid, unsigned and wrong-identity artifacts;
- an understood failure policy when verification dependencies are unavailable;
- narrowly scoped, audited emergency exceptions with expiration;
- monitoring for rejected deployments and policy changes.

## Signing is a separate privileged step

In CI, use short-lived identity and least-privilege registry permissions. Do not expose signing credentials or privileged publishing workflows to untrusted pull-request code. Pin reviewed action/tool versions and restrict the release workflow to the intended refs and approval process.

For key-based signing, store keys in an appropriate managed key system and plan rotation and revocation. Never commit a private key or a passphrase. This guide intentionally does not generate or upload signing material.

## Practice and limits

Using a publisher's documented signed test artifact, verify the expected identity. Repeat with a deliberately incorrect expected identity; verification must fail. These checks need no changes to the registry or cluster. Save non-secret evidence including tool version, digest, selected identity/issuer, exit status and date.

No resources are created here, so no cleanup is required. This is a verification template, not a claim that any arbitrary public artifact was tested by KubeDaily.

## Next steps and references

- [Image scanning](/blog/image-scanning-security-guide/)
- [GitHub Actions for containers](/blog/github-actions-containers-guide/)
- [Sigstore verification documentation](https://docs.sigstore.dev/cosign/verifying/verify/)
- [Sigstore policy controller](https://docs.sigstore.dev/policy-controller/overview/)

See `docs/validation/roadmap-guides.md` for validation limits. Signature verification and vulnerability scanning answer different questions; use both within a reviewed delivery process.
