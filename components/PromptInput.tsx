import React, { useState } from 'react';
import { SparklesIcon } from './Icons';

interface PromptInputProps {
  onOptimize: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onOptimize, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onOptimize(text);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Messy Prompt Input
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Paste your rough idea, vague request, or half-baked thought here.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., I want a blog post about coffee..."
            className="w-full h-48 p-4 text-slate-700 placeholder-slate-400 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none text-lg leading-relaxed shadow-inner"
            disabled={isLoading}
          />
          
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!text.trim() || isLoading}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all transform duration-200
                ${!text.trim() || isLoading 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 hover:scale-105 hover:shadow-lg active:scale-95'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Operating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Optimize Prompt
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;