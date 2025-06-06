let express=require("express");
const connections = require("./Config/db");
const UserRoutes = require("./Routes/User.routes");
require("dotenv").config();
const cookieParser = require('cookie-parser')

let app=express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/users",UserRoutes);


app.listen(process.env.PORT,async()=>{
    try {
        await connections;
         console.log(`Server runnig on ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})