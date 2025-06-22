require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash('password123', 12);
    const admin = new User({
      fullName: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      department: 'Administration',
      position: 'Administrator'
    });

    await admin.save();
    console.log('Administrator successfully created!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: password123`);

  } catch (error) {
    console.error('Error during admin user creation:', error);
  }
};

module.exports = createAdmin; 