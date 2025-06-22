import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Настраиваем базовый URL для всех запросов axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// --- ИНТЕРФЕЙСЫ ---
interface User {
  fullName: string;
  email: string;
  role: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// --- КОНТЕКСТ ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- ПРОВАЙДЕР ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Начинаем с true для проверки токена

  // Проверка токена при первоначальной загрузке
  useEffect(() => {
    if (token) {
      axios.get<User>('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setUser(res.data))
        .catch(() => {
          // Если токен невалидный, выходим из системы
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        })
        .then(() => setLoading(false));
    } else {
      setLoading(false); // Токена нет, просто прекращаем загрузку
    }
  }, [token]);

  // Функция входа
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post<{ token: string; user: User }>('/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      // Пробрасываем ошибку дальше, чтобы компонент Login мог ее обработать
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Функция выхода
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Не рендерим дочерние элементы, пока идет проверка токена
  if (loading) {
    return <div>Загрузка аутентификации...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- ХУК ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 