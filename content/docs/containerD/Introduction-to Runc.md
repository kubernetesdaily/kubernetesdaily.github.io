---
title: "Introduction to Runc"
weight : 3
---

#### install ruc 


```
sangam@sangam:~$ sudo apt-get -y install runc 
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
runc is already the newest version (1.1.7-0ubuntu1~22.04.2).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.


sangam@sangam:~$ runc 
NAME:
   runc - Open Container Initiative runtime

runc is a command line client for running applications packaged according to
the Open Container Initiative (OCI) format and is a compliant implementation of the
Open Container Initiative specification.

runc integrates well with existing process supervisors to provide a production
container runtime environment for applications. It can be used with your
existing process monitoring tools and the container will be spawned as a
direct child of the process supervisor.

Containers are configured using bundles. A bundle for a container is a directory
that includes a specification file named "config.json" and a root filesystem.
The root filesystem contains the contents of the container.

To start a new instance of a container:

    # runc run [ -b bundle ] <container-id>

Where "<container-id>" is your name for the instance of the container that you
are starting. The name you provide for the container instance must be unique on
your host. Providing the bundle directory using "-b" is optional. The default
value for "bundle" is the current directory.

USAGE:
   runc [global options] command [command options] [arguments...]

VERSION:
   1.1.7-0ubuntu1~22.04.2
spec: 1.0.2-dev
go: go1.18.1
libseccomp: 2.5.3

COMMANDS:
   checkpoint  checkpoint a running container
   create      create a container
   delete      delete any resources held by the container often used with detached container
   events      display container events such as OOM notifications, cpu, memory, and IO usage statistics
   exec        execute new process inside the container
   kill        kill sends the specified signal (default: SIGTERM) to the container's init process
   list        lists containers started by runc with the given root
   pause       pause suspends all processes inside the container
   ps          ps displays the processes running inside a container
   restore     restore a container from a previous checkpoint
   resume      resumes all processes that have been previously paused
   run         create and run a container
   spec        create a new specification file
   start       executes the user defined process in a created container
   state       output the state of a container
   update      update container resource constraints
   features    show the enabled features
   help, h     Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --debug             enable debug logging
   --log value         set the log file to write runc logs to (default is '/dev/stderr')
   --log-format value  set the log format ('text' (default), or 'json') (default: "text")
   --root value        root directory for storage of container state (this should be located in tmpfs) (default: "/run/user/1000/runc")
   --criu value        path to the criu binary used for checkpoint and restore (default: "criu")
   --systemd-cgroup    enable systemd cgroup support, expects cgroupsPath to be of form "slice:prefix:name" for e.g. "system.slice:runc:434234"
   --rootless value    ignore cgroup permission errors ('true', 'false', or 'auto') (default: "auto")
   --help, -h          show help
   --version, -v       print the version
sangam@sangam:~$ 


```

### create directory 
```
sangam@sangam:~$ mkdir runc-sangam-demo
sangam@sangam:~$ cd runc-sangam-demo/
```


once installed, you can start using runc:

### Creating a Container

Create a Root Filesystem: You need a root filesystem for your container. You can create a simple one or use an existing Docker image.
Example: mkdir rootfs and unpack a Docker image into it using docker export and tar.
```
mkdir rootfs
```

### Export the filesystem of an existing Docker image (e.g., alphine)

```
sudo docker pull alpine
Using default tag: latest
latest: Pulling from library/alpine
bca4290a9639: Pull complete 
Digest: sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b
Status: Downloaded newer image for alpine:latest
docker.io/library/alpine:latest

docker export $(docker create alpine) | tar -C rootfs -xvf -


```

### it will give us two files 

```
sangam@sangam:~/runc-sangam-demo$ ls
config.json  rootfs

```

### check it out config.json file 


