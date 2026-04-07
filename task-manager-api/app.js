require('dotenv').config();

const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const { connectDB } = require('./src/config/db');
const passport = require('./src/config/passport');

const taskRoutes = require('./src/routes/tasks');
const userRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');

const swaggerFile = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

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