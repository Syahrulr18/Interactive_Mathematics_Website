import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Timer } from 'lucide-react';

const MiniGamePage = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [totalProblems, setTotalProblems] = useState(0);

  // Generate random math problem
  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;
    switch(operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }
    return {
      question: `${num1} ${operation} ${num2}`,
      answer: answer
    };
  };

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setTotalProblems(0);
    setCurrentProblem(generateProblem());
    setUserAnswer('');
    setFeedback('');
  };

  // Handle answer submission
  const submitAnswer = () => {
    if (!userAnswer.trim()) return;
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    setTotalProblems(totalProblems + 1);
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Benar! +1 poin');
    } else {
      setFeedback(`Salah! Jawaban yang benar: ${currentProblem.answer}`);
    }
    setTimeout(() => {
      setCurrentProblem(generateProblem());
      setUserAnswer('');
      setFeedback('');
    }, 1000);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('finished');
    }
  }, [gameState, timeLeft]);

  // Game Menu
  if (gameState === 'menu') {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Mini Game Matematika</h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Gamepad2 className="w-24 h-24 mx-auto text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hitung Cepat!</h2>
            <p className="text-gray-600 text-lg">
              Selesaikan sebanyak mungkin soal matematika dalam waktu 30 detik!
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Cara Bermain:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• Jawab soal penjumlahan, pengurangan, dan perkalian</li>
              <li>• Ketik jawaban dan tekan Enter atau tombol Submit</li>
              <li>• Dapatkan poin untuk setiap jawaban yang benar</li>
              <li>• Waktu: 30 detik</li>
            </ul>
          </div>
          <button
            onClick={startGame}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors duration-200 transform hover:scale-105 shadow-lg"
          >
            Mulai Game!
          </button>
        </div>
      </div>
    );
  }

  // Game Playing
  if (gameState === 'playing') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Hitung Cepat!</h1>
          <div className="flex space-x-6 text-xl font-bold">
            <div className="flex items-center space-x-2 text-blue-600">
              <Trophy className="w-6 h-6" />
              <span>Skor: {score}</span>
            </div>
            <div className={`flex items-center space-x-2 ${timeLeft <= 10 ? 'text-red-600' : 'text-green-600'}`}>
              <Timer className="w-6 h-6" />
              <span>Waktu: {timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
             className={`h-4 rounded-full transition-all duration-1000 ${
              timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 20 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentProblem && (
            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-gray-800 mb-6">
                {currentProblem.question} = ?
              </div>
              <div className="max-w-md mx-auto">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Masukkan jawaban..."
                  className="w-full text-3xl text-center py-4 px-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  autoFocus
                />
              </div>
              <button
                onClick={submitAnswer}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200 transform hover:scale-105"
              >
                Submit
              </button>

              {/* Feedback */}
              {feedback && (
                <div className={`text-xl font-bold p-4 rounded-lg ${
                  feedback.includes('Benar')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center text-lg text-gray-600">
          Soal dijawab: {totalProblems}
        </div>
      </div>
    );
  }

  // Game Finished
  if (gameState === 'finished') {
    const accuracy = totalProblems > 0 ? Math.round((score / totalProblems) * 100) : 0;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Hasil Game</h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Trophy className={`w-24 h-24 mx-auto mb-4 ${
              score >= 15 ? 'text-yellow-500' :
              score >= 10 ? 'text-gray-400' :
              'text-orange-500'
            }`} />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Waktu Habis!</h2>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-600">{score}</div>
              <div className="text-gray-700 font-semibold">Jawaban Benar</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-600">{totalProblems}</div>
              <div className="text-gray-700 font-semibold">Total Soal</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
              <div className="text-gray-700 font-semibold">Akurasi</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className={`text-lg font-semibold p-4 rounded-lg mb-6 ${
            score >= 15 ? 'bg-yellow-100 text-yellow-800' :
            score >= 10 ? 'bg-green-100 text-green-800' :
            score >= 5 ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {score >= 15 ? '🏆 Luar biasa! Anda sangat cepat dalam berhitung!' :
             score >= 10 ? '⭐ Bagus sekali! Kemampuan hitung Anda sangat baik!' :
             score >= 5 ? '👍 Cukup baik! Terus berlatih untuk hasil yang lebih baik!' :
             '💪 Jangan menyerah! Latihan terus akan membuat Anda lebih cepat!'}
          </div>
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105"
            >
              Main Lagi
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MiniGamePage;
