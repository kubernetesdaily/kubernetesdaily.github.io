Comprehensive Kubectl Commands Cheatsheet

> General Commands 

# Check kubectl version
kubectl version --client

# Get cluster info
kubectl cluster-info

# List all contexts in your kubeconfig file
kubectl config get-contexts

# Set the current context
kubectl config use-context <context-name>

# View the current context
kubectl config current-context

# View kubectl configuration
kubectl config view

# List available API resources
kubectl api-resources

# List supported API versions
kubectl api-versions

# Explain a resource (e.g., pod)
kubectl explain pod

# Get available resource types
kubectl api-resources

# View Kubernetes server version
kubectl version

# List all nodes
kubectl get nodes

# Describe a specific node
kubectl describe node <node-name>

> Namespace 

# List all namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace <namespace-name>

# Delete a namespace
kubectl delete namespace <namespace-name>

# Get resources in a specific namespace
kubectl get pods -n <namespace-name>

# List resources across all namespaces
kubectl get pods --all-namespaces

# Switch the default namespace
kubectl config set-context --current --namespace=<namespace-name>

> Pods 

# List all namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace <namespace-name>

# Delete a namespace
kubectl delete namespace <namespace-name>

# Get resources in a specific namespace
kubectl get pods -n <namespace-name>

# List resources across all namespaces
kubectl get pods --all-namespaces

# Switch the default namespace
kubectl config set-context --current --namespace=<namespace-name>

> Services

# List all Services in the current namespace
kubectl get services

# List all Services in all namespaces
kubectl get services --all-namespaces

# Describe a specific Service
kubectl describe service <service-name>

# Create a Service from a YAML file
kubectl apply -f service.yaml

# Create a Service directly from the command line
kubectl expose pod <pod-name> --port=80 --target-port=8080

# Delete a Service
kubectl delete service <service-name>

# Get Service IP and port
kubectl get service <service-name> -o jsonpath='{.spec.clusterIP}:{.spec.ports[0].port}'

# List Services with wide output
kubectl get services -o wide

# Get the YAML configuration of a specific Service
kubectl get service <service-name> -o yaml

> Deployments

# List all Deployments in the current namespace
kubectl get deployments

# List all Deployments in all namespaces
kubectl get deployments --all-namespaces

# Describe a specific Deployment
kubectl describe deployment <deployment-name>

# Create a Deployment from a YAML file
kubectl apply -f deployment.yaml

# Create a Deployment directly from the command line
kubectl create deployment my-deployment --image=nginx

# Scale a Deployment
kubectl scale deployment <deployment-name> --replicas=<number>

# Update a Deployment image
kubectl set image deployment/<deployment-name> <container-name>=<new-image>

# Rollout status of a Deployment
kubectl rollout status deployment/<deployment-name>

# Rollback a Deployment
kubectl rollout undo deployment/<deployment-name>

# Pause a Deployment
kubectl rollout pause deployment/<deployment-name>

# Resume a Deployment
kubectl rollout resume deployment/<deployment-name>

# Get Deployment history
kubectl rollout history deployment/<deployment-name>

# Get the YAML configuration of a specific Deployment
kubectl get deployment <deployment-name> -o yaml

# Delete a Deployment
kubectl delete deployment <deployment-name>

> StatefulSets


# List all StatefulSets in the current namespace
kubectl get statefulsets

# List all StatefulSets in all namespaces
kubectl get statefulsets --all-namespaces

# Describe a specific StatefulSet
kubectl describe statefulset <statefulset-name>

# Create a StatefulSet from a YAML file
kubectl apply -f statefulset.yaml

# Scale a StatefulSet
kubectl scale statefulset <statefulset-name> --replicas=<number>

# Update a StatefulSet image
kubectl set image statefulset/<statefulset-name> <container-name>=<new-image>

# Rollout status of a StatefulSet
kubectl rollout status statefulset/<statefulset-name>

# Rollback a StatefulSet
kubectl rollout undo statefulset/<statefulset-name>

# Pause a StatefulSet
kubectl rollout pause statefulset/<statefulset-name>

# Resume a StatefulSet
kubectl rollout resume statefulset/<statefulset-name>

# Get StatefulSet history
kubectl rollout history statefulset/<statefulset-name>

