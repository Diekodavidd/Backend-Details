import { sendResetPassword } from '../utils/sendResetPassword.js';
import customerModel from '../models/customerModel.js';
import jwt from 'jsonwebtoken';

const userService = {
  // Method to generate reset link for the user
  async generateResetLink(email) {
    const user = await customerModel.findOne({ email });
    if (!user) throw new Error('User not found');
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    return `https://lyonmart.netlify.app/reset/${token}`;
  },

  // Method to send reset email
  async sendResetEmail(email, link) {
    await sendResetPassword(email, link); // Assume this method handles sending emails
  }
};

export default userService;
