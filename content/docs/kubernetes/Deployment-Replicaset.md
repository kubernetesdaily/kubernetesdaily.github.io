---
title: "Deployments and replication"
description: " Use Cases for Multi-Container Pods  "
slug: "Deployments-and-replication"
weight: 11
---


#### Kubectl explain Deployment 

```sh
k8sworkshop git:(main) ✗ kubectl explain deployments
KIND:     Deployment
VERSION:  apps/v1

DESCRIPTION:
     Deployment enables declarative updates for Pods and ReplicaSets.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Specification of the desired behavior of the Deployment.

   status       <Object>
     Most recently observed status of the Deployment.

➜  k8sworkshop git:(main) ✗ 

```



#### Kubectl explain Replicaset 

```sh
➜  k8sworkshop git:(main) ✗ kubectl explain rs
KIND:     ReplicaSet
VERSION:  apps/v1

DESCRIPTION:
     ReplicaSet ensures that a specified number of pod replicas are running at
     any given time.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     If the Labels of a ReplicaSet are empty, they are defaulted to be the same
     as the Pod(s) that the ReplicaSet manages. Standard object's metadata. More
     info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Spec defines the specification of the desired behavior of the ReplicaSet.
     More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Status is the most recently observed status of the ReplicaSet. This data
     may be out of date by some window of time. Populated by the system.
     Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

➜  k8sworkshop git:(main) ✗ 
```

#### Overview on Kubernetes Deployment

Kubernetes also provides Deployment resource that sits on top of ReplicaSets and enables declarative application updates. 

- When running Pods in datacenter, additional features may be needed such as scalability, updates and rollback etc which are offered by Deployments  <br>

- A Deployment is a higher-level resource meant for deploying applications and updating them declaratively, instead of doing it through a 
ReplicationController or a ReplicaSet, which are both considered lower-level concepts.
 <br>
- When you create a Deployment, a ReplicaSet resource is created underneath. Replica-Sets replicate and manage pods, as well. <br>

- When using a Deployment, the actual pods are created and managed by the Deployment’s ReplicaSets, not by the Deployment directly  <br>

##### Create Kubernetes Deployment resource

In the deployment spec, following properties are managed:

- `replicas`: explains how many copies of each Pod should be running  <br>
- `strategy`: explains how Pods should be updated  <br>
- `selector`: uses matchLabels to identify how labels are matched against the Pod <br>
- `template`: contains the pod specification and is used in a deployment to create Pods <br>
- `scale` deployment: `kubectl scale deployment nginx-deployment --replicas 10`  <br>
- `set image` : `kubectl set image deployment nginx-deployment nginx=nginx:1.91 --record`  <br>
- `rollout undo`:` kubectl rollout undo deployment nginx-deployment`  <br>

we will create a new deployment using kubectl using --dry-run so that actually a deployment is not created but just verified

```sh
➜ k8sworkshop git:(main) ✗ kubectl create deployment nginx-deploy --image=nginx --dry-run=client -o yaml > nginx-deploy.yml

-- Basic Template to cleanup

[root@controller ~]# cat nginx-deploy.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx-deploy
  name: nginx-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-deploy
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx-deploy
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}

--- #Modify the contents of the deployment template
# cat nginx-deploy.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    type: dev
  name: nginx-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      type: dev
  template:
    metadata:
      labels:
        type: dev
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8sworkshop git:(main) ✗ kubectl create -f nginx-deploy.yml
deployment.apps/nginx-deploy created

```
```sh
➜  k8sworkshop git:(main) ✗ kubectl rollout status deployment nginx-deploy
deployment "nginx-deploy" successfully rolled out
```

```sh
➜  k8sworkshop git:(main) ✗ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
nginx-deploy-66dc98fc6f-6ws8k   1/1     Running   0          37s
nginx-deploy-66dc98fc6f-btk6j   1/1     Running   0          37s
```
```sh
kubectl describe Pod <NAME>
➜  k8sworkshop git:(main) ✗ kubectl describe Pod nginx-deploy-66dc98fc6f-6ws8k 
Name:             nginx-deploy-66dc98fc6f-6ws8k
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Tue, 07 Mar 2023 02:12:20 +0530
Labels:           pod-template-hash=66dc98fc6f
                  type=dev
Annotations:      <none>
Status:           Running
IP:               172.17.0.4
IPs:
  IP:           172.17.0.4
Controlled By:  ReplicaSet/nginx-deploy-66dc98fc6f
Containers:
  nginx:
    Container ID:   docker://79a285bd1e02d96c1880958d20aa4cf64060c630ecb03dac37665994a8b4574a
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Tue, 07 Mar 2023 02:12:25 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7wpgb (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-7wpgb:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  93s   default-scheduler  Successfully assigned default/nginx-deploy-66dc98fc6f-6ws8k to minikube
  Normal  Pulling    92s   kubelet            Pulling image "nginx"
  Normal  Pulled     88s   kubelet            Successfully pulled image "nginx" in 4.282948252s
  Normal  Created    88s   kubelet            Created container nginx
  Normal  Started    88s   kubelet            Started container nginx
➜  k8sworkshop git:(main) ✗ 
```
```sh
➜  k8sworkshop git:(main) ✗ kubectl get rs
NAME                      DESIRED   CURRENT   READY   AGE
nginx-deploy-66dc98fc6f   2         2         2       3m30s
```

