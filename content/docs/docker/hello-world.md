---
title: "Hello World in Docker"
slug: Hello-World-in-Docker
weight : 2
---

#### run your first hello world example

```sh
docker run hello-world
```
is a command that runs a simple Docker container to verify that Docker is correctly installed on your system and working as expected.

When you run this command, Docker will first check if the "hello-world" image is available locally. If the image is not found, Docker will download it from the Docker Hub registry.

Once the "hello-world" image is available, Docker will create a container from the image and run it. The container will print a message to the console to indicate that everything is working correctly.

Here's an example of what you might see when you run docker run hello-world:

```sh
docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
7050e35b49f5: Pull complete 
Digest: sha256:6e8b6f026e0b9c419ea0fd02d3905dd0952ad1feea67543f525c73a0a790fefb
Status: Downloaded newer image for hello-world:latest

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


```
#### check it out list of docker images 

```sh
dockerworkshop git:(main) ✗ docker images
REPOSITORY                                TAG               IMAGE ID       CREATED         SIZE
hello-world                               latest            46331d942d63   11 months ago   9.14kB
```


docker inspect is a command used to retrieve detailed information about one or more Docker objects, such as containers, images, networks, volumes, and more. The command allows you to inspect the configuration and state of a Docker object, including its metadata, networking information, storage configuration, and more.

Here's the basic syntax of the docker inspect command:

```sh
docker inspect [OPTIONS] OBJECT [OBJECT...]

```
- OPTIONS: Optional flags that modify the output of the command.
- OBJECT: The name or ID of the Docker object to inspect.

For example, to inspect a running Docker container named hello-world , you could use the following command:

```sh
docker inspect hello-world                         
[
    {
        "Id": "sha256:46331d942d6350436f64e614d75725f6de3bb5c63e266e236e04389820a234c4",
        "RepoTags": [
            "hello-world:latest"
        ],
        "RepoDigests": [
            "hello-world@sha256:6e8b6f026e0b9c419ea0fd02d3905dd0952ad1feea67543f525c73a0a790fefb"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2022-03-19T16:12:58.923371954Z",
        "Container": "b2af51419cbf516f3c99b877a64906b21afedc175bd3cd082eb5798e2f277bb4",
        "ContainerConfig": {
            "Hostname": "b2af51419cbf",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"/hello\"]"
            ],
            "Image": "sha256:cc0fff24c4ece63ade5d9f549e42c926cf569112c4f5c439a4a57f3f33f5588b",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "DockerVersion": "20.10.12",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/hello"
            ],
            "Image": "sha256:cc0fff24c4ece63ade5d9f549e42c926cf569112c4f5c439a4a57f3f33f5588b",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": null
        },
        "Architecture": "arm64",
        "Variant": "v8",
        "Os": "linux",
        "Size": 9136,
        "VirtualSize": 9136,
        "GraphDriver": {
            "Data": {
                "MergedDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/merged",
                "UpperDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/diff",
                "WorkDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:efb53921da3394806160641b72a2cbd34ca1a9a8345ac670a85a04ad3d0e3507"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]

```
