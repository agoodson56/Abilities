
import React, { useState, useEffect } from 'react';
import { SystemCategory, Question, Technician, EvaluationResult } from './types';
import { generateQuestionsForCategory } from './services/geminiService';
import { loadTechnicians as loadTechniciansFromCloud, saveResult as saveResultToCloud } from './services/dataService';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Results from './components/Results';
import ProfileManager from './components/ProfileManager';
import ManagerReview from './components/ManagerReview';
import Login from './components/Login';
import { BRAND_NAME } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'quiz' | 'results' | 'profiles' | 'manager'>('login');
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [libraryStats, setLibraryStats] = useState<{ [key in SystemCategory]?: number }>({});

  // Technician State
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [activeTechId, setActiveTechId] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved login
    const savedLogin = localStorage.getItem('3dts_login');
    if (savedLogin) {
      try {
        const parsed = JSON.parse(savedLogin);
        setLoggedInUser(parsed);
        setCurrentView('dashboard');
      } catch (e) { }
    }

    // Load Library Stats
    const stats: { [key in SystemCategory]?: number } = {};
    Object.values(SystemCategory).forEach(cat => {
      const saved = localStorage.getItem(`lib_${cat}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          stats[cat] = parsed.length;
        } catch (e) { }
      }
    });
    setLibraryStats(stats);

    // Load Technicians from cloud API
    loadTechniciansFromCloud().then(techs => {
      setTechnicians(techs);
    }).catch(err => {
      console.error('Failed to load technicians:', err);
    });

    const lastActive = localStorage.getItem('3dts_active_tech_id');
    if (lastActive) setActiveTechId(lastActive);
  }, []);

  const handleLogin = (name: string, email: string) => {
    const user = { name, email };
    setLoggedInUser(user);
    localStorage.setItem('3dts_login', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('3dts_login');
    setCurrentView('login');
  };

  const saveTechnicians = (updated: Technician[]) => {
    setTechnicians(updated);
    localStorage.setItem('3dts_technicians', JSON.stringify(updated));
  };

  const refreshTechnicians = () => {
    loadTechniciansFromCloud().then(techs => {
      setTechnicians(techs);
    }).catch(err => {
      console.error('Failed to refresh technicians:', err);
    });
  };

  const startEvaluation = async (category: SystemCategory) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setUserAnswers({});

    try {
      const saved = localStorage.getItem(`lib_${category}`);
      if (saved) {
        setQuestions(JSON.parse(saved));
      } else {
        const generated = await generateQuestionsForCategory(category);
        setQuestions(generated);
        localStorage.setItem(`lib_${category}`, JSON.stringify(generated));
      }
      setCurrentView('quiz');
    } catch (error) {
      alert("Error accessing the Memory Library.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (answers: { [key: string]: number }) => {
    setUserAnswers(answers);
    setCurrentView('results');
  };

  const saveResultToProfile = async (result: EvaluationResult) => {
    if (!activeTechId) return;

    try {
      await saveResultToCloud(activeTechId, result);
      // Update local state to reflect the change
      setTechnicians(prev => prev.map(t => {
        if (t.id === activeTechId) {
          return {
            ...t,
            lastEvaluated: new Date().toISOString(),
            results: [result, ...t.results]
          };
        }
        return t;
      }));
    } catch (err) {
      console.error('Failed to save result:', err);
    }
  };

  const resetToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
    setQuestions([]);
    setUserAnswers({});
  };

  const clearLibrary = () => {
    if (confirm("Clear all cached questions from the Memory Library?")) {
      Object.values(SystemCategory).forEach(cat => localStorage.removeItem(`lib_${cat}`));
      setLibraryStats({});
      alert("Library purged.");
    }
  };

  const activeTech = technicians.find(t => t.id === activeTechId);

  // Show login screen if not logged in
  if (currentView === 'login' || !loggedInUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white py-4 px-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetToDashboard}>
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">{BRAND_NAME}</h1>
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-1">Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Logged in user display */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-300 truncate max-w-[150px]">
                {loggedInUser.name}
              </span>
            </div>

            <button
              onClick={() => setCurrentView('profiles')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${currentView === 'profiles'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Tech Profiles
            </button>

            <button
              onClick={() => setCurrentView('manager')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${currentView === 'manager'
                ? 'bg-amber-500 border-amber-400 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Manager Review
            </button>

            {activeTech && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 truncate max-w-[120px]">
                  Evaluating: {activeTech.name}
                </span>
              </div>
            )}

            {currentView !== 'dashboard' && (
              <button
                onClick={resetToDashboard}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold border border-slate-600"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 bg-slate-900 rounded-full border-4 border-slate-50 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">3DTS</span>
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-slate-800 font-bold text-xl">Accessing Memory Library</p>
              <p className="text-slate-500 max-w-sm text-sm">Compiling technical standards for {selectedCategory} evaluation...</p>
            </div>
          </div>
        ) : (
          <>
            {currentView === 'dashboard' && (
              <Dashboard
                onStart={startEvaluation}
                libraryStats={libraryStats}
                activeTech={activeTech || null}
              />
            )}
            {currentView === 'profiles' && (
              <ProfileManager
                technicians={technicians}
                activeTechId={activeTechId}
                onSelect={(id) => {
                  setActiveTechId(id);
                  localStorage.setItem('3dts_active_tech_id', id || '');
                }}
                onUpdate={saveTechnicians}
                onRefresh={refreshTechnicians}
                onClearLibrary={clearLibrary}
              />
            )}
            {currentView === 'manager' && (
              <ManagerReview technicians={technicians} />
            )}
            {currentView === 'quiz' && selectedCategory && (
              <Quiz
                category={selectedCategory}
                questions={questions}
                onComplete={handleQuizComplete}
              />
            )}
            {currentView === 'results' && selectedCategory && (
              <Results
                category={selectedCategory}
                questions={questions}
                answers={userAnswers}
                onReset={resetToDashboard}
                onSaveToProfile={saveResultToProfile}
                isSaved={!!activeTechId}
                loggedInUser={loggedInUser}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest">
        &copy; {new Date().getFullYear()} {BRAND_NAME} &bull; Safety Code Audit &bull; Technical Integrity
      </footer>
    </div>
  );
};

export default App;
