import axios from 'axios';
import {
  AnswerEvaluation,
  InterviewSession,
  InterviewResult,
  Question
} from '@/types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://resumate-ai-2cg5.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// AUTH
export const auth = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/api/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

// RESUME
export const resume = {
  upload: (formData: FormData) =>
    api.post('/api/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// INTERVIEW
export const interview = {
  start: () =>
    api.post<InterviewSession>('/api/interview/start'),

  getSession: (sessionId: string) =>
    api.get<{ questions: Question[] }>(`/api/interview/${sessionId}`),

  getDashboardStats: () =>
    api.get('/api/interview/dashboard/stats'),

  submitAnswer: (data: {
    sessionId: string;
    questionId: number;
    answerText: string;
    speechText?: string;
  }) =>
    api.post<{
      evaluation: AnswerEvaluation;
      completed: boolean;
      progress: { current: number; total: number };
    }>('/api/interview/answer', data),

  getResults: (sessionId: string) =>
    api.get<InterviewResult>(`/api/interview/results/${sessionId}`),
};

// STREAK
// STREAK
export const user = {
  getStreak: () => api.get<{
    streak: number;
    maxstreak: number;
    totalDays: number;
    visitDates: string[];
  }>('/api/streak'),

  updateStreak: (completedDayIndex: number) =>
    api.post<{
      streak: number;
      maxstreak: number;
      totalDays: number;
      visitDates: string[];
      updated: boolean;
    }>('/api/streak/update', { completedDayIndex }),
};
// QUESTIONS
export const questions = {
  getAll: () => api.get<Question[]>('/api/questions'),

  getById: (id: string) => api.get<Question>(`/api/questions/${id}`),
};

export default api;