---
title: "Auditing Docker Security "
slug: "Auditing-Docker-Security"
weight : 6
---

## Auditing Docker Security

DOCKER BENCH FOR SECURITY

Docker Bench for Security is an open source Bash script that checks for various common security best practices of deploying Docker in production environments. The tests are all automated and are based on the CIS Docker Benchmark. More information about Docker Bench for Security can be found
on GitHub: https://github.com/docker/docker-bench-security


## auditing docker security with docker bench for security 


The auditing process can be performed by following the procedures outlined below:

You first need to clone the docker/docker-bench-security GitHub repository on your Docker host. This can be done by running the following command:


```
git clone https://github.com/docker/docker-bench-security.git
```
After cloning the repository, you will need to navigate into the docker-bench-security repository that you just cloned:

```
cd docker-bench-security


```

The cloned directory will contain a Bash script named docker-bench-security.sh. We can run this script to perform the Docker security audit by running the following command:

```
sudo ./docker-bench-security.sh
```

When the script is executed, it will perform all the necessary security checks. Once completed, it will provide you with a baseline security score as highlighted 

```
Section C - Score

[INFO] Checks: 117
[INFO] Score: -5

```

# Docker Bench for Security Options 

```bash
   b           optional  Do not print colors
  -h           optional  Print this help message
  -l FILE      optional  Log output in FILE, inside container if run using docker
  -u USERS     optional  Comma delimited list of trusted docker user(s)
  -c CHECK     optional  Comma delimited list of specific check(s) id
  -e CHECK     optional  Comma delimited list of specific check(s) id to exclude
  -i INCLUDE   optional  Comma delimited list of patterns within a container or image name to check
  -x EXCLUDE   optional  Comma delimited list of patterns within a container or image name to exclude from check
  -n LIMIT     optional  In JSON output, when reporting lists of items (containers, images, etc.), limit the number of reported items to LIMIT. Default 0 (no limit).
  -p PRINT     optional  Disable the printing of remediation measures. Default: print remediation measures.

```

## Running Docker Bench for poticular docker images 

