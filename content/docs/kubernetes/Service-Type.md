---
title: "Service Type - NodePort,ClusterIP,LoadBalancer "
description: " kubernetes Service "
slug: "Service-Type-NodePort,ClusterIP,LoadBalancer"
weight : 14
---

#### Service Type1: NodePort

NodePort service helps expose the Service on each Node’s IP at a static port (the NodePort). NodePort The port is available to all the workers in the cluster. A ClusterIP Service, to which the NodePort Service routes are automatically created. One would be able to contact the NodePort Service, from outside the cluster, by requesting <NodeIP>:<NodePort>.
The port on the POD is called the targetPort and the one connecting the NodePort service to the POD is called port.
All this means if any request coming into port 30080 to the cluster on any worker node will be forwarded to the “Node Port Service,” which in turn will forward the request to the underlying Pod at port 80.


Let’s start with creating a deployment using the YAML file below. Some key things to note, each container is using the port 80 and has a label called app:nginx


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: my-nginx-deploy
    labels:
        app: nginx
spec:
    replicas: 2
    selector:
        matchLabels:
            app: nginx
    template:
        metadata:
            labels:
                app: nginx
        spec:
            containers:
            - name: test-nginx
              image: nginx:alpine
              ports:
              - containerPort: 80

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f my-nginx-deploy.yml
deployment.apps/my-nginx-deploy created
➜  k8s101 git:(main) ✗ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
my-nginx-deploy-5c9989fcf4-pqpgj       1/1     Running   0          17s
my-nginx-deploy-5c9989fcf4-zkq8p       1/1     Running   0          17s
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-pqpgj  | grep -i IP: | head -1
IP:               172.17.0.22

➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-zkq8p  | grep -i IP: | head -1
IP:               172.17.0.15
```

```sh
kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
my-nginx-deploy-6b5d6b54bc-7pbmk   1/1     Running   0          7m47s
my-nginx-deploy-6b5d6b54bc-glhnt   1/1     Running   0          7m47s
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-pqpgj  | grep -i IP: | head -1
IP:               172.17.0.22
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-zkq8p  | grep -i IP: | head -1
IP:               172.17.0.15
➜  k8s101 git:(main) ✗ kubectl exec my-nginx-deploy-5c9989fcf4-pqpgj -it sh  
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
/ # apk add curl
fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/main/aarch64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/community/aarch64/APKINDEX.tar.gz
OK: 43 MiB in 62 packages
/ # curl http://172.17.0.22:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
/ # exit 
```

So how do we reach the PODs externally?
To reach the pods from outside the cluster, one needs to expose the port on the host machine to redirect the traffic to a port of the container. NodePort Service provides that capability.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
      # By default the `targetPort` is set to the same value as the `port` field.
    - port: 80
      targetPort: 80
      # Optional field
      # By default and for convenience, the Kubernetes control plane will allocate a port from a range (default: 30000-32767)
      nodePort: 30007
```

```
kubectl apply -f nodeport.yml
service/my-service created
kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
my-service   NodePort    10.110.8.243   <none>        80:30007/TCP   12m
```


NodePort service created has a virtual IP (10.110.8.243) assigned to it called ClusterIp, using which it can be accessed internally. To access the service, since we are using minikube, let’s see where the service is hosted for external usage.

```sh
  k8s101 git:(main) ✗ minikube service my-service          
|-----------|------------|-------------|---------------------------|
| NAMESPACE |    NAME    | TARGET PORT |            URL            |
|-----------|------------|-------------|---------------------------|
| default   | my-service |          80 | http://192.168.49.2:30007 |
|-----------|------------|-------------|---------------------------|
🏃  Starting tunnel for service my-service.
|-----------|------------|-------------|------------------------|
| NAMESPACE |    NAME    | TARGET PORT |          URL           |
|-----------|------------|-------------|------------------------|
| default   | my-service |             | http://127.0.0.1:61723 |
|-----------|------------|-------------|------------------------|
🎉  Opening service default/my-service in default browser...

```


|`Feature`| `ClusterIP` | `NodePort` | `LoadBalancer`|
|:----|:---- |:------:| -----:|
|**Exposition**|Exposes the Service on an internal IP in the cluster.|Exposing services to external clients|Exposing services to external clients|
|**Cluster** |This type makes the Service only reachable from within the cluster|A NodePort service, each cluster node opens a port on the node itself (hence the name) and redirects traffic received on that port to the underlying service.|A LoadBalancer service accessible through a dedicated load balancer, provisioned from the cloud infrastructure Kubernetes is running on|
|**Accessibility**|It is **default** service and Internal clients send requests to a stable internal IP address.|The service is accessible at the internal cluster IP-port, and also through a dedicated port on all nodes.|Clients connect to the service through the load balancer’s IP.|
|**Yaml Config**|`type: ClusterIP `|`type: NodePort`|`type: LoadBalancer`|
|**Port Range**|Any public ip form Cluster|30000 - 32767|Any public ip form Cluster|
|**User Cases**| For internal communication |Best for testing public or private access or providing access for a small amount of time.| widely used For External communication|



