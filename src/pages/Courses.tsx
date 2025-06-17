import { useState } from 'react';
import type { Course, Lesson } from '../types';

// Mock courses data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React для начинающих',
    description: 'Базовый курс по React для начинающих разработчиков.',
    progress: 75,
    lessons: [
      {
        id: '1-1',
        title: 'Введение в React',
        content: 'Основные концепции и принципы React',
        duration: 30,
        completed: true,
      },
      {
        id: '1-2',
        title: 'Компоненты и пропсы',
        content: 'Создание и использование компонентов',
        duration: 45,
        completed: true,
      },
      {
        id: '1-3',
        title: 'Состояние и жизненный цикл',
        content: 'Управление состоянием компонентов',
        duration: 60,
        completed: false,
      },
    ],
  },
  {
    id: '2',
    title: 'TypeScript основы',
    description: 'Изучение основ TypeScript для повышения качества кода.',
    progress: 30,
    lessons: [
      {
        id: '2-1',
        title: 'Введение в TypeScript',
        content: 'Основы типизации и конфигурация',
        duration: 40,
        completed: true,
      },
      {
        id: '2-2',
        title: 'Интерфейсы и типы',
        content: 'Определение и использование типов',
        duration: 50,
        completed: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Tailwind CSS мастер-класс',
    description: 'Практический курс по Tailwind CSS.',
    progress: 90,
    lessons: [
      // Add Tailwind CSS lessons here
    ],
  },
];

export default function Courses() {
  const [courses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCompleteLesson = (lessonId: string) => {
    // In a real application, this would update the backend
    console.log(`Lesson ${lessonId} completed`);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="heading mb-8">Курсы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-floral-white border border-sea-green rounded-lg shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="subheading mb-2 text-spruce-dark">{course.title}</h2>
              <p className="text-base mb-4">{course.description}</p>
            </div>
            <div className="mt-2">
              <div className="w-full bg-sea-green/30 rounded-full h-2 mb-1">
                <div className="bg-opal-green h-2 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
              <span className="text-xs text-opal-green">{course.progress}% завершено</span>
            </div>
          </div>
        ))}
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Course List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Доступные курсы</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      selectedCourse?.id === course.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white shadow rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedCourse.title}
                </h2>
                <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

                <div className="space-y-4">
                  {selectedCourse.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-lg border ${
                        selectedLesson?.id === lesson.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className="text-left"
                        >
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Длительность: {lesson.duration} мин
                          </p>
                        </button>
                        {lesson.completed ? (
                          <span className="text-sm text-green-600">Завершено</span>
                        ) : (
                          <button
                            onClick={() => handleCompleteLesson(lesson.id)}
                            className="btn-primary text-sm"
                          >
                            Начать
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-4">
              <p className="text-gray-500 text-center">
                Выберите курс для просмотра уроков
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Content Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium text-gray-900">
                  {selectedLesson.title}
                </h3>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Закрыть</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="prose max-w-none">
                <p>{selectedLesson.content}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleCompleteLesson(selectedLesson.id)}
                  className="btn-primary"
                >
                  Завершить урок
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 