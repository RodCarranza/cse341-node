const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// #swagger.path = '/auth/google'
// #swagger.tags = ['AUTH']
// #swagger.summary = 'Login with Google OAuth'
// #swagger.description = 'Redirects user to Google for authentication'
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.send('Login successful');
  }
);

// #swagger.path = '/auth/me'
// #swagger.tags = ['AUTH']
// #swagger.summary = 'Get current logged-in user'
// #swagger.description = 'Returns the authenticated user based on session'
// #swagger.responses[200] = {
// #   description: 'OK'
// # }
// #swagger.responses[401] = {
// #   description: 'Not logged in'
// # }
router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  res.status(200).json(req.user);
});

// #swagger.path = '/auth/logout'
// #swagger.tags = ['AUTH']
// #swagger.summary = 'Logout current user'
// #swagger.description = 'Logs out the current user and destroys session'
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.clearCookie('connect.sid');
      res.send('Logged out successfully');
    });
  });
});

module.exports = router;