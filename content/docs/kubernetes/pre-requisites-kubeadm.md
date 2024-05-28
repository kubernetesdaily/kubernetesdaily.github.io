---
title: "pre-requisites"
description: " Includes configuring pre-requisites to install kubeadm  "
weight: 2
---



####  Includes configuring pre-requisites to install kubeadm 

###### step 01) Enable following ports and protcols 

```
on kubemaster : Open following ports : https://kubernetes.io/docs/reference/networking/ports-and-protocols/

sudo ufw status
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw allow 6443/tcp
sudo ufw allow 2379/tcp
sudo ufw allow 2380/tcp
sudo ufw allow 10250/tcp
sudo ufw allow 10259/tcp
sudo ufw allow 10257/tcp
sudo ufw allow 30000:32767/tcp
sudo ufw reload
sudo ufw status

######  ----- kubenode01, kubenode02 ---#

sudo ufw status
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw allow 10250/tcp
sudo ufw allow 30000:32767/tcp
sudo ufw reload
sudo ufw status

sudo iptables -L    #--- on all nodes
```
###### step 02) 

```
------ Install Container Runtime ----------#

#---- on all nodes : Forwarding IPv4 and letting iptables see bridged traffic : https://kubernetes.io/docs/setup/production-environment/container-runtimes/#forwarding-ipv4-and-letting-iptables-see-bridged-traffic

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter
```

######  sysctl params required by setup, params persist across reboots
```
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
```

######  Apply sysctl params without reboot
```
sudo sysctl --system
```
######  Verify that the br_netfilter, overlay modules are loaded
```
lsmod | grep br_netfilter
lsmod | grep overlay
```
######  Verify that the net.bridge.bridge-nf-call-iptables, net.bridge.bridge-nf-call-ip6tables, and net.ipv4.ip_forward system variables are set to 1 in sysctl config
```
sysctl net.bridge.bridge-nf-call-iptables net.bridge.bridge-nf-call-ip6tables net.ipv4.ip_forward
```

######  We are selecting option 2 here using apt-get

 install via package manager : https://docs.docker.com/engine/install/ubuntu/
 Remove old versions  
```
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```
######  setup docker repository
######  Add Docker's official GPG key:

```
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
######  Add the repository to Apt sources:

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
######  Install package
###### we are only interested in containerd

```
#---- on all nodes : Install container runtime ----------- https://github.com/containerd/containerd/blob/main/docs/getting-started.md

sudo apt-get install containerd.io 
systemctl status containerd
```
######  check and install cgroup driver for container runtime and kubelet to integrate with control groups for getting resources from the instance.
#! both kubelet and containerd should use same cgroup driver
##### find if the instances are systemd instances
```
systemctl # if this command runs its a systemd system
ps -p 1 #output should be something   1 ?        Ss     0:02 /sbin/init systemd
```
######  Configure cgroup driver

```
https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd

sudo vi /etc/containerd/config.toml
```
######  copy following content to install cgroup drivers : Tip : delete all the content inside that file using command mode :%d and copy following content. 
```
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true
```
##### save above config and run following
```
sudo systemctl restart containerd
```

