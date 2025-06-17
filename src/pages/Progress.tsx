import { useAuth } from '../contexts/AuthContext';

const courses = [
  'React для начинающих',
  'TypeScript основы',
  'Tailwind CSS мастер-класс',
];

export default function Progress() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Прогресс обучения
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Статус прохождения курсов
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {courses.map((course, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{course}</h3>
                    <span className="text-sm text-gray-500">
                      {index === 0 ? '75%' : index === 1 ? '30%' : '90%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: index === 0 ? '75%' : index === 1 ? '30%' : '90%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 