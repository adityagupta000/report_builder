"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Upload } from "lucide-react"
import type { ComprehensiveReportData } from "@/types/report-types"
import { useToast } from "@/components/ui/use-toast"

interface ImportExportAdminProps {
  reportData: ComprehensiveReportData
  setReportData: (data: ComprehensiveReportData) => void
}

export default function ImportExportAdmin({ reportData, setReportData }: ImportExportAdminProps) {
  const { toast } = useToast()

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(reportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `genomics-report-${new Date().toISOString().split("T")[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
      toast({
        title: "Export Successful!",
        description: "Report data has been downloaded as a JSON file.",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export Failed!",
        description: "There was an error exporting the data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string) as ComprehensiveReportData
          // Basic validation to ensure it's a report data structure
          if (importedData && importedData.patientInfo && importedData.content) {
            setReportData(importedData)
            toast({
              title: "Import Successful!",
              description: "Report data has been imported successfully.",
            })
          } else {
            throw new Error("Invalid file format or missing essential data.")
          }
        } catch (error: any) {
          console.error("Error importing data:", error)
          toast({
            title: "Import Failed!",
            description: `Error importing data: ${error.message || "Please check the file format."}`,
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">📁 Import/Export Data</CardTitle>
        <CardDescription className="text-orange-100">Backup and restore your report data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">📤 Export Data</h3>
            <p className="text-gray-600">
              Download your current report configuration as a JSON file for backup or sharing.
            </p>
            <Button onClick={exportData} className="w-full bg-orange-600 hover:bg-orange-700">
              <Download className="h-4 w-4 mr-2" />
              Export Current Data
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">📥 Import Data</h3>
            <p className="text-gray-600">Upload a previously exported JSON file to restore report configuration.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" accept=".json" onChange={importData} className="hidden" id="import-file" />
              <Label htmlFor="import-file" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Click to select JSON file</span>
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Importing data will completely replace your current configuration</li>
            <li>• Always export your current data before importing new data</li>
            <li>• Only import JSON files that were exported from this system</li>
            <li>• Make sure to save your changes after importing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
