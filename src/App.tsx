import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import Courses from './components/Courses';
//import Progress from './components/Progress';
import Login from './components/Login';
import AdminPanel from './components/admin/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, login, isAuthenticated } = useAuth();

  useEffect(() => {
    // В реальном приложении здесь может быть проверка токена или сессии
    // Для демо, если пользователь существует в контексте, считаем его авторизованным
    if (user) {
      // Если AuthProvider инициализирует пользователя не null, это сработает
    }
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      // Здесь можно добавить логику отображения ошибки в UI
    }
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/progress" element={<Progress />} /> */}
            {user?.role === 'admin' && (
              <Route path="/admin" element={<AdminPanel />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 