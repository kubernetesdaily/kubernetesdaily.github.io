---
title: " contaiNERD + runwasi "
weight : 9
---


#### install rust 

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### clone runwasi 

```
$ git clone https://github.com/containerd/runwasi.git

```

### install wasmedge-containerd-shim

```
cd runwasi
make build-wasmedge
INSTALL="sudo install" LN="sudo ln -sf" make install-wasmedge
```

### run wasm using ctr cli 

```
make load
sudo ctr run --rm --runtime=io.containerd.wasmedge.v1 ghcr.io/containerd/runwasi/wasi-demo-app:latest testwasm /wasi-demo-app.wasm echo 'hello'

```
