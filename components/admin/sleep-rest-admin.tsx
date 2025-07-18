"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { SleepAndRest, SleepData } from "@/types/report-types"

interface SleepRestAdminProps {
  sleepAndRest: SleepAndRest
  updateSleepAndRest: (field: keyof SleepAndRest, data: Partial<SleepData>) => void
  onSave: () => void
  onReset: () => void
}

export default function SleepRestAdmin({ sleepAndRest, updateSleepAndRest, onSave, onReset }: SleepRestAdminProps) {
  const renderSleepField = (field: keyof SleepAndRest, data: SleepData, title: string) => (
    <Card key={field} className="border-2 border-indigo-100 bg-indigo-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-indigo-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Genetic Impact</Label>
          <Input
            value={data.impact}
            onChange={(e) => updateSleepAndRest(field, { impact: e.target.value })}
            placeholder="e.g., DELAYED SLEEP CYCLE"
            className="border-2 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Intervention Needed</Label>
          <Textarea
            value={data.intervention}
            onChange={(e) => updateSleepAndRest(field, { intervention: e.target.value })}
            rows={3}
            className="border-2 focus:border-indigo-500 text-sm"
            placeholder="e.g., EXERCISE IN THE EVENING AVOID CARBS DURING BREAKFAST"
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">😴 Sleep & Rest</CardTitle>
        <CardDescription className="text-indigo-100">
          Manage genetic influences on sleep patterns, quality, and stress sensitivity
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

        {/* Sleep & Rest Fields */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(sleepAndRest).map(([key, item]) =>
            renderSleepField(
              key as keyof SleepAndRest,
              item as SleepData,
              key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
            ),
          )}
        </div>

        {/* Section Guidelines */}
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h4 className="font-semibold text-indigo-800 mb-2">📋 Sleep & Rest Guidelines:</h4>
          <div className="text-sm text-indigo-700 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Sleep Cycle:</strong> Genetic influence on circadian rhythms and sleep timing.
              </li>
              <li>
                <strong>Sleep Apnea:</strong> Genetic predisposition to sleep-disordered breathing.
              </li>
              <li>
                <strong>Sleep Depth:</strong> Genetic factors affecting the quality and restorative nature of sleep.
              </li>
              <li>
                <strong>Stress Sensitivity:</strong> Genetic tendency to react to stress, impacting sleep.
              </li>
              <li>Understanding these factors can guide personalized approaches to sleep health management.</li>
              <li>Sleep is crucial for overall physical and mental well-being.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
