import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { News } from '../types';

// Mock news data
const mockNews: News[] = [
  {
    id: '1',
    title: 'Новый курс по React',
    content: 'Мы рады представить новый курс по React, который поможет вам освоить современные практики разработки.',
    createdAt: '2024-03-17T10:00:00Z',
    author: {
      id: '1',
      fullName: 'Иван Иванов',
      position: 'Старший разработчик',
      department: 'IT',
      email: 'ivan@example.com',
      role: 'admin',
    },
  },
  {
    id: '2',
    title: 'Обновление платформы',
    content: 'Мы обновили нашу платформу обучения. Теперь она стала еще удобнее и функциональнее.',
    createdAt: '2024-03-16T15:30:00Z',
    author: {
      id: '1',
      fullName: 'Иван Иванов',
      position: 'Старший разработчик',
      department: 'IT',
      email: 'ivan@example.com',
      role: 'admin',
    },
  },
];

export default function Home() {
  const { user } = useAuth();
  const [news, setNews] = useState<News[]>(mockNews);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newsItem: News = {
      id: Date.now().toString(),
      title: newNews.title,
      content: newNews.content,
      createdAt: new Date().toISOString(),
      author: user!,
    };
    setNews([newsItem, ...news]);
    setNewNews({ title: '', content: '' });
    setIsAddingNews(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Новости</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => setIsAddingNews(true)}
            className="btn-primary"
          >
            Добавить новость
          </button>
        )}
      </div>

      {isAddingNews && (
        <div className="mb-8 card">
          <form onSubmit={handleAddNews}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Заголовок
                </label>
                <input
                  type="text"
                  id="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="mt-1 input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Содержание
                </label>
                <textarea
                  id="content"
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  rows={4}
                  className="mt-1 input-field"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingNews(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {news.map((item) => (
          <article key={item.id} className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{item.author.fullName}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 