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
     image_id : {
            type : String,
            required : true
    },
    image_url : {
            type : String,
            required : true
    },
    slug : {
        type : String
    }
   },{
    timestamps : true
   }
   
   )

   module.exports = mongoose.model('Blog' , blogSchema);