const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Получить все курсы
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Создать курс (только авторизованный)
router.post('/', auth, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// Обновить курс (только авторизованный)
router.put('/:id', auth, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
});

// Удалить курс (только авторизованный)
router.delete('/:id', auth, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router; 