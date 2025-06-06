let mongooes=require("mongoose");
require("dotenv").config();

let connections=mongooes.connect(process.env.mongodb_URL);

module.exports=connections;