---
title: "Compose Images Command"
slug: "Compose-Images-Command"
weight : 33
---

```sh
example-voting-app git:(main) docker compose images 
CONTAINER                     REPOSITORY                  TAG                 IMAGE ID            SIZE
example-voting-app-db-1       postgres                    15-alpine           68d4a8d9d3d9        241MB
example-voting-app-redis-1    redis                       alpine              1339d05b97a4        30.4MB
example-voting-app-result-1   example-voting-app-result   latest              223b94fc00ae        254MB
example-voting-app-vote-1     example-voting-app-vote     latest              5c1cf62b540c        135MB
example-voting-app-worker-1   example-voting-app-worker   latest              8f82fda1dae8        195MB

```


