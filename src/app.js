require("./config/db");

const express = require("express");

const bodyParser = express.json;

const cors = require("cors");

const app = express();

app.use(bodyParser());

app.use(cors());

module.exports = app;
