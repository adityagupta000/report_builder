"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ComprehensiveReportData } from "@/types/report-types";

interface ReportViewerProps {
  data: ComprehensiveReportData;
  mode: "preview" | "pdf";
}

export function ReportViewer({ data, mode }: ReportViewerProps) {
  const getScoreColor = (score: number) => {
    if (score >= data.settings.highThreshold) return data.settings.colors.high;
    if (score >= 4) return data.settings.colors.medium;
    return data.settings.colors.low;
  };

  const getScoreLevel = (score: number) => {
    if (score >= data.settings.highThreshold) return "High";
    if (score >= 4) return "Medium";
    return "Low";
  };

  return (
    <div className={`space-y-8 ${mode === "pdf" ? "print:space-y-4" : ""}`}>
      {/* Page 1: Cover Page */}
      <div className="bg-white p-8 rounded-lg shadow-sm page-break">
        <div
          className="text-center py-16 rounded-lg text-white"
          style={{ backgroundColor: data.settings.headerColor }}
        >
          <h1 className="text-4xl font-bold mb-4">{data.settings.title}</h1>
          <p className="text-xl italic mb-8">{data.settings.quote}</p>
          <div className="bg-white/20 p-6 rounded-lg inline-block">
            <h2 className="text-2xl font-semibold mb-2">
              {data.patientInfo.name}
            </h2>
            <p className="text-lg">
              Sample Code: {data.patientInfo.sampleCode}
            </p>
            <p className="text-lg">
              Report Date: {data.patientInfo.reportDate}
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.patientInfo.disclaimer}
            </p>
          </div>
      </div>

      {/* Page 3: Welcome Letter */}
      <div className="bg-white p-8 rounded-lg shadow-sm page-break">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: data.settings.headerColor }}
        >
          🧬 Welcome to Your Genomics Journey
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {data.content.introduction}
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">What is Genomics?</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.content.genomicsExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* Page 4-8: Diet Analysis */}
      <div className="bg-white p-8 rounded-lg shadow-sm page-break">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: data.settings.headerColor }}
        >
          🍽️ DIET ANALYSIS
        </h2>

        {/* Macronutrients Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Macronutrients</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(data.dietAnalysis.macronutrients).map(
              ([key, item]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold">
                        {item.score}/10
                      </span>
                      <Badge
                        style={{ backgroundColor: getScoreColor(item.score) }}
                        className="text-white"
                      >
                        {getScoreLevel(item.score)}
                      </Badge>
                    </div>
                    <Progress value={item.score * 10} className="mb-3" />
                    <p className="text-sm text-gray-600">
                      {item.recommendation}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {/* Food Sensitivities Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Food Sensitivities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.dietAnalysis.foodSensitivities).map(
              ([key, item]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold">{item.score}/10</span>
                      <Badge
                        style={{ backgroundColor: getScoreColor(item.score) }}
                        className="text-white"
                      >
                        {item.level || getScoreLevel(item.score)}
                      </Badge>
                    </div>
                    <Progress value={item.score * 10} className="mb-3" />
                    <p className="text-xs text-gray-600">
                      {item.recommendation}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>

      {/* Page 9-15: Nutrition Data */}
      <div className="bg-white p-8 rounded-lg shadow-sm page-break">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: data.settings.headerColor }}
        >
          💊 NUTRITION ANALYSIS
        </h2>

        {/* Vitamins Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Vitamins</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.nutritionData.vitamins).map(([key, item]) => (
              <Card key={key}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">{item.score}/10</span>
                    <Badge
                      style={{ backgroundColor: getScoreColor(item.score) }}
                      className="text-white text-xs"
                    >
                      {item.level || getScoreLevel(item.score)}
                    </Badge>
                  </div>
                  <Progress value={item.score * 10} className="mb-2" />
                  <p className="text-xs text-gray-600 mb-2">
                    {item.healthImpact}
                  </p>
                  <p className="text-xs text-blue-600">{item.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Elements Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Essential Elements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.nutritionData.elements).map(([key, item]) => (
              <Card key={key}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm capitalize">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">{item.score}/10</span>
                    <Badge
                      style={{ backgroundColor: getScoreColor(item.score) }}
                      className="text-white text-xs"
                    >
                      {item.level || getScoreLevel(item.score)}
                    </Badge>
                  </div>
                  <Progress value={item.score * 10} className="mb-2" />
                  <p className="text-xs text-gray-600 mb-2">
                    {item.healthImpact}
                  </p>
                  <p className="text-xs text-blue-600">{item.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Page 16-22: Sports & Fitness */}
      <div className="bg-white p-8 rounded-lg shadow-sm page-break">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: data.settings.headerColor }}
        >
          🏃‍♂️ SPORTS & FITNESS
        </h2>

        {/* Exercise Type Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Exercise Type Suitability
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(data.sportsAndFitness.exerciseType).map(
              ([key, item]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold">{item.score}/10</span>
                      <Badge
                        style={{ backgroundColor: getScoreColor(item.score) }}
                        className="text-white"
                      >
                        {item.level || getScoreLevel(item.score)}
                      </Badge>
                    </div>
                    <Progress value={item.score * 10} className="mb-3" />
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {/* Performance Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Performance Factors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.sportsAndFitness.performance).map(
              ([key, item]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{item.score}/10</span>
                      <Badge
                        style={{ backgroundColor: getScoreColor(item.score) }}
                        className="text-white text-xs"
                      >
                        {item.level || getScoreLevel(item.score)}
                      </Badge>
                    </div>
                    <Progress value={item.score * 10} className="mb-2" />
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {/* Injury Management Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Injury Risk Management</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.sportsAndFitness.injuryManagement).map(
              ([key, item]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{item.score}/10</span>
                      <Badge
                        style={{ backgroundColor: getScoreColor(item.score) }}
                        className="text-white text-xs"
                      >
                        {item.level || getScoreLevel(item.score)}
                      </Badge>
                    </div>
                    <Progress value={item.score * 10} className="mb-2" />
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>

      {/* Continue with remaining sections... */}
      {/* This is a comprehensive start - I'll need to continue with all remaining sections to reach 56 pages */}

      <style jsx global>{`
        @media print {
          .page-break {
            page-break-after: always;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