```bash
sudo ./docker-bench-security.sh -i hello-world
Password:
# --------------------------------------------------------------------------------------------
# Docker Bench for Security v1.3.6
#
# Docker, Inc. (c) 2015-2023
#
# Checks for dozens of common best-practices around deploying Docker containers in production.
# Based on the CIS Docker Benchmark 1.4.0.
# --------------------------------------------------------------------------------------------

Initializing 2023-01-04T19:09:21:z


Section A - Check results

[INFO] 1 - Host Configuration
[INFO] 1.1 - Linux Hosts Specific Configuration
[WARN] 1.1.1 - Ensure a separate partition for containers has been created (Automated)
[INFO] 1.1.2 - Ensure only trusted users are allowed to control Docker daemon (Automated)
[INFO]       * Users: 
[WARN] 1.1.3 - Ensure auditing is configured for the Docker daemon (Automated)
[WARN] 1.1.4 - Ensure auditing is configured for Docker files and directories -/run/containerd (Automated)
[INFO] 1.1.5 - Ensure auditing is configured for Docker files and directories - /var/lib/docker (Automated)
[INFO]        * Directory not found
[INFO] 1.1.6 - Ensure auditing is configured for Docker files and directories - /etc/docker (Automated)
[INFO]        * Directory not found
[INFO] 1.1.7 - Ensure auditing is configured for Docker files and directories - docker.service (Automated)
[INFO]        * File not found
[INFO] 1.1.8 - Ensure auditing is configured for Docker files and directories - containerd.sock (Automated)
[INFO]        * File not found
[INFO] 1.1.9 - Ensure auditing is configured for Docker files and directories - docker.socket (Automated)
[INFO]        * File not found
[INFO] 1.1.10 - Ensure auditing is configured for Docker files and directories - /etc/default/docker (Automated)
[INFO]        * File not found
[INFO] 1.1.11 - Ensure auditing is configured for Dockerfiles and directories - /etc/docker/daemon.json (Automated)
[INFO]        * File not found
[INFO] 1.1.12 - 1.1.12 Ensure auditing is configured for Dockerfiles and directories - /etc/containerd/config.toml (Automated)
[INFO]        * File not found
[INFO] 1.1.13 - Ensure auditing is configured for Docker files and directories - /etc/sysconfig/docker (Automated)
[INFO]        * File not found
[INFO] 1.1.14 - Ensure auditing is configured for Docker files and directories - /usr/bin/containerd (Automated)
[INFO]         * File not found
[INFO] 1.1.15 - Ensure auditing is configured for Docker files and directories - /usr/bin/containerd-shim (Automated)
[INFO]         * File not found
[INFO] 1.1.16 - Ensure auditing is configured for Docker files and directories - /usr/bin/containerd-shim-runc-v1 (Automated)
[INFO]         * File not found
[INFO] 1.1.17 - Ensure auditing is configured for Docker files and directories - /usr/bin/containerd-shim-runc-v2 (Automated)
[INFO]         * File not found
[INFO] 1.1.18 - Ensure auditing is configured for Docker files and directories - /usr/bin/runc (Automated)
[INFO]         * File not found
[INFO] 1.2 - General Configuration
[NOTE] 1.2.1 - Ensure the container host has been Hardened (Manual)
date: illegal time format
usage: date [-jnRu] [-r seconds|file] [-v[+|-]val[ymwdHMS]]
            [-I[date | hours | minutes | seconds]]
            [-f fmt date | [[[mm]dd]HH]MM[[cc]yy][.ss]] [+format]
./functions/helper_lib.sh: line 36: [: : integer expression expected
./functions/helper_lib.sh: line 37: [: : integer expression expected
[PASS] 1.2.2 - Ensure that the version of Docker is up to date (Manual)
[INFO]        * Using 20.10.21 which is current
[INFO]        * Check with your operating system vendor for support and security maintenance for Docker

[INFO] 2 - Docker daemon configuration
[NOTE] 2.1 - Run the Docker daemon as a non-root user, if possible (Manual)
[WARN] 2.2 - Ensure network traffic is restricted between containers on the default bridge (Scored)
[PASS] 2.3 - Ensure the logging level is set to 'info' (Scored)
[PASS] 2.4 - Ensure Docker is allowed to make changes to iptables (Scored)
[PASS] 2.5 - Ensure insecure registries are not used (Scored)
[PASS] 2.6 - Ensure aufs storage driver is not used (Scored)
[INFO] 2.7 - Ensure TLS authentication for Docker daemon is configured (Scored)
[INFO]      * Docker daemon not listening on TCP
[INFO] 2.8 - Ensure the default ulimit is configured appropriately (Manual)
[INFO]      * Default ulimit doesn't appear to be set
[WARN] 2.9 - Enable user namespace support (Scored)
[PASS] 2.10 - Ensure the default cgroup usage has been confirmed (Scored)
[PASS] 2.11 - Ensure base device size is not changed until needed (Scored)
[WARN] 2.12 - Ensure that authorization for Docker client commands is enabled (Scored)
[WARN] 2.13 - Ensure centralized and remote logging is configured (Scored)
[WARN] 2.14 - Ensure containers are restricted from acquiring new privileges (Scored)
[WARN] 2.15 - Ensure live restore is enabled (Scored)
[WARN] 2.16 - Ensure Userland Proxy is Disabled (Scored)
[PASS] 2.17 - Ensure that a daemon-wide custom seccomp profile is applied if appropriate (Manual)
[INFO] Ensure that experimental features are not implemented in production (Scored) (Deprecated)

[INFO] 3 - Docker daemon configuration files
[INFO] 3.1 - Ensure that the docker.service file ownership is set to root:root (Automated)
[INFO]      * File not found
[INFO] 3.2 - Ensure that docker.service file permissions are appropriately set (Automated)
[INFO]      * File not found
[INFO] 3.3 - Ensure that docker.socket file ownership is set to root:root (Automated)
[INFO]      * File not found
[INFO] 3.4 - Ensure that docker.socket file permissions are set to 644 or more restrictive (Automated)
[INFO]      * File not found
[INFO] 3.5 - Ensure that the /etc/docker directory ownership is set to root:root (Automated)
[INFO]      * Directory not found
[INFO] 3.6 - Ensure that /etc/docker directory permissions are set to 755 or more restrictively (Automated)
[INFO]      * Directory not found
[INFO] 3.7 - Ensure that registry certificate file ownership is set to root:root (Automated)
[INFO]      * Directory not found
[INFO] 3.8 - Ensure that registry certificate file permissions are set to 444 or more restrictively (Automated)
[INFO]      * Directory not found
[INFO] 3.9 - Ensure that TLS CA certificate file ownership is set to root:root (Automated)
[INFO]      * No TLS CA certificate found
[INFO] 3.10 - Ensure that TLS CA certificate file permissions are set to 444 or more restrictively (Automated)
[INFO]       * No TLS CA certificate found
[INFO] 3.11 - Ensure that Docker server certificate file ownership is set to root:root (Automated)
[INFO]       * No TLS Server certificate found
[INFO] 3.12 - Ensure that the Docker server certificate file permissions are set to 444 or more restrictively (Automated)
[INFO]       * No TLS Server certificate found
[INFO] 3.13 - Ensure that the Docker server certificate key file ownership is set to root:root (Automated)
[INFO]       * No TLS Key found
[INFO] 3.14 - Ensure that the Docker server certificate key file permissions are set to 400 (Automated)
[INFO]       * No TLS Key found
stat: illegal option -- c
usage: stat [-FLnq] [-f format | -l | -r | -s | -x] [-t timefmt] [file ...]
[WARN] 3.15 - Ensure that the Docker socket file ownership is set to root:docker (Automated)
[WARN]       * Wrong ownership for /var/run/docker.sock
stat: illegal option -- c
usage: stat [-FLnq] [-f format | -l | -r | -s | -x] [-t timefmt] [file ...]
./tests/3_docker_daemon_configuration_files.sh: line 429: [: : integer expression expected
[WARN] 3.16 - Ensure that the Docker socket file permissions are set to 660 or more restrictively (Automated)
[WARN]       * Wrong permissions for /var/run/docker.sock
[INFO] 3.17 - Ensure that the daemon.json file ownership is set to root:root (Automated)
[INFO]       * File not found
[INFO] 3.18 - Ensure that daemon.json file permissions are set to 644 or more restrictive (Automated)
[INFO]       * File not found
[INFO] 3.19 - Ensure that the /etc/default/docker file ownership is set to root:root (Automated)
[INFO]       * File not found
[INFO] 3.20 - Ensure that the /etc/sysconfig/docker file permissions are set to 644 or more restrictively (Automated)
[INFO]       * File not found
[INFO] 3.21 - Ensure that the /etc/sysconfig/docker file ownership is set to root:root (Automated)
[INFO]       * File not found
[INFO] 3.22 - Ensure that the /etc/default/docker file permissions are set to 644 or more restrictively (Automated)
[INFO]       * File not found
[INFO] 3.23 - Ensure that the Containerd socket file ownership is set to root:root (Automated)
[INFO]       * File not found
[INFO] 3.24 - Ensure that the Containerd socket file permissions are set to 660 or more restrictively (Automated)
[INFO]       * File not found
[INFO] 4 - Container Images and Build File
[INFO] 4.1 - Ensure that a user for the container has been created (Automated)
[INFO]      * No containers running
[NOTE] 4.2 - Ensure that containers use only trusted base images (Manual)
[NOTE] 4.3 - Ensure that unnecessary packages are not installed in the container (Manual)
[NOTE] 4.4 - Ensure images are scanned and rebuilt to include security patches (Manual)
[WARN] 4.5 - Ensure Content trust for Docker is Enabled (Automated)
[PASS] 4.6 - Ensure that HEALTHCHECK instructions have been added to container images (Automated)
[PASS] 4.7 - Ensure update instructions are not used alone in the Dockerfile (Manual)
[NOTE] 4.8 - Ensure setuid and setgid permissions are removed (Manual)
[PASS] 4.9 - Ensure that COPY is used instead of ADD in Dockerfiles (Manual)
[NOTE] 4.10 - Ensure secrets are not stored in Dockerfiles (Manual)
[NOTE] 4.11 - Ensure only verified packages are installed (Manual)
[NOTE] 4.12 - Ensure all signed artifacts are validated (Manual)
[INFO] 5 - Container Runtime
[INFO]   * No containers running, skipping Section 5
[INFO] 6 - Docker Security Operations
[INFO] 6.1 - Ensure that image sprawl is avoided (Manual)
[INFO]      * There are currently: 13 images
[INFO]      * Only 0 out of 13 are in use
[INFO] 6.2 - Ensure that container sprawl is avoided (Manual)
[INFO]      * There are currently a total of 40 containers, with 18 of them currently running
[INFO] 7 - Docker Swarm Configuration
[PASS] 7.1 - Ensure swarm mode is not Enabled, if not needed (Automated)
[PASS] 7.2 - Ensure that the minimum number of manager nodes have been created in a swarm (Automated) (Swarm mode not enabled)
[PASS] 7.3 - Ensure that swarm services are bound to a specific host interface (Automated) (Swarm mode not enabled)
[PASS] 7.4 - Ensure that all Docker swarm overlay networks are encrypted (Automated)
[PASS] 7.5 - Ensure that Docker's secret management commands are used for managing secrets in a swarm cluster (Manual) (Swarm mode not enabled)
[PASS] 7.6 - Ensure that swarm manager is run in auto-lock mode (Automated) (Swarm mode not enabled)
[PASS] 7.7 - Ensure that the swarm manager auto-lock key is rotated periodically (Manual) (Swarm mode not enabled)
[PASS] 7.8 - Ensure that node certificates are rotated as appropriate (Manual) (Swarm mode not enabled)
[PASS] 7.9 - Ensure that CA certificates are rotated as appropriate (Manual) (Swarm mode not enabled)
[PASS] 7.10 - Ensure that management plane traffic is separated from data plane traffic (Manual) (Swarm mode not enabled)


Section C - Score
[INFO] Checks: 86
[INFO] Score: -1


```

