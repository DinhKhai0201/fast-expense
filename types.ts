export interface Category {
  id: string;
  name: string;
  keywords: string[];
  color: string;
  icon: string;
  emoji: string;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string; // ISO string
  timestamp: number;
}

export interface ParseResult {
  amount: number;
  description: string;
  category: Category;
  confidence: number;
}

export type ViewState = 'HOME' | 'SETTINGS' | 'EDIT' | 'STATS';