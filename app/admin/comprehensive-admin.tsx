// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Save, ArrowLeft } from "lucide-react"
// import Link from "next/link"

// // Import all admin components
// import PatientInfoAdmin from "@/components/admin/patient-info-admin"
// import ContentAdmin from "@/components/admin/content-admin"
// import SettingsAdmin from "@/components/admin/settings-admin"
// import DietAnalysisAdmin from "@/components/admin/diet-analysis-admin"
// import GeneResultsAdmin from "@/components/admin/gene-results-admin"
// import ImportExportAdmin from "@/components/admin/import-export-admin"
// import SummariesAdmin from "@/components/admin/summaries-admin"

// import type {
//   ComprehensiveReportData,
//   PatientInfo,
//   ReportContent,
//   ReportSettings,
//   DietAnalysis,
//   MacronutrientData,
//   GeneTestResult,
//   ReportSummaries,
// } from "@/types/report-types"

// export default function ComprehensiveAdminPage() {
//   const [reportData, setReportData] = useState<ComprehensiveReportData>({
//     patientInfo: {
//       name: "",
//       gender: "",
//       birthDate: "",
//       sampleCode: "",
//       sampleDate: "",
//       reportDate: "",
//       reportAuth: "",
//       genomicAnalytics: "",
//       checkedBy: "",
//       scientificContent: "",
//     },
//     content: {
//       disclaimer: `The present report tells you about genetic variations/mutations associated with certain traits and health conditions. They do not diagnose for any conditions or determine medical action. Having a certain risk does not mean you will definitely develop the trait or condition. Similarly, you could still develop a trait or condition even if you do not have a detected mutation, as there may be other genetic mutations not included in this report. Genetics is not a crystal ball—it alone cannot predict what will or will not be. Factors like lifestyle and environment can also affect whether a person develops a health condition or trait. The current report cannot tell you about your overall risk for these conditions, and they cannot determine if you will or will not develop a condition.

// This report cannot replace visits to a healthcare professional. Your results serve as a reference point, and should not be interpreted as medical advice. Please consult with a healthcare professional for guidance in interpreting and using genetic results. The analytics in the report are based on the data generated through the GSA testing laboratory, using proprietary algorithms and scoring methods that are developed by and hence a property of AIRGenomix Pvt Ltd.

