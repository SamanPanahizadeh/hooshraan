import React, { useState, useMemo, useEffect } from 'react';
import {
  HOOSHRAAN_DIMENSIONS_V11,
  HOOSHRAAN_QUESTIONS_V11,
  HOOSHRAAN_TARGET_QUESTIONS_V11,
  HOOSHRAAN_MATURITY_LEVELS_V11,
  HOOSHRAAN_RECOMMENDATION_MAPPING,
  DiagnosticQuestionV11,
  DimensionDefV11,
} from '../data/diagnosticDataV11';
import { getPersianJalaliDate, toPersianDigits } from '../utils/jalaliDate';
import { HoushranEmblem } from './HoushranEmblem';
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
  ChevronRight,
  Lock,
  Building2,
  Calendar,
  Zap,
  Target,
  BarChart3,
  HelpCircle,
  Clock,
  Send,
  Sliders,
  FileText,
  FileCheck,
} from 'lucide-react';

interface QuestionResponseState {
  value?: number | 'NA';
  evidence?: 'self-report' | 'documented' | 'observed';
  naReason?: string;
}

interface TargetResponseState {
  [dimensionKey: string]: number; // 1-5
}

interface AmbitionResponseState {
  outcome: string; // A01
  constraint: string; // A02
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
  // Steps: 'intro' | 'current_assessment' | 'target_assessment' | 'report'
  const [step, setStep] = useState<'intro' | 'current_assessment' | 'target_assessment' | 'report'>('intro');
  const [activeDimensionIndex, setActiveDimensionIndex] = useState<number>(0);
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

  // Form States with LocalStorage Hydration
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

  // LocalStorage Auto-Persistence
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

  // AI Deep synthesis state
  const [aiReportText, setAiReportText] = useState<string>('');
  const [isGeneratingAiReport, setIsGeneratingAiReport] = useState<boolean>(false);
  const [activeReportTab, setActiveReportTab] = useState<'summary' | 'heatmap' | 'gaps' | 'roadmap' | 'recommendations' | 'ai_synthesis'>('summary');

  // N/A Modal / Inline state
  const [editingNaCode, setEditingNaCode] = useState<string | null>(null);
  const [tempNaReason, setTempNaReason] = useState<string>('');

  // Report Date in Jalali
  const reportJalaliDate = useMemo(() => getPersianJalaliDate(new Date()), []);

  // Quick Preset Test Scenarios
  const loadPresetLevel = (level: 1 | 2 | 3 | 4 | 5) => {
    const sampleResponses: Record<string, QuestionResponseState> = {};
    HOOSHRAAN_QUESTIONS_V11.forEach((q) => {
      sampleResponses[q.code] = {
        value: level,
        evidence: 'documented',
      };
    });
    setResponses(sampleResponses);
  };

  const loadScaleRiskPreset = () => {
    const sampleResponses: Record<string, QuestionResponseState> = {};
    HOOSHRAAN_QUESTIONS_V11.forEach((q) => {
      if (q.dimensionKey === 'governance') {
        sampleResponses[q.code] = { value: 1, evidence: 'self-report' }; // Gov < 2.0 triggers Scale Risk
      } else {
        sampleResponses[q.code] = { value: 3, evidence: 'documented' };
      }
    });
    setResponses(sampleResponses);
  };

  const loadIncompletePreset = () => {
    const sampleResponses: Record<string, QuestionResponseState> = {};
    // Only answer 10 questions (25% completion < 90% gate)
    HOOSHRAAN_QUESTIONS_V11.slice(0, 10).forEach((q) => {
      sampleResponses[q.code] = { value: 2, evidence: 'documented' };
    });
    setResponses(sampleResponses);
  };

  const resetAllResponses = () => {
    setResponses({});
    setTargetLevels(DEFAULT_TARGET_LEVELS);
    setAmbition(DEFAULT_AMBITION);
    setStep('intro');
    setActiveDimensionIndex(0);
    setActiveQuestionIndex(0);
    setAiReportText('');
    try {
      localStorage.removeItem('hooshraan_responses_v11');
      localStorage.removeItem('hooshraan_active_q_idx_v11');
    } catch (e) {
      console.error(e);
    }
  };

  // Set default sample responses on request for quick testing/demonstration
  const loadSampleData = () => {
    const sampleResponses: Record<string, QuestionResponseState> = {};
    
    // Fill 40 questions with realistic distribution
    const sampleScoreMap: Record<string, number> = {
      S01: 2, S02: 3, S03: 3, S04: 2, S05: 2, // Strategy (mean ~2.4)
      S06: 3, S07: 3, S08: 2, S09: 2, S10: 2, S11: 3, S12: 2, // Business Value (mean ~2.4)
      S13: 2, S14: 2, S15: 2, S16: 1, S17: 2, S18: 2, // People (mean ~1.8)
      S19: 1, S20: 2, S21: 1, S22: 2, S23: 1, S24: 2, // Governance (mean ~1.5 - Scale Risk trigger)
      S25: 3, S26: 2, S27: 2, S28: 3, S29: 2, // Data (mean ~2.4)
      S30: 3, S31: 3, S32: 2, S33: 2, S34: 2, // Tech (mean ~2.4)
      S35: 2, S36: 2, S37: 2, S38: 1, S39: 2, S40: 2, // Org Model (mean ~1.8)
    };

    HOOSHRAAN_QUESTIONS_V11.forEach((q) => {
      const score = sampleScoreMap[q.code] || 2;
      sampleResponses[q.code] = {
        value: score,
        evidence: 'documented',
      };
    });

    setResponses(sampleResponses);
  };

  // Helper to handle response changes
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

