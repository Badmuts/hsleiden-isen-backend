'use strict';
module.exports = (sequelize, DataTypes) => {
  var BridgeOpenings = sequelize.define('BridgeOpenings', {
    device_id: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        models.BridgeOpenings.belongsTo(models.Device, {
          onDelete: "CASCADE",
          foreinKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return BridgeOpenings;
};