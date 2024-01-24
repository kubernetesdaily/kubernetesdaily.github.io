---
title: "Compose Create Command"
slug: "Compose-Create-Command"
weight : 29
---


### create docker-compose.yml with following content 

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"

```


### Creates containers for a service.

```sh
➜  7-DC-CLI git:(main) ✗ docker compose create 
[+] Running 7/7
 ⠿ redis Pulled                                                                                                                                                                      6.1s
   ⠿ af6eaf76a39c Already exists                                                                                                                                                     0.0s
   ⠿ 5015c79ed515 Pull complete                                                                                                                                                      0.9s
   ⠿ 2ca28624189f Pull complete                                                                                                                                                      1.0s
   ⠿ 4691452befb1 Pull complete                                                                                                                                                      1.6s
   ⠿ 746fa87aff8c Pull complete                                                                                                                                                      2.1s
   ⠿ b8496ad2d107 Pull complete                                                                                                                                                      2.2s
WARN[0006] Found orphan containers ([7-dc-cli-client-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
[+] Running 2/2
 ⠿ Container 7-dc-cli-redis-1  Created                                                                                                                                               0.1s
 ⠿ Container 7-dc-cli-web-1    Recreated                                                                                                                                             0.1s
➜  7-DC-CLI git:(main) ✗ 

```