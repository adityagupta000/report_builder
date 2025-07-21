"use client";
import type {
  ComprehensiveReportData,
  AllergyData,
} from "@/types/report-types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ComprehensiveReportViewerProps {
  reportData: ComprehensiveReportData;
}

const SectionTitle = ({ title, icon }: { title: string; icon: string }) => (
  <div className="w-full mb-8 mt-12 first:mt-0">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
      <span className="text-3xl sm:text-4xl">{icon}</span>
      <span className="break-words">{title}</span>
    </h2>
  </div>
);

const SubSectionTitle = ({ title, icon }: { title: string; icon?: string }) => (
  <div className="w-full mb-6 mt-8">
    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-center sm:text-left">
      {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
      <span className="break-words">{title}</span>
    </h3>
  </div>
);

const DataCard = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={`border-2 border-gray-200 bg-gray-50/50 shadow-sm h-fit ${className}`}
  >
    <CardHeader className="pb-3">
      <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 break-words">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-gray-700 space-y-2">
      {children}
    </CardContent>
  </Card>
);

export default function ComprehensiveReportViewer({
  reportData,
}: ComprehensiveReportViewerProps) {
  const {
    patientInfo,
    content,
    settings,
    dynamicDietFieldDefinitions,
    patientDietAnalysisResults,
    nutritionData,
    sportsAndFitness,
    lifestyleConditions,
    metabolicCore,
    digestiveHealth,
    genesAndAddiction,
    sleepAndRest,
    allergiesAndSensitivity,
    geneTestResults,
    preventiveHealth,
    familyGeneticImpact,
    summaries,
  } = reportData;

  const getImpactColor = (impact: string) => {
    if (
      impact.toLowerCase().includes("high") ||
      impact.toLowerCase().includes("increased")
    ) {
      return "bg-red-100 text-red-800 border-red-300";
    }
    if (
      impact.toLowerCase().includes("low") ||
      impact.toLowerCase().includes("reduced")
    ) {
      return "bg-green-100 text-green-800 border-green-300";
    }
    if (
      impact.toLowerCase().includes("normal") ||
      impact.toLowerCase().includes("average") ||
      impact.toLowerCase().includes("balanced")
    ) {
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusColor = (status: "strength" | "improvement") => {
    return status === "strength"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  // Helper to group dynamic diet fields by category
  const groupedDietFields = patientDietAnalysisResults.reduce((acc, result) => {
    const fieldDef = dynamicDietFieldDefinitions.find(
      (def) => def.id === result.fieldId
    );
    if (fieldDef) {
      if (!acc[fieldDef.category]) {
        acc[fieldDef.category] = [];
      }
      acc[fieldDef.category].push({ ...result, label: fieldDef.label });
    }
    return acc;
  }, {} as Record<string, (typeof patientDietAnalysisResults)[0] & { label: string }[]>);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 bg-white shadow-lg min-h-screen">
      {/* Report Header */}
      <header
        className="text-center mb-8 sm:mb-12 py-6 sm:py-8 rounded-lg px-4"
        style={{ backgroundColor: settings.headerColor, color: "#fff" }}
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 break-words"
          style={{ fontFamily: settings.fonts.primary }}
        >
          {settings.title}
        </h1>
        <p
          className="text-lg sm:text-xl lg:text-2xl font-light mb-4"
          style={{ fontFamily: settings.fonts.secondary }}
        >
          {settings.subtitle}
        </p>
        <div className="space-y-2 text-sm sm:text-base lg:text-lg">
          <p style={{ fontFamily: settings.fonts.secondary }}>
            Patient:{" "}
            <span className="font-semibold break-words">
              {patientInfo.name}
            </span>
          </p>
          <p style={{ fontFamily: settings.fonts.secondary }}>
            Sample Code:{" "}
            <span className="font-mono break-all">
              {patientInfo.sampleCode}
            </span>
          </p>
          <p
            className="text-xs sm:text-sm lg:text-base"
            style={{ fontFamily: settings.fonts.secondary }}
          >
            Report Date: {patientInfo.reportDate} | Generated by:{" "}
            {settings.companyName}
          </p>
        </div>
      </header>

      {/* Patient Information */}
      <SectionTitle title="Patient Information" icon="👤" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <DataCard title="Name">
          <p className="break-words">{patientInfo.name}</p>
        </DataCard>
        <DataCard title="Gender">
          <p>{patientInfo.gender}</p>
        </DataCard>
        <DataCard title="Birth Date">
          <p>{patientInfo.birthDate}</p>
        </DataCard>
        <DataCard title="Sample Code">
          <p className="font-mono break-all">{patientInfo.sampleCode}</p>
        </DataCard>
        <DataCard title="Sample Collection Date">
          <p>{patientInfo.sampleDate}</p>
        </DataCard>
        <DataCard title="Report Generation Date">
          <p>{patientInfo.reportDate}</p>
        </DataCard>
      </div>

      {/* Authentication Section */}
      <div className="mt-8 mb-8">
        <Separator className="mb-6" />
        <h3 className="text-center font-bold mb-6 text-gray-600 text-lg">
          Report Authentication & Analytics
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Genomic Data Analytics - Checked & Verified By
            </p>
            <div className="flex justify-center">
              {patientInfo.signature1 ? (
                <img
                  src={patientInfo.signature1 || "/placeholder.svg"}
                  alt="Primary Signature"
                  className="max-h-24 sm:max-h-32 w-auto object-contain"
                />
              ) : (
                <p className="italic text-gray-500">No signature available</p>
              )}
            </div>
            <p className="text-sm break-words">{patientInfo.checkedBy}</p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Scientific Content - Checked & Verified By
            </p>
            <div className="flex justify-center">
              {patientInfo.signature2 ? (
                <img
                  src={patientInfo.signature2 || "/placeholder.svg"}
                  alt="Secondary Signature"
                  className="max-h-24 sm:max-h-32 w-auto object-contain"
                />
              ) : (
                <p className="italic text-gray-500">No signature available</p>
              )}
            </div>
            <p className="text-sm break-words">
              {patientInfo.scientificContent}
            </p>
          </div>
        </div>

        <DataCard title="Disclaimer" className="mt-6">
          <p className="text-justify whitespace-pre-wrap break-words text-xs sm:text-sm">
            {patientInfo.disclaimer}
          </p>
        </DataCard>
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Preface Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-blue-600 text-white py-3 px-4 rounded">
          PREFACE
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8 mb-8">
        <DataCard title="Welcome Letter Introduction">
          <p className="text-justify whitespace-pre-line text-sm sm:text-base">
            {content.introduction}
          </p>
        </DataCard>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-blue-600 text-white py-3 px-4 rounded">
            WELCOME TO THE WORLD OF GENOMICS
          </h2>
        </div>

        {/* Genomics Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="What is Genomics?">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.genomicsExplanation}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genomics.png"
              alt="What is Genomics Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>

        {/* Genes & Health Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="Genes and Health Impact">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.genesHealthImpact}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genes-impact.jpg"
              alt="Genes and Health Impact Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-blue-600 text-white py-3 px-4 rounded">
            WHAT IS NUTRIGENOMICS
          </h2>
        </div>

        {/* Fundamentals and PRS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="Fundamentals and PRS">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.fundamentalsPRS}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genomics.png"
              alt="Fundamentals and PRS Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>

        {/* Utility for Doctors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="Utility for Doctors and Dietitians">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.utilityDoctors}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genomics.png"
              alt="Utility for Doctors and Dietitians Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-blue-600 text-white py-3 px-4 rounded">
            ABOUT MICROARRAY
          </h2>
        </div>

        {/* Microarray Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="Microarray Explanation">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.microarrayExplanation}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genomics.png"
              alt="Microarray Explanation Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>

        {/* Your Microarray Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DataCard title="Your Microarray Data">
            <p className="text-justify whitespace-pre-line text-sm sm:text-base">
              {content.microarrayData}
            </p>
          </DataCard>
          <div className="flex justify-center items-center">
            <img
              src="/assets/genomics.png"
              alt="Your Microarray Data Illustration"
              className="w-full max-w-md h-auto object-contain rounded"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Categories Section */}
      {reportData?.categories?.map((category) => {
        const columns: string[][] = [[], [], []];
        category.parameters.forEach((param, index) => {
          columns[index % 3].push(param);
        });

        return (
          <div key={category.id} className="mb-8 border-b border-gray-300 pb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Title and Image Section */}
              <div className="lg:w-1/4 w-full">
                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 mb-4 lg:mb-0">
                  <h2 className="text-lg font-bold text-gray-800 uppercase text-center lg:text-left break-words">
                    {category.category}
                  </h2>
                  {category.imageUrl && (
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.category}
                      className="w-16 h-16 object-cover rounded-full border flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Parameters Section */}
              <div className="lg:w-3/4 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {columns.map((col, colIndex) => (
                    <ul key={colIndex} className="list-none space-y-2">
                      {col.map((param, idx) => (
                        <li
                          key={idx}
                          className="text-gray-800 text-sm break-words"
                        >
                          {param}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Separator className="my-8 sm:my-12" />

      {/* Dynamic Diet Analysis */}
      <SectionTitle title="Diet Analysis" icon="🍎" />
      {Object.keys(groupedDietFields).length === 0 && (
        <p className="text-center text-gray-500 italic mb-8">
          No diet analysis results available.
        </p>
      )}
      {Object.entries(groupedDietFields).map(([category, fields]) => (
        <React.Fragment key={category}>
          <SubSectionTitle title={category} icon="🍽️" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {fields.map((data, index) => (
              <DataCard key={index} title={data.label}>
                <div className="space-y-1">
                  <p>
                    <strong>Score:</strong> {data.score}/10
                  </p>
                  <p>
                    <strong>Level:</strong> {data.level}
                  </p>
                  <div>
                    <p className="font-semibold">Recommendation:</p>
                    <ul className="mt-1 space-y-1">
                      {data.recommendations ? (
                        (["LOW", "NORMAL", "HIGH"] as const).map((level) => (
                          <li key={level}>
                            <span
                              className={`${
                                data.selectedLevel === level
                                  ? "text-black"
                                  : "text-gray-400"
                              }`}
                            >
                              {level}: {data.recommendations[level]}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-black">{data.recommendation}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </DataCard>
            ))}
          </div>
        </React.Fragment>
      ))}

      <Separator className="my-8 sm:my-12" />

      {/* Nutrition Data */}
      <SectionTitle title="Nutrition Analysis" icon="💊" />

      <SubSectionTitle title="Vitamins" icon="💊" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(nutritionData.vitamins).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Score:</strong> {data.score}/10
              </p>
              <p>
                <strong>Health Impact:</strong> {data.healthImpact}
              </p>
              <p>
                <strong>Intake Level:</strong> {data.intakeLevel}
              </p>
              <p>
                <strong>Source:</strong> {data.source}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Fatty Acids" icon="🐟" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(nutritionData.fattyAcids).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Score:</strong> {data.score}/10
              </p>
              <p>
                <strong>Health Impact:</strong> {data.healthImpact}
              </p>
              <p>
                <strong>Intake Level:</strong> {data.intakeLevel}
              </p>
              <p>
                <strong>Source:</strong> {data.source}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Essential Elements" icon="⚡" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(nutritionData.elements).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Score:</strong> {data.score}/10
              </p>
              <p>
                <strong>Health Impact:</strong> {data.healthImpact}
              </p>
              <p>
                <strong>Intake Level:</strong> {data.intakeLevel}
              </p>
              <p>
                <strong>Source:</strong> {data.source}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Complex Nutrients" icon="🌿" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(nutritionData.complexNutrients).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Score:</strong> {data.score}/10
              </p>
              <p>
                <strong>Health Impact:</strong> {data.healthImpact}
              </p>
              <p>
                <strong>Intake Level:</strong> {data.intakeLevel}
              </p>
              <p>
                <strong>Source:</strong> {data.source}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Sports & Fitness */}
      <SectionTitle title="Sports & Fitness" icon="🏃‍♂️" />

      <SubSectionTitle title="Exercise Type Suitability" icon="🏃‍♂️" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(sportsAndFitness.exerciseType).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Level:</strong> {data.level}
              </p>
              <p>
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Performance Factors" icon="⚡" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(sportsAndFitness.performance).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Level:</strong> {data.level}
              </p>
              <p>
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Lifestyle Conditions */}
      <SectionTitle title="Lifestyle Conditions" icon="🩺" />

      <SubSectionTitle title="Heart & Vascular Health" icon="❤️" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.heartVascularHealth).map(
          ([key, data]) => (
            <DataCard
              key={key}
              title={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            >
              <p>
                <strong>Status:</strong>{" "}
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
              </p>
            </DataCard>
          )
        )}
      </div>

      <SubSectionTitle title="Diabesity (Diabetes & Obesity)" icon="🍬" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.diabesity).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </p>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Liver Health" icon="🧫" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.liverHealth).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </p>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Bone Health" icon="🦴" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.boneHealth).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </p>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Gut Health" icon="🦠" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.gutHealth).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </p>
          </DataCard>
        ))}
      </div>

      <SubSectionTitle title="Hormone System" icon="🧪" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(lifestyleConditions.hormoneSystem).map(
          ([key, data]) => (
            <DataCard
              key={key}
              title={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            >
              <p>
                <strong>Status:</strong>{" "}
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
              </p>
            </DataCard>
          )
        )}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Metabolic Core */}
      <SectionTitle title="Metabolic Core" icon="🧬" />
      <div className="space-y-6 mb-8">
        {Object.entries(metabolicCore).map(([key, data]) => (
          <Card
            key={key}
            className="border-2 border-purple-200 bg-purple-50/50 shadow-sm"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-semibold text-purple-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="break-words">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
                <Badge className={getImpactColor(data.impact)}>
                  {data.impact}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Genes:</strong>{" "}
                <span className="break-words">{data.genes.join(", ")}</span>
              </p>
              <p>
                <strong>Your Genotype:</strong>{" "}
                <span className="font-mono break-all">{data.genotype}</span>
              </p>
              <p>
                <strong>Advice:</strong>{" "}
                <span className="break-words">{data.advice}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Digestive Health */}
      <SectionTitle title="Digestive Health" icon="🦠" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(digestiveHealth).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Level:</strong> {data.level}
              </p>
              <p>
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Genes & Addiction */}
      <SectionTitle title="Genes & Addiction" icon="🔗" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(genesAndAddiction).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Tendency:</strong> {data.tendency}
              </p>
              <p>
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Sleep & Rest */}
      <SectionTitle title="Sleep & Rest" icon="😴" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(sleepAndRest).map(([key, data]) => (
          <DataCard
            key={key}
            title={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <div className="space-y-1">
              <p>
                <strong>Impact:</strong> {data.impact}
              </p>
              <p>
                <strong>Intervention:</strong> {data.intervention}
              </p>
            </div>
          </DataCard>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Allergies & Sensitivity */}
      <SectionTitle title="Allergies & Sensitivity" icon="🤧" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {Object.entries(allergiesAndSensitivity)
          .filter(([key]) => key !== "generalAdvice")
          .map(([key, data]) => (
            <DataCard
              key={key}
              title={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            >
              <p>
                <strong>Tendency:</strong> {(data as AllergyData).tendency}
              </p>
            </DataCard>
          ))}
      </div>

      <DataCard title="General Advice" className="mt-6">
        <p className="text-justify break-words">
          {allergiesAndSensitivity.generalAdvice}
        </p>
      </DataCard>

      <Separator className="my-8 sm:my-12" />

      {/* Preventive Health */}
      <SectionTitle title="Preventive Health" icon="🏥" />

      <SubSectionTitle title="Diagnostic Tests" icon="🧪" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <DataCard title="Half-Yearly Tests">
          <ul className="list-disc list-inside space-y-1">
            {preventiveHealth.diagnosticTests.halfYearly.map((test, index) => (
              <li key={index} className="break-words">
                {test}
              </li>
            ))}
          </ul>
        </DataCard>
        <DataCard title="Yearly Tests">
          <ul className="list-disc list-inside space-y-1">
            {preventiveHealth.diagnosticTests.yearly.map((test, index) => (
              <li key={index} className="break-words">
                {test}
              </li>
            ))}
          </ul>
        </DataCard>
      </div>

      <SubSectionTitle title="Nutritional Supplements" icon="💊" />
      <DataCard title="Recommended Supplements">
        <ul className="list-disc list-inside space-y-1">
          {preventiveHealth.nutritionalSupplements.map((supplement, index) => (
            <li key={index} className="break-words">
              {supplement.supplement}{" "}
              {supplement.needed ? "(Needed)" : "(Optional)"}
            </li>
          ))}
        </ul>
      </DataCard>

      <Separator className="my-8 sm:my-12" />

      {/* Family Genetic Impact */}
      <SectionTitle title="Family Genetic Impact" icon="👨‍👩‍👧‍👦" />
      <div className="space-y-6 mb-8">
        {familyGeneticImpact.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No family genetic impacts recorded.
          </p>
        )}
        {familyGeneticImpact.map((impact, index) => (
          <Card
            key={index}
            className="border-2 border-blue-200 bg-blue-50/50 shadow-sm"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-semibold text-blue-800">
                Genetic Impact #{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Gene:</strong>{" "}
                <span className="break-words">{impact.gene}</span>
              </p>
              <p>
                <strong>Normal/Common Alleles:</strong>{" "}
                <span className="break-words">{impact.normalAlleles}</span>
              </p>
              <p>
                <strong>Your Result:</strong>{" "}
                <span className="font-mono break-all">{impact.yourResult}</span>
              </p>
              <p>
                <strong>Health Impact:</strong>{" "}
                <span className="break-words">{impact.healthImpact}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Gene Test Results */}
      <SectionTitle title="Gene Test Results" icon="🔬" />
      <div className="space-y-6 mb-8">
        {geneTestResults.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No gene test results recorded.
          </p>
        )}
        {geneTestResults.map((result, index) => (
          <Card
            key={index}
            className="border-2 border-indigo-200 bg-indigo-50/50 shadow-sm"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-semibold text-indigo-800 break-words">
                Gene: {result.geneName}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Variation:</strong>{" "}
                <span className="font-mono break-all">{result.variation}</span>
              </p>
              <p>
                <strong>Result:</strong>{" "}
                <span className="font-mono break-all">{result.result}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 sm:my-12" />

      {/* Summaries */}
      <SectionTitle title="Summaries for Experts" icon="📊" />
      <div className="space-y-6 mb-8">
        <DataCard title="Nutrigenomics Summary">
          <p className="text-justify break-words text-sm sm:text-base">
            {summaries.nutrigenomicsSummary}
          </p>
        </DataCard>
        <DataCard title="Exercise Genomics Summary">
          <p className="text-justify break-words text-sm sm:text-base">
            {summaries.exerciseGenomicsSummary}
          </p>
        </DataCard>
      </div>

      {/* Report Footer */}
      <footer className="text-center mt-8 sm:mt-12 py-6 text-gray-600 text-xs sm:text-sm border-t border-gray-200">
        <div className="space-y-2">
          <p>
            &copy; {new Date().getFullYear()} {settings.companyName}. All rights
            reserved.
          </p>
          <p className="break-words">
            Report Authentication: {patientInfo.reportAuth}
          </p>
        </div>
      </footer>
    </div>
  );
}
