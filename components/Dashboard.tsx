import React, { useMemo } from 'react';
import { Expense } from '../types';
import { CATEGORIES } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts';

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    // Group by category for top spending
    const byCategory: Record<string, number> = {};
    expenses.forEach(e => {
      byCategory[e.categoryId] = (byCategory[e.categoryId] || 0) + e.amount;
    });

    const sortedCategories = Object.entries(byCategory)
        .map(([id, amount]) => {
            const cat = CATEGORIES.find(c => c.id === id);
            return { id, amount, name: cat?.name, color: cat?.color, emoji: cat?.emoji };
        })
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3); // Top 3

    // Daily Trend for Sparkline
    const last7Days = new Array(7).fill(0).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const chartData = last7Days.map(dateStr => {
        const dayTotal = expenses
            .filter(e => e.date.startsWith(dateStr))
            .reduce((sum, e) => sum + e.amount, 0);
        return { date: dateStr, amount: dayTotal };
    });

    return { total, topCategories: sortedCategories, chartData };
  }, [expenses]);

  return (
    <div className="grid grid-cols-2 gap-3 animate-float-up">
      {/* 1. Big Card: Total Balance (Spans 2 cols) */}
      <div className="col-span-2 bg-gradient-to-br from-[#6366F1] to-[#818CF8] rounded-[24px] p-6 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-indigo-100 text-sm font-medium mb-1">Tổng chi tiêu</p>
            <h2 className="text-4xl font-bold tracking-tight">
                {new Intl.NumberFormat('vi-VN').format(stats.total)} <span className="text-xl align-top">₫</span>
            </h2>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute -bottom-4 -left-4 -right-4 h-24 opacity-30">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                    <Area type="monotone" dataKey="amount" stroke="none" fill="#ffffff" fillOpacity={0.6} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Top Spending Category */}
      <div className="col-span-1 bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Chi nhiều nhất</p>
        {stats.topCategories[0] ? (
            <div>
                <div className="text-3xl mb-1">{stats.topCategories[0].emoji}</div>
                <div className="font-semibold text-gray-800 text-sm truncate">{stats.topCategories[0].name}</div>
                <div className="text-xs text-gray-500">
                    {new Intl.NumberFormat('vi-VN', {notation: "compact"}).format(stats.topCategories[0].amount)}
                </div>
            </div>
        ) : (
            <div className="text-gray-300 text-xs mt-2">Chưa có dữ liệu</div>
        )}
      </div>

      {/* 3. Trend / Stats Mini */}
      <div className="col-span-1 bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
         <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Xu hướng</p>
         <div className="h-full w-full flex items-end pb-1">
            <div className="w-full h-12">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.chartData}>
                        <defs>
                            <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorTrend)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;