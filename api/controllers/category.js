const mongoose = require('mongoose');
const Category = require('../models/categoryModel');



const addCategory = (req , res , next) => {

    const category = new Category({
        categorys : req.body.categorys
    })

    category.save()
    .then(result => {
        res.status(200).json({
            message: "Category Added",
           createdCategory: category
       })
    })
    .catch(err =>{
        res.status(500).json({
            message : err
        })
    })
}


const deleteCategory = (req , res , next) => {

}

const updateCategory = (req, res , next) => {

}

module.exports = {
    addCategory,
    deleteCategory,
    updateCategory
}
