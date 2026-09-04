## pre-requisites


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

# Use Kubeadm to install a basic cluster "


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


# Manage a Highly-Available Kubernetes Cluster 


Kubernetes utilizes a microservices architecture, with all requests initially directed to a central API server microservice, supported by various other components. For high availability in a Kubernetes cluster, it's common to add more control plane nodes, each hosting additional instances of the API Server, Scheduler, and Controller Manager. If etcd is part of the control plane nodes, additional members will also be added to the etcd cluster.

In a setup with multiple control plane nodes, several API Servers operate concurrently in a highly available configuration, all interfacing with the same etcd cluster. This setup ensures that client requests are processed consistently using the shared data. Communication with the API Servers is managed through a single endpoint, such as an external load balancer, which directs traffic to all API Server instances.

Other control plane components like the Scheduler and Controller Manager function on a failover basis. Among the instances of these microservices, one is elected as the active leader to handle all critical tasks. The other instances remain passive and only become active if the current leader fails.

High availability in the control plane is crucial but only part of achieving overall high availability in Kubernetes. For high availability of workloads, additional worker nodes might be necessary, and workloads should be configured to deploy multiple replicas that coordinate with each other.

Kubeadm simplifies the process of expanding your Kubernetes cluster by adding more nodes. To join a new node to the cluster, you first need to generate a join command that includes the API server's address, a unique join token, and the SHA hash of the cluster’s certificate authority (CA) certificate. This command can be generated using the following command on an existing control plane node:

#### master node 

```
sangam@sangam:~$ 
kubeadm token create --print-join-command
kubeadm join 192.168.129.135:6443 --token wahoal.dhn8p2qvkavuq7ge --discovery-token-ca-cert-hash sha256:d401c9e8831da53d4f85bb2b027b1a48f60408d0c241f105677c86e061ab2b4f 

```

#### restart containerd 

```
sangam@sangam:~$ sudo systemctl restart containerd

sangam@sangam:~$ sudo kubectl --kubeconfig /etc/kubernetes/admin.conf get nodes
NAME     STATUS   ROLES           AGE   VERSION
sangam   Ready    control-plane   47m   v1.29.4
```
##### set containerd config 
```
sangam@sangam:~$ sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
disabled_plugins = []
imports = []
oom_score = 0
plugin_dir = ""
required_plugins = []
root = "/var/lib/containerd"
state = "/run/containerd"
temp = ""
version = 2

[cgroup]
  path = ""

[debug]
  address = ""
  format = ""
  gid = 0
  level = ""
  uid = 0

[grpc]
  address = "/run/containerd/containerd.sock"
  gid = 0
  max_recv_message_size = 16777216
  max_send_message_size = 16777216
  tcp_address = ""
  tcp_tls_ca = ""
  tcp_tls_cert = ""
  tcp_tls_key = ""
  uid = 0

[metrics]
  address = ""
  grpc_histogram = false

[plugins]

  [plugins."io.containerd.gc.v1.scheduler"]
    deletion_threshold = 0
    mutation_threshold = 100
    pause_threshold = 0.02
    schedule_delay = "0s"
    startup_delay = "100ms"

  [plugins."io.containerd.grpc.v1.cri"]
    device_ownership_from_security_context = false
    disable_apparmor = false
    disable_cgroup = false
    disable_hugetlb_controller = true
    disable_proc_mount = false
    disable_tcp_service = true
    drain_exec_sync_io_timeout = "0s"
    enable_selinux = false
    enable_tls_streaming = false
    enable_unprivileged_icmp = false
    enable_unprivileged_ports = false
    ignore_deprecation_warnings = []
    ignore_image_defined_volumes = false
    max_concurrent_downloads = 3
    max_container_log_line_size = 16384
    netns_mounts_under_state_dir = false
    restrict_oom_score_adj = false
    sandbox_image = "registry.k8s.io/pause:3.6"
    selinux_category_range = 1024
    stats_collect_period = 10
    stream_idle_timeout = "4h0m0s"
    stream_server_address = "127.0.0.1"
    stream_server_port = "0"
    systemd_cgroup = false
    tolerate_missing_hugetlb_controller = true
    unset_seccomp_profile = ""

    [plugins."io.containerd.grpc.v1.cri".cni]
      bin_dir = "/opt/cni/bin"
      conf_dir = "/etc/cni/net.d"
      conf_template = ""
      ip_pref = ""
      max_conf_num = 1

    [plugins."io.containerd.grpc.v1.cri".containerd]
      default_runtime_name = "runc"
      disable_snapshot_annotations = true
      discard_unpacked_layers = false
      ignore_rdt_not_enabled_errors = false
      no_pivot = false
      snapshotter = "overlayfs"

      [plugins."io.containerd.grpc.v1.cri".containerd.default_runtime]
        base_runtime_spec = ""
        cni_conf_dir = ""
        cni_max_conf_num = 0
        container_annotations = []
        pod_annotations = []
        privileged_without_host_devices = false
        runtime_engine = ""
        runtime_path = ""
        runtime_root = ""
        runtime_type = ""

        [plugins."io.containerd.grpc.v1.cri".containerd.default_runtime.options]

      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]

        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
          base_runtime_spec = ""
          cni_conf_dir = ""
          cni_max_conf_num = 0
          container_annotations = []
          pod_annotations = []
          privileged_without_host_devices = false
          runtime_engine = ""
          runtime_path = ""
          runtime_root = ""
          runtime_type = "io.containerd.runc.v2"

          [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
            BinaryName = ""
            CriuImagePath = ""
            CriuPath = ""
            CriuWorkPath = ""
            IoGid = 0
            IoUid = 0
            NoNewKeyring = false
            NoPivotRoot = false
            Root = ""
            ShimCgroup = ""
            SystemdCgroup = false

      [plugins."io.containerd.grpc.v1.cri".containerd.untrusted_workload_runtime]
        base_runtime_spec = ""
        cni_conf_dir = ""
        cni_max_conf_num = 0
        container_annotations = []
        pod_annotations = []
        privileged_without_host_devices = false
        runtime_engine = ""
        runtime_path = ""
        runtime_root = ""
        runtime_type = ""

        [plugins."io.containerd.grpc.v1.cri".containerd.untrusted_workload_runtime.options]

    [plugins."io.containerd.grpc.v1.cri".image_decryption]
      key_model = "node"

    [plugins."io.containerd.grpc.v1.cri".registry]
      config_path = ""

      [plugins."io.containerd.grpc.v1.cri".registry.auths]

      [plugins."io.containerd.grpc.v1.cri".registry.configs]

      [plugins."io.containerd.grpc.v1.cri".registry.headers]

      [plugins."io.containerd.grpc.v1.cri".registry.mirrors]

    [plugins."io.containerd.grpc.v1.cri".x509_key_pair_streaming]
      tls_cert_file = ""
      tls_key_file = ""

  [plugins."io.containerd.internal.v1.opt"]
    path = "/opt/containerd"

  [plugins."io.containerd.internal.v1.restart"]
    interval = "10s"

  [plugins."io.containerd.internal.v1.tracing"]
    sampling_ratio = 1.0
    service_name = "containerd"

  [plugins."io.containerd.metadata.v1.bolt"]
    content_sharing_policy = "shared"

  [plugins."io.containerd.monitor.v1.cgroups"]
    no_prometheus = false

  [plugins."io.containerd.runtime.v1.linux"]
    no_shim = false
    runtime = "runc"
    runtime_root = ""
    shim = "containerd-shim"
    shim_debug = false

  [plugins."io.containerd.runtime.v2.task"]
    platforms = ["linux/arm64/v8"]
    sched_core = false

  [plugins."io.containerd.service.v1.diff-service"]
    default = ["walking"]

  [plugins."io.containerd.service.v1.tasks-service"]
    rdt_config_file = ""

  [plugins."io.containerd.snapshotter.v1.aufs"]
    root_path = ""

  [plugins."io.containerd.snapshotter.v1.btrfs"]
    root_path = ""

  [plugins."io.containerd.snapshotter.v1.devmapper"]
    async_remove = false
    base_image_size = ""
    discard_blocks = false
    fs_options = ""
    fs_type = ""
    pool_name = ""
    root_path = ""

  [plugins."io.containerd.snapshotter.v1.native"]
    root_path = ""

  [plugins."io.containerd.snapshotter.v1.overlayfs"]
    mount_options = []
    root_path = ""
    sync_remove = false
    upperdir_label = false

  [plugins."io.containerd.snapshotter.v1.zfs"]
    root_path = ""

  [plugins."io.containerd.tracing.processor.v1.otlp"]
    endpoint = ""
    insecure = false
    protocol = ""

[proxy_plugins]

[stream_processors]

  [stream_processors."io.containerd.ocicrypt.decoder.v1.tar"]
    accepts = ["application/vnd.oci.image.layer.v1.tar+encrypted"]
    args = ["--decryption-keys-path", "/etc/containerd/ocicrypt/keys"]
    env = ["OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf"]
    path = "ctd-decoder"
    returns = "application/vnd.oci.image.layer.v1.tar"

  [stream_processors."io.containerd.ocicrypt.decoder.v1.tar.gzip"]
    accepts = ["application/vnd.oci.image.layer.v1.tar+gzip+encrypted"]
    args = ["--decryption-keys-path", "/etc/containerd/ocicrypt/keys"]
    env = ["OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf"]
    path = "ctd-decoder"
    returns = "application/vnd.oci.image.layer.v1.tar+gzip"

[timeouts]
  "io.containerd.timeout.bolt.open" = "0s"
  "io.containerd.timeout.shim.cleanup" = "5s"
  "io.containerd.timeout.shim.load" = "5s"
  "io.containerd.timeout.shim.shutdown" = "3s"
  "io.containerd.timeout.task.state" = "2s"

[ttrpc]
  address = ""
  gid = 0
  uid = 0
sangam@sangam:~$ sudo sed -i 's/            SystemdCgroup = false/            SystemdCgroup = true/' /etc/containerd/config.toml
sangam@sangam:~$ sudo systemctl restart containerd
```


##### worker node 

```
k8s@k8s:~$ sudo kubeadm join 192.168.129.135:6443 --token wahoal.dhn8p2qvkavuq7ge --discovery-token-ca-cert-hash sha256:d401c9e8831da53d4f85bb2b027b1a48f60408d0c241f105677c86e061ab2b4f 
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

```

### check master node

```

sangam@sangam:~$ sudo kubectl --kubeconfig /etc/kubernetes/admin.conf get nodes
NAME     STATUS   ROLES           AGE   VERSION
k8s      Ready    <none>          56s   v1.29.4
sangam   Ready    control-plane   67m   v1.29.4
```

# Perform Version Upgrades on a Kubernetes Cluster using kubeadm"



Perform Version Upgrades on a Kubernetes Cluster using kubeadm

Upgrading a Kubernetes cluster involves updating its core components, which include the Kubernetes API Server, Scheduler, Controller Manager, etcd, and Kubelets. Kubeadm simplifies this process by managing the container versions of these control plane components. Additional tasks such as renewing certificates and updating kubelet configurations are also handled by Kubeadm, utilizing the kubeadm upgrade commands.

