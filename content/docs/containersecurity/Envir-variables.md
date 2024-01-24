---
title: "Environment variables "
description: "Environment variables"
slug: "Environment-variables"
weight : 3
---

Environment variables
example of using an environment variable in a Dockerfile:

```
FROM alpine:latest
# Set an environment variable
ENV MY_VAR "Hello World"
# Use the environment variable in a command
RUN echo $MY_VAR > /app/output.txt
CMD ["cat", "/app/output.txt"]
```

In this example, the environment variable MY_VAR is set to the value "Hello World". This variable is then used in the RUN command to create an output.txt file with the contents "Hello World".

To build the Docker image using this Dockerfile, you can use the following command:

```
docker build -t my-image .
```

You can also set the value of the environment variable when you build the image using the `--build-arg` flag:

```
docker build -t my-image --build-arg MY_VAR=Goodbye .
```

This will set the value of MY_VAR to "Goodbye" when the image is built.

It is also a good idea to use default values for environment variables in your Dockerfile. This way, if the variable is not set when the image is built, it will use the default value. You can do this by using the ARG directive in your Dockerfile and then using the := operator to set the default value:

```
FROM alpine:latest
# Set a default value for the environment variable
ARG MY_VAR:=Hello World
# Use the environment variable in a command
RUN echo $MY_VAR > /app/output.txt
CMD ["cat", "/app/output.txt"]
```

In this example, if the value of MY_VAR is not set when the image is built, it will default to the value "Hello World".