// Example, pvt , a comprehensive health app that leverages genetic, metabolic, anthropometric, and clinical data to accurately identify lifestyle diseases and provide tailored interventions, including personalized diet, nutrition, and exercise plans.`,
//       introduction: `Welcome to your personalised nutrigenomics test report. It is our absolute pleasure to introduce you to your life story spelled out with your DNA. The most interesting facts that uniquely belong to you are wrapped up in the strands of your genes. Therefore, if you could rewrite your story-what would it say? Nutrigenomics testing is the ultimate way to care for your future self by giving you a wealth of information that allows you to alter what might have been your genetic destiny. We have carefully analysed your genomic data generated from the state-of-the-art laboratory with national and international accreditations, and have analysed the data using research-based data algorithm developed by the "experts" team through years of combined experience and expertise. In your report, you will discover insights into the incredible story of your genome, your health, traits, and needs. Armed with this information, you will have the power to live a longer, healthier and happier life.`,
//       genomicsExplanation: `We all are aware that DNA is the blueprint of the human body. The external features, strengths, capabilities and even disease risks in humans, is governed by the DNA. The information stored in our DNA is obtained from our parents. The DNA is composed of small segments called genes. Scientists report that more than 20000 genes are present in human DNA. The study of these genes, their roles, information coded by the genes, and other aspects of genes is called genomics. Genomics is an advanced field which utilises combination of new age technologies for DNA sequencing, DNA analysis, Information technology based DNA data analysis and human health information, all put together for improving human health issues. Genomics has been helpful in developing novel drugs, vaccines, therapeutic protocols, management of infertility, early diagnosis and many such health applications.`,
//       genesHealthImpact: `The human DNA consists of more than 20000 genes. Every gene has a role to play. Genes carry information to synthesise specific proteins, which function either as catalysts (e.g. digestive enzymes) in chemical reactions or as structural proteins (ossein proteins in bone) in different parts of the body. Genes may be present in two forms, namely, wild type (Normal) or variant type (Mutant). Those born with the mutant form of genes (obtained from one or both the parents) may have a higher risk of metabolic imbalances. Such imbalances may cause several lifestyle diseases. Hence, it is important to map such genes and help individuals manage or prevent lifestyle diseases. The science of nutrigenomics helps individuals to understand their genetic strengths and weaknesses and design a diet, exercise, and lifestyle pattern for active and preventive management of diseases. The variations in the genes may often be at a single point and hence are termed single nucleotide polymorphisms (SNPs). The science of nutrigenomics is based on detecting the presence of various SNPs and correlating their association with the personalization of lifestyle of an individual.`,
//       fundamentalsPRS: `The risk of an individual to suffer from a chronic condition, such as lifestyle disease or cancer is highly dependant upon the set of genes that the person inherits from his/her parents. Many metabolic health issues, diseases and other characteristics of an individual usually are governed by more than one gene; hence, such characteristics (traits) are called as polygenic (governed by multiple genes). A scientific method of determining the risk/chance of an individual to suffer from a particular condition can be determined by studying the information present in the associated genes. This tool is known as Polygenic Risk Score or Polygenic Score Analysis. Polygenic Score analysis indicates if a person carries weakness in certain metabolic functions, while some individuals may have a strong polygenic score indicating genetic strength and less chances of suffering from a disease. In the present report, we have carefully curated data from your genes and have carried out Polygenic Score Analysis to understand your health better. Further, with the help of our proprietary algorithm, we have also provided crisp and easy to adapt lifestyle methods to work towards the weaknesses you might have inherited as indicated by the polygenic risk scores.`,
//       utilityDoctors: `Your polygenic risk scores are not something you should be scared of, as you can always works towards improving your health, especially now that you are aware about your focus health areas. A trained and certified health practitioner, doctor and or a dietitian, with the knowledge of nutrigenomics and genomic tools can help you utilise this report in fine-tuning your diet, exercise, lifestyle habits and many more aspects of your life such that it helps you in improving your health condition. For example, gluten, a protein from wheat may cause digestive system related problems in people with a genetic sensitivity to gluten as indicated by the polygenic analysis. However, a doctor or dietitian, with the knowledge of nutrigenomics, can design a diet for you in such a way that that you will be able to overcome the ill-effects of gluten that you eat or will suggest you ways to avoid or include wheat in your diet. Our objective is to bring important actionable points based on your polygenic analysis for the betterment of your health in the most personalised manner.`,
//       microarrayExplanation: `A microarray is a process that involves detecting several (approximately 0.01 to 0.6 million) variations/SNPs present in a DNA sample, at a time. This type of analysis where large number of variations can be studied is termed as a high throughput analysis and is highly valuable in determining polygenic analysis. We congratulate you for taking an appreciable step towards getting your DNA analysed using the microarray tool. You now have a large packet of information about your own DNA and this can prove useful to you not just today, but also in future. Genomic analysis tools such as microarrays are required to be done only once in a lifetime, and the data can be archived for use any time in future. While there are various technologies available for microarray analysis, presently you have undertaken, Infinium™ Global Screening Array (GSA) v3.0, which is developed by Illumina Inc. which detects around 0.65 million SNPs/variants in your DNA sample.`,
//       microarrayData: `The microarray data obtained from your DNA is precious and has been archived on a secured cloud based data storage location. This data shall remain available to you throughout your lifetime. The microarray data contains various SNPs that play a crucial role in polygenic score analysis for various health issues. The current report includes the use of around 145 SNPs out of the total SNPs tested. The traits mentioned here are highly useful and in the hands of a doctor/dietitian, it provides you valuable advice on your health aspects. This analysis is based on the scientific information available till date, however, with the advances in genomics science on a day-to-day basis, association between new traits may emerge. We shall keep you informed about the new traits being studied so that you can chose to explore the same genomic data in future to obtain additional information about your health.`,
//     },
//     settings: {
//       title: "COMPREHENSIVE GENOMICS REPORT",
//       subtitle: "NUTRIGENOMICS TEST REPORT",
//       companyName: "Example PVT LTD",
//       headerColor: "#1e40af",
//       accentColor: "#3b82f6",
//       fonts: {
//         primary: "Inter, system-ui, sans-serif",
//         secondary: "Roboto, system-ui, sans-serif",
//         mono: "JetBrains Mono, Consolas, monospace",
//       },
//     },
//     dietAnalysis: {
//       macronutrients: {
//         carbohydrateSensitivity: {
//           score: 3,
//           level: "HIGH",
//           recommendation: "Maintain carb intake <45% For obesity & IR control",
//         },
//         fatSensitivity: { score: 6, level: "HIGH", recommendation: "Fat intake not to exceed 15% of total calories" },
//         proteinRequirement: {
//           score: 6,
//           level: "HIGH",
//           recommendation: "Protein supplements needed along with dietary source",
//         },
//       },
//       mealPattern: {
//         mealFrequency: { score: 6, level: "FREQUENT", recommendation: "4-5 small meals suggested in a day" },
//         mealReplacement: { score: 6, level: "SUITABLE", recommendation: "Meal replacements may help in weight loss" },
//         weightMaintenance: { score: 6, level: "HIGH", recommendation: "Weight maintenance regime can be liberal" },
//       },
//       foodSensitivities: {
//         alcoholSensitivity: {
//           score: 4,
//           level: "HIGH",
//           recommendation:
//             "High sensitivity, avoid alcohol if possible, especially the types of beverages that trigger intolerance reaction.",
//         },
//         caffeineSensitivity: {
//           score: 6,
//           level: "HIGH",
//           recommendation: "High sensitivity, do not consume >4 cups/day",
//         },
//         glutenSensitivity: { score: 3, level: "HIGH", recommendation: "Gluten intake needs to be reduced/stopped" },
//         lactoseSensitivity: { score: 10, level: "HIGH", recommendation: "Milk & milk products need to be avoided" },
//         saltSensitivity: {
//           score: 10,
//           level: "HIGH",
//           recommendation: "Try to reduce overall salt intake to up to 3-5 gm per day",
//         },
//       },
//       tasteSensitivities: {
//         spiceTolerance: { score: 6, level: "NORMAL", recommendation: "Normal sensitivity to taste" },
//         sweetTaste: { score: 3, level: "HIGH", recommendation: "High sweet consumption tendency" },
//         tasteSensitivity: { score: 6, level: "NORMAL", recommendation: "Normal taste sensitivity" },
//       },
//     },
//     nutritionData: {
//       vitamins: {
//         vitaminA: { score: 3, healthImpact: "Skin & Vision", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//         vitaminB12: {
//           score: 6,
//           healthImpact: "Nervous System & Bones",
//           intakeLevel: "ENHANCED INTAKE (METHYLCOBALAMIN)",
//           source: "DIET",
//         },
//         vitaminB2: { score: 3, healthImpact: "Energy Metabolism", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//         vitaminB6: { score: 6, healthImpact: "Tissue growth repair", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//         vitaminB9: {
//           score: 3,
//           healthImpact: "RBC development & Heart health",
//           intakeLevel: "ENHANCED INTAKE (L METHYLFOLATE)",
//           source: "DIET",
//         },
//         vitaminC: { score: 3, healthImpact: "Skin & Immunity", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//         vitaminD: {
//           score: 6,
//           healthImpact: "Bones & Diabetes",
//           intakeLevel: "ENHANCED INTAKE & SUN EXPOSURE",
//           source: "DIET & SUN EXPOSURE",
//         },
//         vitaminE: { score: 5, healthImpact: "Skin & Immune system", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//       },
//       fattyAcids: {
//         omegaFattyAcids: {
//           score: 5,
//           healthImpact: "Cardiac health & Triglycerides",
//           intakeLevel: "ENHANCED INTAKE (VEG SOURCES)",
//           source: "ENHANCED INTAKE (VEG/FISH OIL) & DIET",
//         },
//       },
//       elements: {
//         calcium: {
//           score: 3,
//           healthImpact: "Bone health & Nerve function",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         iodine: {
//           score: 3,
//           healthImpact: "Detoxification & Thyroid hormones",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         iron: { score: 3, healthImpact: "Haemoglobin & Energy", intakeLevel: "RESTRICTED INTAKE", source: "DIET" },
//         magnesium: {
//           score: 3,
//           healthImpact: "Heart health & Immunity",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         phosphorus: {
//           score: 3,
//           healthImpact: "Bone health & Kidney function",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         selenium: {
//           score: 3,
//           healthImpact: "Cognitive & Muscle function",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         zinc: { score: 3, healthImpact: "Fertility & Skin", intakeLevel: "ENHANCED INTAKE", source: "DIET" },
//       },
//       complexNutrients: {
//         antiInflammatory: {
//           score: 5,
//           healthImpact: "Pain control & Organ health",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//         antioxidants: {
//           score: 6,
//           healthImpact: "Skin & Immune system",
//           intakeLevel: "ENHANCED INTAKE",
//           source: "DIET",
//         },
//       },
//     },
//     sportsAndFitness: {
//       exerciseType: {
//         endurancePotential: {
//           level: "High Endurance Potential",
//           description: "Excellent genetic predisposition for endurance activities",
//         },
//         powerPotential: { level: "Average Power Potential", description: "Moderate power output capacity" },
//         strengthProfile: { level: "High Strength Profile", description: "Good potential for strength training" },
//         exerciseTime: { level: "Evening time is more beneficial than morning", description: "MORNING Vs. EVENING" },
//       },
//       performance: {
//         enduranceCapacity: { level: "High Endurance Potential", description: "Superior aerobic capacity" },
//         fatigueResistance: {
//           level: "Normal fatigue resistance. Average endurance capacity",
//           description: "Average endurance capacity",
//         },
//         bloodFlow: {
//           level: "Reduced vascular efficiency, affects endurance sports.",
//           description: "Affects endurance sports",
//         },
//         oxygenEfficiency: {
//           level: "Normal VO2 Max. Need practice to excel in endurance sports",
//           description: "Need practice to excel",
//         },
//         waterLoss: {
//           level:
//             "Increased water and electrolyte loss tendency. Focus on Hydration and electrolyte management during sports/events",
//           description: "Focus on hydration",
//         },
//         lactateClearing: {
//           level: "High lactate clearance. Beneficial for Endurance sports.",
//           description: "Beneficial for endurance",
//         },
//         recoveryEfficiency: {
//           level: "High recovery efficiency. Enhanced sports potential & reduced injury risk",
//           description: "Enhanced sports potential",
//         },
//         bodyComposition: {
//           level: "Low fat accumulation. Increased muscle tendency.",
//           description: "Increased muscle tendency",
//         },
//         injuryRisk: {
//           level: "High injury tendency. Thorough injury management steps to be taken.",
//           description: "Thorough injury management needed",
//         },
//         achillesTendonInjury: {
//           level: "Low injury tendency. Ensure adequate warmup before exercises",
//           description: "Ensure adequate warmup",
//         },
//         ligamentInjury: {
//           level: "Low ACL injury tendency. Ensure adequate warmup before exercises",
//           description: "Ensure adequate warmup",
//         },
//         rupture: {
//           level: "Low rupture tendency. Ensure adequate warmup before exercises",
//           description: "Ensure adequate warmup",
//         },
//         muscleCramps: {
//           level: "Low risk of muscle cramps. Ensure adequate warmup before exercises",
//           description: "Ensure adequate warmup",
//         },
//       },
//     },
//     lifestyleConditions: {
//       heartVascularHealth: {
//         hypertension: { status: "strength" },
//         leftVentricularHypertrophy: { status: "strength" },
//         atherosclerosis: { status: "improvement" },
//         familialHypercholesterolemia: { status: "strength" },
//         cardiomyopathy: { status: "strength" },
//         cholesterolImbalance: { status: "improvement" },
//         stroke: { status: "improvement" },
//       },
//       diabesity: {
//         obesity: { status: "improvement" },
//         diabetesType2: { status: "improvement" },
//       },
//       liverHealth: {
//         nafld: { status: "improvement" },
//         liverCirrhosis: { status: "strength" },
//       },
//       boneHealth: {
//         osteoporosis: { status: "improvement" },
//         osteoarthritis: { status: "improvement" },
//       },
//       gutHealth: {
//         irritableBowelSyndrome: { status: "improvement" },
//         celiacDisease: { status: "strength" },
//       },
//       hormoneSystem: {
//         hypothyroidism: { status: "improvement" },
//       },
//     },
//     metabolicCore: {
//       methylation: {
//         genes: ["MTHFR (A>C)", "MTHFR (C>T)", "MTR", "MTRR", "CBS"],
//         genotype: "TT, GG, GG, GG, CC",
//         impact: "NORMAL METHYLATION",
//         advice: "FOLIC ACID & METHYL COBALAMINE NEEDED TO MAINTAIN HOMOCYSTEINE",
//       },
//       inflammation: {
//         genes: ["TNF-A", "IL6", "CRP"],
//         genotype: "GG, GG, TC",
//         impact: "HIGH INFLAMMATION",
//         advice: "ANTI-INFLAMMATORY SUPPLEMENT INTAKE SUGGESTED",
//       },
//       oxidativeStress: {
//         genes: ["MnSOD", "SOD2"],
//         genotype: "AG, AG",
//         impact: "HIGH OXIDATIVE STRESS",
//         advice: "ANTIOXIDANT SUPPLEMENTS REQUIRED TO MANAGE OXIDATIVE STRESS",
//       },
//       detoxification: {
//         genes: ["GSTP1", "CYP1A2"],
//         genotype: "AA, AC",
//         impact: "AFFECTED DETOXIFICATION ABILITY",
//         advice: "SUPPORT LIVER DETOXIFICATION WITH CRUCIFEROUS VEGETABLES",
//       },
//       vitaminDMetabolism: {
//         genes: ["VDR-3 (Taq)", "VDR-2 (Bsm)"],
//         genotype: "AG, TC",
//         impact: "LOW VIT D. METABOLISM",
//         advice: "HIGHER VITAMIN D SUPPLEMENTATION NEEDED",
//       },
//       lipidMetabolism: {
//         genes: ["CETP", "APOE", "LPL", "APOC3"],
//         genotype: "AA, TC, CC, GG",
//         impact: "HIGH TENDENCY OF DYSLIPIDEMIA",
//         advice: "PCF RATIO 30:55:15% LPL= LDL, CETP= HDL, APOC3=TRIGLYCERIDES",
//       },
//       insulinResistance: {
//         genes: ["TCF7l2", "PPARG", "FTO"],
//         genotype: "TT, CC, AT",
//         impact: "HIGH INSULIN RESISTANCE (IR)",
//         advice: "FTO = IR TENDENCY TCF7L2 = OBESITY TRIGGERED IR PPARG= CENTRAL OBESITY",
//       },
//       circadianRhythm: {
//         genes: ["CLOCK"],
//         genotype: "AG",
//         impact: "EVENING EXERCISE TO BE PREFERRED",
//         advice: "EVENING EXERCISE TO BE PREFERRED",
//       },
//       exerciseResponsiveness: {
//         genes: ["ADRB2-2", "ADRB2-1", "ADRB3"],
//         genotype: "CC, GG, AG",
//         impact: "SLOW RESPONSE TO WORKOUT",
//         advice: "HIGH INTENSITY WORKOUT ADRB2-2 = CARBS SENSITIVITY",
//       },
//       snackingTendency: {
//         genes: ["MC4R"],
//         genotype: "TC",
//         impact: "SNACKING TENDENCY PRESENT",
//         advice: "CONTROL SNACKING HABITS WITH STRUCTURED MEAL TIMING",
//       },
//       oestrogenElimination: {
//         genes: ["COMT", "CYPB1A1"],
//         genotype: "GG, CG",
//         impact: "AFFECTED OESTROGEN ELIMINATION",
//         advice: "SUPPORT ESTROGEN DETOX WITH CRUCIFEROUS VEGETABLES",
//       },
//       powerVsEndurance: {
//         genes: ["ACE", "AGT", "ACTN3"],
//         genotype: "AA, GG, TT",
//         impact: "HIGH POWER POTENTIAL",
//         advice: "ACE (WHITE) = ENDURANCE AGT (RED) = LVH/HT",
//       },
//       injuryRecovery: {
//         genes: ["COL1A1", "GDF5"],
//         genotype: "CC, AG",
//         impact: "INCREASED RISK OF INJURY",
//         advice: "FOCUS ON INJURY PREVENTION AND PROPER WARM-UP",
//       },
//       fluidLossTendency: {
//         genes: ["BDKRB2"],
//         genotype: "TC",
//         impact: "HIGH FLUID LOSS TENDENCY",
//         advice: "MAINTAIN PROPER HYDRATION DURING EXERCISE",
//       },
//       vo2Max: {
//         genes: ["VEGF"],
//         genotype: "GG",
//         impact: "AVERAGE VO2 MAX",
//         advice: "FOCUS ON AEROBIC TRAINING TO IMPROVE VO2 MAX",
//       },
//     },
//     digestiveHealth: {
//       gutHealth: { level: "NORMAL GUT HEALTH", description: "Good overall digestive function" },
//       glutenIntolerance: { level: "LOW INTOLERANCE", description: "CONDITIONAL GLUTEN ELIMINATION NEEDED" },
//       celiacDiseaseTendency: { level: "LOW TENDENCY", description: "Low genetic risk for celiac disease" },
//       impactOnBonesJoints: {
//         level: "NO IMPACT ON BONE HEALTH",
//         description: "Digestive health does not affect bone health",
//       },
//       lactoseIntolerance: { level: "HIGH INTOLERANCE", description: "LACTOSE ELIMINATION NEEDED" },
//       probioticsRequirement: { level: "PROBIOTICS NEEDED", description: "FOOD & SUPPLEMENTS" },
//     },
//     genesAndAddiction: {
//       alcoholAddiction: { tendency: "LOW", description: "Low genetic predisposition to alcohol dependency" },
//       smokingAddiction: { tendency: "NORMAL", description: "Average nicotine addiction susceptibility" },
//       snackingHabits: { tendency: "HIGH", description: "Genetic tendency toward frequent snacking" },
//       altruism: { tendency: "HIGH", description: "Strong genetic predisposition toward helping others" },
//     },
//     sleepAndRest: {
//       sleepCycle: {
//         impact: "DELAYED SLEEP CYCLE",
//         intervention: "EXERCISE IN THE EVENING AVOID CARBS DURING BREAKFAST",
//       },
//       sleepApnea: {
//         impact: "INCREASED CHANCES OF SLEEP APNEA",
//         intervention: "EXERCISE REGULARLY SEEK MEDICAL ADVICE IF ISSUE PERSISTS",
//       },
//       sleepDepth: { impact: "LOW SLEEP DEPTH", intervention: "CONSUME CURD RICE IN DINNER FOR BETTER SLEEP" },
//       stressSensitivity: {
//         impact: "LOW STRESS SENSITIVITY",
//         intervention: "EXERCISE REGULARLY FOR A BETTER SLEEP CYCLE",
//       },
//     },
//     allergiesAndSensitivity: {
//       dustAllergy: { tendency: "NORMAL" },
//       pesticideSensitivity: { tendency: "HIGH" },
//       smokeSensitivity: { tendency: "HIGH" },
//       automobileSmokeSensitivity: { tendency: "HIGH" },
//       generalAdvice:
//         "THE BEST WAY TO REDUCE ALLERGIES IS TO STAY AWAY FROM THE SOURCE, NO ROCKET SCIENCE HOWEVER THE FOLLOWING MAY HELP REDUCE THE EXTENT: ADEQUATE VIT E INTAKE REDUCING INFLAMMATORY FOODS ADEQUATE REST",
//     },
//     geneTestResults: [
//       { geneName: "ALDH2 Aldehyde dehydrogenase 2", variation: "G>A", result: "GG" },
//       { geneName: "ACTN3 Alpha-actinin-3 protein", variation: "C>T", result: "TT" },
//       { geneName: "ACE Angiotensin I-Converting Enzyme", variation: "G>A", result: "AA" },
//       { geneName: "AGT Angiotensinogen", variation: "G>A", result: "GG" },
//       { geneName: "ApoA5 Apolipoprotein A5", variation: "G>A", result: "GG" },
//       { geneName: "APOC3 Apolipoprotein C 3", variation: "C>G", result: "GG" },
//       { geneName: "APOE Apolipoprotein E", variation: "C>T", result: "TC" },
//       { geneName: "APOE4 Apolipoprotein E (TOMM40)", variation: "A>G", result: "AA" },
//       { geneName: "ADRB2-1 BETA-2-ADRENERGIC RECEPTOR (1)", variation: "A>G", result: "GG" },
//       { geneName: "ADRB2-2 BETA-2-ADRENERGIC RECEPTOR (2)", variation: "C>G", result: "CC" },
//     ],
//     metabolicSummary: {
//       strengths: [
//         "NORMAL METHYLATION",
//         "HIGH POWER POTENTIAL",
//         "NORMAL GUT HEALTH",
//         "LOW STRESS SENSITIVITY",
//         "HIGH RECOVERY EFFICIENCY",
//       ],
//       weaknesses: [
//         "HIGH INFLAMMATION",
//         "HIGH OXIDATIVE STRESS",
//         "AFFECTED DETOXIFICATION ABILITY",
//         "LOW VIT D. METABOLISM",
//         "HIGH INSULIN RESISTANCE",
//         "AFFECTED OESTROGEN ELIMINATION",
//         "INCREASED RISK OF INJURY",
//         "HIGH FLUID LOSS TENDENCY",
//       ],
//     },
//     preventiveHealth: {
//       diagnosticTests: {
//         halfYearly: ["PLASMA SUGAR (FASTING & PP)", "VITAMIN D"],
//         yearly: ["HbA1c", "LIPID PROFILE", "SERUM HOMOCYSTEINE", "VITAMIN B12", "LIVER PROFILE"],
//       },
//       nutritionalSupplements: [
//         { supplement: "VITAMIN D", needed: true },
//         { supplement: "METHYL FOLATE + METHYL COBALAMINE + B6", needed: true },
//         { supplement: "OMEGA FATTY ACIDS (FISH OIL)", needed: true },
//         { supplement: "FOLIC ACID + COBALAMINE + B6", needed: true },
//         { supplement: "OMEGA FATTY ACIDS (VEG)", needed: true },
//         { supplement: "VITAMIN E", needed: true },
//         { supplement: "PROBIOTICS", needed: true },
//       ],
//     },
//     familyGeneticImpact: [
//       {
//         gene: "MnSOD",
//         normalAlleles: "AA",
//         yourResult: "AG",
//         healthImpact: "INCREASED TENDENCY OF OXIDATIVE STRESS NEED OF ANTI-OXIDANT SUPPLEMENTS",
//       },
//       {
//         gene: "FTO",
//         normalAlleles: "TT",
//         yourResult: "AT",
//         healthImpact:
//           "INCREASED TENDENCY OF INSULIN RESISTANCE WEIGHT AND CALORIE MANAGEMENT IMPORTANT TO MANAGE AND REDUCE RISK OF INSULIN RESISTANCE",
//       },
//     ],
//     summaries: {
//       nutrigenomicsSummary:
//         "Based on your genetic analysis, you have specific nutritional needs including enhanced vitamin D, folate metabolism support, and anti-inflammatory nutrients. Your genetic profile suggests a personalized approach to diet and supplementation for optimal health outcomes.",
//       exerciseGenomicsSummary:
//         "Your genetic profile indicates high endurance potential with good recovery capacity. Focus on aerobic training while maintaining proper hydration and injury prevention protocols. Evening exercise sessions are recommended based on your circadian rhythm genetics.",
//     },
//   })