# Get the YAML configuration of a specific StatefulSet
kubectl get statefulset <statefulset-name> -o yaml

# Delete a StatefulSet
kubectl delete statefulset <statefulset-name>

> DaemonSets

# List all DaemonSets in the current namespace
kubectl get daemonsets

# List all DaemonSets in all namespaces
kubectl get daemonsets --all-namespaces

# Describe a specific DaemonSet
kubectl describe daemonset <daemonset-name>

# Create a DaemonSet from a YAML file
kubectl apply -f daemonset.yaml

# Update a DaemonSet image
kubectl set image daemonset/<daemonset-name> <container-name>=<new-image>

# Rollout status of a DaemonSet
kubectl rollout status daemonset/<daemonset-name>

# Rollback a DaemonSet
kubectl rollout undo daemonset/<daemonset-name>

# Pause a DaemonSet
kubectl rollout pause daemonset/<daemonset-name>

# Resume a DaemonSet
kubectl rollout resume daemonset/<daemonset-name>

# Get DaemonSet history
kubectl rollout history daemonset/<daemonset-name>

# Get the YAML configuration of a specific DaemonSet
kubectl get daemonset <daemonset-name> -o yaml

# Delete a DaemonSet
kubectl delete daemonset <daemonset-name>

> Jobs and CronJobs

# List all Jobs in the current namespace
kubectl get jobs

# List all Jobs in all namespaces
kubectl get jobs --all-namespaces

# Describe a specific Job
kubectl describe job <job-name>

# Create a Job from a YAML file
kubectl apply -f job.yaml

# Delete a Job
kubectl delete job <job-name>

# List all CronJobs in the current namespace
kubectl get cronjobs

# List all CronJobs in all namespaces
kubectl get cronjobs --all-namespaces

# Describe a specific CronJob
kubectl describe cronjob <cronjob-name>

# Create a CronJob from a YAML file
kubectl apply -f cronjob.yaml

# Delete a CronJob
kubectl delete cronjob <cronjob-name>

> ConfigMaps and Secrets
# List all ConfigMaps in the current namespace
kubectl get configmaps

# Describe a specific ConfigMap
kubectl describe configmap <configmap-name>

# Create a ConfigMap from a YAML file
kubectl apply -f configmap.yaml

# Create a ConfigMap from literal values
kubectl create configmap <configmap-name> --from-literal=<key>=<value>

# Create a ConfigMap from a file
kubectl create configmap <configmap-name> --from-file=<filename>

# Delete a ConfigMap
kubectl delete configmap <configmap-name>

# List all Secrets in the current namespace
kubectl get secrets

# Describe a specific Secret
kubectl describe secret <secret-name>

# Create a Secret from a YAML file
kubectl apply -f secret.yaml

# Create a Secret from literal values
kubectl create secret generic <secret-name> --from-literal=<key>=<value>

# Create a Secret from a file
kubectl create secret generic <secret-name> --from-file=<filename>

# Decode a Secret
kubectl get secret <secret-name> -o jsonpath='{.data.<key>}' | base64 --decode

# Delete a Secret
kubectl delete secret <secret-name>

> Persistent Volumes and Persistent Volume Claims

# List all Persistent Volumes
kubectl get pv

# Describe a specific Persistent Volume
kubectl describe pv <pv-name>

# Create a Persistent Volume from a YAML file
kubectl apply -f pv.yaml

# Delete a Persistent Volume
kubectl delete pv <pv-name>

# List all Persistent Volume Claims
kubectl get pvc

# Describe a specific Persistent Volume Claim
kubectl describe pvc <pvc-name>

# Create a Persistent Volume Claim from a YAML file
kubectl apply -f pvc.yaml

# Delete a Persistent Volume Claim
kubectl delete pvc <pvc-name>

# Get Persistent Volume Claim status
kubectl get pvc <pvc-name> -o jsonpath='{.status.phase}'

# List Persistent Volumes with detailed output
kubectl get pv -o wide

# View the YAML configuration of a specific Persistent Volume
kubectl get pv <pv-name> -o yaml

# View the YAML configuration of a specific Persistent Volume Claim
kubectl get pvc <pvc-name> -o yaml

> Network Policies

