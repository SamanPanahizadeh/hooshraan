import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SalesCourseHub } from './components/SalesCourseHub';
import { OrganizationalDiagnostic } from './components/OrganizationalDiagnostic';
import { COURSE_MODULES } from './data/courseData';
import { Award, Sparkles, X, CheckCircle, Trophy, Linkedin, ExternalLink, Mail, Send } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] font-sans selection:bg-[#0066ff] selection:text-white" dir="rtl">
      
      {/* Course Identity Header + Primary Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedModulesCount={completedModules.length}
        totalModulesCount={COURSE_MODULES.length}
      />

      {/* Main Content Area */}
      <main className="pt-2 sm:pt-4 pb-10">
        
        {/* Certificate Alert Banner */}
        {isAllModulesCompleted && !showCertificate && (
          <div className="bg-blue-600 p-0.5 shadow-md">
            <div className="bg-white px-4 py-3 flex items-center justify-between max-w-7xl mx-auto flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-600 animate-bounce shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#141b2b]">
                  تبریک! تمام ۸ بخش کارگاه Sales AI Customer Journey را با موفقیت مطالعه نمودید و <span className="text-blue-600 font-mono font-black">{totalPointsEarned}</span> امتیاز تسلط فروش (Sales Mastery Points) کسب کردید!
                </span>
              </div>
              <button
                onClick={() => setShowCertificate(true)}
                className="px-3.5 py-1.5 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>مشاهده گواهینامه و امتیازات</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. Landing Page (2-Gateway Portal) */}
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

        {/* 3. Sales Course & Lab Hub (Consolidated) */}
        {isSalesTab && (
          <SalesCourseHub
            initialSubTab={activeTab === 'sales-hub' ? 'modules' : activeTab}
            completedModules={completedModules}
            setCompletedModules={setCompletedModules}
            onNavigateHome={() => setActiveTab('dashboard')}
          />
        )}

      </main>

      {/* Course Completion Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block">گواهینامه رسمی تکمیل دوره</span>
              <h2 className="text-2xl font-extrabold text-[#141b2b]">دوره آموزشی Sales AI Customer Journey</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                از تحقیق اولیه مشتری تا مدیریت هوشمند تعامل با مشتری و CRM
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold mt-2">
                <Trophy className="w-4 h-4 text-blue-600" />
                <span>مجموع امتیاز کسب شده:</span>
                <span className="font-mono font-black text-blue-700 text-sm">{totalPointsEarned} / {maxCoursePoints}</span>
                <span className="text-blue-600/80 font-normal">Sales Mastery Points</span>
              </div>
            </div>

            <div className="bg-[#f9f9ff] p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 font-medium space-y-1.5 text-right">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>تسلط بر مدل Co-Pilot و چرخه Human + AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>مهارت ساخت Research Brief و تفکیک Fact از Hypothesis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>شخصی‌سازی پیام‌ها بدون Fabrication و طراحی Discovery Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>ساخت Customer Memory در CRM و چارچوب ۵ مرحله‌ای S.C.O.O.V</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="w-full py-3 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-sm transition shadow-sm"
            >
              متوجه شدم و بازگشت به داشبورد
            </button>
          </div>
        </div>
      )}

      {/* Footer & Contact */}
      <footer className="border-t border-slate-200 bg-white py-8 pb-24 md:pb-8 text-xs text-slate-600 print:hidden" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            
            {/* Course & Branding Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-right gap-3 max-w-md">
              <HoushranEmblem className="h-10 sm:h-12 w-auto" alt="هوشران" />
              <span className="font-medium text-[11px] sm:text-xs leading-tight text-slate-500">
                آموزش کاربردی و راهبردی هوش مصنوعی برای مدیران و سازمان‌ها
              </span>
              <div className="inline-flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="text-slate-400">با همکاری:</span>
                <span className="font-semibold text-slate-800">نشر هنوز</span>
              </div>
            </div>

            {/* Contact Us / راه‌های ارتباطی */}
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
              <span className="text-[11px] font-semibold text-slate-500">راه‌های ارتباطی:</span>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full">
                {/* Telegram Link */}
                <a
                  id="contact-telegram-link"
                  href="https://t.me/HooshRaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#f9f9ff] hover:bg-white text-slate-700 hover:text-[#229ED9] border border-slate-200 hover:border-[#229ED9]/50 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-sm group"
                  dir="ltr"
                  title="کانال تلگرام هوشران"
                >
                  <div className="w-5 h-5 rounded-lg bg-[#229ED9]/10 flex items-center justify-center text-[#229ED9] group-hover:bg-[#229ED9] group-hover:text-white transition-colors">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans text-[11.5px]">t.me/HooshRaan</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#229ED9] transition-colors" />
                </a>

                {/* Email Link */}
                <a
                  id="contact-email-link"
                  href="mailto:info@houshraan.ir"
                  className="inline-flex items-center justify-center gap-2 bg-[#f9f9ff] hover:bg-white text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-300 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-sm group"
                  dir="ltr"
                  title="ارسال ایمیل"
                >
                  <div className="w-5 h-5 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans text-[11.5px]">info@houshraan.ir</span>
                </a>

                {/* LinkedIn Link */}
                <a
                  id="contact-linkedin-link"
                  href="https://www.linkedin.com/in/saman-panahizadeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#f9f9ff] hover:bg-white text-slate-700 hover:text-[#0A66C2] border border-slate-200 hover:border-[#0A66C2]/50 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shadow-sm group"
                  dir="ltr"
                  title="مشاهده پروفایل لینکدین"
                >
                  <div className="w-5 h-5 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-sans text-[11.5px]">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Sub-footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>Human + AI → Better Sales Work</div>
            <div className="font-sans" dir="ltr">© {new Date().getFullYear()} Sales AI Customer Journey. All rights reserved.</div>
          </div>

        </div>
      </footer>

    </div>
  );
}
