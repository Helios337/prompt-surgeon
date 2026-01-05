import React, { useState } from 'react';
import { OptimizationResult } from '../types';
import { CopyIcon, CheckIcon, RefreshIcon, ArrowRightIcon } from './Icons';

interface ResultViewProps {
  result: OptimizationResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Original Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Original Input
            </h3>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[300px] text-slate-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-400/50"></div>
            <p className="whitespace-pre-wrap leading-relaxed opacity-80">{result.original}</p>
          </div>
        </div>

        {/* Optimized Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold text-teal-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Surgically Optimized
            </h3>
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 transition-colors"
            >
              {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="bg-white border-2 border-teal-100 rounded-2xl shadow-xl shadow-teal-900/5 overflow-hidden flex flex-col min-h-[300px]">
            <div className="p-6 flex-grow">
               <p className="whitespace-pre-wrap text-slate-800 leading-relaxed font-medium text-lg">
                {result.optimizedPrompt}
              </p>
            </div>
            
            {/* Analysis Breakdown */}
            <div className="bg-teal-50/50 border-t border-teal-100 p-4">
              <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 px-2">Anatomy of this Prompt</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-teal-100/50 shadow-sm">
                  <span className="text-xs font-bold text-teal-600 block mb-1">Role</span>
                  <p className="text-sm text-slate-600 leading-snug">{result.analysis.role}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-teal-100/50 shadow-sm">
                  <span className="text-xs font-bold text-teal-600 block mb-1">Task</span>
                  <p className="text-sm text-slate-600 leading-snug">{result.analysis.task}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-teal-100/50 shadow-sm">
                  <span className="text-xs font-bold text-teal-600 block mb-1">Context</span>
                  <p className="text-sm text-slate-600 leading-snug">{result.analysis.context}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-teal-100/50 shadow-sm">
                  <span className="text-xs font-bold text-teal-600 block mb-1">Format</span>
                  <p className="text-sm text-slate-600 leading-snug">{result.analysis.format}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:border-teal-400 hover:text-teal-600 transition-all shadow-sm hover:shadow-md"
        >
          <RefreshIcon className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
          Optimize Another
        </button>
      </div>
    </div>
  );
};

export default ResultView;