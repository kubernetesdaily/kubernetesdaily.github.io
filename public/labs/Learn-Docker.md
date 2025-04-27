

# Docker Prerequisites




> Here are the steps to create a Docker Hub account:

1. Go to https://hub.docker.com/signup and click on the "Sign Up" button.
<br>
2. Fill out the registration form with your name, email address, and password.
<br>
3. Agree to the terms of service and privacy policy by checking the box.
<br>
4. Click on the "Sign Up" button to complete the registration process.
<br>
5. You will receive a verification email from Docker Hub. Follow the link in the email to verify your email address.
<br>

6. Once your email address is verified, you can log in to Docker Hub using your email address and password.
<br>

You can now create and manage your repositories, and upload your Docker images to share with the community.
That's it! You now have a Docker Hub account and you can start using it to store, share, and distribute your Docker images.


# Hello World in Docker


#### run your first hello world example

```sh
docker run hello-world
```
is a command that runs a simple Docker container to verify that Docker is correctly installed on your system and working as expected.

When you run this command, Docker will first check if the "hello-world" image is available locally. If the image is not found, Docker will download it from the Docker Hub registry.

Once the "hello-world" image is available, Docker will create a container from the image and run it. The container will print a message to the console to indicate that everything is working correctly.

Here's an example of what you might see when you run docker run hello-world:

```sh
docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
7050e35b49f5: Pull complete 
Digest: sha256:6e8b6f026e0b9c419ea0fd02d3905dd0952ad1feea67543f525c73a0a790fefb
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/


```
#### check it out list of docker images 

```sh
dockerworkshop git:(main) ✗ docker images
REPOSITORY                                TAG               IMAGE ID       CREATED         SIZE
hello-world                               latest            46331d942d63   11 months ago   9.14kB
```


docker inspect is a command used to retrieve detailed information about one or more Docker objects, such as containers, images, networks, volumes, and more. The command allows you to inspect the configuration and state of a Docker object, including its metadata, networking information, storage configuration, and more.

Here's the basic syntax of the docker inspect command:

```sh
docker inspect [OPTIONS] OBJECT [OBJECT...]

```
- OPTIONS: Optional flags that modify the output of the command.
- OBJECT: The name or ID of the Docker object to inspect.

For example, to inspect a running Docker container named hello-world , you could use the following command:

```sh
docker inspect hello-world                         
[
    {
        "Id": "sha256:46331d942d6350436f64e614d75725f6de3bb5c63e266e236e04389820a234c4",
        "RepoTags": [
            "hello-world:latest"
        ],
        "RepoDigests": [
            "hello-world@sha256:6e8b6f026e0b9c419ea0fd02d3905dd0952ad1feea67543f525c73a0a790fefb"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2022-03-19T16:12:58.923371954Z",
        "Container": "b2af51419cbf516f3c99b877a64906b21afedc175bd3cd082eb5798e2f277bb4",
        "ContainerConfig": {
            "Hostname": "b2af51419cbf",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"/hello\"]"
            ],
            "Image": "sha256:cc0fff24c4ece63ade5d9f549e42c926cf569112c4f5c439a4a57f3f33f5588b",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "DockerVersion": "20.10.12",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/hello"
            ],
            "Image": "sha256:cc0fff24c4ece63ade5d9f549e42c926cf569112c4f5c439a4a57f3f33f5588b",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": null
        },
        "Architecture": "arm64",
        "Variant": "v8",
        "Os": "linux",
        "Size": 9136,
        "VirtualSize": 9136,
        "GraphDriver": {
            "Data": {
                "MergedDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/merged",
                "UpperDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/diff",
                "WorkDir": "/var/lib/docker/overlay2/851a7de3abc0e1977e00c9bd8976c5fa1b0d954d3dc847ae15b36539f43e90a3/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:efb53921da3394806160641b72a2cbd34ca1a9a8345ac670a85a04ad3d0e3507"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]

```


# Docker Image Filtering


running `docker run alpine ` command would download the Alpine Linux image from Docker Hub and start a new container based on that image. You can then use the container to run commands or applications. When you exit the container, it will stop running.

Alpine Linux is a lightweight Linux distribution that is commonly used in Docker containers due to its small size and security features.

```sh
dockerworkshop git:(main) ✗ docker pull alpine:3.6 
docker pull alpine:3.7
docker pull alpine:3.8
docker pull alpine:3.9
3.6: Pulling from library/alpine
e8f81692e76c: Pull complete 
Digest: sha256:66790a2b79e1ea3e1dabac43990c54aca5d1ddf268d9a5a0285e4167c8b24475
Status: Downloaded newer image for alpine:3.6
docker.io/library/alpine:3.6
3.7: Pulling from library/alpine
40223db5366f: Pull complete 
Digest: sha256:8421d9a84432575381bfabd248f1eb56f3aa21d9d7cd2511583c68c9b7511d10
Status: Downloaded newer image for alpine:3.7
docker.io/library/alpine:3.7
3.8: Pulling from library/alpine
788aef77d06b: Pull complete 
Digest: sha256:2bb501e6173d9d006e56de5bce2720eb06396803300fe1687b58a7ff32bf4c14
Status: Downloaded newer image for alpine:3.8
docker.io/library/alpine:3.8
3.9: Pulling from library/alpine
941f399634ec: Pull complete 
Digest: sha256:414e0518bb9228d35e4cd5165567fb91d26c6a214e9c95899e1e056fcd349011
Status: Downloaded newer image for alpine:3.9
docker.io/library/alpine:3.9

```

#### docker images filtering 

The docker images command allows you to filter Docker images based on various criteria using the --filter option. Here are some common filters that you can use with the docker images command:


```sh
docker images --filter=reference='alpine'
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
alpine       3.9       9afdd4a290bf   2 years ago   5.3MB
alpine       3.8       b22edbe95d11   3 years ago   4.2MB
alpine       3.7       bd812700d284   3 years ago   4.01MB
alpine       3.6       25e814211fdd   3 years ago   3.84MB
```
#### Filters images that are or are not "dangling," meaning they are not tagged and not referenced by any container.

```sh
docker images --filter dangling=false 
```
Or to list images created before a specific image, you can run:

```sh
docker images --filter before=alpine:3.8 

```

# Images as Tar Files


#### Images and Container as Tarfile 

Docker provides the ability to save images and containers as tar files, which can be useful for sharing with others or transferring between systems. Here's how to do it:


```sh
docker pull nginx:latest
latest: Pulling from library/nginx
5731adb3a4ab: Pull complete 
8785c8f663d3: Pull complete 
023b6bd393e4: Pull complete 
fd8f86b165b0: Pull complete 
8f41e7c12976: Pull complete 
3b5338ea7d08: Pull complete 
Digest: sha256:6650513efd1d27c1f8a5351cbd33edf85cc7e0d9d0fcb4ffb23d8fa89b601ba8
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

```

#### Saving an Image as a Tar File

To save a Docker image as a tar file, use the docker save command with the image name and output file name:

```sh
dockerworkshop git:(main) ✗ docker container run -it ubuntu:14.04 bash
Unable to find image 'ubuntu:14.04' locally
14.04: Pulling from library/ubuntu
d1a5a1e51f25: Pull complete 
75f8eea31a63: Pull complete 
a72d031efbfb: Pull complete 
Digest: sha256:64483f3496c1373bfd55348e88694d1c4d0c9b660dee6bfef5e12f43b9933b30
Status: Downloaded newer image for ubuntu:14.04
root@906d9f72e9fe:/# exit
exit

```

```sh
➜  dockerworkshop git:(main) ✗ docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED             STATUS             PORTS     NAMES
1bf183201392   ubuntu:14.04                "bash"                   15 seconds ago      Up 14 seconds                loving_ride
```

```sh
docker export 1b  > os.tar
docker export loving_ride  > os1.tar
dockerworkshop git:(main) ✗ ls
os.tar   os1.tar
```


docker load is a command used to load images or container archives that were previously saved using the docker save command.

When you use the docker save command, it creates a tar archive of one or more Docker images and/or containers. You can then use the docker load command to load this tar archive back into Docker.

The syntax for using the docker load command is as follows:

```sh
➜  dockerworkshop git:(main) ✗ docker save -o os.tar ubuntu  
➜  dockerworkshop git:(main) ✗ docker load < os.tar            
Loaded image: ubuntu:14.04
```


# Pushing to DockerHub


#### Pull nginx image from dockerhub using 

```sh
dockerworkshop git:(main) ✗ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
Digest: sha256:6650513efd1d27c1f8a5351cbd33edf85cc7e0d9d0fcb4ffb23d8fa89b601ba8
Status: Image is up to date for nginx:latest
docker.io/library/nginx:latest
```
#### Run Docker with ngnix 

```sh
 dockerworkshop git:(main) ✗ docker run --name docker-nginx -p 80:80 -d nginx
63258aebdc2d8ea40a0099efb3e51f8b15db2fe2dc048da3901843b4782d19fb
```
–name docker-nginx : Name given to the container that is run is docker-nginx-p 80:80 : the port we are exposing and mapping from local machine port number to that of container, in the format local_machine_port:container_port-d : Detached mode – Runs the container in background

#### check all running docker containers 

```sh
➜  dockerworkshop git:(main) ✗ docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED          STATUS          PORTS                NAMES
63258aebdc2d   nginx                       "/docker-entrypoint.…"   55 seconds ago   Up 55 seconds   0.0.0.0:80->80/tcp   docker-nginx
```

#### open localhost with specific port 

![](./images/ngnix.png)

#### Include a static Web Application in the Docker with NGINX

To include our static Web Application into the Docker Image with NGINX, we shall create a Dockerfile (including commands to build image) and an html file with name index.html (acting as our web application) in a directory named nginx-app.

create dockerfile with following content :

```dockerfile

FROM nginx
COPY . /usr/share/nginx/html

```
### create index.html file with following content 

```html

<html>
  <head>
    <title>Docker NGINX Tutorial</title>
  </head>
  <body>
    <h1>Join CloudNativeFolks Community</h1>
    <p>Learn to Dockerize with NGINX and your web application.</p>
    <a href=" https://discord.com/invite/9ERSnT7 ">Join Discord </a>
    <a href=" ">NGINX Tutorial</a>
  </body>
</html>

```

#### Build Dockerfile 

```sh
Dockerfile git:(main) ✗ docker build -t nginx-application -f dockerfile.ngnix .
[+] Building 0.1s (7/7) FINISHED                                                                                                                                                                  
 => [internal] load build definition from dockerfile.ngnix                                                                                                                                   0.0s
 => => transferring dockerfile: 87B                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/nginx:latest                                                                                                                              0.0s
 => [internal] load build context                                                                                                                                                            0.0s
 => => transferring context: 82B                                                                                                                                                             0.0s
 => [1/2] FROM docker.io/library/nginx                                                                                                                                                       0.0s
 => [2/2] COPY . /usr/share/nginx/html                                                                                                                                                       0.0s
 => exporting to image                                                                                                                                                                       0.0s
 => => exporting layers                                                                                                                                                                      0.0s
 => => writing image sha256:54027a144afd33ddd1449b757581c7b554d5411c4b2bac291f5dfbccb85fda41                                                                                                 0.0s
 => => naming to docker.io/library/nginx-application                                                                                                                                         0.0s
➜  Dockerfile git:(main) ✗ 
```


#### run updated ngnix webapp 

```sh
docker run --name docker-nginx-app  -p 80:80 -d nginx-application

```

#### List docker images 

```sh
Dockerfile git:(main) ✗ docker images
REPOSITORY                                                TAG                                                                          IMAGE ID       CREATED         SIZE
nginx-application                                         latest                                                                       e8742ef897ea   2 minutes ago   135MB
```

#### Tag Docker Images 

```sh
docker tag nginx-application  sangam14/nginx-application 

```

#### Login into Your DockerHub Account 

```sh
docker login 
docker push sangam14/nginx-application  
Using default tag: latest
The push refers to repository [docker.io/sangam14/nginx-application]
4e9e8987d0ed: Pushed 
7a99131e1da4: Mounted from library/nginx 
c61a83b92ad9: Mounted from library/nginx 
0d96feb871c8: Mounted from library/nginx 
902b28ccafe7: Mounted from library/nginx 
3063fc92629d: Mounted from library/nginx 
a49c6ceb5b3a: Mounted from library/nginx 
latest: digest: sha256:09f29db6e4179bd1019a48d2d50944989347fdf145193f4165353d5148a902c8 size: 1777

```

# Building a Base Image


#### write simple c program 

```c
#include<stdio.h>

int main()
{
printf("dockerworkshop");
}
```

#### Compile C program 

```sh
gcc -o hello hello.c 

✗ ./hello 
dockerworkshop%     

```

#### create dockerfile with following content : 


```dockerfile
FROM scratch
ADD hello /
CMD ["/hello"]
```

### Build Dockerfile without any base image 

```sh
Dockerfile git:(main) ✗ docker build -t sangam14/hello-scratch -f dockerfile.hello .
[+] Building 0.1s (5/5) FINISHED                                                                                                                                                                  
 => [internal] load build definition from dockerfile.hello                                                                                                                                   0.0s
 => => transferring dockerfile: 87B                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                              0.0s
 => [internal] load build context                                                                                                                                                            0.0s
 => => transferring context: 33.47kB                                                                                                                                                         0.0s
 => [1/1] ADD hello /                                                                                                                                                                        0.0s
 => exporting to image                                                                                                                                                                       0.0s
 => => exporting layers                                                                                                                                                                      0.0s
 => => writing image sha256:769934a6858c0910a3682e966da6c8d9c15b0324307b092eb77258a9a08879ce                                                                                                 0.0s
 => => naming to docker.io/sangam14/hello-scratch       

 ```

#### run docker image 

```sh
 docker run sangam14/hello-scratch 
 dockerworkshop

```


# Dockerfile ADD


Here's an example of a Dockerfile that uses the ADD instruction to copy a local file into a Docker image:


```Dockerfile
FROM ubuntu:latest

WORKDIR /app

ADD example.txt /app/

CMD ["cat", "/app/example.txt"]

```

#### Build Dockerfile 


```bash

 Dockerfile git:(main) ✗ docker build -t sangam14/add-dockerfile  -f dockerfile.add .  
[+] Building 5.2s (9/9) FINISHED                                                                                                                                                                  
 => [internal] load build definition from dockerfile.add                                                                                                                                     0.0s
 => => transferring dockerfile: 131B                                                                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                                                                                             3.1s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                                                                                                                0.0s
 => [1/3] FROM docker.io/library/ubuntu:latest@sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f                                                                       2.0s
 => => resolve docker.io/library/ubuntu:latest@sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f                                                                       0.0s
 => => sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f 1.13kB / 1.13kB                                                                                               0.0s
 => => sha256:61bd0b97000996232eb07b8d0e9375d14197f78aa850c2506417ef995a7199a7 424B / 424B                                                                                                   0.0s
 => => sha256:a6be1f66f70f66ef43503292e38ccbfc14f2d5464e7736344783a8fc7bb339a8 2.31kB / 2.31kB                                                                                               0.0s
 => => sha256:8b150fd943bcd54ef788cece17523d19031f745b099a798de65247900d102e18 27.34MB / 27.34MB                                                                                             1.4s
 => => extracting sha256:8b150fd943bcd54ef788cece17523d19031f745b099a798de65247900d102e18                                                                                                    0.4s
 => [internal] load build context                                                                                                                                                            0.0s
 => => transferring context: 78B                                                                                                                                                             0.0s
 => [2/3] WORKDIR /app                                                                                                                                                                       0.1s
 => [3/3] ADD example.txt /app/                                                                                                                                                              0.0s
 => exporting to image                                                                                                                                                                       0.0s
 => => exporting layers                                                                                                                                                                      0.0s
 => => writing image sha256:c3438bfac421fa098b47f37ae00427eadcfb7ed36653a678738c63b0ab33a8d1                                                                                                 0.0s
 => => naming to docker.io/sangam14/add-dockerfile               


 ```

 ### run docker images 

