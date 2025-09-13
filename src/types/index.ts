export interface Skill {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  views: number;
  createdAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

export interface User {
  id: string;
  name: string;
  streak: number;
  skillsLearned: number;
  badges: string[];
  recentSkills: string[];
}

export interface AIResponse {
  title: string;
  introduction: string;
  steps: string[];
  tips: string[];
  estimatedTime: string;
  difficulty: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  skillCount: number;
}