```
sangam@sangam:~/runc-sangam-demo$ cat config.json 
{
	"ociVersion": "1.0.2-dev",
	"process": {
		"terminal": true,
		"user": {
			"uid": 0,
			"gid": 0
		},
		"args": [
			"sh"
		],
		"env": [
			"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			"TERM=xterm"
		],
		"cwd": "/",
		"capabilities": {
			"bounding": [
				"CAP_AUDIT_WRITE",
				"CAP_KILL",
				"CAP_NET_BIND_SERVICE"
			],
			"effective": [
				"CAP_AUDIT_WRITE",
				"CAP_KILL",
				"CAP_NET_BIND_SERVICE"
			],
			"permitted": [
				"CAP_AUDIT_WRITE",
				"CAP_KILL",
				"CAP_NET_BIND_SERVICE"
			],
			"ambient": [
				"CAP_AUDIT_WRITE",
				"CAP_KILL",
				"CAP_NET_BIND_SERVICE"
			]
		},
		"rlimits": [
			{
				"type": "RLIMIT_NOFILE",
				"hard": 1024,
				"soft": 1024
			}
		],
		"noNewPrivileges": true
	},
	"root": {
		"path": "rootfs",
		"readonly": true
	},
	"hostname": "runc",
	"mounts": [
		{
			"destination": "/proc",
			"type": "proc",
			"source": "proc"
		},
		{
			"destination": "/dev",
			"type": "tmpfs",
			"source": "tmpfs",
			"options": [
				"nosuid",
				"strictatime",
				"mode=755",
				"size=65536k"
			]
		},
		{
			"destination": "/dev/pts",
			"type": "devpts",
			"source": "devpts",
			"options": [
				"nosuid",
				"noexec",
				"newinstance",
				"ptmxmode=0666",
				"mode=0620",
				"gid=5"
			]
		},
		{
			"destination": "/dev/shm",
			"type": "tmpfs",
			"source": "shm",
			"options": [
				"nosuid",
				"noexec",
				"nodev",
				"mode=1777",
				"size=65536k"
			]
		},
		{
			"destination": "/dev/mqueue",
			"type": "mqueue",
			"source": "mqueue",
			"options": [
				"nosuid",
				"noexec",
				"nodev"
			]
		},
		{
			"destination": "/sys",
			"type": "sysfs",
			"source": "sysfs",
			"options": [
				"nosuid",
				"noexec",
				"nodev",
				"ro"
			]
		},
		{
			"destination": "/sys/fs/cgroup",
			"type": "cgroup",
			"source": "cgroup",
			"options": [
				"nosuid",
				"noexec",
				"nodev",
				"relatime",
				"ro"
			]
		}
	],
	"linux": {
		"resources": {
			"devices": [
				{
					"allow": false,
					"access": "rwm"
				}
			]
		},
		"namespaces": [
			{
				"type": "pid"
			},
			{
				"type": "network"
			},
			{
				"type": "ipc"
			},
			{
				"type": "uts"
			},
			{
				"type": "mount"
			},
			{
				"type": "cgroup"
			}
		],
		"maskedPaths": [
			"/proc/acpi",
			"/proc/asound",
			"/proc/kcore",
			"/proc/keys",
			"/proc/latency_stats",
			"/proc/timer_list",
			"/proc/timer_stats",
			"/proc/sched_debug",
			"/sys/firmware",
			"/proc/scsi"
		],
		"readonlyPaths": [
			"/proc/bus",
			"/proc/fs",
			"/proc/irq",
			"/proc/sys",
			"/proc/sysrq-trigger"
		]
	}
}
```


#### config file in depth 

**ociVersion**

ociVersion: Specifies the OCI Runtime Specification version that the configuration is compatible with.

**process**

This section details how the process inside the container should be run.

- terminal: If set to true, a terminal is attached to the process.
- user: Specifies the UID and GID for the process.
- args: Arguments for the process to be run inside the container. In your case, it starts a shell (sh).
- env: Environment variables.
- cwd: Current working directory inside the container.
- capabilities: Linux capabilities that the process inside the container can use.
- rlimits: Resource limits for the process (e.g., number of open files).
- noNewPrivileges: If true, the process is not allowed to gain new privileges.

