---
title: "kubeadm"
description: " Use Kubeadm to install a basic cluster "
slug: "kubeadm"
weight: 800
---

kubeadm is the reference installer for Kubernetes that sets up a minimally viable Kubernetes cluster using some best practices. It simplifies the initialization of control plane nodes, the addition (or removal) of nodes to a Kubernetes cluster, and also handles control plane and Kubelet configuration updates.

Kubeadm has a variety of commands and subcommands that will allow you to:
- Create a control plane kubeadm init
- Add a node kubeadm join
- Regenerate certificates kubeadm certificates renew
- Upgrade clusters kubeadm upgrade

A typical kubeadm setup consists of the following characteristics (which you are present in many Kubernetes distributions):
 - Control plane components (like the API Server or scheduler) running as pods
 - Certificate-based communication between the API server and its clients
 - kube-proxy to set up services
 - CoreDNS to provide in-cluster DNS
In order to successfully use Kubeadm, the node must have a kubelet and container runtime installed on the machine:

```
s#!/bin/bash
 
sudo apt update
 
sudo apt install docker.io -y
sudo systemctl enable --now docker
 
sudo swapoff -a
 
sudo apt install -y apt-transport-https ca-certificates curl
 
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
 
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
 
sudo apt update 
 
sudo apt install -y kubeadm=1.29.1-1.1 kubelet=1.29.1-1.1 kubectl=1.29.1-1.1
 

```



### 1. **bridge-nf-call-iptables Does Not Exist**
This error occurs because the `bridge-nf-call-iptables` is not enabled, which is necessary for the iptables proxy to see bridged traffic properly. You need to enable this setting to ensure that network packets are properly forwarded by the host.

**Enable `bridge-nf-call-iptables`**:
1. Load the `br_netfilter` module:
   ```bash
   sudo modprobe br_netfilter
   ```
2. Set `bridge-nf-call-iptables` to 1:
   ```bash
   sudo sysctl net.bridge.bridge-nf-call-iptables=1
   ```
3. To make this change persistent across reboots, add it to your sysctl configuration:
   ```bash
   echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
   ```

### 2. **IP Forwarding Not Enabled**
Kubernetes requires IP forwarding to be enabled to allow containers to communicate with each other and the outside world.

**Enable IP forwarding**:
1. Set IP forwarding to 1:
   ```bash
   sudo sysctl net.ipv4.ip_forward=1
   ```
2. To make this setting permanent:
   ```bash
   echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
   ```
3. Apply the sysctl settings:
   ```bash
   sudo sysctl -p
   ```

### Final Steps
After making these changes, re-run your `kubeadm init` command to proceed with the Kubernetes initialization:

```bash
sudo kubeadm init --cri-socket=unix:///var/run/containerd/containerd.sock
```

These settings will ensure that your system is configured correctly for network traffic management, which is essential for a Kubernetes cluster to function properly. If you continue to experience issues or encounter new errors, rechecking the configurations and ensuring all prerequisites are met before initializing Kubernetes can be helpful.



Once installed, kubeadm init will initialize a control plane for your cluster.

```
sudo kubeadm init --cri-socket=unix:///var/run/containerd/containerd.sock
I0418 14:20:15.325900   51055 version.go:256] remote version is much newer: v1.30.0; falling back to: stable-1.29
[init] Using Kubernetes version: v1.29.4
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
W0418 14:20:38.012478   51055 checks.go:835] detected that the sandbox image "registry.k8s.io/pause:3.8" of the container runtime is inconsistent with that used by kubeadm. It is recommended that using "registry.k8s.io/pause:3.9" as the CRI sandbox image.
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local sangam] and IPs [10.96.0.1 192.168.129.135]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost sangam] and IPs [192.168.129.135 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost sangam] and IPs [192.168.129.135 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "super-admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 7.004807 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node sangam as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node sangam as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: lsz2er.aq8iqirypexwftb5
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.129.135:6443 --token lsz2er.aq8iqirypexwftb5 \
	--discovery-token-ca-cert-hash sha256:99791033630ab01203be30b3306fdf36ec574f40fda2d908f54a976d4b4a3d27 
sangam@sangam:~$ 


```


