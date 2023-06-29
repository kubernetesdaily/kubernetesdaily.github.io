---
title: "12.Dockerfile Lab - RUN instruction "
description: " Dockerfile Lab 6 "
weight: 13
---

The RUN command is the central executing directive for Dockerfiles. It takes a command as its argument and runs it to form the image. Unlike CMD, it actually is used to build the image (forming another layer on top of the previous one which is committed).


#### create dockerfile with following content 

```dockerfile
FROM ubuntu
RUN id
RUN useradd --create-home -m -s /bin/bash dev
# Add a fun prompt for dev user of my-app
# whale: "\xF0\x9F\x90\xB3"
# alien:"\xF0\x9F\x91\xBD"
# fish:"\xF0\x9F\x90\xA0"
# elephant:"\xF0\x9F\x91\xBD"
# moneybag:"\xF0\x9F\x92\xB0"
RUN echo 'PS1="\[$(tput bold)$(tput setaf 4)\]my-app $(echo -e "\xF0\x9F\x90\xB3") \[$(tput sgr0)\] [\\u@\\h]:\\W \\$ "' >> /home/dev/.bashrc && \
    echo 'alias ls="ls --color=auto"' >> /home/dev/.bashrc

RUN mkdir /myvol
RUN echo "hello DQS Guide" > /myvol/greeting
RUN ["chmod", "664", "/myvol/greeting"]
RUN ["chown", "dev:dev", "/myvol/greeting"]
VOLUME /myvol

USER dev
RUN id

CMD ["/bin/bash"]

```

### build docker container 

```bash
 ➜  docker build -t  sangam14/run-dockerfile -f dockerfile.run .
```


#### run docer container 

```sh
➜  Dockerfile git:(main) ✗ docker run -it  sangam14/run-dockerfile 
```
#### added user as my-app with whale emoji 

```sh
my-app 🐳  [dev@0270ab5e6f0c]:/ $ ls
bin  boot  dev  etc  home  lib  media  mnt  myvol  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
my-app 🐳  [dev@0270ab5e6f0c]:/ $ cat myvol/greeting 
hello DQS Guide

```

