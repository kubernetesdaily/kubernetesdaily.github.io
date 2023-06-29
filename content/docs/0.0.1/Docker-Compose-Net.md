---
title: "48.Newtorking in Docker Compose "
description: " Docker Compose Newtorking "
weight : 49
---

### creating and using networks in docker-compose.yml

```yml
version: "3.7"
services:
  app1:
    image: httpd:latest
    container_name: app1
    ports:
     - 8080:80
    networks:
      - app1_net
networks:
  app1_net:

```

### run docker compose up 

```sh
docker-compose up

```

### Open browser 

```sh
http://localhost:8080
```

Observe the output

### On a second terminal
```sh
docker ps
```
#### Observe the networking part!

```sh
docker inspect app1

```

### Stops the docker-compose
```sh
docker-compose rm
```


