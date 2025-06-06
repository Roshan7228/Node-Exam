const userModel = require("../Model/User.model");
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let ejs = require('ejs');
const sendMaill = require("../util/Mail");




let Usercontroller = {
    Signup: async (request, response) => {
        let { name, email, password, city, age } = request.body;
        if (!name || !email || !password || !city || !age) {
            return response.status(400).json({
                message: "Please fill the feilds"
            })
        }
        try {

            let isexits = await userModel.findOne({ email });
            if (isexits) {
                return response.status(400).json({
                    message: "User all ready register"
                })
            }
            let haspassword = await bcrypt.hash(password, 10);
            let usercreate = await userModel.create({
                name: name,
                email: email,
                password: haspassword,
                age: age,
                city: city
            })
            return response.status(201).json({
                message: "User Register successfully",
                usercreate
            })

        } catch (error) {
            return response.status(501).json({
                message: error.message
            })
        }

    },
    Signin: async (request, response) => {
        let { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                message: "Please Fill the feilds"
            })
        }
        try {
            let isexits = await userModel.findOne({ email });
            if (!isexits) {
                return response.status(400).json({
                    message: "please Signup first."
                })
            }

            let haspassword = await bcrypt.compare(password, isexits.password);
            if (!haspassword) {
                return response.status(400).json({
                    message: "Invalid Password"
                });
            }


            let token = jwt.sign({ isexits }, process.env.private_Key, { expiresIn: "7m" });

            if (!token) {
                return response.status(400).json({
                    message: "Token invaild"
                })
            }
            const htmltemplate = await ejs.renderFile(
                __dirname + "/../views/comfirmation.ejs",
            );
            await sendMaill(htmltemplate, isexits.email, "Confirmation message !");

            return response.cookie("Access_token", token).status(200).json({
                message: "user Login suceesfull",
                user: isexits
            })

        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }


    },
    Logout:async(request,response)=>{
        try {
            return response.clearCookie("Access_token").status(200).json({
                message:"user Logout"
            })
        } catch (error) {
            return response.status(500).json({
                message:error.message
            })
        }
    }
}


module.exports = Usercontroller