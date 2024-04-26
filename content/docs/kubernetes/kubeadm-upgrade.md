---
title: "kubeadm upgrade & downgrade "
description: " Perform Version Upgrades on a Kubernetes Cluster using kubeadm"
weight: 5
---


Perform Version Upgrades on a Kubernetes Cluster using kubeadm

Upgrading a Kubernetes cluster involves updating its core components, which include the Kubernetes API Server, Scheduler, Controller Manager, etcd, and Kubelets. Kubeadm simplifies this process by managing the container versions of these control plane components. Additional tasks such as renewing certificates and updating kubelet configurations are also handled by Kubeadm, utilizing the kubeadm upgrade commands.

When planning an upgrade, you must first decide on the target version. Updates to major APIs typically accompany minor version releases (e.g., from 1.25 to 1.26), while patch releases (e.g., 1.26.0 to 1.26.1) focus on fixes and security enhancements. It's important to note that Kubeadm supports upgrading only one minor version at a time. For instance, to upgrade from version 1.24 to 1.26, you must first upgrade to 1.25 and then proceed to 1.26. The version of the kubeadm tool itself dictates the highest Kubernetes version to which you can upgrade (e.g., kubeadm 1.25.0 cannot upgrade a cluster to Kubernetes 1.26.0).

The upgrade process of the control-plane node involves several key steps:
1. Obtain the latest Kubernetes binaries.
2. Install the newer kubeadm version.
3. Use kubeadm upgrade plan to review and acquire the latest versions of the control plane components.
4. Execute the upgrade.
5. Update the kubelet and kubectl installations on the node.

During the upgrade, it may be necessary to drain the node of reschedulable workloads using `kubectl drain`, ensuring to uncordon the node afterward with `kubectl uncordon` to allow workloads to return.

Here's how to upgrade a Kubernetes control plane node from v1.25.0 to v1.26.0 on Ubuntu 20.04:
- Begin by updating the apt repository.

```

$ sudo apt update

sudo apt install kubeadm=1.26.0-00

```

### check upgrade plan


```
sudo kubeadm upgrade plan
…
Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT   CURRENT       AVAILABLE
kubelet                1 x v1.25.0     v1.26.0

Upgrade to the latest stable version:

COMPONENT                   CURRENT   AVAILABLE
kube-apiserver                   v1.25.0   v1.26.0
kube-controller-manager   v1.25.0   v1.26.0
kube-scheduler                  v1.25.0   v1.26.0
kube-proxy                         v1.25.0   v1.26.0
CoreDNS                           1.6.7        1.7.0
etcd                                    3.5.3-0   3.5.5-1

You can now apply the upgrade by executing the following command:
kubeadm upgrade apply v1.26.0

Note: Before you can perform this upgrade, you have to update kubeadm to v1.26.0.

_____________________________________________________________________


The table below shows the current state of component configs as understood by this version of kubeadm.
Configs that have a "yes" mark in the "MANUAL UPGRADE REQUIRED" column require manual config upgrade or
resetting to kubeadm defaults before a successful upgrade can be performed. The version to manually
upgrade to is denoted in the "PREFERRED VERSION" column.

API GROUP                 CURRENT VERSION   PREFERRED VERSION   MANUAL UPGRADE REQUIRED
kubeproxy.config.k8s.io   v1alpha1          v1alpha1            no
kubelet.config.k8s.io     v1beta1           v1beta1             no
_____________________________________________________________________

```
### use upgrade command 

```
sudo kubeadm upgrade apply v1.26.0
…
[upgrade/successful] SUCCESS! Your cluster was upgraded to "v1.26.0". Enjoy!

[upgrade/kubelet] Now that your control plane is upgraded, please proceed with upgrading your kubelets if you haven't already done so.

```

##### update to desire version 

```

sudo apt install kubelet=1.26.0-00 kubectl=1.26.0-00
…
Setting up kubelet (1.26.0-00) ...
Setting up kubectl (1.26.0-00) ...
```