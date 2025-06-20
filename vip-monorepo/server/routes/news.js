const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');

// Получить все новости
router.get('/', async (req, res) => {
  const news = await News.find();
  res.json(news);
});

// Создать новость (только авторизованный)
router.post('/', auth, async (req, res) => {
  const newsItem = new News(req.body);
  await newsItem.save();
  res.json(newsItem);
});

// Обновить новость (только авторизованный)
router.put('/:id', auth, async (req, res) => {
  const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(newsItem);
});

// Удалить новость (только авторизованный)
router.delete('/:id', auth, async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router; 