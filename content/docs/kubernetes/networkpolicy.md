---
title: "NetworkPolicy "
description: "networking"
weight: 15
---

Creating effective Kubernetes Network Policies involves defining rules that explicitly allow or deny traffic to and from your pods. Here are some example policies to help you understand how to set up both restrictive (deny) and permissive (allow) behaviors in your cluster.

### 1. Default Deny All Traffic to a Namespace
A common starting point in securing a namespace in Kubernetes is to deny all traffic to all pods within a namespace. This "default deny" policy doesn't specify any `allow` rules, making it effectively a deny-all policy.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

### 2. Allow Traffic from Specific Namespace
After setting a default deny, you might want to allow traffic from specific namespaces. This policy allows all ingress traffic from any pod in a specified namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-specific-namespace
  namespace: default
spec:
  podSelector: {}
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            project: myproject
  policyTypes:
    - Ingress
```

### 3. Allow Traffic Only on Specific Port
This policy allows traffic to specific ports, useful for services like web servers or databases that listen on well-known ports.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-specific-port
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
    - ports:
      - protocol: TCP
        port: 80
  policyTypes:
    - Ingress
```

### 4. Allow Traffic from Certain Pods
This policy allows ingress traffic from pods with specific labels. It's particularly useful when you want to restrict communication between services based on their roles or functions.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-certain-pods
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: frontend
  policyTypes:
    - Ingress
```

### 5. Deny Traffic from Certain Pods
Conversely, you might want to explicitly deny traffic from certain pods while allowing others. This example shows a policy that denies ingress from any pod labeled as `app: test`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-from-certain-pods
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: production
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: test
  policyTypes:
    - Ingress
```

### 6. Combine Allow and Deny Rules
You can create complex policies that combine various allow and deny rules to finely control traffic flows:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: complex-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: complex-app
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            environment: trusted
      - podSelector:
          matchLabels:
            app: trusted-peer
  egress:
    - to:
      - ipBlock:
          cidr: 192.168.0.0/16
          except:
          - 192.168.1.0/24
  policyTypes:
    - Ingress
    - Egress
```

This complex policy allows ingress from any pod in a "trusted" namespace or labeled as `trusted-peer` and restricts egress to a specific CIDR block, except for a specific subnet.

### Applying Network Policies
To apply any of these network policies, save the YAML to a file and use `kubectl`:

```bash
kubectl apply -f <filename>.yaml
```

Remember, network policies are additive, and they only apply to the pods in the namespaces that have them. Make sure your Kubernetes network plugin supports network policies, such as Calico, Weave, or Cilium.


In Kubernetes, applying a default deny policy for all traffic to a namespace is a common security practice. This ensures that no pods within the namespace can receive traffic unless explicitly allowed by additional NetworkPolicy resources. Here’s how to set up a default deny all traffic policy for a namespace and then allow traffic specifically for an nginx deployment within that namespace.

### Step 1: Create a Namespace
First, let's create a namespace where these policies will be applied. This isolates the resources and the network policies to a specific part of your Kubernetes cluster.

```bash
kubectl create namespace nginx-example
```

### Step 2: Apply a Default Deny All Network Policy
Apply a default deny all ingress and egress traffic policy to the newly created namespace. This policy selects all pods in the namespace by not specifying any `podSelector`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: nginx-example
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

To apply this policy, save it to a file named `default-deny-all.yaml` and run:

```bash
kubectl apply -f default-deny-all.yaml
```

### Step 3: Deploy Nginx to the Namespace
Now deploy an nginx pod into the `nginx-example` namespace. Here’s a simple deployment of nginx:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx-example
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Save this to `nginx-deployment.yaml` and apply it with:

```bash
kubectl apply -f nginx-deployment.yaml
```

### Step 4: Allow Traffic to Nginx
To allow traffic to reach your nginx pod, create a NetworkPolicy that permits certain types of ingress traffic. For example, allow HTTP traffic on port 80:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-nginx
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
  - from: []
    ports:
    - protocol: TCP
      port: 80
```

