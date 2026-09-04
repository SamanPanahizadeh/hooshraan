import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, Sparkles, Workflow, 
  Target, Brain, Users, Layers, Quote, BarChart3,
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
      headline: 'AI یک ابزار جانبی است',
      subline: 'کار موازی و بریده از زمینه تصمیم‌گیری',
      tag: 'AI خارج از Workflow',
      flow: ['کار روزمره', 'مراجعه به AI', 'خروجی خام', 'ادامه کار'],
    },
    withHoushran: {
      headline: 'AI بخشی از Workflow است',
      subline: 'زنجیره متصل از صورت‌مسئله تا اقدام نهایی',
      tag: 'AI در Workflow',
      flow: ['Problem', 'AI Co-Pilot', 'Review', 'Decision', 'Action'],
    },
  },
  {
    id: 'answer-vs-thinking',
    number: '۰۳',
    question: 'جواب گرفتن یا بهتر فکر کردن؟',
    without: {
      headline: 'AI جواب می‌دهد',
      subline: 'تولید متن‌های آماده بدون درک بافتار سازمان',
      tag: 'خروجی نیازمند بررسی',
    },
    withHoushran: {
      headline: 'کمک به فرایند فکر کردن و تصمیم‌سازی',
      subline: 'افزایش شفافیت، داوری نقادانه و کاهش سوگیری',
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
      subline: 'کپی‌کردن فرمول‌های عمومی که روی داده‌های واقعی شکست می‌خورند',
      tag: 'وابسته به شانس',
    },
    withHoushran: {
      headline: 'توانایی تعامل حرفه‌ای با AI',
      subline: 'مسئله + زمینه + هدف + محدودیت + ارزیابی',
      tag: 'ساختاریافته و تکرارپذیر',
    },
  },
  {
    id: 'individual-vs-org',
    number: '۰۵',
    question: 'مهارت فردی یا قابلیت سازمانی؟',
    without: {
      headline: 'چند نفر بلدند',
      subline: 'استفاده از AI وابسته به افراد و تجربه‌های پراکنده شخصی است',
      tag: 'وابسته به افراد',
    },
    withHoushran: {
      headline: 'تیم می‌داند چگونه استفاده کند',
      subline: 'تبدیل AI به یک قابلیت قابل توسعه در شیوه کار مشترک تیم',
      tag: 'قابلیت تیمی و پایدار',
    },
  },
];

