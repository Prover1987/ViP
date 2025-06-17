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
        <h2 className="subheading text-spruce-dark">Управление новостями</h2>
        <button onClick={handleAddNews} className="btn">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />Добавить новость
        </button>
      </div>
      <div className="bg-floral-white border border-sea-green rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-sea-green/30">
          {news.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-heading text-spruce-dark truncate">{item.title}</h3>
                    <p className="mt-1 text-base text-spruce-dark/80">{item.content}</p>
                    <span className="text-opal-green text-sm">Автор: {item.author}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn bg-sea-green text-spruce-dark hover:bg-opal-green"><PencilIcon className="-ml-1 mr-1 h-4 w-4" />Редактировать</button>
                    <button className="btn bg-scarlet-red text-floral-white hover:bg-opal-green"><TrashIcon className="-ml-1 mr-1 h-4 w-4" />Удалить</button>
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