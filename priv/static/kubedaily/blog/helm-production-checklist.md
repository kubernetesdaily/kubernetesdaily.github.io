# Helm: production checklist

Helm packages and records releases of Kubernetes resources. A successful install is not proof that an application is healthy, secure, or recoverable. Use this checklist to review the rendered result and the operational plan before changing a release.

## Before you start

You need Helm 3, kubectl, a chart you control, and a disposable cluster for the optional install exercise. Allow 20 minutes. Helm 4 changes some command behavior and flags: check its migration guide rather than assuming this Helm 3 workflow is identical.

```bash
helm version --short
kubectl config current-context
```

Never paste production values or release output into an issue. Values, rendered Secrets and dry-run output can expose credentials; base64 is not encryption.

## Review the inputs

- Pin the chart version and verify its source. Review dependencies and commit the dependency lockfile; use `helm dependency build` to restore locked dependencies.
- Use immutable image digests independently of the chart version. A pinned chart may still reference a mutable image tag.
- Validate values against `values.schema.json` when provided. Schema validation catches types and missing settings, not application correctness.
- Keep secrets out of committed values files. Choose a reviewed secret provisioning integration and account for where Helm stores release data.

## Render before installing

Create a disposable local chart directory with a name that does not already exist:

```bash
helm create kubedaily-review
helm lint ./kubedaily-review
helm template review ./kubedaily-review --namespace kubedaily-helm > rendered.yaml
```

Inspect `rendered.yaml`: image references, Service ports/selectors, resource requests, security context, probes, volumes and any RBAC. A chart's default example settings are not a production recommendation. If you add dependencies, restore them before rendering:

```bash
helm dependency build ./kubedaily-review
```

Rendering locally does not fully exercise cluster-dependent `lookup` behavior or admission. Confirm the supported Kubernetes versions and APIs against the intended cluster.

## Validate and install in isolation

Stop if `kubedaily-helm` exists. The following creates resources and installs the local demo chart:

```bash
kubectl create namespace kubedaily-helm
kubectl apply --dry-run=server -n kubedaily-helm -f rendered.yaml
helm upgrade --install review ./kubedaily-review \
  --namespace kubedaily-helm --atomic --timeout 3m
helm status review --namespace kubedaily-helm
helm test review --namespace kubedaily-helm --logs
```

Server dry-run exercises admission without persisting these rendered objects. It does not prove images can start. Helm 3's `--atomic` waits and attempts rollback on an upgrade failure (or cleanup on an install failure); it cannot undo database writes or external side effects. `helm test` runs hooks supplied by the chart—if there are none, it provides no application test coverage.

## Plan upgrades and rollback

- Inventory CRDs and hooks before an upgrade. Helm treats CRDs specially; installation is not a complete CRD upgrade/deletion strategy.
- Review hooks for permissions, retries, cleanup and irreversible migrations. A failed hook can leave resources behind.
- Test an application request, not only Deployment readiness. Include a failure-path check and a realistic timeout.
- Capture release history and recovery instructions. A release revision rollback is not a data restore.

Read-only inspection for the demo:

```bash
helm history review --namespace kubedaily-helm
kubectl -n kubedaily-helm get deployments,pods,services
```

Before rolling back any real application, decide whether its old binary can read the current data format. Back up and restore-test durable state independently; see the [StatefulSet guide](/blog/statefulsets-guide/).

## Clean up

These commands remove the demo release and its namespace. Inspect hooks, PVC retention and external resources separately; uninstall is not a promise that every side effect disappears.

```bash
helm uninstall review --namespace kubedaily-helm
kubectl delete namespace kubedaily-helm
```

Remove only the local `kubedaily-review` directory and `rendered.yaml` you created when no longer needed.

## Practice checkpoint

Find the image, readiness probe and Service selector in the rendered YAML. Change the chart's replica count, rerender, and review the diff before applying. Explain which failures `helm lint`, server dry-run and a real HTTP check can each detect.

## References

- [Helm chart best practices](https://helm.sh/docs/chart_best_practices/)
- [Helm hooks](https://helm.sh/docs/topics/charts_hooks/)
- [Helm CRD handling](https://helm.sh/docs/chart_best_practices/custom_resource_definitions/)
- [Helm archive lab](/labs/Learn-Helm/)

See `docs/validation/roadmap-guides.md` for versions and commands actually validated.
