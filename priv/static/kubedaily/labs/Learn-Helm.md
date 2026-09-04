

# Basics of Helm


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

```
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
```
### delete the chart 

```
(base) ➜  application-1 git:(main) ✗ helm uninstall chart-1
release "chart-1" uninstalled
```

# Deep Dive into Charts


#### create new chart 

```
(base) ➜  helm-workshop git:(main) ✗ cd new-chart 
(base) ➜  new-chart git:(main) ✗ ls
Chart.yaml  charts      templates   values.yaml
(base) ➜  new-chart git:(main) ✗ 
```

### charts 

if you see your file structure you don't see charts folder 

```
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

```

#### Notes.txt 

its container notes for user how to run this helm charts 

```
1. Get the application URL by running these commands:
{{- if .Values.ingress.enabled }}
{{- range $host := .Values.ingress.hosts }}
  {{- range .paths }}
  http{{ if $.Values.ingress.tls }}s{{ end }}://{{ $host.host }}{{ .path }}
  {{- end }}
{{- end }}
{{- else if contains "NodePort" .Values.service.type }}
  export NODE_PORT=$(kubectl get --namespace {{ .Release.Namespace }} -o jsonpath="{.spec.ports[0].nodePort}" services {{ include "new-chart.fullname" . }})
  export NODE_IP=$(kubectl get nodes --namespace {{ .Release.Namespace }} -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
{{- else if contains "LoadBalancer" .Values.service.type }}
     NOTE: It may take a few minutes for the LoadBalancer IP to be available.
           You can watch the status of by running 'kubectl get --namespace {{ .Release.Namespace }} svc -w {{ include "new-chart.fullname" . }}'
  export SERVICE_IP=$(kubectl get svc --namespace {{ .Release.Namespace }} {{ include "new-chart.fullname" . }} --template "{{"{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"}}")
  echo http://$SERVICE_IP:{{ .Values.service.port }}
{{- else if contains "ClusterIP" .Values.service.type }}
  export POD_NAME=$(kubectl get pods --namespace {{ .Release.Namespace }} -l "app.kubernetes.io/name={{ include "new-chart.name" . }},app.kubernetes.io/instance={{ .Release.Name }}" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace {{ .Release.Namespace }} $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace {{ .Release.Namespace }} port-forward $POD_NAME 8080:$CONTAINER_PORT
{{- end }}

```


#### _helper

this file nothing to do with kubernetes resource its just variable 

```
{{/*
Expand the name of the chart.
*/}}
{{- define "new-chart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "new-chart.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "new-chart.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "new-chart.labels" -}}
helm.sh/chart: {{ include "new-chart.chart" . }}
{{ include "new-chart.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "new-chart.selectorLabels" -}}
app.kubernetes.io/name: {{ include "new-chart.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "new-chart.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "new-chart.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

```

### chart.yaml


its container helm chart versioning 

apiVersion: v2
name: new-chart
description: A Helm chart for Kubernetes

# A chart can be either an 'application' or a 'library' chart.
#
# Application charts are a collection of templates that can be packaged into versioned archives
# to be deployed.
#
# Library charts provide useful utilities or functions for the chart developer. They're included as
# a dependency of application charts to inject those utilities and functions into the rendering
# pipeline. Library charts do not define any templates and therefore cannot be deployed.
type: application

# This is the chart version. This version number should be incremented each time you make changes
# to the chart and its templates, including the app version.
# Versions are expected to follow Semantic Versioning (https://semver.org/)
version: 0.1.0

# This is the version number of the application being deployed. This version number should be
# incremented each time you make changes to the application. Versions are not expected to
# follow Semantic Versioning. They should reflect the version the application is using.
# It is recommended to use it with quotes.
appVersion: "1.16.0"

```

# Working with Multiple Values


#### create another values file 

```
# Default values for application-1.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
deployment:
  replicaCount: 1
  name: new-deployememt
  image:
    app: ngnix 
    version: latest

service:
  name: my-service
  type: NodePort
  port: 80
  targetPort: 80
  nodePort: 32046
  selector:
    app: ngnix   

```

just chamged nortport value here 

#### install chart again 


```
base) ➜  application-1 git:(main) ✗ helm install chart-1 .
W0325 04:26:44.306101    7525 warnings.go:70] unknown field "spec.ports[0].nodeport"
NAME: chart-1
LAST DEPLOYED: Mon Mar 25 04:26:44 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None


(base) ➜  application-1 git:(main) ✗ helm list  
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART                     APP VERSION
chart-1 default         1               2024-03-25 04:26:44.235604 +0530 IST    deployed        application-1-0.1.0       1.16.0     
```

### deploy new chart 

```
➜  application-1 git:(main) ✗ helm install chart-2 . -f new-values.yaml 
W0325 04:31:02.212820    7835 warnings.go:70] unknown field "spec.ports[0].nodeport"
NAME: chart-2
LAST DEPLOYED: Mon Mar 25 04:31:02 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None

```

## creating template file and access through it 


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

## "Advance Temaplate with if statement"


### update your deployment file 

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
        {{- end }}
```

