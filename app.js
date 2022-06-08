const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require('./swagger.json');

const client = require('./routes/website.routes');

const app = express();

require('./config/mongo.config');
require('dotenv').config({
    path: './.env'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', client);
// const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "Library API",
//         version: "1.0.0",
//         description: "A simple Express Library API",
//         termsOfService: "http://example.com/terms/",
//         contact: {
//           name: "API Support",
//           url: "http://www.exmaple.com/support",
//           email: "support@example.com",
//         },
//       },
  
//       servers: [
//         {
//           url: "http://localhost:8086",
//           description: "My API Documentation",
//         },
//       ],
//     },
//     apis: ["./Routes/*.js"],
//   };
  
//   const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

let port = process.env.PORT || 8085;

app.listen(port, () => {
    console.log('Server is up and running on port' + port);
});