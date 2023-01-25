const express = require('express');
const router =  express.Router();
const blogController = require('../controllers/blogs');


// Add Blog
router.post('/addblog' , blogController.addBlogDetails);

//Get All Blog
router.get('/getallblog' , blogController.getBlogDetails);

// Delete Blog
router.delete('/:id' , blogController.deleteBlog);

// Update Blog
router.put('/:id' , blogController.updateBlog);

// Get Blog By Id
router.get('/:id' , blogController.getBlogDetailsById);

module.exports = router;