---
title: "1.What is container?"
description: "The introduction to this course."
weight: 1
---


> what is container ? 

-  A container is full package (or) grouping of an entire runtime enviroment of an application ncluding its binaries, the runtime to run the application, System related tools, System libraries, Settings, and configurations.

thats the defination come to mind when you learn ? to better understanding we need to go back to Operating Syatem basics and how its work 

when a program?process is running on your computer it gives a call to kernel using SystemCall End Point whatever it needs to access any of the 

- hardwore resources like 
  - memory 
  - file system( hard disk )
  -  CPU cycles 
  - Internet 
  - Bandwidth and I/O 
  - User Permission and privileges etc 

![](./images/OS-working.png)

> What, If we want to Isolate a Single Program to run on virtual space or Environment?

Let’s say I want to run chrome in a Virtual environment within the machine with its own CPU cycles, Memory, Hard Disk Space, Bandwidth, Users, Internet Usage etc.

Something like shown in the following picture. A marked Space or Group.

![](./images/OS-working-1.jpg)

Is it possible? Yes, it is

> Isolating the System Resources per process or group of Processes is called Name Spacing. and Limiting and Regulating the System resource allocation to the isolated process/procesesses is called Control Groups(Cgroups)

> A coalesced(combined) product of Control Groups and Name Spacing with Process level isolation is called as Containerization or a Container

> To be more clear. In the preceding diagram, The area or grouping, Marked in Red dotted lines is called as a Container.

The following Diagram explains what is Name Spacing and Control Groups and their scope of responsibilities.

![](./images/cgroup-namespace.png)

What is inside a Container

As we said just before,  A Container a Collection of  following elements

- Program Binaries/configuration
- Runtime libraries
- Dependency Products/tools
- A Piece of Kernal
- System Resources
   - Hard Disk
   - Memory
   - I/O
   - Network
   - CPU

![](./images/container-skeleton.png)   

As we are isolating the program and dedicatedly providing its own system resources and runtime libraries. It can run alone as a Standalone application (or) infrastructure

![](./images/tenor.gif)

“It was working fine in my laptop or machine”

" Yes. It might have worked in the laptop (or) DEV, but that’s not enough for it to work in PROD or at least not the same way it’s working in DEV. " 