**root** 

- path: The path to the root filesystem relative to the location of the config.json file. Here, it's set to use the rootfs directory.

- readonly: If true, the root filesystem is mounted as read-only.

**hostname**

- hostname: The hostname set for the container.

**mounts**

This section defines filesystems or directories that are mounted in the container.

- destination: Where the mount will be placed inside the container.
- type: The type of the filesystem to be mounted (e.g., proc, tmpfs).
- source: The source of the mount.
- options: Mount options.

**linux**

This section contains Linux-specific configurations.

- resources: Controls how the container can interact with system resources.
- namespaces: Namespaces provide isolation for the container. Common namespaces include pid, network, ipc, uts, mount, and cgroup.
- maskedPaths: Paths that should be hidden from the container.
- readonlyPaths: Paths that should be read-only inside the container.


#### runc run - create and run a container

```
runc spec --help
NAME:
   runc spec - create a new specification file

USAGE:
   runc spec [command options] [arguments...]

DESCRIPTION:
   The spec command creates the new specification file named "config.json" for
the bundle.

The spec generated is just a starter file. Editing of the spec is required to
achieve desired results. For example, the newly generated spec includes an args
parameter that is initially set to call the "sh" command when the container is
started. Calling "sh" may work for an ubuntu container or busybox, but will not
work for containers that do not include the "sh" program.

EXAMPLE:
  To run docker's hello-world container one needs to set the args parameter
in the spec to call hello. This can be done using the sed command or a text
editor. The following commands create a bundle for hello-world, change the
default args parameter in the spec from "sh" to "/hello", then run the hello
command in a new hello-world container named container1:

    mkdir hello
    cd hello
    docker pull hello-world
    docker export $(docker create hello-world) > hello-world.tar
    mkdir rootfs
    tar -C rootfs -xf hello-world.tar
    runc spec
    sed -i 's;"sh";"/hello";' config.json
    runc run container1

In the run command above, "container1" is the name for the instance of the
container that you are starting. The name you provide for the container instance
must be unique on your host.

An alternative for generating a customized spec config is to use "oci-runtime-tool", the
sub-command "oci-runtime-tool generate" has lots of options that can be used to do any
customizations as you want, see runtime-tools (https://github.com/opencontainers/runtime-tools)
to get more information.

When starting a container through runc, runc needs root privilege. If not
already running as root, you can use sudo to give runc root privilege. For
example: "sudo runc start container1" will give runc root privilege to start the
container on your host.

Alternatively, you can start a rootless container, which has the ability to run
without root privileges. For this to work, the specification file needs to be
adjusted accordingly. You can pass the parameter --rootless to this command to
generate a proper rootless spec file.

Note that --rootless is not needed when you execute runc as the root in a user namespace
created by an unprivileged user.


OPTIONS:
   --bundle value, -b value  path to the root of the bundle directory
   --rootless                generate a configuration for a rootless container
   
```

### lets create 

```
sangam@sangam:~/runc-sangam-demo$ sudo runc create --bundle . container1
sangam@sangam:~/runc-sangam-demo$ sudo runc list
ID           PID         STATUS      BUNDLE                          CREATED                         OWNER
container1   379391      created     /home/sangam/runc-sangam-demo   2024-02-08T16:08:52.31926604Z   root

```

### list all namespaces 

```

sangam@sangam:~/runc-sangam-demo$ sudo lsns
        NS TYPE   NPROCS    PID USER             COMMAND
4026531834 time      221      1 root             /sbin/init
4026531835 cgroup    220      1 root             /sbin/init
4026531836 pid       208      1 root             /sbin/init
4026531837 user      221      1 root             /sbin/init
4026531838 uts       217      1 root             /sbin/init
4026531839 ipc       208      1 root             /sbin/init
4026531840 net       220      1 root             /sbin/init
4026531841 mnt       202      1 root             /sbin/init
4026531862 mnt         1     25 root             kdevtmpfs
4026532545 mnt         1    561 root             /lib/systemd/systemd-udevd
4026532546 uts         1    561 root             /lib/systemd/systemd-udevd
4026532626 mnt         1    714 systemd-timesync /lib/systemd/systemd-timesyncd
4026532627 uts         1    714 systemd-timesync /lib/systemd/systemd-timesyncd
4026532628 mnt         1    821 systemd-network  /lib/systemd/systemd-networkd
4026532629 mnt         1    823 systemd-resolve  /lib/systemd/systemd-resolved
4026532660 mnt         1   2373 65535            /pause
4026532661 ipc        12   2373 65535            /pause
4026532662 pid         1   2373 65535            /pause
4026532663 mnt        11   2662 root             /usr/local/bin/runsvdir -P /etc/service/enabled
4026532664 pid        11   2662 root             /usr/local/bin/runsvdir -P /etc/service/enabled
4026532666 mnt         1 379391 root             runc init
4026532667 uts         1 379391 root             runc init
4026532668 ipc         1 379391 root             runc init
4026532669 pid         1 379391 root             runc init
4026532670 net         1 379391 root             runc init
4026532713 mnt         1    869 root             /lib/systemd/systemd-logind
4026532714 uts         1    869 root             /lib/systemd/systemd-logind
4026532732 cgroup      1 379391 root             runc init

```

### list of all running processes on your system, including details about the user running each process, CPU and memory usage, the process ID (PID), the parent process ID (PPID), and more.

