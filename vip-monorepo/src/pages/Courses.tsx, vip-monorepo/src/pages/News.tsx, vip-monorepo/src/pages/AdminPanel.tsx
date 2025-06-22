import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

interface Course {
  const [error, setError] = useState('');
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        setError('Ошибка при загрузке курсов');
      }
    };

    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    setError('');
    api.get<Course[]>('/api/courses', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setCourses(res.data))
      .catch(() => setError('Ошибка при загрузке курсов'))
      .finally(() => setLoading(false));
  };

  const fetchNews = () => {
    setLoading(true);
    setError('');
    api.get<NewsItem[]>('/api/news', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setNews(res.data))
      .catch(() => setError('Ошибка при загрузке новостей'))
      .finally(() => setLoading(false));
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Удалить курс?')) return;
    try {
      await api.delete(`/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setCourses(courses => courses.filter(c => c._id !== id));
    } catch (err) {
      setError('Ошибка при удалении курса');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('Удалить новость?')) return;
    try {
      await api.delete(`/api/news/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setNews(news => news.filter(n => n._id !== id));
    } catch (err) {
      setError('Ошибка при удалении новости');
    }
  };

  const handleCourseForm = async (courseForm: CourseForm) => {
    try {
      if (editingCourse) {
        const res = await api.put(`/api/courses/${editingCourse._id}`, courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => courses.map((c: Course) => c._id === editingCourse._id ? res.data as Course : c));
      } else {
        const res = await api.post('/api/courses', courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => [...courses, res.data as Course]);
      }
    } catch (err) {
      setError('Ошибка при сохранении курса');
    }
  };

  const handleNewsForm = async (newsForm: NewsForm) => {
    try {
      if (editingNews) {
        const res = await api.put(`/api/news/${editingNews._id}`, newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => news.map((n: NewsItem) => n._id === editingNews._id ? res.data as NewsItem : n));
      } else {
        const res = await api.post('/api/news', newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => [...news, res.data as NewsItem]);
      }
    } catch (err) {
      setError('Ошибка при сохранении новости');
    }
  };
} 