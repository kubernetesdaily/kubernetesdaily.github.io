---
title: "Architecture of containerd"
slug: "architecture-of-containerd"
weight : 1
---



![](https://containerd.io/img/architecture.png)

This diagram represents the architecture of containerd, an industry-standard core container runtime. It is designed to be less opinionated and can be used as a base for building a more complex container platform. Let's break down the architecture depicted in the image:

**Ecosystem Layer**

The topmost layer is the ecosystem that interacts with containerd. It includes:

- Platforms: Cloud platforms and container orchestration systems that use containerd as their runtime, such as Google Cloud Platform, Docker, IBM Cloud, Microsoft Azure, Alibaba Cloud, AWS, and others.

- Clients: Tools that interact with containerd, like kubectl for Kubernetes, Docker CLI, ctr (containerd's own CLI tool), BuildKit for building containers, and others.

- CRI Runtime: containerd is compatible with the Kubernetes Container Runtime Interface (CRI), making it possible to use containerd as the runtime in Kubernetes.


**containerd Layer**

This is the core of containerd, divided into several components:

- API: The gRPC API layer through which clients communicate with containerd. It defines service handlers for various container management tasks.

- Service Handlers: These are gRPC services that handle API requests. They include services for managing containers, images, snapshots, tasks, namespaces, and more.

**Core Layer**

This is where the main functionality of containerd resides:

- Services: These are the backend services that do the actual work. They include:
Containers Service: Manages container metadata.

- Content Service: Manages the storage and retrieval of content like layers and config.

- Diff Service: Handles layer diff computations.

- Images Service: Manages image metadata.
Leases Service: Manages client leases for resources.

- Namespaces Service: Provides multi-tenancy by segregating resources per namespace.

- Snapshots Service: Manages filesystem snapshots.

- Tasks Service: Manages the execution of containers.

**Backend Layer**

The backend consists of the components that interact with the host system:

- Content Store: Storage for content like container images. This can be local storage or a plugin.

- Snapshotter: Handles the creation of filesystem snapshots. There are various snapshotter plugins available, including overlay, btrfs, devmapper, native, and windows.

- Runtime: This is where the containers are actually run. containerd supports multiple runtimes:

- runc: The default OCI runtime for Linux containers.

- runhcs: A runtime for running Windows containers.

- Kata Containers: Provides lightweight VMs that offer more isolation than traditional container environments.

- Firecracker: A microVM manager for creating and managing microVMs.
gVisor: A user-space kernel for providing sandboxed environments.

- V2 shim client: A newer version of the shim that manages the lifecycle of the containers and the host processes related to it.

**System Layer**

The bottom layer represents the system dependencies:

- Operating Systems: The diagram shows containerd being compatible with ARM and Intel architectures, indicating cross-platform support.

- Linux Penguins: Symbolizes that containerd is a Linux-native technology, but it also supports Windows as indicated by the "windows" snapshotter.
Metrics Off to the side, there is a connection to Prometheus, which is a monitoring system that collects metrics. containerd has built-in support for exporting metrics that Prometheus can scrape and use for monitoring and alerting.

- Overall, containerd is designed to handle the lifecycle of containers and images in a container system, manage storage and execution, and allow for extensive customization through plugins and external tooling. It is a key component in many modern container platforms, offering a balance between functionality and flexibility.