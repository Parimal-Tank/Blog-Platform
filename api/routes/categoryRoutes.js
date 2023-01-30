const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const auth = require('../middleware/auth')


router.get('/getAllCategory' , auth , categoryController.getAllCategory);
router.post('/addCategory' , auth , categoryController.addCategory);
router.delete('/:id' , auth , categoryController.deleteCategory);
router.put('/:id' , auth , categoryController.updateCategory);


router.get('/:id' , auth , categoryController.getCategoryById);

module.exports = router;
