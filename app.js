const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(){

    mongoose.connect(`mongodb+srv://root:${process.env.MONGO_ATLAS_PW}@blog-platform.j3txkcx.mongodb.net/blogDB` , () =>{

        console.log("Mongodb Connected Successfully");

    });
}

// MongoClient.connect( (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });
