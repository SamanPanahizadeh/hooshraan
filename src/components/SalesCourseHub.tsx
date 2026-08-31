import React, { useState, useEffect } from 'react';
import { ModuleViewer } from './ModuleViewer';
import { ResearchBriefSimulator } from './ResearchBriefSimulator';
import { OutreachSimulator } from './OutreachSimulator';
import { RolePlayArena } from './RolePlayArena';
import { CRMMemorySimulator } from './CRMMemorySimulator';
import { PromptPackViewer } from './PromptPackViewer';
import { SCOOVPromptBuilder } from './SCOOVPromptBuilder';
import { PocketCardChecklist } from './PocketCardChecklist';
import { 
  BookOpen, Search, Send, MessageSquare, Database, Terminal, 
  Layers, FileCheck, ArrowLeft, Trophy, Sparkles, ChevronRight,
  HelpCircle, Home
} from 'lucide-react';

interface SalesCourseHubProps {
  initialSubTab?: string;
  completedModules: number[];
  setCompletedModules: React.Dispatch<React.SetStateAction<number[]>>;
  onNavigateHome: () => void;
}

export const SalesCourseHub: React.FC<SalesCourseHubProps> = ({
  initialSubTab = 'modules',
  completedModules,
  setCompletedModules,
  onNavigateHome,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const handleOpenSimulator = (type: 'brief' | 'outreach' | 'roleplay' | 'crm' | 'scoov') => {
    setActiveSubTab(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'modules',
      label: 'سرفصل‌ها و اسلایدهای دوره',
      badge: '۸ بخش',
      icon: BookOpen,
    },
    {
      id: 'brief',
      label: 'تحقیق مشتری (Research Brief)',
      badge: 'شبیه‌ساز',
      icon: Search,
    },
    {
      id: 'outreach',
      label: 'پیام‌نویسی (Outreach)',
      badge: 'شبیه‌ساز',
      icon: Send,
    },
    {
      id: 'roleplay',
      label: 'میدان نقش‌آفرینی (Role-Play)',
      badge: 'مذاکره زنده',
      icon: MessageSquare,
    },
    {
      id: 'crm',
      label: 'حافظه CRM و تعاملات',
      badge: 'شبیه‌ساز',
      icon: Database,
    },
    {
      id: 'prompt-pack',
      label: 'کتابخانه ۲۴ پرامپت فروش',
      badge: 'پرامپت‌ها',
      icon: Terminal,
    },
    {
      id: 'scoov',
      label: 'فرمول پرامپت‌نویسی S.C.O.O.V',
      badge: 'متدولوژی',
      icon: Layers,
    },
    {
      id: 'checklist',
      label: 'کارت جیبی و چک‌لیست',
      badge: 'اعتبارسنجی',
      icon: FileCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff]" dir="rtl">
      
      {/* Sub-Header Breadcrumb & Sub-navigation Strip */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Section Title */}
          <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button 
                onClick={onNavigateHome}
                className="flex items-center gap-1 hover:text-blue-600 font-bold transition"
              >
                <Home className="w-3.5 h-3.5" />
                <span>صفحه اصلی</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-300" />
              <span className="text-blue-600 font-bold">بخش اول: دروس آموزشی و مهارت‌های فروش</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-200">
                پیشرفت: {completedModules.length} از ۸ سرفصل
              </span>
              <button
                onClick={onNavigateHome}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-xl transition flex items-center gap-1"
              >
                <span>بازگشت به پورتال اصلی</span>
                <ArrowLeft className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Horizontal Sub-tabs bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = activeSubTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`subtab-${item.id}`}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#0066ff] text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <ItemIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <span>{item.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Render the Active Sub-Component */}
      <div className="py-4">
        {activeSubTab === 'modules' && (
          <ModuleViewer
            onOpenSimulator={handleOpenSimulator}
            completedModules={completedModules}
            setCompletedModules={setCompletedModules}
          />
        )}

        {activeSubTab === 'brief' && <ResearchBriefSimulator />}
        {activeSubTab === 'outreach' && <OutreachSimulator />}
        {activeSubTab === 'roleplay' && <RolePlayArena />}
        {activeSubTab === 'crm' && <CRMMemorySimulator />}
        {activeSubTab === 'prompt-pack' && <PromptPackViewer onOpenSimulator={handleOpenSimulator} />}
        {activeSubTab === 'scoov' && <SCOOVPromptBuilder />}
        {activeSubTab === 'checklist' && <PocketCardChecklist />}
      </div>

    </div>
  );
};
