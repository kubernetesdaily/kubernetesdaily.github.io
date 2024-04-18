---
title: "HA Cluster"
description: " Manage a Highly-Available Kubernetes Cluster "
slug: "HA Cluster"
weight: 810
---


Kubernetes utilizes a microservices architecture, with all requests initially directed to a central API server microservice, supported by various other components. For high availability in a Kubernetes cluster, it's common to add more control plane nodes, each hosting additional instances of the API Server, Scheduler, and Controller Manager. If etcd is part of the control plane nodes, additional members will also be added to the etcd cluster.

In a setup with multiple control plane nodes, several API Servers operate concurrently in a highly available configuration, all interfacing with the same etcd cluster. This setup ensures that client requests are processed consistently using the shared data. Communication with the API Servers is managed through a single endpoint, such as an external load balancer, which directs traffic to all API Server instances.

Other control plane components like the Scheduler and Controller Manager function on a failover basis. Among the instances of these microservices, one is elected as the active leader to handle all critical tasks. The other instances remain passive and only become active if the current leader fails.

High availability in the control plane is crucial but only part of achieving overall high availability in Kubernetes. For high availability of workloads, additional worker nodes might be necessary, and workloads should be configured to deploy multiple replicas that coordinate with each other.

Kubeadm simplifies the process of expanding your Kubernetes cluster by adding more nodes. To join a new node to the cluster, you first need to generate a join command that includes the API server's address, a unique join token, and the SHA hash of the cluster’s certificate authority (CA) certificate. This command can be generated using the following command on an existing control plane node:

```bash


kubeadm token create --print-join-command

kubeadm join 192.168.100.100:6443 --token 3ua85a.rl5riytxhvc7fs1e --discovery-token-ca-cert-hash sha256:3d239f1c87cac3549334a91ed24580bea67e96cf78a4a83b20371af1c973922f 

```

Run this command on any additional nodes that meet the prerequisites mentioned earlier in this module:

```
```
workernode@workernode:~$ sudo rm /etc/kubernetes/kubelet.conf
sudo rm /etc/kubernetes/bootstrap-kubelet.conf
sudo rm /etc/kubernetes/pki/ca.crt
workernode@workernode:~$ sudo ss -ltnp | grep :10250
LISTEN 0      4096               *:10250            *:*    users:(("kubelet",pid=23209,fd=20))       
workernode@workernode:~$ sudo systemctl stop kubelet
sudo systemctl disable kubelet
Removed /etc/systemd/system/multi-user.target.wants/kubelet.service.
workernode@workernode:~$ sudo kubeadm reset
W0418 18:46:14.265856   23698 preflight.go:56] [reset] WARNING: Changes made to this host by 'kubeadm init' or 'kubeadm join' will be reverted.
[reset] Are you sure you want to proceed? [y/N]: y
[preflight] Running pre-flight checks
W0418 18:46:15.832641   23698 removeetcdmember.go:106] [reset] No kubeadm config, using etcd pod spec to get data directory
[reset] Deleted contents of the etcd data directory: /var/lib/etcd
[reset] Stopping the kubelet service
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Deleting contents of directories: [/etc/kubernetes/manifests /var/lib/kubelet /etc/kubernetes/pki]
[reset] Deleting files: [/etc/kubernetes/admin.conf /etc/kubernetes/super-admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/bootstrap-kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf]

The reset process does not clean CNI configuration. To do so, you must remove /etc/cni/net.d

The reset process does not reset or clean up iptables rules or IPVS tables.
If you wish to reset iptables, you must do so manually by using the "iptables" command.

If your cluster was setup to utilize IPVS, run ipvsadm --clear (or similar)
to reset your system's IPVS tables.

The reset process does not clean your kubeconfig files and you must remove them manually.
Please, check the contents of the $HOME/.kube/config file.
workernode@workernode:~$ sudo kubeadm join 192.168.129.135:6443 --token dfs0h9.pru6ez9v84qbw98k --discovery-token-ca-cert-hash sha256:27e8c63c7355d79dd2b0dc98dadcd46e87b3ef05ab181caaddf2c1b2488ae474 
[preflight] Running pre-flight checks
	[WARNING Service-Kubelet]: kubelet service is not enabled, please run 'systemctl enable kubelet.service'
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

```
