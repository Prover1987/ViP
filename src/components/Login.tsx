import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (role: 'admin' | 'employee') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика аутентификации
    // Временная заглушка для демонстрации
    if (formData.email && formData.password) {
      // Для демонстрации: если email содержит "admin", то вход как админ
      const role = formData.email.includes('admin') ? 'admin' : 'employee';
      onLogin(role);
      navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-floral-white text-spruce-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 card">
        <div>
          <h2 className="heading text-center">
            Вход в систему
          </h2>
          <p className="mt-2 text-center text-base text-spruce-dark/70">
            Введите свои учетные данные
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field mt-3"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn w-full"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 