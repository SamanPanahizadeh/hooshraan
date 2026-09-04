import React, { useState, useMemo, useEffect } from 'react';
import {
  HOOSHRAAN_DIMENSIONS_V11,
  HOOSHRAAN_QUESTIONS_V11,
  HOOSHRAAN_TARGET_QUESTIONS_V11,
  HOOSHRAAN_MATURITY_LEVELS_V11,
  HOOSHRAAN_RECOMMENDATION_MAPPING,
} from '../data/diagnosticDataV11';
import { getPersianJalaliDate, toPersianDigits } from '../utils/jalaliDate';
import { exportElementToPdf, isRunningInIframe } from '../utils/pdfExport';
import {
  Compass,
  TrendingUp,
  Users,
  ShieldCheck,
  Database,
  Cpu,
  Layers,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Printer,
  Sparkles,
  Download,
  Info,
  Award,
  ChevronLeft,
  Building2,
  Calendar,
  Target,
  BarChart3,
  FileCheck,
  Loader2,
  ExternalLink,
  X,
  BookOpen,
} from 'lucide-react';
import { ExecutiveReportPdfDocument } from './ExecutiveReportPdfDocument';

interface QuestionResponseState {
  value?: number | 'NA';
  evidence?: 'self-report' | 'documented' | 'observed';
  naReason?: string;
}

interface TargetResponseState {
  [dimensionKey: string]: number;
}

interface AmbitionResponseState {
  outcome: string;
  constraint: string;
}

interface OrgProfile {
  companyName: string;
  industry: string;
  assessorName: string;
  assessorRole: string;
  employeeCount: string;
  aiCurrentUsage: string;
  aiUserCount: string;
  aiStrategyStatus: string;
  aiPolicyStatus: string;
  aiUseCasesCount: string;
  digitalMaturity: string;
}

const DEFAULT_ORG_PROFILE: OrgProfile = {
  companyName: 'شرکت فناوری پیشرو نوآوران',
  industry: 'فناوری اطلاعات و خدمات B2B',
  assessorName: 'امیرحسین رضایی',
  assessorRole: 'مدیر ارشد تحول دیجیتال و فناوری',
  employeeCount: '۵۰ تا ۲۵۰ نفر',
  aiCurrentUsage: 'چند پایلوت در تیم‌های منتخب',
  aiUserCount: '۱۰ تا ۵۰ نفر',
  aiStrategyStatus: 'پیش‌نویس اولیه در دست بررسی',
  aiPolicyStatus: 'خط‌مشی غیررسمی و اولیه',
  aiUseCasesCount: '۳ تا ۵ مورد در حال آزمون',
  digitalMaturity: 'متوسط و در حال مدرن‌سازی سامانه‌ها',
};

const DEFAULT_TARGET_LEVELS: TargetResponseState = {
  strategy: 4,
  business_value: 4,
  people: 3,
  governance: 3,
  data: 4,
  technology: 4,
  operating_model: 3,
};

const DEFAULT_AMBITION: AmbitionResponseState = {
  outcome: 'افزایش ۳۰ درصدی بهره‌وری تیم‌های عملیاتی و فروش از طریق خودکارسازی فرآیندها و استقرار دستیاران هوشمند سازمانی.',
  constraint: 'پراکندگی داده‌های مشتریان در سامانه‌های مختلف و نیاز به ارتقای سواد هوش مصنوعی کارکنان.',
};

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  strategy: <Compass className="w-5 h-5" />,
  business_value: <TrendingUp className="w-5 h-5" />,
  people: <Users className="w-5 h-5" />,
  governance: <ShieldCheck className="w-5 h-5" />,
  data: <Database className="w-5 h-5" />,
  technology: <Cpu className="w-5 h-5" />,
  operating_model: <Layers className="w-5 h-5" />,
};

