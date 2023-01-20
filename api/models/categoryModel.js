const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

    Categorys : {
        type : String,
        require : true,
        unique : true
    }
})

module.express = mongoose.model('Category' , categorySchema);