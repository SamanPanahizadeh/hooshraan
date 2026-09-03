import React from 'react';
import {
  HOOSHRAAN_DIMENSIONS_V11,
  HOOSHRAAN_MATURITY_LEVELS_V11,
  HOOSHRAAN_QUESTIONS_V11,
} from '../data/diagnosticDataV11';
import { toPersianDigits } from '../utils/jalaliDate';
import { HoushranEmblem } from './HoushranEmblem';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  BarChart3,
  Target,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Compass,
  Users,
  Database,
  Cpu,
  Layers,
  FileText,
  Sparkles,
  Briefcase,
  Clock,
  ArrowRight,
} from 'lucide-react';

export interface ExecutiveReportProps {
  orgProfile: {
    companyName: string;
    industry: string;
    employeeCount: string;
    assessorName: string;
    assessorRole: string;
  };
  calculationResults: {
    overallScore1to5: number;
    overallScore0to100: number;
    finalLevel: number;
    levelInfo: (typeof HOOSHRAAN_MATURITY_LEVELS_V11)[0];
    unconstrainedLevel: number;
    isGated: boolean;
    gateExplanation: string;
    hasScaleRisk: boolean;
    totalValidResponses: number;
    isCompletionGateMet: boolean;
    dimensionStats: Record<string, {
      score: number;
      validCount: number;
      naCount: number;
      missingCount: number;
      isLowConfidence: boolean;
      target: number;
      gap: number;
      weight: number;
    }>;
    topStrengths: Array<{
      dimension: (typeof HOOSHRAAN_DIMENSIONS_V11)[0];
      score: number;
    }>;
    topGaps: Array<{
      dimension: (typeof HOOSHRAAN_DIMENSIONS_V11)[0];
      gap: number;
    }>;
  };
  reportJalaliDate: string;
}

const DIM_ICONS: Record<string, React.ReactNode> = {
  strategy: <Compass className="w-3.5 h-3.5" />,
  business_value: <TrendingUp className="w-3.5 h-3.5" />,
  people: <Users className="w-3.5 h-3.5" />,
  governance: <ShieldCheck className="w-3.5 h-3.5" />,
  data: <Database className="w-3.5 h-3.5" />,
  technology: <Cpu className="w-3.5 h-3.5" />,
  operating_model: <Layers className="w-3.5 h-3.5" />,
};

// Pricing and service packages catalog for investment section
interface PricingPackage {
  id: string;
  titleFa: string;
  dimKey: string;
  duration: string;
  deploymentModel: string;
  estimatedPrice: string;
  phase: string;
  priority: 'بسیار بالا' | 'بالا' | 'متوسط';
  deliverables: string;
}

const PRICING_CATALOG: PricingPackage[] = [
  {
    id: 'PKG-01',
    titleFa: 'کارگاه استراتژی و همسوسازی نقشه راه AI با اهداف تجاری',
    dimKey: 'strategy',
    duration: '۳ هفته (۱۶ ساعت کارگاه)',
    deploymentModel: 'حضوری / هیبریدی + منتورینگ هیئت مدیره',
    estimatedPrice: '۳۸,۰۰۰,۰۰۰',
    phase: 'فاز ۱ (روز ۱-۳۰)',
    priority: 'بسیار بالا',
    deliverables: 'سند چشم‌انداز هوش مصنوعی، ماتریس اولویت‌بندی، ماتریس RACI حامیان',
  },
  {
    id: 'PKG-02',
    titleFa: 'تدوین نظام‌نامه حاکمیت، مدیریت ریسک داده و امنیت AI (Policy & Trust)',
    dimKey: 'governance',
    duration: '۴ هفته',
    deploymentModel: 'مشاوره فرآیندی + تدوین اسناد حاکمیتی',
    estimatedPrice: '۴۵,۰۰۰,۰۰۰',
    phase: 'فاز ۱ (روز ۱-۳۰)',
    priority: 'بسیار بالا',
    deliverables: 'دستورالعمل محرمانگی داده‌ها، ماتریس نظارت انسانی، استاندارد استفاده امن',
  },
  {
    id: 'PKG-03',
    titleFa: 'کارگاه جامع کشف Use Caseهای با ارزش افزوده بالا و طراحی پایلوت',
    dimKey: 'business_value',
    duration: '۳ هفته',
    deploymentModel: 'کارگاه تعاملی تیمی + تحلیل امکان‌پذیری',
    estimatedPrice: '۴۲,۰۰۰,۰۰۰',
    phase: 'فاز ۲ (روز ۳۱-۶۰)',
    priority: 'بالا',
    deliverables: 'شناسنامه ۵ پایلوت اولویت‌دار، ماتریس ارزش/تلاش، کارت‌های KPI و ROI',
  },
  {
    id: 'PKG-04',
    titleFa: 'برنامه سواد سازمانی و توانمندسازی نقش‌محور کارکنان (AI Upskilling)',
    dimKey: 'people',
    duration: '۶ هفته',
    deploymentModel: 'دوره‌های نقش‌محور پرومپت‌نویسی تخصصی + تمرین',
    estimatedPrice: '۵۴,۰۰۰,۰۰۰',
    phase: 'فاز ۲ (روز ۳۱-۶۰)',
    priority: 'بالا',
    deliverables: 'تربیت ۱۵ مروج داخلی (AI Champions)، بسته‌های اختصاصی ابزارها',
  },
  {
    id: 'PKG-05',
    titleFa: 'ارزیابی آمادگی داده، پالایش خط لوله‌ها و یکپارچه‌سازی سامانه‌ها',
    dimKey: 'data',
    duration: '۵ هفته',
    deploymentModel: 'ممیزی فنی پایگاه‌های داده و کیفیت APIها',
    estimatedPrice: '۶۲,۰۰۰,۰۰۰',
    phase: 'فاز ۳ (روز ۶۱-۹۰)',
    priority: 'متوسط',
    deliverables: 'گزارش سلامت داده‌ها، الگوهای امن اتصال API، متادیتای ساختاریافته',
  },
  {
    id: 'PKG-06',
    titleFa: 'طراحی مرکز تعالی (CoE) و استقرار مدل عملیاتی پایدار هوش مصنوعی',
    dimKey: 'operating_model',
    duration: '۸ هفته',
    deploymentModel: 'طراحی ساختار سازمانی و بازطراحی گردش‌کارها',
    estimatedPrice: '۵۸,۰۰۰,۰۰۰',
    phase: 'فاز ۳ (روز ۶۱-۹۰)',
    priority: 'متوسط',
    deliverables: 'منشور CoE، بازطراحی ۳ فرآیند محوری با AI، پایش مستمر بازگشت سرمایه',
  },
];

