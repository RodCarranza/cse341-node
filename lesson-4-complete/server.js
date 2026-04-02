require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const { connectDB } = require('./db/connect');

// Connect to DB before mounting routes
connectDB().then(() => {
    console.log('Database connected');

    // Use your routes (including contacts)
    app.use('/', require('./routes'));

    // Start server
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to database', err);
});
