const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for my API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'
        ,'./swagger-annotations.js'
        ], // Aquí defines dónde están tus anotaciones para Swagger
};
const swaggerSpec = swaggerJSDoc(options);



/*
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
*/

//carga swagger para leer json
//const swaggerDocumentJSON = require('./openapi.json');


//carga swagger en yaml
const YAML = require('yamljs');
const path = require('path');

const swaggerDocumentYaml = YAML.load(path.join(__dirname, 'swagger-docs.yaml'));

//integra todo
const swaggerDocument = { ...swaggerDocumentYaml, paths: { ...swaggerDocumentYaml.paths, ...swaggerSpec.paths } };

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  };
