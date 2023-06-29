---
title: "11.Docker volumes "
description: "Docker volumes"
weight : 11
---

Docker volumes
# How to create encrypted data volume 


Create a Docker volume using the docker volume create command, for example:

```
$ docker volume create encrypted_volume
```

Create a Docker container that will be used to create the encrypted volume. For this, you can use a tool like luksipc, which allows you to create a LUKS-encrypted file within a container.

Run the `luksipc`container with the `--volume` flag to specify the Docker volume you want to encrypt. For example:

```
$ docker run --rm -it --volume encrypted_volume:/volume luksipc create
```

Follow the prompts to create the encrypted volume. You will be asked to specify a passphrase that will be used to encrypt and decrypt the volume.

Once the volume is created, you can use it like any other Docker volume. For example, you can mount it to a container using the -v flag:

```
$ docker run --rm -it -v encrypted_volume:/data ubuntu bash

```

To decrypt the volume, you can use the `luksipc` container again and specify the unlock command. You will be prompted for the passphrase you specified when creating the volume:

```
$ docker run --rm -it --volume encrypted_volume:/volume luksipc unlock

```

You can then access the decrypted data within the volume from within the container.
Note: This is just one example of how to create an encrypted Docker volume. There are other tools and methods available that you can use to achieve the same result.