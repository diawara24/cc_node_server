const express = require('express')
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const app = express();
module.exports = app;

db.sequelize
    .authenticate()
    .then(() => console.log("Database connected ..."))
    .catch((err) => console.log(err));


app.use("/api", router);