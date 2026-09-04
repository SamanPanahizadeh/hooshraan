import React from 'react';
import { WhyUs } from './WhyUs';
import { Sparkles, Trophy, ArrowLeft } from 'lucide-react';

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
    <div className="w-full relative">
      {/* پس‌زمینه نوری محو و زنده (Ambient Background Glow) */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-1/4 -z-10 w-80 h-80 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* نوار وضعیت تعاملی در صورت شروع دوره توسط کاربر */}
      {completedCount > 0 && (
        <div className="mb-6 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xs flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-700 font-medium">
              مسیر یادگیری فعال: <span className="font-bold text-slate-900">{completedCount} از {totalModules} بخش</span> ({progressPercent}٪)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {completedCount === totalModules && onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 transition"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>مشاهده گواهی</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('sales-hub')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
            >
              <span>ادامه آموزش</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* محتوای اصلی لندینگ پیج */}
      <WhyUs
        onNavigate={onNavigate}
        onExploreIndividual={() => onNavigate('sales-hub')}
        onExploreEnterprise={() => onNavigate('diagnostic')}
        onStartDiagnostic={() => onNavigate('diagnostic')}
      />
    </div>
  );
};