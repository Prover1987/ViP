import { useState } from 'react';

interface Tab {
  id: string;
  name: string;
  component: React.ReactNode;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('courses');

  const tabs: Tab[] = [
    {
      id: 'courses',
      name: 'Управление курсами',
      component: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Управление курсами</h3>
          <p className="text-gray-500">Здесь будет функционал управления курсами</p>
        </div>
      ),
    },
    {
      id: 'users',
      name: 'Управление пользователями',
      component: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Управление пользователями</h3>
          <p className="text-gray-500">Здесь будет функционал управления пользователями</p>
        </div>
      ),
    },
    {
      id: 'news',
      name: 'Управление новостями',
      component: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Управление новостями</h3>
          <p className="text-gray-500">Здесь будет функционал управления новостями</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Панель администратора</h1>
        <p className="mt-1 text-sm text-gray-500">
          Управление контентом и пользователями платформы
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
} 