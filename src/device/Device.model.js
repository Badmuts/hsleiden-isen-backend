'use strict';
module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    dev_id: DataTypes.STRING,
    app_id: DataTypes.STRING,
    hardware_serial: DataTypes.STRING,
    location: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        models.Device.hasMany(models.BoatsPassed)
        models.Device.hasMany(models.BridgeOpenings)
      }
    }
  });
  return Device;
};