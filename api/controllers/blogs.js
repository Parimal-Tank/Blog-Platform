const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify');


cloudinary.config({ 
    cloud_name: 'dt39lgelf', 
    api_key: '338396821511569', 
    api_secret: 'OfPZG6rYZqY94qFbPhu2-Ta2qgQ' 
});

// Add Blog Details
const addBlogDetails = async (req , res , next) =>{


    const file = await req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    console.log(result);
    
    const blog = new Blog({
        title : req.body.title,
        category : req.body.category,
        description : req.body.description,
        imagePath : result.url,
        slug : slugify(req.body.title , '-')
    })
   
    blog.save()
    .then(result => {
    
        // res.status(200).json({
        //      message: "Blog Created Successfully",
        //     createdBlog: blog
        // })

        res.render('index');
        
    })
    .catch(err =>{
        res.status(500).json({
            message : err
        })
    })
    
}


// Get Blog Details
const getBlogDetails = (req , res , next) => {

    Blog.find()
    .exec()
    .then(result => {
         
            const responce = {

                count : result.length,
                blogs : result.map(result => {
                    return{
                        _id : result._id,
                        title : result.title,
                        category : result.category,
                        description : result.description
                    }
                })
            }

            if(responce.count > 0){

               // res.status(200).json(responce);

                res.render('index' , {data : responce});
                
            }else{
                res.status(505).json({
                    message : "Not Any Blog Available"
                })
            }
        })
        .catch(err => {
            res.status(505).json({
                error : err
            })
        })
}

// Get Blog BY ID 

const getBlogDetailsById = (req , res , next) => {
    const id = req.params.id;

    Blog.findById({_id : id})
    .then(result => {
        res.status(500).json(result);
    })
    .catch(err => {
        res.status(500).json({
            message : "No Blog Found or Enter Valid BlogId"
        })
    })

}

// Update the Blog Details
const updateBlog = (req , res , next) => {

    const id = req.params.id;

    Blog.updateOne({_id : id} , {$set : req.body})
    .then(result =>{
        res.status(200).json({
            message : "Blog Update Successfully",
            result
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}

// Delete the Blog Details

const deleteBlog = (req , res , next) => {

    const id = req.params.id;

    Blog.deleteOne({_id : id})
    .then(result => {
        res.status(200).json({
            message : "Blog Deleted Successfully"
        })
    })
    .catch(err => {
        res.status(505).json({
            error : err
        })
    })
}


module.exports = {
    getBlogDetails,
    addBlogDetails,
    deleteBlog,
    updateBlog,
    getBlogDetailsById
}