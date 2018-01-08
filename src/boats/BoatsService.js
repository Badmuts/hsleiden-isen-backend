const { BoatsPassed } = require('../db');
const Promise = require('bluebird');

module.exports = {
    registerPassings: payload => {
        const { boatPassed } = payload.payload_fields;
        const passed = new Date();

        const dbBoatsPassed = boatPassed.map(timeOfPassing => BoatsPassed.create({ 
            device_id: payload.dev_id, 
            from: Date.now(), 
            to: new Date(passed.getTime() + (1000 * timeOfPassing)),
        }))

        return Promise.all(dbBoatsPassed);
    }
}