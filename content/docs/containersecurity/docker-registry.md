---
title: "Docker Registry security configurations "
slug: "Docker-Registry-security-configurations"
weight : 16
---

What will you learn?

- InteractIing with insecure registry with curl 
- 
Fetching images using curl and analyzing image layers
Attacking protected Docker registry
Backdooring images and leveraging auto-deployment mechanisms to attack Docker host


# Intracting with Insecure Registry 

```bash
[node1] (local) root@192.168.0.18 ~
$ docker run -d \
  -p 5000:5000 \
  --name registry \
  -v /registry/data:/var/lib/registry \
  --restart always \
  registry:2
Unable to find image 'registry:2' locally
2: Pulling from library/registry
ca7dd9ec2225: Pull complete 
c41ae7ad2b39: Pull complete 
1ed0fc8a6161: Pull complete 
21df229223d2: Pull complete 
626897ccab21: Pull complete 
Digest: sha256:ce14a6258f37702ff3cd92232a6f5b81ace542d9f1631966999e9f7c1ee6ddba
Status: Downloaded newer image for registry:2
729cabb707e247e548ff84aa096c03e922e39e78bbe3c65753478305575576a6


```

check 

```  bash   
[node1] (local) root@192.168.0.18 ~
$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                    NAMES
729cabb707e2   registry:2   "/entrypoint.sh /etc…"   11 seconds ago   Up 10 seconds   0.0.0.0:5000->5000/tcp   registry

```

pull image from docker hub and push to local registry

```bash
[node1] (local) root@192.168.0.18 ~
$ docker pull alpine:3.6
3.6: Pulling from library/alpine
5a3ea8efae5d: Pull complete 
Digest: sha256:66790a2b79e1ea3e1dabac43990c54aca5d1ddf268d9a5a0285e4167c8b24475
Status: Downloaded newer image for alpine:3.6
docker.io/library/alpine:3.6
```
push to local registry

```bash
[node1] (local) root@192.168.0.18 ~
$ docker tag alpine:3.6 localhost:5000/alpine:3.6
[node1] (local) root@192.168.0.18 ~
$ docker push localhost:5000/alpine:3.6
The push refers to repository [localhost:5000/alpine]
721384ec99e5: Pushed 
3.6: digest: sha256:36c3a913e62f77a82582eb7ce30d255f805c3d1e11d58e1f805e14d33c2bc5a5 size: 528

```
remove image from local docker host

```bash
[node1] (local) root@192.168.0.18 ~
$ docker image remove localhost:5000/alpine:3.6
Untagged: localhost:5000/alpine:3.6
Untagged: localhost:5000/alpine@sha256:36c3a913e62f77a82582eb7ce30d255f805c3d1e11d58e1f805e14d33c2bc5a5
```
pull new image from local registry

```bash
[node1] (local) root@192.168.0.18 ~
$  docker pull localhost:5000/alpine:3.6
3.6: Pulling from alpine
Digest: sha256:36c3a913e62f77a82582eb7ce30d255f805c3d1e11d58e1f805e14d33c2bc5a5
Status: Downloaded newer image for localhost:5000/alpine:3.6
localhost:5000/alpine:3.6
[node1] (local) root@192.168.0.18 ~
```

```bash
curl -s http://localhost:5000/v2/_catalog
{"repositories":["alpine"]}
ubuntu $ nmap -p 5000 localhost
Starting Nmap 7.80 ( https://nmap.org ) at 2023-01-07 23:45 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000064s latency).

PORT     STATE SERVICE
5000/tcp open  upnp

Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds
```

# Fetching images using curl and analyzing image layers

```bash
ubuntu $ curl -s http://localhost:5000/v2/alpine/tags/list
{"name":"alpine","tags":["3.6"]}

```
/_catalog endpoint returns a list of repositories available in the registry.

```bash
ubuntu $ curl -s http://localhost:5000/v2/alpine/manifests/3.6 




```bash

