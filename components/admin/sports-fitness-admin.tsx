"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import { useState } from "react"
import type { SportsAndFitness, ExerciseData } from "@/types/report-types"

interface SportsFitnessAdminProps {
  sportsAndFitness: SportsAndFitness
  updateSportsAndFitness: (section: keyof SportsAndFitness, field: string, data: Partial<ExerciseData>) => void
  onSave: () => void
  onReset: () => void
}

export default function SportsFitnessAdmin({
  sportsAndFitness,
  updateSportsAndFitness,
  onSave,
  onReset,
}: SportsFitnessAdminProps) {
  const [activeSection, setActiveSection] = useState<keyof SportsAndFitness>("exerciseType")

  const renderExerciseField = (section: keyof SportsAndFitness, field: string, data: ExerciseData, title: string) => (
    <Card key={field} className="border-2 border-green-100 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-green-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Level</Label>
          <Input
            value={data.level}
            onChange={(e) => updateSportsAndFitness(section, field, { level: e.target.value })}
            placeholder="e.g., High Endurance Potential"
            className="border-2 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => updateSportsAndFitness(section, field, { description: e.target.value })}
            rows={3}
            className="border-2 focus:border-green-500 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )

  const getSectionTitle = (section: keyof SportsAndFitness) => {
    switch (section) {
      case "exerciseType":
        return "🏃‍♂️ Exercise Type Suitability"
      case "performance":
        return "⚡ Performance Factors"
      default:
        return section
    }
  }

  const getSectionIcon = (section: keyof SportsAndFitness) => {
    switch (section) {
      case "exerciseType":
        return "🏃‍♂️"
      case "performance":
        return "⚡"
      default:
        return "📊"
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🏃‍♂️ Sports & Fitness</CardTitle>
        <CardDescription className="text-green-100">
          Configure exercise type suitability and performance factors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(sportsAndFitness) as Array<keyof SportsAndFitness>).map((section) => (
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
            {Object.entries(sportsAndFitness[activeSection]).map(([key, item]) =>
              renderExerciseField(
                activeSection,
                key,
                item as ExerciseData,
                key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
              ),
            )}
          </div>
        </div>

        {/* Section Guidelines */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">📋 {getSectionTitle(activeSection)} Guidelines:</h4>
          <div className="text-sm text-green-700 space-y-2">
            {activeSection === "exerciseType" && (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Endurance Potential:</strong> Genetic predisposition for long-duration activities.
                </li>
                <li>
                  <strong>Power Potential:</strong> Capacity for short, intense bursts of energy.
                </li>
                <li>
                  <strong>Strength Profile:</strong> Genetic tendency for muscle strength and growth.
                </li>
                <li>
                  <strong>Exercise Time:</strong> Optimal time of day for exercise based on circadian rhythm.
                </li>
              </ul>
            )}
            {activeSection === "performance" && (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Endurance Capacity:</strong> Aerobic efficiency and stamina.
                </li>
                <li>
                  <strong>Fatigue Resistance:</strong> Ability to resist muscle fatigue during prolonged activity.
                </li>
                <li>
                  <strong>Blood Flow:</strong> Efficiency of blood circulation during exercise.
                </li>
                <li>
                  <strong>Oxygen Efficiency (VO2 Max):</strong> Body's ability to use oxygen during intense exercise.
                </li>
                <li>
                  <strong>Water Loss:</strong> Tendency for fluid and electrolyte loss.
                </li>
                <li>
                  <strong>Lactate Clearing:</strong> Efficiency in removing lactic acid from muscles.
                </li>
                <li>
                  <strong>Recovery Efficiency:</strong> Speed and effectiveness of post-exercise recovery.
                </li>
                <li>
                  <strong>Body Composition:</strong> Genetic predisposition for muscle mass vs. fat accumulation.
                </li>
                <li>
                  <strong>Injury Risk:</strong> Genetic susceptibility to various sports-related injuries.
                </li>
                <li>
                  <strong>Achilles Tendon/Ligament/Rupture/Muscle Cramps:</strong> Specific injury predispositions.
                </li>
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
