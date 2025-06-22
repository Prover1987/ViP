require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Настройка CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Разрешаем запросы с localhost и всех поддоменов onrender.com
    if (!origin || origin.startsWith('http://localhost') || /onrender\.com$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/courses', require('./routes/courses'));
app.use('/api/news', require('./routes/news'));
app.use(require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 