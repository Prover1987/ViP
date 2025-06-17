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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="heading mb-8">Добро пожаловать в корпоративную платформу "Гастрогном"</h1>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="bg-floral-white border border-sea-green rounded-lg shadow p-6">
            <h2 className="subheading mb-2 text-spruce-dark">{item.title}</h2>
            <p className="text-base mb-1">{item.content}</p>
            <span className="text-opal-green text-sm">Автор: {item.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 