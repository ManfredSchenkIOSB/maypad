# MAYPAD
Manage all your Projects and Dependencies

[![Build Status](https://travis-ci.com/juliantodt/maypad.svg?token=WavrDotJ1tgCTx4qgp2h&branch=master)](https://travis-ci.com/juliantodt/maypad)
[![Docker Build status](https://img.shields.io/badge/docker%20build-automated-blue.svg)](https://hub.docker.com/r/juliantodt/maypad)


## About
MAYPAD allows you to manage your projects lifecycle in one centralized place, handling CI/CD-pipelines and dependencies. It supports various tools and plattforms - you can be sure that your project can be added. MAYPAD consists of a spring-boot backend and an angular frontend conveniently running as a docker container.

MAYPAD was developed as a "Praxis of Software-Development" project of students at @KITedu for @FraunhoferIOSB. The documents during development can be found under [https://github.com/juliantodt/maypad-docs](https://github.com/juliantodt/maypad-docs) (restricted access).

## Quickstart

### Building yourself
1. Clone the repo
2. Make sure all dependencies are installed (java, maven, nodejs, docker)
3. Install node modules `cd frontend && npm install && cd ..`
4. Build the container `./build.sh --prod`
5. Copy the sample config file `cp config.yaml{.sample,}` and make neccessary changes to it
6. Start MAYPAD using `docker-compose up`

### Using pre-build docker container
1. Replace the image for the maypad-app in the docker-compose file `maypad` by `juliantodt/maypad`
2. Start MAYPAD using `docker-compose up`

## Configuration
* MAYPAD can either be configured using it's configuration file or via environment variables.
* The environment variable `MAYPAD_HOME` indicates where MAYPAD will look for the configuration file and the frontend files and defaults to `/usr/share/maypad/`.
* For an example config file see `config.yaml.sample`
* Note that MAYPAD will generate an encryption key for database entries under `MAYPAD_HOME/security/key.dat` that you should save between container restarts. The default docker-compose will take care of that.
* To add authorization to MAYPAD, consider proxying the requests through a webserver such as nginx and then add http basic authentication. An example configuration could look like this (note the extra nginx configuration parameters because MAYPAD uses Server-Send-Events for notifications):
```
server {
  listen 80 default_server;
  server_name demo.maypad.de;

  location / {
    proxy_pass http://maypad-app:8080/;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_buffering off;
    
    add_header Transfer-Encoding: chunked;
    add_header X-Accel-Buffering: no;
    add_header X-Frame-Options SAMEORIGIN;

    auth_basic "MAYPAD Demo";
    auth_basic_user_file /etc/nginx/conf.d/htpasswd;
  }
}
```
