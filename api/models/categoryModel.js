const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    categorys : {
        type : String,
        require : true,
        unique : true
    }
})

module.exports = mongoose.model('Category' , categorySchema);