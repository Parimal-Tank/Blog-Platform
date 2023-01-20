const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    email : {
        type: String,
        require : true,
        unique : true ,
        match : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('Admin' , adminSchema);