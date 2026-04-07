const express = require('express');
const router = express.Router();
const { getAllUsers, getCurrentUser } = require('../controllers/usersController');
const authenticateUser = require('../middleware/authenticate');

// #swagger.tags = ['USERS']
router.get('/', authenticateUser, getAllUsers);

// #swagger.tags = ['USERS']
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;