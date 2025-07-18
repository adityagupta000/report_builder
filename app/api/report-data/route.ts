import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid" // Import uuid
import type { ComprehensiveReportData } from "@/types/report-types"

const dataFilePath = path.join(process.cwd(), "data", "report-data.json")

// Default data to initialize if the file doesn't exist
const defaultReportData: ComprehensiveReportData = {
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
  },
  content: {
    disclaimer:
      "This report is for informational purposes only and should not be used as a substitute for professional medical advice.",
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
      highRecommendation: "Reduce saturated and trans fats; focus on healthy fats.",
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
      lowRecommendation: "Consider increasing protein intake for muscle maintenance.",
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
      highRecommendation: "Limit alcohol consumption due to genetic sensitivity.",
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
      normalRecommendation: "Normal caffeine metabolism; moderate intake is fine.",
      lowRecommendation: "Fast caffeine metabolism; higher intake may be tolerated.",
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
      vitaminA: { score: 3, healthImpact: "Skin & Vision", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
      vitaminB12: {
        score: 6,
        healthImpact: "Nervous System & Bones",
        intakeLevel: "ENHANCED INTAKE (METHYLCOBALAMIN)",
        source: "DIET",
      },
      vitaminB2: { score: 3, healthImpact: "Energy Metabolism", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
      vitaminB6: { score: 6, healthImpact: "Tissue growth repair", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
      vitaminB9: {
        score: 3,
        healthImpact: "RBC development & Heart health",
        intakeLevel: "ENHANCED INTAKE (L METHYLFOLATE)",
        source: "DIET",
      },
      vitaminC: { score: 3, healthImpact: "Skin & Immunity", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
      vitaminD: {
        score: 6,
        healthImpact: "Bones & Diabetes",
        intakeLevel: "ENHANCED INTAKE & SUN EXPOSURE",
        source: "DIET & SUN EXPOSURE",
      },
      vitaminE: { score: 5, healthImpact: "Skin & Immune system", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
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
      iron: { score: 3, healthImpact: "Haemoglobin & Energy", intakeLevel: "RESTRICTED INTAKE", source: "DIET" },
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
      zinc: { score: 3, healthImpact: "Fertility & Skin", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
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
        description: "Excellent genetic predisposition for endurance activities",
      },
      powerPotential: { level: "Average Power Potential", description: "Moderate power output capacity" },
      strengthProfile: { level: "High Strength Profile", description: "Good potential for strength training" },
      exerciseTime: { level: "Evening time is more beneficial than morning", description: "MORNING Vs. EVENING" },
    },
    performance: {
      enduranceCapacity: { level: "High Endurance Potential", description: "Superior aerobic capacity" },
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
        level: "High recovery efficiency. Enhanced sports potential & reduced injury risk",
        description: "Enhanced sports potential",
      },
      bodyComposition: {
        level: "Low fat accumulation. Increased muscle tendency.",
        description: "Increased muscle tendency",
      },
      injuryRisk: {
        level: "High injury tendency. Thorough injury management steps to be taken.",
        description: "Thorough injury management needed",
      },
      achillesTendonInjury: {
        level: "Low injury tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      ligamentInjury: {
        level: "Low ACL injury tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      rupture: {
        level: "Low rupture tendency. Ensure adequate warmup before exercises",
        description: "Ensure adequate warmup",
      },
      muscleCramps: {
        level: "Low risk of muscle cramps. Ensure adequate warmup before exercises",
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
      advice: "Maintain consistent sleep schedule and optimize sleep environment.",
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
    gutHealth: { level: "NORMAL GUT HEALTH", description: "Good overall digestive function" },
    glutenIntolerance: { level: "LOW INTOLERANCE", description: "CONDITIONAL GLUTEN ELIMINATION NEEDED" },
    celiacDiseaseTendency: { level: "LOW TENDENCY", description: "Low genetic risk for celiac disease" },
    impactOnBonesJoints: {
      level: "NO IMPACT ON BONE HEALTH",
      description: "Digestive health does not affect bone health",
    },
    lactoseIntolerance: { level: "HIGH INTOLERANCE", description: "LACTOSE ELIMINATION NEEDED" },
    probioticsRequirement: { level: "PROBIOTICS NEEDED", description: "FOOD & SUPPLEMENTS" },
  },
  genesAndAddiction: {
    alcoholAddiction: { tendency: "LOW", description: "Low genetic predisposition to alcohol dependency" },
    smokingAddiction: { tendency: "NORMAL", description: "Average nicotine addiction susceptibility" },
    snackingHabits: { tendency: "HIGH", description: "Genetic tendency toward frequent snacking" },
    altruism: { tendency: "HIGH", description: "Strong genetic predisposition toward helping others" },
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
    sleepDepth: { impact: "LOW SLEEP DEPTH", intervention: "CONSUME CURD RICE IN DINNER FOR BETTER SLEEP" },
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
    weaknesses: ["Increased oxidative stress", "Higher risk of insulin resistance"],
  },
  preventiveHealth: {
    diagnosticTests: {
      halfYearly: ["PLASMA SUGAR (FASTING & PP)", "VITAMIN D"],
      yearly: ["HbA1c", "LIPID PROFILE", "SERUM HOMOCYSTEINE", "VITAMIN B12", "LIVER PROFILE"],
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
      healthImpact: "INCREASED TENDENCY OF OXIDATIVE STRESS NEED OF ANTI-OXIDANT SUPPLEMENTS",
    },
    {
      gene: "FTO",
      normalAlleles: "TT",
      yourResult: "AT",
      healthImpact:
        "INCREASED TENDENCY OF INSULIN RESISTANCE WEIGHT AND CALORIE MANAGEMENT IMPORTANT TO MANAGE AND REDUCE RISK OF INSULIN RESISTANCE",
    },
  ],
  summaries: {
    nutrigenomicsSummary:
      "Based on the overall nutrigenomics analysis, provide expert summary for personalized diet and lifestyle plan...",
    exerciseGenomicsSummary:
      "Based on the overall genomics analysis, provide expert summary for personalized exercise plan...",
  },
}

export async function GET() {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(dataFilePath)
    await fs.mkdir(dataDir, { recursive: true })

    let data: ComprehensiveReportData

    try {
      const fileContent = await fs.readFile(dataFilePath, "utf-8")
      data = JSON.parse(fileContent)
    } catch (readError: any) {
      if (readError.code === "ENOENT") {
        // File does not exist, initialize with default data
        data = defaultReportData
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8")
      } else {
        // Other read errors
        console.error("Error reading report data file:", readError)
        return NextResponse.json({ error: "Failed to read report data" }, { status: 500 })
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/report-data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data: ComprehensiveReportData = await request.json()

    // Basic validation (can be expanded)
    if (!data || !data.patientInfo || !data.content) {
      return NextResponse.json({ error: "Invalid report data provided" }, { status: 400 })
    }

    // Ensure the data directory exists
    const dataDir = path.dirname(dataFilePath)
    await fs.mkdir(dataDir, { recursive: true })

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8")
    return NextResponse.json({ message: "Report data saved successfully" })
  } catch (error) {
    console.error("Error in POST /api/report-data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
