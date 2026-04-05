const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Date formatter
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().replace('T', ' ').substring(0, 16);
};

// Task formatter
const formatTask = (task) => ({
  ...task,
  createdAt: formatDate(task.createdAt),
  updatedAt: formatDate(task.updatedAt)
});

// GET all tasks for logged-in user
const getAllTasks = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection('tasks')
      .find({ userId: req.user._id.toString() })
      .toArray();

    const formattedTasks = tasks.map(formatTask);

    res.status(200).json(formattedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// GET task by ID for logged-in user
const getTaskById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const task = await db.collection('tasks').findOne({
      _id: new ObjectId(id),
      userId: req.user._id.toString()
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(formatTask(task));
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID or server error' });
  }
};

// POST (CREATE task) for logged-in user
const createTask = async (req, res) => {
  try {
    const db = getDB();

    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }

    const task = {
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user._id.toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('tasks').insertOne(task);

    res.status(201).json({
      message: 'Task created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// PUT (UPDATE task) for logged-in user
const updateTask = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const updatedTask = {
      ...req.body,
      updatedAt: new Date()
    };

    delete updatedTask.userId;
    delete updatedTask.createdAt;

    const result = await db.collection('tasks').updateOne(
      {
        _id: new ObjectId(id),
        userId: req.user._id.toString()
      },
      {
        $set: updatedTask
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// DELETE task for logged-in user
const deleteTask = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const result = await db.collection('tasks').deleteOne({
      _id: new ObjectId(id),
      userId: req.user._id.toString()
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};