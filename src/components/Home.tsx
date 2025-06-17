import { useState } from 'react';

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export default function Home() {
  const [news] = useState<News[]>([
    {
      id: '1',
      title: 'Добро пожаловать на платформу!',
      content: 'Мы рады представить вам новую платформу для обучения и развития сотрудников.',
      date: '2024-03-20',
      author: 'Администратор'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Главная страница</h1>
        <p className="mt-1 text-sm text-gray-500">
          Добро пожаловать на корпоративную платформу обучения
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Последние новости</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {news.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <p>
                        Автор: {item.author} • {item.date}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {item.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 