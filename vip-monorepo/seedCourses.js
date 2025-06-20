const mongoose = require('mongoose');

const uri = 'mongodb+srv://prover87:uyGkxSIe8y0f8Mxq@clustervip.1mlk69s.mongodb.net/vip?retryWrites=true&w=majority&appName=ClusterViP';

const courseSchema = new mongoose.Schema({
  title: String,
  progress: Number,
});

const Course = mongoose.model('Course', courseSchema);

const courses = [
  { title: 'React для начинающих', progress: 75 },
  { title: 'TypeScript основы', progress: 30 },
  { title: 'Tailwind CSS мастер-класс', progress: 90 },
];

mongoose.connect(uri)
  .then(async () => {
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log('Курсы успешно добавлены!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  }); 