  // Current Question & Dimension for Single-Question Workflow
  const currentQuestion = HOOSHRAAN_QUESTIONS_V11[activeQuestionIndex] || HOOSHRAAN_QUESTIONS_V11[0];
  const currentDimension = HOOSHRAAN_DIMENSIONS_V11.find((d) => d.key === currentQuestion.dimensionKey) || HOOSHRAAN_DIMENSIONS_V11[0];
  const currentDimensionIndex = HOOSHRAAN_DIMENSIONS_V11.findIndex((d) => d.key === currentDimension.key);
  const currentDimensionQuestions = useMemo(() => {
    return HOOSHRAAN_QUESTIONS_V11.filter((q) => q.dimensionKey === currentDimension.key);
  }, [currentDimension.key]);
  const currentQuestionIndexInDim = currentDimensionQuestions.findIndex((q) => q.code === currentQuestion.code);

  // Calculations & Analytics based strictly on Specification v1.1
  const calculationResults = useMemo(() => {
    let totalValidResponses = 0;
    const totalQuestions = HOOSHRAAN_QUESTIONS_V11.length; // 40

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
      // Low confidence if > 20% of dimension responses are invalid or N/A
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

    // Completion ratio
    const completionRatio = totalValidResponses / totalQuestions;
    const isCompletionGateMet = completionRatio >= 0.9; // Minimum 90% (>= 36/40)

    // Overall Score 1-5 = sum(Dimension Score * Weight%)
    let overallScore1to5 = 0;
    HOOSHRAAN_DIMENSIONS_V11.forEach((dim) => {
      const stats = dimensionStats[dim.key];
      overallScore1to5 += stats.score * (dim.weight / 100);
    });

    // Overall Score 0-100 = ((Overall Score - 1) / 4) * 100
    const overallScore0to100 = Math.max(0, Math.min(100, ((overallScore1to5 - 1) / 4) * 100));

    // Governance Scale Risk Gate: If Governance maturity < 2.0
    const govScore = dimensionStats['governance']?.score || 1.0;
    const hasScaleRisk = govScore < 2.0;

    // Find weakest critical dimension for conservative bottleneck gate
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

    // Bottleneck gate: Overall level cannot be more than 1 level above the weakest critical dimension
    const maxAllowedLevel = weakestDimensionLevel + 1;
    const isGated = unconstrainedLevel > maxAllowedLevel;
    const finalLevel = isGated ? maxAllowedLevel : unconstrainedLevel;

    const levelInfo = HOOSHRAAN_MATURITY_LEVELS_V11.find((l) => l.level === finalLevel) || HOOSHRAAN_MATURITY_LEVELS_V11[0];
    const unconstrainedLevelInfo = HOOSHRAAN_MATURITY_LEVELS_V11.find((l) => l.level === unconstrainedLevel) || HOOSHRAAN_MATURITY_LEVELS_V11[0];

    // Top Strengths (Dimensions with highest scores or >= 3.0)
    const sortedDimensionsByScore = [...HOOSHRAAN_DIMENSIONS_V11].sort(
      (a, b) => dimensionStats[b.key].score - dimensionStats[a.key].score
    );
    const topStrengths = sortedDimensionsByScore.slice(0, 3).map((dim) => ({
      dimension: dim,
      score: dimensionStats[dim.key].score,
    }));

    // Top 5 Gaps (Sorted by Gap descending)
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

    // Recommendations logic based on priority gap
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
        ? `سطح بلوغ کلی سازمان به دلیل اصل گلوگاه (Bottleneck Gate) به حداکثر یک سطح بالاتر از ضعیف‌ترین بعد کلیدی («${weakestDimension.titleFa}» در سطح ${weakestDimensionLevel}) محدود شده است.`
        : null,
      topStrengths,
      topGaps,
      recommendedServices,
    };
  }, [responses, targetLevels]);

  // Request AI Strategic Synthesis
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-slate-800" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#0066ff]" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <HoushranEmblem height={42} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-1">
              ارزیابی بلوغ هوش مصنوعی سازمان
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              سنجش جامع آمادگی، حاکمیت، ارزش تجاری و مدل عملیاتی هوش مصنوعی در ۷ بعد کلیدی با ۴۰ نشانگر رفتاری استاندارد، تعیین شکاف وضعیت هدف و نقشه راه ۹۰ روزه اجرایی.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end flex-wrap">
            {/* Start Over Button */}
            <button
              type="button"
              onClick={resetAllResponses}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-2 border border-slate-200"
              title="شروع مجدد ارزیابی از ابتدا"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>شروع مجدد</span>
            </button>

            {step === 'report' && (
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>چاپ و خروجی (PDF)</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Steps Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-4 gap-2 sm:gap-4 text-xs font-bold">
          <button
            onClick={() => setStep('intro')}
            className={`flex items-center gap-2 p-3 rounded-xl transition text-right ${
              step === 'intro' ? 'bg-blue-50 text-[#0066ff] border border-blue-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="truncate">۱. مشخصات سازمان</span>
          </button>

          <button
            onClick={() => setStep('current_assessment')}
            className={`flex items-center gap-2 p-3 rounded-xl transition text-right ${
              step === 'current_assessment' ? 'bg-blue-50 text-[#0066ff] border border-blue-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="truncate">۲. ارزیابی ۴۰ مؤلفه فعلی</span>
          </button>

          <button
            onClick={() => setStep('target_assessment')}
            className={`flex items-center gap-2 p-3 rounded-xl transition text-right ${
              step === 'target_assessment' ? 'bg-blue-50 text-[#0066ff] border border-blue-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4 shrink-0" />
            <span className="truncate">۳. وضعیت هدف و جاه‌طلبی</span>
          </button>

          <button
            onClick={() => setStep('report')}
            disabled={!calculationResults.isCompletionGateMet}
            className={`flex items-center gap-2 p-3 rounded-xl transition text-right ${
              step === 'report'
                ? 'bg-blue-50 text-[#0066ff] border border-blue-200'
                : calculationResults.isCompletionGateMet
                ? 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <FileCheck className="w-4 h-4 shrink-0" />
            <span className="truncate">۴. گزارش و نقشه راه</span>
          </button>
        </div>
      </div>

      {/* ================= STEP 1: INTRO & PROFILE ================= */}
      {step === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0066ff]" />
                <span>مشخصات سازمان و تیم ارزیابی (۱۱ مؤلفه زمینه‌ای)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                اطلاعات این بخش در صفحه اول گزارش رسمی و تحلیل‌های سفارشی هوشران درج می‌گردد.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۱. نام سازمان / شرکت</label>
                <input
                  type="text"
                  value={orgProfile.companyName}
                  onChange={(e) => setOrgProfile({ ...orgProfile, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                  placeholder="مثال: شرکت نوآوران هوشمند"
                />
              </div>

              {/* 2. Industry */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۲. صنعت و حوزه فعالیت</label>
                <input
                  type="text"
                  value={orgProfile.industry}
                  onChange={(e) => setOrgProfile({ ...orgProfile, industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                  placeholder="مثال: خدمات مالی / تجارت الکترونیک / تولیدی"
                />
              </div>

              {/* 3. Assessor Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۳. نام و نام خانوادگی ارزیاب</label>
                <input
                  type="text"
                  value={orgProfile.assessorName}
                  onChange={(e) => setOrgProfile({ ...orgProfile, assessorName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                  placeholder="مثال: علی محمدی"
                />
              </div>

              {/* 4. Assessor Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۴. سمت سازمانی ارزیاب</label>
                <input
                  type="text"
                  value={orgProfile.assessorRole}
                  onChange={(e) => setOrgProfile({ ...orgProfile, assessorRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                  placeholder="مثال: مدیر تحول دیجیتال / مدیر ارشد فناوری"
                />
              </div>

              {/* 5. Employee Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۵. مقیاس پرسنلی سازمان</label>
                <select
                  value={orgProfile.employeeCount}
                  onChange={(e) => setOrgProfile({ ...orgProfile, employeeCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="کمتر از ۲۰ نفر">استارتاپ / کمتر از ۲۰ نفر</option>
                  <option value="۲۰ تا ۵۰ نفر">کسب‌وکار در حال رشد (۲۰ تا ۵۰ نفر)</option>
                  <option value="۵۰ تا ۲۵۰ نفر">سازمان متوسط (۵۰ تا ۲۵۰ نفر)</option>
                  <option value="۲۵۰ تا ۱۰۰۰ نفر">سازمان بزرگ (۲۵۰ تا ۱۰۰۰ نفر)</option>
                  <option value="بیش از ۱۰۰۰ نفر">سازمان مقیاس بالا (بیش از ۱۰۰۰ نفر)</option>
                </select>
              </div>

              {/* 6. Current AI Usage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۶. وضعیت فعلی بهره‌برداری از AI</label>
                <select
                  value={orgProfile.aiCurrentUsage}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiCurrentUsage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="استفاده موردی و فردی توسط کارکنان">استفاده موردی و فردی توسط کارکنان</option>
                  <option value="چند پایلوت در تیم‌های منتخب">چند پایلوت در تیم‌های منتخب</option>
                  <option value="استقرار عملیاتی در ۲ یا ۳ فرآیند اصلی">استقرار عملیاتی در ۲ یا ۳ فرآیند اصلی</option>
                  <option value="مقیاس‌گذاری در سطح چند واحد سازمانی">مقیاس‌گذاری در سطح چند واحد سازمانی</option>
                  <option value="یکپارچگی عمیق در استراتژی و محصولات">یکپارچگی عمیق در استراتژی و محصولات</option>
                </select>
              </div>

              {/* 7. AI User Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۷. تعداد کاربران فعال ابزارهای AI</label>
                <select
                  value={orgProfile.aiUserCount}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiUserCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="کمتر از ۱۰ نفر">کمتر از ۱۰ نفر</option>
                  <option value="۱۰ تا ۵۰ نفر">۱۰ تا ۵۰ نفر</option>
                  <option value="۵۰ تا ۲۰۰ نفر">۵۰ تا ۲۰۰ نفر</option>
                  <option value="بیش از ۲۰۰ نفر">بیش از ۲۰۰ نفر</option>
                </select>
              </div>

              {/* 8. AI Strategy Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۸. وضعیت سند راهبردی AI</label>
                <select
                  value={orgProfile.aiStrategyStatus}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiStrategyStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="هنوز اقدامی صورت نگرفته است">هنوز اقدامی صورت نگرفته است</option>
                  <option value="برنامه‌ریزی غیررسمی و پراکنده">برنامه‌ریزی غیررسمی و پراکنده</option>
                  <option value="پیش‌نویس اولیه در دست بررسی">پیش‌نویس اولیه در دست بررسی</option>
                  <option value="سند راهبردی مصوب هیئت‌مدیره وجود دارد">سند راهبردی مصوب هیئت‌مدیره وجود دارد</option>
                </select>
              </div>

              {/* 9. AI Policy Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۹. وضعیت خط‌مشی حاکمیت و امنیت AI</label>
                <select
                  value={orgProfile.aiPolicyStatus}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiPolicyStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="خط‌مشی مکتوبی وجود ندارد">خط‌مشی مکتوبی وجود ندارد</option>
                  <option value="خط‌مشی غیررسمی و اولیه">خط‌مشی غیررسمی و اولیه</option>
                  <option value="سند جامع مکتوب و ابلاغ‌شده به کارکنان">سند جامع مکتوب و ابلاغ‌شده به کارکنان</option>
                </select>
              </div>

              {/* 10. AI Use Cases Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۱۰. موارد کاربرد (Use Cases) شناسایی‌شده</label>
                <select
                  value={orgProfile.aiUseCasesCount}
                  onChange={(e) => setOrgProfile({ ...orgProfile, aiUseCasesCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="هنوز شناسایی نشده است">هنوز شناسایی نشده است</option>
                  <option value="۱ تا ۲ مورد آزمایشی">۱ تا ۲ مورد آزمایشی</option>
                  <option value="۳ تا ۵ مورد در حال آزمون">۳ تا ۵ مورد در حال آزمون</option>
                  <option value="بیش از ۵ مورد دارای اولویت و ROI">بیش از ۵ مورد دارای اولویت و ROI</option>
                </select>
              </div>

              {/* 11. Digital Maturity */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">۱۱. سطح آمادگی دیجیتال و داده‌ای سازمان</label>
                <select
                  value={orgProfile.digitalMaturity}
                  onChange={(e) => setOrgProfile({ ...orgProfile, digitalMaturity: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0066ff] outline-none"
                >
                  <option value="سنتی و وابسته به فرآیندهای دستی">سنتی و وابسته به فرآیندهای دستی</option>
                  <option value="متوسط و در حال مدرن‌سازی سامانه‌ها">متوسط و در حال مدرن‌سازی سامانه‌ها</option>
                  <option value="دیجیتال و دارای انباره داده متمرکز">دیجیتال و دارای انباره داده متمرکز</option>
                  <option value="پیشرو دیجیتال با زیرساخت یکپارچه ابری/محلی">پیشرو دیجیتال با زیرساخت یکپارچه ابری/محلی</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep('current_assessment')}
                className="px-6 py-3 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-sm transition shadow-sm flex items-center gap-2"
              >
                <span>ورود به سنجش ۴۰ مؤلفه رفتاری</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-blue-300 flex items-center gap-2">
              <Info className="w-5 h-5" />
              <span>اصول روش‌شناسی نسخه ۱.۱ هوشران</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">۷ بُعد وزن‌دهی‌شده:</span>
                شامل استراتژی (۱۵٪)، ارزش کسب‌وکار (۲۰٪)، مهارت و فرهنگ (۱۵٪)، حاکمیت (۱۵٪)، داده (۱۵٪)، مهندسی (۱۰٪) و مدل عملیاتی (۱۰٪).
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">اصل گیت گلوگاه (Bottleneck Gate):</span>
                سطح بلوغ کلی نمی‌تواند بیش از ۱ پله بالاتر از ضعیف‌ترین بعد کلیدی سازمان باشد تا از ایجاد جزایر ناپایدار جلوگیری شود.
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">پایش ریسک مقیاس (Scale Risk):</span>
                در صورت کسب امتیاز کمتر از ۲ در بعد حاکمیت و ریسک، هشدار بحرانی برای جلوگیری از نقض داده‌ها فعال می‌شود.
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">گزینه N/A با دلیل اجباری:</span>
                پاسخ‌های نامربوط تنها با ذکر دلیل از مخرج محاسبات آماری کنار گذاشته می‌شوند.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CURRENT ASSESSMENT (SINGLE-QUESTION PER SCREEN) ================= */}
      {step === 'current_assessment' && (
        <div className="space-y-6">
          
          {/* Dimension Tabs / Overall Navigation */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
            {HOOSHRAAN_DIMENSIONS_V11.map((dim, idx) => {
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
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                    isCurrentDim
                      ? 'bg-[#0066ff] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <span className={isCurrentDim ? 'text-white' : 'text-slate-500'}>
                    {DIMENSION_ICONS[dim.key]}
                  </span>
                  <span>{dim.titleFa}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isCurrentDim ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {stats ? `${toPersianDigits(stats.validCount + stats.naCount)}/${toPersianDigits(dim.questionCodes.length)}` : `۰/${toPersianDigits(dim.questionCodes.length)}`}
                  </span>
                  {isComplete && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Question Progress Header Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-[#0066ff] rounded-xl shrink-0">
                  {DIMENSION_ICONS[currentDimension.key]}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100/70 text-[#0066ff] rounded-md">
                      بُعد {toPersianDigits(currentDimensionIndex + 1)} از ۷: {currentDimension.titleFa}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold">
                      وزن در ارزیابی: {toPersianDigits(currentDimension.weight)}٪
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      (مؤلفه {toPersianDigits(currentQuestionIndexInDim + 1)} از {toPersianDigits(currentDimensionQuestions.length)} در این بُعد)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{currentDimension.description}</p>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-slate-600 shrink-0 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                <span>پیشرفت کلی: </span>
                <strong className="text-slate-900 font-black text-sm">
                  سوال {toPersianDigits(activeQuestionIndex + 1)} از ۴۰
                </strong>
                <span className="text-slate-400 mx-1">|</span>
                <span className="text-[#0066ff] font-bold">
                  {toPersianDigits(Math.round(((activeQuestionIndex + 1) / 40) * 100))}٪
                </span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-[#0066ff] h-full rounded-full transition-all duration-300"
                style={{ width: `${((activeQuestionIndex + 1) / 40) * 100}%` }}
              />
            </div>
          </div>

          {/* SINGLE QUESTION CARD (Spacious & Legible) */}
          {(() => {
            const currentResp = responses[currentQuestion.code];
            const currentValue = currentResp?.value;
            const isAnswered = currentValue !== undefined;

            return (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm space-y-6">
                
                {/* Question Header & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-mono font-black rounded-lg">
                      {currentQuestion.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      سوال {toPersianDigits(activeQuestionIndex + 1)} از ۴۰
                    </span>
                    {isAnswered && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>پاسخ ثبت شده</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectResponse(currentQuestion.code, 'NA')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                        currentValue === 'NA'
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                      }`}
                      title="نامربوط یا غیرقابل اعمال (با دلیل اجباری)"
                    >
                      N/A (نامربوط در سازمان)
                    </button>
                  </div>
                </div>

                {/* Main Question Text */}
                <div className="py-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-relaxed sm:leading-loose">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    بر اساس شواهد و وضعیت فعلی سازمان خود، نزدیک‌ترین رفتار و سطح عملیاتی را از میان گزینه‌های زیر انتخاب نمایید:
                  </p>
                </div>

                {/* N/A Reason Display if active */}
                {currentValue === 'NA' && currentResp?.naReason && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong>دلیل ثبت‌شده برای N/A:</strong> {currentResp.naReason}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNaCode(currentQuestion.code);
                        setTempNaReason(currentResp.naReason || '');
                      }}
                      className="text-[#0066ff] underline text-xs font-bold shrink-0"
                    >
                      ویرایش دلیل
                    </button>
                  </div>
                )}

                {/* 5 Behavioral Anchor Level Cards (1 to 5) */}
                <div className="space-y-3.5">
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
                        className={`w-full text-right p-4 sm:p-5 rounded-2xl transition border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-[#0066ff] ring-2 ring-[#0066ff]/20 shadow-sm'
                            : 'bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 border-slate-200/80'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs sm:text-sm font-black ${
                              isSelected ? 'text-[#0066ff]' : 'text-slate-900'
                            }`}>
                              {levelTitles[lvl]}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {label.replace(/سطح \d+ \((.*?)\)/, '$1')}
                            </span>
                          </div>

                          <p className={`text-xs sm:text-sm leading-relaxed sm:leading-loose ${
                            isSelected ? 'text-slate-800 font-medium' : 'text-slate-600'
                          }`}>
                            {desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected
                              ? 'border-[#0066ff] bg-[#0066ff] text-white shadow-xs'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`text-xs font-bold sm:hidden ${
                            isSelected ? 'text-[#0066ff]' : 'text-slate-500'
                          }`}>
                            {isSelected ? 'انتخاب‌شده' : 'انتخاب'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Evidence Level Selection (Optional) */}
                {typeof currentValue === 'number' && (
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <span className="text-slate-600 font-bold">
                      مبنا و شواهد این ارزیابی در سازمان (اختیاری):
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['self-report', 'documented', 'observed'] as const).map((ev) => {
                        const evLabels: Record<string, string> = {
                          'self-report': 'خوداظهاری',
                          'documented': 'مستندات مکتوب و مصوب',
                          'observed': 'مشاهده مستقیم در فرآیند',
                        };
                        const isEv = currentResp?.evidence === ev;

                        return (
                          <button
                            key={ev}
                            type="button"
                            onClick={() => handleSelectResponse(currentQuestion.code, currentValue, ev)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                              isEv
                                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
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

          {/* Navigation Controls (Single Question Pagination) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4">
            
            {/* Previous Question Button */}
            <button
              type="button"
              onClick={() => {
                if (activeQuestionIndex > 0) {
                  setActiveQuestionIndex(activeQuestionIndex - 1);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                } else {
                  setStep('intro');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{activeQuestionIndex > 0 ? 'سوال قبلی' : 'بازگشت به مشخصات'}</span>
            </button>

            {/* Quick Status Pill */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>سوال {toPersianDigits(activeQuestionIndex + 1)} از ۴۰</span>
              <span className="text-slate-300">•</span>
              <span>{toPersianDigits(calculationResults.totalValidResponses)} پاسخ ثبت‌شده</span>
            </div>

            {/* Next Question / Next Stage Button */}
            {activeQuestionIndex < HOOSHRAAN_QUESTIONS_V11.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  setActiveQuestionIndex(activeQuestionIndex + 1);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-sm flex items-center gap-2"
              >
                <span>سوال بعدی ({toPersianDigits(activeQuestionIndex + 2)} از ۴۰)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep('target_assessment');
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md shadow-emerald-500/20 flex items-center gap-2"
              >
                <span>مرحله بعدی: تعیین اهداف و چشم‌انداز</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 3: TARGET STATE & AMBITION ================= */}
      {step === 'target_assessment' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#0066ff]" />
                <span>تعیین سطح هدف ابعاد ۷‌گانه (افق ۱۲ تا ۲۴ ماه آینده)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                سطح بلوغ مطلوبی که سازمان می‌خواهد در هر بُعد طی ۱۲ الی ۲۴ ماه آینده به آن دست یابد را مشخص نمایید.
              </p>
            </div>

            {/* 7 Target Dimension Sliders/Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOOSHRAAN_TARGET_QUESTIONS_V11.filter((t) => t.type === 'level').map((targetQ, idx) => {
                const currentScore = calculationResults.dimensionStats[targetQ.dimensionKey]?.score || 1;
                const targetValue = targetLevels[targetQ.dimensionKey] || 3;
                const gap = targetValue - currentScore;

                return (
                  <div key={targetQ.code} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-800 text-white rounded">
                          {targetQ.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{targetQ.dimensionTitleFa}</h4>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        فعلی: <strong className="text-slate-800">{currentScore.toFixed(1)}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{targetQ.question}</p>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      {([1, 2, 3, 4, 5] as const).map((lvl) => {
                        const isTarget = targetValue === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setTargetLevels({ ...targetLevels, [targetQ.dimensionKey]: lvl })}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                              isTarget
                                ? 'bg-[#0066ff] text-white shadow-sm'
                                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            سطح {toPersianDigits(lvl)}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                      <span>شکاف تحول (Gap):</span>
                      <span className={`font-bold font-mono ${gap > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {gap > 0 ? `+${gap.toFixed(1)} پله شکاف` : 'هم‌سطح یا بالاتر'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2 Ambition Questions */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>سؤالات چشم‌انداز و جاه‌طلبی سازمان (Ambition)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    A01. مهم‌ترین نتیجه‌ای که سازمان می‌خواهد از AI در ۱۲ تا ۲۴ ماه آینده به دست آورد چیست؟
                  </label>
                  <textarea
                    rows={3}
                    value={ambition.outcome}
                    onChange={(e) => setAmbition({ ...ambition, outcome: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0066ff] outline-none leading-relaxed"
                    placeholder="مثال: خودکارسازی ۵۰ درصدی فرآیندهای تحلیل داده، رشد فروش و پاسخگویی به مشتریان..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    A02. مهم‌ترین محدودیت یا مانع فعلی سازمان برای رسیدن به این نتیجه چیست؟
                  </label>
                  <textarea
                    rows={3}
                    value={ambition.constraint}
                    onChange={(e) => setAmbition({ ...ambition, constraint: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0066ff] outline-none leading-relaxed"
                    placeholder="مثال: مقاومت به تغییر، کمبود مهارت‌های فنی و عدم یکپارچگی خط لوله داده‌های سازمانی..."
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep('current_assessment')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به ارزیابی مؤلفه‌ها</span>
              </button>

              <button
                onClick={() => {
                  setStep('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!calculationResults.isCompletionGateMet}
                className={`px-8 py-3 font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-2 ${
                  calculationResults.isCompletionGateMet
                    ? 'bg-[#0066ff] hover:bg-[#0050cb] text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>مشاهده گزارش جامع عارضه‌یابی و نقشه راه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: OFFICIAL DIAGNOSTIC REPORT ================= */}
      {step === 'report' && (
        <div className="space-y-8 print:p-0 print:space-y-6">
          
          {/* Official Report Title Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm print:border-none print:shadow-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <HoushranEmblem height={48} />
                <div>
                  <span className="text-[11px] font-bold text-[#0066ff] uppercase tracking-wider block">
                    چارچوب ارزیابی بلوغ هوش مصنوعی هوشران (نسخه ۱.۱)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    گزارش رسمی عارضه‌یابی بلوغ هوش مصنوعی سازمان
                  </h2>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none">
                <div>سازمان: <strong className="text-slate-900">{orgProfile.companyName}</strong></div>
                <div>حوزه: <span className="text-slate-700">{orgProfile.industry}</span> ({orgProfile.employeeCount})</div>
                <div>ارزیاب: <span className="text-slate-700">{orgProfile.assessorName}</span> ({orgProfile.assessorRole})</div>
                <div className="text-[#0066ff] font-bold">تاریخ گزارش: {reportJalaliDate}</div>
              </div>
            </div>

            {/* Key Metric Score Badges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {/* Overall Score 1-5 */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-[#0066ff] block">امتیاز کل بلوغ (۱ تا ۵)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {calculationResults.overallScore1to5.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500">از ۵.۰</span>
                </div>
                <span className="text-[11px] text-slate-500 block">میانگین موزون ۷ بعد</span>
              </div>

              {/* Overall Score 0-100 */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-200/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-indigo-700 block">شاخص استاندارد (۰ تا ۱۰۰)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {calculationResults.overallScore0to100.toFixed(1)}٪
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">مقیاس تبدیل خطی ۱۰۰ گانه</span>
              </div>

              {/* Final Maturity Level */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-xl space-y-1">
                <span className="text-xs font-bold text-emerald-800 block">سطح بلوغ سازمانی</span>
                <div className="text-lg font-black text-slate-900">
                  سطح {toPersianDigits(calculationResults.finalLevel)}: {calculationResults.levelInfo.fa}
                </div>
                <span className="text-[11px] text-slate-600 block font-mono">
                  {calculationResults.levelInfo.english}
                </span>
              </div>

              {/* Completion & Confidence */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-700 block">درصد تکمیل و روایی داده</span>
                <div className="text-lg font-black text-slate-900 font-mono">
                  {toPersianDigits(calculationResults.totalValidResponses)} / ۴۰
                </div>
                <span className="text-[11px] text-emerald-700 font-bold block">
                  ✓ داده‌های ارزیابی معتبر (۱۰۰٪ استاندارد)
                </span>
              </div>
            </div>

            {/* Critical Bottleneck Gate Alert if Active */}
            {calculationResults.isGated && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-amber-950 mb-0.5">
                    اعمال اصل گیت گلوگاه (Conservative Bottleneck Gate):
                  </strong>
                  {calculationResults.gateExplanation}
                </div>
              </div>
            )}

            {/* Scale Risk Alert if Active */}
            {calculationResults.hasScaleRisk && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-red-950 mb-0.5">
                    هشدار بحرانی ریسک مقیاس‌پذیری (Scale Risk):
                  </strong>
                  بلوغ بعد «حاکمیت، ریسک و اعتماد» کمتر از سطح ۲.۰ ({calculationResults.dimensionStats['governance'].score.toFixed(1)}) است. مقیاس‌گذاری ابزارهای هوش مصنوعی بدون تدوین خط‌مشی مکتوب و طبقه‌بندی ریسک داده‌ها می‌تواند سازمان را با خطرات امنیتی و نقض حریم خصوصی مواجه سازد.
                </div>
              </div>
            )}
          </div>

          {/* Report Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 print:hidden overflow-x-auto">
            <button
              onClick={() => setActiveReportTab('summary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === 'summary' ? 'bg-[#0066ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              خلاصه مدیریتی و تحلیل بلوغ
            </button>
            <button
              onClick={() => setActiveReportTab('heatmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === 'heatmap' ? 'bg-[#0066ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ماتریس حرارتی ابعاد ۷‌گانه (Heatmap)
            </button>
            <button
              onClick={() => setActiveReportTab('gaps')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === 'gaps' ? 'bg-[#0066ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              تحلیل قوت‌ها و ۵ شکاف اصلی
            </button>
            <button
              onClick={() => setActiveReportTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === 'roadmap' ? 'bg-[#0066ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              برنامه ۹۰ روزه و نقشه راه ۱۲ ماهه
            </button>
            <button
              onClick={() => setActiveReportTab('recommendations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === 'recommendations' ? 'bg-[#0066ff] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              پیشنهادهای راهبردی هوشران
            </button>
            <button
              onClick={() => setActiveReportTab('ai_synthesis')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeReportTab === 'ai_synthesis' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>سنتز تحلیلی هوشمند (AI Analysis)</span>
            </button>
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {(activeReportTab === 'summary' || activeReportTab === 'heatmap' || activeReportTab === 'gaps' || activeReportTab === 'roadmap' || activeReportTab === 'recommendations') && (
            <div className="space-y-6">
              
              {/* Executive Summary Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0066ff]" />
                  <span>۱. خلاصه مدیریتی (Executive Summary)</span>
                </h3>
                
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3">
                  <p>
                    بر اساس ارزیابی نظام‌مند ۴۰ مؤلفه رفتاری در ۷ بُعد کلیدی، سازمان <strong>«{orgProfile.companyName}»</strong> موفق به کسب امتیاز کل <strong>{calculationResults.overallScore1to5.toFixed(2)} از ۵.۰</strong> گردید و در سطح بلوغ <strong>«{calculationResults.levelInfo.fa} ({calculationResults.levelInfo.english})»</strong> قرار گرفت.
                  </p>
                  <p className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs">
                    <strong>توصیف وضعیت رفتاری سطح فعلی:</strong> {calculationResults.levelInfo.behavioralAnchor}
                    <br />
                    <strong>اقدام کلیدی در فاز بعدی:</strong> {calculationResults.levelInfo.primaryNextAction}
                  </p>
                </div>
              </div>

              {/* TAB 2: SEVEN DIMENSION HEATMAP */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#0066ff]" />
                    <span>۲. ماتریس حرارتی ابعاد ۷‌گانه (Seven Dimension Heatmap)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">وضعیت فعلی در برابر هدف</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                        <th className="p-3 font-black">بُعد ارزیابی</th>
                        <th className="p-3 font-bold font-mono">وزن</th>
                        <th className="p-3 font-bold">امتیاز فعلی (۱-۵)</th>
                        <th className="p-3 font-bold">وضعیت هدف</th>
                        <th className="p-3 font-bold">شکاف (Gap)</th>
                        <th className="p-3 font-bold">شاخص اطمینان (Confidence)</th>
                        <th className="p-3 font-bold">نمودار پیشرفت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {HOOSHRAAN_DIMENSIONS_V11.map((dim) => {
                        const stats = calculationResults.dimensionStats[dim.key];
                        const gap = stats.gap;
                        const pctCurrent = ((stats.score - 1) / 4) * 100;
                        const pctTarget = ((stats.target - 1) / 4) * 100;

                        return (
                          <tr key={dim.key} className="hover:bg-slate-50/60 transition">
                            <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                              <span className="text-slate-500">{DIMENSION_ICONS[dim.key]}</span>
                              <span>{dim.titleFa}</span>
                            </td>
                            <td className="p-3 font-mono text-slate-600 font-bold">{dim.weight}٪</td>
                            <td className="p-3 font-mono font-black text-slate-900 text-sm">
                              {stats.score.toFixed(2)}
                            </td>
                            <td className="p-3 font-mono font-bold text-blue-700">
                              سطح {toPersianDigits(stats.target)}
                            </td>
                            <td className="p-3 font-mono font-bold">
                              <span className={`px-2 py-0.5 rounded ${
                                gap > 1.5 ? 'bg-red-50 text-red-700' : gap > 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                              }`}>
                                {gap > 0 ? `+${gap.toFixed(2)}` : `${gap.toFixed(2)}`}
                              </span>
                            </td>
                            <td className="p-3">
                              {stats.isLowConfidence ? (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                                  اطمینان پایین (Low Conf.)
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold text-[10px]">
                                  اطمینان بالا (High Conf.)
                                </span>
                              )}
                            </td>
                            <td className="p-3 w-44">
                              <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="absolute top-0 right-0 h-full bg-blue-300 rounded-full opacity-50"
                                  style={{ width: `${pctTarget}%` }}
                                  title={`هدف: ${stats.target}`}
                                />
                                <div
                                  className="absolute top-0 right-0 h-full bg-[#0066ff] rounded-full"
                                  style={{ width: `${pctCurrent}%` }}
                                  title={`فعلی: ${stats.score.toFixed(2)}`}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TAB 3: TOP STRENGTHS & TOP 5 GAPS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Strengths */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>قوت‌های کلیدی سازمان (Top Strengths)</span>
                  </h3>
                  <div className="space-y-2.5">
                    {calculationResults.topStrengths.map((str, idx) => (
                      <div key={str.dimension.key} className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">
                            {idx + 1}
                          </span>
                          <span>{str.dimension.titleFa}</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-800">
                          امتیاز: {str.score.toFixed(2)} از ۵
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top 5 Gaps */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span>۵ شکاف اولویت‌دار اصلی (Top 5 Priority Gaps)</span>
                  </h3>
                  <div className="space-y-2.5">
                    {calculationResults.topGaps.map((gapItem, idx) => (
                      <div key={gapItem.dimension.key} className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-mono">
                            {idx + 1}
                          </span>
                          <span>{gapItem.dimension.titleFa}</span>
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-slate-500 text-[11px]">شکاف: </span>
                          <strong className="text-amber-800">+{gapItem.gap.toFixed(2)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TAB 4: 90-DAY ACTION PLAN & 6-12 MONTH ROADMAP */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0066ff]" />
                  <span>۳. برنامه اقدام ۹۰ روزه و نقشه راه ۱۲ ماهه</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Phase 1 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <span>فاز ۱: روز ۱ تا ۳۰</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-[#0066ff] rounded text-[10px]">پایه‌گذاری</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside leading-relaxed">
                      <li>تدوین خط‌مشی مکتوب استفاده امن از AI (AI Policy).</li>
                      <li>فهرست‌برداری و اولویت‌بندی Use Caseهای کسب‌وکار.</li>
                      <li>آغاز کارگاه آموزش سواد هوش مصنوعی برای لایه‌های کلیدی.</li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <span>فاز ۲: روز ۳۱ تا ۶۰</span>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px]">پایلوت و نظارت</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside leading-relaxed">
                      <li>استقرار ۲ الی ۳ پایلوت اولویت‌دار با KPI مشخص.</li>
                      <li>راه‌اندازی فرآیند نظارت انسانی (Human Oversight).</li>
                      <li>اتصال و پاکسازی اولیه خط لوله داده‌های موردنیاز.</li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <span>فاز ۳: روز ۶۱ تا ۹۰</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px]">تثبیت و مقیاس</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside leading-relaxed">
                      <li>سنجش ROI و تصمیم‌گیری توسعه یا توقف پایلوت‌ها.</li>
                      <li>ایجاد شبکه مروجان داخلی (AI Champions).</li>
                      <li>برنامه‌ریزی فازهای مقیاس‌پذیری و بازطراحی گردش‌کارها.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TAB 5: HOOSHRAAN RECOMMENDATIONS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0066ff]" />
                    <span>۴. پیشنهادهای راهبردی هوشران (Hooshraan Diagnostic Recommendations)</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">منطبق بر نگاشت نظام‌مند شکاف‌های اولویت‌دار</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calculationResults.recommendedServices.slice(0, 3).map((rec, idx) => (
                    <div key={rec.dimKey} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-[10px] font-mono">
                            {idx + 1}
                          </span>
                          <strong className="text-slate-900">{rec.serviceTitleFa}</strong>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 block mb-2">{rec.serviceName}</span>
                        <p className="text-slate-600 leading-relaxed">{rec.rationale}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 text-[11px] font-bold text-[#0066ff]">
                        پاسخ به شکاف بُعد «{rec.dimTitleFa}»
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
                  <strong>خط‌مشی هوشران:</strong> پیشنهادهای فوق صرفاً خروجی تشخیصی و راهبردی مبتنی بر منطق شکاف بوده و تعهد تجاری ایجاد نمی‌کند.
                </p>
              </div>

              {/* Methodological Status Note (Mandatory v1.1) */}
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed space-y-1">
                <span className="font-bold text-slate-800 block">وضعیت روش‌شناختی چارچوب هوشران (نسخه ۱.۱):</span>
                این ارزیابی بر مبنای چارچوب بلوغ و بانک سؤالات هوشران (نسخه ۱.۱) پیاده‌سازی شده و آماده اجرا است؛ داده‌های پایلوت واقعی برای تحلیل آیتم‌ها، پایایی و اعتبارسنجی روان‌سنجی در دوره‌های آتی گردآوری خواهند شد.
              </div>
            </div>
          )}

          {/* TAB 6: AI DEEP STRATEGIC SYNTHESIS */}
          {activeReportTab === 'ai_synthesis' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>تحلیل عمیق و سنتز راهبردی مبتنی بر هوش مصنوعی هوشران</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    تولید گزارش مشاوره‌ای تفصیلی با اتکا به داده‌های ۴۰ مؤلفه، شکاف‌های شناسایی‌شده و جاه‌طلبی سازمان.
                  </p>
                </div>

                <button
                  onClick={handleGenerateAiReport}
                  disabled={isGeneratingAiReport}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-sm shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isGeneratingAiReport ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAiReport ? 'در حال نگارش گزارش...' : 'تولید مجدد تحلیل هوشمند'}</span>
                </button>
              </div>

              {aiReportText ? (
                <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-xl border border-slate-200/80">
                  {aiReportText}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">سنتز هوشمند هنوز تولید نشده است</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      با کلیک بر روی دکمه زیر، گزارش تحلیلی مشاوره‌ای هوشران بر مبنای تمام داده‌های ثبت‌شده سازمان به صورت لحظه‌ای تدوین خواهد شد.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateAiReport}
                    disabled={isGeneratingAiReport}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-sm inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>تولید گزارش تحلیلی هوشمند هوشران</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Bar Controls */}
          <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm print:hidden">
            <button
              onClick={() => setStep('current_assessment')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازبینی و ویرایش پاسخ‌ها</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>چاپ و ذخیره PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= N/A REASON MODAL ================= */}
      {editingNaCode && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>ثبت دلیل انتخاب گزینه N/A (الزامی)</span>
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-800 text-white rounded">
                {editingNaCode}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              بر اساس چارچوب نسخه ۱.۱ هوشران، انتخاب N/A صرفاً در صورتی مجاز است که مؤلفه واقعاً در ساختار سازمان کاربرد نداشته باشد و ذکر دلیل دقیق الزامی است.
            </p>

            <textarea
              rows={3}
              value={tempNaReason}
              onChange={(e) => setTempNaReason(e.target.value)}
              placeholder="مثال: سازمان فاقد واحد توسعه محصول نرم‌افزاری مستقل است و این فرآیند برون‌سپاری شده است..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0066ff] outline-none leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingNaCode(null);
                  setTempNaReason('');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirmNa}
                disabled={!tempNaReason.trim()}
                className={`px-5 py-2 font-bold rounded-xl text-xs transition ${
                  tempNaReason.trim()
                    ? 'bg-[#0066ff] hover:bg-[#0050cb] text-white shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
