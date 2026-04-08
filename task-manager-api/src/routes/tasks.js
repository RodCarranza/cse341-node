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

// #swagger.path = '/tasks'
// #swagger.tags = ['TASKS']
// #swagger.summary = 'Get all tasks'
// #swagger.description = 'Get all tasks for the logged-in user'
router.get('/', authenticateUser, getAllTasks);

// #swagger.path = '/tasks/{id}'
// #swagger.tags = ['TASKS']
// #swagger.summary = 'Get task by ID'
// #swagger.description = 'Get one task by its ID for the logged-in user'
// #swagger.parameters['id'] = {
// #   in: 'path',
// #   description: 'Task ID',
// #   required: true,
// #   type: 'string'
// # }
router.get('/:id', authenticateUser, getTaskById);

// #swagger.path = '/tasks'
// #swagger.tags = ['TASKS']
// #swagger.summary = 'Create a new task'
// #swagger.description = 'Create a task for the logged-in user'
// #swagger.parameters['body'] = {
// #   in: 'body',
// #   description: 'Task data',
// #   required: true,
// #   schema: {
// #     title: 'OAuth test',
// #     description: 'Created after login',
// #     status: 'pending',
// #     priority: 'high',
// #     dueDate: '2026-04-10'
// #   }
// # }
router.post('/', authenticateUser, validateTask, createTask);

// #swagger.path = '/tasks/{id}'
// #swagger.tags = ['TASKS']
// #swagger.summary = 'Update a task'
// #swagger.description = 'Update task fields by ID for the logged-in user'
// #swagger.parameters['id'] = {
// #   in: 'path',
// #   description: 'Task ID',
// #   required: true,
// #   type: 'string'
// # }
// #swagger.parameters['body'] = {
// #   in: 'body',
// #   description: 'Updated task data',
// #   required: true,
// #   schema: {
// #     title: 'Updated task',
// #     description: 'Updated description',
// #     status: 'completed',
// #     priority: 'high',
// #     dueDate: '2026-04-10'
// #   }
// # }
router.put('/:id', authenticateUser, validateTask, updateTask);

// #swagger.path = '/tasks/{id}'
// #swagger.tags = ['TASKS']
// #swagger.summary = 'Delete a task'
// #swagger.description = 'Delete a task by ID for the logged-in user'
// #swagger.parameters['id'] = {
// #   in: 'path',
// #   description: 'Task ID',
// #   required: true,
// #   type: 'string'
// # }
router.delete('/:id', authenticateUser, deleteTask);

module.exports = router;