When planning an upgrade, you must first decide on the target version. Updates to major APIs typically accompany minor version releases (e.g., from 1.25 to 1.26), while patch releases (e.g., 1.26.0 to 1.26.1) focus on fixes and security enhancements. It's important to note that Kubeadm supports upgrading only one minor version at a time. For instance, to upgrade from version 1.24 to 1.26, you must first upgrade to 1.25 and then proceed to 1.26. The version of the kubeadm tool itself dictates the highest Kubernetes version to which you can upgrade (e.g., kubeadm 1.25.0 cannot upgrade a cluster to Kubernetes 1.26.0).

The upgrade process of the control-plane node involves several key steps:
1. Obtain the latest Kubernetes binaries.
2. Install the newer kubeadm version.
3. Use kubeadm upgrade plan to review and acquire the latest versions of the control plane components.
4. Execute the upgrade.
5. Update the kubelet and kubectl installations on the node.

During the upgrade, it may be necessary to drain the node of reschedulable workloads using `kubectl drain`, ensuring to uncordon the node afterward with `kubectl uncordon` to allow workloads to return.

Here's how to upgrade a Kubernetes control plane node from v1.25.0 to v1.26.0 on Ubuntu 20.04:
- Begin by updating the apt repository.

```

$ sudo apt update

sudo apt install kubeadm=1.26.0-00

```

### check upgrade plan


```
sudo kubeadm upgrade plan
…
Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT   CURRENT       AVAILABLE
kubelet                1 x v1.25.0     v1.26.0

Upgrade to the latest stable version:

COMPONENT                   CURRENT   AVAILABLE
kube-apiserver                   v1.25.0   v1.26.0
kube-controller-manager   v1.25.0   v1.26.0
kube-scheduler                  v1.25.0   v1.26.0
kube-proxy                         v1.25.0   v1.26.0
CoreDNS                           1.6.7        1.7.0
etcd                                    3.5.3-0   3.5.5-1

You can now apply the upgrade by executing the following command:
kubeadm upgrade apply v1.26.0

Note: Before you can perform this upgrade, you have to update kubeadm to v1.26.0.

_____________________________________________________________________


The table below shows the current state of component configs as understood by this version of kubeadm.
Configs that have a "yes" mark in the "MANUAL UPGRADE REQUIRED" column require manual config upgrade or
resetting to kubeadm defaults before a successful upgrade can be performed. The version to manually
upgrade to is denoted in the "PREFERRED VERSION" column.

API GROUP                 CURRENT VERSION   PREFERRED VERSION   MANUAL UPGRADE REQUIRED
kubeproxy.config.k8s.io   v1alpha1          v1alpha1            no
kubelet.config.k8s.io     v1beta1           v1beta1             no
_____________________________________________________________________

```
### use upgrade command 

```
sudo kubeadm upgrade apply v1.26.0
…
[upgrade/successful] SUCCESS! Your cluster was upgraded to "v1.26.0". Enjoy!

[upgrade/kubelet] Now that your control plane is upgraded, please proceed with upgrading your kubelets if you haven't already done so.

```

##### update to desire version 

```

sudo apt install kubelet=1.26.0-00 kubectl=1.26.0-00
…
Setting up kubelet (1.26.0-00) ...
Setting up kubectl (1.26.0-00) ...
```


# etcd Backup and Restore


etcd Backup and Restore

Etcd maintains the active state of the cluster, with the API Servers interacting by writing to and retrieving data from it. Each transaction executed in etcd is logged in a Write-Ahead Log (WAL) file specific to each cluster member. These files, which are updated by transactions initiated by the cluster's "leader," are periodically condensed into snapshots to conserve space. This snapshotting process is an integral part of etcd's routine operations, and snapshots can also be manually triggered using the etcdctl tool with the `snapshot save` command.

### install etcd
```
sudo apt install etcd
```
find server.crt

```
sangam@sangam:~$ sudo find / -name server.crt 2>/dev/null
/etc/kubernetes/pki/etcd/server.crt
```
## take backup

```
sangam@sangam:~$ sudo ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    snapshot save /var/lib/etcd/backup.db
2024-04-26 03:53:42.172131 I | clientv3: opened snapshot stream; downloading
2024-04-26 03:53:42.188033 I | clientv3: completed snapshot read; closing
Snapshot saved at /var/lib/etcd/backup.db
```


### check snapshot 

```

sangam@sangam:~$ sudo ls -lh /var/lib/etcd/backup.db
-rw-r--r-- 1 root root 3.2M Apr 26 03:53 /var/lib/etcd/backup.db
```


# Basics of Pod



#### 0. What is POD learn via Kubectl Explain 


```sh
kubectl explain pod 
KIND:     Pod
VERSION:  v1

DESCRIPTION:
     Pod is a collection of containers that can run on a host. This resource is
     created by clients and scheduled onto hosts.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Specification of the desired behavior of the pod. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Most recently observed status of the pod. This data may not be up to date.
     Populated by the system. Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


```


#### 1. Create a Pod from Nginx Image

```sh
➜  k8sworkshop git:(main) ✗ kubectl run nginx --image=nginx

pod/nginx created

➜ k8sworkshop git:(main) ✗ kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          25s

```
#### 2. Create a Pod and Expose a Port
```sh
➜  k8sworkshop git:(main) ✗ kubectl run nginx-port --image=nginx --port=80
pod/nginx-port created
➜  k8sworkshop git:(main) ✗ kubectl describe pod nginx-port
Name:             nginx-port
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Mon, 06 Mar 2023 01:44:56 +0530
Labels:           run=nginx-port
Annotations:      <none>
Status:           Running
IP:               172.17.0.4
IPs:
  IP:  172.17.0.4
Containers:
  nginx-port:
    Container ID:   docker://8260b161cc305d1cf4060dff9edbd0b05e86d9c4fc441b5a0a51b9dbe35403d3
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Mon, 06 Mar 2023 01:44:59 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-ffpjx (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-ffpjx:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  20s   default-scheduler  Successfully assigned default/nginx-port to minikube
  Normal  Pulling    20s   kubelet            Pulling image "nginx"
  Normal  Pulled     18s   kubelet            Successfully pulled image "nginx" in 2.236192917s
  Normal  Created    18s   kubelet            Created container nginx-port
  Normal  Started    18s   kubelet            Started container nginx-port
➜  k8sworkshop git:(main) ✗ 
```


#### 3. Output the Manifest File

```sh
kubectl run nginx --image=nginx --port=80 --dry-run=client -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```
alternative 


```sh
 kubectl run nginx --image=nginx --port=80 --dry-run=client -o yaml > ngnix.yaml
➜  k8sworkshop git:(main) ✗ ls
LICENSE           context           data              ngnix.yaml        package.json      styles
README.md         course.json       lessons           node_modules      pages             workshop
components        csv               next.config.js    package-lock.json public
➜  k8sworkshop git:(main) ✗ cat ngnix.yaml 
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
  - image: nginx
    name: nginx
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
➜  k8sworkshop git:(main) ✗ 

```

#### 4. Delete PODS
```sh
 k8sworkshop git:(main) ✗ kubectl delete pod nginx
pod "nginx" deleted

➜  k8sworkshop git:(main) ✗ kubectl delete pod --all
pod "nginx-port" deleted
```


#### List the Worker Node
```sh
kubectl get nodes 
```
#### Create a new POD from Nginx Image
```sh
kubectl run mywebserver --image=nginx
```
#### List  the PODS that are currently running.
```sh
kubectl get pods
```
#### Connect inside the POD
```sh
kubectl exec -it mywebserver -- bash
```
You can come out of the POD with CTRL+D
```sh
kubectl exec -it mywebserver -- ls -l /
```
#### Delete the POD
```sh
kubectl delete pod mywebserver
```

##### pod-expose-port.yaml

```sh
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  -  image: nginx
     name: democontainer
     ports:
       - containerPort: 8080
```
```sh
kubectl apply -f pod-expose-port.yaml
```
```sh
kubectl get pods

kubectl describe pod nginx-pod

➜  k8sworkshop git:(main) ✗ kubectl explain pod.spec.containers.ports
KIND:     Pod
VERSION:  v1

RESOURCE: ports <[]Object>

DESCRIPTION:
     List of ports to expose from the container. Not specifying a port here DOES
     NOT prevent that port from being exposed. Any port which is listening on
     the default "0.0.0.0" address inside a container will be accessible from
     the network. Modifying this array with strategic merge patch may corrupt
     the data. For more information See
     https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.

     ContainerPort represents a network port in a single container.

FIELDS:
   containerPort        <integer> -required-
     Number of port to expose on the pod's IP address. This must be a valid port
     number, 0 < x < 65536.

   hostIP       <string>
     What host IP to bind the external port to.

   hostPort     <integer>
     Number of port to expose on the host. If specified, this must be a valid
     port number, 0 < x < 65536. If HostNetwork is specified, this must match
     ContainerPort. Most containers do not need this.

   name <string>
     If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
     named port in a pod must have a unique name. Name for the port that can be
     referred to by services.

   protocol     <string>
     Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
     Possible enum values:
     - `"SCTP"` is the SCTP protocol.
     - `"TCP"` is the TCP protocol.
     - `"UDP"` is the UDP protocol.

➜  k8sworkshop git:(main) ✗ 
```


### Finding a Pod’s Cluster IP

```sh
k8s101 git:(main) ✗ kubectl get pod -o wide
NAME         READY   STATUS    RESTARTS   AGE    IP           NODE       NOMINATED NODE   READINESS GATES
nginx-pod    1/1     Running   0          95s    172.17.0.7   minikube   <none>           <none>
nginx-port   1/1     Running   0          108m   172.17.0.3   minikube   <none>           <none>

```

### Finding a Service’s IP

We can find a Service IP using kubectl as well. In this case we will list all services in all namespaces:

```sh
➜  k8s101 git:(main) ✗ kubectl get service --all-namespaces

NAMESPACE              NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                  AGE
default                kubernetes                  ClusterIP   10.96.0.1       <none>        443/TCP                  114d
kube-system            kube-dns                    ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP,9153/TCP   114d
kube-system            metrics-server              ClusterIP   10.106.73.183   <none>        443/TCP                  36m
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.109.38.100   <none>        8000/TCP                 110m
kubernetes-dashboard   kubernetes-dashboard        ClusterIP   10.108.78.110   <none>        80/TCP                   110m
➜  k8s101 git:(main) ✗ 

```


```sh
➜  k8s101 git:(main) ✗ kubectl get pod nginx-pod  --template='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'
8080

```

# Labels and Selectors


#### Labels -  Maps (aka Dictionaries)

```sh
➜  k8s101 git:(main) ✗ kubectl explain deployment.metadata.labels
KIND:     Deployment
VERSION:  apps/v1

FIELD:    labels <map[string]string>

DESCRIPTION:
     Map of string keys and values that can be used to organize and categorize
     (scope and select) objects. May match selectors of replication controllers
     and services. More info: http://kubernetes.io/docs/user-guide/labels
```

- Labels are attached to Kubernetes objects and are simple key: value pairs or maps(dictionary). <br>
- Labels are used to store identifying information about a thing that you might need to query against. <br>
- Labels are used for organization and selection of subsets of objects, and can be added to objects at creation time and/or modified at any time during cluster operations. <br>
- You will see them on pods, replication controllers, replica sets, services, and so on. <br>

