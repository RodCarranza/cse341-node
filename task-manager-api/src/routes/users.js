const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController');

const {
  validateCreateUser,
  validateUpdateUser
} = require('../middleware/userValidation');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateCreateUser, createUser);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;