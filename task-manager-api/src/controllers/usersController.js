const { getDB } = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser
};