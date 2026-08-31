import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Search, Send, MessageSquare, Database, FileCheck, BookOpen, 
  Layers, Terminal, Trophy, ChevronDown, LayoutDashboard, Menu, X, 
  CheckCircle2, ArrowLeft, ExternalLink, ShieldCheck, Compass, Building2,
  Grid, ChevronUp, Home
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
  completedModulesCount,
  totalModulesCount,
}) => {
  const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll listener to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navGroups: NavGroup[] = [
    {
      id: 'course-learning',
      title: '۱. دروس آموزشی و مهارت‌های فروش',
      icon: BookOpen,
      color: 'text-blue-600',
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
      color: 'text-indigo-600',
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

  const isSalesActive = [
    'modules', 'brief', 'outreach', 'roleplay', 'crm', 
    'prompt-pack', 'scoov', 'checklist', 'sales-hub'
  ].includes(activeTab);

  return (
    <>
      {/* =======================================================================
          TOP STICKY HEADER & INTEGRATED NAVIGATION BAR (ثابت در بالای صفحه برای موبایل، تبلت و دسکتاپ)
         ======================================================================= */}
      <header 
        ref={navRef}
        id="main-sticky-navigation-header" 
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-[#141b2b] transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : 'shadow-2xs'
        }`} 
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Collapsible Brand Title (هیدن شدن عنوان در زمان اسکرول) */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center justify-center border-b border-slate-100/80 ${
              isScrolled 
                ? 'max-h-0 opacity-0 py-0 border-transparent pointer-events-none' 
                : 'max-h-24 opacity-100 py-2.5 sm:py-3'
            }`}
          >
            <div 
              className="flex items-center justify-center text-center cursor-pointer group select-none" 
              onClick={() => handleSelectTab('dashboard')}
            >
              <HoushranEmblem className="h-10 sm:h-11 md:h-12 w-auto" alt="لوگوی رسمی هوشران" />
            </div>
          </div>

          {/* Persistent Fixed Navigation Bar (نمایش در موبایل، تبلت و تمام اسکرین‌سایزها) */}
          <div className="py-2 sm:py-2.5 flex justify-center">
            <nav 
              id="top-nav-tabs-container"
              className="w-full max-w-xl bg-slate-100/80 p-1 sm:p-1.5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between gap-1 sm:gap-1.5"
              aria-label="منوی اصلی"
            >
              {/* Tab 1: صفحه اصلی */}
              <button
                id="top-nav-home"
                onClick={() => handleSelectTab('dashboard')}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-[#0066ff] shadow-xs border border-slate-200/60 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Home className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-colors ${activeTab === 'dashboard' ? 'text-[#0066ff]' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">صفحه اصلی</span>
              </button>

              {/* Tab 2: ارزیابی سازمانی */}
              <button
                id="top-nav-diagnostic"
                onClick={() => handleSelectTab('diagnostic')}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'diagnostic'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100 font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Building2 className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-colors ${activeTab === 'diagnostic' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">ارزیابی سازمانی</span>
              </button>
            </nav>
          </div>

        </div>
      </header>

      {/* =======================================================================
          MODAL DRAWER (کشوی محتویات و ابزارهای دسترسی سریع)
         ======================================================================= */}
      {bottomMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start sm:items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200" dir="rtl">
          
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0"
            onClick={() => setBottomMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-6 mt-12 sm:mt-0 animate-in zoom-in-95 duration-200">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#141b2b]">فهرست کامل بخش‌ها و ابزارهای هوشران</h3>
                  <p className="text-xs text-slate-500">دسترسی سریع به تمام دروس، شبیه‌سازها و ماژول‌های ارزیابی</p>
                </div>
              </div>

              <button
                onClick={() => setBottomMenuOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
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
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
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
                            className={`w-full text-right p-3 rounded-2xl border flex items-start justify-between gap-3 text-xs transition ${
                              isActive
                                ? 'bg-[#0066ff] text-white font-bold border-blue-600 shadow-md shadow-blue-500/20'
                                : 'bg-[#f9f9ff] text-slate-700 border-slate-200 hover:bg-blue-50/50 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <div className="font-bold">{item.label}</div>
                                <div className={`text-[11px] line-clamp-1 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>

                            {item.badge && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                                isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
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