```
sangam@sangam:~/runc-sangam-demo$ ps auxf
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           2  0.0  0.0      0     0 ?        S    11:32   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [rcu_par_gp]
root           5  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [slub_flushwq]
root           6  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [netns]
root           8  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kworker/0:0H-events_highpri]
root          10  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [mm_percpu_wq]
root          11  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [rcu_tasks_rude_]
root          12  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [rcu_tasks_trace]
root          13  0.0  0.0      0     0 ?        S    11:32   0:01  \_ [ksoftirqd/0]
root          14  0.0  0.0      0     0 ?        I    11:32   0:06  \_ [rcu_sched]
root          15  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [migration/0]
root          16  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [idle_inject/0]
root          18  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [cpuhp/0]
root          19  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [cpuhp/1]
root          20  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [idle_inject/1]
root          21  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [migration/1]
root          22  0.0  0.0      0     0 ?        S    11:32   0:01  \_ [ksoftirqd/1]
root          24  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kworker/1:0H-events_highpri]
root          25  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [kdevtmpfs]
root          26  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [inet_frag_wq]
root          28  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [kauditd]
root          29  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [khungtaskd]
root          30  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [oom_reaper]
root          31  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [writeback]
root          32  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [kcompactd0]
root          33  0.0  0.0      0     0 ?        SN   11:32   0:00  \_ [ksmd]
root          34  0.0  0.0      0     0 ?        SN   11:32   0:00  \_ [khugepaged]
root          80  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kintegrityd]
root          81  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kblockd]
root          82  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [blkcg_punt_bio]
root          83  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [tpm_dev_wq]
root          84  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [ata_sff]
root          85  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [md]
root          86  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [edac-poller]
root          87  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [devfreq_wq]
root          88  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [watchdogd]
root          90  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kworker/0:1H-kblockd]
root          91  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [kswapd0]
root          92  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [ecryptfs-kthrea]
root          94  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kthrotld]
root          95  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/13-pciehp]
root          96  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/14-pciehp]
root          97  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/15-pciehp]
root          98  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/16-pciehp]
root          99  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/17-pciehp]
root         100  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/18-pciehp]
root         101  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/19-pciehp]
root         102  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/20-pciehp]
root         103  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/21-pciehp]
root         104  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/22-pciehp]
root         105  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/23-pciehp]
root         106  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/24-pciehp]
root         107  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/25-pciehp]
root         108  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/26-pciehp]
root         109  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/27-pciehp]
root         110  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/28-pciehp]
root         111  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/29-pciehp]
root         112  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/30-pciehp]
root         113  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/31-pciehp]
root         114  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/32-pciehp]
root         115  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/33-pciehp]
root         116  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/34-pciehp]
root         117  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/35-pciehp]
root         118  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/36-pciehp]
root         119  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/37-pciehp]
root         120  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/38-pciehp]
root         121  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/39-pciehp]
root         122  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/40-pciehp]
root         123  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/41-pciehp]
root         124  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/42-pciehp]
root         125  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/43-pciehp]
root         126  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [irq/44-pciehp]
root         127  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [acpi_thermal_pm]
root         129  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [mld]
root         130  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [ipv6_addrconf]
root         140  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kstrp]
root         144  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [zswap-shrink]
root         145  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kworker/u5:0]
root         148  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [cryptd]
root         187  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [charger_manager]
root         211  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kworker/1:1H-kblockd]
root         234  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [nvme-wq]
root         235  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [nvme-reset-wq]
root         236  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [nvme-delete-wq]
root         238  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_0]
root         239  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_0]
root         240  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_1]
root         241  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_1]
root         242  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_2]
root         243  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_2]
root         244  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_3]
root         259  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_3]
root         261  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_4]
root         265  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_4]
root         267  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_5]
root         268  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_5]
root         271  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_6]
root         273  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_6]
root         276  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [ttm_swap]
root         277  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_7]
root         279  0.0  0.0      0     0 ?        S    11:32   0:02  \_ [irq/45-vmwgfx]
root         281  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc0]
root         282  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc1]
root         283  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc2]
root         284  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc3]
root         285  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc4]
root         286  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc5]
root         287  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc6]
root         288  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [card0-crtc7]
root         289  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_7]
root         293  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_8]
root         295  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_8]
root         296  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_9]
root         298  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_9]
root         300  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_10]
root         301  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_10]
root         302  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_11]
root         304  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_11]
root         305  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_12]
root         307  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_12]
root         308  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_13]
root         310  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_13]
root         315  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_14]
root         316  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_14]
root         317  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_15]
root         319  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_15]
root         321  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_16]
root         322  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_16]
root         323  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_17]
root         324  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_17]
root         325  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_18]
root         326  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_18]
root         327  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_19]
root         328  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_19]
root         329  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_20]
root         330  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_20]
root         331  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_21]
root         332  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_21]
root         333  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_22]
root         334  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_22]
root         335  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_23]
root         336  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_23]
root         337  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_24]
root         338  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_24]
root         339  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_25]
root         340  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_25]
root         341  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_26]
root         342  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_26]
root         343  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_27]
root         344  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_27]
root         345  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_28]
root         346  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_28]
root         347  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [scsi_eh_29]
root         348  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [scsi_tmf_29]
root         382  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kdmflush]
root         416  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [raid5wq]
root         463  0.0  0.0      0     0 ?        S    11:32   0:02  \_ [jbd2/dm-0-8]
root         464  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [ext4-rsv-conver]
root         560  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kaluad]
root         562  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kmpath_rdacd]
root         564  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kmpathd]
root         565  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [kmpath_handlerd]
root         686  0.0  0.0      0     0 ?        S    11:32   0:00  \_ [jbd2/nvme0n1p2-]
root         688  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [ext4-rsv-conver]
root        1721  0.0  0.0   2184   764 ?        S    11:32   0:00  \_ bpfilter_umh
root        2070  0.0  0.0      0     0 ?        I<   11:32   0:00  \_ [dio/dm-0]
root      156869  0.0  0.0      0     0 ?        I    13:25   0:01  \_ [kworker/u4:1-flush-253:0]
root      313679  0.0  0.0      0     0 ?        I    15:20   0:00  \_ [kworker/u4:3-events_unbound]
root      363789  0.0  0.0      0     0 ?        I    15:57   0:00  \_ [kworker/0:2-events]
root      365001  0.0  0.0      0     0 ?        I    15:58   0:00  \_ [kworker/u4:2-events_unbound]
root      370567  0.0  0.0      0     0 ?        I    16:02   0:00  \_ [kworker/1:0-events]
root      378476  0.0  0.0      0     0 ?        I    16:08   0:00  \_ [kworker/1:1-events]
root      378512  0.0  0.0      0     0 ?        I    16:08   0:00  \_ [kworker/0:1-events]
root      385797  0.0  0.0      0     0 ?        I    16:13   0:00  \_ [kworker/0:0-events]
root           1  0.0  0.2 101092 10708 ?        Ss   11:32   0:15 /sbin/init
root         526  0.3  8.8 540332 352704 ?       S<s  11:32   1:03 /lib/systemd/systemd-journald
root         561  0.0  0.1  25320  5924 ?        Ss   11:32   0:00 /lib/systemd/systemd-udevd
root         566  0.0  0.6 289660 25664 ?        SLsl 11:32   0:01 /sbin/multipathd -d -s
systemd+     714  0.0  0.1  88652  6344 ?        Ssl  11:32   0:00 /lib/systemd/systemd-timesyncd
systemd+     821  0.0  0.1  16400  7700 ?        Ss   11:32   0:00 /lib/systemd/systemd-networkd
systemd+     823  0.0  0.2  25204 11580 ?        Ss   11:32   0:00 /lib/systemd/systemd-resolved
message+     843  0.0  0.1   8840  4240 ?        Ss   11:32   0:00 @dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-on
root         857  0.0  0.4  29952 17636 ?        Ss   11:32   0:00 /usr/bin/python3 /usr/bin/networkd-dispatcher --run-startup-triggers
root         860  0.0  0.0   4956  3756 ?        Ss   11:32   0:07 /bin/bash /snap/microk8s/6227/apiservice-kicker
root      386729  0.0  0.0   2380   204 ?        S    16:14   0:00  \_ sleep 5
root         862  0.0  0.0   4288  3144 ?        Ss   11:32   0:00 /bin/bash /snap/microk8s/6227/run-cluster-agent-with-args
root        1398  0.0  0.6 741492 26780 ?        Sl   11:32   0:02  \_ /snap/microk8s/6227/bin/cluster-agent cluster-agent --bind 0.0.0.0:25000 --keyfile /var/sn
root         863  0.9  1.2 1560972 48280 ?       Ssl  11:32   2:37 /snap/microk8s/6227/bin/containerd --config /var/snap/microk8s/6227/args/containerd.toml --roo
root         866  5.5  5.9 1751344 237952 ?      Ssl  11:32  15:38 /snap/microk8s/6227/bin/k8s-dqlite --storage-dir=/var/snap/microk8s/6227/var/kubernetes/backen
root         867  0.0  0.7 1391976 29656 ?       Ssl  11:32   0:15 /usr/lib/snapd/snapd
root         869  0.0  0.1  48580  6924 ?        Ss   11:32   0:00 /lib/systemd/systemd-logind
root         872  0.1  0.9 1344056 38712 ?       Ssl  11:32   0:20 /usr/bin/containerd
root         925  0.0  0.0   2608   808 tty1     Ss+  11:32   0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
root        1017  0.0  0.1  15152  7992 ?        Ss   11:32   0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
root        1546  0.0  0.2  18384  9616 ?        Ss   11:32   0:00  \_ sshd: sangam [priv]
sangam      1868  0.0  0.1  18516  6568 ?        S    11:32   0:00      \_ sshd: sangam@pts/0
sangam      1869  0.0  0.0   4684  3744 pts/0    Ss   11:32   0:00          \_ -bash
sangam    386730  0.0  0.0   8136  3300 pts/0    R+   16:14   0:00              \_ ps auxf
root        1052  0.0  0.4 107044 19948 ?        Ssl  11:32   0:00 /usr/bin/python3 /usr/share/unattended-upgrades/unattended-upgrade-shutdown --wait-for-signal
root        1102  0.0  1.6 1370164 64656 ?       Ssl  11:32   0:02 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
root        1552  6.1  8.9 1055132 360408 ?      Ssl  11:32  17:28 /snap/microk8s/6227/kubelite --scheduler-args-file=/var/snap/microk8s/6227/args/kube-scheduler
sangam      1839  0.0  0.2  17340  9064 ?        Ss   11:32   0:00 /lib/systemd/systemd --user
sangam      1840  0.0  0.1 105132  5160 ?        S    11:32   0:00  \_ (sd-pam)
root        2298  0.1  0.2 719424 10152 ?        Sl   11:32   0:29 /snap/microk8s/6227/bin/containerd-shim-runc-v2 -namespace k8s.io -id e3cdeab7e3463dcd4c0d1f96
65535       2373  0.0  0.0    792     4 ?        Ss   11:32   0:00  \_ /pause
root        2662  0.0  0.0   1992   504 ?        Ss   11:32   0:00  \_ /usr/local/bin/runsvdir -P /etc/service/enabled
root        2738  0.0  0.0   1840   496 ?        Ss   11:32   0:00      \_ runsv monitor-addresses
root        2744  0.0  1.1 1224388 44816 ?       Sl   11:32   0:01      |   \_ calico-node -monitor-addresses
root        2739  0.0  0.0   1840   520 ?        Ss   11:32   0:00      \_ runsv node-status-reporter
root        2745  0.1  1.2 1224388 50936 ?       Sl   11:32   0:17      |   \_ calico-node -status-reporter
root        2740  0.0  0.0   1840   516 ?        Ss   11:32   0:00      \_ runsv felix
root        2747  2.0  1.4 1667548 58712 ?       Sl   11:32   5:51      |   \_ calico-node -felix
root        2741  0.0  0.0   1840   512 ?        Ss   11:32   0:00      \_ runsv cni
root        2743  0.0  1.1 1224388 44616 ?       Sl   11:32   0:00      |   \_ calico-node -monitor-token
root        2742  0.0  0.0   1840   540 ?        Ss   11:32   0:00      \_ runsv allocate-tunnel-addrs
root        2746  0.1  1.3 1298376 55568 ?       Sl   11:32   0:27          \_ calico-node -allocate-tunnel-addrs
root      379391  0.0  0.2 1007224 8808 ?        Ssl  16:08   0:00 runc init
```

