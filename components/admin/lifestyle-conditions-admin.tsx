"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import { useState } from "react"
import type { LifestyleConditions, HealthConditionStatus } from "@/types/report-types"

interface LifestyleConditionsAdminProps {
  lifestyleConditions: LifestyleConditions
  updateLifestyleCondition: (
    section: keyof LifestyleConditions,
    field: string,
    status: HealthConditionStatus["status"],
  ) => void
  onSave: () => void
  onReset: () => void
}

export default function LifestyleConditionsAdmin({
  lifestyleConditions,
  updateLifestyleCondition,
  onSave,
  onReset,
}: LifestyleConditionsAdminProps) {
  const [activeSection, setActiveSection] = useState<keyof LifestyleConditions>("heartVascularHealth")

  const renderConditionField = (
    section: keyof LifestyleConditions,
    field: string,
    data: HealthConditionStatus,
    title: string,
  ) => (
    <div key={field} className="grid grid-cols-3 gap-4 items-center border-b pb-2">
      <Label className="font-medium text-gray-700">{title}</Label>
      <div className="col-span-2">
        <Select
          value={data.status}
          onValueChange={(value: HealthConditionStatus["status"]) => updateLifestyleCondition(section, field, value)}
        >
          <SelectTrigger className="border-2 focus:border-yellow-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strength">Strength (✓)</SelectItem>
            <SelectItem value="improvement">Improvement Needed (⚠)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const getSectionTitle = (section: keyof LifestyleConditions) => {
    switch (section) {
      case "heartVascularHealth":
        return "❤️ Heart & Vascular Health"
      case "diabesity":
        return "🍬 Diabesity (Diabetes & Obesity)"
      case "liverHealth":
        return "🧫 Liver Health"
      case "boneHealth":
        return "🦴 Bone Health"
      case "gutHealth":
        return "🦠 Gut Health"
      case "hormoneSystem":
        return "🧪 Hormone System"
      default:
        return section
    }
  }

  const getSectionIcon = (section: keyof LifestyleConditions) => {
    switch (section) {
      case "heartVascularHealth":
        return "❤️"
      case "diabesity":
        return "🍬"
      case "liverHealth":
        return "🧫"
      case "boneHealth":
        return "🦴"
      case "gutHealth":
        return "🦠"
      case "hormoneSystem":
        return "🧪"
      default:
        return "📊"
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🩺 Lifestyle Conditions</CardTitle>
        <CardDescription className="text-yellow-100">
          Manage genetic predispositions for common lifestyle-related health conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(lifestyleConditions) as Array<keyof LifestyleConditions>).map((section) => (
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
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-yellow-200 pb-2">
            {getSectionTitle(activeSection)}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(lifestyleConditions[activeSection]).map(([key, item]) =>
              renderConditionField(
                activeSection,
                key,
                item as HealthConditionStatus,
                key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
              ),
            )}
          </div>
        </div>

        {/* Section Guidelines */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📋 Lifestyle Conditions Guidelines:</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Strength (✓):</strong> Indicates a genetic predisposition that is favorable or protective
                against the condition.
              </li>
              <li>
                <strong>Improvement Needed (⚠):</strong> Indicates a genetic predisposition that suggests a higher risk
                or vulnerability to the condition, requiring proactive lifestyle interventions.
              </li>
              <li>
                This section highlights areas where personalized interventions (diet, exercise, screenings) can be most
                impactful.
              </li>
              <li>Genetic predispositions are not deterministic; lifestyle and environment play crucial roles.</li>
            </ul>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                Object.values(lifestyleConditions[activeSection]).filter((item: any) => item.status === "strength")
                  .length
              }
            </div>
            <div className="text-sm text-green-700">Your Strengths</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                Object.values(lifestyleConditions[activeSection]).filter((item: any) => item.status === "improvement")
                  .length
              }
            </div>
            <div className="text-sm text-red-700">Improvement Needed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
