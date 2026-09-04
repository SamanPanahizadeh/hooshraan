import React from 'react';
import { 
  ArrowLeft, Check, X as XIcon, 
  BarChart3, ChevronDown 
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
  const handleDiagnosticClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onStartDiagnostic) onStartDiagnostic();
    else if (onNavigate) onNavigate('diagnostic');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 text-slate-100" dir="rtl">
      
      {/* =========================================================================
          SECTION 1 — HERO SECTION
         ========================================================================= */}
      <section 
        id="section-hero"
        className="min-h-[85vh] flex flex-col justify-center items-center text-center relative py-12 scroll-mt-20"
      >
        {/* هاله نوری در پس‌زمینه */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-cyan-400/20 blur-[120px] -z-10 pointer-events-none rounded-full" />

        <div className="space-y-8 w-full">
          {/* تیتر اصلی */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.3] sm:leading-[1.2]">
            ما به شما ابزار نمی‌فروشیم؛ <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-300 to-white">
              جریان کار شما را بازطراحی می‌کنیم.
            </span>
          </h1>

          {/* زیرتیتر */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            گذار از استفاده‌های پراکنده و انفرادی به ساخت قابلیت پایدار سازمانی بر پایه متدولوژی انسان هوش‌ران.
          </p>

          {/* دکمه‌های شیشه‌ای */}
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleDiagnosticClick}
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-[0_10px_35px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-3 group cursor-pointer"
            >
              <BarChart3 className="w-5 h-5 text-blue-200" />
              <span>سنجش آنلاین بلوغ سازمانی (AIOD)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* دکمه راهنمای هدایت نرم به بخش بعدی */}
        <button
          onClick={() => scrollToSection('section-comparison')}
          className="mt-12 inline-flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition group cursor-pointer"
        >
          <span className="text-[11px] tracking-wider font-medium">مشاهده تمایز رویکرد</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
        </button>
      </section>

      {/* =========================================================================
          SECTION: مقایسه بصری و روانشناختی قبل و بعد از هوشران (Visual Comparison & Loss Aversion)
         ========================================================================= */}
      <div id="section-comparison" className="scroll-mt-20 border-t border-white/5 pt-10 sm:pt-16">
        <VisualComparisonSection
          onNavigate={onNavigate}
          onStartDiagnostic={handleDiagnosticClick}
        />
      </div>

      {/* =========================================================================
          SECTION 2 — مقایسه تفصیلی ابزارمحور با بازطراحی جریان کار
         ========================================================================= */}
      <section 
        id="section-deep-comparison"
        className="min-h-[85vh] flex flex-col justify-center space-y-10 py-16 scroll-mt-20 border-t border-white/5"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-snug">
            تفاوت آموزش ابزارمحور با بازطراحی جریان کار
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            چرا دوره‌های سنتی متداول فراموش می‌شوند اما یادگیری متصل به فرآیند در سازمان تثبیت می‌شود؟
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* کارت سنتی */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/5 p-7 sm:p-9 space-y-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-rose-400 uppercase block">آموزش متداول بازار</span>
                  <h3 className="text-lg font-black text-slate-200">نگاه ابزارمحور (Tool-Centric)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">نتیجه ناپایدار</span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>مرور صدها ابزار و مدل بدون اتصال به فرآیند کاری مشخص</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>کپی پرامپت‌های آماده که در داده‌های واقعی و پیچیده کار نمی‌کنند</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>آموزش منوها و دکمه‌ها به جای تقویت تفکر نقادانه و داوری انسانی</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <span>فراموشی آموخته‌ها بلافاصله پس از اتمام دوره</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-xs text-slate-500 text-center font-medium">
              اتلاف بودجه و زمان سازمان بدون افزایش بهره‌وری ملموس.
            </div>
          </div>

          {/* کارت هوشران */}
          <div className="bg-gradient-to-b from-blue-950/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl border border-blue-500/30 p-7 sm:p-9 space-y-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-400 uppercase block">متدولوژی هوشران</span>
                  <h3 className="text-lg font-black text-white">طراحی جریان کار (Workflow-First)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">قابلیت پایدار</span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>تشخیص نقاط درد و گلوگاه‌های واقعی کار قبل از انتخاب ابزار</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>توسعه پایپ‌لاین زنجیره‌ای (تحقیق ← ارزیابی ← سناریو ← اقدام)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>تمرکز بر مدل همکار کمکی با حفظ نظارت و داوری کامل انسان</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>ماندگاری دائمی در عادات کاری سازمان به دلیل اجرا روی پرونده‌های واقعی</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 bg-blue-900/30 rounded-xl border border-blue-500/20 text-xs text-blue-200 text-center font-medium">
              صرفه‌جویی مستقیم نفر-ساعت و ارتقای کیفیت تصمیم‌گیری سازمانی.
            </div>
          </div>

        </div>

        {/* هدایت به بخش بعد */}
        <div className="text-center pt-2">
          <button
            onClick={() => scrollToSection('section-action')}
            className="inline-flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition group cursor-pointer"
          >
            <span className="text-[11px] tracking-wider font-medium">سنجش آمادگی سازمان</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — دعوت به اقدام پایانی (ACTION SECTION)
         ========================================================================= */}
      <section 
        id="section-action"
        className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-8 py-16 scroll-mt-20 border-t border-white/5"
      >
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-snug">
            آمادگی سازمان خود را برای هوش مصنوعی ارزیابی کنید
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            در کمتر از ۵ دقیقه سطح بلوغ فرآیندها، داده‌ها و مهارت‌های تیم خود را با ابزار تشخیصی اختصاصی هوشران بسنجید.
          </p>
        </div>

        <button
          onClick={handleDiagnosticClick}
          className="px-9 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-[0_10px_35px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-3 group"
        >
          <BarChart3 className="w-5 h-5 text-blue-200" />
          <span>ورود به سامانه سنجش بلوغ (AIOD)</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      </section>

    </div>
  );
};