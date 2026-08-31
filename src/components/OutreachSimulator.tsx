import React, { useState } from 'react';
import { Send, ShieldAlert } from 'lucide-react';
import { SimulatorShell } from './SimulatorShell';

export const OutreachSimulator: React.FC = () => {
  const [customerContext, setCustomerContext] = useState<string>(
    'شرکت پارس تکنولوژی در حال توسعه واحد جدید اتوماسیون انبار است و ۳ آگهی استخدام مهندس انبارداری دیجیتال منتشر کرده است.'
  );
  const [offering, setOffering] = useState<string>(
    'نرم‌افزار مدیریت هوشمند انبار و اسکن بارکد RFID مجهز به گزارش‌گیری زنده'
  );
  const [targetRole, setTargetRole] = useState<string>('مدیر زنجیره تامین / مدیر لجستیک');
  const [objective, setObjective] = useState<string>('دریافت یک جلسه آنلاین ۱۵ دقیقه‌ای جهت بررسی نیازها');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateOutreach = async () => {
    if (!customerContext.trim() || !offering.trim()) {
      setErrorMessage('لطفاً اطلاعات زمینه مشتری و محصول را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerContext, offering, targetRole, objective }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در تولید پیام');
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
    setCustomerContext('');
    setOffering('');
    setTargetRole('');
    setObjective('');
    setResultText(null);
    setErrorMessage(null);
  };

  return (
    <SimulatorShell
      icon={Send}
      badgeText="مرحله ۲: پیام‌نویسی و ارتباط اولیه"
      badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      title="مولد پیام‌های فروش اختصاصی (Personalized Outreach) بدون Fabrication"
      description="نوشتن ایمیل‌ها و پیام‌های ارتباطی B2B کاملاً متناسب با Context واقعی مشتری، همراه با جلوگیری خودکار از ادعاهای اثبات‌نشده (Fabrication) و پایبندی به لحن مشاوره‌ای."
      goldenRule="اصل ضد-Fabrication: مدل هیچ ادعای اثبات‌نشده‌ای (مانند حدس زدن مشکلات پنهان مشتری) را به عنوان فکت اضافه نخواهد کرد."
      isLoading={isLoading}
      onGenerate={handleGenerateOutreach}
      generateButtonText="ایجاد پیام اختصاصی فروش B2B"
      resultText={resultText}
      errorMessage={errorMessage}
      copied={copied}
      onCopy={handleCopy}
      onReset={handleReset}
      emptyStateTitle="هنوز پیامی تولید نشده است"
      emptyStateDesc="اطلاعات Context مشتری و محصول را وارد کرده و دکمه «ایجاد پیام اختصاصی فروش» را فشار دهید."
      inputChildren={
        <>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Context واقعی مشتری (اتفاقات اخیر، اخبار، تغییرات، آگهی استخدام):
            </label>
            <textarea
              value={customerContext}
              onChange={(e) => setCustomerContext(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition leading-relaxed"
              placeholder="شواهد و اطلاعات زمینه مشتری را وارد کنید..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              محصول یا خدمت ما:
            </label>
            <input
              type="text"
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="معرفی مختصر ارزش و محصول"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نقش مخاطب (Role):
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: مدیر زنجیره تامین / مدیر ارشد عملیات"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              هدف ارتباط و دعوت به اقدام (Call To Action):
            </label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: جلسه آنلاین ۱۵ دقیقه‌ای جهت بررسی نیازها"
            />
          </div>

          <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-xl text-xs text-amber-300/90 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>پیام خروجی فاقد گزافه‌گویی تبلیغاتی بوده و دعوت به گفتگوی مشاوره‌ای را پیشنهاد می‌کند.</span>
          </div>
        </>
      }
    />
  );
};
