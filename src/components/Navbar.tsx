import React, { useRef } from 'react';
import { Building2, Home } from 'lucide-react';
import { HoushranEmblem } from './HoushranEmblem';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedModulesCount?: number;
  totalModulesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navRef = useRef<HTMLDivElement>(null);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* =======================================================================
          TOP FIXED HEADER — هدر سفید شیشه‌ای با دکمه‌های فونت درشت و بسیار خوانا
         ======================================================================= */}
      <header 
        ref={navRef}
        id="main-sticky-navigation-header" 
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.06)] print:hidden transition-all" 
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* لوگوی رسمی هوشران */}
          <div 
            className="flex items-center cursor-pointer select-none shrink-0" 
            onClick={() => handleSelectTab('dashboard')}
          >
            <HoushranEmblem className="h-8 sm:h-10 md:h-11 w-auto" alt="لوگوی رسمی هوشران" />
          </div>

          {/* کپسول ناوبری متناسب با فونت درشت‌تر */}
          <nav 
            id="top-nav-tabs-container"
            className="w-full max-w-[320px] sm:max-w-md bg-slate-100/90 p-1 sm:p-1.5 rounded-2xl border border-slate-200/70 shadow-inner flex items-center justify-between gap-1.5 sm:gap-2"
            aria-label="منوی اصلی"
          >
            {/* دکمه ۱: صفحه اصلی (۲ سایز بزرگتر) */}
            <button
              id="top-nav-home"
              onClick={() => handleSelectTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Home className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="whitespace-nowrap">صفحه اصلی</span>
            </button>

            {/* دکمه ۲: ارزیابی سازمانی (۲ سایز بزرگتر) */}
            <button
              id="top-nav-diagnostic"
              onClick={() => handleSelectTab('diagnostic')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${activeTab === 'diagnostic' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="whitespace-nowrap">ارزیابی سازمانی</span>
            </button>
          </nav>

        </div>
      </header>

      {/* اسپیسر زیر هدر متناسب با ارتفاع جدید */}
      <div className="h-16 sm:h-20 w-full print:hidden" aria-hidden="true" />
    </>
  );
};