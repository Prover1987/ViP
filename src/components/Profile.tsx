import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  position: string;
  department: string;
  completedCourses: number;
  inProgressCourses: number;
}

export default function Profile() {
  const [profile] = useState<UserProfile>({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    position: 'Разработчик',
    department: 'IT',
    completedCourses: 3,
    inProgressCourses: 2,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Профиль</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ваша личная информация и прогресс обучения
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Личная информация</h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">ФИО</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Должность</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.position}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Отдел</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.department}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Прогресс обучения</h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Завершенные курсы</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.completedCourses}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Курсы в процессе</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.inProgressCourses}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 