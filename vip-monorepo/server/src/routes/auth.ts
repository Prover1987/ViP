import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Регистрация
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, department, position } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Пользователь уже существует' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      department,
      position,
      role: 'user',
    });
    await user.save();
    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Вход
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Неверный email или пароль' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Неверный email или пароль' });
      return;
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { fullName: user.fullName, email: user.email, role: user.role, department: user.department, position: user.position } });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Профиль (только для авторизованных)
router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Нет доступа' });
    return;
  }
  User.findById(userId).select('-password')
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
        return;
      }
      res.json(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'Ошибка сервера' });
    });
});

export default router; 