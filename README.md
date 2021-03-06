# ![](https://raw.githubusercontent.com/maypad/maypad/master/frontend/src/favicon.ico) MAYPAD
Manage all your Projects and Dependencies

[![Build Status](https://travis-ci.org/maypad/maypad.svg?branch=master)](https://travis-ci.org/maypad/maypad)
[![Docker Build status](https://img.shields.io/docker/cloud/automated/juliantodt/maypad.svg)](https://hub.docker.com/r/juliantodt/maypad)
[![Docker Downloads](https://img.shields.io/docker/pulls/juliantodt/maypad.svg)](https://hub.docker.com/r/juliantodt/maypad)


## About
MAYPAD allows you to manage your projects lifecycle in one centralized place, handling CI/CD-pipelines and dependencies. It supports various tools and plattforms - you can be sure that your project can be added. MAYPAD consists of a spring-boot backend and an angular frontend conveniently running as a docker container.

MAYPAD was developed as a "Praxis of Software-Development" project of students at @KITedu for @FraunhoferIOSB. The documents during development can be found under [https://github.com/juliantodt/maypad-docs](https://github.com/juliantodt/maypad-docs) (restricted access).

## Server Setup
To start using MAYPAD you need to setup a server running the MAYPAD docker container and a MySQL database. More information about can be found here: [docs/setup.md](docs/setup.md)

## Using MAYPAD
Add your projects [docs/add.md](docs/add.md), configure them [docs/config.md](docs/config.md) and then use the intuitive web frontend.
