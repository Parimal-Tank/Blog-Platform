const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

// Get all Category
const getAllCategory = (req ,res, next) => {
    Category.find()
    .exec()
    .then( result => {
        const responce = {

            count : result.length,
            category : result.map(result => {
                return{
                    _id : result._id,
                    categorys : result.categorys
                }
            })
        }

        if(responce.count > 0){
            // res.status(200).json(responce);
            // console.log(responce.category);
            res.render('all-categories' , { category : responce.category })

        }else{
            res.status(505).json({
                message : "Not Any Category Available"
            })
        }
    })
    .catch(err => {
        res.status(505).json({
            error : err
        })
    })
}


// Get category by id
const getCategoryById = (req , res , next ) => {
    const id = req.params.id;

    Category.findById(id)
    .exec()
    .then(result => {

        if(result){
            res.status(200).json({
                category : result
            })
        }else{
            res.status(404).json({
                message : "Category is NoT Available by provided ID"
            })
        }
    })
    .catch(err => {
        res.status(505).json({
            error : err
        })
    })
}

// Add Category
const addCategory = (req , res , next) => {
console.log('cggcgcg', req.body);
    const category = new Category({
        categorys : req.body.categorys,
    })
 
        category.save()
        .then(result => { 
        
           res.render('add-new-categories');
        })
        .catch(err =>{
            console.log(err, '4894894hyuy');
            res.status(500).json({
                error : err
            })
        })
}   

// Delete Category

const deleteCategory = async (req , res , next) => {

    const id = req.params.id;

    await Category.deleteOne({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Category is Deleted"
        });
    })
    .catch(err => {
        res.status(500).json({
            error  : err
        })
    })
        
}

// Update Category

const updateCategory = (req, res , next) => {
   
    const id = req.params.id;

    Category.updateOne({_id : id} , {$set : req.body})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Category Updated"
        })
    })
    .catch(err => {
        res.status(505).json({
            error : err
        })
    })
}

module.exports = {
    getAllCategory,
    getCategoryById,
    addCategory,
    deleteCategory,
    updateCategory
}