```sh
“labels”: {
“tier”: “frontend”
env: prod
}

```

#### Selectors -  Maps (aka Dictionaries)

- Labels are queryable — which makes them especially useful in organizing things <br>
-  A label selector is a string that identifies which labels you are trying to match <br>
- You will see them on pods, replication controllers, replica sets, services, and so on. <br>

``````sh
tier = frontend
tier != frontend
environment in (production, qa)
``````

#### Annotations
- Annotations are bits of useful information you might want to store about a pod (or cluster, node, etc.) that you will not have to query against.
- They are also key/value pairs and have the same rules as labels.
- Examples of things you might put there are the pager contact, the build date, or a pointer to more information someplace else—like a URL.

#### Method-1: Assign labels while creating a new object

```sh
kubectl create deployment label-nginx-example --image=nginx --dry-run=client -oyaml > label-nginx-example.yml
# clean up the template and add a label app: prod
```

```sh
➜ k8s101 git:(main) ✗  cat label-nginx-example.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: prod
  name: label-nginx-example
spec:
  replicas: 2
  selector:
    matchLabels:
      app: prod
  template:
    metadata:
      labels:
        app: prod
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f label-nginx-example.yml
deployment.apps/label-nginx-example created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get deployments --show-labels

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE   LABELS
label-nginx-example   1/1     1            1           23s   app=label-nginx-example
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                  READY   STATUS    RESTARTS   AGE   LABELS
label-nginx-example-848d6df75-x8bb6   1/1     Running   0          45s   app=label-nginx-example,pod-template-hash=848d6df75
➜  k8s101 git:(main) ✗ 

```


####  Assign a new label to existing pod runtime as a patch

will assign new label "tier: frontend" to our existing Pods from the deployment label-nginx-example

```sh
[root@controller ~]# cat update-label.yml
spec:
  template:
    metadata:
      labels:
        tier: frontend
```

### Next patch the deployment with this YAML file

```sh
➜  k8s101 git:(main) ✗ kubectl patch deployment label-nginx-example --patch "$(cat update-label.yml)"
deployment.apps/label-nginx-example patched
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe deployment label-nginx-example
Name:                   label-nginx-example
Namespace:              default
CreationTimestamp:      Tue, 07 Mar 2023 05:40:07 +0530
Labels:                 app=label-nginx-example
Annotations:            deployment.kubernetes.io/revision: 2
Selector:               app=label-nginx-example
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=label-nginx-example
           tier=frontend
  Containers:
   nginx:
    Image:        nginx
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   label-nginx-example-5f8bc677b9 (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  4m35s  deployment-controller  Scaled up replica set label-nginx-example-848d6df75 to 1
  Normal  ScalingReplicaSet  74s    deployment-controller  Scaled up replica set label-nginx-example-5f8bc677b9 to 1
  Normal  ScalingReplicaSet  70s    deployment-controller  Scaled down replica set label-nginx-example-848d6df75 to 0 from 1
➜  k8s101 git:(main) ✗ 
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                   READY   STATUS    RESTARTS   AGE     LABELS
label-nginx-example-5f8bc677b9-92lp9   1/1     Running   0          7m31s   app=label-nginx-example,pod-template-hash=5f8bc677b9,tier=frontend
```


####  Method-3: Assign a new label to existing deployments runtime using kubectl

I have another deployment nginx-deploy on my cluster, so I will assign label tier: backend to this deployment:

```sh
kubectl label deployment nginx-deploy tier=backend

kubectl get deployments --show-labels

```
####  Using labels to list resource objects

```sh
kubectl get pods --show-labels

kubectl get deployments --show-labels

kubectl get all --show-labels

--- #To list all the deployments using type: dev label:
kubectl get deployments -l type=dev

kubectl get pods -l app=prod
```

####  Using Selector to list resource objects

I will create another deployment here with two labels and use one of the label as selector:

```sh
# cat lab-nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: dev
    tier: backend
  name: lab-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dev
  template:
    metadata:
      labels:
        app: dev
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f lab-nginx.yml
deployment.apps/lab-nginx created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods --show-labels
NAME                                   READY   STATUS    RESTARTS   AGE   LABELS
lab-nginx-84756b7fc4-8h2jr             1/1     Running   0          31s   app=dev,pod-template-hash=84756b7fc4
lab-nginx-84756b7fc4-pgxbr             1/1     Running   0          31s   app=dev,pod-template-hash=84756b7fc4
label-nginx-example-5f8bc677b9-92lp9   1/1     Running   0          14m   app=label-nginx-example,pod-template-hash=5f8bc677b9,tier=frontend
```

```sh
➜  k8s101 git:(main) ✗ 
kubectl get pods --selector "app=dev"
NAME                         READY   STATUS    RESTARTS   AGE
lab-nginx-84756b7fc4-8h2jr   1/1     Running   0          5m44s
lab-nginx-84756b7fc4-pgxbr   1/1     Running   0          5m44s
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods -l app=dev
NAME                         READY   STATUS    RESTARTS   AGE
lab-nginx-84756b7fc4-8h2jr   1/1     Running   0          6m47s
lab-nginx-84756b7fc4-pgxbr   1/1     Running   0          6m47s
```

#####  Removing labels

```
kubectl get pods --show-labels

kubectl get deployments --show-labels

```

# Create POD with Command and Arguments


####  kubectl explain pods.spec.containers.command  

```sh
k8s101 git:(main) ✗ kubectl explain pods.spec.containers.command  
KIND:     Pod
VERSION:  v1

FIELD:    command <[]string>

DESCRIPTION:
     Entrypoint array. Not executed within a shell. The container image's
     ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME)
     are expanded using the container's environment. If a variable cannot be
     resolved, the reference in the input string will be unchanged. Double $$
     are reduced to a single $, which allows for escaping the $(VAR_NAME)
     syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
     Escaped references will never be expanded, regardless of whether the
     variable exists or not. Cannot be updated. More info:
     https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
➜  k8s101 git:(main) ✗ 
```

#### Create POD without any commands or arguments.
args in Kubernetes overrides CMD in the original docker image.
command in Kubernetes overrides ENTRYPOINT in the original docker image.

##### commands.yaml

```yml
apiVersion: v1
kind: Pod
metadata:
  name: command
spec:
  containers:
  -  image: busybox
     name: count
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
pod/command created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME         READY   STATUS             RESTARTS     AGE
command      0/1     CrashLoopBackOff   1 (5s ago)   15s
nginx-pod    1/1     Running            0            50m
nginx-port   1/1     Running            0            156m
webserver    1/1     Running            0            34m
➜  k8s101 git:(main) ✗ kubectl exec -it command -- bash

```

#### Create POD with Command

