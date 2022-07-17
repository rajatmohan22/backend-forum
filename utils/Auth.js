const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req,res,next)=>{
   if(req.user){
    
    return next();
   }
   console.log(req.user)
   throw("Oops")
        
}