require("./config/db");

const express = require("express");

const bodyParser = express.json;

const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(bodyParser());

app.use(cors());

app.use("/api/v1", routes);

module.exports = app;
