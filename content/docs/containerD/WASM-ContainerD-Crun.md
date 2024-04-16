---
title: "Wasm + ContainerD + CRUN "
weight : 9
---

## Installing WasmEdge

```bash
curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install.sh | bash
source $HOME/.wasmedge/env

> Using Python: /usr/bin/python3 
INFO    - CUDA cannot be detected via nvcc
INFO    - CUDA 12.x cannot be detected via nvidia-smi
INFO    - Compatible with current configuration
INFO    - Running Uninstaller
WARNING - Uninstaller did not find previous installation
WARNING - SHELL variable not found. Using bash as SHELL
INFO    - shell configuration updated
INFO    - Downloading WasmEdge
|============================================================|100.00 %INFO    - Downloaded
INFO    - Installing WasmEdge
INFO    - WasmEdge Successfully installed
INFO    - Run:
```

#### Verify installation

```bash
wasmedge --version
```

the response would be something:-

```
wasmedge version 0.13.5
```

## Install ContainerD, Crun & k8s

```bash
wget -qO- https://raw.githubusercontent.com/sonichigo/wasmedge-demo-example/main/install.sh | bash
```

```bash
> Installing ContainerD and CRUN
<==============================>
Starting installation ...
Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease
Hit:2 http://archive.ubuntu.com/ubuntu focal-updates InRelease             
Hit:3 http://archive.ubuntu.com/ubuntu focal-backports InRelease           
Hit:4 http://security.ubuntu.com/ubuntu focal-security InRelease           
Reading package lists... Done
Building dependency tree       
Reading state information... Done
158 packages can be upgraded. Run 'apt list --upgradable' to see them.
Version: 1.5.7
Installing libseccomp2 ...
Reading package lists... Done
Building dependency tree       
Reading state information... Done
libseccomp2 is already the newest version (2.5.1-1ubuntu1~20.04.2).
0 upgraded, 0 newly installed, 0 to remove and 158 not upgraded.
Installing wget
Reading package lists... Done
Building dependency tree       
Reading state information... Done
wget is already the newest version (1.20.3-1ubuntu2).
0 upgraded, 0 newly installed, 0 to remove and 158 not upgraded.
--2024-04-15 16:24:57--  https://github.com/containerd/containerd/releases/download/v1.5.7/cri-containerd-cni-1.5.7-linux-amd64.tar.gz
Resolving github.com (github.com)... 20.207.73.82
Connecting to github.com (github.com)|20.207.73.82|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/46089560/8d348b60-8c8a-4720-87ec-67ee2efd754e?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T162333Z&X-Amz-Expires=300&X-Amz-Signature=9e48d3f9902da59a88afef21989f15f56907392a262e52b25f545d5ee27daaa5&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=46089560&response-content-disposition=attachment%3B%20filename%3Dcri-containerd-cni-1.5.7-linux-amd64.tar.gz&response-content-type=application%2Foctet-stream [following]
--2024-04-15 16:24:57--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/46089560/8d348b60-8c8a-4720-87ec-67ee2efd754e?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T162333Z&X-Amz-Expires=300&X-Amz-Signature=9e48d3f9902da59a88afef21989f15f56907392a262e52b25f545d5ee27daaa5&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=46089560&response-content-disposition=attachment%3B%20filename%3Dcri-containerd-cni-1.5.7-linux-amd64.tar.gz&response-content-type=application%2Foctet-stream
Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.110.133, 185.199.111.133, 185.199.108.133, ...
Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.110.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 127052515 (121M) [application/octet-stream]
Saving to: 'cri-containerd-cni-1.5.7-linux-amd64.tar.gz.1'

cri-containerd-cni-1.5.7-l 100%[=======================================>] 121.17M   101MB/s    in 1.2s    

2024-04-15 16:24:59 (101 MB/s) - 'cri-containerd-cni-1.5.7-linux-amd64.tar.gz.1' saved [127052515/127052515]

--2024-04-15 16:24:59--  https://github.com/containerd/containerd/releases/download/v1.5.7/cri-containerd-cni-1.5.7-linux-amd64.tar.gz.sha256sum
Resolving github.com (github.com)... 20.207.73.82
Connecting to github.com (github.com)|20.207.73.82|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/46089560/25ceb2f5-c57a-4c72-a724-7571db02b19d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T162349Z&X-Amz-Expires=300&X-Amz-Signature=72413235b2d0d707d937d42824a99f7c0e0beb0877f413fdbec20b26a1fea169&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=46089560&response-content-disposition=attachment%3B%20filename%3Dcri-containerd-cni-1.5.7-linux-amd64.tar.gz.sha256sum&response-content-type=application%2Foctet-stream [following]
--2024-04-15 16:24:59--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/46089560/25ceb2f5-c57a-4c72-a724-7571db02b19d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240415%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240415T162349Z&X-Amz-Expires=300&X-Amz-Signature=72413235b2d0d707d937d42824a99f7c0e0beb0877f413fdbec20b26a1fea169&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=46089560&response-content-disposition=attachment%3B%20filename%3Dcri-containerd-cni-1.5.7-linux-amd64.tar.gz.sha256sum&response-content-type=application%2Foctet-stream
Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 110 [application/octet-stream]
Saving to: 'cri-containerd-cni-1.5.7-linux-amd64.tar.gz.sha256sum.1'

cri-containerd-cni-1.5.7-l 100%[=======================================>]     110  --.-KB/s    in 0s      

2024-04-15 16:25:00 (5.88 MB/s) - 'cri-containerd-cni-1.5.7-linux-amd64.tar.gz.sha256sum.1' saved [110/110]

cri-containerd-cni-1.5.7-linux-amd64.tar.gz: OK
--2024-04-15 16:25:04--  https://raw.githubusercontent.com/second-state/wasmedge-containers-examples/main/containerd/containerd_config.diff
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.111.133, 185.199.108.133, 185.199.109.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.111.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1576 (1.5K) [text/plain]
Saving to: 'containerd_config.diff.1'

containerd_config.diff.1   100%[=======================================>]   1.54K  --.-KB/s    in 0s      

2024-04-15 16:25:04 (29.3 MB/s) - 'containerd_config.diff.1' saved [1576/1576]

patching file /etc/containerd/config.toml
... ...
... ...
... ...
... ...
Local Kubernetes cluster is running. Press Ctrl-C to shut it down.
```

