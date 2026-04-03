require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware to parse JSON
app.use(express.json());

// CORS + headers middleware (ADD HERE)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
const { connectDB } = require('./db/connect');

// Connect to DB before mounting routes
connectDB()
  .then(() => {
    console.log('Database connected');

    // Use your routes (including contacts)
    app.use('/', require('./routes'));

    // Start server
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
  });
