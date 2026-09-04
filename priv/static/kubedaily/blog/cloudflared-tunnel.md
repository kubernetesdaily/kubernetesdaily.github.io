
title : cloudflared tunnel on kubernetes

description : How to install cloudflared tunnel on kubernetes


## What is cloudflared tunnel?

Cloudflare Tunnel is a reverse proxy that enables you to expose applications running on your local web server, on any network with an Internet connection, without adding DNS records or configuring a firewall or router. Cloudflare Tunnel establishes outbound connections to Cloudflare’s nearest data center and creates secure tunnels between the data center and a locally running web server.

## How to install cloudflared tunnel on kubernetes?

### Create a namespace

```bash
kubectl create ns cloudflared
```

### Create a secret

```bash

