import React, { useState } from 'react';
import {
  PROMPT_PACK_ITEMS,
  PROMPT_PACK_CATEGORIES,
  PROMPT_PACK_WORKFLOW_STEPS,
  PROMPT_PACK_GOLDEN_RULES,
  PromptPackItem,
} from '../data/promptPackData';
import {
  BookOpen,
  Copy,
  Check,
  Search as SearchIcon,
  Filter,
  Sparkles,
  Layers,
  ArrowLeft,
  ShieldAlert,
  Terminal,
  ChevronDown,
  ChevronUp,
  Workflow,
  Clock,
  Award,
  Zap,
  Tag,
} from 'lucide-react';

interface PromptPackViewerProps {
  onOpenSimulator: (type: 'brief' | 'outreach' | 'roleplay' | 'crm' | 'scoov') => void;
}

export const PromptPackViewer: React.FC<PromptPackViewerProps> = ({ onOpenSimulator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(1); // Expand Prompt 01 by default
  const [showWorkflowModal, setShowWorkflowModal] = useState<boolean>(false);

  const filteredPrompts = PROMPT_PACK_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.titleFa.includes(searchQuery) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.objective.includes(searchQuery) ||
      item.promptText.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  const handleCopyPrompt = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSimulatorType = (category: string): 'brief' | 'outreach' | 'roleplay' | 'crm' | 'scoov' | null => {
    switch (category) {
      case 'research':
        return 'brief';
      case 'discovery':
        return 'scoov';
      case 'communication':
        return 'outreach';
      case 'meeting':
        return 'roleplay';
      case 'followup':
      case 'crm':
        return 'crm';
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 text-amber-400 rounded-2xl border border-slate-700 shadow-sm shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/30">
                  ۲۴ پرامپت آماده مهندسی‌شده
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                کتابخانه پرامپت‌های فروش (Prompt Library)
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowWorkflowModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition"
          >
            <Workflow className="w-4 h-4 text-amber-400" />
            <span>مشاهده زنجیره گردش‌کار (Workflow)</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed max-w-3xl">
          الگوهای پرامپت استاندارد برای تمام ۸ مرحله پایپ‌لاین فروش B2B. این الگوها بر اساس اصول Co-Pilot، راستی‌آزمایی داده‌ها و بدون توهم (Zero-Fabrication) طراحی شده‌اند.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو در عنوان، کد یا متن پرامپت..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition text-right"
            />
            <SearchIcon className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              همه ({PROMPT_PACK_ITEMS.length})
            </button>
            {PROMPT_PACK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.titleEn}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Prompts Cards Grid / List */}
      <div className="space-y-3">
        {filteredPrompts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 space-y-2">
            <SearchIcon className="w-8 h-8 mx-auto text-slate-600" />
            <h4 className="text-sm font-bold text-slate-300">پرامپتی با این مشخصات یافت نشد</h4>
            <p className="text-xs">لطفاً عبارت جستجو یا فیلتر دسته‌بندی را تغییر دهید.</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => {
            const isExpanded = expandedId === prompt.id;
            const simType = getSimulatorType(prompt.category);

            return (
              <div
                key={prompt.id}
                className={`bg-slate-900 border rounded-2xl transition-all duration-200 shadow-md overflow-hidden ${
                  isExpanded ? 'border-amber-500/50 bg-slate-900' : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Prompt Row Header / Compact Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start md:items-center gap-3">
                    <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400 border border-slate-800 shrink-0">
                      {prompt.code}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition">
                        {prompt.titleFa}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 flex-wrap">
                        <span className="text-slate-400">کاربرد: {prompt.categoryFa}</span>
                        <span>•</span>
                        <span className="text-slate-500">زمان تخمینی: ۵ دقیقه</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPrompt(prompt.id, prompt.promptText);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
                    >
                      {copiedId === prompt.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">کپی شد</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      title={isExpanded ? 'بستن جزییات' : 'مشاهده متن کامل'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800 space-y-4 animate-in fade-in duration-150">
                    
                    {/* Objective explanation */}
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed text-justify">
                      <span className="font-bold text-amber-400 ml-1">هدف پرامپت:</span>
                      {prompt.objective}
                    </div>

                    {/* Prompt Box */}
                    <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2.5" dir="ltr">
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                        <span>PROMPT TEXT ({prompt.code})</span>
                        <span className="text-slate-500 font-sans text-[11px]">مستقیماً در هوش مصنوعی کپی کنید</span>
                      </div>
                      <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed text-right bg-slate-900/80 p-4 rounded-xl border border-slate-800" dir="rtl">
                        {prompt.promptText}
                      </pre>
                    </div>

                    {/* Output Structure & Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {prompt.outputStructure && prompt.outputStructure.length > 0 && (
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                          <span className="font-bold text-emerald-400 block mb-1">ساختار خروجی مورد انتظار:</span>
                          {prompt.outputStructure.map((st, i) => (
                            <div key={i} className="text-slate-400">• {st}</div>
                          ))}
                        </div>
                      )}

                      {prompt.tips && prompt.tips.length > 0 && (
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                          <span className="font-bold text-amber-300 block mb-1">نکات کلیدی اجرا:</span>
                          {prompt.tips.map((tip, i) => (
                            <div key={i} className="text-slate-400">• {tip}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Link to Simulator if available */}
                    {simType && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">می‌توانید این پرامپت را در شبیه‌ساز اختصاصی تمرین کنید:</span>
                        <button
                          onClick={() => onOpenSimulator(simType)}
                          className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                        >
                          <span>ورود به شبیه‌ساز مرتبط</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Workflow Modal */}
      {showWorkflowModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">زنجیره گردش‌کار پرامپت‌ها (Sales AI Workflow)</h3>
                  <p className="text-xs text-slate-400">نحوه اتصال خروجی هر پرامپت به عنوان ورودی مرحله بعدی</p>
                </div>
              </div>
              <button
                onClick={() => setShowWorkflowModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs"
              >
                بستن
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROMPT_PACK_WORKFLOW_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-300">
                      گام {step.step}: {step.title}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {step.promptCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Golden Rules Summary in Modal */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>۵ اصل طلایی پرامپت‌نویسی در فروش:</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed">
                {PROMPT_PACK_GOLDEN_RULES.map((gr) => (
                  <div key={gr.num} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">{gr.num}.</span>
                    <span><strong className="text-slate-200">{gr.title}:</strong> {gr.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowWorkflowModal(false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
            >
              متوجه شدم و بازگشت به کتابخانه
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
