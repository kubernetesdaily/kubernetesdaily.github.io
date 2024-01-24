---
title: "RBAC"
slug: "RBAC"
weight : 11
---

### Steps to Set Up X509 Certificate Authentication

```
mkdir newusercrt
cd newusercrt 
openssl genrsa --out sangam.key 2048
openssl req -new -key sangam.key -out sangam.csr -subj "/CN=sangam/O=group1"
```

This creates a private key (sangam.key) and a CSR (sangam.csr). The CN (Common Name) is set to the user's name, and O (Organization) is an optional field to specify a group.

### Create a CertificateSigningRequest in Kubernetes

Encode the CSR in base64 and create a YAML file for the Kubernetes CSR object:

```
cat sangam.csr | base64 | tr -d '\n'
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1p6Q0NBVThDQVFBd0lqRVBNQTBHQTFVRUF3d0djMkZ1WjJGdE1ROHdEUVlEVlFRS0RBWm5jbTkxY0RFdwpnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDelJOOHNFYWNkcmsxdVlPTndNejRaCjVqUUYwUTBNNnBqTk9GTVQxM3JMVXV1NzBzMkNhR1lVUEV4bk52Q01kOTk0cTU3bUc0Y3Z6Ny96VTdpcVFRQ3UKcjc5b0xCVEk5YjlPT0EzZXF2TC9uenZrbGxqUGpCcUFuZitYOGRPdEx4ZTJOYnlja1cyamNHOThKdSsvaVR4YgpiWkVHaXZDeHVXQmNiMktnRHRuczYyZHhxWi8vdU9NVW1nK0J3ZFBBbkx0dUl3enR3ZzYzZlNrMHNSSCt3VGwzCjB3ZFVSblJWU1QzaDE4ZXI4ejBHS3g5RFBZSlBjRzJFT2FUTU5uaklUUUoyRzkrNWdDMFBBa1V1SGJNdjQ4NXQKN3U5alZJT09SUVB6bHd5VHdwQndtV0NjR3ZwNnNKNEtzNmRicWVvc2lHem1KbnZ3QjJxejYzZm5ubmI5aElaMwpBZ01CQUFHZ0FEQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFSZ1FHVU13TDFZRmhlZHhNOE9HUHY4ODJ6SEpPCjRRd1IzaW8ySXUyZG9Dc3hGL2RhNTV4K0VNQlBwN1Y5UXhHM2tyTitDNDgyOUdrcTh1WHk1MVJENjNMeWNkM20KdGVHQkZVMEZXeTVUYmVzTjJoMVdEQlMySDYrUmtEelI1dHZzclo3dnlZb2crbDQrckxVRFJNM2t4UWZ3WkExdQoyOTdTSWhQUllqSjJXd2xZeU9mMUJhUDRpa1NtT1JkaVZ5OWNKOGFKZDBjQkFBQ3JxVlppTGRtSTNlT3g4bUtnCklwL3lJRzN5K2hhNTFXQUVWdGdtdllPRVphMVRqZFhsWFRMc3VZNzNwdGJyTFBJYldUVVozdytBcHJwWjVCc3QKWXd3Z2F2NTROQmd1TzVKMTlRL3hlK1RBZXRDdTBVdmN6aHhLUVVFT0ZnMHZSREVNNUgzaG1yYll6QT09Ci0tLS0tRU5EIENFUlRJRklDQVRFIFJFUVVFU1QtLS0tLQo=%  

```

#### sangam-csr.yaml with following content 

cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: sangam
spec:
  groups:
  - system:authenticated
  request: $(cat sangam.csr | base64 | tr -d "\n")
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
EOF


output 

```
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: sangam
spec:
  groups:
  - system:authenticated
  request: $(cat sangam.csr | base64 | tr -d "\n")
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
EOF
certificatesigningrequest.certificates.k8s.io/sangam created

```

#### check csr with kubectl 

```
➜  newusercrt git:(main) ✗ kubectl get csr
NAME     AGE   SIGNERNAME                            REQUESTOR       REQUESTEDDURATION   CONDITION
sangam   57s   kubernetes.io/kube-apiserver-client   minikube-user   <none>              Pending
```

#### Approve the CSR in Kubernetes

List CSRs and approve yours:

```
  newusercrt git:(main) ✗ kubectl certificate approve sangam
certificatesigningrequest.certificates.k8s.io/sangam approved
```

