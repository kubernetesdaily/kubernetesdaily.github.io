---
title: "Compose Pull Command"
slug: "Compose-Pull-Command"
weight : 40
---

#### Pull service images


```sh
 example-voting-app git:(main) docker compose pull 
[+] Running 5/5
 ⠿ vote Skipped - No image to be pulled                                                                                                                                              0.0s
 ⠿ result Skipped - No image to be pulled                                                                                                                                            0.0s
 ⠿ worker Skipped - No image to be pulled                                                                                                                                            0.0s
 ⠿ redis Pulled                                                                                                                                                                      2.8s
 ⠿ db Pulled                                                                                                                                                                         2.8s

```