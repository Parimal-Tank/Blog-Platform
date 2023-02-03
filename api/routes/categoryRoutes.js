const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const auth = require('../middleware/auth')

// Get All Category
router.get('/getAllCategory' , auth , categoryController.getAllCategory);

// Add Category
router.post('/addCategory' , auth , categoryController.addCategory);

//Delete Category
router.delete('/:id' , auth , categoryController.deleteCategory);

// Update Image
router.put('/:id' , auth , categoryController.updateCategory);

// Get Category By Id
router.get('/:id' , auth , categoryController.getCategoryById);

module.exports = router;
