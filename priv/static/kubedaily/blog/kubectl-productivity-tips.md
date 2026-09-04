## Work faster without losing cluster context

Most `kubectl` mistakes happen when the active context or namespace is unclear. These ten habits make everyday inspection and troubleshooting faster while keeping every command explicit and reviewable.

> Before making a change, run `kubectl config current-context` and confirm the cluster you are about to touch.

## 1. Make the context visible

List contexts, then switch deliberately:

```bash
kubectl config get-contexts
kubectl config use-context staging-cluster
kubectl config current-context
```

For one-off commands, prefer `--context` rather than switching your default:

```bash
kubectl --context production-cluster get nodes
```

## 2. Set a working namespace

Namespaces prevent unrelated workloads from colliding. Set a namespace on the current context when you are working in it for a while, then verify it.

```bash
kubectl config set-context --current --namespace=payments
kubectl config view --minify | grep namespace
```

You can always override it with `-n`:

```bash
kubectl get pods -n kube-system
```

## 3. Use labels to narrow the view

Labels are safer than remembering pod names, especially after a rollout.

```bash
kubectl get pods -l app=api
kubectl get deployments -l app.kubernetes.io/part-of=storefront
kubectl logs -l app=api --all-containers=true --prefix
```

## 4. Ask for the useful columns

Start with `-o wide` when you need node placement or pod IPs. Use custom columns when you want a repeatable operational view.

```bash
kubectl get pods -o wide
kubectl get pods -o custom-columns=NAME:.metadata.name,PHASE:.status.phase,NODE:.spec.nodeName
```

## 5. Sort before you investigate

Sorting makes restarts and fresh resources visible without manually scanning a long list.

```bash
kubectl get pods --sort-by=.metadata.creationTimestamp
kubectl get events --sort-by=.metadata.creationTimestamp
```

## 6. Follow a rollout, not individual pods

Deployments own pods, so check their rollout status after an update:

```bash
kubectl rollout status deployment/api
kubectl rollout history deployment/api
kubectl rollout undo deployment/api --to-revision=2
```

## 7. Read logs from the workload you own

Use a deployment or label selector instead of a generated pod name. Add timestamps when comparing events across services.

```bash
kubectl logs deployment/api --all-containers=true --prefix --timestamps
kubectl logs deployment/api --all-containers=true --prefix --previous
```

## 8. Inspect configuration before editing it

Retrieve the live manifest before changing it, then use a server-side dry run or diff to review the impact.

```bash
kubectl get deployment api -o yaml
kubectl diff -f deployment.yaml
kubectl apply --server-side --dry-run=server -f deployment.yaml
```

## 9. Check permissions before a failed deployment

RBAC errors are clearer when you ask the API directly:

```bash
kubectl auth can-i create deployments -n payments
kubectl auth can-i get pods --subresource=log -n payments
kubectl auth can-i --list -n payments
```

## 10. Use the built-in documentation

`kubectl explain` is fast, cluster-aware documentation for resource fields. It is especially useful when you are editing a manifest under pressure.

```bash
kubectl explain deployment.spec.template.spec.containers
kubectl explain service.spec.ports
```

## A small operational checklist

1. Confirm context and namespace.
2. Filter by labels before choosing a pod.
3. Review events, rollout status, and logs together.
4. Use `diff` or a server-side dry run before applying a manifest.
5. Check authorization when an API call is unexpectedly denied.

For the complete command surface, keep the [official kubectl reference](https://kubernetes.io/docs/reference/kubectl/) close at hand. It documents output formats, namespace and context flags, sorting, and authorization commands used throughout this guide.
