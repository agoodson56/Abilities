
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SystemCategory, Question, Difficulty } from '../types';
import { DIFFICULTY_COLORS, SYSTEM_THEMES } from '../constants';

interface QuizProps {
  category: SystemCategory;
  questions: Question[];
  onComplete: (answers: { [key: string]: number }) => void;
}

const SECONDS_PER_QUESTION = 30;

const Quiz: React.FC<QuizProps> = ({ category, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answersRef = useRef(answers);

  // Keep ref in sync with latest answers
  useEffect(() => { answersRef.current = answers; }, [answers]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Per-question countdown
  useEffect(() => {
    setTimeLeft(SECONDS_PER_QUESTION);
    setIsTimedOut(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  // Total elapsed timer
  useEffect(() => {
    totalTimerRef.current = setInterval(() => {
      setTotalElapsed(prev => prev + 1);
    }, 1000);
    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, []);

  // Auto-advance on timeout
  useEffect(() => {
    if (isTimedOut) {
      const timeout = setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onComplete(answersRef.current);
        }
      }, 1500); // brief pause so they see "TIME'S UP"
      return () => clearTimeout(timeout);
    }
  }, [isTimedOut, currentIndex, questions.length, onComplete]);

  const handleSelectOption = (index: number) => {
    if (isTimedOut) return; // lock out selection after timeout
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
  };

  const nextQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const timerPercent = (timeLeft / SECONDS_PER_QUESTION) * 100;
  const timerColor = timeLeft <= 10 ? 'bg-rose-500' : timeLeft <= 20 ? 'bg-amber-500' : 'bg-emerald-500';
  const timerTextColor = timeLeft <= 10 ? 'text-rose-600' : timeLeft <= 20 ? 'text-amber-600' : 'text-slate-600';

  if (!currentQuestion) return <div>No questions available.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Category progress bar */}
        <div className={`h-1.5 ${SYSTEM_THEMES[category]}`} style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }} />

        <div className="p-6 md:p-8 space-y-8">
          {/* Header: question count + difficulty + timers */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-3">
              {/* Total elapsed */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold text-slate-500 tabular-nums">{formatTime(totalElapsed)}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${DIFFICULTY_COLORS[currentQuestion.difficulty]}`}>
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          {/* Per-question countdown timer */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time Remaining</span>
              <span className={`text-sm font-black tabular-nums ${timerTextColor} ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
                {isTimedOut ? "TIME'S UP" : `0:${timeLeft.toString().padStart(2, '0')}`}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
              {currentQuestion.text}
            </h3>
            <p className="text-sm text-slate-500 italic">Topic: {currentQuestion.topic}</p>
          </div>

          {/* Answer options */}
          <div className={`grid grid-cols-1 gap-3 ${isTimedOut ? 'opacity-50 pointer-events-none' : ''}`}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isTimedOut}
                  className={`text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Timeout overlay message */}
          {isTimedOut && (
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-rose-50 border border-rose-200 rounded-xl animate-in fade-in duration-300">
              <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-rose-700">Time expired — advancing to next question...</span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${currentIndex === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-200'
              }`}
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion.id] === undefined && !isTimedOut}
            className={`px-8 py-2 rounded-lg font-bold text-white transition-all ${answers[currentQuestion.id] === undefined && !isTimedOut
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800'
              }`}
          >
            {currentIndex === questions.length - 1 ? 'Finish Evaluation' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
