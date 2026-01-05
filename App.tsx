import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import ResultView from './components/ResultView';
import { optimizePromptWithGemini } from './services/geminiService';
import { AppState, OptimizationResult } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async (inputPrompt: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const optimizationData = await optimizePromptWithGemini(inputPrompt);
      setResult({
        original: inputPrompt,
        ...optimizationData
      });
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to perform surgery on your prompt. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              Prompt Surgeon
            </h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-500 border border-slate-200">
            v1.0 • Powered by Gemini
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-10">
          
          {appState === AppState.IDLE && (
            <div className="text-center space-y-4 max-w-2xl animate-fade-in-down">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                Precision Prompts, <br />
                <span className="text-teal-600">Surgically Enhanced.</span>
              </h2>
              <p className="text-lg text-slate-600">
                Don't settle for vague AI responses. We rewrite your ideas using the 
                <span className="font-semibold text-slate-800 mx-1">Role-Task-Context-Format</span> 
                framework for maximum impact.
              </p>
            </div>
          )}

          {appState === AppState.ERROR && (
             <div className="w-full max-w-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
               </svg>
               {error}
               <button onClick={() => setAppState(AppState.IDLE)} className="ml-auto text-sm underline hover:text-red-800">Try Again</button>
             </div>
          )}

          {(appState === AppState.IDLE || appState === AppState.LOADING || appState === AppState.ERROR) && (
             <PromptInput onOptimize={handleOptimize} isLoading={appState === AppState.LOADING} />
          )}

          {appState === AppState.SUCCESS && result && (
            <ResultView result={result} onReset={handleReset} />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Prompt Surgeon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;