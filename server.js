const express = require('express');
const app = express();
const databaseConnect = require('./app');

// for logout fuctionality
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// for storing the image in clounary
const fileUpload = require('express-fileupload');

// for storing image in the clounary
app.use(fileUpload({
    useTempFiles : true
}))

app.use(express.urlencoded({extended : false}));
app.use(express.json());

databaseConnect(app);

const userRoutes = require("./api/routes/usersRoutes");
const blogRoutes = require("./api/routes/blogsRoutes");


app.use('/user' , userRoutes);
app.use('/blog' , blogRoutes);


app.listen(3000 , function(){
    console.log("Server Started.......3000");
})

module.exports = app;