const nodemailer = require("nodemailer")


const sendmail=(email,firstname)=>{
     const transporter =  nodemailer.createTransport({
                auth:{
                    user:"adiekodavid@gmail.com",
                    pass:""
                },
                service:"gmail"
            })
}