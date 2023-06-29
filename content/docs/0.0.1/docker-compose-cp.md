---
title: "28.Docker Compose CLI - CP Command "
description: " Copy files/folders between a service container and the local filesystem "
weight: 29
---

### Copy files/folders between a service container and the local filesystem

```sh
# Syntax to Copy from Container to Docker Host  
docker cp {options} CONTAINER:SRC_PATH DEST_PATH 
# Syntax to Copy from Docker Host to Container  
docker cp {options} SRC_PATH CONTAINER:DEST_PATH 

```

#### lets run ngnix container 

```yml
version: '3'
services:
  web:
    image: nginx:latest

```

#### run docker compose up 

```sh
docker compose -f docker-compose-ngnix.yml up 

```

### check running container  

```sh
➜  dockerworkshop git:(main) ✗ docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS              PORTS     NAMES
008940fdbed8   nginx:latest                    "/docker-entrypoint.…"   29 seconds ago       Up 28 seconds       80/tcp    7-dc-cli-web-1
```

### create index.html

```sh

 Docker-Compose git:(main) ✗ cd 7-DC-CLI 
➜  7-DC-CLI git:(main) ✗ ls
Dockerfile               app.py                   docker-compose-ngnix.yml docker-compose.yml       index.html               requirements.txt         src
```
### copy index.html

```sh
$ docker-compose cp index.html web:/usr/share/nginx/html/

```


```
services:
  web:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    command: nginx-debug -g 'daemon off;'
    copy:
      - ./index.html:/usr/share/nginx/html/index.html
```

```
services:
  web:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    command: nginx-debug -g 'daemon off;'
    copy:
      - ./index.html:/usr/share/nginx/html/index.html
      - ./style.css:/usr/share/nginx/html/style.css
      - ./images:/usr/share/nginx/html/images
```      
