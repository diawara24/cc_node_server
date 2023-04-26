const express = require('express')
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const path = require('path');
const app = express();
const cors = require('cors')


db.sequelize
    .authenticate()
    .then(() => console.log("Database connected ..."))
    .catch((err) => console.log(err));


app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;