Save this to `allow-nginx.yaml` and apply it:

```bash
kubectl apply -f allow-nginx.yaml
```

### Step 5: Verify the Configuration
After applying these configurations, the nginx pod should be accessible on port 80 from within the cluster, but all other traffic should be denied by default. You can test this by attempting to access the nginx service from another pod in the same namespace or a different namespace without corresponding egress rules.

This setup helps in maintaining strict control over the network traffic, ensuring that only explicitly allowed connections can be established to and from pods within the `nginx-example` namespace.


To see the output after running the commands to set up your nginx deployment and NetworkPolicies in Kubernetes, you'll need to perform a series of checks to confirm the correct application of the configurations and test the actual network functionality.

### Step 1: Confirm the Network Policy and Deployment
First, verify that the NetworkPolicy and nginx deployment have been successfully created:

```bash
# List NetworkPolicies in the nginx-example namespace
kubectl get networkpolicy -n nginx-example

# List deployments in the nginx-example namespace to check nginx is deployed
kubectl get deployments -n nginx-example

# Check the status of the nginx pods to ensure they're running
kubectl get pods -n nginx-example
```

### Expected Output
- **NetworkPolicies**:
  ```
  NAME               POD-SELECTOR   AGE
  default-deny-all   <none>         1m
  allow-nginx        app=nginx      1m
  ```
- **Deployments**:
  ```
  NAME              READY   UP-TO-DATE   AVAILABLE   AGE
  nginx-deployment  1/1     1            1           1m
  ```
- **Pods**:
  ```
  NAME                               READY   STATUS    RESTARTS   AGE
  nginx-deployment-<random-string>   1/1     Running   0          1m
  ```

### Step 2: Test Connectivity
To test if the nginx pod is correctly accessible according to the NetworkPolicy:

#### a. Inside the Same Namespace
Attempt to access the nginx service from another pod in the same namespace. This will demonstrate whether the ingress policy allows traffic:

1. Run a temporary busybox pod and try to connect to nginx:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox test-pod -- wget -qO- http://nginx-deployment
   ```

#### b. From a Different Namespace
Try accessing the nginx service from a pod in a different namespace to verify that the default deny policy across namespaces is effective:

2. First, switch to or create a different namespace and try the same command:
   ```bash
   kubectl create namespace test
   kubectl run -it --rm --namespace=test --image=busybox test-pod -- wget -qO- http://nginx-deployment.nginx-example
   ```

### Expected Output
- **Inside the Same Namespace**:
  ```
  Connecting to nginx-deployment (10.244.1.10:80)
  <!DOCTYPE html>
  <html>
  <head>
  <title>Welcome to nginx!</title>
  ...
  </html>
  ```
  This output indicates that the nginx server is accessible from within the same namespace, serving the default nginx page.

- **From a Different Namespace**:
  ```
  wget: can't connect to remote host (10.244.1.10): Connection timed out
  ```
  This output shows that the default deny policy is effectively blocking traffic from outside the `nginx-example` namespace.

### Step 3: Review Logs
Finally, you can check the logs from the nginx pod to see if it logs the access attempts, which can be useful for debugging:

```bash
kubectl logs -n nginx-example -l app=nginx
```

These steps provide a comprehensive check to ensure your deployments and network policies function as intended. If there's any discrepancy in the expected behavior, you should revisit your configurations for any misconfigurations or typos.

To allow traffic from a specific namespace to your nginx deployment within the `nginx-example` namespace, you'll need to create a NetworkPolicy that explicitly allows this traffic. Here’s how to set up a NetworkPolicy to allow traffic from a designated namespace (e.g., `trusted-namespace`) to the nginx pods in the `nginx-example` namespace.

### Step 1: Label the Trusted Namespace
First, ensure that the namespace from which you want to allow traffic to the nginx pods is labeled. This label will be used in the NetworkPolicy to identify the namespace.

```bash
kubectl label namespace trusted-namespace name=trusted-namespace
```

### Step 2: Create a NetworkPolicy
Create a NetworkPolicy that allows traffic from the `trusted-namespace` to the nginx pods in the `nginx-example` namespace. Save the following YAML to a file, for example, `allow-from-trusted-namespace.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-trusted-namespace
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            name: trusted-namespace
      ports:
        - protocol: TCP
          port: 80
