"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { AllergiesAndSensitivity, AllergyData } from "@/types/report-types"

interface AllergiesSensitivityAdminProps {
  allergiesAndSensitivity: AllergiesAndSensitivity
  updateAllergiesAndSensitivity: (field: keyof AllergiesAndSensitivity, data: Partial<AllergyData> | string) => void
  onSave: () => void
  onReset: () => void
}

export default function AllergiesSensitivityAdmin({
  allergiesAndSensitivity,
  updateAllergiesAndSensitivity,
  onSave,
  onReset,
}: AllergiesSensitivityAdminProps) {
  const renderAllergyField = (
    field: Exclude<keyof AllergiesAndSensitivity, "generalAdvice">,
    data: AllergyData,
    title: string,
  ) => (
    <Card key={field} className="border-2 border-orange-100 bg-orange-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-orange-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tendency</Label>
          <Input
            value={data.tendency}
            onChange={(e) => updateAllergiesAndSensitivity(field, { tendency: e.target.value })}
            placeholder="e.g., NORMAL, HIGH"
            className="border-2 focus:border-orange-500"
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🤧 Allergies & Sensitivity</CardTitle>
        <CardDescription className="text-orange-100">
          Manage genetic predispositions for various allergies and environmental sensitivities
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

        {/* Allergy & Sensitivity Fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(allergiesAndSensitivity)
            .filter(([key]) => key !== "generalAdvice")
            .map(([key, item]) =>
              renderAllergyField(
                key as Exclude<keyof AllergiesAndSensitivity, "generalAdvice">,
                item as AllergyData,
                key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
              ),
            )}
        </div>

        {/* General Advice */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-orange-200 pb-2">💡 General Advice</h3>
          <Label className="text-sm font-medium">General Advice for Allergies & Sensitivities</Label>
          <Textarea
            value={allergiesAndSensitivity.generalAdvice}
            onChange={(e) => updateAllergiesAndSensitivity("generalAdvice", e.target.value)}
            rows={5}
            className="border-2 focus:border-orange-500 text-sm"
            placeholder="Enter general advice for managing allergies and sensitivities..."
          />
        </div>

        {/* Section Guidelines */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h4 className="font-semibold text-orange-800 mb-2">📋 Allergies & Sensitivity Guidelines:</h4>
          <div className="text-sm text-orange-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Dust Allergy:</strong> Genetic tendency towards allergic reactions to dust.
              </li>
              <li>
                <strong>Pesticide Sensitivity:</strong> Genetic susceptibility to adverse reactions from pesticides.
              </li>
              <li>
                <strong>Smoke Sensitivity:</strong> Genetic predisposition to sensitivity from smoke (e.g., tobacco,
                environmental).
              </li>
              <li>
                <strong>Automobile Smoke Sensitivity:</strong> Genetic tendency to react to vehicle exhaust fumes.
              </li>
              <li>Genetic variations can influence immune system responses to various environmental factors.</li>
              <li>Personalized advice can help in reducing hyper-reactivity and managing symptoms.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
