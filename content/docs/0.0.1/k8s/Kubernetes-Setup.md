---
title: " 1.Pre-requisit for this lab "
description: "  Multiple Way To creat Kubernetes cluster  "
weight: 1
---


### Install Minikube 

```sh
https://minikube.sigs.k8s.io/docs/start/
// i'm using mac so my installation step will be diffeent from you folks 

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube


```


### ceate cluster using minikube 


```sh
➜  k8sworkshop git:(main) ✗ minikube start    
😄  minikube v1.28.0 on Darwin 13.2.1 (arm64)
✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.25.3 on Docker 20.10.20 ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```
### check it out cluster information 

```

➜  k8sworkshop git:(main) ✗ kubectl cluster-info                                                                                   
Kubernetes control plane is running at https://127.0.0.1:51289
CoreDNS is running at https://127.0.0.1:51289/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
➜  k8sworkshop git:(main) ✗ 

```


#### some basic commands to understand minikube

```shell
minikube start
```

#### Access the Kubernetes dashboard running within the minikube cluster:

```shell
minikube dashboard
```

#### Once started, you can interact with your cluster using `kubectl`, just like any other Kubernetes cluster. For instance, starting a server:

```shell
kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
```

#### Exposing a service as a NodePort

```shell
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

#### minikube makes it easy to open this exposed endpoint in your browser:

```shell
minikube service hello-minikube
```

#### Upgrade your cluster:

```shell
minikube start --kubernetes-version=latest
```


```shell
minikube start -p cluster2
```

#### Stop your local cluster:

```shell
minikube stop
```

#### Delete your local cluster:

```shell
minikube delete
```

#### Delete all local clusters and profiles

```shell
minikube delete --all
```
