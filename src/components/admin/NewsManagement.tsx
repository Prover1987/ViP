import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image?: string;
}

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([]);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const handleAddNews = () => {
    setIsAddingNews(true);
  };

  const handleEditNews = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsEditingNews(true);
  };

  const handleDeleteNews = (newsId: string) => {
    // Здесь будет логика удаления новости
    setNews(news.filter(item => item.id !== newsId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Управление новостями</h2>
        <button
          onClick={handleAddNews}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Добавить новость
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {news.map((newsItem) => (
            <li key={newsItem.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {newsItem.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <p>
                        Автор: {newsItem.author} • {newsItem.date}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {newsItem.content}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditNews(newsItem)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PencilIcon className="-ml-1 mr-1 h-4 w-4" />
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteNews(newsItem.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="-ml-1 mr-1 h-4 w-4" />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Модальные окна для добавления и редактирования новостей будут добавлены позже */}
    </div>
  );
} 