---
title: " 2.Basics of Pod "
description: " Kubectl explain pod  "
weight: 2
---


#### 0. What is POD learn via Kubectl Explain 


```sh
kubectl explain pod 
KIND:     Pod
VERSION:  v1

DESCRIPTION:
     Pod is a collection of containers that can run on a host. This resource is
     created by clients and scheduled onto hosts.

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
     Specification of the desired behavior of the pod. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Most recently observed status of the pod. This data may not be up to date.
     Populated by the system. Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


```


#### 1. Create a Pod from Nginx Image

```sh
➜  k8sworkshop git:(main) ✗ kubectl run nginx --image=nginx

pod/nginx created

➜ k8sworkshop git:(main) ✗ kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          25s

```
#### 2. Create a Pod and Expose a Port
```sh
➜  k8sworkshop git:(main) ✗ kubectl run nginx-port --image=nginx --port=80
pod/nginx-port created
➜  k8sworkshop git:(main) ✗ kubectl describe pod nginx-port
Name:             nginx-port
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Mon, 06 Mar 2023 01:44:56 +0530
Labels:           run=nginx-port
Annotations:      <none>
Status:           Running
IP:               172.17.0.4
IPs:
  IP:  172.17.0.4
Containers:
  nginx-port:
    Container ID:   docker://8260b161cc305d1cf4060dff9edbd0b05e86d9c4fc441b5a0a51b9dbe35403d3
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Mon, 06 Mar 2023 01:44:59 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-ffpjx (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-ffpjx:
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
  Normal  Scheduled  20s   default-scheduler  Successfully assigned default/nginx-port to minikube
  Normal  Pulling    20s   kubelet            Pulling image "nginx"
  Normal  Pulled     18s   kubelet            Successfully pulled image "nginx" in 2.236192917s
  Normal  Created    18s   kubelet            Created container nginx-port
  Normal  Started    18s   kubelet            Started container nginx-port
➜  k8sworkshop git:(main) ✗ 
```


#### 3. Output the Manifest File

```sh
kubectl run nginx --image=nginx --port=80 --dry-run=client -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```
alternative 


```sh
 kubectl run nginx --image=nginx --port=80 --dry-run=client -o yaml > ngnix.yaml
➜  k8sworkshop git:(main) ✗ ls
LICENSE           context           data              ngnix.yaml        package.json      styles
README.md         course.json       lessons           node_modules      pages             workshop
components        csv               next.config.js    package-lock.json public
➜  k8sworkshop git:(main) ✗ cat ngnix.yaml 
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
➜  k8sworkshop git:(main) ✗ 

```

#### 4. Delete PODS
```sh
 k8sworkshop git:(main) ✗ kubectl delete pod nginx
pod "nginx" deleted

➜  k8sworkshop git:(main) ✗ kubectl delete pod --all
pod "nginx-port" deleted
```


#### List the Worker Node
```sh
kubectl get nodes 
```
#### Create a new POD from Nginx Image
```sh
kubectl run mywebserver --image=nginx
```
#### List  the PODS that are currently running.
```sh
kubectl get pods
```
#### Connect inside the POD
```sh
kubectl exec -it mywebserver -- bash
```
You can come out of the POD with CTRL+D
```sh
kubectl exec -it mywebserver -- ls -l /
```
#### Delete the POD
```sh
kubectl delete pod mywebserver
```

##### pod-expose-port.yaml

```sh
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  -  image: nginx
     name: democontainer
     ports:
       - containerPort: 8080
```
```sh
kubectl apply -f pod-expose-port.yaml
```
```sh
kubectl get pods

kubectl describe pod nginx-pod

➜  k8sworkshop git:(main) ✗ kubectl explain pod.spec.containers.ports
KIND:     Pod
VERSION:  v1

RESOURCE: ports <[]Object>

DESCRIPTION:
     List of ports to expose from the container. Not specifying a port here DOES
     NOT prevent that port from being exposed. Any port which is listening on
     the default "0.0.0.0" address inside a container will be accessible from
     the network. Modifying this array with strategic merge patch may corrupt
     the data. For more information See
     https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.

     ContainerPort represents a network port in a single container.

FIELDS:
   containerPort        <integer> -required-
     Number of port to expose on the pod's IP address. This must be a valid port
     number, 0 < x < 65536.

   hostIP       <string>
     What host IP to bind the external port to.

   hostPort     <integer>
     Number of port to expose on the host. If specified, this must be a valid
     port number, 0 < x < 65536. If HostNetwork is specified, this must match
     ContainerPort. Most containers do not need this.

   name <string>
     If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
     named port in a pod must have a unique name. Name for the port that can be
     referred to by services.

   protocol     <string>
     Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
     Possible enum values:
     - `"SCTP"` is the SCTP protocol.
     - `"TCP"` is the TCP protocol.
     - `"UDP"` is the UDP protocol.

➜  k8sworkshop git:(main) ✗ 
```


### Finding a Pod’s Cluster IP

```sh
k8s101 git:(main) ✗ kubectl get pod -o wide
NAME         READY   STATUS    RESTARTS   AGE    IP           NODE       NOMINATED NODE   READINESS GATES
nginx-pod    1/1     Running   0          95s    172.17.0.7   minikube   <none>           <none>
nginx-port   1/1     Running   0          108m   172.17.0.3   minikube   <none>           <none>

```

### Finding a Service’s IP

We can find a Service IP using kubectl as well. In this case we will list all services in all namespaces:

```sh
➜  k8s101 git:(main) ✗ kubectl get service --all-namespaces

NAMESPACE              NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                  AGE
default                kubernetes                  ClusterIP   10.96.0.1       <none>        443/TCP                  114d
kube-system            kube-dns                    ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP,9153/TCP   114d
kube-system            metrics-server              ClusterIP   10.106.73.183   <none>        443/TCP                  36m
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.109.38.100   <none>        8000/TCP                 110m
kubernetes-dashboard   kubernetes-dashboard        ClusterIP   10.108.78.110   <none>        80/TCP                   110m
➜  k8s101 git:(main) ✗ 

```


```sh
➜  k8s101 git:(main) ✗ kubectl get pod nginx-pod  --template='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
8080

```

