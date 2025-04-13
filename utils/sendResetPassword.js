const nodemailer = require("nodemailer");

const sendResetPassword = async (email, resetLink) => {
  const html = `
    <html>
      <body style="background:#111111;color:#F5F5F5;padding:40px;text-align:center;font-family:sans-serif;">
           <h1 style="color:#D4AF37">Lyon Mart!</h1>
      <h2 style="color:#D4AF37">Reset Your Password</h2>
        <p style="color:#ccc">We received a request to reset your password. Click the button below to continue:</p>
        <a href="${resetLink}" style="display:inline-block;margin-top:20px;padding:10px 25px;background:#C14B4B;color:white;border-radius:6px;text-decoration:none;">Reset Password</a>
        <p style="margin-top:30px;font-size:0.9em;color:#aaa;">If you didn't request this, you can safely ignore it.</p>
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
    subject: "Reset Your Password",
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent");
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = sendResetPassword;
