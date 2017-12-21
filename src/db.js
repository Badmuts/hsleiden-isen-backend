'use strict';

const path      = require('path');
const Sequelize = require('sequelize');
const glob      = require('glob');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../db/config/db.js')[env];
const db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

glob.sync('**/*.model.js')
  .map(file => file.replace('src/', ''))
  .forEach(file => {
    var model = sequelize['import'](file);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;