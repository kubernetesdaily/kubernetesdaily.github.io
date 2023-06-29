---
title: " 18.Security Linting of Dockerfiles"
description: " hadolint "
weight : 18
---


# hadolint

Hadolint comes with a robust and easy to use CLI. You can install it on a variety of platforms, including macOS using `brew install hadolint`.

Confirm the installation was successful with the following command:

```

$ hadolint --help
hadolint - Dockerfile Linter written in Haskell

```
We’ll use the following Dockerfile as an example, which can be used to run a Python Django web server. On the surface, it looks fine but we’ll see it has a lot of problems.

```Dockerfile
FROM python
MAINTAINER xyx
LABEL org.website="xyz"
 
RUN mkdir app && cd app
 
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
 
COPY . .
 
CMD python manage.py runserver 0.0.0.0:80000


```

Let’s run it through Hadolint:

```bsh

$ hadolint Dockerfile
Dockerfile:1 DL3006 warning: Always tag the version of an image explicitly
Dockerfile:1 DL3049 info: Label `maintainer` is missing.
Dockerfile:2 DL4000 error: MAINTAINER is deprecated
Dockerfile:3 DL3052 warning: Label `org.website` is not a valid URL.
Dockerfile:5 DL3003 warning: Use WORKDIR to switch to a directory
Dockerfile:5 SC2164 warning: Use 'cd ... || exit' or 'cd ... || return' in case cd fails.
Dockerfile:7 DL3045 warning: `COPY` to a relative destination without `WORKDIR` set.
Dockerfile:8 DL3013 warning: Pin versions in pip. Instead of `pip install <package>` use `pip install <package>==<version>` or `pip install --requirement <requirements file>`
Dockerfile:8 DL3042 warning: Avoid use of cache directory with pip. Use `pip install --no-cache-dir <package>`
Dockerfile:9 DL3059 info: Multiple consecutive `RUN` instructions. Consider consolidation.
Dockerfile:9 DL3042 warning: Avoid use of cache directory with pip. Use `pip install --no-cache-dir <package>`
Dockerfile:11 DL3045 warning: `COPY` to a relative destination without `WORKDIR` set.
Dockerfile:13 DL3025 warning: Use arguments JSON notation for CMD and ENTRYPOINT arguments

```

Every violation takes on the following structure:

A rule code is prefixed with either DL or SC. The DL prefix means the rule comes from Hadolint directly. The SC prefix means the rule comes from [SpellCheck](https://github.com/koalaman/shellcheck) which is a static analysis tool for shell scripts that comes with Hadolint out of the box. You can find the combined list of rules [here](https://github.com/hadolint/hadolint#rules).

Every rule has a dedicated documentation page that lists code examples, rationale and other important details. See the dedicated page for [DL3006](https://github.com/hadolint/hadolint/wiki/DL3006) here.

You can ignore one or more rules using the `--ignore RULECODE` option:

```bash
$ hadolint --ignore DL3013 --ignore DL3042 Dockerfile

```
You can also ignore rules within the Dockerfile inline. I prefer this approach because you can exclude rule codes on a per-line basis and it’s more clear where the violation is actually happening.

```bash
# hadolint ignore=DL3013
RUN pip install --upgrade pip
```

Hadolint has an active open-source community. New rule codes are added on a regular basis so be sure to check you’re running the latest version of Hadolint every so often.

# Severity level


The severity level indicates how critical a violation is. There are six levels: error, warning, info, style, ignore, and none.

The CLI includes a --failure-threshold (abbreviated as -t) to exclude certain severity levels from causing a failure. For example, if you only want Hadolint to fail on error violations.

```bash
$ hadolint -t error Dockerfile

```
Note, violations from other severity levels will still be reported but they won’t cause a failure.

If you don’t agree with a rule code’s severity level, you can easily change it using the --<SEVERITY_LEVEL> RULECODE option. For example, the following command upgrades DL3006 to error and downgrades DL3045 to info (both codes are warning by default):

```bash
$ hadolint --error DL3006 --info DL3045 Dockerfile
Dockerfile:1 DL3006 error: Always tag the version of an image explicitly
Dockerfile:7 DL3045 info: `COPY` to a relative destination without `WORKDIR` set.

```

# Fix the Dockerfile

Working through each error one-by-one is a fantastic exercise for learning about Dockerfile best practices. As mentioned above, every rule has a very clear and detailed documentation page. Give it a shot and revisit this post when you’re done.

At this point, Hadolint should report no errors. Your file should look similar to this:

```bash
FROM python:3.10
LABEL maintainer="xyz"
LABEL org.website="xyz"
WORKDIR /app
COPY requirements.txt ./
# hadolint ignore=DL3013
RUN pip install --upgrade --no-cache-dir pip && \
 pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

```

- Integrations

Hadolint includes many convenient integrations for automatically running the linter throughout the development process. My favorites are:

[VS Code](https://github.com/hadolint/hadolint/blob/master/docs/INTEGRATION.md#vs-code): run Hadolint directly in your editor
[pre-commit](https://github.com/hadolint/hadolint/blob/master/docs/INTEGRATION.md#pre-commit): run Hadolint on every git commit
[GitHub Actions](https://github.com/hadolint/hadolint/blob/master/docs/INTEGRATION.md#github-actions): run Hadolint in GitHub CI/CD
