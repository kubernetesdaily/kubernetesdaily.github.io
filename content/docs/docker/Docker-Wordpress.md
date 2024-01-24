---
title: "Docker Wordpress Example"
slug: "Docker-Wordpress-Example"
weight : 49
---


## create wordpress docker compose  


```yml
wordpress:
    image: wordpress
    links:
     - mariadb:mysql
    environment:
     - WORDPRESS_DB_PASSWORD=password
     - WORDPRESS_DB_USER=root
    ports:
     - "public_ip:80:80"
    volumes:
     - ./html:/var/www/html
mariadb:
    image: mariadb
    environment:
     - MYSQL_ROOT_PASSWORD=password
     - MYSQL_DATABASE=wordpress
    volumes:
     - ./database:/var/lib/mysql

```

### run docker compose 

```sh
docker compose up 
```

