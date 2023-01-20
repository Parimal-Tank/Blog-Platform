const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dt39lgelf', 
    api_key: '338396821511569', 
    api_secret: 'OfPZG6rYZqY94qFbPhu2-Ta2qgQ' 
});


const addBlogDetails = async (req , res , next) =>{


    const file = await req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    console.log(result);
    console.log("Data Getting");
    const blog = new Blog({
        title : req.body.title,
        category : req.body.category,
        description : req.body.description,
        imagePath : result.url
    })
   
    blog.save()
    .then(result => {
    
        res.status(200).json({
             message: "Blog Created Successfully",
            createdBlog: blog
        })
    })
    .catch(err =>{
        res.status(500).json({
            message : err
        })
    })
}





// const getBlogDetails = (req , res , next) => {

//     Blog.find()
//     .exec()
//     .then(result => {
         
//             const responce = {
//                 blogs : result.map(result => {
//                     return{
//                         title : result.title,
//                         category : result.category,
//                         description : result.description
//                     }
//                 })
//             }

//             res.status(200).json({

//             })
//     })
//     .catch()
// }


module.exports = {
    // getBlogDetails
    addBlogDetails

}