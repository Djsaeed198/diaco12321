import type {
  Country,
  ImmigrationPath,
  FamilyStatus,
  FinancialRangeId,
  LanguageLevel,
} from '../constants/immigration';

export interface AssessmentData {
  targetCountries: string[];
  immigrationPath: string | null;
  familyStatus: FamilyStatus | null;
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

export const INITIAL_ASSESSMENT: AssessmentData = {
  targetCountries: ['AT'],
  immigrationPath: 'financial-self',
  familyStatus: 'single',
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

export interface AssessmentResult {
  totalScore: number;
  level: 'excellent' | 'high' | 'medium' | 'low';
  levelLabel: string;
  strengths: string[];
  improvements: string[];
  recommendedPaths: RecommendedPath[];
  estimatedMonths: [number, number];
  estimatedBudget: string;
}

export interface RecommendedPath {
  country: Country;
  path: ImmigrationPath;
  matchScore: number;
  reasoning: string;
}
