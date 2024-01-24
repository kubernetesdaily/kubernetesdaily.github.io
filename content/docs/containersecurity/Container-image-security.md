---
title: "Container Image Security "
description: "Container Image Security "
slug: "container-image-security"
weight : 7
---

##  Container Image Security 
 
 - Building secure container images
         
## Choosing base images 

 # Alpine 
- Pros
   - very small images: the community pays a lot attention on minimizing image sizes
   - minimum functionality: only absolutely necessary packages contained
   - lightweight init system: like Gentoo, Alpine uses OpenRC, a lightweight alternative to systemd
   - musl performance: for some cases, [musl libc](https://musl.libc.org) can be more performant than [glibc](https://www.gnu.org/software/libc/)
- Cons 
  - rather Poor Documentation 
  - Small team : Currently there are  [3 developer listed ](https://wiki.alpinelinux.org/wiki/Alpine_Linux:Developers
   ) as the alpine linux team 
  - possible incompatibilities: musl libc may cause problems with some C-based plugins and adjustments may be necessary if you compile software yourself

# Debian

- Pro:
   - small images: the size of slimmed down Debian images (such as minideb by Bitnami) is almost on par with Alpine (e.g. m[minideb](https://github.com/bitnami/minideb)  + Python is [just 7 MB larger than Alpine + Python](https://dzone.com/articles/minideb-a-minimalist-debian-based-docker-image))
   - lots of packages: there's hardly any software for Linux which hasn't been packaged for Debian
   - well tested: due to its popularity, Debian is used widely and issues are more likely to be found
   - comprehensive documentation; also, the community produced a big amount of additional documentations and tutorials
   - more security reviews: again, due to its larger community, Debian gets more attention and its more likely that    vulnerabilities are discovered, e.g in glibc versus in musl libc (assumption). Debian also has a [security audit team](https://www.debian.org/security/), which proactively looks for security issues.
  - provenance: validating authenticity of packages is possible, e.g. with debsigs / dpkgsig

- Con:

   - slightly larger attack surface: minideb consists of about 35 packages (such as bash, grep, hostname, mount …) due to apt depending on it
   - more false positives: scanners may report more false positives you need to look at

# Distroless images 

simple distroless Golang Example 

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, world!")
}

```

```Dockerfile
FROM golang:1.18 as build
WORKDIR /go/src/app
COPY . .
RUN go mod download
RUN go vet -v
RUN go test -v
RUN CGO_ENABLED=0 go build -o /go/bin/app
FROM gcr.io/distroless/static-debian11
COPY --from=build /go/bin/app /
CMD ["/app"]
```


- Distroless 2.0 project - uses Alpine as a minimalistic & secure base image, and with the help of two tools, apko and melange, allows to build an application-tailored image containing only (mostly?) the necessary bits. 


- What is apko ?
  - Declarative OCI image builder tool based on apk 
  - Images are defined in YAML files  
  - Build are fully reproducible 
  - Automatically generates SBOMs for every imahes 
  - Platform-agnostic buids via Docker + apko images 

 
 - example of apko.yaml file

```yaml
contents:
  repositories:
    - https://dl-cdn.alpinelinux.org/alpine/edge/main
  packages:
    - alpine-base
entrypoint:
  command: /bin/sh -l
# optional environment configuration
environment:
  PATH: /usr/sbin:/sbin:/usr/bin:/bin

```

Buiding the images with apko via Docker 

```bash
docker run -v "$PWD":/work cgr.dev/chainguard/apko build examples/alpine-base.yaml apko-alpine:edge apko-alpine.tar
```

test the image with docker 

```bash
$ docker load < alpine.tar
$ docker run -it apko-alpine:test 
```

- Why apko ?
  - Introduced by alphine , it used a different methodology to handle package management 
  - Package Installation or removal is done as a side effect of modifyinh the system state 
  - This creates the ideal conditions for reproducible and declaratve pipelines 

- where do package come from ?
   - for alphine-base images , use Alphine apks found at pkgs.alpinelinux.org/packages
   - for wolfi images , use wolfi apks that are listed in the wolfi-os repository  hosted at packages.wolfi.dev/os
   - Don't mix! 
   - You cam also create your own apks with melange 

- why distroless ?
  - Minimalist container images with only what's absolutely necessary to build or execute your application
  - Popular base images are full of software that only makes sense on bare metal
  - No need for package managers or interactive shells on production images 
  - less dependencies = less attack surface


```bash
docker run cgr.dev/chainguard/apko version
```

```bash
docker run -v "$PWD":/work cgr.dev/chainguard/apko build examples/alpine-base.yaml apko-alpine:edge apko-alpine.tar

```



# Scratch Images 
     
The default golang image is great! It allows you to quickly build and test your golang projects. But it has a few draw backs, it is a massive 964 MB even the slimmed down alpine based image is 327 MB, not only that but having unused binaries and packages opens you up to security flaws.

Using a multi-stage image will allow you to build smaller images by dropping all the packages used to build the binaries and only including the ones required during runtime.

```dockerfile
# Create a builder stage
FROM golang:alpine as builder

RUN apk update
RUN apk add --no-cache git ca-certificates \
    && update-ca-certificates

COPY . .

# Fetch dependencies
RUN go mod download
RUN go mod verify

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-w -s" \
    -o /go/bin/my-docker-binary

# Create clean image
FROM alpine:latest

# Copy only the static binary
COPY --from=builder /go/bin/my-docker-binary \
    /go/bin/my-docker-binary

# Run the binary
ENTRYPOINT ["/go/bin/my-docker-binary"]

```
Great now we have an image thats 20 MB thats a 95% reduction! Remember these are production images so we use -ldflags="-w -s" to turn off debug information -w and Go symbols -s.


## Scratch Image and Lowest Privilege User

Now to get rid of all those unused packages. Instead of using the alpine image as our final stage we will use the scratch image which has literally nothing!

Will will take this opportunity to also create a non-root user. Add the following snippet to your builder stage

```

ENV USER=appuser
ENV UID=10001 

RUN adduser \    
    --disabled-password \    
    --gecos "" \    
    --home "/nonexistent" \    
    --shell "/sbin/nologin" \    
    --no-create-home \    
    --uid "$\{UID\}" \    
    "$\{USER\}"

```

We will need to copy over the ca-certificates to the final stage, this is only required if you are making https calls and we will also need to copy over the passwd and group files to use our appuser. Finally we need get the stage to use our user.

```
# Copy over the necessary files
COPY --from=builder \
    /etc/ssl/certs/ca-certificates.crt \
    /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
# Use our user!
USER appuser:appuser
```

So finally your Dockerfile should look something like this:


```
# Create a builder stage
FROM golang:alpine as builder

RUN apk update
RUN apk add --no-cache git ca-certificates \
    && update-ca-certificates

ENV USER=appuser
ENV UID=10001 

RUN adduser \    
    --disabled-password \    
    --gecos "" \    
    --home "/nonexistent" \    
    --shell "/sbin/nologin" \    
    --no-create-home \    
    --uid "${UID}" \    
    "${USER}"

COPY . .

# Fetch dependencies
RUN go mod download
RUN go mod verify

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-w -s" \
    -o /go/bin/my-docker-binary

# Create clean image
FROM scratch

# Copy only the static binary
COPY --from=builder \
    /go/bin/my-docker-binary \
    /go/bin/my-docker-binary
COPY --from=builder \
    /etc/ssl/certs/ca-certificates.crt \
    /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

# Use our user!
USER appuser:appuser

# Run the binary
ENTRYPOINT ["/go/bin/my-docker-binary"]

```