const { getDB } = require('../config/db');

// GET all users
const getAllUsers = async (req, res) => {
  const db = getDB();
  const users = await db.collection('users').find().toArray();
  res.status(200).json(users);
};

// POST create user
const createUser = async (req, res) => {
  const db = getDB();

  const user = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    createdAt: new Date()
  };

  const result = await db.collection('users').insertOne(user);

  res.status(201).json({
    message: 'User created successfully',
    id: result.insertedId
  });
};

module.exports = {
  getAllUsers,
  createUser
};