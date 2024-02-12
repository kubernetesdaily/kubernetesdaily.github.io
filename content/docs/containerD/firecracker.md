---
title: " firecracker "
weight : 6
---


get docker installed https://get.docker.com 



### build firecracker 

git clone https://github.com/firecracker-microvm/firecracker
cd firecracker
tools/devtool build
toolchain="$(uname -m)-unknown-linux-musl"


you get output like thjis thats binary 


[Firecracker release.sh 2024-02-11T13:42:36+00:00] Binaries placed under build/cargo_target/aarch64-unknown-linux-musl/debug
sangam@sangam:~/firecracker$ toolchain="$(uname -m)-unknown-linux-musl"


TODO 