//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadReportData()
//   }, [])

//   const loadReportData = async () => {
//     try {
//       const response = await fetch("/api/comprehensive-report-data")
//       if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
//         const data = await response.json()
//         setReportData(data)
//       }
//     } catch (error) {
//       console.error("Error loading report data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const saveReportData = async () => {
//     setIsSaving(true)
//     try {
//       const response = await fetch("/api/comprehensive-report-data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(reportData),
//       })

//       if (response.ok) {
//         alert("Report data saved successfully!")
//       }
//     } catch (error) {
//       console.error("Error saving report data:", error)
//       alert("Error saving report data")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Helper functions for updating nested data
//   const updatePatientInfo = (field: keyof PatientInfo, value: string) => {
//     setReportData((prev) => ({
//       ...prev,
//       patientInfo: { ...prev.patientInfo, [field]: value },
//     }))
//   }

//   const updateContent = (field: keyof ReportContent, value: string) => {
//     setReportData((prev) => ({
//       ...prev,
//       content: { ...prev.content, [field]: value },
//     }))
//   }

//   const updateSettings = (field: keyof ReportSettings, value: string) => {
//     setReportData((prev) => ({
//       ...prev,
//       settings: { ...prev.settings, [field]: value },
//     }))
//   }

//   const updateDietAnalysis = (section: keyof DietAnalysis, field: string, data: Partial<MacronutrientData>) => {
//     setReportData((prev) => ({
//       ...prev,
//       dietAnalysis: {
//         ...prev.dietAnalysis,
//         [section]: {
//           ...prev.dietAnalysis[section],
//           [field]: {
//             ...prev.dietAnalysis[section][field as keyof (typeof prev.dietAnalysis)[typeof section]],
//             ...data,
//           },
//         },
//       },
//     }))
//   }

