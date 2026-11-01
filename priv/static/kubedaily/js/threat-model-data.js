// Kubernetes Threat Model & Architecture Catalog Data
// Structured reference mapping for Threat Actors (TA), Objects (TO), Vectors (AV), Controls (C), and Attack Paths (P1-P6)

window.KUBEDAILY_THREAT_MODEL_DATA = {
  // Pre-packaged presentation views (identical to kubesec-diagram's views.js)
  views: {
    "overview": {
      title: "Cluster Overview",
      sheet: "cluster",
      description: "Complete component-level architectural map with all trust boundaries, control plane services, worker nodes, and threat actors.",
      camera: { zoom: 1.0, x: 0, y: 0 }
    },
    "control-plane": {
      title: "Control Plane (CP)",
      sheet: "cluster",
      description: "High-trust services boundary: kube-apiserver, kube-scheduler, kube-controller-manager, and cloud-controller-manager.",
      camera: { zoom: 1.6, x: -1250, y: -200 },
      highlight: ["ClusterControlPlane", "kube-apiserver", "kube-controller-manager", "kube-scheduler"]
    },
    "datastore-etcd": {
      title: "Datastore & KMS (CPD)",
      sheet: "cluster",
      description: "ClusterControlPlaneData: etcd distributed key-value store, KMS envelope encryption keys, and backup storage.",
      camera: { zoom: 1.8, x: -1600, y: -200 },
      highlight: ["ClusterControlPlaneData", "etcd", "KMS"]
    },
    "data-plane": {
      title: "Worker Nodes & Data Plane (DP)",
      sheet: "cluster",
      description: "Worker nodes hosting kubelet, kube-proxy, container runtimes (containerd/CRI-O), CNI plugins, and untrusted workloads.",
      camera: { zoom: 1.4, x: -1200, y: -650 },
      highlight: ["ClusterDataPlane", "kubelet", "kube-proxy", "containerd"]
    },
    "threat-actors": {
      title: "Threat Actors (TA01–TA07)",
      sheet: "cluster",
      description: "Adversary catalog spanning external internet actors, malicious insiders, compromised workloads, supply-chain adversaries, and cloud operators.",
      camera: { zoom: 1.5, x: -10, y: -80 },
      highlight: ["TA01", "TA02", "TA03", "TA04", "TA05", "TA06", "TA07"]
    },
    "p1-ingress": {
      title: "P1 · Ingress to Pod Takeover",
      sheet: "attack-chains",
      description: "External attacker exploits vulnerable public ingress application (RCE/SSRF) to execute arbitrary commands inside a container.",
      camera: { zoom: 1.4, x: -10, y: -80 },
      highlight: ["P1"]
    },
    "p2-token-abuse": {
      title: "P2 · Token Abuse & API Pivot",
      sheet: "attack-chains",
      description: "Attacker harvests mounted service account token (automountServiceAccountToken: true) to query the API server and escalate privileges.",
      camera: { zoom: 1.4, x: -10, y: -500 },
      highlight: ["P2"]
    },
    "p3-supply-chain": {
      title: "P3 · Supply Chain Poisoning",
      sheet: "attack-chains",
      description: "Compromised CI/CD pipeline or registry credentials inject malicious backdoor into container image deployed to production.",
      camera: { zoom: 1.4, x: -10, y: -950 },
      highlight: ["P3"]
    },
    "p4-container-escape": {
      title: "P4 · Pod Breakout to Node Root",
      sheet: "attack-chains",
      description: "Exploiting container runtime vulnerabilities, kernel flaws, or overprivileged flags (privileged: true, hostPID, SYS_ADMIN) to break out to the host OS.",
      camera: { zoom: 1.4, x: -1050, y: -80 },
      highlight: ["P4"]
    },
    "p5-cloud-metadata": {
      title: "P5 · Cloud Metadata IAM Pivot",
      sheet: "attack-chains",
      description: "Accessing node link-local metadata address (169.254.169.254) from within a pod to extract temporary instance IAM role credentials.",
      camera: { zoom: 1.4, x: -1050, y: -500 },
      highlight: ["P5"]
    },
    "p6-secrets-compromise": {
      title: "P6 · Datastore & Secrets Harvest",
      sheet: "attack-chains",
      description: "Extracting plaintext credentials from unencrypted etcd datastore, exposed backups, or through unauthorized Secret object listing.",
      camera: { zoom: 1.4, x: -1050, y: -950 },
      highlight: ["P6"]
    }
  },

  // Interactive component details catalog
  components: {
    "ta01": {
      id: "TA01",
      name: "External Attacker",
      category: "Threat Actor",
      origin: "Internet-Origin Adversary",
      motive: "Data exfiltration, ransomware, cryptomining, initial access",
      overview: "An unauthenticated adversary situated outside all cluster trust boundaries. Probes public internet IP addresses, exposed Ingress controllers, API servers misconfigured with anonymous authentication, and public-facing microservices with remote code execution (RCE) flaws.",
      attackVectors: ["AV01: Vulnerable public ingress application (RCE, SQLi, SSRF)", "AV02: Exposed Kubernetes API server with weak or anonymous auth", "AV05: Misconfigured Cloud LoadBalancer routing to internal debug ports"],
      yaml: `# Hardening against TA01: Default Deny Ingress NetworkPolicy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress`,
      shell: `# Audit exposed endpoints on external interfaces
kubectl get svc -A -o jsonpath='{range .items[?(@.spec.type=="LoadBalancer")]}{.metadata.namespace}/{.metadata.name}: {.status.loadBalancer.ingress[*].ip}{"\\n"}{end}'

# Test for anonymous API authentication vulnerability
curl -k -s -X GET https://<API_SERVER_IP>:6443/api/v1/namespaces/default/secrets`,
      mitre: "Initial Access (T1190 - Exploit Public-Facing Application)"
    },

    "ta02": {
      id: "TA02",
      name: "Internal Insider / Compromised Dev",
      category: "Threat Actor",
      origin: "Authorized or Compromised Employee",
      motive: "Privilege escalation, unauthorized data access, sabotage",
      overview: "An individual possessing valid cluster credentials (developer, contractor, or CI identity) whose credentials have been leaked, phished, or abused to access internal workloads and lateral namespaces beyond their intended scope.",
      attackVectors: ["AV06: Abusing wildcard (*) verbs in Role/ClusterRole bindings", "AV08: Exploiting impersonation rights (impersonate verbs on users/groups)", "AV21: Reading Secret objects across shared namespaces"],
      yaml: `# Enforce strict Least-Privilege RBAC (No wildcard permissions)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: shop
  name: shop-developer
rules:
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
# Note: NO access to secrets or rolebindings!`,
      shell: `# Audit which users have cluster-admin privileges
kubectl get clusterrolebindings -o jsonpath='{range .items[?(@.roleRef.name=="cluster-admin")]}{.metadata.name}: {.subjects[*].name}{"\\n"}{end}'

# Audit who can read secrets across the cluster
kubectl auth can-i get secrets --all-namespaces --as=jberg@fjordmart.example`,
      mitre: "Privilege Escalation (T1078 - Valid Accounts)"
    },

    "ta03": {
      id: "TA03",
      name: "Compromised Workload / Malicious Tenant",
      category: "Threat Actor",
      origin: "Untrusted Pod / Container Execution",
      motive: "Namespace breakout, container escape, host takeover",
      overview: "An attacker who has gained interactive execution inside a pod. From this foothold, they attempt to abuse mounted service account tokens, scan the internal pod network (10.244.0.0/16), contact kubelet ports (10250), or escape to the node host OS.",
      attackVectors: ["AV03: Automounted ServiceAccount token harvesting", "AV12: Linux kernel container escape (Dirty Pipe, eBPF exploit)", "AV13: Overprivileged container execution (privileged: true, hostPID)"],
      yaml: `# Hardening Workloads: Pod Security Standards Restricted Profile
apiVersion: v1
kind: Pod
metadata:
  name: hardened-app
  namespace: production
spec:
  automountServiceAccountToken: false
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
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
      shell: `# Detect mounted tokens inside running containers
kubectl get pods -A -o jsonpath='{range .items[?(@.spec.automountServiceAccountToken!=false)]}{.metadata.namespace}/{.metadata.name}{"\\n"}{end}'

# Check if runtime default seccomp is enabled
kubectl get pods -n production -o jsonpath='{.items[*].spec.securityContext.seccompProfile.type}'`,
      mitre: "Execution (T1059 - Command and Scripting Interpreter) & Escape (T1611)"
    },

    "ta04": {
      id: "TA04",
      name: "Supply Chain Adversary",
      category: "Threat Actor",
      origin: "Upstream Image, Package or CI/CD",
      motive: "Backdoor insertion, credential theft, cryptomining deployment",
      overview: "Adversaries who compromise upstream dependencies (npm, pip, cargo, base Dockerfiles) or CI/CD runner workflows. They inject malicious code before image compilation, producing signed or unsigned trojanized images that pass through build gates.",
      attackVectors: ["AV18: Unsigned container images pulled from public registries", "AV19: Poisoned CI/CD GitHub Actions runner or GitLab CI token", "AV20: Compromised Helm chart repository"],
      yaml: `# Kyverno Policy: Enforce Cosign Cryptographic Signature Verification
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signatures
spec:
  validationFailureAction: Enforce
  rules:
  - name: verify-cosign
    match:
      any:
      - resources:
          kinds: ["Pod"]
    verifyImages:
    - imageReferences: ["*"]
      attestors:
      - entries:
        - keys:
            publicKeys: |-
              -----BEGIN PUBLIC KEY-----
              MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE7...
              -----END PUBLIC KEY-----`,
      shell: `# Verify image signature with Cosign CLI
cosign verify --key cosign.pub registry.fjordmart.example/shop/app:v1.34.1

# Scan container image for critical CVEs using Trivy
trivy image --severity CRITICAL,HIGH registry.fjordmart.example/shop/app:v1.34.1`,
      mitre: "Initial Access (T1195 - Supply Chain Compromise)"
    },

    "kube-apiserver": {
      id: "TO01",
      name: "kube-apiserver",
      category: "Control Plane Service",
      origin: "ClusterControlPlane (CP)",
      motive: "Primary administrative gate and control plane API",
      overview: "The central management gateway. Exposes port 6443 over TLS. Validates and configures data for all API objects (Pods, Services, ReplicationControllers). Direct target for authentication bypass, credential abuse, DoS, and admission webhook tampering.",
      attackVectors: ["AV02: Unauthenticated or weakly authenticated API calls", "AV06: Privilege escalation via excessive RBAC permissions", "AV26: Admission webhook spoofing or timeout denial of service"],
      yaml: `# Hardened API Server Configuration Flags
# Location: /etc/kubernetes/manifests/kube-apiserver.yaml
spec:
  containers:
  - command:
    - kube-apiserver
    - --anonymous-auth=false
    - --authorization-mode=Node,RBAC
    - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
    - --audit-log-path=/var/log/kubernetes/audit.log
    - --audit-log-maxage=30
    - --audit-log-maxbackup=10
    - --audit-log-maxsize=100
    - --encryption-provider-config=/etc/kubernetes/encryption-config.yaml
    - --enable-admission-plugins=NodeRestriction,PodSecurity`,
      shell: `# Verify API Server audit logging is active and generating events
tail -f /var/log/kubernetes/audit.log | jq '{verb: .verb, user: .user.username, uri: .requestURI}'

# Verify anonymous authentication is disabled (must return HTTP 401 Unauthorized)
curl -k -s -I https://127.0.0.1:6443/api`,
      mitre: "Discovery & Execution (T1059 - Kubernetes API)"
    },

    "etcd": {
      id: "TO02",
      name: "etcd Datastore",
      category: "Datastore (CPD)",
      origin: "ClusterControlPlaneData (CPD)",
      motive: "The authoritative state datastore for the entire cluster",
      overview: "Consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data. Holds complete configuration, state, and Secret objects. Compromise of etcd grants complete, unconstrained administrative control over the entire cluster.",
      attackVectors: ["AV07: Unauthenticated direct etcd port access (2379)", "AV09: Reading plaintext Secret objects from unencrypted etcd", "AV10: Unprotected etcd snapshot backup archives"],
      yaml: `# EncryptionConfiguration for etcd Secrets at Rest (KMS v2)
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
          endpoint: unix:///var/run/kms-vault.sock
          timeout: 3s
      - identity: {}`,
      shell: `# Verify direct etcd access without client certificates is rejected
etcdctl --endpoints=https://127.0.0.1:2379 get / --prefix --keys-only
# Error: client: etcd cluster is unavailable or misconfigured; error #1: remote error: tls: bad certificate

# Check if secrets in etcd are encrypted (should show encrypted ciphertext prefix)
ETCDCTL_API=3 etcdctl --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key \\
  get /registry/secrets/production/db-credential | hexdump -C | head -n 5`,
      mitre: "Credential Access (T1552 - Unsecured Credentials in Datastore)"
    },

    "kubelet": {
      id: "TO03",
      name: "kubelet Node Agent",
      category: "Data Plane Agent",
      origin: "ClusterDataPlane (DP)",
      motive: "Primary node agent registering nodes and running pods",
      overview: "The primary agent that runs on each node. Communicates with kube-apiserver over port 10250 and directs the container runtime to pull images, run containers, and mount secret volumes. Insecure kubelet API allows unauthenticated pod execution and exec probes.",
      attackVectors: ["AV04: Unauthorized kubelet API execution (:10250/run or :10250/exec)", "AV14: Node credential theft (kubelet client certificate / token)", "AV15: Modifying foreign pod specs from a worker node"],
      yaml: `# Hardened Kubelet Configuration: /var/lib/kubelet/config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
authorization:
  mode: Webhook
readOnlyPort: 0
protectKernelDefaults: true
streamingConnectionIdleTimeout: 5m`,
      shell: `# Verify kubelet read-only port 10255 is closed
curl -s http://127.0.0.1:10255/pods
# Connection refused

# Verify anonymous access to port 10250 is rejected
curl -k -s -I https://127.0.0.1:10250/pods
# HTTP/2 401 Unauthorized`,
      mitre: "Execution (T1609 - Container Administration Command)"
    },

    "p1": {
      id: "P1",
      name: "Compromised Kubeconfig / CI Identity",
      category: "Attack Scenario",
      origin: "TA02 / TA06 (Insider or Leaked Admin Credential)",
      motive: "Full cluster administrative compromise",
      overview: "A developer laptop is compromised or a CI/CD automation token with cluster-admin rights is accidentally committed to a public Git repository. The adversary uses the stolen kubeconfig to directly manipulate cluster objects, deploy backdoors, and exfiltrate secrets.",
      attackVectors: ["AV02: Stolen long-lived cluster-admin certificates", "AV16: Compromised CI/CD pipeline deploy token", "AV28: Unauthorized ClusterRoleBinding creation"],
      yaml: `# Audit Rule: Detect unauthorized ClusterRoleBinding creations
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: RequestResponse
  resources:
  - group: "rbac.authorization.k8s.io"
    resources: ["clusterrolebindings", "rolebindings"]
  verbs: ["create", "patch", "update"]`,
      shell: `# Audit log search for high-privilege binding creation
grep 'rbac.authorization.k8s.io' /var/log/kubernetes/audit.log | \\
  jq -r 'select(.verb=="create") | "\\(.timestamp) \\(.user.username) created \\(.objectRef.name)"'`,
      mitre: "Initial Access (T1078.004) -> Persistence (T1098.002)"
    },

    "p2": {
      id: "P2",
      name: "Public App RCE to Token Abuse",
      category: "Attack Scenario",
      origin: "TA01 / TA03 (External Ingress Exploiter)",
      motive: "Lateral movement from web pod to internal cluster API",
      overview: "An external attacker sends an exploit payload to a public web service (Log4Shell, command injection, arbitrary file upload). Once inside the container, they discover the mounted service account token at /var/run/secrets/kubernetes.io/serviceaccount/token and query the API server.",
      attackVectors: ["AV01: Remote Code Execution on internet-facing pod", "AV03: Default mounted service account token harvesting", "AV09: Reading API secrets with overprivileged pod service account"],
      yaml: `# Mitigation: Disable automountServiceAccountToken on all workloads
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
  namespace: production
spec:
  template:
    spec:
      automountServiceAccountToken: false
      containers:
      - name: frontend
        image: nginx:alpine`,
      shell: `# Verify if mounted token file is accessible from within a pod
kubectl exec -it <pod-name> -n production -- ls -la /var/run/secrets/kubernetes.io/serviceaccount/
# If properly disabled: No such file or directory`,
      mitre: "Initial Access (T1190) -> Credential Access (T1552.007)"
    },

    "p4": {
      id: "P4",
      name: "Pod Breakout to Node Root (Container Escape)",
      category: "Attack Scenario",
      origin: "TA01 / TA03 (Privileged Container or Kernel Vulnerability)",
      motive: "Escape container namespaces to gain full root access on worker host",
      overview: "An attacker running code inside a container exploits dangerous flags (e.g. privileged: true, hostPID: true, hostPath mounts) or an unpatched Linux kernel vulnerability (e.g. CVE-2022-0847 Dirty Pipe) to write to host files, access the kubelet credentials, and take over the worker node.",
      attackVectors: ["AV12: Linux kernel container namespace escape", "AV13: Overprivileged container execution with SYS_ADMIN", "AV22: Dangerous hostPath volume mount (/var/run/docker.sock or /)"],
      yaml: `# Mitigation: Kyverno ClusterPolicy Disallowing Privileged Containers
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-privileged
    match:
      any:
      - resources:
          kinds: ["Pod"]
    validate:
      message: "Privileged containers are strictly forbidden!"
      pattern:
        spec:
          =(ephemeralContainers):
            - securityContext:
                privileged: "false"
          =(initContainers):
            - securityContext:
                privileged: "false"
          containers:
            - securityContext:
                privileged: "false"`,
      shell: `# Falco eBPF Rule to Detect Container Escape Attempts
# Location: /etc/falco/falco_rules.local.yaml
- rule: Container Escape via Host Mount
  desc: Detect write activity to host filesystem from container
  condition: open_write and container and fd.name startswith "/host"
  output: "CRITICAL: Container escape detected (user=%user.name file=%fd.name pod=%k8s.pod.name)"
  priority: CRITICAL`,
      mitre: "Privilege Escalation (T1611 - Escape to Host)"
    }
  }
};
