import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="heading mb-8">Профиль сотрудника</h1>
      <div className="bg-floral-white border border-sea-green rounded-lg shadow p-8">
        <div className="mb-6">
          <h2 className="subheading mb-2 text-spruce-dark">Личная информация</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-opal-green font-medium">ФИО:</span>
              <div className="text-base">{user?.fullName}</div>
            </div>
            <div>
              <span className="text-opal-green font-medium">Email:</span>
              <div className="text-base">{user?.email}</div>
            </div>
            <div>
              <span className="text-opal-green font-medium">Должность:</span>
              <div className="text-base">{user?.position}</div>
            </div>
            <div>
              <span className="text-opal-green font-medium">Отдел:</span>
              <div className="text-base">{user?.department}</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="subheading mb-2 text-spruce-dark">Прогресс обучения</h2>
          <div className="space-y-4">
            <div>
              <span className="font-medium">React для начинающих</span>
              <div className="w-full bg-sea-green/30 rounded-full h-2 mt-1">
                <div className="bg-opal-green h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-xs text-opal-green">75%</span>
            </div>
            <div>
              <span className="font-medium">TypeScript основы</span>
              <div className="w-full bg-sea-green/30 rounded-full h-2 mt-1">
                <div className="bg-opal-green h-2 rounded-full" style={{ width: '30%' }} />
              </div>
              <span className="text-xs text-opal-green">30%</span>
            </div>
            <div>
              <span className="font-medium">Tailwind CSS мастер-класс</span>
              <div className="w-full bg-sea-green/30 rounded-full h-2 mt-1">
                <div className="bg-opal-green h-2 rounded-full" style={{ width: '90%' }} />
              </div>
              <span className="text-xs text-opal-green">90%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 