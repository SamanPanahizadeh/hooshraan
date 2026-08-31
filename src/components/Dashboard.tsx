import React from 'react';
import { WhyUs } from './WhyUs';

interface DashboardProps {
  onNavigate: (tab: string, subTab?: string) => void;
  completedModules?: number[];
  onOpenCertificate?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
}) => {
  return (
    <div className="w-full">
      <WhyUs
        onNavigate={onNavigate}
        onExploreIndividual={() => onNavigate('sales-hub')}
        onExploreEnterprise={() => onNavigate('diagnostic')}
        onStartDiagnostic={() => onNavigate('diagnostic')}
      />
    </div>
  );
};
