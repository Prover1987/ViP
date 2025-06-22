require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createAdmin = require('./createAdmin');

const app = express();

// Разрешаем все CORS-запросы
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Проверяем/создаем админа при каждом запуске сервера
    createAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Все API-маршруты будут начинаться с /api
const apiRouter = express.Router();
apiRouter.use('/courses', require('./routes/courses'));
apiRouter.use('/news', require('./routes/news'));
apiRouter.use('/auth', require('./routes/auth'));

app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 