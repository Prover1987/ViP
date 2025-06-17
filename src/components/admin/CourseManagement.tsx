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
          duration: 45,
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

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="subheading text-spruce-dark">Управление курсами</h2>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-floral-white bg-spruce-dark hover:bg-opal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opal-green transition-colors"
          onClick={() => setIsAddingCourse(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Добавить курс
        </button>
      </div>
      <div className="bg-floral-white border border-sea-green rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-sea-green/30">
          {courses.map((course) => (
            <li key={course.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-heading text-spruce-dark truncate">{course.title}</h3>
                    <p className="mt-1 text-base text-spruce-dark/80">{course.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-floral-white bg-spruce-dark hover:bg-opal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opal-green transition-colors"
                      onClick={() => handleAddLesson(course)}
                    >
                      <PlusIcon className="-ml-1 mr-1 h-4 w-4" />Урок
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-floral-white bg-spruce-dark hover:bg-opal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opal-green transition-colors mr-2"
                      onClick={() => setIsAddingLesson(true)}
                    >
                      Редактировать
                    </button>
                    <button onClick={() => handleDeleteCourse(course.id)} className="btn bg-scarlet-red text-floral-white hover:bg-opal-green">
                      <TrashIcon className="-ml-1 mr-1 h-4 w-4" />Удалить
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-spruce-dark">Уроки:</h4>
                  <ul className="mt-2 divide-y divide-sea-green/30">
                    {course.lessons.map((lesson) => (
                      <li key={lesson.id} className="py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-spruce-dark">{lesson.title}</p>
                            <p className="text-sm text-spruce-dark/70">Длительность: {lesson.duration} мин.</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-sea-green hover:text-opal-green"><PencilIcon className="h-4 w-4" /></button>
                            <button className="text-scarlet-red hover:text-opal-green"><TrashIcon className="h-4 w-4" /></button>
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