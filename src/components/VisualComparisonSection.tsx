import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

interface VisualComparisonSectionProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  onStartDiagnostic?: () => void;
}

interface ComparisonPair {
  id: string;
  number: string;
  question: string;
  without: {
    headline: string;
    subline: string;
    tag: string;
    flow?: string[];
  };
  withHoushran: {
    headline: string;
    subline: string;
    tag: string;
    flow?: string[];
    note?: string;
  };
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'tool-vs-problem',
    number: '۰۱',
    question: 'ابزار یا مسئله؟',
    without: {
      headline: 'ابزارمحور',
      subline: '«با این ابزار AI چه کار می‌توانم بکنم؟»',
      tag: 'استفاده پراکنده',
    },
    withHoushran: {
      headline: 'مسئله‌محور',
      subline: '«این مسئله را چطور بهتر حل کنم؟»',
      tag: 'استفاده هدفمند',
    },
  },
  {
    id: 'workflow-integration',
    number: '۰۲',
    question: 'AI کنار کار یا داخل کار؟',
    without: {
      headline: 'AI یک ابزار جانبی است.',
      subline: 'کار موازی و منفک از روند اصلی کار',
      tag: 'AI خارج از Workflow',
      flow: ['کار', 'AI', 'خروجی', 'ادامه کار'],
    },
    withHoushran: {
      headline: 'AI بخشی از Workflow است.',
      subline: 'پایپ‌لاین پیوسته از مسئله تا تصمیم و اقدام',
      tag: 'AI در Workflow',
      flow: ['Problem', 'AI', 'Review', 'Decision', 'Action'],
    },
  },
  {
    id: 'answer-vs-thinking',
    number: '۰۳',
    question: 'جواب گرفتن یا بهتر فکر کردن؟',
    without: {
      headline: 'AI جواب می‌دهد.',
      subline: 'تکیه بر پاسخ‌های آماده بدون غنابخشی به تفکر',
      tag: 'خروجی نیازمند بررسی',
    },
    withHoushran: {
      headline: 'AI به فرایند فکر کردن و تصمیم‌سازی کمک می‌کند.',
      subline: 'ارتقای داوری انسانی، گسترش گزینه‌ها و تحلیل نقادانه',
      tag: 'خروجی قابل ارزیابی',
      note: 'AI به جای انسان تصمیم نمی‌گیرد؛ به انسان کمک می‌کند بهتر تصمیم بگیرد.',
    },
  },
  {
    id: 'prompt-vs-skill',
    number: '۰۴',
    question: 'Prompt یا مهارت؟',
    without: {
      headline: 'دنبال Prompt آماده',
      subline: 'کپی‌کردن فرمول‌های ایستا بدون درک بافتار سازمان',
      tag: 'ابزارمحور',
    },
    withHoushran: {
      headline: 'توانایی تعامل حرفه‌ای با AI',
      subline: 'مسئله + زمینه + هدف + محدودیت + ارزیابی',
      tag: 'مسئله‌محور',
    },
  },
  {
    id: 'individual-vs-org',
    number: '۰۵',
    question: 'مهارت فردی یا قابلیت سازمانی؟',
    without: {
      headline: 'چند نفر بلدند.',
      subline: 'استفاده از AI وابسته به افراد و تجربه‌های شخصی است.',
      tag: 'وابسته به افراد',
    },
    withHoushran: {
      headline: 'تیم می‌داند چگونه استفاده کند.',
      subline: 'AI به یک قابلیت قابل توسعه در شیوه کار تیم تبدیل می‌شود.',
      tag: 'قابل توسعه در تیم',
    },
  },
];

