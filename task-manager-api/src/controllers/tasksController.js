const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().replace('T', ' ').substring(0, 16);
};

const formatTask = (task) => ({
  ...task,
  createdAt: formatDate(task.createdAt),
  updatedAt: formatDate(task.updatedAt)
});

const getAllTasks = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection('tasks')
      .find({ userId: req.user._id.toString() })
      .toArray();

    res.status(200).json(tasks.map(formatTask));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

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

const createTask = async (req, res) => {
  try {
    const db = getDB();

    const task = {
      ...req.body,
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

const updateTask = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

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
      { $set: updatedTask }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

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