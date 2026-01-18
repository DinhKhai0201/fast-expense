import React, { useMemo } from 'react';
import { Expense } from '../types';
import { CATEGORIES } from '../constants';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';

interface StatsPageProps {
  expenses: Expense[];
  onBack: () => void;
}

const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#14B8A6', '#F97316', '#A855F7', '#06B6D4'];

const StatsPage: React.FC<StatsPageProps> = ({ expenses, onBack }) => {
  
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const count = expenses.length;
    
    // Category breakdown
    const byCategory: Record<string, number> = {};
    expenses.forEach(e => {
      byCategory[e.categoryId] = (byCategory[e.categoryId] || 0) + e.amount;
    });
    
    const categoryData = Object.entries(byCategory)
      .map(([id, amount]) => {
        const cat = CATEGORIES.find(c => c.id === id);
        return { 
          name: cat?.name || 'Khác', 
          value: amount,
          emoji: cat?.emoji,
          percentage: ((amount / total) * 100).toFixed(1)
        };
      })
      .sort((a, b) => b.value - a.value);
    
    // Daily trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });
    
    const dailyTrend = last7Days.map(dateStr => {
      const dayExpenses = expenses.filter(e => e.date.startsWith(dateStr));
      const dayTotal = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
      const dayLabel = new Date(dateStr).toLocaleDateString('vi-VN', { weekday: 'short' });
      return { date: dayLabel, amount: dayTotal };
    });
    
    // Monthly comparison (current vs last month)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthExpenses = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    
    const lastMonthExpenses = expenses.filter(e => {
      const d = new Date(e.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
    });
    
    const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const monthChange = lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;
    
    // Average per day
    const avgPerDay = count > 0 ? total / count : 0;
    
    return {
      total,
      count,
      categoryData,
      dailyTrend,
      currentMonthTotal,
      lastMonthTotal,
      monthChange,
      avgPerDay
    };
  }, [expenses]);

  return (
    <div className="space-y-6 animate-float-up pb-20">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Thống kê</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Spending */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[20px] p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} />
            <p className="text-xs font-semibold opacity-80">Tổng chi tiêu</p>
          </div>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(stats.total)}₫
          </p>
        </div>

        {/* Transaction Count */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[20px] p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} />
            <p className="text-xs font-semibold opacity-80">Giao dịch</p>
          </div>
          <p className="text-2xl font-bold">{stats.count}</p>
          <p className="text-xs opacity-80">lần chi tiêu</p>
        </div>

        {/* Month Comparison */}
        <div className="col-span-2 bg-white rounded-[20px] p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">So với tháng trước</p>
              <p className="text-xl font-bold text-gray-800">
                {new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(stats.currentMonthTotal)}₫
              </p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
              stats.monthChange > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {stats.monthChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(stats.monthChange).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Chi tiêu theo danh mục</h2>
        
        {stats.categoryData.length > 0 ? (
          <>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => new Intl.NumberFormat('vi-VN').format(value || 0) + '₫'}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div className="space-y-2">
              {stats.categoryData.slice(0, 5).map((cat, index) => (
                <div key={cat.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-medium text-gray-700">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(cat.value)}₫
                    </p>
                    <p className="text-xs text-gray-500">{cat.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-8">Chưa có dữ liệu</p>
        )}
      </div>

      {/* Daily Trend Chart */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Xu hướng 7 ngày</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.dailyTrend}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#94A3B8"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#94A3B8"
                tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(value)}
              />
              <Tooltip 
                formatter={(value: any) => new Intl.NumberFormat('vi-VN').format(value || 0) + '₫'}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#6366F1" 
                strokeWidth={3}
                dot={{ fill: '#6366F1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Categories Bar Chart */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Top 5 danh mục</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.categoryData.slice(0, 5)} layout="vertical">
              <XAxis 
                type="number"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(value)}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip 
                formatter={(value: any) => new Intl.NumberFormat('vi-VN').format(value || 0) + '₫'}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
              />
              <Bar 
                dataKey="value" 
                fill="#6366F1"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
