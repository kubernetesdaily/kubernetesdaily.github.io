---
title :  Porter - Create an installer bundling your application, client tools, configuration, and deployment logic for easy distribution and execution with a single command
author : Sangam Biradar
categories : 
  - Kubernetes
weight : 50
description :  Cloud Native Bundle for Developer
draft : false
Date : 2023-02-18
author : Sangam Biradar
---


#### Porter - Create an installer bundling your application, client tools, configuration, and deployment logic for easy distribution and execution with a single command

Porter is a CNCF project implementing the CNAB specification. It provides a CLI and Kubernetes Operator to create, publish, install, and maintain CNABs. Porter provides a consistent, platform-agnostic way to deploy and manage cloud native applications, making it easier to automate and manage the lifecycle of your applications

 - CNAB, or Cloud-Native Application Bundle, is an open standard for packaging and distributing cloud-native applications and their dependencies across various platforms. It simplifies the deployment process, enhances security through digital signatures, and promotes interoperability across different environments, making it easier to manage complex cloud-native applications.


#### Install Porter 

```
➜  export VERSION="v1.0.14"
curl -L https://cdn.porter.sh/$VERSION/install-mac.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0
100  1204  100  1204    0     0    518      0  0:00:02  0:00:02 --:--:--  2787
Installing porter@v1.0.14 to /Users/sangambiradar/.porter from https://cdn.porter.sh
Installed porter v1.0.14 (0e739d88)
installed exec mixin v1.0.14 (0e739d88)
Installation complete.
Add porter to your path by adding the following line to your ~/.bash_profile or ~/.zprofile and open a new terminal:
export PATH=$PATH:~/.porter
➜  export PATH=$PATH:~/.porter
```

#### export path 

```
echo 'export PATH=$PATH:~/.porter' >> ~/.zprofile && source ~/.zprofile

```

#### Initialize a New Porter Project

