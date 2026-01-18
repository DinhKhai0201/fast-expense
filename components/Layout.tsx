import React from 'react';
import { ViewState } from '../types';
import { Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ViewState;
  onTabChange: (tab: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] relative overflow-hidden">
      {/* Top Header - Minimalist - Only show on HOME */}
      {activeTab === 'HOME' && (
        <header className="px-6 pt-12 pb-2 flex justify-between items-center bg-[#F8FAFC] sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Xin chào, Bạn 👋</h1>
            <p className="text-sm text-gray-500 font-medium">Chi tiêu thông minh hôm nay nhé.</p>
          </div>
          <button 
            onClick={() => onTabChange('SETTINGS')}
            className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <Settings size={20} />
          </button>
        </header>
      )}

      {/* Main Content Area */}
      {/* Added pt-6 when header is hidden */}
      <main className={`flex-1 overflow-y-auto px-4 pb-20 scroll-smooth no-scrollbar ${activeTab === 'HOME' ? 'pt-2' : 'pt-6'}`}>
        <div className="max-w-md mx-auto space-y-6">
           {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;