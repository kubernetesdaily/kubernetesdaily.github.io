---
title: "Compose Rm Command "
slug: "Compose-Rm-Command"
weight : 43
---


#### Removes stopped service containers


```sh
➜  example-voting-app git:(main) docker compose stop 
[+] Running 5/5
 ⠿ Container example-voting-app-vote-1    Stopped                                                                                                                                    0.3s
 ⠿ Container example-voting-app-result-1  Stopped                                                                                                                                    0.3s
 ⠿ Container example-voting-app-worker-1  Stopped                                                                                                                                    0.1s
 ⠿ Container example-voting-app-db-1      Stopped                                                                                                                                    0.1s
 ⠿ Container example-voting-app-redis-1   Stopped                                                                                                                                    0.2s
➜  example-voting-app git:(main) docker compose rm   
? Going to remove example-voting-app-vote-1, example-voting-app-result-1, example-voting-app-worker-1, example-voting-app-db-1, example-voting-app-redis-1 Yes
[+] Running 5/0
 ⠿ Container example-voting-app-redis-1   Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-vote-1    Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-result-1  Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-db-1      Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-worker-1  Removed                                                                                                                                    0.0s
➜  example-voting-app git:(main) 



```
