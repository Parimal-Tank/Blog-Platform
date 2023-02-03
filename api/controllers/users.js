const mongoose = require('mongoose');
const User = require('../models/userModel');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          res.status(409).json({
            message: "Already Hava a Account Using This Email , Try Another One",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log(hash);
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
  
                  res.status(201).json({
                    message: "User Created Successfully",
                  });
                })
                .catch((err) => {
                  console.log(err);
  
                  res.status(400).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }



// Admin Login

const login = (req, res , next) => {

    User.findOne({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(404).json({
                message : "Auth Fail"
            })
        }else{
            bcrypt.compare(req.body.password , user.password , (err , result)=> {


                if(err){
                 
                    res.status(401).json({
                        message : 'Auth Failed'
                    })
                }
                if(result){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            password : user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn : "1h"
                        }
                    ); 
                    
                    res.cookie("token" , token , {httpOnly : true }).send();
                  
                }else{
                 
                    res.status(400).json({
                        message : 'Auth Failed'
                    });
                }
            })
        }
    })
    .catch(err => {
      return res.status(400).send();
    })
}

//logout user
const logout = (req,res , next) => {

   try{
      res.clearCookie("token");


      res.render('login');

   }catch(err)
   {
    res.status(500).json({
        error : err
    })
   }
}

module.exports = {
    logout,
    login,
    signup
}