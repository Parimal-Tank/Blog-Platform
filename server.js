const express = require('express');
const app = express();
const databaseConnect = require('./app');

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({extended : false}));
app.use(express.json());

databaseConnect(app);

const userRoutes = require("./api/routes/users");


app.use('/user' , userRoutes);

app.listen(3000 , function(){
    console.log("Server Started.......3000");
})

module.exports = app;