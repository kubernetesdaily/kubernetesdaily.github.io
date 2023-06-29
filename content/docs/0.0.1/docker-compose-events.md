---
title: "31.Docker Compose CLI - Events Command "
description: " Receive real time events from containers. "
weight: 32
---


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