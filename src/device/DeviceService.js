const { Device } = require('../db')

module.exports = {
    findOrCreate: payload => Device.findOrCreate({
        where: { dev_id: payload.dev_id },
        defaults: { 
          dev_id: payload.dev_id, 
          app_id: payload.app_id, 
          hardware_serial: payload.hardware_serial,
          location: "test",
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      })
}