### ClusterIP

ClusterIP is the default ServiceType and it creates a single IP address that can be used to access its Pods which can only be accessed from inside the cluster. If KubeDNS is enabled it will also get a series of DNS records assigned to it include an A record to match its IP. This is very useful for exposing microservices running inside the same Kubernetes cluster to each other.

```sh
kubectl run hello --image=paulczar/hello-world
deployment "hello" created
```

```sh
kubectl expose deployment hello --port=8080 --type=ClusterIP
service "hello" exposed
$ kubectl run -i --tty --rm debug --image=alpine \
  --restart=Never -- wget -qO - hello:8080
<html><head><title>hello world</title></head><body>hello world!</body></html>
$ kubectl delete service hello
service "hello" deleted
```

Since KubeDNS is enabled in minikube by default you can access the service via DNS using the name of the service.

### NodePort

NodePort builds on top of ClusterIP to create a mapping from each Worker Node’s static IP on a specified (or Kubernetes chosen) Port. A Service exposed as a NodePort can be accessed via <node-ip-address>:<node-port>. This ServiceType can be useful when developing applications with minikube or for exposing a specific Port to an application via an unmanaged load balancer or round robin DNS.

```sh
$ kubectl expose deployment hello --port=8080 --type=NodePort
service "hello" exposed
$ kubectl get service hello
NAME      TYPE       CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
hello     NodePort   10.0.0.231   <none>        8080:30259/TCP   21s
$ minikube ip
192.168.99.100
$ curl 192.168.99.100:30259
<html><head><title>hello world</title></head><body>hello world!</body></html>
$ kubectl delete service hello
service "hello" deleted
```

### LoadBalancer

LoadBalancer builds on top of NodePort and is used to automatically configure a supported external Load Balancer (for instance an ELB in Amazon) to route traffic through to the NodePort of the Service. This is the most versatile of the ServiceTypes but requires that you have a supported Load Balancer in your infrastructure of which most major cloud providers have.
In minikube this would produce the same result as a NodePort as minikube does not have a load balancer. However we can demonstrate it on Google Cloud quite easily if you have an account:

```sh
$ kubectl run hello --image=paulczar/hello-world
deployment "hello" created
$ kubectl expose deployment hello --port=8080 --type=LoadBalancer
service "hello" exposed
$ kubectl get service 
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)          AGE
hello        LoadBalancer   10.11.251.34   35.192.25.113   8080:32107/TCP   2m
$ curl 35.192.25.113:8080
<html><head><title>hello world</title></head><body>hello world!</body></html>
```

```sh
➜  k8s101 git:(main) ✗ minikube addons list
|-----------------------------|----------|--------------|--------------------------------|
|         ADDON NAME          | PROFILE  |    STATUS    |           MAINTAINER           |
|-----------------------------|----------|--------------|--------------------------------|
| ambassador                  | minikube | disabled     | 3rd party (Ambassador)         |
| auto-pause                  | minikube | disabled     | Google                         |
| cloud-spanner               | minikube | disabled     | Google                         |
| csi-hostpath-driver         | minikube | disabled     | Kubernetes                     |
| dashboard                   | minikube | enabled ✅   | Kubernetes                     |
| default-storageclass        | minikube | enabled ✅   | Kubernetes                     |
| efk                         | minikube | disabled     | 3rd party (Elastic)            |
| freshpod                    | minikube | disabled     | Google                         |
| gcp-auth                    | minikube | disabled     | Google                         |
| gvisor                      | minikube | disabled     | Google                         |
| headlamp                    | minikube | disabled     | 3rd party (kinvolk.io)         |
| helm-tiller                 | minikube | disabled     | 3rd party (Helm)               |
| inaccel                     | minikube | disabled     | 3rd party (InAccel             |
|                             |          |              | [info@inaccel.com])            |
| ingress                     | minikube | disabled     | Kubernetes                     |
| ingress-dns                 | minikube | disabled     | Google                         |
| istio                       | minikube | disabled     | 3rd party (Istio)              |
| istio-provisioner           | minikube | disabled     | 3rd party (Istio)              |
| kong                        | minikube | disabled     | 3rd party (Kong HQ)            |
| kubevirt                    | minikube | disabled     | 3rd party (KubeVirt)           |
| logviewer                   | minikube | disabled     | 3rd party (unknown)            |
| metallb                     | minikube | disabled     | 3rd party (MetalLB)            |
| metrics-server              | minikube | enabled ✅   | Kubernetes                     |
| nvidia-driver-installer     | minikube | disabled     | Google                         |
| nvidia-gpu-device-plugin    | minikube | disabled     | 3rd party (Nvidia)             |
| olm                         | minikube | disabled     | 3rd party (Operator Framework) |
| pod-security-policy         | minikube | disabled     | 3rd party (unknown)            |
| portainer                   | minikube | disabled     | 3rd party (Portainer.io)       |
| registry                    | minikube | disabled     | Google                         |
| registry-aliases            | minikube | disabled     | 3rd party (unknown)            |
| registry-creds              | minikube | disabled     | 3rd party (UPMC Enterprises)   |
| storage-provisioner         | minikube | enabled ✅   | Google                         |
| storage-provisioner-gluster | minikube | disabled     | 3rd party (Gluster)            |
| volumesnapshots             | minikube | disabled     | Kubernetes                     |
|-----------------------------|----------|--------------|--------------------------------|
💡  To see addons list for other profiles use: `minikube addons -p name list`
➜  k8s101 git:(main) ✗ minikube addons enable metallb 
❗  metallb is a 3rd party addon and is not maintained or verified by minikube maintainers, enable at your own risk.
❗  metallb does not currently have an associated maintainer.
    ▪ Using image docker.io/metallb/speaker:v0.9.6
    ▪ Using image docker.io/metallb/controller:v0.9.6
🌟  The 'metallb' addon is enabled
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ kubectl get ns
NAME                   STATUS   AGE
default                Active   116d
kube-node-lease        Active   116d
kube-public            Active   116d
kube-system            Active   116d
kubernetes-dashboard   Active   46h
metallb-system         Active   155m
➜  k8s101 git:(main) ✗ kubectl get all -n metallb-system
NAME                              READY   STATUS    RESTARTS   AGE
pod/controller-55496b5cd7-p4k6g   1/1     Running   0          155m
pod/speaker-8l8kb                 1/1     Running   0          155m

NAME                     DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
daemonset.apps/speaker   1         1         1       1            1           beta.kubernetes.io/os=linux   155m

NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/controller   1/1     1            1           155m

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/controller-55496b5cd7   1         1         1       155m
```

