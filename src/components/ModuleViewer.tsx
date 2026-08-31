import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { Slide } from '../types';
import { 
  ChevronRight, ChevronLeft, Copy, Check, Sparkles, BookOpen, 
  ArrowRightLeft, ArrowRight, Lightbulb, PlayCircle, Trophy, 
  CheckCircle2, Clock, ShieldAlert, Award, Star
} from 'lucide-react';

interface ModuleViewerProps {
  onOpenSimulator: (type: 'brief' | 'outreach' | 'roleplay' | 'crm' | 'scoov') => void;
  completedModules: number[];
  setCompletedModules: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  onOpenSimulator,
  completedModules,
  setCompletedModules,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [pointsToast, setPointsToast] = useState<{ show: boolean; text: string; points: number } | null>(null);

  const activeModule = COURSE_MODULES.find((m) => m.id === selectedModuleId) || COURSE_MODULES[0];
  const currentSlide: Slide = activeModule.slides[currentSlideIndex] || activeModule.slides[0];

  const isModuleCompleted = completedModules.includes(activeModule.id);

  const toggleModuleCompletion = (id: number) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter((mId) => mId !== id));
      setPointsToast({ show: true, text: 'امتیاز این بخش کسر شد', points: -100 });
    } else {
      setCompletedModules([...completedModules, id]);
      setPointsToast({ show: true, text: 'امتیاز تسلط فروش (Sales Mastery Points) کسب شد!', points: 100 });
    }
    setTimeout(() => {
      setPointsToast(null);
    }, 3000);
  };

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < activeModule.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else if (selectedModuleId < COURSE_MODULES.length) {
      setSelectedModuleId(selectedModuleId + 1);
      setCurrentSlideIndex(0);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else if (selectedModuleId > 1) {
      setSelectedModuleId(selectedModuleId - 1);
      const prevModule = COURSE_MODULES.find((m) => m.id === selectedModuleId - 1);
      setCurrentSlideIndex(prevModule ? prevModule.slides.length - 1 : 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative" dir="rtl">

      {/* Floating Points Toast */}
      {pointsToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white border border-blue-400 text-[#141b2b] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-600">
              {pointsToast.points > 0 ? `+${pointsToast.points} امتیاز تسلط فروش!` : `${pointsToast.points} امتیاز`}
            </div>
            <p className="text-[11px] text-slate-600">{pointsToast.text}</p>
          </div>
        </div>
      )}

      {/* Section Header: Course Path Roadmap */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-blue-600">مسیر یادگیری Sales AI</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#141b2b] tracking-tight">
            سرفصل‌های آموزشی و اسلایدهای تعاملی
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>تکمیل‌شده: {completedModules.length} از {COURSE_MODULES.length} بخش</span>
        </div>
      </div>
      
      {/* 8-Step Modular Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
        {COURSE_MODULES.map((module) => {
          const isSelected = module.id === selectedModuleId;
          const isCompleted = completedModules.includes(module.id);
          const status = isCompleted ? 'Completed' : isSelected ? 'In Progress' : 'Not Started';

          return (
            <button
              key={module.id}
              id={`module-btn-${module.id}`}
              onClick={() => {
                setSelectedModuleId(module.id);
                setCurrentSlideIndex(0);
              }}
              className={`p-3 rounded-2xl border text-right transition-all duration-200 flex flex-col justify-between h-32 ${
                isSelected
                  ? 'bg-blue-50 border-[#0066ff] ring-2 ring-blue-500/20 text-[#141b2b] shadow-md'
                  : isCompleted
                  ? 'bg-emerald-50/50 border-emerald-300 text-slate-700 hover:border-emerald-500'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  isSelected 
                    ? 'bg-[#0066ff] text-white font-black' 
                    : isCompleted 
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  ۰{module.id}
                </span>

                {isCompleted ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold" title="تکمیل شده (+۱۰۰ XP)">
                    ✓
                  </span>
                ) : isSelected ? (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                ) : (
                  <span className="text-[9px] font-mono text-slate-400">
                    100 XP
                  </span>
                )}
              </div>

              <div className="my-1">
                <p className="text-xs font-bold line-clamp-2 leading-snug text-[#141b2b]">
                  {module.titleFa}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100 w-full">
                <span>{module.slides.length} اسلاید</span>
                <span className={`font-mono text-[9px] font-bold ${
                  isCompleted ? 'text-emerald-700' : isSelected ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Slide Card Container */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
        
        {/* Slide Header */}
        <div className="bg-[#f9f9ff] px-6 py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
              <span>بخش {activeModule.id}: {activeModule.titleFa}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-sans">{activeModule.titleEn}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-slate-500">صفحه {currentSlide.pageNum}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#141b2b] tracking-tight">
              {currentSlide.title}
            </h1>
          </div>

          {/* Slide Navigator controls */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
            <button
              onClick={handlePrevSlide}
              disabled={selectedModuleId === 1 && currentSlideIndex === 0}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 transition"
              title="اسلاید قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-600 px-3 font-mono font-bold">
              {currentSlideIndex + 1} / {activeModule.slides.length}
            </span>
            <button
              onClick={handleNextSlide}
              disabled={selectedModuleId === COURSE_MODULES.length && currentSlideIndex === activeModule.slides.length - 1}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 transition"
              title="اسلاید بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800">
          
          {/* Main paragraphs */}
          <div className="space-y-4 max-w-4xl">
            {currentSlide.content.map((p, idx) => (
              <p key={idx} className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal text-justify">
                {p}
              </p>
            ))}
          </div>

          {/* Diagram / Flow / Comparison Component */}
          {currentSlide.diagram && (
            <div className="my-6 bg-[#f9f9ff] p-5 sm:p-6 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-blue-600 mb-4 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                <span>بررسی ساختاری و روند پیاده‌سازی</span>
              </div>

              {currentSlide.diagram.type === 'flow' && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {currentSlide.diagram.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <div className="bg-white px-4 py-2.5 rounded-xl text-xs sm:text-sm text-blue-900 font-bold border border-blue-200 shadow-sm">
                        {item.label}
                      </div>
                      {idx < currentSlide.diagram!.items.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-slate-400 rotate-180 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {currentSlide.diagram.type === 'compare' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSlide.diagram.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        item.highlight
                          ? 'bg-blue-50/70 border-blue-300 text-blue-950 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1.5 text-[#141b2b] flex items-center gap-1.5">
                        {item.highlight && <Star className="w-3.5 h-3.5 text-blue-600" />}
                        <span>{item.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bullet points */}
          {currentSlide.bulletPoints && (
            <div className="bg-[#f9f9ff] p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-[#141b2b] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>نکات کلیدی این مبحث:</span>
              </h4>
              <ul className="space-y-2.5">
                {currentSlide.bulletPoints.map((bp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                    <span className="text-blue-600 mt-1 shrink-0 font-bold">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Concept Box */}
          {currentSlide.keyConcept && (
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-blue-900 text-sm">{currentSlide.keyConcept.term}</h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">{currentSlide.keyConcept.explanation}</p>
              </div>
            </div>
          )}

          {/* Golden Rules Box */}
          {currentSlide.goldenRules && (
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <h5 className="font-bold text-emerald-800 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>قانون طلایی (Golden Rule):</span>
              </h5>
              {currentSlide.goldenRules.map((rule, idx) => (
                <p key={idx} className="text-xs sm:text-sm font-medium text-emerald-900 leading-relaxed text-justify">
                  {rule}
                </p>
              ))}
            </div>
          )}

          {/* Copyable Prompt Template */}
          {currentSlide.promptTemplate && (
            <div className="bg-[#f9f9ff] p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3" dir="ltr">
              <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
                <span className="font-bold text-blue-700">PROMPT TEMPLATE ({currentSlide.promptTemplate.role})</span>
                <button
                  onClick={() => handleCopyPrompt(currentSlide.promptTemplate!.template, currentSlide.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#141b2b] font-sans text-xs transition border border-slate-200 shadow-sm"
                >
                  {copiedPromptId === currentSlide.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>کپی Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap font-sans bg-white p-4 rounded-xl border border-slate-200 leading-relaxed text-right" dir="rtl">
                {currentSlide.promptTemplate.template}
              </pre>
            </div>
          )}

          {/* Slide Interactive Exercise Callout */}
          {currentSlide.exercise && (
            <div className="bg-blue-50/70 border border-blue-200 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">تمرین عملی این بخش</span>
                <h4 className="font-bold text-[#141b2b] text-base">{currentSlide.exercise.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{currentSlide.exercise.instructions}</p>
              </div>
              <button
                onClick={() => onOpenSimulator(currentSlide.exercise!.type)}
                className="px-5 py-2.5 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shrink-0 transition shadow-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>ورود به شبیه‌ساز عملی</span>
              </button>
            </div>
          )}

        </div>

        {/* Slide Footer */}
        <div className="bg-[#f9f9ff] px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => toggleModuleCompletion(activeModule.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm text-right ${
              isModuleCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Trophy className={`w-4 h-4 shrink-0 ${isModuleCompleted ? 'text-emerald-700' : 'text-blue-600'}`} />
            <span className="text-right">
              {isModuleCompleted
                ? '✓ این بخش تکمیل شد (۱۰۰+ امتیاز تسلط کسب شد)'
                : 'علامت‌گذاری تکمیل این بخش (+۱۰۰ امتیاز تسلط فروش)'}
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevSlide}
              disabled={selectedModuleId === 1 && currentSlideIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium disabled:opacity-40 transition"
            >
              اسلاید قبلی
            </button>
            <button
              onClick={handleNextSlide}
              disabled={selectedModuleId === COURSE_MODULES.length && currentSlideIndex === activeModule.slides.length - 1}
              className="px-5 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white text-xs font-bold transition shadow-sm"
            >
              اسلاید بعدی
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
