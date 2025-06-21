import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

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

  const fetchCourses = () => {
    setLoading(true);
    setError('');
    axios.get<Course[]>('/api/courses', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setCourses(res.data))
      .catch(() => setError('Ошибка загрузки курсов'))
      .then(() => setLoading(false));
  };
  
  const fetchNews = () => {
    setLoading(true);
    setError('');
    axios.get<NewsItem[]>('/api/news', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(res => setNews(res.data))
      .catch(() => setError('Ошибка загрузки новостей'))
      .then(() => setLoading(false));
  };

  // Fetch data
  useEffect(() => {
    if (tab === 'courses') {
      fetchCourses();
    }
    if (tab === 'news') {
      fetchNews();
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
    <div className="p-6 md:p-10 bg-floral-white min-h-full">
      <h1 className="text-3xl font-bold text-spruce-dark mb-4">Административная панель</h1>
      <p className="mb-8 text-spruce-dark/80">Здесь вы можете управлять курсами, новостями и другими разделами портала.</p>

      {/* Табы */}
      <div className="flex border-b border-sea-green/30 mb-8">
        <button
          className={`px-4 py-3 -mb-px border-b-2 font-semibold transition-colors ${tab === 'courses' ? 'text-opal-green border-opal-green' : 'text-spruce-dark/70 border-transparent hover:text-spruce-dark'}`}
          onClick={() => setTab('courses')}
        >
          Курсы
        </button>
        <button
          className={`px-4 py-3 -mb-px border-b-2 font-semibold transition-colors ${tab === 'news' ? 'text-opal-green border-opal-green' : 'text-spruce-dark/70 border-transparent hover:text-spruce-dark'}`}
          onClick={() => setTab('news')}
        >
          Новости
        </button>
      </div>

      {/* Контент */}
      {loading && <div className="text-center py-10">Загрузка...</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      
      {tab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-spruce-dark">Управление курсами</h2>
            <button onClick={openAddCourse} className="flex items-center gap-2 bg-opal-green text-floral-white px-4 py-2 rounded-lg shadow hover:bg-spruce-dark transition-colors font-semibold">
              <PlusIcon className="h-5 w-5" />
              Добавить курс
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {courses.map(course => (
                <li key={course._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-spruce-dark">{course.title}</p>
                        {!course.isActive && <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Неактивен</span>}
                      </div>
                      <p className="text-spruce-dark/80 text-sm mt-1">{course.description}</p>
                      <div className="text-xs text-spruce-dark/60 mt-2">Автор: {course.author} | Создан: {new Date(course.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => openEditCourse(course)} className="p-2 text-spruce-dark/70 hover:text-opal-green transition-colors"><PencilIcon className="h-5 w-5" /></button>
                      <button onClick={() => handleDeleteCourse(course._id)} className="p-2 text-spruce-dark/70 hover:text-red-600 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Модалка для курса */}
          {showCourseModal && (
            <Modal onClose={() => setShowCourseModal(false)}>
              <form onSubmit={handleCourseFormSubmit} className="p-6">
                <h3 className="text-xl font-bold text-spruce-dark mb-4">{editingCourse ? 'Редактировать курс' : 'Добавить курс'}</h3>
                <div className="space-y-4">
                  <input name="title" value={courseForm.title} onChange={handleCourseFormChange} placeholder="Название" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" />
                  <textarea name="description" value={courseForm.description} onChange={handleCourseFormChange} placeholder="Описание" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" rows={4} />
                  <input name="author" value={courseForm.author} onChange={handleCourseFormChange} placeholder="Автор" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" />
                  <label className="flex items-center gap-2 text-spruce-dark"><input type="checkbox" name="isActive" checked={courseForm.isActive} onChange={handleCourseFormChange} className="h-4 w-4 rounded text-opal-green focus:ring-opal-green" /> Активен</label>
                </div>
                {courseFormError && <div className="text-red-600 mt-4">{courseFormError}</div>}
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-semibold">Отмена</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-opal-green text-floral-white hover:bg-spruce-dark transition-colors font-semibold">Сохранить</button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}
      {tab === 'news' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-spruce-dark">Управление новостями</h2>
            <button onClick={openAddNews} className="flex items-center gap-2 bg-opal-green text-floral-white px-4 py-2 rounded-lg shadow hover:bg-spruce-dark transition-colors font-semibold">
              <PlusIcon className="h-5 w-5" />
              Добавить новость
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {news.map(item => (
                <li key={item._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-spruce-dark">{item.title}</p>
                        {!item.isActive && <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Неактивна</span>}
                      </div>
                      <div className="text-xs text-spruce-dark/60 mt-2">Автор: {item.author} | Создана: {new Date(item.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => openEditNews(item)} className="p-2 text-spruce-dark/70 hover:text-opal-green transition-colors"><PencilIcon className="h-5 w-5" /></button>
                      <button onClick={() => handleDeleteNews(item._id)} className="p-2 text-spruce-dark/70 hover:text-red-600 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Модалка для новостей */}
          {showNewsModal && (
            <Modal onClose={() => setShowNewsModal(false)}>
              <form onSubmit={handleNewsFormSubmit} className="p-6">
                <h3 className="text-xl font-bold text-spruce-dark mb-4">{editingNews ? 'Редактировать новость' : 'Добавить новость'}</h3>
                <div className="space-y-4">
                  <input name="title" value={newsForm.title} onChange={handleNewsFormChange} placeholder="Заголовок" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" />
                  <textarea name="content" value={newsForm.content} onChange={handleNewsFormChange} placeholder="Содержание" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" rows={6} />
                  <input name="author" value={newsForm.author} onChange={handleNewsFormChange} placeholder="Автор" className="w-full border-sea-green/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green" />
                  <label className="flex items-center gap-2 text-spruce-dark"><input type="checkbox" name="isActive" checked={newsForm.isActive} onChange={handleNewsFormChange} className="h-4 w-4 rounded text-opal-green focus:ring-opal-green" /> Активна</label>
                </div>
                {newsFormError && <div className="text-red-600 mt-4">{newsFormError}</div>}
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={() => setShowNewsModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-semibold">Отмена</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-opal-green text-floral-white hover:bg-spruce-dark transition-colors font-semibold">Сохранить</button>
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