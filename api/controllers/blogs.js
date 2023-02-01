const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify');
const Category = require('../models/categoryModel');


cloudinary.config({ 
    cloud_name: 'dt39lgelf', 
    api_key: '338396821511569', 
    api_secret: 'OfPZG6rYZqY94qFbPhu2-Ta2qgQ' 
});

// Add Blog Details
const addBlogDetails = async (req , res , next) =>{

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
    
        // res.status(200).json({
        //      message: "Blog Created Successfully",
        //     createdBlog: blog
        // })
        // alert("Blog Added Successfully");
        res.redirect('/blog/getallblog');
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

    //  console.log(result);
    // console.log(req.body);

    // try{

    // const currentBlog = await Blog.findById(req.params.id);

    //  if(currentBlog.image_id !== ''){

    //     const img_id =  currentBlog.image_id;

    //     if(img_id){
    //         await cloudinary.uploader.destroy(img_id);
    //     }
    //  }
        //  const file = await req.files.photo;
        //  const result = await cloudinary.uploader.upload(file.tempFilePath);

        //  console.log(result);

    //  const newImage = await cloudinary.uploader.upload(req.file.photo);

    const id = req.params.id; 

    // console.log("Before the update" + req.body.description);
    
    // ,{ image_id : newImage.public_id} , {image_url : newImage.url}

    Blog.updateOne({_id : id} , {$set : req.body} )
    .then(result =>{
        // console.log("after update" + req.body.description);

        // res.status(200).json({
        //     message : "Blog Update Successfully",
        //     result : result
        // });
        res.redirect('/blog/getallblog');
    }) .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })

    }
    // catch(err) {
    //     console.log('errrrrorrr');
    //     console.log(err);

    //     res.status(500).json({
    //         error : err
    //     })
    // }
// }

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