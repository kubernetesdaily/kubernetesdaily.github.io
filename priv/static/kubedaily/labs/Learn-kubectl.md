# kubectl Essentials for Daily Operations

Learn to inspect a Deployment, diagnose an image-pull failure, fix it, and remove your practice resources. The order matters: `get` shows state, `describe` explains cluster decisions, and `logs` shows application output.

## Before you start

Use a disposable local cluster such as [kind](https://kind.sigs.k8s.io/) or [minikube](https://minikube.sigs.k8s.io/), with kubectl installed. Allow about 20 minutes. You need permission to create a namespace and workloads. Downloads require internet access.

Check your context before creating anything:

```bash
kubectl config current-context
kubectl version
kubectl get nodes
```

Stop if the context is production or unfamiliar. Commands below change only the named practice namespace, except the initial context and node inspection. If `kubedaily-practice` already exists, choose a different name throughout; never reuse someone else's namespace.

## Create an isolated workload

These commands create resources:

```bash
kubectl create namespace kubedaily-practice
kubectl create deployment web --image=nginx:stable-alpine \
  --namespace kubedaily-practice
kubectl rollout status deployment/web --namespace kubedaily-practice --timeout=120s
```

Expected: `deployment "web" successfully rolled out`. The tag is convenient for practice but mutable; production manifests should use reviewed versions or digests. If the rollout times out, inspect the Pod events before continuing.

## Inspect state, events, and logs

```bash
kubectl get pods --namespace kubedaily-practice -o wide
kubectl describe deployment web --namespace kubedaily-practice
kubectl get events --namespace kubedaily-practice --sort-by='.metadata.creationTimestamp'
kubectl logs deployment/web --namespace kubedaily-practice --tail=50 --timestamps
```

A `Running` Pod is not necessarily ready. Compare the READY column, restart count, and events. Event history is temporary, so it is not a durable audit log. Logs may contain sensitive data; redact them before sharing.

## Introduce one known failure

The following **changes the Deployment image** to a nonexistent tag. Do this only in the practice namespace:

```bash
kubectl set image deployment/web nginx=nginx:kubedaily-missing-tag \
  --namespace kubedaily-practice
kubectl get pods --namespace kubedaily-practice
kubectl describe pods --selector=app=web --namespace kubedaily-practice
```

Expected: the new Pod eventually reports `ErrImagePull` or `ImagePullBackOff`; events explain the failed pull. A previous healthy replica may keep running during the rolling update.

There are no application logs for a container that never started. `kubectl logs POD --previous` is useful after a *running container crashes*, not for diagnosing an image that could not be pulled.

## Preview and apply a repair

Generate a corrected manifest locally, then inspect what would change:

```bash
kubectl create deployment web --image=nginx:stable-alpine \
  --namespace kubedaily-practice --dry-run=client -o yaml > web.yaml
kubectl apply --dry-run=server -f web.yaml
kubectl diff -f web.yaml
```

Client dry-run generates an object without creating it. Server dry-run checks it with the API server and admission without persisting it. Neither proves the application will start. `kubectl diff` exits with status **1 when there are differences**, which is expected here; errors use higher statuses.

After reviewing the diff, apply the change:

```bash
kubectl apply -f web.yaml
kubectl rollout status deployment/web --namespace kubedaily-practice --timeout=120s
kubectl get pods --namespace kubedaily-practice
```

The first apply may warn that the imperatively created object lacks a last-applied annotation. In a real repository, keep the manifest under version control from the start. GitOps controllers may reconcile manual changes back to Git's desired state.

## Practice checkpoint

- Which event identified the image problem?
- Why could an old replica remain available during the failure?
- Why were previous-container logs not useful for this failure?
- What does a successful dry-run prove, and what does it not prove?

For resource-pressure and health-check failures next, read [requests and limits](/blog/kubernetes-requests-limits/) and [probe design](/blog/kubernetes-probes-guide/).

## Clean up

This deletes everything in the practice namespace. Confirm the name before running it:

```bash
kubectl delete namespace kubedaily-practice
```

Remove the local `web.yaml` file when you no longer need it.

## References

- [kubectl reference](https://kubernetes.io/docs/reference/kubectl/)
- [Debugging applications](https://kubernetes.io/docs/tasks/debug/debug-application/)
- [Managing workloads with Deployments](/labs/Learn-k8s/)
