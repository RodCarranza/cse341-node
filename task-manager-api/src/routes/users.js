const express = require('express');
const router = express.Router();
const {
  getCurrentUser
} = require('../controllers/usersController');
const authenticateUser = require('../middleware/authenticate');

// #swagger.path = '/users/me'
// #swagger.tags = ['USERS']
// #swagger.summary = 'Get current logged-in user'
// #swagger.description = 'Get the currently authenticated user'
// #swagger.responses[200] = {
// #   description: 'OK'
// # }
// #swagger.responses[401] = {
// #   description: 'Unauthorized'
// # }
// #swagger.responses[500] = {
// #   description: 'Internal Server Error'
// # }
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;