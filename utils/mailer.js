const nodemailer = require("nodemailer")


const sendmail = async (email, firstname) => {
    const messageTemplate = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to [App Name]!</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #0B0C2A;
      color: #F5F5F5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      flex-direction: column;
      text-align: center;
    }
    h1 {
      font-size: 3em;
      color: #D4AF37;
      margin-bottom: 0.5em;
    }
    p {
      font-size: 1.2em;
      color: #ccc;
      max-width: 600px;
      margin: 0 auto;
    }
    .btn {
      margin-top: 30px;
      padding: 10px 25px;
      font-size: 1em;
      background-color: #1F3B73;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .btn:hover {
      background-color: #C14B4B;
    }
  </style>
</head>
<body>
  <h1>Welcome to Lyon Mart,${firstname}!</h1>
  <p>We're thrilled to have you here. Explore, connect, and experience the uniqueness we bring to the digital world of sales.</p>
</body>
</html>


      `


    const transporter = nodemailer.createTransport({
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        },
        service: "gmail"
    })

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Welcome to Lyon Mart",
        html: messageTemplate
    }

    try {
        const sent = await transporter.sendMail(mailOptions)
        if (sent) {
            console.log("message sent");
        }
    } catch (error) {
        console.log(error);

    }
}

module.exports = sendmail