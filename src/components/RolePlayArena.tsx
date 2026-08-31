import React, { useState, useRef, useEffect } from 'react';
import { RolePlayMessage, RolePlayEvaluation } from '../types';
import { MessageSquare, Send, RefreshCw, Award, AlertCircle, User, Bot, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const RolePlayArena: React.FC = () => {
  const [customerProfile, setCustomerProfile] = useState<string>(
    'مدیر ارشد خرید یک شرکت داروسازی صنعتی B2B (نام شرکت: فارما البرز). او به دنبال کاهش هزینه‌های بسته‌بندی و افزایش سرعت تحویل است، اما نسبت به تامین‌کنندگان جدید بسیار محتاط است.'
  );
  const [offering, setOffering] = useState<string>(
    'راهکار اتوماسیون و بسته‌بندی هوشمند دارویی با لایسنس تضمین استاندارد سازمان غذا و دارو'
  );
  const [scenario, setScenario] = useState<string>(
    'نخستین تماس تلفنی Discovery جهت کشف نیازهای واقعی خریدار و ارزیابی تمایل او برای برگزاری جلسه حضوری'
  );

  const [conversation, setConversation] = useState<RolePlayMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<RolePlayEvaluation | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isLoading]);

  const handleStartRolePlay = async () => {
    setIsStarted(true);
    setConversation([]);
    setEvaluation(null);
    setIsLoading(true);

    const initialGreeting = 'سلام، وقت بخیر. بفرمایید، من مدیر خرید شرکت فارما البرز هستم. در خدمت شما هستم.';
    setConversation([{
      sender: 'prospect',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const updatedConv: RolePlayMessage[] = [
      ...conversation,
      {
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setConversation(updatedConv);
    setIsLoading(true);

    try {
      const response = await fetch('/api/roleplay-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerProfile,
          offering,
          scenario,
          conversationHistory: updatedConv,
          userMessage: userText
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در گفتگو با هوش مصنوعی');
      }

      setConversation([
        ...updatedConv,
        {
          sender: 'prospect',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error('Roleplay error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndAndEvaluate = async () => {
    if (conversation.length < 2) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/roleplay-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationHistory: conversation }),
      });

      const evalData = await response.json();
      if (!response.ok || evalData.error) {
        throw new Error(evalData.error || 'خطا در ارزیابی عملکرد');
      }

      setEvaluation(evalData);
    } catch (err: any) {
      console.error('Evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 text-amber-400 rounded-2xl border border-slate-700 shadow-sm shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/30">
                  مرحله ۳: شبیه‌ساز مذاکره
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                میدان نقش‌آفرینی زنده فروش (Role-Play Arena)
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed max-w-3xl">
          در نقش فروشنده با یک خریدار یا تصمیم‌گیرنده سخت‌گیر اما واقع‌بین B2B به صورت زنده مکالمه کنید. در پایان دکمه «ارزیابی عملکرد» را کلیک کنید تا کارنامه ۶ بعدی تسلط فروش را دریافت نمایید.
        </p>
      </div>

      {!isStarted ? (
        /* Setup Form */
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>تنظیمات سناریوی شبیه‌سازی فروش</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">پروفایل مشتری فرضی:</label>
              <textarea
                value={customerProfile}
                onChange={(e) => setCustomerProfile(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">محصول یا خدمت شما:</label>
              <input
                type="text"
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">سناریوی فروش:</label>
              <input
                type="text"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <button
            onClick={handleStartRolePlay}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>شروع جلسه تمرینی با خریدار فرضی</span>
          </button>
        </div>
      ) : (
        /* Chat & Evaluation Screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chat Window */}
          <div className="lg:col-span-7 flex flex-col h-[600px] bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Chat Header */}
            <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">خریدار B2B (مدیر خرید)</h4>
                  <p className="text-[10px] text-slate-400">سناریو: Discovery & Meeting Setup</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleEndAndEvaluate}
                  disabled={conversation.length < 2 || isEvaluating}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
                >
                  {isEvaluating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Award className="w-3.5 h-3.5 text-slate-950" />
                  )}
                  <span>ارزیابی عملکرد جلسه</span>
                </button>
                <button
                  onClick={() => setIsStarted(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition flex items-center gap-1"
                  title="تنظیم مجدد سناریو"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>سناریوی جدید</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/40">
              {conversation.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-300 border border-slate-700'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div
                      className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-100 rounded-tr-none shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="text-justify">{msg.text}</p>
                      <span className="text-[10px] opacity-50 block mt-1 text-left font-mono" dir="ltr">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>خریدار در حال پاسخ دادن است...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="سوال یا صحبت خود را به عنوان فروشنده بنویسید..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition text-right"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>

          </div>

          {/* Evaluation Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-[600px] overflow-y-auto flex flex-col justify-between">
              
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base border-b border-slate-800 pb-3 flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>کارنامه ارزیابی ۶‌گانه مهارت‌های فروش</span>
                </h3>

                {isEvaluating && (
                  <div className="py-20 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs sm:text-sm text-slate-300">در حال تحلیل ۶ معیار کیفیت Discovery، گوش دادن، شناسایی نیاز و...</p>
                  </div>
                )}

                {!isEvaluating && evaluation && (
                  <div className="space-y-4">
                    {/* Scores Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">کیفیت سوالات Discovery</span>
                        <span className="text-base font-extrabold text-amber-400 font-mono">{evaluation.discoveryQualityScore}/10</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">گوش دادن مؤثر</span>
                        <span className="text-base font-extrabold text-indigo-400 font-mono">{evaluation.listeningScore}/10</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">کنترل فرضیه‌سازی</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">{evaluation.assumptionMakingScore}/10</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">کشف نیازهای اصلی</span>
                        <span className="text-base font-extrabold text-amber-300 font-mono">{evaluation.needIdentificationScore}/10</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">مدیریت Objection</span>
                        <span className="text-base font-extrabold text-purple-400 font-mono">{evaluation.objectionHandlingScore}/10</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">تعیین Next Step</span>
                        <span className="text-base font-extrabold text-rose-400 font-mono">{evaluation.nextStepDefinitionScore}/10</span>
                      </div>
                    </div>

                    {/* Overall Feedback */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 mb-1">جمع‌بندی مربی:</h5>
                      <p className="text-xs text-slate-300 leading-relaxed text-justify">{evaluation.overallFeedback}</p>
                    </div>

                    {/* Strengths & Improvements */}
                    <div className="space-y-2">
                      <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                        <span className="font-bold text-emerald-400 block">نقاط قوت:</span>
                        {evaluation.strengths.map((s, i) => (
                          <div key={i} className="text-emerald-200 text-[11px]">• {s}</div>
                        ))}
                      </div>

                      <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/30 text-xs space-y-1">
                        <span className="font-bold text-amber-400 block">پیشنهادات برای جلسه بعدی:</span>
                        {evaluation.areasForImprovement.map((a, i) => (
                          <div key={i} className="text-amber-200 text-[11px]">• {a}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!isEvaluating && !evaluation && (
                  <div className="py-20 text-center text-slate-500 space-y-3">
                    <Award className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-xs sm:text-sm font-medium text-slate-400">هنوز ارزیابی صورت نگرفته است.</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      حداقل دو پیام با خریدار فرضی تبادل کنید و سپس دکمه «ارزیابی عملکرد جلسه» در بالای کادر چت را کلیک کنید.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
