---
title: "6.Capabilities "
description: "Linux Container Capabilities  "
weight : 6
---


# Capabilities 
<br>
There are several types of capabilities that are used in Linux container security:

1.Process isolation: This allows the separation of processes between different containers, ensuring that processes running in one container do not have access to resources or processes in another container.

2.Resource limitation: This allows the allocation of specific resources (such as CPU, memory, and disk space) to each container, ensuring that one container does not consume more resources than it has been allocated.

3.User namespace: This allows the creation of user accounts within a container that are separate from the host system, ensuring that users within a container do not have access to resources outside of the container.

4.SELinux or AppArmor: These are security frameworks that allow administrators to set granular permissions for processes and resources within a container, ensuring that only authorized processes and resources can be accessed.

5.Network isolation: This allows the creation of separate network environments for each container, ensuring that containers cannot communicate with each other or the host system unless explicitly allowed.

Overall, these capabilities help to ensure that containers are secure and isolated from each other, protecting the host system and other containers from potential vulnerabilities or attacks.


# Process Isolation 
<br>
Process isolation is a security feature that allows containers to operate as if they are running on a separate machine, even though they are sharing the same underlying operating system and hardware resources with other containers. This is achieved by isolating the processes running inside the container from those running outside, and by limiting the resources (such as CPU, memory, and network bandwidth) that a container can access.

One way to demonstrate process isolation in a container is to create two containers, each running a different application. For example, we can create a container running a web server and another container running a database. We can then verify that the processes running inside each container are isolated from each other by trying to access the database from the web server container (which should fail).

Here is a hands-on example of how to demonstrate process isolation in containers using Docker:

First, install Docker on your machine if you don't already have it.
Start by creating a Docker network for our containers to communicate over. Run the following command:

```bash
docker network create my-network
```
Next, create a container running a web server by running the following command:

```bash
docker run -d --name web-server --network my-network -p 80:80 nginx:latest
```
This will create a container running the latest version of the nginx web server, and expose it on port 80 of the host machine.

Now, create a second container running a database by running the following command:

```bash
docker run -d --name database --network my-network -p 3306:3306 mysql:latest
```
This will create a container running the latest version of the MySQL database, and expose it on port 3306 of the host machine.

To verify that the two containers are isolated from each other, try to connect to the database from the web server container by running the following command:

```bash
docker exec -it web-server mysql -h database -u root -p

```

This should fail with an error message, indicating that the web server container is unable to access the database container.

if you want to verify that the two containers are able to communicate with each other, you can connect to the web server container and use the curl command to make a request to the database container. For example:

```bash
docker exec -it web-server bash
curl http://database:3306

```
This should return the MySQL welcome message, indicating that the web server container is able to communicate with the database container.

Overall, this example demonstrates how process isolation in containers can be used to securely separate different applications and services, even though they are running on the same machine.


# Resource limitation
<br>
Resource limitation capabilities in container security refer to the ability to set limits on the amount of resources (such as CPU, memory, and network bandwidth) that a container is allowed to use. This can be useful for preventing a container from consuming too many resources and potentially impacting the performance of other containers or the host system.

One example of using resource limitation capabilities in a hands-on scenario is to set limits on the CPU and memory usage of a container when deploying it. This can be done using the `--cpu-shares` and `--memory` flags when running the `docker run` command. For example:

```bash
$ docker run -d --name my-container --cpu-shares 512 --memory 512MB my-image

```

This command will run a container named "my-container" using the image "my-image", and limit the container's CPU usage to 512 shares (which is a relative value based on the host system's CPU) and its memory usage to 512MB. If the container tries to use more resources than these limits, it will be restricted and may experience performance issues.

Resource limitation capabilities can be an effective tool for improving the security and stability of a container environment, as they can prevent a single container from causing issues for other containers or the host system. However, it's important to carefully consider the resource requirements of each container and set appropriate limits to ensure that the container has sufficient resources to function properly.


# User namespace
<br>
User namespaces in container security allow for the creation of a virtualized user environment within a container. This means that the processes within the container can run with a different set of user and group IDs than the host system. This can be useful in a number of scenarios, such as:

