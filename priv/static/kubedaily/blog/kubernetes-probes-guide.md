# Kubernetes Health Checks: Liveness, Readiness, and Startup Probes

Probes are how Kubernetes learns whether your container is usable. Used well, they route traffic away from unready instances and restart genuinely stuck ones. Used carelessly, they cause restart storms, drop traffic during deployments, or hide outages. This guide covers what each probe is for, common failure modes, and a review checklist.

## Three questions, three probes

| Probe | Question it answers | Consequence of failure |
| --- | --- | --- |
| Startup | Has this instance finished booting? | Restarts the container after its failure threshold; gates liveness/readiness until success |
| Readiness | Should traffic be sent here *right now*? | Endpoint marked unready for normal Service routing; process keeps running |
| Liveness | Is this process stuck beyond recovery? | Container restarted (subject to thresholds) |

A minimal, sane configuration for a web service:

```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 2
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 3
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

The paths are examples — your application must actually implement them. A probe path that does not exist fails forever, and a `200` from a hardcoded health handler proves almost nothing on its own.

## What each check should verify

**Readiness** should answer: can this instance serve a request *usefully* right now? Include checks for dependencies without which requests would fail fast and pointlessly — for example, a database connection pool that is permanently empty. Do *not* include everything upstream; if your readiness check pings five external services, one slow vendor takes your whole deployment out of rotation.

**Liveness** should be nearly stateless: "is the event loop responsive?" A liveness failure *restarts the container*. If the cause is a saturated database or an external API outage, liveness restarts convert an upstream incident into a restart storm. Liveness should fail only when the process itself cannot make progress.

**Startup** exists for slow initializers — cache warming, schema checks, large JAR loading. It suspends the other probes until the first success, so you can give slow starts generous `failureThreshold × periodSeconds` budgets without loosening steady-state liveness.

## Common failure patterns

1. **Liveness checks a dependency.** Database blip → every Pod restarts → connection storm when they all return at once. Keep liveness local to the process.
2. **Shared dependency checks in readiness and liveness.** A dependency blip can both remove the Pod from normal routing and restart it. Sharing a lightweight local endpoint can be valid for simple apps; sharing a dependency-heavy check is the problem.
3. **Probe timeout shorter than worst-case latency.** Under load, GC pauses or a slow endpoint push you past `timeoutSeconds`, and healthy Pods flap. Measure p99 of the probe endpoint, then set timeouts above it.
4. **Probes too aggressive during startup.** The container is killed mid-initialization repeatedly. That is what `startupProbe` prevents.
5. **Grace period shorter than cleanup.** Combine probe design with a deliberate `terminationGracePeriodSeconds` and SIGTERM handling, or rolling updates drop in-flight requests.

## Probes and deployments

During a rolling update, readiness gates traffic to new Pods. If readiness is wrong, you get either traffic to instances that cannot serve (errors) or a rollout that never proceeds (stuck). Test deployments against a staging cluster and watch `kubectl rollout status` plus endpoint events.

Readiness is also re-evaluated continuously after startup: a Pod that loses its database pool should leave rotation *without* being restarted, then rejoin when it recovers.

## A review checklist

- [ ] Does `/healthz` (liveness) check only in-process health?
- [ ] Does readiness reflect the dependencies needed to *serve*?
- [ ] Are timeouts ≥ measured p99 of the probe endpoint under load?
- [ ] Is there a startup probe with a budget matching real boot time?
- [ ] Does SIGTERM handling finish or hand off in-flight work?
- [ ] Do you alert on probe *failures* (flapping), not just restarts?

## Practice

Deploy a two-replica application where the readiness endpoint toggles a failure mode (for example, when a file exists). Watch `kubectl get endpointslices -o yaml` during a rollout and while toggling. Confirm that readiness marks only that Pod's endpoint unready, and that liveness is never triggered by the same condition. Use a disposable namespace.

## Take away

Liveness protects against stuck processes; readiness protects *traffic*; startup buys slow boots a budget. Give each probe a distinct job, measure before tuning, and remember that a restart is not a recovery strategy for bad configuration.

Next practice: [kubectl essentials](/labs/Learn-kubectl/) and [resource requests and limits](/blog/kubernetes-requests-limits/).

Further reading: [Configure liveness, readiness and startup probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/), [Pod lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/).
