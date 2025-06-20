import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-floral-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4 border border-sea-green">
        <h2 className="text-2xl font-bold mb-4 text-spruce-dark">Вход в админку</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-sea-green rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full border border-sea-green rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opal-green"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-opal-green text-white py-2 rounded hover:bg-spruce-dark transition-colors font-semibold shadow"
          disabled={loading}
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </div>
  );
} 