Modify the POD contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command2
spec:
  containers:
  -  image: busybox
     name: count
     command: ["sleep","3600"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
pod/command2 created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
command    1/1     Running   0          67s
➜  k8s101 git:(main) ✗ kubectl exec -it command2 -- sh
/ # ls
bin    dev    etc    home   lib    lib64  proc   root   sys    tmp    usr    var
/ # 
```

#### Create POD with Command and Arguments

Modify the YAML file contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command3
spec:
  containers:
  -  image: busybox
     name: count
     command: ["sleep"]
     args: ["3600"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml 
pod/command3 created
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
command    1/1     Running   0          3m18s
command2   1/1     Running   0          2m34s
command3   1/1     Running   0          14s
```

#### Create POD with Arguments

Modify the YAML file contents to the following one.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: command3
spec:
  containers:
  - name: command3
    image: debian
    command: ["printenv"]
    args: ["HOSTNAME", "KUBERNETES_PORT"]
```
```sh
➜  k8s101 git:(main) ✗ kubectl apply -f commands.yaml
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods
➜  k8s101 git:(main) ✗ kubectl logs command3    
command3
tcp://10.96.0.1:443
```


# Use Cases for Multi-Container Pods 


##### Why does Kubernetes allow more than one container in a Pod
- Containers in a Pod runs on a "logical host": they use the same network namespace (same IP address and port space), they can use shared volumes
- using several containers for an application is simpler to use, more transparent, and allows decoupling software dependencies

##### Use Cases for Multi-Container Pods

The primary purpose of a multi-container Pod is to support co-located, co-managed helper processes for a main program

Sidecar containers:
"help" the main container. For example, log or data change watchers, monitoring adapters, and so on.
A log watcher, for example, can be built once by a different team and reused across different applications
Another example of a sidecar container is a file or data loader that generates data for the main container.

#### Communication Between Containers in a Pod

Shared volumes:
you can use a shared Kubernetes Volume as a simple and efficient way to share data between containers in a Pod.
Volumes enables data to survive container restarts. It has the same lifetime as a Pod.
it is sufficient to use a directory on the host that is shared with all containers within a Pod

- A standard use case for a multi-container Pod with shared Volume is when one container writes to the shared directory (logs or other files), and the other container reads from the shared directory
- The second container uses Debian image and has the shared volume mounted to the directory /html. The second container every second adds current date and time and into index.html that is located in the shared volume.
- Nginx servers reads this file and transfers it to the user for each HTTP request to the web server.

```sh
apiVersion: v1
kind: Pod
metadata:
  name: mc1
spec:
  volumes:
  - name: html
    emptyDir: {}
  containers:
  - name: 1st
    image: nginx
    volumeMounts:
    - name: html
      mountPath: /usr/share/nginx/html
  - name: 2nd
    image: debian
    volumeMounts:
    - name: html
      mountPath: /html
    command: ["/bin/sh", "-c"]
    args:
      - while true; do
          date >> /html/index.html;
          sleep 1;
        done

```
#### kubectl apply 

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f mc1.yaml 
pod/mc1 created

```

#### exec into mc1 pod 1st container 

```sh
➜  k8s101 git:(main) ✗ kubectl exec mc1 -c 1st -- /bin/cat /usr/share/nginx/html/index.html
Mon Mar  6 18:30:15 UTC 2023
Mon Mar  6 18:30:16 UTC 2023
Mon Mar  6 18:30:17 UTC 2023
Mon Mar  6 18:30:18 UTC 2023
Mon Mar  6 18:30:20 UTC 2023
Mon Mar  6 18:30:21 UTC 2023
Mon Mar  6 18:30:22 UTC 2023
Mon Mar  6 18:30:23 UTC 2023
Mon Mar  6 18:30:24 UTC 2023
Mon Mar  6 18:30:25 UTC 2023
Mon Mar  6 18:30:26 UTC 2023
Mon Mar  6 18:30:27 UTC 2023
Mon Mar  6 18:30:28 UTC 2023
Mon Mar  6 18:30:29 UTC 2023
Mon Mar  6 18:30:30 UTC 2023
Mon Mar  6 18:30:31 UTC 2023
Mon Mar  6 18:30:32 UTC 2023
Mon Mar  6 18:30:33 UTC 2023
Mon Mar  6 18:30:34 UTC 2023
Mon Mar  6 18:30:35 UTC 2023
Mon Mar  6 18:30:36 UTC 2023
Mon Mar  6 18:30:37 UTC 2023
Mon Mar  6 18:30:38 UTC 2023
Mon Mar  6 18:30:39 UTC 2023
Mon Mar  6 18:30:40 UTC 2023
Mon Mar  6 18:30:41 UTC 2023
Mon Mar  6 18:30:42 UTC 2023
Mon Mar  6 18:30:43 UTC 2023
Mon Mar  6 18:30:44 UTC 2023
Mon Mar  6 18:30:45 UTC 2023
Mon Mar  6 18:30:46 UTC 2023
Mon Mar  6 18:30:47 UTC 2023
Mon Mar  6 18:30:48 UTC 2023
Mon Mar  6 18:30:49 UTC 2023
Mon Mar  6 18:30:50 UTC 2023
Mon Mar  6 18:30:51 UTC 2023
Mon Mar  6 18:30:52 UTC 2023
Mon Mar  6 18:30:53 UTC 2023
Mon Mar  6 18:30:54 UTC 2023
Mon Mar  6 18:30:55 UTC 2023
Mon Mar  6 18:30:56 UTC 2023
Mon Mar  6 18:30:57 UTC 2023
Mon Mar  6 18:30:58 UTC 2023
Mon Mar  6 18:30:59 UTC 2023
Mon Mar  6 18:31:00 UTC 2023
Mon Mar  6 18:31:01 UTC 2023
Mon Mar  6 18:31:02 UTC 2023
Mon Mar  6 18:31:03 UTC 2023
Mon Mar  6 18:31:04 UTC 2023
Mon Mar  6 18:31:05 UTC 2023
Mon Mar  6 18:31:06 UTC 2023
Mon Mar  6 18:31:07 UTC 2023
Mon Mar  6 18:31:08 UTC 2023
Mon Mar  6 18:31:09 UTC 2023
Mon Mar  6 18:31:10 UTC 2023
Mon Mar  6 18:31:11 UTC 2023
Mon Mar  6 18:31:12 UTC 2023
Mon Mar  6 18:31:13 UTC 2023
Mon Mar  6 18:31:14 UTC 2023
Mon Mar  6 18:31:15 UTC 2023
Mon Mar  6 18:31:16 UTC 2023
Mon Mar  6 18:31:17 UTC 2023
Mon Mar  6 18:31:18 UTC 2023
Mon Mar  6 18:31:19 UTC 2023
Mon Mar  6 18:31:20 UTC 2023
Mon Mar  6 18:31:21 UTC 2023
Mon Mar  6 18:31:22 UTC 2023
Mon Mar  6 18:31:23 UTC 2023
Mon Mar  6 18:31:24 UTC 2023
Mon Mar  6 18:31:25 UTC 2023
Mon Mar  6 18:31:26 UTC 2023
Mon Mar  6 18:31:27 UTC 2023
Mon Mar  6 18:31:28 UTC 2023
Mon Mar  6 18:31:29 UTC 2023
Mon Mar  6 18:31:30 UTC 2023
Mon Mar  6 18:31:31 UTC 2023
Mon Mar  6 18:31:32 UTC 2023
Mon Mar  6 18:31:33 UTC 2023
Mon Mar  6 18:31:34 UTC 2023
Mon Mar  6 18:31:35 UTC 2023
Mon Mar  6 18:31:36 UTC 2023
Mon Mar  6 18:31:37 UTC 2023
Mon Mar  6 18:31:38 UTC 2023
Mon Mar  6 18:31:39 UTC 2023
Mon Mar  6 18:31:40 UTC 2023
Mon Mar  6 18:31:41 UTC 2023
Mon Mar  6 18:31:42 UTC 2023
Mon Mar  6 18:31:43 UTC 2023
Mon Mar  6 18:31:44 UTC 2023
Mon Mar  6 18:31:45 UTC 2023
```

#### exec into mc1 pod 3nd container 

```sh
 k8s101 git:(main) ✗  kubectl exec mc1 -c 2nd -i -t -- bash -il
root@mc1:/# ls
bin  boot  dev  etc  home  html  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@mc1:/# cd html
root@mc1:/html# ls
index.html
root@mc1:/html# 
```


#### Kubernetes has three Object Types you should know about:

- Pods - runs one or more closely related containers

- Services - sets up networking in a Kubernetes cluster

- Deployment - Maintains a set of identical pods, ensuring that they have the correct config and that the right number of them exist.

Pods:

- Runs a single set of containers
- Good for one-off dev purposes
- Rarely used directly in production

Deployment:

- Runs a set of identical pods
- Monitors the state of each pod, updating as necessary
- Good for dev
- Good for production


Pod templates : 

Controllers for workload resources create Pods from a pod template and manage those Pods on your behalf.

-PodTemplates are specifications for creating Pods, and are included in workload resources such as Deployments, Jobs, and DaemonSets.

```
k8sworkshop git:(main) ✗ kubectl get all
NAME           READY   STATUS             RESTARTS         AGE
pod/command3   0/1     CrashLoopBackOff   65 (4m59s ago)   20h
pod/mc1        2/2     Running            0                77m

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   115d

```


# Deployments and replication



#### Kubectl explain Deployment 

```sh
k8sworkshop git:(main) ✗ kubectl explain deployments
KIND:     Deployment
VERSION:  apps/v1

DESCRIPTION:
     Deployment enables declarative updates for Pods and ReplicaSets.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Specification of the desired behavior of the Deployment.

   status       <Object>
     Most recently observed status of the Deployment.

➜  k8sworkshop git:(main) ✗ 

```



#### Kubectl explain Replicaset 

```sh
➜  k8sworkshop git:(main) ✗ kubectl explain rs
KIND:     ReplicaSet
VERSION:  apps/v1

DESCRIPTION:
     ReplicaSet ensures that a specified number of pod replicas are running at
     any given time.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     If the Labels of a ReplicaSet are empty, they are defaulted to be the same
     as the Pod(s) that the ReplicaSet manages. Standard object's metadata. More
     info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Spec defines the specification of the desired behavior of the ReplicaSet.
     More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Status is the most recently observed status of the ReplicaSet. This data
     may be out of date by some window of time. Populated by the system.
     Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

➜  k8sworkshop git:(main) ✗ 
```

#### Overview on Kubernetes Deployment

Kubernetes also provides Deployment resource that sits on top of ReplicaSets and enables declarative application updates. 

- When running Pods in datacenter, additional features may be needed such as scalability, updates and rollback etc which are offered by Deployments  <br>

- A Deployment is a higher-level resource meant for deploying applications and updating them declaratively, instead of doing it through a 
ReplicationController or a ReplicaSet, which are both considered lower-level concepts.
 <br>
- When you create a Deployment, a ReplicaSet resource is created underneath. Replica-Sets replicate and manage pods, as well. <br>

- When using a Deployment, the actual pods are created and managed by the Deployment’s ReplicaSets, not by the Deployment directly  <br>

##### Create Kubernetes Deployment resource

In the deployment spec, following properties are managed:

- `replicas`: explains how many copies of each Pod should be running  <br>
- `strategy`: explains how Pods should be updated  <br>
- `selector`: uses matchLabels to identify how labels are matched against the Pod <br>
- `template`: contains the pod specification and is used in a deployment to create Pods <br>
- `scale` deployment: `kubectl scale deployment nginx-deployment --replicas 10`  <br>
- `set image` : `kubectl set image deployment nginx-deployment nginx=nginx:1.91 --record`  <br>
- `rollout undo`:` kubectl rollout undo deployment nginx-deployment`  <br>

we will create a new deployment using kubectl using --dry-run so that actually a deployment is not created but just verified

```sh
➜ k8sworkshop git:(main) ✗ kubectl create deployment nginx-deploy --image=nginx --dry-run=client -o yaml > nginx-deploy.yml

-- Basic Template to cleanup

[root@controller ~]# cat nginx-deploy.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx-deploy
  name: nginx-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-deploy
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx-deploy
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}

--- #Modify the contents of the deployment template
# cat nginx-deploy.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    type: dev
  name: nginx-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      type: dev
  template:
    metadata:
      labels:
        type: dev
    spec:
      containers:
      - image: nginx
        name: nginx
```

```sh
➜  k8sworkshop git:(main) ✗ kubectl create -f nginx-deploy.yml
deployment.apps/nginx-deploy created

```
```sh
➜  k8sworkshop git:(main) ✗ kubectl rollout status deployment nginx-deploy
deployment "nginx-deploy" successfully rolled out
```

```sh
➜  k8sworkshop git:(main) ✗ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
nginx-deploy-66dc98fc6f-6ws8k   1/1     Running   0          37s
nginx-deploy-66dc98fc6f-btk6j   1/1     Running   0          37s
```
```sh
kubectl describe Pod <NAME>
➜  k8sworkshop git:(main) ✗ kubectl describe Pod nginx-deploy-66dc98fc6f-6ws8k 
Name:             nginx-deploy-66dc98fc6f-6ws8k
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Tue, 07 Mar 2023 02:12:20 +0530
Labels:           pod-template-hash=66dc98fc6f
                  type=dev
Annotations:      <none>
Status:           Running
IP:               172.17.0.4
IPs:
  IP:           172.17.0.4
Controlled By:  ReplicaSet/nginx-deploy-66dc98fc6f
Containers:
  nginx:
    Container ID:   docker://79a285bd1e02d96c1880958d20aa4cf64060c630ecb03dac37665994a8b4574a
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Tue, 07 Mar 2023 02:12:25 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7wpgb (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-7wpgb:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  93s   default-scheduler  Successfully assigned default/nginx-deploy-66dc98fc6f-6ws8k to minikube
  Normal  Pulling    92s   kubelet            Pulling image "nginx"
  Normal  Pulled     88s   kubelet            Successfully pulled image "nginx" in 4.282948252s
  Normal  Created    88s   kubelet            Created container nginx
  Normal  Started    88s   kubelet            Started container nginx
➜  k8sworkshop git:(main) ✗ 
```
```sh
➜  k8sworkshop git:(main) ✗ kubectl get rs
NAME                      DESIRED   CURRENT   READY   AGE
nginx-deploy-66dc98fc6f   2         2         2       3m30s
```

##### Using Kubernetes RollingUpdate

You have two ways of updating all those pods. You can do one of the following:

- Recreate: Delete all existing pods first and then start the new ones. This will lead to a temporary unavailability. <br>
- RollingUpdate: Updates Pod one at a time to guarantee availability of the application. This is the preferred approach and you can further tune its behaviour.

The RollingUpdate strategy options are used to guarantee a certain minimal and maximal amount of Pods to be always available:

- maxUnavailable: The maximum number of Pods that can be unavailable during updating. The value could be a percentage (the default is 25%).
- maxSurge: The maximum number of Pods that can be created over the desired number of ReplicaSet during updating.  the value of maxSurge cannot be 0


```sh
vim rolling-nginx.yml
----
# cat rolling-nginx.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-nginx
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: rolling-nginx
  template:
    metadata:
      labels:
        app: rolling-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.9
```

```sh
➜  k8s101 git:(main) ✗ kubectl create -f rolling-nginx.yml
deployment.apps/rolling-nginx created
```

```sh
➜  k8s101 git:(main) ✗ kubectl get pods
NAME                             READY   STATUS              RESTARTS   AGE
nginx-deploy-66dc98fc6f-6ws8k    1/1     Running             0          15m
nginx-deploy-66dc98fc6f-btk6j    1/1     Running             0          15m
rolling-nginx-77f89bcf9c-2cgps   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-l7cvh   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-nx888   0/1     ContainerCreating   0          13s
rolling-nginx-77f89bcf9c-xn2z5   0/1     ContainerCreating   0          13s
```
```sh
➜  k8s101 git:(main) ✗ kubectl get deployments
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy    2/2     2            2           15m
rolling-nginx   1/4     4            1           50s
```
```sh
➜  k8s101 git:(main) ✗ kubectl get event --field-selector involvedObject.name=rolling-nginx-77f89bcf9c-xn2z5 
LAST SEEN   TYPE     REASON      OBJECT                               MESSAGE
99s         Normal   Scheduled   pod/rolling-nginx-77f89bcf9c-xn2z5   Successfully assigned default/rolling-nginx-77f89bcf9c-xn2z5 to minikube
99s         Normal   Pulling     pod/rolling-nginx-77f89bcf9c-xn2z5   Pulling image "nginx:1.9"
43s         Normal   Pulled      pod/rolling-nginx-77f89bcf9c-xn2z5   Successfully pulled image "nginx:1.9" in 56.078369942s
43s         Normal   Created     pod/rolling-nginx-77f89bcf9c-xn2z5   Created container nginx
43s         Normal   Started     pod/rolling-nginx-77f89bcf9c-xn2z5   Started container nginx
```
#### Check rollout history

But why CHANGE-CAUSE is showing NONE? It is because we have not used --record while creating our deployment. 
The --record argument will add the command under CHANGE-CAUSE for each revision history
```sh
 k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         <none>

➜  k8s101 git:(main) ✗ kubectl delete deployment rolling-nginx
deployment.apps "rolling-nginx" deleted
```

#### this time I will use --record along with kubectl create:

```sh
k8s101 git:(main) ✗ kubectl create -f rolling-nginx.yml --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx created
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=rolling-nginx.yml --record=true
```
```sh
➜  k8s101 git:(main) ✗ kubectl set image deployment rolling-nginx nginx=nginx:1.15 --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx image updated
```
#### Monitor the rolling update status

To monitor the rollout status you can use:

```sh
➜  k8s101 git:(main) ✗ kubectl set image deployment rolling-nginx nginx=nginx:1.16 --record
Flag --record has been deprecated, --record will be removed in the future
deployment.apps/rolling-nginx image updated
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout pause deployment rolling-nginx
deployment.apps/rolling-nginx paused
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout status deployment rolling-nginx
deployment "rolling-nginx" successfully rolled out
```
```sh
➜  k8s101 git:(main) ✗ kubectl get pods -l app=rolling-nginx
NAME                             READY   STATUS    RESTARTS   AGE
rolling-nginx-55fc56899f-8hlm4   1/1     Running   0          2m30s
rolling-nginx-55fc56899f-g4b6p   1/1     Running   0          2m30s
rolling-nginx-55fc56899f-hnbs8   1/1     Running   0          2m22s
rolling-nginx-55fc56899f-jngcd   1/1     Running   0          2m21s
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout resume deployment rolling-nginx
deployment.apps/rolling-nginx resumed
```

#### Rolling back (undo) an update
To monitor the rollout status you can use:

```sh
➜  k8s101 git:(main) ✗ kubectl rollout history deployment rolling-nginx
deployment.apps/rolling-nginx 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=rolling-nginx.yml --record=true
2         kubectl set image deployment rolling-nginx nginx=nginx:1.15 --record=true
3         kubectl set image deployment rolling-nginx nginx=nginx:1.16 --record=true
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout undo deployment rolling-nginx --to-revision=2
deployment.apps/rolling-nginx rolled back
```
```sh
➜  k8s101 git:(main) ✗ kubectl rollout status deployment rolling-nginx
deployment "rolling-nginx" successfully rolled out

```

```sh
➜  k8s101 git:(main) ✗ kubectl delete pod --all 
pod "nginx-deploy-66dc98fc6f-6ws8k" deleted
pod "nginx-deploy-66dc98fc6f-btk6j" deleted
pod "rolling-nginx-b746d459b-874mv" deleted
pod "rolling-nginx-b746d459b-gtgpk" deleted
pod "rolling-nginx-b746d459b-txc5j" deleted
pod "rolling-nginx-b746d459b-vw4rf" deleted
➜  k8s101 git:(main) ✗ kubectl delete deployment --all 
deployment.apps "nginx-deploy" deleted
deployment.apps "rolling-nginx" deleted
```


# Manage role based access control (RBAC)


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

# ConfigMap 



#### craete index-html-configmap.yaml with following content 

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: index-html-configmap
  namespace: default
data:
  index.html: |
    <html>
    <h1>Welcome</h1>
    </br>
    <h1>Hi! This is a configmap Index file </h1>
    </html>
```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f index-html-configmap.yaml
configmap/index-html-configmap created

```

#### craete nginx.yaml with following content 


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        volumeMounts:
            - name: nginx-index-file
              mountPath: /usr/share/nginx/html/
      volumes:
      - name: nginx-index-file
        configMap:
          name: index-html-configmap

```


```sh
➜  k8s101 git:(main) ✗ kubectl apply -f ngnix.yaml 
deployment.apps/nginx-deployment created
```

#### craete nginx-service.yaml with following content 


```yaml

apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: default
spec:
  selector:
    app: nginx
  type: NodePort
  ports:
  - port: 80
    nodePort: 32000
    targetPort: 80


 ```


```sh
➜  k8s101 git:(main) ✗ kubectl apply -f nginx-service.yaml
service/nginx-service created
```


```sh
➜  k8s101 git:(main) ✗ kubectl get svc
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP          14h
nginx-service   NodePort    10.105.136.166   <none>        80:32000/TCP     49s
web             NodePort    10.100.132.142   <none>        8080:30646/TCP   123m
web2            NodePort    10.98.210.102    <none>        8080:31990/TCP   61m
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ minikube service nginx-service
|-----------|---------------|-------------|---------------------------|
| NAMESPACE |     NAME      | TARGET PORT |            URL            |
|-----------|---------------|-------------|---------------------------|
| default   | nginx-service |          80 | http://192.168.49.2:32000 |
|-----------|---------------|-------------|---------------------------|
🏃  Starting tunnel for service nginx-service.
|-----------|---------------|-------------|------------------------|
| NAMESPACE |     NAME      | TARGET PORT |          URL           |
|-----------|---------------|-------------|------------------------|
| default   | nginx-service |             | http://127.0.0.1:53149 |
|-----------|---------------|-------------|------------------------|
🎉  Opening service default/nginx-service in default browser...
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```


#### you will see output in browser 
```
Welcome


Hi! This is a configmap Index file
```


# Kubernetes Service 


#### kubectl explain svc 

```sh
➜  k8s101 git:(main) ✗ kubectl explain svc
KIND:     Service
VERSION:  v1

DESCRIPTION:
     Service is a named abstraction of software service (for example, mysql)
     consisting of local port (for example 3306) that the proxy listens on, and
     the selector that determines which pods will answer requests sent through
     the proxy.

FIELDS:
   apiVersion   <string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind <string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata     <Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec <Object>
     Spec defines the behavior of a service.
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

   status       <Object>
     Most recently observed status of the service. Populated by the system.
     Read-only. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status


```

#### Create Kubernetes Service

A Kubernetes Service is an object you create to provide a single, stable access point to a set of pods that provide the same service. <br>

A service can be backed by more than one pod. When you connect to a service, the connection is passed to one of the backing pods. <br>

Add labels to Pod objects and specify the label selector in the Service object. The pods whose labels match the selector are part of the service registered service endpoints. <br>

- The shorthand for services is svc  <br>

#### Understanding different Kubernetes Service Types

- ClusterIP: It is the default type, but it provides internal access only. <br>

- NodePort: which allocates a specific node port which needs to be opened on the firewall. That means that by using these node ports, external users, as long as they can reach out to the nodes' IP addresses, are capable of reaching out to the Service.
<br>
- LoadBalancer: currently only implemented in public cloud. So if you're on Kubernetes in Azure or AWS, you will find a load balancer. <br>

- ExternalName: which is a relatively new object that works on DNS names and redirection is happening at the DNS level.
Service without selector: which is used for direct connections based on IP port combinations without an endpoint. And this is useful for connections to a database or between namespaces.
<br>

#### Using kubectl expose

The easiest way to create a service is through kubectl expose

```sh
kubectl create deployment nginx-lab-1 --image=nginx --replicas=3 --dry-run=client -o yaml > nginx-lab-1.yml

---- # modify few sections and following is my final template file to create a new deployment nginx-lab-1 with a label app=dev and 3 replicas.
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: dev
  name: nginx-lab-1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dev
  template:
    metadata:
      labels:
        app: dev
    spec:
      containers:
      - image: nginx
        name: nginx

---
# cat quote for pod
apiVersion: v1
kind: Service
metadata:
  name: quote
spec:
  type: ClusterIP
  selector:
    app: quote
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP

```

```
➜  k8s101 git:(main) ✗ kubectl create -f nginx-lab-1.yml
deployment.apps/nginx-lab-1 created
service/quote created

```

#### To create the service, you’ll tell Kubernetes to expose the Deployment you created earlier, here port 80 is the default port on which our nginx application would be listening on.

```sh
➜  k8s101 git:(main) ✗ kubectl expose deployment nginx-lab-1 --type=NodePort --port=80
service/nginx-lab-1 exposed
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe svc nginx-lab-1
Name:                     nginx-lab-1
Namespace:                default
Labels:                   app=dev
Annotations:              <none>
Selector:                 app=dev
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.98.242.63
IPs:                      10.98.242.63
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31613/TCP
Endpoints:                172.17.0.13:80,172.17.0.14:80,172.17.0.15:80 + 2 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

```

##### Accessing cluster-internal services

- The ClusterIP services you created in the previous section are accessible only within the cluster, from other pods and from the cluster nodes. <br>
- use the kubectl exec command to run a command like curl in an existing pod and get it to connect to the service. <br>

To use the service from a pod, run a shell in the quote-001
 In my case, the quiz service uses cluster IP 10.99.118.40, whereas the quote service uses IP 10.98.242.63


#### Access container outsusteride the clluster 

Now to access the container externally from the outside network we can use the public IP of individual worker node along with the NodePort

curl https://<PUBLIC-IP>:<NODE-PORT>

```sh
kubectl get pods -o wide

```
#### Creating a service through a YAML descriptor

```sh
[root@controller ~]# cat 2048.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: "2048-deployment"
spec:
  selector:
    matchLabels:
      app: "2048"
  replicas: 5
  template:
    metadata:
      labels:
        app: "2048"
    spec:
      containers:
      - image: alexwhen/docker-2048
        imagePullPolicy: Always
        name: "2048"
        ports:
        - containerPort: 80
          protocol: TCP
-- ##### Creating a NodePort service
apiVersion: v1
kind: Service
metadata:
  name: myservice
  labels:
    app: servicelabel
spec:
  type: NodePort
  ports:
  - port: 80
  selector:
    app: "2048"
```  

```sh
kubectl create -f 2048.yml
```


```sh
➜  k8s101 git:(main) ✗ kubectl get pods -o wide
NAME                                   READY   STATUS    RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
2048-deployment-9ccbf58bd-57tng        1/1     Running   0          50s     172.17.0.12   minikube   <none>           <none>
2048-deployment-9ccbf58bd-78pnr        1/1     Running   0          50s     172.17.0.14   minikube   <none>           <none>
2048-deployment-9ccbf58bd-mbfrt        1/1     Running   0          50s     172.17.0.13   minikube   <none>           <none>
2048-deployment-9ccbf58bd-tfcnd        1/1     Running   0          50s     172.17.0.9    minikube   <none>           <none>
2048-deployment-9ccbf58bd-trxqw        1/1     Running   0          50s     172.17.0.11   minikube   <none>           <none>
kube-ops-view-5b596b7c7d-z2p2v         1/1     Running   0          7h37m   172.17.0.17   minikube   <none>           <none>
kube-ops-view-redis-6dc75f67cd-klhpf   1/1     Running   0          7h37m   172.17.0.16   minikube   <none>           <none>
lab-nginx-84756b7fc4-4qctt             1/1     Running   0          7h37m   172.17.0.19   minikube   <none>           <none>
lab-nginx-84756b7fc4-rhg4m             1/1     Running   0          7h37m   172.17.0.18   minikube   <none>           <none>
label-nginx-example-5f8bc677b9-6trt6   1/1     Running   0          7h37m   172.17.0.20   minikube   <none>           <none>
my-release-kubeview-f7447cf6c-2w85w    1/1     Running   0          7h37m   172.17.0.21   minikube   <none>           <none>
nginx-1-ff5997cdf-kpff9                1/1     Running   0          7h37m   172.17.0.7    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-77kvz           1/1     Running   0          7h37m   172.17.0.8    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-r9cmt           1/1     Running   0          7h37m   172.17.0.4    minikube   <none>           <none>
nginx-lab-1-84756b7fc4-sqbf4           1/1     Running   0          7h37m   172.17.0.10   minikube   <none>           <none>

```
```sh
➜  k8s101 git:(main) ✗ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        31m
myservice    NodePort    10.111.94.141   <none>        80:31487/TCP   2m55s
```
```sh
➜  k8s101 git:(main) ✗ kubectl describe service myservice 
Name:                     myservice
Namespace:                default
Labels:                   app=servicelabel
Annotations:              <none>
Selector:                 app=2048
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.111.94.141
IPs:                      10.111.94.141
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31487/TCP
Endpoints:                172.17.0.11:80,172.17.0.12:80,172.17.0.13:80 + 2 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
➜  k8s101 git:(main) ✗ 

```

##### Accessing a NodePort service

```
➜  k8s101 git:(main) ✗ minikube service myservice 
|-----------|-----------|-------------|---------------------------|
| NAMESPACE |   NAME    | TARGET PORT |            URL            |
|-----------|-----------|-------------|---------------------------|
| default   | myservice |          80 | http://192.168.49.2:31487 |
|-----------|-----------|-------------|---------------------------|
🏃  Starting tunnel for service myservice.
|-----------|-----------|-------------|------------------------|
| NAMESPACE |   NAME    | TARGET PORT |          URL           |
|-----------|-----------|-------------|------------------------|
| default   | myservice |             | http://127.0.0.1:60323 |
|-----------|-----------|-------------|------------------------|
🎉  Opening service default/myservice in default browser...
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```


# Service Type - NodePort,ClusterIP,LoadBalancer 


#### Service Type1: NodePort

NodePort service helps expose the Service on each Node’s IP at a static port (the NodePort). NodePort The port is available to all the workers in the cluster. A ClusterIP Service, to which the NodePort Service routes are automatically created. One would be able to contact the NodePort Service, from outside the cluster, by requesting <NodeIP>:<NodePort>.
The port on the POD is called the targetPort and the one connecting the NodePort service to the POD is called port.
All this means if any request coming into port 30080 to the cluster on any worker node will be forwarded to the “Node Port Service,” which in turn will forward the request to the underlying Pod at port 80.


Let’s start with creating a deployment using the YAML file below. Some key things to note, each container is using the port 80 and has a label called app:nginx


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: my-nginx-deploy
    labels:
        app: nginx
spec:
    replicas: 2
    selector:
        matchLabels:
            app: nginx
    template:
        metadata:
            labels:
                app: nginx
        spec:
            containers:
            - name: test-nginx
              image: nginx:alpine
              ports:
              - containerPort: 80

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f my-nginx-deploy.yml
deployment.apps/my-nginx-deploy created
➜  k8s101 git:(main) ✗ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
my-nginx-deploy-5c9989fcf4-pqpgj       1/1     Running   0          17s
my-nginx-deploy-5c9989fcf4-zkq8p       1/1     Running   0          17s
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-pqpgj  | grep -i IP: | head -1
IP:               172.17.0.22

➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-zkq8p  | grep -i IP: | head -1
IP:               172.17.0.15
```

```sh
kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
my-nginx-deploy-6b5d6b54bc-7pbmk   1/1     Running   0          7m47s
my-nginx-deploy-6b5d6b54bc-glhnt   1/1     Running   0          7m47s
```

```sh
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-pqpgj  | grep -i IP: | head -1
IP:               172.17.0.22
➜  k8s101 git:(main) ✗ kubectl describe pod my-nginx-deploy-5c9989fcf4-zkq8p  | grep -i IP: | head -1
IP:               172.17.0.15
➜  k8s101 git:(main) ✗ kubectl exec my-nginx-deploy-5c9989fcf4-pqpgj -it sh  
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
/ # apk add curl
fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/main/aarch64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/community/aarch64/APKINDEX.tar.gz
OK: 43 MiB in 62 packages
/ # curl http://172.17.0.22:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
/ # exit 
```

So how do we reach the PODs externally?
To reach the pods from outside the cluster, one needs to expose the port on the host machine to redirect the traffic to a port of the container. NodePort Service provides that capability.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
      # By default the `targetPort` is set to the same value as the `port` field.
    - port: 80
      targetPort: 80
      # Optional field
      # By default and for convenience, the Kubernetes control plane will allocate a port from a range (default: 30000-32767)
      nodePort: 30007
```

```
kubectl apply -f nodeport.yml
service/my-service created
kubectl get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
my-service   NodePort    10.110.8.243   <none>        80:30007/TCP   12m
```


NodePort service created has a virtual IP (10.110.8.243) assigned to it called ClusterIp, using which it can be accessed internally. To access the service, since we are using minikube, let’s see where the service is hosted for external usage.

```sh
  k8s101 git:(main) ✗ minikube service my-service          
|-----------|------------|-------------|---------------------------|
| NAMESPACE |    NAME    | TARGET PORT |            URL            |
|-----------|------------|-------------|---------------------------|
| default   | my-service |          80 | http://192.168.49.2:30007 |
|-----------|------------|-------------|---------------------------|
🏃  Starting tunnel for service my-service.
|-----------|------------|-------------|------------------------|
| NAMESPACE |    NAME    | TARGET PORT |          URL           |
|-----------|------------|-------------|------------------------|
| default   | my-service |             | http://127.0.0.1:61723 |
|-----------|------------|-------------|------------------------|
🎉  Opening service default/my-service in default browser...

```


|`Feature`| `ClusterIP` | `NodePort` | `LoadBalancer`|
|:----|:---- |:------:| -----:|
|**Exposition**|Exposes the Service on an internal IP in the cluster.|Exposing services to external clients|Exposing services to external clients|
|**Cluster** |This type makes the Service only reachable from within the cluster|A NodePort service, each cluster node opens a port on the node itself (hence the name) and redirects traffic received on that port to the underlying service.|A LoadBalancer service accessible through a dedicated load balancer, provisioned from the cloud infrastructure Kubernetes is running on|
|**Accessibility**|It is **default** service and Internal clients send requests to a stable internal IP address.|The service is accessible at the internal cluster IP-port, and also through a dedicated port on all nodes.|Clients connect to the service through the load balancer’s IP.|
|**Yaml Config**|`type: ClusterIP `|`type: NodePort`|`type: LoadBalancer`|
|**Port Range**|Any public ip form Cluster|30000 - 32767|Any public ip form Cluster|
|**User Cases**| For internal communication |Best for testing public or private access or providing access for a small amount of time.| widely used For External communication|



### ClusterIP

ClusterIP is the default ServiceType and it creates a single IP address that can be used to access its Pods which can only be accessed from inside the cluster. If KubeDNS is enabled it will also get a series of DNS records assigned to it include an A record to match its IP. This is very useful for exposing microservices running inside the same Kubernetes cluster to each other.

```sh
kubectl run hello --image=paulczar/hello-world
deployment "hello" created
```

```sh
kubectl expose deployment hello --port=8080 --type=ClusterIP
service "hello" exposed
$ kubectl run -i --tty --rm debug --image=alpine \
  --restart=Never -- wget -qO - hello:8080
<html><head><title>hello world</title></head><body>hello world!</body></html>
$ kubectl delete service hello
service "hello" deleted
```

Since KubeDNS is enabled in minikube by default you can access the service via DNS using the name of the service.

### NodePort

NodePort builds on top of ClusterIP to create a mapping from each Worker Node’s static IP on a specified (or Kubernetes chosen) Port. A Service exposed as a NodePort can be accessed via <node-ip-address>:<node-port>. This ServiceType can be useful when developing applications with minikube or for exposing a specific Port to an application via an unmanaged load balancer or round robin DNS.

```sh
$ kubectl expose deployment hello --port=8080 --type=NodePort
service "hello" exposed
$ kubectl get service hello
NAME      TYPE       CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
hello     NodePort   10.0.0.231   <none>        8080:30259/TCP   21s
$ minikube ip
192.168.99.100
$ curl 192.168.99.100:30259
<html><head><title>hello world</title></head><body>hello world!</body></html>
$ kubectl delete service hello
service "hello" deleted
```

### LoadBalancer

LoadBalancer builds on top of NodePort and is used to automatically configure a supported external Load Balancer (for instance an ELB in Amazon) to route traffic through to the NodePort of the Service. This is the most versatile of the ServiceTypes but requires that you have a supported Load Balancer in your infrastructure of which most major cloud providers have.
In minikube this would produce the same result as a NodePort as minikube does not have a load balancer. However we can demonstrate it on Google Cloud quite easily if you have an account:

```sh
$ kubectl run hello --image=paulczar/hello-world
deployment "hello" created
$ kubectl expose deployment hello --port=8080 --type=LoadBalancer
service "hello" exposed
$ kubectl get service 
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)          AGE
hello        LoadBalancer   10.11.251.34   35.192.25.113   8080:32107/TCP   2m
$ curl 35.192.25.113:8080
<html><head><title>hello world</title></head><body>hello world!</body></html>
```

```sh
➜  k8s101 git:(main) ✗ minikube addons list
|-----------------------------|----------|--------------|--------------------------------|
|         ADDON NAME          | PROFILE  |    STATUS    |           MAINTAINER           |
|-----------------------------|----------|--------------|--------------------------------|
| ambassador                  | minikube | disabled     | 3rd party (Ambassador)         |
| auto-pause                  | minikube | disabled     | Google                         |
| cloud-spanner               | minikube | disabled     | Google                         |
| csi-hostpath-driver         | minikube | disabled     | Kubernetes                     |
| dashboard                   | minikube | enabled ✅   | Kubernetes                     |
| default-storageclass        | minikube | enabled ✅   | Kubernetes                     |
| efk                         | minikube | disabled     | 3rd party (Elastic)            |
| freshpod                    | minikube | disabled     | Google                         |
| gcp-auth                    | minikube | disabled     | Google                         |
| gvisor                      | minikube | disabled     | Google                         |
| headlamp                    | minikube | disabled     | 3rd party (kinvolk.io)         |
| helm-tiller                 | minikube | disabled     | 3rd party (Helm)               |
| inaccel                     | minikube | disabled     | 3rd party (InAccel             |
|                             |          |              | [info@inaccel.com])            |
| ingress                     | minikube | disabled     | Kubernetes                     |
| ingress-dns                 | minikube | disabled     | Google                         |
| istio                       | minikube | disabled     | 3rd party (Istio)              |
| istio-provisioner           | minikube | disabled     | 3rd party (Istio)              |
| kong                        | minikube | disabled     | 3rd party (Kong HQ)            |
| kubevirt                    | minikube | disabled     | 3rd party (KubeVirt)           |
| logviewer                   | minikube | disabled     | 3rd party (unknown)            |
| metallb                     | minikube | disabled     | 3rd party (MetalLB)            |
| metrics-server              | minikube | enabled ✅   | Kubernetes                     |
| nvidia-driver-installer     | minikube | disabled     | Google                         |
| nvidia-gpu-device-plugin    | minikube | disabled     | 3rd party (Nvidia)             |
| olm                         | minikube | disabled     | 3rd party (Operator Framework) |
| pod-security-policy         | minikube | disabled     | 3rd party (unknown)            |
| portainer                   | minikube | disabled     | 3rd party (Portainer.io)       |
| registry                    | minikube | disabled     | Google                         |
| registry-aliases            | minikube | disabled     | 3rd party (unknown)            |
| registry-creds              | minikube | disabled     | 3rd party (UPMC Enterprises)   |
| storage-provisioner         | minikube | enabled ✅   | Google                         |
| storage-provisioner-gluster | minikube | disabled     | 3rd party (Gluster)            |
| volumesnapshots             | minikube | disabled     | Kubernetes                     |
|-----------------------------|----------|--------------|--------------------------------|
💡  To see addons list for other profiles use: `minikube addons -p name list`
➜  k8s101 git:(main) ✗ minikube addons enable metallb 
❗  metallb is a 3rd party addon and is not maintained or verified by minikube maintainers, enable at your own risk.
❗  metallb does not currently have an associated maintainer.
    ▪ Using image docker.io/metallb/speaker:v0.9.6
    ▪ Using image docker.io/metallb/controller:v0.9.6
