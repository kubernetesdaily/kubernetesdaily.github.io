---
title: "Attack surface of the container ecosystem "
slug: "Attack-surface-of-the-container-ecosystem"
weight : 2
---

## Container Technology Archiecture 

1. Developer systems (generate images and send them to testing and accreditation)
2. Testing and accreditation systems (validate and verify the contents of images, sign
images, and send images to the registry)
3. Registries (store images and distribute images to the orchestrator upon request)
4. Orchestrators (convert images into containers and deploy containers to hosts)
5. Hosts (run and stop containers as directed by the orchestrator)


![](./images/container-technology-arch.png)


## Attack surface of the container ecosystem

![](./images/Container-Threat-model.png)



One way to start thinking about the threat model is to consider the actors involved. These might include:

1. External attackers attempting to access a deployment from outside
2. Internal attackers who have managed to access some part of the deployment
3. Malicious internal actors such as developers and administrators who have some level of privilege to access the deployment
3. Inadvertent internal actors who may accidentally cause problems
4. Application processes that, while not sentient beings intending to compromise
your system, might have programmatic access to the system