import { useState } from 'react';

interface CourseProgress {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  lastActivity: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

export default function Progress() {
  const [progress] = useState<CourseProgress[]>([
    {
      id: '1',
      title: 'Введение в React',
      completedLessons: 6,
      totalLessons: 10,
      lastActivity: '2024-03-15',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'TypeScript для начинающих',
      completedLessons: 2,
      totalLessons: 8,
      lastActivity: '2024-03-14',
      status: 'in-progress',
    },
  ]);

  const getStatusColor = (status: CourseProgress['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: CourseProgress['status']) => {
    switch (status) {
      case 'completed':
        return 'Завершен';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начат';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Прогресс обучения</h1>
        <p className="mt-1 text-sm text-gray-500">
          Отслеживайте свой прогресс в обучении
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {progress.map((course) => (
            <li key={course.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>
                        Пройдено уроков: {course.completedLessons} из {course.totalLessons}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        Последняя активность: {new Date(course.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Прогресс
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{
                          width: `${(course.completedLessons / course.totalLessons) * 100}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 