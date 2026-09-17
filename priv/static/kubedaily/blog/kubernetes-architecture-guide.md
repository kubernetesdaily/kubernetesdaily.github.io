# Kubernetes architecture: beginner’s guide

Trace one Deployment from a YAML file to a running container. Knowing which component owns each decision makes troubleshooting less mysterious: the API accepting an object is not the same as an application becoming healthy.

## Before you start

Allow 15 minutes. You need kubectl and a disposable Kubernetes cluster for the optional inspection commands. They are read-only. Check `kubectl config current-context` first; do not inspect an unfamiliar cluster. No Metrics Server or cloud account is required.

## The control plane records intent

The API server authenticates and authorizes requests, runs admission, and persists accepted state through etcd. Controllers repeatedly compare desired and observed state. The scheduler chooses a node for an unscheduled Pod; it does not start the container itself.

On the selected node, kubelet coordinates the Pod through the Container Runtime Interface. A runtime such as containerd retrieves images and starts containers. A CNI implementation provides Pod networking. Service forwarding is commonly implemented by kube-proxy, but some network implementations replace it. A CSI driver can provide persistent storage.

| Component | Primary responsibility | Useful first signal |
| --- | --- | --- |
| API server | Validate and serve cluster API requests | API errors and authorization results |
| etcd | Persist control-plane state | Control-plane operator monitoring |
| Controllers | Reconcile desired state | Conditions and owner references |
| Scheduler | Assign pending Pods to nodes | Pod scheduling events |
| Kubelet/runtime | Start and monitor containers | Pod status, events, container logs |
| CNI/Service implementation | Pod connectivity and Service routing | Addresses, endpoints, policy and network metrics |

A managed cluster may hide control-plane hosts. That does not change the API model, but it changes which logs you can access and who operates etcd backups.

## Follow the ownership chain

A Deployment owns ReplicaSets, which own Pods. During a rolling update, an old and a new ReplicaSet may coexist. Deleting a Pod does not remove the Deployment's desired replica count: its controllers normally create a replacement.

Run these against the namespace used by the [kubectl lab](/labs/Learn-kubectl/):

```bash
kubectl -n kubedaily-practice get deployments,replicasets,pods
kubectl -n kubedaily-practice get events --sort-by='.metadata.creationTimestamp'
```

Inspect ownership with a quoted custom-column argument (the quotes prevent shell bracket expansion):

```bash
kubectl -n kubedaily-practice get pods \
  -o 'custom-columns=NAME:.metadata.name,NODE:.spec.nodeName,OWNER:.metadata.ownerReferences[0].kind'
```

Expected: a scheduled Pod has a node name, and its owner kind is ReplicaSet. Empty output means the namespace has no matching resources; run the linked lab to create them rather than modifying an unrelated workload.

## Diagnose by stage

1. **API rejection:** check the returned validation, authorization or admission error. No scheduler investigation is useful if the object was never accepted.
2. **Pending without a node:** inspect scheduling events, resource requests, taints and placement constraints. A bound volume can also constrain placement.
3. **Assigned but not running:** inspect image pulls, volume mounts, runtime and networking events.
4. **Running but unready:** inspect readiness results and application behavior.
5. **Ready but unreachable:** inspect Service selectors, EndpointSlices, ports and network policies. Pod readiness alone does not prove end-to-end connectivity.

Events expire, and logs may contain sensitive data. Redact before sharing; production monitoring should retain useful evidence independently.

## Practice checkpoint

Complete the image-failure exercise in the kubectl lab. Which stage fails? The scheduler can successfully assign a node even when the runtime cannot pull an image. Explain why adding nodes would not fix that failure.

## Next steps and references

- [Pods and Deployments checklist](/blog/pods-deployments-checklist/)
- [Resource requests and limits](/blog/kubernetes-requests-limits/)
- [Kubernetes components](https://kubernetes.io/docs/concepts/overview/components/)
- [Controllers](https://kubernetes.io/docs/concepts/architecture/controller/)

Validation scope: read-only inspection examples; see `docs/validation/maintenance-pass.md` for hands-on results. This guide creates no resources and needs no cleanup.