```
Dockerfile git:(main) ✗ docker run sangam14/add-dockerfile                                                                                                                                     
Sangam Biradar 
Docker Community Leader 

```


# Dockerfile COPY


COPY is a dockerfile command that copies files from a local source location to a destination in the Docker container. A Dockerfile is a text file with instructions to set up a Docker container.

create myfile1.txt and myfile2.txt with following content :

```sh
# myfile1.txt
Hello This is my first file !
This is file will be copied in /usr/share directory from Docker host to Docker Container.
```

```sh
# myfile2.txt
Hello This is my second file !
This is file will be copied in /tmp directory from Docker host to Docker Container.

```
The general syntax of the COPY command is:

```sh
COPY <src> <dest>

```
Here, `<src>` and `<dest>`are file paths.` <src>` is the path to the source folder containing files to be copied. This option can be left empty to copy the contents of the current directory. The source of the files has to be a directory on the local computer.

`<dest>` is the destination of the COPY command inside the docker container. This is the path where files are to be copied.

```Dockerfile
# Instruction for Dockerfile to create a new image on top of the base image (ubuntu)
# Using the base image ubuntu: latest
FROM ubuntu:latest
# Copying myfile1.txt to the containers /usr/share directory
COPY myfile1.txt /usr/share
# Copying myfile2.txt to the containers /tmp directory
COPY myfile2.txt /tmp

```
### Build Dockerfile using following Command 

```sh
  Dockerfile git:(main) ✗ docker build -t sangam14/copy-dockerfile  -f dockerfile.copy .
[+] Building 2.2s (9/9) FINISHED                                                                                                                                                                  
 => [internal] load build definition from dockerfile.copy                                                                                                                                    0.0s
 => => transferring dockerfile: 356B                                                                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                                                                                             2.1s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                                                                                                                0.0s
 => CACHED [1/3] FROM docker.io/library/ubuntu:latest@sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f                                                                0.0s
 => [internal] load build context                                                                                                                                                            0.0s
 => => transferring context: 344B                                                                                                                                                            0.0s
 => [2/3] COPY myfile1.txt /usr/share                                                                                                                                                        0.0s
 => [3/3] COPY myfile2.txt /tmp                                                                                                                                                              0.0s
 => exporting to image                                                                                                                                                                       0.0s
 => => exporting layers                                                                                                                                                                      0.0s
 => => writing image sha256:4c660d66bd5f94311a22be23394032e2f2dd45f40fb4831f8e083efe90488763                                                                                                 0.0s
 => => naming to docker.io/sangam14/copy-dockerfile    

 ```

 #### check inside container and search for text file 

```sh
➜  Dockerfile git:(main) ✗ docker run -it sangam14/copy-dockerfile bash                  
root@27a3fbe098c3:/# ls
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@27a3fbe098c3:/# cat /usr/share/myfile1.txt 
# myfile1.txt
Hello This is my first file !
This is file will be copied in /usr/share directory from Docker host to Docker Container.root@27a3fbe098c3:/# ls
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@27a3fbe098c3:/# cat /tmp/myfile2.txt 

# myfile2.txt
Hello This is my second file !
This is file will be copied in /tmp directory from Docker host to Docker Container.root@27a3fbe098c3:/# 

```
both file successfully copied inside container 



# Dockerfile CMD 



The CMD command we saw earlier followed the Shell syntax:

```bash
CMD executable parameter1 parameter2
```

However, it is better practice to use the JSON array format:

```json
CMD ["executable", "parameter1", "parameter2"]
```

A CMD command can be overridden by providing the executable and its parameters in the docker ​run command. For example:


```dockerfile 
FROM ubuntu
RUN apt-get update
CMD ["echo" , "Join CloudNativeFolks Community"]
```
#### build dockerfile 

```sh
 docker build -t sangam14/cmd-dockerfile  -f dockerfile.cmd . 
[+] Building 8.3s (7/7) FINISHED                                                                                                                                                                  
 => [internal] load build definition from dockerfile.cmd                                                                                                                                     0.0s
 => => transferring dockerfile: 125B                                                                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                                                                                             2.1s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                                                                                                                0.0s
 => CACHED [1/2] FROM docker.io/library/ubuntu@sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f                                                                       0.0s
 => [2/2] RUN apt-get update                                                                                                                                                                 6.0s
 => exporting to image                                                                                                                                                                       0.1s
 => => exporting layers                                                                                                                                                                      0.1s
 => => writing image sha256:c59a693968aab28243f6852d49be7299e0035e71e39b42f22c07be49cca74fb2                                                                                                 0.0s
 => => naming to docker.io/sangam14/cmd-dockerfile 

```

#### run docker container 

```sh
Dockerfile git:(main) ✗ docker run sangam14/cmd-dockerfile 
Join CloudNativeFolks Community

```


## Dockerfile Entrypoint


#### Running a Docker Container with ENTRYPOINT

Let's learn the details in this case by actually executing ENTRYPOINT in exec form. The following is an example of a Dockerfile that uses the exec form of ENTRYPOINT, which outputs a character string on the command line.

```dockerfile 
FROM alpine
ENTRYPOINT ["echo", "Hello!"]

```

#### Build dockerfile 

```sh
➜  Dockerfile git:(main) ✗ docker build -t sangam14/entrypoint-dockerfile  -f dockerfile.entrypoint .
[+] Building 3.2s (6/6) FINISHED                                                                                            
 => [internal] load build definition from dockerfile.entrypoint                                                        0.0s
 => => transferring dockerfile: 94B                                                                                    0.0s
 => [internal] load .dockerignore                                                                                      0.0s
 => => transferring context: 2B                                                                                        0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                       3.1s
 => [auth] library/alpine:pull token for registry-1.docker.io                                                          0.0s
 => [1/1] FROM docker.io/library/alpine@sha256:69665d02cb32192e52e07644d76bc6f25abeb5410edc1c7a81a10ba3f0efb90a        0.0s
 => => resolve docker.io/library/alpine@sha256:69665d02cb32192e52e07644d76bc6f25abeb5410edc1c7a81a10ba3f0efb90a        0.0s
 => => sha256:69665d02cb32192e52e07644d76bc6f25abeb5410edc1c7a81a10ba3f0efb90a 1.64kB / 1.64kB                         0.0s
 => => sha256:c41ab5c992deb4fe7e5da09f67a8804a46bd0592bfdf0b1847dde0e0889d2bff 528B / 528B                             0.0s
 => => sha256:d74e625d91152966d38fe8a62c60daadb96d4b94c1a366de01fab5f334806239 1.49kB / 1.49kB                         0.0s
 => exporting to image                                                                                                 0.0s
 => => exporting layers                                                                                                0.0s
 => => writing image sha256:0d5a798a648339f8ea8094b10568eb2dc44540480deff55f680dfd689f787013                           0.0s
 => => naming to docker.io/sangam14/entrypoint-dockerfile                                                              0.0s
 ```

#### run docker container 

```sh
 Dockerfile git:(main) ✗ docker run sangam14/entrypoint-dockerfile 
Hello!
➜  Dockerfile git:(main) ✗ docker run sangam14/entrypoint-dockerfile echo "sangam"
Hello! echo sangam
➜  Dockerfile git:(main) ✗ 

```

#### Overwrite with `--entrypoint` option

On the other hand, in ENTRYPOINT, you can change the instruction by using the option of `—entrypoint` as follows.

```sh
docker run --rm --entrypoint sh sangam14/entrypoint-dockerfile  -c 'echo "test"'
test

```

CMD and ENTRYPOINT have similar roles and are confusing, but they have different functions. CMD, ENTRYPOINT, and ENTRYPOINT also behave differently between shell form and exec form, so it's a good idea to use each function properly. The instructions in the Dockerfile are a bit complicated, but you can use them effectively if you understand them.



## Dockerfile WORKDIR



The WORKDIR command is used to define the working directory of a Docker container at any given time. The command is specified in the Dockerfile.

Any RUN, CMD, ADD, COPY, or ENTRYPOINT command will be executed in the specified working directory.

# WORKDIR instruction Dockerfile for Docker Quick Start

```Dockerfile
FROM ubuntu
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y nginx
COPY index.html .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
#### build dockerfile 

```sh
docker build -t sangam14/workdir-dockerfile  -f dockerfile.workdir .

```
#### run docker container 

```sh
docker run -p 80:80 sangam14/workdir-dockerfile 

```
output 

![](./images/ngnix.png)


##  Dockerfile RUN 


The RUN command is the central executing directive for Dockerfiles. It takes a command as its argument and runs it to form the image. Unlike CMD, it actually is used to build the image (forming another layer on top of the previous one which is committed).


#### create dockerfile with following content 

```dockerfile
FROM ubuntu
RUN id
RUN useradd --create-home -m -s /bin/bash dev
# Add a fun prompt for dev user of my-app
# whale: "\xF0\x9F\x90\xB3"
# alien:"\xF0\x9F\x91\xBD"
# fish:"\xF0\x9F\x90\xA0"
# elephant:"\xF0\x9F\x91\xBD"
# moneybag:"\xF0\x9F\x92\xB0"
RUN echo 'PS1="\[$(tput bold)$(tput setaf 4)\]my-app $(echo -e "\xF0\x9F\x90\xB3") \[$(tput sgr0)\] [\\u@\\h]:\\W \\$ "' >> /home/dev/.bashrc && \
    echo 'alias ls="ls --color=auto"' >> /home/dev/.bashrc

RUN mkdir /myvol
RUN echo "hello DQS Guide" > /myvol/greeting
RUN ["chmod", "664", "/myvol/greeting"]
RUN ["chown", "dev:dev", "/myvol/greeting"]
VOLUME /myvol

USER dev
RUN id

CMD ["/bin/bash"]

```

### build docker container 

```bash
 ➜  docker build -t  sangam14/run-dockerfile -f dockerfile.run .
```


#### run docer container 

```sh
➜  Dockerfile git:(main) ✗ docker run -it  sangam14/run-dockerfile 
```
#### added user as my-app with whale emoji 

```sh
my-app 🐳  [dev@0270ab5e6f0c]:/ $ ls
bin  boot  dev  etc  home  lib  media  mnt  myvol  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
my-app 🐳  [dev@0270ab5e6f0c]:/ $ cat myvol/greeting 
hello DQS Guide

```

# Dockerfile ARG 


```dockerfile 
FROM alpine

ENV key1="ENV is stronger than an ARG"
RUN echo ${key1}
ARG key1="not going to matter"
RUN echo ${key1}

RUN echo ${key2}
ARG key2="defaultValue"
RUN echo ${key2}
ENV key2="ENV value takes over"
RUN echo ${key2}
CMD ["sh"]
```

#### Build Dockerfile 

```sh
 Dockerfile git:(main) ✗ docker build -t sangam14/arg-dockerfile  -f dockerfile.arg .
[+] Building 3.5s (11/11) FINISHED                                                                                                                         
 => [internal] load build definition from dockerfile.arg                                                                                              0.0s
 => => transferring dockerfile: 336B                                                                                                                  0.0s
 => [internal] load .dockerignore                                                                                                                     0.0s
 => => transferring context: 2B                                                                                                                       0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                                      2.2s
 => [auth] library/alpine:pull token for registry-1.docker.io                                                                                         0.0s
 => CACHED [1/6] FROM docker.io/library/alpine@sha256:69665d02cb32192e52e07644d76bc6f25abeb5410edc1c7a81a10ba3f0efb90a                                0.0s
 => [2/6] RUN echo ENV is stronger than an ARG                                                                                                        0.2s
 => [3/6] RUN echo not going to matter                                                                                                                0.1s
 => [4/6] RUN echo ${key2}                                                                                                                            0.3s
 => [5/6] RUN echo defaultValue                                                                                                                       0.2s
 => [6/6] RUN echo ENV value takes over                                                                                                               0.3s
 => exporting to image                                                                                                                                0.0s
 => => exporting layers                                                                                                                               0.0s
 => => writing image sha256:acf55f3ef13e44ff24acf18f9c6320e5af33aa3eb9789274a46f47a9dff6d474                                                          0.0s
 => => naming to docker.io/sangam14/arg-dockerfile             

 ```

#### Inspect Env variable 

```sh
docker image inspect --format '{{json .Config}}' sangam14/arg-demo:1.0 | jq '.Env'

```

output 

```sh
docker image inspect --format '{{json .Config}}' sangam14/arg-dockerfile | jq '.Env'
[
  "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
  "key1=ENV is stronger than an ARG",
  "key2=ENV value takes over"
]
```
docker container run sangam14/arg-dockerfile env  

```sh
docker container run sangam14/arg-dockerfile env                                    
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=7b09d8fffd50
key1=ENV is stronger than an ARG
key2=ENV value takes over
HOME=/root

```
#### Pass env values while building dockerfile 

```sh
docker  build --rm --build-arg key1="buildTimeValue" --build-arg key2="good till env instruction" --tag sangam14/arg-dockerfile1 -f dockerfile.arg . 
Sending build context to Docker daemon  50.18kB
Step 1/11 : FROM alpine
latest: Pulling from library/alpine
af6eaf76a39c: Already exists 
Digest: sha256:69665d02cb32192e52e07644d76bc6f25abeb5410edc1c7a81a10ba3f0efb90a
Status: Downloaded newer image for alpine:latest
 ---> d74e625d9115
Step 2/11 : ENV key1="ENV is stronger than an ARG"
 ---> Running in 93620e2ca3e2
Removing intermediate container 93620e2ca3e2
 ---> e5eaad1dfbfa
Step 3/11 : RUN echo ${key1}
 ---> Running in bf14143efff7
ENV is stronger than an ARG
Removing intermediate container bf14143efff7
 ---> 2936757fac41
Step 4/11 : ARG key1="not going to matter"
 ---> Running in 161bf9d911e7
Removing intermediate container 161bf9d911e7
 ---> 87ff1f1e4c1b
Step 5/11 : RUN echo ${key1}
 ---> Running in 2e69ff7a2d91
ENV is stronger than an ARG
Removing intermediate container 2e69ff7a2d91
 ---> af66f1b039df
Step 6/11 : RUN echo ${key2}
 ---> Running in 5dd29054ba99

Removing intermediate container 5dd29054ba99
 ---> f575cd74046a
Step 7/11 : ARG key2="defaultValue"
 ---> Running in 757002f257f0
Removing intermediate container 757002f257f0
 ---> d60933ac5ef5
Step 8/11 : RUN echo ${key2}
 ---> Running in 742bdd38d1e0
