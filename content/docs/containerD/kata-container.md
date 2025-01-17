---
title: " Kata Containers "
weight : 5
---


### Kata Containers 

```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/kata-containers/kata-containers/main/utils/kata-manager.sh)"
```

If your system already has containerd installed, to install Kata Containers and only configure containerd, run:

```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/kata-containers/kata-containers/main/utils/kata-manager.sh) -o"
```

if you have not installed anything use this to get setup everything 

```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/kata-containers/kata-containers/main/utils/kata-manager.sh) -h"
```



#### verify installation 

```
 bash -c "$(curl -fsSL https://raw.githubusercontent.com/kata-containers/kata-containers/main/utils/kata-manager.sh) -o
> "
INFO: Checking dependencies
INFO: Running pre-checks
INFO: Downloading Kata Containers release (latest version)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  132M  100  132M    0     0  5000k      0  0:00:27  0:00:27 --:--:-- 4777k
INFO: Installing Kata Containers release 3.2.0 from /tmp/tmp.3iqScS54QS/kata-static-3.2.0-arm64.tar.xz
[sudo] password for sangam: 
./
./opt/
./opt/kata/
./opt/kata/VERSION
./opt/kata/bin/
./opt/kata/bin/containerd-shim-kata-v2
./opt/kata/bin/firecracker
./opt/kata/bin/kata-monitor
./opt/kata/bin/jailer
./opt/kata/bin/qemu-system-aarch64
./opt/kata/bin/kata-collect-data.sh
./opt/kata/bin/kata-runtime
./opt/kata/bin/cloud-hypervisor
./opt/kata/libexec/
./opt/kata/libexec/nydusd
./opt/kata/libexec/virtiofsd
./opt/kata/versions.yaml
./opt/kata/share/
./opt/kata/share/kata-qemu/
./opt/kata/share/kata-qemu/qemu/
./opt/kata/share/kata-qemu/qemu/edk2-i386-code.fd
./opt/kata/share/kata-qemu/qemu/qboot.rom
./opt/kata/share/kata-qemu/qemu/hppa-firmware.img
./opt/kata/share/kata-qemu/qemu/s390-netboot.img
./opt/kata/share/kata-qemu/qemu/vof-nvram.bin
./opt/kata/share/kata-qemu/qemu/s390-ccw.img
./opt/kata/share/kata-qemu/qemu/bios.bin
./opt/kata/share/kata-qemu/qemu/edk2-arm-code.fd
./opt/kata/share/kata-qemu/qemu/edk2-x86_64-code.fd
./opt/kata/share/kata-qemu/qemu/bios-256k.bin
./opt/kata/share/kata-qemu/qemu/multiboot_dma.bin
./opt/kata/share/kata-qemu/qemu/vof.bin
./opt/kata/share/kata-qemu/qemu/qemu-nsis.bmp
./opt/kata/share/kata-qemu/qemu/bios-microvm.bin
./opt/kata/share/kata-qemu/qemu/linuxboot.bin
./opt/kata/share/kata-qemu/qemu/linuxboot_dma.bin
./opt/kata/share/kata-qemu/qemu/pvh.bin
./opt/kata/share/kata-qemu/qemu/firmware/
./opt/kata/share/kata-qemu/qemu/firmware/50-edk2-i386-secure.json
./opt/kata/share/kata-qemu/qemu/firmware/60-edk2-i386.json
./opt/kata/share/kata-qemu/qemu/firmware/60-edk2-aarch64.json
./opt/kata/share/kata-qemu/qemu/firmware/60-edk2-arm.json
./opt/kata/share/kata-qemu/qemu/firmware/50-edk2-x86_64-secure.json
./opt/kata/share/kata-qemu/qemu/firmware/60-edk2-x86_64.json
./opt/kata/share/kata-qemu/qemu/kvmvapic.bin
./opt/kata/share/kata-qemu/qemu/efi-virtio.rom
./opt/kata/share/kata-qemu/qemu/edk2-licenses.txt
./opt/kata/share/kata-qemu/qemu/edk2-i386-secure-code.fd
./opt/kata/share/kata-qemu/qemu/edk2-aarch64-code.fd
./opt/kata/share/kata-qemu/qemu/edk2-i386-vars.fd
./opt/kata/share/kata-qemu/qemu/edk2-x86_64-secure-code.fd
./opt/kata/share/kata-qemu/qemu/edk2-arm-vars.fd
./opt/kata/share/bash-completion/
./opt/kata/share/bash-completion/completions/
./opt/kata/share/bash-completion/completions/kata-runtime
./opt/kata/share/defaults/
./opt/kata/share/defaults/kata-containers/
./opt/kata/share/defaults/kata-containers/configuration-clh.toml
./opt/kata/share/defaults/kata-containers/configuration-dragonball.toml
./opt/kata/share/defaults/kata-containers/configuration.toml
./opt/kata/share/defaults/kata-containers/configuration-qemu-snp.toml
./opt/kata/share/defaults/kata-containers/configuration-qemu-tdx.toml
./opt/kata/share/defaults/kata-containers/configuration-qemu-sev.toml
./opt/kata/share/defaults/kata-containers/configuration-qemu.toml
./opt/kata/share/defaults/kata-containers/configuration-qemu-nvidia-gpu.toml
./opt/kata/share/defaults/kata-containers/configuration-fc.toml
./opt/kata/share/kata-containers/
./opt/kata/share/kata-containers/vmlinux-6.1.38-114
./opt/kata/share/kata-containers/vmlinuz-6.1.38-114
./opt/kata/share/kata-containers/vmlinuz-dragonball-experimental.container
./opt/kata/share/kata-containers/kata-containers.img
./opt/kata/share/kata-containers/kata-containers-initrd.img
./opt/kata/share/kata-containers/vmlinuz-5.10.25-114-dragonball-experimental
./opt/kata/share/kata-containers/config-6.1.38-114
./opt/kata/share/kata-containers/vmlinuz.container
./opt/kata/share/kata-containers/vmlinux.container
./opt/kata/share/kata-containers/vmlinux-dragonball-experimental.container
./opt/kata/share/kata-containers/vmlinux-5.10.25-114-dragonball-experimental
./opt/kata/share/kata-containers/kata-ubuntu-latest.image
./opt/kata/share/kata-containers/kata-alpine-3.15.initrd
./opt/kata/share/kata-containers/config-5.10.25-114-dragonball-experimental
./opt/kata/runtime-rs/
./opt/kata/runtime-rs/bin/
./opt/kata/runtime-rs/bin/containerd-shim-kata-v2
INFO: Kata Containers installed

INFO: Using default Kata Containers configuration
kata-runtime  : 3.2.0
   commit   : 45687e3251604ccc71b595d37f14253c4584cd5f
   OCI specs: 1.0.2-dev
INFO: Testing Kata Containers
sangam@sangam:~$  kata-runtime --version
kata-runtime  : 3.2.0
   commit   : 45687e3251604ccc71b595d37f14253c4584cd5f
   OCI specs: 1.0.2-dev


```

