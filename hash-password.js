const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./model/Admi'); // ✅ fixed this line

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const username = 'Diekodavid';
  const plainPassword = '12345678dj';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('⚠️ Admin already exists');
    mongoose.disconnect();
    return;
  }

  await Admin.create({ username, password: hashedPassword });
  console.log('✅ Admin created');
  mongoose.disconnect();
};

createAdmin();
