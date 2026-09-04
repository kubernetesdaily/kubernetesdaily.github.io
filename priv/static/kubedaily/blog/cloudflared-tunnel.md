## A safer path from the Internet to a Kubernetes Service

Cloudflare Tunnel lets `cloudflared` create outbound connections from your cluster to Cloudflare. That means the workload does not need a public IP address or an inbound firewall rule. Keep the connector as a small, separate deployment so it can serve more than one internal service and be operated independently of application releases.

> This guide uses a remotely managed tunnel. Treat its token like a password: store it in a Kubernetes Secret, do not put it in Git, logs, or a shell history.

## Before you begin

You need a Kubernetes cluster, `kubectl` access, a Cloudflare account, and a domain managed in Cloudflare. Create a remotely managed tunnel in the Cloudflare dashboard, then copy **only** the tunnel token from the Docker command. The [Cloudflare Kubernetes deployment guide](https://developers.cloudflare.com/tunnel/deployment-guides/kubernetes/) is the source of truth for the current setup flow.

Create a namespace for the connector:

```bash
kubectl create namespace cloudflared
```

## Store the tunnel token

Create a manifest named `tunnel-token.yaml`. Replace the placeholder locally before applying it; never commit the real value.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tunnel-token
  namespace: cloudflared
type: Opaque
stringData:
  token: <YOUR_TUNNEL_TOKEN>
```

```bash
kubectl apply -f tunnel-token.yaml
kubectl -n cloudflared get secret tunnel-token
```

## Run cloudflared as a deployment

The deployment below runs two connectors for availability. The readiness endpoint makes Kubernetes restart a connector that no longer has an active connection.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudflared
  namespace: cloudflared
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cloudflared
  template:
    metadata:
      labels:
        app: cloudflared
    spec:
      containers:
        - name: cloudflared
          image: cloudflare/cloudflared:latest
          args:
            - tunnel
            - --no-autoupdate
            - --loglevel
            - info
            - --metrics
            - 0.0.0.0:2000
            - run
          env:
            - name: TUNNEL_TOKEN
              valueFrom:
                secretKeyRef:
                  name: tunnel-token
                  key: token
          livenessProbe:
            httpGet:
              path: /ready
              port: 2000
            initialDelaySeconds: 10
            periodSeconds: 10
```

```bash
kubectl apply -f cloudflared.yaml
kubectl -n cloudflared rollout status deployment/cloudflared
kubectl -n cloudflared get pods
```

## Publish a Kubernetes Service

In the Cloudflare dashboard, open **Networking → Tunnels**, select the tunnel, and add a published application route. Point it at the internal Service DNS name, for example:

```text
http://api.default.svc.cluster.local:8080
```

Use the namespace and port for your own Service. The public hostname belongs in Cloudflare; the origin stays private inside Kubernetes.

## Verify and operate the tunnel

Start with the connector logs and readiness endpoint when troubleshooting:

```bash
kubectl -n cloudflared logs deployment/cloudflared --tail=100
kubectl -n cloudflared get deployment cloudflared
```

For production, use least-privilege access controls on the published hostname, rotate a token if it is exposed, and keep the connector deployment separate from application autoscaling. Cloudflare recommends replicas for availability, not as a substitute for application load balancing. See [Cloudflare's tunnel-token guidance](https://developers.cloudflare.com/tunnel/advanced/tunnel-tokens/) for rotation and handling details.
