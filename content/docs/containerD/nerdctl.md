---
title: " contaiNERD + nerdctl "
weight : 8
---


### install ContainerD + nerctl 

```
wget https://github.com/containerd/nerdctl/releases/download/v1.7.3/nerdctl-1.7.3-linux-arm64.tar.gz
tar -xzf nerdctl-1.7.3-linux-arm64.tar.gz
sudo mv ./nerdctl /usr/local/bin
```


#### verify nerctl 
sangam@demo:~$ sudo nerdctl
nerdctl is a command line interface for containerd

Config file ($NERDCTL_TOML): /etc/nerdctl/nerdctl.toml

Usage: nerdctl [flags]

Management commands:
  apparmor   Manage AppArmor profiles
  builder    Manage builds
  container  Manage containers
  image      Manage images
  ipfs       Distributing images on IPFS
  namespace  Manage containerd namespaces
  network    Manage networks
  system     Manage containerd
  volume     Manage volumes

Commands:
  attach      Attach stdin, stdout, and stderr to a running container.
  build       Build an image from a Dockerfile. Needs buildkitd to be running.
  commit      Create a new image from a container's changes
  completion  Generate the autocompletion script for the specified shell
  compose     Compose
  cp          Copy files/folders between a running container and the local filesystem.
  create      Create a new container. Optionally specify "ipfs://" or "ipns://" scheme to pull image from IPFS.
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  help        Help about any command
  history     Show the history of an image
  images      List images
  info        Display system-wide information
  inspect     Return low-level information on objects.
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a container registry
  logout      Log out from a container registry
  logs        Fetch the logs of a container. Expected to be used with 'nerdctl run -d'.
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image from a registry. Optionally specify "ipfs://" or "ipns://" scheme to pull image from IPFS.
  push        Push an image or a repository to a registry. Optionally specify "ipfs://" or "ipns://" scheme to push image to IPFS.
  rename      rename a container
  restart     Restart one or more running containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container. Optionally specify "ipfs://" or "ipns://" scheme to pull image from IPFS.
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  start       Start one or more running containers
  stats       Display a live stream of container(s) resource usage statistics.
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update one or more running containers
  version     Show the nerdctl version information
  wait        Block until one or more containers stop, then print their exit codes.

Flags:
  -H, --H string                 Alias of --address (default "/run/containerd/containerd.sock")
  -a, --a string                 Alias of --address (default "/run/containerd/containerd.sock")
      --address string           containerd address, optionally with "unix://" prefix [$CONTAINERD_ADDRESS] (default "/run/containerd/containerd.sock")
      --cgroup-manager string    Cgroup manager to use ("cgroupfs"|"systemd") (default "systemd")
      --cni-netconfpath string   cni config directory [$NETCONFPATH] (default "/etc/cni/net.d")
      --cni-path string          cni plugins binary directory [$CNI_PATH] (default "/opt/cni/bin")
      --data-root string         Root directory of persistent nerdctl state (managed by nerdctl, not by containerd) (default "/var/lib/nerdctl")
      --debug                    debug mode
      --debug-full               debug mode (with full output)
      --experimental             Control experimental: https://github.com/containerd/nerdctl/blob/main/docs/experimental.md [$NERDCTL_EXPERIMENTAL] (default true)
  -h, --help                     help for nerdctl
      --host string              Alias of --address (default "/run/containerd/containerd.sock")
      --host-gateway-ip string   IP address that the special 'host-gateway' string in --add-host resolves to. Defaults to the IP address of the host. It has no effect without setting --add-host [$NERDCTL_HOST_GATEWAY_IP] (default "192.168.129.131")
      --hosts-dir strings        A directory that contains <HOST:PORT>/hosts.toml (containerd style) or <HOST:PORT>/{ca.cert, cert.pem, key.pem} (docker style) (default [/etc/containerd/certs.d,/etc/docker/certs.d])
      --insecure-registry        skips verifying HTTPS certs, and allows falling back to plain HTTP
  -n, --n string                 Alias of --namespace (default "default")
      --namespace string         containerd namespace, such as "moby" for Docker, "k8s.io" for Kubernetes [$CONTAINERD_NAMESPACE] (default "default")
      --snapshotter string       containerd snapshotter [$CONTAINERD_SNAPSHOTTER] (default "overlayfs")
      --storage-driver string    Alias of --snapshotter (default "overlayfs")
  -v, --version                  version for nerdctl

