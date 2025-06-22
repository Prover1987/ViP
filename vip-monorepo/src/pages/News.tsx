import React from 'react';
import { useAuth } from '../auth/AuthenticationContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function News() {
  const { user } = useAuth();
  const [news, setNews] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(setNews);
  }, []);

  return (
    <div className="min-h-screen bg-floral-white py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-spruce-dark">Новости</h2>
        {user?.role === 'admin' && (
          <button className="mb-6 bg-opal-green text-floral-white px-4 py-2 rounded hover:bg-spruce-dark transition-colors font-semibold shadow">
            + Добавить новость
          </button>
        )}
        <div className="space-y-6">
          {news.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow p-6 border border-sea-green">
              <div className="font-bold text-xl text-spruce-dark mb-2">{item.title}</div>
              <div className="text-spruce-dark/90 text-base mb-2">{item.content}</div>
              <div className="text-xs text-spruce-dark/60">Автор: {item.author}</div>
              <div className="text-xs text-spruce-dark/60">Создана: {new Date(item.createdAt).toLocaleDateString()}</div>
              {!item.isActive && <div className="text-xs text-red-600 mt-2">Неактивна</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 