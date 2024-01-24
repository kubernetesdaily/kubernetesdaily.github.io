---
title: "Compose Logs Command"
slug: "Compose-Logs-Command"
weight : 35
---



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