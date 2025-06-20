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

export default function Progress() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-floral-white border border-sea-green rounded-lg shadow p-8">
        <div className="space-y-6">
          {courses.map((course, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-spruce-dark">{course.title}</span>
                <span className="text-xs text-opal-green">{course.progress}%</span>
              </div>
              <div className="w-full bg-sea-green/30 rounded-full h-2">
                <div className="bg-opal-green h-2 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 