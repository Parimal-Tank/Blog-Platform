const express = require('express');
const { check, validationResult } = require('express-validator');
const router =  express.Router();
const blogController = require('../controllers/blogs');
const auth = require('../middleware/auth')


// Add Blog
router.post('/addblog' , auth ,
    check('title' , 'This title must be a 3+ long')
        .exists()
        .isLength({min : 3}, {max : 15})
, blogController.addBlogDetails);

// for update image
router.post('/:id' , blogController.updateImage);

//Get All Blog
router.get('/getallblog' ,auth  , blogController.getBlogDetails);

// Delete Blog
router.delete('/:id' , auth  , blogController.deleteBlog);

// Update Blog by ID
router.put('/:id' , auth  ,  
check('title' , 'This title must be a in between 3 to 15 word')
.exists()
.isLength({min : 3}, {max : 15})
,  blogController.updateBlog);

// Get Blog By Id
router.get('/:id' , auth  , blogController.getBlogDetailsById);

module.exports = router;