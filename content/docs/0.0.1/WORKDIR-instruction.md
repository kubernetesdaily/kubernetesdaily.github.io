---
title: "11.Dockerfile Lab - WORKDIR instruction "
description: " Dockerfile Lab 5 "
weight: 12
---

The WORKDIR command is used to define the working directory of a Docker container at any given time. The command is specified in the Dockerfile.

Any RUN, CMD, ADD, COPY, or ENTRYPOINT command will be executed in the specified working directory.

# WORKDIR instruction Dockerfile for Docker Quick Start

```Dockerfile
FROM ubuntu
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y nginx
COPY index.html .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
#### build dockerfile 

```sh
docker build -t sangam14/workdir-dockerfile  -f dockerfile.workdir .

```
#### run docker container 

```sh
docker run -p 80:80 sangam14/workdir-dockerfile 

```
output 

![](./images/ngnix.png)
