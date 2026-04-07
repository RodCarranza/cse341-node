const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// #swagger.tags = ['AUTH']
// #swagger.summary = 'Login with Google OAuth'
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// #swagger.tags = ['AUTH']
// #swagger.summary = 'Google OAuth callback'
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.send('Login successful');
  }
);

// #swagger.tags = ['AUTH']
// #swagger.summary = 'Get current logged-in user'
router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  res.status(200).json(req.user);
});

// #swagger.tags = ['AUTH']
// #swagger.summary = 'Logout current user'
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Logged out');
  });
});

module.exports = router;