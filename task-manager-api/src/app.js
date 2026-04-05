const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const taskRoutes = require('./routes/tasks');

const userRoutes = require('./routes/users');

// ROUTES
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);


// - swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});