### create new template file 

```
{{- define "container1" }}
- name: new-container
  image: "{{ .Values.deployment.image.app }}:{{ .Values.deployment.image.version }}"
  ports:
    - name: http
      containerPort: 80
      protocol: TCP
{{- end }}
```

### update value file 

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
   enabled: true    
```

### validate template 

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
        
        - name: new-container
          image: "ngnix:latest"
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
(base) ?➜  application-1 git:(main) ?✗ 
```

# else and else if statement


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


# 50 Helm Template Cheatsheets


### Basic Template Functions:

1. **Access a Value from `values.yaml`**:
   ```yaml
   replicas: {{ .Values.replicaCount }}
   ```

2. **Access Release Information**:
   ```yaml
   releaseName: {{ .Release.Name }}
   releaseNamespace: {{ .Release.Namespace }}
   ```

3. **Access Chart Information**:
   ```yaml
   chartName: {{ .Chart.Name }}
   chartVersion: {{ .Chart.Version }}
   ```

4. **Port Configuration**:
   ```yaml
   containerPort: {{ .Values.containerPort }}
   ```

### Conditional Blocks:

5. **Conditional Rendering**:
   ```yaml
   {{- if .Values.enableFeature }}
   featureEnabled: true
   {{- end }}
   ```

6. **Conditional Rendering with Else Block**:
   ```yaml
   {{- if .Values.enableFeature }}
   featureEnabled: true
   {{- else }}
   featureEnabled: false
   {{- end }}
   ```

### Loops:

7. **Loop Over a List**:
   ```yaml
   {{- range .Values.ingress.hosts }}
   - host: {{ . }}
   {{- end }}
   ```

8. **Loop Over a Map**:
   ```yaml
   {{- range $key, $value := .Values.labels }}
   {{ $key }}: {{ $value }}
   {{- end }}
   ```

### Accessing Values:

9. **Access Nested Values**:
    ```yaml
    username: {{ .Values.database.credentials.username }}
    ```

10. **Quoting a Value**:
    ```yaml
    message: {{ .Values.message | quote }}
    ```

### Including Partial Templates:

11. **Include a Partial Template**:
    ```yaml
    {{- include "partials.common" . | indent 2 }}
    ```

### Template Functions:

12. **Convert to YAML**:
    ```yaml
    {{- toYaml .Values.config | nindent 4 }}
    ```

13. **Convert to JSON**:
    ```yaml
    jsonData: {{ toJson .Values.data }}
    ```

14. **Using Sprig Functions**:
    ```yaml
    password: {{ randAlphaNum 10 | quote }}
    ```

### Helm Hook Templates:

15. **Pre-install Hook**:
    ```yaml
    {{- if .Values.preInstallJob }}
    # pre-install job definition
    {{- end }}
    ```

16. **Post-install Hook**:
    ```yaml
    {{- if .Values.postInstallJob }}
    # post-install job definition
    {{- end }}
    ```

### Advanced Examples:

17. **Creating a Kubernetes Secret**:
    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: {{ .Release.Name }}-secret
    type: Opaque
    data:
      password: {{ .Values.secret.password | b64enc }}
    ```

18. **Creating a Service**:
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: {{ include "mychart.fullname" . }}
    ```

19. **Defining a ConfigMap**:
    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: {{ include "mychart.fullname" . }}
    data:
      config.yaml: |
        {{ .Files.Get "config.yaml" | indent 4 }}
    ```

20. **Creating an Ingress**:
    ```yaml
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: {{ include "mychart.fullname" . }}
    spec:
      rules:
        - host: {{ .Values.ingress.host }}
    ```

21. **Defining a PersistentVolumeClaim**:
    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: {{ include "mychart.fullname" . }}-data
    ```

22. **Setting Resource Limits**:
    ```yaml
    resources:
      limits:
        cpu: {{ .Values.resources.cpu | quote }}
        memory: {{ .Values.resources.memory | quote }}
    ```

23. **Creating a Job**:
    ```yaml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: {{ .Release.Name }}-job
    spec:
      template:
        spec:
          containers:
          - name: {{ .Chart.Name }}-job
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            command: ["{{ .Values.command }}"]
    ```

24. **Creating a CronJob**:
    ```yaml
    apiVersion: batch/v1beta1
    kind: CronJob
    metadata:
      name: {{ .Release.Name }}-cronjob
    spec:
      schedule: "*/1 * * * *"
      jobTemplate:
        spec:
          template:
            spec:
              containers:
              - name: {{ .Chart.Name }}-cronjob
                image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
                command: ["{{ .Values.command }}"]
    ```

25. **Creating a StatefulSet**:
    ```yaml
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: {{ .Release.Name }}-statefulset
    ```