### Retrieve the Signed Certificate

Once approved, retrieve the signed certificate from the CSR:

```
kubectl get csr sangam  -o jsonpath='{.status.certificate}' | base64 --decode > sangam.crt

```

### Set up kubectl for the User

Configure kubectl to use the certificate:

```
 kubectl config set-credentials sangam --client-certificate=sangam.crt --client-key=sangam.key
kubectl config set-context sangam --cluster=minikube --user=sangam
User "sangam" set.
Context "sangam" created.

```

 Now it is time to create context so that the new user can use the cluster. I will name the context as sangam-context. You can name differently as you wish.

```
 kubectl config set-context sangam-context --cluster=minikube --user=sangam

Context "sangam-context" created.

``` 

### Test the Configuration

Switch to the new context and test:

```
kubectl config use-context sangam-context
 kubectl get nodes
Error from server (Forbidden): nodes is forbidden: User "sangam" cannot list resource "nodes" in API group "" at the cluster scope

```


pod-reader-role.yaml
```
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]

```

readpods-rolebinding.yaml

```
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: "sangam"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

```

```
 kubectl config use-context minikube
 kubectl apply -f pod-reader-role.yaml
kubectl apply -f readpods-rolebinding.yaml
role.rbac.authorization.k8s.io/pod-reader created
rolebinding.rbac.authorization.k8s.io/read-pods created
```

## run test ngnix pod 
```
 kubectl run test2 --image=nginx
pod/test2 created
kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
test2   1/1     Running   0          49s


kubectl config use-context sangam-context
Switched to context "sangam-context".

 kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
test2   1/1     Running   0          2m1s


kubectl run test3 --image=nginx
Error from server (Forbidden): pods is forbidden: User "sangam" cannot create resource "pods" in API group "" in the namespace "default"


you would have more robust systems for managing certificates.
The kubectl commands assume that Minikube is your current context and you have the necessary permissions to perform these actions.
The certificate signing process in a real-world scenario might involve additional steps or approvals, depending on the organization's policies.
```


#### Learn more around Role Based Access Control (RBAC)

Role-Based Access Control (RBAC) in Kubernetes is a method of regulating access to computer or network resources based on the roles of individual users within an enterprise. In the context of Kubernetes, RBAC allows you to control who has access to the Kubernetes API and what they can do with those resources

- Rules: A rule is a set of operations (verbs) that can be carried out on a group of resources which belong to different API Groups.

##### kubectl explain role.rules 

```
kubectl explain role.rules     
GROUP:      rbac.authorization.k8s.io
KIND:       Role
VERSION:    v1

FIELD: rules <[]PolicyRule>

DESCRIPTION:
    Rules holds all the PolicyRules for this Role
    PolicyRule holds information that describes a policy rule, but does not
    contain information about who the rule applies to or which namespace the
    rule applies to.
    
FIELDS:
  apiGroups     <[]string>
    APIGroups is the name of the APIGroup that contains the resources.  If
    multiple API groups are specified, any action requested against one of the
    enumerated resources in any API group will be allowed. "" represents the
    core API group and "*" represents all API groups.

  nonResourceURLs       <[]string>
    NonResourceURLs is a set of partial urls that a user should have access to.
    *s are allowed, but only as the full, final step in the path Since
    non-resource URLs are not namespaced, this field is only applicable for
    ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to
    API resources (such as "pods" or "secrets") or non-resource URL paths (such
    as "/api"),  but not both.

  resourceNames <[]string>
    ResourceNames is an optional white list of names that the rule applies to.
    An empty set means that everything is allowed.

  resources     <[]string>
    Resources is a list of resources this rule applies to. '*' represents all
    resources.

  verbs <[]string> -required-
    Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in
    this rule. '*' represents all verbs.

```

- Roles and ClusterRoles: Both consist of rules. The difference between a Role and a ClusterRole is the scope: in a Role, the rules are applicable to a single namespace, whereas a ClusterRole is cluster-wide, so the rules are applicable to more than one namespace. ClusterRoles can define rules for cluster-scoped resources (such as nodes) as well. Both Roles and ClusterRoles are mapped as API Resources inside our cluster.


##### kubectl explain role

