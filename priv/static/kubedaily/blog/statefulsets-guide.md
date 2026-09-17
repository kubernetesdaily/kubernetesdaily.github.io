# StatefulSets: beginner’s guide

StatefulSets provide stable Pod identities and a way to associate each replica with its own persistent storage. They do not automatically replicate databases, make backups, or turn a single-node application into a highly available service.

## Before you start

Allow 20 minutes. Use kubectl and a disposable Kubernetes cluster with a default StorageClass that supports dynamic provisioning. Check your context before making changes. This example creates two Pods, a headless Service, and two small volume claims in a dedicated namespace. A cloud provisioner may charge for storage.

```bash
kubectl config current-context
kubectl get storageclass
```

If there is no default StorageClass, stop and configure one appropriate to your test cluster. Do not copy an arbitrary production StorageClass name.

## What stays stable

A StatefulSet named `notes` normally creates Pods named `notes-0`, `notes-1`, and so on. A headless Service supplies their network identity. Volume claim templates create a separate PVC for each replica; the same PVC can be reattached to a replacement for that ordinal.

| Property | StatefulSet provides | Your application still owns |
| --- | --- | --- |
| Identity | Stable ordinal and DNS identity | Membership and leader election |
| Storage | Per-replica claim association | Replication, consistency, backup and restore |
| Lifecycle | Ordered creation by default | Health checks that reflect real readiness |
| Updates | Controlled Pod replacement | Schema compatibility and safe upgrades |

`ReadWriteOnce` means a volume can be mounted read-write by one node; it is not a guarantee of exactly one writer Pod. Use storage and application-level controls appropriate to your workload.

## Create a tiny persistence exercise

Stop if `kubedaily-stateful` already exists. Create it only for this exercise:

```bash
kubectl create namespace kubedaily-stateful
```

Save as `stateful-notes.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: notes
  namespace: kubedaily-stateful
spec:
  clusterIP: None
  selector:
    app: notes
  ports:
    - port: 80
      name: http
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: notes
  namespace: kubedaily-stateful
spec:
  serviceName: notes
  replicas: 2
  selector:
    matchLabels:
      app: notes
  template:
    metadata:
      labels:
        app: notes
    spec:
      containers:
        - name: web
          image: nginx:stable-alpine
          ports:
            - containerPort: 80
              name: http
          volumeMounts:
            - name: data
              mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: [ReadWriteOnce]
        resources:
          requests:
            storage: 64Mi
```

This intentionally minimal storage demo is not production hardening. The image tag is mutable; choose reviewed digests, resources and probes for real deployments.

```bash
kubectl apply -f stateful-notes.yaml
kubectl -n kubedaily-stateful rollout status statefulset/notes --timeout=180s
kubectl -n kubedaily-stateful get pods,pvc
kubectl -n kubedaily-stateful exec notes-0 -- sh -c 'echo ordinal-zero > /usr/share/nginx/html/index.html'
kubectl -n kubedaily-stateful exec notes-0 -- cat /usr/share/nginx/html/index.html
```

Expected: two bound claims and the output `ordinal-zero`. The second replica has different storage; it will not receive this file automatically.

## Verify replacement, not just restart

The following deletes only the first demo Pod. The StatefulSet should replace it:

```bash
kubectl -n kubedaily-stateful delete pod notes-0
kubectl -n kubedaily-stateful rollout status statefulset/notes --timeout=180s
kubectl -n kubedaily-stateful exec notes-0 -- cat /usr/share/nginx/html/index.html
```

Expected: the marker survives. This verifies persistence across Pod replacement on this cluster, not recovery from a failed disk, node or region. If a Pod stays Pending, inspect its events and PVC status. A local-path volume may constrain it to one node.

## Production questions

- Can the application tolerate losing one member? Test quorum rather than equating replica count with availability.
- Does readiness prevent an incomplete member from serving traffic?
- Can an older binary read data written by the new version? A rollback cannot undo an incompatible schema change.
- Are backups restorable into a separate environment? A bound PVC is not a backup.
- Are claim retention and the underlying PV reclaim policy understood? Deleting a StatefulSet does not normally delete its claims.

## Clean up

This deletes the exercise namespace **including its PVCs**. Depending on the StorageClass/PV reclaim policy, backing storage may also be deleted or may require separate cleanup. Never run it against valuable data.

```bash
kubectl delete namespace kubedaily-stateful
```

## Next steps and references

- [Kubernetes architecture](/blog/kubernetes-architecture-guide/)
- [Helm production checklist](/blog/helm-production-checklist/)
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Persistent volumes and reclaim policy](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

See `docs/validation/roadmap-guides.md` for the exact validation scope; do not infer production readiness from this demo.
