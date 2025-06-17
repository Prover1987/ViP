import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessons: number;
  progress: number;
}

export default function Courses() {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Введение в React',
      description: 'Базовый курс по разработке на React',
      duration: 120,
      lessons: 10,
      progress: 60,
    },
    {
      id: '2',
      title: 'TypeScript для начинающих',
      description: 'Изучение основ TypeScript',
      duration: 90,
      lessons: 8,
      progress: 25,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Курсы</h1>
        <p className="mt-1 text-sm text-gray-500">
          Доступные курсы для обучения
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{course.description}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Длительность: {course.duration} мин.</span>
                  <span className="text-gray-500">Уроков: {course.lessons}</span>
                </div>
                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Прогресс
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Продолжить обучение
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 