Run 'nerdctl COMMAND --help' for more information on a command.


#### nerdctl system info 

```
sangam@demo:~$ sudo nerdctl system info
Client:
 Namespace:	default
 Debug Mode:	false

Server:
 Server Version: 1.7.2
 Storage Driver: overlayfs
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: 2
 Plugins:
  Log: fluentd journald json-file syslog
  Storage: native overlayfs
 Security Options:
  apparmor
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 5.15.0-94-generic
 Operating System: Ubuntu 22.04.3 LTS
 OSType: linux
 Architecture: aarch64
 CPUs: 2
 Total Memory: 3.817GiB
 Name: demo
 ID: 62d52903-e7f5-4811-9793-3d4d191f325f

WARNING: IPv4 forwarding is disabled
WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled

```
### install cni plugin 

wget https://github.com/containernetworking/plugins/releases/download/v1.1.1/cni-plugins-linux-arm64-v1.1.1.tgz

sudo tar Cxzvf /opt/cni/bin cni-plugins-linux-arm64-v1.1.1.tgz
./
./macvlan
./static
./vlan
./portmap
./host-local
./vrf
./bridge
./tuning
./firewall
./host-device
./sbr
./loopback
./dhcp
./ptp
./ipvlan
./bandwidth

### make sure iptables package installed 
```
sudo apt-get install iptables
```

### run first hello world container

sangam@demo:~$ sudo nerdctl run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/



# nerdctl Command Cheatsheet

nerdctl is a Docker-compatible CLI for containerd. This cheatsheet provides a quick overview of commonly used commands.

## Basic Operations

| Command | Description | Example |
|---------|-------------|---------|
| `nerdctl run [OPTIONS] IMAGE COMMAND [ARG...]` | Run a container | `nerdctl run -it ubuntu /bin/bash` (run Ubuntu shell interactively) |
| `nerdctl create [OPTIONS] IMAGE` | Create a container | `nerdctl create -d --name my-webserver nginx` (create a detached Nginx container) |
| `nerdctl start CONTAINER_ID` | Start a stopped container | `nerdctl start 5a2295cfc32c` (start container with ID 5a2295cfc32c) |
| `nerdctl stop [OPTIONS] CONTAINER_ID` | Stop a running container | `nerdctl stop -t 30 my-webserver` (stop my-webserver with a 30-second grace period) |
| `nerdctl rm [OPTIONS] CONTAINER_ID` | Remove a container | `nerdctl rm -f 5a2295cfc32c` (forcefully remove container 5a2295cfc32c) |
| `nerdctl ps [OPTIONS]` | List containers | `nerdctl ps -a` (list all containers, including stopped) |

## Image Management

| Command | Description | Example |
|---------|-------------|---------|
| `nerdctl build [OPTIONS] -t IMAGE_NAME CONTEXT_DIR` | Build an image | `nerdctl build -t my-app ./Dockerfile` (build image from Dockerfile in current directory) |
| `nerdctl pull [OPTIONS] IMAGE` | Pull an image | `nerdctl pull nginx:latest` (pull the latest Nginx image) |
| `nerdctl images [OPTIONS]` | List images | `nerdctl images -f reference` (list images by their reference name) |
| `nerdctl rmi [OPTIONS] IMAGE` | Remove an image | `nerdctl rmi my-app` (remove the my-app image) |

## Advanced Features

| Command | Description | Example |
|---------|-------------|---------|
| `nerdctl run -d --network bridge -p 80:80 nginx` | Run with specific network configuration | Run Nginx on port 80 on the bridge network |
| `nerdctl run -d -v /host/path:/container/path ubuntu /bin/bash` | Mount volumes | Mount local `/host/path` to `/container/path` in container |
| `nerdctl run -e DB_HOST=localhost -e DB_PASSWORD=secret ubuntu` | Use environment variables | Set environment variables in container |
| `nerdctl run --rootless --override uid=1000,gid=1000 ubuntu` | Run in rootless mode (requires configuration) | Run as non-root user with specific user/group ID |
