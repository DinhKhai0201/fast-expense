import React, { useState, useEffect, useRef } from 'react';
import { parseExpenseInput } from '../utils/parser';
import { Expense, ParseResult } from '../types';
import { ArrowUp } from 'lucide-react';

interface ExpenseInputProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseInput: React.FC<ExpenseInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState<ParseResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live parsing
  useEffect(() => {
    if (!input.trim()) {
      setPreview(null);
      return;
    }
    const result = parseExpenseInput(input);
    setPreview(result);
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!preview || preview.amount === 0) return;

    onAdd({
      amount: preview.amount,
      description: preview.description,
      categoryId: preview.category.id,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });

    setInput('');
    setPreview(null);
    
    // Keep focus
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  return (
    // Updated: Fixed positioning at bottom-[50px] to avoid scroll issues and match request
    <div className="fixed bottom-[50px] left-0 right-0 px-4 z-50 pointer-events-none safe-area-pb">
      <div className="max-w-md mx-auto relative pointer-events-auto">
        
        {/* Floating Bubble Preview (The "Magic" Part) */}
        {preview && preview.amount > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-3 flex justify-center animate-float-up">
                <div 
                    className="bg-gray-800/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 max-w-[95%] border border-white/10"
                    onClick={() => handleSubmit()}
                >
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 bg-white/10 shadow-inner"
                        style={{ backgroundColor: preview.category.color }}
                    >
                        {preview.category.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                             <span className="font-bold text-lg text-white">
                                {new Intl.NumberFormat('vi-VN').format(preview.amount)}
                             </span>
                             <span className="text-xs text-gray-300 truncate max-w-[100px]">{preview.category.name}</span>
                        </div>
                        <div className="text-xs text-gray-300 truncate">{preview.description}</div>
                    </div>
                    <div className="w-px h-8 bg-white/20 mx-1"></div>
                    <button onClick={(e) => { e.stopPropagation(); handleSubmit(); }} className="text-blue-300 font-bold text-sm px-1">
                        Lưu
                    </button>
                </div>
            </div>
        )}

        {/* The Magic Input Bar */}
        <form 
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[24px] p-2 flex items-center gap-2 transition-transform focus-within:translate-y-[-5px]"
        >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập: cafe 30k..."
              className="flex-1 bg-transparent border-none outline-none pl-4 text-gray-800 placeholder-gray-400 font-medium text-lg h-12"
            />
            
            <button
              type="submit"
              disabled={!preview || preview.amount === 0}
              className={`w-12 h-12 rounded-[20px] flex items-center justify-center transition-all duration-300 ${
                  preview && preview.amount > 0 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/40 rotate-0 scale-100' 
                  : 'bg-gray-100 text-gray-400 rotate-90 scale-90'
              }`}
            >
              <ArrowUp size={24} strokeWidth={3} />
            </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseInput;