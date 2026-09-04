import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SalesCourseHub } from './components/SalesCourseHub';
import { OrganizationalDiagnostic } from './components/OrganizationalDiagnostic';
import { COURSE_MODULES } from './data/courseData';
import { Award, CheckCircle, Trophy, Linkedin, ExternalLink, Mail, Send, X, ArrowLeft } from 'lucide-react';
import { HoushranEmblem } from './components/HoushranEmblem';

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>('dashboard');
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const setActiveTab = (tab: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTabState(tab);
  };

  const totalPointsEarned = completedModules.length * 100;
  const maxCoursePoints = COURSE_MODULES.length * 100;
  const isAllModulesCompleted = completedModules.length === COURSE_MODULES.length;

  const isSalesTab = [
    'sales-hub', 'modules', 'brief', 'outreach', 'roleplay', 
    'crm', 'prompt-pack', 'scoov', 'checklist'
  ].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-800 selection:text-white antialiased flex flex-col justify-between" dir="rtl">
      
      <div>
        {/* Course Identity Header + Primary Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          completedModulesCount={completedModules.length}
          totalModulesCount={COURSE_MODULES.length}
        />

        {/* Certificate Alert Banner (Floating Toast Style) */}
        {isAllModulesCompleted && !showCertificate && (
          <div className="sticky top-20 z-40 px-4 py-2">
            <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700/50 flex items-center justify-between flex-wrap gap-4 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-100">
                    تبریک! دوره Sales AI Customer Journey تکمیل شد
                  </div>
                  <div className="text-xs text-slate-400">
                    شما با موفقیت <span className="text-amber-400 font-mono font-bold">{totalPointsEarned}</span> امتیاز تسلط بر فروش (Mastery Points) کسب کردید.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCertificate(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs transition shadow-sm flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>مشاهده گواهینامه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="pt-2 sm:pt-4 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Landing Page */}
          {activeTab === 'dashboard' && (
            <Dashboard
              onNavigate={(tab) => setActiveTab(tab)}
              completedModules={completedModules}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          )}

          {/* 2. Enterprise Diagnostic Hub (AIOD) */}
          {activeTab === 'diagnostic' && (
            <OrganizationalDiagnostic />
          )}

          {/* 3. Sales Course & Lab Hub */}
          {isSalesTab && (
            <SalesCourseHub
              initialSubTab={activeTab === 'sales-hub' ? 'modules' : activeTab}
              completedModules={completedModules}
              setCompletedModules={setCompletedModules}
              onNavigateHome={() => setActiveTab('dashboard')}
            />
          )}

        </main>
      </div>

      {/* Course Completion Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 print:hidden animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
              aria-label="بستن"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Emblem / Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
                گواهی رسمی اتمام دوره
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
                Sales AI Customer Journey
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                تسلط بر کاربرد عملیاتی ابزارهای هوش مصنوعی مولد در فرآیندهای فروش سازمانی و ارتباط با مشتری
              </p>
            </div>

            {/* Score Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>مجموع امتیاز کسب‌شده:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {totalPointsEarned} / {maxCoursePoints}
              </span>
            </div>

            {/* Skills Acquired List */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-700 font-medium space-y-2.5 text-right">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تسلط بر مدل Co-Pilot و چارچوب ترکیبی Human + AI</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تدوین Research Brief سازمانی و تفکیک داده موثق از فرضیه</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شخصی‌سازی مکاتبات بدون جعل داده و تدوین سناریوهای پرومپت</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>توسعه حافظه مشتری در CRM و چرخه ۵ مرحله‌ای S.C.O.O.V</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition shadow-sm"
            >
              بازگشت به داشبورد
            </button>
          </div>
        </div>
      )}

      {/* Footer & Corporate Identity */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm py-8 text-xs text-slate-600 print:hidden" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            
            {/* Branding */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right gap-2 max-w-md">
              <HoushranEmblem className="h-9 w-auto" alt="هوشران" />
              <p className="text-[12px] text-slate-500 leading-relaxed">
                توسعه مهارت‌های راهبردی و کاربردی هوش مصنوعی مولد برای مدیران و تیم‌های پیشرو
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                <span>با همکاری:</span>
                <span className="font-semibold text-slate-800">نشر هنوز</span>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="flex flex-col items-center md:items-end gap-2.5">
              <span className="text-[11px] font-semibold text-slate-400">کانال‌های ارتباطی</span>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                
                {/* Telegram */}
                <a
                  href="https://t.me/HooshRaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs transition shadow-xs"
                  dir="ltr"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                  <span className="font-sans text-[11.5px] font-medium">t.me/HooshRaan</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {/* Email */}
                <a
                  href="mailto:info@houshraan.ir"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs transition shadow-xs"
                  dir="ltr"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-sans text-[11.5px] font-medium">info@houshraan.ir</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/houshraan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs transition shadow-xs"
                  dir="ltr"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span className="font-sans text-[11.5px] font-medium">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

              </div>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
            <div>Human + AI → Better Sales Performance</div>
            <div className="font-sans" dir="ltr">© {new Date().getFullYear()} Houshran. All rights reserved.</div>
          </div>

        </div>
      </footer>

    </div>
  );
}