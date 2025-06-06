const nodemailer = require("nodemailer");
require("dotenv").config();

let sendMaill = async (htmltemplate,email,subject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.services,
            auth: {
                user: process.env.company_Email,
                pass: process.env.gmailpassword,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.company_Email,
            to: email,
            subject:subject,
            html: htmltemplate, 
        });
    } catch (error) {
        console.log(error)
    }

}

module.exports=sendMaill;