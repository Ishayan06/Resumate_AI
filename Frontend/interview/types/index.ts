export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  skill: string;
}

export interface InterviewSession {
  sessionId: string;
  totalQuestions: number;
  questions: Question[];
}

export interface AnswerEvaluation {
  score: number;
  feedback: string;
  keywords_matched: string[];
  keywords_missed: string[];
  strengths: string;
  improvements: string;
}

export interface Answer {
  id: number;
  question_id: number;
  answer_text: string;
  feedback: string;
  score: number;
  keywords_matched: string[];
  created_at: string;
}

export interface InterviewResult {
  session: {
    id: string;
    startTime: string;
    endTime: string;
    totalQuestions: number;
    completedQuestions: number;
  };
  averageScore: number;
  overallFeedback: string;
  answers: Answer[];
  keywords: {
    strengths: string[];
    weaknesses: string[];
  };
}