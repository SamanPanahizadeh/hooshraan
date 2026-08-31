import React, { useState } from 'react';
import { VerificationChecklistState } from '../types';
import { FileCheck, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, HelpCircle, CheckSquare, Square, RefreshCw, BookmarkCheck } from 'lucide-react';

export const PocketCardChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<VerificationChecklistState>({
    accuracy: false,
    context: false,
    assumption: false,
    fact: false,
    relevance: false,
    actionability: false,
    humanJudgment: false,
  });

  const toggleCheck = (key: keyof VerificationChecklistState) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const resetChecklist = () => {
    setChecklist({
      accuracy: false,
      context: false,
      assumption: false,
      fact: false,
      relevance: false,
      actionability: false,
      humanJudgment: false,
    });
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecked = checkedCount === 7;

  const checklistItems = [
    {
      key: 'accuracy' as keyof VerificationChecklistState,
      title: 'درباره Accuracy (صحت داده)',
      question: 'آیا اطلاعات، نام‌ها، ارقام و ادعاهای به کار رفته کاملاً درست و معتبر است؟',
    },
    {
      key: 'context' as keyof VerificationChecklistState,
      title: 'درباره Context (شرایط واقعی)',
      question: 'آیا هوش مصنوعی شرایط، صنعت و نیاز واقعی این مشتری بخصوص را در نظر گرفته است؟',
    },
    {
      key: 'assumption' as keyof VerificationChecklistState,
      title: 'درباره Assumption (فرض بدون سند)',
      question: 'آیا هوش مصنوعی چیزی را بر اساس حدس یا فرض بدون مدرک به عنوان واقعیت ارائه نداده است؟',
    },
    {
      key: 'fact' as keyof VerificationChecklistState,
      title: 'درباره Fact (تفکیک حقایق)',
      question: 'آیا ادعاهای قطعی از فرضیه‌ها (Hypotheses) کاملاً تفکیک شده‌اند؟',
    },
    {
      key: 'relevance' as keyof VerificationChecklistState,
      title: 'درباره Relevance (ارتباط با هدف)',
      question: 'آیا این خروجی مستقیماً به هدف فعلی ما در پایپ‌لاین فروش خدمت می‌کند؟',
    },
    {
      key: 'actionability' as keyof VerificationChecklistState,
      title: 'درباره Actionability (قابلیت اجرا)',
      question: 'آیا پیشنهاد یا سوال مطرح‌شده در عمل برای فروشنده قابل اجرا و شفاف است؟',
    },
    {
      key: 'humanJudgment' as keyof VerificationChecklistState,
      title: 'درباره Human Judgment (قضاوت انسانی)',
      question: 'آیا لحن پیام مناسب است و قضاوت نهایی فروشنده روی خروجی اعمال شده است؟',
    },
  ];

  const goldenRules = [
    { rule: 'قانون ۵ ثانیه‌ای:', desc: 'هرگز خروجی هوش مصنوعی را نخوانده کپی یا ارسال نکنید. ۵ ثانیه بازبینی انسانی از اشتباهات سنگین جلوگیری می‌کند.' },
    { rule: 'قانون عدم توهم:', desc: 'اگر هوش مصنوعی نام یک محصول یا چالش مشتری را حدس زد، فوراً آن را در دسته فرضیه (Hypothesis) قرار دهید تا در جلسه تست شود.' },
    { rule: 'قانون استقلال تصمیم:', desc: 'هوش مصنوعی مشاور شماست نه تصمیم‌گیرنده شما؛ کنترل نهایی تعامل همیشه با فروشنده است.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 text-emerald-400 rounded-2xl border border-slate-700 shadow-sm shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md border text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                  ابزار تضمین کیفیت خروجی
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                کارت جیبی، چک‌لیست اعتبارسنجی و قوانین Co-Pilot
              </h1>
            </div>
          </div>

          <button
            onClick={resetChecklist}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>بازنشانی چک‌لیست</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed max-w-3xl">
          قبل از ارسال هر ایمیل، ورود به جلسه یا ثبت گزارش در CRM، خروجی‌های هوش مصنوعی را با این ۷ سوال اعتبارسنجی کنید تا از دقت و حرفه‌ای بودن کار مطمئن شوید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive 7-Step Quality Gate (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm sm:text-base text-white">چک‌لیست ۷ سوالی راستی‌آزمایی (Human Verification)</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              {checkedCount} از ۷ بررسی شد
            </span>
          </div>

          <div className="space-y-2.5">
            {checklistItems.map((item) => {
              const isChecked = checklist[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-slate-950 border-emerald-500/50 shadow-inner'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-emerald-400">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-bold ${isChecked ? 'text-emerald-300' : 'text-slate-200'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed text-justify">
                      {item.question}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Status Card */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isAllChecked
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <BookmarkCheck className={`w-4 h-4 ${isAllChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>
                {isAllChecked
                  ? 'خروجی کاملاً اعتبارسنجی شد! اکنون با اطمینان کامل می‌توانید از آن استفاده کنید.'
                  : 'لطفاً تمامی موارد ۷ گانه را قبل از اقدام نهایی مرور و تایید فرمایید.'}
              </span>
            </div>
          </div>

        </div>

        {/* Golden Rules & Pocket Guide (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>قوانین طلایی فروشنده Co-Pilot</span>
            </div>

            <div className="space-y-3">
              {goldenRules.map((gr, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-amber-300 block">{gr.rule}</span>
                  <p className="text-xs text-slate-400 leading-relaxed text-justify">{gr.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Danger / Common Pitfalls Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-rose-300 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>اشتباهات رایج در استفاده از AI</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>فرستادن متن خام هوش مصنوعی بدون شخصی‌سازی لحن شخصی فروشنده</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>اتکا به حدس‌های مدل درباره بودجه یا رقبای مشتری به عنوان حقیقت اثبات‌شده</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span>استفاده از پرامپت‌های تک‌خطی و مبهم بدون ارائه Context و هدف مشخص</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
