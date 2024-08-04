const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
openapi: "3.0.0",
info: {
title: "Odyddeus security Permissions",
version: "1.0.0",
description: "Odyddeus security Permissions documentations",
},
};

const options = {
swaggerDefinition,
apis: ["./routers/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;