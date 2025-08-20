import React, { useState } from 'react';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';

const LatihanSoalPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Berapakah nilai diskriminan dari persamaan 2x² - 5x + 2 = 0?",
      options: ["9", "25", "1", "-7"],
      correct: "9",
      explanation: "Diskriminan = b² - 4ac = (-5)² - 4(2)(2) = 25 - 16 = 9"
    },
    {
      id: 2,
      question: "Jika sin θ = 3/5, berapakah nilai cos θ?",
      options: ["4/5", "3/4", "5/3", "5/4"],
      correct: "4/5",
      explanation: "Menggunakan identitas sin²θ + cos²θ = 1, maka cos²θ = 1 - (3/5)² = 1 - 9/25 = 16/25, sehingga cos θ = 4/5"
    },
    {
      id: 3,
      question: "Berapa hasil dari log₂(8) + log₂(4)?",
      options: ["5", "6", "3", "4"],
      correct: "5",
      explanation: "log₂(8) + log₂(4) = log₂(8×4) = log₂(32) = log₂(2⁵) = 5"
    },
    {
      id: 4,
      question: "Akar-akar persamaan x² - 6x + 9 = 0 adalah?",
      options: ["x = 3 (kembar)", "x = 1 dan x = 9", "x = -3 dan x = 3", "x = 2 dan x = 4"],
      correct: "x = 3 (kembar)",
      explanation: "x² - 6x + 9 = (x-3)² = 0, sehingga x = 3 (akar kembar)"
    },
    {
      id: 5,
      question: "Jika tan θ = 1, berapakah nilai θ dalam derajat?",
      options: ["30°", "45°", "60°", "90°"],
      correct: "45°",
      explanation: "tan 45° = 1, karena sin 45° = cos 45° = √2/2"
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      answer: answer,
      correct: answer === questions[currentQuestion].correct
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Hasil Latihan Soal</h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Trophy className={`w-24 h-24 mx-auto mb-4 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-red-500'}`} />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Selesai!</h2>
            <p className="text-xl text-gray-600">Skor Anda: {score}/{questions.length} ({percentage}%)</p>
          </div>
          <div className={`text-lg font-semibold p-4 rounded-lg mb-6 ${
            percentage >= 80 ? 'bg-green-100 text-green-800' :
            percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {percentage >= 80 ? 'Excellent! Pemahaman Anda sangat baik!' :
             percentage >= 60 ? 'Good! Anda cukup memahami materi.' :
             'Keep Learning! Perbanyak latihan lagi ya!'}
          </div>
          <button
            onClick={resetQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 transform hover:scale-105"
          >
            Ulangi Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Latihan Soal</h1>
        <div className="text-lg font-semibold text-gray-600">
          Soal {currentQuestion + 1} dari {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
           className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {questions[currentQuestion].question}
        </h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                showFeedback
                  ? option === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : option === selectedAnswer && option !== questions[currentQuestion].correct
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {showFeedback && option === questions[currentQuestion].correct && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                )}
                {showFeedback && option === selectedAnswer && option !== questions[currentQuestion].correct && (
                  <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-800 mb-2">Penjelasan:</h3>
            <p className="text-gray-700">{questions[currentQuestion].explanation}</p>

            <button
              onClick={nextQuestion}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              {currentQuestion + 1 < questions.length ? 'Soal Berikutnya' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="text-center text-lg font-semibold text-gray-600">
        Skor saat ini: {score}/{answeredQuestions.length}
      </div>
    </div>
  );
};

export default LatihanSoalPage;
