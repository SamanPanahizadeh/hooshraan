import React, { useState } from 'react';
import { Search, Sparkles, RefreshCw, AlertCircle, Copy, Check, FileText, CheckCircle2 } from 'lucide-react';
import { SimulatorShell } from './SimulatorShell';

export const ResearchBriefSimulator: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('شرکت فولاد تکنولوژی (نمونه)');
  const [industry, setIndustry] = useState<string>('تولید و اتوماسیون صنعتی B2B');
  const [rawInfo, setRawInfo] = useState<string>(
    'شرکت در ۲ سال اخیر ظرفیت خط تولید خود را ۳۰٪ افزایش داده است. در اخبار آمده که قصد صادرات به کشورهای همسایه را دارد. مدیر خرید شرکت اخیراً تغییر کرده و در شبکه اجتماعی خود درباره لزوم دیجیتالی‌سازی فرآیندهای لجستیک پست گذاشته است.'
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateBrief = async () => {
    if (!rawInfo.trim()) {
      setErrorMessage('لطفاً اطلاعات ورودی درباره مشتری را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, industry, rawInfo }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در تولید Brief');
      }

      setResultText(data.result);
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در ارتباط با هوش مصنوعی');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setCompanyName('');
    setIndustry('');
    setRawInfo('');
    setResultText(null);
    setErrorMessage(null);
  };

  return (
    <SimulatorShell
      icon={Search}
      badgeText="مرحله ۱: تحقیق مشتری"
      title="شبیه‌ساز تحقیق عمیق مشتری و تفکیک Fact / Hypothesis"
      description="اطلاعات پراکنده مشتری را وارد کنید تا هوش مصنوعی آن را به ۸ بخش استاندارد طبق متدولوژی کارگاه تبدیل کرده و بین حقایق قطعی (Fact) و فرضیه‌های نیازمند راستی‌آزمایی (Hypothesis) تفکیک قائل شود."
      goldenRule="هیچ فرضیه‌ای را به عنوان حقیقت در جلسه فروش مطرح نکنید؛ فرضیه‌ها را با سوالات Discovery راستی‌آزمایی کنید."
      isLoading={isLoading}
      onGenerate={handleGenerateBrief}
      generateButtonText="تولید Research Brief استاندارد"
      resultText={resultText}
      errorMessage={errorMessage}
      copied={copied}
      onCopy={handleCopy}
      onReset={handleReset}
      emptyStateTitle="هنوز خروجی تولید نشده است"
      emptyStateDesc="اطلاعات مشتری را در فرم سمت راست وارد کنید و دکمه «تولید Research Brief» را فشار دهید."
      inputChildren={
        <>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نام شرکت / مشتری:
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: شرکت پتروشیمی پارس"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              صنعت / حوزه فعالیت:
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: اتوماسیون صنعتی B2B"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              اطلاعات خام موجود درباره مشتری (یادداشت‌ها، اخبار، رزومه، شبکه‌های اجتماعی):
            </label>
            <textarea
              value={rawInfo}
              onChange={(e) => setRawInfo(e.target.value)}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition leading-relaxed"
              placeholder="اطلاعات و سیگنال‌های خام مشتری را در اینجا درج کنید..."
            />
          </div>
        </>
      }
    />
  );
};
