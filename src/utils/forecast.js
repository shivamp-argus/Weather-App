const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=42bc759ef1258fc4f881c3beb2988ed9&query=" +
    lat +
    "," +
    lon +
    '"';
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (res.body.error) {
      callback("Enter valid location", undefined);
    } else {
      const { temperature, feelslike } = res.body.current;
      callback(
        undefined,
        `Currently it is ${temperature} but it feels like ${feelslike}`
      );
    }
  });
};

module.exports = forecast;
