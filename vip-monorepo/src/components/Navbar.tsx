import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-spruce-dark text-floral-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-bold text-lg hover:text-opal-green transition-colors">ViP</Link>
        {user && <Link to="/courses" className="hover:text-opal-green transition-colors">Курсы</Link>}
        {user && <Link to="/news" className="hover:text-opal-green transition-colors">Новости</Link>}
        {user?.role === 'admin' && <Link to="/admin" className="hover:text-opal-green transition-colors">Админ</Link>}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/profile" className="hover:text-opal-green transition-colors">{user.fullName || user.email}</Link>
            <button
              onClick={handleLogout}
              className="bg-opal-green text-floral-white px-4 py-1 rounded hover:bg-spruce-dark border border-opal-green transition-colors"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-opal-green transition-colors">Вход</Link>
            <Link to="/register" className="hover:text-opal-green transition-colors">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 