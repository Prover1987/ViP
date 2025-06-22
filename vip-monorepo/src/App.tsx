import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthenticationContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import News from './pages/News';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import './App.css';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><Layout><AdminPanel /></Layout></PrivateRoute>} />
            <Route path="/courses" element={<Layout><Courses /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/" element={<Navigate to="/news" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Suspense>
  );
};

export default App;