export const VisualComparisonSection: React.FC<VisualComparisonSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = COMPARISON_PAIRS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COMPARISON_PAIRS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + COMPARISON_PAIRS.length) % COMPARISON_PAIRS.length);
  };

  return (
    <section 
      id="before-after-comparison-section"
      className="relative space-y-12 py-8 overflow-hidden"
      aria-label="مقایسه سازمان قبل و بعد از هوشران"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-64 bg-blue-600/10 blur-[100px] -z-10 pointer-events-none rounded-full" />

      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-2">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug">
          سازمان شما در کدام سمت قرار دارد؟
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
          تفاوت، فقط در استفاده از AI نیست؛ در شیوه کار کردن سازمان است.
        </p>
      </div>

      {/* =========================================================================
          2. آلبوم انتخابی (Pill Tabs + Controls)
         ========================================================================= */}
      <div className="max-w-4xl mx-auto space-y-6 px-2 sm:px-4">
        
        {/* نوار سربرگ‌های آلبوم با فونت درشت‌تر */}
        <div className="flex items-center justify-center gap-2 p-2 bg-white/[0.04] backdrop-blur-2xl rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
          {COMPARISON_PAIRS.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className="font-mono text-xs sm:text-sm opacity-90">{item.number}</span>
                <span className="hidden sm:inline">{item.question}</span>
                <span className="sm:hidden">{item.question.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            3. کارت فعال آلبوم با متون خوانا و درشت
           ===================================================================== */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-slate-800/70 border-2 border-white/80 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6"
            >
              {/* هدر بالایی کارت آلبوم */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-xl border border-blue-400/30 text-xs sm:text-sm">
                    مقایسه {currentItem.number} از ۰۵
                  </span>
                  <span className="font-black text-white text-base sm:text-lg xl:text-xl">
                    {currentItem.question}
                  </span>
                </div>

                {/* دکمه‌های ورق زدن */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="قبلی"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition border border-white/10 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="بعدی"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition border border-white/10 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* گرید دوطرفه مقایسه */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                
                {/* ۱. بدون هوشران (سمت چپ) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-700/70 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      وضعیت آشنا • بدون هوشران
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {currentItem.without.tag}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-base sm:text-lg xl:text-xl font-bold text-slate-100">
                      {currentItem.without.headline}
                    </h4>
                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                      {currentItem.without.subline}
                    </p>
                  </div>

                  {currentItem.without.flow && (
                    <div className="pt-3.5 border-t border-slate-700/50">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-300 font-mono" dir="ltr">
                        {currentItem.without.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200">
                              {step}
                            </span>
                            {sIdx < currentItem.without.flow!.length - 1 && (
                              <span className="text-slate-500">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ۲. ستون وسط VS */}
                <div className="lg:col-span-2 flex items-center justify-center py-2 lg:py-0">
                  <div className="flex lg:flex-col items-center gap-2 text-center">
                    <div className="h-px lg:h-10 w-12 lg:w-px bg-slate-700" />
                    <span className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300 shadow-md shrink-0">
                      VS
                    </span>
                    <div className="h-px lg:h-10 w-12 lg:w-px bg-slate-700" />
                  </div>
                </div>

                {/* ۳. با هوشران (سمت راست - کارت سفید بسیار خوانا) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-blue-100 flex flex-col justify-between space-y-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      وضعیت مطلوب • با هوشران
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {currentItem.withHoushran.tag}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <h4 className="text-base sm:text-lg xl:text-xl font-black text-slate-900">
                        {currentItem.withHoushran.headline}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
                      {currentItem.withHoushran.subline}
                    </p>
                  </div>

                  {currentItem.withHoushran.flow && (
                    <div className="pt-3.5 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-mono" dir="ltr">
                        {currentItem.withHoushran.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold">
                              {step}
                            </span>
                            {sIdx < currentItem.withHoushran.flow!.length - 1 && (
                              <span className="text-blue-500 font-bold">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentItem.withHoushran.note && (
                    <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs sm:text-sm text-blue-900 font-semibold bg-blue-50/90 p-3 rounded-xl border border-blue-100">
                      <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{currentItem.withHoushran.note}</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* نقاط نشانگر صفحه (Pagination Dots) */}
        <div className="flex items-center justify-center gap-2.5 pt-2">
          {COMPARISON_PAIRS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === dotIdx ? 'w-10 bg-blue-500 shadow-sm' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`اسلاید ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
          4. STATEMENT نهایی — فونت‌های درشت و تفکیک‌شده
         ========================================================================= */}
      <div className="pt-28 sm:pt-40 pb-20 sm:pb-32 max-w-4xl mx-auto text-center space-y-6 px-4 relative">
        <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto mb-6" />

        <div className="space-y-4 sm:space-y-5">
          <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-400 leading-snug">
            مسئله فقط این نیست که AI را بلد باشید.
          </h3>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-snug">
            مسئله این است که آیا سازمان شما می‌داند{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-300 to-white">
              چطور با AI بهتر کار کند؟
            </span>
          </h3>
        </div>

        <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto mt-6" />
      </div>

    </section>
  );
};