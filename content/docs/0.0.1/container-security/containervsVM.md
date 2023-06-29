---
title: "2.Container vs. Virtualization"
description: "The introduction to this course."
weight : 2 
---

### A Shift from Monolithic to Microservice Architecture 

##  Monolithic 

Application have changed dramarically 
- A Decade Ago ( and still valid )
    - Apps were monolithic 
    - Built on single stack such as .NET or Java 
    - Long Lived 
    - Deployed to a single server 

Benefits of monolith - Simple to Develop , Test , Deplot & Scale 
   - simple to develope because of all the tools and IDEs aupport to that kind of application by default 
   -  easy to deploy because all coponets are packed into one bundle 
   - Easy to scale the whole application  

Disadvantages of monolith 
  -  Very difficult to maintain 
  - One Component failure will cause the whole system to fail 
  - Very difficult to understand and create the patches for   monolithic applications 
  - Take a long time to startup because all the components need to get started 

## Microservice 

Today 
  - Apps are constantly developed 
  - Build from losely coupled components 
  - New version are deployed often 
  - Deployed to a multitude of server 


## shipping code is damm too hard 

an efforts to solve complet problem 

![](./images/solve-problem.png)

## every possible good to ship X every possible way to ship 

![](./images/pssiblewaytoship.png)

## Enter ...  Internodal container 

![](./images/intermodl-container.png)


## Thats what Docker all about 
![](./images/whatdocker.png)



## Comparing Docker vs VM 

| Virtual Machine |  Docker |
|-|-| 
| each VM runs its own os | Container is just a user space of OS | 
| Boot up time os in minutes | Containers instantiate in seconds | 
| VMs snapshots are used sparingly | Images are built incrementaly on top of another layers . lot of images /snapshots | 
| Not effective diffs . No versiob controlled | Images can be version controlled docker hub is like GITHUB | 
| Cannot run more than couple of VMs on an aveage laptop | Can run many docker containers in a laptop |
| Only one VM can be stated from one set of VMX and VMDK file | Multiple Docker Containers can be started from one Docker images  |




