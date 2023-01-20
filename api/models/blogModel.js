   const mongoose = require('mongoose');

   const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    imagePath : {
        type : String
    }
   })

   module.exports = mongoose.model('Blog' , blogSchema);