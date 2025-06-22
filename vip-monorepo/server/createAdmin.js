require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('Ошибка: Переменная окружения MONGO_URI не установлена.');
  process.exit(1);
}

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB подключена для создания админа...');

    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Администратор уже существует.');
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
    console.log('Администратор успешно создан!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Пароль: password123`);

  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB соединение закрыто.');
  }
};

createAdmin(); 