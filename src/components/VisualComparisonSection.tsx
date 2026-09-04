import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Sparkles, Workflow, 
  Target, Brain, Users, Layers,
  HelpCircle, ShieldCheck, ArrowRight, Zap
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
  return (
    <section 
      id="before-after-comparison-section"
      className="relative space-y-10 sm:space-y-16 py-4 sm:py-8 overflow-hidden"
      aria-label="مقایسه سازمان قبل و بعد از هوشران"
    >
      {/* Background glow - constrained to prevent mobile horizontal scroll */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-64 bg-blue-600/10 blur-[100px] -z-10 pointer-events-none rounded-full" />

      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
        <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.3] sm:leading-[1.25]">
          سازمان شما در کدام سمت قرار دارد؟
        </h2>

        <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
          تفاوت، فقط در استفاده از AI نیست؛ در شیوه کار کردن سازمان است.
        </p>
      </div>

      {/* =========================================================================
          2. MASTER COMPARISON BOARD
         ========================================================================= */}
      <div className="space-y-4 sm:space-y-6">
        
        {/* Column Headers (Desktop - lg screens) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-4">
          
          {/* Left Column Header (بدون هوشران) */}
          <div className="col-span-5 p-4 xl:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400/90 tracking-wider uppercase block">
                وضعیت آشنا • بدون هوشران
              </span>
              <h3 className="text-sm xl:text-base font-black text-slate-200">
                سازمان بدون آموزش ساختاریافته AI
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 text-xs font-medium border border-slate-700/60 shrink-0">
              فرصت‌های از دست‌رفته
            </span>
          </div>

          {/* Center Indicator */}
          <div className="col-span-2 text-center">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-xs font-black text-slate-300 shadow-inner">
              VS
            </span>
          </div>

          {/* Right Column Header (با هوشران) */}
          <div className="col-span-5 p-4 xl:p-5 rounded-2xl bg-white border border-blue-200/80 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase block">
                وضعیت مطلوب • با هوشران
              </span>
              <h3 className="text-sm xl:text-base font-black text-slate-900">
                سازمان آموزش‌دیده با هوشران
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              قابلیت پایدار
            </span>
          </div>
        </div>

        {/* Mobile Mini Column Legend */}
        <div className="grid grid-cols-2 gap-2 lg:hidden px-1 text-center">
          <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shadow-xs">
            <span className="text-[10px] font-bold text-amber-400/90 block">وضعیت آشنا</span>
            <span className="text-xs font-black text-slate-200">بدون هوشران</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-blue-200 shadow-xs">
            <span className="text-[10px] font-bold text-blue-600 block">وضعیت مطلوب</span>
            <span className="text-xs font-black text-slate-900">با هوشران</span>
          </div>
        </div>

        {/* 3. PAIRED COMPARISON ROWS */}
        <div className="space-y-3.5 sm:space-y-4">
          {COMPARISON_PAIRS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.06, 0.3) }}
              className="group rounded-2xl sm:rounded-3xl bg-slate-800/65 border-2 border-white transition-all p-3.5 sm:p-5 backdrop-blur-xl shadow-lg"
            >
              {/* Row Topic Bar */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-md border border-blue-400/30 text-[10px] sm:text-[11px]">
                    {item.number}
                  </span>
                  <span className="font-bold text-slate-200 text-xs sm:text-sm">
                    {item.question}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                  <span className="hidden sm:inline">مقایسه شماره </span>
                  <span>{item.number}</span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 items-stretch">
                
                {/* 1. بدون هوشران */}
                <div className="lg:col-span-5 p-3.5 sm:p-4 xl:p-5 rounded-xl sm:rounded-2xl bg-slate-900/85 border border-slate-700/60 flex flex-col justify-between space-y-2.5 sm:space-y-3 transition-colors group-hover:border-slate-600/70 shadow-sm">
                  <div className="flex items-center justify-between lg:hidden pb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      بدون هوشران (وضعیت آشنا)
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {item.without.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-1.5 sm:gap-2">
                      <h4 className="text-xs sm:text-sm xl:text-base font-bold text-slate-200">
                        {item.without.headline}
                      </h4>
                      <span className="hidden lg:inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                        {item.without.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.without.subline}
                    </p>
                  </div>

                  {item.without.flow && (
                    <div className="pt-2 border-t border-slate-700/50 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-[11px] text-slate-300 font-mono" dir="ltr">
                        {item.without.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 whitespace-nowrap">
                              {step}
                            </span>
                            {sIdx < item.without.flow!.length - 1 && (
                              <span className="text-slate-500 text-[10px]">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. VS Center Pillar */}
                <div className="lg:col-span-2 flex items-center justify-center py-0.5 sm:py-1 lg:py-0">
                  <div className="flex lg:flex-col items-center gap-1.5 text-center">
                    <div className="h-px lg:h-6 w-8 sm:w-12 lg:w-px bg-slate-700" />
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-slate-300 shadow-sm shrink-0">
                      VS
                    </span>
                    <div className="h-px lg:h-6 w-8 sm:w-12 lg:w-px bg-slate-700" />
                  </div>
                </div>

                {/* 3. با هوشران */}
                <div className="lg:col-span-5 p-3.5 sm:p-4 xl:p-5 rounded-xl sm:rounded-2xl bg-white border border-blue-100 flex flex-col justify-between space-y-2.5 sm:space-y-3 shadow-md transition-all group-hover:shadow-lg group-hover:border-blue-200">
                  <div className="flex items-center justify-between lg:hidden pb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      با هوشران (وضعیت مطلوب)
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {item.withHoushran.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <h4 className="text-xs sm:text-sm xl:text-base font-black text-slate-900">
                          {item.withHoushran.headline}
                        </h4>
                      </div>
                      <span className="hidden lg:inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                        {item.withHoushran.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item.withHoushran.subline}
                    </p>
                  </div>

                  {item.withHoushran.flow && (
                    <div className="pt-2 border-t border-slate-100 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-[11px] font-mono" dir="ltr">
                        {item.withHoushran.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-semibold shadow-xs whitespace-nowrap">
                              {step}
                            </span>
                            {sIdx < item.withHoushran.flow!.length - 1 && (
                              <span className="text-blue-500 font-bold text-[10px]">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.withHoushran.note && (
                    <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] sm:text-xs text-blue-900 font-semibold bg-blue-50/70 p-2 sm:p-2.5 rounded-lg border border-blue-100/90">
                      <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item.withHoushran.note}</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          4. STATEMENT نهایی — با فضای تنفس کامل از بالا و پایین (Spacious Breathing Room)
         ========================================================================= */}
      <div className="pt-28 sm:pt-40 pb-24 sm:pb-36 max-w-4xl mx-auto text-center space-y-6 px-4 relative">
        
        {/* خط نوری تفکیک‌کننده محو در بالای بیانیه */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto mb-8" />

        <div className="space-y-4 sm:space-y-5">
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-400 leading-snug">
            مسئله فقط این نیست که AI را بلد باشید.
          </h3>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-snug">
            مسئله این است که آیا سازمان شما می‌داند{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-300 to-white">
              چطور با AI بهتر کار کند؟
            </span>
          </h3>
        </div>

        {/* خط نوری تفکیک‌کننده محو در پایین بیانیه */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto mt-8" />
      </div>

    </section>
  );
};