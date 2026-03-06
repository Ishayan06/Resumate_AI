import axios from 'axios';
import { AnswerEvaluation, InterviewSession, InterviewResult, Question } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const auth = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const resume = {
  upload: (formData: FormData) =>
    api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const interview = {
  start: () => api.post<InterviewSession>('/interview/start'),
  submitAnswer: (data: { sessionId: string; questionId: number; answerText: string; speechText?: string }) =>
    api.post<{ evaluation: AnswerEvaluation; completed: boolean; progress: { current: number; total: number } }>(
      '/interview/answer',
      data
    ),
  getResults: (sessionId: string) => api.get<InterviewResult>(`/interview/results/${sessionId}`),
};

export const questions = {
  getAll: () => api.get<Question[]>('/questions'),
  getById: (id: string) => api.get<Question>(`/questions/${id}`),
};

export default api;