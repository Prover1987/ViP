import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface CompanyInfo {
  name: string;
  description: string;
  mission: string;
  values: string[];
  contacts: {
    address: string;
    phone: string;
    email: string;
  };
}

export default function CompanyInfoManagement() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    description: '',
    mission: '',
    values: [],
    contacts: {
      address: '',
      phone: '',
      email: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Здесь будет логика сохранения данных
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Информация о компании</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PencilIcon className="-ml-1 mr-2 h-5 w-5" />
          Редактировать
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Основная информация</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Название компании</label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Описание</label>
                  <textarea
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Миссия и ценности</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Миссия</label>
                  <textarea
                    value={companyInfo.mission}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ценности</label>
                  <div className="mt-2 space-y-2">
                    {companyInfo.values.map((value, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const newValues = [...companyInfo.values];
                            newValues[index] = e.target.value;
                            setCompanyInfo({ ...companyInfo, values: newValues });
                          }}
                          disabled={!isEditing}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => setCompanyInfo({ ...companyInfo, values: [...companyInfo.values, ''] })}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Добавить ценность
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Контактная информация</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Адрес</label>
                  <input
                    type="text"
                    value={companyInfo.contacts.address}
                    onChange={(e) => setCompanyInfo({
                      ...companyInfo,
                      contacts: { ...companyInfo.contacts, address: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Телефон</label>
                  <input
                    type="tel"
                    value={companyInfo.contacts.phone}
                    onChange={(e) => setCompanyInfo({
                      ...companyInfo,
                      contacts: { ...companyInfo.contacts, phone: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={companyInfo.contacts.email}
                    onChange={(e) => setCompanyInfo({
                      ...companyInfo,
                      contacts: { ...companyInfo.contacts, email: e.target.value }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Сохранить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 