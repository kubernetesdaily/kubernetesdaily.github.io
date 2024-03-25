---
title: "Basics of Helm"
weight: 1
---


git clone 


### Install Helm 3

```
  ~ curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 11679  100 11679    0     0  32332      0 --:--:-- --:--:-- --:--:-- 32262
Downloading https://get.helm.sh/helm-v3.14.3-darwin-arm64.tar.gz
Verifying checksum... Done.
Preparing to install helm into /usr/local/bin
Password:
helm installed into /usr/local/bin/helm
```


### Creating the chart 

```
(base) ➜  helm-workshop git:(main) helm create application-1 
Creating application-1

```

### Structure of the chart 
```
(base) ➜  application-1 git:(main) ✗ tree
.
├── Chart.yaml
├── charts
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── service.yaml
│   ├── serviceaccount.yaml
│   └── tests
│       └── test-connection.yaml
└── values.yaml

4 directories, 10 files
(base) ➜  application-1 git:(main) ✗ 

```

deleted unwanted files 

```
base) ➜  application-1 git:(main) ✗ tree
.
├── Chart.yaml
├── charts
├── templates
│   ├── deployment.yaml
│   ├── service.yaml
│   └── tests
└── values.yaml

```

### Configuration the yamls files from scratch 

create ngnix deployment with 3 replicas and use nodeport to expose ports 

 


### how to deploy the chart 

(base) ➜  application-1 git:(main) ✗ helm install chart-1 .
W0323 05:55:21.671543    6164 warnings.go:70] unknown field "spec.ports[0].nodeport"
NAME: chart-1
LAST DEPLOYED: Sat Mar 23 05:55:21 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None

### view the chart 
(base) ➜  application-1 git:(main) ✗ kubectl get deploy,svc
NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-deployememt   0/1     1            0           49s

NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        23m
service/my-service   NodePort    10.102.58.218   <none>        80:31492/TCP   49s
(base) ➜  application-1 git:(main) ✗ kubectl get nodes -o wide 
NAME       STATUS   ROLES           AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME
minikube   Ready    control-plane   24m   v1.28.3   192.168.49.2   <none>        Ubuntu 22.04.3 LTS   6.6.16-linuxkit   docker://24.0.7


ip addess + port a

(base) ➜  application-1 git:(main) ✗ helm list 
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                   APP VERSION
chart-1 default         1               2024-03-23 05:55:21.559484 +0530 IST    deployed        application-1-0.1.0     1.16.0   

### delete the chart 


(base) ➜  application-1 git:(main) ✗ helm uninstall chart-1
release "chart-1" uninstalled