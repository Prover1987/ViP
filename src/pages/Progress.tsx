import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';

// Mock data for employee progress
const mockEmployees: (User & { progress: { [key: string]: number } })[] = [
  {
    id: '1',
    fullName: 'Иван Иванов',
    position: 'Старший разработчик',
    department: 'IT',
    email: 'ivan@example.com',
    role: 'employee',
    progress: {
      'React для начинающих': 75,
      'TypeScript основы': 30,
      'Tailwind CSS мастер-класс': 90,
    },
  },
  {
    id: '2',
    fullName: 'Петр Петров',
    position: 'Разработчик',
    department: 'IT',
    email: 'petr@example.com',
    role: 'employee',
    progress: {
      'React для начинающих': 45,
      'TypeScript основы': 60,
      'Tailwind CSS мастер-класс': 100,
    },
  },
  {
    id: '3',
    fullName: 'Анна Сидорова',
    position: 'Дизайнер',
    department: 'Design',
    email: 'anna@example.com',
    role: 'employee',
    progress: {
      'React для начинающих': 90,
      'TypeScript основы': 20,
      'Tailwind CSS мастер-класс': 100,
    },
  },
];

const courses = [
  'React для начинающих',
  'TypeScript основы',
  'Tailwind CSS мастер-класс',
];

export default function Progress() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 text-center">
            У вас нет доступа к этой странице
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Прогресс сотрудников</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Сотрудник
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Должность
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Отдел
                </th>
                {courses.map((course) => (
                  <th
                    key={course}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {course}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.fullName}
                        </div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  {courses.map((course) => (
                    <td key={course} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary-600 h-2.5 rounded-full"
                            style={{ width: `${employee.progress[course]}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {employee.progress[course]}%
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 