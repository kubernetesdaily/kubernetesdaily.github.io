---
title: "Working with Multiple Values"
weight: 3
---

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

