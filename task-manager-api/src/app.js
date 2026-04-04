const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const taskRoutes = require('./routes/tasks');

// Routes
app.use('/tasks', taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});