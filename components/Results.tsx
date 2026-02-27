
import React, { useEffect, useState } from 'react';
import { SystemCategory, Question, Difficulty, EvaluationResult } from '../types';
import { analyzeTechnicianLevel } from '../services/geminiService';
import { sendEvaluationReport } from '../services/emailService';
import { DIFFICULTY_ORDER, DIFFICULTY_COLORS } from '../constants';

interface ResultsProps {
  category: SystemCategory;
  questions: Question[];
  answers: { [key: string]: number };
  onReset: () => void;
  onSaveToProfile: (result: EvaluationResult) => void;
  isSaved: boolean;
  loggedInUser: { name: string; email: string };
  tabSwitchCount?: number;
}

const Results: React.FC<ResultsProps> = ({ category, questions, answers, onReset, onSaveToProfile, isSaved, loggedInUser, tabSwitchCount = 0 }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [hasSaved, setHasSaved] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'pending' | 'sending' | 'sent' | 'error'>('pending');

  const total = questions.length;
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswerIndex);
  const scoreCount = correctAnswers.length;
  const percentage = Math.round((scoreCount / total) * 100);

  // Group by difficulty
  const breakdown = DIFFICULTY_ORDER.reduce((acc, diff) => {
    const diffQuestions = questions.filter(q => q.difficulty === diff);
    const diffCorrect = diffQuestions.filter(q => answers[q.id] === q.correctAnswerIndex);
    acc[diff] = { correct: diffCorrect.length, total: diffQuestions.length };
    return acc;
  }, {} as { [key in Difficulty]: { correct: number; total: number } });

  const getRank = () => {
    if (percentage >= 90) return { title: 'Elite Master', class: 'text-indigo-600' };
    if (percentage >= 75) return { title: 'Advanced Journeyman', class: 'text-emerald-600' };
    if (percentage >= 50) return { title: 'Qualified Technician', class: 'text-sky-600' };
    return { title: 'Apprentice / Developing', class: 'text-orange-600' };
  };

  const rank = getRank();

  // Effect 1: Fetch AI analysis only
  useEffect(() => {
    let cancelled = false;
    const getAnalysis = async () => {
      try {
        const mappedResults = questions.map(q => ({
          question: q,
          isCorrect: answers[q.id] === q.correctAnswerIndex
        }));
        const text = await analyzeTechnicianLevel(category, mappedResults);
        if (!cancelled) {
          setAnalysis(text);
          setIsAnalyzing(false);
        }
      } catch (err) {
        console.error('Analysis error:', err);
        if (!cancelled) {
          setAnalysis('Analysis could not be generated.');
          setIsAnalyzing(false);
        }
      }
    };
    getAnalysis();
    return () => { cancelled = true; };
  }, [category, questions, answers]);

  // Effect 2: Auto-save to profile once analysis is ready
  useEffect(() => {
    if (isAnalyzing || hasSaved || !isSaved) return;
    onSaveToProfile({
      id: crypto.randomUUID(),
      category,
      score: scoreCount,
      percentage,
      date: new Date().toISOString(),
      totalQuestions: total,
      level: rank.title,
      breakdown: breakdown,
      analysis: analysis || undefined,
      tabSwitchCount: tabSwitchCount > 0 ? tabSwitchCount : undefined
    });
    setHasSaved(true);
  }, [isAnalyzing, hasSaved, isSaved]);

  // Effect 3: Send email report once analysis is ready
  useEffect(() => {
    if (isAnalyzing || emailStatus !== 'pending') return;
    setEmailStatus('sending');
    const sendEmail = async () => {
      try {
        const emailData = {
          technicianName: loggedInUser.name,
          technicianEmail: loggedInUser.email,
          category,
          score: scoreCount,
          percentage,
          level: rank.title,
          breakdown,
          analysis,
          questions: questions.map(q => ({
            text: q.text,
            isCorrect: answers[q.id] === q.correctAnswerIndex,
            difficulty: q.difficulty,
            topic: q.topic,
            explanation: q.explanation
          }))
        };
        const result = await sendEvaluationReport(emailData);
        setEmailStatus(result.success ? 'sent' : 'error');
      } catch (err) {
        console.error('Email error:', err);
        setEmailStatus('error');
      }
    };
    sendEmail();
  }, [isAnalyzing, emailStatus]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-8 md:p-12 text-center space-y-4 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Evaluation Summary</h2>
          <h3 className="text-4xl md:text-5xl font-black">{category}</h3>
          <div className="flex flex-col items-center pt-4">
            <span className={`text-6xl md:text-7xl font-black ${percentage > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {percentage}%
            </span>
            <span className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-2">Composite Proficiency Score</span>
          </div>
          <div className="pt-6">
            <span className={`text-xl font-black px-8 py-3 rounded-full border-4 ${rank.class.replace('text-', 'border-').replace('-600', '-400/30')} bg-slate-800 ${rank.class} uppercase tracking-tight`}>
              {rank.title}
            </span>
          </div>
          {isSaved && hasSaved && (
            <div className="absolute bottom-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
              Persisted to Profile
            </div>
          )}
          {/* Email status indicator */}
          <div className="absolute bottom-4 left-4">
            {emailStatus === 'sending' && (
              <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Sending Report...
              </div>
            )}
            {emailStatus === 'sent' && (
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Report Emailed
              </div>
            )}
            {emailStatus === 'error' && (
              <div className="flex items-center gap-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                Email Failed
              </div>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white">
          <div className="space-y-6">
            <h4 className="font-black text-slate-900 text-sm border-b pb-2 uppercase tracking-[0.2em]">Proficiency Breakdown</h4>
            <div className="space-y-5">
              {DIFFICULTY_ORDER.map(diff => (
                <div key={diff} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span className="text-slate-500">{diff}</span>
                    <span className="text-slate-900">{breakdown[diff].correct} / {breakdown[diff].total}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${diff === Difficulty.EXPERT_JOURNEYMAN ? 'bg-rose-500' :
                        diff === Difficulty.ADVANCED ? 'bg-orange-500' :
                          diff === Difficulty.INTERMEDIATE ? 'bg-sky-500' : 'bg-emerald-500'
                        }`}
                      style={{ width: `${(breakdown[diff].correct / (breakdown[diff].total || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-slate-900 text-sm border-b pb-2 uppercase tracking-[0.2em]">Strategic Feedback</h4>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 italic gap-3">
                <div className="animate-spin h-8 w-8 border-2 border-slate-200 border-t-slate-600 rounded-full"></div>
                <span className="text-xs uppercase font-bold tracking-widest">Generating Insight...</span>
              </div>
            ) : (
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap prose prose-slate max-w-none">
                {analysis}
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onReset}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
          >
            Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            Print Certificate
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] px-4">Technical Review Ledger</h4>
        <div className="grid grid-cols-1 gap-4">
          {questions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correctAnswerIndex;
            return (
              <div key={q.id} className={`p-6 rounded-2xl border-2 bg-white transition-all ${isCorrect ? 'border-emerald-50 shadow-sm' : 'border-rose-50 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-400 text-[10px] uppercase tracking-widest">Ref: Q-{idx + 1} &bull; {q.difficulty}</span>
                    <span className="font-bold text-slate-500 text-xs mt-1">Topic: {q.topic}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {isCorrect ? 'Validated' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-slate-800 font-bold text-lg mb-4 leading-snug">{q.text}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Memory Library Reference</span>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