//   const updateSummaries = (field: keyof ReportSummaries, value: string) => {
//     setReportData((prev) => ({
//       ...prev,
//       summaries: { ...prev.summaries, [field]: value },
//     }))
//   }

//   // Gene test results management
//   const addGeneTestResult = () => {
//     setReportData((prev) => ({
//       ...prev,
//       geneTestResults: [...prev.geneTestResults, { geneName: "", variation: "", result: "" }],
//     }))
//   }

//   const updateGeneTestResult = (index: number, field: keyof GeneTestResult, value: string) => {
//     setReportData((prev) => {
//       const newResults = [...prev.geneTestResults]
//       newResults[index] = { ...newResults[index], [field]: value }
//       return { ...prev, geneTestResults: newResults }
//     })
//   }

//   const removeGeneTestResult = (index: number) => {
//     setReportData((prev) => ({
//       ...prev,
//       geneTestResults: prev.geneTestResults.filter((_, i) => i !== index),
//     }))
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
//           <p className="text-gray-600 text-lg">Loading comprehensive admin panel...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <Link href="/">
//               <Button variant="outline" size="sm" className="shadow-sm bg-transparent">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Home
//               </Button>
//             </Link>
//             <h1 className="text-4xl font-bold text-gray-900">🧬 Comprehensive Genomics Admin</h1>
//           </div>
//           <div className="flex gap-2">
//             <Link href="/report/preview">
//               <Button variant="outline" className="shadow-sm bg-transparent">
//                 👁️ Preview Report
//               </Button>
//             </Link>
//             <Button onClick={saveReportData} disabled={isSaving} className="shadow-sm">
//               <Save className="h-4 w-4 mr-2" />
//               {isSaving ? "Saving..." : "Save All Changes"}
//             </Button>
//           </div>
//         </div>

