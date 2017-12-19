const { data, application } = require("ttn");

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;

const connect = () => {
  // discover handler and open mqtt connection
  data(appID, accessKey)
    .then(function(client) {
      client.on("uplink", function(devID, payload) {
        console.log("Received uplink from ", devID);
        console.log(payload);
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
