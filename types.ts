export interface PromptAnalysis {
  role: string;
  task: string;
  context: string;
  format: string;
}

export interface OptimizationResult {
  original: string;
  optimizedPrompt: string;
  analysis: PromptAnalysis;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}