export const OrganizationalDiagnostic: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'current_assessment' | 'target_assessment' | 'report'>('intro');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('hooshraan_active_q_idx_v11');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < HOOSHRAAN_QUESTIONS_V11.length) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [orgProfile, setOrgProfile] = useState<OrgProfile>(() => {
    try {
      const saved = localStorage.getItem('hooshraan_org_profile_v11');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ORG_PROFILE;
  });

  const [responses, setResponses] = useState<Record<string, QuestionResponseState>>(() => {
    try {
      const saved = localStorage.getItem('hooshraan_responses_v11');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const [targetLevels, setTargetLevels] = useState<TargetResponseState>(() => {
    try {
      const saved = localStorage.getItem('hooshraan_targets_v11');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TARGET_LEVELS;
  });

  const [ambition, setAmbition] = useState<AmbitionResponseState>(() => {
    try {
      const saved = localStorage.getItem('hooshraan_ambition_v11');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_AMBITION;
  });

  useEffect(() => {
    try {
      localStorage.setItem('hooshraan_org_profile_v11', JSON.stringify(orgProfile));
    } catch (e) {
      console.error(e);
    }
  }, [orgProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('hooshraan_responses_v11', JSON.stringify(responses));
    } catch (e) {
      console.error(e);
    }
  }, [responses]);

  useEffect(() => {
    try {
      localStorage.setItem('hooshraan_targets_v11', JSON.stringify(targetLevels));
    } catch (e) {
      console.error(e);
    }
  }, [targetLevels]);

  useEffect(() => {
    try {
      localStorage.setItem('hooshraan_ambition_v11', JSON.stringify(ambition));
    } catch (e) {
      console.error(e);
    }
  }, [ambition]);

  useEffect(() => {
    try {
      localStorage.setItem('hooshraan_active_q_idx_v11', activeQuestionIndex.toString());
    } catch (e) {
      console.error(e);
    }
  }, [activeQuestionIndex]);

  const [aiReportText, setAiReportText] = useState<string>('');
  const [isGeneratingAiReport, setIsGeneratingAiReport] = useState<boolean>(false);
  const [activeReportTab, setActiveReportTab] = useState<'summary' | 'heatmap' | 'gaps' | 'roadmap' | 'recommendations' | 'ai_synthesis'>('summary');

  const [editingNaCode, setEditingNaCode] = useState<string | null>(null);
  const [tempNaReason, setTempNaReason] = useState<string>('');

  const reportJalaliDate = useMemo(() => getPersianJalaliDate(new Date()), []);
  const [reportViewMode, setReportViewMode] = useState<'dashboard' | 'executive_doc'>('dashboard');

  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfProgressText, setPdfProgressText] = useState<string>('');
  const [pdfExportSuccess, setPdfExportSuccess] = useState<boolean | null>(null);
  const [showIframePrintHelp, setShowIframePrintHelp] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setPdfExportSuccess(null);
    setPdfProgressText('در حال آماده‌سازی سند رسمی استراتژیک...');

    if (reportViewMode !== 'executive_doc') {
      setReportViewMode('executive_doc');
      await new Promise((r) => setTimeout(r, 300));
    }

    const cleanOrgName = orgProfile.companyName.trim().replace(/[/\\?%*:|"<>]/g, '-') || 'سازمان';
    const filename = `گزارش-استراتژیک-عارضه-یابی-هوشران-${cleanOrgName}.pdf`;

    const success = await exportElementToPdf('diagnostic-luxury-executive-pdf-document', {
      filename,
      onProgress: (msg) => setPdfProgressText(msg),
    });

    setIsExportingPdf(false);
    setPdfExportSuccess(success);
    setTimeout(() => {
      setPdfExportSuccess(null);
      setPdfProgressText('');
    }, 4500);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('window.print() error or blocked by sandbox:', err);
    }
    if (isRunningInIframe()) {
      setShowIframePrintHelp(true);
    }
  };

  const resetAllResponses = () => {
    setResponses({});
    setTargetLevels(DEFAULT_TARGET_LEVELS);
    setAmbition(DEFAULT_AMBITION);
    setStep('intro');
    setActiveQuestionIndex(0);
    setAiReportText('');
    try {
      localStorage.removeItem('hooshraan_responses_v11');
      localStorage.removeItem('hooshraan_active_q_idx_v11');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectResponse = (code: string, value: number | 'NA', evidence?: 'self-report' | 'documented' | 'observed') => {
    if (value === 'NA') {
      setEditingNaCode(code);
      setTempNaReason(responses[code]?.naReason || '');
    } else {
      setResponses((prev) => ({
        ...prev,
        [code]: {
          value,
          evidence: evidence || prev[code]?.evidence || 'self-report',
          naReason: undefined,
        },
      }));
    }
  };

  const handleConfirmNa = () => {
    if (!editingNaCode || !tempNaReason.trim()) return;
    setResponses((prev) => ({
      ...prev,
      [editingNaCode]: {
        value: 'NA',
        naReason: tempNaReason.trim(),
        evidence: prev[editingNaCode]?.evidence || 'self-report',
      },
    }));
    setEditingNaCode(null);
    setTempNaReason('');
  };

  const currentQuestion = HOOSHRAAN_QUESTIONS_V11[activeQuestionIndex] || HOOSHRAAN_QUESTIONS_V11[0];
  const currentDimension = HOOSHRAAN_DIMENSIONS_V11.find((d) => d.key === currentQuestion.dimensionKey) || HOOSHRAAN_DIMENSIONS_V11[0];
  const currentDimensionIndex = HOOSHRAAN_DIMENSIONS_V11.findIndex((d) => d.key === currentDimension.key);
  const currentDimensionQuestions = useMemo(() => {
    return HOOSHRAAN_QUESTIONS_V11.filter((q) => q.dimensionKey === currentDimension.key);
  }, [currentDimension.key]);
  const currentQuestionIndexInDim = currentDimensionQuestions.findIndex((q) => q.code === currentQuestion.code);

  const calculationResults = useMemo(() => {
    let totalValidResponses = 0;
    const totalQuestions = HOOSHRAAN_QUESTIONS_V11.length;

    const dimensionStats: Record<string, {
      score: number;
      validCount: number;
      naCount: number;
      missingCount: number;
      isLowConfidence: boolean;
      target: number;
      gap: number;
      weight: number;
    }> = {};

    HOOSHRAAN_DIMENSIONS_V11.forEach((dim) => {
      const questionsInDim = HOOSHRAAN_QUESTIONS_V11.filter((q) => q.dimensionKey === dim.key);
      const totalInDim = questionsInDim.length;
      let validSum = 0;
      let validCount = 0;
      let naCount = 0;
      let missingCount = 0;

      questionsInDim.forEach((q) => {
        const resp = responses[q.code];
        if (resp && typeof resp.value === 'number') {
          validSum += resp.value;
          validCount += 1;
          totalValidResponses += 1;
        } else if (resp && resp.value === 'NA') {
          naCount += 1;
        } else {
          missingCount += 1;
        }
      });

      const dimScore = validCount > 0 ? validSum / validCount : 1.0;
      const invalidOrNaRatio = (naCount + missingCount) / totalInDim;
      const isLowConfidence = invalidOrNaRatio > 0.20;
      const targetScore = targetLevels[dim.key] || 3;
      const gap = targetScore - dimScore;

      dimensionStats[dim.key] = {
        score: dimScore,
        validCount,
        naCount,
        missingCount,
        isLowConfidence,
        target: targetScore,
        gap,
        weight: dim.weight,
      };
    });

    const completionRatio = totalValidResponses / totalQuestions;
    const isCompletionGateMet = completionRatio >= 0.9;

    let overallScore1to5 = 0;
    HOOSHRAAN_DIMENSIONS_V11.forEach((dim) => {
      const stats = dimensionStats[dim.key];
      overallScore1to5 += stats.score * (dim.weight / 100);
    });

    const overallScore0to100 = Math.max(0, Math.min(100, ((overallScore1to5 - 1) / 4) * 100));
    const govScore = dimensionStats['governance']?.score || 1.0;
    const hasScaleRisk = govScore < 2.0;

    let weakestDimension = HOOSHRAAN_DIMENSIONS_V11[0];
    let minScore = 5.0;

    HOOSHRAAN_DIMENSIONS_V11.forEach((dim) => {
      const s = dimensionStats[dim.key].score;
      if (s < minScore) {
        minScore = s;
        weakestDimension = dim;
      }
    });

    const getMaturityLevelFromScore = (score: number) => {
      if (score < 2.0) return 1;
      if (score < 3.0) return 2;
      if (score < 4.0) return 3;
      if (score < 4.7) return 4;
      return 5;
    };

    const unconstrainedLevel = getMaturityLevelFromScore(overallScore1to5);
    const weakestDimensionLevel = getMaturityLevelFromScore(minScore);

    const maxAllowedLevel = weakestDimensionLevel + 1;
    const isGated = unconstrainedLevel > maxAllowedLevel;
    const finalLevel = isGated ? maxAllowedLevel : unconstrainedLevel;

    const levelInfo = HOOSHRAAN_MATURITY_LEVELS_V11.find((l) => l.level === finalLevel) || HOOSHRAAN_MATURITY_LEVELS_V11[0];
    const unconstrainedLevelInfo = HOOSHRAAN_MATURITY_LEVELS_V11.find((l) => l.level === unconstrainedLevel) || HOOSHRAAN_MATURITY_LEVELS_V11[0];

    const sortedDimensionsByScore = [...HOOSHRAAN_DIMENSIONS_V11].sort(
      (a, b) => dimensionStats[b.key].score - dimensionStats[a.key].score
    );
    const topStrengths = sortedDimensionsByScore.slice(0, 3).map((dim) => ({
      dimension: dim,
      score: dimensionStats[dim.key].score,
    }));

    const sortedDimensionsByGap = [...HOOSHRAAN_DIMENSIONS_V11].sort(
      (a, b) => dimensionStats[b.key].gap - dimensionStats[a.key].gap
    );
    const topGaps = sortedDimensionsByGap.slice(0, 5).map((dim) => ({
      dimension: dim,
      current: dimensionStats[dim.key].score,
      target: dimensionStats[dim.key].target,
      gap: dimensionStats[dim.key].gap,
      weight: dim.weight,
    }));

    const priorityGapDimensions = sortedDimensionsByGap.map((d) => d.key);
    const recommendedServices = priorityGapDimensions.map((dimKey) => {
      const mapping = HOOSHRAAN_RECOMMENDATION_MAPPING[dimKey];
      const dim = HOOSHRAAN_DIMENSIONS_V11.find((d) => d.key === dimKey)!;
      return {
        dimKey,
        dimTitleFa: dim.titleFa,
        serviceName: mapping.serviceName,
        serviceTitleFa: mapping.serviceTitleFa,
        rationale: mapping.rationale,
        gapScore: dimensionStats[dimKey].gap,
      };
    });

    return {
      totalValidResponses,
      totalQuestions,
      completionRatio,
      isCompletionGateMet,
      dimensionStats,
      overallScore1to5,
      overallScore0to100,
      hasScaleRisk,
      weakestDimension,
      weakestDimensionScore: minScore,
      weakestDimensionLevel,
      unconstrainedLevel,
      unconstrainedLevelInfo,
      finalLevel,
      levelInfo,
      isGated,
      gateExplanation: isGated
        ? `سطح بلوغ کلی سازمان به دلیل اصل گلوگاه به حداکثر یک سطح بالاتر از ضعیف‌ترین بعد کلیدی («${weakestDimension.titleFa}» در سطح ${weakestDimensionLevel}) محدود شده است.`
        : null,
      topStrengths,
      topGaps,
      recommendedServices,
    };
  }, [responses, targetLevels]);

  const handleGenerateAiReport = async () => {
    setIsGeneratingAiReport(true);
    try {
      const payload = {
        companyName: orgProfile.companyName,
        industry: orgProfile.industry,
        employeeCount: orgProfile.employeeCount,
        overallScore: calculationResults.overallScore1to5.toFixed(2),
        maturityLevel: `${calculationResults.levelInfo.fa} (${calculationResults.levelInfo.english})`,
        dimensionScores: Object.fromEntries(
          Object.entries(calculationResults.dimensionStats).map(([k, v]: [string, any]) => [k, v.score.toFixed(2)])
        ),
        targetScores: targetLevels,
        ambitionOutcome: ambition.outcome,
        ambitionConstraint: ambition.constraint,
        topGaps: calculationResults.topGaps.map((g) => `${g.dimension.titleFa} (شکاف: ${g.gap.toFixed(2)})`),
        topStrengths: calculationResults.topStrengths.map((s) => `${s.dimension.titleFa} (امتیاز: ${s.score.toFixed(2)})`),
        scaleRiskAlert: calculationResults.hasScaleRisk
          ? 'امتیاز حاکمیت کمتر از ۲.۰ است؛ خطر مقیاس‌گذاری ناامن وجود دارد.'
          : null,
        isGated: calculationResults.isGated,
        gateExplanation: calculationResults.gateExplanation,
        recommendations: calculationResults.recommendedServices.slice(0, 3).map((r) => r.serviceTitleFa),
      };

      const res = await fetch('/api/generate-org-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data && data.result) {
        setAiReportText(data.result);
        setActiveReportTab('ai_synthesis');
      }
    } catch (err) {
      console.error('Error generating AI report:', err);
    } finally {
      setIsGeneratingAiReport(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-slate-100 space-y-12" dir="rtl">
      
      {/* Header Banner - Frosted Glass Container */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden print:hidden space-y-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              ارزیابی سطح بلوغ هوش مصنوعی سازمان
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              سنجش نظام‌مند ۴۰ مؤلفه رفتاری در ۷ بعد کلیدی، تعیین شکاف وضعیت هدف و تدوین نقشه راه ۹۰ روزه اجرایی.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end flex-wrap relative z-10">
            <button
              type="button"
              onClick={resetAllResponses}
              className="px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white font-semibold rounded-2xl text-xs transition border border-white/10 flex items-center gap-2 cursor-pointer backdrop-blur-md"
              title="شروع مجدد ارزیابی از ابتدا"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>شروع مجدد</span>
            </button>

            {step === 'report' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-5 py-2.5 bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer backdrop-blur-md border border-emerald-400/30"
                >
                  {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>دانلود PDF رسمی</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-bold rounded-2xl text-xs transition border border-white/10 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>چاپ</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Progress Steps Bar - Spacious & Relaxed */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold relative z-10">
          {[
            { id: 'intro', label: '۱. مشخصات سازمان', icon: Building2 },
            { id: 'current_assessment', label: '۲. ارزیابی ۴۰ مؤلفه فعلی', icon: BarChart3 },
            { id: 'target_assessment', label: '۳. وضعیت هدف و جاه‌طلبی', icon: Target },
            { id: 'report', label: '۴. گزارش و نقشه راه', icon: FileCheck, disabled: !calculationResults.isCompletionGateMet },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            return (
              <button
                key={s.id}
                onClick={() => !s.disabled && setStep(s.id as any)}
                disabled={s.disabled}
                className={`flex items-center gap-2.5 p-3.5 rounded-2xl transition text-right cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/30 text-white border border-blue-400/40 shadow-[0_4px_20px_rgba(37,99,235,0.2)]'
                    : s.disabled
                    ? 'bg-white/[0.02] text-slate-600 border border-white/5 cursor-not-allowed'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 1: INTRO & PROFILE ================= */}
      {step === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-slate-800/85 backdrop-blur-2xl border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            <div className="border-b border-slate-700/80 pb-5">
              <h2 className="text-xl font-black text-white flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span>مشخصات سازمان و تیم ارزیابی</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                اطلاعات این بخش در صفحه اول گزارش رسمی و سند نقشه راه درج می‌گردد.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۱. نام سازمان / شرکت</label>
                <input
                  type="text"
                  value={orgProfile.companyName}
                  onChange={(e) => setOrgProfile({ ...orgProfile, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 focus:bg-slate-900 outline-none transition"
                  placeholder="مثال: شرکت نوآوران پیشرو"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۲. صنعت و حوزه فعالیت</label>
                <input
                  type="text"
                  value={orgProfile.industry}
                  onChange={(e) => setOrgProfile({ ...orgProfile, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 focus:bg-slate-900 outline-none transition"
                  placeholder="مثال: خدمات مالی / فناوری اطلاعات"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۳. نام و نام خانوادگی ارزیاب</label>
                <input
                  type="text"
                  value={orgProfile.assessorName}
                  onChange={(e) => setOrgProfile({ ...orgProfile, assessorName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 focus:bg-slate-900 outline-none transition"
                  placeholder="مثال: علی محمدی"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۴. سمت سازمانی ارزیاب</label>
                <input
                  type="text"
                  value={orgProfile.assessorRole}
                  onChange={(e) => setOrgProfile({ ...orgProfile, assessorRole: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 focus:bg-slate-900 outline-none transition"
                  placeholder="مثال: مدیر ارشد تحول دیجیتال"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۵. مقیاس پرسنلی سازمان</label>
                <select
                  value={orgProfile.employeeCount}
                  onChange={(e) => setOrgProfile({ ...orgProfile, employeeCount: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 outline-none transition"
                >
                  <option value="کمتر از ۲۰ نفر">استارتاپ / کمتر از ۲۰ نفر</option>
                  <option value="۲۰ تا ۵۰ نفر">کسب‌وکار در حال رشد (۲۰ تا ۵۰ نفر)</option>
                  <option value="۵۰ تا ۲۵۰ نفر">سازمان متوسط (۵۰ تا ۲۵۰ نفر)</option>
                  <option value="۲۵۰ تا ۱۰۰۰ نفر">سازمان بزرگ (۲۵۰ تا ۱۰۰۰ نفر)</option>
                  <option value="بیش از ۱۰۰۰ نفر">سازمان مقیاس بالا (بیش از ۱۰۰۰ نفر)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">۶. وضعیت فعلی بهره‌برداری از AI</label>
                <select
                  value={orgProfile.aiCurrentUsage}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiCurrentUsage: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm font-medium text-white focus:border-blue-500/60 outline-none transition"
                >
                  <option value="استفاده موردی و فردی توسط کارکنان">استفاده موردی و فردی توسط کارکنان</option>
                  <option value="چند پایلوت در تیم‌های منتخب">چند پایلوت در تیم‌های منتخب</option>
                  <option value="استقرار عملیاتی در ۲ یا ۳ فرآیند اصلی">استقرار عملیاتی در ۲ یا ۳ فرآیند اصلی</option>
                  <option value="مقیاس‌گذاری در سطح چند واحد سازمانی">مقیاس‌گذاری در سطح چند واحد سازمانی</option>
                  <option value="یکپارچگی عمیق در استراتژی و محصولات">یکپارچگی عمیق در استراتژی و محصولات</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep('current_assessment')}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group"
              >
                <span>ورود به ارزیابی ۴۰ مؤلفه رفتاری</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Side Explanatory Card */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
            <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>مبانی روش‌شناسی نسخه ۱.۱ هوشران</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <div className="p-3.5 bg-white/[0.03] rounded-2xl border border-white/5 space-y-1">
                <span className="font-bold text-white block">۷ بُعد وزن‌دهی‌شده:</span>
                <p>استراتژی (۱۵٪)، ارزش تجاری (۲۰٪)، نیروی انسانی (۱۵٪)، حاکمیت (۱۵٪)، داده (۱۵٪)، فناوری (۱۰٪) و مدل عملیاتی (۱۰٪).</p>
              </div>

              <div className="p-3.5 bg-white/[0.03] rounded-2xl border border-white/5 space-y-1">
                <span className="font-bold text-white block">اصل گیت گلوگاه (Bottleneck Gate):</span>
                <p>سطح بلوغ کلی سازمان به حداکثر ۱ پله بالاتر از ضعیف‌ترین بعد کلیدی محدود می‌شود تا رشد نامتوازن مهار شود.</p>
              </div>

              <div className="p-3.5 bg-white/[0.03] rounded-2xl border border-white/5 space-y-1">
                <span className="font-bold text-white block">پایش ریسک مقیاس (Scale Risk):</span>
                <p>امتیاز حاکمیت زیر ۲.۰ مانع توسعه بی‌قید پایلوت‌ها برای جلوگیری از نقض امنیت داده‌ها می‌شود.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CURRENT ASSESSMENT (SINGLE-QUESTION WORKFLOW) ================= */}
      {step === 'current_assessment' && (
        <div className="space-y-8">
          
          {/* Dimension Selector Pills */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {HOOSHRAAN_DIMENSIONS_V11.map((dim) => {
              const stats = calculationResults.dimensionStats[dim.key];
              const isComplete = stats && stats.validCount + stats.naCount === dim.questionCodes.length;
              const isCurrentDim = currentDimension.key === dim.key;

              return (
                <button
                  key={dim.key}
                  onClick={() => {
                    const targetIdx = HOOSHRAAN_QUESTIONS_V11.findIndex((q) => q.dimensionKey === dim.key);
                    if (targetIdx !== -1) {
                      setActiveQuestionIndex(targetIdx);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                    isCurrentDim
                      ? 'bg-blue-600/30 text-white border border-blue-400/40 shadow-sm'
                      : 'bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/5'
                  }`}
                >
                  <span className={isCurrentDim ? 'text-blue-400' : 'text-slate-500'}>
                    {DIMENSION_ICONS[dim.key]}
                  </span>
                  <span>{dim.titleFa}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isCurrentDim ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-400'
                  }`}>
                    {stats ? `${toPersianDigits(stats.validCount + stats.naCount)}/${toPersianDigits(dim.questionCodes.length)}` : `۰/${toPersianDigits(dim.questionCodes.length)}`}
                  </span>
                  {isComplete && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Progress Overview Card */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 shrink-0">
                  {DIMENSION_ICONS[currentDimension.key]}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-lg">
                      بُعد {toPersianDigits(currentDimensionIndex + 1)} از ۷: {currentDimension.titleFa}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-white/5 text-slate-400 rounded-lg">
                      وزن: {toPersianDigits(currentDimension.weight)}٪
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{currentDimension.description}</p>
                </div>
              </div>

              <div className="font-mono text-xs text-slate-400 bg-white/[0.03] px-4 py-2.5 rounded-2xl border border-white/5 shrink-0">
                <span>پیشرفت: </span>
                <strong className="text-white font-bold">{toPersianDigits(activeQuestionIndex + 1)} از ۴۰</strong>
                <span className="mx-2 text-slate-600">|</span>
                <span className="text-blue-400 font-bold">{toPersianDigits(Math.round(((activeQuestionIndex + 1) / 40) * 100))}٪</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((activeQuestionIndex + 1) / 40) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question Display */}
          {(() => {
            const currentResp = responses[currentQuestion.code];
            const currentValue = currentResp?.value;

            return (
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                
                {/* Question Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-600/30 text-blue-300 border border-blue-400/30 text-xs font-mono font-black rounded-xl">
                      {currentQuestion.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      مؤلفه {toPersianDigits(currentQuestionIndexInDim + 1)} از {toPersianDigits(currentDimensionQuestions.length)} این بعد
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectResponse(currentQuestion.code, 'NA')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      currentValue === 'NA'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    N/A (نامربوط در این سازمان)
                  </button>
                </div>

                {/* Question Title */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    نزدیک‌ترین رفتار عملیاتی سازمان خود را انتخاب نمایید:
                  </p>
                </div>

                {/* Options 1-5 Cards */}
                <div className="space-y-4">
                  {([1, 2, 3, 4, 5] as const).map((lvl) => {
                    const isSelected = currentValue === lvl;
                    const text = currentQuestion.responses[lvl];
                    const [label, ...descParts] = text.split(':');
                    const desc = descParts.join(':').trim();

                    const levelTitles: Record<number, string> = {
                      1: 'سطح ۱: مقدماتی و پایه‌ای',
                      2: 'سطح ۲: نوظهور و آزمایشی',
                      3: 'سطح ۳: سازمان‌یافته و عملیاتی',
                      4: 'سطح ۴: یکپارچه و مقیاس‌پذیر',
                      5: 'سطح ۵: پیشگام و تحول‌آفرین',
                    };

                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleSelectResponse(currentQuestion.code, lvl)}
                        className={`w-full text-right p-5 sm:p-6 rounded-2xl transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-400/60 shadow-[0_4px_25px_rgba(37,99,235,0.25)]'
                            : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-300'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                              {levelTitles[lvl]}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isSelected ? 'bg-blue-500/40 text-blue-200' : 'bg-white/10 text-slate-400'
                            }`}>
                              {label.replace(/سطح \d+ \((.*?)\)/, '$1')}
                            </span>
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                            {desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected ? 'border-blue-400 bg-blue-600 text-white' : 'border-slate-600 bg-transparent'
                          }`}>
                            {isSelected && <CheckCircle className="w-4 h-4" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Evidence Tag Options */}
                {typeof currentValue === 'number' && (
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400 font-semibold">مبنا و شواهد این ارزیابی در سازمان:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['self-report', 'documented', 'observed'] as const).map((ev) => {
                        const isEv = currentResp?.evidence === ev;
                        const evLabels = {
                          'self-report': 'خوداظهاری',
                          'documented': 'مستندات مکتوب و مصوب',
                          'observed': 'مشاهده مستقیم در فرآیند',
                        };
                        return (
                          <button
                            key={ev}
                            type="button"
                            onClick={() => handleSelectResponse(currentQuestion.code, currentValue, ev)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition border cursor-pointer ${
                              isEv ? 'bg-white/20 text-white border-white/30' : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.08]'
                            }`}
                          >
                            {evLabels[ev]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-lg">
            <button
              type="button"
              onClick={() => {
                if (activeQuestionIndex > 0) {
                  setActiveQuestionIndex(activeQuestionIndex - 1);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                } else {
                  setStep('intro');
                }
              }}
              className="px-5 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{activeQuestionIndex > 0 ? 'سوال قبلی' : 'مشخصات سازمان'}</span>
            </button>

            {activeQuestionIndex < HOOSHRAAN_QUESTIONS_V11.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  setActiveQuestionIndex(activeQuestionIndex + 1);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>سوال بعدی ({toPersianDigits(activeQuestionIndex + 2)} از ۴۰)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep('target_assessment');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>مرحله بعد: وضعیت هدف و چشم‌انداز</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 3: TARGET STATE & AMBITION ================= */}
      {step === 'target_assessment' && (
        <div className="space-y-8">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            <div className="border-b border-white/10 pb-5">
              <h2 className="text-xl font-black text-white flex items-center gap-2.5">
                <Target className="w-5 h-5 text-blue-400" />
                <span>تعیین افق مطلوب و سطح هدف ابعاد ۷‌گانه (۱۲ الی ۲۴ ماه آینده)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                سطح بلوغ مورد نظر سازمان را برای هدایت سرمایه‌گذاری‌ها و ارتقای متوازن تعیین کنید:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {HOOSHRAAN_TARGET_QUESTIONS_V11.filter((t) => t.type === 'level').map((targetQ) => {
                const currentScore = calculationResults.dimensionStats[targetQ.dimensionKey]?.score || 1;
                const targetValue = targetLevels[targetQ.dimensionKey] || 3;
                const gap = targetValue - currentScore;

                return (
                  <div key={targetQ.code} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded-md">
                          {targetQ.code}
                        </span>
                        <h4 className="text-sm font-black text-white">{targetQ.dimensionTitleFa}</h4>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        فعلی: <strong className="text-slate-200">{currentScore.toFixed(1)}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{targetQ.question}</p>

                    <div className="grid grid-cols-5 gap-1.5 pt-2">
                      {([1, 2, 3, 4, 5] as const).map((lvl) => {
                        const isTarget = targetValue === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setTargetLevels({ ...targetLevels, [targetQ.dimensionKey]: lvl })}
                            className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                              isTarget
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                            }`}
                          >
                            سطح {toPersianDigits(lvl)}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 font-mono">
                      <span>شکاف تحول (Gap):</span>
                      <span className={`font-bold ${gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {gap > 0 ? `+${gap.toFixed(1)} پله` : 'هم‌سطح'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setStep('current_assessment')}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white font-bold rounded-xl text-xs transition flex items-center gap-2 border border-white/10 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به ارزیابی</span>
              </button>

              <button
                onClick={() => {
                  setStep('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!calculationResults.isCompletionGateMet}
                className={`px-8 py-3.5 font-bold rounded-2xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer ${
                  calculationResults.isCompletionGateMet
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
                    : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                }`}
              >
                <span>مشاهده گزارش جامع عارضه‌یابی و نقشه راه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: REPORT & DASHBOARD ================= */}
      {step === 'report' && (
        <div className="space-y-8">
          
          {/* Executive Document View */}
          {reportViewMode === 'executive_doc' && (
            <div className="space-y-6">
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4 print:hidden">
                <span className="text-xs text-slate-300 font-semibold">پیش‌نمایش سند رسمی چاپی (۸ صفحه‌ای استاندارد)</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReportViewMode('dashboard')}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition border border-white/10"
                  >
                    نمایش داشبورد
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود PDF</span>
                  </button>
                </div>
              </div>

              <ExecutiveReportPdfDocument
                orgProfile={orgProfile}
                calculationResults={calculationResults}
                reportJalaliDate={reportJalaliDate}
              />
            </div>
          )}

          {/* Interactive Dashboard View */}
          {reportViewMode === 'dashboard' && (
            <div className="space-y-8">
              {/* Score Badges Card */}
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5 flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">Executive Summary</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">گزارش خلاصه ارزیابی سازمان {orgProfile.companyName}</h2>
                  </div>
                  <button
                    onClick={() => setReportViewMode('executive_doc')}
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>سند ۸ صفحه‌ای رسمی هوشران</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
                    <span className="text-xs text-slate-400">امتیاز کل بلوغ (۱ تا ۵)</span>
                    <div className="text-3xl font-black text-white font-mono">{calculationResults.overallScore1to5.toFixed(2)}</div>
                    <span className="text-[11px] text-blue-400 font-medium">میانگین موزون ۷ بعد</span>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
                    <span className="text-xs text-slate-400">شاخص استاندارد</span>
                    <div className="text-3xl font-black text-white font-mono">{calculationResults.overallScore0to100.toFixed(1)}٪</div>
                    <span className="text-[11px] text-indigo-400 font-medium">مقیاس تبدیل ۱۰۰ تایی</span>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
                    <span className="text-xs text-slate-400">سطح بلوغ سازمانی</span>
                    <div className="text-lg font-black text-emerald-400">سطح {toPersianDigits(calculationResults.finalLevel)}: {calculationResults.levelInfo.fa}</div>
                    <span className="text-[11px] text-slate-400 font-mono">{calculationResults.levelInfo.english}</span>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
                    <span className="text-xs text-slate-400">روایی و تکمیل ارزیابی</span>
                    <div className="text-xl font-black text-white font-mono">{toPersianDigits(calculationResults.totalValidResponses)} / ۴۰</div>
                    <span className="text-[11px] text-emerald-400 font-bold">✓ داده‌ها استاندارد و معتبر</span>
                  </div>
                </div>

                {/* Bottleneck Gate Alert */}
                {calculationResults.isGated && (
                  <div className="p-4 bg-amber-500/10 border border-amber-400/20 rounded-2xl text-xs text-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-black text-amber-300 mb-0.5">اعمال اصل گیت گلوگاه (Bottleneck Gate):</strong>
                      {calculationResults.gateExplanation}
                    </div>
                  </div>
                )}
              </div>

              {/* 7 Dimensions Heatmap */}
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span>ماتریس مقایسه ابعاد ۷‌گانه (وضعیت فعلی در برابر هدف)</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="py-3 px-2 font-bold">بُعد ارزیابی</th>
                        <th className="py-3 px-2 font-bold font-mono">وزن</th>
                        <th className="py-3 px-2 font-bold">امتیاز فعلی</th>
                        <th className="py-3 px-2 font-bold">وضعیت هدف</th>
                        <th className="py-3 px-2 font-bold">شکاف</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {HOOSHRAAN_DIMENSIONS_V11.map((dim) => {
                        const stats = calculationResults.dimensionStats[dim.key];
                        return (
                          <tr key={dim.key} className="hover:bg-white/[0.02] transition">
                            <td className="py-3.5 px-2 font-bold text-white flex items-center gap-2">
                              <span className="text-slate-400">{DIMENSION_ICONS[dim.key]}</span>
                              <span>{dim.titleFa}</span>
                            </td>
                            <td className="py-3.5 px-2 font-mono text-slate-400">{dim.weight}٪</td>
                            <td className="py-3.5 px-2 font-mono font-bold text-white text-sm">{stats.score.toFixed(2)}</td>
                            <td className="py-3.5 px-2 font-mono text-blue-300">سطح {toPersianDigits(stats.target)}</td>
                            <td className="py-3.5 px-2 font-mono">
                              <span className={`px-2 py-0.5 rounded-md font-bold ${
                                stats.gap > 1.5 ? 'bg-rose-500/20 text-rose-300' : stats.gap > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}>
                                {stats.gap > 0 ? `+${stats.gap.toFixed(2)}` : stats.gap.toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-5">
                <button
                  onClick={() => setStep('current_assessment')}
                  className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-white/10"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>بازبینی پاسخ‌ها</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود فایل رسمی PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating PDF Generation Toast */}
      {isExportingPdf && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 text-xs font-bold animate-in fade-in">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400 shrink-0" />
          <span>{pdfProgressText || 'در حال آماده‌سازی و دانلود فایل PDF گزارش...'}</span>
        </div>
      )}

      {/* N/A Reason Modal */}
      {editingNaCode && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/10 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>ثبت دلیل انتخاب گزینه N/A (الزامی)</span>
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-white/10 text-slate-300 rounded-lg">
                {editingNaCode}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              ذکر دلیل دقیق برای خارج کردن این مؤلفه از مخرج ارزیابی سازمان الزامی است:
            </p>

            <textarea
              rows={3}
              value={tempNaReason}
              onChange={(e) => setTempNaReason(e.target.value)}
              placeholder="مثال: سازمان فاقد واحد توسعه محصول نرم‌افزاری مستقل است..."
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-xs font-medium text-white focus:border-blue-500/60 outline-none leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingNaCode(null);
                  setTempNaReason('');
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold rounded-xl text-xs transition"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmNa}
                disabled={!tempNaReason.trim()}
                className={`px-5 py-2 font-bold rounded-xl text-xs transition ${
                  tempNaReason.trim()
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    : 'bg-white/5 text-slate-600 cursor-not-allowed'
                }`}
              >
                تأیید و ثبت N/A
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};