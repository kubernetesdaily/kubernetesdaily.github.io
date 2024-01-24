---
title: "Dockerfile HEALTHCHECK"
slug: "Dockerfile-HEALTHCHECK"
weight : 16
---


cat Dockerfile 

```sh
FROM nginx

```

#### build docker container 

```sh
docker build -t sangam14/healthcheck-dockerfile  -f dockerfile.healthcheck .
[+] Building 1.4s (6/6) FINISHED                                                                                                                  
 => [internal] load build definition from dockerfile.healthcheck                                                                             0.0s
 => => transferring dockerfile: 244B                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                             0.0s
 => CACHED [1/2] FROM docker.io/library/alpine                                                                                               0.0s
 => [2/2] RUN apk add curl                                                                                                                   1.3s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:2486b7b700a94a3e91237b3b8720f2b36c6e5e6b90584638db8c328a78dd90f9                                                 0.0s
 => => naming to docker.io/sangam14/healthcheck-dockerfile                                                                                   0.0s 
➜  Dockerfile git:(main) ✗ 
```

### expose docker port on 80 port 

```sh
➜  Dockerfile git:(main) ✗ docker container run --rm -d -p 80:80 --name health sangam14/healthcheck-dockerfile  
408e0d86098c4136dd36c7abf51ce4c6eb495d5fd33056f2b9e9a1176434853e
```

```sh
FROM nginx
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -fs http://localhost/ || exit 1
```


### build dockerfile 

```sh
  Dockerfile git:(main) ✗ docker build -t sangam14/healthcheck-dockerfile  -f dockerfile.healthcheck .         
[+] Building 2.7s (6/6) FINISHED                                                                                                                  
 => [internal] load build definition from dockerfile.healthcheck                                                                             0.0s
 => => transferring dockerfile: 227B                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/nginx:latest                                                                              0.0s
 => CACHED [1/2] FROM docker.io/library/nginx                                                                                                0.0s
 => [2/2] RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*                                                       2.6s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:c3b3dc3b23772975869bb5dc0dda8d877bcc16e6b408b31938f3deb309f92da7                                                 0.0s
 => => naming to docker.io/sangam14/healthcheck-dockerfile                                                                                   0.0s



```

#### inspect healthcheck 

```sh
 docker inspect --format '{{json .State.Health}}' health                      
{"Status":"healthy","FailingStreak":0,"Log":[{"Start":"2023-03-02T21:58:38.327900678Z","End":"2023-03-02T21:58:38.409811095Z","ExitCode":0,"Output":"<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\nhtml { color-scheme: light dark; }\nbody { width: 35em; margin: 0 auto;\nfont-family: Tahoma, Verdana, Arial, sans-serif; }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n"},{"Start":"2023-03-02T21:58:43.417592375Z","End":"2023-03-02T21:58:43.510278458Z","ExitCode":0,"Output":"<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\nhtml { color-scheme: light dark; }\nbody { width: 35em; margin: 0 auto;\nfont-family: Tahoma, Verdana, Arial, sans-serif; }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n"},{"Start":"2023-03-02T21:58:48.514938961Z","End":"2023-03-02T21:58:48.601586961Z","ExitCode":0,"Output":"<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\nhtml { color-scheme: light dark; }\nbody { width: 35em; margin: 0 auto;\nfont-family: Tahoma, Verdana, Arial, sans-serif; }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n"},{"Start":"2023-03-02T21:58:53.606320671Z","End":"2023-03-02T21:58:53.693584213Z","ExitCode":0,"Output":"<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\nhtml { color-scheme: light dark; }\nbody { width: 35em; margin: 0 auto;\nfont-family: Tahoma, Verdana, Arial, sans-serif; }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n"},{"Start":"2023-03-02T21:58:58.697104757Z","End":"2023-03-02T21:58:58.780027924Z","ExitCode":0,"Output":"<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\nhtml { color-scheme: light dark; }\nbody { width: 35em; margin: 0 auto;\nfont-family: Tahoma, Verdana, Arial, sans-serif; }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n"}]}

```


★  `--interval`: This specifies the period between each health check (the default is 30s).
<br>
★ `--timeout`: If no success response is received within this period, the health check is considered failed (the default is 30s).
<br>
★ `--start-period`: The duration to wait before running the first health check. This is used to give a startup time for the container (the default is 0s).
<br>
★  `--retries` : The container will be considered unhealthy if the health check failed consecutively for the given number of retries (the default is 3).