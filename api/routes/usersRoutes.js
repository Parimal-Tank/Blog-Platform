const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/users');


router.post('/login' , UserController.login);
router.get('/logout' , auth, UserController.logout);

router.post('/signup', UserController.signup);

router.post('/')

module.exports = router;