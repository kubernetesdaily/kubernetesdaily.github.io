---
title : Arkade Open Source Marketplace for Kubernetes 
author : Sangam Biradar
categories : 
  - Kubernetes
weight : 10
description : add magic to your CLI with Arkade and Increase Productivity 
draft : false
Date : 2023-02-13
author : Sangam Biradar
slug : arkade-open-source-marketplace-for-kubernetes
---

{{< rawhtml >}}
<a href="https://github.com/alexellis/arkade"><img src="https://github-link-card.s3.ap-northeast-1.amazonaws.com/alexellis/arkade.png" width="460px"></a> 

{{< /rawhtml >}}

### Getting started with Arkade CLI 

- Macos/Linux 

```bash

~ curl -sLS https://get.arkade.dev | sudo sh

Password:
Downloading package https://github.com/alexellis/arkade/releases/download/0.9.7/arkade-darwin-arm64 as /tmp/arkade-darwin-arm64
Download complete.

Running with sufficient permissions to attempt to move arkade to /usr/local/bin
New version of arkade installed to /usr/local/bin
Creating alias 'ark' for 'arkade'.
            _             _      
  __ _ _ __| | ____ _  __| | ___ 
 / _` | '__| |/ / _` |/ _` |/ _ \
| (_| | |  |   < (_| | (_| |  __/
 \__,_|_|  |_|\_\__,_|\__,_|\___|

Open Source Marketplace For Developer Tools

Version: 0.9.7
Git Commit: 461fb7a9d05d7e3d13a39e03e1e38b6936cb15bd

 🐳 arkade needs your support: https://github.com/sponsors/alexellis
➜  ~ 