## Run WebAssembly container images in Kubernetes

Open a new terminal and run the cluster: - 

```bash
cd kubernetes && git checkout v1.22.4

export KUBERNETES_PROVIDER=local

sudo cluster/kubectl.sh config set-cluster local --server=https://localhost:6443 --certificate-authority=/var/run/kubernetes/server-ca.crt
sudo cluster/kubectl.sh config set-credentials myself --client-key=/var/run/kubernetes/client-admin.key --client-certificate=/var/run/kubernetes/client-admin.crt
sudo cluster/kubectl.sh config set-context local --cluster=local --user=myself
sudo cluster/kubectl.sh config use-context local
sudo cluster/kubectl.sh
```

Let's check the status to make sure that the cluster is running.

```bash
sudo cluster/kubectl.sh cluster-info
```

### A WebAssembly-based HTTP service
Run the WebAssembly-based image from Docker Hub in the Kubernetes cluster as follows.

```bash
sudo cluster/kubectl.sh run --restart=Never http-server --image=wasmedge/example-wasi-http:latest --annotations="module.wasm.image/variant=compat-smart" --overrides='{"kind":"Pod", "apiVersion":"v1", "spec": {"hostNetwork": true}}'
```

Since we are using `hostNetwork` in the `kubectl` run command, the HTTP server image is running on the local network with IP address `127.0.0.1`. Now, you can use the curl command to access the HTTP service.

```
curl -d "name=WasmEdge" -X POST http://127.0.0.1:1234

> echo: name=WasmEdge
```
