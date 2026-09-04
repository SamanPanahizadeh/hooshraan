import React, { useState } from 'react';
import { 
  ArrowLeft, Check, X as XIcon, 
  BarChart3, Scan, BookOpen, Laptop, Rocket, RefreshCw 
} from 'lucide-react';
import { VisualComparisonSection } from './VisualComparisonSection';

interface WhyUsProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  onExploreIndividual?: () => void;
  onExploreEnterprise?: () => void;
  onStartDiagnostic?: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ 
  onNavigate,
  onStartDiagnostic 
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleDiagnosticClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onStartDiagnostic) onStartDiagnostic();
    else if (onNavigate) onNavigate('diagnostic');
  };

  const steps = [
    {
      id: '01',
      title: 'عارضه‌یابی و سنجش',
      en: 'DIAGNOSE',
      desc: 'شناسایی گلوگاه‌های زمانی سازمان، ارزیابی آمادگی داده‌ها و تعیین دقیق مسائلی که هوش مصنوعی واقعاً می‌تواند حل کند.',
      icon: Scan,
    },
    {
      id: '02',
      title: 'آموزش نقش‌محور',
      en: 'LEARN',
      desc: 'یادگیری متمرکز بر وظایف هر واحد (فروش، مارکتینگ، منابع انسانی) و تسلط بر مدل همکاری انسان با هوش مصنوعی (Co-Pilot).',
      icon: BookOpen,
    },
    {
      id: '03',
      title: 'شبیه‌سازی عملیاتی',
      en: 'PRACTICE',
      desc: 'تمرین در آزمایشگاه‌های سناریومحور روی پرونده‌های واقعی، نامه‌های مناقصه و تحلیل‌های بازار بدون ریسک عملیاتی.',
      icon: Laptop,
    },
    {
      id: '04',
      title: 'استقرار در Workflow',
      en: 'APPLY',
      desc: 'اتصال هوش مصنوعی به جریان روزمره کار؛ از تدوین مستندات و فرمول پرامپت‌های اختصاصی تا تغذیه اتوماتیک CRM.',
      icon: Rocket,
    },
    {
      id: '05',
      title: 'سنجش و بهینه‌سازی',
      en: 'IMPROVE',
      desc: 'اندازه‌گیری کمی نفر-ساعت آزادشده و ارتقای مداوم هوش سازمانی به عنوان یک دارایی استراتژیک.',
      icon: RefreshCw,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-0 sm:px-6 py-4 sm:py-10 text-slate-100 space-y-14 sm:space-y-28 overflow-x-hidden" dir="rtl">
      
      {/* =========================================================================
          HERO SECTION — ورود کریستالی و های‌تک
         ========================================================================= */}
      <section className="relative text-center space-y-6 sm:space-y-8 pt-4 sm:pt-8 pb-8 sm:pb-10 overflow-hidden px-2">
        
        {/* هاله‌های نوری درخشان در زمینه تیره برای شکست نور در شیشه */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[300px] sm:h-[350px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-cyan-400/20 blur-[100px] sm:blur-[120px] -z-10 pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/10 blur-[80px] sm:blur-[100px] -z-10 pointer-events-none rounded-full" />

        {/* تیتر اصلی پرقدرت */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.3] sm:leading-[1.2]">
          ما به شما ابزار نمی‌فروشیم؛ <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-300 to-white">
            جریان کار شما را بازطراحی می‌کنیم.
          </span>
        </h1>

        {/* زیرتیتر */}
        <p className="text-xs sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          گذار از کاربردهای پراکنده و ناپایدار فردی به ساخت مزیت رقابتی و قابلیت پایدار در سازمان.
        </p>

        {/* دکمه اقدام اصلی شیشه‌ای */}
        <div className="flex items-center justify-center pt-2 sm:pt-4">
          
          {/* دکمه: سنجش آنلاین بلوغ سازمانی */}
          <button
            onClick={handleDiagnosticClick}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 bg-blue-600/30 hover:bg-blue-600/50 text-white font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-2xl border border-blue-400/40 shadow-[0_8px_32px_rgba(37,99,235,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-blue-300 shrink-0" />
            <span>سنجش آنلاین بلوغ سازمانی (AIOD)</span>
            <ArrowLeft className="w-4 h-4 text-blue-300 group-hover:text-white group-hover:-translate-x-1 transition-all shrink-0" />
          </button>

        </div>

      </section>

      {/* =========================================================================
          SECTION: مقایسه بصری و روانشناختی قبل و بعد از هوشران (Loss Aversion & Visual Comparison)
         ========================================================================= */}
      <VisualComparisonSection
        onNavigate={onNavigate}
        onStartDiagnostic={handleDiagnosticClick}
      />

      {/* =========================================================================
          SECTION 1: مقایسه قبل و بعد در شیشه تیره
         ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">تمایز رویکرد</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            تفاوت آموزش ابزارمحور با بازطراحی جریان کار
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          
          {/* کارت رویکرد سنتی (دودی مات) */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/5 p-4 sm:p-7 xl:p-8 space-y-5 sm:space-y-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-rose-400 uppercase block">آموزش متداول بازار</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-200">نگاه ابزارمحور (Tool-Centric)</h3>
                </div>
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[11px] sm:text-xs font-bold border border-rose-500/20 shrink-0">نتیجه ناپایدار</span>
              </div>

              <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>مرور صدها ابزار و مدل بدون اتصال به فرآیند کاری مشخص</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>کپی پرامپت‌های آماده که در داده‌های واقعی و پیچیده کار نمی‌کنند</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>آموزش منوها و دکمه‌ها به جای تقویت تحلیل و تفکر نقادانه انسانی</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>فراموشی آموخته‌ها بلافاصله پس از اتمام دوره</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[11px] sm:text-xs text-slate-500 text-center font-medium">
              اتلاف بودجه و زمان سازمان بدون افزایش بهره‌وری ملموس.
            </div>
          </div>

          {/* کارت رویکرد هوشران (زمینه روشن متمایز و خوانا) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-7 xl:p-8 space-y-5 sm:space-y-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_40px_rgba(59,130,246,0.12)] relative overflow-hidden text-slate-900">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900" />

            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase block">متدولوژی هوشران</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">طراحی جریان کار (Workflow-First)</h3>
                </div>
                <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200/70 shrink-0">قابلیت پایدار</span>
              </div>

              <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>تشخیص نقاط درد و گلوگاه‌های واقعی کار قبل از انتخاب ابزار</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>توسعه پایپ‌لاین زنجیره‌ای (تحقیق ← ارزیابی ← سناریو ← اقدام)</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>تمرکز بر مدل همکار کمکی با حفظ نظارت و داوری کامل انسان</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>ماندگاری دائمی در عادات کاری سازمان به دلیل پیاده‌سازی روی پرونده‌های واقعی</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl text-[11px] sm:text-xs text-center font-medium shadow-xs">
              صرفه‌جویی مستقیم نفر-ساعت و ارتقای کیفیت تصمیم‌گیری سازمانی.
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: فرآیند ۵ مرحله‌ای (کریستال‌های متصل)
         ========================================================================= */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">مسیر استقرار</span>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            فرآیند ۵ مرحله‌ای یادگیری تا کاربرد واقعی
          </h2>
        </div>

        {/* نوار شیشه‌ای دارک - واکنش‌گرا و متقارن در موبایل */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 sm:p-3 rounded-xl text-right transition-all flex flex-col justify-between ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              } ${
                activeStep === idx 
                  ? 'bg-white/[0.08] shadow-md border border-white/20 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-blue-400">{step.id}</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase">{step.en}</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold truncate">{step.title}</span>
            </button>
          ))}
        </div>

        {/* کارت محتوای مرحله انتخاب‌شده */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-7 xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-300 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                گام {steps[activeStep].id} • {steps[activeStep].en}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">{steps[activeStep].title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/[0.06] border border-white/10 text-blue-400 flex items-center justify-center shrink-0 self-end sm:self-center shadow-inner">
            {React.createElement(steps[activeStep].icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER ACTION
         ========================================================================= */}
      <section className="text-center space-y-6 pt-6 pb-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            آمادگی سازمان خود را برای هوش مصنوعی ارزیابی کنید
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            در کمتر از ۵ دقیقه سطح بلوغ فرآیندها و مهارت‌های تیم خود را به صورت رایگان بسنجید.
          </p>
        </div>

        <button
          onClick={handleDiagnosticClick}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5 group"
        >
          <BarChart3 className="w-4 h-4 text-blue-200" />
          <span>ورود به سامانه سنجش بلوغ (AIOD)</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      </section>

    </div>
  );
};