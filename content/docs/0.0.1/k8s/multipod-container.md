---
title: "4.Multi-Container Pods "
description: " Use Cases for Multi-Container Pods  "
weight: 4
---


##### Why does Kubernetes allow more than one container in a Pod
- Containers in a Pod runs on a "logical host": they use the same network namespace (same IP address and port space), they can use shared volumes
- using several containers for an application is simpler to use, more transparent, and allows decoupling software dependencies

##### Use Cases for Multi-Container Pods

The primary purpose of a multi-container Pod is to support co-located, co-managed helper processes for a main program

Sidecar containers:
"help" the main container. For example, log or data change watchers, monitoring adapters, and so on.
A log watcher, for example, can be built once by a different team and reused across different applications
Another example of a sidecar container is a file or data loader that generates data for the main container.

#### Communication Between Containers in a Pod

Shared volumes:
you can use a shared Kubernetes Volume as a simple and efficient way to share data between containers in a Pod.
Volumes enables data to survive container restarts. It has the same lifetime as a Pod.
it is sufficient to use a directory on the host that is shared with all containers within a Pod

- A standard use case for a multi-container Pod with shared Volume is when one container writes to the shared directory (logs or other files), and the other container reads from the shared directory
- The second container uses Debian image and has the shared volume mounted to the directory /html. The second container every second adds current date and time and into index.html that is located in the shared volume.
- Nginx servers reads this file and transfers it to the user for each HTTP request to the web server.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: mc1
spec:
  volumes:
  - name: html
    emptyDir: {}
  containers:
  - name: 1st
    image: nginx
    volumeMounts:
    - name: html
      mountPath: /usr/share/nginx/html
  - name: 2nd
    image: debian
    volumeMounts:
    - name: html
      mountPath: /html
    command: ["/bin/sh", "-c"]
    args:
      - while true; do
          date >> /html/index.html;
          sleep 1;
        done

```
#### kubectl apply 

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f mc1.yaml 
pod/mc1 created

```

#### exec into mc1 pod 1st container 

