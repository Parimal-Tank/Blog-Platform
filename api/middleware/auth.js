const jwt = require('jsonwebtoken');

module.exports = (req , res , next)=>{

    try{
        const token = req.cookies.token;
        // console.log(token);
        // console.log("cookie data getting");
        const verifyUser = jwt.verify(token , process.env.JWT_KEY);
        // console.log(verifyUser);

        req.userData = verifyUser;
        next();
    }
    catch(error){
      
          res.redirect("/");
     
    }
}