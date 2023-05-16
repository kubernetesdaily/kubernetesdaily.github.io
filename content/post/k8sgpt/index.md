+++
author = "Sangam Biradar"
categories = ["Kubernetes", "2023"]
weight = 15
description = " Kubernetes + OpenAI = k8sgpt "
draft = true
slug = " K8sGPT gives Kubernetes Superpowers to everyone "
tags = ["DevOps", "kubernetes", "Networking"]
title = " K8sGPT : K8s Superpower to everyone "
[cover]
image = "k8sgpt.png"

+++

### Install k8sgpt ai 

```
  ~ brew tap k8sgpt-ai/k8sgpt
==> Tapping k8sgpt-ai/k8sgpt
Cloning into '/opt/homebrew/Library/Taps/k8sgpt-ai/homebrew-k8sgpt'...
remote: Enumerating objects: 86, done.
remote: Counting objects: 100% (86/86), done.
remote: Compressing objects: 100% (85/85), done.
remote: Total 86 (delta 51), reused 2 (delta 0), pack-reused 0
Receiving objects: 100% (86/86), 18.77 KiB | 6.26 MiB/s, done.
Resolving deltas: 100% (51/51), done.
Tapped 1 formula (14 files, 37.8KB).
➜  ~ brew install k8sgpt
==> Fetching k8sgpt-ai/k8sgpt/k8sgpt
==> Downloading https://github.com/k8sgpt-ai/k8sgpt/releases/download/v0.3.0/k8sgpt_Darwin_arm64.tar.gz
==> Downloading from https://objects.githubusercontent.com/github-production-release-asset-2e65be/617152691/d9f59995-7f6
################################################################################################################# 100.0%
==> Installing k8sgpt from k8sgpt-ai/k8sgpt
🍺  /opt/homebrew/Cellar/k8sgpt/0.3.0: 6 files, 55.5MB, built in 1 second
==> Running `brew cleanup k8sgpt`...

```

### K8s filters list 

```
k8sgpt filters list
Active: 
> Pod
> PersistentVolumeClaim
> StatefulSet
> CronJob
> Deployment
> ReplicaSet
> Service
> Ingress
> Node
Unused: 
> NetworkPolicy
> HorizontalPodAutoScaler
> PodDisruptionBudget
 
```

### How K8sGPT works ?

K8sGPT uses analyzers to triage and diagnose issues in your cluster. It has a set of analyzers that are built in, but you will be able to write your own analyzers.

Built in analyzers

Enabled by default

- podAnalyzer 
  https://github.com/k8sgpt-ai/k8sgpt/blob/main/pkg/analyzer/pod.go
   - search all namespaces for pods that are not running
   - Check through container status to check for crashes or unready
   - a container that is still being created or blocked due to conditions such as OOMKilled
   - when pod is Running but its ReadinessProbe fails

- pvcAnalyzer  
   - PersistentVolumeClaim.ObjectMeta 
   - Error: value.FailureDetails
- rsAnalyzer
   - Status of replicaset 
   - type of event 
   - reason of failure 

  ```
   Events:
  Type    Reason            Age   From                   Message
  ----    ------            ----  ----                   -------
  Normal  SuccessfulCreate  117s  replicaset-controller  Created pod: frontend-wtsmm
  Normal  SuccessfulCreate  116s  replicaset-controller  Created pod: frontend-b2zdv
  Normal  SuccessfulCreate  116s  replicaset-controller  Created pod: frontend-vcmts
  ```
- serviceAnalyzer
  - Service existed or not 
  - Service has not ready endpoints 
- eventAnalyzer
   - the function loops through the list of events to find the most recent one. It initializes a pointer to the latest event as nil, and then compares each event's LastTimestamp field to the current latest event's LastTimestamp. If the current event has a later LastTimestamp, the function updates the latestEvent pointer to point to that event instead.

   - Finally, the function returns a pointer to the latest event found, or an error if there was a problem fetching the events from the Kubernetes API.

  - Overall, this function is useful for retrieving the most recent event associated with a Kubernetes object, which can be helpful in monitoring and troubleshooting the state of Kubernetes resources.

- ingressAnalyzer
   - checks if the Ingress is using TLS encryption and extracts the list of hostnames associated with the Ingress.
   - implementation is specifically responsible for extracting and organizing relevant information from Kubernetes Ingress resources to generate descriptions about them.
