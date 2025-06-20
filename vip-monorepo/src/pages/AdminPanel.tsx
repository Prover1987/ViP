import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

interface Course {
  _id: string;
  title: string;
  description: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}
interface NewsItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const { user, token } = useAuth();
  const [tab, setTab] = useState<'courses' | 'news'>('courses');
  const [courses, setCourses] = useState<Course[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', author: '', isActive: true });
  const [courseFormError, setCourseFormError] = useState('');

  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', author: '', isActive: true });
  const [newsFormError, setNewsFormError] = useState('');

  // Fetch courses
  useEffect(() => {
    if (tab === 'courses') {
      setLoading(true);
      setError('');
      axios.get<Course[]>('/api/courses', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
        .then(res => setCourses(res.data))
        .catch(() => setError('Ошибка загрузки курсов'))
        .then(() => setLoading(false));
    }
    if (tab === 'news') {
      setLoading(true);
      setError('');
      axios.get<NewsItem[]>('/api/news', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
        .then(res => setNews(res.data))
        .catch(() => setError('Ошибка загрузки новостей'))
        .then(() => setLoading(false));
    }
  }, [tab, token]);

  // Удаление курса
  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Удалить курс?')) return;
    try {
      await axios.delete(`/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setCourses(courses => courses.filter(c => c._id !== id));
    } catch {
      alert('Ошибка удаления курса');
    }
  };

  // Удаление новости
  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('Удалить новость?')) return;
    try {
      await axios.delete(`/api/news/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setNews(news => news.filter(n => n._id !== id));
    } catch {
      alert('Ошибка удаления новости');
    }
  };

  // CRUD handlers for courses
  const openAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({ title: '', description: '', author: '', isActive: true });
    setCourseFormError('');
    setShowCourseModal(true);
  };
  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      author: course.author,
      isActive: course.isActive,
    });
    setCourseFormError('');
    setShowCourseModal(true);
  };
  const handleCourseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCourseForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };
  const handleCourseFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      setCourseFormError('Заполните все поля');
      return;
    }
    try {
      if (editingCourse) {
        const res = await axios.put(`/api/courses/${editingCourse._id}`, courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => courses.map((c: Course) => c._id === editingCourse._id ? res.data as Course : c));
      } else {
        const res = await axios.post('/api/courses', courseForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setCourses(courses => [...courses, res.data as Course]);
      }
      setShowCourseModal(false);
    } catch {
      setCourseFormError('Ошибка сохранения');
    }
  };

  // CRUD handlers for news
  const openAddNews = () => {
    setEditingNews(null);
    setNewsForm({ title: '', content: '', author: '', isActive: true });
    setNewsFormError('');
    setShowNewsModal(true);
  };
  const openEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      content: item.content,
      author: item.author,
      isActive: item.isActive,
    });
    setNewsFormError('');
    setShowNewsModal(true);
  };
  const handleNewsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setNewsForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };
  const handleNewsFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      setNewsFormError('Заполните все поля');
      return;
    }
    try {
      if (editingNews) {
        const res = await axios.put(`/api/news/${editingNews._id}`, newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => news.map((n: NewsItem) => n._id === editingNews._id ? res.data as NewsItem : n));
      } else {
        const res = await axios.post('/api/news', newsForm, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
        setNews(news => [...news, res.data as NewsItem]);
      }
      setShowNewsModal(false);
    } catch {
      setNewsFormError('Ошибка сохранения');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Административная панель</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${tab === 'courses' ? 'bg-opal-green text-floral-white' : 'bg-gray-200 text-spruce-dark'}`}
          onClick={() => setTab('courses')}
        >
          Курсы
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'news' ? 'bg-opal-green text-floral-white' : 'bg-gray-200 text-spruce-dark'}`}
          onClick={() => setTab('news')}
        >
          Новости
        </button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {tab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Управление курсами</h2>
            <button onClick={openAddCourse} className="bg-opal-green text-floral-white px-4 py-2 rounded hover:bg-spruce-dark transition-colors">
              + Добавить курс
            </button>
          </div>
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course._id} className="bg-white rounded shadow p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{course.title}</div>
                  <div className="text-spruce-dark/80 text-sm">{course.description}</div>
                  <div className="text-xs text-spruce-dark/60">Автор: {course.author}</div>
                  <div className="text-xs text-spruce-dark/60">Создан: {new Date(course.createdAt).toLocaleDateString()}</div>
                  {!course.isActive && <div className="text-xs text-red-600 mt-2">Неактивен</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditCourse(course)} className="bg-spruce-dark text-floral-white px-3 py-1 rounded hover:bg-opal-green transition-colors">Редактировать</button>
                  <button onClick={() => handleDeleteCourse(course._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">Удалить</button>
                </div>
              </div>
            ))}
          </div>
          {/* Модалка для курса */}
          {showCourseModal && (
            <Modal onClose={() => setShowCourseModal(false)}>
              <form onSubmit={handleCourseFormSubmit} className="space-y-4 p-4">
                <h3 className="text-lg font-bold mb-2">{editingCourse ? 'Редактировать курс' : 'Добавить курс'}</h3>
                <input name="title" value={courseForm.title} onChange={handleCourseFormChange} placeholder="Название" className="w-full border rounded px-2 py-1" />
                <textarea name="description" value={courseForm.description} onChange={handleCourseFormChange} placeholder="Описание" className="w-full border rounded px-2 py-1" />
                <input name="author" value={courseForm.author} onChange={handleCourseFormChange} placeholder="Автор" className="w-full border rounded px-2 py-1" />
                <label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={courseForm.isActive} onChange={handleCourseFormChange} /> Активен</label>
                {courseFormError && <div className="text-red-600">{courseFormError}</div>}
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 rounded bg-gray-200">Отмена</button>
                  <button type="submit" className="px-4 py-2 rounded bg-opal-green text-floral-white">Сохранить</button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}
      {tab === 'news' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Управление новостями</h2>
            <button onClick={openAddNews} className="bg-opal-green text-floral-white px-4 py-2 rounded hover:bg-spruce-dark transition-colors">
              + Добавить новость
            </button>
          </div>
          <div className="space-y-4">
            {news.map(item => (
              <div key={item._id} className="bg-white rounded shadow p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-spruce-dark/80 text-sm">{item.content}</div>
                  <div className="text-xs text-spruce-dark/60">Автор: {item.author}</div>
                  <div className="text-xs text-spruce-dark/60">Создана: {new Date(item.createdAt).toLocaleDateString()}</div>
                  {!item.isActive && <div className="text-xs text-red-600 mt-2">Неактивна</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditNews(item)} className="bg-spruce-dark text-floral-white px-3 py-1 rounded hover:bg-opal-green transition-colors">Редактировать</button>
                  <button onClick={() => handleDeleteNews(item._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">Удалить</button>
                </div>
              </div>
            ))}
          </div>
          {/* Модалка для новости */}
          {showNewsModal && (
            <Modal onClose={() => setShowNewsModal(false)}>
              <form onSubmit={handleNewsFormSubmit} className="space-y-4 p-4">
                <h3 className="text-lg font-bold mb-2">{editingNews ? 'Редактировать новость' : 'Добавить новость'}</h3>
                <input name="title" value={newsForm.title} onChange={handleNewsFormChange} placeholder="Заголовок" className="w-full border rounded px-2 py-1" />
                <textarea name="content" value={newsForm.content} onChange={handleNewsFormChange} placeholder="Текст новости" className="w-full border rounded px-2 py-1" />
                <input name="author" value={newsForm.author} onChange={handleNewsFormChange} placeholder="Автор" className="w-full border rounded px-2 py-1" />
                <label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={newsForm.isActive} onChange={handleNewsFormChange} /> Активна</label>
                {newsFormError && <div className="text-red-600">{newsFormError}</div>}
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowNewsModal(false)} className="px-4 py-2 rounded bg-gray-200">Отмена</button>
                  <button type="submit" className="px-4 py-2 rounded bg-opal-green text-floral-white">Сохранить</button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 