---
title: "19.Running multiple docker containers from CLI "
description: "Docker Multiple Container commands "
weight: 20
---

#### We will create two containers (linux1, linux2) based on the same image (ubuntu)

```sh
docker run -it -d --rm --name linux1 ubuntu /bin/bash

```
additional flags:
`-d`starts the container as “detached”. Use “docker attach” to attach to it later on.
`--rm` cleans up the container after stopping. The container will be removed, basically the same as “docker rm container_identifier” after stopping the container. So everything is kept tidy.
`--name` will give the container a dedicated name, which makes it easier to address the container later on.


#### Creates container “linux2”

```sh
docker run -it -d --rm --name linux2 ubuntu /bin/bash
```
#### Attaches to container linux1
```sh
> docker attach linux1
```
#### Creates a new directory on container linux1
```sh
> ls
> mkdir mylinux1
```
####  Shows that “mylinux1” was created

```sh
> ls

```
#### Attaches to container linux2

```sh
>  docker attach linux2

```
 Shows that the directory of linux2 is different than linux1, although they are both from the same image “ubuntu”
 They are separated, they don’t share their file-system
The bash process is isolated in the container

```sh

> ls

```
```sh
> exit
```
Shows only one container which is running, the other one got removed
```sh
>  docker ps -a

```