good till env instruction
Removing intermediate container 742bdd38d1e0
 ---> b32166e66170
Step 9/11 : ENV key2="ENV value takes over"
 ---> Running in 1bedb017ed72
Removing intermediate container 1bedb017ed72
 ---> c8a4d9a2fd20
Step 10/11 : RUN echo ${key2}
 ---> Running in 96dbe6d53412
ENV value takes over
Removing intermediate container 96dbe6d53412
 ---> 6270d392443c
Step 11/11 : CMD ["sh"]
 ---> Running in b13a9ae5798f
Removing intermediate container b13a9ae5798f
 ---> 9f878f6fe503
Successfully built 9f878f6fe503
Successfully tagged sangam14/arg-dockerfile1:latest
```

#### Inspect Env of new docker image 

```sh
docker image inspect --format '{{json .Config}}' sangam14/arg-dockerfile1:latest | jq '.Env'
[
  "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
  "key1=ENV is stronger than an ARG",
  "key2=ENV value takes over"
]
```

```sh
docker container run sangam14/arg-dockerfile1 env
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=dff7e104aadb
key1=ENV is stronger than an ARG
key2=ENV value takes over
HOME=/root

```


cat dockerfile.arg1

```Dockerfile

FROM alpine

ENV lifecycle="production"
RUN echo ${lifecycle}
ARG username="35"
RUN echo ${username}
ARG appdir
RUN echo ${appdir}

ADD hello /${appdir}/
RUN chown -R ${username}:${username} ${appdir}
WORKDIR ${appdir}
USER ${username}

CMD ["./hello"]

```

#### build docker image and pass build args 

```sh
docker build --build-arg username=35 --build-arg appdir="/opt/hello" -t sangam14/arg1-dockerfile  -f dockerfile.arg1 .
```


# Dockerfile Volumes


cat dockerfile.vol 

```Dockerfile
FROM alpine
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
CMD ["sh"]

```

#### Build above dockerfile 

```sh
docker build -t sangam14/vol-dockerfile  -f dockerfile.vol .            
[+] Building 0.4s (7/7) FINISHED                                                                                                                           
 => [internal] load build definition from dockerfile.vol                                                                                              0.0s
 => => transferring dockerfile: 140B                                                                                                                  0.0s
 => [internal] load .dockerignore                                                                                                                     0.0s
 => => transferring context: 2B                                                                                                                       0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                                      0.0s
 => CACHED [1/3] FROM docker.io/library/alpine                                                                                                        0.0s
 => [2/3] RUN mkdir /myvol                                                                                                                            0.2s
 => [3/3] RUN echo "hello world" > /myvol/greeting                                                                                                    0.2s
 => exporting to image                                                                                                                                0.0s
 => => exporting layers                                                                                                                               0.0s
 => => writing image sha256:7d9ebad9eb42a7006dbb89c1a544e5fcbce3de83cb470210b89adf4ffc4670db                                                          0.0s
 => => naming to docker.io/sangam14/vol-dockerfile                                                                                                    0.0s
```

#### run dockerg

```sh
docker  run --rm -it --mount source=myvolsrc,target=/myvol sangam14/vol-dockerfile 
```

output 

```sh
docker  run --rm -it --mount source=myvolsrc,target=/myvol sangam14/vol-dockerfile   
/ # ls
bin    dev    etc    home   lib    media  mnt    myvol  opt    proc   root   run    sbin   srv    sys    tmp    usr    var
/ # cat myvol/greeting 
hello world

```
#### check it out all mounted volumes 

```sh
docker volume ls

```
output 

```sh
Dockerfile git:(main) ✗ docker volume ls
DRIVER    VOLUME NAME
local     myvolsrc

```

#### run container 

```sh
docker  run --rm -d --name vol-demo sangam14/vol-dockerfile tail -f /dev/null
76a5bfedc0a43bde7f2788fec5e5aafaa94854f16f960ed736ba598b80560f8d

```

```sh
docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED              STATUS              PORTS     NAMES
76a5bfedc0a4   sangam14/vol-dockerfile     "tail -f /dev/null"      About a minute ago   Up About a minute             vol-demo
```
#### stop running container 

```sh
docker container stop vol-demo
vol-demo

```

#### lets run container 

```sh
docker  run -d --name vol-demo --mount source=myvolsrc,target=/myvol  sangam14/vol-dockerfile  tail -f /dev/null
```
#### exec into running container 

```sh
 Dockerfile git:(main) ✗ docker container exec vol-demo ls -l /myvol
total 4
-rw-r--r--    1 root     root            12 Mar  2 19:47 greeting

```
#### check it out mount point using docker inspect 

```sh

docker volume inspect myvolsrc -f "{{.Mountpoint}}"
```

#### stop running container 

```sh
docker container stop vol-demo
```
#### remove container 

```sh
docker container rm vol-demo

```
#### remove volume 

```sh
docker volume rm myvolsrc
```
#### verify once 

```sh
docker volume ls
docker container ls
```

# Dockerfile USER


cat dockerfile.user

```Dockerfile
FROM alpine
USER dockerworkshop:dockerworkshop
CMD ["sh"]

```

#### build dockerfile 

```sh
docker build -t sangam14/user-dockerfile  -f dockerfile.user .
[+] Building 0.1s (5/5) FINISHED                                                                                                                           
 => [internal] load build definition from dockerfile.user                                                                                             0.0s
 => => transferring dockerfile: 105B                                                                                                                  0.0s
 => [internal] load .dockerignore                                                                                                                     0.0s
 => => transferring context: 2B                                                                                                                       0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                                      0.0s
 => CACHED [1/1] FROM docker.io/library/alpine                                                                                                        0.0s
 => exporting to image                                                                                                                                0.0s
 => => exporting layers                                                                                                                               0.0s
 => => writing image sha256:48482459d09aecafaa0db190d6995b6d2339c0383c6cd97fafbea288124332c7                                                          0.0s
 => => naming to docker.io/sangam14/user-dockerfile  

```

#### run docker container in detach mode 

```sh
docker container run -d sangam14/user-dockerfile 
5880a92a14d3944a4be00a19d55a19dd941f0c1b9a7a7b9159febcc29a09ea98

```

If we check the owner of the sleep process on the host, we can see it belongs to the user with uid 1000, the one that is created in the image


```sh
ps aux | grep sleep
sangambiradar    22103   0.0  0.0 408111776   1168 s000  S+    2:03AM   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox sleep

```

# Dockerfile HEALTHCHECK



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


# Dockerfile ENV



cat dockerfile 

```dockerfile
FROM alpine
ENV appDescription This app is a sample of using ENV instructions
ENV appName=env-demo
ENV note1="The First Note First" note2=The\ Second\ Note\ Second \
	note3="The Third Note Third"
ENV changeMe="Old Value"
CMD ["sh"]


```

#### build dockerfile 

```sh

➜  Dockerfile git:(main) ✗ docker build -t sangam14/env-dockerfile  -f dockerfile.env .
[+] Building 0.1s (5/5) FINISHED                                                                                                                  
 => [internal] load build definition from dockerfile.env                                                                                     0.0s
 => => transferring dockerfile: 279B                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                             0.0s
 => CACHED [1/1] FROM docker.io/library/alpine                                                                                               0.0s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:6f9741e9b952495e61c515945c4acd85d85aef1e631b7d37c348c26e9f5d216d                                                 0.0s
 => => naming to docker.io/sangam14/env-dockerfile                                                                                           0.0s

```

### inspect Env Config 

```sh
docker image inspect --format '{{json .Config}}' sangam14/env-dockerfile  | jq '.Env'
[
  "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
  "appDescription=This app is a sample of using ENV instructions",
  "appName=env-demo",
  "note1=The First Note First",
  "note2=The Second Note Second",
  "note3=The Third Note Third",
  "changeMe=Old Value"
]

```
#### change envirmonment variable 

```sh

docker  run --rm --env changeMe="New Value" --env adhoc="run time"   sangam14/env-dockerfile   env 
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=12804862fac4
changeMe=New Value
adhoc=run time
appDescription=This app is a sample of using ENV instructions
appName=env-demo
note1=The First Note First
note2=The Second Note Second
note3=The Third Note Third
HOME=/root

```

# Dockerfile ONBUILD


#### The ONBUILD instruction

The ONBUILD instruction is a trigger. It sets instructions that will be executed when another image is built from the image being build.

This is useful for building images which will be used as a base to build other images.

```sh
ONBUILD COPY . /src

```

You can't chain ONBUILD instructions with ONBUILD.
ONBUILD can't be used to trigger FROM instructions.


```Dockerfile
FROM nginx:1.16-alpine
WORKDIR /usr/share/nginx/html
ONBUILD COPY index.html . 
```

#### build dockerfile 

```sh
docker build -t sangam14/onbuild-dockerfile  -f dockerfile.onbuild .
[+] Building 5.8s (7/7) FINISHED                                                                                                                  
 => [internal] load build definition from dockerfile.onbuild                                                                                 0.0s
 => => transferring dockerfile: 129B                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/nginx:1.16-alpine                                                                         3.3s
 => [auth] library/nginx:pull token for registry-1.docker.io                                                                                 0.0s
 => [1/2] FROM docker.io/library/nginx:1.16-alpine@sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad                   2.4s
 => => resolve docker.io/library/nginx:1.16-alpine@sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad                   0.0s
 => => sha256:f07e4bcf42b862c240f4c00f2f7ed362d7d93ca15151de547beda593f3b669e5 2.72MB / 2.72MB                                               0.8s
 => => sha256:078902f02c3a797288251014301298bd748886eaf5fc107e128cc1b4933ec57d 6.25MB / 6.25MB                                               2.1s
 => => sha256:5057451e461dda671da5e951019ddbff9d96a751fc7d548053523ca1f848c1ad 1.41kB / 1.41kB                                               0.0s
 => => sha256:75a7ebf15c39feb30c0444c1ab8d585fe490c35dca30c337e06b73c55fb0e30f 739B / 739B                                                   0.0s
 => => sha256:c3144a54094d9628d01573952dfc7b580a76f2a3570f72b8900df676a697c1bb 6.98kB / 6.98kB                                               0.0s
 => => extracting sha256:f07e4bcf42b862c240f4c00f2f7ed362d7d93ca15151de547beda593f3b669e5                                                    0.1s
 => => extracting sha256:078902f02c3a797288251014301298bd748886eaf5fc107e128cc1b4933ec57d                                                    0.3s
 => [2/2] WORKDIR /usr/share/nginx/html                                                                                                      0.0s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:8fc6b719b70ed34467487519cca45523b18eb6f394187d50b08f5157b495efe4                                                 0.0s
 => => naming to docker.io/sangam14/onbuild-dockerfile                                                                                       0.0s
 ```


### create another dockerfile 

```Dockerfile
From sangam14/onbuild-dockerfile     
COPY index.html . 

```
#### here you will see default ngnix index page 

```sh
 docker run -p 80:80 sangam14/onbuild-dockerfile   

 ```

#### build docker file 

```sh

docker build -t sangam14/onbuild1-dockerfile  -f dockerfile.onbuild1 .
[+] Building 0.1s (8/8) FINISHED                                                                                                              
 => [internal] load build definition from dockerfile.onbuild1                                                                            0.0s
 => => transferring dockerfile: 107B                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                        0.0s
 => => transferring context: 2B                                                                                                          0.0s
 => [internal] load metadata for docker.io/sangam14/onbuild-dockerfile:latest                                                            0.0s
 => [internal] load build context                                                                                                        0.0s
 => => transferring context: 32B                                                                                                         0.0s
 => [1/2] FROM docker.io/sangam14/onbuild-dockerfile                                                                                     0.0s
 => [2/2] COPY index.html .                                                                                                              0.0s
 => [3/2] COPY index.html .                                                                                                              0.0s
 => exporting to image                                                                                                                   0.0s
 => => exporting layers                                                                                                                  0.0s
 => => writing image sha256:c2291a76ea7cf76b5449ad476d47880b3c5b1bf0119cf7d1fe54111f88db2157                                             0.0s
 => => naming to docker.io/sangam14/onbuild1-dockerfile     
```

above container copied index.html form local 

```sh
docker run -p 80:80 sangam14/onbuild1-dockerfile  
```

## Multi-Container CLI 


#### We will create two containers (linux1, linux2) based on the same image (ubuntu)

```sh
docker run -it -d --rm --name linux1 ubuntu /bin/bash

```
additional flags:
`-d`starts the container as “detached”. Use “docker attach” to attach to it later on.
`--rm` cleans up the container after stopping. The container will be removed, basically the same as “docker rm container_identifier” after stopping the container. So everything is kept tidy.
`--name` will give the container a dedicated name, which makes it easier to address the container later on.


#### Creates container “linux2”

```sh
docker run -it -d --rm --name linux2 ubuntu /bin/bash
```
#### Attaches to container linux1
```sh
> docker attach linux1
```
#### Creates a new directory on container linux1
```sh
> ls
> mkdir mylinux1
```
####  Shows that “mylinux1” was created

```sh
> ls

```
#### Attaches to container linux2

```sh
>  docker attach linux2

```
 Shows that the directory of linux2 is different than linux1, although they are both from the same image “ubuntu”
 They are separated, they don’t share their file-system
The bash process is isolated in the container

```sh

> ls

```
```sh
> exit
```
Shows only one container which is running, the other one got removed
```sh
>  docker ps -a

```

# Docker Compose Basics



cat Dockerfile 

```dockerfile
FROM php:7.2-apache
COPY index.php /var/www/html

```

add index.php file  

```php
<?php

echo "hello world \n\n";
```

creat docker-compose.yaml 

```yml
version: '3'
services:
  phpapp:
    ports:
      - "8080:80"
    build:
      context: ./
      dockerfile: Dockerfile

```

to run docker compose 

```sh

docker compose up --build
```

output 

```sh
 1-DC git:(main) ✗ docker compose up 
