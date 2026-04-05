require('dotenv').config();

const express = require('express');
const { connectDB } = require('./src/config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
const taskRoutes = require('./src/routes/tasks');
const userRoutes = require('./src/routes/users');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Connect DB and start server
connectDB()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });