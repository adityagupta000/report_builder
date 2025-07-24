// export interface GeneticParameter {
//   id: string;
//   title: string;
//   gene: string;
//   snp: string;
//   result: string;
//   impact: string;
//   imageUrl?: string;
// }

// export interface GeneticCategory {
//   id: string;
//   category: string;
//   parameters: string[];
//   imageUrl?: string;
//   description?: string;
// }

export interface GeneticCategory {
  id: string;
  category: string;
  imageUrl: string;
  description: string;
  parameters: string[];
  isActive: boolean;
  order: number;
}

// export interface ReportData {
//   categories: CategoryData[];
//   geneticParameters: GeneticParameter[];
//   metadata?: {
//     lastUpdated: string;
//     version: string;
//     totalCategories: number;
//     totalParameters: number;
//   };
// }

// export interface ApiResponse {
//   success: boolean;
//   data?: ReportData;
//   message?: string;
//   error?: string;
// }

export interface PatientInfo {
  name: string;
  gender: string;
  birthDate: string;
  sampleCode: string;
  sampleDate: string;
  reportDate: string;
  reportAuth: string;
  genomicAnalytics: string;
  checkedBy: string;
  scientificContent: string;
  disclaimer: string;
  signature1: string | null;
  signature2: string | null;
}

export interface ReportContent {
  introduction: string;
  genomicsExplanation: string;
  genesHealthImpact: string;
  fundamentalsPRS: string;
  utilityDoctors: string;
  microarrayExplanation: string;
  microarrayData: string;
}

export interface ReportSettings {
  title: string;
  subtitle: string;
  companyName: string;
  headerColor: string;
  accentColor: string;
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
}

export interface GeneticParameter {
  title: string;
  gene: string;
  snp: string;
  result: string;
  impact: string;
}

export interface DynamicDietFieldDefinition {
  _uuid: string;
  id: string;
  label: string;
  category: string;
  min: number;
  max: number;
  highRecommendation: string;
  normalRecommendation: string;
  lowRecommendation: string;
}

// export interface PatientDietAnalysisResult {
//   fieldId: string;
//   score: number;
//   level: string;
//   recommendation: string;
// }

export interface PatientDietAnalysisResult {
  fieldId: string;
  score: number;
  level: "LOW" | "NORMAL" | "HIGH";
  recommendation: string;
  recommendations: {
    LOW: string;
    NORMAL: string;
    HIGH: string;
  };
  selectedLevel: "LOW" | "NORMAL" | "HIGH";
}

export interface NutrientData {
  score: number;
  healthImpact: string;
  intakeLevel: string;
  source: string;
}

export interface NutritionData {
  vitamins: {
    vitaminA: NutrientData;
    vitaminB12: NutrientData;
    vitaminB2: NutrientData;
    vitaminB6: NutrientData;
    vitaminB9: NutrientData;
    vitaminC: NutrientData;
    vitaminD: NutrientData;
    vitaminE: NutrientData;
  };
  fattyAcids: {
    omegaFattyAcids: NutrientData;
  };
  elements: {
    calcium: NutrientData;
    iodine: NutrientData;
    iron: NutrientData;
    magnesium: NutrientData;
    phosphorus: NutrientData;
    selenium: NutrientData;
    zinc: NutrientData;
  };
  complexNutrients: {
    antiInflammatory: NutrientData;
    antioxidants: NutrientData;
  };
}

export interface ExerciseData {
  level: string;
  description: string;
}

// export interface SportsAndFitness {
//   exerciseType: {
//     endurancePotential: ExerciseData;
//     powerPotential: ExerciseData;
//     strengthProfile: ExerciseData;
//     exerciseTime: ExerciseData;
//   };
//   performance: {
//     enduranceCapacity: ExerciseData;
//     fatigueResistance: ExerciseData;
//     bloodFlow: ExerciseData;
//     oxygenEfficiency: ExerciseData;
//     waterLoss: ExerciseData;
//     lactateClearing: ExerciseData;
//     recoveryEfficiency: ExerciseData;
//     bodyComposition: ExerciseData;
//     injuryRisk: ExerciseData;
//     achillesTendonInjury: ExerciseData;
//     ligamentInjury: ExerciseData;
//     rupture: ExerciseData;
//     muscleCramps: ExerciseData;
//   };
// }

export interface ExerciseData {
  level: string;
  description: string;
}

export interface ExerciseField extends ExerciseData {
  label: string; // used for display like "BLOOD FLOW"
}

export interface GroupedExerciseCategory {
  title: string; // Section heading like "ENDURANCE EXERCISE"
  fields: Record<string, ExerciseField>; // e.g., bloodFlow, enduranceCapacity
}

export interface SportsAndFitness {
  exerciseType: GroupedExerciseCategory[]; // Grouped list of sections
  performance: GroupedExerciseCategory[];
}

export interface HealthConditionStatus {
  status: "strength" | "improvement";
}

export interface LifestyleConditions {
  heartVascularHealth: {
    hypertension: HealthConditionStatus;
    leftVentricularHypertrophy: HealthConditionStatus;
    atherosclerosis: HealthConditionStatus;
    familialHypercholesterolemia: HealthConditionStatus;
    cardiomyopathy: HealthConditionStatus;
    cholesterolImbalance: HealthConditionStatus;
    stroke: HealthConditionStatus;
  };
  diabesity: {
    obesity: HealthConditionStatus;
    diabetesType2: HealthConditionStatus;
  };
  liverHealth: {
    nafld: HealthConditionStatus;
    liverCirrhosis: HealthConditionStatus;
  };
  boneHealth: {
    osteoporosis: HealthConditionStatus;
    osteoarthritis: HealthConditionStatus;
  };
  gutHealth: {
    irritableBowelSyndrome: HealthConditionStatus;
    celiacDisease: HealthConditionStatus;
  };
  hormoneSystem: {
    hypothyroidism: HealthConditionStatus;
  };
}

export interface MetabolicGeneData {
  genes: string[];
  genotype: string;
  impact: string;
  advice: string;
}

export interface MetabolicCore {
  methylation: MetabolicGeneData;
  inflammation: MetabolicGeneData;
  oxidativeStress: MetabolicGeneData;
  detoxification: MetabolicGeneData;
  vitaminDMetabolism: MetabolicGeneData;
  lipidMetabolism: MetabolicGeneData;
  insulinResistance: MetabolicGeneData;
  circadianRhythm: MetabolicGeneData;
  exerciseResponsiveness: MetabolicGeneData;
  snackingTendency: MetabolicGeneData;
  oestrogenElimination: MetabolicGeneData;
  powerVsEndurance: MetabolicGeneData;
  injuryRecovery: MetabolicGeneData;
  fluidLossTendency: MetabolicGeneData;
  vo2Max: MetabolicGeneData;
}

export interface DigestiveHealthData {
  level: string;
  description: string;
}

export interface DigestiveHealth {
  gutHealth: DigestiveHealthData;
  glutenIntolerance: DigestiveHealthData;
  celiacDiseaseTendency: DigestiveHealthData;
  impactOnBonesJoints: DigestiveHealthData;
  lactoseIntolerance: DigestiveHealthData;
  probioticsRequirement: DigestiveHealthData;
}

export interface AddictionData {
  tendency: string;
  description: string;
}

export interface GenesAndAddiction {
  alcoholAddiction: AddictionData;
  smokingAddiction: AddictionData;
  snackingHabits: AddictionData;
  altruism: AddictionData;
}

export interface SleepData {
  impact: string;
  intervention: string;
}

export interface SleepAndRest {
  sleepCycle: SleepData;
  sleepApnea: SleepData;
  sleepDepth: SleepData;
  stressSensitivity: SleepData;
}

export interface AllergyData {
  tendency: string;
}

export interface AllergiesAndSensitivity {
  dustAllergy: AllergyData;
  pesticideSensitivity: AllergyData;
  smokeSensitivity: AllergyData;
  automobileSmokeSensitivity: AllergyData;
  generalAdvice: string;
}

export interface GeneTestResult {
  geneName: string;
  variation: string;
  result: string;
}

export interface MetabolicSummary {
  strengths: string[];
  weaknesses: string[];
}

export interface PreventiveHealth {
  diagnosticTests: {
    halfYearly: string[];
    yearly: string[];
  };
  nutritionalSupplements: Array<{
    supplement: string;
    needed: boolean;
  }>;
}

export interface FamilyGeneticImpact {
  gene: string;
  normalAlleles: string;
  yourResult: string;
  healthImpact: string;
}

export interface ReportSummaries {
  nutrigenomicsSummary: string;
  exerciseGenomicsSummary: string;
}

export interface ComprehensiveReportData {
  patientInfo: PatientInfo;
  content: ReportContent;
  settings: ReportSettings;
  dynamicDietFieldDefinitions: DynamicDietFieldDefinition[];
  patientDietAnalysisResults: PatientDietAnalysisResult[];
  nutritionData: NutritionData;
  sportsAndFitness: SportsAndFitness;
  lifestyleConditions: LifestyleConditions;
  metabolicCore: MetabolicCore;
  digestiveHealth: DigestiveHealth;
  genesAndAddiction: GenesAndAddiction;
  sleepAndRest: SleepAndRest;
  allergiesAndSensitivity: AllergiesAndSensitivity;
  geneTestResults: GeneTestResult[];
  geneticParameters: GeneticParameter[];
  geneticCategories?: GeneticCategory[];
  metabolicSummary: MetabolicSummary;
  preventiveHealth: PreventiveHealth;
  familyGeneticImpact: FamilyGeneticImpact[];
  summaries: ReportSummaries;
  dietFieldCategories: string[]; // NEW
}
