const { BoatsPassed } = require('../db');
const Promise = require('bluebird');
const moment = require('moment');

const BoatsService = {
    payloadToTimestamps: payload => {
        const { boatPassed } = payload.payload_fields;

        return boatPassed.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result
        }, [])
        .map(value => {
            const now = moment(payload.time);
            return value.map(time => moment(now).subtract(time, 'seconds'))
        });
    },
    
    registerPassings: payload => {
        const boatPassed = BoatsService.payloadToTimestamps(payload);

        const dbBoatsPassed = boatPassed.map(timeOfPassing => BoatsPassed.create({ 
            device_id: payload.dev_id, 
            from: timeOfPassing[0], 
            to: timeOfPassing[1],
        }))

        return Promise.all(dbBoatsPassed);
    }
}

module.exports = BoatsService;