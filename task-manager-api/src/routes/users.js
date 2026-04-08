const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getCurrentUser
} = require('../controllers/usersController');
const authenticateUser = require('../middleware/authenticate');

// #swagger.path = '/users'
// #swagger.tags = ['USERS']
// #swagger.summary = 'Get all users'
// #swagger.description = 'Get all users from the users collection'
// #swagger.responses[200] = {
// #   description: 'OK'
// # }
// #swagger.responses[401] = {
// #   description: 'Unauthorized'
// # }
// #swagger.responses[500] = {
// #   description: 'Internal Server Error'
// # }
router.get('/', authenticateUser, getAllUsers);

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