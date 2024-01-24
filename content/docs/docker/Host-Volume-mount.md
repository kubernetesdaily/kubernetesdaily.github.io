---
title: "Host Volume Mount"
slug: "Host Volume Mount"
weight : 24
---

we already used database with web app but docker containers are ephermal. this means they are losing data once removed or re-started so somewhere need to find data persistent 

create `docker-compose.yml` using following content 

```yml
version: '3'
services:
  db:
    image: mysql:latest
    restart: always
    container_name: myphpapp-db
    environment:
       MYSQL_ROOT_PASSWORD: somepass
       MYSQL_DATABASE: somedatabase
  dbclient:
    image: mysql:latest
    depends_on:
      - db
    command: mysql -uroot -psomepass -hdb
```

MYSQL_DATABASE will create an empty database with the name "somedatabase" at first 

depends_on waits for the container to start on the other containers 


###  run the command 

```bash 
5-DC-Host-Vol-mount git:(main) ✗ docker compose up -d 
[+] Running 3/3
 ⠿ Network 5-dc-host-vol-mount_default       Created                       0.1s
 ⠿ Container myphpapp-db                     St...                         0.3s
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Started                       0.5s
```

#### check docker compose process 

```sh
5-DC-Host-Vol-mount git:(main) ✗ docker compose ps
NAME                IMAGE               COMMAND                  SERVICE             CREATED              STATUS              PORTS
myphpapp-db         mysql:latest        "docker-entrypoint.s…"   db                  About a minute ago   Up About a minute   3306/tcp, 33060/tcp


```

#### open mariadb shell 

```sh
 docker compose run --rm dbclient
[+] Running 1/0
 ⠿ Container myphpapp-db  Running                                                                                                          0.0s
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.32 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>

```
#### enter following SQL queries 

```sh
mysql> USE somedatabase;
Database changed
mysql> SHOW TABLES;
Empty set (0.01 sec)

```
#### lets create table 
```sh
mysql> CREATE TABLE mytable (id INT) ;
Query OK, 0 rows affected (0.04 sec)

mysql> SHOW TABLES;
+------------------------+
| Tables_in_somedatabase |
+------------------------+
| mytable                |
+------------------------+
1 row in set (0.01 sec)
mysql> exit  
```

#### stop and remove  container 

```sh
docker-compose stop
[+] Running 2/2
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Stopped                                                                                       0.0s
 ⠿ Container myphpapp-db                     Stopped                                                                                       1.8s
5-DC-Host-Vol-mount git:(main) ✗ docker-compose rm  
? Going to remove 5-dc-host-vol-mount-dbclient-1, myphpapp-db Yes
[+] Running 2/0
 ⠿ Container myphpapp-db                     Removed                                                                                       0.0s
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Removed                                                                                       0.0s
➜  5-DC-Host-Vol-mount git:(main) ✗ 

```
### lets make data persistent even we remove container ? with volumesa nd a host mounded data directory 
```sh
mkdir data 

```
lets update docker-compose.yml

```yml
version: '3'

services:
  db:
    image: mysql:latest
    restart: always
    container_name: myphpapp-db
    environment:
       MYSQL_ROOT_PASSWORD: somepass
       MYSQL_DATABASE: somedatabase
    volumes:  
      - ./data:/var/lib/mysql

  dbclient:
    image: mysql:latest
    depends_on:
      - db
    command: mysql -uroot -psomepass -hdb
```

#### restart docker compose 

```sh

docker-compose up -d   
[+] Running 2/2
 ⠿ Container myphpapp-db                     Started                                                                                       0.4s
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Started    
                                                                                    0.7s
```
### recreate table 

```sh
➜  5-DC-Host-Vol-mount git:(main) ✗ docker compose run --rm dbclient
[+] Running 1/0
 ⠿ Container myphpapp-db  Running                                                                                                          0.0s
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.32 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> USE somedatabase;
Database changed
mysql> SHOW TABLES;
Empty set (0.01 sec)

CREATE TABLE mytable (id INT) ;
Query OK, 0 rows affected (0.04 sec)

mysql> SHOW TABLES;
+------------------------+
| Tables_in_somedatabase |
+------------------------+
| mytable                |
+------------------------+
1 row in set (0.00 sec)

mysql> exit 
```

####  stop and remove the container 

```sh
5-DC-Host-Vol-mount git:(main) ✗ docker compose stop 
[+] Running 2/2
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Stopped                                                                                       0.0s
 ⠿ Container myphpapp-db                     Stopped                                                                                       2.0s
➜  5-DC-Host-Vol-mount git:(main) ✗ docker compose rm
? Going to remove 5-dc-host-vol-mount-dbclient-1, myphpapp-db Yes
[+] Running 2/0
 ⠿ Container myphpapp-db                     Removed                                                                                       0.0s
 ⠿ Container 5-dc-host-vol-mount-dbclient-1  Removed                                                                                       0.0s
➜  5-DC-Host-Vol-mount git:(main) ✗ 

```
#### lets start db container again 

```sh
docker compose run --rm dbclient
[+] Running 1/0
 ⠿ Container myphpapp-db  Running                                                                                                          0.0s
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.32 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>

```

#### lets data is persistent or not 

```sh
USE somedatabase;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SHOW TABLES;
+------------------------+
| Tables_in_somedatabase |
+------------------------+
| mytable                |
+------------------------+
1 row in set (0.00 sec)

mysql> exit 

```