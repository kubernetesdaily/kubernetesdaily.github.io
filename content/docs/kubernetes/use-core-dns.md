---
title: "Use Core DNS"
description: "networking"
weight: 16
---


sangam@sangam:~$ kubectl create service clusterip my-service --tcp=8080:8080
service/my-service created
sangam@sangam:~$ kubectl get service
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP    45h
my-service   ClusterIP   10.106.213.25   <none>        8080/TCP   5s
sangam@sangam:~$ kubectl run busybox --image=busybox -it -- /bin/sh
If you don't see a command prompt, try pressing enter.
/ # 
/ # 
/ # nslookup 10.106.213.25
Server:		10.96.0.10
Address:	10.96.0.10:53

25.213.106.10.in-addr.arpa	name = my-service.default.svc.cluster.local

/ # exit 