- Running a container with a different user or group ID than the host system, which can help to isolate the processes within the container and prevent them from accessing sensitive host resources.
- Allowing a container to run as a specific user or group ID, even if that user or group ID does not exist on the host system. This can be useful when the container needs to access certain resources that are restricted to specific users or groups.
To demonstrate a hands-on example of user namespaces in container security, we can run a container with a different user and group ID than the host system. For example, we can create a container that runs as the "foo" user and "bar" group, even if those users and groups do not exist on the host system.

To do this, we can use the following Docker command:

```bash
$ docker run --rm -it --user 1000:1000 --name test-container ubuntu

```

This will create a new container with the name "test-container", running the Ubuntu image and using the user and group IDs of 1000. We can verify that the container is running as the correct user and group by running the id command inside the container:

```bash
# id
uid=1000(foo) gid=1000(bar) groups=1000(bar)

```
As we can see, the container is now running as the "foo" user and "bar" group. This allows us to isolate the processes within the container and prevent them from accessing sensitive host resources. It also allows us to access resources that are restricted to specific users or groups within the container, even if those users or groups do not exist on the host system.


# SELinux or AppArmor
<br>
SELinux (Security Enhanced Linux) and AppArmor are two examples of mandatory access control systems that can be used to secure containers.

SELinux is a Linux kernel security module that allows administrators to define fine-grained access control policies for users, processes, and files. These policies are enforced at the kernel level, making it difficult for malicious actors to bypass or manipulate them.

To demonstrate SELinux in action, we can create a simple container and apply an SELinux context to it. For example, let's create a container using the following command:

```bash
$ docker run -it ubuntu bash

```
Next, we can apply an SELinux context to the container by using the chcon command:

```bash
$ chcon -t container_t /var/lib/docker/overlay2/<container_id>

```

This sets the SELinux context for the container to "container_t", which is a type of SELinux policy that is designed specifically for containers. This policy allows the container to access certain resources, such as networking and file system resources, but restricts its access to other resources, such as system processes and system files.
<br>
AppArmor is another mandatory access control system that can be used to secure containers. It works by defining profiles for applications, which specify what resources and actions the application is allowed to access and perform. These profiles are enforced at the kernel level, making it difficult for malicious actors to bypass or manipulate them.
<br>
To demonstrate AppArmor in action, we can create a container and apply an AppArmor profile to it. For example, let's create a container using the following command:

```bash
$ docker run -it ubuntu bash

```
Next, we can apply an AppArmor profile to the container by using the aa-enforce command:

```bash
$ aa-enforce /etc/apparmor.d/container_profile

```
This sets the AppArmor profile for the container to "container_profile", which is a predefined profile that is designed specifically for containers. This profile allows the container to access certain resources, such as networking and file system resources, but restricts its access to other resources, such as system processes and system files.


# Network isolation
<br>
Network isolation capabilities in container security refer to the ability to restrict the network traffic between containers and between containers and the host system. This is important for maintaining the security and isolation of containers, as it ensures that containers cannot communicate with each other or the host system unless explicitly allowed.
<br>
One example of a hands-on approach to implementing network isolation in container security is through the use of Docker networks. Docker networks allow users to create virtual networks within their Docker environment, allowing them to specify which containers can communicate with each other and which cannot.
<br>
For example, let's say we have two containers running on a Docker host, Container A and Container B. By default, these two containers can communicate with each other and the host system. However, we can use Docker networks to isolate these two containers from each other and the host system.
<br>
To do this, we can create a Docker network and specify which containers can connect to it. For example, we could create a network called "isolated" and only allow Container A to connect to it. This would mean that Container B and the host system would not be able to communicate with Container A.

To create a Docker network and specify which containers can connect to it, we can use the following command:

```bash
docker network create --driver bridge isolated

```
To add Container A to this network, we can use the following command:

```bash
docker network connect isolated ContainerA

```
This would effectively isolate Container A from Container B and the host system, as they would not be able to communicate with it through the network.
<br>
Overall, network isolation capabilities in container security are important for maintaining the security and isolation of containers, as they allow users to specify which containers can communicate with each other and the host system. By using tools such as Docker networks, users can easily implement network isolation in their container environment.