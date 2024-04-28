---
title: "NetworkPolicy "
description: "networking"
weight: 15
---

It looks like you want to apply a Kubernetes NetworkPolicy that you've defined in a file using `kubectl`, the command-line tool for interacting with Kubernetes. If you're asking about how to handle file input operations including the end-of-file (EOF) marker for creating or editing files directly in the command line, I can guide you through creating or appending to a file using terminal commands.

### Creating a File with EOF Marker
To create a new file or overwrite an existing file with your NetworkPolicy content directly from the terminal, you can use the following method:

```bash
cat <<EOF > networkpolicy.yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: access-nginx # pick a name
spec:
  podSelector:
    matchLabels:
      app: nginx # selector for the pods
  ingress: # allow ingress traffic
  - from:
    - podSelector: # from pods
        matchLabels: # with this label
          access: granted
EOF
```

This command will start `cat` in "here document" mode, which allows input until the end-of-file marker `EOF` is reached. The content between the initial `cat <<EOF > networkpolicy.yaml` and the final `EOF` is written into the `networkpolicy.yaml` file.

### Applying the NetworkPolicy
Once you have the file ready (`networkpolicy.yaml`), you can apply it to your Kubernetes cluster with this command:

```bash
kubectl apply -f networkpolicy.yaml
```

This command tells `kubectl` to apply the configurations defined in `networkpolicy.yaml` to your Kubernetes cluster.

### Checking the Application of the NetworkPolicy
After applying the NetworkPolicy, you can confirm it's been applied correctly by listing all network policies in the `default` namespace:

```bash
kubectl get networkpolicy -n default
```

This will display all network policies that have been configured in the `default` namespace, including your new `internal-policy`.

These steps will help you create, apply, and verify the application of your Kubernetes NetworkPolicy directly from the command line. If you have any more questions or need further assistance with Kubernetes, feel free to ask!