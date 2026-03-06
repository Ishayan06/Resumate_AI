'use client';

import React from 'react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function QuestionCard({
  question,
  index,
  total,
  answer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-indigo-600">
            Question {index + 1} of {total}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : ''}
            ${question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${question.difficulty === 'hard' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {question.difficulty || 'medium'}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.text}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {question.category || 'General'}
          </span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {question.skill || 'General'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          disabled={isSubmitting}
        />

        <button
          onClick={onSubmit}
          disabled={!answer.trim() || isSubmitting}
          className={`w-full py-3 rounded-lg font-medium transition ${
            !answer.trim() || isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
}