```

### Get list of most needed tools & CLI for all Kubenetes Developer 

```bash
➜  ~ arkade get 
+------------------+--------------------------------------------------------------+
|       TOOL       |                         DESCRIPTION                          |
+------------------+--------------------------------------------------------------+
| actions-usage    | Get usage insights from GitHub Actions.                      |
+------------------+--------------------------------------------------------------+
| actuated-cli     | Official CLI for actuated.dev                                |
+------------------+--------------------------------------------------------------+
| argocd           | Declarative, GitOps continuous delivery tool for Kubernetes. |
+------------------+--------------------------------------------------------------+
| argocd-autopilot | An opinionated way of installing Argo-CD and managing GitOps |
|                  | repositories.                                                |
+------------------+--------------------------------------------------------------+
| arkade           | Portable marketplace for downloading your favourite devops   |
|                  | CLIs and installing helm charts, with a single command.      |
+------------------+--------------------------------------------------------------+
| autok3s          | Run Rancher Lab's lightweight Kubernetes distribution k3s    |
|                  | everywhere.                                                  |
+------------------+--------------------------------------------------------------+
| buildx           | Docker CLI plugin for extended build capabilities with       |
|                  | BuildKit.                                                    |
+------------------+--------------------------------------------------------------+
| bun              | Bun is an incredibly fast JavaScript runtime, bundler,       |
|                  | transpiler and package manager – all in one.                 |
+------------------+--------------------------------------------------------------+
| butane           | Translates human readable Butane Configs into machine        |
|                  | readable Ignition Configs                                    |
+------------------+--------------------------------------------------------------+
| caddy            | Caddy is an extensible server platform that uses TLS by      |
|                  | default                                                      |
+------------------+--------------------------------------------------------------+
| cilium           | CLI to install, manage & troubleshoot Kubernetes clusters    |
|                  | running Cilium.                                              |
+------------------+--------------------------------------------------------------+
| civo             | CLI for interacting with your Civo resources.                |
+------------------+--------------------------------------------------------------+
| clusterawsadm    | Kubernetes Cluster API Provider AWS Management Utility       |
+------------------+--------------------------------------------------------------+
| clusterctl       | The clusterctl CLI tool handles the lifecycle of a Cluster   |
|                  | API management cluster                                       |
+------------------+--------------------------------------------------------------+
| cmctl            | cmctl is a CLI tool that helps you manage cert-manager and   |
|                  | its resources inside your cluster.                           |
+------------------+--------------------------------------------------------------+
| conftest         | Write tests against structured configuration data using the  |
|                  | Open Policy Agent Rego query language                        |
+------------------+--------------------------------------------------------------+
| cosign           | Container Signing, Verification and Storage in an OCI        |
|                  | registry.                                                    |
+------------------+--------------------------------------------------------------+
| cr               | Hosting Helm Charts via GitHub Pages and Releases            |
+------------------+--------------------------------------------------------------+
| crane            | crane is a tool for interacting with remote images and       |
|                  | registries                                                   |
+------------------+--------------------------------------------------------------+
| croc             | Easily and securely send things from one computer to another |
+------------------+--------------------------------------------------------------+
| dagger           | A portable devkit for CI/CD pipelines.                       |
+------------------+--------------------------------------------------------------+
| devspace         | Automate your deployment workflow with DevSpace and develop  |
|                  | software directly inside Kubernetes.                         |
+------------------+--------------------------------------------------------------+
| dive             | A tool for exploring each layer in a docker image            |
+------------------+--------------------------------------------------------------+
| docker-compose   | Define and run multi-container applications with Docker.     |
+------------------+--------------------------------------------------------------+
| doctl            | Official command line interface for the DigitalOcean API.    |
+------------------+--------------------------------------------------------------+
| eksctl           | Amazon EKS Kubernetes cluster management                     |
+------------------+--------------------------------------------------------------+
| eksctl-anywhere  | Run Amazon EKS on your own infrastructure                    |
+------------------+--------------------------------------------------------------+
| faas-cli         | Official CLI for OpenFaaS.                                   |
+------------------+--------------------------------------------------------------+
| firectl          | Command-line tool that lets you run arbitrary Firecracker    |
|                  | MicroVMs                                                     |
+------------------+--------------------------------------------------------------+
| flux             | Continuous Delivery solution for Kubernetes powered by       |
|                  | GitOps Toolkit.                                              |
+------------------+--------------------------------------------------------------+
| flyctl           | Command line tools for fly.io services                       |
+------------------+--------------------------------------------------------------+
| fstail           | Tail modified files in a directory.                          |
+------------------+--------------------------------------------------------------+
| fzf              | General-purpose command-line fuzzy finder                    |
+------------------+--------------------------------------------------------------+
| gh               | GitHub’s official command line tool.                         |
+------------------+--------------------------------------------------------------+
| golangci-lint    | Go linters aggregator.                                       |
+------------------+--------------------------------------------------------------+
| gomplate         | A flexible commandline tool for template rendering. Supports |
|                  | lots of local and remote datasources.                        |
+------------------+--------------------------------------------------------------+
| goreleaser       | Deliver Go binaries as fast and easily as possible           |
+------------------+--------------------------------------------------------------+
| grafana-agent    | Grafana Agent is a telemetry collector for sending           |
|                  | metrics, logs, and trace data to the opinionated Grafana     |
|                  | observability stack.                                         |
+------------------+--------------------------------------------------------------+
| grype            | A vulnerability scanner for container images and filesystems |
+------------------+--------------------------------------------------------------+
| hadolint         | A smarter Dockerfile linter that helps you build best        |
|                  | practice Docker images                                       |
+------------------+--------------------------------------------------------------+
| helm             | The Kubernetes Package Manager: Think of it like             |
|                  | apt/yum/homebrew for Kubernetes.                             |
+------------------+--------------------------------------------------------------+
| helmfile         | Deploy Kubernetes Helm Charts                                |
+------------------+--------------------------------------------------------------+
| hey              | Load testing tool                                            |
+------------------+--------------------------------------------------------------+
| hostctl          | Dev tool to manage /etc/hosts like a pro!                    |
+------------------+--------------------------------------------------------------+
| hubble           | CLI for network, service & security observability for        |
|                  | Kubernetes clusters running Cilium.                          |
+------------------+--------------------------------------------------------------+
| hugo             | Static HTML and CSS website generator.                       |
+------------------+--------------------------------------------------------------+
| influx           | InfluxDB’s command line interface (influx) is an interactive |
|                  | shell for the HTTP API.                                      |
+------------------+--------------------------------------------------------------+
| inlets-pro       | Cloud Native Tunnel for HTTP and TCP traffic.                |
+------------------+--------------------------------------------------------------+
| inletsctl        | Automates the task of creating an exit-server (tunnel        |
|                  | server) on public cloud infrastructure.                      |
+------------------+--------------------------------------------------------------+
| istioctl         | Service Mesh to establish a programmable, application-aware  |
|                  | network using the Envoy service proxy.                       |
+------------------+--------------------------------------------------------------+
| jq               | jq is a lightweight and flexible command-line JSON processor |
+------------------+--------------------------------------------------------------+
| just             | Just a command runner                                        |
+------------------+--------------------------------------------------------------+
| k0s              | Zero Friction Kubernetes                                     |
+------------------+--------------------------------------------------------------+
| k0sctl           | A bootstrapping and management tool for k0s clusters         |
+------------------+--------------------------------------------------------------+
| k10multicluster  | Multi-cluster support for K10.                               |
+------------------+--------------------------------------------------------------+
| k10tools         | Tools for evaluating and debugging K10.                      |
+------------------+--------------------------------------------------------------+
| k3d              | Helper to run Rancher Lab's k3s in Docker.                   |
+------------------+--------------------------------------------------------------+
| k3s              | Lightweight Kubernetes                                       |
+------------------+--------------------------------------------------------------+
| k3sup            | Bootstrap Kubernetes with k3s over SSH < 1 min.              |
+------------------+--------------------------------------------------------------+
| k9s              | Provides a terminal UI to interact with your Kubernetes      |
|                  | clusters.                                                    |
+------------------+--------------------------------------------------------------+
| kail             | Kubernetes log viewer.                                       |
+------------------+--------------------------------------------------------------+
| kanctl           | Framework for application-level data management on           |
|                  | Kubernetes.                                                  |
+------------------+--------------------------------------------------------------+
| kgctl            | A CLI to manage Kilo, a multi-cloud network overlay built on |
|                  | WireGuard and designed for Kubernetes.                       |
+------------------+--------------------------------------------------------------+
| kim              | Build container images inside of Kubernetes. (Experimental)  |
+------------------+--------------------------------------------------------------+
| kind             | Run local Kubernetes clusters using Docker container nodes.  |
+------------------+--------------------------------------------------------------+
| kops             | Production Grade K8s Installation, Upgrades, and Management. |
+------------------+--------------------------------------------------------------+
| krew             | Package manager for kubectl plugins.                         |
+------------------+--------------------------------------------------------------+
| kube-bench       | Checks whether Kubernetes is deployed securely by running    |
|                  | the checks documented in the CIS Kubernetes Benchmark.       |
+------------------+--------------------------------------------------------------+
| kubebuilder      | Framework for building Kubernetes APIs using custom resource |
|                  | definitions (CRDs).                                          |
+------------------+--------------------------------------------------------------+
| kubecm           | Easier management of kubeconfig.                             |
+------------------+--------------------------------------------------------------+
| kubeconform      | A FAST Kubernetes manifests validator, with support for      |
|                  | Custom Resources                                             |
+------------------+--------------------------------------------------------------+
| kubectl          | Run commands against Kubernetes clusters                     |
+------------------+--------------------------------------------------------------+
| kubectx          | Faster way to switch between clusters.                       |
+------------------+--------------------------------------------------------------+
| kubens           | Switch between Kubernetes namespaces smoothly.               |
+------------------+--------------------------------------------------------------+
| kubescape        | kubescape is the first tool for testing if Kubernetes        |
|                  | is deployed securely as defined in Kubernetes Hardening      |
|                  | Guidance by to NSA and CISA                                  |
+------------------+--------------------------------------------------------------+
| kubeseal         | A Kubernetes controller and tool for one-way encrypted       |
|                  | Secrets                                                      |
+------------------+--------------------------------------------------------------+
| kubestr          | Kubestr discovers, validates and evaluates your Kubernetes   |
|                  | storage options.                                             |
+------------------+--------------------------------------------------------------+
| kubetail         | Bash script to tail Kubernetes logs from multiple pods at    |
|                  | the same time.                                               |
+------------------+--------------------------------------------------------------+
| kubeval          | Validate your Kubernetes configuration files, supports       |
|                  | multiple Kubernetes versions                                 |
+------------------+--------------------------------------------------------------+
| kumactl          | kumactl is a CLI to interact with Kuma and its data          |
+------------------+--------------------------------------------------------------+
| kustomize        | Customization of kubernetes YAML configurations              |
+------------------+--------------------------------------------------------------+
| lazygit          | A simple terminal UI for git commands.                       |
+------------------+--------------------------------------------------------------+
| linkerd2         | Ultralight, security-first service mesh for Kubernetes.      |
+------------------+--------------------------------------------------------------+
| mc               | MinIO Client is a replacement for ls, cp, mkdir, diff and    |
|                  | rsync commands for filesystems and object storage.           |
+------------------+--------------------------------------------------------------+
| metal            | Official Equinix Metal CLI                                   |
+------------------+--------------------------------------------------------------+
| minikube         | Runs the latest stable release of Kubernetes, with support   |
|                  | for standard Kubernetes features.                            |
+------------------+--------------------------------------------------------------+
| mixctl           | A tiny TCP load-balancer.                                    |
+------------------+--------------------------------------------------------------+
| mkcert           | A simple zero-config tool to make locally trusted            |
|                  | development certificates with any names you'd like.          |
+------------------+--------------------------------------------------------------+
| nats             | Utility to interact with and manage NATS.                    |
+------------------+--------------------------------------------------------------+
| nats-server      | Cloud native message bus and queue server                    |
+------------------+--------------------------------------------------------------+
| nerdctl          | Docker-compatible CLI for containerd, with support for       |
|                  | Compose                                                      |
+------------------+--------------------------------------------------------------+
| nova             | Find outdated or deprecated Helm charts running in your      |
|                  | cluster.                                                     |
+------------------+--------------------------------------------------------------+
| oh-my-posh       | A prompt theme engine for any shell that can display         |
|                  | kubernetes information.                                      |
+------------------+--------------------------------------------------------------+
| opa              | General-purpose policy engine that enables unified,          |
|                  | context-aware policy enforcement across the entire stack.    |
+------------------+--------------------------------------------------------------+
| operator-sdk     | Operator SDK is a tool for scaffolding and generating code   |
|                  | for building Kubernetes operators                            |
+------------------+--------------------------------------------------------------+
| osm              | Open Service Mesh uniformly manages, secures, and gets       |
|                  | out-of-the-box observability features.                       |
+------------------+--------------------------------------------------------------+
| pack             | Build apps using Cloud Native Buildpacks.                    |
+------------------+--------------------------------------------------------------+
| packer           | Build identical machine images for multiple platforms from a |
|                  | single source configuration.                                 |
+------------------+--------------------------------------------------------------+
| polaris          | Run checks to ensure Kubernetes pods and controllers are     |
|                  | configured using best practices.                             |
+------------------+--------------------------------------------------------------+
| popeye           | Scans live Kubernetes cluster and reports potential issues   |
|                  | with deployed resources and configurations.                  |
+------------------+--------------------------------------------------------------+
| porter           | With Porter you can package your application artifact,       |
|                  | tools, etc. as a bundle that can distribute and install.     |
+------------------+--------------------------------------------------------------+
| promtool         | Prometheus rule tester and debugging utility                 |
+------------------+--------------------------------------------------------------+
| rekor-cli        | Secure Supply Chain - Transparency Log                       |
+------------------+--------------------------------------------------------------+
| rpk              | Kafka compatible streaming platform for mission critical     |
|                  | workloads.                                                   |
+------------------+--------------------------------------------------------------+
| run-job          | Run a Kubernetes Job and get the logs when it's done.        |
+------------------+--------------------------------------------------------------+
| scaleway-cli     | Scaleway CLI is a tool to help you pilot your Scaleway       |
|                  | infrastructure directly from your terminal.                  |
+------------------+--------------------------------------------------------------+
| sops             | Simple and flexible tool for managing secrets                |
+------------------+--------------------------------------------------------------+
| stern            | Multi pod and container log tailing for Kubernetes.          |
+------------------+--------------------------------------------------------------+
| syft             | CLI tool and library for generating a Software Bill of       |
|                  | Materials from container images and filesystems              |
+------------------+--------------------------------------------------------------+
| talosctl         | The command-line tool for managing Talos Linux OS.           |
+------------------+--------------------------------------------------------------+
| tctl             | Temporal CLI.                                                |
+------------------+--------------------------------------------------------------+
| terraform        | Infrastructure as Code for major cloud providers.            |
+------------------+--------------------------------------------------------------+
| terragrunt       | Terragrunt is a thin wrapper for Terraform that provides     |
|                  | extra tools for working with multiple Terraform modules      |
+------------------+--------------------------------------------------------------+
| terrascan        | Detect compliance and security violations across             |
|                  | Infrastructure as Code.                                      |
+------------------+--------------------------------------------------------------+
| tfsec            | Security scanner for your Terraform code                     |
+------------------+--------------------------------------------------------------+
| tilt             | A multi-service dev environment for teams on Kubernetes.     |
+------------------+--------------------------------------------------------------+
| tkn              | A CLI for interacting with Tekton.                           |
+------------------+--------------------------------------------------------------+
| trivy            | Vulnerability Scanner for Containers and other Artifacts,    |
|                  | Suitable for CI.                                             |
+------------------+--------------------------------------------------------------+
| vagrant          | Tool for building and distributing development environments. |
+------------------+--------------------------------------------------------------+
| vault            | A tool for secrets management, encryption as a service, and  |
|                  | privileged access management.                                |
+------------------+--------------------------------------------------------------+
| vcluster         | Create fully functional virtual Kubernetes clusters - Each   |
|                  | vcluster runs inside a namespace of the underlying k8s       |
|                  | cluster.                                                     |
+------------------+--------------------------------------------------------------+
| viddy            | A modern watch command. Time machine and pager etc.          |
+------------------+--------------------------------------------------------------+
| waypoint         | Easy application deployment for Kubernetes and Amazon ECS    |
+------------------+--------------------------------------------------------------+
| yq               | Portable command-line YAML processor.                        |
+------------------+--------------------------------------------------------------+
There are 124 tools, use `arkade get NAME` to download one.
```

### Install any above tool with simple syntax 

```bash
arkade get < NAME OF TOOL > 
```

### lets install one of tool 

kubeconform -  A FAST Kubernetes manifests validator, with support for Custom Resources    

```bash
arkade get kubeconform 

