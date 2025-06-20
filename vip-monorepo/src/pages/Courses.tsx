import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Course {
  _id: string;
  title: string;
  description: string;
  author: string;
  isActive: boolean;
  createdAt: string;
  progress: number;
}

const Courses: React.FC = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get<Course[]>('/api/courses', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setCourses(res.data);
      } catch {
        setError('Ошибка загрузки курсов');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="min-h-screen bg-floral-white py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-spruce-dark">Курсы</h2>
        <div className="space-y-6">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border border-sea-green">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-spruce-dark">{course.title}</span>
                <span className="text-xs text-opal-green font-semibold">{course.progress}%</span>
              </div>
              <div className="w-full bg-sea-green/30 rounded-full h-2 mb-2">
                <div className="bg-opal-green h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 