# List all Network Policies in the current namespace
kubectl get networkpolicies

# List all Network Policies in all namespaces
kubectl get networkpolicies --all-namespaces

# Describe a specific Network Policy
kubectl describe networkpolicy <networkpolicy-name>

# Create a Network Policy from a YAML file
kubectl apply -f networkpolicy.yaml

# Delete a Network Policy
kubectl delete networkpolicy <networkpolicy-name>

# View the YAML configuration of a specific Network Policy
kubectl get networkpolicy <networkpolicy-name> -o yaml

> Ingress

# List all Ingress resources in the current namespace
kubectl get ingress

# List all Ingress resources in all namespaces
kubectl get ingress --all-namespaces

# Describe a specific Ingress
kubectl describe ingress <ingress-name>

# Create an Ingress from a YAML file
kubectl apply -f ingress.yaml

# Delete an Ingress
kubectl delete ingress <ingress-name>

# View the YAML configuration of a specific Ingress
kubectl get ingress <ingress-name> -o yaml

> Service Accounts

# List all Service Accounts in the current namespace
kubectl get serviceaccounts

# List all Service Accounts in all namespaces
kubectl get serviceaccounts --all-namespaces

# Describe a specific Service Account
kubectl describe serviceaccount <serviceaccount-name>

# Create a Service Account from a YAML file
kubectl apply -f serviceaccount.yaml

# Delete a Service Account
kubectl delete serviceaccount <serviceaccount-name>

# View the YAML configuration of a specific Service Account
kubectl get serviceaccount <serviceaccount-name> -o yaml

> Roles and RoleBindings

# List all Roles in the current namespace
kubectl get roles

# List all Roles in all namespaces
kubectl get roles --all-namespaces

# Describe a specific Role
kubectl describe role <role-name>

# Create a Role from a YAML file
kubectl apply -f role.yaml

# Delete a Role
kubectl delete role <role-name>

# List all RoleBindings in the current namespace
kubectl get rolebindings

# List all RoleBindings in all namespaces
kubectl get rolebindings --all-namespaces

# Describe a specific RoleBinding
kubectl describe rolebinding <rolebinding-name>

# Create a RoleBinding from a YAML file
kubectl apply -f rolebinding.yaml

# Delete a RoleBinding
kubectl delete rolebinding <rolebinding-name>

# View the YAML configuration of a specific Role
kubectl get role <role-name> -o yaml

# View the YAML configuration of a specific RoleBinding
kubectl get rolebinding <rolebinding-name> -o yaml

> ClusterRoles and ClusterRoleBindings

# List all ClusterRoles
kubectl get clusterroles

# Describe a specific ClusterRole
kubectl describe clusterrole <clusterrole-name>

# Create a ClusterRole from a YAML file
kubectl apply -f clusterrole.yaml

# Delete a ClusterRole
kubectl delete clusterrole <clusterrole-name>

# List all ClusterRoleBindings
kubectl get clusterrolebindings

# Describe a specific ClusterRoleBinding
kubectl describe clusterrolebinding <clusterrolebinding-name>

# Create a ClusterRoleBinding from a YAML file
kubectl apply -f clusterrolebinding.yaml

# Delete a ClusterRoleBinding
kubectl delete clusterrolebinding <clusterrolebinding-name>

# View the YAML configuration of a specific ClusterRole
kubectl get clusterrole <clusterrole-name> -o yaml

# View the YAML configuration of a specific ClusterRoleBinding
kubectl get clusterrolebinding <clusterrolebinding-name> -o yaml

> ResourceQuotas

# List all ResourceQuotas in the current namespace
kubectl get resourcequotas

# List all ResourceQuotas in all namespaces
kubectl get resourcequotas --all-namespaces

# Describe a specific ResourceQuota
kubectl describe resourcequota <resourcequota-name>

# Create a ResourceQuota from a YAML file
kubectl apply -f resourcequota.yaml

# Delete a ResourceQuota
kubectl delete resourcequota <resourcequota-name>

# View the YAML configuration of a specific ResourceQuota
kubectl get resourcequota <resourcequota-name> -o yaml

> LimitRanges

# List all LimitRanges in the current namespace
kubectl get limitranges

