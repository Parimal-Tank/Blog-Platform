const express = require('express');
const router =  express.Router();
const blogController = require('../controllers/blogs');



router.post('/addblog' , blogController.addBlogDetails);


module.exports = router;