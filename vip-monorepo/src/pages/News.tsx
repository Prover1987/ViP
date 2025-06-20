import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}

const News: React.FC = () => {
  const { user, token } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get<NewsItem[]>('/api/news', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setNews(res.data);
      } catch {
        setError('Ошибка загрузки новостей');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Новости</h1>
        {user?.role === 'admin' && (
          <button className="bg-opal-green text-floral-white px-4 py-2 rounded hover:bg-spruce-dark transition-colors">
            + Добавить новость
          </button>
        )}
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid gap-6 md:grid-cols-2">
        {news.map(item => (
          <div key={item._id} className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <div className="text-spruce-dark/80 mb-2">{item.content}</div>
            <div className="text-xs text-spruce-dark/60">Автор: {item.author}</div>
            <div className="text-xs text-spruce-dark/60">Создана: {new Date(item.createdAt).toLocaleDateString()}</div>
            {!item.isActive && <div className="text-xs text-red-600 mt-2">Неактивна</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News; 