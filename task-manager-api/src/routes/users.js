const express = require('express');
const router = express.Router();
const {
  deleteCurrentUser
} = require('../controllers/usersController');
const authenticateUser = require('../middleware/authenticate');

// #swagger.path = '/users/me'
// #swagger.tags = ['USERS']
// #swagger.summary = 'Delete current logged-in user'
// #swagger.description = 'Deletes the authenticated user and all their tasks'
// #swagger.responses[200] = {
// #   description: 'User deleted successfully'
// # }
// #swagger.responses[401] = {
// #   description: 'Unauthorized'
// # }
// #swagger.responses[500] = {
// #   description: 'Internal Server Error'
// # }
router.delete('/me', authenticateUser, deleteCurrentUser);

module.exports = router;