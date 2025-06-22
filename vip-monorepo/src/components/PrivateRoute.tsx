import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationContext';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute; 