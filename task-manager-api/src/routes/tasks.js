const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasksController');

const validateTask = require('../middleware/validateTask');
const authenticateUser = require('../middleware/authenticate');

// #swagger.tags = ['TASKS']
router.get('/', authenticateUser, getAllTasks);

// #swagger.tags = ['TASKS']
router.get('/:id', authenticateUser, getTaskById);

// #swagger.tags = ['TASKS']
router.post('/', authenticateUser, validateTask, createTask);

// #swagger.tags = ['TASKS']
router.put('/:id', authenticateUser, validateTask, updateTask);

// #swagger.tags = ['TASKS']
router.delete('/:id', authenticateUser, deleteTask);

module.exports = router;