export const VisualComparisonSection: React.FC<VisualComparisonSectionProps> = ({
  onNavigate,
  onStartDiagnostic,
}) => {
  const handleCtaClick = () => {
    if (onStartDiagnostic) {
      onStartDiagnostic();
    } else if (onNavigate) {
      onNavigate('diagnostic');
    }
  };

  return (
    <section 
      id="before-after-comparison-section"
      className="relative space-y-16 py-8"
      aria-label="مقایسه سازمان قبل و بعد از هوشران"
    >
      {/* =========================================================================
          1. HEADER — شفاف، کنجکاوی‌برانگیز و غیرترساننده
         ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>آینه بلوغ سازمانی</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25]">
          سازمان شما در کدام سمت قرار دارد؟
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal leading-relaxed">
          تفاوت، فقط در استفاده از AI نیست؛ در شیوه کار کردن سازمان است.
        </p>
      </div>

      {/* =========================================================================
          2. MASTER COMPARISON BOARD (Desktop & Mobile Adaptive)
         ========================================================================= */}
      <div className="space-y-6">
        
        {/* Column Headers (Desktop) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 items-center px-4">
          
          {/* Left Column Header (بدون هوشران) */}
          <div className="col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-400/90 tracking-wider uppercase block">
                وضعیت آشنا • بدون هوشران
              </span>
              <h3 className="text-base font-black text-slate-200">
                سازمان بدون آموزش ساختاریافته AI
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-medium border border-white/5">
              فرصت‌های از دست‌رفته
            </span>
          </div>

          {/* Center Indicator */}
          <div className="col-span-2 text-center">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 text-xs font-black text-slate-400 shadow-inner">
              VS
            </span>
          </div>

          {/* Right Column Header (با هوشران) */}
          <div className="col-span-5 p-5 rounded-2xl bg-blue-600/15 border border-blue-400/30 backdrop-blur-md flex items-center justify-between shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase block">
                وضعیت مطلوب • با هوشران
              </span>
              <h3 className="text-base font-black text-white">
                سازمان آموزش‌دیده با هوشران
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              قابلیت پایدار
            </span>
          </div>
        </div>

        {/* =====================================================================
            3. PAIRED COMPARISON ROWS (5 Main Pillars)
           ===================================================================== */}
        <div className="space-y-4">
          {COMPARISON_PAIRS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all p-4 sm:p-5 backdrop-blur-xl"
            >
              {/* Row Topic Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 text-[11px]">
                    {item.number}
                  </span>
                  <span className="font-bold text-slate-300 text-xs sm:text-sm">
                    {item.question}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
                  PAIRED COMPARISON {item.number}
                </div>
              </div>

              {/* Desktop & Tablet: Side by Side with VS Center */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                
                {/* 1. بدون هوشران (Left State) */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3 transition-colors group-hover:bg-white/[0.03]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-300">
                        {item.without.headline}
                      </h4>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300/90 border border-amber-500/20 shrink-0">
                        {item.without.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.without.subline}
                    </p>
                  </div>

                  {/* Flow Steps for Pill 2 */}
                  {item.without.flow && (
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 font-mono" dir="ltr">
                        {item.without.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                              {step}
                            </span>
                            {sIdx < item.without.flow!.length - 1 && (
                              <span className="text-slate-600">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. VS Center Pillar */}
                <div className="lg:col-span-2 flex items-center justify-center py-1 lg:py-0">
                  <div className="flex lg:flex-col items-center gap-1.5 text-center">
                    <div className="h-px lg:h-6 w-8 lg:w-px bg-white/10" />
                    <span className="w-8 h-8 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                      VS
                    </span>
                    <div className="h-px lg:h-6 w-8 lg:w-px bg-white/10" />
                  </div>
                </div>

                {/* 3. با هوشران (Right State — High Visual Contrast & Vibrancy) */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900/50 to-indigo-950/30 border border-blue-500/30 flex flex-col justify-between space-y-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all group-hover:border-blue-400/50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <h4 className="text-sm sm:text-base font-black text-white">
                          {item.withHoushran.headline}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
                        {item.withHoushran.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {item.withHoushran.subline}
                    </p>
                  </div>

                  {/* Flow Steps for Pill 2 */}
                  {item.withHoushran.flow && (
                    <div className="pt-2 border-t border-blue-500/20">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-blue-200 font-mono" dir="ltr">
                        {item.withHoushran.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2 py-0.5 rounded bg-blue-600/25 border border-blue-400/30 text-white font-medium shadow-xs">
                              {step}
                            </span>
                            {sIdx < item.withHoushran.flow!.length - 1 && (
                              <span className="text-blue-400 font-bold">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note for Pill 3 */}
                  {item.withHoushran.note && (
                    <div className="pt-2 border-t border-blue-500/20 flex items-start gap-2 text-xs text-emerald-300/90 font-medium">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
          4. STATEMENT نهایی — قدرتمند، کوتاه و معمارانه
         ========================================================================= */}
      <div className="pt-4 max-w-4xl mx-auto text-center space-y-6">
        
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-300 leading-tight">
            مسئله فقط این نیست که AI را بلد باشید.
          </h3>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            مسئله این است که آیا سازمان شما می‌داند{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-400 via-indigo-300 to-white">
              چطور با AI بهتر کار کند؟
            </span>
          </h3>
        </div>

        {/* Brand Statement Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl max-w-3xl mx-auto shadow-xl">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            هدف هوشران این نیست که افراد بیشتری با AI کار کنند؛ <br className="hidden sm:block" />
            <span className="text-white font-bold">
              هدف این است که افراد سازمان شما به شیوه بهتری کار کنند، فکر کنند و تصمیم بگیرند.
            </span>
          </p>
        </div>

      </div>

      {/* =========================================================================
          5. جمله کلیدی هوشران (PULL QUOTE / BRAND STATEMENT المان متمایز)
         ========================================================================= */}
      <div className="max-w-3xl mx-auto">
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-indigo-950/40 border border-blue-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-right relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center shrink-0 shadow-inner">
              <Quote className="w-7 h-7 text-blue-300" />
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-blue-400 tracking-wider uppercase font-mono">
                HOOSHRAN CRITICAL QUESTION
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-snug">
                «وقتی همه‌چیز طبق برنامه پیش نرفت، چطور فکر کنم و تصمیم بگیرم؟»
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. CALL TO ACTION — ارزیابی آمادگی سازمان برای AI
         ========================================================================= */}
      <div className="text-center space-y-5 pt-2 pb-4">
        <h4 className="text-base sm:text-lg font-bold text-slate-300">
          ببینید سازمان شما امروز در کدام نقطه قرار دارد.
        </h4>

        <div>
          <button
            onClick={handleCtaClick}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-[0_12px_36px_rgba(37,99,235,0.4)] hover:shadow-[0_16px_44px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-blue-200" />
            <span>ارزیابی آمادگی سازمان برای AI</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </section>
  );
};
