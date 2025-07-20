"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid"; // Import uuid for default data generation
import type {
  ComprehensiveReportData,
  PatientInfo,
  ReportContent,
  ReportSettings,
  // Removed DietAnalysis
  NutritionData,
  NutrientData,
  GeneTestResult,
  ReportSummaries,
  SportsAndFitness,
  ExerciseData,
  LifestyleConditions,
  HealthConditionStatus,
  MetabolicCore,
  MetabolicGeneData,
  DigestiveHealth,
  DigestiveHealthData,
  GenesAndAddiction,
  AddictionData,
  SleepAndRest,
  SleepData,
  AllergiesAndSensitivity,
  AllergyData,
  PreventiveHealth,
  FamilyGeneticImpact,
  DynamicDietFieldDefinition, // NEW
  PatientDietAnalysisResult, // NEW
} from "@/types/report-types";

// Corrected imports for admin components
import PatientInfoAdmin from "@/components/admin/patient-info-admin";
import ContentAdmin from "@/components/admin/content-admin";
import SettingsAdmin from "@/components/admin/settings-admin";
import DynamicDietFieldAdmin from "@/components/admin/dynamic-diet-field-admin";
import GeneResultsAdmin from "@/components/admin/gene-results-admin";
import SummariesAdmin from "@/components/admin/summaries-admin";
import ImportExportAdmin from "@/components/admin/import-export-admin";
import NutritionAdmin from "@/components/admin/nutrition-admin";
import SportsFitnessAdmin from "@/components/admin/sports-fitness-admin";
import LifestyleConditionsAdmin from "@/components/admin/lifestyle-conditions-admin";
import DigestiveHealthAdmin from "@/components/admin/digestive-health-admin";
import GenesAddictionAdmin from "@/components/admin/genes-addiction-admin";
import SleepRestAdmin from "@/components/admin/sleep-rest-admin";
import AllergiesSensitivityAdmin from "@/components/admin/allergies-sensitivity-admin";
import PreventiveHealthAdmin from "@/components/admin/preventive-health-admin";
import FamilyGeneticImpactAdmin from "@/components/admin/family-genetic-impact-admin";
import PDFGenerator from "@/components/admin/pdf-generator";
import MetabolicCoreAdmin from "@/components/admin/metabolic-core-admin";
import GeneticParametersAdmin from "@/components/admin/genetic-parameters-admin";

const getDefaultReportData = (): ComprehensiveReportData => ({
  patientInfo: {
    name: "John Doe",
    gender: "MALE",
    birthDate: "1990-01-01",
    sampleCode: "DNL1000000110",
    sampleDate: "2023-01-15",
    reportDate: "2023-02-01",
    reportAuth: "Dr. Jane Smith, PhD",
    genomicAnalytics: "Genomics Lab Inc.",
    checkedBy: "Dr. Alice Brown",
    scientificContent: "Dr. Robert White",
    disclaimer:
      "This  for informational purposes only and should not be used as a substitute for professional medical advice.",
  },
  content: {
    introduction:
      "Welcome to your personalized nutrigenomics report. This document provides insights into how your genes influence your diet, nutrition, and overall health.",
    genomicsExplanation:
      "Genomics is the study of an organism's complete set of DNA, including all of its genes. It helps us understand how genetic variations can impact various biological processes.",
    genesHealthImpact:
      "Your genes play a significant role in determining your health predispositions. This report highlights key genetic markers and their potential impact on your well-being.",
    fundamentalsPRS:
      "Polygenic Risk Scores (PRS) combine the effects of many genetic variants to estimate an individual's risk for complex diseases or traits.",
    utilityDoctors:
      "This report is designed to be a valuable tool for doctors and dietitians, providing actionable genetic insights to personalize patient care and recommendations.",
    microarrayExplanation:
      "Microarray technology allows for the simultaneous measurement of the expression levels of thousands of genes, providing a comprehensive genetic profile.",
    microarrayData:
      "Your microarray data has been analyzed to identify specific genetic variations relevant to your health and lifestyle.",
  },
  settings: {
    title: "Comprehensive Health Report",
    subtitle: "A Detailed Analysis of Your Genetics",
    companyName: "Health Solutions Inc.",
    headerColor: "#2C3E50",
    accentColor: "#E74C3C",
    fonts: {
      primary: "Helvetica, Arial, sans-serif",
      secondary: "Georgia, serif",
      mono: "Courier New, monospace",
    },
  },
  // NEW: Default dynamic diet field definitions
  dynamicDietFieldDefinitions: [
    {
      _uuid: uuidv4(),
      id: "carbohydrate_sensitivity",
      label: "Carbohydrate Sensitivity",
      category: "Macronutrients",
      min: 1,
      max: 10,
      highRecommendation: "Reduce carbohydrate intake, focus on complex carbs.",
      normalRecommendation: "Maintain balanced carbohydrate intake.",
      lowRecommendation: "Ensure adequate carbohydrate intake.",
    },
    {
      _uuid: uuidv4(),
      id: "fat_sensitivity",
      label: "Fat Sensitivity",
      category: "Macronutrients",
      min: 1,
      max: 10,
      highRecommendation:
        "Reduce saturated and trans fats; focus on healthy fats.",
      normalRecommendation: "Maintain balanced fat intake.",
      lowRecommendation: "Ensure adequate healthy fat intake.",
    },
    {
      _uuid: uuidv4(),
      id: "protein_requirement",
      label: "Protein Requirement",
      category: "Macronutrients",
      min: 1,
      max: 10,
      highRecommendation: "Increased protein intake recommended.",
      normalRecommendation: "Ensure adequate protein intake.",
      lowRecommendation:
        "Consider increasing protein intake for muscle maintenance.",
    },
    {
      _uuid: uuidv4(),
      id: "meal_frequency",
      label: "Meal Frequency",
      category: "Meal Pattern",
      min: 1,
      max: 10,
      highRecommendation: "Consider smaller, more frequent meals.",
      normalRecommendation: "Maintain regular meal frequency.",
      lowRecommendation: "Consider fewer, larger meals.",
    },
    {
      _uuid: uuidv4(),
      id: "alcohol_sensitivity",
      label: "Alcohol Sensitivity",
      category: "Food Sensitivities",
      min: 1,
      max: 10,
      highRecommendation:
        "Limit alcohol consumption due to genetic sensitivity.",
      normalRecommendation: "Moderate alcohol intake is fine.",
      lowRecommendation: "Normal alcohol metabolism.",
    },
    {
      _uuid: uuidv4(),
      id: "caffeine_sensitivity",
      label: "Caffeine Sensitivity",
      category: "Food Sensitivities",
      min: 1,
      max: 10,
      highRecommendation: "Limit caffeine intake due to slow metabolism.",
      normalRecommendation:
        "Normal caffeine metabolism; moderate intake is fine.",
      lowRecommendation:
        "Fast caffeine metabolism; higher intake may be tolerated.",
    },
  ],
  // NEW: Default patient-specific results for dynamic diet fields
  patientDietAnalysisResults: [
    {
      fieldId: "carbohydrate_sensitivity",
      score: 5,
      level: "NORMAL",
      recommendation: "Maintain balanced carbohydrate intake.",
    },
    {
      fieldId: "fat_sensitivity",
      score: 7,
      level: "HIGH",
      recommendation: "Reduce saturated and trans fats; focus on healthy fats.",
    },
    {
      fieldId: "protein_requirement",
      score: 3,
      level: "LOW",
      recommendation: "Ensure adequate protein intake for muscle maintenance.",
    },
    {
      fieldId: "meal_frequency",
      score: 6,
      level: "FREQUENT",
      recommendation: "Consider smaller, more frequent meals.",
    },
    {
      fieldId: "alcohol_sensitivity",
      score: 9,
      level: "HIGH",
      recommendation: "Limit alcohol consumption due to genetic sensitivity.",
    },
    {
      fieldId: "caffeine_sensitivity",
      score: 2,
      level: "LOW",
      recommendation: "Normal caffeine metabolism; moderate intake is fine.",
    },
  ],
  nutritionData: {
    vitamins: {
      vitaminA: {
        score: 3,
        healthImpact: "Skin & Vision",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      vitaminB12: {
        score: 6,
        healthImpact: "Nervous System & Bones",
        intakeLevel: "ENHANCED INTAKE (METHYLCOBALAMIN)",
        source: "DIET",
      },
      vitaminB2: {
        score: 3,
        healthImpact: "Energy Metabolism",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      vitaminB6: {
        score: 6,
        healthImpact: "Tissue growth repair",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      vitaminB9: {
        score: 3,
        healthImpact: "RBC development & Heart health",
        intakeLevel: "ENHANCED INTAKE (L METHYLFOLATE)",
        source: "DIET",
      },
      vitaminC: {
        score: 3,
        healthImpact: "Skin & Immunity",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      vitaminD: {
        score: 6,
        healthImpact: "Bones & Diabetes",
        intakeLevel: "ENHANCED INTAKE & SUN EXPOSURE",
        source: "DIET & SUN EXPOSURE",
      },
      vitaminE: {
        score: 5,
        healthImpact: "Skin & Immune system",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
    },
    fattyAcids: {
      omegaFattyAcids: {
        score: 5,
        healthImpact: "Cardiac health & Triglycerides",
        intakeLevel: "ENHANCED INTAKE (VEG SOURCES)",
        source: "ENHANCED INTAKE (VEG/FISH OIL) & DIET",
      },
    },
    elements: {
      calcium: {
        score: 3,
        healthImpact: "Bone health & Nerve function",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      iodine: {
        score: 3,
        healthImpact: "Detoxification & Thyroid hormones",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      iron: {
        score: 3,
        healthImpact: "Haemoglobin & Energy",
        intakeLevel: "RESTRICTED INTAKE",
        source: "DIET",
      },
      magnesium: {
        score: 3,
        healthImpact: "Heart health & Immunity",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      phosphorus: {
        score: 3,
        healthImpact: "Bone health & Kidney function",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      selenium: {
        score: 3,
        healthImpact: "Cognitive & Muscle function",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      zinc: {
        score: 3,
        healthImpact: "Fertility & Skin",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
    },
    complexNutrients: {
      antiInflammatory: {
        score: 5,
        healthImpact: "Pain control & Organ health",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      antioxidants: {
        score: 6,
        healthImpact: "Skin & Immune system",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
    },
  },
  sportsAndFitness: {
    exerciseType: {
      endurancePotential: {
        level: "High Endurance Potential",
        description:
          "Excellent genetic predisposition for endurance activities",
      },
      powerPotential: {
        level: "Average Power Potential",
        description: "Moderate power output capacity",
      },
      strengthProfile: {
        level: "High Strength Profile",
        description: "Good potential for strength training",
      },
      exerciseTime: {
        level: "Evening time is more beneficial than morning",
        description: "MORNING Vs. EVENING",
      },
    },
    performance: {
      enduranceCapacity: {
        level: "High Endurance Potential",
        description: "Superior aerobic capacity",
      },
      fatigueResistance: {
        level: "Normal fatigue resistance. Average endurance capacity",
        description: "Average endurance capacity",
      },
      bloodFlow: {
        level: "Reduced vascular efficiency, affects endurance sports.",
        description: "Affects endurance sports",
      },
      oxygenEfficiency: {
        level: "Normal VO2 Max. Need practice to excel in endurance sports",
        description: "Need practice to excel",
      },
      waterLoss: {
        level:
          "Increased water and electrolyte loss tendency. Focus on Hydration and electrolyte management during sports/events",
        description: "Focus on hydration",
      },
      lactateClearing: {
        level: "High lactate clearance. Beneficial for Endurance sports.",
        description: "Beneficial for endurance",
      },
      recoveryEfficiency: {
        level:
          "High recovery efficiency. Enhanced sports potential & reduced injury risk",
        description: "Enhanced sports potential",
      },
      bodyComposition: {
        level: "Low fat accumulation. Increased muscle tendency.",
        description: "Increased muscle tendency",
      },
      injuryRisk: {
        level:
          "High injury tendency. Thorough injury management steps to be taken.",
        description: "Thorough injury management needed",
      },
      achillesTendonInjury: {
        level: "Low injury tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      ligamentInjury: {
        level:
          "Low ACL injury tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      rupture: {
        level: "Low rupture tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      muscleCramps: {
        level:
          "Low risk of muscle cramps. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
    },
  },
  lifestyleConditions: {
    heartVascularHealth: {
      hypertension: { status: "strength" },
      leftVentricularHypertrophy: { status: "strength" },
      atherosclerosis: { status: "improvement" },
      familialHypercholesterolemia: { status: "strength" },
      cardiomyopathy: { status: "strength" },
      cholesterolImbalance: { status: "improvement" },
      stroke: { status: "improvement" },
    },
    diabesity: {
      obesity: { status: "improvement" },
      diabetesType2: { status: "improvement" },
    },
    liverHealth: {
      nafld: { status: "improvement" },
      liverCirrhosis: { status: "strength" },
    },
    boneHealth: {
      osteoporosis: { status: "improvement" },
      osteoarthritis: { status: "improvement" },
    },
    gutHealth: {
      irritableBowelSyndrome: { status: "improvement" },
      celiacDisease: { status: "strength" },
    },
    hormoneSystem: {
      hypothyroidism: { status: "improvement" },
    },
  },
  metabolicCore: {
    methylation: {
      genes: ["MTHFR"],
      genotype: "C/T",
      impact: "Reduced folate metabolism",
      advice: "Consider L-methylfolate supplementation.",
    },
    inflammation: {
      genes: ["CRP"],
      genotype: "G/A",
      impact: "Increased inflammatory response",
      advice: "Incorporate anti-inflammatory foods.",
    },
    oxidativeStress: {
      genes: ["SOD2"],
      genotype: "T/C",
      impact: "Reduced antioxidant defense",
      advice: "Increase antioxidant-rich foods and supplements.",
    },
    detoxification: {
      genes: ["GSTP1"],
      genotype: "A/G",
      impact: "Impaired detoxification capacity",
      advice: "Support liver health with cruciferous vegetables.",
    },
    vitaminDMetabolism: {
      genes: ["VDR"],
      genotype: "C/C",
      impact: "Reduced Vitamin D absorption",
      advice: "Ensure adequate Vitamin D intake and sun exposure.",
    },
    lipidMetabolism: {
      genes: ["APOE"],
      genotype: "E3/E4",
      impact: "Increased LDL cholesterol tendency",
      advice: "Monitor lipid levels and follow a heart-healthy diet.",
    },
    insulinResistance: {
      genes: ["TCF7L2"],
      genotype: "T/T",
      impact: "Higher risk of insulin resistance",
      advice: "Focus on low glycemic index foods and regular exercise.",
    },
    circadianRhythm: {
      genes: ["CLOCK"],
      genotype: "C/G",
      impact: "Altered sleep-wake cycle",
      advice:
        "Maintain consistent sleep schedule and optimize sleep environment.",
    },
    exerciseResponsiveness: {
      genes: ["ACTN3"],
      genotype: "R/X",
      impact: "Enhanced power and strength response to training",
      advice: "Incorporate strength and power training into routine.",
    },
    snackingTendency: {
      genes: ["FTO"],
      genotype: "A/A",
      impact: "Increased tendency for snacking and higher BMI",
      advice: "Practice mindful eating and portion control.",
    },
    oestrogenElimination: {
      genes: ["COMT"],
      genotype: "G/A",
      impact: "Slower estrogen elimination",
      advice: "Support liver detoxification pathways.",
    },
    powerVsEndurance: {
      genes: ["ACE"],
      genotype: "I/D",
      impact: "Balanced power and endurance potential",
      advice: "Vary training to include both power and endurance exercises.",
    },
    injuryRecovery: {
      genes: ["COL1A1"],
      genotype: "G/T",
      impact: "Slower collagen repair, increased injury risk",
      advice: "Focus on adequate protein and Vitamin C for tissue repair.",
    },
    fluidLossTendency: {
      genes: ["AGT"],
      genotype: "T/C",
      impact: "Increased fluid and electrolyte loss during exercise",
      advice: "Ensure proper hydration and electrolyte replenishment.",
    },
    vo2Max: {
      genes: ["PPARGC1A"],
      genotype: "G/G",
      impact: "High VO2 Max potential",
      advice: "Optimize cardiovascular training for peak performance.",
    },
  },
  digestiveHealth: {
    gutHealth: {
      level: "NORMAL GUT HEALTH",
      description: "Good overall digestive function",
    },
    glutenIntolerance: {
      level: "LOW INTOLERANCE",
      description: "CONDITIONAL GLUTEN ELIMINATION NEEDED",
    },
    celiacDiseaseTendency: {
      level: "LOW TENDENCY",
      description: "Low genetic risk for celiac disease",
    },
    impactOnBonesJoints: {
      level: "NO IMPACT ON BONE HEALTH",
      description: "Digestive health does not affect bone health",
    },
    lactoseIntolerance: {
      level: "HIGH INTOLERANCE",
      description: "LACTOSE ELIMINATION NEEDED",
    },
    probioticsRequirement: {
      level: "PROBIOTICS NEEDED",
      description: "FOOD & SUPPLEMENTS",
    },
  },
  genesAndAddiction: {
    alcoholAddiction: {
      tendency: "LOW",
      description: "Low genetic predisposition to alcohol dependency",
    },
    smokingAddiction: {
      tendency: "NORMAL",
      description: "Average nicotine addiction susceptibility",
    },
    snackingHabits: {
      tendency: "HIGH",
      description: "Genetic tendency toward frequent snacking",
    },
    altruism: {
      tendency: "HIGH",
      description: "Strong genetic predisposition toward helping others",
    },
  },
  sleepAndRest: {
    sleepCycle: {
      impact: "DELAYED SLEEP CYCLE",
      intervention: "EXERCISE IN THE EVENING AVOID CARBS DURING BREAKFAST",
    },
    sleepApnea: {
      impact: "INCREASED CHANCES OF SLEEP APNEA",
      intervention: "EXERCISE REGULARLY SEEK MEDICAL ADVICE IF ISSUE PERSISTS",
    },
    sleepDepth: {
      impact: "LOW SLEEP DEPTH",
      intervention: "CONSUME CURD RICE IN DINNER FOR BETTER SLEEP",
    },
    stressSensitivity: {
      impact: "LOW STRESS SENSITIVITY",
      intervention: "EXERCISE REGULARLY FOR A BETTER SLEEP CYCLE",
    },
  },
  allergiesAndSensitivity: {
    dustAllergy: { tendency: "NORMAL" },
    pesticideSensitivity: { tendency: "HIGH" },
    smokeSensitivity: { tendency: "HIGH" },
    automobileSmokeSensitivity: { tendency: "HIGH" },
    generalAdvice:
      "THE BEST WAY TO REDUCE ALLERGIES IS TO STAY AWAY FROM THE SOURCE, NO ROCKET SCIENCE HOWEVER THE FOLLOWING MAY HELP REDUCE THE EXTENT: ADEQUATE VIT E INTAKE REDUCING INFLAMMATORY FOODS ADEQUATE REST",
  },
  geneTestResults: [
    {
      geneName: "ALDH2 Aldehyde dehydrogenase 2",
      variation: "G>A",
      result: "GG",
    },
    {
      geneName: "MTHFR Methylenetetrahydrofolate reductase",
      variation: "C>T",
      result: "CT",
    },
  ],
  metabolicSummary: {
    strengths: ["Efficient detoxification", "Normal lipid metabolism"],
    weaknesses: [
      "Increased oxidative stress",
      "Higher risk of insulin resistance",
    ],
  },
  preventiveHealth: {
    diagnosticTests: {
      halfYearly: ["PLASMA SUGAR (FASTING & PP)", "VITAMIN D"],
      yearly: [
        "HbA1c",
        "LIPID PROFILE",
        "SERUM HOMOCYSTEINE",
        "VITAMIN B12",
        "LIVER PROFILE",
      ],
    },
    nutritionalSupplements: [
      { supplement: "VITAMIN D", needed: true },
      { supplement: "METHYL FOLATE + METHYL COBALAMINE + B6", needed: true },
      { supplement: "OMEGA FATTY ACIDS (FISH OIL)", needed: true },
      { supplement: "FOLIC ACID + COBALAMINE + B6", needed: true },
      { supplement: "OMEGA FATTY ACIDS (VEG)", needed: true },
      { supplement: "VITAMIN E", needed: true },
      { supplement: "PROBIOTICS", needed: true },
    ],
  },
  familyGeneticImpact: [
    {
      gene: "MnSOD",
      normalAlleles: "AA",
      yourResult: "AG",
      healthImpact:
        "INCREASED TENDENCY OF OXIDATIVE STRESS NEED OF ANTI-OXIDANT SUPPLEMENTS",
    },
    {
      gene: "FTO",
      normalAlleles: "TT",
      yourResult: "AT",
      healthImpact:
        "INCREASED TENDENCY OF INSULIN RESISTANCE WEIGHT AND CALORIE MANAGEMENT IMPORTANT TO MANAGE AND REDUCE RISK OF INSULIN RESISTANCE",
    },
  ],
  categories: [
    {
      id: "category_1",
      category: "Lipid Metabolism",
      imageUrl: "/table/content.png",
      description:
        "This category includes genes related to lipid metabolism and cardiovascular risk.",
      parameters: [
        "APOA1yy",
        "APOB",
        "LDLR",
        "CETP",
        "LIPC",
        "LPL",
        "SCARB1",
        "ABCA1",
        "PCSK9",
        "ANGPTL3",
        "ANGPTL4",
        "PLTP",
        "APOC3",
        "APOE",
        "SREBF2",
        "HMGCR",
        "LCAT",
        "CYP7A1",
        "PPARA",
        "PPARG",
        "NR1H3",
      ],
      isActive: true,
      order: 1,
    },
  ],
  geneticParameters: [],
  metadata: {
    lastUpdated: "2025-07-20T12:00:00.000Z",
    version: "1.0.0",
    totalCategories: 1,
    totalParameters: 21,
  },
  summaries: {
    nutrigenomicsSummary:
      "Based on the overall nutrigenomics analysis, provide expert summary for personalized diet and lifestyle plan...",
    exerciseGenomicsSummary:
      "Based on the overall genomics analysis, provide expert summary for personalized exercise plan...",
  },
});

const AdminPage = () => {
  const [reportData, setReportData] =
    useState<ComprehensiveReportData>(getDefaultReportData);
  const { toast } = useToast();

  // Load data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/report-data");
        if (response.ok) {
          const data = await response.json();
          setReportData(data);
          toast({
            description: "Report data has been loaded from the backend.",
            variant: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: "Failed to load data",
            description:
              "Could not load report data from the server. Using default data.",
            variant: "destructive",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        toast({
          title: "Error fetching data",
          description:
            "An error occurred while fetching data from the server. Using default data.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    fetchData();
  }, []);

  const saveReportData = async () => {
    try {
      const response = await fetch("/api/report-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        toast({
          title: "Report data saved!",
          description: "Your progress has been saved to the backend.",
          variant: "success",
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to save data",
          description:
            errorData.error || "An error occurred while saving data.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving report data:", error);
      toast({
        title: "Error saving data",
        description: "An unexpected error occurred while saving data.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const resetSection = (section: keyof ComprehensiveReportData) => {
    setReportData((prev) => {
      const defaultData = getDefaultReportData();
      return { ...prev, [section]: defaultData[section] };
    });
    toast({
      title: `${section} reset!`,
      description: `The ${section} section has been reset to default values.`,
      duration: 3000,
    });
  };

  const updatePatientInfo = (field: keyof PatientInfo, value: string) => {
    setReportData((prev) => ({
      ...prev,
      patientInfo: { ...prev.patientInfo, [field]: value },
    }));
  };

  const updateReportContent = (field: keyof ReportContent, value: string) => {
    setReportData((prev) => ({
      ...prev,
      content: { ...prev.content, [field]: value },
    }));
  };

  const updateReportSettings = (field: keyof ReportSettings, value: string) => {
    setReportData((prev) => ({
      ...prev,
      settings: { ...prev.settings, [field]: value },
    }));
  };

  // NEW: Update function for dynamicDietFieldDefinitions
  const updateDynamicDietFieldDefinitions = (
    definitions: DynamicDietFieldDefinition[]
  ) => {
    setReportData((prev) => ({
      ...prev,
      dynamicDietFieldDefinitions: definitions,
    }));
  };

  // NEW: Update function for patientDietAnalysisResults
  const updatePatientDietAnalysisResult = (
    fieldId: string,
    data: Partial<PatientDietAnalysisResult>
  ) => {
    setReportData((prev) => {
      const existingIndex = prev.patientDietAnalysisResults.findIndex(
        (r) => r.fieldId === fieldId
      );
      const newResults = [...prev.patientDietAnalysisResults];

      if (existingIndex > -1) {
        newResults[existingIndex] = { ...newResults[existingIndex], ...data };
      } else {
        // If result for this fieldId doesn't exist, create a new one
        newResults.push({
          fieldId,
          score: 0,
          level: "NORMAL",
          recommendation: "",
          ...data,
        });
      }
      return { ...prev, patientDietAnalysisResults: newResults };
    });
  };

  const updateNutritionData = (
    category: keyof NutritionData,
    nutrient: string,
    field: keyof NutrientData,
    value: string | number
  ) => {
    setReportData((prev) => ({
      ...prev,
      nutritionData: {
        ...prev.nutritionData,
        [category]: {
          ...prev.nutritionData[category],
          [nutrient]: {
            ...prev.nutritionData[category][
              nutrient as keyof (typeof prev.nutritionData)[typeof category]
            ],
            [field]: value,
          },
        },
      },
    }));
  };

  const updateSportsAndFitness = (
    section: keyof SportsAndFitness,
    field: string,
    data: Partial<ExerciseData>
  ) => {
    setReportData((prev) => ({
      ...prev,
      sportsAndFitness: {
        ...prev.sportsAndFitness,
        [section]: {
          ...prev.sportsAndFitness[section],
          [field]: {
            ...prev.sportsAndFitness[section][
              field as keyof (typeof prev.sportsAndFitness)[typeof section]
            ],
            ...data,
          },
        },
      },
    }));
  };

  const updateLifestyleCondition = (
    section: keyof LifestyleConditions,
    field: string,
    status: HealthConditionStatus["status"]
  ) => {
    setReportData((prev) => ({
      ...prev,
      lifestyleConditions: {
        ...prev.lifestyleConditions,
        [section]: {
          ...prev.lifestyleConditions[section],
          [field]: {
            ...prev.lifestyleConditions[section][
              field as keyof (typeof prev.lifestyleConditions)[typeof section]
            ],
            status: status,
          },
        },
      },
    }));
  };

  const updateMetabolicCore = (
    field: keyof MetabolicCore,
    data: Partial<MetabolicGeneData>
  ) => {
    setReportData((prev) => ({
      ...prev,
      metabolicCore: {
        ...prev.metabolicCore,
        [field]: {
          ...prev.metabolicCore[field],
          ...data,
        },
      },
    }));
  };

  const updateDigestiveHealth = (
    field: keyof DigestiveHealth,
    data: Partial<DigestiveHealthData>
  ) => {
    setReportData((prev) => ({
      ...prev,
      digestiveHealth: {
        ...prev.digestiveHealth,
        [field]: {
          ...prev.digestiveHealth[field],
          ...data,
        },
      },
    }));
  };

  const updateGenesAndAddiction = (
    field: keyof GenesAndAddiction,
    data: Partial<AddictionData>
  ) => {
    setReportData((prev) => ({
      ...prev,
      genesAndAddiction: {
        ...prev.genesAndAddiction,
        [field]: {
          ...prev.genesAndAddiction[field],
          ...data,
        },
      },
    }));
  };

  const updateSleepAndRest = (
    field: keyof SleepAndRest,
    data: Partial<SleepData>
  ) => {
    setReportData((prev) => ({
      ...prev,
      sleepAndRest: {
        ...prev.sleepAndRest,
        [field]: {
          ...prev.sleepAndRest[field],
          ...data,
        },
      },
    }));
  };

  const updateAllergiesAndSensitivity = (
    field: keyof AllergiesAndSensitivity,
    data: Partial<AllergyData> | string
  ) => {
    setReportData((prev) => ({
      ...prev,
      allergiesAndSensitivity: {
        ...prev.allergiesAndSensitivity,
        [field]:
          typeof data === "string"
            ? data
            : {
                ...(prev.allergiesAndSensitivity[
                  field as Exclude<
                    keyof AllergiesAndSensitivity,
                    "generalAdvice"
                  >
                ] as AllergyData),
                ...data,
              },
      },
    }));
  };

  const updatePreventiveHealth = (
    section: keyof PreventiveHealth,
    data: any
  ) => {
    setReportData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const addFamilyGeneticImpact = () => {
    setReportData((prev) => ({
      ...prev,
      familyGeneticImpact: [
        ...prev.familyGeneticImpact,
        { gene: "", normalAlleles: "", yourResult: "", healthImpact: "" },
      ],
    }));
  };

  const updateFamilyGeneticImpact = (
    index: number,
    field: keyof FamilyGeneticImpact,
    value: string
  ) => {
    setReportData((prev) => {
      const newImpacts = [...prev.familyGeneticImpact];
      newImpacts[index] = { ...newImpacts[index], [field]: value };
      return { ...prev, familyGeneticImpact: newImpacts };
    });
  };

  const removeFamilyGeneticImpact = (index: number) => {
    setReportData((prev) => ({
      ...prev,
      familyGeneticImpact: prev.familyGeneticImpact.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateGeneTestResult = (
    index: number,
    field: keyof GeneTestResult,
    value: string
  ) => {
    setReportData((prev) => {
      const newGeneTests = [...prev.geneTestResults];
      newGeneTests[index] = { ...newGeneTests[index], [field]: value };
      return { ...prev, geneTestResults: newGeneTests };
    });
  };

  const addGeneTestResult = () => {
    setReportData((prev) => ({
      ...prev,
      geneTestResults: [
        ...prev.geneTestResults,
        { geneName: "", variation: "", result: "" },
      ],
    }));
  };

  const removeGeneTestResult = (index: number) => {
    setReportData((prev) => ({
      ...prev,
      geneTestResults: prev.geneTestResults.filter((_, i) => i !== index),
    }));
  };

  const updateReportSummaries = (
    field: keyof ReportSummaries,
    value: string
  ) => {
    setReportData((prev) => ({
      ...prev,
      summaries: { ...prev.summaries, [field]: value },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="mb-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start no-print">
        <Button onClick={saveReportData} className="w-full sm:w-auto">
          Save Data
        </Button>
        <Button
          onClick={() => setReportData(getDefaultReportData())}
          className="w-full sm:w-auto"
        >
          Reset All
        </Button>
      </div>

      <Tabs defaultValue="patient-info" className="w-[100%]">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <TabsList className="flex gap-2 min-w-max bg-white shadow-sm px-4 py-2 rounded-md border border-gray-200">
            <TabsTrigger value="patient-info">Patient Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="genetic-parameters">
              Table Of Content
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="diet-fields">Diet Fields</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="sports-fitness">Sports & Fitness</TabsTrigger>
            <TabsTrigger value="lifestyle-conditions">Lifestyle</TabsTrigger>
            <TabsTrigger value="metabolic-core">Metabolic Core</TabsTrigger>
            <TabsTrigger value="digestive-health">Digestive Health</TabsTrigger>
            <TabsTrigger value="genes-addiction">Genes & Addiction</TabsTrigger>
            <TabsTrigger value="sleep-rest">Sleep & Rest</TabsTrigger>
            <TabsTrigger value="allergies-sensitivity">Allergies</TabsTrigger>
            <TabsTrigger value="preventive-health">
              Preventive Health
            </TabsTrigger>
            <TabsTrigger value="family-genetic-impact">
              Family Impact
            </TabsTrigger>
            <TabsTrigger value="genes">Gene Results</TabsTrigger>
            <TabsTrigger value="summaries">Summaries</TabsTrigger>
            <TabsTrigger value="pdf-export">PDF Export</TabsTrigger>
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="patient-info">
          <PatientInfoAdmin
            patientInfo={reportData.patientInfo}
            updatePatientInfo={updatePatientInfo}
            onSave={() => saveReportData()}
            onReset={() => resetSection("patientInfo")}
          />
        </TabsContent>
        <TabsContent value="content">
          <ContentAdmin
            content={reportData.content}
            updateContent={updateReportContent}
            onSave={() => saveReportData()}
            onReset={() => resetSection("content")}
          />
        </TabsContent>

        <TabsContent value="genetic-parameters">
          <GeneticParametersAdmin
            geneticParameters={reportData.geneticParameters}
            updateParameters={(updated) =>
              setReportData((prev) => ({ ...prev, geneticParameters: updated }))
            }
            onSave={() => saveReportData()}
            onReset={() => resetSection("geneticParameters")}
          />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsAdmin
            settings={reportData.settings}
            updateSettings={updateReportSettings}
            onSave={() => saveReportData()}
            onReset={() => resetSection("settings")}
          />
        </TabsContent>

        <TabsContent value="diet-fields">
          {" "}
          {/* Changed tab content value */}
          <DynamicDietFieldAdmin
            dynamicDietFieldDefinitions={reportData.dynamicDietFieldDefinitions}
            updateDynamicDietFieldDefinitions={
              updateDynamicDietFieldDefinitions
            }
            onSave={() => saveReportData()}
            onReset={() => resetSection("dynamicDietFieldDefinitions")}
          />
        </TabsContent>
        <TabsContent value="nutrition">
          <NutritionAdmin
            nutritionData={reportData.nutritionData}
            updateNutritionData={updateNutritionData}
            onSave={() => saveReportData()}
            onReset={() => resetSection("nutritionData")}
          />
        </TabsContent>
        <TabsContent value="sports-fitness">
          <SportsFitnessAdmin
            sportsAndFitness={reportData.sportsAndFitness}
            updateSportsAndFitness={updateSportsAndFitness}
            onSave={() => saveReportData()}
            onReset={() => resetSection("sportsAndFitness")}
          />
        </TabsContent>
        <TabsContent value="lifestyle-conditions">
          <LifestyleConditionsAdmin
            lifestyleConditions={reportData.lifestyleConditions}
            updateLifestyleCondition={updateLifestyleCondition}
            onSave={() => saveReportData()}
            onReset={() => resetSection("lifestyleConditions")}
          />
        </TabsContent>
        <TabsContent value="metabolic-core">
          <MetabolicCoreAdmin
            metabolicCore={reportData.metabolicCore}
            updateMetabolicCore={updateMetabolicCore}
            onSave={() => saveReportData()}
            onReset={() => resetSection("metabolicCore")}
          />
        </TabsContent>
        <TabsContent value="digestive-health">
          <DigestiveHealthAdmin
            digestiveHealth={reportData.digestiveHealth}
            updateDigestiveHealth={updateDigestiveHealth}
            onSave={() => saveReportData()}
            onReset={() => resetSection("digestiveHealth")}
          />
        </TabsContent>
        <TabsContent value="genes-addiction">
          <GenesAddictionAdmin
            genesAndAddiction={reportData.genesAndAddiction}
            updateGenesAndAddiction={updateGenesAndAddiction}
            onSave={() => saveReportData()}
            onReset={() => resetSection("genesAndAddiction")}
          />
        </TabsContent>
        <TabsContent value="sleep-rest">
          <SleepRestAdmin
            sleepAndRest={reportData.sleepAndRest}
            updateSleepAndRest={updateSleepAndRest}
            onSave={() => saveReportData()}
            onReset={() => resetSection("sleepAndRest")}
          />
        </TabsContent>
        <TabsContent value="allergies-sensitivity">
          <AllergiesSensitivityAdmin
            allergiesAndSensitivity={reportData.allergiesAndSensitivity}
            updateAllergiesAndSensitivity={updateAllergiesAndSensitivity}
            onSave={() => saveReportData()}
            onReset={() => resetSection("allergiesAndSensitivity")}
          />
        </TabsContent>
        <TabsContent value="preventive-health">
          <PreventiveHealthAdmin
            preventiveHealth={reportData.preventiveHealth}
            updatePreventiveHealth={updatePreventiveHealth}
            onSave={() => saveReportData()}
            onReset={() => resetSection("preventiveHealth")}
          />
        </TabsContent>
        <TabsContent value="family-genetic-impact">
          <FamilyGeneticImpactAdmin
            familyGeneticImpact={reportData.familyGeneticImpact}
            addFamilyGeneticImpact={addFamilyGeneticImpact}
            updateFamilyGeneticImpact={updateFamilyGeneticImpact}
            removeFamilyGeneticImpact={removeFamilyGeneticImpact}
            onSave={() => saveReportData()}
            onReset={() => resetSection("familyGeneticImpact")}
          />
        </TabsContent>
        <TabsContent value="genes">
          <GeneResultsAdmin
            geneTestResults={reportData.geneTestResults}
            updateGeneTestResult={updateGeneTestResult}
            addGeneTestResult={addGeneTestResult}
            removeGeneTestResult={removeGeneTestResult}
            onSave={() => saveReportData()}
            onReset={() => resetSection("geneTestResults")}
          />
        </TabsContent>
        <TabsContent value="summaries">
          <SummariesAdmin
            summaries={reportData.summaries}
            updateSummaries={updateReportSummaries}
            onSave={() => saveReportData()}
            onReset={() => resetSection("summaries")}
          />
        </TabsContent>
        <TabsContent value="pdf-export">
          <PDFGenerator reportData={reportData} />
        </TabsContent>
        <TabsContent value="import-export">
          <ImportExportAdmin
            reportData={reportData}
            setReportData={setReportData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
