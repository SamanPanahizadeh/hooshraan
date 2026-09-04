import React from 'react';
import { ArrowLeft, Check, X as XIcon, BarChart3, ChevronDown } from 'lucide-react';
import { VisualComparisonSection } from './VisualComparisonSection';

interface WhyUsProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  onExploreIndividual?: () => void;
  onExploreEnterprise?: () => void;
  onStartDiagnostic?: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onNavigate, onStartDiagnostic }) => {
  const handleDiagnosticClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onStartDiagnostic) onStartDiagnostic();
    else if (onNavigate) onNavigate('diagnostic');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFAFA] text-[#0F172A] min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION 1 — HERO SECTION
           ========================================================================= */}
        <section 
          id="section-hero"
          className="min-h-[80vh] flex flex-col justify-center items-center text-center py-20 sm:py-28"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* تیتر اصلی — محتوای دست‌نخورده با سلسله‌مراتب دقیق و کنتراست بالا */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.3] sm:leading-[1.25]">
              ما به شما ابزار نمی‌فروشیم؛ <br className="hidden sm:block" />
              <span className="text-[#1D4ED8]">
                جریان کار شما را بازطراحی می‌کنیم.
              </span>
            </h1>

            {/* زیرتیتر */}
            <p className="text-base sm:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed font-normal">
              گذار از استفاده‌های پراکنده و انفرادی به ساخت قابلیت پایدار سازمانی بر پایه متدولوژی انسان هوش‌ران.
            </p>

            {/* دکمه اصلی — استایل Solid بدون افکت‌های شلوغ */}
            <div className="flex items-center justify-center pt-4">
              <button
                onClick={handleDiagnosticClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-3 cursor-pointer hover:shadow-md"
              >
                <BarChart3 className="w-5 h-5" />
                <span>سنجش آنلاین بلوغ سازمانی (AIOD)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* هدایت به بخش بعد */}
          <button
            onClick={() => scrollToSection('section-comparison')}
            className="mt-16 inline-flex flex-col items-center gap-2 text-[#94A3B8] hover:text-[#475569] transition cursor-pointer"
          >
            <span className="text-xs font-medium tracking-wide">مشاهده تمایز رویکرد</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#1D4ED8]" />
          </button>
        </section>

        {/* =========================================================================
            SECTION 2 — مقایسه بصری
           ========================================================================= */}
        <section id="section-comparison" className="border-t border-[#E2E8F0] py-24 sm:py-32">
          <VisualComparisonSection
            onNavigate={onNavigate}
            onStartDiagnostic={handleDiagnosticClick}
          />
        </section>

        {/* =========================================================================
            SECTION 3 — مقایسه تفصیلی ابزارمحور با بازطراحی جریان کار
           ========================================================================= */}
        <section 
          id="section-deep-comparison"
          className="border-t border-[#E2E8F0] py-24 sm:py-32 space-y-16"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              تفاوت آموزش ابزارمحور با بازطراحی جریان کار
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              چرا دوره‌های سنتی متداول فراموش می‌شوند اما یادگیری متصل به فرآیند در سازمان تثبیت می‌شود؟
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* کارت نگاه سنتی */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-8 sm:p-10 space-y-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-5">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase block mb-1">آموزش متداول بازار</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">نگاه ابزارمحور (Tool-Centric)</h3>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                    نتیجه ناپایدار
                  </span>
                </div>

                <ul className="space-y-4 text-sm text-[#475569] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>مرور صدها ابزار و مدل بدون اتصال به فرآیند کاری مشخص</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>کپی پرامپت‌های آماده که در داده‌های واقعی و پیچیده کار نمی‌کنند</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>آموزش منوها و دکمه‌ها به جای تقویت تفکر نقادانه و داوری انسانی</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>فراموشی آموخته‌ها بلافاصله پس از اتمام دوره</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-xl text-xs text-[#64748B] text-center font-medium border border-[#E2E8F0]/60">
                اتلاف بودجه و زمان سازمان بدون افزایش بهره‌وری ملموس.
              </div>
            </div>

            {/* کارت متدولوژی هوشران */}
            <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#1D4ED8]/30 p-8 sm:p-10 space-y-8 flex flex-col justify-between shadow-sm relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-5">
                  <div>
                    <span className="text-xs font-bold text-[#1D4ED8] uppercase block mb-1">متدولوژی هوشران</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">طراحی جریان کار (Workflow-First)</h3>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#1D4ED8] text-xs font-bold border border-blue-100">
                    قابلیت پایدار
                  </span>
                </div>

                <ul className="space-y-4 text-sm text-[#334155] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>تشخیص نقاط درد و گلوگاه‌های واقعی کار قبل از انتخاب ابزار</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>توسعه پایپ‌لاین زنجیره‌ای (تحقیق ← ارزیابی ← سناریو ← اقدام)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>تمرکز بر مدل همکار کمکی با حفظ نظارت و داوری کامل انسان</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>ماندگاری دائمی در عادات کاری سازمان به دلیل اجرا روی پرونده‌های واقعی</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl text-xs text-[#1D4ED8] text-center font-semibold border border-blue-100">
                صرفه‌جویی مستقیم نفر-ساعت و ارتقای کیفیت تصمیم‌گیری سازمانی.
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — دعوت به اقدام پایانی (ACTION SECTION)
           ========================================================================= */}
        <section 
          id="section-action"
          className="border-t border-[#E2E8F0] py-24 sm:py-32 flex flex-col justify-center items-center text-center space-y-8"
        >
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              آمادگی سازمان خود را برای هوش مصنوعی ارزیابی کنید
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              در کمتر از ۵ دقیقه سطح بلوغ فرآیندها، داده‌ها و مهارت‌های تیم خود را با ابزار تشخیصی اختصاصی هوشران بسنجید.
            </p>
          </div>

          <button
            onClick={handleDiagnosticClick}
            className="px-8 py-4 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all duration-200 inline-flex items-center gap-3 cursor-pointer hover:shadow-md"
          >
            <BarChart3 className="w-5 h-5" />
            <span>ورود به سامانه سنجش بلوغ (AIOD)</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </section>

      </div>
    </div>
  );
};