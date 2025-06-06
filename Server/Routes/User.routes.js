let express = require("express");

const Usercontroller = require("../Controller/User.controller");
const ratelimite = require("../Middleware/ratelimiter");


let UserRoutes = express.Router();


UserRoutes.post("/register", ratelimite, Usercontroller.Signup);
UserRoutes.post("/login", ratelimite, Usercontroller.Signin);
UserRoutes.get("/logout", Usercontroller.Logout);



module.exports = UserRoutes;