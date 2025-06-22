require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ВРЕМЕННОЕ РЕШЕНИЕ: Разрешаем все CORS-запросы для диагностики
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/courses', require('./routes/courses'));
app.use('/api/news', require('./routes/news'));
app.use(require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 