#### pull and run container using kata shim 

```
sangam@sangam:~$ image="docker.io/library/busybox:latest"
sangam@sangam:~$ sudo ctr run --runtime "io.containerd.kata.v2" --rm -t "$image" test-kata uname -r
sangam@sangam:~$ sudo ctr container list
CONTAINER    IMAGE                               RUNTIME                  
test-kata    docker.io/library/busybox:latest    io.containerd.kata.v2    
```

### You can manually install CNI plugins 

```
git clone https://github.com/containernetworking/plugins.git

pushd plugins

sudo apt install golang-go

sangam@sangam:~/plugins$ ./build_linux.sh
Building plugins 
  bandwidth
  firewall
  portmap
  sbr
  tuning
  vrf
  bridge
  dummy
  host-device
  ipvlan
  loopback
  macvlan
  ptp
  tap
  vlan
  dhcp
  host-local
  static
sangam@sangam:~/plugins$ sudo mkdir /opt/cni
sangam@sangam:~/plugins$ sudo cp -r bin /opt/cni/
sangam@sangam:~/plugins$ popd
```


#### define net conf 
```
sudo mkdir -p /etc/cni/net.d

cat <<EOF | sudo tee /etc/cni/net.d/10-mynet.conf
{
    "cniVersion": "0.3.1",
    "name": "mynet",
    "type": "bridge",
    "bridge": "cni0",
    "isGateway": true,
    "ipMasq": true,
    "ipam": {
        "type": "host-local",
        "subnet": "10.22.0.0/16",
        "gateway": "10.22.0.1"
    }
}
EOF

```
#### lets run your aphine image 

