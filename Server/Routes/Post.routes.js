let express = require("express");
const postcontroll = require("../Controller/Post.controller");
const isAuth = require("../Middleware/Auth");
const ratelimite = require("../Middleware/ratelimiter");




let postroutes = express.Router();


postroutes.post("/add/:userId", isAuth,ratelimite, postcontroll.adds);
postroutes.get("/get/:userId", isAuth, postcontroll.allpost);
postroutes.patch("/update/:userId/:id", isAuth, postcontroll.updatepost);
postroutes.delete("/deletes/:userId/:id", isAuth, postcontroll.Deletpost);

module.exports = postroutes;