```
➜  k8s101 git:(main) ✗ minikube ip
192.168.49.2
➜  k8s101 git:(main) ✗  minikube addons configure metallb
-- Enter Load Balancer Start IP:  192.168.49.100
-- Enter Load Balancer End IP: 192.168.49.120
    ▪ Using image docker.io/metallb/controller:v0.9.6
    ▪ Using image docker.io/metallb/speaker:v0.9.6
✅  metallb was successfully configured
➜  k8s101 git:(main) ✗ 
```

#### create ngnix deployment via Loadbalancer 


```sh
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f ngnix-metallb.yaml 
service/nginx-svc created
deployment.apps/nginx-deployment created

➜  k8s101 git:(main) ✗ kubectl get po,svc  
NAME                                       READY   STATUS    RESTARTS   AGE
pod/2048-deployment-9ccbf58bd-57tng        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-78pnr        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-mbfrt        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-tfcnd        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-trxqw        1/1     Running   0          6h18m
pod/kube-ops-view-5b596b7c7d-z2p2v         1/1     Running   0          13h
pod/kube-ops-view-redis-6dc75f67cd-klhpf   1/1     Running   0          13h
pod/lab-nginx-84756b7fc4-4qctt             1/1     Running   0          13h
pod/lab-nginx-84756b7fc4-rhg4m             1/1     Running   0          13h
pod/label-nginx-example-5f8bc677b9-6trt6   1/1     Running   0          13h
pod/my-nginx-deploy-5c9989fcf4-pqpgj       1/1     Running   0          4h23m
pod/my-nginx-deploy-5c9989fcf4-zkq8p       1/1     Running   0          4h23m
pod/my-release-kubeview-f7447cf6c-2w85w    1/1     Running   0          13h
pod/nginx-1-ff5997cdf-kpff9                1/1     Running   0          13h
pod/nginx-deployment-7fb96c846b-cm296      1/1     Running   0          80s
pod/nginx-lab-1-84756b7fc4-77kvz           1/1     Running   0          13h
pod/nginx-lab-1-84756b7fc4-r9cmt           1/1     Running   0          13h
pod/nginx-lab-1-84756b7fc4-sqbf4           1/1     Running   0          13h

NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)        AGE
service/kubernetes   ClusterIP      10.96.0.1        <none>           443/TCP        6h46m
service/my-service   NodePort       10.103.55.123    <none>           80:30007/TCP   3h22m
service/myservice    NodePort       10.111.94.141    <none>           80:31487/TCP   6h18m
service/nginx-svc    LoadBalancer   10.104.216.130   192.168.49.100   80:31150/TCP   80s
➜  k8s101 git:(main) ✗ 
```
```sh
k8s101 git:(main) ✗ minikube tunnel
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗  The service/ingress nginx-svc requires privileged ports to be exposed: [80]
🔑  sudo permission will be asked for it.
🏃  Starting tunnel for service nginx-svc.
¸^C✋  Stopped tunnel for service nginx-svc.
```

#### open localhost on 80 port 

localhost:80 
