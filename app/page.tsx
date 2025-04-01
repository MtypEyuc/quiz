"use client";

import { useState } from 'react';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "문제 1의 정답은 1입니다.",
    options: ["정답 1", "정답 2", "정답 3", "정답 4"],
    answer: "정답 1"
  },
  {
    question: "문제 2의 정답은 2입니다.",
    options: ["정답 1", "정답 2", "정답 3", "정답 4"],
    answer: "정답 2"
  },
  {
    question: "문제 3의 정답은 3입니다.",
    options: ["정답 1", "정답 2", "정답 3", "정답 4"],
    answer: "정답 3"
  },
  {
    question: "문제 4의 정답은 4입니다.",
    options: ["정답 1", "정답 2", "정답 3", "정답 4"],
    answer: "정답 4"
  }

];

const Home = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h1 className="text-3xl font-bold text-green-500">퀴즈 종료!</h1>
            <p className="text-xl mt-4">최종 점수: {score}</p>
          </div>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const remainingQuestions = questions.length - (currentQuestionIndex);
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">퀴즈 앱</h1>
          <p className="text-lg text-gray-700 mb-4">{currentQuestion.question}</p>

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={`w-full p-3 rounded-lg border-2 text-left ${option === selectedAnswer ? 'bg-blue-200' : 'bg-white'} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  {option}
                </button>
            ))}
          </div>

          <button
              onClick={handleNextQuestion}
              className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            다음 문제
          </button>

          <p className="mt-4 text-gray-600">현재 점수: {score}</p>
          <p className="text-gray-600">남은 문제: {remainingQuestions}</p>
          <div className="mt-4">
            <div className="w-full bg-gray-300 h-2 rounded">
              <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{Math.round(progress)}% 진행됨</p>
          </div>
        </div>
      </div>
  );
};

export default Home;
