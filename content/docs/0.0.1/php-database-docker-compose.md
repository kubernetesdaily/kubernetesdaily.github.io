---
title: "23.Simple php apache and database using docker compose  "
description: " Database + PHP + Docker Compose  "
weight: 24
---

we will see detach form logs upon start and user multiservices in one docker container 

```yml
version: '3'

services:
  phpapp:
    build:
      context: ./
      dockerfile: Dockerfile
    image: phpapp:123
    ports:
      - "8080:80"
    volumes:
      - "./:/var/www/html"
    container_name: myphpapp-app

  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: my!!!root!!!pw
    container_name: myphpapp-db
```

here you see two services `phpapp` and `myphpapp-app` and image called phpapp with 123 tag 

another service called db form mysql this container restarts always which means it crashes ? the it 
restarts automatically ! 

upon start we set a password for the root user "my!!root!!pw" just fo demostrate 

create dockerfile with following content 

```dockerfile

FROM php:7.2-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
```

crete index.php with following content 

```php
<?php
header("content-type: text");
$host = "db"; //The hostname "db" from our docker-compose.yml file!!!
$username = "root"; //We use the root user
$pw = "my!!!root!!!pw"; //that's the password we set as environment variable

$conn = new mysqli($host,$username,$pw);

if ($conn->connect_errno > 0) {
    echo $db->connect_error;
} else {
    echo "DB Connection successful\n\n";
}

```

#### build docker compose 

