# Kubernetes Resource Requests and Limits: A Practical Guide

Misconfigured requests and limits cause most avoidable Kubernetes capacity problems: throttled latency, surprise `OOMKilled` events, and nodes that reject schedulable work. This guide explains what requests and limits actually control, how they interact with scheduling and Quality of Service, and how to choose values you can defend.

## What requests and limits control

A container can declare two CPU values and two memory values:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

- **Requests** are what the scheduler uses for capacity. A Pod is placed on a node that can fit the sum of its container requests, alongside other Pods' requests — not their limits.
- **Memory limits** are enforced reactively by the kernel. Memory pressure at the container limit can cause an OOM kill. Check `reason: OOMKilled`; exit code 137 alone only indicates SIGKILL and does not prove an OOM.
- **CPU limits** are enforced by the CFS scheduler as a time share. A container above its CPU limit is *throttled* — slowed, not killed.

The unit `250m` means 250 millicores, one quarter of a CPU core. Memory units follow Kubernetes conventions: `Mi` is mebibytes, so `256Mi` is about 268 MB.

## What happens when you get it wrong

| Configuration | Typical symptom | Why it happens |
| --- | --- | --- |
| Neither requests nor defaults | Unpredictable scheduling, noisy neighbors | The scheduler has no reserved capacity for this workload |
| Requests far above real usage | Wasted, paid-for capacity | Nodes reserve capacity that sits idle |
| Requests far below real usage | Evictions under node pressure | Node memory fills because schedulable capacity was overstated |
| No memory limit | A single Pod can disrupt a whole node | Unbounded usage triggers node-level pressure |
| CPU limit near request under spiky load | Latency from throttling | Extra CPU is available on the node but capped |

## Pick requests from measurements, not guesses

Look at real usage over a representative period — including peaks — before setting anything:

```sh
kubectl top pods --containers --sort-by=cpu
kubectl top nodes
```

`kubectl top` requires Metrics Server and shows recent usage, not historical peaks. If it is unavailable, use your monitoring system. Compare CPU and memory over representative traffic, startup, and failure recovery. A practical starting pattern for stateless services:

- **Memory request** = typical working set plus headroom for growth between restarts.
- **CPU request** = steady-state usage, rounded up to a defensible step (for example `250m`).
- **Memory limit** = a measured maximum working set plus justified headroom. There is no universally safe multiplier; test peak load and budget for node capacity.
- **CPU limit**: some latency-sensitive services benefit from bursting above their request when capacity is available. Omitting a CPU limit is a cluster-policy decision, not a universal recommendation: multi-tenant environments may require caps for fairness.

If you set a limit without a request and no admission default supplies one, Kubernetes generally copies the limit into the request. LimitRanges can also inject defaults: inspect the admitted Pod.

Guaranteed vs. Burstable QoS: if every container sets memory limit = memory request and CPU limit = CPU request, the Pod is `Guaranteed`. Node-pressure eviction also considers usage relative to requests and Pod priority; this is not a guarantee against eviction. Burstable (limits above requests) is fine for most services; BestEffort (no requests or limits) is evicted first and should be rare.

## Verify what a running Pod actually got

```bash
# Effective requests/limits, including defaults injected by LimitRanges
kubectl get pod <name> -o jsonpath='{.spec.containers[*].resources}' | jq

# QoS class
kubectl get pod <name> -o jsonpath='{.status.qosClass}'

# Was it OOMKilled? Look at the last terminated state
kubectl get pod <name> -o jsonpath='{.status.containerStatuses[*].lastState}' | jq
```

For throttling, use container CPU throttling metrics from your monitoring system, alongside request latency. Do not infer throttling solely from high CPU usage.

## Limits interact with the Java runtime and horizontal scaling

Set JVM heap with awareness of the container limit. A heap that defaults to a fraction of the *node's* memory will be OOMKilled inside a smaller container; use `-XX:MaxRAMPercentage` on modern runtimes so the heap derives from the container limit. The same class of problem applies to worker pools and thread caches sized from core counts: cgroup-aware defaults vary by runtime and version, so verify with load tests rather than assuming.

Horizontal Pod Autoscaling changes replica counts, not per-Pod size. If every replica is oversized, HPA scales the waste too. Revisit requests after meaningful traffic or workload changes.

## A sane workflow

1. Deploy with conservative requests measured from a staging workload.
2. Alert on `OOMKilled` restarts, CPU throttling ratios, and node memory pressure.
3. Review requests monthly against p99 usage; adjust with change control.
4. Review memory requests against peak working sets for critical services. Equal memory requests and limits alone do not give a Pod Guaranteed QoS.

## Practice

In a disposable cluster, inspect a Pod's effective resources and QoS class with the commands above. Explain whether admission supplied defaults. Compare recent usage with requests, and identify which monitoring data you would need before changing the limits. Continue with the isolated [kubectl troubleshooting lab](/labs/Learn-kubectl/) for a complete create–diagnose–repair–cleanup exercise.

## Take away

Requests decide *placement*, limits decide *enforcement*. Measure first, prefer memory limits as a safety rail over a performance tuning knob, and treat every change as a measured decision rather than folklore.

Further reading: [Resource management for Pods and containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/), [Pod priority and preemption](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/).
