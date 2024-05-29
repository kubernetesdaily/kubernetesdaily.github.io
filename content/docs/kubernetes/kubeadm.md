---
title: "kubeadm"
description: " Use Kubeadm to install a basic cluster "
slug: "kubeadm"
weight: 3
---

### Install kubeadm, kubectl and kubelet on all nodes
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl

sudo mkdir -m 755 /etc/apt/keyrings

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.27/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
```
### To see the new version labels
```
sudo apt-cache madison kubeadm

sudo apt-get install -y kubelet=1.30 kubeadm=1.30 kubectl=1.30

sudo apt-mark hold kubelet kubeadm kubectl
```
# in master node
```
ifconfig eth0

kubeadm init --apiserver-cert-extra-sans=controlplane --apiserver-advertise-address  192.168.129.135 --pod-network-cidr=10.244.0.0/16
```

### control plane 

```
#!/bin/bash

# Step 04 ) Cluster Creation : https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/

# Initialize control-plane node : https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#initializing-your-control-plane-node

# we dont have multiple control plane nodes
# Choose POD Network Addon 
# --pod-network-cidr , --apiserver-advertise-address
sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.56.11

#---------  Cluster Configuration Completed------------------#

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Message from Kubernetes Configuration:
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

kubeadm join 192.168.56.11:6443 --token rfmw9v.exud3pc7riu0vnb4 \
        --discovery-token-ca-cert-hash sha256:d2e00be36a8b5e7b8034800fecd271355e6fd2af2c5d7618b5c98f64b510a0d9

kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml
kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml
kubectl apply -f https://github.com/weaveworks/weave/releases/download/latest_release/weave-daemonset-k8s-1.11.yaml

kubectl get pods -A  #now it shows the containres are up and running
# What did I change : Make sure you remove ipv6 settings , if its an Azure environment makesure on NIC , IP Forwarding is enabled

# Now add weavenet address space
# If you set --cluster-cidr option in kube-proxy make sure it matches the IPALLOC_RANGE given to Weavenet
# ealier we passed : 10.244.0.0/16 as pod network, make sure to pass the same to enviorment variable of IPALLOC_RANGE
container:
  - name: weave
    env:
      -name: IPALLOC_RANGE
       value: 10.244.0.0/16

kubectl get ds -A
kubectl edit ds weave-net -n kube-system
# save above config
kubectl get pods -A

#---- on Worker Nodes -------------------#
sudo kubeadm join 192.168.56.11:6443 --token rfmw9v.exud3pc7riu0vnb4 \
        --discovery-token-ca-cert-hash sha256:d2e00be36a8b5e7b8034800fecd271355e6fd2af2c5d7618b5c98f64b510a0d9

#--- I have successfully spun an kubernetes cluster , I can -----------#

```



### NOTE

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

## if your using containerd install

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
