'use strict';
module.exports = (sequelize, DataTypes) => {
  var BoatsPassed = sequelize.define('BoatsPassed', {
    device_id: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        models.BoatsPassed.belongsTo(models.Device, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return BoatsPassed;
};