# List all LimitRanges in all namespaces
kubectl get limitranges --all-namespaces

# Describe a specific LimitRange
kubectl describe limitrange <limitrange-name>

# Create a LimitRange from a YAML file
kubectl apply -f limitrange.yaml

# Delete a LimitRange
kubectl delete limitrange <limitrange-name>

# View the YAML configuration of a specific LimitRange
kubectl get limitrange <limitrange-name> -o yaml

> Events

# List all events in the current namespace
kubectl get events

# List all events in all namespaces
kubectl get events --all-namespaces

# Describe a specific event
kubectl describe event <event-name>

# Get events sorted by timestamp
kubectl get events --sort-by=.metadata.creationTimestamp

> Logs and Debugging

# View logs from a specific container in a Pod
kubectl logs <pod-name> -c <container-name>

# Stream logs from a specific container in a Pod
kubectl logs -f <pod-name> -c <container-name>

# View previous logs from a specific container in a Pod
kubectl logs <pod-name> -c <container-name> --previous

# Execute a command inside a container of a Pod
kubectl exec -it <pod-name> -c <container-name> -- /bin/bash

# Get events in the current namespace
kubectl get events

# Get all resources sorted by creation timestamp
kubectl get all --sort-by=.metadata.creationTimestamp

# Port-forward a port from a Pod to your local machine
kubectl port-forward pod/<pod-name> 8080:80

# Port-forward a port from a Service to your local machine
kubectl port-forward svc/<service-name> 8080:80

# Get a Pod's environment variables
kubectl exec <pod-name> -- env

# Get a container's logs from a Pod
kubectl logs <pod-name> -c <container-name>

# Copy files from a Pod to local machine
kubectl cp <pod-name>:/path/to/remote/file /path/to/local/file

# Copy files from local machine to a Pod
kubectl cp /path/to/local/file <pod-name>:/path/to/remote/file

# Debug a Pod with ephemeral containers
kubectl debug -it <pod-name> --image=busybox --target=<container-name>

# View a Pod's resource usage
kubectl top pod <pod-name>

# View nodes' resource usage
kubectl top nodes

# View detailed resource usage of a specific node
kubectl describe node <node-name>

# View detailed resource usage of a specific Pod
kubectl describe pod <pod-name>

# View detailed resource usage of a specific container in a Pod
kubectl describe pod <pod-name> -c <container-name>

> Miscellaneous 

# Get the last applied configuration of a resource
kubectl get <resource>/<name> -o yaml --export

# View server-side diff of resources
kubectl diff -f <filename>

# Annotate a resource
kubectl annotate <resource>/<name> <annotation-key>=<annotation-value>

# Label a resource
kubectl label <resource>/<name> <label-key>=<label-value>

# Remove a label from a resource
kubectl label <resource>/<name> <label-key>-

# Add a taint to a node
kubectl taint nodes <node-name> <key>=<value>:<effect>

# Remove a taint from a node
kubectl taint nodes <node-name> <key>- 

# Add an annotation to a node
kubectl annotate node <node-name> <annotation-key>=<annotation-value>

# Remove an annotation from a node
kubectl annotate node <node-name> <annotation-key>-

# Patch a resource
kubectl patch <resource> <name> --patch '{"spec": {"replicas": 2}}'

# Scale a statefulset
kubectl scale statefulset <statefulset-name> --replicas=3

# Drain a node
kubectl drain <node-name>

# Cordon a node
kubectl cordon <node-name>

# Uncordon a node
kubectl uncordon <node-name>

# Create a resource quota from a file
kubectl apply -f resourcequota.yaml

# Delete a resource quota
kubectl delete resourcequota <quota-name>

# Get resource quotas
kubectl get resourcequotas

# Describe a resource quota
kubectl describe resourcequota <quota-name>

# Get YAML output for a resource
kubectl get <resource> <name> -o yaml

# Get JSON output for a resource
kubectl get <resource> <name> -o json

# Convert a YAML manifest to JSON
kubectl convert -f <filename> -o json

# Create a custom resource
kubectl apply -f customresource.yaml

# Get custom resources
kubectl get <custom-resource>

# Describe a custom resource
kubectl describe <custom-resource> <name>

# Delete a custom resource
kubectl delete <custom-resource> <name>