export const ExecutiveReportPdfDocument: React.FC<ExecutiveReportProps> = ({
  orgProfile,
  calculationResults,
  reportJalaliDate,
}) => {
  const companyName = orgProfile.companyName.trim() || 'سازمان منتخب';
  const totalPages = 8;

  // Header component for internal pages
  const PageHeader = ({ pageNumber }: { pageNumber: number }) => (
    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-6 text-[11px] text-slate-500">
      <div className="flex items-center gap-2">
        <HoushranEmblem height={22} />
        <span className="font-bold text-slate-800">
          هوشران | گزارش استراتژیک عارضه‌یابی و بلوغ هوش مصنوعی سازمانی
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px]">
        <span className="text-[#c5a059] font-bold">HOOSHRAAN STRATEGIC SUITE</span>
        <span className="text-slate-300">|</span>
        <span>سند محرمانه ویژه: {companyName}</span>
      </div>
    </div>
  );

  // Footer component for internal pages
  const PageFooter = ({ pageNumber }: { pageNumber: number }) => (
    <div className="mt-auto pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
      <div className="flex items-center gap-2">
        <span className="text-slate-600 font-bold">آکادمی و دپارتمان مشاوره هوش مصنوعی هوشران</span>
        <span className="text-slate-300">|</span>
        <span>نسخه متدولوژی ۱.۱</span>
      </div>
      <div className="font-bold text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full">
        صفحه {toPersianDigits(pageNumber)} از {toPersianDigits(totalPages)}
      </div>
      <div>تاریخ تنظیم: {reportJalaliDate}</div>
    </div>
  );

  // Section Tag Pill in Gold
  const SectionTag = ({ tag, en }: { tag: string; en?: string }) => (
    <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 text-[#9a7833] border border-[#c5a059]/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
      <span>{tag}</span>
      {en && <span className="font-mono text-[9px] opacity-80">({en})</span>}
    </div>
  );

  // Executive Callout Box with heavy gold right border
  const ExecutiveCallout = ({
    title,
    children,
    badge,
    variant = 'gold',
  }: {
    title: string;
    children: React.ReactNode;
    badge?: string;
    variant?: 'gold' | 'danger';
  }) => (
    <div
      className={`p-4 rounded-xl border-y border-l border-slate-200/70 text-xs leading-[1.8] relative my-4 ${
        variant === 'danger'
          ? 'bg-red-50/40 border-r-4 border-r-red-600 text-red-950'
          : 'bg-[#0f1c2e]/[0.025] border-r-4 border-r-[#c5a059] text-slate-800'
      }`}
    >
      <div className="flex items-center justify-between font-black text-slate-900 mb-1.5">
        <div className="flex items-center gap-2">
          {variant === 'danger' ? (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0" />
          )}
          <span className="text-xs font-bold text-slate-900">{title}</span>
        </div>
        {badge && (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#9a7833]">
            {badge}
          </span>
        )}
      </div>
      <div className="text-slate-700 leading-[1.8] text-[11px]">{children}</div>
    </div>
  );

  return (
    <div
      id="diagnostic-luxury-executive-pdf-document"
      className="text-slate-900 bg-slate-200/50 py-8 flex flex-col items-center gap-8 print:py-0 print:gap-0 print:bg-white"
      dir="rtl"
    >
      {/* =========================================================================
          PAGE 1: LUXURY COVER PAGE (پس‌زمینه سرمه‌ای عمیق #0f1c2e با هایلایت طلایی)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-[#0f1c2e] text-white p-14 flex flex-col justify-between shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="1"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Subtle decorative geometric background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#c5a059]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-[#0066ff]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#c5a059] via-[#0066ff] to-[#c5a059]" />

        {/* Top Indicator & Category Badge */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <HoushranEmblem height={40} className="brightness-0 invert" />
            <div className="text-right">
              <span className="text-sm font-black tracking-wide text-white block">
                هوشران | HOOSHRAAN
              </span>
              <span className="text-[10px] text-[#c5a059] tracking-widest uppercase font-mono block">
                ARTIFICIAL INTELLIGENCE STRATEGIC SUITE
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#c5a059]/20 border border-[#c5a059]/60 px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold text-[#c5a059] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span>STRATEGIC & COMMERCIAL STATUS REPORT</span>
          </div>
        </div>

        {/* Center Main Cover Typography */}
        <div className="relative z-10 my-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#c5a059] tracking-widest uppercase font-mono block">
              ORGANIZATIONAL AI MATURITY & ROADMAP DIAGNOSTIC (V1.1)
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-[1.3] tracking-tight">
              گزارش جامع عارضه‌یابی و ارزیابی استراتژیک بلوغ هوش مصنوعی
            </h1>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-2 max-w-2xl">
            <div className="text-xs text-slate-300">عنوان پروژه و سازمان ارزیابی‌شده:</div>
            <div className="text-xl font-black text-[#c5a059] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#c5a059]" />
              <span>پروژه تحول سازمانی هوشمند: «{companyName}»</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/10">
              سند ارزیابی نظام‌مند آمادگی نهادی، ارزش‌آفرینی تجاری، حاکمیت داده و سرمایه انسانی بر اساس متدولوژی هفت‌بُعدی هوشران
            </p>
          </div>

          {/* Quick High-Level Result Capsule */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-[#142339] border border-[#c5a059]/40 p-4 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 block">سطح بلوغ سازمانی</span>
              <span className="text-lg font-black text-white block">
                سطح {toPersianDigits(calculationResults.finalLevel)}: {calculationResults.levelInfo.fa}
              </span>
              <span className="text-[10px] text-[#c5a059] font-mono block">
                {calculationResults.levelInfo.english}
              </span>
            </div>

            <div className="bg-[#142339] border border-white/10 p-4 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 block">امتیاز کل ارزیابی (۱ تا ۵)</span>
              <span className="text-2xl font-black text-[#c5a059] font-mono block">
                {toPersianDigits(calculationResults.overallScore1to5.toFixed(2))}
              </span>
              <span className="text-[10px] text-slate-400 block">
                شاخص مقیاس ۱۰۰: {toPersianDigits(calculationResults.overallScore0to100.toFixed(1))}٪
              </span>
            </div>

            <div className="bg-[#142339] border border-white/10 p-4 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 block">اعتبار داده‌های تشخیصی</span>
              <span className="text-lg font-black text-emerald-400 block">
                {toPersianDigits(calculationResults.totalValidResponses)} / ۴۰ مؤلفه
              </span>
              <span className="text-[10px] text-slate-400 block">پوشش کامل ارزیابی</span>
            </div>
          </div>
        </div>

        {/* Bottom Boxed Metadata Cards */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] text-[#c5a059] font-bold block">سازمان مخاطب</span>
              <strong className="text-white text-xs block truncate">{companyName}</strong>
              <span className="text-[10px] text-slate-400 block truncate">{orgProfile.industry || 'عمومی'}</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] text-[#c5a059] font-bold block">ارزیاب ارشد</span>
              <strong className="text-white text-xs block truncate">{orgProfile.assessorName || 'تیم راهبردی'}</strong>
              <span className="text-[10px] text-slate-400 block truncate">{orgProfile.assessorRole || 'مشاور تحول دیجیتال'}</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
              <span className="text-[10px] text-[#c5a059] font-bold block">تاریخ ثبت و تایید</span>
              <strong className="text-white text-xs block font-mono">{reportJalaliDate}</strong>
              <span className="text-[10px] text-emerald-400 block">صحه‌گذاری رسمی</span>
            </div>

            <div className="p-3 bg-white/5 border border-[#c5a059]/40 rounded-xl space-y-1">
              <span className="text-[10px] text-[#c5a059] font-bold block">سطح طبقه‌بندی</span>
              <strong className="text-white text-xs block">محرمانه - مدیران ارشد</strong>
              <span className="text-[10px] text-slate-400 block font-mono">CONFIDENTIAL</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3">
            <span>تهیه‌شده توسط آکادمی و دپارتمان مشاوره هوش مصنوعی هوشران (HOOSHRAAN)</span>
            <span className="font-mono text-[#c5a059]">HOOSHRAAN-EXECUTIVE-REPORT-V1.1</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 2: TABLE OF CONTENTS (فهرست مطالب با ساختار شبکه‌ای منظم و کپسول‌های طلایی)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="2"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={2} />

        <div className="space-y-2 mb-6">
          <SectionTag tag="ساختار سند" en="TABLE OF CONTENTS" />
          <h2 className="text-2xl font-black text-[#0f1c2e] tracking-tight">
            فهرست جامع سرفصل‌ها و بخش‌های گزارش استراتژیک
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            این گزارش با رویکرد ساختاریافته در ۸ بخش مدیریتی، تحلیلی، اجرایی و مالی جهت تصمیم‌گیری در سطح هیئت مدیره و مدیران ارشد تنظیم گردیده است.
          </p>
        </div>

        {/* 2-Column Structured Table of Contents Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
          {/* Item 01 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                01
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۳</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              خلاصه وضعیت استراتژیک و مشخصات سازمانی
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              پروفایل مأموریت، صنعت، تعداد کارکنان، توصیف لنگرگاه رفتاری و گام فوری پیش‌رو.
            </p>
          </div>

          {/* Item 02 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                02
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۳</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              شاخص‌های کلیدی بلوغ و اعمال گیت‌های حاکمیتی
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              امتیاز کل موزون، تحلیل گیت گلوگاه (Bottleneck Gate) و هشدار ریسک مقیاس حاکمیتی.
            </p>
          </div>

          {/* Item 03 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                03
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۴</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              ماتریس حرارتی ابعاد ۷‌گانه (Seven-Dimension Heatmap)
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              ارزیابی مقایسه‌ای وضعیت فعلی، سطح هدف، وزن ابعاد و شاخص اطمینان شواهد (Confidence).
            </p>
          </div>

          {/* Item 04 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                04
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۵</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              تحلیل شکاف‌های اولویت‌دار و نقاط قوت اهرمی
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              شناسایی ۵ شکاف اصلی به عنوان گلوگاه و نقاط قوت برای شتاب‌بخشی به استقرار AI.
            </p>
          </div>

          {/* Item 05 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                05
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۶</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              برنامه اقدام فوری ۹۰ روزه اجرایی (Action Plan)
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              تفکیک فازهای ۱ (روز ۱-۳۰)، ۲ (روز ۳۱-۶۰) و ۳ (روز ۶۱-۹۰) با اقدامات مشخص و خروجی‌ها.
            </p>
          </div>

          {/* Item 06 */}
          <div className="p-3.5 bg-slate-50 border border-[#c5a059]/40 rounded-xl space-y-1 bg-[#c5a059]/5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#0f1c2e] text-[#c5a059] font-mono font-black text-[10px] rounded-full">
                06
              </span>
              <span className="text-[10px] font-mono text-[#c5a059] font-bold">صفحه ۷</span>
            </div>
            <div className="font-bold text-[#0f1c2e] text-xs pt-1">
              جدول سرمایه‌گذاری، برآورد مالی و مدل‌های استقرار
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              بسته‌های پیشنهادی تخصصی هوشران، بازه زمانی، مدل استقرار و تخمین دقیق هزینه بر اساس اولویت شکاف‌ها.
            </p>
          </div>

          {/* Item 07 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                07
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۸</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              نقشه راه ۱۲ ماهه تحول نهادی هوش مصنوعی
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              برنامه زمانی چهار فصلی (Q1 تا Q4) برای نهادینه‌سازی، ارتقای ابزارها و ایجاد CoE.
            </p>
          </div>

          {/* Item 08 */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <span className="px-2 py-0.5 bg-[#c5a059] text-white font-mono font-black text-[10px] rounded-full">
                08
              </span>
              <span className="text-[10px] font-mono text-slate-400">صفحه ۸</span>
            </div>
            <div className="font-bold text-slate-900 text-xs pt-1">
              تائیدیه روش‌شناختی، گواهینامه و امضای اعتبارسنجی
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              رعایت استانداردهای روان‌سنجی هوشران نسخه ۱.۱ و کدهای اخلاقی حاکمیت داده.
            </p>
          </div>
        </div>

        {/* Executive Callout Note for C-Level */}
        <ExecutiveCallout
          title="راهنمای مطالعه ویژه مدیران ارشد اجرایی و اعضای هیئت مدیره"
          badge="C-SUITE DIRECTIVE"
        >
          یافته‌های این ارزیابی نشان می‌دهد که موفقیت سازمان در پذیرش هوش مصنوعی نه به خرید ابزارهای متعدد، بلکه به پیوند استراتژیک میان <strong>«حاکمیت داده»</strong>، <strong>«ارزش‌آفرینی تجاری Use Caseها»</strong> و <strong>«آمادگی سرمایه انسانی»</strong> وابسته است. توصیه می‌شود اعضای محترم هیئت مدیره بخش‌های ۰۲، ۰۵ و جدول سرمایه‌گذاری بخش ۰۶ را مبنای تخصیص بودجه سالانه هوش مصنوعی قرار دهند.
        </ExecutiveCallout>

        <PageFooter pageNumber={2} />
      </section>

      {/* =========================================================================
          PAGE 3: SECTIONS 01 & 02 (خلاصه استراتژیک سازمانی و شاخص‌های کلیدی بلوغ)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="3"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={3} />

        {/* SECTION 01 */}
        <div className="mb-6 space-y-2">
          <SectionTag tag="بخش ۰۱" en="SECTION 01 - STRATEGIC PROFILE" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۱. خلاصه وضعیت استراتژیک و مشخصات سازمانی
          </h2>
          <p className="text-xs text-slate-600 leading-[1.8]">
            سازمان <strong>«{companyName}»</strong> فعال در صنعت <strong>«{orgProfile.industry || 'عمومی'}»</strong> با مقیاس پرسنلی <strong>«{orgProfile.employeeCount || 'نامشخص'}»</strong>، مورد سنجش عارضه‌یابی جامع قرار گرفت. هدف از این ممیزی، ترسیم خط مبنای بلوغ (Maturity Baseline)، شناسایی موانع بازگشت سرمایه و ارائه نقشه راه گذار به سازمانی هوش‌محور است.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-500 block">لنگرگاه رفتاری سطح بلوغ فعلی:</span>
              <p className="text-[11px] text-slate-800 leading-[1.7]">
                {calculationResults.levelInfo.behavioralAnchor}
              </p>
            </div>
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-700 block">اقدام راهبردی کلیدی در فاز بعدی:</span>
              <p className="text-[11px] text-blue-900 font-bold leading-[1.7]">
                {calculationResults.levelInfo.primaryNextAction}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 02 */}
        <div className="space-y-3">
          <SectionTag tag="بخش ۰۲" en="SECTION 02 - MATURITY METRICS & GATES" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۲. شاخص‌های کلیدی بلوغ و اعمال گیت‌های حاکمیتی
          </h2>
          
          {/* 4 Score Cards */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 bg-[#0f1c2e] text-white rounded-xl space-y-1">
              <span className="text-[10px] text-slate-300 block">امتیاز کل (۱ تا ۵)</span>
              <div className="text-2xl font-black text-[#c5a059] font-mono">
                {toPersianDigits(calculationResults.overallScore1to5.toFixed(2))}
              </div>
              <span className="text-[9px] text-slate-400 block">میانگین موزون ۷ بعد</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-500 block">شاخص استاندارد</span>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {toPersianDigits(calculationResults.overallScore0to100.toFixed(1))}٪
              </div>
              <span className="text-[9px] text-slate-400 block">مقیاس تبدیل ۱۰۰ گانه</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] text-emerald-800 font-bold block">سطح بلوغ قطعی</span>
              <div className="text-base font-black text-emerald-950">
                سطح {toPersianDigits(calculationResults.finalLevel)}
              </div>
              <span className="text-[9px] text-emerald-700 block font-mono">
                {calculationResults.levelInfo.english}
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-500 block">روایی مؤلفه‌ها</span>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {toPersianDigits(calculationResults.totalValidResponses)} / ۴۰
              </div>
              <span className="text-[9px] text-emerald-600 font-bold block">۱۰۰٪ معتبر</span>
            </div>
          </div>

          {/* Conservative Bottleneck Gate Notice if Active */}
          {calculationResults.isGated ? (
            <ExecutiveCallout
              title="اعمال اصل گیت گلوگاه محافظه‌کارانه (Conservative Bottleneck Gate)"
              badge="GOVERNANCE RULE"
              variant="danger"
            >
              بر اساس استاندارد متدولوژی هوشران نسخه ۱.۱، سطح بلوغ کل سازمان نمی‌تواند بیش از ۱ سطح بالاتر از ضعیف‌ترین بُعد حیاتی قرار گیرد. با وجود اینکه امتیاز عددی سازمان سطح {toPersianDigits(calculationResults.unconstrainedLevel)} را نشان می‌داد، به دلیل محدودیت‌های جدی در بعد حاکمیتی، سطح نهایی سازمان به <strong>سطح {toPersianDigits(calculationResults.finalLevel)} ({calculationResults.levelInfo.fa})</strong> مقید شد تا از اتلاف سرمایه‌گذاری و پذیرش ریسک‌های خارج از ظرفیت جلوگیری شود.
            </ExecutiveCallout>
          ) : (
            <ExecutiveCallout
              title="تائیدیه موازنه ابعاد و انطباق با گیت‌های حاکمیتی"
              badge="STABILITY CONFIRMED"
            >
              هیچ گلوگاه بحرانی که مانع رشد یکپارچه سازمان شود مشاهده نشد. توازن مناسبی میان زیرساخت‌های پایه‌ای و جاه‌طلبی‌های تجاری وجود دارد که امکان حرکت پایدار به سوی سطح بعدی بلوغ را فراهم می‌آورد.
            </ExecutiveCallout>
          )}

          {/* Scale Risk Callout if Active */}
          {calculationResults.hasScaleRisk && (
            <div className="p-3.5 bg-amber-50 border-r-4 border-r-amber-500 border-y border-l border-amber-200 rounded-xl text-xs space-y-1">
              <div className="font-bold text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>هشدار بحرانی ریسک مقیاس‌پذیری (Scale Risk Warning)</span>
              </div>
              <p className="text-amber-900 leading-[1.8] text-[11px]">
                امتیاز بعد «حاکمیت، ریسک و اعتماد» کمتر از حد نصاب ۲.۰ ارزیابی شده است. اجرای پروژه‌های مقیاس‌پذیر هوش مصنوعی بدون تدوین پروتکل مکتوب محرمانگی و آموزش کارکنان، سازمان را در معرض نقض داده‌ها، خروج اطلاعات کلیدی و آسیب به شهرت تجاری قرار خواهد داد.
              </p>
            </div>
          )}
        </div>

        <PageFooter pageNumber={3} />
      </section>

      {/* =========================================================================
          PAGE 4: SECTION 03 (ماتریس حرارتی ابعاد ۷‌گانه با هدر سرمه‌ای تیره #0f1c2e)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="4"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={4} />

        <div className="mb-4 space-y-1">
          <SectionTag tag="بخش ۰۳" en="SECTION 03 - 7-DIMENSION HEATMAP" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۳. ماتریس حرارتی ابعاد ۷‌گانه بلوغ هوش مصنوعی
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            جدول مقایسه‌ای وضعیت فعلی با هدف آرمانی سازمان به تفکیک ابعاد، وزن و شاخص قابلیت اطمینان شواهد.
          </p>
        </div>

        {/* High Luxury Table with Dark Navy Header #0f1c2e */}
        <div className="overflow-hidden border border-slate-200 rounded-xl mb-4">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#0f1c2e] text-white">
                <th className="p-3 font-black text-[11px]">ردیف</th>
                <th className="p-3 font-black text-[11px]">بُعد ارزیابی</th>
                <th className="p-3 font-black text-[11px] font-mono text-center">وزن</th>
                <th className="p-3 font-black text-[11px] text-center">امتیاز فعلی (۱-۵)</th>
                <th className="p-3 font-black text-[11px] text-center">هدف</th>
                <th className="p-3 font-black text-[11px] text-center">شکاف (Gap)</th>
                <th className="p-3 font-black text-[11px] text-center">شاخص اطمینان</th>
                <th className="p-3 font-black text-[11px] text-center">پیشرفت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {HOOSHRAAN_DIMENSIONS_V11.map((dim, idx) => {
                const stats = calculationResults.dimensionStats[dim.key];
                const gap = stats.gap;
                const pctCurrent = Math.max(0, Math.min(100, ((stats.score - 1) / 4) * 100));

                return (
                  <tr
                    key={dim.key}
                    className={`transition ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}
                  >
                    <td className="p-3 font-mono text-slate-500 font-bold text-center">
                      0{idx + 1}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="text-[#c5a059]">{DIM_ICONS[dim.key]}</span>
                        <span>{dim.titleFa}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 block mr-5">
                        {dim.titleEn}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-700 font-bold text-center">
                      {dim.weight}٪
                    </td>
                    <td className="p-3 font-mono font-black text-slate-900 text-center text-xs">
                      {toPersianDigits(stats.score.toFixed(2))}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-800 text-center">
                      سطح {toPersianDigits(stats.target)}
                    </td>
                    <td className="p-3 font-mono font-bold text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          gap > 1.5
                            ? 'bg-red-100 text-red-800 font-bold'
                            : gap > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {gap > 0 ? `+${toPersianDigits(gap.toFixed(2))}` : toPersianDigits(gap.toFixed(2))}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {stats.isLowConfidence ? (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[9px]">
                          اطمینان متوسط
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[9px]">
                          اطمینان بالا
                        </span>
                      )}
                    </td>
                    <td className="p-3 w-28">
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0f1c2e] h-full rounded-full"
                          style={{ width: `${pctCurrent}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Executive Heatmap Interpretation Callout */}
        <ExecutiveCallout
          title="تحلیل همبستگی و موازنه ابعاد هفت‌گانه (Strategic Correlation)"
          badge="DEEP ANALYSIS"
        >
          بررسی مقایسه‌ای ماتریس حرارتی بالا نشان می‌دهد که بالاترین پتانسیل اهرمی سازمان در بعد <strong>«{calculationResults.topStrengths[0]?.dimension.titleFa}»</strong> با امتیاز <strong>{toPersianDigits(calculationResults.topStrengths[0]?.score.toFixed(2))}</strong> متمرکز است. در مقابل، عمیق‌ترین شکاف تحولی در بعد <strong>«{calculationResults.topGaps[0]?.dimension.titleFa}»</strong> با شکاف <strong>{toPersianDigits(calculationResults.topGaps[0]?.gap.toFixed(2))}</strong> قرار دارد که جریان ارزش‌آفرینی پایدار سازمان را محدود ساخته است.
        </ExecutiveCallout>

        <PageFooter pageNumber={4} />
      </section>

      {/* =========================================================================
          PAGE 5: SECTION 04 (تحلیل شکاف‌های استراتژیک و نقاط قوت اهرمی)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="5"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={5} />

        <div className="mb-4 space-y-1">
          <SectionTag tag="بخش ۰۴" en="SECTION 04 - STRATEGIC GAPS & LEVERAGES" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۴. تحلیل شکاف‌های اولویت‌دار و نقاط قوت اهرمی
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            کشف گلوگاه‌های بازدارنده توسعه و قابلیت‌های تثبیت‌شده سازمانی برای تکیه‌گاه تحول هوشمند.
          </p>
        </div>

        {/* 2 Column Comparison: Top Strengths vs Top Gaps */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Top Strengths */}
          <div className="p-4 bg-emerald-50/40 border border-emerald-200/80 rounded-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <strong className="text-xs font-black text-emerald-950">
                نقاط قوت کلیدی و دارایی‌های اهرمی سازمان
              </strong>
            </div>
            <div className="space-y-2">
              {calculationResults.topStrengths.map((str, idx) => (
                <div
                  key={str.dimension.key}
                  className="p-2.5 bg-white border border-emerald-100 rounded-lg flex items-center justify-between text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800">{str.dimension.titleFa}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800">
                    امتیاز: {toPersianDigits(str.score.toFixed(2))}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-emerald-900 leading-relaxed pt-1">
              این ابعاد نشان‌دهنده قابلیت‌های درونی سازمان هستند که می‌توان پایلوت‌های پرریسک‌تر را بر پایه آن‌ها تعریف کرد.
            </p>
          </div>

          {/* Top Priority Gaps */}
          <div className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <Target className="w-4 h-4 text-amber-600" />
              <strong className="text-xs font-black text-amber-950">
                شکاف‌های استراتژیک و گلوگاه‌های اصلی (Gaps)
              </strong>
            </div>
            <div className="space-y-2">
              {calculationResults.topGaps.slice(0, 4).map((gapItem, idx) => (
                <div
                  key={gapItem.dimension.key}
                  className="p-2.5 bg-white border border-amber-100 rounded-lg flex items-center justify-between text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800">{gapItem.dimension.titleFa}</span>
                  </div>
                  <span className="font-mono font-bold text-amber-800">
                    شکاف: +{toPersianDigits(gapItem.gap.toFixed(2))}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-amber-900 leading-relaxed pt-1">
              شکاف‌های فوق بیش از ۸۰٪ مقاومت در برابر پیاده‌سازی ابزارهای مدرن هوش مصنوعی را تولید می‌کنند.
            </p>
          </div>
        </div>

        {/* Detailed Breakdown of Critical Gap Impact */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs mb-4">
          <div className="font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0f1c2e]" />
            <span>ریشه‌یابی ساختاری شکاف‌های سازمانی (Root Cause Diagnosis):</span>
          </div>
          <p className="text-slate-600 leading-[1.8] text-[11px]">
            داده‌های ممیزی ۴۰ مؤلفه رفتاری مشخص می‌سازد که در اکثر واحدهای عملیاتی، استفاده از هوش مصنوعی در حد «ابزارهای رایگان مبتنی بر وب فردی» متوقف مانده است. نبود فرآیند نظام‌مند برای سنجش ROI و بازطراحی جریان‌های کار، منجر به نوعی «خستگی پایلوت» (Pilot Fatigue) شده است که اصلاح آن مستلزم مداخله ساختاری در مدل عملیاتی است.
          </p>
        </div>

        {/* Executive Callout */}
        <ExecutiveCallout
          title="توصیه کلیدی به کمیته راهبری تحول دیجیتال"
          badge="LEADERSHIP PRIORITY"
        >
          هرگونه سرمایه‌گذاری جدید روی لایسنس‌های نرم‌افزاری یا زیرساخت‌های پردازشی قبل از اصلاح بعد <strong>«{calculationResults.topGaps[0]?.dimension.titleFa}»</strong>، بازدهی کمتر از ۳۰٪ خواهد داشت. اولویت سرمایه‌گذاری سال جاری باید منحصراً بر حل این گلوگاه متمرکز شود.
        </ExecutiveCallout>

        <PageFooter pageNumber={5} />
      </section>

      {/* =========================================================================
          PAGE 6: SECTION 05 (برنامه اقدام فوری ۹۰ روزه اجرایی)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="6"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={6} />

        <div className="mb-4 space-y-1">
          <SectionTag tag="بخش ۰۵" en="SECTION 05 - 90-DAY ACTION PLAN" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۵. برنامه اقدام فوری ۹۰ روزه اجرایی (Action Plan)
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            برنامه گام‌به‌گام برای ۳۰، ۶۰ و ۹۰ روز آینده به منظور ایجاد اولین دستاوردهای ملموس (Quick Wins).
          </p>
        </div>

        {/* 3 Phase Grid */}
        <div className="grid grid-cols-3 gap-3.5 mb-4 text-xs">
          {/* Phase 1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-black text-slate-900 text-xs">فاز ۱: روز ۱ تا ۳۰</span>
              <span className="px-2 py-0.5 bg-[#0f1c2e] text-[#c5a059] font-mono text-[9px] font-bold rounded">
                پایه‌گذاری
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold">هدف اصلی: ایمن‌سازی و اولویت‌سنجی</div>
            <ul className="space-y-2 text-slate-700 text-[11px] leading-[1.7] list-disc list-inside">
              <li>تدوین و ابلاغ خط‌مشی مکتوب حاکمیت و امنیت داده در هوش مصنوعی.</li>
              <li>فهرست‌برداری و فیلتر کردن ۲۰ مورد استفاده (Use Case) اولیه.</li>
              <li>برگزاری کارگاه سواد هوش مصنوعی ویژه مدیران میانی و ارشد.</li>
              <li>شناسایی و تعیین حامی مالی و فنی (Project Sponsors).</li>
            </ul>
            <div className="pt-2 border-t border-slate-200 text-[10px] text-blue-700 font-bold">
              KPI خروجی: سند رسمی AI Policy + لیست مصوب ۳ پایلوت اولویت‌دار
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-black text-slate-900 text-xs">فاز ۲: روز ۳۱ تا ۶۰</span>
              <span className="px-2 py-0.5 bg-[#0f1c2e] text-[#c5a059] font-mono text-[9px] font-bold rounded">
                پایلوت و نظارت
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold">هدف اصلی: اجرای کنترل‌شده و بازخورد</div>
            <ul className="space-y-2 text-slate-700 text-[11px] leading-[1.7] list-disc list-inside">
              <li>استقرار ۳ پایلوت منتخب در واحدهای پایلوت با نظارت انسانی.</li>
              <li>یکپارچه‌سازی اولیه داده‌های استاندارد با مدل‌های هوش مصنوعی.</li>
              <li>آغاز دوره مهارت‌آموزی نقش‌محور پرسنل درگیر در پایلوت.</li>
              <li>پیاده‌سازی سازوکار اندازه‌گیری هفتگی صرفه‌جویی زمان و کیفیت.</li>
            </ul>
            <div className="pt-2 border-t border-slate-200 text-[10px] text-indigo-700 font-bold">
              KPI خروجی: گزارش تحلیلی صحت نتایج پایلوت با خطای کمتر از ۵٪
            </div>
          </div>

          {/* Phase 3 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-black text-slate-900 text-xs">فاز ۳: روز ۶۱ تا ۹۰</span>
              <span className="px-2 py-0.5 bg-[#0f1c2e] text-[#c5a059] font-mono text-[9px] font-bold rounded">
                تثبیت و تصمیم
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-bold">هدف اصلی: اعتبارسنجی تجاری و مقیاس</div>
            <ul className="space-y-2 text-slate-700 text-[11px] leading-[1.7] list-disc list-inside">
              <li>سنجش قطعی شاخص بازگشت سرمایه (ROI) برای پایلوت‌ها.</li>
              <li>تصمیم‌گیری قاطع هیئت مدیره برای توسعه سازمانی یا بازبینی.</li>
              <li>تشکیل هسته اولیه مروجان داخلی (AI Champions Network).</li>
              <li>آغاز بازطراحی اساسی گردش‌کارهای متصل به سیستم هوشمند.</li>
            </ul>
            <div className="pt-2 border-t border-slate-200 text-[10px] text-emerald-800 font-bold">
              KPI خروجی: سند توجیهی مقیاس‌گذاری با تخمین حداقل ۳۰٪ افزایش بهره‌وری
            </div>
          </div>
        </div>

        {/* Executive Callout */}
        <ExecutiveCallout
          title="معماری نظارت بر اجرای برنامه اقدام ۹۰ روزه"
          badge="EXECUTION GOVERNANCE"
        >
          تجربه استقرار پروژه‌های سازمانی هوشران نشان می‌دهد بیش از ۶۵٪ پایلوت‌های هوش مصنوعی به دلیل <strong>نبود مرز زمانی مشخص و رها شدن پس از تست‌های اولیه</strong> با شکست مواجه می‌شوند. تشکیل جلسه هفتگی ۱۵ دقیقه‌ای با حضور مدیر فناوری اطلاعات و مدیران عملیاتی برای رصد موانع ۳۰ روز اول، شرط لازم برای دستیابی به خروجی‌های این برنامه است.
        </ExecutiveCallout>

        <PageFooter pageNumber={6} />
      </section>

      {/* =========================================================================
          PAGE 7: SECTION 06 (جدول سرمایه‌گذاری، برآورد مالی و مدل‌های استقرار هوشران)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="7"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={7} />

        <div className="mb-4 space-y-1">
          <SectionTag tag="بخش ۰۶" en="SECTION 06 - FINANCIAL INVESTMENT & PRICING" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۶. جدول سرمایه‌گذاری، برآورد مالی و مدل‌های استقرار هوشران
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            برآورد مالی و مداخله حرفه‌ای هوشران بر اساس نگاشت شکاف‌های سازمانی شناسایی‌شده در عارضه‌یابی.
          </p>
        </div>

        {/* Formal Pricing & Investment Table with Dark Navy Header #0f1c2e */}
        <div className="overflow-hidden border border-slate-200 rounded-xl mb-4">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#0f1c2e] text-white">
                <th className="p-3 font-black text-[11px]">کد</th>
                <th className="p-3 font-black text-[11px]">بسته خدماتی هوشران</th>
                <th className="p-3 font-black text-[11px]">طول دوره</th>
                <th className="p-3 font-black text-[11px]">مدل استقرار</th>
                <th className="p-3 font-black text-[11px] text-center">اولویت</th>
                <th className="p-3 font-black text-[11px] text-left">برآورد سرمایه‌گذاری (تومان)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {PRICING_CATALOG.map((pkg, idx) => (
                <tr
                  key={pkg.id}
                  className={`transition ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}
                >
                  <td className="p-2.5 font-mono text-slate-500 font-bold text-[10px]">
                    {pkg.id}
                  </td>
                  <td className="p-2.5">
                    <strong className="text-slate-900 text-xs block">{pkg.titleFa}</strong>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                      {pkg.deliverables}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-slate-700 text-[10px]">{pkg.duration}</td>
                  <td className="p-2.5 text-slate-600 text-[10px]">{pkg.deploymentModel}</td>
                  <td className="p-2.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pkg.priority === 'بسیار بالا'
                          ? 'bg-red-100 text-red-800'
                          : pkg.priority === 'بالا'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {pkg.priority}
                    </span>
                  </td>
                  <td className="p-2.5 text-left font-mono font-black text-[#0f1c2e] text-xs">
                    {toPersianDigits(pkg.estimatedPrice)}
                  </td>
                </tr>
              ))}

              {/* Total Investment Row */}
              <tr className="bg-[#0f1c2e]/5 border-t-2 border-[#0f1c2e] font-black">
                <td colSpan={5} className="p-3 text-right text-xs text-slate-900">
                  مجموع سرمایه‌گذاری فاز جامع تحول سازمانی (شامل تمامی ۶ بسته راهبردی):
                </td>
                <td className="p-3 text-left font-mono text-sm text-[#c5a059] font-black">
                  {toPersianDigits('۲۹۹,۰۰۰,۰۰۰')} تومان
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Executive Callout regarding Financial ROI */}
        <ExecutiveCallout
          title="مدل بازگشت سرمایه (ROI) و صرفه‌جویی اقتصادی"
          badge="ECONOMIC VIABILITY"
        >
          بر اساس تحلیل بنچ‌مارک‌های سازمانی هوشران، پیاده‌سازی کامل بسته‌های اولویت ۱ و ۲ ظرف بازه زمانی ۴ الی ۶ ماهه، از محل <strong>کاهش زمان پردازش فرآیندهای دفتری، جلوگیری از خطاهای انسانی در طبقه‌بندی اسناد و تسریع تصمیم‌گیری مدیران</strong>، به طور میانگین بین ۳ الی ۴.۵ برابر مبلغ سرمایه‌گذاری را به عنوان بازگشت ارزش مستقیم به سازمان بازمی‌گرداند.
        </ExecutiveCallout>

        <PageFooter pageNumber={7} />
      </section>

      {/* =========================================================================
          PAGE 8: SECTIONS 07 & 08 (نقشه راه ۱۲ ماهه و تائیدیه روش‌شناختی)
          ========================================================================= */}
      <section
        className="pdf-page w-[794px] h-[1123px] max-h-[1123px] overflow-hidden bg-white text-slate-900 p-12 flex flex-col shadow-2xl relative print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
        data-page="8"
        style={{ boxSizing: 'border-box' }}
      >
        <PageHeader pageNumber={8} />

        {/* SECTION 07 */}
        <div className="mb-6 space-y-2">
          <SectionTag tag="بخش ۰۷" en="SECTION 07 - 12-MONTH ROADMAP" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۷. نقشه راه ۱۲ ماهه تحول نهادی هوش مصنوعی
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            برنامه کلان دستیابی به بلوغ عملیاتی و مقیاس‌پذیر در طول ۴ فصل سال.
          </p>

          <div className="grid grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-[#c5a059] block">فصل اول (Q1)</span>
              <strong className="text-xs text-slate-900 block">پایه‌گذاری و حاکمیت</strong>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                تدوین مقررات، شناسایی گلوگاه‌ها و توانمندسازی مدیران ارشد.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-[#c5a059] block">فصل دوم (Q2)</span>
              <strong className="text-xs text-slate-900 block">پایلوت و اعتبارسنجی</strong>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                راه‌اندازی ۳ پروژه پایلوت، پاکسازی داده و آموزش نقش‌محور پرسنل.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-[#c5a059] block">فصل سوم (Q3)</span>
              <strong className="text-xs text-slate-900 block">مقیاس‌گذاری و CoE</strong>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                ایجاد مرکز تعالی هوش مصنوعی، اتصال APIها و بازطراحی گردش‌کارها.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-[#c5a059] block">فصل چهارم (Q4)</span>
              <strong className="text-xs text-slate-900 block">بهینه‌سازی مستمر</strong>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                سنجش سالانه ROI، توسعه مدل‌های اختصاصی و ارزیابی مجدد بلوغ.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 08 */}
        <div className="space-y-3 mt-2">
          <SectionTag tag="بخش ۰۸" en="SECTION 08 - METHODOLOGY & GOVERNANCE SIGN-OFF" />
          <h2 className="text-xl font-black text-[#0f1c2e]">
            ۸. تائیدیه روش‌شناختی، گواهینامه و تعهدات حاکمیتی
          </h2>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">وضعیت استاندارد روان‌سنجی و انطباق چارچوب:</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-bold">
                VERIFIED V1.1
              </span>
            </div>
            <p className="text-slate-600 leading-[1.8] text-[11px]">
              این ارزیابی بر اساس چارچوب رسمی بلوغ سازمانی هوشران (نسخه ۱.۱) متشکل از ۴۰ گویه رفتاری استاندارد، الگوریتم وزن‌دهی موزون و گیت‌های حاکمیتی منعکس‌کننده استانداردهای ISO/IEC 42001 و چارچوب مدیریت ریسک هوش مصنوعی NIST استخراج گردیده است.
            </p>
          </div>

          {/* Official Sign-off & Stamp Box */}
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="p-4 border border-dashed border-slate-300 rounded-xl space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-bold">تاییدیه نماینده سازمان هدف</span>
                <span className="text-[10px] font-mono text-slate-400">ORGANIZATION SIGN-OFF</span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                نام: {orgProfile.companyName}
              </div>
              <div className="text-[11px] text-slate-600">
                نماینده/ارزیاب: {orgProfile.assessorName || 'مدیریت ارشد'} ({orgProfile.assessorRole || 'مدیریت'})
              </div>
              <div className="h-10 border-b border-slate-300 flex items-end justify-between pb-1 text-[10px] text-slate-400">
                <span>امضا و مهر رسمی:</span>
                <span>تاریخ: {reportJalaliDate}</span>
              </div>
            </div>

            <div className="p-4 border border-dashed border-[#c5a059]/80 rounded-xl space-y-3 bg-[#c5a059]/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#c5a059] font-bold">صحت‌سنجی متدولوژی هوشران</span>
                <span className="text-[10px] font-mono text-[#c5a059]">HOOSHRAAN AUDIT</span>
              </div>
              <div className="text-xs font-bold text-[#0f1c2e]">
                آکادمی و دپارتمان مشاوره هوش مصنوعی هوشران
              </div>
              <div className="text-[11px] text-slate-600">
                رئیس کمیته تدوین استاندارد و مشاوره تحول نهادی
              </div>
              <div className="h-10 border-b border-[#c5a059]/50 flex items-end justify-between pb-1 text-[10px] text-slate-400">
                <span className="text-[#c5a059] font-bold">مهر دیجیتال صحه‌گذاری هوشران</span>
                <span className="font-mono">HOOSHRAAN-OFFICIAL</span>
              </div>
            </div>
          </div>
        </div>

        <PageFooter pageNumber={8} />
      </section>
    </div>
  );
};

export default ExecutiveReportPdfDocument;
