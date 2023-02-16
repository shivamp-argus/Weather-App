const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//paths to directories
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partial");

// setting handlebars
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// defining static
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("home", { title: "Weather App", name: "Shivam" });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "Oh no error!!" });
  }
  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error: "Oh no error!!!" });
    }
    const { latitude, longitude, location } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: "Oh no error!!!" });
      }
      res.send({
        forecastData,
        location,
      });
    });
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});
app.get("*", (req, res) => {
  res.render("error", { title: "Error" });
});

app.listen(3000, () => {
  console.log("listening...");
});