```

sangam@sangam:~$ sudo ctr image pull docker.io/library/busybox:latest
docker.io/library/alpine:latest:                                                  resolved       |++++++++++++++++++++++++++++++++++++++| 
index-sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b:    done           |++++++++++++++++++++++++++++++++++++++| 
manifest-sha256:a0264d60f80df12bc1e6dd98bae6c43debe6667c0ba482711f0d806493467a46: done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:bca4290a96390d7a6fc6f2f9929370d06f8dfcacba591c76e3d5c5044e7f420c:    done           |++++++++++++++++++++++++++++++++++++++| 
config-sha256:ace17d5d883e9ea5a21138d0608d60aa2376c68f616c55b0b7e73fba6d8556a3:   done           |++++++++++++++++++++++++++++++++++++++| 
elapsed: 2.3 s                                                                    total:   0.0 B (0.0 B/s)                                         
unpacking linux/arm64/v8 sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b...
done: 5.499208ms	
sangam@sangam:~$ sudo ctr run --cni --runtime io.containerd.run.kata.v2 -t --rm docker.io/library/busybox:latest hello ech sangam
/ # 

```



### Configure with Docker 
```
sam@sam:~$ cat <<EOF | sudo tee "/usr/bin/containerd-shim-kata_$(echo "$VERSION" | sed 's/\./_/g')-v2" > /dev/null
#!/bin/sh
export KATA_CONF_FILE="$DIR/share/defaults/kata-containers/configuration.toml"
export PATH="$DIR/bin:\$PATH"
exec $DIR/bin/containerd-shim-kata-v2 "\$@"
EOF

sudo chmod +x "/usr/bin/containerd-shim-kata_$(echo "$VERSION" | sed 's/\./_/g')-v2"
[sudo] password for sam: 
sam@sam:~$ cat <<EOF | sudo tee "/usr/bin/kata-runtime-$VERSION" > /dev/null
#!/bin/sh
export KATA_CONF_FILE="$DIR/share/defaults/kata-containers/configuration.toml"
export PATH="$DIR/bin:\$PATH"
exec $DIR/bin/kata-runtime "\$@"
EOF

sudo chmod +x "/usr/bin/kata-runtime-$VERSION"
sam@sam:~$ echo "io.containerd.run.kata_$(echo "$VERSION" | sed 's/\./_/g').v2"
io.containerd.run.kata_.v2
sam@sam:~$ sudo docker run -d --name nginx nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
7ce705000c39: Pull complete 
b3e9225c8fca: Pull complete 
2b39a3d0829e: Pull complete 
6d24e34787c7: Pull complete 
066d623ff8e6: Pull complete 
49486a4a61a6: Pull complete 
34d83bb3522a: Pull complete 
Digest: sha256:0a399eb16751829e1af26fea27b20c3ec28d7ab1fb72182879dcae1cca21206a
Status: Downloaded newer image for nginx:latest
421ac9fbcf95ed8360f4b76fe230effd619ce993c64d9f3d7e5dfd248f655689

```




