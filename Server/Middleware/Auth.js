let jwt = require('jsonwebtoken');
require("dotenv").config();

let isAuth=(request,response,next)=>{
   try {
   let token=request.cookies.Access_token  
  if(!token){
    return response.status(400).json({
        message:"invaild token "
    })
  }
  let decoded = jwt.verify(token, process.env.private_Key);
  request.Users=decoded.isexits
   next();
   } catch (error) {
     return response.status(500).json({
        message:error.message
     })
   }

}


module.exports=isAuth;