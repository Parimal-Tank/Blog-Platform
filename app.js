const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(){

    mongoose.connect(`mongodb://parimalta:002fAR367LnXiXRNGYyX6y0X@15.206.7.200:28017/parimalta?authSource=admin&readPreference=primary&directConnection=true&ssl=false` , () =>{

        console.log("Mongodb Connected Successfully");

    });


    // mongoose.connect(`mongodb+srv://root:root@blog-platform.j3txkcx.mongodb.net/blogDB` , () => {
    //     console.log("Mongodb Connected Successfully");
    // })

}