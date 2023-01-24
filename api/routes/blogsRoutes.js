const express = require('express');
const router =  express.Router();
const blogController = require('../controllers/blogs');



router.post('/addblog' , blogController.addBlogDetails);


router.get('/getallblog' , blogController.getBlogDetails);


router.delete('/:id' , blogController.deleteBlog);


router.put('/:id' , blogController.updateBlog);
router.get('/:id' , blogController.getBlogDetailsById);

module.exports = router;