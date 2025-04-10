import { sendWelcome } from '../utils/sendWelcome.js';
import { sendResetPassword } from '../utils/sendResetPassword.js';
import customerModel from '../models/customerModel.js';
import jwt from 'jsonwebtoken';

const userService = {
  async createUser(data) {
    // your user creation logic
    const newCustomer = await customerModel.create(data);
    return newCustomer;
  },

  async sendWelcomeEmail(user) {
    await sendWelcome(user.email, user.firstname);
  },

  async generateResetLink(email) {
    const user = await customerModel.findOne({ email });
    if (!user) throw new Error('User not found');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return `https://lyonmart.netlify.app/reset/${token}`;
  },

  async sendResetEmail(email, link) {
    await sendResetPassword(email, link);
  }
};

export default userService;
