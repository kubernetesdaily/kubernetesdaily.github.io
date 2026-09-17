# NetworkPolicy: security guide

NetworkPolicy limits which connections can reach selected Pods or leave them. The API accepting a policy does not prove enforcement: your network implementation must support the policy types you use.

## Before you start

Use a disposable cluster whose CNI explicitly supports Kubernetes NetworkPolicy. Allow 20 minutes. You need kubectl, permission to create a namespace and Pods, and outbound image pulls. Plain kind installations should not be assumed to enforce policies; consult your CNI's documentation.

Check your context. Stop if the namespace below exists; do not reuse someone else's namespace.

```bash
kubectl config current-context
kubectl create namespace kubedaily-policy
kubectl -n kubedaily-policy create deployment web --image=nginx:stable-alpine
kubectl -n kubedaily-policy expose deployment web --port=80
kubectl -n kubedaily-policy rollout status deployment/web --timeout=120s
kubectl -n kubedaily-policy run client --image=busybox:1.37 --labels=role=client --command -- sleep 3600
kubectl -n kubedaily-policy wait --for=condition=Ready pod/client --timeout=120s
```

These are mutable learning image tags, not production digest pins. The example modifies only ingress to Pods labeled `app=web` in its dedicated namespace; it does not install cluster-wide controls.

## Understand selection and additive rules

A Pod becomes isolated for ingress when an ingress policy selects it. Allowed traffic is the union of matching rules across policies, not an ordered firewall list. Egress isolation is independent. For a connection to succeed, both source egress and destination ingress must permit it when those directions are isolated.

An empty `podSelector: {}` selects every Pod in the policy namespace. In a peer, a `podSelector` alone selects peers in the same namespace. A `namespaceSelector` and `podSelector` in the same peer entry are combined with AND; separate entries are OR.

## Establish a baseline

```bash
kubectl -n kubedaily-policy exec client -- wget -T 3 -q -O - http://web
```

Expected: nginx HTML. If this fails, fix the Service, DNS or application before adding policy; otherwise you cannot attribute the next result to enforcement.

## Deny ingress to the demo server

Save as `deny-web.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-web
  namespace: kubedaily-policy
spec:
  podSelector:
    matchLabels:
      app: web
  policyTypes: [Ingress]
  ingress: []
```

```bash
kubectl apply -f deny-web.yaml
kubectl -n kubedaily-policy exec client -- wget -T 3 -q -O - http://web
```

The second command should now fail after policy propagation. Retry a fresh connection if necessary; handling of existing connections varies. If it still succeeds, do not claim isolation: inspect other additive policies and confirm CNI enforcement. Policy objects existing in `kubectl get networkpolicy` prove only API storage.

## Allow one labeled client

Save as `allow-client.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-client
  namespace: kubedaily-policy
spec:
  podSelector:
    matchLabels:
      app: web
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: client
      ports:
        - protocol: TCP
          port: 80
```

```bash
kubectl apply -f allow-client.yaml
kubectl -n kubedaily-policy exec client -- wget -T 3 -q -O - http://web
kubectl -n kubedaily-policy label pod client role=other --overwrite
kubectl -n kubedaily-policy exec client -- wget -T 3 -q -O - http://web
```

Expected: success after the allow rule propagates, then failure after the label change propagates. The deny policy remains present; the allow rule adds permitted traffic. Restore `role=client` if you want to repeat the positive check.

## What this does not protect

NetworkPolicy is usually layer 3/4 control, not HTTP authorization, TLS identity, or a secrets boundary. People who can modify labels or policies can change the allowed paths. Host-network traffic and node-originated traffic have implementation-specific considerations. Policies also do not replace RBAC or application authentication.

This example deliberately leaves egress alone. An egress default-deny needs an explicit DNS design, including TCP/UDP, the resolver path and any node-local DNS arrangement. Copying a DNS allow rule from another cluster is not a safe production rollout.

## Clean up

Delete only the disposable namespace and everything created inside it:

```bash
kubectl delete namespace kubedaily-policy
```

## Next steps and references

- [Kubernetes architecture](/blog/kubernetes-architecture-guide/)
- [Pods and Deployments checklist](/blog/pods-deployments-checklist/)
- [NetworkPolicy semantics and limitations](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Declare a NetworkPolicy](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/)

Validation scope is recorded in `docs/validation/roadmap-guides.md`. An API dry-run alone is never an enforcement test.
