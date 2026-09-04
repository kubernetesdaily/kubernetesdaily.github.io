### CertManager - Automatically provision and manage TLS certificates in Kubernetes

[![cert-manager/cert-manager](https://github-link-card.s3.ap-northeast-1.amazonaws.com/cert-manager/cert-manager.png)](https://github.com/cert-manager/cert-manager)

### Start Minikube
```
minikube-certmanager git:(main) minikube start
😄  minikube v1.30.0 on Darwin 13.3.1 (arm64)
✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🏃  Updating the running docker "minikube" container ...
❗  Image was not built for the current minikube version. To resolve this you can delete and recreate your minikube cluster using the latest images. Expected minikube version: v1.29.0 -> Actual minikube version: v1.30.0
🐳  Preparing Kubernetes v1.26.3 on Docker 23.0.2 ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

### add jetstack helm 
```
➜  minikube-certmanager git:(main) helm repo add jetstack https://charts.jetstack.io  
"jetstack" has been added to your repositories
```

### update helm charts 
```
➜  minikube-certmanager git:(main) helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "jetstack" chart repository
Update Complete. ⎈Happy Helming!⎈
```

### Install cert-manger CRD on test namespace 
```
➜  minikube-certmanager git:(main) helm install \
    cert-manager jetstack/cert-manager \
    --namespace test \
    --create-namespace \
    --version v1.11.1 \
    --set installCRDs=true
NAME: cert-manager
LAST DEPLOYED: Fri Apr 14 12:35:31 2023
NAMESPACE: test
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
cert-manager v1.11.1 has been deployed successfully!

In order to begin issuing certificates, you will need to set up a ClusterIssuer
or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).

More information on the different types of issuers and how to configure them
can be found in our documentation:

https://cert-manager.io/docs/configuration/

For information on how to configure cert-manager to automatically provision
Certificates for Ingress resources, take a look at the `ingress-shim`
documentation:

https://cert-manager.io/docs/usage/ingress/

```

### verify test namespace is active 

```
➜  minikube-certmanager git:(main) kubectl get ns
NAME              STATUS   AGE
default           Active   16h
kube-node-lease   Active   16h
kube-public       Active   16h
kube-system       Active   16h
test              Active   4m31s
```

### create self-signered certificate issuer  

creating a self-signed certificate that our CA will use. To do so we will first need to create a self-signed certificate issuer.


```yml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: test
spec:
  selfSigned: {}
```
### kubectl apply cert manager ss issuer 

```
minikube-certmanager git:(main) ✗ kubectl create -f cert-manager-ss-issuer.yaml
issuer.cert-manager.io/selfsigned-issuer created
```
### creat CA certificate 


```
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-ca
  namespace: test
spec:
  isCA: true
  commonName: test-ca
  subject:
    organizations:
    - ACME Inc.
    organizationalUnits:
    - Widgets
  secretName: test-ca-secret
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io

```

### kubectl apply  cert-manager-ca-cert 
```
➜  minikube-certmanager git:(main) ✗ kubectl create -f cert-manager-ca-cert.yaml
certificate.cert-manager.io/test-ca created
```
### checkt it out certificate 
```
➜  minikube-certmanager git:(main) ✗ kubectl -n test get certificate
NAME      READY   SECRET           AGE
test-ca   True    test-ca-secret   4m15s
```
### check it out secrets 
```
➜  minikube-certmanager git:(main) ✗ kubectl -n test get secret test-ca-secret
NAME             TYPE                DATA   AGE
test-ca-secret   kubernetes.io/tls   3      5m1s
```
Excellent! This secret contains the ca.crt, tls.crt, and tls.key that belong to the CA itself.

### create ca issuer 

Now it's time to create our CA issuer. Create a file called cert-manager-ca-issuer.yaml with the following:

```
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: test-ca-issuer
  namespace: test
spec:
  ca:
    secretName: test-ca-secret
```

### apply ca issuer 
```
➜  minikube-certmanager git:(main) ✗ kubectl create -f cert-manager-ca-issuer.yaml 
issuer.cert-manager.io/test-ca-issuer created
```
### test ca cert 

```
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-server
  namespace: test
spec:
  secretName: test-server-tls
  isCA: false
  usages:
  - server auth
  - client auth
  dnsNames:
  - "test-server.test.svc.cluster.local"
  - "test-server"
  issuerRef:
    name: test-ca-issuer
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-client
  namespace: test
spec:
  secretName: test-client-tls
  isCA: false
  usages:
  - server auth
  - client auth
  dnsNames:
  - "test-client.test.svc.cluster.local"
  - "test-client"
  issuerRef:
    name: test-ca-issuer

```
### test server cert 
```
➜  minikube-certmanager git:(main) ✗ kubectl create -f test-server-cert.yaml
certificate.cert-manager.io/test-server created
certificate.cert-manager.io/test-client created
```
### verify CA with Openssl 
```
➜  minikube-certmanager git:(main) ✗ openssl verify -CAfile \
<(kubectl -n test get secret test-ca-secret -o jsonpath='{.data.ca\.crt}' | base64 -d) \
<(kubectl -n test get secret test-server-tls -o jsonpath='{.data.tls\.crt}' | base64 -d)
/dev/fd/16: OK
/dev/fd/13: OK

```
### start openssl server get secrets tls 

```

minikube-certmanager git:(main) ✗ echo Hello World! > test.txt
minikube-certmanager git:(main) ✗ openssl s_server \
  -cert <(kubectl -n test get secret test-server-tls -o jsonpath='{.data.tls\.crt}' | base64 -d) \
  -key <(kubectl -n test get secret test-server-tls -o jsonpath='{.data.tls\.key}' | base64 -d) \
  -CAfile <(kubectl -n test get secret test-server-tls -o jsonpath='{.data.ca\.crt}' | base64 -d) \
  -WWW -port 12345  \
  -verify_return_error -Verify 1
verify depth is 1, must return a certificate
Using auto DH parameters
ACCEPT
```
###  verify certificate working 

```
 ➜  minikube-certmanager git:(main) ✗ echo -e 'GET /test.txt HTTP/1.1\r\n\r\n' | \
  openssl s_client \
  -cert <(kubectl -n test get secret test-client-tls -o jsonpath='{.data.tls\.crt}' | base64 -d) \
  -key <(kubectl -n test get secret test-client-tls -o jsonpath='{.data.tls\.key}' | base64 -d) \
  -CAfile <(kubectl -n test get secret test-client-tls -o jsonpath='{.data.ca\.crt}' | base64 -d) \
  -connect localhost:12345 -quiet
depth=1 O = ACME Inc., OU = Widgets, CN = test-ca
verify return:1
depth=0 
verify return:1
HTTP/1.0 200 ok
Content-type: text/plain

Hello World!
```
### enable ingress on minikube  
```
➜  minikube-certmanager git:(main) ✗ minikube addons enable ingress
💡  ingress is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
💡  After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
    ▪ Using image registry.k8s.io/ingress-nginx/controller:v1.7.0
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v20230312-helm-chart-4.5.2-28-g66a760794
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled

```
### Echo Server Setup with CA Signed Certificate

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: echo
  name: echo
  namespace: test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo
  template:
    metadata:
      labels:
        app: echo
    spec:
      containers:
      - name: echo
        image: fdeantoni/echo-server
        imagePullPolicy: Always
        ports:
        - containerPort: 9000
        readinessProbe:
          httpGet:
            path: /
            port: 9000
          initialDelaySeconds: 5
          periodSeconds: 5
          successThreshold: 1
---
apiVersion: v1
kind: Service
metadata:
  name: echo-service
  namespace: test
spec:
  selector:
    app: echo
  ports:
  - name: http
    protocol: TCP
    port: 9000
    targetPort: 9000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: echo-ingress
  namespace: test
  annotations:
    cert-manager.io/issuer: test-ca-issuer
spec:
  rules:
  - http:
      paths:
      - path: /test
        pathType: Prefix
        backend:
          service:
            name: echo-service
            port:
              number: 9000
tls:
- hosts:
  - echo.info
  secretName: echo-cert

```

### deploy echo service 

```
➜  minikube-certmanager git:(main) ✗ kubectl create -f echo-server.yaml
deployment.apps/echo created
service/echo-service created
```
### start minikube tunnel 
```
➜  minikube-certmanager git:(main) ✗ minikube tunnel
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...
```

### echo service works with our CA signed certificate.
```
➜  minikube-certmanager git:(main) ✗ curl --cacert <(kubectl -n test get secret echo-server-cert -o jsonpath='{.data.ca\.crt}' | base64 -d) https://echo.info/test
"source":"172.17.0.7:42246","method":"GET","headers":[["host","echo.info"],["x-request-id","6e0035387cfa6be8c53a3e03e73e9f23"],["x-real-ip","172.17.0.1"],["x-forwarded-for","172.17.0.1"],["x-forwarded-host","echo.info"],["x-forwarded-port","443"],["x-forwarded-proto","https"],["x-forwarded-scheme","https"],["x-scheme","https"],["user-agent","curl/7.79.1"],["accept","*/*"]],"path":"/test","server":"echo-6885c7cfdc-8phts"}
```

## source code 

{{< rawhtml >}}
<center>
<a href="https://github.com/sangam14/minikube-certmanager"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/sangam14/minikube-certmanager.png" width="460px"></a> </center>
{{< /rawhtml >}}

Join [CloudNativeFolks Community](https://discord.gg/rEvr7vq) or Reach out to me on twitter [@sangamtwts](https://twitter.com/sangamtwts)