```sh
 docker-compose up --build
[+] Building 22.7s (7/7) FINISHED                                          
 => [internal] load build definition from dockerfile                  0.0s
 => => transferring dockerfile: 126B                                  0.0s
 => [internal] load .dockerignore                                     0.0s
 => => transferring context: 2B                                       0.0s
 => [internal] load metadata for docker.io/library/php:apache-buster  2.6s
 => [1/2] FROM docker.io/library/php:apache-buster@sha256:386b6018bd  8.1s
 => => resolve docker.io/library/php:apache-buster@sha256:386b6018bd  0.0s
 => => sha256:4ba26e0fdc7f78867d9be8a223260f2d592c7be7bd 893B / 893B  0.6s
 => => sha256:224f38e513c9d90e092a021139f4859652f2981083 246B / 246B  0.5s
 => => sha256:652ab663764a1e05149b0df37b8389096be761 2.46kB / 2.46kB  0.5s
 => => sha256:fd3bc60f67a0da00904c6206528bdfa08ff9 11.36MB / 11.36MB  3.0s
 => => sha256:a30f4659f909420c63fc05831b6b4847a9cbd15932 491B / 491B  0.6s
 => => sha256:5387bfe59045447db1c94ed8d5fc84eb3803 12.38MB / 12.38MB  1.9s
 => => sha256:02fed234e9e5648116b0206ab71f67d6de466202ca 513B / 513B  0.5s
 => => sha256:0e3638958ff4f83d56ad9a11fc474f5af5e9336f3d 474B / 474B  1.4s
 => => sha256:38ce3c4babbe62c529e9a7e6e4de5ac72168 18.58MB / 18.58MB  2.0s
 => => sha256:573449e685b037ec25e2637d4fe3e19e09429f5521 269B / 269B  0.6s
 => => sha256:de58dc66c01f3c4357b62fc24dc75f3b14a3 70.37MB / 70.37MB  3.8s
 => => sha256:ed22f951ea44cd39f81544a2f0bf196ad60d 25.92MB / 25.92MB  1.9s
 => => sha256:f0071d92462e7f83ca38e778e6dff5c113712119e2 226B / 226B  0.6s
 => => extracting sha256:ed22f951ea44cd39f81544a2f0bf196ad60d13c1428  0.6s
 => => extracting sha256:f0071d92462e7f83ca38e778e6dff5c113712119e27  0.0s
 => => extracting sha256:de58dc66c01f3c4357b62fc24dc75f3b14a32bf650f  1.2s
 => => extracting sha256:573449e685b037ec25e2637d4fe3e19e09429f55213  0.0s
 => => extracting sha256:38ce3c4babbe62c529e9a7e6e4de5ac72168768d161  0.3s
 => => extracting sha256:0e3638958ff4f83d56ad9a11fc474f5af5e9336f3d2  0.0s
 => => extracting sha256:02fed234e9e5648116b0206ab71f67d6de466202ca2  0.0s
 => => extracting sha256:5387bfe59045447db1c94ed8d5fc84eb3803be624d8  0.1s
 => => extracting sha256:a30f4659f909420c63fc05831b6b4847a9cbd159320  0.0s
 => => extracting sha256:fd3bc60f67a0da00904c6206528bdfa08ff9515ce14  0.2s
 => => extracting sha256:652ab663764a1e05149b0df37b8389096be76171a21  0.0s
 => => extracting sha256:224f38e513c9d90e092a021139f4859652f2981083e  0.0s
 => => extracting sha256:4ba26e0fdc7f78867d9be8a223260f2d592c7be7bdb  0.0s
 => [2/2] RUN docker-php-ext-install mysqli && docker-php-ext-enable  7.8s
 => exporting to docker image format                                  4.2s
 => => exporting layers                                               0.0s
 => => exporting manifest sha256:a328dcabf983b4d59f41482a80e08861ee4  0.0s
 => => exporting config sha256:b38bdd1cd3eabf8ea442587b892d0a0d86e6d  0.0s
 => => sending tarball                                                4.1s
 => importing to docker                                               2.5s
[+] Running 2/2
 ⠿ Container myphpapp-db   Created                                    0.0s
 ⠿ Container myphpapp-app  Recreated                                  0.3s
Attaching to myphpapp-app, myphpapp-db
myphpapp-db   | 2023-03-03 19:30:17+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.32-1.el8 started.
myphpapp-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.24.0.3. Set the 'ServerName' directive globally to suppress this message
myphpapp-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.24.0.3. Set the 'ServerName' directive globally to suppress this message
myphpapp-app  | [Fri Mar 03 19:30:17.681041 2023] [mpm_prefork:notice] [pid 1] AH00163: Apache/2.4.38 (Debian) PHP/8.2.3 configured -- resuming normal operations
myphpapp-app  | [Fri Mar 03 19:30:17.681312 2023] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
myphpapp-db   | 2023-03-03 19:30:17+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
myphpapp-db   | 2023-03-03 19:30:17+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.32-1.el8 started.
myphpapp-db   | '/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
myphpapp-db   | 2023-03-03T19:30:18.754320Z 0 [Warning] [MY-011068] [Server] The syntax '--skip-host-cache' is deprecated and will be removed in a future release. Please use SET GLOBAL host_cache_size=0 instead.
myphpapp-db   | 2023-03-03T19:30:18.756720Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.32) starting as process 1
myphpapp-db   | 2023-03-03T19:30:18.764513Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
myphpapp-db   | 2023-03-03T19:30:19.043718Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
myphpapp-db   | 2023-03-03T19:30:19.237016Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
myphpapp-db   | 2023-03-03T19:30:19.237069Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
myphpapp-db   | 2023-03-03T19:30:19.238922Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
myphpapp-db   | 2023-03-03T19:30:19.258982Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.32'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
myphpapp-db   | 2023-03-03T19:30:19.259341Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
myphpapp-app  | 172.24.0.1 - - [03/Mar/2023:19:30:35 +0000] "GET / HTTP/1.1" 200 235 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"

```

### open browser 

http://localhost:8080

if you see out put as DB Connection successful 

cheers ! 


lets adda a query to select the existing database on the mariaDB server extend your index.php 

