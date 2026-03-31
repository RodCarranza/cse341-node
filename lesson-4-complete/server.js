require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Middleware to parse JSON
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API for managing contacts"
    },
    servers: [
      {
        url: "http://localhost:3000" // Replace with Render URL when live
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// MongoDB connection
const { connectDB } = require('./db/connect');

// Connect to DB before mounting routes
connectDB().then(() => {
    console.log('Database connected');

    // Mount Swagger before your routes
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Use routes (including contacts)
    app.use('/', require('./routes'));

    // Start server
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to database', err);
});