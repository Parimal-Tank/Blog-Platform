const express = require('express');
const router =  express.Router();
const blogController = require('../controllers/blogs');
const auth = require('../middleware/auth')


// Add Blog
router.post('/addblog' , auth , blogController.addBlogDetails);

router.post('/:id' , blogController.updateBlog);

//Get All Blog
router.get('/getallblog' ,auth  , blogController.getBlogDetails);

// Delete Blog
router.delete('/:id' , auth  , blogController.deleteBlog);

// Update Blog by ID
router.put('/:id' , auth  ,  blogController.updateBlog);

// Get Blog By Id
router.get('/:id' , auth  , blogController.getBlogDetailsById);

module.exports = router;