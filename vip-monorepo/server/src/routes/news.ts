import { Router, Request, Response } from 'express';
import { News } from '../models/News';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Получить все новости
router.get('/', async (req: Request, res: Response) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить одну новость
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новость (только для админа)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
    return;
  }
  try {
    const { title, content, author, isActive } = req.body;
    const newsItem = new News({ title, content, author, isActive });
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновить новость (только для админа)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
    return;
  }
  try {
    const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!newsItem) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удалить новость (только для админа)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  if ((req as any).user?.role !== 'admin') {
    res.status(403).json({ message: 'Нет доступа' });
    return;
  }
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }
    res.json({ message: 'Новость удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router; 