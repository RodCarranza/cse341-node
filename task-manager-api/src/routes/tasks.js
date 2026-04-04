const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST new task
router.post('/', async (req, res) => {
  try {
    const db = getDB();

    const task = req.body;

    // Basic validation
    if (!task.title || !task.status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }

    const result = await db.collection('tasks').insertOne(task);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

module.exports = router;