"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button" // Import Button
import { Save, RotateCcw } from "lucide-react" // Import icons
import type { ReportSettings } from "@/types/report-types"

interface SettingsAdminProps {
  settings: ReportSettings
  updateSettings: (field: keyof ReportSettings, value: string) => void
  onSave: () => void // Added onSave
  onReset: () => void // Added onReset
}

export default function SettingsAdmin({ settings, updateSettings, onSave, onReset }: SettingsAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🎨 Report Settings</CardTitle>
        <CardDescription className="text-purple-100">
          Customize the appearance and branding of your report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Report Title
            </Label>
            <Input
              id="title"
              value={settings.title}
              onChange={(e) => updateSettings("title", e.target.value)}
              className="border-2 focus:border-purple-500 font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-sm font-semibold text-gray-700">
              Report Subtitle
            </Label>
            <Input
              id="subtitle"
              value={settings.subtitle}
              onChange={(e) => updateSettings("subtitle", e.target.value)}
              className="border-2 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700">
              Company Name
            </Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => updateSettings("companyName", e.target.value)}
              className="border-2 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headerColor" className="text-sm font-semibold text-gray-700">
              Header Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="headerColor"
                type="color"
                value={settings.headerColor}
                onChange={(e) => updateSettings("headerColor", e.target.value)}
                className="w-16 h-10 border-2 focus:border-purple-500"
              />
              <Input
                value={settings.headerColor}
                onChange={(e) => updateSettings("headerColor", e.target.value)}
                className="flex-1 border-2 focus:border-purple-500 font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-sm font-semibold text-gray-700">
              Accent Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="accentColor"
                type="color"
                value={settings.accentColor}
                onChange={(e) => updateSettings("accentColor", e.target.value)}
                className="w-16 h-10 border-2 focus:border-purple-500"
              />
              <Input
                value={settings.accentColor}
                onChange={(e) => updateSettings("accentColor", e.target.value)}
                className="flex-1 border-2 focus:border-purple-500 font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryFont" className="text-sm font-semibold text-gray-700">
              Primary Font
            </Label>
            <Input
              id="primaryFont"
              value={settings.fonts.primary}
              onChange={(e) => updateSettings("fonts", { ...settings.fonts, primary: e.target.value })}
              placeholder="e.g., Helvetica, Arial, sans-serif"
              className="border-2 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryFont" className="text-sm font-semibold text-gray-700">
              Secondary Font
            </Label>
            <Input
              id="secondaryFont"
              value={settings.fonts.secondary}
              onChange={(e) => updateSettings("fonts", { ...settings.fonts, secondary: e.target.value })}
              placeholder="e.g., Georgia, serif"
              className="border-2 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monoFont" className="text-sm font-semibold text-gray-700">
              Monospace Font
            </Label>
            <Input
              id="monoFont"
              value={settings.fonts.mono}
              onChange={(e) => updateSettings("fonts", { ...settings.fonts, mono: e.target.value })}
              placeholder="e.g., Courier New, monospace"
              className="border-2 focus:border-purple-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
