import React from 'react';
import { Sparkles, Copy, Check, RefreshCw, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface SimulatorShellProps {
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  badgeColor?: string;
  title: string;
  description: string;
  goldenRule?: string;
  isLoading: boolean;
  onGenerate: () => void;
  generateButtonText?: string;
  resultText: string | null;
  errorMessage: string | null;
  copied: boolean;
  onCopy: () => void;
  onReset?: () => void;
  inputChildren: React.ReactNode;
  outputExtraActions?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDesc?: string;
}

export const SimulatorShell: React.FC<SimulatorShellProps> = ({
  icon: Icon,
  badgeText,
  badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  title,
  description,
  goldenRule,
  isLoading,
  onGenerate,
  generateButtonText = 'تولید با هوش مصنوعی (Gemini)',
  resultText,
  errorMessage,
  copied,
  onCopy,
  onReset,
  inputChildren,
  outputExtraActions,
  emptyStateTitle = 'خروجی شبیه‌ساز پس از پردازش در این بخش نمایش داده می‌شود',
  emptyStateDesc = 'اطلاعات ورودی را در پنل روبرو تکمیل کنید و دکمه تولید را فشار دهید.',
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" dir="rtl">
      
      {/* Header Banner - Minimalist Editorial Aesthetic */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-3 bg-slate-800 text-amber-400 rounded-xl border border-slate-700 shadow-sm shrink-0 mt-1 sm:mt-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${badgeColor}`}>
                  {badgeText}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                {title}
              </h1>
            </div>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center gap-1.5 shrink-0"
              title="پاک‌کردن فرم و شروع مجدد"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>بازنشانی</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed max-w-4xl">
          {description}
        </p>

        {goldenRule && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-400">قانون کلیدی:</span>
            <span className="font-medium">{goldenRule}</span>
          </div>
        )}
      </div>

      {/* Two-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Right / Input Column (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>ورودی‌ها و متغیرهای سناریو</span>
              </span>
              <span className="text-slate-500 font-normal">Human Input</span>
            </div>

            {/* Custom Input Fields */}
            <div className="space-y-4">
              {inputChildren}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 font-sans"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
                  <span>در حال پردازش هوشمند...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-900" />
                  <span>{generateButtonText}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Left / Output Column (7 cols on lg) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg min-h-[480px] flex flex-col justify-between">
            <div>
              {/* Output Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>خروجی استاندارد تولیدشده (AI Output)</span>
                </div>

                <div className="flex items-center gap-2">
                  {outputExtraActions}

                  {resultText && (
                    <button
                      onClick={onCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                      title="کپی متن خروجی"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">کپی شد</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>کپی خروجی</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Output Content Display */}
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">در حال استخراج و تحلیل ساختاریافته...</h4>
                    <p className="text-xs text-slate-400">هوش مصنوعی در حال اعمال متدولوژی و بررسی Factها است</p>
                  </div>
                </div>
              ) : resultText ? (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans select-text overflow-y-auto max-h-[600px] text-justify">
                  {resultText}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-3 text-slate-500">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-300">{emptyStateTitle}</h4>
                  <p className="text-xs text-slate-500 max-w-sm">{emptyStateDesc}</p>
                </div>
              )}
            </div>

            {/* Bottom Guidance Footer */}
            {resultText && !isLoading && (
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>بررسی انسانی (Human Verification) را فراموش نکنید.</span>
                </span>
                <span className="text-slate-500 font-mono">Co-Pilot Mode</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
