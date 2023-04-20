const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const options = {
  swaggerDefinition: swaggerDocs,
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};
