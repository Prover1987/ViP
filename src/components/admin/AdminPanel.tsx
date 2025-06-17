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
          <h3 className="subheading text-spruce-dark">Управление курсами</h3>
          <p className="text-base text-spruce-dark/70">Здесь будет функционал управления курсами</p>
        </div>
      ),
    },
    {
      id: 'users',
      name: 'Управление пользователями',
      component: (
        <div className="space-y-4">
          <h3 className="subheading text-spruce-dark">Управление пользователями</h3>
          <p className="text-base text-spruce-dark/70">Здесь будет функционал управления пользователями</p>
        </div>
      ),
    },
    {
      id: 'news',
      name: 'Управление новостями',
      component: (
        <div className="space-y-4">
          <h3 className="subheading text-spruce-dark">Управление новостями</h3>
          <p className="text-base text-spruce-dark/70">Здесь будет функционал управления новостями</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="heading">Панель администратора</h1>
        <p className="mt-2 text-base text-spruce-dark/70">
          Управление контентом и пользователями платформы
        </p>
      </div>

      <div className="border-b border-sea-green/50">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-floral-white bg-spruce-dark hover:bg-opal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opal-green transition-colors"
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 bg-floral-white rounded-lg shadow-lg p-6">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
} 