---
title: " ContainerD CLI ctr "
weight : 4
---


### update ubuntu server 

```
sudo apt-get update

```

#### Install the necessary packages 

```
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

#### install docker
```
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

#### Install Containerd 

```
sudo apt-get install containerd -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
containerd is already the newest version (1.7.2-0ubuntu1~22.04.1).
containerd set to manually installed.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.

```

#### Configure ContainerD

```
sudo mkdir -p /etc/containerd
sudo su -
containerd config default /etc/containerd/config.toml

```


```
containerd config default /etc/containerd/config.toml
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
    cdi_spec_dirs = ["/etc/cdi", "/var/run/cdi"]
    device_ownership_from_security_context = false
    disable_apparmor = false
    disable_cgroup = false
    disable_hugetlb_controller = true
    disable_proc_mount = false
    disable_tcp_service = true
    drain_exec_sync_io_timeout = "0s"
    enable_cdi = false
    enable_selinux = false
    enable_tls_streaming = false
    enable_unprivileged_icmp = false
    enable_unprivileged_ports = false
    ignore_image_defined_volumes = false
    image_pull_progress_timeout = "1m0s"
    max_concurrent_downloads = 3
    max_container_log_line_size = 16384
    netns_mounts_under_state_dir = false
    restrict_oom_score_adj = false
    sandbox_image = "registry.k8s.io/pause:3.8"
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
      setup_serially = false

    [plugins."io.containerd.grpc.v1.cri".containerd]
      default_runtime_name = "runc"
      disable_snapshot_annotations = true
      discard_unpacked_layers = false
      ignore_blockio_not_enabled_errors = false
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
        privileged_without_host_devices_all_devices_allowed = false
        runtime_engine = ""
        runtime_path = ""
        runtime_root = ""
        runtime_type = ""
        sandbox_mode = ""
        snapshotter = ""

        [plugins."io.containerd.grpc.v1.cri".containerd.default_runtime.options]

      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]

        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
          base_runtime_spec = ""
          cni_conf_dir = ""
          cni_max_conf_num = 0
          container_annotations = []
          pod_annotations = []
          privileged_without_host_devices = false
          privileged_without_host_devices_all_devices_allowed = false
          runtime_engine = ""
          runtime_path = ""
          runtime_root = ""
          runtime_type = "io.containerd.runc.v2"
          sandbox_mode = "podsandbox"
          snapshotter = ""

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
        privileged_without_host_devices_all_devices_allowed = false
        runtime_engine = ""
        runtime_path = ""
        runtime_root = ""
        runtime_type = ""
        sandbox_mode = ""
        snapshotter = ""

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

  [plugins."io.containerd.nri.v1.nri"]
    disable = true
    disable_connections = false
    plugin_config_path = "/etc/nri/conf.d"
    plugin_path = "/opt/nri/plugins"
    plugin_registration_timeout = "5s"
    plugin_request_timeout = "2s"
    socket_path = "/var/run/nri/nri.sock"

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
    blockio_config_file = ""
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
    root_path = ""
    upperdir_label = false

  [plugins."io.containerd.snapshotter.v1.zfs"]
    root_path = ""

  [plugins."io.containerd.tracing.processor.v1.otlp"]
    endpoint = ""
    insecure = false
    protocol = ""

  [plugins."io.containerd.transfer.v1.local"]
    config_path = ""
    max_concurrent_downloads = 3
    max_concurrent_uploaded_layers = 3

    [[plugins."io.containerd.transfer.v1.local".unpack_config]]
      differ = ""
      platform = "linux/arm64/v8"
      snapshotter = "overlayfs"

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
  "io.containerd.timeout.metrics.shimstats" = "2s"
  "io.containerd.timeout.shim.cleanup" = "5s"
  "io.containerd.timeout.shim.load" = "5s"
  "io.containerd.timeout.shim.shutdown" = "3s"
  "io.containerd.timeout.task.state" = "2s"

[ttrpc]
  address = ""
  gid = 0
  uid = 0
sangam@sangam:~$ 

```


# ContainerD Configuration Overview

## Table of Contents

