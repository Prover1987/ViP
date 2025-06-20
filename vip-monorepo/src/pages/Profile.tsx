import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Профиль пользователя</h1>
      <div className="bg-white rounded shadow p-6 space-y-4">
        <div><b>ФИО:</b> {user.fullName}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Роль:</b> {user.role}</div>
        {user.department && <div><b>Отдел:</b> {user.department}</div>}
        {user.position && <div><b>Должность:</b> {user.position}</div>}
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-spruce-dark text-floral-white py-2 rounded hover:bg-opal-green transition-colors"
      >
        Выйти
      </button>
    </div>
  );
};

export default Profile; 