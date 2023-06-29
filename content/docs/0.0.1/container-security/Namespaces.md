---
title: "4.Namespaces "
description: "Linux Container Namespaces "
weight : 4
---

# Namespaces 


There are several types of namespaces in containers, including:

1. PID Namespaces:
    -  These namespaces isolate the process IDs of containers from the host system and from other containers. This means that each container has its own set of process IDs, which helps to prevent conflicts and ensures that containers cannot access processes belonging to other containers or the host system.

2. Network Namespaces: 
    - These namespaces isolate the network interfaces and IP addresses of containers from the host system and from other containers. This allows each container to have its own virtual network interface and IP address, enabling them to communicate with each other and with the host system.
3. Mount Namespaces: 
   - These namespaces isolate the file systems of containers from the host system and from other containers. This allows each container to have its own file system, which is separate from the file systems of other containers and the host system.
4. User Namespaces:
   -  These namespaces isolate the user IDs of containers from the host system and from other containers. This allows containers to run as a different user or group than the host system, which helps to prevent privilege escalation and ensures that containers cannot access resources belonging to other containers or the host system.
5. UTS Namespaces: 
   - These namespaces isolate the hostname and domain name of containers from the host system and from other containers. This allows each container to have its own hostname and domain name, which can be used to identify the container within a network.

<br>

# PID Namespaces with example 

- PID namespaces are a Linux kernel feature that allow processes to have their own unique process identifier (PID) space, separate from the global PID space. This allows for the creation of multiple, isolated process hierarchies within a single host.

- For example, consider a scenario where you want to run multiple instances of a web server on a single host, each with its own set of processes. Without PID namespaces, you would have to manually manage the PIDs of each instance to ensure that there are no conflicts between them.

- With PID namespaces, you can simply create a new namespace for each instance of the web server, and the processes within each namespace will have their own unique PIDs, separate from the other instances. This makes it much easier to manage and isolate the processes of each instance.

To create a new PID namespace, you can use the "unshare" command, followed by the `-pid` flag. For example:

```bash
$ unshare --pid bash
```
This will create a new bash shell within a new PID namespace, and any processes that you start within this shell will have their own unique PIDs within that namespace. You can verify this by running the "ps" command and observing the PIDs of the processes.

<br>

# Network Namespaces with example 


Namespaces are a way for containers to share a single kernel, but have their own set of resources and processes. This allows for multiple containers to run on a single host without conflicting with each other.

For example, if we have two containers running on a host, each with their own namespace for network resources, they will be able to use the same network interface, but will not be able to see or interact with each other's network connections.

To demonstrate this, we can use the following commands:

First, create a namespace for network resources using the "ip netns" command:

```bash
# ip netns add container1
```
Now, create a veth pair (virtual Ethernet pair) to connect the namespace to the host:

```bash
# ip link add veth0 type veth peer name veth1

```
Assign veth1 to the namespace:

```bash
# ip link set veth1 netns container1

```
Bring up the veth pair:

```bash
# ip link set veth0 up
# ip netns exec container1 ip link set veth1 up

```
Now, assign an IP address to veth0:

```bash
# ip addr add 192.168.0.1/24 dev veth0

```
And assign an IP address to veth1 in the namespace:

```bash
# ip netns exec container1 ip addr add 192.168.0.2/24 dev veth1

```
ow, we can test connectivity between the host and the namespace by pinging the IP address assigned to veth1:

```bash
# ping 192.168.0.2

```
In this example, we created a namespace for network resources and connected it to the host using a veth pair. We were then able to assign IP addresses to each end of the pair and ping the IP address in the namespace from the host, demonstrating that the namespace is isolated from the host's network resources.
<br>

# Mount Namespaces with example 

Mount namespaces in containers allow for the creation of isolated environments for file systems. This means that each container has its own unique file system, separate from the host operating system and other containers.

For example, let's say we have a container running a web server. Within this container, we have the necessary files and directories for the web server to run, such as HTML files and images.

Now, let's say we want to run a second container that also has a web server, but with different HTML files and images. If we didn't have mount namespaces, both containers would be sharing the same file system and could potentially overwrite or interfere with each other's files.

However, with mount namespaces, each container has its own isolated file system. This allows us to run both web servers with different files and directories, without them affecting each other.

To create a mount namespace in a container, we can use the `--mount` flag when running the container. For example:

```bash
$ docker run -d --name mycontainer --mount type=bind,source=/path/to/files,
target=/var/www/html nginx
```

This command creates a new container named "mycontainer" and mounts the directory at `/path/to/files` from the host operating system to the `/var/www/html` directory within the container. This allows the web server within the container to access and serve the files from the host operating system.

# User Namespaces with example 

User Namespaces in containers allow the container to have its own independent user and group IDs, separate from the host system. This can be useful for providing isolation and security within the container, as well as allowing the container to run processes with different user and group permissions than the host system.

For example, let's say we have a container running as the user `appuser` with a user ID of 1000 and a group ID of 1000. Without User Namespaces, this user would have the same permissions as the user `appuser` on the host system. However, with User Namespaces enabled, we can map the user and group IDs within the container to different IDs on the host system. For example, we could map the user ID 1000 within the container to the user ID 2000 on the host system. This would allow the container to run processes as user 2000 on the host system, while still appearing as user 1000 within the container.


To enable User Namespaces in a container, we can use the `--userns` flag when starting the container. For example:

```bash
docker run --userns=host -it ubuntu

```

This will start a new container running the Ubuntu image, with User Namespaces enabled and mapped to the host system's user and group IDs.


# UTS Namespaces with example 

UTS namespaces allow containers to have their own hostname and domain name system (DNS) domain, separate from the host machine. This means that each container can have its own hostname and DNS domain, without affecting the host machine or other containers.

To demonstrate this with a hands-on example, we can create a container using Docker and specify a hostname for the container.

First, let's create a container using the following command:

```
docker run -it --name my_container ubuntu

```

This will create a container named `my_container` using the Ubuntu image. Now, let's specify a hostname for this container using the `-h` flag:

```bash
docker run -it --name my_container -h my_container_host ubuntu

```
Now, if we check the hostname of the container using the `hostname` command, it will return `my_container_host`. This hostname is specific to the container and is not the same as the host machine's hostname.

We can also specify a DNS domain for the container using the `--dns-domain` flag:

```bash
docker run -it --name my_container -h my_container_host --dns-domain 
my_container_domain ubuntu
```
Now, if we check the DNS domain of the container using the "hostname -d" command, it will return "my_container_domain". This DNS domain is specific to the container and is not the same as the host machine's DNS domain.

By using UTS namespaces, we can give each container its own unique hostname and DNS domain, allowing them to be isolated and operate independently from the host machine and other containers.