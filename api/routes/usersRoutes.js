const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/users');

// for admin login
router.post('/login' , UserController.login);

// for admin logout
router.get('/logout' , auth, UserController.logout);

router.post('/signup', UserController.signup);

// default route
router.post('/')

module.exports = router;