# Run the Docker daemon as a non-root user, if possible (Manual) 

The Docker containers by default run with the root privilege and so does the application that runs inside the container. This is another major concern from the security perspective because hackers can gain root access to the Docker host by hacking the application running inside the container.


Add user to Docker group

```bash
$ sudo groupadd docker
```
add your user to the docker group:

```bash
sudo usermod -aG docker [non-root user]

```

Using Dockerfile (USER instruction)

dit the Dockerfile that creates a non-root privilege user and modify the default root user to the newly-created non-root privilege user, as shown here:


```bash
##########################################
# Dockerfile to change from root to 
# non-root privilege
###########################################
# Base image is CentOS 7
FROM Centos:7
# Add a new user "sangam" with user id 8877
RUN useradd -u 8877 sangam
# Change to non-root privilege
USER sangam

```

Proceed to build the Docker image using the “docker build” subcommand, as depicted here:

```bash
sudo docker build -t nonrootimage .

```
 Finally, let’s verify the current user of our container using the id command in a docker run subcommand:

```bash
sudo docker run --rm nonrootimage id
```

# Ensure network traffic is restricted between containers on the default bridge

```bash
sudo docker network ls 
Password:
NETWORK ID     NAME                                                         DRIVER    SCOPE
beb64c03a4cf   bridge                                                       bridge    local
1d337b15d114   host                                                         host      local
88ea4badd709   meshery_docker-extension-meshery-desktop-extension_default   bridge    local
3be4c0abf1a8   minikube                                                     bridge    local
47444c7b3650   multinode-pod-security                                       bridge    local
ed5ab538e49a   none                                                         null      local
```

