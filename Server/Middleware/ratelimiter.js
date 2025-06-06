
const rateLimit = require("express-rate-limit");

const ratelimite = rateLimit({
    windowMs: 600000,
    max: 70,
    message:{
       message:"Too many request.try again after 10 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,

})


module.exports = ratelimite