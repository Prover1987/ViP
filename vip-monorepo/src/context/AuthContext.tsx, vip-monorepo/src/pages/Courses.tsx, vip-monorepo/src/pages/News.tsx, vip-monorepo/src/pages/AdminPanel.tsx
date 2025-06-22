import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Устанавливаем базовый URL для всех запросов axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

interface User {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get<User>('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post<{ token: string; user: User }>('/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return { token, loading };
};

interface Course {
  const [error, setError] = useState('');
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    setError('');
    axios.get<Course[]>('/api/courses', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setCourses(res.data))
      .catch(err => {
        console.error('Error fetching courses:', err);
        setError('Error fetching courses');
      })
      .finally(() => setLoading(false));
  };

  const fetchNews = () => {
    setLoading(true);
    setError('');
    axios.get<NewsItem[]>('/api/news', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setNews(res.data))
      .catch(err => {
        console.error('Error fetching news:', err);
        setError('Error fetching news');
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Удалить курс?')) return;
    try {
      await axios.delete(`/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setCourses(courses => courses.filter(c => c._id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Error deleting course');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('Удалить новость?')) return;
    try {
      await axios.delete(`/api/news/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setNews(news => news.filter(n => n._id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
      setError('Error deleting news');
    }
  };

  const handleCourseForm = async (courseForm: Course, editingCourse?: Course) => {
    try {
      if (editingCourse) {
        const res = await axios.put(`/api/courses/${editingCourse._id}`, courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => courses.map((c: Course) => c._id === editingCourse._id ? res.data as Course : c));
      } else {
        const res = await axios.post('/api/courses', courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => [...courses, res.data as Course]);
      }
    } catch (err) {
      console.error('Error handling course form:', err);
      setError('Error handling course form');
    }
  };

  const handleNewsForm = async (newsForm: NewsItem, editingNews?: NewsItem) => {
    try {
      if (editingNews) {
        const res = await axios.put(`/api/news/${editingNews._id}`, newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => news.map((n: NewsItem) => n._id === editingNews._id ? res.data as NewsItem : n));
      } else {
        const res = await axios.post('/api/news', newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => [...news, res.data as NewsItem]);
      }
    } catch (err) {
      console.error('Error handling news form:', err);
      setError('Error handling news form');
    }
  };

  return { courses, news, error, loading, fetchCourses, fetchNews, handleDeleteCourse, handleDeleteNews, handleCourseForm, handleNewsForm };
};

interface NewsItem {
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news');
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  return { news };
};

interface AdminPanel {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [courseForm, setCourseForm] = useState<Course>({});
  const [newsForm, setNewsForm] = useState<NewsItem>({});

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm(course);
  };

  const handleEditNews = (news: NewsItem) => {
    setEditingNews(news);
    setNewsForm(news);
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setEditingNews(null);
  };

  return { editingCourse, editingNews, courseForm, newsForm, handleEditCourse, handleEditNews, handleCancel };
}

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const { token, loading, login } = useAuth();

  return (
    <AuthContext.Provider value={{ token, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider }; 