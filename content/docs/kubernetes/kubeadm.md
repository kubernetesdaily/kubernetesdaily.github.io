---
title: "kubeadm"
description: " Use Kubeadm to install a basic cluster "
slug: "kubeadm"
weight: 800
---

kubeadm is the reference installer for Kubernetes that sets up a minimally viable Kubernetes cluster using some best practices. It simplifies the initialization of control plane nodes, the addition (or removal) of nodes to a Kubernetes cluster, and also handles control plane and Kubelet configuration updates.

Kubeadm has a variety of commands and subcommands that will allow you to:
- Create a control plane kubeadm init
- Add a node kubeadm join
- Regenerate certificates kubeadm certificates renew
- Upgrade clusters kubeadm upgrade

A typical kubeadm setup consists of the following characteristics (which you are present in many Kubernetes distributions):
 - Control plane components (like the API Server or scheduler) running as pods
 - Certificate-based communication between the API server and its clients
 - kube-proxy to set up services
 - CoreDNS to provide in-cluster DNS
In order to successfully use Kubeadm, the node must have a kubelet and container runtime installed on the machine:

```

$ sudo apt-get update && sudo apt-get install -y kubelet kubeadm kubectl

```

Once installed, kubeadm init will initialize a control plane for your cluster.

```
$ sudo kubeadm init --cri-socket=unix:///var/run/containerd/containerd.sock

[init] Using Kubernetes version: v1.26.0
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster

...

Your Kubernetes control-plane has initialized successfully!


```