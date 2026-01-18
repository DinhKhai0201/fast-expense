import React, { useRef } from 'react';
import { Expense } from '../types';
import { Download, Upload, Trash2, ShieldCheck, Database, Info, ArrowLeft, BarChart3 } from 'lucide-react';

interface SettingsProps {
  expenses: Expense[];
  onImport: (data: Expense[]) => void;
  onClear: () => void;
  onBack: () => void;
  onNavigateToStats: () => void; // NEW: Navigate to stats page
}

const Settings: React.FC<SettingsProps> = ({ expenses, onImport, onClear, onBack, onNavigateToStats }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nhanhchitieu_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
            if (window.confirm(`Tìm thấy ${json.length} giao dịch trong file. Bạn có muốn ghi đè dữ liệu hiện tại không?`)) {
                onImport(json);
                alert("Khôi phục dữ liệu thành công!");
            }
        } else {
            alert("File không hợp lệ.");
        }
      } catch (err) {
        alert("Lỗi đọc file JSON.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
        <h1 className="text-2xl font-bold text-gray-800">Cài đặt</h1>
      </div>
      
      {/* Statistics Card  */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                <BarChart3 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Phân tích</h2>
        </div>
        
        <button 
            onClick={onNavigateToStats}
            className="w-full flex items-center justify-between px-5 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 py-4 rounded-[20px] font-semibold transition-all group"
        >
            <div className="flex items-center gap-3">
                <BarChart3 size={20} className="text-gray-400 group-hover:text-indigo-500"/>
                <span>Thống kê chi tiêu</span>
            </div>
            <span className="text-gray-400 group-hover:text-indigo-500">→</span>
        </button>
      </div>
      
      {/* Data Management Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Database size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Dữ liệu</h2>
        </div>
        
        <div className="space-y-3">
            <button 
                onClick={handleExport}
                className="w-full flex items-center justify-between px-5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-4 rounded-[20px] font-semibold transition-all group"
            >
                <div className="flex items-center gap-3">
                    <Download size={20} className="text-gray-400 group-hover:text-blue-500"/>
                    <span>Sao lưu (Backup)</span>
                </div>
            </button>

            <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between px-5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-4 rounded-[20px] font-semibold transition-all group"
            >
                <div className="flex items-center gap-3">
                    <Upload size={20} className="text-gray-400 group-hover:text-blue-500"/>
                    <span>Khôi phục (Restore)</span>
                </div>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
         <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-50 p-3 rounded-2xl text-rose-500">
                <Trash2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Vùng nguy hiểm</h2>
        </div>
        <button 
            onClick={onClear}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-rose-100 hover:bg-rose-50 text-rose-500 py-4 rounded-[20px] font-bold transition-colors"
        >
            Xóa toàn bộ dữ liệu
        </button>
      </div>

      <div className="flex justify-center gap-6 text-gray-400 mt-8">
        <div className="flex items-center gap-1.5 text-xs font-medium">
            <ShieldCheck size={14} />
            <span>Riêng tư 100%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
             <Info size={14} />
             <span>Offline Mode</span>
        </div>
      </div>

      {/* Author Footer */}
      <div className="flex justify-center mt-6 pb-4">
        <a 
          href="https://github.com/DinhKhai0201" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-indigo-500 transition-colors group"
        >
          <span>Made with</span>
          <span className="text-rose-400 group-hover:text-rose-500 transition-colors">❤️</span>
          <span>by</span>
          <span className="font-semibold underline decoration-dotted">dinhkhai0201</span>
        </a>
      </div>
    </div>
  );
};

export default Settings;