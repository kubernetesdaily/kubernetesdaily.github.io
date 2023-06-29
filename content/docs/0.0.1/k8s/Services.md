---
title: "7.Kubernetes Service  "
description: " Use Cases for Multi-Container Pods  "
weight: 7
---

#### kubectl explain svc 

```sh
➜  k8s101 git:(main) ✗ kubectl explain svc
KIND:     Service
VERSION:  v1

DESCRIPTION:
     Service is a named abstraction of software service (for example, mysql)
     consisting of local port (for example 3306) that the proxy listens on, and
     the selector that determines which pods will answer requests sent through
     the proxy.

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
     Spec defines the behavior of a service.
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Most recently observed status of the service. Populated by the system.
     Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


```

#### Create Kubernetes Service

A Kubernetes Service is an object you create to provide a single, stable access point to a set of pods that provide the same service. <br>

A service can be backed by more than one pod. When you connect to a service, the connection is passed to one of the backing pods. <br>

Add labels to Pod objects and specify the label selector in the Service object. The pods whose labels match the selector are part of the service registered service endpoints. <br>

- The shorthand for services is svc  <br>

#### Understanding different Kubernetes Service Types

- ClusterIP: It is the default type, but it provides internal access only. <br>

- NodePort: which allocates a specific node port which needs to be opened on the firewall. That means that by using these node ports, external users, as long as they can reach out to the nodes' IP addresses, are capable of reaching out to the Service.
<br>
- LoadBalancer: currently only implemented in public cloud. So if you're on Kubernetes in Azure or AWS, you will find a load balancer. <br>

- ExternalName: which is a relatively new object that works on DNS names and redirection is happening at the DNS level.
Service without selector: which is used for direct connections based on IP port combinations without an endpoint. And this is useful for connections to a database or between namespaces.
<br>

#### Using kubectl expose

The easiest way to create a service is through kubectl expose

```sh
kubectl create deployment nginx-lab-1 --image=nginx --replicas=3 --dry-run=client -o yaml > nginx-lab-1.yml

---- # modify few sections and following is my final template file to create a new deployment nginx-lab-1 with a label app=dev and 3 replicas.
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: dev
  name: nginx-lab-1
spec:
  replicas: 3
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

---
# cat quote for pod
apiVersion: v1
kind: Service
metadata:
  name: quote
spec:
  type: ClusterIP
  selector:
    app: quote
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP

```

```
➜  k8s101 git:(main) ✗ kubectl create -f nginx-lab-1.yml
deployment.apps/nginx-lab-1 created
service/quote created

```

#### To create the service, you’ll tell Kubernetes to expose the Deployment you created earlier, here port 80 is the default port on which our nginx application would be listening on.

```sh
➜  k8s101 git:(main) ✗ kubectl expose deployment nginx-lab-1 --type=NodePort --port=80
service/nginx-lab-1 exposed
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe svc nginx-lab-1
Name:                     nginx-lab-1
Namespace:                default
Labels:                   app=dev
Annotations:              <none>
Selector:                 app=dev
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.98.242.63
IPs:                      10.98.242.63
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31613/TCP
Endpoints:                172.17.0.13:80,172.17.0.14:80,172.17.0.15:80 + 2 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

```

##### Accessing cluster-internal services

- The ClusterIP services you created in the previous section are accessible only within the cluster, from other pods and from the cluster nodes. <br>
- use the kubectl exec command to run a command like curl in an existing pod and get it to connect to the service. <br>

To use the service from a pod, run a shell in the quote-001
 In my case, the quiz service uses cluster IP 10.99.118.40, whereas the quote service uses IP 10.98.242.63


#### Access container outsusteride the clluster 

Now to access the container externally from the outside network we can use the public IP of individual worker node along with the NodePort

curl https://<PUBLIC-IP>:<NODE-PORT>

```sh
kubectl get pods -o wide

```
#### Creating a service through a YAML descriptor

