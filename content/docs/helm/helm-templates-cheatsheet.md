---
title: "50 Helm Template Cheatsheets"
weight: 7
---


### Basic Template Functions:

1. **Access a Value from `values.yaml`**:
   ```yaml
   replicas: {{ .Values.replicaCount }}
   ```

2. **Access Release Information**:
   ```yaml
   releaseName: {{ .Release.Name }}
   releaseNamespace: {{ .Release.Namespace }}
   ```

3. **Access Chart Information**:
   ```yaml
   chartName: {{ .Chart.Name }}
   chartVersion: {{ .Chart.Version }}
   ```

4. **Port Configuration**:
   ```yaml
   containerPort: {{ .Values.containerPort }}
   ```

### Conditional Blocks:

5. **Conditional Rendering**:
   ```yaml
   {{- if .Values.enableFeature }}
   featureEnabled: true
   {{- end }}
   ```

6. **Conditional Rendering with Else Block**:
   ```yaml
   {{- if .Values.enableFeature }}
   featureEnabled: true
   {{- else }}
   featureEnabled: false
   {{- end }}
   ```

### Loops:

7. **Loop Over a List**:
   ```yaml
   {{- range .Values.ingress.hosts }}
   - host: {{ . }}
   {{- end }}
   ```

8. **Loop Over a Map**:
   ```yaml
   {{- range $key, $value := .Values.labels }}
   {{ $key }}: {{ $value }}
   {{- end }}
   ```

### Accessing Values:

9. **Access Nested Values**:
    ```yaml
    username: {{ .Values.database.credentials.username }}
    ```

10. **Quoting a Value**:
    ```yaml
    message: {{ .Values.message | quote }}
    ```

### Including Partial Templates:

11. **Include a Partial Template**:
    ```yaml
    {{- include "partials.common" . | indent 2 }}
    ```

### Template Functions:

12. **Convert to YAML**:
    ```yaml
    {{- toYaml .Values.config | nindent 4 }}
    ```

13. **Convert to JSON**:
    ```yaml
    jsonData: {{ toJson .Values.data }}
    ```

14. **Using Sprig Functions**:
    ```yaml
    password: {{ randAlphaNum 10 | quote }}
    ```

### Helm Hook Templates:

15. **Pre-install Hook**:
    ```yaml
    {{- if .Values.preInstallJob }}
    # pre-install job definition
    {{- end }}
    ```

16. **Post-install Hook**:
    ```yaml
    {{- if .Values.postInstallJob }}
    # post-install job definition
    {{- end }}
    ```

### Advanced Examples:

17. **Creating a Kubernetes Secret**:
    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: {{ .Release.Name }}-secret
    type: Opaque
    data:
      password: {{ .Values.secret.password | b64enc }}
    ```

18. **Creating a Service**:
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: {{ include "mychart.fullname" . }}
    ```

19. **Defining a ConfigMap**:
    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: {{ include "mychart.fullname" . }}
    data:
      config.yaml: |
        {{ .Files.Get "config.yaml" | indent 4 }}
    ```

20. **Creating an Ingress**:
    ```yaml
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: {{ include "mychart.fullname" . }}
    spec:
      rules:
        - host: {{ .Values.ingress.host }}
    ```

21. **Defining a PersistentVolumeClaim**:
    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: {{ include "mychart.fullname" . }}-data
    ```

22. **Setting Resource Limits**:
    ```yaml
    resources:
      limits:
        cpu: {{ .Values.resources.cpu | quote }}
        memory: {{ .Values.resources.memory | quote }}
    ```

23. **Creating a Job**:
    ```yaml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: {{ .Release.Name }}-job
    spec:
      template:
        spec:
          containers:
          - name: {{ .Chart.Name }}-job
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            command: ["{{ .Values.command }}"]
    ```

24. **Creating a CronJob**:
    ```yaml
    apiVersion: batch/v1beta1
    kind: CronJob
    metadata:
      name: {{ .Release.Name }}-cronjob
    spec:
      schedule: "*/1 * * * *"
      jobTemplate:
        spec:
          template:
            spec:
              containers:
              - name: {{ .Chart.Name }}-cronjob
                image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
                command: ["{{ .Values.command }}"]
    ```

25. **Creating a StatefulSet**:
    ```yaml
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: {{ .Release.Name }}-statefulset
    ```

