const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const user = await db.collection('users').findOne({
      _id: new ObjectId(id)
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// POST create user
const createUser = async (req, res) => {
  try {
    const db = getDB();

    const existingUser = await db.collection('users').findOne({
      username: req.body.username
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = {
      username: req.body.username,
      password: req.body.password
    };

    const result = await db.collection('users').insertOne(user);

    res.status(201).json({
      message: 'User created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// PUT update user
const updateUser = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (req.body.username) {
      const existingUser = await db.collection('users').findOne({
        _id: { $ne: new ObjectId(id) },
        username: req.body.username
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }

    const updatedUser = {};

    if (req.body.username !== undefined) {
      updatedUser.username = req.body.username;
    }

    if (req.body.password !== undefined) {
      updatedUser.password = req.body.password;
    }

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await db.collection('users').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};