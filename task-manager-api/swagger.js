const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/tasks'
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/tasks.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);