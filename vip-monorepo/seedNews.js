const mongoose = require('mongoose');

const uri = 'mongodb+srv://prover87:uyGkxSIe8y0f8Mxq@clustervip.1mlk69s.mongodb.net/vip?retryWrites=true&w=majority&appName=ClusterViP';

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

const news = [
  {
    title: 'Открытие новой платформы',
    content: 'Мы запустили новую образовательную платформу для всех сотрудников!',
    author: 'Админ',
    isActive: true,
    createdAt: new Date('2024-06-01'),
  },
  {
    title: 'Обновление курсов',
    content: 'Добавлены новые курсы по React и TypeScript. Не пропустите!',
    author: 'Админ',
    isActive: true,
    createdAt: new Date('2024-06-10'),
  },
  {
    title: 'Важное объявление',
    content: 'В пятницу будет техническое обслуживание платформы.',
    author: 'Админ',
    isActive: false,
    createdAt: new Date('2024-06-15'),
  },
];

mongoose.connect(uri)
  .then(async () => {
    await News.deleteMany({});
    await News.insertMany(news);
    console.log('Новости успешно добавлены!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  }); 