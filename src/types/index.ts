export interface User {
  id: string;
  fullName: string;
  position: string;
  department: string;
  photo?: string;
  email: string;
  phone?: string;
  role: 'admin' | 'employee';
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  author: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
  completed: boolean;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastAccessed: string;
} 