
export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT_JOURNEYMAN = 'Expert Journeyman'
}

export enum SystemCategory {
  SECURITY = 'Security Systems',
  CABLING = 'Structured Cabling',
  AUDIO_VIDEO = 'Audio & Video Systems',
  FIRE_LIFE_SAFETY = 'Fire/Life Safety Systems',
  NETWORKING = 'Networking',
  DAS = 'Distributed Antenna Systems',
  INTRUSION = 'Intrusion Detection'
}

export interface Question {
  id: string;
  category: SystemCategory;
  difficulty: Difficulty;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
}

export interface EvaluationResult {
  id: string;
  category: SystemCategory;
  score: number;
  percentage: number;
  date: string;
  totalQuestions: number;
  level: string;
  breakdown: {
    [key in Difficulty]: { correct: number; total: number };
  };
  analysis?: string;
  tabSwitchCount?: number;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  results: EvaluationResult[];
  certifications: string[];
  joinedDate: string;
  lastEvaluated: string | null;
}
