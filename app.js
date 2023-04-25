const express = require('express')
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const app = express();


db.sequelize
    .authenticate()
    .then(() => console.log("Database connected ..."))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api", router);

module.exports = app;