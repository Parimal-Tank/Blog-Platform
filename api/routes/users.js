const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/users');


router.post('/login' , UserController.user_login);
router.get('/logout' , auth, UserController.user_logout);

module.exports = router;