- statefulSetAnalyzer
   - check StatefulSet uses the service namespace and servicename which does not exist 
   - The volumeClaimTemplates will provide stable storage using PersistentVolumes provisioned by a PersistentVolume Provisioner.

- deploymentAnalyzer
  - DeploymentAnalyzer is an analyzer that checks for misconfigured Deployments from all namespaces
- cronJobAnalyzer
  - Check CRON schedule format
- networkPolicyAnalyzer
  -  Check if policy allows traffic to all pods in the namespace
  -  Check if policy is not applied to any pods
- nodeAnalyzer

> Conditions

The conditions field describes the status of all Running nodes. Examples of conditions include:

| Node Condition | Description |
| ---------------|-------------- |
| Ready |	True if the node is healthy and ready to accept pods, False if the node is not healthy and is not accepting pods, and Unknown if the node controller has not heard from the node in the last node-monitor-grace-period (default is 40 seconds) |
| DiskPressure |	True if pressure exists on the disk size—that is, if the disk capacity is low; otherwise False |
| MemoryPressure | True if pressure exists on the node memory—that is, if the node memory is low; otherwise False |
| PIDPressure | True if pressure exists on the processes—that is, if there are too many processes on the node; otherwise False | 
NetworkUnavailable	| True if the network for the node is not correctly configured, otherwise False |



  - In the Kubernetes API, a node's condition is represented as part of the .status of the Node resource. For example, the following JSON structure describes a healthy node:

```
  "conditions": [
  {
    "type": "Ready",
    "status": "True",
    "reason": "KubeletReady",
    "message": "kubelet is posting ready status",
    "lastHeartbeatTime": "2023-06-05T18:38:35Z",
    "lastTransitionTime": "2023-06-05T11:41:27Z"
  }
]

```


### start minikube 

```
➜  ~ minikube start     
😄  minikube v1.30.0 on Darwin 13.3.1 (arm64)
🎉  minikube 1.30.1 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.30.1
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
❗  Image was not built for the current minikube version. To resolve this you can delete and recreate your minikube cluster using the latest images. Expected minikube version: v1.29.0 -> Actual minikube version: v1.30.0
🐳  Preparing Kubernetes v1.26.3 on Docker 23.0.2 ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
💡  After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
    ▪ Using image registry.k8s.io/ingress-nginx/controller:v1.7.0
🔎  Verifying ingress addon...
🌟  Enabled addons: storage-provisioner, default-storageclass, ingress
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
➜  ~               

```

### deploy simple guestbook app 

```
➜  kubectl run nginx --image=nginx:5.0.0 --restart=Never

pod/nginx created


```

```
~ k8sgpt analyze   
Service kube-system/k8s.io-minikube-hostpath does not exist

0 default/nginx(nginx)
- Error: Back-off pulling image "nginx:5.0.0"

```


K8sGPT is a tool for scanning your Kubernetes clusters, diagnosing and triaging issues in simple English. It has SRE experience codified into it's analyzers and helps to pull out the most relevant information to enrich it with AI.

> Here are some of the features of K8sGPT:

- Scans your Kubernetes clusters for common problems and issues.
Diagnoses and triages issues in simple English.
- Helps to pull out the most relevant information to enrich it with AI.
Is constantly being updated to keep up with the latest Kubernetes releases.
K8sGPT is a valuable tool for any Kubernetes administrator or developer. It can help you to identify and resolve issues quickly and easily, and it can help you to improve the performance and reliability of your Kubernetes clusters.

> Here are some of the benefits of using K8sGPT:

- Increased uptime and reliability: K8sGPT can help you to identify and resolve issues quickly and easily, which can help to increase the uptime and reliability of your Kubernetes clusters.
- Improved performance: K8sGPT can help you to identify and optimize performance bottlenecks, which can help to improve the performance of your Kubernetes clusters.
Reduced costs: K8sGPT can help you to reduce the cost of operating your Kubernetes clusters by identifying and eliminating unnecessary resources.
- If you are a Kubernetes administrator or developer, I encourage you to try K8sGPT. It is a valuable tool that can help you to improve the performance, reliability, and security of your Kubernetes clusters.




