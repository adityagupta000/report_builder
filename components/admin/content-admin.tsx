"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react"; // Import icons
import type { ReportContent } from "@/types/report-types";

interface ContentAdminProps {
  content: ReportContent;
  updateContent: (field: keyof ReportContent, value: string) => void;
  onSave: () => void; // Added onSave
  onReset: () => void; // Added onReset
}

export default function ContentAdmin({
  content,
  updateContent,
  onSave,
  onReset,
}: ContentAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">📝 Report Content</CardTitle>
        <CardDescription className="text-green-100">
          Edit the main content sections of the report
        </CardDescription>
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

        <div className="space-y-3">
          <Label
            htmlFor="introduction"
            className="text-lg font-semibold text-gray-800"
          >
            🎯 Welcome Letter Introduction
          </Label>
          <Textarea
            id="introduction"
            value={content.introduction}
            onChange={(e) => updateContent("introduction", e.target.value)}
            placeholder="Enter introduction text"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="genomicsExplanation"
            className="text-lg font-semibold text-gray-800"
          >
            🔬 What is Genomics?
          </Label>
          <Textarea
            id="genomicsExplanation"
            value={content.genomicsExplanation}
            onChange={(e) =>
              updateContent("genomicsExplanation", e.target.value)
            }
            placeholder="Enter genomics explanation"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="genesHealthImpact"
            className="text-lg font-semibold text-gray-800"
          >
            🧬 Genes and Health Impact
          </Label>
          <Textarea
            id="genesHealthImpact"
            value={content.genesHealthImpact}
            onChange={(e) => updateContent("genesHealthImpact", e.target.value)}
            placeholder="Enter genes and health impact content"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="fundamentalsPRS"
            className="text-lg font-semibold text-gray-800"
          >
            📊 Fundamentals and PRS
          </Label>
          <Textarea
            id="fundamentalsPRS"
            value={content.fundamentalsPRS}
            onChange={(e) => updateContent("fundamentalsPRS", e.target.value)}
            placeholder="Enter fundamentals and PRS content"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="utilityDoctors"
            className="text-lg font-semibold text-gray-800"
          >
            👨‍⚕️ Utility for Doctors and Dietitians
          </Label>
          <Textarea
            id="utilityDoctors"
            value={content.utilityDoctors}
            onChange={(e) => updateContent("utilityDoctors", e.target.value)}
            placeholder="Enter utility for doctors content"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="microarrayExplanation"
            className="text-lg font-semibold text-gray-800"
          >
            🔬 Microarray Explanation
          </Label>
          <Textarea
            id="microarrayExplanation"
            value={content.microarrayExplanation}
            onChange={(e) =>
              updateContent("microarrayExplanation", e.target.value)
            }
            placeholder="Enter microarray explanation"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="microarrayData"
            className="text-lg font-semibold text-gray-800"
          >
            📊 Your Microarray Data
          </Label>
          <Textarea
            id="microarrayData"
            value={content.microarrayData}
            onChange={(e) => updateContent("microarrayData", e.target.value)}
            placeholder="Enter microarray data content"
            rows={8}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>
      </CardContent>
    </Card>
  );
}
