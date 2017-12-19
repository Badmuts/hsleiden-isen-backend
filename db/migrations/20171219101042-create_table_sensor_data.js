"use strict";

module.exports = {
  up: (migration, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return migration.createTable('users', { id: Sequelize.INTEGER });
    */
    return migration.createTable("sensor_data", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (migration, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return migration.dropTable('users');
    */
    return migration.dropTable("sensor_data");
  }
};
