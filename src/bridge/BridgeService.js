const { BridgeOpenings} = require('../db');
const Promise = require('bluebird');

module.exports = {
    registerOpenings: payload => {
        const { bridgeOpen } = payload.payload_fields;
        const opened = new Date();

        const dbBridgeOpenings = bridgeOpen.map(bridge => BridgeOpenings.create({ 
            device_id: payload.dev_id, 
            from: Date.now(), 
            to: new Date(opened.getTime() + (1000 * bridge)),
        }))

        return Promise.all(dbBridgeOpenings)
    }
}