#### start container and check state of container 


```
sangam@sangam:~/runc-sangam-demo$ sudo runc run container1
y
y ...

yy
```

#### kill the container 1 process 

sangam@sangam:~$ sudo runc kill container1  SIGKILL 



#### Cheatsheet - Runc Commands for Managing Containers

The following table provides an overview of various `runc` commands and their usage, demonstrated with an Alpine Linux container named `container1`.

| Command              | Description                                                      | Example Usage                         |
|----------------------|------------------------------------------------------------------|---------------------------------------|
| `spec`               | Create a new specification file for the container.               | `sudo runc spec`                      |
| `create`             | Create a container instance based on the spec file.              | `sudo runc create container1`         |
| `start`              | Start the container's init process.                              | `sudo runc start container1`          |
| `list`               | List containers managed by `runc`.                               | `sudo runc list`                      |
| `exec`               | Execute a command inside the running container.                  | `sudo runc exec container1 ls`        |
| `state`              | Output the state of a specified container.                       | `sudo runc state container1`          |
| `pause`              | Pause all processes within the container.                        | `sudo runc pause container1`          |
| `resume`             | Resume all processes that have been previously paused.           | `sudo runc resume container1`         |
| `delete`             | Delete the container (only if it's not running).                 | `sudo runc delete container1`         |

Remember to edit the `config.json` file to specify the Alpine Linux root filesystem and adjust other configurations as necessary for your setup.
