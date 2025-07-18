"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, RotateCcw } from "lucide-react"
import { useState } from "react"
import type { NutritionData, NutrientData } from "@/types/report-types"

interface NutritionAdminProps {
  nutritionData: NutritionData
  updateNutritionData: (section: keyof NutritionData, field: string, data: Partial<NutrientData>) => void
  onSave: () => void
  onReset: () => void
}

export default function NutritionAdmin({ nutritionData, updateNutritionData, onSave, onReset }: NutritionAdminProps) {
  const [activeSection, setActiveSection] = useState<keyof NutritionData>("vitamins")

  const renderNutrientField = (section: keyof NutritionData, field: string, data: NutrientData, title: string) => (
    <Card key={field} className="border-2 border-green-100 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-green-800 flex items-center justify-between">
          {title}
          <Badge
            variant="outline"
            className={`${
              data.score >= 7
                ? "border-red-500 text-red-700"
                : data.score >= 4
                  ? "border-yellow-500 text-yellow-700"
                  : "border-green-500 text-green-700"
            }`}
          >
            Score: {data.score}/10
          </Badge>
        </CardTitle>
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
              onChange={(e) => updateNutritionData(section, field, { score: Number.parseInt(e.target.value) || 1 })}
              className="border-2 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Health Impact</Label>
            <Input
              value={data.healthImpact}
              onChange={(e) => updateNutritionData(section, field, { healthImpact: e.target.value })}
              placeholder="e.g., Skin & Vision"
              className="border-2 focus:border-green-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Intake Level</Label>
          <Select
            value={data.intakeLevel}
            onValueChange={(value) => updateNutritionData(section, field, { intakeLevel: value })}
          >
            <SelectTrigger className="border-2 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENHANCED INTAKE">ENHANCED INTAKE</SelectItem>
              <SelectItem value="NORMAL INTAKE">NORMAL INTAKE</SelectItem>
              <SelectItem value="RESTRICTED INTAKE">RESTRICTED INTAKE</SelectItem>
              <SelectItem value="ENHANCED INTAKE (METHYLCOBALAMIN)">ENHANCED INTAKE (METHYLCOBALAMIN)</SelectItem>
              <SelectItem value="ENHANCED INTAKE (L METHYLFOLATE)">ENHANCED INTAKE (L METHYLFOLATE)</SelectItem>
              <SelectItem value="ENHANCED INTAKE & SUN EXPOSURE">ENHANCED INTAKE & SUN EXPOSURE</SelectItem>
              <SelectItem value="ENHANCED INTAKE (VEG SOURCES)">ENHANCED INTAKE (VEG SOURCES)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Source</Label>
          <Select value={data.source} onValueChange={(value) => updateNutritionData(section, field, { source: value })}>
            <SelectTrigger className="border-2 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DIET">DIET</SelectItem>
              <SelectItem value="SUPPLEMENTS">SUPPLEMENTS</SelectItem>
              <SelectItem value="DIET & SUPPLEMENTS">DIET & SUPPLEMENTS</SelectItem>
              <SelectItem value="DIET & SUN EXPOSURE">DIET & SUN EXPOSURE</SelectItem>
              <SelectItem value="ENHANCED INTAKE (VEG/FISH OIL) & DIET">
                ENHANCED INTAKE (VEG/FISH OIL) & DIET
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  const getSectionTitle = (section: keyof NutritionData) => {
    switch (section) {
      case "vitamins":
        return "💊 Vitamins"
      case "fattyAcids":
        return "🐟 Fatty Acids"
      case "elements":
        return "⚡ Essential Elements"
      case "complexNutrients":
        return "🌿 Complex Nutrients"
      default:
        return section
    }
  }

  const getSectionIcon = (section: keyof NutritionData) => {
    switch (section) {
      case "vitamins":
        return "💊"
      case "fattyAcids":
        return "🐟"
      case "elements":
        return "⚡"
      case "complexNutrients":
        return "🌿"
      default:
        return "📊"
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">💊 Nutrition Analysis</CardTitle>
        <CardDescription className="text-green-100">
          Configure vitamins, minerals, fatty acids, and complex nutrients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(nutritionData) as Array<keyof NutritionData>).map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSection(section)}
                className="flex items-center gap-2"
              >
                <span>{getSectionIcon(section)}</span>
                <span className="capitalize">{section.replace(/([A-Z])/g, " $1")}</span>
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Section Content */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">
            {getSectionTitle(activeSection)}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(nutritionData[activeSection]).map(([key, item]) =>
              renderNutrientField(
                activeSection,
                key,
                item as NutrientData,
                key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
              ),
            )}
          </div>
        </div>

        {/* Section Guidelines */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">📋 {getSectionTitle(activeSection)} Guidelines:</h4>
          <div className="text-sm text-green-700 space-y-2">
            {activeSection === "vitamins" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Score 1-3: Low requirement, normal dietary intake sufficient</li>
                <li>Score 4-6: Moderate requirement, enhanced dietary intake recommended</li>
                <li>Score 7-10: High requirement, supplementation may be needed</li>
                <li>Consider bioavailable forms for better absorption</li>
              </ul>
            )}
            {activeSection === "elements" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Essential minerals required for various metabolic processes</li>
                <li>Balance is key - both deficiency and excess can be harmful</li>
                <li>Consider interactions between different minerals</li>
                <li>Monitor through regular blood tests</li>
              </ul>
            )}
            {activeSection === "fattyAcids" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Omega-3 fatty acids are essential for heart and brain health</li>
                <li>Consider EPA:DHA ratio for optimal benefits</li>
                <li>Vegetarian sources include flaxseed, chia seeds, walnuts</li>
                <li>Fish oil supplements for non-vegetarians</li>
              </ul>
            )}
            {activeSection === "complexNutrients" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Antioxidants help protect against cellular damage</li>
                <li>Anti-inflammatory compounds reduce chronic inflammation</li>
                <li>Best obtained from colorful fruits and vegetables</li>
                <li>Synergistic effects when consumed together</li>
              </ul>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {Object.values(nutritionData[activeSection]).filter((item: any) => item.score >= 7).length}
            </div>
            <div className="text-sm text-red-700">High Priority</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {
                Object.values(nutritionData[activeSection]).filter((item: any) => item.score >= 4 && item.score < 7)
                  .length
              }
            </div>
            <div className="text-sm text-yellow-700">Moderate Priority</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(nutritionData[activeSection]).filter((item: any) => item.score < 4).length}
            </div>
            <div className="text-sm text-green-700">Low Priority</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{Object.keys(nutritionData[activeSection]).length}</div>
            <div className="text-sm text-blue-700">Total Items</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
