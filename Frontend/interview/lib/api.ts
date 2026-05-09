import axios from 'axios';
import {
  AnswerEvaluation,
  InterviewSession,
  InterviewResult,
  Question
} from '@/types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3001/api';

// -----------------------------
// Axios Instance
// -----------------------------
const api = axios.create({
  baseURL: API_URL,
});

// -----------------------------
// Attach Token
// -----------------------------
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// -----------------------------
// AUTH APIs
// -----------------------------
export const auth = {
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => api.post('/auth/register', data),

  login: (data: {
    email: string;
    password: string;
  }) => api.post('/auth/login', data),
};

// -----------------------------
// RESUME APIs
// -----------------------------
export const resume = {
  upload: (formData: FormData) =>
    api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// -----------------------------
// INTERVIEW APIs (FIXED)
// -----------------------------
export const interview = {
  // ✅ Start Interview Session
  start: () =>
    api.post<InterviewSession>('/interview/start'),

  // ✅ Get Questions for Session (IMPORTANT FIX)
  getSession: (sessionId: string) =>
    api.get<{ questions: Question[] }>(
      `/interview/${sessionId}`
    ),
  getDashboardStats: () => api.get('/interview/dashboard/stats'),
  // ✅ Submit Answer
  submitAnswer: (data: {
    sessionId: string;
    questionId: number;
    answerText: string;
    speechText?: string;
  }) =>
    api.post<{
      evaluation: AnswerEvaluation;
      completed: boolean;
      progress: {
        current: number;
        total: number;
      };
    }>('/interview/answer', data),

  // ✅ Get Final Results
  getResults: (sessionId: string) =>
    api.get<InterviewResult>(
      `/interview/results/${sessionId}`
    ),
};

export const user = {
  updateStreak: () => api.post('/streak'),
};
// -----------------------------
// QUESTIONS APIs
// -----------------------------
export const questions = {
  getAll: () => api.get<Question[]>('/questions'),

  getById: (id: string) =>
    api.get<Question>(`/questions/${id}`),
};

export default api;