---
title: "10.ConfigMap "
description: " kubernetes Config "
weight: 10
---


#### craete index-html-configmap.yaml with following content 

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: index-html-configmap
  namespace: default
data:
  index.html: |
    <html>
    <h1>Welcome</h1>
    </br>
    <h1>Hi! This is a configmap Index file </h1>
    </html>
```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f index-html-configmap.yaml
configmap/index-html-configmap created

```

#### craete nginx.yaml with following content 


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        volumeMounts:
            - name: nginx-index-file
              mountPath: /usr/share/nginx/html/
      volumes:
      - name: nginx-index-file
        configMap:
          name: index-html-configmap

```


```sh
➜  k8s101 git:(main) ✗ kubectl apply -f ngnix.yaml 
deployment.apps/nginx-deployment created
```

#### craete nginx-service.yaml with following content 


```yaml

apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: default
spec:
  selector:
    app: nginx
  type: NodePort
  ports:
  - port: 80
    nodePort: 32000
    targetPort: 80


 ```


```sh
➜  k8s101 git:(main) ✗ kubectl apply -f nginx-service.yaml
service/nginx-service created
```


```sh
➜  k8s101 git:(main) ✗ kubectl get svc
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP          14h
nginx-service   NodePort    10.105.136.166   <none>        80:32000/TCP     49s
web             NodePort    10.100.132.142   <none>        8080:30646/TCP   123m
web2            NodePort    10.98.210.102    <none>        8080:31990/TCP   61m
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ minikube service nginx-service
|-----------|---------------|-------------|---------------------------|
| NAMESPACE |     NAME      | TARGET PORT |            URL            |
|-----------|---------------|-------------|---------------------------|
| default   | nginx-service |          80 | http://192.168.49.2:32000 |
|-----------|---------------|-------------|---------------------------|
🏃  Starting tunnel for service nginx-service.
|-----------|---------------|-------------|------------------------|
| NAMESPACE |     NAME      | TARGET PORT |          URL           |
|-----------|---------------|-------------|------------------------|
| default   | nginx-service |             | http://127.0.0.1:53149 |
|-----------|---------------|-------------|------------------------|
🎉  Opening service default/nginx-service in default browser...
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```


#### you will see output in browser 
```
Welcome


Hi! This is a configmap Index file
```


