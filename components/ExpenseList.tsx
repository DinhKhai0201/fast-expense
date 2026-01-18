import React, { useState } from 'react';
import { Expense } from '../types';
import { CATEGORIES, OTHER_CATEGORY } from '../constants';
import { Inbox, ChevronDown, ChevronUp } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
  onEditClick?: (expense: Expense) => void; // NEW: Callback to navigate to edit page
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit, onEditClick }) => {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...expenses].sort((a, b) => b.timestamp - a.timestamp);

  const grouped = sorted.reduce((acc, expense) => {
      // Format: "Hôm nay", "Hôm qua", or "dd/mm"
      const dateObj = new Date(expense.date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let dateLabel = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      
      if (dateObj.toDateString() === today.toDateString()) dateLabel = "Hôm nay";
      else if (dateObj.toDateString() === yesterday.toDateString()) dateLabel = "Hôm qua";

      if (!acc[dateLabel]) acc[dateLabel] = [];
      acc[dateLabel].push(expense);
      return acc;
  }, {} as Record<string, Expense[]>);

  const groupKeys = Object.keys(grouped);
  const displayedKeys = showAll ? groupKeys : groupKeys.slice(0, 3); // Show only top 3 groups by default

  if (expenses.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
             <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                 <Inbox size={40} strokeWidth={1.5} />
             </div>
             <p className="font-medium">Chưa có giao dịch</p>
             <p className="text-sm mt-1">Hãy nhập chi tiêu đầu tiên!</p>
          </div>
      )
  }

  return (
    <div className="space-y-6 pb-32"> {/* Increased bottom padding to avoid overlap with fixed input */}
      <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-gray-800">Gần đây</h3>
          {groupKeys.length > 3 && (
              <button 
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                  {showAll ? (
                      <>Thu gọn <ChevronUp size={14} /></>
                  ) : (
                      <>Xem tất cả ({expenses.length}) <ChevronDown size={14} /></>
                  )}
              </button>
          )}
      </div>

      {displayedKeys.map((date) => (
        <div key={date} className="animate-float-up">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-sm z-10 py-2">{date}</h4>
          <div className="space-y-3">
            {grouped[date].map((item) => {
              const category = CATEGORIES.find(c => c.id === item.categoryId) || OTHER_CATEGORY;
              
              return (
                <div 
                    key={item.id} 
                    onClick={() => onEditClick?.(item)}
                    className="group bg-white rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-transparent hover:border-indigo-100 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 group-hover:bg-indigo-50 transition-colors">
                          {category.emoji}
                      </div>
                      <div className="min-w-0">
                          <p className="text-gray-800 font-medium truncate pr-2">{item.description}</p>
                          <p className="text-xs text-gray-400 font-medium">{category.name}</p>
                      </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`font-bold ${category.id === 'income' ? 'text-emerald-500' : 'text-gray-800'}`}>
                        {category.id !== 'income' && '-'}
                        {new Intl.NumberFormat('vi-VN').format(item.amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!showAll && groupKeys.length > 3 && (
          <div className="flex justify-center pt-2">
              <button 
                  onClick={() => setShowAll(true)}
                  className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
              >
                  ... và còn {expenses.length - grouped[groupKeys[0]].length - grouped[groupKeys[1]].length - grouped[groupKeys[2]].length} giao dịch khác
              </button>
          </div>
      )}
    </div>
  );
};

export default ExpenseList;