[+] Building 21.2s (10/10) FINISHED                                                                                                                         
 => [internal] booting buildkit                                                                                                                        3.8s
 => => pulling image moby/buildkit:buildx-stable-1                                                                                                     2.8s
 => => creating container buildx_buildkit_great_brahmagupta0                                                                                           1.1s
 => [internal] load build definition from Dockerfile                                                                                                   0.0s
 => => transferring dockerfile: 85B                                                                                                                    0.0s
 => [internal] load .dockerignore                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                        0.0s
 => [internal] load metadata for docker.io/library/php:7.2-apache                                                                                      4.3s
 => [auth] library/php:pull token for registry-1.docker.io                                                                                             0.0s
 => [internal] load build context                                                                                                                      0.0s
 => => transferring context: 67B                                                                                                                       0.0s
 => [1/2] FROM docker.io/library/php:7.2-apache@sha256:4dc0f0115acf8c2f0df69295ae822e49f5ad5fe849725847f15aa0e5802b55f8                                8.3s
 => => resolve docker.io/library/php:7.2-apache@sha256:4dc0f0115acf8c2f0df69295ae822e49f5ad5fe849725847f15aa0e5802b55f8                                0.0s
 => => sha256:9639d8c8cc76eb6501b4135a054c1a85bd7397db1010d043bcc03d32bf6d79b6 895B / 895B                                                             0.5s
 => => sha256:119f7607f913c50661a95311027b7b944c7bf2ee9e7af5361a14b72ce4d36b34 247B / 247B                                                             0.3s
 => => sha256:c5ff78edaefc7917757ec4e434738d5561d016bedd20ebdeeee362ec53c8d200 2.27kB / 2.27kB                                                         0.6s
 => => sha256:1c04bb0b5fbe7c2927e6282625ccf4c5e0399e9da46f4a84bb8072dc98add6e5 214B / 214B                                                             0.5s
 => => sha256:709f68bc1d50527b9d9de50c516cb337468feb59c6135b414dda628d902a1bc8 13.52MB / 13.52MB                                                       3.2s
 => => sha256:9e92e56de9f5b0243dc28d80127f51f9f773d64ce4ae1ad58cfff06c2dcd4c29 494B / 494B                                                             0.8s
 => => sha256:485201b000c7ca5a73c2f9d047a204442ea5871a8a1405809d623884d83afc05 12.65MB / 12.65MB                                                       0.9s
 => => sha256:28135fd83ed1ac66e6f4288fabe4c84616cfe420e8e6808ba92d052771325ab4 517B / 517B                                                             0.5s
 => => sha256:5543a36f8eed548f436944bf39a2e918115fc9b30b54416c1081566f25716010 475B / 475B                                                             0.6s
 => => sha256:8d436d7bb0262f042a9554b5c54b25bc1d19cabbb9435747672c34d12f8dc1d0 18.58MB / 18.58MB                                                       1.5s
 => => sha256:c17a0a78e91d3ac0ec4a0c0566f57580154ead8d8967258efe94989d86cd05bd 269B / 269B                                                             1.4s
 => => sha256:30eb7a300f132babe7d5ed65f9e81a1fdd4542ecf70ac29a91bc290484dbc5e5 70.34MB / 70.34MB                                                       3.2s
 => => sha256:c9648d7fcbb6d597cf33916d8fcd207fde8ec05d764b4480d4f3e884e142a902 25.86MB / 25.86MB                                                       3.1s
 => => sha256:f88cecc04e76783f0006b9fed72be749e834825383e941e16de2565a0e4a8cc3 229B / 229B                                                             0.5s
 => => extracting sha256:c9648d7fcbb6d597cf33916d8fcd207fde8ec05d764b4480d4f3e884e142a902                                                              0.6s
 => => extracting sha256:f88cecc04e76783f0006b9fed72be749e834825383e941e16de2565a0e4a8cc3                                                              0.0s
 => => extracting sha256:30eb7a300f132babe7d5ed65f9e81a1fdd4542ecf70ac29a91bc290484dbc5e5                                                              1.2s
 => => extracting sha256:c17a0a78e91d3ac0ec4a0c0566f57580154ead8d8967258efe94989d86cd05bd                                                              0.0s
 => => extracting sha256:8d436d7bb0262f042a9554b5c54b25bc1d19cabbb9435747672c34d12f8dc1d0                                                              0.2s
 => => extracting sha256:5543a36f8eed548f436944bf39a2e918115fc9b30b54416c1081566f25716010                                                              0.0s
 => => extracting sha256:28135fd83ed1ac66e6f4288fabe4c84616cfe420e8e6808ba92d052771325ab4                                                              0.0s
 => => extracting sha256:485201b000c7ca5a73c2f9d047a204442ea5871a8a1405809d623884d83afc05                                                              0.1s
 => => extracting sha256:9e92e56de9f5b0243dc28d80127f51f9f773d64ce4ae1ad58cfff06c2dcd4c29                                                              0.0s
 => => extracting sha256:709f68bc1d50527b9d9de50c516cb337468feb59c6135b414dda628d902a1bc8                                                              0.2s
 => => extracting sha256:c5ff78edaefc7917757ec4e434738d5561d016bedd20ebdeeee362ec53c8d200                                                              0.0s
 => => extracting sha256:119f7607f913c50661a95311027b7b944c7bf2ee9e7af5361a14b72ce4d36b34                                                              0.0s
 => => extracting sha256:1c04bb0b5fbe7c2927e6282625ccf4c5e0399e9da46f4a84bb8072dc98add6e5                                                              0.0s
 => => extracting sha256:9639d8c8cc76eb6501b4135a054c1a85bd7397db1010d043bcc03d32bf6d79b6                                                              0.0s
 => [2/2] COPY index.php /var/www/html                                                                                                                 0.3s
 => exporting to docker image format                                                                                                                   4.3s
 => => exporting layers                                                                                                                                0.0s
 => => exporting manifest sha256:4389df930ccac33c104717e827e5a6dc3de4ef60632784ca9ea76806b1bf88b7                                                      0.0s
 => => exporting config sha256:bcbc4a7a409f828a025ca857acb752536f4cece24a93121e6a920e0c4d60050f                                                        0.0s
 => => sending tarball                                                                                                                                 4.2s
 => importing to docker                                                                                                                                2.7s
[+] Running 2/2
 ⠿ Network 1-dc_default     Created                                                                                                                    0.1s
 ⠿ Container 1-dc-phpapp-1  Created                                                                                                                    0.3s
Attaching to 1-dc-phpapp-1
1-dc-phpapp-1  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.18.0.2. Set the 'ServerName' directive globally to suppress this message
1-dc-phpapp-1  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.18.0.2. Set the 'ServerName' directive globally to suppress this message
1-dc-phpapp-1  | [Fri Mar 03 00:44:20.034230 2023] [mpm_prefork:notice] [pid 1] AH00163: Apache/2.4.38 (Debian) PHP/7.2.34 configured -- resuming normal operations
1-dc-phpapp-1  | [Fri Mar 03 00:44:20.034331 2023] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
1-dc-phpapp-1  | 172.18.0.1 - - [03/Mar/2023:00:44:54 +0000] "GET / HTTP/1.1" 200 244 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
1-dc-phpapp-1  | 172.18.0.1 - - [03/Mar/2023:00:44:54 +0000] "GET /favicon.ico HTTP/1.1" 404 489 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
1-dc-phpapp-1  | 172.18.0.1 - - [03/Mar/2023:00:45:02 +0000] "GET / HTTP/1.1" 200 244 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
¸


```

#### open browser 

```sh
http://localhost:8080

```

# Compose Volume Mount


#### Lets build docker compose file 

```yml
version: '3'
services:
  phpapp:
    image: php:7.2-apache
    ports:
      - "8080:80"
    volumes:
      - "./:/var/www/html"
```

above when we do docker compose up it will start apache with php 7.2 
it will mount corrent directory to `/var/www/html`
also it mount port 80 of the container to port 8080 on the host 


#### create index.php with following content  

```php
<?php

echo "hello world \n\n";
```

#### run with docker compose 

```sh
2-DC-Vol-Mount git:(main) ✗ docker compose up
[+] Running 15/15
 ⠿ phpapp Pulled                                                                                    13.2s
   ⠿ c9648d7fcbb6 Pull complete                                                                      3.1s
   ⠿ f88cecc04e76 Pull complete                                                                      3.1s
   ⠿ 30eb7a300f13 Pull complete                                                                      5.1s
   ⠿ c17a0a78e91d Pull complete                                                                      5.1s
   ⠿ 8d436d7bb026 Pull complete                                                                      5.6s
   ⠿ 5543a36f8eed Pull complete                                                                      5.7s
   ⠿ 28135fd83ed1 Pull complete                                                                      5.7s
   ⠿ 485201b000c7 Pull complete                                                                      5.8s
   ⠿ 9e92e56de9f5 Pull complete                                                                      5.9s
   ⠿ 709f68bc1d50 Pull complete                                                                      8.3s
   ⠿ c5ff78edaefc Pull complete                                                                      8.3s
   ⠿ 119f7607f913 Pull complete                                                                      8.4s
   ⠿ 1c04bb0b5fbe Pull complete                                                                      8.4s
   ⠿ 9639d8c8cc76 Pull complete                                                                      8.4s
[+] Running 2/1
 ⠿ Network 2-dc-vol-mount_default     Created                                                        0.1s
 ⠿ Container 2-dc-vol-mount-phpapp-1  Created                                                        0.1s
Attaching to 2-dc-vol-mount-phpapp-1
```

#### open localhost 8080 

http://localhost:8080 


# Custom Dockerfile with Compose


#### Build Own Dockerfile and Docker Compose with Custom configuration


crate docker compose file with following content 

```Dockerfile 
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
    container_name: my-php-app

```

- here using dockerfile to generate an image 
- mount folder inside your directory automatically 

#### create index.php with following content 
```php 
<?php

phpinfo();

```

#### build docker compose file 

```bash
 3-DC-Custom git:(main) ✗ docker compose up 
[+] Running 0/1
 ⠿ phpapp Warning                                                    3.5s
[+] Building 6.4s (7/7) FINISHED                                          
 => [internal] load .dockerignore                                    0.0s
 => => transferring context: 2B                                      0.0s
 => [internal] load build definition from Dockerfile.1               0.0s
 => => transferring dockerfile: 58B                                  0.0s
 => [internal] load metadata for docker.io/library/php:7.2-apache    4.7s
 => [auth] library/php:pull token for registry-1.docker.io           0.0s
 => CACHED [1/1] FROM docker.io/library/php:7.2-apache@sha256:4dc0f  0.0s
 => => resolve docker.io/library/php:7.2-apache@sha256:4dc0f0115acf  0.0s
 => exporting to docker image format                                 1.7s
 => => exporting layers                                              0.0s
 => => exporting manifest sha256:0ba34bb4f00dd5ff9830453180af98fe10  0.0s
 => => exporting config sha256:a1c8ee68f9b1abcb72605f5bf0eee69dbf23  0.0s
 => => sending tarball                                               1.6s
 => importing to docker                                              0.0s
[+] Running 2/2
 ⠿ Network 3-dc-custom_default  Cre...                               0.1s
 ⠿ Container my-php-app         Created                              0.1s
Attaching to my-php-app


```

#### check it out localhost 80 


http://localhost:8080


update your existing Dockerfile with following content 

```dockerfile 
FROM php:7.2-apache

RUN apt-get -y update \
&& apt-get install -y libicu-dev \ 
&& docker-php-ext-configure intl \
&& docker-php-ext-install intl

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli


```

update existing docker-compose.yml 

```bash
version: '3'
services:
  phpapp:
    build:
      context: ./
      dockerfile: Dockerfile.2
    image: phpapp:123
    ports:
      - "8080:80"
    volumes:
      - "./:/var/www/html"
    container_name: my-php-app

```

#### rebuild docker compose 

```sh
3-DC-Custom git:(main) ✗ docker compose up --build
[+] Building 43.1s (9/9) FINISHED                                         
 => [internal] load .dockerignore                                    0.0s
 => => transferring context: 2B                                      0.0s
 => [internal] load build definition from Dockerfile.2               0.0s
 => => transferring dockerfile: 255B                                 0.0s
 => [internal] load metadata for docker.io/library/php:7.2-apache    2.3s
 => [auth] library/php:pull token for registry-1.docker.io           0.0s
 => CACHED [1/3] FROM docker.io/library/php:7.2-apache@sha256:4dc0f  0.0s
 => => resolve docker.io/library/php:7.2-apache@sha256:4dc0f0115acf  0.0s
 => [2/3] RUN apt-get -y update && apt-get install -y libicu-dev &  28.9s
 => [3/3] RUN docker-php-ext-install mysqli && docker-php-ext-enabl  6.9s
 => exporting to docker image format                                 4.9s 
 => => exporting layers                                              2.3s 
 => => exporting manifest sha256:ee6a98e1847d8149754239ab5be0cad310  0.0s 
 => => exporting config sha256:2800277bcab2cb605936b4f874bff2c8251d  0.0s 
 => => sending tarball                                               2.6s 
 => importing to docker                                              0.5s 
[+] Running 1/1
 ⠿ Container my-php-app  Recreated                                   0.1s
Attaching to my-php-app
my-php-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.22.0.2. Set the 'ServerName' directive globally to suppress this message
my-php-app  | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.22.0.2. Set the 'ServerName' directive globally to suppress this message
my-php-app  | [Fri Mar 03 11:55:09.580207 2023] [mpm_prefork:notice] [pid 1] AH00163: Apache/2.4.38 (Debian) PHP/7.2.34 configured -- resuming normal operations
my-php-app  | [Fri Mar 03 11:55:09.580274 2023] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
my-php-app  | 172.22.0.1 - - [03/Mar/2023:11:55:14 +0000] "GET /mysql HTTP/1.1" 404 490 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
my-php-app  | 172.22.0.1 - - [03/Mar/2023:11:55:19 +0000] "GET / HTTP/1.1" 200 23831 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15"
¸^CGracefully stopping... (press Ctrl+C again to force)
Aborting on container exit...
[+] Running 1/1
 ⠿ Container my-php-app  Stopped                                     1.2s
canceled


```

# PHP, Apache, and DB with Compose


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


# Host Volume Mount

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

# Named Volume Mount


### create volume 

```sh
 6-DC-name-volume git:(main) ✗ docker volume create --name my-vol 
my-vol
```


#### create docker-compose.yml with following content 

```yml
version: '3.7'

services:
  db:
    image: mysql:latest
    restart: always
    container_name: myphpapp-db
    environment:
       MYSQL_ROOT_PASSWORD: somepass
       MYSQL_DATABASE: somedatabase
    volumes:
      - my-vol:/var/lib/mysql

volumes:
  my-vol:
    name: my-vol
```

#### run docker compose 

```sh

docker compose up -d 
WARN[0000] volume "my-vol" already exists but was not created by Docker Compose. Use `external: true` to use an existing volume 
[+] Running 1/1
 ⠿ Container myphpapp-db  Started                                                                         0.3s
➜  6-DC-name-volume git:(main) ✗ 

```
#### start new container with ubuntu 
```sh
docker run -v my-vol:/mydata --rm -it ubuntu /bin/bash
```

show the database data files 

```sh
root@1666e5d6f315:/# cd mydata/
root@1666e5d6f315:/mydata# ls
'#ib_16384_0.dblwr'   binlog.000001   client-cert.pem   mysql                public_key.pem    undo_001
'#ib_16384_1.dblwr'   binlog.000002   client-key.pem    mysql.ibd            server-cert.pem   undo_002
'#innodb_redo'        binlog.index    ib_buffer_pool    mysql.sock           server-key.pem
'#innodb_temp'        ca-key.pem      ibdata1           performance_schema   somedatabase
 auto.cnf             ca.pem          ibtmp1            private_key.pem      sys
root@1666e5d6f315:/mydata# 
root@1666e5d6f315:/mydata# exit 
exit
```

### share data between two containers? lets try ?

```sh
6-DC-name-volume git:(main) ✗ docker volume create --name Datastore1
Datastore1
```
#### open a shell woth datastore1 in /mydatabase
```sh
docker run -v Datastore1:/mydatastore --rm -it ubuntu /bin/bash
```
#### write a new text file 

```sh
echo "hello datastore1" > /mydatastore/hello.txt
root@4b119677c00b:/# ls
bin  boot  dev  etc  home  lib  media  mnt  mydatastore  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@4b119677c00b:/# cat  mydatastore/hello.txt 
hello datastore1
root@4b119677c00b:/# 

