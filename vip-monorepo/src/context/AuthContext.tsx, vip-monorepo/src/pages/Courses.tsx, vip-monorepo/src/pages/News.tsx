import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Создаем отдельный экземпляр axios для API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

interface User {
  // ... existing code ...
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.get<User>('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      // ... existing code ...
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      // ... existing code ...
    } catch (err) {
      // ... existing code ...
    } finally {
      setLoading(false);
    }
  };

  // ... existing code ...
  // ... existing code ...
}

const [courses, setCourses] = useState<Course[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const { token, user } = useAuth();

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      setError('Не удалось загрузить курсы');
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);

if (loading) return <div className="text-center py-10">Загрузка...</div>;
// ... existing code ...
// ... existing code ...

const [news, setNews] = useState<NewsItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await axios.get('/api/news');
      setNews(res.data);
    } catch (err) {
      setError('Не удалось загрузить новости');
    } finally {
      setLoading(false);
    }
  };
  fetchNews();
}, []);

if (loading) return <div className="text-center py-10">Загрузка...</div>;
// ... existing code ... 