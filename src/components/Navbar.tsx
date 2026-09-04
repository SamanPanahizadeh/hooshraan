import React, { useState, useRef } from 'react';
import { 
  BookOpen, Search, Send, MessageSquare, Database, FileCheck, 
  Layers, Terminal, Building2, Grid, X, Home
} from 'lucide-react';

import { HoushranEmblem } from './HoushranEmblem';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedModulesCount: number;
  totalModulesCount: number;
}

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navGroups: NavGroup[] = [
    {
      id: 'course-learning',
      title: '۱. دروس آموزشی و مهارت‌های فروش',
      icon: BookOpen,
      color: 'text-blue-400',
      items: [
        {
          id: 'modules',
          label: 'سرفصل‌های آموزشی (۸ بخش تعاملی)',
          shortLabel: 'سرفصل‌های دوره',
          desc: 'مسیر گام‌به‌گام از مبانی Co-Pilot تا اتوماسیون پیشرفته پایپ‌لاین',
          icon: BookOpen,
          badge: '۸ سرفصل',
        },
        {
          id: 'brief',
          label: 'شبیه‌ساز تحقیق مشتری (Research Brief)',
          shortLabel: 'تحقیق مشتری',
          desc: 'تولید بریف جامع، استخراج Fact vs Hypothesis و تحلیل ریسک خریدار',
          icon: Search,
        },
        {
          id: 'outreach',
          label: 'شبیه‌ساز پیام‌نویسی (Outreach)',
          shortLabel: 'پیام‌نویسی هدفمند',
          desc: 'تولید پیام‌های شخصی‌سازی‌شده واقعی بدون Fabricate کردن داده‌ها',
          icon: Send,
        },
        {
          id: 'roleplay',
          label: 'میدان نقش‌آفرینی زنده (Role-Play Arena)',
          shortLabel: 'شبیه‌ساز مذاکره',
          desc: 'تمرین زنده مکالمه فروش با هوش مصنوعی و کارنامه ارزیابی ۶ بعدی',
          icon: MessageSquare,
        },
        {
          id: 'crm',
          label: 'حافظه هوشمند مشتری و CRM',
          shortLabel: 'حافظه CRM',
          desc: 'ثبت خودکار تعاملات، استخراج چرخه خرید و پیشنهاد اکشن بعدی',
          icon: Database,
        },
        {
          id: 'prompt-pack',
          label: 'کتابخانه پرامپت‌های فروش (Prompt Library)',
          shortLabel: 'کتابخانه پرامپت‌ها',
          desc: '۲۴ پرامپت آماده و دسته‌بندی‌شده برای تمام مراحل پایپ‌لاین فروش',
          icon: Terminal,
          badge: '۲۴ پرامپت',
        },
        {
          id: 'scoov',
          label: 'سازنده پرامپت ساختاریافته S.C.O.O.V',
          shortLabel: 'فرمول S.C.O.O.V',
          desc: 'فرمول ۵ مرحله‌ای استاندارد برای پرامپت‌نویسی بدون خطا',
          icon: Layers,
        },
        {
          id: 'checklist',
          label: 'کارت جیبی و چک‌لیست اعتبارسنجی',
          shortLabel: 'کارت جیبی و چک‌لیست',
          desc: 'قوانین ۵ ثانیه‌ای، اشتباهات مرگبار و آزمون Fact vs Fiction',
          icon: FileCheck,
        },
      ],
    },
    {
      id: 'enterprise-assessment',
      title: '۲. ارزیابی سازمانی (AIOD)',
      icon: Building2,
      color: 'text-indigo-400',
      items: [
        {
          id: 'diagnostic',
          label: 'سامانه ارزیابی بلوغ و نقشه راه سازمانی',
          shortLabel: 'ارزیابی سازمانی',
          desc: 'پرسشنامه ۶ بعدی، رادار چارت، ماتریس اولویت‌بندی، محاسبه ROI و نقشه راه ۹۰ روزه با Gemini',
          icon: Building2,
          badge: 'سامانه جامع AIOD',
        },
      ],
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setBottomMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* =======================================================================
          TOP FIXED HEADER & GLASS NAVIGATION BAR (ثابت و فیکس قطعی در موبایل و دسکتاپ)
         ======================================================================= */}
      <header 
        ref={navRef}
        id="main-sticky-navigation-header" 
        className="fixed top-0 inset-x-0 z-50 bg-[#0A0F1D]/80 backdrop-blur-2xl border-b border-white/10 text-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.5)] print:hidden" 
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center cursor-pointer group select-none shrink-0" 
            onClick={() => handleSelectTab('dashboard')}
          >
            <HoushranEmblem className="h-8 sm:h-9 md:h-10 w-auto text-white" alt="لوگوی رسمی هوشران" />
          </div>

          {/* Fixed Glass Navigation Pills */}
          <nav 
            id="top-nav-tabs-container"
            className="w-full max-w-[280px] sm:max-w-sm bg-white/[0.04] p-1 rounded-2xl border border-white/10 shadow-inner flex items-center justify-between gap-1"
            aria-label="منوی اصلی"
          >
            {/* Tab 1: صفحه اصلی */}
            <button
              id="top-nav-home"
              onClick={() => handleSelectTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600/30 text-white shadow-sm border border-blue-400/40 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Home className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">صفحه اصلی</span>
            </button>

            {/* Tab 2: ارزیابی سازمانی */}
            <button
              id="top-nav-diagnostic"
              onClick={() => handleSelectTab('diagnostic')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'bg-indigo-600/30 text-white shadow-sm border border-indigo-400/40 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors ${activeTab === 'diagnostic' ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">ارزیابی سازمانی</span>
            </button>
          </nav>

        </div>
      </header>

      {/* فاصله نگه‌دارنده زیر هدر برای جلوگیری از مخفی شدن سر محتوای صفحه */}
      <div className="h-16 sm:h-18 w-full print:hidden" aria-hidden="true" />

      {/* =======================================================================
          MODAL DRAWER (کشوی محتویات و ابزارهای دسترسی سریع)
         ======================================================================= */}
      {bottomMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200" dir="rtl">
          
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0"
            onClick={() => setBottomMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 bg-slate-900 rounded-3xl border border-white/10 w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-6 mt-16 sm:mt-0 animate-in zoom-in-95 duration-200">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">فهرست کامل بخش‌ها و ابزارهای هوشران</h3>
                  <p className="text-xs text-slate-400">دسترسی سریع به تمام دروس، شبیه‌سازها و ماژول‌های ارزیابی</p>
                </div>
              </div>

              <button
                onClick={() => setBottomMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Groups Render */}
            <div className="space-y-6">
              {navGroups.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.id} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
                      <GroupIcon className={`w-4 h-4 ${group.color}`} />
                      <span>{group.title}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`drawer-btn-${item.id}`}
                            onClick={() => handleSelectTab(item.id)}
                            className={`w-full text-right p-3 rounded-2xl border flex items-start justify-between gap-3 text-xs transition cursor-pointer ${
                              isActive
                                ? 'bg-blue-600/30 text-white font-bold border-blue-400/50 shadow-md shadow-blue-500/20'
                                : 'bg-white/[0.02] text-slate-300 border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'}`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <div className="font-bold">{item.label}</div>
                                <div className={`text-[11px] line-clamp-1 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>

                            {item.badge && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                                isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-300'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};