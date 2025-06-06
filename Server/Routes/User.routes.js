let express=require("express");
const Usercontroller = require("../Controller/User.controller");


let UserRoutes=express.Router();


UserRoutes.post("/register",Usercontroller.Signup);
UserRoutes.post("/login",Usercontroller.Signin);
UserRoutes.get("/logout",Usercontroller.Logout);



module.exports=UserRoutes;