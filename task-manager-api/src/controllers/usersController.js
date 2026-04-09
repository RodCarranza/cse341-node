const { getDB } = require('../config/db');

const deleteCurrentUser = async (req, res, next) => {
  try {
    const db = getDB();

    if (!req.user) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    const userId = req.user._id.toString();

    // Delete all tasks for this user
    await db.collection('tasks').deleteMany({ userId });

    // Delete the user
    const result = await db.collection('users').deleteOne({
      _id: req.user._id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Logout and destroy session
    req.logout(function (err) {
      if (err) return next(err);

      req.session.destroy((sessionErr) => {
        if (sessionErr) return next(sessionErr);

        res.clearCookie('connect.sid');

        res.status(200).json({
          message: 'User and their tasks deleted successfully'
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  deleteCurrentUser
};