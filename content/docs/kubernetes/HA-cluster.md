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

