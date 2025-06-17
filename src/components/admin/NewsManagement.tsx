import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([
    {
      id: '1',
      title: 'Новый курс по React',
      content: 'Мы рады представить новый курс по разработке на React',
      author: 'Администратор',
      date: '2024-03-15',
    },
  ]);

  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const handleAddNews = () => {
    setIsAddingNews(true);
  };

  const handleEditNews = (news: News) => {
    setSelectedNews(news);
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
          {news.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{item.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{item.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PencilIcon className="-ml-1 mr-1 h-4 w-4" />
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
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

      {isAddingNews && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Добавить новую новость</h3>
            {/* Форма добавления новости */}
          </div>
        </div>
      )}

      {isEditingNews && selectedNews && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Редактировать новость "{selectedNews.title}"
            </h3>
            {/* Форма редактирования новости */}
          </div>
        </div>
      )}
    </div>
  );
} 