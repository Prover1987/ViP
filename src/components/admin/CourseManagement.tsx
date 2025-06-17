import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Введение в React',
      description: 'Базовый курс по разработке на React',
      lessons: [
        {
          id: '1',
          title: 'Основы React',
          content: 'Введение в компоненты и JSX',
        },
      ],
    },
  ]);

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleAddCourse = () => {
    setIsAddingCourse(true);
  };

  const handleAddLesson = (course: Course) => {
    setSelectedCourse(course);
    setIsAddingLesson(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Управление курсами</h2>
        <button
          onClick={handleAddCourse}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Добавить курс
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddLesson(course)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
                      Урок
                    </button>
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PencilIcon className="-ml-1 mr-1 h-4 w-4" />
                      Редактировать
                    </button>
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="-ml-1 mr-1 h-4 w-4" />
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Уроки:</h4>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {course.lessons.map((lesson) => (
                      <li key={lesson.id} className="py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                            <p className="text-sm text-gray-500">Длительность: {lesson.duration} мин.</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-500"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isAddingCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Добавить новый курс</h3>
            {/* Форма добавления курса */}
          </div>
        </div>
      )}

      {isAddingLesson && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Добавить урок в курс "{selectedCourse.title}"
            </h3>
            {/* Форма добавления урока */}
          </div>
        </div>
      )}
    </div>
  );
} 