```

#### add another line 

```sh
root@4b119677c00b:/# echo "\n\nhello datastore 2" >> /mydatastore/hello.txt
root@4b119677c00b:/# cat  mydatastore/hello.txt 
hello datastore1
\n\nhello datastore 2
root@4b119677c00b:/# 
```


# Compose Build Command


### Docker Compose Build Command

```sh
docker compose build [OPTIONS] [SERVICE...]

```

If you change a service’s Dockerfile or the contents of its build directory, run docker compose build to rebuild it.

`--build-arg`		Set build-time variables for services.<br>
`--no-cache	`	Do not use cache when building the image
`--progress	auto`	Set type of progress output (auto, tty, plain, quiet)  .<br>
`--pull	`	Always attempt to pull a newer version of the image..<br>
`--push	`	Push service images..<br>
`--quiet , -q`		Don’t print anything to STDOUT.<br>
`--ssh	`	Set SSH authentications used when building .service images. (use ‘default’ for using your default SSH Agent)


#### create dockerfile with following content 


```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]

```

create app.py with following content 


```python
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)


```

#### create requirements.txt  with following content 


```txt
flask
redis

```

create docker-compose.yml with following content 

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

### docker compose build 

```sh

 7-DC-CLI git:(main) ✗ docker compose build 
[+] Building 27.1s (15/15) FINISHED                                                                                   
 => [internal] booting buildkit                                                                                  0.5s
 => => starting container buildx_buildkit_great_brahmagupta0                                                     0.5s
 => [internal] load build definition from Dockerfile                                                             0.0s
 => => transferring dockerfile: 319B                                                                             0.0s
 => [internal] load .dockerignore                                                                                0.0s
 => => transferring context: 2B                                                                                  0.0s
 => resolve image config for docker.io/docker/dockerfile:1                                                       3.8s
 => docker-image://docker.io/docker/dockerfile:1@sha256:39b85bbfa7536a5feceb7372a0817649ecb2724562a38360f4d6a77  3.1s
 => => resolve docker.io/docker/dockerfile:1@sha256:39b85bbfa7536a5feceb7372a0817649ecb2724562a38360f4d6a7782a4  0.0s
 => => sha256:9d0cd65540a143ce38aa0be7c5e9efeed30d3580d03667f107cd76354f2bee65 10.82MB / 10.82MB                 3.0s
 => => extracting sha256:9d0cd65540a143ce38aa0be7c5e9efeed30d3580d03667f107cd76354f2bee65                        0.1s
 => [internal] load metadata for docker.io/library/python:3.7-alpine                                             3.6s
 => [1/6] FROM docker.io/library/python:3.7-alpine@sha256:c9c2d6f97a00b211def3818830883495417e3b1fd34783ce6135c  3.9s
 => => resolve docker.io/library/python:3.7-alpine@sha256:c9c2d6f97a00b211def3818830883495417e3b1fd34783ce6135c  0.0s
 => => sha256:57a125a213d772ab0750422ad92f1cc7d1d97e0b09ad4ed766d9cd50db8e2b50 2.88MB / 2.88MB                   1.9s
 => => sha256:2bd7dfc9c660f2a9be2e537fd8f7f3c289ea1ba335c957472bd9a51630c9b449 230B / 230B                       0.6s
 => => sha256:6b1178b7c6752e0d2eb293ee14286ec1f75d0f868d9826bcaba24fe33affea99 11.01MB / 11.01MB                 3.0s
 => => sha256:cdba2f6867522ee9d2e8dcc9b1ad3ec5bafe75da976a3e613ff26cbc98738b48 624.86kB / 624.86kB               3.5s
 => => sha256:af6eaf76a39c2d3e7e0b8a0420486e3df33c4027d696c076a99a3d0ac09026af 3.26MB / 3.26MB                   0.6s
 => => extracting sha256:af6eaf76a39c2d3e7e0b8a0420486e3df33c4027d696c076a99a3d0ac09026af                        0.1s
 => => extracting sha256:cdba2f6867522ee9d2e8dcc9b1ad3ec5bafe75da976a3e613ff26cbc98738b48                        0.1s
 => => extracting sha256:6b1178b7c6752e0d2eb293ee14286ec1f75d0f868d9826bcaba24fe33affea99                        0.2s
 => => extracting sha256:2bd7dfc9c660f2a9be2e537fd8f7f3c289ea1ba335c957472bd9a51630c9b449                        0.0s
 => => extracting sha256:57a125a213d772ab0750422ad92f1cc7d1d97e0b09ad4ed766d9cd50db8e2b50                        0.1s
 => [internal] load build context                                                                                0.0s
 => => transferring context: 1.08kB                                                                              0.0s
 => [2/6] WORKDIR /code                                                                                          0.1s
 => [3/6] RUN apk add --no-cache gcc musl-dev linux-headers                                                      3.1s
 => [4/6] COPY requirements.txt requirements.txt                                                                 0.0s
 => [5/6] RUN pip install -r requirements.txt                                                                    3.1s
 => [6/6] COPY . .                                                                                               0.0s
 => exporting to docker image format                                                                             5.6s
 => => exporting layers                                                                                          3.4s
 => => exporting manifest sha256:198e97700c3c0f4a28b481ceacda99d7dacf2c8f42c86f7f4ffd6e5094098322                0.0s
 => => exporting config sha256:dba54b65e3daa61d0ce759dc20145718068c33daf2eaf908c03e03934024df88                  0.0s
 => => sending tarball                                                                                           2.2s
 => importing to docker                                                                                          1.4s
➜  7-DC-CLI git:(main) ✗ 


```

# Compose Config Command

#### create dockerfile with following content 


```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]

```

#### create app.py with following content 


```python
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)


```

#### create requirements.txt fil with following content 


```sh
flask
redis

```

#### create docker-compose.yml with following content 

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

### docker compose config 

```sh
7-DC-CLI git:(main) ✗ docker compose config 
name: 7-dc-cli
services:
  redis:
    image: redis:alpine
    networks:
      default: null
  web:
    build:
      context: /Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/7-DC-CLI
      dockerfile: Dockerfile
    networks:
      default: null
    ports:
    - mode: ingress
      target: 5000
      published: "8000"
      protocol: tcp
networks:
  default:
    name: 7-dc-cli_default
```

# Compose CP Command


### Copy files/folders between a service container and the local filesystem

```sh
# Syntax to Copy from Container to Docker Host  
docker cp {options} CONTAINER:SRC_PATH DEST_PATH 
# Syntax to Copy from Docker Host to Container  
docker cp {options} SRC_PATH CONTAINER:DEST_PATH 

```

#### lets run ngnix container 

```yml
version: '3'
services:
  web:
    image: nginx:latest

```

#### run docker compose up 

```sh
docker compose -f docker-compose-ngnix.yml up 

```

### check running container  

```sh
➜  dockerworkshop git:(main) ✗ docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS              PORTS     NAMES
008940fdbed8   nginx:latest                    "/docker-entrypoint.…"   29 seconds ago       Up 28 seconds       80/tcp    7-dc-cli-web-1
```

### create index.html

```sh

 Docker-Compose git:(main) ✗ cd 7-DC-CLI 
➜  7-DC-CLI git:(main) ✗ ls
Dockerfile               app.py                   docker-compose-ngnix.yml docker-compose.yml       index.html               requirements.txt         src
```
### copy index.html

```sh
$ docker-compose cp index.html web:/usr/share/nginx/html/

```


```
services:
  web:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    command: nginx-debug -g 'daemon off;'
    copy:
      - ./index.html:/usr/share/nginx/html/index.html
```

```
services:
  web:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    command: nginx-debug -g 'daemon off;'
    copy:
      - ./index.html:/usr/share/nginx/html/index.html
      - ./style.css:/usr/share/nginx/html/style.css
      - ./images:/usr/share/nginx/html/images
```      

# Compose Create Command


### create docker-compose.yml with following content 

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"

```


### Creates containers for a service.

```sh
➜  7-DC-CLI git:(main) ✗ docker compose create 
[+] Running 7/7
 ⠿ redis Pulled                                                                                                                                                                      6.1s
   ⠿ af6eaf76a39c Already exists                                                                                                                                                     0.0s
   ⠿ 5015c79ed515 Pull complete                                                                                                                                                      0.9s
   ⠿ 2ca28624189f Pull complete                                                                                                                                                      1.0s
   ⠿ 4691452befb1 Pull complete                                                                                                                                                      1.6s
   ⠿ 746fa87aff8c Pull complete                                                                                                                                                      2.1s
   ⠿ b8496ad2d107 Pull complete                                                                                                                                                      2.2s
WARN[0006] Found orphan containers ([7-dc-cli-client-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
[+] Running 2/2
 ⠿ Container 7-dc-cli-redis-1  Created                                                                                                                                               0.1s
 ⠿ Container 7-dc-cli-web-1    Recreated                                                                                                                                             0.1s
➜  7-DC-CLI git:(main) ✗ 

```

# Compose Down Command 


### create docker-compose.yml with following content 

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"

```


### Create docker compose up 

```sh

 docker compose up 