```php
<?php
header("content-type: text");
$host = "db"; //The hostname "db" from our docker-compose.yml file
$username = "root"; //We use the root user
$pw = "my!!!root!!!pw"; //that's the password we set as environment variable

$conn = new mysqli($host,$username,$pw);

if ($conn->connect_errno > 0) {
    echo $db->connect_error;
} else {
    echo "DB Connection successful\n\n";

    //we read out the content
    $result=mysqli_query($conn,"SHOW DATABASES;");
    while( $row = mysqli_fetch_row( $result ) ){
        echo $row[0]."\n";
    }
}

```

rebuild your docker compose after updating your php file 


```sh
4-DC-apache-database git:(main) ✗ docker-compose up --build
[+] Building 4.0s (8/8) FINISHED                                                                                                                       
 => [internal] load build definition from dockerfile                                                                                              0.0s
 => => transferring dockerfile: 126B                                                                                                              0.0s
 => [internal] load .dockerignore                                                                                                                 0.0s
 => => transferring context: 2B                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/php:apache-buster                                                                              2.3s
 => [auth] library/php:pull token for registry-1.docker.io                                                                                        0.0s
 => [1/2] FROM docker.io/library/php:apache-buster@sha256:386b6018bd3f73fb8f0bda3d26f76f402c36a68ed9d061b00bd7c080ea1fc951                        0.0s
 => => resolve docker.io/library/php:apache-buster@sha256:386b6018bd3f73fb8f0bda3d26f76f402c36a68ed9d061b00bd7c080ea1fc951                        0.0s
 => CACHED [2/2] RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli                                                                0.0s
 => exporting to docker image format                                                                                                              1.6s
 => => exporting layers                                                                                                                           0.0s
 => => exporting manifest sha256:a328dcabf983b4d59f41482a80e08861ee4226b2fe131b13a87bae3ff9b86e9c                                                 0.0s
 => => exporting config sha256:b38bdd1cd3eabf8ea442587b892d0a0d86e6d54251e1724444208996488da8e6                                                   0.0s
 => => sending tarball                                                                                                                            1.6s
 => importing to docker                                                                                                                           0.1s
[+] Running 2/0
 ⠿ Container myphpapp-app  Created                                                                                                                0.0s
 ⠿ Container myphpapp-db   Created                                                                                                                0.0s
Attaching to myphpapp-app, myphpapp-db
myphpapp-db   | 2023-03-03 19:34:00+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.32-1.el8 started.
myphpapp-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.24.0.3. Set the 'ServerName' directive globally to suppress this message
myphpapp-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.24.0.3. Set the 'ServerName' directive globally to suppress this message
myphpapp-app  | [Fri Mar 03 19:34:00.799408 2023] [mpm_prefork:notice] [pid 1] AH00163: Apache/2.4.38 (Debian) PHP/8.2.3 configured -- resuming normal operations
myphpapp-app  | [Fri Mar 03 19:34:00.799469 2023] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
myphpapp-db   | 2023-03-03 19:34:00+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
myphpapp-db   | 2023-03-03 19:34:00+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.32-1.el8 started.
myphpapp-db   | '/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
myphpapp-db   | 2023-03-03T19:34:01.423026Z 0 [Warning] [MY-011068] [Server] The syntax '--skip-host-cache' is deprecated and will be removed in a future release. Please use SET GLOBAL host_cache_size=0 instead.
myphpapp-db   | 2023-03-03T19:34:01.430139Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.32) starting as process 1
myphpapp-db   | 2023-03-03T19:34:01.437649Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
myphpapp-db   | 2023-03-03T19:34:01.524024Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
myphpapp-db   | 2023-03-03T19:34:01.700495Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
myphpapp-db   | 2023-03-03T19:34:01.700522Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
myphpapp-db   | 2023-03-03T19:34:01.701509Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
myphpapp-db   | 2023-03-03T19:34:01.711706Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
myphpapp-db   | 2023-03-03T19:34:01.711810Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.32'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
myphpapp-app  | 172.24.0.1 - - [03/Mar/2023:19:34:12 +0000] "GET / HTTP/1.1" 200 283 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"

```


### open browser 

http://localhost:8080