const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');


router.get('/getAllCategory' , categoryController.getAllCategory);
router.post('/addCategory' , categoryController.addCategory);
router.delete('/:id' , categoryController.deleteCategory);
router.put('/:id' , categoryController.updateCategory);


router.get('/:id' , categoryController.getCategoryById);

module.exports = router;
