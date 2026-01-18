import Fuse from 'fuse.js';
import { CATEGORIES, OTHER_CATEGORY } from '../constants';
import { Category, ParseResult } from '../types';

// Initialize Fuse instance
const fuseOptions = {
  includeScore: true,
  threshold: 0.4, // Lower is stricter
  keys: ['keywords', 'name']
};

const fuse = new Fuse(CATEGORIES.filter(c => c.id !== 'other'), fuseOptions);

export const parseExpenseInput = (input: string): ParseResult => {
  const text = input.trim().toLowerCase();
  
  // 1. Extract Amount using Regex
  // Matches: 50k, 50 k, 50.000, 50,000, 1.5tr, 1tr5
  const amountRegex = /(\d+(?:[.,]\d+)?)\s*(k|n|đ|ngàn|nghìn|lít|củ|tr|triệu|m)?/gi;
  const matches = [...text.matchAll(amountRegex)];
  
  let amount = 0;
  let detectedText = "";

  // Strategy: Find the last valid money pattern in the string, assuming user might type "an com 50k" or "50k an com"
  // We prioritize the one with a unit.
  
  let bestMatch = matches.find(m => m[2]) || matches[0];

  if (bestMatch) {
    let valueStr = bestMatch[1].replace(',', '.'); // Normalize decimal
    // Handle Vietnamese format where dot might be thousands separator if followed by 3 digits (rough heuristic)
    // For simplicity in this regex, we treat dot as decimal if the string is short, but let's stick to standard float parsing
    // A robust parser for 50.000 vs 50.5 is complex, we will assume standard programming float style or explicit units.
    
    // If user types 50.000 (meaning 50k), parseFloat sees 50.
    // However, if unit is present (k, n, tr), we interpret strictly.
    
    let value = parseFloat(valueStr);
    const unit = bestMatch[2] ? bestMatch[2].toLowerCase() : '';

    if (['k', 'n', 'ngàn', 'nghìn'].includes(unit)) {
      amount = value * 1000;
    } else if (['tr', 'triệu', 'm', 'củ'].includes(unit)) {
      amount = value * 1000000;
    } else if (['lít'].includes(unit)) {
        amount = value * 100000; // 1 lit = 100k slang
    } else {
      // No unit. If text contains "50000", value is 50000.
      // If text is "50", it might be 50k implied if strict mode, but let's keep it raw.
      // Heuristic: if value < 1000, assume 'k' contextually? 
      // Let's stick to raw unless < 1000 and the user explicitly uses 'k' or we just default to raw.
      // For this app, let's treat raw numbers < 1000 as "k" because rarely do people track 500 VND.
      if (value < 1000 && value > 0) {
        amount = value * 1000; 
      } else {
        amount = value;
      }
    }
    
    // Remove the matched amount from the description text to clean it up
    detectedText = text.replace(bestMatch[0], '').trim();
    // Clean up extra spaces or punctuation left over
    detectedText = detectedText.replace(/\s+/g, ' ').trim();
  } else {
    detectedText = text;
  }

  // 2. Identify Category using Fuse.js
  let detectedCategory: Category = OTHER_CATEGORY;
  let confidence = 0;

  if (detectedText.length > 0) {
    const results = fuse.search(detectedText);
    if (results.length > 0) {
        // @ts-ignore - Fuse types can be tricky
        detectedCategory = results[0].item as Category;
        // @ts-ignore
        confidence = 1 - (results[0].score || 1); // Fuse score: 0 is perfect, 1 is mismatch
    } else {
        // Fallback: Check specific keywords manually if Fuse fails (Level 1 Exact Match)
        const exactMatch = CATEGORIES.find(c => c.keywords.some(k => detectedText.includes(k)));
        if (exactMatch) {
            detectedCategory = exactMatch;
            confidence = 1;
        }
    }
  }

  return {
    amount,
    description: detectedText || "Chi tiêu",
    category: detectedCategory,
    confidence
  };
};
