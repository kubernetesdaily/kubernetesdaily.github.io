# Build Smaller, Safer Docker Images

A good container image is reproducible, understandable, and contains only what the application needs. This guide builds a tiny Go HTTP service with a multi-stage Dockerfile, then explains caching, non-root execution, and image maintenance.

## Before you start

Use a local Docker installation and an empty working directory. Allow about 20 minutes. The example downloads base images from Docker Hub and binds a port only to localhost. You do not need Kubernetes or a registry account.

## Create a small application

Save this as `main.go`:

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello from a container")
    })
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

This is a learning server, not a production HTTP configuration. Before shipping, add request timeouts, graceful shutdown, and application-specific observability.

## Separate build tools from runtime files

Save this as `Dockerfile`:

```dockerfile
FROM golang:1-alpine AS build
WORKDIR /src
COPY main.go .
RUN CGO_ENABLED=0 go build -trimpath -o /out/server main.go

FROM scratch
COPY --from=build /out/server /server
USER 65532:65532
EXPOSE 8080
ENTRYPOINT ["/server"]
```

The first stage has a compiler. The final stage contains only the resulting binary and image metadata, not the compiler or source tree. Disabling CGO makes this simple application work without a system C library. Applications using native dependencies may need a different runtime base.

`scratch` has no shell, certificates, timezone database, or package manager. That is useful here because this service needs none of them; it is not a universal recommendation. An application making outbound HTTPS requests needs a CA trust store. A small image is not automatically a secure image.

The builder tag is intentionally convenient for a lab. For reproducible delivery, choose a supported Go release, pin the reviewed image digest, and automate updates. Pinning without updating simply freezes old vulnerabilities.

## Limit the build context

Save this as `.dockerignore`:

```text
.git
.env
.env.*
*.pem
*.key
coverage
```

A `.dockerignore` reduces accidental exposure and context size. It is not a replacement for checking what you commit or copy. Never pass credentials through Dockerfile `ARG`, `ENV`, or `COPY`; use [BuildKit secret mounts](https://docs.docker.com/build/building/secrets/) when a build genuinely needs credentials.

## Build and run locally

These commands create a local image and a container. Make sure the container name and port are not already in use:

```bash
docker build -t kubedaily-hello:local .
docker run --detach --name kubedaily-hello \
  --publish 127.0.0.1:8080:8080 \
  --read-only --cap-drop=ALL \
  --security-opt=no-new-privileges \
  kubedaily-hello:local
curl --fail http://127.0.0.1:8080/
```

Expected response: `Hello from a container`. `EXPOSE` documents the container port; only `--publish` makes it accessible through the host. Binding to `127.0.0.1` avoids exposing the example to your network.

The process uses a numeric non-root UID. Dropping capabilities and making the filesystem read-only reduce what it can do, but containers still share the host kernel: these options do not turn arbitrary code into trusted code.

## Inspect the result

```bash
docker image inspect kubedaily-hello:local --format '{{.Config.User}}'
docker image inspect kubedaily-hello:local --format '{{.Size}}'
docker history kubedaily-hello:local
docker logs kubedaily-hello
```

Expected user: `65532:65532`. Size varies with compiler and architecture. There is no shell in this image, so `docker exec ... sh` will not work; use logs and your normal observability workflow instead.

For applications with dependencies, copy lockfiles before frequently changing source files so dependency installation can reuse the build cache. Cache reuse improves build speed; it does not guarantee dependencies are up to date.

## Practice checkpoint

1. Change the response text, rebuild, remove the old container, and run the new image. Did the running container change automatically? It should not: containers do not update when an image tag is rebuilt.
2. Explain why the compiler is absent from the final image.
3. Explain why a vulnerability scan must cover the application binary and dependencies, not just operating-system packages.

## Clean up

These commands remove only this example's container and image:

```bash
docker rm --force kubedaily-hello
docker image rm kubedaily-hello:local
```

## Next steps

- [Docker fundamentals](/labs/Learn-Docker/)
- [Deploy and inspect with kubectl](/labs/Learn-kubectl/)
- [Docker multi-stage build documentation](https://docs.docker.com/build/building/multi-stage/)
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)
