# HSLEIDEN ISEN Backend

## Getting started

```sh
$ source setenv
# Create and fill .env
$ cp .env.example .env
# Start developing
$ docker-compose up -d
```

## Tips
`setenv` contains handy aliases like:

```sh
# Show logs (tail) of app service
$ logs
# Yarn or npm install via container
$ yarn 
$ npm
```

## Deployment

```sh
# To build current dir with package.json version
$ build
# To deploy current version read from package.json (version must be an image available on hub.docker.com)
$ deploy
```