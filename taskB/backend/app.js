const express = require("express");
const apiRoutes = require("./api-routes");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// to check the app loads up and for testing lambda
app.get("/", function (req, res) {
  res.send("Happy test, hello world");
});

function failSafeHandler(error, req, res, next) { // generic handler
  res.status(500).send(error)
}

app.use("/api", apiRoutes);
app.use(failSafeHandler);

module.exports = app;