```
workernode@workernode:~$ sudo rm /etc/kubernetes/kubelet.conf
sudo rm /etc/kubernetes/bootstrap-kubelet.conf
sudo rm /etc/kubernetes/pki/ca.crt
workernode@workernode:~$ sudo ss -ltnp | grep :10250
LISTEN 0      4096               *:10250            *:*    users:(("kubelet",pid=23209,fd=20))       
workernode@workernode:~$ sudo systemctl stop kubelet
sudo systemctl disable kubelet
Removed /etc/systemd/system/multi-user.target.wants/kubelet.service.
workernode@workernode:~$ sudo kubeadm reset
W0418 18:46:14.265856   23698 preflight.go:56] [reset] WARNING: Changes made to this host by 'kubeadm init' or 'kubeadm join' will be reverted.
[reset] Are you sure you want to proceed? [y/N]: y
[preflight] Running pre-flight checks
W0418 18:46:15.832641   23698 removeetcdmember.go:106] [reset] No kubeadm config, using etcd pod spec to get data directory
[reset] Deleted contents of the etcd data directory: /var/lib/etcd
[reset] Stopping the kubelet service
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Deleting contents of directories: [/etc/kubernetes/manifests /var/lib/kubelet /etc/kubernetes/pki]
[reset] Deleting files: [/etc/kubernetes/admin.conf /etc/kubernetes/super-admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/bootstrap-kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf]

The reset process does not clean CNI configuration. To do so, you must remove /etc/cni/net.d

The reset process does not reset or clean up iptables rules or IPVS tables.
If you wish to reset iptables, you must do so manually by using the "iptables" command.

If your cluster was setup to utilize IPVS, run ipvsadm --clear (or similar)
to reset your system's IPVS tables.

The reset process does not clean your kubeconfig files and you must remove them manually.
Please, check the contents of the $HOME/.kube/config file.
workernode@workernode:~$ sudo kubeadm join 192.168.129.135:6443 --token dfs0h9.pru6ez9v84qbw98k --discovery-token-ca-cert-hash sha256:27e8c63c7355d79dd2b0dc98dadcd46e87b3ef05ab181caaddf2c1b2488ae474 
[preflight] Running pre-flight checks
	[WARNING Service-Kubelet]: kubelet service is not enabled, please run 'systemctl enable kubelet.service'
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

```


> NOTE 

```
#!/bin/bash

# Update the system
sudo apt-get update && sudo apt-get upgrade -y

# Enable and start the kubelet service
sudo systemctl enable kubelet.service
sudo systemctl start kubelet.service

# Ensure net.bridge.bridge-nf-call-iptables is set to 1
sudo modprobe br_netfilter
echo "1" | sudo tee /proc/sys/net/bridge/bridge-nf-call-iptables

# Make the setting persistent across reboots
echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf

# Initialize the Kubernetes cluster
sudo kubeadm init --cri-socket=unix:///var/run/containerd/containerd.sock --pod-network-cidr=192.168.0.0/16

# Setting up local kubeconfig
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Apply a CNI (Container Network Interface) plugin - example with Calico
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

echo "Kubernetes cluster initialized successfully!"

angam@sangam:~$ kubectl get nodes -o wide
error: error loading config file "/etc/kubernetes/kubelet.conf": open /etc/kubernetes/kubelet.conf: permission denied
sangam@sangam:~$ export KUBECONFIG=~/.kube/config
echo $KUBECONFIG  # Verify it's set correctly
/home/sangam/.kube/config
sangam@sangam:~$ echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
source ~/.bashrc
sangam@sangam:~$ chmod 644 ~/.kube/config  # Set read and write for owner, read for others
sangam@sangam:~$ kubectl get nodes -o wide


```

> if your using containerd install

```
# Configure persistent loading of modules
sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF

# Load at runtime
sudo modprobe overlay
sudo modprobe br_netfilter

# Ensure sysctl params are set
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# Reload configs
sudo sysctl --system

# Install required packages
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates

# Add Docker repo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install containerd
sudo apt update
sudo apt install -y containerd.io

# Configure containerd and start service
sudo mkdir -p /etc/containerd
sudo containerd config default|sudo tee /etc/containerd/config.toml

# restart containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
systemctl status  containerd
```

### if your using docker 

```
# Add repo and Install packages
sudo apt update
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y containerd.io docker-ce docker-ce-cli

# Create required directories
sudo mkdir -p /etc/systemd/system/docker.service.d

# Create daemon json config file
sudo tee /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

# Start and enable Services
sudo systemctl daemon-reload 
sudo systemctl restart docker
sudo systemctl enable docker

```

### if your using crio

```
# Ensure you load modules
sudo modprobe overlay
sudo modprobe br_netfilter

# Set up required sysctl params
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# Reload sysctl
sudo sysctl --system

# Add Cri-o repo
OS="xUbuntu_20.04"
VERSION=1.28
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/$VERSION/$OS/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:$VERSION.list
curl -L https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:$VERSION/$OS/Release.key | apt-key add -
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/Release.key | apt-key add -

# Install CRI-O
sudo apt update
sudo apt install cri-o cri-o-runc -y

# Update CRI-O CIDR subnet
sudo sed -i 's/10.85.0.0/172.24.0.0/g' /etc/cni/net.d/100-crio-bridge.conf
sudo sed -i 's/10.85.0.0/172.24.0.0/g' /etc/cni/net.d/100-crio-bridge.conflist

# Start and enable Service
sudo systemctl daemon-reload
sudo systemctl restart crio
sudo systemctl enable crio
sudo systemctl status crio
```
