const { data, application } = require("ttn");
const _ = require('lodash');
const { Device, BoatsPassed, BridgeOpenings, sequelize } = require('../db');

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;

const connect = () => {
  // discover handler and open mqtt connection
  data(appID, accessKey)
    .then(function(client) {
      client.on("uplink", function(devID, payload) {
        console.log("Received uplink from ", devID);
        console.log(payload);
        var boatsPassed = payload.payload_fields.boatPassed;
        var bridgeOpened = payload.payload_fields.bridgeOpen;

        // Check if device exists using select
        sequelize.query('SELECT * FROM Devices WHERE dev_id = :dev_id ',
          { replacements: { dev_id: payload.dev_id }, type: sequelize.QueryTypes.SELECT }
        ).then(device => {
          // If device is empty persist device to db
          if(_.isEmpty(device)) {
            console.log("Geen device gevonden dus opslaan in DB");
            // Creating the device and persist it to DB
            Device.create(
              { 
                dev_id: payload.dev_id, 
                app_id: payload.app_id, 
                hardware_serial: payload.hardware_serial,
                location: "test",
                createdAt: Date.now(),
                updatedAt: Date.now()
              }).then(device => {
                  // Prints the persisted object in the log
                  console.log(device.get({
                plain: true
              })) // => { dev_id: 'foo', app_id: bar, .... }
            });
            // Else do nothing
          } else {
            console.log("Device bestaat al. dus niet opnieuw opslaan!");
          }
        });
          // Loop through al passes boats and persist data to DB
        _.forEach(boatsPassed, function(boat) {
            BoatsPassed.create(
              { 
                device_id: payload.dev_id, 
                from: Date.now(), 
                to: Date.now(),
              }).then(boatpassing => {
                  // Prints the persisted object in the log
                  console.log(boatpassing.get({
                plain: true
              })) // => { device_id: 'foo', from: bar, .... }
            }).catch(error => {
              console.log("Error: ", error);
            });
        });
        // Loop through al bridge openings and persist data to DB
        _.forEach(bridgeOpened, function(boat) {
          BridgeOpenings.create(
            { 
              device_id: payload.dev_id, 
              from: Date.now(), 
              to: Date.now(),
            }).then(bridgeOpening => {
                // Prints the persisted object in the log
                console.log(bridgeOpening.get({
              plain: true
            })) // => { device_id: 'foo', from: bar, .... }
          }).catch(error => {
            console.log("Error: ", error);
          });
        });

      });
    })
    .catch(function(err) {
      console.error(err);
    });

  // discover handler and open application manager client
  application(appID, accessKey)
    .then(function(client) {
      return client.get();
    })
    .then(function(app) {
      console.log("Got app", app);
    })
    .catch(function(err) {
      console.error(err);
    });
};

module.exports.connect = connect;
