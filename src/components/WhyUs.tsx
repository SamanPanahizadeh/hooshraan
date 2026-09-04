import React, { useState } from 'react';
import { 
  ArrowLeft, Check, X as XIcon, 
  BarChart3, Scan, BookOpen, Laptop, Rocket, RefreshCw 
} from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-slate-900 space-y-24" dir="rtl">
      
      {/* =========================================================================
          HERO SECTION — ورود شیشه‌ای، باوقار و مدرن
         ========================================================================= */}
      <section className="relative text-center space-y-8 pt-6 pb-8 overflow-hidden">
        
        {/* هاله‌های رنگی چندلایه جهت ایجاد عمق شکست نور در المان‌های شیشه‌ای */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-400/15 to-emerald-400/10 blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-blue-400/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        {/* تیتر اصلی */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.3] sm:leading-[1.2]">
          ما به شما ابزار نمی‌فروشیم؛ <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-700 via-indigo-600 to-slate-900">
            جریان کار شما را بازطراحی می‌کنیم.
          </span>
        </h1>

        {/* زیرتیتر خلوت */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          گذار از استفاده‌های پراکنده و انفرادی به ساخت قابلیت پایدار سازمانی بر پایه متدولوژی انسان هوش‌ران.
        </p>

        {/* دکمه اقدام اصلی */}
        <div className="flex items-center justify-center pt-4">
          
          {/* دکمه: سنجش آنلاین بلوغ سازمانی */}
          <button
            onClick={handleDiagnosticClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/85 hover:bg-slate-900 text-white font-medium text-xs sm:text-sm rounded-2xl backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_30px_rgb(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgb(15,23,42,0.22)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>سنجش آنلاین بلوغ سازمانی (AIOD)</span>
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </button>

        </div>

      </section>

      {/* =========================================================================
          SECTION 1: مقایسه قبل و بعد (THE REAL DIFFERENCE)
         ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">تمایز رویکرد</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            تفاوت آموزش ابزارمحور با بازطراحی جریان کار
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* رویکرد سنتی */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-slate-200/80 p-7 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-rose-600 uppercase block">آموزش متداول بازار</span>
                  <h3 className="text-lg font-black text-slate-800">نگاه ابزارمحور (Tool-Centric)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">نتیجه ناپایدار</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>مرور صدها ابزار و مدل بدون اتصال به فرآیند کاری مشخص</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>کپی پرامپت‌های آماده که در داده‌های واقعی و پیچیده کار نمی‌کنند</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>آموزش کلیک کردن در منوها به جای تحلیل و داوری انسانی</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>فراموشی آموخته‌ها بلافاصله پس از اتمام دوره</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white/60 rounded-xl border border-slate-200 text-xs text-slate-500 text-center font-medium">
              اتلاف هزینه و زمان سازمان بدون افزایش بهره‌وری ملموس.
            </div>
          </div>

          {/* رویکرد هوشران */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-slate-900 p-7 sm:p-8 space-y-6 flex flex-col justify-between shadow-[0_16px_40px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900" />

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase block">متدولوژی هوشران</span>
                  <h3 className="text-lg font-black text-slate-900">طراحی جریان کار (Workflow-First)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">قابلیت پایدار</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>تشخیص نقاط درد و گلوگاه‌های واقعی کار قبل از انتخاب ابزار</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>توسعه پایپ‌لاین زنجیره‌ای (تحقیق ← ارزیابی ← سناریو ← اقدام)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>تمرکز بر مدل همکار کمکی هوش مصنوعی با حفظ کنترل کامل انسان</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>ماندگاری دائمی در عادات کاری سازمان به دلیل اجرا روی تسک‌های واقعی</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs text-center font-medium">
              صرفه‌جویی مستقیم نفر-ساعت و ارتقای کیفیت تصمیم‌گیری سازمانی.
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: متدولوژی ۵ مرحله‌ای (5-STAGE ROADMAP)
         ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">مسیر استقرار</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            فرآیند ۵ مرحله‌ای یادگیری تا کاربرد واقعی
          </h2>
        </div>

        {/* نوار شیشه‌ای انتخاب مراحل */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-100/70 backdrop-blur-md rounded-2xl border border-slate-200/60">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl text-right transition-all flex flex-col justify-between ${
                activeStep === idx 
                  ? 'bg-white/95 shadow-sm border border-slate-200/80 text-slate-900' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-mono text-xs font-bold text-blue-600">{step.id}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{step.en}</span>
              </div>
              <span className="text-xs font-bold truncate">{step.title}</span>
            </button>
          ))}
        </div>

        {/* نمایش کارت محتوای مرحله انتخاب‌شده */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                گام {steps[activeStep].id} • {steps[activeStep].en}
              </span>
              <h3 className="text-lg font-black text-slate-900">{steps[activeStep].title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/80 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 self-end sm:self-center shadow-xs">
            {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-blue-600" })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER ACTION — دعوت به اقدام شیشه‌ای
         ========================================================================= */}
      <section className="text-center space-y-6 pt-6 pb-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            آمادگی سازمان خود را برای هوش مصنوعی ارزیابی کنید
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            در کمتر از ۵ دقیقه سطح بلوغ فرآیندها و مهارت‌های تیم خود را به صورت رایگان بسنجید.
          </p>
        </div>

        <button
          onClick={handleDiagnosticClick}
          className="px-8 py-4 bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_30px_rgb(15,23,42,0.15)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5 group"
        >
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <span>ورود به سامانه سنجش بلوغ (AIOD)</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      </section>

    </div>
  );
};