let express=require("express");
require("dotenv").config();

let app=express();

app.use(express.json());



app.listen(process.env.PORT,async()=>{
    try {
         console.log(`Server runnig on ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})