//         <Tabs defaultValue="patient-info" className="space-y-6">
//           <ScrollArea className="w-full whitespace-nowrap">
//             <TabsList className="grid w-full grid-cols-8 gap-1 bg-white shadow-sm">
//               <TabsTrigger value="patient-info">Patient Info</TabsTrigger>
//               <TabsTrigger value="content">Content</TabsTrigger>
//               <TabsTrigger value="settings">Settings</TabsTrigger>
//               <TabsTrigger value="diet">Diet Analysis</TabsTrigger>
//               <TabsTrigger value="genes">Gene Results</TabsTrigger>
//               <TabsTrigger value="summaries">Summaries</TabsTrigger>
//               <TabsTrigger value="import-export">Import/Export</TabsTrigger>
//               <TabsTrigger value="more">More Sections</TabsTrigger>
//             </TabsList>
//           </ScrollArea>

//           {/* Patient Info Tab */}
//           <TabsContent value="patient-info">
//             <PatientInfoAdmin patientInfo={reportData.patientInfo} updatePatientInfo={updatePatientInfo} />
//           </TabsContent>

//           {/* Content Tab */}
//           <TabsContent value="content">
//             <ContentAdmin content={reportData.content} updateContent={updateContent} />
//           </TabsContent>

//           {/* Settings Tab */}
//           <TabsContent value="settings">
//             <SettingsAdmin settings={reportData.settings} updateSettings={updateSettings} />
//           </TabsContent>

