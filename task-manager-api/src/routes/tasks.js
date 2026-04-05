const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  //getTaskById,
  createTask
  //updateTask,
  //deleteTask
} = require('../controllers/tasksController');

// Routes
router.get('/', getAllTasks);
//router.get('/:id', getTaskById);
router.post('/', createTask);
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
//     dueDate: "2026-04-10",
//     userId: "123"
//   }
// }
//router.put('/:id', updateTask);
//router.delete('/:id', deleteTask);

module.exports = router;