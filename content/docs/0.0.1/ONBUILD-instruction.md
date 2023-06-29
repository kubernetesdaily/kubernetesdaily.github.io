---
title: "18.Dockerfile Lab - ONBUILD instruction "
description: " Dockerfile Lab 12 "
weight: 19
---

#### The ONBUILD instruction

The ONBUILD instruction is a trigger. It sets instructions that will be executed when another image is built from the image being build.

This is useful for building images which will be used as a base to build other images.

```sh
ONBUILD COPY . /src

```

You can't chain ONBUILD instructions with ONBUILD.
ONBUILD can't be used to trigger FROM instructions.


```Dockerfile
FROM nginx:1.16-alpine
WORKDIR /usr/share/nginx/html
ONBUILD COPY index.html . 
```

#### build dockerfile 

```sh
docker build -t sangam14/onbuild-dockerfile  -f dockerfile.onbuild .
[+] Building 5.8s (7/7) FINISHED                                                                                                                  
 => [internal] load build definition from dockerfile.onbuild                                                                                 0.0s
 => => transferring dockerfile: 129B                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/nginx:1.16-alpine                                                                         3.3s
 => [auth] library/nginx:pull token for registry-1.docker.io                                                                                 0.0s
 => [1/2] FROM docker.io/library/nginx:1.16-alpine@sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad                   2.4s
 => => resolve docker.io/library/nginx:1.16-alpine@sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad                   0.0s
 => => sha256:f07e4bcf42b862c240f4c00f2f7ed362d7d93ca15151de547beda593f3b669e5 2.72MB / 2.72MB                                               0.8s
 => => sha256:078902f02c3a797288251014301298bd748886eaf5fc107e128cc1b4933ec57d 6.25MB / 6.25MB                                               2.1s
 => => sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad 1.41kB / 1.41kB                                               0.0s
 => => sha256:75a7ebf15c39feb30c0444c1ab8d585fe490c35dca30c337e06b73c55fb0e30f 739B / 739B                                                   0.0s
 => => sha256:c3144a54094d9628d01573952dfc7b580a76f2a3570f72b8900df676a697c1bb 6.98kB / 6.98kB                                               0.0s
 => => extracting sha256:f07e4bcf42b862c240f4c00f2f7ed362d7d93ca15151de547beda593f3b669e5                                                    0.1s
 => => extracting sha256:078902f02c3a797288251014301298bd748886eaf5fc107e128cc1b4933ec57d                                                    0.3s
 => [2/2] WORKDIR /usr/share/nginx/html                                                                                                      0.0s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:8fc6b719b70ed34467487519cca45523b18eb6f394187d50b08f5157b495efe4                                                 0.0s
 => => naming to docker.io/sangam14/onbuild-dockerfile                                                                                       0.0s
 ```


### create another dockerfile 

```Dockerfile
From sangam14/onbuild-dockerfile     
COPY index.html . 

```
#### here you will see default ngnix index page 

```sh
 docker run -p 80:80 sangam14/onbuild-dockerfile   

 ```

#### build docker file 

```sh

docker build -t sangam14/onbuild1-dockerfile  -f dockerfile.onbuild1 .
[+] Building 0.1s (8/8) FINISHED                                                                                                              
 => [internal] load build definition from dockerfile.onbuild1                                                                            0.0s
 => => transferring dockerfile: 107B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                        0.0s
 => => transferring context: 2B                                                                                                          0.0s
 => [internal] load metadata for docker.io/sangam14/onbuild-dockerfile:latest                                                            0.0s
 => [internal] load build context                                                                                                        0.0s
 => => transferring context: 32B                                                                                                         0.0s
 => [1/2] FROM docker.io/sangam14/onbuild-dockerfile                                                                                     0.0s
 => [2/2] COPY index.html .                                                                                                              0.0s
 => [3/2] COPY index.html .                                                                                                              0.0s
 => exporting to image                                                                                                                   0.0s
 => => exporting layers                                                                                                                  0.0s
 => => writing image sha256:c2291a76ea7cf76b5449ad476d47880b3c5b1bf0119cf7d1fe54111f88db2157                                             0.0s
 => => naming to docker.io/sangam14/onbuild1-dockerfile     
```

above container copied index.html form local 

```sh
docker run -p 80:80 sangam14/onbuild1-dockerfile  
```