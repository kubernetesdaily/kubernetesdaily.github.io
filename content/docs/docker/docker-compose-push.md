---
title: "Compose Push Command"
slug: "Compose-Push-Command"
weight : 41
---

#### Push service images


```sh

services:
  service1:
    build: .
    image: localhost:5000/yourimage  ## goes to local registry

  service2:
    build: .
    image: your-dockerid/yourimage  ## goes to your repository on Docker Hub

```
