const express = require('express');
const app = express();
const databaseConnect = require('./app');
const path = require('path');
const Category = require('./api/models/categoryModel');

const flash = require('connect-flash')
const session = require('express-session')

app.use(flash()); 

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});



// for logout fuctionality
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// app.use(cookieParser('secret'));

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
app.use(express.urlencoded({extended : true}));
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

// app.get('/login' , (req , res , next) => {

   

    // console.log(message);
  
    // req.flash('success', 'Welcome!!')
//     res.render('login');
// })

// app.get('/' , (req , res) => {
//      res.render('allblog');
// })

app.get('/' , (req , res) =>{
    // req.flash('success', 'Welcome!!');
    // res.redirect('/login');
    console.log(req.error);
  
    res.render('login')
})

app.get('/notification' , (req , res) =>{
    res.render('notification');
})

app.get('/account' , (req , res) =>{
    res.render('account');
})

app.get('/help' , (req , res) =>{
    res.render('help');
})

app.get('/reset-password' , (req , res) =>{
    res.render('reset-password');
})

app.get('/updateImage' , (req ,res) => {
    res.render('updateImage' , { blogId : req.query.id });
})

app.get('/addnewblog' , (req , res) =>{

    Category.find()
    .exec()
    .then( result => {
        const responce = {

            count : result.length,
            category : result.map(result => {
                return{
                    _id : result._id,
                    categorys : result.categorys
                }
            })
        }

        if(responce.count > 0){
            // res.status(200).json(responce);
            // console.log(responce.category);
            res.render('add-new-blog' , { category : responce.category })

        }else{
            res.status(505).json({
                message : "Not Any Category Available"
            })
        }
    })
    .catch(err => {
        res.status(505).json({
            error : err
        })
    })

    // res.render('add-new-blog');
})



app.get('/addnewcategory' , (req , res) =>{
    res.render('add-new-categories');
})

app.get('/updateblog' , (req , res) =>{
    res.render('update-blog' , {id : req.query.id});
})

app.get('/settings' , (req , res) =>{
    res.render('settings');
})

module.exports = app;