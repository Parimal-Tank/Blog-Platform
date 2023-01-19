const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Admin Login

exports.user_login = (req, res , next) => {

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

                    // res.status(200).json({
                    //     message : 'Auth Successfull',
                    //     token : token
                    // });
                }else{
                    res.status(200).json({
                        message : 'Auth Failed'
                    });
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}

//logout user
exports.user_logout = (req,res , next) => {

   try{
      res.clearCookie("token");
    //   res.send({ success : true});

      res.status(200).json({
         message : "Logout Successfully"
      })
   }catch(err)
   {
    res.status(500).json({
        error : err
    })
   }
}
