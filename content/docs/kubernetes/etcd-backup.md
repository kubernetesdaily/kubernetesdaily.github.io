---
title: "etcd Backup and Restore"
description: "etcd Backup and Restore"
weight: 6
---




etcd Backup and Restore

Etcd maintains the active state of the cluster, with the API Servers interacting by writing to and retrieving data from it. Each transaction executed in etcd is logged in a Write-Ahead Log (WAL) file specific to each cluster member. These files, which are updated by transactions initiated by the cluster's "leader," are periodically condensed into snapshots to conserve space. This snapshotting process is an integral part of etcd's routine operations, and snapshots can also be manually triggered using the etcdctl tool with the `snapshot save` command.

### install etcd
```
sudo apt install etcd
```
find server.crt

```
sangam@sangam:~$ sudo find / -name server.crt 2>/dev/null
/etc/kubernetes/pki/etcd/server.crt
```
## take backup

```
sangam@sangam:~$ sudo ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    snapshot save /var/lib/etcd/backup.db
2024-04-26 03:53:42.172131 I | clientv3: opened snapshot stream; downloading
2024-04-26 03:53:42.188033 I | clientv3: completed snapshot read; closing
Snapshot saved at /var/lib/etcd/backup.db
```


### check snapshot 

```

sangam@sangam:~$ sudo ls -lh /var/lib/etcd/backup.db
-rw-r--r-- 1 root root 3.2M Apr 26 03:53 /var/lib/etcd/backup.db
```
