'use strict';

// to support ES6+
require('babel-register');
require("babel-polyfill");

const express = require('express');
const createMiddleware = require('swagger-express-middleware');
const path = require('path');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = path.join(__dirname, 'api/swagger/swagger.yaml');
const swaggerDocument = yaml.load(swaggerFile);
const port = process.env.PORT || 9000;

let app = express();

// swagger-ui-express
const options = {
  explorer: false
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// swagger-express-middleware
createMiddleware(swaggerFile, app, (err, middleware) => {
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );

  app.listen(port, function() {
    console.log(`running at http://localhost:${port}`);
  });
});