```
kubernetesdaily.github.io git:(main) ✗ kubectl explain role      
GROUP:      rbac.authorization.k8s.io
KIND:       Role
VERSION:    v1

DESCRIPTION:
    Role is a namespaced, logical grouping of PolicyRules that can be referenced
    as a unit by a RoleBinding.
    
FIELDS:
  apiVersion    <string>
    APIVersion defines the versioned schema of this representation of an object.
    Servers should convert recognized schemas to the latest internal value, and
    may reject unrecognized values. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

  kind  <string>
    Kind is a string value representing the REST resource this object
    represents. Servers may infer this from the endpoint the client submits
    requests to. Cannot be updated. In CamelCase. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

  metadata      <ObjectMeta>
    Standard object's metadata.

  rules <[]PolicyRule>
    Rules holds all the PolicyRules for this Role

```

##### kubectl explain clusterroles

```
kubernetesdaily.github.io git:(main) ✗ kubectl explain clusterroles
GROUP:      rbac.authorization.k8s.io
KIND:       ClusterRole
VERSION:    v1

DESCRIPTION:
    ClusterRole is a cluster level, logical grouping of PolicyRules that can be
    referenced as a unit by a RoleBinding or ClusterRoleBinding.
    
FIELDS:
  aggregationRule       <AggregationRule>
    AggregationRule is an optional field that describes how to build the Rules
    for this ClusterRole. If AggregationRule is set, then the Rules are
    controller managed and direct changes to Rules will be stomped by the
    controller.

  apiVersion    <string>
    APIVersion defines the versioned schema of this representation of an object.
    Servers should convert recognized schemas to the latest internal value, and
    may reject unrecognized values. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

  kind  <string>
    Kind is a string value representing the REST resource this object
    represents. Servers may infer this from the endpoint the client submits
    requests to. Cannot be updated. In CamelCase. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

  metadata      <ObjectMeta>
    Standard object's metadata.

  rules <[]PolicyRule>
    Rules holds all the PolicyRules for this ClusterRole
```


- Subjects: These correspond to the entity that attempts an operation in the cluster. There are three types of subjects:

- User Accounts: These are global, and meant for humans or processes living outside the cluster. There is no associated resource API Object in the Kubernetes cluster.

- Service Accounts: This kind of account is namespaced and meant for intra-cluster processes running inside pods, which want to authenticate against the API.

- Groups: This is used for referring to multiple accounts. There are some groups created by default such as cluster-admin (explained in later sections).

- RoleBindings and ClusterRoleBindings: Just as the names imply, these bind subjects to roles (i.e. the operations a given user can perform). As for Roles and ClusterRoles, the difference lies in the scope: a RoleBinding will make the rules effective inside a namespace, whereas a ClusterRoleBinding will make the rules effective in all namespaces.

#### kubectl explain rolebinding

```
    ✗ kubectl explain rolebindings
GROUP:      rbac.authorization.k8s.io
KIND:       RoleBinding
VERSION:    v1

DESCRIPTION:
    RoleBinding references a role, but does not contain it.  It can reference a
    Role in the same namespace or a ClusterRole in the global namespace. It adds
    who information via Subjects and namespace information by which namespace it
    exists in.  RoleBindings in a given namespace only have effect in that
    namespace.
    
FIELDS:
  apiVersion    <string>
    APIVersion defines the versioned schema of this representation of an object.
    Servers should convert recognized schemas to the latest internal value, and
    may reject unrecognized values. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

  kind  <string>
    Kind is a string value representing the REST resource this object
    represents. Servers may infer this from the endpoint the client submits
    requests to. Cannot be updated. In CamelCase. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

  metadata      <ObjectMeta>
    Standard object's metadata.

  roleRef       <RoleRef> -required-
    RoleRef can reference a Role in the current namespace or a ClusterRole in
    the global namespace. If the RoleRef cannot be resolved, the Authorizer must
    return an error. This field is immutable.

  subjects      <[]Subject>
    Subjects holds references to the objects the role applies to.

```

#### kubectl explain clusterrolebindings

```
kubectl explain clusterrolebindings
GROUP:      rbac.authorization.k8s.io
KIND:       ClusterRoleBinding
VERSION:    v1

DESCRIPTION:
    ClusterRoleBinding references a ClusterRole, but not contain it.  It can
    reference a ClusterRole in the global namespace, and adds who information
    via Subject.
    
FIELDS:
  apiVersion    <string>
    APIVersion defines the versioned schema of this representation of an object.
    Servers should convert recognized schemas to the latest internal value, and
    may reject unrecognized values. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

  kind  <string>
    Kind is a string value representing the REST resource this object
    represents. Servers may infer this from the endpoint the client submits
    requests to. Cannot be updated. In CamelCase. More info:
    https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

  metadata      <ObjectMeta>
    Standard object's metadata.

  roleRef       <RoleRef> -required-
    RoleRef can only reference a ClusterRole in the global namespace. If the
    RoleRef cannot be resolved, the Authorizer must return an error. This field
    is immutable.

  subjects      <[]Subject>
    Subjects holds references to the objects the role applies to.

```


