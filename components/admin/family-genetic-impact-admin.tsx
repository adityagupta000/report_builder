"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react"
import type { FamilyGeneticImpact } from "@/types/report-types"

interface FamilyGeneticImpactAdminProps {
  familyGeneticImpact: FamilyGeneticImpact[]
  addFamilyGeneticImpact: () => void
  updateFamilyGeneticImpact: (index: number, field: keyof FamilyGeneticImpact, value: string) => void
  removeFamilyGeneticImpact: (index: number) => void
  onSave: () => void
  onReset: () => void
}

export default function FamilyGeneticImpactAdmin({
  familyGeneticImpact,
  addFamilyGeneticImpact,
  updateFamilyGeneticImpact,
  removeFamilyGeneticImpact,
  onSave,
  onReset,
}: FamilyGeneticImpactAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">👨‍👩‍👧‍👦 Family Genetic Impact</CardTitle>
        <CardDescription className="text-blue-100">
          Manage genetic variations that may impact family members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={addFamilyGeneticImpact} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Genetic Impact
          </Button>
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

        {/* Family Genetic Impact List */}
        <div className="space-y-6">
          {familyGeneticImpact.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🧬</div>
              <p className="text-lg mb-4">No family genetic impacts added yet</p>
              <Button onClick={addFamilyGeneticImpact} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add First Impact
              </Button>
            </div>
          )}

          {familyGeneticImpact.map((impact, index) => (
            <Card key={index} className="border-2 border-blue-100 bg-blue-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800 flex justify-between items-center">
                  Genetic Impact #{index + 1}
                  <Button onClick={() => removeFamilyGeneticImpact(index)} size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gene</Label>
                  <Input
                    value={impact.gene}
                    onChange={(e) => updateFamilyGeneticImpact(index, "gene", e.target.value)}
                    placeholder="e.g., MnSOD"
                    className="border-2 focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Normal/Common Alleles</Label>
                  <Input
                    value={impact.normalAlleles}
                    onChange={(e) => updateFamilyGeneticImpact(index, "normalAlleles", e.target.value)}
                    placeholder="e.g., AA"
                    className="border-2 focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Your Result</Label>
                  <Input
                    value={impact.yourResult}
                    onChange={(e) => updateFamilyGeneticImpact(index, "yourResult", e.target.value)}
                    placeholder="e.g., AG"
                    className="border-2 focus:border-blue-500 font-mono font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Impact on Health</Label>
                  <Textarea
                    value={impact.healthImpact}
                    onChange={(e) => updateFamilyGeneticImpact(index, "healthImpact", e.target.value)}
                    rows={3}
                    placeholder="e.g., INCREASED TENDENCY OF OXIDATIVE STRESS NEED OF ANTI-OXIDANT SUPPLEMENTS"
                    className="border-2 focus:border-blue-500 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Guidelines */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Family Genetic Impact Guidelines:</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                This section highlights genetic variations observed in the patient that may also be present in close
                family members (parents, siblings, children).
              </li>
              <li>
                It serves as a recommendation for family members to consider genetic testing for similar
                predispositions.
              </li>
              <li>
                <strong>Gene:</strong> The specific gene with a noted variation.
              </li>
              <li>
                <strong>Normal/Common Alleles:</strong> The typical genetic variants.
              </li>
              <li>
                <strong>Your Result:</strong> The patient's specific genetic variant.
              </li>
              <li>
                <strong>Impact on Health:</strong> The health implications associated with the patient's genetic result,
                which could also apply to family members.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
