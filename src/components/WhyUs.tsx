import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, X as XIcon, Layers, Workflow, Target, Users, 
  Briefcase, Building2, ChevronLeft, Sparkles, Award, ArrowDown,
  Clock, Zap, FileText, BarChart3, LineChart, ShieldCheck, CheckCircle2,
  FolderKanban, LayoutDashboard, Search, Database, ArrowRight,
  Crosshair, GitBranch, Terminal, TrendingUp, SlidersHorizontal,
  Compass, Scan, BookOpen, Laptop, Rocket, RefreshCw, UserCheck,
  AlertCircle, ChevronRight, Share2, HelpCircle, CheckCircle,
  Network, Cpu, ShieldAlert, FileSearch, ArrowUpRight, Flame
} from 'lucide-react';



interface WhyUsProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  onExploreIndividual?: () => void;
  onExploreEnterprise?: () => void;
  onStartDiagnostic?: () => void;
}

// Lightweight Scroll Reveal Component
const RevealOnScroll: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const WhyUs: React.FC<WhyUsProps> = ({ 
  onNavigate,
  onExploreIndividual,
  onExploreEnterprise,
  onStartDiagnostic 
}) => {
  const [activeDept, setActiveDept] = useState<'sales' | 'marketing' | 'hr' | 'management'>('sales');
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'workflow' | 'diagnostic' | 'prompt_scoov' | 'case_study'>('workflow');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIndividualClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onExploreIndividual) onExploreIndividual();
    else if (onNavigate) onNavigate('sales-hub');
  };

  const handleEnterpriseClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onExploreEnterprise) onExploreEnterprise();
    else if (onNavigate) onNavigate('diagnostic');
  };

  const handleDiagnosticClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onStartDiagnostic) onStartDiagnostic();
    else if (onNavigate) onNavigate('diagnostic');
  };

  // Department-specific workflows data
  const departmentWorkflows = {
    sales: {
      title: 'واحد فروش و توسعه بازار (Sales & BD)',
      badge: 'B2B & Enterprise Sales',
      icon: Target,
      steps: [
        { name: 'Customer Research', desc: 'تحقیق عمیق مشتری و تفکیک Fact از فرضیات', tool: 'Co-Pilot Research', icon: Search },
        { name: 'Opportunity Analysis', desc: 'شناسایی نقاط درد پنهان و امتیازدهی لیدها', tool: 'AI ICP Scoring', icon: BarChart3 },
        { name: 'Meeting Preparation', desc: 'طراحی سؤالات اکتشافی و سناریوهای مذاکره', tool: 'Brief Generator', icon: FileText },
        { name: 'Sales Proposal', desc: 'شخصی‌سازی پیشنهاد ارزش متناسب با نیاز خریدار', tool: 'Tailored Pitch', icon: Sparkles },
        { name: 'CRM & Pipeline', desc: 'ثبت خودکار خلاصه جلسه و چرخه خرید مشتری', tool: 'CRM Memory', icon: Database }
      ]
    },
    marketing: {
      title: 'واحد بازاریابی و رشد (Marketing & Growth)',
      badge: 'Growth & Content Ops',
      icon: TrendingUp,
      steps: [
        { name: 'Market Research', desc: 'پایش روندهای بازار، نیاز مخاطب و تحلیل رقبا', tool: 'Intelligence Engine', icon: Search },
        { name: 'Content Strategy', desc: 'ایده‌پردازی و ساخت تقویم محتوایی مبتنی بر بینش', tool: 'Audience Insight', icon: LayoutDashboard },
        { name: 'Campaign Execution', desc: 'تولید محتوای چندکاناله با لحن اختصاصی برند', tool: 'Brand-Voice AI', icon: Sparkles },
        { name: 'Performance Analysis', desc: 'تحلیل داده‌های کمپین و بهینه‌سازی مداوم نرخ تبدیل', tool: 'Attribution Model', icon: LineChart }
      ]
    },
    hr: {
      title: 'واحد منابع انسانی و آموزش (HR & L&D)',
      badge: 'People & Culture',
      icon: Users,
      steps: [
        { name: 'Talent Acquisition', desc: 'طراحی شرح شغل دقیق و سناریوهای مصاحبه شایستگی', tool: 'Role Profiler', icon: UserCheck },
        { name: 'Learning & Skill Maps', desc: 'شخصی‌سازی مسیر ارتقای مهارت برای هر رده شغلی', tool: 'Adaptive L&D', icon: BookOpen },
        { name: 'Employee Support', desc: 'پاسخگویی به سوالات آئین‌نامه‌ای و فرآیندی پرسنل', tool: 'Internal HR Copilot', icon: HelpCircle },
        { name: 'HR Analytics', desc: 'تحلیل داده‌های نگه‌داشت و سنجش بازخورد عملکرد', tool: 'People Insights', icon: BarChart3 }
      ]
    },
    management: {
      title: 'مدیریت ارشد و استراتژی (Management & Strategy)',
      badge: 'Executive Decision',
      icon: Building2,
      steps: [
        { name: 'Strategic Research', desc: 'سنتز گزارش‌های حجیم صنعتی و استخراج روندهای کلیدی', tool: 'Executive Synthesis', icon: FileSearch },
        { name: 'Deep Analysis', desc: 'تحلیل ساختاریافته ماتریس SWOT و شکاف‌های بازار', tool: 'Framework Builder', icon: Layers },
        { name: 'Decision Support', desc: 'شبیه‌سازی پیامدهای تصمیم در سناریوهای نامطمئن', tool: 'Scenario Modeling', icon: Cpu },
        { name: 'Resource Allocation', desc: 'اولویت‌بندی بودجه و تخصیص منابع بر مبنای بازگشت سرمایه', tool: 'Portfolio ROI', icon: TrendingUp }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-16 text-slate-900 overflow-hidden" dir="rtl">
      
      {/* =========================================================================
          SECTION 01 — HERO (MINIMAL, B2B, EDITORIAL)
         ========================================================================= */}
      <section className="relative pt-3 pb-8 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-16">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-white border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-8 sm:p-14 lg:p-20 text-center">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f030_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f030_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            
            {/* Soft Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">

              {/* Primary Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#141b2b] tracking-tight leading-[1.25] text-balance">
                ما AI را به <span className="text-blue-600 relative inline-block">
                  کار واقعی
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-blue-100/70 -z-10 rounded-sm" />
                </span> شما متصل می‌کنیم.
              </h1>

            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 02 — تفاوت اصلی ما (VISUAL COMPARISON)
         ========================================================================= */}
      <section className="py-16 sm:py-24 space-y-12">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b] leading-snug">
              ما AI را بر اساس ابزار آموزش نمی‌دهیم؛ بر اساس <span className="text-blue-600">کاری که شما انجام می‌دهید</span> آموزش می‌دهیم.
            </h2>
          </div>
        </RevealOnScroll>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Side A: Traditional AI Training */}
          <RevealOnScroll delay={100} className="h-full">
            <div className="h-full bg-slate-50/70 hover:bg-slate-50 rounded-3xl border border-slate-200/90 p-7 sm:p-9 space-y-7 transition-all flex flex-col justify-between">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-rose-600 tracking-wider uppercase flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      آموزش مرسوم در بازار
                    </span>
                    <h3 className="text-xl font-black text-slate-800">Traditional AI Training</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs">
                    ابزارمحور
                  </span>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800 font-bold block mb-0.5">معرفی ابزارها:</strong>
                      مرور فهرست‌وار ده‌ها وب‌سایت و مدل بدون اتصال به سناریوی مشخص.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800 font-bold block mb-0.5">پرامپت‌های آماده عمومی:</strong>
                      ارائه کپی-پیست الگوهای کلیشه‌ای که در مسائل واقعی کسب‌وکار پاسخگو نیستند.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800 font-bold block mb-0.5">آموزش ویژگی‌های ابزارها:</strong>
                      تمرکز صرف روی منوهای رابط کاربری به‌جای منطق تصمیم‌گیری و تفکر نقادانه.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800 font-bold block mb-0.5">تمرین‌های عمومی و ساختگی:</strong>
                      خلاصه‌سازی متن‌های نامرتبط بدون اتصال به زنجیره ارزش و وظایف شغلی.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-800 font-bold block mb-0.5">پایان دوره = قطع ارتباط:</strong>
                      عدم انتقال مهارت به جریان کار روزمره و بازگشت پرسنل به عادت‌های گذشته.
                    </div>
                  </li>
                </ul>

              </div>

              <div className="p-3.5 bg-slate-200/40 rounded-2xl border border-slate-200 text-xs text-slate-500 text-center font-medium">
                نتیجه: فراموشی بخش عمده آموخته‌ها پس از مدت کوتاه به دلیل عدم ادغام در فرآیند کار.
              </div>
            </div>
          </RevealOnScroll>

          {/* Side B: Our Approach */}
          <RevealOnScroll delay={200} className="h-full">
            <div className="h-full bg-white rounded-3xl border-2 border-blue-600 shadow-[0_16px_40px_rgba(0,102,255,0.08)] p-7 sm:p-9 space-y-7 transition-all relative overflow-hidden flex flex-col justify-between group hover:border-blue-700">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />

              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-blue-100 pb-5">
                  <div className="space-y-1">
                    <span className="text-[13px] font-black text-blue-600 tracking-wider uppercase">
                      رویکرد راهبردی هوشران
                    </span>
                    <h3 className="text-xl font-black text-[#141b2b]">Our Approach</h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-black text-xs border border-blue-200/80">
                    فرآیندمحور و کاربردی
                  </span>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-[#141b2b] font-bold block mb-0.5">شناخت دقیق مسئله کسب‌وکار:</strong>
                      تعیین گلوگاه‌های زمانی، خطاهای محاسباتی و فرصت‌های بهبود قبل از انتخاب هر ابزار.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-[#141b2b] font-bold block mb-0.5">تحلیل Workflow و زنجیره وظایف:</strong>
                      نقشه‌برداری از مراحل انجام کار از دریافت ورودی تا تحویل خروجی نهایی.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-[#141b2b] font-bold block mb-0.5">طراحی AI Workflow یکپارچه:</strong>
                      تعریف نقاط دقیق تعامل انسان و مدل هوش مصنوعی (Human-in-the-loop) در نقش همکار کمکی.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-[#141b2b] font-bold block mb-0.5">اجرای یک کار واقعی در محیط عملیاتی:</strong>
                      تولید سند تحقیق واقعی، سناریوی مذاکره زنده و انتقال داده به سیستم‌های داخلی.
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-[#141b2b] font-bold block mb-0.5">اندازه‌گیری نتیجه، ارزیابی و تکرار:</strong>
                      سنجش کمی نفر-ساعت صرفه‌جویی‌شده، بهبود دقت خروجی‌ها و بازطراحی مداوم پرامپت‌ها.
                    </div>
                  </li>
                </ul>

              </div>

              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 font-bold text-center">
                نتیجه: ماندگاری و تثبیت در عادات روزمره سازمان به دلیل اتصال به خروجی‌های واقعی کار.
              </div>
            </div>
          </RevealOnScroll>

        </div>

      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 03 — شش دلیل اصلی «چرا ما؟» (SIX CORE PILLARS)
         ========================================================================= */}
      <section className="py-16 sm:py-24 space-y-16">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black text-blue-600 tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>ارکان تمایز بنیادین</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b]">
              شش دلیل اصلی برای انتخاب رویکرد هوشران
            </h2>
          </div>
        </RevealOnScroll>

        {/* 6 Cards Grid with Dedicated Icons & Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 01 */}
          <RevealOnScroll delay={50}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">01</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Crosshair className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  اول مسئله، بعد AI
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  ما آموزش را از ابزار شروع نمی‌کنیم. ابتدا مشخص می‌کنیم چه مسئله‌ای در کار وجود دارد، سپس بررسی می‌کنیم AI در کدام قسمت می‌تواند ارزش ایجاد کند.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>Problem-First Architecture</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Pillar 02 */}
          <RevealOnScroll delay={100}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">02</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <GitBranch className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  AI را وارد Workflow می‌کنیم
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  هدف ما فقط انجام یک Task مجزا با چت‌بات نیست. هوش مصنوعی باید در نقاط زنجیره‌ای فرآیند (مانند Customer Research ← Analysis ← Meeting Prep ← Proposal ← CRM) قرار گیرد.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>End-to-End Pipelines</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Pillar 03 */}
          <RevealOnScroll delay={150}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">03</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Network className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  یک نسخه برای همه وجود ندارد
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  نیازهای هوش مصنوعی در فروش، بازاریابی، منابع انسانی و مدیریت ارشد متفاوت است. آموزش‌های ما کاملاً Role-based و متناسب با وظایف تخصصی هر واحد طراحی شده‌اند.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>Role-Based Modules</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Pillar 04 */}
          <RevealOnScroll delay={200}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">04</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Compass className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  هدف ما فقط یادگیری نیست؛ توانستن است
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  مسیر سه‌مرحله‌ای ما: <strong>KNOW</strong> (شناخت مفاهیم) ← <strong>DO</strong> (تمرین روی سناریوی واقعی) ← <strong>APPLY</strong> (به‌کارگیری در کار روزمره). خروجی، توانایی انجام کار است.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>KNOW → DO → APPLY</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Pillar 05 */}
          <RevealOnScroll delay={250}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">05</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Terminal className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  Prompt مقصد نیست؛ فقط یکی از ابزارهاست
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  ما فقط نمی‌گوییم چه پرامپتی بنویسید؛ یاد می‌دهیم چه زمانی، برای چه مسئله‌ای، با چه ساختاری و در کجای فرآیند کاری از هوش مصنوعی استفاده کنید.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>Structural Reasoning</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

          {/* Pillar 06 */}
          <RevealOnScroll delay={300}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 space-y-5 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600">06</span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#141b2b] group-hover:text-blue-600 transition-colors">
                  از بهره‌وری فردی تا قابلیت سازمانی
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  مسیر بلوغ چهارمرحله‌ای: از بهره‌وری فردی، تا گردش‌کار تیم، بازطراحی فرآیند واحد و در نهایت تبدیل هوش مصنوعی به قابلیت پایدار کل سازمان.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <span>Maturity Framework</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* =========================================================================
            DEEP DIVE: INTERACTIVE DEPARTMENT-SPECIFIC WORKFLOWS
           ========================================================================= */}
        <RevealOnScroll>
          <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-10 space-y-8 shadow-xs">
            
            {/* Header & Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
                  <Workflow className="w-4 h-4" />
                  <span>تطبیق با نقش‌ها و واحدهای سازمانی</span>
                </div>
                <h3 className="text-xl font-black text-[#141b2b]">
                  جریان کار هوش مصنوعی در واحدهای مختلف کسب‌وکار
                </h3>
              </div>
              
              {/* Department Selector Pills */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl overflow-x-auto no-scrollbar border border-slate-200/60">
                <button
                  onClick={() => setActiveDept('sales')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDept === 'sales' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>فروش (Sales)</span>
                </button>
                <button
                  onClick={() => setActiveDept('marketing')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDept === 'marketing' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>بازاریابی (Marketing)</span>
                </button>
                <button
                  onClick={() => setActiveDept('hr')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDept === 'hr' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>منابع انسانی (HR)</span>
                </button>
                <button
                  onClick={() => setActiveDept('management')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDept === 'management' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>مدیریت ارشد (Management)</span>
                </button>
              </div>
            </div>

            {/* Workflow Pipeline Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {departmentWorkflows[activeDept].title}
                </span>
                <span className="font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg text-xs font-semibold">
                  {departmentWorkflows[activeDept].badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
                {departmentWorkflows[activeDept].steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-mono text-xs font-black flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {idx + 1}
                          </span>
                          <div className="p-1.5 rounded-lg bg-white border border-slate-200/70 text-slate-500 group-hover:text-blue-600">
                            <StepIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-900 leading-snug">{step.name}</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed text-justify">{step.desc}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-blue-700 font-bold">
                        <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{step.tool}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* =========================================================================
            DEEP DIVE: MATURITY MODEL (از فرد تا سازمان)
           ========================================================================= */}
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0e1626] text-white rounded-3xl p-8 sm:p-12 lg:p-14 space-y-10 relative overflow-hidden shadow-xl">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 tracking-wider uppercase">
                <TrendingUp className="w-4 h-4" />
                <span>چهار سطح تکامل در سازمان</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                از بهره‌وری فردی تا قابلیت سازمانی (Maturity Path)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ما به سازمان شما کمک می‌کنیم هوش مصنوعی را از سطح استفاده انفرادی به یک دارایی استراتژیک سازمانی ارتقا دهد.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              
              {/* Level 1 */}
              <div className="bg-slate-800/70 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/70 px-2.5 py-1 rounded-lg border border-blue-800/60">سطح ۱</span>
                    <UserCheck className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-black text-white">Individual Productivity</h4>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    فرد کارهای خود را بهتر انجام می‌دهد؛ افزایش چشمگیر سرعت در تحقیق، نگارش و خلاصه‌سازی.
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-700/60">
                  Focus: Individual Copilot
                </div>
              </div>

              {/* Level 2 */}
              <div className="bg-slate-800/70 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/70 px-2.5 py-1 rounded-lg border border-blue-800/60">سطح ۲</span>
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-black text-white">Team Workflow</h4>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    تیم از AI در فرآیندهای مشترک، پرامپت‌پک‌های تیمی و مستندسازی هماهنگ استفاده می‌کند.
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-700/60">
                  Focus: Shared Artifacts
                </div>
              </div>

              {/* Level 3 */}
              <div className="bg-slate-800/70 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/70 px-2.5 py-1 rounded-lg border border-indigo-800/60">سطح ۳</span>
                    <Layers className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-black text-white">Department AI</h4>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Workflowهای یک واحد سازمانی (مثل پایپ‌لاین کامل فروش یا مارکتینگ) با AI بازطراحی می‌شوند.
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-700/60">
                  Focus: Process Redesign
                </div>
              </div>

              {/* Level 4 */}
              <div className="bg-gradient-to-br from-blue-950/90 to-indigo-950 rounded-2xl p-6 border-2 border-blue-500/80 space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-lg shadow-blue-950/60">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/60">سطح ۴ • بلوغ نهایی</span>
                    <Building2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-black text-white">Organizational AI</h4>
                  <p className="text-xs text-slate-200 leading-relaxed text-justify">
                    AI به بخشی از قابلیت سازمان، حاکمیت داده و مزیت رقابتی پایدار کسب‌وکار تبدیل می‌شود.
                  </p>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono pt-2 border-t border-blue-800/60 font-semibold">
                  Focus: Sustainable Asset
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>

      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 04 — چیزی که ما نیستیم (WHAT WE ARE NOT)
         ========================================================================= */}
      <section className="py-16 sm:py-24 space-y-12">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b]">
              ما چه چیزی نیستیم؟
            </h2>
          </div>
        </RevealOnScroll>

        {/* 5 Clarity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <RevealOnScroll delay={50}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-700 font-black text-sm">
                  <div className="w-7 h-7 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <span>دوره معرفی ۱۰۰ ابزار AI نیستیم</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  هدف ما زیاد کردن تعداد ابزارهایی که می‌شناسید نیست؛ تمرکز ما تسلط بر ابزارهای محوری با بالاترین ارزش افزوده است.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-700 font-black text-sm">
                  <div className="w-7 h-7 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <span>صرفاً دوره پرامپت‌نویسی نیستیم</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  پرامپت یک مهارت اولیه است، نه مقصد. مقصد اصلی، حل مسئله و بازطراحی فرآیند کار با تفکر نقادانه است.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-700 font-black text-sm">
                  <div className="w-7 h-7 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <span>وعده جایگزینی انسان نمی‌دهیم</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  تمرکز ما روی <strong>Augmentation</strong>، افزایش توانمندی انسان، مدل Co-Pilot و بهبود جریان کاری است.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-700 font-black text-sm">
                  <div className="w-7 h-7 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <span>آموزش جدا از کار واقعی نیستیم</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  مثال‌ها، تمرین‌ها و شبیه‌سازهای ما مستقیماً روی داده‌ها و سناریوهای واقعی کسب‌وکار ایرانی پیاده شده‌اند.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={250} className="md:col-span-2 lg:col-span-2">
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-700 font-black text-sm">
                  <div className="w-7 h-7 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <span>بعد از پایان کلاس شما را رها نمی‌کنیم</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  هدف این است که آموخته‌ها به کاربرد واقعی منتقل شوند؛ به همین دلیل جعبه‌ابزار، چک‌لیست‌های اعتبارسنجی و سنجه‌های بلوغ در اختیارتان قرار می‌گیرد.
                </p>
              </div>
            </div>
          </RevealOnScroll>

        </div>

      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 05 — متدولوژی ما (5-STAGE PROCESS)
         ========================================================================= */}
      <section id="section-methodology" className="py-16 sm:py-24 space-y-12 scroll-mt-24">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b]">
              روش ما: فرآیند ۵ مرحله‌ای یادگیری تا کاربرد واقعی
            </h2>
          </div>
        </RevealOnScroll>

        {/* 5-Step Cards with Dedicated Visual Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          
          {/* Step 1 */}
          <RevealOnScroll delay={50}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-600">01</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Scan className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">DIAGNOSE</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  شناخت وضعیت، سنجش بلوغ، نیازسنجی و شفاف‌سازی مسئله در کار.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Phase 1 • عارضه‌یابی
              </div>
            </div>
          </RevealOnScroll>

          {/* Step 2 */}
          <RevealOnScroll delay={100}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-600">02</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">LEARN</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  یادگیری مفاهیم و قابلیت‌های موردنیاز AI متناسب با نقش شغلی.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Phase 2 • یادگیری
              </div>
            </div>
          </RevealOnScroll>

          {/* Step 3 */}
          <RevealOnScroll delay={150}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-600">03</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Laptop className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">PRACTICE</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  تمرین روی سناریوهای واقعی در شبیه‌سازهای تعاملی هوشران.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Phase 3 • شبیه‌سازی
              </div>
            </div>
          </RevealOnScroll>

          {/* Step 4 */}
          <RevealOnScroll delay={200}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-600">04</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Rocket className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">APPLY</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  قرار دادن AI در Workflow واقعی روزمره با ابزارها و کارت‌های جیبی.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Phase 4 • استقرار
              </div>
            </div>
          </RevealOnScroll>

          {/* Step 5 */}
          <RevealOnScroll delay={250}>
            <div className="h-full bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-blue-600">05</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">IMPROVE</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  اندازه‌گیری نتیجه، ارزیابی کمی، اصلاح و توسعه مداوم شایستگی.
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Phase 5 • بهینه‌سازی
              </div>
            </div>
          </RevealOnScroll>

        </div>

      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 07 — مثال واقعی SALES (CASE EXAMPLE)
         ========================================================================= */}
      <section className="py-16 sm:py-24">
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#121c2e] text-white rounded-3xl p-8 sm:p-12 lg:p-14 space-y-10 shadow-xl relative overflow-hidden">
            
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 tracking-wider uppercase">
                <Flame className="w-4 h-4 text-blue-400" />
                <span>مثال عینی از تحول فرآیند</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                مثلاً در Sales، مسئله فقط استفاده از AI نیست.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                مقایسه فرآیند سنتی فروش B2B با پایپ‌لاین هوشمندسازی‌شده مبتنی بر Workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Before */}
              <div className="bg-slate-800/60 rounded-3xl p-7 border border-slate-700/80 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-rose-400" />
                      فرآیند سنتی فروش (دستی و پراکنده)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Before AI Workflow</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span>۱. جست‌وجوی مشتری در وب و شبکه‌های اجتماعی</span>
                      <span className="text-rose-400 font-mono text-[11px]">اتلاف زمان بالا</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span>۲. جمع‌آوری اطلاعات و تحلیل دستی</span>
                      <span className="text-rose-400 font-mono text-[11px]">ریسک خطای شناختی</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span>۳. آماده‌سازی جلسه بدون سناریوی ساختاریافته</span>
                      <span className="text-rose-400 font-mono text-[11px]">عدم پیش‌بینی مخالفت‌ها</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span>۴. تدوین پیشنهاد فروش عمومی</span>
                      <span className="text-rose-400 font-mono text-[11px]">نرخ تبدیل پایین</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span>۵. ثبت اطلاعات با تأخیر در CRM</span>
                      <span className="text-rose-400 font-mono text-[11px]">فراموشی نکات کلیدی</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/40 p-3 rounded-xl border border-slate-800 text-center">
                  انرژی کارشناس صرف کارهای تکراری اداری می‌شود، نه ارتباط عمیق با مشتری.
                </div>
              </div>

              {/* After */}
              <div className="bg-blue-950/40 rounded-3xl p-7 border-2 border-blue-500/60 space-y-5 flex flex-col justify-between shadow-lg shadow-blue-950/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-800/60 pb-4">
                    <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-blue-400" />
                      پایپ‌لاین هوشمند فروش (AI-assisted Workflow)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">With Houshran</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-200">
                    <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ۱. AI-assisted Research (تفکیک Fact از Hypothesis)
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">سریع و ساختاریافته</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ۲. Customer Analysis و رتبه‌بندی فرصت
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">شناسایی درد پنهان</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ۳. Meeting Preparation و شبیه‌سازی اعتراضات
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">آمادگی حداکثری</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ۴. Sales Proposal شخصی‌سازی‌شده
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">ارزش‌محور و دقیق</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ۵. اتصال مستقیم خلاصه‌ها به CRM
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">بدون اتلاف داده</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-blue-200 bg-blue-900/30 p-3 rounded-xl border border-blue-800/60 text-center font-medium">
                  فروشنده زمان خود را روی مذاکره، اعتمادسازی و تصمیم‌گیری استراتژیک می‌گذارد.
                </div>
              </div>

            </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 06 — EVIDENCE & ARTIFACTS
         ========================================================================= */}
      <section className="py-16 sm:py-24 space-y-12">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black text-blue-600 tracking-wider uppercase">
              <FolderKanban className="w-4 h-4" />
              <span>مستندات و خروجی‌های واقعی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b]">
              چیزی که می‌گوییم، باید قابل مشاهده باشد.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
              ما هیچ ادعای بدون مدرک یا آمار ساختگی مطرح نمی‌کنیم. چارچوب‌ها، مدل‌های تشخیصی و نمونه‌های تولیدشده در هوشران را بررسی کنید:
            </p>
          </div>
        </RevealOnScroll>

        {/* Interactive Evidence Explorer */}
        <RevealOnScroll>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xs">
            
            {/* Tabs Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
              <button
                onClick={() => setActiveEvidenceTab('workflow')}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeEvidenceTab === 'workflow' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Workflow className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">معماری پایپ‌لاین</span>
              </button>

              <button
                onClick={() => setActiveEvidenceTab('diagnostic')}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeEvidenceTab === 'diagnostic' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">سنجش AIOD</span>
              </button>

              <button
                onClick={() => setActiveEvidenceTab('prompt_scoov')}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeEvidenceTab === 'prompt_scoov' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">فرمول S.C.O.O.V</span>
              </button>

              <button
                onClick={() => setActiveEvidenceTab('case_study')}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeEvidenceTab === 'case_study' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">بریف تحقیق مشتری</span>
              </button>
            </div>

            {/* Evidence Content Area */}
            <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              {activeEvidenceTab === 'workflow' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold text-slate-800">طرح شماتیک پایپ‌لاین فروش و ارتباط با حافظه</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Standard Pipeline Artifact</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600">INPUT LAYER</span>
                      <h4 className="text-xs font-bold text-slate-900">سند بریف اولیه و داده خام</h4>
                      <p className="text-[11px] text-slate-500">پایش داده‌های وب‌سایت، شبکه‌های اجتماعی و صورت‌های مالی</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600">REASONING LAYER</span>
                      <h4 className="text-xs font-bold text-slate-900">فیلتر اعتبارسنجی فرضیات</h4>
                      <p className="text-[11px] text-slate-500">تفکیک فکت‌های قطعی از حدسیات و رتبه‌بندی تمایل به خرید</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600">SYNTHESIS LAYER</span>
                      <h4 className="text-xs font-bold text-slate-900">تولید سناریوی مذاکره</h4>
                      <p className="text-[11px] text-slate-500">طراحی ۵ سوال طلایی اکتشافی و پاسخ به اعتراض احتمالی قیمت</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-600">STORAGE LAYER</span>
                      <h4 className="text-xs font-bold text-slate-900">انتقال ساختاریافته به CRM</h4>
                      <p className="text-[11px] text-slate-500">ثبت اتوماتیک خلاصه جلسه در قالب JSON/فیلدهای CRM</p>
                    </div>
                  </div>
                </div>
              )}

              {activeEvidenceTab === 'diagnostic' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold text-slate-800">ماتریس سنجش بلوغ سازمانی هوش مصنوعی (AIOD Framework)</span>
                    <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">Assessment Blueprint</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۱</div>
                      <div className="text-xs font-bold text-slate-800">استراتژی و رهبری</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۲</div>
                      <div className="text-xs font-bold text-slate-800">داده و زیرساخت</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۳</div>
                      <div className="text-xs font-bold text-slate-800">فرآیندها و گردش‌کار</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۴</div>
                      <div className="text-xs font-bold text-slate-800">مهارت و فرهنگ تیم</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۵</div>
                      <div className="text-xs font-bold text-slate-800">ابزارها و مدل‌ها</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-black text-indigo-600">بعد ۶</div>
                      <div className="text-xs font-bold text-slate-800">امنیت و حاکمیت</div>
                    </div>
                  </div>
                </div>
              )}

              {activeEvidenceTab === 'prompt_scoov' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold text-slate-800">متدولوژی اختصاصی مهندسی پرامپت سازمانی (S.C.O.O.V)</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Prompting Formula</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-mono font-black text-blue-600">S — Situation</div>
                      <div className="text-xs text-slate-700">تعریف دقیق بستر و نقش هوش مصنوعی</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-mono font-black text-blue-600">C — Context</div>
                      <div className="text-xs text-slate-700">حقایق، صنعت، محدودیت‌ها و سوابق</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-mono font-black text-blue-600">O — Objective</div>
                      <div className="text-xs text-slate-700">هدف ملموس و خروجی مورد انتظار</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-mono font-black text-blue-600">O — Output Format</div>
                      <div className="text-xs text-slate-700">قالب جدول، JSON، بولت‌پوینت یا ایمیل</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs font-mono font-black text-blue-600">V — Verification</div>
                      <div className="text-xs text-slate-700">معیار اعتبارسنجی و خود-ارزیابی مدل</div>
                    </div>
                  </div>
                </div>
              )}

              {activeEvidenceTab === 'case_study' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold text-slate-800">قالب استاندارد گزارش شناخت مشتری (Account Research Brief)</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Deliverable Template</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-slate-900 block mb-1">بخش ۱: خلاصه اجرایی حساب (Executive Snapshot)</strong>
                        <p className="text-slate-500 text-[11px]">صنعت، اندازه تیم، مدل درآمدی و سهام‌داران کلیدی</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">بخش ۲: گلوگاه‌های احتمالی (Inferred Pain Points)</strong>
                        <p className="text-slate-500 text-[11px]">مبتنی بر آگهی‌های استخدام، اخبار توسعه و چالش‌های زنجیره تامین</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </RevealOnScroll>

      </section>

      {/* Subtle Section Divider */}
      <div className="w-full max-w-xs mx-auto border-t border-slate-200/80 my-4" />

      {/* =========================================================================
          SECTION 08 — POSITIONING STATEMENT
         ========================================================================= */}
      <section className="py-16 sm:py-24 text-center">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto space-y-6 p-8 sm:p-12 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs">
            <span className="text-xs font-black text-blue-600 tracking-wider uppercase">بیانیه جایگاه‌سازی</span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b] leading-tight">
              «از آموزش ابزارهای AI به طراحی شیوه جدید کار با AI.»
            </blockquote>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              AI زمانی ارزش واقعی ایجاد می‌کند که از یک ابزار جداگانه به بخشی از نحوه انجام کار تبدیل شود.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* =========================================================================
          SECTION 09 — FINAL CTA (THREE STRATEGIC PATHWAYS)
         ========================================================================= */}
      <section id="section-final-cta" className="py-16 sm:py-24 space-y-12 scroll-mt-24">
        
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black text-blue-600 tracking-wider uppercase">
              <Rocket className="w-4 h-4" />
              <span>شروع همکاری و مسیر اقدام</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141b2b]">
              AI در کدام بخش از کار شما می‌تواند بیشترین ارزش را ایجاد کند؟
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              مسیر متناسب با نیاز خود را انتخاب کنید و گام بعدی را آغاز کنید:
            </p>
          </div>
        </RevealOnScroll>

        {/* Pathway Card (Diagnostic Assessment) */}
        <div className="max-w-xl mx-auto">
          <RevealOnScroll delay={100}>
            <div className="h-full bg-gradient-to-br from-indigo-50/60 to-blue-50/40 rounded-3xl border-2 border-indigo-200/80 hover:border-indigo-400 p-8 space-y-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-600 font-mono">AI READINESS ASSESSMENT</span>
                  <h3 className="text-xl font-black text-[#141b2b]">ارزیابی اولیه بلوغ (AIOD)</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  در کمتر از ۵ دقیقه سطح آمادگی سازمانی خود را در ۶ بعد کلیدی به‌صورت رایگان بسنجید.
                </p>
              </div>

              <button
                onClick={handleDiagnosticClick}
                className="w-full py-3.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-2 group/btn"
              >
                <span>وضعیت فعلی خود را بسنجید</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>
          </RevealOnScroll>
        </div>

      </section>

    </div>
  );
};
