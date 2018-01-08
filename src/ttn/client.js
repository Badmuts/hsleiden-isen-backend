const { data, application } = require('ttn');
const DeviceService = require('../device/DeviceService');
const BoatService = require('../boats/BoatsService');
const BridgeService = require('../bridge/BridgeService');

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;

const connect = () => {
  // discover handler and open mqtt connection
  data(appID, accessKey)
    .then(function(client) {
      client.on("uplink", function(devID, payload) {
        DeviceService.findOrCreate(payload)
          .spread((device, created) => console.log(device.get({ plain: true })))
          .catch(err => console.error('Could not save Device', err.message))
        
        BoatService.registerPassings(payload)
          .then(boatPassed => console.log("BoatsPassed", boatPassed.map(b => b.get({plain:true}))))
          .catch(err => console.error('Could not save Boat passings', err.message))

        BridgeService.registerOpenings(payload)
          .then(openings => console.log("BridgeOpenings", openings.map(o => o.get({plain:true}))))
          .catch(err => console.error('Could not save Bridge openings', err.message))
      });
    })
    .catch(err => console.error('Could not connect to TTN mqtt', err.message));

  // discover handler and open application manager client
  application(appID, accessKey)
    .then(client  => client.get())
    .then(app     => console.log("Got app", app))
    .catch(err    => console.error('Could not connect to TTN application', err.message));
};

module.exports.connect = connect;
