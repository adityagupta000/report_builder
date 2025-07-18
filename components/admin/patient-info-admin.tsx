"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"
import type { PatientInfo } from "@/types/report-types"

interface PatientInfoAdminProps {
  patientInfo: PatientInfo
  updatePatientInfo: (field: keyof PatientInfo, value: string) => void
  onSave: () => void
  onReset: () => void
}

export default function PatientInfoAdmin({ patientInfo, updatePatientInfo, onSave, onReset }: PatientInfoAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">👤 Patient Information</CardTitle>
        <CardDescription className="text-blue-100">
          Complete patient details as they appear on the report cover page
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

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 required">
                Patient Name *
              </Label>
              <Input
                id="name"
                value={patientInfo.name}
                onChange={(e) => updatePatientInfo("name", e.target.value)}
                placeholder="Enter full patient name"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700 required">
                Gender *
              </Label>
              <Select value={patientInfo.gender} onValueChange={(value) => updatePatientInfo("gender", value)}>
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 required">
                Birth Date *
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={patientInfo.birthDate}
                onChange={(e) => updatePatientInfo("birthDate", e.target.value)}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Sample Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Sample Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sampleCode" className="text-sm font-semibold text-gray-700 required">
                Sample Code *
              </Label>
              <Input
                id="sampleCode"
                value={patientInfo.sampleCode}
                onChange={(e) => updatePatientInfo("sampleCode", e.target.value)}
                placeholder="e.g., DNL1000000110"
                className="border-2 focus:border-blue-500 font-mono"
                required
              />
              <p className="text-xs text-gray-500">Unique identifier for the DNA sample</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sampleDate" className="text-sm font-semibold text-gray-700 required">
                Sample Collection Date *
              </Label>
              <Input
                id="sampleDate"
                type="date"
                value={patientInfo.sampleDate}
                onChange={(e) => updatePatientInfo("sampleDate", e.target.value)}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportDate" className="text-sm font-semibold text-gray-700 required">
                Report Date *
              </Label>
              <Input
                id="reportDate"
                type="date"
                value={patientInfo.reportDate}
                onChange={(e) => updatePatientInfo("reportDate", e.target.value)}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Authorization & Verification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Authorization & Verification</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reportAuth" className="text-sm font-semibold text-gray-700">
                Report Authentication & Analytics
              </Label>
              <Input
                id="reportAuth"
                value={patientInfo.reportAuth}
                onChange={(e) => updatePatientInfo("reportAuth", e.target.value)}
                placeholder="Enter report authentication details"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">Person/organization responsible for report authentication</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="genomicAnalytics" className="text-sm font-semibold text-gray-700">
                Genomic Data Analytics
              </Label>
              <Input
                id="genomicAnalytics"
                value={patientInfo.genomicAnalytics}
                onChange={(e) => updatePatientInfo("genomicAnalytics", e.target.value)}
                placeholder="Enter genomic data analytics info"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">Laboratory or system used for genomic analysis</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkedBy" className="text-sm font-semibold text-gray-700">
                Checked & Verified By
              </Label>
              <Input
                id="checkedBy"
                value={patientInfo.checkedBy}
                onChange={(e) => updatePatientInfo("checkedBy", e.target.value)}
                placeholder="Enter verifier name"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">Medical professional who verified the report</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificContent" className="text-sm font-semibold text-gray-700">
                Scientific Content Verified By
              </Label>
              <Input
                id="scientificContent"
                value={patientInfo.scientificContent}
                onChange={(e) => updatePatientInfo("scientificContent", e.target.value)}
                placeholder="Enter scientific content verifier"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">Scientific expert who verified the content accuracy</p>
            </div>
          </div>
        </div>

        {/* Validation Summary */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Required Fields Summary:</h4>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <div className={`flex items-center gap-2 ${patientInfo.name ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.name ? "✅" : "❌"}</span>
              <span>Patient Name</span>
            </div>
            <div className={`flex items-center gap-2 ${patientInfo.gender ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.gender ? "✅" : "❌"}</span>
              <span>Gender</span>
            </div>
            <div className={`flex items-center gap-2 ${patientInfo.birthDate ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.birthDate ? "✅" : "❌"}</span>
              <span>Birth Date</span>
            </div>
            <div className={`flex items-center gap-2 ${patientInfo.sampleCode ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.sampleCode ? "✅" : "❌"}</span>
              <span>Sample Code</span>
            </div>
            <div className={`flex items-center gap-2 ${patientInfo.sampleDate ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.sampleDate ? "✅" : "❌"}</span>
              <span>Sample Date</span>
            </div>
            <div className={`flex items-center gap-2 ${patientInfo.reportDate ? "text-green-700" : "text-red-700"}`}>
              <span>{patientInfo.reportDate ? "✅" : "❌"}</span>
              <span>Report Date</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .required::after {
            content: " *";
            color: #ef4444;
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