```sh
➜  k8s101 git:(main) ✗ kubectl exec mc1 -c 1st -- /bin/cat /usr/share/nginx/html/index.html
Mon Mar  6 18:30:15 UTC 2023
Mon Mar  6 18:30:16 UTC 2023
Mon Mar  6 18:30:17 UTC 2023
Mon Mar  6 18:30:18 UTC 2023
Mon Mar  6 18:30:20 UTC 2023
Mon Mar  6 18:30:21 UTC 2023
Mon Mar  6 18:30:22 UTC 2023
Mon Mar  6 18:30:23 UTC 2023
Mon Mar  6 18:30:24 UTC 2023
Mon Mar  6 18:30:25 UTC 2023
Mon Mar  6 18:30:26 UTC 2023
Mon Mar  6 18:30:27 UTC 2023
Mon Mar  6 18:30:28 UTC 2023
Mon Mar  6 18:30:29 UTC 2023
Mon Mar  6 18:30:30 UTC 2023
Mon Mar  6 18:30:31 UTC 2023
Mon Mar  6 18:30:32 UTC 2023
Mon Mar  6 18:30:33 UTC 2023
Mon Mar  6 18:30:34 UTC 2023
Mon Mar  6 18:30:35 UTC 2023
Mon Mar  6 18:30:36 UTC 2023
Mon Mar  6 18:30:37 UTC 2023
Mon Mar  6 18:30:38 UTC 2023
Mon Mar  6 18:30:39 UTC 2023
Mon Mar  6 18:30:40 UTC 2023
Mon Mar  6 18:30:41 UTC 2023
Mon Mar  6 18:30:42 UTC 2023
Mon Mar  6 18:30:43 UTC 2023
Mon Mar  6 18:30:44 UTC 2023
Mon Mar  6 18:30:45 UTC 2023
Mon Mar  6 18:30:46 UTC 2023
Mon Mar  6 18:30:47 UTC 2023
Mon Mar  6 18:30:48 UTC 2023
Mon Mar  6 18:30:49 UTC 2023
Mon Mar  6 18:30:50 UTC 2023
Mon Mar  6 18:30:51 UTC 2023
Mon Mar  6 18:30:52 UTC 2023
Mon Mar  6 18:30:53 UTC 2023
Mon Mar  6 18:30:54 UTC 2023
Mon Mar  6 18:30:55 UTC 2023
Mon Mar  6 18:30:56 UTC 2023
Mon Mar  6 18:30:57 UTC 2023
Mon Mar  6 18:30:58 UTC 2023
Mon Mar  6 18:30:59 UTC 2023
Mon Mar  6 18:31:00 UTC 2023
Mon Mar  6 18:31:01 UTC 2023
Mon Mar  6 18:31:02 UTC 2023
Mon Mar  6 18:31:03 UTC 2023
Mon Mar  6 18:31:04 UTC 2023
Mon Mar  6 18:31:05 UTC 2023
Mon Mar  6 18:31:06 UTC 2023
Mon Mar  6 18:31:07 UTC 2023
Mon Mar  6 18:31:08 UTC 2023
Mon Mar  6 18:31:09 UTC 2023
Mon Mar  6 18:31:10 UTC 2023
Mon Mar  6 18:31:11 UTC 2023
Mon Mar  6 18:31:12 UTC 2023
Mon Mar  6 18:31:13 UTC 2023
Mon Mar  6 18:31:14 UTC 2023
Mon Mar  6 18:31:15 UTC 2023
Mon Mar  6 18:31:16 UTC 2023
Mon Mar  6 18:31:17 UTC 2023
Mon Mar  6 18:31:18 UTC 2023
Mon Mar  6 18:31:19 UTC 2023
Mon Mar  6 18:31:20 UTC 2023
Mon Mar  6 18:31:21 UTC 2023
Mon Mar  6 18:31:22 UTC 2023
Mon Mar  6 18:31:23 UTC 2023
Mon Mar  6 18:31:24 UTC 2023
Mon Mar  6 18:31:25 UTC 2023
Mon Mar  6 18:31:26 UTC 2023
Mon Mar  6 18:31:27 UTC 2023
Mon Mar  6 18:31:28 UTC 2023
Mon Mar  6 18:31:29 UTC 2023
Mon Mar  6 18:31:30 UTC 2023
Mon Mar  6 18:31:31 UTC 2023
Mon Mar  6 18:31:32 UTC 2023
Mon Mar  6 18:31:33 UTC 2023
Mon Mar  6 18:31:34 UTC 2023
Mon Mar  6 18:31:35 UTC 2023
Mon Mar  6 18:31:36 UTC 2023
Mon Mar  6 18:31:37 UTC 2023
Mon Mar  6 18:31:38 UTC 2023
Mon Mar  6 18:31:39 UTC 2023
Mon Mar  6 18:31:40 UTC 2023
Mon Mar  6 18:31:41 UTC 2023
Mon Mar  6 18:31:42 UTC 2023
Mon Mar  6 18:31:43 UTC 2023
Mon Mar  6 18:31:44 UTC 2023
Mon Mar  6 18:31:45 UTC 2023
```

#### exec into mc1 pod 3nd container 

```sh
 k8s101 git:(main) ✗  kubectl exec mc1 -c 2nd -i -t -- bash -il
root@mc1:/# ls
bin  boot  dev  etc  home  html  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@mc1:/# cd html
root@mc1:/html# ls
index.html
root@mc1:/html# 
```


#### Kubernetes has three Object Types you should know about:

- Pods - runs one or more closely related containers

- Services - sets up networking in a Kubernetes cluster

- Deployment - Maintains a set of identical pods, ensuring that they have the correct config and that the right number of them exist.

Pods:

- Runs a single set of containers
- Good for one-off dev purposes
- Rarely used directly in production

Deployment:

- Runs a set of identical pods
- Monitors the state of each pod, updating as necessary
- Good for dev
- Good for production


Pod templates : 

Controllers for workload resources create Pods from a pod template and manage those Pods on your behalf.

-PodTemplates are specifications for creating Pods, and are included in workload resources such as Deployments, Jobs, and DaemonSets.

```
k8sworkshop git:(main) ✗ kubectl get all
NAME           READY   STATUS             RESTARTS         AGE
pod/command3   0/1     CrashLoopBackOff   65 (4m59s ago)   20h
pod/mc1        2/2     Running            0                77m

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   115d

```



