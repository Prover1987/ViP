import { Router, Request, Response } from 'express';
import { Course } from '../models/Course';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Получить все курсы
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить один курс
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Курс не найден' });
    } else {
      res.json(course);
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать курс (только для админа)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
  } else {
    try {
      const { title, description, author, isActive } = req.body;
      const course = new Course({ title, description, author, isActive });
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
});

// Обновить курс (только для админа)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
  } else {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) {
        res.status(404).json({ message: 'Курс не найден' });
      } else {
        res.json(course);
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
});

// Удалить курс (только для админа)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
  } else {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        res.status(404).json({ message: 'Курс не найден' });
      } else {
        res.json({ message: 'Курс удалён' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
});

export default router; 