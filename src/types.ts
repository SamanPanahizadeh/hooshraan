export interface CourseModule {
  id: number;
  titleFa: string;
  titleEn: string;
  iconName: string;
  descriptionFa: string;
  slides: Slide[];
}

export interface Slide {
  id: string;
  pageNum: number;
  title: string;
  section: string;
  content: string[];
  bulletPoints?: string[];
  keyConcept?: {
    term: string;
    explanation: string;
  };
  promptTemplate?: {
    role: string;
    template: string;
    notes?: string;
  };
  exercise?: {
    title: string;
    instructions: string;
    type: 'brief' | 'outreach' | 'roleplay' | 'crm' | 'scoov';
  };
  goldenRules?: string[];
  diagram?: {
    type: 'flow' | 'compare' | 'list';
    items: { label: string; desc?: string; highlight?: boolean }[];
  };
}

export interface VideoGenRequest {
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}

export interface VideoGenStatusResponse {
  done: boolean;
  error?: string;
  operationName?: string;
}

export interface RolePlayMessage {
  sender: 'user' | 'prospect' | 'system';
  text: string;
  timestamp: string;
}

export interface RolePlayEvaluation {
  discoveryQualityScore: number;
  listeningScore: number;
  assumptionMakingScore: number;
  needIdentificationScore: number;
  objectionHandlingScore: number;
  nextStepDefinitionScore: number;
  overallFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
  missedOpportunities: string[];
}

export interface VerificationChecklistState {
  accuracy: boolean;
  context: boolean;
  assumption: boolean;
  fact: boolean;
  relevance: boolean;
  actionability: boolean;
  humanJudgment: boolean;
}

export interface DiagnosticQuestion {
  id: string;
  dimensionKey: string;
  title: string;
  description: string;
  weight: number;
  options: {
    score: number;
    label: string;
    details: string;
  }[];
}

export interface DiagnosticDimension {
  key: string;
  titleFa: string;
  titleEn: string;
  shortDesc: string;
  iconName: string;
  color: string;
  benchmarkScore: number;
  questions: DiagnosticQuestion[];
}

export interface OpportunityUseCase {
  id: string;
  title: string;
  category: 'sales' | 'marketing' | 'operations' | 'crm';
  categoryLabel: string;
  impact: 'high' | 'medium' | 'low';
  feasibility: 'high' | 'medium' | 'low';
  estimatedHoursSavedPerPersonWeekly: number;
  description: string;
  suggestedTools: string[];
}

export interface DiagnosticROIInputs {
  teamSize: number;
  avgMonthlySalaryMillionTomans: number;
  estimatedTimeSavedPercent: number;
  implementationCostMillionTomans: number;
}
