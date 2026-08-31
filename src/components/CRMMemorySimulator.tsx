import React, { useState } from 'react';
import { Database, FileCheck2 } from 'lucide-react';
import { SimulatorShell } from './SimulatorShell';

export const CRMMemorySimulator: React.FC = () => {
  const [rawNotes, setRawNotes] = useState<string>(
    'جلسه با آقای حسینی مدیر فناوری شرکت آریا. از سرعت سیستم فعلی راضی نیستند و موقع پیک کاری سفارشات عقب می‌افتد. بودجه حدود ۵۰۰ میلیون دارند. تصمیم‌گیر نهایی مدیرعامل است که در جلسه نبود. نگران امنیت اطلاعات ابری هستند. قرار شد هفته آینده یک دمو حضوری بدهیم و پروپوزال فنی بفرستیم.'
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFormatCRM = async () => {
    if (!rawNotes.trim()) {
      setErrorMessage('لطفاً یادداشت‌های اولیه جلسه را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/format-crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawNotes }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در ساختارهای CRM');
      }

      setResultText(data.result);
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در برقراری ارتباط');
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
    setRawNotes('');
    setResultText(null);
    setErrorMessage(null);
  };

  return (
    <SimulatorShell
      icon={Database}
      badgeText="مرحله ۴: ثبت حافظه CRM"
      badgeColor="text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
      title="حافظه مستمر مشتری در CRM (Customer Memory Builder)"
      description="تبدیل یادداشت‌های خام، سریع یا صوتی جلسه به رکورد ساختاریافته ۱۰‌بخشی آماده برای CRM به همراه خلاصه مدیریتی (Executive Summary) و تعیین گام بعدی (Next Action)."
      goldenRule="یک یادداشت خوب در CRM باید ۳ ماه بعد به هر فروشنده‌ای در تیم بگوید دقیقاً مشتری چه دغدغه‌ای داشت و حرکت بعدی چیست."
      isLoading={isLoading}
      onGenerate={handleFormatCRM}
      generateButtonText="ساختاردهی و تولید رکورد CRM"
      resultText={resultText}
      errorMessage={errorMessage}
      copied={copied}
      onCopy={handleCopy}
      onReset={handleReset}
      emptyStateTitle="رکورد CRM هنوز تولید نشده است"
      emptyStateDesc="یادداشت‌های جلسه را در باکس ورودی قرار داده و دکمه ساختاردهی را بزنید."
      inputChildren={
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            یادداشت‌های خام و سریع جلسه فروش:
          </label>
          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            rows={8}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition leading-relaxed"
            placeholder="یادداشت‌ها، موارد مطرح شده، اسامی، بودجه و تعهدات جلسه را وارد کنید..."
          />
          <p className="text-[11px] text-slate-400 mt-2">
            هوش مصنوعی به صورت خودکار اطلاعات مربوط به Stakeholders، Objections، بودجه و Next Steps را استخراج و منظم می‌کند.
          </p>
        </div>
      }
    />
  );
};
