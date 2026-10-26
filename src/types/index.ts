import type {
  FamilyStatus,
  FinancialRangeId,
  LanguageLevel,
} from '../constants/immigration';

export * from './assessment';

export interface UserProfile {
  country?: string;
  path?: string;
  familyStatus?: string;
  financials?: string;
  targetCountries: string[];
  immigrationPath: string | null;
  familyStatusChoice: FamilyStatus | null;
  financialRange: FinancialRangeId | null;
  age: number | null;
  education: 'diploma' | 'bachelor' | 'master' | 'phd' | null;
  language: LanguageLevel | null;
  hasJobOffer: boolean;
  notes: string;
  fullName: string;
  phone: string;
  consent: boolean;
}

export const INITIAL_PROFILE: UserProfile = {
  country: 'اتریش',
  path: 'تمکن مالی (خودحمایتی)',
  familyStatus: 'مجرد',
  financials: '۷۰,۰۰۰ تا ۲۰۰,۰۰۰ یورو',
  targetCountries: ['AT'],
  immigrationPath: 'financial-self',
  familyStatusChoice: 'single',
  financialRange: 'high',
  age: 32,
  education: 'bachelor',
  language: 'B1',
  hasJobOffer: false,
  notes: '',
  fullName: '',
  phone: '',
  consent: true,
};

export interface TimelinePhase {
  phase: string;
  tasks: string[];
}

export interface DocumentChecklistItem {
  document: string;
  details: string;
}

export interface CostItem {
  item: string;
  cost: string;
}

export interface ProcessStep {
  step: string;
  description: string;
}

export interface RecommendedOption {
  country: string;
  flag: string;
  pathName: string;
  matchScore: number;
  reason: string;
}

export interface ImmigrationPlan {
  totalScore: number;
  level: 'excellent' | 'high' | 'medium' | 'low';
  levelLabel: string;
  planOverview: string;
  strengths: string[];
  improvements: string[];
  recommendedOptions: RecommendedOption[];
  timeline: TimelinePhase[];
  documentChecklist: DocumentChecklistItem[];
  estimatedCosts: CostItem[];
  stepByStepProcess: ProcessStep[];
  risksAndConsiderations: string[];
  estimatedMonths: [number, number];
  estimatedBudget: string;
}