```sh
[root@controller ~]# cat 2048.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: "2048-deployment"
spec:
  selector:
    matchLabels:
      app: "2048"
  replicas: 5
  template:
    metadata:
      labels:
        app: "2048"
    spec:
      containers:
      - image: alexwhen/docker-2048
        imagePullPolicy: Always
        name: "2048"
        ports:
        - containerPort: 80
          protocol: TCP
-- ##### Creating a NodePort service
apiVersion: v1
kind: Service
metadata:
  name: myservice
  labels:
    app: servicelabel
spec:
  type: NodePort
  ports:
  - port: 80
  selector:
    app: "2048"
```  

```sh
kubectl create -f 2048.yml
```


```sh
➜  k8s101 git:(main) ✗ kubectl get pods -o wide
NAME                                   READY   STATUS    RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
2048-deployment-9ccbf58bd-57tng        1/1     Running   0          50s     172.17.0.12   minikube   <none>           <none>
2048-deployment-9ccbf58bd-78pnr        1/1     Running   0          50s     172.17.0.14   minikube   <none>           <none>
2048-deployment-9ccbf58bd-mbfrt        1/1     Running   0          50s     172.17.0.13   minikube   <none>           <none>
2048-deployment-9ccbf58bd-tfcnd        1/1     Running   0          50s     172.17.0.9    minikube   <none>           <none>
2048-deployment-9ccbf58bd-trxqw        1/1     Running   0          50s     172.17.0.11   minikube   <none>           <none>
kube-ops-view-5b596b7c7d-z2p2v         1/1     Running   0          7h37m   172.17.0.17   minikube   <none>           <none>
kube-ops-view-redis-6dc75f67cd-klhpf   1/1     Running   0          7h37m   172.17.0.16   minikube   <none>           <none>
lab-nginx-84756b7fc4-4qctt             1/1     Running   0          7h37m   172.17.0.19   minikube   <none>           <none>
lab-nginx-84756b7fc4-rhg4m             1/1     Running   0          7h37m   172.17.0.18   minikube   <none>           <none>
label-nginx-example-5f8bc677b9-6trt6   1/1     Running   0          7h37m   172.17.0.20   minikube   <none>           <none>
my-release-kubeview-f7447cf6c-2w85w    1/1     Running   0          7h37m   172.17.0.21   minikube   <none>           <none>
nginx-1-ff5997cdf-kpff9                1/1     Running   0          7h37m   172.17.0.7    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-77kvz           1/1     Running   0          7h37m   172.17.0.8    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-r9cmt           1/1     Running   0          7h37m   172.17.0.4    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-sqbf4           1/1     Running   0          7h37m   172.17.0.10   minikube   <none>           <none>

```
```sh
➜  k8s101 git:(main) ✗ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        31m
myservice    NodePort    10.111.94.141   <none>        80:31487/TCP   2m55s
```
```sh
➜  k8s101 git:(main) ✗ kubectl describe service myservice 
Name:                     myservice
Namespace:                default
Labels:                   app=servicelabel
Annotations:              <none>
Selector:                 app=2048
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.111.94.141
IPs:                      10.111.94.141
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31487/TCP
Endpoints:                172.17.0.11:80,172.17.0.12:80,172.17.0.13:80 + 2 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
➜  k8s101 git:(main) ✗ 

```

##### Accessing a NodePort service

```
➜  k8s101 git:(main) ✗ minikube service myservice 
|-----------|-----------|-------------|---------------------------|
| NAMESPACE |   NAME    | TARGET PORT |            URL            |
|-----------|-----------|-------------|---------------------------|
| default   | myservice |          80 | http://192.168.49.2:31487 |
|-----------|-----------|-------------|---------------------------|
🏃  Starting tunnel for service myservice.
|-----------|-----------|-------------|------------------------|
| NAMESPACE |   NAME    | TARGET PORT |          URL           |
|-----------|-----------|-------------|------------------------|
| default   | myservice |             | http://127.0.0.1:60323 |
|-----------|-----------|-------------|------------------------|
🎉  Opening service default/myservice in default browser...
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```




