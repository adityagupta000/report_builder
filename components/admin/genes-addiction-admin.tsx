"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { GenesAndAddiction, AddictionData } from "@/types/report-types"

interface GenesAddictionAdminProps {
  genesAndAddiction: GenesAndAddiction
  updateGenesAndAddiction: (field: keyof GenesAndAddiction, data: Partial<AddictionData>) => void
  onSave: () => void
  onReset: () => void
}

export default function GenesAddictionAdmin({
  genesAndAddiction,
  updateGenesAndAddiction,
  onSave,
  onReset,
}: GenesAddictionAdminProps) {
  const renderAddictionField = (field: keyof GenesAndAddiction, data: AddictionData, title: string) => (
    <Card key={field} className="border-2 border-purple-100 bg-purple-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-purple-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tendency</Label>
          <Input
            value={data.tendency}
            onChange={(e) => updateGenesAndAddiction(field, { tendency: e.target.value })}
            placeholder="e.g., LOW, NORMAL, HIGH"
            className="border-2 focus:border-purple-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => updateGenesAndAddiction(field, { description: e.target.value })}
            rows={3}
            className="border-2 focus:border-purple-500 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🔗 Genes & Addiction</CardTitle>
        <CardDescription className="text-purple-100">
          Manage genetic predispositions related to various addiction tendencies
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

        {/* Genes & Addiction Fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(genesAndAddiction).map(([key, item]) =>
            renderAddictionField(
              key as keyof GenesAndAddiction,
              item as AddictionData,
              key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
            ),
          )}
        </div>

        {/* Section Guidelines */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h4 className="font-semibold text-purple-800 mb-2">📋 Genes & Addiction Guidelines:</h4>
          <div className="text-sm text-purple-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Alcohol Addiction:</strong> Genetic vulnerability to alcohol dependency.
              </li>
              <li>
                <strong>Smoking Addiction:</strong> Genetic susceptibility to nicotine addiction.
              </li>
              <li>
                <strong>Snacking Habits:</strong> Genetic tendency towards frequent snacking or specific food cravings.
              </li>
              <li>
                <strong>Altruism:</strong> Genetic predisposition towards prosocial behaviors and helping others.
              </li>
              <li>Genetics influence vulnerability, but environmental factors and lifestyle choices are crucial.</li>
              <li>This information can help tailor prevention strategies and personalized treatment plans.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
