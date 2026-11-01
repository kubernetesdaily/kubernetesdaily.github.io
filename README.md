# KubeDaily

[![Continuous Integration](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/kubernetesdaily/kubernetesdaily.github.io/actions/workflows/pages.yml)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.30%2B%20GA-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Free & Open](https://img.shields.io/badge/Community-100%25%20Free%20%26%20Open-8b5cf6.svg)](https://kubedaily.com)

Democratizing **Cloud-Native and Container Engineering**. From your first container namespace to production-grade Kubernetes operators in Rust and enterprise Zero-Trust architectures.

🌐 **[Website](https://kubedaily.com)** · 🛡️ **[Threat Model Studio](https://kubedaily.com/threat-model)** · 🧪 **[24 Master Labs](https://kubedaily.com/labs/)** · 🔬 **[54 Architectural Deep-Dives](https://kubedaily.com/blog/)** · 🧰 **[340+ Tool Catalog](https://kubedaily.com/tools/)** · 🗺️ **[1,000-Item Roadmap](https://kubedaily.com/roadmap/)**

---

## Table of Contents

- [What is KubeDaily?](#what-is-kubedaily)
- [Key Features & Platform Capabilities](#key-features--platform-capabilities)
  - [1. Threat Model & Security Architecture Studio (`/threat-model`)](#1-threat-model--security-architecture-studio-threat-model)
  - [2. Hands-On Master Labs (`/labs`)](#2-hands-on-master-labs-labs)
  - [3. Architectural Tool Field Guides (`/blog`)](#3-architectural-tool-field-guides-blog)
  - [4. Curated Cloud-Native Tools Directory (`/tools`)](#4-curated-cloud-native-tools-directory-tools)
  - [5. Public Curriculum Roadmap (`/roadmap`)](#5-public-curriculum-roadmap-roadmap)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Local Development Setup](#local-development-setup)
- [Contributor Guide](#contributor-guide)
  - [Contributing to the Threat Model & Security Studio](#contributing-to-the-threat-model--security-studio)
  - [Contributing Master Labs & Blog Guides](#contributing-master-labs--blog-guides)
  - [Contributing to the 340+ Tool Catalog](#contributing-to-the-340-tool-catalog)
- [Pre-Commit Verification Pipeline](#pre-commit-verification-pipeline)
- [Repository Layout](#repository-layout)
- [Community & Grassroots Leadership](#community--grassroots-leadership)
- [License](#license)

---

## What is KubeDaily?

KubeDaily is an open-source, community-led platform engineered to make real-world, production-ready cloud-native education accessible to everyone. We believe deep distributed systems engineering shouldn't be locked behind enterprise paywalls or diluted into superficial "hello world" tutorials.

Everything on KubeDaily is:
- **100% Free Forever**: Zero paywalls, zero sponsored rankings, zero vendor bias.
- **Production-Realistic**: Real failure scenarios, authentic Kubernetes 1.30+ GA manifests, eBPF kernel hooks, and memory-safe Rust operators.
- **Visual-First**: Interactive vector diagrams (Draw.io SVG visualizer, Pele diagrams) turning distributed systems concepts into intuitive mental models.

---

## Key Features & Platform Capabilities

### 1. Threat Model & Security Architecture Studio (`/threat-model`)

An enterprise-grade, interactive Kubernetes threat modeling, policy-as-code, and incident response hub:

- **4-Sheet Interactive Draw.io Visualizer**:
  - *Sheet 1*: Complete Master Architecture & Threat Model.
  - *Sheet 2*: Kubernetes Security Architecture Only.
  - *Sheet 3*: Kubernetes Security Flow Analysis.
  - *Sheet 4*: Attack Paths & Exploit Chains Only.
  - Includes pan, zoom, element selection, and a slide-over Inspector Drawer with deep architectural analysis.
- **Multi-Engine Policy-as-Code Toggle**:
  - Instantaneous 3-way toggle between **Kyverno v1**, **Kubernetes Native In-Tree CEL** (`ValidatingAdmissionPolicy` [K8s 1.30+ GA]), and **OPA Gatekeeper** (Rego `ConstraintTemplate` + `Constraint`).
  - Available across all attack scenarios (`p1`–`p6`), defense controls (`c01`–`c17`), and the Policy-as-Code Library.
- **Interactive Hardening Scorecard & Posture Auditor**:
  - 20 CIS Benchmark and NIST SP 800-190 controls across 5 domains (*Pod Security*, *Network Segmentation*, *Identity & RBAC*, *Node & Host Hardening*, *Supply Chain & Admission*).
  - Dynamic circular SVG posture gauge, profile presets (`Standard Baseline`, `Zero-Trust Restricted`), LocalStorage state persistence.
  - 1-click **Export Remediation Bundle** (downloads missing policies in Kyverno, CEL, or Gatekeeper format) and **Export Audit Report** (Markdown).
- **MITRE ATT&CK for Containers Matrix Heatmap**:
  - 10 tactics and 28 container-specific techniques mapped to threat scenarios and defense controls.
  - Interactive search, tactic filtering, risk coloring, and direct 1-click **Export MITRE Navigator JSON**.
- **Red/Blue Team Attack Simulation Playbooks**:
  - 6 executable lab test scenarios for KinD / Minikube simulating container breakouts, token theft, unauthenticated Kubelet RCE, IMDS SSRF, and sidecar namespace sharing.
  - Dual-mode tabs for **🔴 Red Team (Exploit Simulation)** vs. **🔵 Blue Team (Defensive Validation)** with 1-click bash script download.
- **1-Click Production Security Bundles**:
  - 5 pre-packaged, ready-to-deploy YAML suites: Kyverno Zero-Trust, CEL In-Tree Admission, Zero-Trust NetworkPolicies, Falco eBPF runtime rules, and complete CIS benchmark suite.
- **Emergency Incident Response Runbooks**:
  - 6 operational containment procedures (`IR-01` to `IR-06`) for pod isolation, token revocation, node draining, CRI-O memory checkpoints, IMDS severance, and supply chain rollbacks.

### 2. Hands-On Master Labs (`/labs`)

24 comprehensive, battle-tested labs covering:
- Full CKA, CKAD, and CKS curriculum.
- Linux Containers from scratch: `unshare`, Mount/PID/Net/User namespaces, Cgroups v2 memory limits, `pivot_root`, and rootless sandboxing.
- Rust Kubernetes Operators with `kube-rs`: custom resources, async reconcilers, and finalizers.
- Advanced networking: Cilium eBPF, iptables bypass, CoreDNS ndots tuning, Istio mTLS.
- GitOps & Delivery: Argo CD ApplicationSets, sync waves, automated drift healing.
- Autoscaling & FinOps: Karpenter just-in-time provisioning, KEDA event-driven autoscaling.

### 3. Architectural Tool Field Guides (`/blog`)

54 technical deep-dives explaining real-world trade-offs, production manifests, benchmark comparisons, and disaster recovery procedures tested against real clusters.

### 4. Curated Cloud-Native Tools Directory (`/tools`)

A searchable, categorized directory of 340+ open-source cloud-native projects across 27 domains with live GitHub star telemetry, category filtering, and direct links.

### 5. Public Curriculum Roadmap (`/roadmap`)

A structured, 1,000-item learning roadmap across 8 cloud-native engineering tracks from container fundamentals to platform engineering.

---

## Architecture & Tech Stack

- **Backend / Web Harness**: [Elixir](https://elixir-lang.org/) (1.14+) and [Erlang/OTP](https://www.erlang.org/) (25+) with [Phoenix Framework](https://www.phoenixframework.org/) (1.7+) and Phoenix LiveView / HEEX templates.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with full responsive design and dark mode support.
- **Diagram Compilation Engine**: Uncompressed multi-sheet Draw.io XML (`.drawio`) compiled to optimized SVGs with embedded metadata via a custom Node.js pipeline (`scripts/compile_drawio.js`).
- **Interactive Visualizer & Security Data**: Vanilla ES6 modules (`priv/static/kubedaily/js/threat-model-data.js`), SVG Pan-Zoom, client-side LocalStorage caching, and zero tracking dependencies.
- **Static Export**: Custom Mix task (`mix kubedaily.export`) generating static HTML for fast global CDN distribution via GitHub Pages.

---

## Local Development Setup

### Prerequisites

- **Elixir** (1.14 or later)
- **Erlang/OTP** (25 or later)
- **Node.js** (18 or later) & **npm**

### Quickstart

1. **Clone the repository**:
   ```sh
   git clone https://github.com/kubernetesdaily/kubernetesdaily.github.io.git
   cd kubernetesdaily.github.io
   ```

2. **Install dependencies and setup assets**:
   ```sh
   mix setup
   ```

3. **Start the Phoenix development server**:
   ```sh
   mix phx.server
   ```

4. **Visit the application**:
   Open [http://localhost:4000](http://localhost:4000) in your browser.

---

## Contributor Guide

We warmly welcome contributions from everyone—whether fixing a typo, updating a policy manifest, authoring a new lab, or adding an open-source tool.

### Contributing to the Threat Model & Security Studio

#### Diagram Pipeline (`.drawio` → `.svg`)
Diagram source files live in `priv/static/kubedaily/threat-model/` and `priv/static/kubedaily/diagrams/`:
- Edit `.drawio` files using [Draw.io desktop or web](https://app.diagrams.net/).
- Compile the multi-sheet diagram to optimized SVGs:
  ```sh
  # Using the Mix task wrapper:
  mix kubedaily.drawio

  # Or run the compilation script directly:
  node scripts/compile_drawio.js
  ```

#### Data-Driven Architecture (`threat-model-data.js`)
All security controls, attack paths, playbooks, scorecard checks, and incident runbooks are defined in `priv/static/kubedaily/js/threat-model-data.js`.

When contributing new security content:
1. **Multi-Engine Consistency**: Every attack scenario and defense control must provide matching policies for:
   - **`kyverno`**: Valid Kyverno v1 YAML (`ValidationFailureAction: Enforce`).
   - **`cel`**: Kubernetes 1.30+ GA In-Tree `ValidatingAdmissionPolicy` and `ValidatingAdmissionPolicyBinding`.
   - **`gatekeeper`**: OPA Gatekeeper `ConstraintTemplate` with Rego logic + `Constraint`.
2. **Scorecard Checks**: Add new CIS/NIST checks to `window.KUBEDAILY_SCORECARD_DATA` with domain, severity, and remediation snippets for all 3 engines.
3. **MITRE Matrix**: Map techniques to container tactics in `window.KUBEDAILY_MITRE_MATRIX`.
4. **Lab Playbooks**: Add offensive red simulation and defensive blue validation steps to `window.KUBEDAILY_ATTACK_PLAYBOOKS`.
5. **Incident Runbooks**: Follow the step-by-step containment schema in `window.KUBEDAILY_INCIDENT_RUNBOOKS`.
6. **Brand Integrity**: All diagrams, code, and documentation must carry **100% KubeDaily branding**. Never reference or link external third-party diagram clones or forks.

### Contributing Master Labs & Blog Guides

- **New Lab**:
  1. Create `priv/static/kubedaily/labs/<id>.md`.
  2. Add lab metadata to `priv/static/kubedaily/data/labs.json`.
  3. Ensure it has **Before you start**, **Practice**, and **Clean up** sections.
- **New Blog Guide**:
  1. Create `priv/static/kubedaily/blog/<id>.md`.
  2. Add guide metadata to `priv/static/kubedaily/data/blog.json`.
- See [CONTRIBUTING.md](CONTRIBUTING.md) and [`docs/templates/`](docs/templates/) for full authoring conventions and SEO guidelines.

### Contributing to the 340+ Tool Catalog

- Tool catalog entries live in `priv/static/kubedaily/entries.js`.
- Add the project's name, URL, repository, description, and primary cloud-native category.

---

## Pre-Commit Verification Pipeline

All pull requests must pass our automated quality gates before merging. Run the following verification checklist locally:

```sh
# 1. Verify Elixir code formatting
mix format --check-formatted

# 2. Verify all Markdown files have strictly balanced code fences
python3 scripts/check_all_fences.py

# 3. Check syntax of Threat Model JavaScript data
node -c priv/static/kubedaily/js/threat-model-data.js

# 4. Check for trailing whitespaces or formatting issues
git diff --check

# 5. Run the full test suite (all tests must pass)
mix test

# 6. Verify production asset compilation and static export
mix assets.deploy
mix kubedaily.export --output _site
```

---

## Repository Layout

```
kubernetesdaily.github.io/
├── assets/                     # Frontend assets (Tailwind CSS, JavaScript)
├── config/                     # Elixir/Phoenix configuration
├── docs/templates/             # Authoring templates for guides and labs
├── lib/
│   ├── mix/tasks/              # Custom Mix tasks (export, drawio compilation)
│   ├── school_house/           # Core domain logic (catalog loader, markdown engine)
│   └── school_house_web/       # Phoenix web controllers, templates & HEEX views
│       └── templates/kube_daily/
│           ├── index.html.heex         # Homepage & Feature Spotlight
│           ├── threat_model.html.heex  # Threat Model Studio & Interactive Viewer
│           ├── lab.html.heex           # Hands-on Lab Reader
│           └── post.html.heex          # Blog Guide Reader
├── priv/static/kubedaily/
│   ├── blog/                   # 54 Architectural deep-dive Markdown files
│   ├── labs/                   # 24 Hands-on Master Lab Markdown files
│   ├── data/                   # Catalog JSON metadata (blog.json, labs.json)
│   ├── threat-model/           # Draw.io source diagrams & compiled SVG assets
│   ├── js/
│   │   ├── threat-model-data.js # Threat scenarios, 3-engine policies & runbooks
│   │   └── svg-pan-zoom.min.js # Interactive SVG pan & zoom engine
│   └── entries.js              # 340+ curated tool directory database
├── scripts/
│   ├── compile_drawio.js       # Node.js Draw.io multi-sheet SVG compiler
│   └── check_all_fences.py     # Code fence balance validator
├── test/                       # ExUnit test suite (controllers, markdown, assets)
└── README.md                   # You are here!
```

---

## Community & Grassroots Leadership

KubeDaily was founded in the community, for the community. Our contributors regularly organize grassroots meetups, host hands-on workshops, and deliver keynotes at industry conferences:
- **Cybersecurity Keynote**: B-Sides Bangalore Cybersecurity Conference
- **Community Meetups**: Docker Pune & CNCF Chapter Meetups
- **CNCF Community Forum**: Kubernetes Forum Bengaluru
- **Enterprise Workshops**: SAP Labs Hands-On Container Days

Join us in making cloud-native engineering open, transparent, and accessible to everyone!

---

## License

This project is licensed under the terms of the open-source license found in the [LICENSE](LICENSE) file. All community learning materials, manifests, and diagrams are freely available for educational and production use.