##### Using Kubernetes RollingUpdate

You have two ways of updating all those pods. You can do one of the following:

- Recreate: Delete all existing pods first and then start the new ones. This will lead to a temporary unavailability. <br>
- RollingUpdate: Updates Pod one at a time to guarantee availability of the application. This is the preferred approach and you can further tune its behaviour.

The RollingUpdate strategy options are used to guarantee a certain minimal and maximal amount of Pods to be always available:

- maxUnavailable: The maximum number of Pods that can be unavailable during updating. The value could be a percentage (the default is 25%).
- maxSurge: The maximum number of Pods that can be created over the desired number of ReplicaSet during updating.  the value of maxSurge cannot be 0


```sh
vim rolling-nginx.yml
----
# cat rolling-nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-nginx
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: rolling-nginx
  template:
    metadata:
      labels:
        app: rolling-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.9
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f rolling-nginx.yml
deployment.apps/rolling-nginx created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME                             READY   STATUS              RESTARTS   AGE
nginx-deploy-66dc98fc6f-6ws8k    1/1     Running             0          15m
nginx-deploy-66dc98fc6f-btk6j    1/1     Running             0          15m
rolling-nginx-77f89bcf9c-2cgps   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-l7cvh   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-nx888   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-xn2z5   0/1     ContainerCreating   0          13s
```
```sh
➜  k8s101 git:(main) ✗ kubectl get deployments
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy    2/2     2            2           15m
rolling-nginx   1/4     4            1           50s
```
```sh
➜  k8s101 git:(main) ✗ kubectl get event --field-selector involvedObject.name=rolling-nginx-77f89bcf9c-xn2z5 
LAST SEEN   TYPE     REASON      OBJECT                               MESSAGE
99s         Normal   Scheduled   pod/rolling-nginx-77f89bcf9c-xn2z5   Successfully assigned default/rolling-nginx-77f89bcf9c-xn2z5 to minikube
99s         Normal   Pulling     pod/rolling-nginx-77f89bcf9c-xn2z5   Pulling image "nginx:1.9"
43s         Normal   Pulled      pod/rolling-nginx-77f89bcf9c-xn2z5   Successfully pulled image "nginx:1.9" in 56.078369942s
43s         Normal   Created     pod/rolling-nginx-77f89bcf9c-xn2z5   Created container nginx
43s         Normal   Started     pod/rolling-nginx-77f89bcf9c-xn2z5   Started container nginx
```
#### Check rollout history

But why CHANGE-CAUSE is showing NONE? It is because we have not used --record while creating our deployment. 
The --record argument will add the command under CHANGE-CAUSE for each revision history
```sh
 k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         <none>

➜  k8s101 git:(main) ✗ kubectl delete deployment rolling-nginx
deployment.apps "rolling-nginx" deleted
```

#### this time I will use --record along with kubectl create:

```sh
k8s101 git:(main) ✗ kubectl create -f rolling-nginx.yml --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx created
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=rolling-nginx.yml --record=true
```
```sh
➜  k8s101 git:(main) ✗ kubectl set image deployment rolling-nginx nginx=nginx:1.15 --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx image updated
```
#### Monitor the rolling update status

To monitor the rollout status you can use:

```sh
➜  k8s101 git:(main) ✗ kubectl set image deployment rolling-nginx nginx=nginx:1.16 --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx image updated
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout pause deployment rolling-nginx
deployment.apps/rolling-nginx paused
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout status deployment rolling-nginx
deployment "rolling-nginx" successfully rolled out
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods -l app=rolling-nginx
NAME                             READY   STATUS    RESTARTS   AGE
rolling-nginx-55fc56899f-8hlm4   1/1     Running   0          2m30s
rolling-nginx-55fc56899f-g4b6p   1/1     Running   0          2m30s
rolling-nginx-55fc56899f-hnbs8   1/1     Running   0          2m22s
rolling-nginx-55fc56899f-jngcd   1/1     Running   0          2m21s
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout resume deployment rolling-nginx
deployment.apps/rolling-nginx resumed
```

#### Rolling back (undo) an update
To monitor the rollout status you can use:

```sh
➜  k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=rolling-nginx.yml --record=true
2         kubectl set image deployment rolling-nginx nginx=nginx:1.15 --record=true
3         kubectl set image deployment rolling-nginx nginx=nginx:1.16 --record=true
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout undo deployment rolling-nginx --to-revision=2
deployment.apps/rolling-nginx rolled back
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout status deployment rolling-nginx
deployment "rolling-nginx" successfully rolled out

```

```sh
➜  k8s101 git:(main) ✗ kubectl delete pod --all 
pod "nginx-deploy-66dc98fc6f-6ws8k" deleted
pod "nginx-deploy-66dc98fc6f-btk6j" deleted
pod "rolling-nginx-b746d459b-874mv" deleted
pod "rolling-nginx-b746d459b-gtgpk" deleted
pod "rolling-nginx-b746d459b-txc5j" deleted
pod "rolling-nginx-b746d459b-vw4rf" deleted
➜  k8s101 git:(main) ✗ kubectl delete deployment --all 
deployment.apps "nginx-deploy" deleted
deployment.apps "rolling-nginx" deleted
```