26. **Creating a Deployment with Liveness and Readiness Probes**:
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: {{ .Release.Name }}-deployment
    spec:
      template:
        spec:
          containers:
          - name: {{ .Chart.Name }}-container
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            livenessProbe:
              httpGet:
                path: /healthz
                port: 80
              initialDelaySeconds: 30
            readinessProbe:
              httpGet:
                path: /readyz
                port: 80
              initialDelaySeconds: 5
    ```

27. **Creating a Horizontal Pod Autoscaler (HPA)**:
    ```yaml
    apiVersion: autoscaling/v2beta2
    kind: HorizontalPodAutoscaler
    metadata:
      name: {{ .Release.Name }}-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: {{ .Release.Name }}-deployment
      minReplicas: 1
      maxReplicas: 10
      metrics:
      - type: Resource
        resource:
          name: cpu
          targetAverageUtilization: 50
    ```

### Accessing Values:

28. **Accessing Values from Dependencies**:
    ```yaml
    dependencyValue: {{ .Values.dependencies.subchart.value }}
    ```

29. **Accessing Values with Default**:
    ```yaml
    port: {{ .Values.port | default 8080 }}
    ```

### Advanced Conditional Blocks:

30. **Conditional Block with Nested Conditions**:
    ```yaml
    {{- if and .Values.condition1 .Values.condition2 }}
    # Block content
    {{- end }}
    ```

31. **Conditional Block with OR Operator**:
    ```yaml
    {{- if or .Values.condition1 .Values.condition2 }}
    # Block content
    {{- end }}
    ```

### Advanced Loops:

32. **Loop with Index**:
    ```yaml
    {{- range $index, $element := .Values.list }}
    - index: {{ $index }}, value: {{ $element }}
    {{- end }}
    ```

33. **Loop with Sorting**:
    ```yaml
    {{- range sort .Values.list }}
    - value: {{ . }}
    {{- end }}
    ```

### Advanced Template Functions:

34. **Using `tpl` Function for Advanced Template Rendering**:
    ```yaml
    renderedTemplate: {{ tpl (.Files.Get "template.yaml") . | indent 4 }}
    ```

35. **Using `include` with Dynamic Name**:
    ```yaml
    {{- include (printf "%s-config" .Values.serviceName) . | indent 2 }}
    ```

### External Template Files:

36. **Including External Template File**:
    ```yaml
    {{- include "external-template.tpl" . | indent 2 }}
    ```

### Debugging:

37. **Printing Values for Debugging**:
    ```yaml
    {{- printf "%#v" .Values | nindent 2 }}
    ```

### Naming Conventions:

38. **Using Release Name and Chart Name for Naming Resources**:
    ```yaml
    metadata:
      name: {{ .Release.Name }}-{{ .Chart.Name }}
    ```

### Comments:

39. **Adding Comments in Templates**:
    ```yaml
    # This is a comment
    ```

### External Resources:

40. **Mounting External Files as ConfigMaps**:
    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: my-configmap
    data:
      {{ .Files.Get "config-file.yaml" | indent 2 }}
    ```

### Combining Functions:

41. **Combining Functions for Complex Operations**:
    ```yaml
    combinedValue: {{ trimPrefix "prefix-" (upper .Values.value) }}
    ```

### Advanced StatefulSet Configuration:

42. **StatefulSet with Persistent Volume Claim**:
    ```yaml
    volumeClaimTemplates:
      - metadata:
          name: data
        spec:
          accessModes: [ "ReadWriteOnce" ]
          resources:
            requests:
              storage: 1Gi
    ```

### External Secrets:

43. **Referencing External Secrets**:
    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: my-secret
      annotations:
        "helm.sh/resource-policy": keep
    type: Opaque
    data:
      password: {{ .Values.externalSecret.password | b64enc }}
    ```

### Helm Release Specifics:

44. **Accessing Release Timestamp**:
    ```yaml
    releaseDate: {{ .Release.Timestamp }}
    ```

### Debugging with `printf`:

45. **Debugging with `printf`**:
    ```yaml
    {{ printf "%#v" .Values | nindent 2 }}
    ```

### Using `quote` and `unquote` Functions:

46. **Quoting and Unquoting Values**:
    ```yaml
    quotedValue: {{ .Values.someValue | quote }}
    unquotedValue: {{ .Values.quotedValue | unquote }}
    ```

### Advanced Resource Definitions:

47. **Advanced Pod Annotations**:
    ```yaml
    annotations:
      myAnnotation: {{ .Values.annotations.myAnnotation | quote }}
    ```

### Configurable Labels:

48. **Configurable Labels**:
    ```yaml
    labels:
      myLabel: {{ .Values.labels.myLabel | quote }}
    ```

### Conditional Pod Disruption Budget:

49. **Conditional Pod Disruption Budget**:
    ```yaml
    {{- if .Values.enablePodDisruptionBudget }}
    apiVersion: policy/v1beta1
    kind: PodDisruptionBudget
    metadata:
      name: {{ include "mychart.fullname" . }}
    spec:
      # PDB specification
    {{- end }}
    ```

### Helm Template Debugging:

50. **Template Debugging with `required` Function**:
    ```yaml
    requiredValue: {{ required "Value is required" .Values.requiredValue }}
    ```

### Multiple pipelines:

51. **Manipulate value with multiple pipelines**:
    ```yaml
    domain: {{ .Values.domain | lower | trunc 9 | quote}}
    ```

