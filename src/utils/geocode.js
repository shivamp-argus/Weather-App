const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic2hpdmFtLWFyZ3VzIiwiYSI6ImNsZTVjb2FkZjBib3EzcnZ6YmRpYXJ0ZTkifQ.ZgbkvL7yaVJwab3iDiDbOw&limit=1";
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (res.body.features.length === 0) {
      callback("Not a valid location", undefined);
    } else {
      const { center, place_name } = res.body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geoCode;
