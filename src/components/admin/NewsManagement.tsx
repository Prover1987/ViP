import { useState } from 'react';

interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function NewsManagement() {
  const [news] = useState<News[]>([
    {
      id: '1',
      title: 'Новый курс по React!',
      content: 'Запущен новый курс по React для начинающих.',
      author: 'Админ',
      date: '2024-06-17',
    },
  ]);
  const [isAddingNews, setIsAddingNews] = useState(false);
 
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="subheading text-spruce-dark">Управление новостями</h2>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-floral-white bg-spruce-dark hover:bg-opal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opal-green transition-colors"
          onClick={() => setIsAddingNews(true)}
        >
          Добавить новость
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
    </div>
  );
} 