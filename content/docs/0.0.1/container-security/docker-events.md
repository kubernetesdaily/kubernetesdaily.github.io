---
title: "27.Docker events  "
description: "  "
weight : 27
---

# Docker events 

Docker events describe the activities taken by your Docker daemon. Most interactions with objects such as containers, images, volumes, and networks record an event, creating a log that you can use to inspect past changes.

There are many different kinds of event that identify specific changes in your environment:

- Creating and removing containers
- Container health check statuses
- Commands executed inside containers with docker exec
- Pulling and pushing images
- Creating, destroying, mounting, and unmounting volumes
- Enabling and disabling Docker daemon plugins

```
$ docker run --rm hello-world

```


Several events should now appear in the terminal window that’s running the docker events command:

```
$ docker events
2022-05-31T15:20:00.267970018+01:00 image pull hello-world:latest (name=hello-world)
2022-05-31T15:20:00.347054862+01:00 container create 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378 (image=hello-world, name=nifty_morse)
2022-05-31T15:20:00.347805277+01:00 container attach 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378 (image=hello-world, name=nifty_morse)
2022-05-31T15:20:00.621070053+01:00 container start 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378 (image=hello-world, name=nifty_morse)

```

Each event displays on its own line. The event timestamp is displayed first, followed by the type of object affected (such as image or container) and then the action that was taken (like create, attach, and start). The remainder of the message contains useful metadata about the object. The example above reveals that the hello-world:latest image was pulled and a container created from it.

Formatting Output

The raw event list is often unwieldy. You can reformat the output using the --format flag which accepts a Go template string:


```
$ docker events --format '{{ .Time }} {{ .Action }} {{ .Type}} {{ .ID }}'

```


Running this example will produce output that looks like this:


```
1654006800 pull image hello-world:latest
1654006800 create container 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378
1654006800 attach container 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378
1654006800 start container 4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378

```

You can get events represented as JSON objects by using {{ json . }} as your template string:

```
$ docker events --format '{{ json . }}' | jq
{
  "status": "create",
  "id": "4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378",
  "from": "hello-world",
  "Type": "container",
  "Action": "create",
  "Actor": {
    "ID": "4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378",
    "Attributes": {
      "image": "hello-world",
      "name": "nifty_morse"
    }
  },
  "scope": "local",
  "time": 1654006800,
  "timeNano": 1654006800347054800
}


```

## Filtering Events

```

docker events --filter type=container //Get all events that relate to containers.
docker events --filter event=create // Get container creation events.
docker events --filter container=demo-container –// Get all the events saved for the container called demo-container (you can reference the container’s ID or name).

```
Besides container, you can filter by all supported object type names such as image, network, and volume.

Multiple filters are supported when you repeat the --filter flag. Distinct filters are interpreted as logical AND conditions; multiple uses of the same filter become OR clauses. Here’s an example which surfaces the create event for both the app-container and api-container containers:

```
$ docker events \
    --filter container=app-container
    --filter container=api-container
    --filter event=create

```

## Accessing Historical Events

docker events defaults to only showing events stored since the command’s been running. You can include historical events by adding the --since flag. This accepts a human-readable time expression or an absolute timestamp:

```

$ docker events --since 1h
$ docker events --since '2022-06-01T16:00:00'
```

Events recorded after the given time will immediately be shown in your terminal. New events will continue to show up in real-time as they’re recorded.

You can exclude events after a particular time with the --until flag. It works similarly to --since. Using --until will disable real-time streaming of new events because they’d fall outside the requested timeframe.

## Streaming Docker Events From the Daemon REST API

Another way to access stored events is through the Docker daemon REST API. You can use the /events endpoint to stream events in real-time after you’ve enabled the API on your Docker host. Events will be returned in JSON format:

```
$ curl http://127.0.0.1:2375/v1.41/events
{
  "Type": "container",
  "Action": "create",
  "Actor": {
    "ID": "4a6c8d34a183363db5dbfdcc3cab4c82c4a341d719df56ec2e7f879ee8f02378",
    "Attributes": {
      "image": "hello-world",
      "name": "nifty_morse"
    }
  },
  "scope": "local",
  "time": 1654006800,
  "timeNano": 1654006800347054800
}
```

The API endpoint supports filter, since, and until parameters that have the same behaviors as their CLI counterparts. Here’s how to retrieve all container creation events recorded in the past hour:

```

$ curl http://127.0.0.1:2375/v1.41/events?since=1h&filters={'type':'container','action':'create'}


```

## Sending Events to an External Service

Docker lacks a built-in way to send events to an external service. This could be useful if you want all your container creations to be logged in an existing monitoring or auditing platform.

You can set up your own solution by creating a system service that continually runs docker events. It should send each new line of output to your external system.

First write a Bash script that implements the functionality you need:

```
#!/bin/bash
docker events --format '{{ .Time }} {{ .Action }} {{ .Type }} {{ .ID }}' | while read event
do
    curl \
        -X POST \
        -H "Content-Type: application/json" \
        -d '{"event": "$event"}' \
        https://example.com/events
done

```

Now create a new systemd service unit at `/etc/systemd/system/docker-events.service`:

```
[Unit]
Description=Custom Docker Event Monitoring Service

[Service]
Type=forking
ExecStart=/usr/local/bin/docker-events.sh

[Install]
WantedBy=multi-user.target

```

Finally reload systemd to load your service, then start and enable the unit:

```
$ sudo systemctl daemon-reload
$ sudo systemctl start docker-events
$ sudo systemctl enable docker-events

```


## Docker events commands example

Listening for Docker events

```
$ docker events
```
Listening for events since a given date
```
$ docker events --since '2015-01-28'
$ docker events --since '3m'
```
Listening for Docker events based on filter
```
$ docker events --filter 'type=container' --format 'Type={{.Type}}  Status={{.Status}}  ID={{.ID}}'
$ docker events --filter 'event=stop'
$ docker events --filter 'image=ubuntu-1:14.04'
$ docker events --filter 'container=7805c1d35632'
$ docker events --filter 'container=7805c1d35632' --filter 'container=4386fb97867d'
$ docker events --filter 'container=7805c1d35632' --filter 'event=stop'
$ docker events --filter 'type=volume'
$ docker events --filter 'type=network'
$ docker events --filter 'type=plugin' (experimental)
```
Listening for Docker events based on format
```
$ docker events --format '{{json .}}'
```