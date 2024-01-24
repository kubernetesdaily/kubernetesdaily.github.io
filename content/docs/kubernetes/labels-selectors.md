---
title: "Labels and Selectors "
description: " Selectors Labels  "
slug: "Labels-and-Selectors"
weight : 760
---

#### Labels -  Maps (aka Dictionaries)

```sh
➜  k8s101 git:(main) ✗ kubectl explain deployment.metadata.labels
KIND:     Deployment
VERSION:  apps/v1

FIELD:    labels <map[string]string>

DESCRIPTION:
     Map of string keys and values that can be used to organize and categorize
     (scope and select) objects. May match selectors of replication controllers
     and services. More info: http://kubernetes.io/docs/user-guide/labels
```

- Labels are attached to Kubernetes objects and are simple key: value pairs or maps(dictionary). <br>
- Labels are used to store identifying information about a thing that you might need to query against. <br>
- Labels are used for organization and selection of subsets of objects, and can be added to objects at creation time and/or modified at any time during cluster operations. <br>
- You will see them on pods, replication controllers, replica sets, services, and so on. <br>

```sh
“labels”: {
“tier”: “frontend”
env: prod
}

```

#### Selectors -  Maps (aka Dictionaries)

- Labels are queryable — which makes them especially useful in organizing things <br>
-  A label selector is a string that identifies which labels you are trying to match <br>
- You will see them on pods, replication controllers, replica sets, services, and so on. <br>

``````sh
tier = frontend
tier != frontend
environment in (production, qa)
``````

#### Annotations
- Annotations are bits of useful information you might want to store about a pod (or cluster, node, etc.) that you will not have to query against.
- They are also key/value pairs and have the same rules as labels.
- Examples of things you might put there are the pager contact, the build date, or a pointer to more information someplace else—like a URL.

#### Method-1: Assign labels while creating a new object

```sh
kubectl create deployment label-nginx-example --image=nginx --dry-run=client -oyaml > label-nginx-example.yml
# clean up the template and add a label app: prod
```

```sh
➜ k8s101 git:(main) ✗  cat label-nginx-example.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: prod
  name: label-nginx-example
spec:
  replicas: 2
  selector:
    matchLabels:
      app: prod
  template:
    metadata:
      labels:
        app: prod
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f label-nginx-example.yml
deployment.apps/label-nginx-example created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get deployments --show-labels

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE   LABELS
label-nginx-example   1/1     1            1           23s   app=label-nginx-example
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                  READY   STATUS    RESTARTS   AGE   LABELS
label-nginx-example-848d6df75-x8bb6   1/1     Running   0          45s   app=label-nginx-example,pod-template-hash=848d6df75
➜  k8s101 git:(main) ✗ 

```


####  Assign a new label to existing pod runtime as a patch

will assign new label "tier: frontend" to our existing Pods from the deployment label-nginx-example

```sh
[root@controller ~]# cat update-label.yml
spec:
  template:
    metadata:
      labels:
        tier: frontend
```

### Next patch the deployment with this YAML file

```sh
➜  k8s101 git:(main) ✗ kubectl patch deployment label-nginx-example --patch "$(cat update-label.yml)"
deployment.apps/label-nginx-example patched
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe deployment label-nginx-example
Name:                   label-nginx-example
Namespace:              default
CreationTimestamp:      Tue, 07 Mar 2023 05:40:07 +0530
Labels:                 app=label-nginx-example
Annotations:            deployment.kubernetes.io/revision: 2
Selector:               app=label-nginx-example
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=label-nginx-example
           tier=frontend
  Containers:
   nginx:
    Image:        nginx
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   label-nginx-example-5f8bc677b9 (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  4m35s  deployment-controller  Scaled up replica set label-nginx-example-848d6df75 to 1
  Normal  ScalingReplicaSet  74s    deployment-controller  Scaled up replica set label-nginx-example-5f8bc677b9 to 1
  Normal  ScalingReplicaSet  70s    deployment-controller  Scaled down replica set label-nginx-example-848d6df75 to 0 from 1
➜  k8s101 git:(main) ✗ 
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                   READY   STATUS    RESTARTS   AGE     LABELS
label-nginx-example-5f8bc677b9-92lp9   1/1     Running   0          7m31s   app=label-nginx-example,pod-template-hash=5f8bc677b9,tier=frontend
```


####  Method-3: Assign a new label to existing deployments runtime using kubectl

I have another deployment nginx-deploy on my cluster, so I will assign label tier: backend to this deployment:

```sh
kubectl label deployment nginx-deploy tier=backend

kubectl get deployments --show-labels

```
####  Using labels to list resource objects

```sh
kubectl get pods --show-labels

kubectl get deployments --show-labels

kubectl get all --show-labels

--- #To list all the deployments using type: dev label:
kubectl get deployments -l type=dev

kubectl get pods -l app=prod
```

####  Using Selector to list resource objects

I will create another deployment here with two labels and use one of the label as selector:

```sh
# cat lab-nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: dev
    tier: backend
  name: lab-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dev
  template:
    metadata:
      labels:
        app: dev
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f lab-nginx.yml
deployment.apps/lab-nginx created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                   READY   STATUS    RESTARTS   AGE   LABELS
lab-nginx-84756b7fc4-8h2jr             1/1     Running   0          31s   app=dev,pod-template-hash=84756b7fc4
lab-nginx-84756b7fc4-pgxbr             1/1     Running   0          31s   app=dev,pod-template-hash=84756b7fc4
label-nginx-example-5f8bc677b9-92lp9   1/1     Running   0          14m   app=label-nginx-example,pod-template-hash=5f8bc677b9,tier=frontend
```

```sh
➜  k8s101 git:(main) ✗ 
kubectl get pods --selector "app=dev"
NAME                         READY   STATUS    RESTARTS   AGE
lab-nginx-84756b7fc4-8h2jr   1/1     Running   0          5m44s
lab-nginx-84756b7fc4-pgxbr   1/1     Running   0          5m44s
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods -l app=dev
NAME                         READY   STATUS    RESTARTS   AGE
lab-nginx-84756b7fc4-8h2jr   1/1     Running   0          6m47s
lab-nginx-84756b7fc4-pgxbr   1/1     Running   0          6m47s
```

#####  Removing labels

```
kubectl get pods --show-labels

kubectl get deployments --show-labels

```
