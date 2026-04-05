const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticate');

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasksController');

// Routes
router.get('/', authenticateUser, getAllTasks);
router.get('/:id', authenticateUser, getTaskById);
router.post('/', authenticateUser, createTask);
// #swagger.tags = ['Tasks']
// #swagger.summary = 'Update a task'
// #swagger.description = 'Update task fields by ID'
// #swagger.parameters['id'] = {
//   in: 'path',
//   description: 'Task ID',
//   required: true,
//   type: 'string'
// }
// #swagger.parameters['body'] = {
//   in: 'body',
//   description: 'Task data',
//   required: true,
//   schema: {
//     title: "Updated task",
//     description: "Updated description",
//     status: "completed",
//     priority: "high",
//     dueDate: "2026-04-10"
//   }
// }
router.put('/:id', authenticateUser, updateTask);
router.delete('/:id', authenticateUser, deleteTask);

module.exports = router;