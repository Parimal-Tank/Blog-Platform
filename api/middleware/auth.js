const jwt = require('jsonwebtoken');

module.exports = (req , res , next)=>{

    try{
        const token = req.cookies.token;
    
        // Verifie the user
        const verifyUser = jwt.verify(token , process.env.JWT_KEY);
        req.userData = verifyUser;
        next();
    }
    catch(error){
      
          res.redirect("/");
     
    }
}