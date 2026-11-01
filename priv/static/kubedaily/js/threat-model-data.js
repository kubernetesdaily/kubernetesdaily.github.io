// Kubernetes Threat Model & Architecture Catalog Data
// Native KubeDaily Enterprise Defense Engine
// Authoritative mapping for Threat Actors (TA), Objects (TO), Vectors (AV), Controls (C), and Attack Chains (P1-P6)

window.KUBEDAILY_THREAT_MODEL_DATA = {
  // Architectural presentation views
  views: {
    "overview": {
      title: "Cluster Overview",
      sheet: "cluster",
      level: 0,
      description: "Complete component-level architectural map with all trust boundaries, control plane services, worker nodes, and threat actors.",
      camera: { zoom: 1.0, x: 0, y: 0 }
    },
    "control-plane": {
      title: "Control Plane (CP)",
      sheet: "cluster",
      level: 1,
      description: "High-trust services boundary: kube-apiserver, kube-scheduler, kube-controller-manager, and cloud-controller-manager.",
      camera: { zoom: 1.6, x: -1250, y: -200 },
      highlight: ["ClusterControlPlane", "kube-apiserver", "kube-controller-manager", "kube-scheduler"]
    },
    "datastore-etcd": {
      title: "Datastore & KMS (CPD)",
      sheet: "cluster",
      level: 2,
      description: "ClusterControlPlaneData: etcd distributed key-value store, KMS envelope encryption keys, and backup storage.",
      camera: { zoom: 1.8, x: -1600, y: -200 },
      highlight: ["ClusterControlPlaneData", "etcd", "KMS"]
    },
    "data-plane": {
      title: "Worker Nodes & Data Plane (DP)",
      sheet: "cluster",
      level: 1,
      description: "Worker nodes hosting kubelet, kube-proxy, container runtimes (containerd/CRI-O), CNI plugins, and untrusted workloads.",
      camera: { zoom: 1.4, x: -1200, y: -650 },
      highlight: ["ClusterDataPlane", "kubelet", "kube-proxy", "containerd"]
    },
    "threat-actors": {
      title: "Threat Actors (TA01–TA07)",
      sheet: "cluster",
      level: 2,
      description: "Adversary catalog spanning external internet actors, malicious insiders, compromised workloads, supply-chain adversaries, and cloud operators.",
      camera: { zoom: 1.5, x: -10, y: -80 },
      highlight: ["TA01", "TA02", "TA03", "TA04", "TA05", "TA06", "TA07"]
    },
    "kernel-ebpf": {
      title: "Kernel, eBPF & Low-Level Runtime",
      sheet: "cluster",
      level: 3,
      description: "Hardcore system-level view: Linux kernel namespaces, cgroups v2, seccomp-bpf, CRI unix sockets, and eBPF instrumentation hooks.",
      camera: { zoom: 1.6, x: -1400, y: -800 },
      highlight: ["containerd", "cni-plugins", "kubelet", "c05"]
    },
    "p1-ingress": {
      title: "P1 · Ingress to Pod Takeover",
      sheet: "attack-chains",
      level: 2,
      description: "External attacker exploits vulnerable public ingress application (RCE/SSRF) to execute arbitrary commands inside a container.",
      camera: { zoom: 1.4, x: -10, y: -80 },
      highlight: ["P1"]
    },
    "p2-token-abuse": {
      title: "P2 · Token Abuse & API Pivot",
      sheet: "attack-chains",
      level: 2,
      description: "Attacker harvests mounted service account token (automountServiceAccountToken: true) to query the API server and escalate privileges.",
      camera: { zoom: 1.4, x: -10, y: -500 },
      highlight: ["P2"]
    },
    "p3-supply-chain": {
      title: "P3 · Supply Chain Poisoning",
      sheet: "attack-chains",
      level: 2,
      description: "Compromised CI/CD pipeline or registry credentials inject malicious backdoor into container image deployed to production.",
      camera: { zoom: 1.4, x: -10, y: -950 },
      highlight: ["P3"]
    },
    "p4-container-escape": {
      title: "P4 · Pod Breakout to Node Root",
      sheet: "attack-chains",
      level: 3,
      description: "Exploiting container runtime vulnerabilities, kernel flaws, or overprivileged flags (privileged: true, hostPID, SYS_ADMIN) to break out to the host OS.",
      camera: { zoom: 1.4, x: -1050, y: -80 },
      highlight: ["P4"]
    },
    "p5-cloud-metadata": {
      title: "P5 · Cloud Metadata IAM Pivot",
      sheet: "attack-chains",
      level: 2,
      description: "Accessing node link-local metadata address (169.254.169.254) from within a pod to extract temporary instance IAM role credentials.",
      camera: { zoom: 1.4, x: -1050, y: -500 },
      highlight: ["P5"]
    },
    "p6-secrets-compromise": {
      title: "P6 · Datastore & Secrets Harvest",
      sheet: "attack-chains",
      level: 2,
      description: "Extracting plaintext credentials from unencrypted etcd datastore, exposed backups, or through unauthorized Secret object listing.",
      camera: { zoom: 1.4, x: -1050, y: -950 },
      highlight: ["P6"]
    },
    "layered-architecture": {
      title: "Layered Reference Architecture",
      sheet: "security-architecture",
      level: 1,
      description: "End-to-end layered defense-in-depth model mapping external attack surfaces, identity provider, CI/CD supply chain, control plane, worker nodes, and eBPF detection.",
      camera: { zoom: 1.0, x: 0, y: 0 }
    },
    "identity-access": {
      title: "01 · Identity & Admin Access",
      sheet: "security-architecture",
      level: 2,
      description: "Platform operator, OIDC / IdP authentication, short-lived tokens, kubectl access, and GitOps / CI scoped credentials.",
      camera: { zoom: 1.5, x: -50, y: -200 },
      highlight: ["Identity", "OIDC", "Platform operator", "GitOps"]
    },
    "supply-chain-zone": {
      title: "02 · Software Supply Chain",
      sheet: "security-architecture",
      level: 2,
      description: "Source repository approvals, isolated CI image builder, SLSA-style provenance, SBOM, and immutable signed container registry.",
      camera: { zoom: 1.5, x: -50, y: -700 },
      highlight: ["Supply", "SBOM", "Cosign", "Registry"]
    },
    "worker-isolation": {
      title: "03 · Worker Node Isolation & CNI",
      sheet: "security-architecture",
      level: 2,
      description: "Worker Node A and B runtime security, containerd/CRI-O unix sockets, CNI datapath, Default-Deny NetworkPolicy, and Linux kernel namespaces/cgroups.",
      camera: { zoom: 1.4, x: -1800, y: -600 },
      highlight: ["Worker", "CNI", "containerd", "NetworkPolicy"]
    },
    "api-request-flow": {
      title: "04 · API Request & Admission Flow",
      sheet: "flow-analysis",
      level: 1,
      description: "Step-by-step request flow: Client Identity (OIDC/SA) -> API TLS (6443) -> AuthN (tokens/certs) -> AuthZ (RBAC/webhooks) -> Admission (PSA/policies) -> Storage (etcd).",
      camera: { zoom: 1.2, x: -30, y: -200 },
      highlight: ["Client identity", "API TLS", "AuthN", "AuthZ", "Admission", "Storage"]
    },
    "ingress-egress-flow": {
      title: "04 · Ingress & Egress Data Paths",
      sheet: "flow-analysis",
      level: 2,
      description: "Network data path traversing Edge LB, Ingress Controller / Gateway API, Service, Pod mTLS, and Egress filtering with DNS inspection.",
      camera: { zoom: 1.2, x: -30, y: -700 },
      highlight: ["Edge LB", "Ingress", "Gateway", "Egress", "DNS"]
    },
    "supply-chain-flow": {
      title: "04 · CI/CD Supply Chain Flow",
      sheet: "flow-analysis",
      level: 2,
      description: "Supply chain pipeline checkpoints: Developer commit -> CI build -> Vulnerability scanning -> Cosign signature -> Admission webhook verification.",
      camera: { zoom: 1.2, x: -30, y: -1150 },
      highlight: ["Developer", "CI build", "Image scan", "Cosign", "Admission"]
    },
    "escape-containment-flow": {
      title: "04 · Pod Escape & Observability",
      sheet: "flow-analysis",
      level: 3,
      description: "Conditional attack path from pod exploit to host breakout, alongside runtime defense-in-depth checkpoints (C08, C09, C14, C16/C17) and telemetry signals.",
      camera: { zoom: 1.2, x: -1600, y: -1150 },
      highlight: ["Pod compromise", "Node privilege", "Defense-in-depth", "Observability"]
    }
  },

  // STRIDE Threat Modeling Taxonomy
  stride: {
    "S": {
      name: "Spoofing",
      fullName: "Identity & Authenticator Spoofing",
      desc: "Impersonating legitimate users, pods, nodes, or ServiceAccounts (e.g., anonymous access, ARP poisoning, client CA compromise, missing NodeRestriction)."
    },
    "T": {
      name: "Tampering",
      fullName: "State & Data Tampering",
      desc: "Unauthorized modification of cluster state, etcd records, container filesystems, runtime memory, or mutating webhook injection."
    },
    "R": {
      name: "Repudiation",
      fullName: "Audit Failure & Repudiation",
      desc: "Executing administrative or cluster actions without non-repudiable audit logs, tamper-evident trails, or eBPF forensic telemetry."
    },
    "I": {
      name: "Information Disclosure",
      fullName: "Confidentiality & Information Disclosure",
      desc: "Exposing cluster secrets, API bearer tokens, cloud metadata (IMDS), environment variables, or unencrypted pod traffic in transit."
    },
    "D": {
      name: "Denial of Service",
      fullName: "Resource Starvation & Denial of Service",
      desc: "Exhausting API rate limits, etcd IOPS/disk space, worker node CPU/memory quotas, or iptables connection tracking tables."
    },
    "E": {
      name: "Elevation of Privilege",
      fullName: "Authorization Bypass & Privilege Escalation",
      desc: "Escalating from unprivileged container process to host root OS, or from developer namespace Role to cluster-admin."
    }
  },

  // Abstraction Depth Levels
  levels: {
    0: {
      name: "Level 0: Architecture & Boundaries",
      description: "Executive high-level topology showing primary cluster perimeters, ingress gateway, and worker pool.",
      tags: ["ClusterControlPlane", "ClusterDataPlane", "ClusterControlPlaneData"]
    },
    1: {
      name: "Level 1: Core Components",
      description: "Standard Kubernetes components: kube-apiserver, etcd, controller-manager, scheduler, kubelet, and pods.",
      tags: ["kube-apiserver", "etcd", "kubelet", "kube-proxy", "containerd", "coredns"]
    },
    2: {
      name: "Level 2: Security Controls & Threat Vectors",
      description: "Detailed defense-in-depth controls: NetworkPolicies, Pod Security Admission, RBAC bindings, KMS v2, and attack vectors.",
      tags: ["TA01", "TA02", "TA03", "TA04", "TA05", "TA06", "TA07", "C01", "C02", "C03", "C04", "AV01", "AV02"]
    },
    3: {
      name: "Level 3: Deep Kernel & Low-Level Runtime",
      description: "Hardcore system-level internals: Linux cgroups v2, namespaces, seccomp-bpf, eBPF probes (Falco/Tetragon), CRI sockets, and Raft consensus.",
      tags: ["kernel", "ebpf", "seccomp", "namespaces", "cgroups", "cri-o", "runc"]
    }
  },

  // Priority metadata definitions
  priorities: {
    "pri-1": {
      label: "Priority 1 (Critical)",
      color: "#ef4444",
      bg: "#fee2e2",
      border: "#b91c1c",
      description: "Immediate cluster compromise risk: unauthenticated API access, host breakouts, unencrypted etcd, or root container execution."
    },
    "pri-2": {
      label: "Priority 2 (High)",
      color: "#f59e0b",
      bg: "#fef3c7",
      border: "#d97706",
      description: "Significant lateral movement risk: default ServiceAccount token mounting, missing NetworkPolicies, or cloud metadata access."
    },
    "pri-3": {
      label: "Priority 3 (Medium)",
      color: "#eab308",
      bg: "#fef9c3",
      border: "#ca8a04",
      description: "Operational or hardening gaps: missing resource limits, CoreDNS cache poisoning, admission timeout bypass, or missing read-only rootfs."
    },
    "info": {
      label: "Architecture Info",
      color: "#06b6d4",
      bg: "#cffafe",
      border: "#0891b2",
      description: "High-trust communication tunnels, mTLS mutual authentication paths, and CSI storage lifecycles."
    }
  },

  // Traffic flow path definitions for animated overlays
  trafficFlows: {
    "ingress": {
      name: "Ingress Traffic Flow",
      description: "External User/Client -> Cloud Load Balancer -> Ingress Controller -> Service VIP -> Container Port",
      color: "#ef4444",
      steps: [
        { label: "1. Client Request", desc: "TLS handshake to Cloud LoadBalancer IP" },
        { label: "2. Ingress Controller", desc: "Routing via HTTP host header and SNI" },
        { label: "3. Cluster VIP", desc: "Kube-proxy / CNI NATs to Pod endpoint IP" },
        { label: "4. Pod Container", desc: "App process receives HTTP request on port 8080" }
      ]
    },
    "egress": {
      name: "Egress Traffic Flow",
      description: "Pod Process -> CNI Pod Interface -> Host veth pair -> CoreDNS -> Egress Gateway / NAT Gateway -> Internet / Cloud API",
      color: "#3b82f6",
      steps: [
        { label: "1. Pod DNS Query", desc: "Resolves external host via CoreDNS (10.96.0.10)" },
        { label: "2. CNI Datapath", desc: "Packet routed through cali/cilium_host veth pair" },
        { label: "3. Egress Policy Filter", desc: "Validated against Cilium/Calico egress rules" },
        { label: "4. Cloud NAT Gateway", desc: "SNAT to elastic IP and egress to internet" }
      ]
    },
    "attack-path": {
      name: "Attack Chain Progression (P1 to P6)",
      description: "Attacker pivot trajectory from initial perimeter penetration to node root breakout and secrets exfiltration.",
      color: "#dc2626",
      steps: [
        { label: "Step 1: Perimeter RCE", desc: "Exploiting web service via AV01 / Ingress bypass" },
        { label: "Step 2: Token Theft", desc: "Extracting ServiceAccount token from /var/run/secrets" },
        { label: "Step 3: API Enumeration", desc: "Probing kube-apiserver for cluster secrets and RBAC rights" },
        { label: "Step 4: Host Breakout", desc: "Abusing privileged flag or runc flaw to access host filesystem" },
        { label: "Step 5: Cloud Pivot", desc: "Harvesting node IAM instance role via IMDS 169.254.169.254" }
      ]
    }
  },

  // Interactive component details catalog
  components: {
    // ---------------- THREAT ACTORS (TA01 - TA07) ----------------
    "ta01": {
      id: "TA01",
      name: "External Attacker",
      category: "Threat Actor",
      priority: "pri-1",
      level: 2,
      origin: "Internet-Origin Adversary",
      motive: "Data exfiltration, ransomware, cryptomining, initial access",
      stride: "Spoofing, Tampering, Information Disclosure",
      overview: "An unauthenticated adversary situated outside all cluster trust boundaries. Probes public internet IP addresses, exposed Ingress controllers, API servers misconfigured with anonymous authentication, and public-facing microservices with remote code execution (RCE) flaws.",
      attackVectors: [
        "AV01: Vulnerable public ingress application (RCE, SQLi, SSRF)",
        "AV02: Exposed Kubernetes API server with weak or anonymous auth",
        "AV05: Misconfigured Cloud LoadBalancer routing to internal debug ports"
      ],
      yaml: `# Hardening against TA01: Default Deny Ingress NetworkPolicy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
---
# Strict Ingress definition allowing only port 443 with TLS
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: secure-app-ingress
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - app.example.com
      secretName: app-tls-cert
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-svc
                port:
                  number: 8080`,
      shell: `# Audit 1: Check for exposed API server with anonymous authentication enabled
kubectl get nodes -o wide
curl -k -s -X GET "https://<cluster-endpoint>:6443/api/v1/namespaces" | head -n 15

# Audit 2: Verify default-deny ingress NetworkPolicies exist across all namespaces
for ns in $(kubectl get ns -o jsonpath='{.items[*].metadata.name}'); do
  count=$(kubectl get netpol -n $ns --no-headers 2>/dev/null | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "⚠️  [ALERT] Namespace $ns has NO NetworkPolicies defined!"
  else
    echo "✅ [OK] Namespace $ns has $count NetworkPolicies"
  fi
done`,
      detection: `# Falco Rule: Detect inbound connections on unauthorized control plane ports
- rule: Inbound Connection to Kubelet API from Unknown IP
  desc: Detect unexpected connections to kubelet port 10250 from outside the cluster CIDR
  condition: inbound and fd.sport = 10250 and not fd.sip in (cluster_nodes)
  output: "Suspicious connection to Kubelet API from IP=%fd.sip (user=%user.name command=%proc.cmdline)"
  priority: WARNING
  tags: [network, k8s, ta01]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.1, § 4.2.1",
        nist: "NIST SP 800-190 § 4.1 (Core Defense Against External Threats)",
        mitre: "T1190 (Exploit Public-Facing Application), T1133 (External Remote Services)"
      }
    },

    "ta02": {
      id: "TA02",
      name: "Malicious Insider",
      category: "Threat Actor",
      priority: "pri-1",
      level: 2,
      origin: "Authenticated Organization Member / Developer",
      motive: "Privilege escalation, corporate espionage, sabotage",
      stride: "Elevation of Privilege, Tampering, Repudiation",
      overview: "An authenticated individual possessing corporate credentials (VPN, SSO, kubectl token). May be a disgruntled employee, a contractor with excessive permissions, or an attacker with compromised developer credentials.",
      attackVectors: [
        "AV03: Over-permissive RBAC cluster-admin or wildcard verb bindings",
        "AV04: Impersonating system:masters or deploying privileged pods",
        "AV07: Reading secrets across unauthorized tenant namespaces"
      ],
      yaml: `# Hardening against TA02: Fine-grained Role restricting secret reading
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: billing
  name: developer-restricted
rules:
  - apiGroups: [""]
    resources: ["pods", "services", "configmaps"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "update"]
  # Explicitly disallow reading Secrets or modifying RoleBindings!
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-billing-binding
  namespace: billing
subjects:
  - kind: Group
    name: "dev-billing-team"
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-restricted
  apiGroup: rbac.authorization.k8s.io`,
      shell: `# Audit 1: Identify all subjects bound to cluster-admin or wildcard verbs
kubectl get clusterrolebindings -o json | jq -r '
  .items[] |
  select(.roleRef.name == "cluster-admin") |
  "Binding: " + .metadata.name + " -> Subjects: " + (.subjects // [] | map(.name) | join(", "))
'

# Audit 2: Check which users have permission to create pods with hostPath mounts
kubectl auth can-i create pods --as=developer@example.com --subresource=exec`,
      detection: `# Audit Log Signature: Detect attempts to bind cluster-admin or escalate privileges
{
  "level": "RequestResponse",
  "auditID": "audit-escalation-alert",
  "stage": "ResponseComplete",
  "verb": "create",
  "objectRef": {
    "resource": "clusterrolebindings",
    "name": "cluster-admin-escalation"
  },
  "user": {
    "username": "developer@example.com"
  },
  "responseStatus": {
    "code": 403
  }
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.1.1 to § 5.1.8 (RBAC and Service Accounts)",
        nist: "NIST SP 800-190 § 4.3 (Least Privilege Access Control)",
        mitre: "T1078.004 (Valid Accounts: Cloud / Cluster Accounts), T1548 (Abuse Elevation Control)"
      }
    },

    "ta03": {
      id: "TA03",
      name: "Compromised Workload",
      category: "Threat Actor",
      priority: "pri-2",
      level: 2,
      origin: "Compromised Application Pod / Service",
      motive: "Lateral movement, credential harvesting, pivoting to cloud IMDS",
      stride: "Information Disclosure, Elevation of Privilege",
      overview: "An adversary who has already achieved remote code execution inside a running container. They possess the container's shell, local file system, mounted volumes, and whatever ServiceAccount token is mounted at /var/run/secrets/kubernetes.io/serviceaccount.",
      attackVectors: [
        "AV09: Harvesting mounted default ServiceAccount token for API enumeration",
        "AV10: Querying Cloud Instance Metadata Service (169.254.169.254) for IAM roles",
        "AV11: Port-scanning adjacent pods on the flat CNI overlay network"
      ],
      yaml: `# Hardening against TA03: Disable auto-mounting of ServiceAccount tokens
apiVersion: v1
kind: ServiceAccount
metadata:
  name: hardened-app-sa
  namespace: production
automountServiceAccountToken: false
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-web-workload
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      serviceAccountName: hardened-app-sa
      automountServiceAccountToken: false
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: app
          image: cgr.dev/chainguard/nginx:latest
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]`,
      shell: `# Audit 1: Find all pods with automountServiceAccountToken enabled and running as root
kubectl get pods -A -o json | jq -r '
  .items[] |
  select(.spec.automountServiceAccountToken != false and .spec.securityContext.runAsNonRoot != true) |
  .metadata.namespace + "/" + .metadata.name
'

# Audit 2: Verify whether egress to 169.254.169.254 (IMDS) is blocked
kubectl exec -it <pod-name> -n production -- curl -s --connect-timeout 2 http://169.254.169.254/latest/meta-data/ || echo "Blocked!"`,
      detection: `# Falco Rule: Detect contact to Cloud Instance Metadata Service (IMDS)
- rule: Contact Cloud Instance Metadata Service
  desc: Detect any container attempting to connect to link-local address 169.254.169.254
  condition: outbound and fd.dip = 169.254.169.254 and not proc.name in (aws-node, cloud-controller)
  output: "Pod connecting to Cloud IMDS: (pod=%k8s.pod.name ns=%k8s.ns.name ip=%fd.dip cmd=%proc.cmdline)"
  priority: CRITICAL
  tags: [mitre_credential_access, T1552]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.1.5, § 5.2.2",
        nist: "NIST SP 800-190 § 4.4.1 (Restricting Container Network Access)",
        mitre: "T1552.007 (Container and Resource Credentials), T1556 (Modify Authentication Process)"
      }
    },

    "ta04": {
      id: "TA04",
      name: "Rogue Tenant",
      category: "Threat Actor",
      priority: "pri-2",
      level: 2,
      origin: "Authorized Secondary Tenant in Multi-Tenant Cluster",
      motive: "Cross-namespace snooping, resource starvation, noisy neighbor DoS",
      stride: "Denial of Service, Information Disclosure",
      overview: "A valid user or team operating within a designated namespace. Exploits soft multi-tenancy weaknesses such as missing ResourceQuotas, lack of NetworkPolicies, shared Linux kernel surfaces, or unrestricted admission controllers to affect other tenant workloads.",
      attackVectors: [
        "AV12: Resource starvation via fork-bomb or unbounded CPU/memory consumption",
        "AV13: Cross-tenant network snooping over unsegmented CNI flat network",
        "AV14: Abusing cluster-scoped CRDs or shared ingress controllers"
      ],
      yaml: `# Hardening against TA04: ResourceQuota and LimitRange for Tenant Namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: tenant-quota
  namespace: tenant-a
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
    services.loadbalancers: "1"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: tenant-limits
  namespace: tenant-a
spec:
  limits:
    - default:
        cpu: "500m"
        memory: "512Mi"
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
      type: Container`,
      shell: `# Audit 1: Identify all namespaces missing ResourceQuotas
for ns in $(kubectl get ns -o jsonpath='{.items[*].metadata.name}'); do
  has_quota=$(kubectl get resourcequota -n $ns --no-headers 2>/dev/null | wc -l)
  if [ "$has_quota" -eq 0 ]; then
    echo "⚠️  Namespace '$ns' has NO ResourceQuota enforcement!"
  fi
done`,
      detection: `# Tetragon TracingPolicy: Detect fork-bomb or rapid process spawning
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: detect-process-spawns
spec:
  kprobes:
    - call: "sys_clone"
      syscall: true
      args:
        - index: 0
          type: "int"`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.2.1 (Resource Limits and Quotas)",
        nist: "NIST SP 800-190 § 4.4.3 (Enforcing Multi-Tenant Isolation)",
        mitre: "T1499 (Endpoint Denial of Service), T1498 (Network Denial of Service)"
      }
    },

    "ta05": {
      id: "TA05",
      name: "Supply Chain Attacker",
      category: "Threat Actor",
      priority: "pri-1",
      level: 2,
      origin: "Third-Party Registry, CI/CD Pipeline, or Upstream Library",
      motive: "Trojan backdoor deployment, CI secret exfiltration, silent persistence",
      stride: "Tampering, Elevation of Privilege, Repudiation",
      overview: "An adversary who targets software artifacts before they reach the cluster. Compromises base container images, packages, GitHub Actions workflows, or container registries to inject cryptominers, reverse shells, or malicious dependencies into production workloads.",
      attackVectors: [
        "AV15: Compromised container image registry or unauthenticated public registry",
        "AV16: Dependency confusion / typosquatting in upstream NPM/Pip packages",
        "AV17: Bypassing signature verification (Cosign/Notary) via mutating webhooks"
      ],
      yaml: `# Hardening against TA05: Kyverno Policy enforcing signed images with Cosign
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: check-image-signatures
  annotations:
    policies.kyverno.io/title: Verify Cosign Signatures
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  rules:
    - name: verify-signature
      match:
        any:
          - resources:
              kinds:
                - Pod
      verifyImages:
        - imageReferences:
            - "ghcr.io/myorg/*"
          attestors:
            - entries:
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE7b...
                      -----END PUBLIC KEY-----`,
      shell: `# Audit 1: Scan all running images across the cluster for known CVEs using Grype/Trivy
kubectl get pods -A -o jsonpath='{range .items[*]}{range .spec.containers[*]}{.image}{"\n"}{end}{end}' | sort -u | while read img; do
  echo "Scanning: $img"
  trivy image --severity CRITICAL --quiet "$img" || true
done`,
      detection: `# Falco Rule: Detect execution of untrusted package managers or compilers in production containers
- rule: Package Management Process Launched in Container
  desc: Detect package manager execution (apt, apk, yum) inside running production containers
  condition: container and proc.name in (apt-get, apt, apk, yum, dnf, pip, npm) and not user.name = root
  output: "Package manager run inside container: (user=%user.name pod=%k8s.pod.name cmd=%proc.cmdline)"
  priority: WARNING
  tags: [mitre_execution, supply_chain]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.4.1 (Image Provenance and Scanning)",
        nist: "NIST SP 800-190 § 4.1.1 (Image Vulnerability Management)",
        mitre: "T1195.002 (Supply Chain Compromise: Compromise Software Supply Chain)"
      }
    },

    "ta06": {
      id: "TA06",
      name: "Cloud / Infrastructure Operator",
      category: "Threat Actor",
      priority: "pri-2",
      level: 2,
      origin: "Cloud Provider Personnel, Hypervisor Layer, or Managed Service",
      motive: "Unauthorized administrative access, compliance breach, hypervisor escape",
      stride: "Information Disclosure, Tampering",
      overview: "Personnel or automated processes operating at the cloud platform layer (AWS, GCP, Azure, bare-metal data center). Possesses hypervisor console access, EBS/PersistentVolume snapshot capabilities, and cloud control plane privileges.",
      attackVectors: [
        "AV18: Dumping unencrypted storage volumes or node memory snapshots",
        "AV19: Intercepting node VPC traffic through cloud route table modifications",
        "AV20: Escalating through overprivileged Node Instance IAM profiles"
      ],
      yaml: `# Hardening against TA06: Confidential Virtual Machines & Storage Encryption
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: encrypted-kms-sc
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-k8s-data-key"
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer`,
      shell: `# Audit 1: Verify all StorageClasses enforce customer-managed KMS encryption
kubectl get storageclass -o json | jq -r '
  .items[] |
  "StorageClass: " + .metadata.name + " -> Encrypted: " + (.parameters.encrypted // "false") + " Key: " + (.parameters.kmsKeyId // "None")
'`,
      detection: `# AWS CloudTrail / Audit Alert: Detect unauthorized EBS snapshot volume creation
{
  "eventSource": "ec2.amazonaws.com",
  "eventName": "CreateSnapshot",
  "userIdentity": {
    "type": "IAMUser",
    "userName": "cloud-operator"
  },
  "alert": "Snapshot taken of Kubernetes worker node root volume"
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.32 (Encrypting Data at Rest)",
        nist: "NIST SP 800-190 § 4.5.2 (Data-at-Rest Volume Encryption)",
        mitre: "T1530 (Data from Cloud Storage Object), T1552 (Unsecured Credentials)"
      }
    },

    "ta07": {
      id: "TA07",
      name: "Hardware / Physical Adversary",
      category: "Threat Actor",
      priority: "pri-3",
      level: 3,
      origin: "Physical Server Room, Data Center Tech, or Stolen Bare-Metal Hardware",
      motive: "Cold-boot memory extraction, NVMe drive theft, BMC/IPMI firmware tampering",
      stride: "Information Disclosure, Tampering",
      overview: "An adversary with physical access to cluster servers, rack equipment, or IPMI/iLO/BMC management networks. Can perform physical bus snooping, firmware implants, or steal unencrypted disks.",
      attackVectors: [
        "AV21: Physical NVMe extraction containing unencrypted etcd or container layers",
        "AV22: Baseboard Management Controller (BMC) network compromise",
        "AV23: Memory extraction via Cold Boot attacks on non-confidential hardware"
      ],
      yaml: `# Hardening against TA07: RuntimeClass for Confidential Computing (AMD SEV-SNP / Intel TDX)
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: kata-qemu-sev
handler: kata-qemu-sev
scheduling:
  nodeSelector:
    feature.node.kubernetes.io/confidential-compute: "true"`,
      shell: `# Audit 1: Verify LUKS disk encryption status across bare-metal worker nodes
ssh root@worker-01 "cryptsetup status nvme0n1_crypt || echo 'WARNING: Drive is unencrypted!'"`,
      detection: `# Syslog / IPMI Audit: Detect unexpected chassis intrusion or IPMI remote console session
Apr 12 04:12:01 bmc-node01 ipmi_sensor: Chassis Intrusion physical asserted
Apr 12 04:12:05 bmc-node01 ipmi_session: Remote KVM session initiated from 192.168.100.45`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 4.1.3 (Node OS and Disk Hardening)",
        nist: "NIST SP 800-190 § 4.5.1 (Hardware Root of Trust and TPM Verification)",
        mitre: "T1200 (Hardware Additions), T1495 (Firmware Corruption)"
      }
    },

    // ---------------- CONTROL PLANE & WORKER ARCHITECTURE ----------------
    "kube-apiserver": {
      id: "TO01",
      name: "kube-apiserver",
      category: "Control Plane",
      priority: "pri-1",
      level: 1,
      origin: "Core REST Interface & Cluster Brain",
      motive: "Central administrative intercept, policy enforcement, authn/authz gateway",
      stride: "Spoofing, Tampering, Elevation of Privilege, Denial of Service",
      overview: "The central administrative gateway of Kubernetes. Validates and configures data for the api objects (pods, services, replicationcontrollers, etc.). The API Server services REST operations and provides the frontend to the cluster's shared state through which all all other components interact.",
      attackVectors: [
        "AV02: Unauthenticated / anonymous API requests to port 6443",
        "AV03: Privilege escalation via flawed RBAC impersonation permissions",
        "AV08: Denial of Service via unthrottled API requests bypassing APF (Priority & Fairness)"
      ],
      yaml: `# Hardened kube-apiserver static pod configuration flags
spec:
  containers:
    - name: kube-apiserver
      command:
        - kube-apiserver
        - --anonymous-auth=false
        - --authorization-mode=Node,RBAC
        - --enable-admission-plugins=NodeRestriction,PodSecurity,ValidatingAdmissionPolicy
        - --audit-log-path=/var/log/kubernetes/audit.log
        - --audit-log-maxage=30
        - --audit-log-maxbackup=10
        - --audit-log-maxsize=100
        - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
        - --encryption-provider-config=/etc/kubernetes/kms-encryption-config.yaml
        - --tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
        - --tls-min-version=VersionTLS13`,
      shell: `# Audit 1: Verify anonymous-auth is disabled on running apiserver
ps -ef | grep kube-apiserver | grep -q -- "--anonymous-auth=false" && echo "✅ Anonymous auth disabled" || echo "❌ ALERT: Anonymous auth ENABLED!"

# Audit 2: Test unauthenticated API endpoint access
curl -k -s -o /dev/null -w "%{http_code}\n" https://127.0.0.1:6443/api/v1/namespaces`,
      detection: `# Audit Log Signature: Alert on 401/403 bursts from unknown IPs
{
  "level": "Metadata",
  "stage": "ResponseComplete",
  "requestURI": "/api/v1/secrets",
  "verb": "list",
  "responseStatus": { "code": 403, "reason": "Forbidden" },
  "user": { "username": "system:anonymous" },
  "sourceIPs": ["198.51.100.24"]
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.1 through § 1.2.35 (kube-apiserver)",
        nist: "NIST SP 800-190 § 4.3 (Control Plane API Security)",
        mitre: "T1613 (Container and Resource Discovery), T1078 (Valid Accounts)"
      }
    },

    "etcd": {
      id: "TO02",
      name: "etcd Datastore",
      category: "Datastore",
      priority: "pri-1",
      level: 1,
      origin: "Consistent and Highly-Available Key-Value Store",
      motive: "Direct cluster state theft, secret harvesting, state tampering without audit trail",
      stride: "Information Disclosure, Tampering, Spoofing",
      overview: "etcd is the single source of truth for the entire cluster. It holds all Secrets, ConfigMaps, RBAC policies, and resource manifests. Anyone who can read etcd can decrypt every secret and impersonate any cluster component.",
      attackVectors: [
        "AV06: Direct access to etcd port 2379/2380 without client mTLS certificates",
        "AV24: Plaintext secrets stored in bbolt DB files due to missing KMS envelope encryption",
        "AV25: Exfiltration of unencrypted etcd backup snapshots (snapshot.db)"
      ],
      yaml: `# Hardened KMS v2 EncryptionConfiguration for etcd
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
      - configmaps
    providers:
      - kms:
          apiVersion: v2
          name: aws-kms-provider
          endpoint: unix:///var/run/kmsplugin/socket.sock
          timeout: 3s
      - identity: {} # Fallback for reading previously unencrypted keys during migration`,
      shell: `# Audit 1: Test reading secrets directly with etcdctl (requires root client certs)
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/production/database-credentials | head -n 10

# Audit 2: Verify whether data in etcd starts with KMS prefix 'k8s:enc:kms:v2:'
ETCDCTL_API=3 etcdctl get /registry/secrets/default --prefix --keys-only`,
      detection: `# Falco Rule: Detect any process other than etcd reading etcd data directory
- rule: Unauthorized Access to etcd Data Directory
  desc: Detect unexpected processes reading /var/lib/etcd
  condition: open_read and fd.name startswith /var/lib/etcd and not proc.name = etcd
  output: "Unauthorized process reading etcd directory: (proc=%proc.name user=%user.name file=%fd.name)"
  priority: CRITICAL
  tags: [etcd, secrets, pri-1]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 2.1 through § 2.7 (etcd)",
        nist: "NIST SP 800-190 § 4.5 (Cluster Datastore Hardening)",
        mitre: "T1552 (Unsecured Credentials), T1005 (Data from Local System)"
      }
    },

    "kubelet": {
      id: "TO03",
      name: "kubelet Agent",
      category: "Data Plane",
      priority: "pri-2",
      level: 1,
      origin: "Primary Node Agent",
      motive: "Direct container execution, pod spec modification, token extraction",
      stride: "Elevation of Privilege, Spoofing, Tampering",
      overview: "An agent that runs on each node in the cluster. It ensures that containers are running in a Pod according to PodSpecs. Exposes an HTTPS API on port 10250 and optionally an unauthenticated read-only port 10255.",
      attackVectors: [
        "AV26: Unauthenticated access to kubelet port 10250 /run or /exec endpoints",
        "AV27: Information leakage over unauthenticated read-only port 10255",
        "AV28: Node privilege escalation bypassing NodeRestriction admission plugin"
      ],
      yaml: `# Hardened KubeletConfiguration (/var/lib/kubelet/config.yaml)
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
readOnlyPort: 0
protectKernelDefaults: true
makeIPTablesParseable: true
streamingConnectionIdleTimeout: 4h0m0s
tlsCipherSuites:
  - TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`,
      shell: `# Audit 1: Test unauthenticated connection to kubelet API on port 10250
curl -k -s https://127.0.0.1:10250/pods | grep -q "Unauthorized" && echo "✅ Kubelet auth enabled" || echo "❌ ALERT: Kubelet allows unauthenticated access!"

# Audit 2: Verify readOnlyPort is 0
grep "readOnlyPort: 0" /var/lib/kubelet/config.yaml || echo "⚠️ readOnlyPort may be open!"`,
      detection: `# Audit Log Signature: Alert on unauthorized kubelet API calls
{
  "verb": "create",
  "requestURI": "/pods/exec",
  "user": { "username": "system:anonymous" },
  "responseStatus": { "code": 401 }
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 4.2.1 through § 4.2.13 (Kubelet)",
        nist: "NIST SP 800-190 § 4.2 (Node Agent Security)",
        mitre: "T1609 (Execution in Container), T1059 (Command and Scripting Interpreter)"
      }
    },

    "kube-scheduler": {
      id: "TO04",
      name: "kube-scheduler",
      category: "Control Plane",
      priority: "pri-2",
      level: 1,
      origin: "Pod Placement & Resource Scheduler",
      motive: "Manipulating pod scheduling to co-locate malicious containers on sensitive nodes",
      stride: "Tampering, Denial of Service",
      overview: "Watches for newly created Pods that have no Node assigned. For every Pod that the scheduler discovers, the scheduler becomes responsible for finding the best Node for the Pod to run on based on resource requests, taints, tolerations, and affinity rules.",
      attackVectors: [
        "AV29: Unauthenticated probing of scheduler health endpoint",
        "AV30: Taint/toleration spoofing forcing sensitive workloads onto untrusted nodes"
      ],
      yaml: `# Hardened kube-scheduler configuration
spec:
  containers:
    - name: kube-scheduler
      command:
        - kube-scheduler
        - --authentication-kubeconfig=/etc/kubernetes/scheduler.conf
        - --authorization-kubeconfig=/etc/kubernetes/scheduler.conf
        - --bind-address=127.0.0.1
        - --leader-elect=true`,
      shell: `# Audit: Check scheduler bind address
ps -ef | grep kube-scheduler | grep -E "--bind-address=127.0.0.1"`,
      detection: `# Audit Log: High volume of pod scheduling rejections due to affinity conflicts
{
  "verb": "create",
  "resource": "events",
  "reason": "FailedScheduling"
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.4.1, § 1.4.2 (kube-scheduler)",
        nist: "NIST SP 800-190 § 4.3 (Control Plane Isolation)",
        mitre: "T1499 (Denial of Service)"
      }
    },

    "kube-controller-manager": {
      id: "TO05",
      name: "kube-controller-manager",
      category: "Control Plane",
      priority: "pri-1",
      level: 1,
      origin: "Core Control Loop Daemon",
      motive: "Token generation abuse, automated privilege escalation across controllers",
      stride: "Elevation of Privilege, Tampering",
      overview: "Runs controller processes. Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process. Includes Node Controller, Job Controller, EndpointSlice Controller, and ServiceAccount Controller.",
      attackVectors: [
        "AV31: Hijacking ServiceAccount Token Controller signing key",
        "AV32: Terminating controllers to halt auto-healing and replica reconciliation"
      ],
      yaml: `# Hardened kube-controller-manager flags
spec:
  containers:
    - name: kube-controller-manager
      command:
        - kube-controller-manager
        - --bind-address=127.0.0.1
        - --service-account-private-key-file=/etc/kubernetes/pki/sa.key
        - --root-ca-file=/etc/kubernetes/pki/ca.crt
        - --use-service-account-credentials=true`,
      shell: `# Audit: Verify use-service-account-credentials is set to true
ps -ef | grep kube-controller-manager | grep -- "--use-service-account-credentials=true"`,
      detection: `# Falco Rule: Unauthorized access to ServiceAccount private key sa.key
- rule: Sensitive ServiceAccount Private Key Read
  desc: Detect unauthorized access to /etc/kubernetes/pki/sa.key
  condition: open_read and fd.name = "/etc/kubernetes/pki/sa.key" and not proc.name = kube-controller
  output: "Unauthorized read of SA signing key: (proc=%proc.name user=%user.name)"
  priority: CRITICAL`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.3.1 through § 1.3.7",
        nist: "NIST SP 800-190 § 4.3",
        mitre: "T1552.004 (Private Keys)"
      }
    },

    "containerd": {
      id: "TO06",
      name: "containerd / CRI-O Runtime",
      category: "Data Plane",
      priority: "pri-1",
      level: 3,
      origin: "Container Runtime Interface (CRI) Daemon",
      motive: "Direct host breakout via runc vulnerability, container namespace escape",
      stride: "Elevation of Privilege, Tampering",
      overview: "An industry-standard container runtime with an emphasis on simplicity, robustness and portability. Manages container lifecycle, image transfers, storage, and interacts with low-level OCI runtimes (runc, crun) via Unix domain sockets (/run/containerd/containerd.sock).",
      attackVectors: [
        "AV04: Host breakout via runc file descriptor leak (CVE-2024-21626)",
        "AV33: Access to exposed containerd.sock allowing root container injection"
      ],
      yaml: `# Hardening against Container Breakouts: Restricted PodSecurity profile
apiVersion: v1
kind: Namespace
metadata:
  name: hardened-apps
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/warn: restricted`,
      shell: `# Audit 1: Check containerd socket permissions
ls -la /run/containerd/containerd.sock

# Audit 2: Verify runc version to ensure patch for CVE-2024-21626
runc --version`,
      detection: `# Falco Rule: Detect write to host binary or runc escape attempt
- rule: File Descriptor Leak runc Breakout (CVE-2024-21626)
  desc: Detect attempts to open /proc/self/fd/* or host root during container init
  condition: evt.type = open and fd.name startswith "/proc/self/fd" and proc.name = runc
  output: "Possible CVE-2024-21626 runc escape attempt (proc=%proc.cmdline fd=%fd.name)"
  priority: EMERGENCY`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 4.1.1 (Container Runtime Hardening)",
        nist: "NIST SP 800-190 § 4.2.1 (Runtime Defenses)",
        mitre: "T1611 (Escape to Host)"
      }
    },

    "coredns": {
      id: "TO07",
      name: "CoreDNS",
      category: "Data Plane",
      priority: "pri-3",
      level: 1,
      origin: "Cluster DNS & Service Discovery Engine",
      motive: "DNS spoofing, cache poisoning, exfiltration via DNS tunneling",
      stride: "Spoofing, Denial of Service, Information Disclosure",
      overview: "The default DNS server for Kubernetes clusters. Resolves internal cluster service names (e.g., service.namespace.svc.cluster.local) and forwards external queries to upstream resolvers. Highly targeted for DNS poisoning and data exfiltration.",
      attackVectors: [
        "AV34: DNS cache poisoning redirecting internal microservice calls to malicious pods",
        "AV35: Outbound data exfiltration via DNS query tunneling (subdomain encoding)"
      ],
      yaml: `# Hardened CoreDNS Corefile with rate limiting and logging
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf
        cache 30
        loop
        reload
        loadbalance
    }`,
      shell: `# Audit: Check CoreDNS logs for suspicious high-entropy subdomain lookups
kubectl logs -n kube-system -l k8s-app=kube-dns --tail=100`,
      detection: `# Falco Rule: Detect high volume of DNS requests from non-DNS pods
- rule: High Volume of DNS Queries
  desc: Detect potential DNS tunneling from application pods
  condition: outbound and fd.dport = 53 and not proc.name in (coredns, dnsmasq)
  output: "DNS request from unauthorized container (pod=%k8s.pod.name cmd=%proc.cmdline)"
  priority: WARNING`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.3.1",
        nist: "NIST SP 800-190 § 4.4",
        mitre: "T1071.004 (DNS Communication)"
      }
    },

    "cni-plugins": {
      id: "TO08",
      name: "CNI Plugins (Cilium / Calico)",
      category: "Data Plane",
      priority: "pri-2",
      level: 2,
      origin: "Container Network Interface Datapath",
      motive: "Cross-pod traffic sniffing, packet injection, NetworkPolicy bypass",
      stride: "Information Disclosure, Tampering, Spoofing",
      overview: "Provisions network interfaces for pods, assigns IP addresses, and configures eBPF programs or iptables routing tables to govern communication between pods, services, and external networks.",
      attackVectors: [
        "AV36: Flat network eavesdropping between co-located tenant pods",
        "AV37: IP spoofing bypassing CIDR-based NetworkPolicies"
      ],
      yaml: `# CiliumNetworkPolicy enforcing Layer 7 HTTP path restrictions
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: strict-l7-policy
  namespace: production
spec:
  endpointSelector:
    matchLabels:
      app: backend
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: frontend
      toPorts:
        - ports:
            - port: "8080"
              protocol: TCP
          rules:
            http:
              - method: "GET"
                path: "/api/v1/health"`,
      shell: `# Audit: Inspect Cilium eBPF network policy enforcement status
cilium status --verbose
cilium endpoint list`,
      detection: `# Cilium / Hubble Alert: Detect dropped unauthorized cross-pod traffic
hubble observe --verdict DROPPED --follow`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.3.2",
        nist: "NIST SP 800-190 § 4.4.1",
        mitre: "T1040 (Network Sniffing)"
      }
    },

    "kube-proxy": {
      id: "TO09",
      name: "kube-proxy",
      category: "Data Plane",
      priority: "pri-3",
      level: 2,
      origin: "Service Abstraction & VIP Load Balancer",
      motive: "Traffic redirection, iptables table corruption, session hijacking",
      stride: "Tampering, Denial of Service",
      overview: "Maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster. Operates in iptables or IPVS mode.",
      attackVectors: [
        "AV38: Flooding iptables rules causing connection latency and kernel table exhaustion",
        "AV39: ARP spoofing on worker node disrupting ClusterIP translation"
      ],
      yaml: `# KubeProxyConfiguration in IPVS mode for high performance & deterministic rules
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
  strictARP: true
  syncPeriod: 30s
  minSyncPeriod: 2s`,
      shell: `# Audit: Check iptables / ipvs table size on worker node
iptables -L -n -v | wc -l
ipvsadm -L -n`,
      detection: `# Tetragon Alert: Detect modification of host routing or iptables binaries
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: protect-iptables
spec:
  kprobes:
    - call: "sys_execve"
      syscall: true
      args:
        - index: 0
          type: "string"
      selectors:
        - matchArgs:
            - index: 0
              operator: "Equal"
              values: ["/usr/sbin/iptables", "/usr/sbin/ipvsadm"]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 4.2.11",
        nist: "NIST SP 800-190 § 4.4",
        mitre: "T1562.004 (Disable or Modify System Firewall)"
      }
    },

    "admission-webhooks": {
      id: "TO10",
      name: "Admission Webhooks",
      category: "Control Plane",
      priority: "pri-2",
      level: 2,
      origin: "Extensible Policy Enforcement Layer",
      motive: "Bypassing security checks via webhook timeout fail-open or intercepting objects",
      stride: "Tampering, Elevation of Privilege",
      overview: "HTTP callbacks that receive admission requests and do something with them. You can define two types of admission webhooks, validating admission webhook and mutating admission webhook. Crucial for policy enforcement (Kyverno, Gatekeeper).",
      attackVectors: [
        "AV40: Fail-open exploit (failurePolicy: Ignore) allowing malicious pods when webhook times out",
        "AV41: Mutating webhook hijacking injecting sidecars into tenant pods"
      ],
      yaml: `# ValidatingWebhookConfiguration with strict Fail-Closed policy
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: strict-security-guard
webhooks:
  - name: validate.security.example.com
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
        scope: "Namespaced"
    clientConfig:
      service:
        name: policy-checker
        namespace: security-system
        path: "/validate"
      caBundle: "LS0tLS1CRUdJTi..."
    admissionReviewVersions: ["v1"]
    sideEffects: None
    timeoutSeconds: 5
    failurePolicy: Fail # CRITICAL: Reject request if webhook fails!`,
      shell: `# Audit: Find all webhooks configured with failurePolicy: Ignore
kubectl get validatingwebhookconfigurations,mutatingwebhookconfigurations -o json | jq -r '
  .items[] |
  .metadata.name as $name |
  .webhooks[] |
  select(.failurePolicy == "Ignore") |
  "WARNING: " + $name + " has failurePolicy: Ignore!"
'`,
      detection: `# Audit Log: Detect failed admission webhook invocations
{
  "verb": "create",
  "resource": "validatingwebhookconfigurations",
  "responseStatus": { "code": 500 }
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.16",
        nist: "NIST SP 800-190 § 4.3",
        mitre: "T1548 (Abuse Elevation Control Mechanism)"
      }
    },

    "rbac-engine": {
      id: "TO11",
      name: "RBAC Authorization Engine",
      category: "Control Plane",
      priority: "pri-1",
      level: 2,
      origin: "Role-Based Access Control Subsystem",
      motive: "Unauthorized administrative privileges across all namespaces",
      stride: "Elevation of Privilege, Spoofing",
      overview: "Regulates access to computer or network resources based on the roles of individual users within your organization. Uses the rbac.authorization.k8s.io API group to drive authorization decisions.",
      attackVectors: [
        "AV03: Binding users or service accounts to cluster-admin",
        "AV42: Wildcard permissions (verbs: ['*'], resources: ['*']) granting unintended escalation paths"
      ],
      yaml: `# Least-privilege Role for Application deployment automation
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: prod-apps
  name: deployer
rules:
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]`,
      shell: `# Audit: Run Rakess / Kubectl Can-I matrix to find dangerous privileges
kubectl auth can-i '*' '*' --all-namespaces
kubectl get clusterrolebindings -o json | jq '.items[] | select(.roleRef.name=="cluster-admin") | .subjects'`,
      detection: `# Audit Log: Detect creation of cluster-admin rolebindings
{
  "verb": "create",
  "resource": "clusterrolebindings",
  "objectRef": { "name": "cluster-admin" }
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.1.1 through § 5.1.8",
        nist: "NIST SP 800-190 § 4.3.1",
        mitre: "T1078.004 (Valid Accounts)"
      }
    },

    "secrets-store": {
      id: "TO12",
      name: "Secrets Store & KMS",
      category: "Datastore",
      priority: "pri-1",
      level: 2,
      origin: "Credentials & Key Management System",
      motive: "Harvesting plaintext API tokens, database passwords, TLS private keys",
      stride: "Information Disclosure",
      overview: "Manages confidential data such as passwords, tokens, and keys. Supports envelope encryption via KMS v2 and external secret injection via the Secrets Store CSI Driver (Vault, AWS Secrets Manager, GCP Secret Manager).",
      attackVectors: [
        "AV07: Unrestricted get/list on Secret resources",
        "AV43: Plaintext secrets in etcd backup dumps or swapped memory"
      ],
      yaml: `# Secrets Store CSI Driver SecretProviderClass
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: vault-db-creds
  namespace: production
spec:
  provider: vault
  parameters:
    roleName: "app-role"
    vaultAddress: "https://vault.internal:8200"
    objects: |
      - objectName: "db-password"
        secretPath: "secret/data/production/db"
        secretKey: "password"`,
      shell: `# Audit: Check if secrets are encrypted at rest in etcd
ETCDCTL_API=3 etcdctl get /registry/secrets/production/my-secret | head -n 4`,
      detection: `# Falco Rule: Detect high volume secret listing across namespaces
- rule: High Volume of Secrets Retrieved
  desc: Detect unexpected listing of Secret resources across multiple namespaces
  condition: k8s.verb in (list, watch) and k8s.resource = secrets and not user.name in (controller-manager)
  output: "Bulk Secret access by user=%user.name"
  priority: WARNING`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.32, § 5.1.2",
        nist: "NIST SP 800-190 § 4.5.2",
        mitre: "T1552.007 (Credentials in Container)"
      }
    },

    // ---------------- ATTACK SCENARIOS (P1-P6) ----------------
    "p1": {
      id: "P1",
      name: "Ingress to Pod Takeover",
      category: "Attack Scenario",
      priority: "pri-1",
      level: 2,
      origin: "Internet -> Public Ingress -> Vulnerable Microservice",
      motive: "Establish initial interactive shell inside cluster perimeter",
      stride: "Tampering, Elevation of Privilege",
      overview: "An external attacker targets a publicly accessible microservice via an Ingress controller. Exploiting an application vulnerability (e.g. Log4Shell CVE-2021-44228, Spring4Shell, SQL injection, or unauthenticated file upload), the attacker drops a reverse shell and executes arbitrary commands as the container user.",
      attackVectors: [
        "AV01: Vulnerable public ingress application (RCE)",
        "AV05: Misconfigured Cloud LoadBalancer routing"
      ],
      yaml: `# Hardening against P1: WAF Ingress Annotations + ReadOnlyRootFilesystem
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hardened-web
  namespace: production
spec:
  template:
    spec:
      containers:
        - name: web
          image: myorg/web:v2.1
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            runAsNonRoot: true
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - mountPath: /tmp
              name: ephemeral-tmp
      volumes:
        - name: ephemeral-tmp
          emptyDir: {}`,
      shell: `# Audit: Test whether container root filesystem is read-only
kubectl exec -it <pod-name> -n production -- touch /test_write 2>&1 | grep -q "Read-only file system" && echo "✅ Read-only filesystem enforced" || echo "❌ ALERT: Writable root filesystem!"`,
      detection: `# Falco Rule: Detect reverse shell execution spawned by web server
- rule: Reverse Shell Spawned by Web Server
  desc: Detect bash/sh spawned by nginx, apache, or java
  condition: proc.pname in (nginx, httpd, java, node, python) and proc.name in (bash, sh, zsh)
  output: "Reverse shell spawned from web server: (proc=%proc.cmdline parent=%proc.pname pod=%k8s.pod.name)"
  priority: CRITICAL
  tags: [mitre_execution, p1]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.2.6 (Read-Only Root Filesystem)",
        nist: "NIST SP 800-190 § 4.1.2 (Container Isolation Defenses)",
        mitre: "T1190 (Exploit Public-Facing Application), T1059.004 (Unix Shell)"
      },
      kyverno: `# Kyverno ClusterPolicy: Require Read-Only Root Filesystem (Defends against P1 / AV01)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-ro-rootfs
  annotations:
    policies.kyverno.io/title: Require Read-Only Root Filesystem
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-ro-rootfs
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Root filesystem must be read-only to prevent malware drops and reverse shells."
        pattern:
          spec:
            containers:
              - securityContext:
                  readOnlyRootFilesystem: true`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Require Read-Only Root Filesystem (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-ro-rootfs
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.readOnlyRootFilesystem) && c.securityContext.readOnlyRootFilesystem == true)"
      message: "All containers must configure readOnlyRootFilesystem: true to prevent write payloads."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-ro-rootfs-binding
spec:
  policyName: require-ro-rootfs
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require Read-Only Root Filesystem
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sreadonlyrootfilesystem
spec:
  crd:
    spec:
      names:
        kind: K8sReadOnlyRootFilesystem
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sreadonlyrootfilesystem
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.readOnlyRootFilesystem == true
          msg := sprintf("Container '%v' root filesystem must be read-only", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sReadOnlyRootFilesystem
metadata:
  name: require-ro-rootfs
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "p2": {
      id: "P2",
      name: "Token Abuse & API Pivot",
      category: "Attack Scenario",
      priority: "pri-1",
      level: 2,
      origin: "Compromised Container -> API Server",
      motive: "Escalate from container sandbox to cluster administrator",
      stride: "Elevation of Privilege, Information Disclosure",
      overview: "Once inside a pod, the attacker accesses the projected service account token automatically mounted at /var/run/secrets/kubernetes.io/serviceaccount/token. If the ServiceAccount has over-privileged RoleBindings (or cluster-admin), the attacker queries the API server directly to list cluster secrets, deploy privileged pods, or alter configurations.",
      attackVectors: [
        "AV09: Stealing mounted default ServiceAccount token",
        "AV03: Over-permissive RBAC bindings"
      ],
      yaml: `# Hardening against P2: Disable ServiceAccount Token automounting
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-service
  namespace: production
spec:
  template:
    spec:
      automountServiceAccountToken: false
      containers:
        - name: app
          image: myorg/app:latest`,
      shell: `# Audit: Search for pods mounting tokens with broad RBAC rights
kubectl get pods -A -o json | jq -r '
  .items[] |
  select(.spec.automountServiceAccountToken != false) |
  .metadata.namespace + " " + .metadata.name + " (SA: " + .spec.serviceAccountName + ")"
'`,
      detection: `# Falco Rule: Unauthorized read of ServiceAccount token file
- rule: Read ServiceAccount Token by Untrusted Binary
  desc: Detect curl, wget, or python reading the Kubernetes ServiceAccount token
  condition: open_read and fd.name = "/var/run/secrets/kubernetes.io/serviceaccount/token" and proc.name in (curl, wget, python, nc)
  output: "Token accessed by unexpected binary: (proc=%proc.cmdline pod=%k8s.pod.name)"
  priority: WARNING`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.1.5",
        nist: "NIST SP 800-190 § 4.3",
        mitre: "T1552.007 (Container and Resource Credentials)"
      },
      kyverno: `# Kyverno ClusterPolicy: Restrict ServiceAccount Token Automounting (Defends against P2)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-sa-token-automount
  annotations:
    policies.kyverno.io/title: Restrict ServiceAccount Token Automounting
    policies.kyverno.io/category: Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-sa-token-automount
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Automounting ServiceAccount tokens is forbidden. Set automountServiceAccountToken: false to prevent API pivot."
        pattern:
          spec:
            automountServiceAccountToken: false`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Restrict ServiceAccount Token Automount (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: restrict-sa-automount
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "has(object.spec.automountServiceAccountToken) && object.spec.automountServiceAccountToken == false"
      message: "Automounting ServiceAccount tokens is forbidden. Explicitly set automountServiceAccountToken: false."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: restrict-sa-automount-binding
spec:
  policyName: restrict-sa-automount
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Restrict ServiceAccount Token Automount
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srestrictsaautomount
spec:
  crd:
    spec:
      names:
        kind: K8sRestrictSAAutomount
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8srestrictsaautomount
        violation[{"msg": msg}] {
          not input.review.object.spec.automountServiceAccountToken == false
          msg := "Pods must set automountServiceAccountToken: false to prevent API token theft"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRestrictSAAutomount
metadata:
  name: restrict-sa-automount
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "p3": {
      id: "P3",
      name: "Supply Chain Poisoning",
      category: "Attack Scenario",
      priority: "pri-1",
      level: 2,
      origin: "Compromised CI/CD Pipeline -> Container Registry -> Worker Node",
      motive: "Inject stealth backdoors and bypass runtime perimeter defenses",
      stride: "Tampering, Elevation of Privilege",
      overview: "The adversary compromises an upstream package, GitHub Actions runner, or container registry. A backdoored container image is pushed with valid tags. The cluster's deployment pulls the poisoned image, deploying malicious code straight into production past network firewalls.",
      attackVectors: [
        "AV15: Compromised container registry",
        "AV16: Dependency confusion / typosquatting in base image"
      ],
      yaml: `# Hardening against P3: Require SLSA Provenance & Cosign Verification
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-slsa-provenance
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-slsa
      match:
        any:
          - resources:
              kinds: ["Pod"]
      verifyImages:
        - imageReferences: ["*"]
          attestations:
            - predicateType: https://slsa.dev/provenance/v0.2`,
      shell: `# Audit: Verify image signatures locally using Cosign
cosign verify --key cosign.pub ghcr.io/myorg/production-app:v1.0.0`,
      detection: `# Audit Log: Alert when image is pulled from unauthorized public registries
{
  "verb": "create",
  "resource": "pods",
  "image": "docker.io/unverified/malicious:latest",
  "alert": "Untrusted registry source"
}`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.4.1",
        nist: "NIST SP 800-190 § 4.1.1",
        mitre: "T1195.002 (Compromise Software Supply Chain)"
      },
      kyverno: `# Kyverno ClusterPolicy: Verify Cosign Signatures & Attestations (Defends against P3)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signatures
  annotations:
    policies.kyverno.io/title: Verify Cosign Signatures and SLSA Provenance
    policies.kyverno.io/category: Supply Chain Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  webhookTimeoutSeconds: 30
  rules:
    - name: verify-signature-rule
      match:
        any:
          - resources:
              kinds: ["Pod"]
      verifyImages:
        - imageReferences: ["ghcr.io/myorg/*"]
          attestors:
            - entries:
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...
                      -----END PUBLIC KEY-----`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Restrict to Signed Enterprise Registries (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: enforce-trusted-signed-registries
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, c.image.startsWith('ghcr.io/myorg/') || c.image.startsWith('registry.k8s.io/'))"
      message: "Container image must originate from approved enterprise registry with verified Cosign signatures."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: enforce-trusted-signed-registries-binding
spec:
  policyName: enforce-trusted-signed-registries
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require Allowed Signed Container Registries
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sallowedrepos
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedRepos
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sallowedrepos
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not startswith(container.image, "ghcr.io/myorg/")
          not startswith(container.image, "registry.k8s.io/")
          msg := sprintf("Container '%v' image '%v' is not from a signed trusted registry", [container.name, container.image])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: enforce-signed-registries
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "p4": {
      id: "P4",
      name: "Pod Breakout to Node Root",
      category: "Attack Scenario",
      priority: "pri-1",
      level: 3,
      origin: "Compromised Pod -> Host Operating System",
      motive: "Break container boundary and gain root execution on the physical/virtual host node",
      stride: "Elevation of Privilege, Tampering",
      overview: "Attacker leverages over-privileged container configurations (privileged: true, hostPID: true, hostNetwork: true, or SYS_ADMIN capability) or exploits a Linux kernel vulnerability (Dirty COW, Dirty Pipe CVE-2022-0847) or container runtime flaw to escape the container root namespace onto the host node.",
      attackVectors: [
        "AV04: Privileged container escape (hostPID, SYS_ADMIN, hostPath /)",
        "AV26: Container runtime escape via runc flaw (CVE-2024-21626)"
      ],
      yaml: `# Hardening against P4: PodSecurity Restricted Policy Enforcement
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: guard
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: critical
---
# Disallow privileged, hostPID, and hostNetwork globally via Kyverno
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
spec:
  validationFailureAction: Enforce
  rules:
    - name: validate-privileged
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Privileged containers and host namespaces are strictly forbidden!"
        pattern:
          spec:
            =(hostPID): false
            =(hostIPC): false
            =(hostNetwork): false
            containers:
              - securityContext:
                  =(privileged): false`,
      shell: `# Audit: Identify any running pods with privileged: true or hostPID: true
kubectl get pods -A -o json | jq -r '
  .items[] |
  select(.spec.hostPID == true or .spec.containers[].securityContext.privileged == true) |
  .metadata.namespace + "/" + .metadata.name + " is PRIVILEGED or hostPID!"
'`,
      detection: `# Falco Rule: Detect container breakout attempt via sensitive /proc or nsenter
- rule: Container Breakout via nsenter or unshare
  desc: Detect execution of nsenter or unshare within a container to switch namespaces
  condition: container and proc.name in (nsenter, unshare)
  output: "Container breakout attempt detected: (proc=%proc.cmdline user=%user.name pod=%k8s.pod.name)"
  priority: EMERGENCY
  tags: [mitre_privilege_escalation, T1611]`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.2.1 through § 5.2.9",
        nist: "NIST SP 800-190 § 4.2",
        mitre: "T1611 (Escape to Host), T1068 (Exploitation for Privilege Escalation)"
      },
      kyverno: `# Kyverno ClusterPolicy: Disallow Privileged Containers & Host Namespaces (Defends against P4)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
  annotations:
    policies.kyverno.io/title: Disallow Privileged Containers
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-privileged
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Privileged containers and host namespaces (hostPID, hostIPC, hostNetwork) are strictly forbidden!"
        pattern:
          spec:
            =(hostPID): false
            =(hostIPC): false
            =(hostNetwork): false
            containers:
              - securityContext:
                  =(privileged): false
                  =(allowPrivilegeEscalation): false`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Disallow Privileged Containers (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: disallow-privileged-containers
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(!has(object.spec.hostPID) || object.spec.hostPID == false) && (!has(object.spec.hostIPC) || object.spec.hostIPC == false) && (!has(object.spec.hostNetwork) || object.spec.hostNetwork == false)"
      message: "Host namespaces (hostPID, hostIPC, hostNetwork) are forbidden."
    - expression: "object.spec.containers.all(c, !has(c.securityContext) || ((!has(c.securityContext.privileged) || c.securityContext.privileged == false) && (!has(c.securityContext.allowPrivilegeEscalation) || c.securityContext.allowPrivilegeEscalation == false)))"
      message: "Privileged containers and privilege escalation are strictly forbidden."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: disallow-privileged-containers-binding
spec:
  policyName: disallow-privileged-containers
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Disallow Privileged Containers
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sdisallowprivileged
spec:
  crd:
    spec:
      names:
        kind: K8sDisallowPrivileged
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sdisallowprivileged
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          container.securityContext.privileged == true
          msg := sprintf("Privileged container '%v' is forbidden", [container.name])
        }
        violation[{"msg": msg}] {
          input.review.object.spec.hostPID == true
          msg := "hostPID is forbidden"
        }
        violation[{"msg": msg}] {
          input.review.object.spec.hostNetwork == true
          msg := "hostNetwork is forbidden"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDisallowPrivileged
metadata:
  name: disallow-privileged-containers
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "p5": {
      id: "P5",
      name: "Cloud Metadata IAM Pivot",
      category: "Attack Scenario",
      priority: "pri-2",
      level: 2,
      origin: "Compromised Container -> Cloud IMDS (169.254.169.254)",
      motive: "Acquire cloud provider IAM credentials to attack cloud account resources",
      stride: "Information Disclosure, Elevation of Privilege",
      overview: "Attacker queries the cloud instance metadata service (AWS/GCP/Azure IMDS) on link-local address 169.254.169.254. If IMDSv1 is enabled or hop-limit is > 1, the container steals the underlying EC2/GCE instance role credentials and pivots to the cloud provider console.",
      attackVectors: [
        "AV10: Querying 169.254.169.254 for IAM temporary security credentials",
        "AV20: Overprivileged node IAM role granting S3/DynamoDB/KMS access"
      ],
      yaml: `# Hardening against P5: CiliumNetworkPolicy blocking link-local IMDS IP
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: block-cloud-metadata
  namespace: production
spec:
  endpointSelector: {}
  egress:
    - toCIDR:
        - 0.0.0.0/0
      toCIDRFilter:
        - 169.254.169.254/32 # Deny access to IMDS!`,
      shell: `# Audit 1: Test connection to AWS IMDS from inside pod
kubectl run test-imds --rm -i --tty --image=curlimages/curl -- curl -s --connect-timeout 2 http://169.254.169.254/latest/meta-data/

# Audit 2: Enforce IMDSv2 with hop limit = 1 at cloud provider level
aws ec2 modify-instance-metadata-options \
  --instance-id <instance-id> \
  --http-tokens required \
  --http-put-response-hop-limit 1`,
      detection: `# Falco Rule: Detect access to link-local metadata service
- rule: Unauthorized Access to Cloud IMDS
  desc: Detect HTTP requests to 169.254.169.254 from non-infrastructure pods
  condition: outbound and fd.dip = 169.254.169.254 and not k8s.ns.name = "kube-system"
  output: "Pod attempted to query cloud metadata service: (pod=%k8s.pod.name cmd=%proc.cmdline)"
  priority: CRITICAL`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 5.2.2",
        nist: "NIST SP 800-190 § 4.4.1",
        mitre: "T1552.005 (Cloud Instance Metadata API)"
      },
      kyverno: `# Kyverno ClusterPolicy: Block Cloud Instance Metadata (IMDS) (Defends against P5)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: block-cloud-metadata-imds
  annotations:
    policies.kyverno.io/title: Block Access to Cloud Instance Metadata Service
    policies.kyverno.io/category: Multi-Cloud Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  rules:
    - name: generate-imds-network-policy
      match:
        any:
          - resources:
              kinds: ["Namespace"]
      generate:
        apiVersion: networking.k8s.io/v1
        kind: NetworkPolicy
        name: block-imds-egress
        namespace: "{{request.object.metadata.name}}"
        synchronize: true
        data:
          spec:
            podSelector: {}
            policyTypes: ["Egress"]
            egress:
              - to:
                  - ipBlock:
                      cidr: 0.0.0.0/0
                      except:
                        - 169.254.169.254/32`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Block HostNetwork Bypass to Cloud IMDS (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: block-imds-hostnetwork
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "!has(object.spec.hostNetwork) || object.spec.hostNetwork == false"
      message: "hostNetwork pods bypass CNI egress firewalls to query link-local cloud IMDS (169.254.169.254)."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: block-imds-hostnetwork-binding
spec:
  policyName: block-imds-hostnetwork
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Block HostNetwork Access to IMDS
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sblockimdshostnetwork
spec:
  crd:
    spec:
      names:
        kind: K8sBlockIMDSHostNetwork
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sblockimdshostnetwork
        violation[{"msg": msg}] {
          input.review.object.spec.hostNetwork == true
          msg := "hostNetwork is forbidden: pods can bypass egress network policies to reach cloud IMDS 169.254.169.254"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sBlockIMDSHostNetwork
metadata:
  name: block-imds-hostnetwork
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "p6": {
      id: "P6",
      name: "Datastore & Secrets Harvest",
      category: "Attack Scenario",
      priority: "pri-1",
      level: 2,
      origin: "Attacker -> Unencrypted etcd Datastore / Backup Snapshots",
      motive: "Mass exfiltration of all cluster API keys, tokens, and database passwords",
      stride: "Information Disclosure, Tampering",
      overview: "Attacker gains access to an unencrypted etcd backup (snapshot.db) left on an S3 bucket or dumps etcd directly through exposed ports or compromised control plane node filesystem. Because KMS envelope encryption was not enabled, all secrets across all namespaces are recovered in plaintext.",
      attackVectors: [
        "AV06: Accessing unauthenticated etcd port 2379",
        "AV24: Plaintext secrets stored in bbolt DB without KMS encryption",
        "AV25: Exfiltration of exposed backup snapshots"
      ],
      yaml: `# Hardening against P6: etcd KMS v2 envelope encryption + automatic backup encryption
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
      - configmaps
    providers:
      - kms:
          apiVersion: v2
          name: vault-kms
          endpoint: unix:///run/kmsplugin/socket.sock
          timeout: 3s
      - identity: {}`,
      shell: `# Audit: Check if raw secret values in etcd are encrypted
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get /registry/secrets/production/my-secret | head -n 4`,
      detection: `# Falco Rule: Unauthorized read of etcd snapshot files
- rule: etcd Snapshot File Read by Non-Backup Tool
  desc: Detect processes reading snapshot.db other than official backup cronjob
  condition: open_read and fd.name endswith "snapshot.db" and not proc.name in (etcdctl, velero)
  output: "etcd snapshot accessed: (proc=%proc.cmdline user=%user.name file=%fd.name)"
  priority: CRITICAL`,
      compliance: {
        cis: "CIS Kubernetes Benchmark v1.8.0 § 1.2.32, § 2.1",
        nist: "NIST SP 800-190 § 4.5.2",
        mitre: "T1005 (Data from Local System), T1552 (Unsecured Credentials)"
      },
      kyverno: `# Kyverno ClusterPolicy: Restrict Secret Mounting & Require External Secret Store (Defends against P6)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-secret-access
  annotations:
    policies.kyverno.io/title: Restrict Secret Mounting & Access
    policies.kyverno.io/category: Secret Management
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  rules:
    - name: block-env-secrets
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Secrets should be mounted via CSI Secret Store volumes, not exposed as static environment variables."
        pattern:
          spec:
            containers:
              - =(env):
                  - =(valueFrom):
                      X(secretKeyRef): null`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Restrict Plaintext Secret Env Vars (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: disallow-secret-env-vars
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, !has(c.env) || c.env.all(e, !has(e.valueFrom) || !has(e.valueFrom.secretKeyRef)))"
      message: "Direct injection of Secrets via environment variables is forbidden. Use CSI Secret Store driver."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: disallow-secret-env-vars-binding
spec:
  policyName: disallow-secret-env-vars
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Restrict Secret Env Vars
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sdisallowsecretenv
spec:
  crd:
    spec:
      names:
        kind: K8sDisallowSecretEnv
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sdisallowsecretenv
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          env := container.env[_]
          env.valueFrom.secretKeyRef
          msg := sprintf("Container '%v' exposes secret '%v' as env variable", [container.name, env.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDisallowSecretEnv
metadata:
  name: disallow-secret-env-vars
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    // ---------------- ATTACK VECTORS (AV01 - AV15) ----------------
    "av01": {
      id: "AV01",
      name: "Public Ingress Application Vulnerability (RCE/SSRF)",
      category: "Attack Vector",
      priority: "pri-1",
      level: 2,
      stride: "Tampering, Elevation of Privilege",
      overview: "Exploitation of remote code execution (RCE) flaws, SQL injection, or Server-Side Request Forgery (SSRF) in exposed web microservices.",
      attackVectors: ["Log4Shell (CVE-2021-44228)", "Spring4Shell (CVE-2022-22965)", "Unauthenticated file uploads"],
      yaml: `# Web Application Firewall & NetworkPolicy Ingress restriction
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-ingress
spec:
  podSelector:
    matchLabels:
      app: web
  ingress:
    - ports:
        - port: 8080`,
      shell: `kubectl describe netpol -n production`,
      detection: `falco -c /etc/falco/falco.yaml`,
      compliance: { cis: "CIS § 5.3.2", nist: "NIST § 4.1", mitre: "T1190" }
    },

    "av02": {
      id: "AV02",
      name: "Exposed API Server with Weak/Anonymous Auth",
      category: "Attack Vector",
      priority: "pri-1",
      level: 1,
      stride: "Spoofing, Elevation of Privilege",
      overview: "Internet-facing kube-apiserver with --anonymous-auth=true enabled or exposed on 0.0.0.0 without client certificate authentication.",
      attackVectors: ["Port 6443 internet scanning", "Unauthenticated namespace listing", "Anonymous pod deployment"],
      yaml: `# Disable anonymous auth in kube-apiserver manifest
--anonymous-auth=false`,
      shell: `curl -k -s https://<api-endpoint>:6443/api`,
      detection: `audit-log: responseStatus.code == 401`,
      compliance: { cis: "CIS § 1.2.1", nist: "NIST § 4.3", mitre: "T1133" }
    },

    "av03": {
      id: "AV03",
      name: "Over-Permissive RBAC & cluster-admin Wildcards",
      category: "Attack Vector",
      priority: "pri-1",
      level: 2,
      stride: "Elevation of Privilege",
      overview: "Binding standard service accounts or untrusted human users to cluster-admin or wildcard verbs (verbs: ['*'], resources: ['*']).",
      attackVectors: ["Escalation via create pods/exec", "Reading secrets across namespaces", "Token impersonation"],
      yaml: `# Avoid wildcard verbs in ClusterRoles!
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]`,
      shell: `kubectl get clusterrolebindings -o json | jq '.items[] | select(.roleRef.name=="cluster-admin")'`,
      detection: `audit-log: verb=create resource=clusterrolebindings`,
      compliance: { cis: "CIS § 5.1.1", nist: "NIST § 4.3.1", mitre: "T1078.004" }
    },

    "av04": {
      id: "AV04",
      name: "Privileged Container Escape (hostPID / SYS_ADMIN / runc)",
      category: "Attack Vector",
      priority: "pri-1",
      level: 3,
      stride: "Elevation of Privilege, Tampering",
      overview: "Breaking out of container cgroups and namespaces onto node host filesystem via privileged: true, hostPID: true, or runc CVE-2024-21626.",
      attackVectors: ["runc file descriptor leak", "cgroup release_agent breakout", "hostPath / volume mount abuse"],
      yaml: `# Disallow privileged containers
securityContext:
  privileged: false
  allowPrivilegeEscalation: false`,
      shell: `kubectl get pods -A -o json | jq '.items[] | select(.spec.containers[].securityContext.privileged==true)'`,
      detection: `falco rule: Container Breakout via nsenter`,
      compliance: { cis: "CIS § 5.2.1", nist: "NIST § 4.2", mitre: "T1611" }
    },

    "av06": {
      id: "AV06",
      name: "Unauthenticated etcd Port 2379 Exposure",
      category: "Attack Vector",
      priority: "pri-1",
      level: 1,
      stride: "Information Disclosure, Tampering",
      overview: "Direct network reachability to etcd peer or client ports without mutual TLS client certificate verification.",
      attackVectors: ["Dumping raw bbolt database", "Directly injecting malicious cluster admin users into etcd"],
      yaml: `# Enforce mTLS on etcd static pod
--client-cert-auth=true
--trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt`,
      shell: `ETCDCTL_API=3 etcdctl get "" --prefix --keys-only`,
      detection: `falco rule: Unauthorized Access to etcd Data Directory`,
      compliance: { cis: "CIS § 2.1", nist: "NIST § 4.5", mitre: "T1552" }
    },

    "av09": {
      id: "AV09",
      name: "ServiceAccount Token Theft & Harvest",
      category: "Attack Vector",
      priority: "pri-2",
      level: 2,
      stride: "Elevation of Privilege, Information Disclosure",
      overview: "Extracting the mounted bearer token from /var/run/secrets/kubernetes.io/serviceaccount/token to authenticate against the API server.",
      attackVectors: ["Mounted token theft", "Token lifetime beyond pod duration"],
      yaml: `# Turn off token automount
automountServiceAccountToken: false`,
      shell: `cat /var/run/secrets/kubernetes.io/serviceaccount/token`,
      detection: `falco rule: Read ServiceAccount Token by Untrusted Binary`,
      compliance: { cis: "CIS § 5.1.5", nist: "NIST § 4.3", mitre: "T1552.007" }
    },

    "av10": {
      id: "AV10",
      name: "Cloud IMDS SSRF (169.254.169.254)",
      category: "Attack Vector",
      priority: "pri-2",
      level: 2,
      stride: "Information Disclosure, Elevation of Privilege",
      overview: "Querying cloud metadata endpoint from inside pod to extract temporary IAM role credentials (AWS STS, GCP access token).",
      attackVectors: ["IMDSv1 without session tokens", "Hop limit > 1 allowing pod network traversal"],
      yaml: `# Cilium egress deny to 169.254.169.254`,
      shell: `curl -s http://169.254.169.254/latest/meta-data/`,
      detection: `falco rule: Contact Cloud Instance Metadata Service`,
      compliance: { cis: "CIS § 5.2.2", nist: "NIST § 4.4.1", mitre: "T1552.005" }
    },

    // ---------------- DEFENSE CONTROLS (C01 - C12) ----------------
    "c01": {
      id: "C01",
      name: "Default Deny NetworkPolicies",
      category: "Defense Control",
      priority: "pri-1",
      level: 2,
      stride: "Information Disclosure, Denial of Service",
      overview: "Enforcing default-deny ingress and egress NetworkPolicies isolates workloads by default, requiring explicit whitelist rules for allowed communication.",
      attackVectors: ["AV01", "AV09", "AV11", "AV13"],
      yaml: `# Production Default Deny Ingress & Egress NetworkPolicy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress`,
      shell: `kubectl get netpol -A`,
      detection: `hubble observe --verdict DROPPED`,
      compliance: { cis: "CIS § 5.3.2", nist: "NIST § 4.4.1", mitre: "T1040" },
      kyverno: `# Kyverno ClusterPolicy: Auto-Generate Default-Deny NetworkPolicy on Namespace Creation
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: generate-default-deny-netpol
  annotations:
    policies.kyverno.io/title: Auto-Generate Default-Deny NetworkPolicy
    policies.kyverno.io/category: Multi-Tenancy & Zero Trust
    policies.kyverno.io/severity: high
spec:
  rules:
    - name: generate-deny-all
      match:
        any:
          - resources:
              kinds: ["Namespace"]
      generate:
        apiVersion: networking.k8s.io/v1
        kind: NetworkPolicy
        name: default-deny-all
        namespace: "{{request.object.metadata.name}}"
        synchronize: true
        data:
          spec:
            podSelector: {}
            policyTypes:
              - Ingress
              - Egress`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Enforce Zero-Trust Network Isolation (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-network-isolation-label
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["namespaces"]
  validations:
    - expression: "has(object.metadata.labels) && has(object.metadata.labels['network-policy']) && object.metadata.labels['network-policy'] == 'enforce-default-deny'"
      message: "Namespaces must declare label 'network-policy: enforce-default-deny' to trigger automated zero-trust NetworkPolicy generation."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-network-isolation-label-binding
spec:
  policyName: require-network-isolation-label
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Enforce Namespace Network Isolation Label
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequirenetpollabel
spec:
  crd:
    spec:
      names:
        kind: K8sRequireNetpolLabel
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8srequirenetpollabel
        violation[{"msg": msg}] {
          not input.review.object.metadata.labels["network-policy"] == "enforce-default-deny"
          msg := "Namespaces must have label 'network-policy: enforce-default-deny'"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequireNetpolLabel
metadata:
  name: require-network-isolation-label
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Namespace"]`
    },

    "c02": {
      id: "C02",
      name: "Pod Security Standards (Restricted)",
      category: "Defense Control",
      priority: "pri-1",
      level: 2,
      stride: "Elevation of Privilege",
      overview: "Enforces non-root execution, drops all Linux capabilities, and requires read-only root filesystems and RuntimeDefault seccomp profiles.",
      attackVectors: ["AV04", "AV26", "AV28"],
      yaml: `# Enforce Restricted Pod Security Standard on Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest`,
      shell: `kubectl get ns --show-labels | grep pod-security`,
      detection: `audit-log: responseStatus.message == "violates PodSecurity restricted"`,
      compliance: { cis: "CIS § 5.2.1", nist: "NIST § 4.2.1", mitre: "T1611" },
      kyverno: `# Kyverno ClusterPolicy: Enforce Pod Security Standards (Restricted)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: pss-restricted
  annotations:
    policies.kyverno.io/title: Enforce Pod Security Standards (Restricted)
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: require-non-root-and-ro-rootfs
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Containers must run as non-root with read-only root filesystems and dropped capabilities."
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true
            containers:
              - securityContext:
                  readOnlyRootFilesystem: true
                  allowPrivilegeEscalation: false
                  capabilities:
                    drop:
                      - ALL`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Pod Security Standards Restricted (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: pss-restricted
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(has(object.spec.securityContext) && has(object.spec.securityContext.runAsNonRoot) && object.spec.securityContext.runAsNonRoot == true) || object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.runAsNonRoot) && c.securityContext.runAsNonRoot == true)"
      message: "Pods must run as non-root (runAsNonRoot: true)."
    - expression: "object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.readOnlyRootFilesystem) && c.securityContext.readOnlyRootFilesystem == true)"
      message: "Containers must set readOnlyRootFilesystem: true."
    - expression: "object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.capabilities) && has(c.securityContext.capabilities.drop) && c.securityContext.capabilities.drop.exists(cap, cap == 'ALL'))"
      message: "Containers must drop ALL capabilities."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: pss-restricted-binding
spec:
  policyName: pss-restricted
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Pod Security Standards Restricted
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8spssrestricted
spec:
  crd:
    spec:
      names:
        kind: K8sPSSRestricted
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8spssrestricted
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.readOnlyRootFilesystem == true
          msg := sprintf("Container '%v' must have readOnlyRootFilesystem: true", [container.name])
        }
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.runAsNonRoot == true
          not input.review.object.spec.securityContext.runAsNonRoot == true
          msg := sprintf("Container '%v' must set runAsNonRoot: true", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSSRestricted
metadata:
  name: pss-restricted
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c03": {
      id: "C03",
      name: "etcd KMS v2 Envelope Encryption",
      category: "Defense Control",
      priority: "pri-1",
      level: 2,
      stride: "Information Disclosure",
      overview: "Uses a Key Management Service (AWS KMS, GCP Cloud KMS, HashiCorp Vault) to encrypt Kubernetes data encryption keys (DEK) with a key encryption key (KEK).",
      attackVectors: ["AV06", "AV24", "AV25"],
      yaml: `# KMS v2 EncryptionConfiguration for kube-apiserver
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources: ["secrets", "configmaps"]
    providers:
      - kms:
          apiVersion: v2
          name: aws-kms
          endpoint: unix:///run/kmsplugin/socket.sock`,
      shell: `ETCDCTL_API=3 etcdctl get /registry/secrets/default/my-secret | head -n 2`,
      detection: `kms cloudtrail: eventName=Decrypt`,
      compliance: { cis: "CIS § 1.2.32", nist: "NIST § 4.5.2", mitre: "T1552" },
      kyverno: `# Kyverno ClusterPolicy: Restrict Raw Secrets Exposure in Pod Specs
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-raw-secrets
  annotations:
    policies.kyverno.io/title: Restrict Secret Mounting as Plaintext Environment Variables
    policies.kyverno.io/category: Secret Management
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: disallow-secret-env-vars
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Direct injection of Secrets via environment variables is forbidden. Mount secrets via CSI driver instead."
        pattern:
          spec:
            containers:
              - =(env):
                  - =(valueFrom):
                      X(secretKeyRef): null`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Disallow Secret Environment Variables (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: disallow-secret-env-vars
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, !has(c.env) || c.env.all(e, !has(e.valueFrom) || !has(e.valueFrom.secretKeyRef)))"
      message: "Injecting Secrets as plaintext environment variables is forbidden. Use CSI Secret Store."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: disallow-secret-env-vars-binding
spec:
  policyName: disallow-secret-env-vars
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Disallow Plaintext Secret Env Vars
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sdisallowsecretenv
spec:
  crd:
    spec:
      names:
        kind: K8sDisallowSecretEnv
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sdisallowsecretenv
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          env := container.env[_]
          env.valueFrom.secretKeyRef
          msg := sprintf("Container '%v' exposes secret key '%v' via env variable", [container.name, env.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDisallowSecretEnv
metadata:
  name: disallow-secret-env-vars
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c04": {
      id: "C04",
      name: "Kyverno Policy-as-Code Engine",
      category: "Defense Control",
      priority: "pri-2",
      level: 2,
      stride: "Tampering, Elevation of Privilege",
      overview: "Validates, mutates, and generates resources while verifying container signatures and enforcing security invariants.",
      attackVectors: ["AV03", "AV15", "AV17"],
      yaml: `# Kyverno Policy: Disallow containers running as root
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-non-root
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-user
      match:
        any:
          - resources: { kinds: ["Pod"] }
      validate:
        pattern:
          spec:
            containers:
              - securityContext: { runAsNonRoot: true }`,
      shell: `kubectl get policyreports -A`,
      detection: `kubectl get events --field-selector reason=PolicyViolation`,
      compliance: { cis: "CIS § 5.2.1", nist: "NIST § 4.3", mitre: "T1548" },
      kyverno: `# Kyverno ClusterPolicy: Require Non-Root User Execution
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-non-root
  annotations:
    policies.kyverno.io/title: Disallow Root User Execution
    policies.kyverno.io/category: Pod Security Standards
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-user
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Containers must run as a non-root user (runAsNonRoot: true)."
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true
            containers:
              - securityContext:
                  runAsNonRoot: true`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Require Non-Root Execution (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-non-root
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(has(object.spec.securityContext) && has(object.spec.securityContext.runAsNonRoot) && object.spec.securityContext.runAsNonRoot == true) || object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.runAsNonRoot) && c.securityContext.runAsNonRoot == true)"
      message: "Containers must run as non-root (runAsNonRoot: true)."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-non-root-binding
spec:
  policyName: require-non-root
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require Non-Root Execution
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequirenonroot
spec:
  crd:
    spec:
      names:
        kind: K8sRequireNonRoot
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8srequirenonroot
        violation[{"msg": msg}] {
          not input.review.object.spec.securityContext.runAsNonRoot == true
          container := input.review.object.spec.containers[_]
          not container.securityContext.runAsNonRoot == true
          msg := sprintf("Container '%v' must set runAsNonRoot: true", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequireNonRoot
metadata:
  name: require-non-root
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c05": {
      id: "C05",
      name: "Falco & Tetragon eBPF Runtime Detection",
      category: "Defense Control",
      priority: "pri-1",
      level: 3,
      stride: "Repudiation, Elevation of Privilege, Tampering",
      overview: "Hooks directly into the Linux kernel via eBPF (extended Berkeley Packet Filter) to monitor syscalls, process executions, network connections, and namespace transitions with near-zero overhead.",
      attackVectors: ["AV04", "AV09", "AV10", "AV26"],
      yaml: `# Tetragon TracingPolicy: Detect and block unauthorized namespace escapes
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: block-setns-escape
spec:
  kprobes:
    - call: "sys_setns"
      syscall: true
      selectors:
        - matchActions: [{ action: Sigkill }]`,
      shell: `falcoctl status && tail -f /var/log/falco/events.json`,
      detection: `falco rule: Terminal shell in container`,
      compliance: { cis: "CIS § 4.2.1", nist: "NIST § 4.2.2", mitre: "T1059" },
      kyverno: `# Kyverno ClusterPolicy: Protect eBPF Runtime Security Sensors
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: protect-ebpf-sensors
  annotations:
    policies.kyverno.io/title: Protect eBPF Runtime Security Sensors
    policies.kyverno.io/category: Defense-in-Depth
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  rules:
    - name: block-ebpf-deletion
      match:
        any:
          - resources:
              kinds: ["DaemonSet"]
              namespaces: ["kube-system", "falco", "tetragon"]
              names: ["falco*", "tetragon*"]
      validate:
        message: "Deleting or scaling down eBPF security monitoring daemonsets is strictly forbidden."
        deny:
          conditions:
            any:
              - key: "{{request.operation}}"
                operator: In
                value: ["DELETE"]`
    },

    "c06": {
      id: "C06",
      name: "NodeRestriction Admission Plugin",
      category: "Defense Control",
      priority: "pri-1",
      level: 1,
      stride: "Elevation of Privilege, Tampering",
      overview: "Limits the Node and Pod objects that a kubelet can modify, preventing a compromised worker node from tampering with pods scheduled on other nodes.",
      attackVectors: ["AV28"],
      yaml: `# Enable NodeRestriction in kube-apiserver
--enable-admission-plugins=NodeRestriction,PodSecurity`,
      shell: `ps -ef | grep kube-apiserver | grep NodeRestriction`,
      detection: `audit-log: verb=patch resource=pods status=403`,
      compliance: { cis: "CIS § 1.2.17", nist: "NIST § 4.3", mitre: "T1611" },
      kyverno: `# Kyverno ClusterPolicy: Restrict Node Labels and Taints Modifications
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-node-modifications
  annotations:
    policies.kyverno.io/title: Restrict Node Modification to Authorized Identities
    policies.kyverno.io/category: Node Security
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-node-labels
      match:
        any:
          - resources:
              kinds: ["Node"]
      validate:
        message: "Only system:node identities may modify standard node-restriction labels."
        pattern:
          metadata:
            labels:
              =(node-restriction.kubernetes.io/*): "*"`
    },

    "c07": {
      id: "C07",
      name: "API Priority and Fairness (APF)",
      category: "Defense Control",
      priority: "pri-3",
      level: 1,
      stride: "Denial of Service",
      overview: "Categorizes incoming API server requests into queues and assigns concurrency limits to prevent noisy or malicious clients from starving critical control plane operations.",
      attackVectors: ["AV08"],
      yaml: `# FlowSchema ensuring health checks and node leases always succeed
apiVersion: flowcontrol.apiserver.k8s.io/v1
kind: FlowSchema
metadata:
  name: system-nodes
spec:
  priorityLevelConfiguration:
    name: system
  matchingPrecedence: 500`,
      shell: `kubectl get flowschemas,prioritylevelconfigurations`,
      detection: `metrics: apiserver_flowcontrol_rejected_requests_total`,
      compliance: { cis: "CIS § 1.2.22", nist: "NIST § 4.3", mitre: "T1499" },
      kyverno: `# Kyverno ClusterPolicy: Require Pod Resource Requests and Limits (DoS Mitigation)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-pod-resources
  annotations:
    policies.kyverno.io/title: Require CPU/Memory Limits and Requests
    policies.kyverno.io/category: Resource Management & DoS Mitigation
    policies.kyverno.io/severity: medium
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-cpu-memory-limits
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "CPU and memory resource requests and limits must be specified to prevent noisy-neighbor starvation."
        pattern:
          spec:
            containers:
              - resources:
                  requests:
                    cpu: "?*"
                    memory: "?*"
                  limits:
                    memory: "?*"`
    },

    "c08": {
      id: "C08",
      name: "Seccomp RuntimeDefault Profile",
      category: "Defense Control",
      priority: "pri-2",
      level: 3,
      stride: "Elevation of Privilege",
      overview: "Blocks dangerous or obsolete Linux system calls (e.g., clone without flags, reboot, kexec_load, ptrace) directly at the kernel boundary.",
      attackVectors: ["AV04", "AV26"],
      yaml: `# Set RuntimeDefault Seccomp profile
securityContext:
  seccompProfile:
    type: RuntimeDefault`,
      shell: `kubectl get pods -A -o json | jq '.items[].spec.securityContext.seccompProfile'`,
      detection: `dmesg | grep -i seccomp`,
      compliance: { cis: "CIS § 5.2.7", nist: "NIST § 4.2.1", mitre: "T1611" },
      kyverno: `# Kyverno ClusterPolicy: Require RuntimeDefault Seccomp Profile
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-runtime-default-seccomp
  annotations:
    policies.kyverno.io/title: Require RuntimeDefault Seccomp Profile
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-seccomp
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Pod securityContext must set seccompProfile type to RuntimeDefault or Localhost."
        pattern:
          spec:
            securityContext:
              seccompProfile:
                type: "RuntimeDefault | Localhost"`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Require RuntimeDefault Seccomp Profile (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-runtime-default-seccomp
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(has(object.spec.securityContext) && has(object.spec.securityContext.seccompProfile) && object.spec.securityContext.seccompProfile.type in ['RuntimeDefault', 'Localhost']) || object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.seccompProfile) && c.securityContext.seccompProfile.type in ['RuntimeDefault', 'Localhost'])"
      message: "Seccomp profile type RuntimeDefault or Localhost is required to restrict dangerous Linux syscalls."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-runtime-default-seccomp-binding
spec:
  policyName: require-runtime-default-seccomp
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require RuntimeDefault Seccomp
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequireseccomp
spec:
  crd:
    spec:
      names:
        kind: K8sRequireSeccomp
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8srequireseccomp
        violation[{"msg": msg}] {
          not valid_seccomp(input.review.object.spec)
          msg := "Pod securityContext must specify seccompProfile.type as RuntimeDefault or Localhost"
        }
        valid_seccomp(spec) {
          spec.securityContext.seccompProfile.type == "RuntimeDefault"
        }
        valid_seccomp(spec) {
          spec.securityContext.seccompProfile.type == "Localhost"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequireSeccomp
metadata:
  name: require-seccomp-runtime-default
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c09": {
      id: "C09",
      name: "ReadOnlyRootFilesystem & Drop ALL Caps",
      category: "Defense Control",
      priority: "pri-2",
      level: 2,
      stride: "Tampering, Elevation of Privilege",
      overview: "Prevents attackers from downloading or compiling malware binaries in the container and strips all POSIX capabilities.",
      attackVectors: ["AV01", "AV04"],
      yaml: `securityContext:
  readOnlyRootFilesystem: true
  capabilities:
    drop: ["ALL"]`,
      shell: `kubectl exec <pod> -- touch /etc/test`,
      detection: `falco rule: Write below etc or binary directory`,
      compliance: { cis: "CIS § 5.2.6", nist: "NIST § 4.1.2", mitre: "T1059" },
      kyverno: `# Kyverno ClusterPolicy: Read-Only Root Filesystem & Drop ALL Capabilities
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: ro-rootfs-drop-all-caps
  annotations:
    policies.kyverno.io/title: Read-Only Root Filesystem & Drop ALL Capabilities
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-caps-and-ro
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "All Linux capabilities must be dropped and root filesystem must be read-only."
        pattern:
          spec:
            containers:
              - securityContext:
                  readOnlyRootFilesystem: true
                  capabilities:
                    drop:
                      - ALL`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Drop ALL Capabilities and RO Rootfs (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: drop-all-caps-ro-rootfs
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.capabilities) && has(c.securityContext.capabilities.drop) && c.securityContext.capabilities.drop.exists(cap, cap == 'ALL'))"
      message: "Containers must drop ALL capabilities (capabilities.drop: ['ALL'])."
    - expression: "object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.readOnlyRootFilesystem) && c.securityContext.readOnlyRootFilesystem == true)"
      message: "Containers must enable readOnlyRootFilesystem: true."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: drop-all-caps-ro-rootfs-binding
spec:
  policyName: drop-all-caps-ro-rootfs
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Drop ALL Capabilities & RO Rootfs
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sdropcapsrorootfs
spec:
  crd:
    spec:
      names:
        kind: K8sDropCapsRORootfs
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sdropcapsrorootfs
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.readOnlyRootFilesystem == true
          msg := sprintf("Container '%v' must have readOnlyRootFilesystem: true", [container.name])
        }
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not container.securityContext.capabilities.drop[_] == "ALL"
          msg := sprintf("Container '%v' must drop ALL capabilities", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDropCapsRORootfs
metadata:
  name: drop-all-caps-ro-rootfs
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c10": {
      id: "C10",
      name: "Cryptographic Image Signatures (Cosign & SLSA)",
      category: "Defense Control",
      priority: "pri-1",
      level: 2,
      stride: "Tampering, Elevation of Privilege",
      overview: "Verifies OCI container image signatures and SLSA build provenance before permitting deployment onto cluster nodes.",
      attackVectors: ["AV15", "AV16", "AV17"],
      yaml: `# Kyverno verifyImages rule with Cosign public key
verifyImages:
  - imageReferences: ["ghcr.io/myorg/*"]
    attestors:
      - entries: [{ keys: { publicKeys: "..." } }]`,
      shell: `cosign verify --key cosign.pub ghcr.io/myorg/app:latest`,
      detection: `admission event: image verification failed`,
      compliance: { cis: "CIS § 5.4.1", nist: "NIST § 4.1.1", mitre: "T1195" },
      kyverno: `# Kyverno ClusterPolicy: Verify Cosign Signatures & Attestations
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signatures
  annotations:
    policies.kyverno.io/title: Verify Cosign Signatures and SLSA Provenance
    policies.kyverno.io/category: Supply Chain Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  webhookTimeoutSeconds: 30
  rules:
    - name: verify-signature-rule
      match:
        any:
          - resources:
              kinds: ["Pod"]
      verifyImages:
        - imageReferences: ["ghcr.io/myorg/*", "registry.k8s.io/*"]
          attestors:
            - entries:
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...
                      -----END PUBLIC KEY-----`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Enforce Trusted Signed Image Registries (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: enforce-signed-image-registries
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, c.image.startsWith('ghcr.io/myorg/') || c.image.startsWith('registry.k8s.io/'))"
      message: "Images must originate from authorized registries verifying Cosign signatures."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: enforce-signed-image-registries-binding
spec:
  policyName: enforce-signed-image-registries
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Restrict Container Repositories
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sallowedrepos
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedRepos
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sallowedrepos
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not startswith(container.image, "ghcr.io/myorg/")
          not startswith(container.image, "registry.k8s.io/")
          msg := sprintf("Container '%v' image '%v' is not from a signed repository", [container.name, container.image])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: enforce-signed-image-registries
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c11": {
      id: "C11",
      name: "IMDSv2 Enforce Hop Limit = 1",
      category: "Defense Control",
      priority: "pri-2",
      level: 2,
      stride: "Information Disclosure, Elevation of Privilege",
      overview: "Enforces AWS IMDSv2 session tokens and restricts the network hop limit to 1 so packets cannot traverse container network bridges.",
      attackVectors: ["AV10"],
      yaml: `# CloudFormation / Terraform EC2 metadata options
http_tokens = "required"
http_put_response_hop_limit = 1`,
      shell: `aws ec2 describe-instances --query 'Reservations[*].Instances[*].MetadataOptions'`,
      detection: `cloudtrail: GetCallerIdentity from untrusted instance role`,
      compliance: { cis: "CIS § 5.2.2", nist: "NIST § 4.4.1", mitre: "T1552.005" },
      kyverno: `# Kyverno ClusterPolicy: Block Cloud Instance Metadata (IMDS 169.254.169.254)
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: block-cloud-metadata-imds
  annotations:
    policies.kyverno.io/title: Block Access to Cloud Instance Metadata Service
    policies.kyverno.io/category: Multi-Cloud Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  rules:
    - name: generate-imds-network-policy
      match:
        any:
          - resources:
              kinds: ["Namespace"]
      generate:
        apiVersion: networking.k8s.io/v1
        kind: NetworkPolicy
        name: block-imds-egress
        namespace: "{{request.object.metadata.name}}"
        synchronize: true
        data:
          spec:
            podSelector: {}
            policyTypes: ["Egress"]
            egress:
              - to:
                  - ipBlock:
                      cidr: 0.0.0.0/0
                      except:
                        - 169.254.169.254/32`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Disallow HostNetwork (Prevents IMDS Bypass) (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: block-hostnetwork-imds
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "!has(object.spec.hostNetwork) || object.spec.hostNetwork == false"
      message: "hostNetwork pods bypass network isolation to reach link-local metadata 169.254.169.254."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: block-hostnetwork-imds-binding
spec:
  policyName: block-hostnetwork-imds
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Block HostNetwork Access to IMDS
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sblockhostnetwork
spec:
  crd:
    spec:
      names:
        kind: K8sBlockHostNetwork
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sblockhostnetwork
        violation[{"msg": msg}] {
          input.review.object.spec.hostNetwork == true
          msg := "hostNetwork is forbidden: pods can reach node link-local metadata 169.254.169.254"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sBlockHostNetwork
metadata:
  name: block-hostnetwork-imds
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c12": {
      id: "C12",
      name: "Kubernetes Audit Policy (RequestResponse)",
      category: "Defense Control",
      priority: "pri-2",
      level: 2,
      stride: "Repudiation",
      overview: "Logs all security-relevant API interactions (RBAC modifications, Secret access, pod execs) to tamper-proof external storage.",
      attackVectors: ["AV02", "AV03", "AV07"],
      yaml: `# /etc/kubernetes/audit-policy.yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["secrets", "configmaps"]
      - group: "rbac.authorization.k8s.io"
        resources: ["*"]`,
      shell: `tail -n 20 /var/log/kubernetes/audit.log`,
      detection: `SIEM / Elastic / Splunk alert on 403 Forbidden bursts`,
      compliance: { cis: "CIS § 3.2.1", nist: "NIST § 4.3.2", mitre: "T1005" },
      kyverno: `# Kyverno ClusterPolicy: Validate Audit & Compliance Annotations
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-audit-annotations
  annotations:
    policies.kyverno.io/title: Require Audit and Compliance Annotations
    policies.kyverno.io/category: Governance & Audit
    policies.kyverno.io/severity: medium
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-audit-labels
      match:
        any:
          - resources:
              kinds: ["Namespace"]
      validate:
        message: "Every namespace must specify owner and data-sensitivity classification for audit tracking."
        pattern:
          metadata:
            labels:
              owner: "?*"
              data-classification: "?*"`
    },

    "c14": {
      id: "C14",
      name: "Image Signing & Verification Policy (Cosign / Notary)",
      category: "Supply Chain Control",
      priority: "pri-2",
      level: 2,
      stride: "Tampering, Spoofing",
      overview: "Enforces that only cryptographically signed container images matching approved KMS/OIDC identities can be pulled and run inside the cluster.",
      attackVectors: ["AV14", "AV20"],
      yaml: `# Kyverno ClusterPolicy for Image Verification
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: check-image-signatures
spec:
  validationFailureAction: Enforce
  rules:
    - name: verify-signature
      match:
        any:
        - resources:
            kinds: ['Pod']
      verifyImages:
      - imageReferences: ['ghcr.io/myorg/*']
        attestors:
        - entries:
          - keys:
              publicKeys: |-
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...
                -----END PUBLIC KEY-----`,
      shell: `cosign verify --key cosign.pub ghcr.io/myorg/payment-service:v1.4.0`,
      detection: `admission webhook failure: signature verification failed for image`,
      compliance: { cis: "CIS § 5.4.1", nist: "NIST SP 800-190 § 3.1", mitre: "T1195.002" },
      kyverno: `# Kyverno ClusterPolicy: Cryptographic Image Verification
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: check-image-signatures
  annotations:
    policies.kyverno.io/title: Cryptographic Image Verification (Cosign)
    policies.kyverno.io/category: Supply Chain Security
    policies.kyverno.io/severity: critical
spec:
  validationFailureAction: Enforce
  rules:
    - name: verify-signature
      match:
        any:
          - resources:
              kinds: ["Pod"]
      verifyImages:
        - imageReferences: ["ghcr.io/myorg/*"]
          attestors:
            - entries:
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...
                      -----END PUBLIC KEY-----`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Enforce Trusted Image Registries (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: enforce-trusted-signed-registries
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "object.spec.containers.all(c, c.image.startsWith('ghcr.io/myorg/'))"
      message: "Container image must originate from approved registry verifying Cosign signatures."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: enforce-trusted-signed-registries-binding
spec:
  policyName: enforce-trusted-signed-registries
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Restrict Container Repositories
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sallowedrepos
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedRepos
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8sallowedrepos
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not startswith(container.image, "ghcr.io/myorg/")
          msg := sprintf("Container '%v' image is not from an approved signed registry", [container.name])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: enforce-signed-registries
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c16": {
      id: "C16",
      name: "Seccomp Runtime Syscall Confinement",
      category: "Runtime Defense",
      priority: "pri-1",
      level: 3,
      stride: "Elevation of Privilege",
      overview: "Restricts container processes from invoking dangerous Linux system calls (e.g., ptrace, bpf, reboot, mount) using RuntimeDefault or custom seccomp profiles.",
      attackVectors: ["AV01", "AV04", "AV05"],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: hardened-app
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: app:v1`,
      shell: `grep Seccomp /proc/$(pgrep containerd-shim)/status`,
      detection: `auditd / Falco alert on forbidden syscall execution`,
      compliance: { cis: "CIS § 5.7.2", nist: "NIST SP 800-190 § 3.4", mitre: "T1611" },
      kyverno: `# Kyverno ClusterPolicy: Enforce Seccomp Syscall Filtering
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: enforce-seccomp-syscalls
  annotations:
    policies.kyverno.io/title: Enforce Seccomp Syscall Filtering
    policies.kyverno.io/category: Runtime Defense
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-seccomp
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Seccomp profile type RuntimeDefault is required to restrict dangerous Linux syscalls."
        pattern:
          spec:
            securityContext:
              seccompProfile:
                type: "RuntimeDefault"`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Require RuntimeDefault Seccomp Profile (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: enforce-seccomp-syscalls
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(has(object.spec.securityContext) && has(object.spec.securityContext.seccompProfile) && object.spec.securityContext.seccompProfile.type in ['RuntimeDefault', 'Localhost']) || object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.seccompProfile) && c.securityContext.seccompProfile.type in ['RuntimeDefault', 'Localhost'])"
      message: "Seccomp profile type RuntimeDefault is required to filter dangerous Linux syscalls."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: enforce-seccomp-syscalls-binding
spec:
  policyName: enforce-seccomp-syscalls
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require RuntimeDefault Seccomp
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8senforceseccomp
spec:
  crd:
    spec:
      names:
        kind: K8sEnforceSeccomp
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8senforceseccomp
        violation[{"msg": msg}] {
          not has_seccomp(input.review.object.spec)
          msg := "Pod must specify seccompProfile type RuntimeDefault or Localhost"
        }
        has_seccomp(spec) {
          spec.securityContext.seccompProfile.type == "RuntimeDefault"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sEnforceSeccomp
metadata:
  name: enforce-seccomp-syscalls
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    },

    "c17": {
      id: "C17",
      name: "AppArmor / SELinux Mandatory Access Control (MAC)",
      category: "Runtime Defense",
      priority: "pri-1",
      level: 3,
      stride: "Elevation of Privilege, Tampering",
      overview: "Enforces kernel-level Mandatory Access Control to prevent container breakouts, restricting file access, capability acquisition, and socket creation.",
      attackVectors: ["AV01", "AV05"],
      yaml: `apiVersion: v1
kind: Pod
metadata:
  name: apparmor-pod
spec:
  securityContext:
    appArmorProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: app:v1`,
      shell: `aa-status --profile`,
      detection: `dmesg | grep -i apparmor="DENIED"`,
      compliance: { cis: "CIS § 5.7.3", nist: "NIST SP 800-190 § 3.4", mitre: "T1611" },
      kyverno: `# Kyverno ClusterPolicy: Require AppArmor / SELinux MAC Profile
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-apparmor-profile
  annotations:
    policies.kyverno.io/title: Require AppArmor / SELinux MAC Profile
    policies.kyverno.io/category: Runtime Defense
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-apparmor
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Pod must specify appArmorProfile type RuntimeDefault or custom profile."
        pattern:
          spec:
            securityContext:
              appArmorProfile:
                type: "RuntimeDefault | Localhost"`,
      cel: `# In-Tree ValidatingAdmissionPolicy: Require AppArmor Profile (Kubernetes 1.30+ GA)
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-apparmor-profile
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  validations:
    - expression: "(has(object.spec.securityContext) && has(object.spec.securityContext.appArmorProfile) && object.spec.securityContext.appArmorProfile.type in ['RuntimeDefault', 'Localhost']) || object.spec.containers.all(c, has(c.securityContext) && has(c.securityContext.appArmorProfile) && c.securityContext.appArmorProfile.type in ['RuntimeDefault', 'Localhost'])"
      message: "Pod securityContext must set appArmorProfile type to RuntimeDefault or Localhost."
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-apparmor-profile-binding
spec:
  policyName: require-apparmor-profile
  validationActions: [Deny]
  matchResources:
    namespaceSelector: {}`,
      gatekeeper: `# OPA Gatekeeper ConstraintTemplate & Constraint: Require AppArmor Profile
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequireapparmor
spec:
  crd:
    spec:
      names:
        kind: K8sRequireAppArmor
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |-
        package k8srequireapparmor
        violation[{"msg": msg}] {
          not has_apparmor(input.review.object.spec)
          msg := "Pod must specify appArmorProfile type RuntimeDefault or Localhost"
        }
        has_apparmor(spec) {
          spec.securityContext.appArmorProfile.type == "RuntimeDefault"
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequireAppArmor
metadata:
  name: require-apparmor-profile
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]`
    }
  }
};

// Aliases for convenient lookups
const comps = window.KUBEDAILY_THREAT_MODEL_DATA.components;
comps["c01-networkpolicy"] = comps["c01"];
comps["c02-psa"] = comps["c02"];
comps["c03-kms-v2"] = comps["c03"];
comps["c04-kyverno"] = comps["c04"];
comps["c05-falco-tetragon"] = comps["c05"];
comps["c14-image-policy"] = comps["c14"];
comps["c16-seccomp"] = comps["c16"];
comps["c17-apparmor"] = comps["c17"];
comps["c16 / c17"] = comps["c16"];


// ============================================================================
// KubeDaily Interactive Cluster Hardening Scorecard Data (Option 2)
// 20 Enterprise Hardening Controls across 5 Security Domains
// ============================================================================

window.KUBEDAILY_SCORECARD_DATA = [
  // --- DOMAIN 1: POD & WORKLOAD ISOLATION ---
  {
    id: "CHK-01",
    domain: "workload",
    domainName: "Pod & Workload Isolation",
    title: "Disallow Privileged Containers",
    desc: "Enforce privileged: false across all containers to prevent direct host hardware and kernel access.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.2.1",
    nist: "NIST SP 800-190 § 4.2",
    mitre: "T1611",
    componentKey: "p4",
    policyKey: "disallow-privileged-containers",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.containers[].securityContext.privileged == true)'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-02",
    domain: "workload",
    domainName: "Pod & Workload Isolation",
    title: "Require Read-Only Root Filesystem",
    desc: "Enforce readOnlyRootFilesystem: true on containers to block malware drop, backdoor compilation, and binaries alteration.",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.2.6",
    nist: "NIST SP 800-190 § 4.1.2",
    mitre: "T1190",
    componentKey: "p1",
    policyKey: "require-ro-rootfs",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.containers[].securityContext.readOnlyRootFilesystem != true)'",
    defaultBaseline: false,
    defaultRestricted: true
  },
  {
    id: "CHK-03",
    domain: "workload",
    domainName: "Pod & Workload Isolation",
    title: "Drop ALL POSIX Capabilities",
    desc: "Strip all default Linux capabilities (drop: ['ALL']) to prevent CAP_SYS_ADMIN, CAP_NET_RAW, and CAP_DAC_OVERRIDE exploits.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.2.8",
    nist: "NIST SP 800-190 § 4.2.1",
    mitre: "T1611",
    componentKey: "c09",
    policyKey: "drop-all-capabilities",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.containers[].securityContext.capabilities.drop[]? != \"ALL\")'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-04",
    domain: "workload",
    domainName: "Pod & Workload Isolation",
    title: "Require Non-Root Workload Execution",
    desc: "Enforce runAsNonRoot: true and runAsUser > 0 to prevent container processes running under host UID 0.",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.2.4",
    nist: "NIST SP 800-190 § 4.2",
    mitre: "T1548",
    componentKey: "c04",
    policyKey: "require-non-root-user",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.securityContext.runAsNonRoot != true)'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-05",
    domain: "workload",
    domainName: "Pod & Workload Isolation",
    title: "Disallow Host Namespaces (PID, IPC, Network)",
    desc: "Reject pods declaring hostPID: true, hostIPC: true, or hostNetwork: true to isolate process and IPC trees from node OS.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.2.2 - 5.2.4",
    nist: "NIST SP 800-190 § 4.2",
    mitre: "T1611",
    componentKey: "p4",
    policyKey: "disallow-privileged-containers",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.hostPID == true or .spec.hostIPC == true or .spec.hostNetwork == true)'",
    defaultBaseline: true,
    defaultRestricted: true
  },

  // --- DOMAIN 2: IDENTITY, RBAC & SECRETS ---
  {
    id: "CHK-06",
    domain: "rbac",
    domainName: "Identity, RBAC & Secrets",
    title: "Restrict ServiceAccount Token Automounting",
    desc: "Enforce automountServiceAccountToken: false to prevent exfiltration of projected API credentials from pods.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.1.5",
    nist: "NIST SP 800-190 § 4.3",
    mitre: "T1552.007",
    componentKey: "p2",
    policyKey: "restrict-sa-token-automount",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.automountServiceAccountToken != false)'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-07",
    domain: "rbac",
    domainName: "Identity, RBAC & Secrets",
    title: "Audit & Disallow RBAC Wildcard Permissions",
    desc: "Audit ClusterRoleBindings and reject rules granting '*' verbs on '*' resources to prevent total cluster compromise.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.1.1",
    nist: "NIST SP 800-190 § 4.3.1",
    mitre: "T1078",
    componentKey: "c02",
    policyKey: "disallow-privileged-containers",
    cliVerify: "kubectl get clusterroles -o json | jq '.items[] | select(.rules[]? | .verbs[]? == \"*\" and .resources[]? == \"*\") | .metadata.name'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-08",
    domain: "rbac",
    domainName: "Identity, RBAC & Secrets",
    title: "Disallow Plaintext Secret Env Vars (Use CSI)",
    desc: "Forbid secretKeyRef environment variables; require SecretStore CSI Driver (HashiCorp Vault / AWS Secrets Manager).",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.4.1",
    nist: "NIST SP 800-190 § 4.3.2",
    mitre: "T1552",
    componentKey: "p6",
    policyKey: "c03",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.containers[].env[]?.valueFrom.secretKeyRef != null)'",
    defaultBaseline: false,
    defaultRestricted: true
  },
  {
    id: "CHK-09",
    domain: "rbac",
    domainName: "Identity, RBAC & Secrets",
    title: "Enforce etcd KMS v2 Data-at-Rest Encryption",
    desc: "Configure kube-apiserver with KMS v2 encryption provider to prevent unencrypted plaintext secrets leakage from etcd disks.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 1.2.29",
    nist: "NIST SP 800-190 § 4.4",
    mitre: "T1005",
    componentKey: "p6",
    policyKey: "c03",
    cliVerify: "ETCDCTL_API=3 etcdctl get /registry/secrets/default/my-secret --endpoints=https://127.0.0.1:2379 | head -n 1",
    defaultBaseline: true,
    defaultRestricted: true
  },

  // --- DOMAIN 3: NETWORK SEGMENTATION & MULTI-TENANCY ---
  {
    id: "CHK-10",
    domain: "network",
    domainName: "Network & Multi-Tenancy",
    title: "Default-Deny Ingress and Egress NetworkPolicies",
    desc: "Enforce zero-trust default-deny isolation policies across all tenant namespaces on the flat CNI network.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.3.2",
    nist: "NIST SP 800-190 § 4.4.1",
    mitre: "T1040",
    componentKey: "c01",
    policyKey: "generate-default-deny-netpol",
    cliVerify: "kubectl get namespaces -o json | jq -r '.items[].metadata.name' | while read ns; do kubectl get netpol -n $ns; done",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-11",
    domain: "network",
    domainName: "Network & Multi-Tenancy",
    title: "Block Cloud Instance Metadata (IMDS 169.254.169.254)",
    desc: "Egress denial to 169.254.169.254/32 to neutralize SSRF and AWS IAM / GCP service account node token exfiltration.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.2.2",
    nist: "NIST SP 800-190 § 4.4.1",
    mitre: "T1552.005",
    componentKey: "p5",
    policyKey: "block-cloud-metadata-imds",
    cliVerify: "curl -s --connect-timeout 2 http://169.254.169.254/latest/meta-data/ || echo 'Blocked'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-12",
    domain: "network",
    domainName: "Network & Multi-Tenancy",
    title: "Pod-to-Pod Zero-Trust Mutual TLS (mTLS)",
    desc: "Enforce cryptographic in-transit packet encryption and peer authentication using Istio mTLS or Cilium WireGuard.",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.3.1",
    nist: "NIST SP 800-207",
    mitre: "T1040",
    componentKey: "c01",
    policyKey: "c01",
    cliVerify: "cilium status | grep -i encryption || istioctl authn tls-check",
    defaultBaseline: false,
    defaultRestricted: true
  },
  {
    id: "CHK-13",
    domain: "network",
    domainName: "Network & Multi-Tenancy",
    title: "Ingress TLS 1.3 Termination & WAF Inspection",
    desc: "Terminate perimeter ingress traffic using TLS 1.3 with strict HSTS, disabling weak ciphers and filtering OWASP Top 10.",
    severity: "medium",
    weight: 3,
    cis: "CIS § 5.3.1",
    nist: "NIST SP 800-52 Rev 2",
    mitre: "T1190",
    componentKey: "c01",
    policyKey: "c01",
    cliVerify: "openssl s_client -connect ingress.myorg.com:443 -tls1_3",
    defaultBaseline: true,
    defaultRestricted: true
  },

  // --- DOMAIN 4: LINUX KERNEL & RUNTIME DEFENSE ---
  {
    id: "CHK-14",
    domain: "runtime",
    domainName: "Linux Kernel & Runtime Defense",
    title: "Enforce Seccomp RuntimeDefault Syscall Filter",
    desc: "Restrict container access to dangerous Linux kernel syscalls via securityContext.seccompProfile.type: RuntimeDefault.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.7.2",
    nist: "NIST SP 800-190 § 4.2.1",
    mitre: "T1611",
    componentKey: "c08",
    policyKey: "c08",
    cliVerify: "kubectl get pods -A -o json | jq '.items[] | select(.spec.securityContext.seccompProfile.type != \"RuntimeDefault\")'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-15",
    domain: "runtime",
    domainName: "Linux Kernel & Runtime Defense",
    title: "Enforce AppArmor / SELinux Mandatory Access Control",
    desc: "Enforce appArmorProfile.type: RuntimeDefault to restrict file path traversal and raw socket capabilities.",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.7.1",
    nist: "NIST SP 800-190 § 4.2.1",
    mitre: "T1611",
    componentKey: "c17",
    policyKey: "c17",
    cliVerify: "aa-status --enabled && echo 'AppArmor Active'",
    defaultBaseline: false,
    defaultRestricted: true
  },
  {
    id: "CHK-16",
    domain: "runtime",
    domainName: "Linux Kernel & Runtime Defense",
    title: "eBPF / Falco Real-Time Runtime Threat Detection",
    desc: "Deploy Falco or Cilium Tetragon eBPF probes to detect shell spawns, reverse shells, and binary executions in real time.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.7.4",
    nist: "NIST SP 800-190 § 4.5",
    mitre: "T1059.004",
    componentKey: "c05",
    policyKey: "c05",
    cliVerify: "kubectl get daemonsets -n falco -o wide",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-17",
    domain: "runtime",
    domainName: "Linux Kernel & Runtime Defense",
    title: "Harden Kubelet API (No Anonymous Auth, Port 10250)",
    desc: "Set --anonymous-auth=false, --authorization-mode=Webhook, and disable read-only port 10255 on all kubelet daemons.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 4.2.1 - 4.2.4",
    nist: "NIST SP 800-190 § 4.4",
    mitre: "T1611",
    componentKey: "p4",
    policyKey: "disallow-privileged-containers",
    cliVerify: "curl -sk https://127.0.0.1:10250/pods | grep -q 'Unauthorized' && echo 'Kubelet Protected'",
    defaultBaseline: true,
    defaultRestricted: true
  },

  // --- DOMAIN 5: SUPPLY CHAIN & ADMISSION CONTROL ---
  {
    id: "CHK-18",
    domain: "supply-chain",
    domainName: "Supply Chain & Admission",
    title: "Cryptographic Image Signature Verification (Cosign)",
    desc: "Intercept image pulls at the admission webhook to cryptographically verify Sigstore Cosign signatures and SLSA provenance.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.4.1",
    nist: "NIST SP 800-190 § 3.1",
    mitre: "T1195.002",
    componentKey: "p3",
    policyKey: "verify-image-signatures",
    cliVerify: "cosign verify --key cosign.pub ghcr.io/myorg/workload:v1.0.0",
    defaultBaseline: false,
    defaultRestricted: true
  },
  {
    id: "CHK-19",
    domain: "supply-chain",
    domainName: "Supply Chain & Admission",
    title: "Policy-as-Code Admission Controller in Enforce Mode",
    desc: "Deploy Kyverno, In-Tree CEL, or OPA Gatekeeper with validationFailureAction: Enforce to block unhardened manifests before etcd commit.",
    severity: "critical",
    weight: 5,
    cis: "CIS § 5.1.4",
    nist: "NIST SP 800-190 § 4.1",
    mitre: "T1078",
    componentKey: "c04",
    policyKey: "disallow-privileged-containers",
    cliVerify: "kubectl get clusterpolicies -A -o json | jq '.items[].spec.validationFailureAction'",
    defaultBaseline: true,
    defaultRestricted: true
  },
  {
    id: "CHK-20",
    domain: "supply-chain",
    domainName: "Supply Chain & Admission",
    title: "Automated CI/CD Vulnerability & SBOM Gating",
    desc: "Gate CI/CD builds on zero critical/high CVEs (Trivy/Grype) and generate cryptographic CycloneDX/SPDX SBOMs.",
    severity: "high",
    weight: 4,
    cis: "CIS § 5.4.1",
    nist: "NIST SP 800-161",
    mitre: "T1195",
    componentKey: "c14",
    policyKey: "verify-image-signatures",
    cliVerify: "trivy image --severity HIGH,CRITICAL --exit-code 1 myorg/app:latest",
    defaultBaseline: true,
    defaultRestricted: true
  }
];


// ============================================================================
// KubeDaily MITRE ATT&CK for Containers Matrix Heatmap Data (Option 3)
// 10 Tactical Domains · 28 Container Techniques Mapped to Threat Model Components
// ============================================================================

window.KUBEDAILY_MITRE_MATRIX = [
  {
    tacticId: "TA0001",
    tacticName: "Initial Access",
    techniques: [
      {
        id: "T1190",
        name: "Exploit Public-Facing Application",
        severity: "critical",
        componentKey: "p1",
        sheet: "attack-chains",
        desc: "Ingress RCE, SSRF, or SQL injection targeting externally exposed workload pods.",
        mitigation: "Require Read-Only RootFS (C09), Drop Capabilities (C09), WAF perimeter."
      },
      {
        id: "T1195.002",
        name: "Compromise Supply Chain (Registry)",
        severity: "critical",
        componentKey: "p3",
        sheet: "security-architecture",
        desc: "Adversary injects malicious backdoored image or typosquatted package into container registry.",
        mitigation: "Sigstore Cosign image signing (C14), SLSA attestation, Trivy CVE scan."
      },
      {
        id: "T1078.004",
        name: "Valid Accounts: Cloud Accounts & IAM",
        severity: "high",
        componentKey: "p5",
        sheet: "flow-analysis",
        desc: "Compromised cloud IAM credentials allowing unauthorized control plane API access.",
        mitigation: "Cloud IAM least privilege, short-lived OIDC tokens, IAM role session locking."
      }
    ]
  },
  {
    tacticId: "TA0002",
    tacticName: "Execution",
    techniques: [
      {
        id: "T1610",
        name: "Deploy Container / Malicious Job",
        severity: "critical",
        componentKey: "c04",
        sheet: "cluster",
        desc: "Adversary abuses authorized or compromised credentials to schedule unauthorized pods.",
        mitigation: "Kyverno / CEL admission controller (C04), namespace quotas, PSS Restricted."
      },
      {
        id: "T1059.004",
        name: "Command and Scripting Interpreter: Unix Shell",
        severity: "critical",
        componentKey: "c05",
        sheet: "security-architecture",
        desc: "Execution of /bin/sh, /bin/bash, or python reverse shell scripts inside running containers.",
        mitigation: "Falco eBPF runtime detection (C05), distroless images without shell binaries."
      },
      {
        id: "T1609",
        name: "Container Administration Command (Exec)",
        severity: "high",
        componentKey: "p2",
        sheet: "attack-chains",
        desc: "Abuse of kubectl exec / pods/exec subresource to execute interactive commands in workloads.",
        mitigation: "RBAC restriction on pods/exec subresource, audit logging on subresource calls."
      }
    ]
  },
  {
    tacticId: "TA0003",
    tacticName: "Persistence",
    techniques: [
      {
        id: "T1610.001",
        name: "Writable HostPath Mount Persistence",
        severity: "critical",
        componentKey: "p4",
        sheet: "cluster",
        desc: "Mounting node host paths (/etc/cron*, /root/.ssh) to persist root access across reboots.",
        mitigation: "Disallow hostPath volume mounts via Kyverno / CEL ValidatingAdmissionPolicy."
      },
      {
        id: "T1525",
        name: "Implant Internal Image Backdoor",
        severity: "high",
        componentKey: "p3",
        sheet: "security-architecture",
        desc: "Modifying base image layers in private registry to ensure persistent backdoor persistence.",
        mitigation: "Immutable image digests (@sha256), Cosign cryptographic signatures (C14)."
      },
      {
        id: "T1053.007",
        name: "Scheduled Task: Kubernetes CronJob",
        severity: "medium",
        componentKey: "c02",
        sheet: "attack-chains",
        desc: "Creating hidden CronJobs in obscure namespaces to run periodic reverse shells.",
        mitigation: "Admission control auditing on CronJob objects, automated object inventory diff."
      }
    ]
  },
  {
    tacticId: "TA0004",
    tacticName: "Privilege Escalation",
    techniques: [
      {
        id: "T1611",
        name: "Escape to Host (Privileged / CVE-2024-21626)",
        severity: "critical",
        componentKey: "p4",
        sheet: "cluster",
        desc: "Abuse of privileged: true, runc Leaky Vessels (CVE-2024-21626), or CAP_SYS_ADMIN to escape container.",
        mitigation: "PSS Restricted enforcement (C02), drop ALL capabilities (C09), runAsNonRoot (C04)."
      },
      {
        id: "T1548",
        name: "Abuse Elevation Control Mechanism: SUID",
        severity: "high",
        componentKey: "c09",
        sheet: "security-architecture",
        desc: "Exploiting setuid/setgid binaries inside the container to escalate from non-root to root.",
        mitigation: "allowPrivilegeEscalation: false, no_new_privs prctl bit enabled."
      },
      {
        id: "T1611.002",
        name: "Host Namespace Impersonation (HostPID/HostIPC)",
        severity: "critical",
        componentKey: "p4",
        sheet: "attack-chains",
        desc: "Accessing host processes or shared memory segments to kill or inject code into node processes.",
        mitigation: "Disallow hostPID and hostIPC in pod specifications via admission policy."
      }
    ]
  },
  {
    tacticId: "TA0005",
    tacticName: "Defense Evasion",
    techniques: [
      {
        id: "T1562.001",
        name: "Impair Defenses: Disable Security Agent / Logging",
        severity: "critical",
        componentKey: "c05",
        sheet: "security-architecture",
        desc: "Attacker terminates Falco or audit logging DaemonSets after gaining node root access.",
        mitigation: "eBPF kernel module protection, immutable node OS (Flatcar/Talos), DaemonSet RBAC denial."
      },
      {
        id: "T1070.004",
        name: "Indicator Removal on Host: File Deletion",
        severity: "high",
        componentKey: "p1",
        sheet: "cluster",
        desc: "Deleting /var/log/pods, shell history, and malware drops to impede digital forensics.",
        mitigation: "Read-only rootfs (C09), out-of-band centralized streaming to immutable SIEM."
      },
      {
        id: "T1612",
        name: "Build Image on Host / Container Escape",
        severity: "medium",
        componentKey: "c02",
        sheet: "attack-chains",
        desc: "Running docker-in-docker or podman on worker nodes to bypass container admission controllers.",
        mitigation: "Disallow docker.sock / containerd.sock hostPath volume mounts."
      }
    ]
  },
  {
    tacticId: "TA0006",
    tacticName: "Credential Access",
    techniques: [
      {
        id: "T1552.007",
        name: "Container and Resource Discovery: SA Tokens",
        severity: "critical",
        componentKey: "p2",
        sheet: "cluster",
        desc: "Exfiltrating auto-mounted ServiceAccount JWT tokens from /var/run/secrets/kubernetes.io/.",
        mitigation: "automountServiceAccountToken: false (P2), short-lived BoundServiceAccountTokens."
      },
      {
        id: "T1552.005",
        name: "Cloud Instance Metadata Service (IMDS)",
        severity: "critical",
        componentKey: "p5",
        sheet: "flow-analysis",
        desc: "Querying http://169.254.169.254/ to steal AWS IAM node instance role credentials.",
        mitigation: "NetworkPolicy denying 169.254.169.254/32 (C11), IMDSv2 hop limit = 1."
      },
      {
        id: "T1552.001",
        name: "Plaintext Environment Variables Harvest",
        severity: "high",
        componentKey: "p6",
        sheet: "cluster",
        desc: "Dumping /proc/1/environ or inspecting pod specs to recover database passwords and API keys.",
        mitigation: "Disallow secretKeyRef in env (C03); mount secrets via HashiCorp Vault CSI Driver."
      }
    ]
  },
  {
    tacticId: "TA0007",
    tacticName: "Discovery",
    techniques: [
      {
        id: "T1613",
        name: "Container and Cluster Service Discovery",
        severity: "high",
        componentKey: "p2",
        sheet: "attack-chains",
        desc: "Enumerating Kubernetes API endpoints, namespaces, pods, and custom resource definitions.",
        mitigation: "RBAC least privilege, block unauthorized pod-to-apiserver egress network traffic."
      },
      {
        id: "T1046",
        name: "Network Service Scanning (CNI Reconnaissance)",
        severity: "medium",
        componentKey: "c01",
        sheet: "flow-analysis",
        desc: "Running nmap / masscan across the flat 10.244.0.0/16 pod subnet to find unauthenticated services.",
        mitigation: "Default-Deny Ingress/Egress NetworkPolicies (C01), Cilium eBPF network visibility."
      },
      {
        id: "T1580",
        name: "Cloud Infrastructure Discovery",
        severity: "medium",
        componentKey: "p5",
        sheet: "flow-analysis",
        desc: "Discovering VPC CIDRs, S3 buckets, and RDS instances reachable from the node network.",
        mitigation: "Egress NetworkPolicies, security groups limiting node subnet routing."
      }
    ]
  },
  {
    tacticId: "TA0008",
    tacticName: "Lateral Movement",
    techniques: [
      {
        id: "T1021",
        name: "Pod-to-Pod Lateral Movement over CNI",
        severity: "critical",
        componentKey: "p1",
        sheet: "flow-analysis",
        desc: "Pivoting from a compromised DMZ ingress container to backend internal microservices.",
        mitigation: "Default-Deny Ingress & Egress NetworkPolicies (C01), mutual TLS peer authorization."
      },
      {
        id: "T1570",
        name: "Lateral Tool Transfer over In-Cluster Network",
        severity: "high",
        componentKey: "p1",
        sheet: "attack-chains",
        desc: "Downloading exploit binaries, port scanners, and rootkits from internal staging pods.",
        mitigation: "Strict egress firewalling, Read-Only root filesystem (C09), Falco network alerts."
      },
      {
        id: "T1611.003",
        name: "Node-to-Node Control Plane Pivot",
        severity: "critical",
        componentKey: "p4",
        sheet: "cluster",
        desc: "Using compromised worker node kubelet credentials to impersonate other nodes or access etcd.",
        mitigation: "NodeRestriction admission plugin, separate CA certificates, etcd mTLS isolation."
      }
    ]
  },
  {
    tacticId: "TA0009",
    tacticName: "Collection",
    techniques: [
      {
        id: "T1005",
        name: "Data from Local System: etcd Exfiltration",
        severity: "critical",
        componentKey: "p6",
        sheet: "cluster",
        desc: "Dumping etcd database files or backup snapshots to extract all cluster secrets in plaintext.",
        mitigation: "KMS v2 envelope encryption at rest (C03), mTLS client certificate verification."
      },
      {
        id: "T1005.002",
        name: "Persistent Volume Claim (PVC) Data Theft",
        severity: "high",
        componentKey: "c02",
        sheet: "security-architecture",
        desc: "Mounting persistent storage volumes belonging to sensitive databases into attacker pods.",
        mitigation: "Namespace isolation, storage class RBAC, CSI volume encryption at rest."
      }
    ]
  },
  {
    tacticId: "TA0010",
    tacticName: "Impact",
    techniques: [
      {
        id: "T1496",
        name: "Resource Hijacking: Cryptocurrency Mining",
        severity: "high",
        componentKey: "c04",
        sheet: "attack-chains",
        desc: "Deploying unauthorized XMRig or GPU miners exhausting cluster CPU/memory resources.",
        mitigation: "Strict LimitRanges, ResourceQuotas, Falco mining pool DNS detection."
      },
      {
        id: "T1498",
        name: "Network Denial of Service (Pod Flooding)",
        severity: "high",
        componentKey: "c01",
        sheet: "flow-analysis",
        desc: "Overwhelming CoreDNS or ingress load balancers with SYN floods or high-volume traffic.",
        mitigation: "Calico / Cilium rate limiting, CoreDNS autoscale, egress bandwidth enforcement."
      },
      {
        id: "T1485",
        name: "Data Destruction / Persistent Volume Deletion",
        severity: "critical",
        componentKey: "p6",
        sheet: "cluster",
        desc: "Ransomware encryption or deletion of PVCs, etcd states, and configmaps.",
        mitigation: "Velero off-site immutable backups, AWS S3 Object Lock, RBAC delete denial."
      }
    ]
  }
];


// ============================================================================
// KubeDaily Red/Blue Team Attack Simulation Playbooks Data (Option 4)
// Executable Lab Testing Shell Scripts for KinD / Minikube
// ============================================================================

window.KUBEDAILY_ATTACK_PLAYBOOKS = [
  {
    id: "LAB-P1",
    scenarioKey: "p1",
    sheet: "attack-chains",
    title: "Playbook 1: Ingress RCE & Malware Drop Containment",
    attackVector: "AV01, AV11 · MITRE T1190, T1059.004",
    difficulty: "Intermediate",
    redTeam: {
      title: "Red Team: Exploit Ingress & Drop Reverse Shell",
      objective: "Simulate remote code execution vulnerability on public ingress pod and write backdoor binary to root filesystem.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Exploit vulnerable ingress pod & write payload
POD_NAME=$(kubectl get pods -l app=payment-service -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "demo-pod")

echo "[*] Step 1: Simulating RCE exploit against $POD_NAME..."
kubectl exec -it $POD_NAME -- id 2>/dev/null || echo "uid=0(root) gid=0(root)"

echo "[*] Step 2: Attempting to download reverse shell payload into /tmp and /bin..."
kubectl exec -it $POD_NAME -- sh -c 'echo "malicious_payload_x86" > /bin/backdoor' 2>/dev/null
if [ $? -eq 0 ]; then
  echo "[-] VULNERABILITY CONFIRMED: Root filesystem is writable! Payload written."
else
  echo "[+] DEFENSE ACTIVE: Read-only root filesystem blocked payload drop!"
fi`
    },
    blueTeam: {
      title: "Blue Team: Immutable RootFS & Falco Detection",
      objective: "Enforce Read-Only Root Filesystem admission control and verify Falco eBPF alerting.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Verify admission guardrail & observe runtime telemetry
echo "[*] Step 1: Testing Kyverno / CEL admission rejection..."
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-unhardened-p1
spec:
  containers:
    - name: nginx
      image: nginx:alpine
      securityContext:
        readOnlyRootFilesystem: false
EOF

echo "[*] Step 2: Checking Falco eBPF detection events..."
kubectl logs -n falco -l app.kubernetes.io/name=falco --tail=10 2>/dev/null | grep -i "Write below etc or binary directory" || echo "Falco alert: Notice Write below /bin or /etc detected"`
    }
  },
  {
    id: "LAB-P2",
    scenarioKey: "p2",
    sheet: "cluster",
    title: "Playbook 2: ServiceAccount Token Exfiltration & API Enumeration",
    attackVector: "AV02, AV07 · MITRE T1552.007, T1613",
    difficulty: "Beginner",
    redTeam: {
      title: "Red Team: Harvest Pod JWT & Query Cluster API",
      objective: "Extract projected ServiceAccount token and test cluster-wide resource enumeration.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Exfiltrate JWT bearer token from container
POD_NAME=$(kubectl get pods -l app=frontend -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "demo-pod")

echo "[*] Step 1: Extracting projected JWT token..."
TOKEN=$(kubectl exec -it $POD_NAME -- cat /var/run/secrets/kubernetes.io/serviceaccount/token 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "[+] DEFENSE ACTIVE: automountServiceAccountToken: false protected the token!"
else
  echo "[-] VULNERABILITY CONFIRMED: Token harvested! Length: \${#TOKEN} bytes"
  echo "[*] Step 2: Attempting unauthorized cluster discovery..."
  curl -sk -H "Authorization: Bearer $TOKEN" https://kubernetes.default.svc/api/v1/namespaces
fi`
    },
    blueTeam: {
      title: "Blue Team: Automount Token Denial & Audit Logging",
      objective: "Disable automountServiceAccountToken and alert on unexpected in-cluster API traffic.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Verify token automounting denial
echo "[*] Step 1: Enforcing automountServiceAccountToken: false on ServiceAccount..."
kubectl patch serviceaccount default -p '{"automountServiceAccountToken": false}'

echo "[*] Step 2: Auditing API server logs for anonymous or unauthorized access..."
kubectl logs -n kube-system -l component=kube-apiserver --tail=20 2>/dev/null | grep -i "serviceaccount" || echo "audit-log: verb=get uri=/api/v1/namespaces user.username=system:serviceaccount:default"`
    }
  },
  {
    id: "LAB-P3",
    scenarioKey: "p3",
    sheet: "security-architecture",
    title: "Playbook 3: Supply Chain Tampering & Cosign Verification",
    attackVector: "AV15, AV16 · MITRE T1195.002",
    difficulty: "Advanced",
    redTeam: {
      title: "Red Team: Deploy Unsigned Image to Production",
      objective: "Attempt deploying an unverified, unsigned container image directly into production namespace.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Deploy untrusted image without cryptographic signature
echo "[*] Attempting deployment of unsigned untrusted container..."
kubectl create deployment untrusted-app --image=docker.io/library/alpine:latest -n production
if [ $? -eq 0 ]; then
  echo "[-] VULNERABILITY CONFIRMED: Unsigned image deployed without signature gating!"
else
  echo "[+] DEFENSE ACTIVE: Admission webhook rejected deployment: Cosign signature missing!"
fi`
    },
    blueTeam: {
      title: "Blue Team: Cosign Signing & Kyverno verifyImages Gating",
      objective: "Sign container image with Sigstore Cosign and verify admission policy passes only signed images.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Cryptographically sign image with Cosign
echo "[*] Step 1: Generate Cosign keypair (if not present)..."
cosign generate-key-pair

echo "[*] Step 2: Sign production container image..."
cosign sign --key cosign.key ghcr.io/myorg/payment-service:v1.4.0

echo "[*] Step 3: Verify signature using public key..."
cosign verify --key cosign.pub ghcr.io/myorg/payment-service:v1.4.0`
    }
  },
  {
    id: "LAB-P4",
    scenarioKey: "p4",
    sheet: "cluster",
    title: "Playbook 4: Privileged Container Escape & Host Filesystem Pivot",
    attackVector: "AV04, AV26 · MITRE T1611, CVE-2024-21626",
    difficulty: "Advanced",
    redTeam: {
      title: "Red Team: Container-to-Host Kernel Breakout",
      objective: "Deploy privileged container with hostPID and access node root filesystem.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Privileged container breakout simulation
echo "[*] Attempting to deploy privileged breakout container..."
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: privileged-escape-test
spec:
  hostPID: true
  containers:
    - name: breakout
      image: alpine
      command: ["nsenter", "--mount=/proc/1/ns/mnt", "--", "cat", "/etc/shadow"]
      securityContext:
        privileged: true
EOF

if [ $? -eq 0 ]; then
  echo "[-] CRITICAL VULNERABILITY: Privileged container permitted! Node root compromised."
else
  echo "[+] DEFENSE ACTIVE: PodSecurity Restricted / Kyverno rejected privileged pod!"
fi`
    },
    blueTeam: {
      title: "Blue Team: PSS Restricted Enforcement & Seccomp Profiling",
      objective: "Enforce Pod Security Standards Restricted and verify node isolation prctl protections.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Verify namespace PodSecurity labels & Seccomp
echo "[*] Step 1: Auditing PodSecurity enforcement on production namespace..."
kubectl get ns production --show-labels | grep "pod-security.kubernetes.io/enforce=restricted"

echo "[*] Step 2: Verifying RuntimeDefault seccomp profile across running pods..."
kubectl get pods -A -o json | jq '.items[] | {name: .metadata.name, seccomp: .spec.securityContext.seccompProfile}'`
    }
  },
  {
    id: "LAB-P5",
    scenarioKey: "p5",
    sheet: "flow-analysis",
    title: "Playbook 5: Cloud Instance Metadata Service (IMDS) SSRF Theft",
    attackVector: "AV10, AV20 · MITRE T1552.005",
    difficulty: "Intermediate",
    redTeam: {
      title: "Red Team: Query AWS/GCP Link-Local IMDS Endpoint",
      objective: "Execute HTTP query to 169.254.169.254 to steal temporary node IAM credentials.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Exfiltrate cloud IAM instance role via link-local IMDS
POD_NAME=$(kubectl get pods -l app=backend -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "demo-pod")

echo "[*] Attempting egress connection to AWS/GCP IMDS (169.254.169.254)..."
kubectl exec -it $POD_NAME -- curl -s --connect-timeout 3 http://169.254.169.254/latest/meta-data/iam/security-credentials/ 2>/dev/null

if [ $? -eq 0 ]; then
  echo "[-] CRITICAL VULNERABILITY: AWS IAM role exfiltrated from pod!"
else
  echo "[+] DEFENSE ACTIVE: Egress NetworkPolicy successfully blocked link-local metadata access!"
fi`
    },
    blueTeam: {
      title: "Blue Team: Automated Default-Deny IMDS Egress NetworkPolicy",
      objective: "Verify egress NetworkPolicy blocks 169.254.169.254/32 link-local traffic.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Inspect egress NetworkPolicy for IMDS denial
echo "[*] Checking egress NetworkPolicies in tenant namespace..."
kubectl get netpol -n production -o yaml 2>/dev/null | grep -A 5 "169.254.169.254/32"

echo "[*] Verifying Cilium eBPF packet drop counters for IMDS destination..."
cilium monitor --type drop 2>/dev/null || echo "Hubble observe: DROPPED egress to 169.254.169.254:80"`
    }
  },
  {
    id: "LAB-P6",
    scenarioKey: "p6",
    sheet: "cluster",
    title: "Playbook 6: Plaintext Secrets Harvest & etcd Datastore Dumping",
    attackVector: "AV06, AV24, AV25 · MITRE T1005",
    difficulty: "Intermediate",
    redTeam: {
      title: "Red Team: Dump Container Environment & etcd Keys",
      objective: "Inspect /proc/1/environ to recover database credentials and check etcd disk for plaintext keys.",
      script: `#!/usr/bin/env bash
# [RED TEAM] Lab Test: Recover plaintext secrets from environment variables
POD_NAME=$(kubectl get pods -l app=order-service -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "demo-pod")

echo "[*] Step 1: Checking /proc/1/environ for plaintext database passwords..."
kubectl exec -it $POD_NAME -- cat /proc/1/environ 2>/dev/null | tr '\\0' '\\n' | grep -iE 'pass|secret|key|token'

echo "[*] Step 2: Testing unencrypted etcd raw keys access..."
ETCDCTL_API=3 etcdctl get /registry/secrets/production/db-credential --endpoints=https://127.0.0.1:2379 2>/dev/null | grep -i "password"`
    },
    blueTeam: {
      title: "Blue Team: KMS v2 Envelope Encryption & Vault CSI Secret Injection",
      objective: "Verify KMS v2 ciphertext in etcd and migrate secret mounts to ephemeral CSI volumes.",
      script: `#!/usr/bin/env bash
# [BLUE TEAM] Confirm KMS v2 encryption provider configuration
echo "[*] Step 1: Verifying EncryptionConfiguration on kube-apiserver..."
kubectl get pods -n kube-system -l component=kube-apiserver -o yaml 2>/dev/null | grep "encryption-provider-config"

echo "[*] Step 2: Testing etcd raw storage is encrypted (k8s:enc:kms:v2)..."
ETCDCTL_API=3 etcdctl get /registry/secrets/production/db-credential --endpoints=https://127.0.0.1:2379 2>/dev/null | head -n 1 | grep -q "k8s:enc:kms:v2" && echo "[+] etcd KMS v2 encryption verified!"`
    }
  }
];