```bash
sudo docker network inspect bridge

Password:
[
    {
        "Name": "bridge",
        "Id": "beb64c03a4cf6c3385fd311edf8a3ff76670f62045068bad43ad4fcfe40f5c72",
        "Created": "2023-01-04T11:46:52.643189959Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]


```
If not required, you should restrict the network traffic between containers.

By default, unrestricted network traffic is enabled amongst all containers on the same host in the default network bridge. However, a bad actor positioned in a compromised container could leverage this functionality to abuse other services exposed by other containers within the container network on the same host.

To disable the inter-container communication, configure the daemon with the icc flag set to false. Note that this configuration can be overridden by containers that are run with the deprecated --link option.


```bash
$ docker network ls -q | xargs docker network inspect -f '{{ .Name }}: {{ .Options }}'
```
The com.docker.network.bridge.enable_icc should be set to false for the default network bridge.

You should also consider using user-defined bridge networks to enforce network isolation among containers as a more flexible solution.

# Protect the UNIX socket from unintended access



The non-networked /var/run/docker.sock UNIX socket is used by default to locally access the Docker Engine API. The safe default settings on Linux include a socket file owned by the “root” user and a “docker” group allowing solely “root” read and write file permission (ug+rw).

Run this command to review the correctness of the Docker UNIX socket permissions.

