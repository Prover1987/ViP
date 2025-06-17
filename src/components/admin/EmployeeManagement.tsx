import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  role: 'admin' | 'employee';
  status: 'active' | 'inactive';
}

export default function EmployeeManagement() {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      position: 'Разработчик',
      department: 'IT',
      role: 'admin',
      status: 'active',
    },
  ]);
  const [isAddingEmployee] = useState(false);

  const handleAddEmployee = () => {
    // ...
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="subheading text-spruce-dark">Управление сотрудниками</h2>
        <button onClick={handleAddEmployee} className="btn">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />Добавить сотрудника
        </button>
      </div>
      <div className="bg-floral-white border border-sea-green rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-sea-green/30">
          {employees.map((employee) => (
            <li key={employee.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-heading text-spruce-dark truncate">{employee.name}</h3>
                  <p className="text-base text-spruce-dark/80">{employee.position}, {employee.department}</p>
                  <span className="text-opal-green text-sm">{employee.email}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="btn bg-sea-green text-spruce-dark hover:bg-opal-green"><PencilIcon className="-ml-1 mr-1 h-4 w-4" />Редактировать</button>
                  <button className="btn bg-scarlet-red text-floral-white hover:bg-opal-green"><TrashIcon className="-ml-1 mr-1 h-4 w-4" />Удалить</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isAddingEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Добавить нового сотрудника</h3>
            {/* Форма добавления сотрудника */}
          </div>
        </div>
      )}
    </div>
  );
} 