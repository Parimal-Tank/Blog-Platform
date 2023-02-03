const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify');
const Category = require('../models/categoryModel');
const { check , validationResult } = require('express-validator');

// Used For Cloudnary
cloudinary.config({ 
    cloud_name: 'dt39lgelf', 
    api_key: '338396821511569', 
    api_secret: 'OfPZG6rYZqY94qFbPhu2-Ta2qgQ' 
});

// Add Blog Details
const addBlogDetails = async (req , res , next) =>{
     
    // For Validation
    const error = validationResult(req);
    if(!error.isEmpty()){
      const alert = error.array()
      res.render('add-new-blog' , { alert, data: req.body } )
    }else{

        const file = await req.files.photo;
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        
        const blog = new Blog({
            title : req.body.title,
            category : req.body.categorys,
            description : req.body.description,
            image_id: result.public_id,
            image_url : result.url,
            slug : slugify(req.body.title , '-')
        })
       
        await blog.save()
        .then(result => {
          
            res.redirect('/blog/getallblog');
    
        })
        .catch(err =>{
            res.status(500).json({
                message : err
            })
        })
    }
    
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
                        description : result.description,
                        image_id : result.image_id,
                        image_url : result.image_url,
                        createdAt : result.createdAt
                    }
                })
            }
                 res.render('allblog' , {blogData : responce.blogs}); 
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
        
        Category.find()
        .then(categorys =>{
            res.render( 'update-blog' ,{result : result , category : categorys});

        }).catch(err => {
            res.status(500).json({
                error : err
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message : "No Blog Found or Enter Valid BlogId"
        })
    })

}

// Update the Blog Details
const updateBlog = async (req , res , next) => {

    const id = req.params.id.trim(); 
    const {title, description, category} = req.body
    const slug = slugify(req.body.title , '-');

      Blog.updateOne({_id : id} , {$set : {title, description, category, slug} } )
    .then(result =>{

       return  res.status(200).json({
            message: 'Updated'
        })
    }) .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })

    }

//  Update Image
const updateImage = async (req , res, next) => {

    try {

    const id = req.params.id; 

    const currentBlog = await Blog.findById(req.params.id);

    const img_id =  currentBlog.image_id;

            if(img_id){
                console.log("Image Destroy");
                cloudinary.uploader.destroy(img_id)
            }

    const file = await req.files.photo;
    const results = await cloudinary.uploader.upload(file.tempFilePath);
    
 
    Blog.updateOne({_id : id} , {$set : {image_id : results.public_id , image_url : results.url}} )
    .then(result =>{
        
        res.redirect(`/blog/${id}`);

    }) .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })

} catch(error){
    console.log(error);
    res.status(500).json({
        error : error
    })
}

}

// Delete Blog By Id
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
    getBlogDetailsById,
    updateImage
}