{
   "schemaVersion": 1,
   "name": "alpine",
   "tag": "3.6",
   "architecture": "amd64",
   "fsLayers": [
      {
         "blobSum": "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4"
      },
      {
         "blobSum": "sha256:5a3ea8efae5d0abb93d2a04be0a4870087042b8ecab8001f613cdc2a9440616a"
      }
   ],
   "history": [
      {
         "v1Compatibility": "{\"architecture\":\"amd64\",\"config\":{\"Hostname\":\"\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"],\"Cmd\":[\"/bin/sh\"],\"ArgsEscaped\":true,\"Image\":\"sha256:143f9315f5a85306192ccffd37fbfa65db21f67aaa938c2538bd50f52123a12f\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":null},\"container\":\"fd086f4b9352674c6a1ae4d02051f95a4e0a55cda943c5780483938dedfb2d8f\",\"container_config\":{\"Hostname\":\"fd086f4b9352\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"],\"Cmd\":[\"/bin/sh\",\"-c\",\"#(nop) \",\"CMD [\\\"/bin/sh\\\"]\"],\"ArgsEscaped\":true,\"Image\":\"sha256:143f9315f5a85306192ccffd37fbfa65db21f67aaa938c2538bd50f52123a12f\",\"Volumes\":null,\"WorkingDir\":\"\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":{}},\"created\":\"2019-03-07T22:20:00.563496859Z\",\"docker_version\":\"18.06.1-ce\",\"id\":\"baaf9c1caf4fb211f173d053029997dcfade0644ac354c8a068e4ebf23fcf1c5\",\"os\":\"linux\",\"parent\":\"5d8f720b0ab2b92a29a7e338aa90cad32dac2bf6518c7aae5844aab896ee36ec\",\"throwaway\":true}"
      },
      {
         "v1Compatibility": "{\"id\":\"5d8f720b0ab2b92a29a7e338aa90cad32dac2bf6518c7aae5844aab896ee36ec\",\"created\":\"2019-03-07T22:20:00.434038891Z\",\"container_config\":{\"Cmd\":[\"/bin/sh -c #(nop) ADD file:9714761bb81de664e431dec41f12db20f0438047615df2ecd9fdc88933d6c20f in / \"]}}"
      }
   ],
   "signatures": [
      {
         "header": {
            "jwk": {
               "crv": "P-256",
               "kid": "AHL3:52R5:PMFF:XHCJ:VYKX:OOEL:IUGD:JPPY:CLW4:HBE3:PSWY:CT6H",
               "kty": "EC",
               "x": "nsfDpo11GTUjCyx98IT4s4VJqns97kipPMB_nU-3JCs",
               "y": "eaFL1-YY16GBI31WV-FgjRp6C-koWvsUqjJRFknMjDM"
            },
            "alg": "ES256"
         },
         "signature": "48-BseaiWn17IyGHwsEGnxCUxnkAyI8fmMIFP3Ry2mDF5o23dQiDMPcbH62ik2mNAxmWA5-yKrBtjTuIn5FXAw",
         "protected": "eyJmb3JtYXRMZW5ndGgiOjIxMzAsImZvcm1hdFRhaWwiOiJDbjAiLCJ0aW1lIjoiMjAyMy0wMS0wOFQwMDowMTozMFoifQ"
      }
   ]
}

```


```bash

#!/bin/bash

# Download all the fsLayers from the remote registry using curl command
# Usage: ./download.bash http://registry:5000 image [tag]

URL="$1"
IMAGE="$2"
TAG="${3:-latest}"

BLOBS=( $(curl "$URL/v2/$IMAGE/manifests/$TAG" -s | python -m json.tool |  grep blobSum | cut -d '"' -f 4) )

for ((idx = 0 ; idx < ${#BLOBS[@]}; idx++)); do
        BLOB=${BLOBS[$idx]}
        SUMIDX=$(($idx + 1))
        DIR="$PWD/$IMAGE/$SUMIDX"
        rm -rf "$DIR" ; mkdir -p "$DIR/fs"

        curl -s "$URL/v2/$IMAGE/blobs/$BLOB" -o "$DIR/layer.tar"
        tar xf "$DIR/layer.tar" -C "$DIR/fs"
done
```