```

This policy selects pods with the label `app: nginx` in the `nginx-example` namespace and allows incoming traffic on TCP port 80 from any pod in namespaces labeled with `name: trusted-namespace`.

### Step 3: Apply the NetworkPolicy
Apply this policy by running:

```bash
kubectl apply -f allow-from-trusted-namespace.yaml
```

### Step 4: Test the Connectivity
To test if the policy works as intended, you can attempt to connect to the nginx service from a pod in the `trusted-namespace`. First, run a temporary pod in the `trusted-namespace` and try to access the nginx service:

```bash
kubectl run -it --rm --namespace=trusted-namespace --image=busybox test-pod -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
```

### Expected Output
- **Success Scenario**: If the network policy is correctly configured and applied, you should see the default nginx HTML page output or a successful HTTP response.
- **Failure Scenario**: If there is no response, it could indicate that the network policy does not allow the traffic as expected, or there might be other restrictive policies or connectivity issues.

### Monitoring and Adjustments
- **Monitor Network Policies**: Regularly check and monitor the logs and network traffic to ensure that the policies are working as expected.
- **Adjust Policies**: As your cluster evolves, you might need to update or refine your network policies to accommodate changes in deployments or namespace configurations.

This setup helps ensure that only the specified namespaces can access your resources, enhancing the security of your Kubernetes environment.

To configure a NetworkPolicy that specifically denies traffic from certain pods within your Kubernetes environment while allowing others, you can set up a policy that allows traffic from all sources except those specifically denied. This example demonstrates how to deny traffic from pods labeled as `app: untrusted` while allowing others to access the nginx deployment in the `nginx-example` namespace.

### Step 1: Define the Deny Policy
First, we create a policy that explicitly denies traffic from pods with a specific label (`app: untrusted`) to the nginx pods. Since Kubernetes NetworkPolicies do not directly support "deny" rules, you need to frame the policy as an "allow from all except" by not selecting the untrusted pods in the allow rule.

Here's the YAML configuration for a policy that allows ingress to the nginx pods from any source that does not have the label `app: untrusted`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-except-untrusted
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
    - from:
      - podSelector:
          matchExpressions:
            - key: app
              operator: NotIn
              values:
                - untrusted
      ports:
        - protocol: TCP
          port: 80
```

### Step 2: Apply the NetworkPolicy
Save this configuration to a file named `allow-except-untrusted.yaml` and apply it using the following command:

```bash
kubectl apply -f allow-except-untrusted.yaml
```

### Step 3: Test the Configuration
To ensure the policy is functioning as intended, you can perform tests from pods with different labels:

1. **From an Untrusted Pod**:
   Try to access the nginx service from a pod labeled as `untrusted`:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox untrusted-pod --labels="app=untrusted" -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
   ```

2. **From a Trusted Pod**:
   Try the same from a pod not labeled as `untrusted`:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox trusted-pod --labels="app=trusted" -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
   ```

### Expected Output
- **Untrusted Pod**: The request should fail if the NetworkPolicy is working correctly. You may see a timeout or connection error.
- **Trusted Pod**: This request should succeed, displaying the default nginx start page or a successful HTTP response.

### Monitoring and Adjustments
- **Monitor Logs**: Keep an eye on the logs of your nginx pods to see the access attempts and ensure that untrusted requests are being blocked.
- **Adjust Policies**: As requirements change, you might need to update the labels or the scope of the NetworkPolicy to fine-tune the traffic rules.

By using the `NotIn` operator with matchExpressions in a NetworkPolicy, you can effectively control pod traffic by excluding specific sources. This approach helps you to safeguard your applications from unwanted access while maintaining necessary connectivity within your cluster.

