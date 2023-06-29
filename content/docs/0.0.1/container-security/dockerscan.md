---
title: "24. DockerScan  "
description: "  "
weight : 24
---

# DockerScan 


Docker Scan Support actions for docker registory scanning , image analysis and image meta information exaction to look for password , URL/ IP etc in the envirmonment variavle and any kind of sudo call by user 


1. create a directory for this 

```
$ sudo mkdir dockersec-2 
$ cd dockersec-2 

```
check pyhon version which mustt be greater then 3.5 and must have pip installed 

```
$ python3 --version
```
```
$ sudo apt install python3-pip
$ which pip3
``

Install Dockerscan with pip3 

```
$ sudo /user/bin/pip3 install dockerscan

```

pull the ngnix docker image from dockerhub 

```
$ sudo docker pull ngnix 
```
 
 save the docker image using docker save 

```
$ sudo docker save ngnix -o ng-orig 
$ ls
```

scan the image 

```

sudo dockerscan image info ng-orig

```

as we can see the information reveals the CMD runs , ENV variable , exposed ports etc 
 