WARN[0000] Found orphan containers ([7-dc-cli-client-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
Attaching to 7-dc-cli-redis-1, 7-dc-cli-web-1
7-dc-cli-redis-1  | 1:C 04 Mar 2023 14:23:46.156 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
7-dc-cli-redis-1  | 1:C 04 Mar 2023 14:23:46.156 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
7-dc-cli-redis-1  | 1:C 04 Mar 2023 14:23:46.156 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
7-dc-cli-redis-1  | 1:M 04 Mar 2023 14:23:46.157 * monotonic clock: POSIX clock_gettime
7-dc-cli-redis-1  | 1:M 04 Mar 2023 14:23:46.158 * Running mode=standalone, port=6379.
7-dc-cli-redis-1  | 1:M 04 Mar 2023 14:23:46.158 # Server initialized
7-dc-cli-redis-1  | 1:M 04 Mar 2023 14:23:46.160 * Ready to accept connections
7-dc-cli-web-1    |  * Serving Flask app 'app.py'
7-dc-cli-web-1    |  * Debug mode: off
7-dc-cli-web-1    | WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
7-dc-cli-web-1    |  * Running on all addresses (0.0.0.0)
7-dc-cli-web-1    |  * Running on http://127.0.0.1:5000
7-dc-cli-web-1    |  * Running on http://172.18.0.3:5000
7-dc-cli-web-1    | Press CTRL+C to quit


```

### Create docker compose Down  

```sh
 7-DC-CLI git:(main) ✗ docker compose down 
[+] Running 3/3
 ⠿ Container 7-dc-cli-redis-1  Removed                                                                                                                                               0.2s
 ⠿ Container 7-dc-cli-web-1    Removed                                                                                                                                              10.2s
 ⠿ Network 7-dc-cli_default    Removed                                                                                                                                               0.1s
➜  7-DC-CLI git:(main) ✗ 


```

# Compose Events Command 


#### here is sample voting app 

```sh
cat docker-compose.yml 
# version is now using "compose spec"
# v2 and v3 are now combined!
# docker-compose v1.27+ required

services:
  vote:
    build: ./vote
    # use python rather than gunicorn for local dev
    command: python app.py
    depends_on:
      redis:
        condition: service_healthy
    healthcheck: 
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 10s
    volumes:
     - ./vote:/app
    ports:
      - "5000:80"
    networks:
      - front-tier
      - back-tier

  result:
    build: ./result
    # use nodemon rather than node for local dev
    entrypoint: nodemon server.js
    depends_on:
      db:
        condition: service_healthy 
    volumes:
      - ./result:/app
    ports:
      - "5001:80"
      - "5858:5858"
    networks:
      - front-tier
      - back-tier

  worker:
    build:
      context: ./worker
    depends_on:
      redis:
        condition: service_healthy 
      db:
        condition: service_healthy 
    networks:
      - back-tier

  redis:
    image: redis:alpine
    volumes:
      - "./healthchecks:/healthchecks"
    healthcheck:
      test: /healthchecks/redis.sh
      interval: "5s"
    networks:
      - back-tier

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"
    volumes:
      - "db-data:/var/lib/postgresql/data"
      - "./healthchecks:/healthchecks"
    healthcheck:
      test: /healthchecks/postgres.sh
      interval: "5s"
    networks:
      - back-tier

  # this service runs once to seed the database with votes
  # it won't run unless you specify the "seed" profile
  # docker compose --profile seed up -d
  seed:
    build: ./seed-data
    profiles: ["seed"]
    depends_on:
      vote:
        condition: service_healthy 
    networks:
      - front-tier
    restart: "no"

volumes:
  db-data:

networks:
  front-tier:
  back-tier:




```


#### Docker Compose up 

```sh
example-voting-app git:(main) docker compose up
[+] Running 9/9
 ⠿ db Pulled                                                                                                                                                                         9.7s
   ⠿ af6eaf76a39c Already exists                                                                                                                                                     0.0s
   ⠿ 71286d2ce0cc Pull complete                                                                                                                                                      1.7s
   ⠿ b82afe47906a Pull complete                                                                                                                                                      1.8s
   ⠿ 75d514bb4aa7 Pull complete                                                                                                                                                      5.6s
   ⠿ 217da6f41d9e Pull complete                                                                                                                                                      5.7s
   ⠿ 39a3f4823126 Pull complete                                                                                                                                                      5.7s
   ⠿ ed6571a6afcc Pull complete                                                                                                                                                      5.8s
   ⠿ 8ae7d38f54c4 Pull complete                                                                                                                                                      5.8s
[+] Building 36.2s (42/42) FINISHED                                                                                                                                                       
 => [example-voting-app-result internal] load .dockerignore                                                                                                                          0.0s
 => => transferring context: 54B                                                                                                                                                     0.0s
 => [example-voting-app-result internal] load build definition from Dockerfile                                                                                                       0.0s
 => => transferring dockerfile: 517B                                                                                                                                                 0.0s
 => [example-voting-app-result internal] load metadata for docker.io/library/node:18-slim                                                                                            5.1s
 => [example-voting-app-vote internal] load .dockerignore                                                                                                                            0.0s
 => => transferring context: 2B                                                                                                                                                      0.0s
 => [example-voting-app-vote internal] load build definition from Dockerfile                                                                                                         0.0s
 => => transferring dockerfile: 740B                                                                                                                                                 0.0s
 => [example-voting-app-vote internal] load metadata for docker.io/library/python:3.9-slim                                                                                           5.2s
 => [example-voting-app-worker internal] load .dockerignore                                                                                                                          0.0s
 => => transferring context: 2B                                                                                                                                                      0.0s
 => [example-voting-app-worker internal] load build definition from Dockerfile                                                                                                       0.0s
 => => transferring dockerfile: 1.45kB                                                                                                                                               0.0s
 => [example-voting-app-worker internal] load metadata for mcr.microsoft.com/dotnet/runtime:7.0                                                                                      1.4s
 => [example-voting-app-worker internal] load metadata for mcr.microsoft.com/dotnet/sdk:7.0                                                                                          1.3s
 => [example-voting-app-worker build 1/7] FROM mcr.microsoft.com/dotnet/sdk:7.0@sha256:bd1ccc2332fc03c6df1659ed125f67f02666f9f188947a80cec4e7afd3c7f98d                             18.5s
 => => resolve mcr.microsoft.com/dotnet/sdk:7.0@sha256:bd1ccc2332fc03c6df1659ed125f67f02666f9f188947a80cec4e7afd3c7f98d                                                              0.0s
 => => sha256:8907849f91e57df0899482d802a3fc140b67a6d5febaa503837ed2233d662283 13.55MB / 13.55MB                                                                                     4.5s
 => => sha256:afd8a1df3eb1e6747064359ca9bc37db5330672279e0be935849f256d4b3f0b1 155.94MB / 155.94MB                                                                                  12.4s
 => => sha256:e4f0af37a4eb47b3e26810a4721ebdf36d9342d580d8c6027bd99a7596acc98c 25.39MB / 25.39MB                                                                                     1.9s
 => => sha256:d1a2ad48fbf7e8af456454a11f1e058cdb9ba171ef35dace5d13b495b053cc84 9.80MB / 9.80MB                                                                                       1.1s
 => => extracting sha256:d1a2ad48fbf7e8af456454a11f1e058cdb9ba171ef35dace5d13b495b053cc84                                                                                            0.1s
 => => extracting sha256:e4f0af37a4eb47b3e26810a4721ebdf36d9342d580d8c6027bd99a7596acc98c                                                                                            0.5s
 => => extracting sha256:afd8a1df3eb1e6747064359ca9bc37db5330672279e0be935849f256d4b3f0b1                                                                                            4.0s
 => => extracting sha256:8907849f91e57df0899482d802a3fc140b67a6d5febaa503837ed2233d662283                                                                                            0.4s
 => [example-voting-app-worker internal] load build context                                                                                                                          0.0s
 => => transferring context: 7.48kB                                                                                                                                                  0.0s
 => [example-voting-app-worker stage-1 1/3] FROM mcr.microsoft.com/dotnet/runtime:7.0@sha256:1ed4d59643e6b8b41b64ffa00b524ebca9de287bd3efa9955f9fa706f1dd0471                        3.6s
 => => resolve mcr.microsoft.com/dotnet/runtime:7.0@sha256:1ed4d59643e6b8b41b64ffa00b524ebca9de287bd3efa9955f9fa706f1dd0471                                                          0.0s
 => => sha256:a34d8d2343cd4d1705a15b9494ef9b39d01832d43c3a09fe129458c8bfdabeee 155B / 155B                                                                                           0.2s
 => => sha256:b7dfc290d72d9065e3276dcd05c3323942f8947a71dd5e7b4304f7a68d25c9c9 30.71MB / 30.71MB                                                                                     3.1s
 => => sha256:235af35749f09d6549b76fb376b3929ec21198feee4e72ffb396514dd11b374e 14.92MB / 14.92MB                                                                                     1.8s
 => => sha256:66dbba0fb1b568cc3ffd53409ba2f9f82995ab7f80e379338f3f36e4dcd223be 30.06MB / 30.06MB                                                                                     2.2s
 => => extracting sha256:66dbba0fb1b568cc3ffd53409ba2f9f82995ab7f80e379338f3f36e4dcd223be                                                                                            0.6s
 => => extracting sha256:235af35749f09d6549b76fb376b3929ec21198feee4e72ffb396514dd11b374e                                                                                            0.2s
 => => extracting sha256:b7dfc290d72d9065e3276dcd05c3323942f8947a71dd5e7b4304f7a68d25c9c9                                                                                            0.5s
 => => extracting sha256:a34d8d2343cd4d1705a15b9494ef9b39d01832d43c3a09fe129458c8bfdabeee                                                                                            0.0s
 => [example-voting-app-result 1/7] FROM docker.io/library/node:18-slim@sha256:36f3403a001b82d525afd2bdb7fcec0980543277dd86e9657964cce3438ae4b7                                      4.1s
 => => resolve docker.io/library/node:18-slim@sha256:36f3403a001b82d525afd2bdb7fcec0980543277dd86e9657964cce3438ae4b7                                                                0.0s
 => => sha256:8e5162ad1efe24f915933435516b8cb1510cc80704bdf87c868e995f4f871cd9 451B / 451B                                                                                           0.4s
 => => sha256:1ad5fb92392ab64732e756b44967f7ecead775eb06ce3f9cd43d1a22bd9c9458 2.77MB / 2.77MB                                                                                       1.8s
 => => sha256:cc36a0fa43f85245c8d9977661c82a89cfc226fc26e5861670cf62c0933f62c4 46.14MB / 46.14MB                                                                                     2.9s
 => => sha256:d1d4cdb9c955626876afec2a95c6f7487481e067acc0a8be1867f678003266df 4.19kB / 4.19kB                                                                                       0.6s
 => => extracting sha256:d1d4cdb9c955626876afec2a95c6f7487481e067acc0a8be1867f678003266df                                                                                            0.0s
 => => extracting sha256:cc36a0fa43f85245c8d9977661c82a89cfc226fc26e5861670cf62c0933f62c4                                                                                            1.0s
 => => extracting sha256:1ad5fb92392ab64732e756b44967f7ecead775eb06ce3f9cd43d1a22bd9c9458                                                                                            0.1s
 => => extracting sha256:8e5162ad1efe24f915933435516b8cb1510cc80704bdf87c868e995f4f871cd9                                                                                            0.0s
 => [example-voting-app-result internal] load build context                                                                                                                          0.0s
 => => transferring context: 302.01kB                                                                                                                                                0.0s
 => [example-voting-app-worker stage-1 2/3] WORKDIR /app                                                                                                                             0.2s
 => [example-voting-app-vote 1/6] FROM docker.io/library/python:3.9-slim@sha256:2ed9cf48cf86eb638a9ceb555737161fbb20fa0474494269150b4d6c2653227b                                     2.7s
 => => resolve docker.io/library/python:3.9-slim@sha256:2ed9cf48cf86eb638a9ceb555737161fbb20fa0474494269150b4d6c2653227b                                                             0.0s
 => => sha256:98b352a9715d74c4172491762aded5e741a28ce83df0fd99321a1031b1d5b6c8 3.17MB / 3.17MB                                                                                       0.6s
 => => sha256:14b89f7d65aecdc5e63ab5759d5135ec777524bcdbc4adb5200fac65c825655d 233B / 233B                                                                                           0.3s
 => => sha256:ac439b0377b530ec2bd538701b6611c91588fdf491f0566458373c314866cfb8 11.22MB / 11.22MB                                                                                     0.9s
 => => sha256:1f3ba05aa6dc6bcf7f4f57d5eaec80fd3edffbffde2e9727df29d63c978f0b99 1.06MB / 1.06MB                                                                                       1.4s
 => => extracting sha256:1f3ba05aa6dc6bcf7f4f57d5eaec80fd3edffbffde2e9727df29d63c978f0b99                                                                                            0.0s
 => => extracting sha256:ac439b0377b530ec2bd538701b6611c91588fdf491f0566458373c314866cfb8                                                                                            0.2s
 => => extracting sha256:14b89f7d65aecdc5e63ab5759d5135ec777524bcdbc4adb5200fac65c825655d                                                                                            0.0s
 => => extracting sha256:98b352a9715d74c4172491762aded5e741a28ce83df0fd99321a1031b1d5b6c8                                                                                            0.1s
 => [example-voting-app-vote internal] load build context                                                                                                                            0.0s
 => => transferring context: 6.11kB                                                                                                                                                  0.0s
 => [example-voting-app-vote 2/6] RUN apt-get update     && apt-get install -y --no-install-recommends     curl     && rm -rf /var/lib/apt/lists/*                                   4.2s
 => [example-voting-app-result 2/7] RUN apt-get update     && apt-get install -y --no-install-recommends     curl     tini     && rm -rf /var/lib/apt/lists/*                        3.4s
 => [example-voting-app-vote 3/6] WORKDIR /app                                                                                                                                       0.0s
 => [example-voting-app-vote 4/6] COPY requirements.txt /app/requirements.txt                                                                                                        0.0s
 => [example-voting-app-vote 5/6] RUN pip install -r requirements.txt                                                                                                                3.0s
 => [example-voting-app-result 3/7] WORKDIR /app                                                                                                                                     0.0s
 => [example-voting-app-result 4/7] RUN npm install -g nodemon                                                                                                                       1.9s
 => [example-voting-app-result 5/7] COPY package*.json ./                                                                                                                            0.0s
 => [example-voting-app-result 6/7] RUN npm ci  && npm cache clean --force  && mv /app/node_modules /node_modules                                                                    2.1s
 => [example-voting-app-vote 6/6] COPY . .                                                                                                                                           0.0s
 => [example-voting-app-vote] exporting to docker image format                                                                                                                       3.8s
 => => exporting layers                                                                                                                                                              0.5s
 => => exporting manifest sha256:8e6e3010a750bd01eebd409fa77a5e98f99f4aecefe6de2b8eb43096e7de9bcb                                                                                    0.0s
 => => exporting config sha256:5c1cf62b540c59ce0a99930302aae92523c6db3e77d0e8737d4d4260908880ee                                                                                      0.0s
 => => sending tarball                                                                                                                                                               3.2s
 => importing to docker                                                                                                                                                              2.4s
 => [example-voting-app-result 7/7] COPY . .                                                                                                                                         0.0s
 => [example-voting-app-result] exporting to docker image format                                                                                                                     3.9s
 => => exporting layers                                                                                                                                                              0.3s
 => => exporting manifest sha256:91ac5a4bcc08913d88936fca0f6f36a58a69cb0e2de202691b3fe6c545d21e7c                                                                                    0.0s
 => => exporting config sha256:223b94fc00aee779a4ee25ce9d1c69cab293aedd539b843faba7c1a47e894b29                                                                                      0.0s
 => => sending tarball                                                                                                                                                               3.6s
 => importing to docker                                                                                                                                                              2.4s
 => [example-voting-app-worker build 2/7] RUN echo "I am running on linux/arm64, building for linux/arm64"                                                                           0.1s
 => [example-voting-app-worker build 3/7] WORKDIR /source                                                                                                                            0.0s
 => [example-voting-app-worker build 4/7] COPY *.csproj .                                                                                                                            0.0s
 => [example-voting-app-worker build 5/7] RUN case linux/arm64 in          "linux/amd64")  ARCH=x64  ;;          "linux/arm64")  ARCH=arm64  ;;          "linux/arm64/v8")  ARCH=a  12.3s
 => [example-voting-app-worker build 6/7] COPY . .                                                                                                                                   0.0s
 => [example-voting-app-worker build 7/7] RUN  case linux/arm64 in          "linux/amd64")  ARCH=x64  ;;          "linux/arm64")  ARCH=arm64  ;;          "linux/arm64/v8")  ARCH=a  1.7s
 => [example-voting-app-worker stage-1 3/3] COPY --from=build /app .                                                                                                                 0.0s
 => [example-voting-app-worker] exporting to docker image format                                                                                                                     1.8s
 => => exporting layers                                                                                                                                                              0.1s
 => => exporting manifest sha256:93ec3cbb0ef4e82b397475cf25ca330aef2b4b2badaa7ad86541b00e48305e63                                                                                    0.0s
 => => exporting config sha256:8f82fda1dae8bc1c7c040c0c3045239fd48547d34ee3d5d458683cef7b107188                                                                                      0.0s
 => => sending tarball                                                                                                                                                               1.7s
 => importing to docker                                                                                                                                                              0.7s
[+] Running 8/5
 ⠿ Network example-voting-app_back-tier   Created                                                                                                                                    0.1s
 ⠿ Network example-voting-app_front-tier  Created                                                                                                                                    0.1s
 ⠿ Volume "example-voting-app_db-data"    Created                                                                                                                                    0.0s
 ⠿ Container example-voting-app-redis-1   Created                                                                                                                                    0.2s
 ⠿ Container example-voting-app-db-1      Created                                                                                                                                    0.2s
 ⠿ Container example-voting-app-vote-1    Created                                                                                                                                    0.0s
 ⠿ Container example-voting-app-worker-1  Created                                                                                                                                    0.0s
 ⠿ Container example-voting-app-result-1  Created                                                                                                                                    0.0s
Attaching to example-voting-app-db-1, example-voting-app-redis-1, example-voting-app-result-1, example-voting-app-vote-1, example-voting-app-worker-1
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.313 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.313 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.313 * monotonic clock: POSIX clock_gettime
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.314 * Running mode=standalone, port=6379.
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.315 # Server initialized
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.318 * Ready to accept connections
example-voting-app-db-1      | The files belonging to this database system will be owned by user "postgres".
example-voting-app-db-1      | This user must also own the server process.
example-voting-app-db-1      | 
example-voting-app-db-1      | The database cluster will be initialized with locale "en_US.utf8".
example-voting-app-db-1      | The default database encoding has accordingly been set to "UTF8".
example-voting-app-db-1      | The default text search configuration will be set to "english".
example-voting-app-db-1      | 
example-voting-app-db-1      | Data page checksums are disabled.
example-voting-app-db-1      | 
example-voting-app-db-1      | fixing permissions on existing directory /var/lib/postgresql/data ... ok
example-voting-app-db-1      | creating subdirectories ... ok
example-voting-app-db-1      | selecting dynamic shared memory implementation ... posix
example-voting-app-db-1      | selecting default max_connections ... 100
example-voting-app-db-1      | selecting default shared_buffers ... 128MB
example-voting-app-db-1      | selecting default time zone ... UTC
example-voting-app-db-1      | creating configuration files ... ok
example-voting-app-db-1      | running bootstrap script ... ok
example-voting-app-db-1      | sh: locale: not found
example-voting-app-db-1      | 2023-03-04 14:41:27.703 UTC [30] WARNING:  no usable system locales were found
example-voting-app-db-1      | performing post-bootstrap initialization ... ok
example-voting-app-db-1      | initdb: warning: enabling "trust" authentication for local connections
example-voting-app-db-1      | initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
example-voting-app-db-1      | syncing data to disk ... ok
example-voting-app-db-1      | 
example-voting-app-db-1      | 
example-voting-app-db-1      | Success. You can now start the database server using:
example-voting-app-db-1      | 
example-voting-app-db-1      |     pg_ctl -D /var/lib/postgresql/data -l logfile start
example-voting-app-db-1      | 
example-voting-app-db-1      | waiting for server to start....2023-03-04 14:41:28.118 UTC [36] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
example-voting-app-db-1      | 2023-03-04 14:41:28.120 UTC [36] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
example-voting-app-db-1      | 2023-03-04 14:41:28.124 UTC [39] LOG:  database system was shut down at 2023-03-04 14:41:28 UTC
example-voting-app-db-1      | 2023-03-04 14:41:28.127 UTC [36] LOG:  database system is ready to accept connections
example-voting-app-db-1      |  done
example-voting-app-db-1      | server started
example-voting-app-db-1      | 
example-voting-app-db-1      | /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
example-voting-app-db-1      | 
example-voting-app-db-1      | waiting for server to shut down....2023-03-04 14:41:28.218 UTC [36] LOG:  received fast shutdown request
example-voting-app-db-1      | 2023-03-04 14:41:28.220 UTC [36] LOG:  aborting any active transactions
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [36] LOG:  background worker "logical replication launcher" (PID 42) exited with exit code 1
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [37] LOG:  shutting down
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [37] LOG:  checkpoint starting: shutdown immediate
example-voting-app-db-1      | 2023-03-04 14:41:28.227 UTC [37] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.002 s, sync=0.001 s, total=0.005 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB
example-voting-app-db-1      | 2023-03-04 14:41:28.233 UTC [36] LOG:  database system is shut down
example-voting-app-db-1      |  done
example-voting-app-db-1      | server stopped
example-voting-app-db-1      | 
example-voting-app-db-1      | PostgreSQL init process complete; ready for start up.
example-voting-app-db-1      | 
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  listening on IPv6 address "::", port 5432
example-voting-app-db-1      | 2023-03-04 14:41:28.344 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
example-voting-app-db-1      | 2023-03-04 14:41:28.347 UTC [50] LOG:  database system was shut down at 2023-03-04 14:41:28 UTC
example-voting-app-db-1      | 2023-03-04 14:41:28.351 UTC [1] LOG:  database system is ready to accept connections
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:5000 -> 0.0.0.0:0: listen tcp 0.0.0.0:5000: bind: address already in use
➜  example-voting-app git:(main) 



```

#### check docker compose events 


```
docker compose events 
2023-03-04 20:12:13.002384 container exec_create: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (name=example-voting-app-redis-1, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=a242ce36c4b7595edfe03a0f3f01d71b201f003ab0e04cf04f26ee17e2d5e668, image=redis:alpine, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks)

2023-03-04 20:12:13.003007 container exec_start: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/Target=/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, execID=a242ce36c4b7595edfe03a0f3f01d71b201f003ab0e04cf04f26ee17e2d5e668, image=redis:alpine, name=example-voting-app-redis-1)

2023-03-04 20:12:13.022680 container exec_create: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, image=postgres:15-alpine, desktop.docker.io/binds/0/Target=/healthchecks, execID=df7c12ef54c8029a23eb9febcb677c8f8c0984cf5c3da7c5634d268b1b3804b3, name=example-voting-app-db-1)

2023-03-04 20:12:13.023200 container exec_start: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (name=example-voting-app-db-1, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=df7c12ef54c8029a23eb9febcb677c8f8c0984cf5c3da7c5634d268b1b3804b3, image=postgres:15-alpine, desktop.docker.io/binds/0/Target=/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile)

2023-03-04 20:12:13.078489 container exec_die c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/Target=/healthchecks, image=redis:alpine, execID=a242ce36c4b7595edfe03a0f3f01d71b201f003ab0e04cf04f26ee17e2d5e668, exitCode=0, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, name=example-voting-app-redis-1)

2023-03-04 20:12:13.097001 container exec_die 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (image=postgres:15-alpine, desktop.docker.io/binds/0/SourceKind=hostFile, exitCode=0, name=example-voting-app-db-1, desktop.docker.io/binds/0/Target=/healthchecks, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=df7c12ef54c8029a23eb9febcb677c8f8c0984cf5c3da7c5634d268b1b3804b3)

2023-03-04 20:12:18.082975 container exec_create: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (image=redis:alpine, name=example-voting-app-redis-1, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, execID=4293df2a37da48526e1c21e417c25d34e8947171a66a44bb9741036f09903032)

2023-03-04 20:12:18.083432 container exec_start: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=4293df2a37da48526e1c21e417c25d34e8947171a66a44bb9741036f09903032, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, image=redis:alpine, name=example-voting-app-redis-1)

2023-03-04 20:12:18.099740 container exec_create: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (name=example-voting-app-db-1, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, image=postgres:15-alpine, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, execID=725b7d5bf401d7c3944d8432b78835ebd86742b696ce30f6166da8b8d3802f63)

2023-03-04 20:12:18.100090 container exec_start: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, execID=725b7d5bf401d7c3944d8432b78835ebd86742b696ce30f6166da8b8d3802f63, image=postgres:15-alpine, name=example-voting-app-db-1)

2023-03-04 20:12:18.169539 container exec_die c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, image=redis:alpine, name=example-voting-app-redis-1, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, execID=4293df2a37da48526e1c21e417c25d34e8947171a66a44bb9741036f09903032, exitCode=0)

2023-03-04 20:12:18.185722 container exec_die 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/SourceKind=hostFile, image=postgres:15-alpine, desktop.docker.io/binds/0/Target=/healthchecks, exitCode=0, name=example-voting-app-db-1, execID=725b7d5bf401d7c3944d8432b78835ebd86742b696ce30f6166da8b8d3802f63, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks)

2023-03-04 20:12:23.173394 container exec_create: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/Target=/healthchecks, image=redis:alpine, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, execID=7225d11881403d700013274bbcd9ab8c0dcf8e1ec55ecf8eefc63af51cb10ebe, name=example-voting-app-redis-1)

2023-03-04 20:12:23.173847 container exec_start: /bin/sh -c /healthchecks/redis.sh c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=7225d11881403d700013274bbcd9ab8c0dcf8e1ec55ecf8eefc63af51cb10ebe, image=redis:alpine, name=example-voting-app-redis-1)

2023-03-04 20:12:23.188391 container exec_create: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/Target=/healthchecks, name=example-voting-app-db-1, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=8c18f808739a1a14c190db460030da0bb1b4a68a153f202f55a2c840f96bf630, image=postgres:15-alpine)

2023-03-04 20:12:23.188516 container exec_start: /bin/sh -c /healthchecks/postgres.sh 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, execID=8c18f808739a1a14c190db460030da0bb1b4a68a153f202f55a2c840f96bf630, image=postgres:15-alpine, name=example-voting-app-db-1, desktop.docker.io/binds/0/Target=/healthchecks)

2023-03-04 20:12:23.241796 container exec_die c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406 (desktop.docker.io/binds/0/SourceKind=hostFile, execID=7225d11881403d700013274bbcd9ab8c0dcf8e1ec55ecf8eefc63af51cb10ebe, exitCode=0, name=example-voting-app-redis-1, desktop.docker.io/binds/0/Target=/healthchecks, image=redis:alpine, desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks)

2023-03-04 20:12:23.263784 container exec_die 0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6 (desktop.docker.io/binds/0/Source=/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks, desktop.docker.io/binds/0/SourceKind=hostFile, desktop.docker.io/binds/0/Target=/healthchecks, exitCode=0, name=example-voting-app-db-1, execID=8c18f808739a1a14c190db460030da0bb1b4a68a153f202f55a2c840f96bf630, image=postgres:15-alpine)

```

#### use --json flag 

```

docker compose events --json
{"action":"exec_create: /bin/sh -c /healthchecks/redis.sh","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"8f907207527e01ca85a0d73227b35a6da73ed8402de4336e1acb312c46e9473e","image":"redis:alpine","name":"example-voting-app-redis-1"},"id":"c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406","service":"redis","time":"2023-03-04T20:30:14.926031584+05:30","type":"container"}
{"action":"exec_start: /bin/sh -c /healthchecks/redis.sh","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"8f907207527e01ca85a0d73227b35a6da73ed8402de4336e1acb312c46e9473e","image":"redis:alpine","name":"example-voting-app-redis-1"},"id":"c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406","service":"redis","time":"2023-03-04T20:30:14.926920001+05:30","type":"container"}
{"action":"exec_create: /bin/sh -c /healthchecks/postgres.sh","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"006d0a097e9819360bf647cc7f2f5c75723588a546b14359267b4b3a0b169310","image":"postgres:15-alpine","name":"example-voting-app-db-1"},"id":"0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6","service":"db","time":"2023-03-04T20:30:14.940481834+05:30","type":"container"}
{"action":"exec_start: /bin/sh -c /healthchecks/postgres.sh","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"006d0a097e9819360bf647cc7f2f5c75723588a546b14359267b4b3a0b169310","image":"postgres:15-alpine","name":"example-voting-app-db-1"},"id":"0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6","service":"db","time":"2023-03-04T20:30:14.941143834+05:30","type":"container"}
{"action":"exec_die","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"8f907207527e01ca85a0d73227b35a6da73ed8402de4336e1acb312c46e9473e","exitCode":"0","image":"redis:alpine","name":"example-voting-app-redis-1"},"id":"c0d6be412752520417ac2b5800fb4501e9c2553f900e078da9fd2a2fde56d406","service":"redis","time":"2023-03-04T20:30:15.009103251+05:30","type":"container"}
{"action":"exec_die","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/healthchecks","desktop.docker.io/binds/0/SourceKind":"hostFile","desktop.docker.io/binds/0/Target":"/healthchecks","execID":"006d0a097e9819360bf647cc7f2f5c75723588a546b14359267b4b3a0b169310","exitCode":"0","image":"postgres:15-alpine","name":"example-voting-app-db-1"},"id":"0ea61e77a190102e4facd7759235fd8c92870b1f594eaaf109a7e55888693dc6","service":"db","time":"2023-03-04T20:30:15.026884834+05:30","type":"container"}
{"action":"exec_create: /bin/sh -c /healthchecks/redis.sh","attributes":{"desktop.docker.io/binds/0/Source":"/Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docke


```

# Compose Exec Command 


### Docker Compose Exec into result service 


```sh

docker compose exec result sh 
# ls
Dockerfile  docker-compose.test.yml  package-lock.json  package.json  server.js  tests  views
# cat docker-compose.test.yml
version: '2'

services:

  sut:
    build: ./tests/
    depends_on:
      - vote
      - result
      - worker
    networks:
      - front-tier

  vote:
    build: ../vote/
    ports: ["80"]
    depends_on:
      - redis
      - db
    networks:
      - front-tier
      - back-tier

  result:
    build: .
    ports: ["80"]
    depends_on:
      - redis
      - db
    networks:
      - front-tier
      - back-tier

  worker:
    build: ../worker/
    depends_on:
      - redis
      - db
    networks:
      - back-tier

  redis:
    image: redis:alpine
    networks:
      - back-tier

  db:
    image: postgres:9.4
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"
    volumes:
      - "db-data:/var/lib/postgresql/data"
    networks:
      - back-tier

volumes:
  db-data:

networks:
  front-tier:
  back-tier:
# exit
➜  example-voting-app git:(main) 


```

# Compose Images Command

```sh
example-voting-app git:(main) docker compose images 
CONTAINER                     REPOSITORY                  TAG                 IMAGE ID            SIZE
example-voting-app-db-1       postgres                    15-alpine           68d4a8d9d3d9        241MB
example-voting-app-redis-1    redis                       alpine              1339d05b97a4        30.4MB
example-voting-app-result-1   example-voting-app-result   latest              223b94fc00ae        254MB
example-voting-app-vote-1     example-voting-app-vote     latest              5c1cf62b540c        135MB
example-voting-app-worker-1   example-voting-app-worker   latest              8f82fda1dae8        195MB

```


# Compose Kill Command


#### Forces running containers to stop by sending a SIGKILL signal. Optionally the signal can be passed :

```sh
 example-voting-app git:(main) docker-compose kill -s SIGINT
[+] Running 4/0
 ⠿ Container example-voting-app-redis-1   Killed                                                                                                                                     0.0s
 ⠿ Container example-voting-app-worker-1  Killed                                                                                                                                     0.0s
 ⠿ Container example-voting-app-db-1      Killed                                                                                                                                     0.0s
 ⠿ Container example-voting-app-result-1  Killed                                                                                                                                     0.0s
```

# Compose Logs Command


#### View output from containers


```sh

➜  example-voting-app git:(main) docker-compose logs          
example-voting-app-worker-1  | Connected to db
example-voting-app-result-1  | [nodemon] 2.0.21
example-voting-app-worker-1  | Found redis at 172.20.0.2
example-voting-app-worker-1  | Connecting to redis
example-voting-app-result-1  | [nodemon] to restart at any time, enter `rs`
example-voting-app-result-1  | [nodemon] watching path(s): *.*
example-voting-app-result-1  | [nodemon] watching extensions: js,mjs,json
example-voting-app-result-1  | [nodemon] starting `node server.js`
example-voting-app-result-1  | Sat, 04 Mar 2023 18:00:16 GMT body-parser deprecated bodyParser: use individual json/urlencoded middlewares at server.js:73:9
example-voting-app-result-1  | Sat, 04 Mar 2023 18:00:16 GMT body-parser deprecated undefined extended: provide extended option at ../node_modules/body-parser/index.js:104:29
example-voting-app-result-1  | App running on port 80
example-voting-app-result-1  | Connected to db
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.313 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
example-voting-app-redis-1   | 1:C 04 Mar 2023 14:41:27.313 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.313 * monotonic clock: POSIX clock_gettime
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.314 * Running mode=standalone, port=6379.
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.315 # Server initialized
example-voting-app-redis-1   | 1:M 04 Mar 2023 14:41:27.318 * Ready to accept connections
example-voting-app-redis-1   | 1:signal-handler (1677952603) Received SIGINT scheduling shutdown...
example-voting-app-redis-1   | 1:M 04 Mar 2023 17:56:43.159 # User requested shutdown...
example-voting-app-redis-1   | 1:M 04 Mar 2023 17:56:43.159 * Saving the final RDB snapshot before exiting.
example-voting-app-redis-1   | 1:M 04 Mar 2023 17:56:43.161 * DB saved on disk
example-voting-app-redis-1   | 1:M 04 Mar 2023 17:56:43.161 # Redis is now ready to exit, bye bye...
example-voting-app-redis-1   | 1:C 04 Mar 2023 18:00:10.915 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
example-voting-app-redis-1   | 1:C 04 Mar 2023 18:00:10.915 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
example-voting-app-redis-1   | 1:C 04 Mar 2023 18:00:10.915 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.915 * monotonic clock: POSIX clock_gettime
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.916 * Running mode=standalone, port=6379.
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.916 # Server initialized
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * Loading RDB produced by version 7.0.9
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * RDB age 207 seconds
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * RDB memory usage when created 1.09 Mb
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * Done loading RDB, keys loaded: 0, keys expired: 0.
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * DB loaded from disk: 0.000 seconds
example-voting-app-redis-1   | 1:M 04 Mar 2023 18:00:10.918 * Ready to accept connections
example-voting-app-db-1      | The files belonging to this database system will be owned by user "postgres".
example-voting-app-db-1      | This user must also own the server process.
example-voting-app-db-1      | 
example-voting-app-db-1      | The database cluster will be initialized with locale "en_US.utf8".
example-voting-app-db-1      | The default database encoding has accordingly been set to "UTF8".
example-voting-app-db-1      | The default text search configuration will be set to "english".
example-voting-app-db-1      | 
example-voting-app-db-1      | Data page checksums are disabled.
example-voting-app-db-1      | 
example-voting-app-db-1      | fixing permissions on existing directory /var/lib/postgresql/data ... ok
example-voting-app-db-1      | creating subdirectories ... ok
example-voting-app-db-1      | selecting dynamic shared memory implementation ... posix
example-voting-app-db-1      | selecting default max_connections ... 100
example-voting-app-db-1      | selecting default shared_buffers ... 128MB
example-voting-app-db-1      | selecting default time zone ... UTC
example-voting-app-db-1      | creating configuration files ... ok
example-voting-app-db-1      | running bootstrap script ... ok
example-voting-app-db-1      | sh: locale: not found
example-voting-app-db-1      | 2023-03-04 14:41:27.703 UTC [30] WARNING:  no usable system locales were found
example-voting-app-db-1      | performing post-bootstrap initialization ... ok
example-voting-app-db-1      | syncing data to disk ... ok
example-voting-app-db-1      | 
example-voting-app-db-1      | 
example-voting-app-db-1      | Success. You can now start the database server using:
example-voting-app-db-1      | 
example-voting-app-db-1      |     pg_ctl -D /var/lib/postgresql/data -l logfile start
example-voting-app-db-1      | 
example-voting-app-db-1      | initdb: warning: enabling "trust" authentication for local connections
example-voting-app-db-1      | initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
example-voting-app-db-1      | waiting for server to start....2023-03-04 14:41:28.118 UTC [36] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
example-voting-app-db-1      | 2023-03-04 14:41:28.120 UTC [36] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
example-voting-app-db-1      | 2023-03-04 14:41:28.124 UTC [39] LOG:  database system was shut down at 2023-03-04 14:41:28 UTC
example-voting-app-db-1      | 2023-03-04 14:41:28.127 UTC [36] LOG:  database system is ready to accept connections
example-voting-app-db-1      |  done
example-voting-app-db-1      | server started
example-voting-app-db-1      | 
example-voting-app-db-1      | /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
example-voting-app-db-1      | 
example-voting-app-db-1      | waiting for server to shut down....2023-03-04 14:41:28.218 UTC [36] LOG:  received fast shutdown request
example-voting-app-db-1      | 2023-03-04 14:41:28.220 UTC [36] LOG:  aborting any active transactions
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [36] LOG:  background worker "logical replication launcher" (PID 42) exited with exit code 1
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [37] LOG:  shutting down
example-voting-app-db-1      | 2023-03-04 14:41:28.222 UTC [37] LOG:  checkpoint starting: shutdown immediate
example-voting-app-db-1      | 2023-03-04 14:41:28.227 UTC [37] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.002 s, sync=0.001 s, total=0.005 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB
example-voting-app-db-1      | 2023-03-04 14:41:28.233 UTC [36] LOG:  database system is shut down
example-voting-app-db-1      |  done
example-voting-app-db-1      | server stopped
example-voting-app-db-1      | 
example-voting-app-db-1      | PostgreSQL init process complete; ready for start up.
example-voting-app-db-1      | 
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
example-voting-app-db-1      | 2023-03-04 14:41:28.342 UTC [1] LOG:  listening on IPv6 address "::", port 5432
example-voting-app-db-1      | 2023-03-04 14:41:28.344 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
example-voting-app-db-1      | 2023-03-04 14:41:28.347 UTC [50] LOG:  database system was shut down at 2023-03-04 14:41:28 UTC
example-voting-app-db-1      | 2023-03-04 14:41:28.351 UTC [1] LOG:  database system is ready to accept connections
example-voting-app-db-1      | 2023-03-04 14:46:28.434 UTC [48] LOG:  checkpoint starting: time
example-voting-app-db-1      | 2023-03-04 14:46:36.189 UTC [48] LOG:  checkpoint complete: wrote 79 buffers (0.5%); 0 WAL file(s) added, 0 removed, 0 recycled; write=7.707 s, sync=0.027 s, total=7.755 s; sync files=41, longest=0.012 s, average=0.001 s; distance=397 kB, estimate=397 kB
example-voting-app-db-1      | 2023-03-04 17:56:43.105 UTC [1] LOG:  received fast shutdown request
example-voting-app-db-1      | 2023-03-04 17:56:43.107 UTC [1] LOG:  aborting any active transactions
example-voting-app-db-1      | 2023-03-04 17:56:43.111 UTC [67] FATAL:  terminating connection due to administrator command
example-voting-app-db-1      | 2023-03-04 17:56:43.117 UTC [66] FATAL:  terminating connection due to administrator command
example-voting-app-db-1      | 2023-03-04 17:56:43.122 UTC [1] LOG:  background worker "logical replication launcher" (PID 53) exited with exit code 1
example-voting-app-db-1      | 2023-03-04 17:56:43.126 UTC [48] LOG:  shutting down
example-voting-app-db-1      | 2023-03-04 17:56:43.128 UTC [48] LOG:  checkpoint starting: shutdown immediate
example-voting-app-db-1      | 2023-03-04 17:56:43.138 UTC [48] LOG:  checkpoint complete: wrote 0 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.003 s, sync=0.001 s, total=0.012 s; sync files=0, longest=0.000 s, average=0.000 s; distance=0 kB, estimate=357 kB
example-voting-app-db-1      | 2023-03-04 17:56:43.185 UTC [1] LOG:  database system is shut down
example-voting-app-db-1      | 
example-voting-app-db-1      | PostgreSQL Database directory appears to contain a database; Skipping initialization
example-voting-app-db-1      | 
example-voting-app-db-1      | 2023-03-04 18:00:10.972 UTC [1] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
example-voting-app-db-1      | 2023-03-04 18:00:10.972 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
example-voting-app-db-1      | 2023-03-04 18:00:10.972 UTC [1] LOG:  listening on IPv6 address "::", port 5432
example-voting-app-db-1      | 2023-03-04 18:00:10.973 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
example-voting-app-db-1      | 2023-03-04 18:00:10.977 UTC [24] LOG:  database system was shut down at 2023-03-04 17:56:43 UTC
example-voting-app-db-1      | 2023-03-04 18:00:10.982 UTC [1] LOG:  database system is ready to accept connections
➜  example-voting-app git:(main) 




```

# Compose ls Command



#### List running compose projects


```sh
docker-compose ls  
NAME                 STATUS              CONFIG FILES
example-voting-app   running(4)          /Users/sangambiradar/Documents/GitHub/dockerworkshop/workshop/Docker102/Docker-Compose/example-voting-app/docker-compose.yml
➜  example-voting-app git:(main) 
```

#### Print the public port for a port binding.

```sh
docker compose port result 80
0.0.0.0:5001
➜  example-voting-app git:(main) 

```

#### List containers

```sh
 docker compose ps 
NAME                          IMAGE                       COMMAND                  SERVICE             CREATED             STATUS                       PORTS
example-voting-app-db-1       postgres:15-alpine          "docker-entrypoint.s…"   db                  4 hours ago         Up About an hour (healthy)   5432/tcp
example-voting-app-redis-1    redis:alpine                "docker-entrypoint.s…"   redis               4 hours ago         Up About an hour (healthy)   6379/tcp
example-voting-app-result-1   example-voting-app-result   "nodemon server.js"      result              About an hour ago   Up About an hour             0.0.0.0:5858->5858/tcp, 0.0.0.0:5001->80/tcp
example-voting-app-worker-1   example-voting-app-worker   "dotnet Worker.dll"      worker              About an hour ago   Up About an hour             
➜  example-voting-app git:(main) 

````


#### Pull service images


```sh
 example-voting-app git:(main) docker compose pull 
[+] Running 5/5
 ⠿ vote Skipped - No image to be pulled                                                                                                                                              0.0s
 ⠿ result Skipped - No image to be pulled                                                                                                                                            0.0s
 ⠿ worker Skipped - No image to be pulled                                                                                                                                            0.0s
 ⠿ redis Pulled                                                                                                                                                                      2.8s
 ⠿ db Pulled                                                                                                                                                                         2.8s

```

#### Push service images


```sh

services:
  service1:
    build: .
    image: localhost:5000/yourimage  ## goes to local registry

  service2:
    build: .
    image: your-dockerid/yourimage  ## goes to your repository on Docker Hub

```


#### restart service images 

```sh
docker compose restart  
[+] Running 5/5
 ⠿ Container example-voting-app-db-1      Started                                                                                                                                    0.7s
 ⠿ Container example-voting-app-redis-1   Started                                                                                                                                    0.7s
 ⠿ Container example-voting-app-result-1  Started                                                                                                                                    0.6s
 ⠿ Container example-voting-app-vote-1    Started                                                                                                                                    0.5s
 ⠿ Container example-voting-app-worker-1  Started                                                                                                                                    0.4s
➜  example-voting-app git:(main) 
```


#### Removes stopped service containers


```sh
➜  example-voting-app git:(main) docker compose stop 
[+] Running 5/5
 ⠿ Container example-voting-app-vote-1    Stopped                                                                                                                                    0.3s
 ⠿ Container example-voting-app-result-1  Stopped                                                                                                                                    0.3s
 ⠿ Container example-voting-app-worker-1  Stopped                                                                                                                                    0.1s
 ⠿ Container example-voting-app-db-1      Stopped                                                                                                                                    0.1s
 ⠿ Container example-voting-app-redis-1   Stopped                                                                                                                                    0.2s
➜  example-voting-app git:(main) docker compose rm   
? Going to remove example-voting-app-vote-1, example-voting-app-result-1, example-voting-app-worker-1, example-voting-app-db-1, example-voting-app-redis-1 Yes
[+] Running 5/0
 ⠿ Container example-voting-app-redis-1   Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-vote-1    Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-result-1  Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-db-1      Removed                                                                                                                                    0.0s
 ⠿ Container example-voting-app-worker-1  Removed                                                                                                                                    0.0s
➜  example-voting-app git:(main) 



```

# Compose Run Command


```sh

➜  example-voting-app git:(main) docker compose run db                  

PostgreSQL Database directory appears to contain a database; Skipping initialization

2023-03-04 19:16:58.496 UTC [1] LOG:  starting PostgreSQL 15.2 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r4) 12.2.1 20220924, 64-bit
2023-03-04 19:16:58.496 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2023-03-04 19:16:58.496 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2023-03-04 19:16:58.498 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-03-04 19:16:58.503 UTC [24] LOG:  database system was shut down at 2023-03-04 19:15:07 UTC
2023-03-04 19:16:58.510 UTC [1] LOG:  database system is ready to accept connections
^C2023-03-04 19:17:11.082 UTC [1] LOG:  received fast shutdown request
2023-03-04 19:17:11.088 UTC [1] LOG:  aborting any active transactions
2023-03-04 19:17:11.108 UTC [1] LOG:  background worker "logical replication launcher" (PID 27) exited with exit code 1
2023-03-04 19:17:11.108 UTC [22] LOG:  shutting down
2023-03-04 19:17:11.110 UTC [22] LOG:  checkpoint starting: shutdown immediate
2023-03-04 19:17:11.117 UTC [22] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.003 s, sync=0.001 s, total=0.009 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB
2023-03-04 19:17:11.127 UTC [1] LOG:  database system is shut down
➜  example-voting-app git:(main) docker compose run worker
[+] Running 2/2
 ⠿ Container example-voting-app-db-1     Created                                                                                                                                     0.0s
 ⠿ Container example-voting-app-redis-1  Created                                                                                                                                     0.0s
[+] Running 2/2
 ⠿ Container example-voting-app-db-1     Started                                                                                                                                     0.5s
 ⠿ Container example-voting-app-redis-1  Started                                                                                                                                     0.5s
Connected to db
Found redis at 172.20.0.3
Connecting to redis
^C%                                                                                                                                                                                       
➜  example-voting-app git:(main) 

```


#  Local Network Setup



#### Docker network create command syntax

```sh
docker network create --help
```
#### view current networks

```sh
docker network ls
clear
```

#### Create a new overlay network, with all default options

```sh
docker network create -d overlay defaults-over
```
### Create a new overlay network with specific IP settings

```sh
docker network create -d overlay \
--subnet=172.30.0.0/24 \
--ip-range=172.30.0.0/28 \
--gateway=172.30.0.254 \
specifics-over
```

#### view current networks again

```sh
docker network ls
```
### Initial validation

```sh
docker network inspect specifics-over --format '{{json .IPAM.Config}}' | jq
```
clear

### Create service tester1
```sh
docker service create --detach --replicas 3 --name tester1 \
--network specifics-over alpine tail -f /dev/null
```

#### Create service tester2

```sh
docker service create --detach --replicas 3 --name tester2 \
--network specifics-over alpine tail -f /dev/null
```

### get the container names

```sh
docker container ls
```
#### From a container in the tester1 service ping the tester2 service by name

```sh
docker container exec -it tester1.3.<GET THE NAME> ping -c 3 tester2
```


# Remote Network Setup


#### Docker network managment command

```sh
docker network --help
clear
```

### Starting on ubuntu-node01: Install and setup the weave driver

```sh
sudo curl -L git.io/weave -o /usr/local/bin/weave
sudo chmod a+x /usr/local/bin/weave
export CHECKPOINT_DISABLE=1
weave launch
eval $(weave env)
```

clear

#### Now on ubuntu-node02: Install and setup the weave driver
```sh
sudo curl -L git.io/weave -o /usr/local/bin/weave
sudo chmod a+x /usr/local/bin/weave
export CHECKPOINT_DISABLE=1
weave launch
eval $(weave env)
```
clear

#### Now, back on ubuntu-node01:Bring node02 in as a peer on node01's weave network
```sh
weave connect ubuntu-node02
```
#### Starting with ubuntu-node01:Run a container detached on node01
```sh
docker container run -d --name app01 alpine tail -f /dev/null
```
#### Now, launch a container on ubuntu-node02: Run a container detached on node02
```sh
docker container run -d --name app02 alpine tail -f /dev/null
```
#### Since we are on node02, we will check there first...
#### From inside the app02 container running on node02,
####  let's ping the app01 container running on node01
```sh
docker container exec -it app02 ping -c 4 app01
```
#### Similarly, from inside the app01 container running on node01,
#### let's ping the app02 container running on node02
```sh
docker container exec -it app01 ping -c 4 app02
```
clear


# Newtorking in Docker Compose


### creating and using networks in docker-compose.yml

```yml
version: "3.7"
services:
  app1:
    image: httpd:latest
    container_name: app1
    ports:
     - 8080:80
    networks:
      - app1_net
networks:
  app1_net:

```

### run docker compose up 

```sh
docker-compose up

```

### Open browser 

```sh
http://localhost:8080
```

Observe the output

### On a second terminal
```sh
docker ps
```
#### Observe the networking part!

```sh
docker inspect app1

```

### Stops the docker-compose
```sh
docker-compose rm
```


# Compose Networking with Nginx


create docker-compose.yml with following content :

```yml
version: "3.7"

services:
  web:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - 8080:80
    networks:
      - app1_net
      - app2_net

  app1:
    image: httpd:latest
    networks:
      - app1_net

  app2:
    image: httpd:latest
    networks:
      - app2_net

networks:
  app1_net:
  app2_net:

```

#### the following nginx.conf configuration file in the same directory:

```sh

events {}
http {
    server {
    listen 80;
    listen [::]:80;

    server_name example.com;

    location / {
        proxy_pass http://app1:80/;
    }
    location /app2 {
        proxy_pass http://app2:80/;
    }
  }
}




```

### run docker compose 

```sh

docker compose up 
```

### Go to http://localhost:8080 and observer the command line


•	It will show you the nignx-container web_1 container (reverse_proxy) was requested <br>
•	And forwarded the request to “app1” container <br>
•	Reload a few times to make this more obvious <br>

#### Go to http://localhost:8080/app2 and observe the command line
•	It will show you again that nginx-container web_1 container (reverse_proxy) was requested  <br>
•	And now forwards to “app2” container <br>
•	Reload a few times to make this more obvious <br>



# Docker Wordpress Example


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

