---
title: "else and else if statement"
weight: 6 
---

### update your templ

```
{{- define "container1" }}
- name: new-container
  image: "{{ .Values.deployment.image.app }}:{{ .Values.deployment.image.version }}"
  ports:
    - name: http
      containerPort: 80
      protocol: TCP
{{- end }}

{{- define "container2" }}
- name: new-container2
  image: "{{ .Values.deployment.image.app }}:{{ .Values.deployment.image.version }}"
  ports:
    - name: http
      containerPort: 80
      protocol: TCP
{{- end }}

```

### make your container value as false 

```
# Default values for application-1.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
deployment:
  replicaCount: 1
  name: my-deployememt
  image:
    app: ngnix 
    version: latest

service:
  name: my-service
  type: NodePort
  port: 80
  targetPort: 80
  nodePort: 32036
  selector:
    app: ngnix   

container1:
   enabled: false   

```

#### update your deployment file with else statement 


```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Values.deployment.name }}
  labels: {{- include "labels" . | nindent 4 }}    
spec:
  replicas: {{ .Values.deployment.replicaCount }}
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
          image: "{{ .Values.deployment.image.app }}:{{ .Values.deployment.image.version }}"
          ports:
          -  name: http
             containerPort: 80
             protocol: TCP
        {{- if eq .Values.container1.enabled true }}   
        {{- include "container1" . | nindent 8 }}
        {{- else }}
        {{- include "container2" . | nindent 8 }}
        {{- end }}
```

### check menfest file 


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
          ports:
          -  name: http
             containerPort: 80
             protocol: TCP
        
        - name: new-container2
          image: "ngnix:latest"
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
(base) ➜  application-1 git:(main) ✗ 
```