- [General Configuration](#general-configuration)
- [CGroup](#cgroup)
- [Debug](#debug)
- [GRPC](#grpc)
- [Metrics](#metrics)
- [Plugins](#plugins)
- [Proxy Plugins](#proxy-plugins)
- [Stream Processors](#stream-processors)
- [Timeouts](#timeouts)
- [TTRPC](#ttrpc)

## General Configuration
| Key | Description |
| --- | ----------- |
| `disabled_plugins` | List of plugins to be disabled. |
| `required_plugins` | List of required plugins. |
| `imports` | List of imports from other configurations. |
| `oom_score` | Out-Of-Memory score for ContainerD processes. |
| `plugin_dir` | Directory for ContainerD plugins. |
| `root` | Directory for ContainerD's persistent state. |
| `state` | Directory for ContainerD's runtime state. |
| `version` | Configuration file format version. |

## CGroup
| Key | Description |
| --- | ----------- |
| `path` | Custom path for cgroup. |

## Debug
| Key | Description |
| --- | ----------- |
| `address` | Socket address for debug service. |
| `format` | Log format for debug service. |
| `gid` | Group ID for debug service. |
| `level` | Debug level. |
| `uid` | User ID for debug service. |

## GRPC
| Key | Description |
| --- | ----------- |
| `address` | Socket address for GRPC communication. |
| `max_recv_message_size` | Maximum receive message size. |
| `max_send_message_size` | Maximum send message size. |
| `tcp_address` | TCP address for GRPC. |
| `tcp_tls_*` | TLS settings for TCP GRPC. |
| `uid`, `gid` | User/Group ID for GRPC socket. |

## Metrics
| Key | Description |
| --- | ----------- |
| `address` | Address for exporting metrics. |
| `grpc_histogram` | Enable GRPC histogram metrics. |

## Plugins
> This section is extensive and contains configurations for various ContainerD plugins. Only key plugins and configurations are listed here.

### `io.containerd.gc.v1.scheduler`
- Garbage collection settings.

### `io.containerd.grpc.v1.cri`
- Settings for Container Runtime Interface (CRI), crucial for Kubernetes.

### Runtimes (`runc`, etc.)
- Define and configure container runtimes.

## Proxy Plugins
| Key | Description |
| --- | ----------- |
| `plugin_name` | Configuration for specific proxy plugin. |

## Stream Processors
| Key | Description |
| --- | ----------- |
| `processor_name` | Configuration for specific stream processor. |

## Timeouts
| Key | Description |
| --- | ----------- |
| `timeout_name` | Various timeout settings for ContainerD operations. |

## TTRPC
| Key | Description |
| --- | ----------- |
| `address` | Address for TTRPC communication. |
| `uid`, `gid` | User/Group ID for TTRPC socket. |



#### Verify ContainerD CLI - Ctr available on your system 


```
sangam@sangam:~$ ctr
NAME:
   ctr - 
        __
  _____/ /______
 / ___/ __/ ___/
/ /__/ /_/ /
\___/\__/_/

containerd CLI


USAGE:
   ctr [global options] command [command options] [arguments...]

VERSION:
   1.7.2

DESCRIPTION:
   
ctr is an unsupported debug and administrative client for interacting
with the containerd daemon. Because it is unsupported, the commands,
options, and operations are not guaranteed to be backward compatible or
stable from release to release of the containerd project.

COMMANDS:
   plugins, plugin            Provides information about containerd plugins
   version                    Print the client and server versions
   containers, c, container   Manage containers
   content                    Manage content
   events, event              Display containerd events
   images, image, i           Manage images
   leases                     Manage leases
   namespaces, namespace, ns  Manage namespaces
   pprof                      Provide golang pprof outputs for containerd
   run                        Run a container
   snapshots, snapshot        Manage snapshots
   tasks, t, task             Manage tasks
   install                    Install a new package
   oci                        OCI tools
   sandboxes, sandbox, sb, s  Manage sandboxes
   info                       Print the server info
   shim                       Interact with a shim directly
   help, h                    Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --debug                      Enable debug output in logs
   --address value, -a value    Address for containerd's GRPC server (default: "/run/containerd/containerd.sock") [$CONTAINERD_ADDRESS]
   --timeout value              Total timeout for ctr commands (default: 0s)
   --connect-timeout value      Timeout for connecting to containerd (default: 0s)
   --namespace value, -n value  Namespace to use with commands (default: "default") [$CONTAINERD_NAMESPACE]
   --help, -h                   show help
   --version, -v                print the version
sangam@sangam:~$ 

```


# `ctr` Command Examples for ContainerD

`ctr` is a command-line utility provided by ContainerD for interacting with the ContainerD daemon. It's used for development, debugging, and low-level container operations. Below are some common examples of how to use `ctr` commands.

## Table of Contents

- [List Containers](#list-containers)
- [Run a Container](#run-a-container)
- [Pull an Image](#pull-an-image)
- [List Images](#list-images)
- [Remove an Image](#remove-an-image)
- [Create a Snapshot](#create-a-snapshot)
- [Push an Image](#push-an-image)
- [Execute Command in Container](#execute-command-in-container)
- [View Container Logs](#view-container-logs)
- [Stop a Container](#stop-a-container)
- [Delete a Container](#delete-a-container)

### List Containers
```bash
sudo ctr containers list
CONTAINER    IMAGE    RUNTIME   

```

### Pull an Image

```
sangam@sangam:~$ sudo ctr run --rm -t docker.io/library/hello-world
ctr: container id must be provided
docker.io/library/hello-world:latest:                                             resolved       |++++++++++++++++++++++++++++++++++++++| 
index-sha256:4bd78111b6914a99dbc560e6a20eab57ff6655aea4a80c50b0c5491968cbc2e6:    done           |++++++++++++++++++++++++++++++++++++++| 
manifest-sha256:2d4e459f4ecb5329407ae3e47cbc107a2fbace221354ca75960af4c047b3cb13: done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:478afc9190022e867bb857b1a25cc5abc7678287af6cb930562ec25be709f1b7:    done           |++++++++++++++++++++++++++++++++++++++| 
config-sha256:ee301c921b8aadc002973b2e0c3da17d701dcd994b606769a7e6eaa100b81d44:   done           |++++++++++++++++++++++++++++++++++++++| 
elapsed: 6.5 s                                                                    total:  10.3 K (1.6 KiB/s)                                       
unpacking linux/arm64/v8 sha256:4bd78111b6914a99dbc560e6a20eab57ff6655aea4a80c50b0c5491968cbc2e6...
done: 15.890923ms	

```

### Run a Container
```
sangam@sangam:~$ sudo ctr run --rm -t docker.io/library/hello-world:latest hello-world

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

sangam@sangam:~$ 

```

### List Images

```
sudo ctr images list
REF                                  TYPE                                    DIGEST                                                                  SIZE     PLATFORMS                                                                                                                                           LABELS 
docker.io/library/hello-world:latest application/vnd.oci.image.index.v1+json sha256:4bd78111b6914a99dbc560e6a20eab57ff6655aea4a80c50b0c5491968cbc2e6 13.4 KiB linux/386,linux/amd64,linux/arm/v5,linux/arm/v7,linux/arm64/v8,linux/mips64le,linux/ppc64le,linux/riscv64,linux/s390x,unknown/unknown,windows/amd64 -      

```

### Remove an Image

```
sangam@sangam:~$ sudo ctr images remove docker.io/library/hello-world:latest 
docker.io/library/hello-world:latest


```
### Create a Snapshot

```
sangam@sangam:~$ sudo ctr snapshots info sha256:cd322088bcfba290bcfa064b77165d73708a0a77209146be150b29b7fec4c366 
{
    "Kind": "Committed",
    "Name": "sha256:cd322088bcfba290bcfa064b77165d73708a0a77209146be150b29b7fec4c366",
    "Created": "2024-02-09T10:01:41.428699079Z",
    "Updated": "2024-02-09T10:01:41.428699079Z"
}

sangam@sangam:~$ sudo ctr snapshots prepare busybox-snapshot

sangam@sangam:~$ sudo ctr snapshots ls
KEY                                                                     PARENT KIND      
busybox-snapshot                                                               Active    
sha256:cd322088bcfba290bcfa064b77165d73708a0a77209146be150b29b7fec4c366        Committed 

sangam@sangam:~$ sudo ctr snapshots diff busybox-snapshot sha256:cd322088bcfba290bcfa064b77165d73708a0a77209146be150b29b7fec4c366

```

### Push an Image

```
ctr images push myregistry.example.com/myimage:latest

```

### Execute Command in Container

```
ctr tasks exec
NAME:
   ctr tasks exec - Execute additional processes in an existing container

USAGE:
   ctr tasks exec [command options] [flags] CONTAINER CMD [ARG...]

OPTIONS:
   --cwd value       Working directory of the new process
   --tty, -t         Allocate a TTY for the container
   --detach, -d      Detach from the task after it has started execution
   --exec-id value   Exec specific id for the process
   --fifo-dir value  Directory used for storing IO FIFOs
   --log-uri value   Log uri for custom shim logging
   --user value      User id or name
   
ctr: Required flag "exec-id" not set

sangam@sangam:~$ sudo ctr images pull docker.io/library/busybox:latest
docker.io/library/busybox:latest: resolving      |--------------------------------------| 
docker.io/library/busybox:latest:                                                 resolved       |++++++++++++++++++++++++++++++++++++++| 
index-sha256:6d9ac9237a84afe1516540f40a0fafdc86859b2141954b4d643af7066d598b74:    done           |++++++++++++++++++++++++++++++++++++++| 
manifest-sha256:8f03917912ea995c637b6c0295846aaff5665f06ac82a29b421fba4c379494e7: done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:c2bf9493c1bf786e95e3eac7d406c20aa1b8a2d40916756e891627e9e8f8d119:    done           |++++++++++++++++++++++++++++++++++++++| 
config-sha256:3e4fd538a9a0b729be05707cf805388be2fb701cfd5d44c6542f1988e8aef6e3:   done           |++++++++++++++++++++++++++++++++++++++| 
elapsed: 2.3 s                                                                    total:   0.0 B (0.0 B/s)                                         
unpacking linux/arm64/v8 sha256:6d9ac9237a84afe1516540f40a0fafdc86859b2141954b4d643af7066d598b74...
done: 4.323205ms	

Mem: 2554748K used, 1450628K free, 1432K shrd, 84568K buff, 1617808K cached
CPU:  4.3% usr  0.8% sys  0.0% nic 94.5% idle  0.1% io  0.0% irq  0.2% sirq
Load average: 0.29 0.23 0.20 1/361 12
  PID  PPID USER     STAT   VSZ %VSZ CPU %CPU COMMAND
    1     0 root     R     3984  0.1   0  0.0 top

open new terminal 

sangam@sangam:~$ sudo ctr tasks exec --exec-id exec1 busybox-container ls /
bin
dev
etc
home
lib
lib64
proc
root
run
sys
tmp
usr
var


```

### View Container Logs

```
sangam@sangam:~$ sudo ctr tasks ls
TASK                 PID      STATUS    
busybox-container    98767    RUNNING

sangam@sangam:~$ sudo ctr container ls
CONTAINER            IMAGE                               RUNTIME                  
busybox-container    docker.io/library/busybox:latest    io.containerd.runc.v2  

journalctl -u containerd
```

### Stop a Container

```
sudo ctr tasks kill busybox-container


```

### Delete a Container

```
sangam@sangam:~$ sudo ctr containers -h
NAME:
   ctr containers - Manage containers

USAGE:
   ctr containers command [command options] [arguments...]

COMMANDS:
   create                   Create container
   delete, del, remove, rm  Delete one or more existing containers
   info                     Get info about a container
   list, ls                 List containers
   label                    Set and clear labels for a container
   checkpoint               Checkpoint a container
   restore                  Restore a container from checkpoint

OPTIONS:
   --help, -h  show help
   
sangam@sangam:~$ sudo ctr containers del busybox-container 
```

### Ctr plugins 

```
sangam@sangam:~$ sudo ctr plugins list
TYPE                                   ID                       PLATFORMS         STATUS    
io.containerd.snapshotter.v1           aufs                     linux/arm64/v8    skip      
io.containerd.snapshotter.v1           btrfs                    linux/arm64/v8    skip      
io.containerd.content.v1               content                  -                 ok        
io.containerd.snapshotter.v1           native                   linux/arm64/v8    ok        
io.containerd.snapshotter.v1           overlayfs                linux/arm64/v8    ok        
io.containerd.snapshotter.v1           devmapper                linux/arm64/v8    error     
io.containerd.snapshotter.v1           zfs                      linux/arm64/v8    skip      
io.containerd.metadata.v1              bolt                     -                 ok        
io.containerd.differ.v1                walking                  linux/arm64/v8    ok        
io.containerd.event.v1                 exchange                 -                 ok        
io.containerd.gc.v1                    scheduler                -                 ok        
io.containerd.lease.v1                 manager                  -                 ok        
io.containerd.nri.v1                   nri                      -                 ok        
io.containerd.runtime.v2               task                     linux/arm64/v8    ok        
io.containerd.runtime.v2               shim                     -                 ok        
io.containerd.sandbox.store.v1         local                    -                 ok        
io.containerd.sandbox.controller.v1    local                    -                 ok        
io.containerd.streaming.v1             manager                  -                 ok        
io.containerd.service.v1               introspection-service    -                 ok        
io.containerd.service.v1               containers-service       -                 ok        
io.containerd.service.v1               content-service          -                 ok        
io.containerd.service.v1               diff-service             -                 ok        
io.containerd.service.v1               images-service           -                 ok        
io.containerd.service.v1               namespaces-service       -                 ok        
io.containerd.service.v1               snapshots-service        -                 ok        
io.containerd.runtime.v1               linux                    linux/arm64/v8    ok        
io.containerd.monitor.v1               cgroups                  linux/arm64/v8    ok        
io.containerd.service.v1               tasks-service            -                 ok        
io.containerd.grpc.v1                  introspection            -                 ok        
io.containerd.transfer.v1              local                    -                 ok        
io.containerd.internal.v1              restart                  -                 ok        
io.containerd.grpc.v1                  containers               -                 ok        
io.containerd.grpc.v1                  content                  -                 ok        
io.containerd.grpc.v1                  diff                     -                 ok        
io.containerd.grpc.v1                  events                   -                 ok        
io.containerd.grpc.v1                  healthcheck              -                 ok        
io.containerd.grpc.v1                  images                   -                 ok        
io.containerd.grpc.v1                  leases                   -                 ok        
io.containerd.grpc.v1                  namespaces               -                 ok        
io.containerd.internal.v1              opt                      -                 ok        
io.containerd.grpc.v1                  sandbox-controllers      -                 ok        
io.containerd.grpc.v1                  sandboxes                -                 ok        
io.containerd.grpc.v1                  snapshots                -                 ok        
io.containerd.grpc.v1                  streaming                -                 ok        
io.containerd.grpc.v1                  tasks                    -                 ok        
io.containerd.grpc.v1                  transfer                 -                 ok        
io.containerd.grpc.v1                  version                  -                 ok        
io.containerd.grpc.v1                  cri                      linux/arm64/v8    ok        
io.containerd.tracing.processor.v1     otlp                     -                 skip      
io.containerd.internal.v1              tracing                  -                 ok        

```

### pull images of all platfroms 

```
sudo ctr image pull --all-platforms \
docker.io/library/alpine:latest
```

### export as tar 

sangam@sangam:~$ sudo ctr image export --all-platforms  \
image-layout-alpine.tar  docker.io/library/alpine:latest
sangam@sangam:~$ ls
code-server  image-layout-alpine.tar  runc-sangam-demo
sangam@sangam:~$ 

#### extract the tar file 

sangam@sangam:~$ tar xf image-layout-alpine.tar
sangam@sangam:~$ ls
blobs  code-server  image-layout-alpine.tar  index.json  manifest.json  oci-layout  runc-sangam-demo


#### skiped unwanted file and see what we got in tar 

```

sangam@sangam:~$ tree -I 'runc-sangam-demo|code-server'
.
├── blobs
│   └── sha256
│       ├── 05455a08881ea9cf0e752bc48e61bbd71a34c029bb13df01e40e3e70e0d007bd
│       ├── 0dc2e6c0f9ded2daeca96bbf270526d182d2f4267f5c7610c222c05cad6f6b96
│       ├── 15c46ced65c6abed6a27472a7904b04273e9a8091a5627badd6ff016ab073171
│       ├── 2d433224a9f8f46c545c8fc4bc82ea382227d892e9f0c704d90ef585542bf497
│       ├── 30c69795e46bd167df7f6152056f3c885cba4f5b4238e2327c73fb35c226d351
│       ├── 4a0759b5afbffdc507fbb4e32b3a139063c3a5c0829f811973850447f98830ae
│       ├── 4abcf20661432fb2d719aaf90656f55c287f8ca915dc1c92ec14ff61e67fbaf8
│       ├── 5b984dd0323cee557fb6a9d8796f4b4414317cf1fb88bb2047d2046ac9447d77
│       ├── 5d0da60400afb021f2d8dbfec8b7d26457e77eb8825cba90eba84319133f0efe
│       ├── 6457d53fb065d6f250e1504b9bc42d5b6c65941d57532c072d929dd0628977d0
│       ├── 8fc740d8c40e45ea330a3f324fe009148dfc1f771bc90254eaf8ff8bbcecfe02
│       ├── 935b61847fc465ff70ecbd3436253a7596a500e649a16014646a99393ccbb661
│       ├── a0264d60f80df12bc1e6dd98bae6c43debe6667c0ba482711f0d806493467a46
│       ├── ace17d5d883e9ea5a21138d0608d60aa2376c68f616c55b0b7e73fba6d8556a3
│       ├── b12b826de1ec8c4237aa09a0287e7be8bd317586f32bf6cd9395ec5dba52a3a2
│       ├── b229a85166aadbde58e73e03c5e2b9737fb4642ffb2d98ba453adc90d144c1d8
│       ├── bca4290a96390d7a6fc6f2f9929370d06f8dfcacba591c76e3d5c5044e7f420c
│       ├── c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b
│       ├── eb8fba61d86413beda3240c40c599041e040e658cd8314e38ee15e67ea57d349
│       ├── ec299a7ba3c670e38642b0b62a0c779d84b249a3c889757e2b6f841433b4c6fe
│       ├── f4968021da4ff8b74325e5aebf0f9448b44becfdd14df80ecba474e43cc92546
│       └── fda0ff469afd28d9cfbb946e8e0a3c911c591a2691bea62be9187e45a1c50549
├── image-layout-alpine.tar
├── index.json
├── manifest.json
└── oci-layout

2 directories, 26 files

```

### image manifest 

```
sangam@sangam:~$ cat manifest.json  | jq .
[
  {
    "Config": "blobs/sha256/ace17d5d883e9ea5a21138d0608d60aa2376c68f616c55b0b7e73fba6d8556a3",
    "RepoTags": [
      "alpine:latest"
    ],
    "Layers": [
      "blobs/sha256/bca4290a96390d7a6fc6f2f9929370d06f8dfcacba591c76e3d5c5044e7f420c"
    ]
  }
]


```

which appears to be a manifest list or an image index in the OCI (Open Container Initiative) format. It's a JSON file that describes an image in a container registry, such as Docker Hub


### read image config and image layers 

```

sangam@sangam:~$ cat ./blobs/sha256/c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b | jq .
{
  "manifests": [
    {
      "digest": "sha256:6457d53fb065d6f250e1504b9bc42d5b6c65941d57532c072d929dd0628977d0",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "amd64",
        "os": "linux"
      },
      "size": 528
    },
    {
      "digest": "sha256:b229a85166aadbde58e73e03c5e2b9737fb4642ffb2d98ba453adc90d144c1d8",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "arm",
        "os": "linux",
        "variant": "v6"
      },
      "size": 528
    },
    {
      "digest": "sha256:ec299a7ba3c670e38642b0b62a0c779d84b249a3c889757e2b6f841433b4c6fe",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "arm",
        "os": "linux",
        "variant": "v7"
      },
      "size": 528
    },
    {
      "digest": "sha256:a0264d60f80df12bc1e6dd98bae6c43debe6667c0ba482711f0d806493467a46",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "arm64",
        "os": "linux",
        "variant": "v8"
      },
      "size": 528
    },
    {
      "digest": "sha256:15c46ced65c6abed6a27472a7904b04273e9a8091a5627badd6ff016ab073171",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "386",
        "os": "linux"
      },
      "size": 528
    },
    {
      "digest": "sha256:b12b826de1ec8c4237aa09a0287e7be8bd317586f32bf6cd9395ec5dba52a3a2",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "ppc64le",
        "os": "linux"
      },
      "size": 528
    },
    {
      "digest": "sha256:5d0da60400afb021f2d8dbfec8b7d26457e77eb8825cba90eba84319133f0efe",
      "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
      "platform": {
        "architecture": "s390x",
        "os": "linux"
      },
      "size": 528
    }
  ],
  "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
  "schemaVersion": 2
}

```






