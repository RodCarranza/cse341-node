const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'API for managing tasks and users with Google OAuth'
  },
  host: 'cse341-node-8.onrender.com',
  //host: 'localhost:3000',
  schemes: ['https'],
  tags: [
    { name: 'TASKS', description: 'Operations for managing tasks' },
    { name: 'USERS', description: 'Operations for managing users' },
    { name: 'AUTH', description: 'Authentication with Google OAuth' }
  ],
  basePath: ''
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './src/routes/tasks.js',
  './src/routes/users.js',
  './src/routes/auth.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);