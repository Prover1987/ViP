const courses = [
  { title: 'React для начинающих', progress: 75 },
  { title: 'TypeScript основы', progress: 30 },
  { title: 'Tailwind CSS мастер-класс', progress: 90 },
];

export default function Progress() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="heading mb-8">Прогресс обучения</h1>
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