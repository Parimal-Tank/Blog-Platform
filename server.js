const express = require('express');
const app = express();
const databaseConnect = require('./app');
const path = require('path');

// for logout fuctionality
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// for storing the image in clounary
const fileUpload = require('express-fileupload');

// for storing image in the clounary
app.use(fileUpload({
    useTempFiles : true
}))

// for ejs 
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, './views'));
// app.set('views' , path.join(__dirname, './views/partials'));


//for static file
app.use('/public' , express.static('public'));

// for parsing the data
app.use(express.urlencoded({extended : false}));
app.use(express.json());

databaseConnect(app);

const userRoutes = require("./api/routes/usersRoutes");
const blogRoutes = require("./api/routes/blogsRoutes");
const categoryRoutes = require("./api/routes/categoryRoutes");


app.use('/user' , userRoutes);
app.use('/blog' , blogRoutes);
app.use('/category' , categoryRoutes);

app.listen(3000 , function(){
    console.log("Server Started.......3000");
})

app.get('/login' , (req , res) => {
    res.render('login');
})

// app.get('/' , (req , res) => {
//      res.render('allblog');
// })

app.get('/signup' , (req , res) =>{
    res.render('signup');
})

app.get('/notification' , (req , res) =>{
    res.render('notification');
})

app.get('/account' , (req , res) =>{
    res.render('account');
})


app.get('/allblog' , (req , res) =>{
    res.render('allblog');
})


app.get('/addnewcategory' , (req , res) =>{
    res.render('add-new-categories');
})

app.get('/addnewblog' , (req , res) =>{
    res.render('add-new-blog');
})

app.get('/settings' , (req , res) =>{
    res.render('settings');
})


app.get('/allcategory' , (req , res) =>{
    res.render('all-categories');
})

module.exports = app;