import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, AlertCircle } from 'lucide-react';

function App() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); 
  const [guessHistory, setGuessHistory] = useState([]);


  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setFeedback('');
    setGameStatus('playing');
    setGuessHistory([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const guessNum = parseInt(guess);
    
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setFeedback('Please enter a valid number between 1 and 100');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    const newGuess = {
      number: guessNum,
      attempt: newAttempts
    };

    if (guessNum === targetNumber) {
      setFeedback(`🎉 Hurray congratulations! You guessed it in ${newAttempts} attempts!`);
      setGameStatus('You Won');
      setGuessHistory([...guessHistory, { ...newGuess, result: 'correct' }]);
    } else if (newAttempts >= maxAttempts) {
      setFeedback(`😞 Game over! The number was ${targetNumber}`);
      setGameStatus('You Lost');
      setGuessHistory([...guessHistory, { 
        ...newGuess, 
        result: guessNum > targetNumber ? 'too-high' : 'too-low' 
      }]);
    } else {
      const hint = guessNum > targetNumber ? 'Too high! Try a lower number.' : 'Too low! Try a higher number.';
      setFeedback(hint);
      setGuessHistory([...guessHistory, { 
        ...newGuess, 
        result: guessNum > targetNumber ? 'too-high' : 'too-low' 
      }]);
    }
    
    setGuess('');
  };

  const getFeedbackColor = () => {
    if (gameStatus === 'You Won') return 'text-green-400';
    if (gameStatus === 'You Lost') return 'text-red-400';
    return 'text-blue-300';
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'correct': return '🎯';
      case 'too-high': return '⬇️';
      case 'too-low': return '⬆️';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-5 sm:top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-10 sm:top-20 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-blue-300 rounded-full opacity-40 blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 sm:gap-0">
          <div className="flex items-center space-x-2">
            <Play className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <span className="text-xl sm:text-2xl font-bold text-white">Binary Breaker</span>
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-600/65 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 backdrop-blur-sm border border-blue-500/30 text-sm sm:text-base"
          >
            New Game
          </button>
        </header>

        {/* Main Content - Responsive */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Game Card - Responsive padding and spacing */}
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700/50 shadow-blue-500/10">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">Guess the Number</h1>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg px-2">I'm thinking of a number between 1 and 100</p>
              </div>

              {/* Game Stats - Responsive layout */}
              <div className="flex justify-between items-center mb-4 sm:mb-6 text-center gap-2 sm:gap-4">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-1 border border-gray-600/30">
                  <div className="text-gray-400 text-xs sm:text-sm font-medium">Attempts</div>
                  <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold">{attempts}/{maxAttempts}</div>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex-1 border border-gray-600/30">
                  <div className="text-gray-400 text-xs sm:text-sm font-medium">Status</div>
                  <div className="text-white text-sm sm:text-lg lg:text-xl font-semibold">
                    {gameStatus === 'playing' && '🎲 Playing'}
                    {gameStatus === 'You Won' && '🏆 Won!'}
                    {gameStatus === 'You Lost' && '💔 Lost'}
                  </div>
                </div>
              </div>

              {gameStatus === 'playing' && (
                <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Enter your guess..."
                      min="1"
                      max="100"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base sm:text-lg backdrop-blur-sm transition-all duration-200"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600/65 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center space-x-2 backdrop-blur-sm border border-blue-500/30 text-sm sm:text-base"
                    >
                      <span>Guess</span>
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </form>
              )}

              {feedback && (
                <div className={`text-center mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-700/30 backdrop-blur-sm rounded-lg ${getFeedbackColor()} font-medium text-sm sm:text-base lg:text-lg border border-gray-600/30`}>
                  {feedback}
                </div>
              )}

              {gameStatus !== 'playing' && (
                <div className="text-center mb-4 sm:mb-6">
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center space-x-2 mx-auto backdrop-blur-sm border border-blue-500/30 text-sm sm:text-base"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}

              {/* Guess History - Responsive */}
              {guessHistory.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-white font-semibold mb-3 text-center text-sm sm:text-base">Your Guesses</h3>
                  <div className="space-y-2 max-h-24 sm:max-h-32 overflow-y-auto">
                    {guessHistory.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-700/30 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-gray-600/30">
                        <span className="text-gray-400 text-xs sm:text-sm">Attempt {item.attempt}</span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className="text-white font-medium text-xs sm:text-sm">{item.number}</span>
                          <span className="text-sm sm:text-base">{getResultIcon(item.result)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions - Responsive */}
            <div className="mt-4 sm:mt-6 text-center text-gray-400 px-2">
              <p className="text-xs sm:text-sm">Enter a number between 1-100. You have {maxAttempts} attempts to guess correctly!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;