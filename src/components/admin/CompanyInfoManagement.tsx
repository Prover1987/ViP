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
    name: 'Гастрогном',
    description: 'Наша миссия — создание вкусной и полезной еды, которая делает жизнь наших сотрудников ярче и комфортнее.',
    mission: 'Предоставлять высококачественные продукты питания и обучать сотрудников культуре здорового питания.',
    values: ['Качество', 'Забота', 'Инновации', 'Развитие'],
    contacts: {
      address: 'г. Москва, ул. Примерная, 1',
      phone: '+7 (123) 456-78-90',
      email: 'info@gastronom.com',
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="subheading text-spruce-dark">Информация о компании</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="btn bg-opal-green text-floral-white hover:bg-spruce-dark"
        >
          <PencilIcon className="-ml-1 mr-2 h-5 w-5" />
          Редактировать
        </button>
      </div>

      <div className="card">
        <div className="space-y-8">
          <div>
            <h3 className="subheading mb-4 text-spruce-dark">Основная информация</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Название компании</label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Описание</label>
                <textarea
                  value={companyInfo.description}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="subheading mb-4 text-spruce-dark">Миссия и ценности</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Миссия</label>
                <textarea
                  value={companyInfo.mission}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Ценности</label>
                <div className="mt-2 space-y-3">
                  {companyInfo.values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const newValues = [...companyInfo.values];
                          newValues[index] = e.target.value;
                          setCompanyInfo({ ...companyInfo, values: newValues });
                        }}
                        disabled={!isEditing}
                        className="input-field flex-1"
                      />
                      {isEditing && (
                        <button
                          onClick={() => setCompanyInfo({ ...companyInfo, values: companyInfo.values.filter((_, i) => i !== index) })}
                          className="btn bg-scarlet-red text-floral-white text-sm px-3 py-1.5"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => setCompanyInfo({ ...companyInfo, values: [...companyInfo.values, ''] })}
                      className="btn bg-opal-green text-floral-white text-sm px-4 py-2"
                    >
                      Добавить ценность
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="subheading mb-4 text-spruce-dark">Контактная информация</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Адрес</label>
                <input
                  type="text"
                  value={companyInfo.contacts.address}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    contacts: { ...companyInfo.contacts, address: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Телефон</label>
                <input
                  type="tel"
                  value={companyInfo.contacts.phone}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    contacts: { ...companyInfo.contacts, phone: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-opal-green mb-1">Email</label>
                <input
                  type="email"
                  value={companyInfo.contacts.email}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    contacts: { ...companyInfo.contacts, email: e.target.value }
                  })}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="btn bg-sea-green text-spruce-dark hover:bg-opal-green"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="btn"
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 