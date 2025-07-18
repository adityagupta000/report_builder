"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { PreventiveHealth } from "@/types/report-types"

interface PreventiveHealthAdminProps {
  preventiveHealth: PreventiveHealth
  updatePreventiveHealth: (section: keyof PreventiveHealth, data: any) => void
  onSave: () => void
  onReset: () => void
}

export default function PreventiveHealthAdmin({
  preventiveHealth,
  updatePreventiveHealth,
  onSave,
  onReset,
}: PreventiveHealthAdminProps) {
  const addDiagnosticTest = (type: "halfYearly" | "yearly") => {
    updatePreventiveHealth("diagnosticTests", {
      ...preventiveHealth.diagnosticTests,
      [type]: [...preventiveHealth.diagnosticTests[type], ""],
    })
  }

  const updateDiagnosticTest = (type: "halfYearly" | "yearly", index: number, value: string) => {
    const newTests = [...preventiveHealth.diagnosticTests[type]]
    newTests[index] = value
    updatePreventiveHealth("diagnosticTests", {
      ...preventiveHealth.diagnosticTests,
      [type]: newTests,
    })
  }

  const removeDiagnosticTest = (type: "halfYearly" | "yearly", index: number) => {
    updatePreventiveHealth("diagnosticTests", {
      ...preventiveHealth.diagnosticTests,
      [type]: preventiveHealth.diagnosticTests[type].filter((_, i) => i !== index),
    })
  }

  const addNutritionalSupplement = () => {
    updatePreventiveHealth("nutritionalSupplements", [
      ...preventiveHealth.nutritionalSupplements,
      { supplement: "", needed: true },
    ])
  }

  const updateNutritionalSupplement = (index: number, field: "supplement" | "needed", value: string | boolean) => {
    const newSupplements = [...preventiveHealth.nutritionalSupplements]
    newSupplements[index] = { ...newSupplements[index], [field]: value }
    updatePreventiveHealth("nutritionalSupplements", newSupplements)
  }

  const removeNutritionalSupplement = (index: number) => {
    updatePreventiveHealth(
      "nutritionalSupplements",
      preventiveHealth.nutritionalSupplements.filter((_, i) => i !== index),
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🏥 Preventive Health</CardTitle>
        <CardDescription className="text-teal-100">
          Manage recommended diagnostic tests and nutritional supplements based on genetic insights
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

        {/* Diagnostic Tests Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-teal-200 pb-2">🧪 Diagnostic Tests</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Half-Yearly Tests */}
            <Card className="border-2 border-blue-100 bg-blue-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800 flex justify-between items-center">
                  Half-Yearly Tests
                  <Button
                    onClick={() => addDiagnosticTest("halfYearly")}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Test
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {preventiveHealth.diagnosticTests.halfYearly.map((test, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={test}
                      onChange={(e) => updateDiagnosticTest("halfYearly", index, e.target.value)}
                      placeholder="e.g., PLASMA SUGAR (FASTING & PP)"
                      className="border-2 focus:border-blue-500 text-sm"
                    />
                    <Button
                      onClick={() => removeDiagnosticTest("halfYearly", index)}
                      size="sm"
                      variant="destructive"
                      className="px-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {preventiveHealth.diagnosticTests.halfYearly.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No half-yearly tests added.</p>
                )}
              </CardContent>
            </Card>

            {/* Yearly Tests */}
            <Card className="border-2 border-green-100 bg-green-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800 flex justify-between items-center">
                  Yearly Tests
                  <Button onClick={() => addDiagnosticTest("yearly")} size="sm" variant="outline" className="text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Add Test
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {preventiveHealth.diagnosticTests.yearly.map((test, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={test}
                      onChange={(e) => updateDiagnosticTest("yearly", index, e.target.value)}
                      placeholder="e.g., HbA1c"
                      className="border-2 focus:border-green-500 text-sm"
                    />
                    <Button
                      onClick={() => removeDiagnosticTest("yearly", index)}
                      size="sm"
                      variant="destructive"
                      className="px-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {preventiveHealth.diagnosticTests.yearly.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No yearly tests added.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Nutritional Supplements Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-teal-200 pb-2">
            💊 Nutritional Supplements
          </h3>
          <Card className="border-2 border-purple-100 bg-purple-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-800 flex justify-between items-center">
                Recommended Supplements
                <Button
                  onClick={addNutritionalSupplement}
                  size="sm"
                  variant="outline"
                  className="text-xs bg-transparent"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Supplement
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preventiveHealth.nutritionalSupplements.map((supplement, index) => (
                <div key={index} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                  <Input
                    value={supplement.supplement}
                    onChange={(e) => updateNutritionalSupplement(index, "supplement", e.target.value)}
                    placeholder="e.g., VITAMIN D"
                    className="border-2 focus:border-purple-500 text-sm"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`needed-${index}`}
                      checked={supplement.needed}
                      onCheckedChange={(checked: boolean) => updateNutritionalSupplement(index, "needed", checked)}
                    />
                    <Label htmlFor={`needed-${index}`} className="text-sm">
                      Needed
                    </Label>
                  </div>
                  <Button
                    onClick={() => removeNutritionalSupplement(index)}
                    size="sm"
                    variant="destructive"
                    className="px-2"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {preventiveHealth.nutritionalSupplements.length === 0 && (
                <p className="text-sm text-gray-500 italic">No nutritional supplements added.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section Guidelines */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6">
          <h4 className="font-semibold text-teal-800 mb-2">📋 Preventive Health Guidelines:</h4>
          <div className="text-sm text-teal-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                This section helps determine the requirement of nutrients in form of supplements and periodic monitoring
                parameters.
              </li>
              <li>
                <strong>Diagnostic Tests:</strong> Suggests blood tests or other diagnostics to be done half-yearly or
                yearly based on genetic predispositions.
              </li>
              <li>
                <strong>Nutritional Supplements:</strong> Recommends specific supplements and indicates whether they are
                needed based on genetic analysis.
              </li>
              <li>Always consult with a healthcare professional before initiating supplement consumption.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
