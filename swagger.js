const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Natours API',
      version: '1.0.0',
      description: 'API documentation for the Natours application',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change this if needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI available at http://localhost:3000/api-docs');
};

module.exports = swaggerDocs;