🌟  The 'metallb' addon is enabled
➜  k8s101 git:(main) ✗ 
```

```sh
➜  k8s101 git:(main) ✗ kubectl get ns
NAME                   STATUS   AGE
default                Active   116d
kube-node-lease        Active   116d
kube-public            Active   116d
kube-system            Active   116d
kubernetes-dashboard   Active   46h
metallb-system         Active   155m
➜  k8s101 git:(main) ✗ kubectl get all -n metallb-system
NAME                              READY   STATUS    RESTARTS   AGE
pod/controller-55496b5cd7-p4k6g   1/1     Running   0          155m
pod/speaker-8l8kb                 1/1     Running   0          155m

NAME                     DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
daemonset.apps/speaker   1         1         1       1            1           beta.kubernetes.io/os=linux   155m

NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/controller   1/1     1            1           155m

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/controller-55496b5cd7   1         1         1       155m
```

```
➜  k8s101 git:(main) ✗ minikube ip
192.168.49.2
➜  k8s101 git:(main) ✗  minikube addons configure metallb
-- Enter Load Balancer Start IP:  192.168.49.100
-- Enter Load Balancer End IP: 192.168.49.120
    ▪ Using image docker.io/metallb/controller:v0.9.6
    ▪ Using image docker.io/metallb/speaker:v0.9.6
