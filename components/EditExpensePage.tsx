import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { CATEGORIES } from '../constants';
import { ArrowLeft, Save, Calendar, Trash2 } from 'lucide-react';

interface EditExpensePageProps {
  expense: Expense;
  onSave: (updatedExpense: Expense) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const EditExpensePage: React.FC<EditExpensePageProps> = ({ expense, onSave, onDelete, onBack }) => {
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [categoryId, setCategoryId] = useState(expense.categoryId);
  const [date, setDate] = useState(expense.date.split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !description.trim()) return;

    const originalDate = new Date(expense.date);
    const newDateObj = new Date(date);
    newDateObj.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds());

    const updatedExpense: Expense = {
      ...expense,
      amount: Number(amount),
      description: description.trim(),
      categoryId,
      date: newDateObj.toISOString(),
    };

    onSave(updatedExpense);
    onBack();
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      onDelete(expense.id);
      onBack();
    }
  };

  return (
    <div className="space-y-6 animate-float-up pb-32">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa chi tiêu</h1>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Amount Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Số tiền</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full text-4xl font-bold text-indigo-600 bg-transparent outline-none placeholder-gray-300"
            autoFocus
          />
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Nội dung</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-lg font-medium text-gray-700 bg-transparent outline-none placeholder-gray-300"
            placeholder="Nhập mô tả..."
          />
        </div>

        {/* Category Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-4">Danh mục</label>
          <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border ${
                  categoryId === cat.id 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500' 
                    : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-xs font-semibold text-center">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Ngày</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-12 p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-200 outline-none font-medium text-gray-700"
            />
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-100 safe-area-pb z-40">
          <div className="max-w-md mx-auto flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="p-4 rounded-[20px] bg-white border-2 border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors shadow-sm"
            >
              <Trash2 size={24} />
            </button>
            
            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-[20px] bg-gray-900 text-white font-bold hover:bg-gray-800 shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save size={20} />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditExpensePage;
