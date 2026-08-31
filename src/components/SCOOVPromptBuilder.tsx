import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { SimulatorShell } from './SimulatorShell';

export const SCOOVPromptBuilder: React.FC = () => {
  const [situation, setSituation] = useState<string>('فردا با مدیر خرید یک شرکت صنایع غذایی جلسه حضوری دارم.');
  const [context, setContext] = useState<string>('شرکت در صنعت تولید لبنیات است، محصول ما نرم‌افزار مدیریت هوشمند زنجیره سرد است.');
  const [objective, setObjective] = useState<string>('می‌خواهم نیازهای احتمالی و دغدغه‌های خریدار را بهتر بفهمم و برای جلسه آماده شوم.');
  const [output, setOutput] = useState<string>('لیست ۵ موضوع اصلی، ۱۰ سوال Discovery عمیق و ۵ Objection احتمالی.');
  const [verification, setVerification] = useState<string>('Factها و Hypothesisها حتماً جدا باشند و ادعای بدون منبع ساخته نشود.');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleBuildPrompt = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-scoov-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation, context, objective, output, verification }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در تولید Prompt S.C.O.O.V');
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
    setSituation('');
    setContext('');
    setObjective('');
    setOutput('');
    setVerification('');
    setResultText(null);
    setErrorMessage(null);
  };

  return (
    <SimulatorShell
      icon={Layers}
      badgeText="چارچوب مهندسی پرامپت"
      badgeColor="text-amber-400 bg-amber-500/10 border-amber-500/30"
      title="سازنده پرامپت با چارچوب ۵ مرحله‌ای S.C.O.O.V"
      description="با پاسخ به ۵ مؤلفه کلیدی چارچوب S.C.O.O.V، یک پرامپت آماده، بدون توهم و فوق‌العاده استاندارد برای استفاده در مدل‌های Gemini یا ابزارهای Co-Pilot بسازید."
      goldenRule="حرف V (Verification) مهم‌ترین بخش فرمول است؛ همیشه به مدل بگویید بین حقایق و فرضیه‌ها تفکیک قائل شود."
      isLoading={isLoading}
      onGenerate={handleBuildPrompt}
      generateButtonText="ترکیب و تولید پرامپت نهایی S.C.O.O.V"
      resultText={resultText}
      errorMessage={errorMessage}
      copied={copied}
      onCopy={handleCopy}
      onReset={handleReset}
      emptyStateTitle="پرامپت مهندسی‌شده هنوز تولید نشده است"
      emptyStateDesc="بخش‌های ۵‌گانه S.C.O.O.V را تکمیل کرده و دکمه تولید را فشار دهید."
      inputChildren={
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              <span className="font-mono text-amber-400 font-bold ml-1">S</span> - Situation (نقش و موقعیت شما):
            </label>
            <input
              type="text"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: کارشناس ارشد فروش راهکارهای ابری سازمانی"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              <span className="font-mono text-amber-400 font-bold ml-1">C</span> - Context (شواهد، صنعت و زمینه مشتری):
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: شرکت صنایع دارویی با ۲۰۰ کارمند در حال راه‌اندازی خط تولید جدید"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              <span className="font-mono text-amber-400 font-bold ml-1">O</span> - Objective (هدف دقیق شما از این خروجی):
            </label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: تدوین ۵ سناریوی مذاکره برای مواجهه با ابهام در بودجه"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              <span className="font-mono text-amber-400 font-bold ml-1">O</span> - Output Format (ساختار و فرمت خروجی دلخواه):
            </label>
            <input
              type="text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: جدول تفکیک‌شده شامل موضوع، سوال دیسکاوری و دلیل اهمیت"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              <span className="font-mono text-amber-400 font-bold ml-1">V</span> - Verification / Constraint (محدودیت‌ها و راستی‌آزمایی):
            </label>
            <input
              type="text"
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              placeholder="مثال: بدون توهم داده، تفکیک Fact از Hypothesis، حداکثر ۱۵۰ کلمه"
            />
          </div>
        </div>
      }
    />
  );
};
