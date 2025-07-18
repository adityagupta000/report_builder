"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { ReportSummaries } from "@/types/report-types"

interface ReportSummariesAdminProps {
  summaries: ReportSummaries
  updateSummaries: (field: keyof ReportSummaries, value: string) => void
  onSave: () => void
  onReset: () => void
}

export default function ReportSummariesAdmin({
  summaries,
  updateSummaries,
  onSave,
  onReset,
}: ReportSummariesAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">📝 Report Summaries</CardTitle>
        <CardDescription className="text-violet-100">Edit the summary sections for experts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <Button onClick={onReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="nutrigenomicsSummary" className="text-lg font-semibold text-gray-800">
              🍎 Nutrigenomics Summary
            </Label>
            <p className="text-sm text-gray-600">For the nutrigenomics expert</p>
            <Textarea
              id="nutrigenomicsSummary"
              value={summaries.nutrigenomicsSummary}
              onChange={(e) => updateSummaries("nutrigenomicsSummary", e.target.value)}
              rows={8}
              className="border-2 focus:border-violet-500"
              placeholder="Based on the overall nutrigenomics analysis, provide expert summary for personalized diet and lifestyle plan..."
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="exerciseGenomicsSummary" className="text-lg font-semibold text-gray-800">
              🏃‍♂️ Exercise Genomics Summary
            </Label>
            <p className="text-sm text-gray-600">For the fitness genomics expert</p>
            <Textarea
              id="exerciseGenomicsSummary"
              value={summaries.exerciseGenomicsSummary}
              onChange={(e) => updateSummaries("exerciseGenomicsSummary", e.target.value)}
              rows={8}
              className="border-2 focus:border-violet-500"
              placeholder="Based on the overall genomics analysis, provide expert summary for personalized exercise plan..."
            />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Expert Summary Guidelines:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Provide actionable insights based on genetic analysis</li>
            <li>• Include specific recommendations for healthcare professionals</li>
            <li>• Reference key genetic markers and their implications</li>
            <li>• Suggest monitoring parameters and intervention strategies</li>
            <li>• Keep language professional yet accessible</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
