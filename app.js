const express = require('express')
const db = require("./app/models/index.js");
const router = require("./app/routes/index.js");
const path = require('path');
const app = express();

// for secure api
const helmet = require("helmet");
app.use(helmet());

const hateoasLinker = require('express-hateoas-links');
app.use(hateoasLinker);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

db.sequelize
    .authenticate()
    .then(() => console.log("Database connected ..."))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API',
            version: '1.0.0',
            description: "A Simple Express API Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ['./app/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));


module.exports = app;