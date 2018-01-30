const { BridgeOpenings} = require('../db');
const Promise = require('bluebird');
const moment = require('moment');

const BridgeService = {
    payloadToTimestamps: payload => {
        const { bridgeOpen } = payload.payload_fields;

        return bridgeOpen.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result
        }, [])
        .map(value => {
            const now = moment(payload.time);
            return value.map(time => moment(now).subtract(time, 'seconds'))
        });
    },

    registerOpenings: payload => {
        const bridgeOpen = BridgeService.payloadToTimestamps(payload);

        const dbBridgeOpenings = bridgeOpen.map(bridge => BridgeOpenings.create({ 
            device_id: payload.dev_id, 
            from: bridge[0], 
            to: bridge[1],
        }))

        return Promise.all(dbBridgeOpenings)
    }
}

module.exports = BridgeService