✅  metallb was successfully configured
➜  k8s101 git:(main) ✗ 
```

#### create ngnix deployment via Loadbalancer 


```sh
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
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
        image: nginx:1.14.2
        ports:
        - containerPort: 80

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f ngnix-metallb.yaml 
service/nginx-svc created
deployment.apps/nginx-deployment created

➜  k8s101 git:(main) ✗ kubectl get po,svc  
NAME                                       READY   STATUS    RESTARTS   AGE
pod/2048-deployment-9ccbf58bd-57tng        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-78pnr        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-mbfrt        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-tfcnd        1/1     Running   0          6h18m
pod/2048-deployment-9ccbf58bd-trxqw        1/1     Running   0          6h18m
pod/kube-ops-view-5b596b7c7d-z2p2v         1/1     Running   0          13h
pod/kube-ops-view-redis-6dc75f67cd-klhpf   1/1     Running   0          13h
pod/lab-nginx-84756b7fc4-4qctt             1/1     Running   0          13h
pod/lab-nginx-84756b7fc4-rhg4m             1/1     Running   0          13h
pod/label-nginx-example-5f8bc677b9-6trt6   1/1     Running   0          13h
pod/my-nginx-deploy-5c9989fcf4-pqpgj       1/1     Running   0          4h23m
pod/my-nginx-deploy-5c9989fcf4-zkq8p       1/1     Running   0          4h23m
pod/my-release-kubeview-f7447cf6c-2w85w    1/1     Running   0          13h
pod/nginx-1-ff5997cdf-kpff9                1/1     Running   0          13h
pod/nginx-deployment-7fb96c846b-cm296      1/1     Running   0          80s
pod/nginx-lab-1-84756b7fc4-77kvz           1/1     Running   0          13h
pod/nginx-lab-1-84756b7fc4-r9cmt           1/1     Running   0          13h
pod/nginx-lab-1-84756b7fc4-sqbf4           1/1     Running   0          13h

NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)        AGE
service/kubernetes   ClusterIP      10.96.0.1        <none>           443/TCP        6h46m
service/my-service   NodePort       10.103.55.123    <none>           80:30007/TCP   3h22m
service/myservice    NodePort       10.111.94.141    <none>           80:31487/TCP   6h18m
service/nginx-svc    LoadBalancer   10.104.216.130   192.168.49.100   80:31150/TCP   80s
➜  k8s101 git:(main) ✗ 
```
```sh
k8s101 git:(main) ✗ minikube tunnel
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗  The service/ingress nginx-svc requires privileged ports to be exposed: [80]
🔑  sudo permission will be asked for it.
🏃  Starting tunnel for service nginx-svc.
¸^C✋  Stopped tunnel for service nginx-svc.
```

#### open localhost on 80 port 

localhost:80 

#  NetworkPolicy 

Creating effective Kubernetes Network Policies involves defining rules that explicitly allow or deny traffic to and from your pods. Here are some example policies to help you understand how to set up both restrictive (deny) and permissive (allow) behaviors in your cluster.

### 1. Default Deny All Traffic to a Namespace
A common starting point in securing a namespace in Kubernetes is to deny all traffic to all pods within a namespace. This "default deny" policy doesn't specify any `allow` rules, making it effectively a deny-all policy.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

### 2. Allow Traffic from Specific Namespace
After setting a default deny, you might want to allow traffic from specific namespaces. This policy allows all ingress traffic from any pod in a specified namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-specific-namespace
  namespace: default
spec:
  podSelector: {}
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            project: myproject
  policyTypes:
    - Ingress
```

### 3. Allow Traffic Only on Specific Port
This policy allows traffic to specific ports, useful for services like web servers or databases that listen on well-known ports.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-specific-port
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
    - ports:
      - protocol: TCP
        port: 80
  policyTypes:
    - Ingress
```

### 4. Allow Traffic from Certain Pods
This policy allows ingress traffic from pods with specific labels. It's particularly useful when you want to restrict communication between services based on their roles or functions.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-certain-pods
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: frontend
  policyTypes:
    - Ingress
```

### 5. Deny Traffic from Certain Pods
Conversely, you might want to explicitly deny traffic from certain pods while allowing others. This example shows a policy that denies ingress from any pod labeled as `app: test`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-from-certain-pods
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: production
  ingress:
    - from:
      - podSelector:
          matchLabels:
            app: test
  policyTypes:
    - Ingress
```

### 6. Combine Allow and Deny Rules
You can create complex policies that combine various allow and deny rules to finely control traffic flows:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: complex-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: complex-app
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            environment: trusted
      - podSelector:
          matchLabels:
            app: trusted-peer
  egress:
    - to:
      - ipBlock:
          cidr: 192.168.0.0/16
          except:
          - 192.168.1.0/24
  policyTypes:
    - Ingress
    - Egress
```

This complex policy allows ingress from any pod in a "trusted" namespace or labeled as `trusted-peer` and restricts egress to a specific CIDR block, except for a specific subnet.

### Applying Network Policies
To apply any of these network policies, save the YAML to a file and use `kubectl`:

```bash
kubectl apply -f <filename>.yaml
```

Remember, network policies are additive, and they only apply to the pods in the namespaces that have them. Make sure your Kubernetes network plugin supports network policies, such as Calico, Weave, or Cilium.


In Kubernetes, applying a default deny policy for all traffic to a namespace is a common security practice. This ensures that no pods within the namespace can receive traffic unless explicitly allowed by additional NetworkPolicy resources. Here’s how to set up a default deny all traffic policy for a namespace and then allow traffic specifically for an nginx deployment within that namespace.

### Step 1: Create a Namespace
First, let's create a namespace where these policies will be applied. This isolates the resources and the network policies to a specific part of your Kubernetes cluster.

```bash
kubectl create namespace nginx-example
```

### Step 2: Apply a Default Deny All Network Policy
Apply a default deny all ingress and egress traffic policy to the newly created namespace. This policy selects all pods in the namespace by not specifying any `podSelector`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: nginx-example
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

To apply this policy, save it to a file named `default-deny-all.yaml` and run:

```bash
kubectl apply -f default-deny-all.yaml
```

### Step 3: Deploy Nginx to the Namespace
Now deploy an nginx pod into the `nginx-example` namespace. Here’s a simple deployment of nginx:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx-example
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
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Save this to `nginx-deployment.yaml` and apply it with:

```bash
kubectl apply -f nginx-deployment.yaml
```

### Step 4: Allow Traffic to Nginx
To allow traffic to reach your nginx pod, create a NetworkPolicy that permits certain types of ingress traffic. For example, allow HTTP traffic on port 80:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-nginx
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
  - from: []
    ports:
    - protocol: TCP
      port: 80
