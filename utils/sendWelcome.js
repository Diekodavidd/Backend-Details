const nodemailer = require("nodemailer");
dotenv = require("dotenv").config();

const sendWelcome = async (email, firstname) => {
  const html = `
    <html>
      <body style="background:#0B0C2A;color:#F5F5F5;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;padding:50px;text-align:center">
        <h1 style="color:#D4AF37">Welcome to Lyon Mart, ${firstname}!</h1>
        <p style="color:#ccc;font-size:1.1em">
          We're thrilled to have you here. Explore, connect, and experience the uniqueness we bring to the digital world of sales.
        </p>
        <a href="https://lyonmart.netlify.app" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#1F3B73;color:white;border-radius:5px;text-decoration:none;">Visit Lyon Mart</a>
      </body>
    </html>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    }
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Welcome to Lyon Mart",
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent");
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = sendWelcome;
