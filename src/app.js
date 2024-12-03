require("./config/db");

const express = require("express");

const path = require("path");

const bodyParser = express.json;

const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const routes = require("./routes");

app.use(bodyParser());

app.use(cors());

app.use("/api/v1", routes);

module.exports = app;
