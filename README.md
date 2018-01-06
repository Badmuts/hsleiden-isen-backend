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
# sequelize-cli
$ sequelize
$ db
```

## Database

Connection to the database is handled by [Sequelize](http://docs.sequelizejs.com/). The [`sequelize-cli`](https://github.com/sequelize/cli) package is also installed:

```
Sequelize CLI [Node: 6.11.2, CLI: 3.0.0, ORM: 4.8.0]

Commands:
  db:migrate                        Run pending migrations
  db:migrate:schema:timestamps:add  Update migration table to have timestamps
  db:migrate:status                 List the status of all migrations
  db:migrate:undo                   Reverts a migration
  db:migrate:undo:all               Revert all migrations ran
  db:seed                           Run specified seeder
  db:seed:undo                      Deletes data from the database
  db:seed:all                       Run every seeder
  db:seed:undo:all                  Deletes data from the database
  db:create                         Create database specified by configuration
  db:drop                           Drop database specified by configuration
  init                              Initializes project
  init:config                       Initializes configuration
  init:migrations                   Initializes migrations
  init:models                       Initializes models
  init:seeders                      Initializes seeders
  migration:generate                Generates a new migration file       [aliases: migration:create]
  model:generate                    Generates a model and its migration  [aliases: model:create]
  seed:generate                     Generates a new seed file            [aliases: seed:create]

Options:
  --version  Show version number                                         [boolean]
  --help     Show help                                                   [boolean]
```

## Database

* Navigate to `http://localhost:4000`
* Login with `admin:admin`
* Add datasource MySQL
* Use `db:33066` as address
* Username: whetever you picked in the env file
* Password whetever you picked in the env file
* Database: whetever you picked in the env file

Click on top of the webpage next to the grafana logo on home. 
Press import dashboard and select the json file which is located in the grafana folder

## Deployment

```sh
# To build current dir with package.json version
$ build
# To deploy current version read from package.json (version must be an image available on hub.docker.com)
$ deploy
```
