const router = require('express').Router();
//const { User } = require('../models'); Not in use currently
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  });
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');  
});

module.exports = router;
