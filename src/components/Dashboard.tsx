import React from 'react';
import { WhyUs } from './WhyUs';
import { Trophy, ArrowLeft } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string, subTab?: string) => void;
  completedModules?: number[];
  onOpenCertificate?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  completedModules = [],
  onOpenCertificate,
}) => {
  const completedCount = completedModules.length;
  const totalModules = 8;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="w-full relative pb-16">
      {/* هاله‌های نوری محو متناسب با زمینه تیره (Dark Ambient Glows) */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-48 left-1/4 -z-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* نوار وضعیت شیشه‌ای تیره در صورت شروع دوره */}
      {completedCount > 0 && (
        <div className="mb-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-300 font-medium">
                مسیر یادگیری فعال: <span className="font-bold text-white">{completedCount} از {totalModules} بخش</span> ({progressPercent}٪)
              </span>
            </div>

            <div className="flex items-center gap-3">
              {completedCount === totalModules && onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>مشاهده گواهی</span>
                </button>
              )}
              <button
                onClick={() => onNavigate('sales-hub')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition group"
              >
                <span>ادامه آموزش</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* محتوای اصلی لندینگ پیج با اسکرول تفکیک‌شده */}
      <WhyUs
        onNavigate={onNavigate}
        onExploreIndividual={() => onNavigate('sales-hub')}
        onExploreEnterprise={() => onNavigate('diagnostic')}
        onStartDiagnostic={() => onNavigate('diagnostic')}
      />
    </div>
  );
};