//           {/* Diet Analysis Tab */}
//           <TabsContent value="diet">
//             <DietAnalysisAdmin dietAnalysis={reportData.dietAnalysis} updateDietAnalysis={updateDietAnalysis} />
//           </TabsContent>

//           {/* Gene Results Tab */}
//           <TabsContent value="genes">
//             <GeneResultsAdmin
//               geneTestResults={reportData.geneTestResults}
//               addGeneTestResult={addGeneTestResult}
//               updateGeneTestResult={updateGeneTestResult}
//               removeGeneTestResult={removeGeneTestResult}
//             />
//           </TabsContent>

//           {/* Summaries Tab */}
//           <TabsContent value="summaries">
//             <SummariesAdmin summaries={reportData.summaries} updateSummaries={updateSummaries} />
//           </TabsContent>

//           {/* Import/Export Tab */}
//           <TabsContent value="import-export">
//             <ImportExportAdmin reportData={reportData} setReportData={setReportData} />
//           </TabsContent>

//           {/* More Sections Tab */}
//           <TabsContent value="more">
//             <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//               <div className="text-6xl mb-4">🚧</div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Sections Coming Soon</h2>
//               <p className="text-gray-600 mb-6">
//                 More admin panels for Nutrition, Sports & Fitness, Lifestyle Conditions, Metabolic Core, and other
//                 sections will be added here.
//               </p>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-blue-800">Nutrition Admin</h4>
//                   <p className="text-blue-600">Vitamins, elements, supplements</p>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-green-800">Sports & Fitness Admin</h4>
//                   <p className="text-green-600">Exercise types, performance</p>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-purple-800">Metabolic Core Admin</h4>
//                   <p className="text-purple-600">Gene analysis, impacts</p>
//                 </div>
//                 <div className="bg-orange-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-orange-800">Lifestyle Conditions</h4>
//                   <p className="text-orange-600">Health conditions, risks</p>
//                 </div>
//                 <div className="bg-pink-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-pink-800">Sleep & Allergies</h4>
//                   <p className="text-pink-600">Sleep patterns, sensitivities</p>
//                 </div>
//                 <div className="bg-indigo-50 p-4 rounded-lg">
//                   <h4 className="font-semibold text-indigo-800">Preventive Health</h4>
//                   <p className="text-indigo-600">Tests, supplements</p>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
