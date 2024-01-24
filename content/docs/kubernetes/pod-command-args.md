---
title: "Create POD with Command and Arguments "
description: " Kubectl explain pod  "
slug: "Create-POD-with-Command-and-Arguments"
weight : 730
---

####  kubectl explain pods.spec.containers.command  

```sh
k8s101 git:(main) ✗ kubectl explain pods.spec.containers.command  
KIND:     Pod
VERSION:  v1

FIELD:    command <[]string>

DESCRIPTION:
     Entrypoint array. Not executed within a shell. The container image's
     ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME)
     are expanded using the container's environment. If a variable cannot be
     resolved, the reference in the input string will be unchanged. Double $$
     are reduced to a single $, which allows for escaping the $(VAR_NAME)
     syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
     Escaped references will never be expanded, regardless of whether the
     variable exists or not. Cannot be updated. More info:
     https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
➜  k8s101 git:(main) ✗ 
```

#### Create POD without any commands or arguments.
args in Kubernetes overrides CMD in the original docker image.
command in Kubernetes overrides ENTRYPOINT in the original docker image.

##### commands.yaml

```yml
apiVersion: v1
kind: Pod
metadata:
  name: command
spec:
  containers:
  -  image: busybox
     name: count
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
pod/command created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME         READY   STATUS             RESTARTS     AGE
command      0/1     CrashLoopBackOff   1 (5s ago)   15s
nginx-pod    1/1     Running            0            50m
nginx-port   1/1     Running            0            156m
webserver    1/1     Running            0            34m
➜  k8s101 git:(main) ✗ kubectl exec -it command -- bash

```

#### Create POD with Command

Modify the POD contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command2
spec:
  containers:
  -  image: busybox
     name: count
     command: ["sleep","3600"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
pod/command2 created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
command    1/1     Running   0          67s
➜  k8s101 git:(main) ✗ kubectl exec -it command2 -- sh
/ # ls
bin    dev    etc    home   lib    lib64  proc   root   sys    tmp    usr    var
/ # 
```

#### Create POD with Command and Arguments

Modify the YAML file contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command3
spec:
  containers:
  -  image: busybox
     name: count
     command: ["sleep"]
     args: ["3600"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml 
pod/command3 created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
command    1/1     Running   0          3m18s
command2   1/1     Running   0          2m34s
command3   1/1     Running   0          14s
```

#### Create POD with Arguments

Modify the YAML file contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command3
spec:
  containers:
  - name: command3
    image: debian
    command: ["printenv"]
    args: ["HOSTNAME", "KUBERNETES_PORT"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
➜  k8s101 git:(main) ✗ kubectl logs command3    
command3
tcp://10.96.0.1:443
```
