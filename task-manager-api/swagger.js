const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks and users'
  },
  //host: 'localhost:3000',
  host: 'https://cse341-node-5.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'TASKS',
      description: 'Operations for managing tasks'
    },
    {
      name: 'USERS',
      description: 'Operations for managing users'
    }
  ],
  basePath: ''
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './src/routes/tasks.js',
  './src/routes/users.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);