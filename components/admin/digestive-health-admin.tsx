"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { DigestiveHealth, DigestiveHealthData } from "@/types/report-types"

interface DigestiveHealthAdminProps {
  digestiveHealth: DigestiveHealth
  updateDigestiveHealth: (field: keyof DigestiveHealth, data: Partial<DigestiveHealthData>) => void
  onSave: () => void
  onReset: () => void
}

export default function DigestiveHealthAdmin({
  digestiveHealth,
  updateDigestiveHealth,
  onSave,
  onReset,
}: DigestiveHealthAdminProps) {
  const renderDigestiveHealthField = (field: keyof DigestiveHealth, data: DigestiveHealthData, title: string) => (
    <Card key={field} className="border-2 border-red-100 bg-red-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-red-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Level</Label>
          <Input
            value={data.level}
            onChange={(e) => updateDigestiveHealth(field, { level: e.target.value })}
            placeholder="e.g., NORMAL GUT HEALTH"
            className="border-2 focus:border-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => updateDigestiveHealth(field, { description: e.target.value })}
            rows={3}
            className="border-2 focus:border-red-500 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🦠 Digestive Health</CardTitle>
        <CardDescription className="text-red-100">
          Manage genetic influences on gut health, intolerances, and sensitivities
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

        {/* Digestive Health Fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(digestiveHealth).map(([key, item]) =>
            renderDigestiveHealthField(
              key as keyof DigestiveHealth,
              item as DigestiveHealthData,
              key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
            ),
          )}
        </div>

        {/* Section Guidelines */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h4 className="font-semibold text-red-800 mb-2">📋 Digestive Health Guidelines:</h4>
          <div className="text-sm text-red-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Gut Health:</strong> Overall genetic predisposition for gut function.
              </li>
              <li>
                <strong>Gluten Intolerance:</strong> Genetic tendency towards gluten sensitivity.
              </li>
              <li>
                <strong>Celiac Disease Tendency:</strong> Genetic risk for celiac disease.
              </li>
              <li>
                <strong>Impact on Bones/Joints:</strong> How digestive health genetics might influence musculoskeletal
                health.
              </li>
              <li>
                <strong>Lactose Intolerance:</strong> Genetic ability to digest lactose.
              </li>
              <li>
                <strong>Probiotics Requirement:</strong> Indication for probiotic supplementation based on genetics.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