```

output 


```bash
Downloading: kubeconform
2023/04/02 10:12:06 Looking up version for kubeconform
2023/04/02 10:12:08 Found: v0.6.1
Downloading: https://github.com/yannh/kubeconform/releases/download/v0.6.1/kubeconform-darwin-arm64.tar.gz
5.17 MiB / 5.17 MiB [--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00%
/var/folders/xy/3ssjv1j152x3_0ryt4yb982c0000gn/T/kubeconform-darwin-arm64.tar.gz written.
2023/04/02 10:12:11 Looking up version for kubeconform
2023/04/02 10:12:11 Found: v0.6.1
2023/04/02 10:12:11 Extracted: /var/folders/xy/3ssjv1j152x3_0ryt4yb982c0000gn/T/kubeconform
2023/04/02 10:12:11 Copying /var/folders/xy/3ssjv1j152x3_0ryt4yb982c0000gn/T/kubeconform to /Users/sangambiradar/.arkade/bin/kubeconform

Wrote: /Users/sangambiradar/.arkade/bin/kubeconform (9.824MB)

# Add arkade binary directory to your PATH variable
export PATH=$PATH:$HOME/.arkade/bin/

# Test the binary:
/Users/sangambiradar/.arkade/bin/kubeconform

# Or install with:
sudo mv /Users/sangambiradar/.arkade/bin/kubeconform /usr/local/bin/

🐳 arkade needs your support: https://github.com/sponsors/alexellis
➜  ~ export PATH=$PATH:$HOME/.arkade/bin/
➜  ~ /Users/sangambiradar/.arkade/bin/kubeconform
2023/04/02 10:12:35 failing to read data from stdin
➜  ~ sudo mv /Users/sangambiradar/.arkade/bin/kubeconform /usr/local/bin/
Password:
➜  ~ kubeconform                                              
2023/04/02 10:13:00 failing to read data from stdin
➜  ~ kubeconform -h
Usage: kubeconform [OPTION]... [FILE OR FOLDER]...
  -cache string
    	cache schemas downloaded via HTTP to this folder
  -debug
    	print debug information
  -exit-on-error
    	immediately stop execution when the first error is encountered
  -h	show help information
  -ignore-filename-pattern value
    	regular expression specifying paths to ignore (can be specified multiple times)
  -ignore-missing-schemas
    	skip files with missing schemas instead of failing
  -insecure-skip-tls-verify
    	disable verification of the server's SSL certificate. This will make your HTTPS connections insecure
  -kubernetes-version string
    	version of Kubernetes to validate against, e.g.: 1.18.0 (default "master")
  -n int
    	number of goroutines to run concurrently (default 4)
  -output string
    	output format - json, junit, tap, text (default "text")
  -reject string
    	comma-separated list of kinds or GVKs to reject
  -schema-location value
    	override schemas location search path (can be specified multiple times)
  -skip string
    	comma-separated list of kinds or GVKs to ignore
  -strict
    	disallow additional properties not in schema or duplicated keys
  -summary
    	print a summary at the end (ignored for junit output)
  -v	show version information
  -verbose
    	print results for all resources (ignored for tap and junit output)

```

### lets create ngnix deployement and validate kubernetes manifest 

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: "bob"
spec:
  replicas: asd"
  selector:
    app: nginx
  templates:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
```

### check it out if above kubenetes menifest Valid or not with Summary in Json format 

```bash 
kubeconform -summary -output json ngnix.yaml
{
  "resources": [
    {
      "filename": "ngnix.yaml",
      "kind": "ReplicationController",
      "name": "bob",
      "version": "v1",
      "status": "statusInvalid",
      "msg": "problem validating schema. Check JSON formatting: jsonschema: '/spec/replicas' does not validate with https://raw.githubusercontent.com/yannh/kubernetes-json-schema/master/master-standalone/replicationcontroller-v1.json#/properties/spec/properties/replicas/type: expected integer or null, but got string",
      "validationErrors": [
        {
          "path": "/spec/replicas",
          "msg": "expected integer or null, but got string"
        }
      ]
    }
  ],
  "summary": {
    "valid": 0,
    "invalid": 1,
    "errors": 0,
    "skipped": 0
  }
}
```
### add and contribute your favourite cloudNative Tool To arkade 

here is example one of tool - https://github.com/tenable/terrascan


- append your tool with dyanamic templating you will find lot of examples here to learn :- https://github.com/alexellis/arkade/blob/master/pkg/get/tools.go

```bash
tools = append(tools, Tool{
Owner: "tenable",
Repo: "terrascan",
Name: "terrascan",
Description: "Detect compliance and security violations across Infrastructure as Code.", BinaryTemplate: `
{{$osStr := ""}}
{{ if HasPrefix .OS "ming" -}}
{{$osStr = "Windows"}}
{{- else if eq .OS "linux" -}}
{{$osStr = "Linux"}}
{{- else if eq .OS "darwin" -}}
{{$osStr = "Darwin"}}
{{- end -}}
{{$archStr := .Arch}}
{{- if eq .Arch "aarch64" -}}
{{$archStr = "arm64"}}
{{- else if eq .Arch "x86_64" -}}
{{$archStr = "x86_64"}}
{{- end -}}
{{.Name}}_{{slice .Version 1}}_{{$osStr}}_{{$archStr}}.tar.gz`,
})
return tools }

```

### write test cases for above tool 

```bash
func Test_DownloadTerrascan(t *testing.T) { tools := MakeTools()
name := "terrascan"
tool := getTool(name, tools)
tests := []test{
{
os: "darwin",
arch: arch64bit,
version: "v1.11.0",
url: `https://github.com/tenable/terrascan/releases/download/v1.11.0/terrascan_1.11.0_Darwin_x86_64.tar.gz`,
},
{
os: "darwin",
arch: archARM64,
version: "v1.11.0",
url: `https://github.com/tenable/terrascan/releases/download/v1.11.0/terrascan_1.11.0_Darwin_arm64.tar.gz`,
},
{
os: "linux",
arch: arch64bit,
version: "v1.11.0",
url: `https://github.com/tenable/terrascan/releases/download/v1.11.0/terrascan_1.11.0_Linux_x86_64.tar.gz`,
},
{
os: "linux",
arch: archARM64,
version: "v1.11.0",
url: `https://github.com/tenable/terrascan/releases/download/v1.11.0/terrascan_1.11.0_Linux_arm64.tar.gz`,
},
{
os: "ming",
arch: arch64bit,
version: "v1.11.0",
url: `https://github.com/tenable/terrascan/releases/download/v1.11.0/terrascan_1.11.0_Windows_x86_64.tar.gz`,
}, }
for _, tc := range tests {
t.Run(tc.os+" "+tc.arch+" "+tc.version, func(r *testing.T) {
got, err := tool.GetURL(tc.os, tc.arch, tc.version, false) if err != nil {
t.Fatal(err) }
if got != tc.url {
t.Errorf("want: %s, got: %s", tc.url, got) }
}) }
}

```

Join [CloudNativeFolks Community](https://discord.gg/rEvr7vq) or Reach out to me on twitter [@sangamtwts](https://twitter.com/sangamtwts)