import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  // const { user } = useAuth(); // Временно закомментировано для диагностики

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="heading mb-8">Тестовая страница профиля</h1>
      <p>Если вы видите этот текст, значит компонент Profile рендерится.</p>
      <p>Это временное изменение для диагностики.</p>
    </div>
  );
} 