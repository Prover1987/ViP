const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const email = 'admin'; // Измени на нужный email
const password = 'admin';       // Измени на нужный пароль

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const hash = await bcrypt.hash(password, 10);
    await User.deleteMany({ email }); // удалить старого, если есть
    await User.create({ email, password: hash });
    console.log('Админ создан!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  }); 