```

Save this to `allow-nginx.yaml` and apply it:

```bash
kubectl apply -f allow-nginx.yaml
```

### Step 5: Verify the Configuration
After applying these configurations, the nginx pod should be accessible on port 80 from within the cluster, but all other traffic should be denied by default. You can test this by attempting to access the nginx service from another pod in the same namespace or a different namespace without corresponding egress rules.

This setup helps in maintaining strict control over the network traffic, ensuring that only explicitly allowed connections can be established to and from pods within the `nginx-example` namespace.


To see the output after running the commands to set up your nginx deployment and NetworkPolicies in Kubernetes, you'll need to perform a series of checks to confirm the correct application of the configurations and test the actual network functionality.

### Step 1: Confirm the Network Policy and Deployment
First, verify that the NetworkPolicy and nginx deployment have been successfully created:

```bash
# List NetworkPolicies in the nginx-example namespace
kubectl get networkpolicy -n nginx-example

# List deployments in the nginx-example namespace to check nginx is deployed
kubectl get deployments -n nginx-example

# Check the status of the nginx pods to ensure they're running
kubectl get pods -n nginx-example
```

### Expected Output
- **NetworkPolicies**:
  ```
  NAME               POD-SELECTOR   AGE
  default-deny-all   <none>         1m
  allow-nginx        app=nginx      1m
  ```
- **Deployments**:
  ```
  NAME              READY   UP-TO-DATE   AVAILABLE   AGE
  nginx-deployment  1/1     1            1           1m
  ```
- **Pods**:
  ```
  NAME                               READY   STATUS    RESTARTS   AGE
  nginx-deployment-<random-string>   1/1     Running   0          1m
  ```

### Step 2: Test Connectivity
To test if the nginx pod is correctly accessible according to the NetworkPolicy:

#### a. Inside the Same Namespace
Attempt to access the nginx service from another pod in the same namespace. This will demonstrate whether the ingress policy allows traffic:

1. Run a temporary busybox pod and try to connect to nginx:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox test-pod -- wget -qO- http://nginx-deployment
   ```

#### b. From a Different Namespace
Try accessing the nginx service from a pod in a different namespace to verify that the default deny policy across namespaces is effective:

2. First, switch to or create a different namespace and try the same command:
   ```bash
   kubectl create namespace test
   kubectl run -it --rm --namespace=test --image=busybox test-pod -- wget -qO- http://nginx-deployment.nginx-example
   ```

### Expected Output
- **Inside the Same Namespace**:
  ```
  Connecting to nginx-deployment (10.244.1.10:80)
  <!DOCTYPE html>
  <html>
  <head>
  <title>Welcome to nginx!</title>
  ...
  </html>
  ```
  This output indicates that the nginx server is accessible from within the same namespace, serving the default nginx page.

- **From a Different Namespace**:
  ```
  wget: can't connect to remote host (10.244.1.10): Connection timed out
  ```
  This output shows that the default deny policy is effectively blocking traffic from outside the `nginx-example` namespace.

### Step 3: Review Logs
Finally, you can check the logs from the nginx pod to see if it logs the access attempts, which can be useful for debugging:

```bash
kubectl logs -n nginx-example -l app=nginx
```

These steps provide a comprehensive check to ensure your deployments and network policies function as intended. If there's any discrepancy in the expected behavior, you should revisit your configurations for any misconfigurations or typos.

To allow traffic from a specific namespace to your nginx deployment within the `nginx-example` namespace, you'll need to create a NetworkPolicy that explicitly allows this traffic. Here’s how to set up a NetworkPolicy to allow traffic from a designated namespace (e.g., `trusted-namespace`) to the nginx pods in the `nginx-example` namespace.

### Step 1: Label the Trusted Namespace
First, ensure that the namespace from which you want to allow traffic to the nginx pods is labeled. This label will be used in the NetworkPolicy to identify the namespace.

```bash
kubectl label namespace trusted-namespace name=trusted-namespace
```

### Step 2: Create a NetworkPolicy
Create a NetworkPolicy that allows traffic from the `trusted-namespace` to the nginx pods in the `nginx-example` namespace. Save the following YAML to a file, for example, `allow-from-trusted-namespace.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-trusted-namespace
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
    - from:
      - namespaceSelector:
          matchLabels:
            name: trusted-namespace
      ports:
        - protocol: TCP
          port: 80
```

This policy selects pods with the label `app: nginx` in the `nginx-example` namespace and allows incoming traffic on TCP port 80 from any pod in namespaces labeled with `name: trusted-namespace`.

### Step 3: Apply the NetworkPolicy
Apply this policy by running:

```bash
kubectl apply -f allow-from-trusted-namespace.yaml
```

### Step 4: Test the Connectivity
To test if the policy works as intended, you can attempt to connect to the nginx service from a pod in the `trusted-namespace`. First, run a temporary pod in the `trusted-namespace` and try to access the nginx service:

```bash
kubectl run -it --rm --namespace=trusted-namespace --image=busybox test-pod -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
```

### Expected Output
- **Success Scenario**: If the network policy is correctly configured and applied, you should see the default nginx HTML page output or a successful HTTP response.
- **Failure Scenario**: If there is no response, it could indicate that the network policy does not allow the traffic as expected, or there might be other restrictive policies or connectivity issues.

### Monitoring and Adjustments
- **Monitor Network Policies**: Regularly check and monitor the logs and network traffic to ensure that the policies are working as expected.
- **Adjust Policies**: As your cluster evolves, you might need to update or refine your network policies to accommodate changes in deployments or namespace configurations.

This setup helps ensure that only the specified namespaces can access your resources, enhancing the security of your Kubernetes environment.

To configure a NetworkPolicy that specifically denies traffic from certain pods within your Kubernetes environment while allowing others, you can set up a policy that allows traffic from all sources except those specifically denied. This example demonstrates how to deny traffic from pods labeled as `app: untrusted` while allowing others to access the nginx deployment in the `nginx-example` namespace.

### Step 1: Define the Deny Policy
First, we create a policy that explicitly denies traffic from pods with a specific label (`app: untrusted`) to the nginx pods. Since Kubernetes NetworkPolicies do not directly support "deny" rules, you need to frame the policy as an "allow from all except" by not selecting the untrusted pods in the allow rule.

Here's the YAML configuration for a policy that allows ingress to the nginx pods from any source that does not have the label `app: untrusted`:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-except-untrusted
  namespace: nginx-example
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
    - Ingress
  ingress:
    - from:
      - podSelector:
          matchExpressions:
            - key: app
              operator: NotIn
              values:
                - untrusted
      ports:
        - protocol: TCP
          port: 80
```

### Step 2: Apply the NetworkPolicy
Save this configuration to a file named `allow-except-untrusted.yaml` and apply it using the following command:

```bash
kubectl apply -f allow-except-untrusted.yaml
```

### Step 3: Test the Configuration
To ensure the policy is functioning as intended, you can perform tests from pods with different labels:

1. **From an Untrusted Pod**:
   Try to access the nginx service from a pod labeled as `untrusted`:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox untrusted-pod --labels="app=untrusted" -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
   ```

2. **From a Trusted Pod**:
   Try the same from a pod not labeled as `untrusted`:
   ```bash
   kubectl run -it --rm --namespace=nginx-example --image=busybox trusted-pod --labels="app=trusted" -- wget -qO- http://nginx-deployment.nginx-example.svc.cluster.local:80
   ```

### Expected Output
- **Untrusted Pod**: The request should fail if the NetworkPolicy is working correctly. You may see a timeout or connection error.
- **Trusted Pod**: This request should succeed, displaying the default nginx start page or a successful HTTP response.

### Monitoring and Adjustments
- **Monitor Logs**: Keep an eye on the logs of your nginx pods to see the access attempts and ensure that untrusted requests are being blocked.
- **Adjust Policies**: As requirements change, you might need to update the labels or the scope of the NetworkPolicy to fine-tune the traffic rules.

By using the `NotIn` operator with matchExpressions in a NetworkPolicy, you can effectively control pod traffic by excluding specific sources. This approach helps you to safeguard your applications from unwanted access while maintaining necessary connectivity within your cluster.


# Ingress Controller


#### enable ingress addon 

```sh
k8s101 git:(main) ✗ minikube addons enable ingress
💡  ingress is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
💡  After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
    ▪ Using image k8s.gcr.io/ingress-nginx/controller:v1.2.1
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
➜  k8s101 git:(main) ✗ 
```
#### verify ngnix controller running 

```sh
➜  k8s101 git:(main) ✗ kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-fxzbs        0/1     Completed   0          4m7s
ingress-nginx-admission-patch-jw98n         0/1     Completed   1          4m7s
ingress-nginx-controller-5959f988fd-tv8x8   1/1     Running     0          4m7s

```
#### verify all pods running 

```sh
➜  k8s101 git:(main) ✗ kubectl get pods -n kube-system
NAME                               READY   STATUS    RESTARTS      AGE
coredns-565d847f94-bl9qz           1/1     Running   0             12h
etcd-minikube                      1/1     Running   0             12h
kube-apiserver-minikube            1/1     Running   0             12h
kube-controller-manager-minikube   1/1     Running   0             12h
kube-proxy-qj7s7                   1/1     Running   0             12h
kube-scheduler-minikube            1/1     Running   0             12h
storage-provisioner                1/1     Running   2 (12h ago)   12h

```

#### Deploy Hello World App 

```sh

➜  k8s101 git:(main) ✗ kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
deployment.apps/web created
```

```sh
➜  k8s101 git:(main) ✗ kubectl expose deployment web --type=NodePort --port=8080
service/web exposed
```

```sh
➜  k8s101 git:(main) ✗ kubectl get service web      
NAME   TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
web    NodePort   10.100.132.142   <none>        8080:30646/TCP   41s

```

```sh
➜  k8s101 git:(main) ✗ minikube service web --url
http://127.0.0.1:51575
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```

output 
```
Hello, world!
Version: 1.0.0
Hostname: web-84fb9498c7-zx2k4
```

### Ingress that sends traffic to your Service via hello-world.info.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
  - host: hello-world.info
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 8080

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f example-ingress.yaml
ingress.networking.k8s.io/example-ingress created
```

#### verify IP addree 

```sh
➜  k8s101 git:(main) ✗ kubectl get ingress
NAME              CLASS   HOSTS              ADDRESS        PORTS   AGE
example-ingress   nginx   hello-world.info   192.168.49.2   80      18m
➜  k8s101 git:(main) ✗ 
```


```sh
➜  k8s101 git:(main) ✗ echo "127.0.0.1  hello-world.info" | sudo tee -a /etc/hosts 
127.0.0.1  hello-world.info
➜  k8s101 git:(main) ✗ kubectl apply -f example-ingress.yaml                      
ingress.networking.k8s.io/example-ingress unchanged
```
#### add path 

```yaml
    - path: /v2
        pathType: Prefix
        backend:
          service:
            name: web2
            port:
              number: 8080

```

```sh
➜  k8s101 git:(main) ✗ kubectl apply -f example-ingress.yaml           
ingress.networking.k8s.io/example-ingress configured
```

```sh
➜  k8s101 git:(main) ✗ minikube tunnel
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗  The service/ingress example-ingress requires privileged ports to be exposed: [80 443]
🔑  sudo permission will be asked for it.
🏃  Starting tunnel for service example-ingress.

```

### check output 

```sh
http://hello-world.info/
http://hello-world.info/v2
```