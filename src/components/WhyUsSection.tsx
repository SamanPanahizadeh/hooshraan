import React, { useState } from 'react';
import { 
  ArrowLeft, Check, X as XIcon, Layers, Workflow, Target, Users, 
  Briefcase, Building2, ChevronLeft, Sparkles, Compass, ShieldCheck, 
  Search, Send, MessageSquare, Database, ArrowDown, CheckCircle2,
  Cpu, Award, BarChart3, TrendingUp, HelpCircle, FileText, CheckCheck,
  Zap, Clock, Scale, Eye, Sliders, LineChart
} from 'lucide-react';

interface WhyUsSectionProps {
  onNavigate: (tab: string, subTab?: string) => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onNavigate }) => {
  const [activeDept, setActiveDept] = useState<'sales' | 'marketing' | 'hr' | 'management'>('sales');
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'workflow' | 'diagnostic' | 'prompt_scoov' | 'case_study'>('workflow');

  const scrollToMethodology = () => {
    const el = document.getElementById('section-methodology');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGateways = () => {
    const el = document.getElementById('main-portals-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Department Workflows Data
  const departmentWorkflows = {
    sales: {
      title: 'واحد فروش و توسعه بازار (Sales & BD)',
      badge: 'B2B & Enterprise Sales',
      steps: [
        { name: 'Customer Research', desc: 'تحقیق عمیق مشتری و استخراج Fact از Hypothesis', tool: 'Co-Pilot Research' },
        { name: 'Opportunity Analysis', desc: 'شناسایی نقاط درد پنهان و اولویت‌بندی لیدها', tool: 'AI ICP Scoring' },
        { name: 'Meeting Preparation', desc: 'طراحی سؤالات اکتشافی و سناریوهای مذاکره', tool: 'Brief Generator' },
        { name: 'Sales Proposal', desc: 'شخصی‌سازی پیشنهاد ارزش متناسب با نیاز خریدار', tool: 'Tailored Pitch' },
        { name: 'CRM & Pipeline', desc: 'ثبت خودکار خلاصه جلسه و چرخه خرید مشتری', tool: 'CRM Memory' }
      ]
    },
    marketing: {
      title: 'واحد بازاریابی و ارتباطات (Marketing)',
      badge: 'Growth & Content Ops',
      steps: [
        { name: 'Market Research', desc: 'پایش روندهای بازار، نیاز مشتری و تحلیل رقبا', tool: 'Intelligence Engine' },
        { name: 'Content Strategy', desc: 'ایده‌پردازی و ساخت تقویم محتوایی مبتنی بر بینش', tool: 'Audience Insight' },
        { name: 'Campaign Execution', desc: 'تولید محتوای چندکاناله با لحن اختصاصی برند', tool: 'Brand-Voice AI' },
        { name: 'Performance Analysis', desc: 'تحلیل داده‌های کمپین و بهینه‌سازی مداوم CAC/LTV', tool: 'ROI Attribution' }
      ]
    },
    hr: {
      title: 'واحد منابع انسانی و آموزش (HR & L&D)',
      badge: 'People & Culture',
      steps: [
        { name: 'Talent Acquisition', desc: 'طراحی شرح شغل‌های دقیق و تدوین سوالات مصاحبه شایستگی', tool: 'Role Profiler' },
        { name: 'Learning & Skill Maps', desc: 'شخصی‌سازی مسیر ارتقای مهارت برای هر شغل', tool: 'Adaptive L&D' },
        { name: 'Employee Support', desc: 'پاسخگویی سریع به سوالات آئین‌نامه‌ای و رفاهی', tool: 'Internal HR Copilot' },
        { name: 'HR Analytics', desc: 'تحلیل نرخ نگه‌داشت، فرسودگی و پایش انگیزه پرسنل', tool: 'People Insights' }
      ]
    },
    management: {
      title: 'مدیریت ارشد و استراتژی (Management & Strategy)',
      badge: 'Executive Decision',
      steps: [
        { name: 'Strategic Research', desc: 'سنتز گزارش‌های حجیم صنعتی و سیگنال‌های کلیدی', tool: 'Executive Synthesis' },
        { name: 'Deep Analysis', desc: 'تحلیل ساختاریافته ماتریس SWOT و شکاف بازار', tool: 'Framework Builder' },
        { name: 'Decision Support', desc: 'شبیه‌سازی پیامدهای تصمیم در سناریوهای نامطمئن', tool: 'Scenario Modeling' },
        { name: 'Resource Allocation', desc: 'اولویت‌بندی سرمایه‌گذاری و بودجه‌بندی هوشمند', tool: 'Portfolio ROI' }
      ]
    }
  };

  return (
    <div className="space-y-24 py-6" dir="rtl">
      
      {/* =========================================================================
          SECTION 01 — HERO: MINIMAL, B2B, EDITORIAL
         ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50/50 to-white border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12 lg:p-16">
        
        {/* Subtle Architectural Grid Background Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Section Kicker / Strategic Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0f1d38] text-white border border-[#1e2f52] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-[12px] font-normal tracking-wide">رویکرد متمایز «هوشران» در آموزش و تحول هوش مصنوعی</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#141b2b] tracking-tight leading-[1.3] text-balance">
            ما AI را به <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">کار واقعی</span> شما متصل می‌کنیم.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal text-justify sm:text-center">
            ما به‌جای آموزش پراکنده ابزارهای هوش مصنوعی، به افراد و سازمان‌ها کمک می‌کنیم AI را در Workflow واقعی خود وارد کنند؛ از افزایش بهره‌وری فردی تا طراحی فرآیندهای AI-enabled در سطح واحد و سازمان.
          </p>

          {/* Value Journey Equation Bar */}
          <div className="py-3 px-4 sm:px-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700">
            <span className="text-slate-500 font-mono">AI Training</span>
            <span className="text-blue-600 font-bold">→</span>
            <span className="text-slate-900 font-bold bg-blue-50 px-2 py-0.5 rounded text-blue-700 font-mono">AI Workflow</span>
            <span className="text-blue-600 font-bold">→</span>
            <span className="text-slate-500 font-mono">Business Application</span>
            <span className="text-blue-600 font-bold">→</span>
            <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded font-mono">Organizational Capability</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToGateways}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <span>مسیر مناسب خود را پیدا کنید</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToMethodology}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 transition shadow-xs flex items-center justify-center gap-2"
            >
              <span>روش ما را ببینید</span>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — تفاوت اصلی ما (VISUAL COMPARISON)
         ========================================================================= */}
      <section className="space-y-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">مقایسه دو نگاه به آموزش هوش مصنوعی</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#141b2b] leading-snug">
            ما AI را بر اساس ابزار آموزش نمی‌دهیم؛ بر اساس <span className="text-blue-600">کاری که شما انجام می‌دهید</span> آموزش می‌دهیم.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            آموزش سنتی هوش مصنوعی بر محور امکانات نرم‌افزارها شکل گرفته است. در مقابل، رویکرد ما بر محور فرآیند کاری، گلوگاه‌ها و ارزش کسب‌وکار استوار است.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Side A: Traditional AI Training */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">آموزش مرسوم در بازار</span>
                <h3 className="text-lg font-black text-slate-800 mt-0.5">Traditional AI Training</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                ابزارمحور
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XIcon className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-800 font-semibold block">معرفی ابزارها:</strong>
                  مرور فهرست‌وار ده‌ها وب‌سایت و مدل بدون سناریوی مشخص.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XIcon className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-800 font-semibold block">پرامپت‌های آماده عمومی:</strong>
                  ارائه کپی-پیست الگوهای کلیشه‌ای که در مسائل واقعی کسب‌وکار کار نمی‌کنند.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XIcon className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-800 font-semibold block">آموزش ویژگی‌های ChatGPT:</strong>
                  تمرکز روی دکمه‌ها و منوهای رابط کاربری به‌جای منطق تصمیم‌گیری.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XIcon className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-800 font-semibold block">تمرین‌های عمومی:</strong>
                  خلاصه‌سازی متن‌های ساختگی بدون اتصال به زنجیره ارزش و وظایف شغلی.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XIcon className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-slate-800 font-semibold block">پایان دوره = قطع ارتباط:</strong>
                  عدم انتقال مهارت به جریان واقعی کار و بازگشت پرسنل به عادت‌های قبلی.
                </div>
              </li>
            </ul>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-[11px] text-slate-500 text-center">
              نتیجه: فراموشی ۹۰٪ آموخته‌ها طی ۲ هفته به دلیل عدم ادغام در جریان کار روزمره.
            </div>
          </div>

          {/* Side B: Our Approach */}
          <div className="bg-white rounded-3xl border-2 border-blue-600/90 shadow-[0_12px_40px_rgba(0,102,255,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />

            <div className="flex items-center justify-between border-b border-blue-100 pb-4">
              <div>
                <span className="text-[11px] font-black text-blue-600 tracking-wider uppercase block">رویکرد استراتژیک ما</span>
                <h3 className="text-lg font-black text-[#141b2b] mt-0.5">Our Approach</h3>
              </div>
              <div className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 font-black text-xs border border-blue-200">
                فرآیندمحور و ساختاریافته
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#141b2b] font-bold block">شناخت دقیق مسئله کسب‌وکار:</strong>
                  تعیین گلوگاه‌های زمانی، خطاهای محاسباتی و هزینه‌های اتلاف شده قبل از باز کردن هر ابزار.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#141b2b] font-bold block">تحلیل Workflow و زنجیره ارزش:</strong>
                  نقشه‌برداری از مراحل انجام کار از ورودی داده تا خروجی نهایی مشتری.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#141b2b] font-bold block">طراحی AI Workflow یکپارچه:</strong>
                  تعریف نقاط دقیق تعامل انسان و مدل (Human-in-the-loop) و مدل Co-Pilot.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#141b2b] font-bold block">اجرای یک کار واقعی در آزمایشگاه:</strong>
                  تولید Research Brief واقعی، سناریوی فروش زنده و مستندسازی در CRM.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="text-[#141b2b] font-bold block">اندازه‌گیری نتیجه، ارزیابی و تکرار:</strong>
                  سنجش کمی نفر-ساعت آزاد شده، بهبود نرخ تبدیل و ارتقای مداوم پرامپت‌ها.
                </div>
              </li>
            </ul>

            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 text-[11px] text-blue-900 font-semibold text-center">
              نتیجه: ماندگاری و تثبیت در عادات روزمره سازمان به دلیل اتصال به خروجی‌های واقعی کار.
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 03 — شش دلیل اصلی «چرا ما؟» (SIX CORE PILLARS)
         ========================================================================= */}
      <section className="space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">۶ رکن تمایز بنیادین</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#141b2b]">
            چرا آموزش‌های ما به کار واقعی تبدیل می‌شوند؟
          </h2>
          <p className="text-sm text-slate-600">
            طراحی مهندسی‌شده فرآیند یادگیری، از اولین کلیک تا استقرار کامل در فرآیندهای سازمانی
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 01 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">01</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">اول مسئله، بعد AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              ما آموزش را از معرفی ابزار شروع نمی‌کنیم. ابتدا مشخص می‌کنیم چه مسئله، گلوگاه یا اتلاف وقتی در کار وجود دارد؛ سپس بررسی می‌کنیم هوش مصنوعی در کدام بخش دقیقاً می‌تواند ارزش افزوده ملموس ایجاد کند.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">02</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Workflow className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">AI را وارد Workflow می‌کنیم</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              هدف ما صرفاً انجام یک Task مجزا با چت‌بات نیست. هوش مصنوعی باید در نقاط زنجیره‌ای فرآیند (مانند تحقیق مشتری ← تحلیل ← آماده‌سازی جلسه ← پیشنهاد فروش ← ثبت CRM) بنشیند و زنجیره کار را پیوسته نگاه دارد.
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">03</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">یک نسخه برای همه وجود ندارد</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              نیازهای هوش مصنوعی در فروش، بازاریابی، منابع انسانی و مدیریت ارشد کاملاً با یکدیگر متفاوت است. آموزش‌های ما کاملاً Role-based و متناسب با شاخص‌های عملکردی هر واحد تخصصی سازمان طراحی شده‌اند.
            </p>
          </div>

          {/* Card 04 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">04</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">هدف ما فقط یادگیری نیست؛ توانستن است</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              مسیر سه‌مرحله‌ای ما: <strong>KNOW</strong> (شناخت مفاهیم) ← <strong>DO</strong> (تمرین روی یک نمونه عینی در شبیه‌ساز) ← <strong>APPLY</strong> (به‌کارگیری روزانه در کار). خروجی نهایی، توانایی تحویل کار باکیفیت است.
            </p>
          </div>

          {/* Card 05 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">05</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">Prompt مقصد نیست؛ فقط ابزار است</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              ما فقط به شما متن پرامپت آماده نمی‌دهیم؛ یاد می‌دهیم چه زمانی، برای چه مسئله‌ای، با چه ساختاری (مانند فرمول ساختاریافته S.C.O.O.V) و در کجای فرآیند کاری از هوش مصنوعی خروجی معتبر بگیرید.
            </p>
          </div>

          {/* Card 06 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-blue-600">06</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-black text-[#141b2b]">از بهره‌وری فردی تا قابلیت سازمانی</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              توسعه هوش مصنوعی در ۴ سطح بلوغ: از مهارت یک کارشناس (فردی)، تا گردش‌کار مشترک تیم، بازطراحی فرآیند واحد، و در نهایت تبدیل شدن هوش مصنوعی به مزیت رقابتی و دارایی پایدار کل سازمان.
            </p>
          </div>

        </div>

        {/* =========================================================================
            DEEP DIVE: INTERACTIVE ROLE-BASED WORKFLOW EXPLORER (دلیل ۳ و ۵)
           ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">نمایش تعاملی فرآیندهای تخصصی</span>
              <h3 className="text-lg font-black text-[#141b2b] mt-0.5">
                تطبیق هوش مصنوعی با Workflow واقعی هر واحد سازمانی
              </h3>
            </div>
            
            {/* Department Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveDept('sales')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeDept === 'sales' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                فروش (Sales)
              </button>
              <button
                onClick={() => setActiveDept('marketing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeDept === 'marketing' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                بازاریابی (Marketing)
              </button>
              <button
                onClick={() => setActiveDept('hr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeDept === 'hr' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                منابع انسانی (HR)
              </button>
              <button
                onClick={() => setActiveDept('management')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  activeDept === 'management' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                مدیریت ارشد (Strategy)
              </button>
            </div>
          </div>

          {/* Workflow Steps Horizontal Pipeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{departmentWorkflows[activeDept].title}</span>
              <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                {departmentWorkflows[activeDept].badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {departmentWorkflows[activeDept].steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-mono text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-600">Step {idx + 1}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{step.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify">{step.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-blue-700 font-semibold">
                    <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                    <span className="truncate">{step.tool}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================================
            DEEP DIVE: MATURITY MODEL (دلیل ۶: از فرد تا سازمان)
           ========================================================================= */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">چهار سطح تکامل هوش مصنوعی در سازمان</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              مدل بلوغ: از افزایش بهره‌وری فردی تا ساخت قابلیت بنیادین سازمان
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              ما به سازمان شما کمک می‌کنیم مسیر رشد هوش مصنوعی را از سطح پراکنده کارمندی به سطح دارایی راهبردی ارتقا دهد.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Level 1 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50">سطح ۱</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Individual Productivity</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                هر فرد در وظایف روزمره خود از ابزارها استفاده می‌کند تا سرعت نوشتن، جستجو و خلاصه‌سازی را افزایش دهد.
              </p>
            </div>

            {/* Level 2 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50">سطح ۲</span>
                <Workflow className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Team Workflow</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                تیم از استانداردها و پرامپت‌های مشترک استفاده می‌کند تا فرآیندهای تیمی مثل تحقیق مشتری و خروجی‌ها هماهنگ شوند.
              </p>
            </div>

            {/* Level 3 */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">سطح ۳</span>
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Department AI</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                فرآیندهای اصلی یک واحد (مانند پایپ‌لاین کامل فروش یا بازاریابی) با معماری هوش مصنوعی بازطراحی و یکپارچه می‌شوند.
              </p>
            </div>

            {/* Level 4 */}
            <div className="bg-gradient-to-br from-blue-900/60 to-indigo-950/80 rounded-2xl p-5 border border-blue-500/50 space-y-3 relative shadow-lg shadow-blue-950/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">سطح ۴ • بلوغ نهایی</span>
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Organizational AI</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                هوش مصنوعی به قابلیت استراتژیک، حاکمیت داده، مدل‌های اختصاصی و مزیت رقابتی پایدار کل سازمان تبدیل می‌شود.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 04 — چیزی که ما نیستیم (WHAT WE ARE NOT - HONEST & CLEAR)
         ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black text-rose-600 tracking-wider uppercase">شفافیت و صداقت در تعهدات</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#141b2b]">
            ما چه چیزی نیستیم؟
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            برای درک بهتر رویکرد ما، مهم است بدانید چه کارهایی را عامدانه انجام نمی‌دهیم تا کیفیت و اثربخشی حفظ شود.
          </p>
        </div>

        {/* 5 Clarity Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XIcon className="w-4 h-4 shrink-0" />
              <span>معرفی ۱۰۰ ابزار هوش مصنوعی</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              هدف ما زیاد کردن تعداد ابزارهایی که نامشان را می‌شنوید نیست؛ بلکه تسلط عمیق بر ۲ الی ۳ ابزار محوری است که ۹۰٪ کار شما را متحول می‌کنند.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XIcon className="w-4 h-4 shrink-0" />
              <span>صرفاً پرامپت‌نویسی متنی</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              پرامپت یک مهارت ابتدایی است، نه مقصد. ما تفکر نقادانه، اعتبارسنجی داده‌ها (Fact vs Fiction) و ادغام در پایپ‌لاین را آموزش می‌دهیم.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XIcon className="w-4 h-4 shrink-0" />
              <span>وعده جایگزینی انسان با AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              تمرکز ما بر <strong>Augmentation</strong> (تقویت توان انسان) و مدل Co-Pilot است. تصمیم‌گیری نهایی، قضاوت اخلاقی و ارتباط انسانی حذف‌ناپذیرند.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XIcon className="w-4 h-4 shrink-0" />
              <span>آموزش جدا از کار واقعی</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              تمام تمرین‌ها و شبیه‌سازها روی نمونه‌های واقعی کسب‌وکار (مانند داده‌های صنعت، مذاکره زنده و پرونده‌های سازمانی) پیاده‌سازی شده‌اند.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2.5 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XIcon className="w-4 h-4 shrink-0" />
              <span>رها کردن سازمان پس از پایان ساعات کارگاه</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              آموزش بدون چک‌لیست‌های اعتبارسنجی، کارت‌های جیبی، پرامپت‌پک ساختاریافته و سنجه‌های بلوغ پایدار نمی‌ماند. ما جعبه‌ابزار دائمی کار را در اختیارتان می‌گذاریم.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 05 — متدولوژی ما (OUR 5-STAGE PROCESS)
         ========================================================================= */}
      <section id="section-methodology" className="space-y-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">فرآیند مهندسی‌شده ۵ مرحله‌ای</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#141b2b]">
            روش ما: فرآیند یادگیری تا استقرار عملیاتی
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            آموزش هوش مصنوعی در هوشران یک رویداد سخنرانی چندساعته نیست؛ بلکه یک متدولوژی سیستماتیک از عارضه‌یابی تا سنجش بازگشت سرمایه است.
          </p>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-blue-600">01</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 1</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">DIAGNOSE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              شناخت وضعیت فعلی، سنجش بلوغ سازمانی (AIOD)، شناسایی نیازها و گلوگاه‌های اصلی کسب‌وکار.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-blue-600">02</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 2</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">LEARN</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              یادگیری عمیق اصول فکری، مدل Co-Pilot، مهندسی پرامپت ساختاریافته S.C.O.O.V و تفکیک داده معتبر.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-blue-600">03</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 3</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">PRACTICE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تمرین زنده در ۴ شبیه‌ساز عملی (تحقیق مشتری، پیام‌نویسی، مذاکره صوتی/متنی و CRM هوشمند).
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-blue-600">04</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 4</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">APPLY</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تعبیه خروجی‌ها در Workflow واقعی شغل و اجرای پروژه‌های پایلوت سازمانی با نظارت مربی.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-blue-600">05</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 5</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">IMPROVE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              سنجش بازگشت سرمایه (ROI)، ثبت بازخورد، اصلاح پرامپت‌ها و توسعه مداوم شایستگی‌ها.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 07 — مثال واقعی SALES (CASE EXAMPLE)
         ========================================================================= */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">نمونه کاربردی در دنیای واقعی</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مثلاً در فروش سازمانی (Sales)، مسئله فقط استفاده از چت‌بات نیست.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            مقایسه فرآیند سنتی فروش با پایپ‌لاین بازطراحی‌شده با هوش مصنوعی کمکی (AI-assisted Workflow).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Before */}
          <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-bold text-rose-400">فرآیند سنتی فروش (دستی و پراکنده)</span>
              <Clock className="w-4 h-4 text-rose-400" />
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>۱. جستجوی دستی شرکت‌ها در گوگل و لینکدین</span>
                <span className="text-rose-400 font-mono text-[11px]">۲ تا ۳ ساعت</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>۲. تحلیل اطلاعات پراکنده بدون متدولوژی مشخص</span>
                <span className="text-rose-400 font-mono text-[11px]">ریسک فرضیات اشتباه</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>۳. ارسال پیام‌های عمومی کپی-پیست شده (Cold Outreach)</span>
                <span className="text-rose-400 font-mono text-[11px]">نرخ پاسخ زیر ۳٪</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>۴. حضور در جلسه بدون سناریوی مدیریت اعتراضات خریدار</span>
                <span className="text-rose-400 font-mono text-[11px]">اتلاف فرصت‌های کلیدی</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span>۵. فراموشی جزئیات جلسه و عدم ثبت به موقع در CRM</span>
                <span className="text-rose-400 font-mono text-[11px]">فرسایش حافظه تیمی</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-blue-950/40 rounded-2xl p-6 border border-blue-500/50 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-800/60 pb-3">
              <span className="text-xs font-bold text-blue-300">پایپ‌لاین هوشمند فروش (AI-assisted Workflow)</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                <span>۱. استخراج Research Brief ساختاریافته (Fact vs Hypothesis)</span>
                <span className="text-blue-300 font-mono text-[11px]">۱۰ دقیقه با تمرکز بالا</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                <span>۲. پیام‌نویسی کاملاً هدفمند بر اساس چالش واقعی خریدار</span>
                <span className="text-emerald-300 font-mono text-[11px]">افزایش چشمگیر پاسخگویی</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                <span>۳. تمرین و شبیه‌سازی مکالمه در Role-play Arena قبل از جلسه</span>
                <span className="text-blue-300 font-mono text-[11px]">آمادگی ۱۰۰٪ برای ابهامات</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/50 flex items-center justify-between">
                <span>۴. تبدیل صوت/نکات جلسه به Customer Memory و برنامه اقدام CRM</span>
                <span className="text-emerald-300 font-mono text-[11px]">ثبت دقیق چرخه خرید</span>
              </div>
            </div>
          </div>

        </div>

        {/* Strategic Takeaway Note */}
        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed text-justify sm:text-right">
          <strong className="text-white font-bold block mb-1">پیام کلیدی هوشران:</strong>
          هدف ما این نیست که هوش مصنوعی جای فروشنده یا کارشناس را بگیرد؛ هدف این است که نیروی انسانی بتواند زمان و توان ذهنی خود را از کارهای تکراری آزاد کرده و روی بخش‌های باارزش‌تر (مثل برقراری اعتماد، درک عمیق انسان‌ها و تصمیم‌گیری استراتژیک) متمرکز کند.
        </div>

      </section>

      {/* =========================================================================
          SECTION 06 — EVIDENCE: شواهد و خروجی‌های ملموس
         ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider">اثبات رویکرد با شواهد مستند</span>
            <h2 className="text-2xl font-black text-[#141b2b]">
              چیزی که می‌گوییم، باید قابل مشاهده باشد.
            </h2>
            <p className="text-xs text-slate-500">
              مشاهده شواهد، مستندات عملی و ابزارهای واقعی توسعه‌یافته در پلتفرم هوشران
            </p>
          </div>

          {/* Evidence Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveEvidenceTab('workflow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeEvidenceTab === 'workflow' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نمونه Workflow
            </button>
            <button
              onClick={() => setActiveEvidenceTab('diagnostic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeEvidenceTab === 'diagnostic' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              سامانه AIOD
            </button>
            <button
              onClick={() => setActiveEvidenceTab('prompt_scoov')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeEvidenceTab === 'prompt_scoov' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فرمول S.C.O.O.V
            </button>
            <button
              onClick={() => setActiveEvidenceTab('case_study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeEvidenceTab === 'case_study' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              بریف واقعی تحقیق
            </button>
          </div>
        </div>

        {/* Evidence Content Display */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          
          {activeEvidenceTab === 'workflow' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">مستند معماری Workflow فروش و ادغام ابزارها</span>
                <span className="text-[11px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  Live Architecture
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                این دیاگرام نشان می‌دهد چگونه هوش مصنوعی در ۵ گلوگاه پایپ‌لاین فروش مستقر شده و خروجی هر مرحله مستقیماً به ورودی مرحله بعد تبدیل می‌شود.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Module 1-2</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">Research Brief</div>
                  <div className="text-[10px] text-blue-600 mt-0.5">تفکیک Fact / Hypo</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Module 3-4</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">Cold Outreach</div>
                  <div className="text-[10px] text-blue-600 mt-0.5">بدون Fabricate</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Module 5-6</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">Role-Play Simulator</div>
                  <div className="text-[10px] text-blue-600 mt-0.5">سنجش ۶ بعدی</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">Module 7-8</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">Smart CRM</div>
                  <div className="text-[10px] text-blue-600 mt-0.5">حافظه مشتری</div>
                </div>
              </div>
            </div>
          )}

          {activeEvidenceTab === 'diagnostic' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">چارچوب ارزیابی بلوغ سازمانی (AIOD Framework)</span>
                <span className="text-[11px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                  ۶ بعد کلیدی
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارزیابی تحلیلی در ۶ محور: استراتژی و رهبری، حاکمیت داده و زیرساخت، نیروی انسانی و فرهنگ، فرآیند و پایپ‌لاین، امنیت و اخلاق، و سنجش ارزش و ROI.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">رادار چارت بنچمارک صنعت</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">ماتریس اولویت‌بندی ۲×۲</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">شبیه‌ساز مالی بازگشت سرمایه (ROI)</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">تولید خودکار برنامه اقدام فازبندی‌شده</span>
              </div>
            </div>
          )}

          {activeEvidenceTab === 'prompt_scoov' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">متدولوژی ساختار پرامپت S.C.O.O.V</span>
                <span className="text-[11px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  ۵ مؤلفه استاندارد
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                یک استاندارد مهندسی‌شده برای حذف خطاهای توهم (Hallucination) و دریافت خروجی‌های حرفه‌ای در محیط‌های شرکتی.
              </p>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200"><strong className="text-blue-600 block">S</strong>ituation</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200"><strong className="text-blue-600 block">C</strong>ontext</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200"><strong className="text-blue-600 block">O</strong>bjective</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200"><strong className="text-blue-600 block">O</strong>utput Format</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200"><strong className="text-blue-600 block">V</strong>alidation</div>
              </div>
            </div>
          )}

          {activeEvidenceTab === 'case_study' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">ساختار استاندارد بریف تحقیق مشتری (Research Brief Template)</span>
                <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  خروجی واقعی شبیه‌ساز
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                فرمت ساختاریافته شامل: تحلیل مدل درآمدی، شناسایی تصمیم‌گیرنده، تفکیک فکت‌های اثبات‌شده، نقاط حساسیت خرید و طراحی ۳ سوال اکتشافی عمیق.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
                [Fact 01]: شرکت دارای ۱۲۰ پرسنل و در حال گسترش پایپ‌لاین B2B است.<br/>
                [Hypothesis 01]: بزرگ‌ترین دغدغه مدیر فروش، اتلاف زمان کارشناسان در جمع‌آوری دستی داده‌هاست.
              </div>
            </div>
          )}

        </div>

      </section>

      {/* =========================================================================
          SECTION 08 — POSITIONING STATEMENT (POWERFUL & EDITORIAL)
         ========================================================================= */}
      <section className="text-center py-12 px-6 sm:px-12 rounded-3xl bg-slate-100 border border-slate-200 max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-[#141b2b] tracking-tight leading-snug">
          «از آموزش ابزارهای AI به طراحی شیوه جدید کار با AI.»
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          هوش مصنوعی زمانی ارزش واقعی ایجاد می‌کند که از یک ابزار جانبی و تفننی، به بخشی طبیعی و ساختاریافته از نحوه انجام کارهای روزمره تبدیل شود.
        </p>
      </section>

      {/* =========================================================================
          SECTION 09 — FINAL CTA (GO TO LEARNING / DIAGNOSTIC)
         ========================================================================= */}
      <section id="main-portals-section" className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 space-y-8 scroll-mt-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">شروع مسیر تحول هوش مصنوعی</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#141b2b]">
            AI در کدام بخش از کار شما می‌تواند بیشترین ارزش را ایجاد کند؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            بر اساس نیاز خود یا سازمان‌تان، یکی از گزینه‌های زیر را انتخاب نمایید:
          </p>
        </div>

        {/* 3 Interactive Pathway Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Option 1: For Individuals / Professionals */}
          <div className="bg-[#f9f9ff] rounded-2xl border border-blue-200/90 p-6 flex flex-col justify-between space-y-4 hover:border-blue-600 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-600">مسیر یادگیری فردی و مهارتی</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">برای مدیران و کارشناسان</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                مشاهده سرفصل‌های ۸‌گانه، کار با ۴ شبیه‌ساز عملی (تحقیق، پیام‌نویسی، مذاکره، CRM) و دریافت کتابخانه پرامپت‌ها.
              </p>
            </div>

            <button
              onClick={() => onNavigate('sales-hub')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs group-hover:gap-3"
            >
              <span>مسیر یادگیری خود را ببینید</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Option 2: For Organizations & HR */}
          <div className="bg-[#f9f9ff] rounded-2xl border border-indigo-200/90 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-600 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-indigo-600">برنامه آموزش و توسعه سازمانی</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">برای سازمان‌ها و مدیران HR</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                طراحی دوره‌های اختصاصی مبتنی بر واحدهای سازمانی، سنجش بلوغ، ایجاد استانداردهای پرامپت و بازطراحی Workflow.
              </p>
            </div>

            <button
              onClick={() => onNavigate('diagnostic')}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs group-hover:gap-3"
            >
              <span>مسیر AI سازمان خود را بررسی کنید</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Option 3: Initial Quick Diagnostic */}
          <div className="bg-[#f9f9ff] rounded-2xl border border-slate-300 p-6 flex flex-col justify-between space-y-4 hover:border-slate-800 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md shadow-slate-800/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600">خودارزیابی استاندارد ۶ بعدی</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">ارزیابی اولیه هوش مصنوعی</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                سنجش سریع سطح بلوغ سازمان در برابر بنچمارک‌های صنعتی و دریافت خودکار نقشه راه اجرایی بلند مدت.
              </p>
            </div>

            <button
              onClick={() => onNavigate('diagnostic')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs group-hover:gap-3"
            >
              <span>وضعیت فعلی خود را بسنجید</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};
