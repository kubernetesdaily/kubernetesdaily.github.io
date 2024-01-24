---
title: " Dive "
slug: "dive"
weight : 18
---

# Dive 


* Ubuntu /Debian 

```bash
wget https://github.com/wagoodman/dive/releases/download/v0.9.2/dive_0.9.2_linux_amd64.deb sudo apt install ./dive_0.9.2_linux_amd64.deb
```

* RHEL/CemtOS

```bash
curl -OL https://github.com/wagoodman/dive/releases/download/v0.9.2/dive_0.9.2_linux_amd64.rpm rpm -i dive_0.9.2_linux_amd64.rpm

```

* Arch Linux

```bash
ay -S dive

```

Mac OS X

```bash
brew install dive

```

# How to use Dive

To analyze a Docker image simply run dive with an image tag/id/digest:

```bash

$ dive <your-image-tag>
```

or if you want to build your image then jump straight into analyzing it:

```bash
$ dive build -t <some-tag> 
```

example  ngnix image 

![](./images/dive.png)


another tool that make this all more easy 

https://github.com/prakhar1989/dive-in

![](./images/1.png)

![](./images/2.png)


# recommanded tool slim.ai


Remove friction by securing your software supply chain with optimized containers specific to your application needs, while automatically reducing vulnerabilities in the process.


https://slim.ai/

portal.slim.ai 

