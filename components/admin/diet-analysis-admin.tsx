"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button" // Import Button
import { Save, RotateCcw } from "lucide-react" // Import icons
import type { DietAnalysis, MacronutrientData } from "@/types/report-types"

interface DietAnalysisAdminProps {
  dietAnalysis: DietAnalysis
  updateDietAnalysis: (section: keyof DietAnalysis, field: string, data: Partial<MacronutrientData>) => void
  onSave: () => void // Added onSave
  onReset: () => void // Added onReset
}

export default function DietAnalysisAdmin({
  dietAnalysis,
  updateDietAnalysis,
  onSave,
  onReset,
}: DietAnalysisAdminProps) {
  const renderMacronutrientField = (
    section: keyof DietAnalysis,
    field: string,
    data: MacronutrientData,
    title: string,
  ) => (
    <Card key={field} className="border-2 border-blue-100 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-blue-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Score (1-10)</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={data.score}
              onChange={(e) => updateDietAnalysis(section, field, { score: Number.parseInt(e.target.value) || 1 })}
              className="border-2 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Level</Label>
            <Select value={data.level} onValueChange={(value) => updateDietAnalysis(section, field, { level: value })}>
              <SelectTrigger className="border-2 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="NORMAL">NORMAL</SelectItem>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="FREQUENT">FREQUENT</SelectItem>
                <SelectItem value="LESS FREQUENT">LESS FREQUENT</SelectItem>
                <SelectItem value="SUITABLE">SUITABLE</SelectItem>
                <SelectItem value="LESS SUITABLE">LESS SUITABLE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Recommendation</Label>
          <Textarea
            value={data.recommendation}
            onChange={(e) => updateDietAnalysis(section, field, { recommendation: e.target.value })}
            rows={3}
            className="border-2 focus:border-blue-500 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🍎 Diet Analysis</CardTitle>
        <CardDescription className="text-amber-100">
          Configure macronutrients, meal patterns, and food sensitivities
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

        {/* Macronutrients Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2">🥗 Macronutrients</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMacronutrientField(
              "macronutrients",
              "carbohydrateSensitivity",
              dietAnalysis.macronutrients.carbohydrateSensitivity,
              "Carbohydrate Sensitivity",
            )}
            {renderMacronutrientField(
              "macronutrients",
              "fatSensitivity",
              dietAnalysis.macronutrients.fatSensitivity,
              "Fat Sensitivity",
            )}
            {renderMacronutrientField(
              "macronutrients",
              "proteinRequirement",
              dietAnalysis.macronutrients.proteinRequirement,
              "Protein Requirement",
            )}
          </div>
        </div>

        {/* Meal Pattern Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2">🍽️ Meal Pattern</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMacronutrientField(
              "mealPattern",
              "mealFrequency",
              dietAnalysis.mealPattern.mealFrequency,
              "Meal Frequency",
            )}
            {renderMacronutrientField(
              "mealPattern",
              "mealReplacement",
              dietAnalysis.mealPattern.mealReplacement,
              "Meal Replacement",
            )}
            {renderMacronutrientField(
              "mealPattern",
              "weightMaintenance",
              dietAnalysis.mealPattern.weightMaintenance,
              "Weight Maintenance",
            )}
          </div>
        </div>

        {/* Food Sensitivities Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2">
            🚫 Food Sensitivities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMacronutrientField(
              "foodSensitivities",
              "alcoholSensitivity",
              dietAnalysis.foodSensitivities.alcoholSensitivity,
              "Alcohol Sensitivity",
            )}
            {renderMacronutrientField(
              "foodSensitivities",
              "caffeineSensitivity",
              dietAnalysis.foodSensitivities.caffeineSensitivity,
              "Caffeine Sensitivity",
            )}
            {renderMacronutrientField(
              "foodSensitivities",
              "glutenSensitivity",
              dietAnalysis.foodSensitivities.glutenSensitivity,
              "Gluten Sensitivity",
            )}
            {renderMacronutrientField(
              "foodSensitivities",
              "lactoseSensitivity",
              dietAnalysis.foodSensitivities.lactoseSensitivity,
              "Lactose Sensitivity",
            )}
            {renderMacronutrientField(
              "foodSensitivities",
              "saltSensitivity",
              dietAnalysis.foodSensitivities.saltSensitivity,
              "Salt Sensitivity",
            )}
          </div>
        </div>

        {/* Taste Sensitivities Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2">
            👅 Taste Sensitivities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMacronutrientField(
              "tasteSensitivities",
              "spiceTolerance",
              dietAnalysis.tasteSensitivities.spiceTolerance,
              "Spice Tolerance",
            )}
            {renderMacronutrientField(
              "tasteSensitivities",
              "sweetTaste",
              dietAnalysis.tasteSensitivities.sweetTaste,
              "Sweet Taste",
            )}
            {renderMacronutrientField(
              "tasteSensitivities",
              "tasteSensitivity",
              dietAnalysis.tasteSensitivities.tasteSensitivity,
              "Taste Sensitivity",
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