#### Start Minikube with RBAC enabled:

```
➜  kubernetesdaily.github.io git:(main) ✗ minikube start --extra-config=apiserver.authorization-mode=RBAC

😄  minikube v1.32.0 on Darwin 14.2 (arm64)
✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.28.3 on Docker 24.0.7 ...
    ▪ apiserver.authorization-mode=RBAC
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```
#### create new namespace 

```
kubernetesdaily.github.io git:(main) ✗ kubectl create namespace rbacminikube
namespace/rbacminikube created
```

Define a Role (nginx-role.yaml) that allows managing NGINX resources (pods and services) within the "rbacminikube" namespace:

### create new namespaces with name developement & qa 

```
➜  k8s git:(main) ✗ kubectl create namespace development
kubectl create namespace qa
namespace/development created
namespace/qa created
```

## Why Create Service Accounts?

- Process Identity: Service accounts provide an identity for processes that run in pods, enabling Kubernetes to apply RBAC rules to these processes.

- Scoped Access Control: By associating a service account with certain RBAC roles, you can control what actions the processes running under this account can perform in the Kubernetes cluster.

- Security Best Practices: Using distinct service accounts for different teams or applications is a security best practice. It prevents privilege escalation and limits the impact if a service account is compromised.

dev-service-account.yaml

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: dev-team-sa
  namespace: development

```

qa-service-account.yaml

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: qa-team-sa
  namespace: qa
```

admin-service-account.yaml

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-team-sa
  namespace: default  # or a specific admin namespace
```

### apply all service account 

```
kubectl apply -f dev-service-account.yaml
kubectl apply -f qa-service-account.yaml
kubectl apply -f admin-service-account.yaml
```



#### define role and Rolebindings 

developer role 

Permissions to manage pods in the development namespace.


```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: development-role
  namespace: development
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch", "create", "delete"]
```
  
```  
k8s git:(main) ✗ kubectl apply -f development-role.yaml 
role.rbac.authorization.k8s.io/development-role created
```
read-only access to all resources in the qa namespace.

qa-role.yaml
```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: qa-role
  namespace: qa
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["get", "list", "watch"]

```
```
k8s git:(main) ✗ kubectl apply -f qa-role.yaml
role.rbac.authorization.k8s.io/qa-role created
```

Admin Team ClusterRole (admin-clusterrole.yaml):
Read access to all resources cluster-wide.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: admin-clusterrole
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["get", "list", "watch"]


```
```
kubectl apply -f admin-clusterrole.yaml
clusterrole.rbac.authorization.k8s.io/admin-clusterrole created
```

#### ngnix deploymemt 

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: development
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      serviceAccountName: dev-team-sa
      containers:
      - name: nginx
        image: nginx


```

```
➜  k8s git:(main) ✗ kubectl apply -f nginx-deployment.yaml.yaml                                              

deployment.apps/nginx-deployment created
➜  k8s git:(main) ✗ kubectl get deployments -n development
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   1/1     1            1           31s


#### Check out put 


 minikube service nginx-service -n development
|-------------|---------------|-------------|---------------------------|
|  NAMESPACE  |     NAME      | TARGET PORT |            URL            |
|-------------|---------------|-------------|---------------------------|
| development | nginx-service |          80 | http://192.168.49.2:31744 |
|-------------|---------------|-------------|---------------------------|
🏃  Starting tunnel for service nginx-service.
|-------------|---------------|-------------|------------------------|
|  NAMESPACE  |     NAME      | TARGET PORT |          URL           |
|-------------|---------------|-------------|------------------------|
| development | nginx-service |             | http://127.0.0.1:50198 |
|-------------|---------------|-------------|------------------------|
🎉  Opening service development/nginx-service in default browser...
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.


```
#### can qa role able to access it no 
``` 
kubectl auth can-i get deployments --as=system:serviceaccount:qa:qa-role -n development
no
```