26. **Creating a Deployment with Liveness and Readiness Probes**:
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: {{ .Release.Name }}-deployment
    spec:
      template:
        spec:
          containers:
          - name: {{ .Chart.Name }}-container
            image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
            livenessProbe:
              httpGet:
                path: /healthz
                port: 80
              initialDelaySeconds: 30
            readinessProbe:
              httpGet:
                path: /readyz
                port: 80
              initialDelaySeconds: 5
    ```

27. **Creating a Horizontal Pod Autoscaler (HPA)**:
    ```yaml
    apiVersion: autoscaling/v2beta2
    kind: HorizontalPodAutoscaler
    metadata:
      name: {{ .Release.Name }}-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: {{ .Release.Name }}-deployment
      minReplicas: 1
      maxReplicas: 10
      metrics:
      - type: Resource
        resource:
          name: cpu
          targetAverageUtilization: 50
    ```

Certainly! Here are some more examples of Helm chart template functionalities:

### Accessing Values:

28. **Accessing Values from Dependencies**:
    ```yaml
    dependencyValue: {{ .Values.dependencies.subchart.value }}
    ```

29. **Accessing Values with Default**:
    ```yaml
    port: {{ .Values.port | default 8080 }}
    ```

### Advanced Conditional Blocks:

30. **Conditional Block with Nested Conditions**:
    ```yaml
    {{- if and .Values.condition1 .Values.condition2 }}
    # Block content
    {{- end }}
    ```

31. **Conditional Block with OR Operator**:
    ```yaml
    {{- if or .Values.condition1 .Values.condition2 }}
    # Block content
    {{- end }}
    ```

### Advanced Loops:

32. **Loop with Index**:
    ```yaml
    {{- range $index, $element := .Values.list }}
    - index: {{ $index }}, value: {{ $element }}
    {{- end }}
    ```

33. **Loop with Sorting**:
    ```yaml
    {{- range sort .Values.list }}
    - value: {{ . }}
    {{- end }}
    ```

### Advanced Template Functions:

34. **Using `tpl` Function for Advanced Template Rendering**:
    ```yaml
    renderedTemplate: {{ tpl (.Files.Get "template.yaml") . | indent 4 }}
    ```

35. **Using `include` with Dynamic Name**:
    ```yaml
    {{- include (printf "%s-config" .Values.serviceName) . | indent 2 }}
    ```

### External Template Files:

36. **Including External Template File**:
    ```yaml
    {{- include "external-template.tpl" . | indent 2 }}
    ```

### Debugging:

37. **Printing Values for Debugging**:
    ```yaml
    {{- printf "%#v" .Values | nindent 2 }}
    ```

### Naming Conventions:

38. **Using Release Name and Chart Name for Naming Resources**:
    ```yaml
    metadata:
      name: {{ .Release.Name }}-{{ .Chart.Name }}
    ```

### Comments:

39. **Adding Comments in Templates**:
    ```yaml
    # This is a comment
    ```

### External Resources:

40. **Mounting External Files as ConfigMaps**:
    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: my-configmap
    data:
      {{ .Files.Get "config-file.yaml" | indent 2 }}
    ```

### Combining Functions:

41. **Combining Functions for Complex Operations**:
    ```yaml
    combinedValue: {{ trimPrefix "prefix-" (upper .Values.value) }}
    ```

### Advanced StatefulSet Configuration:

42. **StatefulSet with Persistent Volume Claim**:
    ```yaml
    volumeClaimTemplates:
      - metadata:
          name: data
        spec:
          accessModes: [ "ReadWriteOnce" ]
          resources:
            requests:
              storage: 1Gi
    ```

### External Secrets:

43. **Referencing External Secrets**:
    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: my-secret
      annotations:
        "helm.sh/resource-policy": keep
    type: Opaque
    data:
      password: {{ .Values.externalSecret.password | b64enc }}
    ```

### Helm Release Specifics:

44. **Accessing Release Timestamp**:
    ```yaml
    releaseDate: {{ .Release.Timestamp }}
    ```

### Debugging with `printf`:

45. **Debugging with `printf`**:
    ```yaml
    {{ printf "%#v" .Values | nindent 2 }}
    ```

### Using `quote` and `unquote` Functions:

46. **Quoting and Unquoting Values**:
    ```yaml
    quotedValue: {{ .Values.someValue | quote }}
    unquotedValue: {{ .Values.quotedValue | unquote }}
    ```

### Advanced Resource Definitions:

47. **Advanced Pod Annotations**:
    ```yaml
    annotations:
      myAnnotation: {{ .Values.annotations.myAnnotation | quote }}
    ```

### Configurable Labels:

48. **Configurable Labels**:
    ```yaml
    labels:
      myLabel: {{ .Values.labels.myLabel | quote }}
    ```

### Conditional Pod Disruption Budget:

49. **Conditional Pod Disruption Budget**:
    ```yaml
    {{- if .Values.enablePodDisruptionBudget }}
    apiVersion: policy/v1beta1
    kind: PodDisruptionBudget
    metadata:
      name: {{ include "mychart.fullname" . }}
    spec:
      # PDB specification
    {{- end }}
    ```

### Helm Template Debugging:

50. **Template Debugging with `required` Function**:
    ```yaml
    requiredValue: {{ required "Value is required" .Values.requiredValue }}
    ```

