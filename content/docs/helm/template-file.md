---
title: "creating template file and access through it "
weight: 4
---

### create helper template file 

create file with name _my-template.tpl

```
{{- define "labels" }}
app: ngnix
version: "1.0"
team: myteam
{{- end }}


```

```
(base) ➜  application-1 git:(main) ✗ helm template .
---
# Source: application-1/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  labels:
    app: ngnix
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodeport: 32036
      protocol: TCP
      name: http
  selector:
    app: ngnix
---
# Source: application-1/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployememt
  labels:
    
    app: ngnix
    version: "1.0"
    team: myteam    
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
          image: "ngnix:latest"
(base) ➜  application-1 git:(main) ✗ 


```