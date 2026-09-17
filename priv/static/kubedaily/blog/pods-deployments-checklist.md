# Pods and Deployments: A Production Checklist

Most Kubernetes outages trace back to a Deployment that worked in development and met production the hard way: no resource requests, a missing probe, `latest` as an image tag, or a restart that erased local state. This checklist is what a reviewer should be able to confirm about any Deployment before it takes traffic. Each item tells you what to check and how, in the cluster, not just in YAML.

## How Pods, ReplicaSets, and Deployments fit together

A **Pod** is the smallest schedulable unit: one or more containers sharing network and storage. A **ReplicaSet** keeps a number of identical Pods alive. A **Deployment** manages ReplicaSets to roll out changes and roll them back.

In practice this means: you never scale or heal Pods by hand. Change the Deployment, and its controller does the rest. If you find yourself deleting Pods to "fix" something, the Deployment's template is the thing that actually needs fixing.

```bash
kubectl get deploy,rs,pods -l app=<name>
```

Reading the trio top-down explains most anomalies: the Deployment owns the ReplicaSet hash, the ReplicaSet owns the Pods.

## Image and registry checks

- [ ] Tags are immutable in practice: a specific version, not `latest` or `main`. Mutable tags mean the "same" Deployment can run different code after a re-pull.
- [ ] For critical services, pin the image **digest** (`image: repo/app@sha256:…`) so every replica and rollout is byte-identical.
- [ ] The registry credentials exist as a Secret (`imagePullSecrets`) in the namespace — an `ImagePullBackOff` on a private registry is usually this.
- [ ] The image passes scanning in CI (see the [image scanning guide](/blog/image-scanning-security-guide/)); base images are rebuilt on a schedule.

## Resources, scheduling, and disruption

- [ ] Every container declares memory and CPU **requests**; limits follow a reviewed policy. Choose values from measurements, as in the [requests and limits guide](/blog/kubernetes-requests-limits/).
- [ ] Pods that must not co-locate use anti-affinity or `topologySpreadConstraints`; replicas are spread across nodes (and zones, when they exist).
- [ ] A `PodDisruptionBudget` exists for anything that should keep minimum capacity during node drains.
- [ ] Pods that must land on specific hardware or zones use explicit `nodeSelector`/`nodeAffinity` — not hope.

## Health, lifecycle, and data

- [ ] Readiness reflects the ability to serve *now*; liveness fails only on a stuck process; slow boots have a startup probe. The [probes guide](/blog/kubernetes-probes-guide/) has the full pattern.
- [ ] The container handles `SIGTERM` and finishes in-flight work within `terminationGracePeriodSeconds`.
- [ ] Anything written to container storage is disposable or exported. State that must survive restarts belongs in a PersistentVolume or an external service — a restarted Pod gets a fresh, empty filesystem.
- [ ] Secrets are mounted, not baked into the image or environment at build time.

## Verify it in the cluster

```bash
# What would break during a node drain?
kubectl get poddisruptionbudgets -A

# Which Pods would a drain evict first? Check QoS and priority.
kubectl get pods -o custom-columns='NAME:.metadata.name,QOS:.status.qosClass,PRIORITY:.spec.priority'

# Does the running spec match the template you reviewed?
kubectl diff -f deployment.yaml
```

A checklist is only as good as its last verification. Drift between Git and the cluster is the normal state of a long-lived platform; `kubectl diff` is how you catch it.

## Practice

Take any Deployment in a disposable cluster and confirm each item above, writing down which ones you *cannot* verify from the cluster alone — those are process gaps, not technology gaps. Compare two Deployments from different teams and note which checklist items differ; that difference is your next internal standard.

## Take away

A production-ready Deployment is boring: pinned images, measured resources, honest probes, graceful shutdown, and no state that fears a restart. Check it in the cluster, not just in review.

Further reading: [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Pod lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), [PodDisruptionBudgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/).
