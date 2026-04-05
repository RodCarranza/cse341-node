const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const { connectDB } = require('./config/db');
const passport = require('./config/passport');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const swaggerFile = require('../swagger.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});