const { getDB } = require('../config/db');

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
};

module.exports = {
  getCurrentUser
};