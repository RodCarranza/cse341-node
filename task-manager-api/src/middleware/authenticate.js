const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ error: 'Unauthorized. Please log in first.' });
};

module.exports = authenticateUser;