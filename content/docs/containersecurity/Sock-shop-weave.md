---
title: "Sock Shop Docker Compose and Weave"
slug: "Sock-Shop-Docker-Compose-and-Weave"
weight : 21
---

Sock Shop Docker Compose & Weave


Pre-requisites
Install Docker
Install Weave Scope
Install Weave Net

```

git clone https://github.com/microservices-demo/microservices-demo
cd microservices-demo
```


```
curl -sSL https://get.docker.com/ | sh
apt-get install -yq python-pip build-essential python-dev
pip install docker-compose
curl -L git.io/weave -o /usr/local/bin/weave
chmod a+x /usr/local/bin/weave
```

Launch Weave Scope

```
 sudo curl -L git.io/scope -o /usr/local/bin/scope
sudo chmod a+x /usr/local/bin/scope
scope launch
```

Weave launch 

```
weave launch
docker-compose -f deploy/docker-compose-weave/docker-compose.yml up -d

```