```bash
$ ls -l /var/run/docker.sock
lrwxr-xr-x  1 root  daemon  44  4 Jan 17:16 /var/run/docker.sock -> /Users/sangambiradar/.docker/run/docker.sock
```

# Use secure registries to pull and push images

nsecure registries do not use TLS, nor do they have an invalid TLS certificate. Such registries should not be used as they are prone to man-in-the-middle (MITM) attacks by malicious actors who are able to modify the network traffic.

Run the below command to list the insecure registries used by the Docker daemon.

```bash

docker info --format '{{.RegistryConfig.InsecureRegistryCIDRs}}'

```

# Enable user namespace support 
```bash
ps aux | grep dockerd
sangambiradar    34266   0.0  0.0 408626880   1280 s000  S+    7:22PM   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox dockerd
```

```bash
docker container run -it --rm alpine /bin/sh
Unable to find image 'alpine:latest' locally
latest: Pulling from library/alpine
261da4162673: Pull complete 
Digest: sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4
Status: Downloaded newer image for alpine:latest
/ # whoami 
root
```

To follow the principle of least privilege, containerized applications should not be run as root. To achieve this, then the --user parameter can be used to specify a user other than root for the container. It accepts as value a username (if it was previously created in the Dockerfile) or a UID, optionally a GID as well.

## Enable Content Trust
Ensure Content trust for Docker is Enabled. Content trust is a system for signing Docker images and verifying their signatures before running them. We can enable content trust with the `DOCKER_CONTENT_TRUST` environment variable.

To set this variable for your current shell 
session, type the following into the shell:

```bash
export DOCKER_CONTENT_TRUST=1

```


Running the audit after this export command should show that Content trust has been enabled and clear this warning. To enable it automatically for all users and all sessions, add the `DOCKER_CONTENT_TRUST` variable to the `/etc/environment` file, which is a file for assigning system-wide environment variables:

```bash
echo "DOCKER_CONTENT_TRUST=1" | sudo tee -a /etc/environment

```

## Ensure auditing is configured for various Docker files

```bash
sudo apt-get install auditd
```

```bash
sudo nano /etc/audit/audit.rules
ubuntu@enormous-longspur:~$ sudo cat  /etc/audit/audit.rules
## This file is automatically generated from /etc/audit/rules.d
-D
-b 8192
-f 1
--backlog_wait_time 60000

-w /usr/bin/docker -p wa
-w /var/lib/docker -p wa
-w /etc/docker -p wa
-w /lib/systemd/system/docker.service -p wa
-w /lib/systemd/system/docker.socket -p wa
-w /etc/default/docker -p wa
-w /etc/docker/daemon.json -p wa
-w /usr/bin/docker-containerd -p wa
-w /usr/bin/docker-runc -p wa

```

Restart auditd for the changes to take effect:

```bash
sudo systemctl restart auditd
```

## Correcting Docker Daemon Configuration Warnings

```bash
sudo nano /etc/docker/daemon.json
ubuntu@docker:~/docker-bench-security$ cat nano /etc/docker/daemon.json
cat: nano: No such file or directory

{
    "icc": false,
    "userns-remap": "default",
    "log-driver": "syslog",
    "disable-legacy-registry": true,
    "live-restore": true,
    "userland-proxy": false,
    "no-new-privileges": true
}
ubuntu@docker:~/docker-bench-security$ 

sudo systemctl restart docker

```

##  Enable Content Trust

Content trust is a system for signing Docker images and verifying their signatures before running them. We can enable content trust with the DOCKER_CONTENT_TRUST environment variable.

```bash 
export DOCKER_CONTENT_TRUST=1

```

Running the audit after this export command should show that Content trust has been enabled and clear this warning. To enable it automatically for all users and all sessions, add the DOCKER_CONTENT_TRUST variable to the /etc/environment file, which is a file for assigning system-wide environment variables:

```bash 
echo "DOCKER_CONTENT_TRUST=1" | sudo tee -a /etc/environment

```