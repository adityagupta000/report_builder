"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Printer, Eye } from "lucide-react"
import { useState } from "react"
import type { ComprehensiveReportData } from "@/types/report-types"
import { useToast } from "@/components/ui/use-toast" // Import useToast

interface PDFGeneratorProps {
  reportData: ComprehensiveReportData
}

export default function PDFGenerator({ reportData }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast() // Initialize useToast

  // State for PDF settings (can be expanded if more options are needed for actual PDF generation)
  const [pdfSettings, setPdfSettings] = useState({
    format: "A4",
    orientation: "portrait",
    margins: "normal",
    quality: "high",
    includeGraphics: true,
    includeColors: true,
  })

  const handlePrintOrDownload = async (action: "print" | "download") => {
    setIsGenerating(true)
    try {
      // Open a new window to the PDF generation page
      const printWindow = window.open("/report/pdf", "_blank")

      if (printWindow) {
        // Wait for the content to load in the new window
        printWindow.onload = () => {
          // Give a small delay to ensure all content and styles are rendered
          setTimeout(() => {
            if (action === "print") {
              printWindow.print()
              toast({
                title: "Print Dialog Opened",
                description: "Please select 'Save as PDF' or your printer in the dialog.",
                variant:"success",
                duration:3000,
              })
            } else {
              // For download, the browser's print dialog usually offers "Save as PDF"
              // We trigger print, and the user saves it.
              printWindow.print()
              toast({
                title: "Download Initiated",
                description: "Please select 'Save as PDF' in the print dialog to download.",
                duration:3000,
              })
            }
            setIsGenerating(false)
          }, 1500) // Increased delay for better rendering
        }
        printWindow.onerror = () => {
          toast({
            title: "Error",
            description: "Could not open print window. Please check pop-up blockers.",
            variant: "destructive",
            duration:3000,
          })
          setIsGenerating(false)
        }
      } else {
        toast({
          title: "Error",
          description: "Pop-up blocked or window could not be opened. Please allow pop-ups for this site.",
          variant: "destructive",
          duration:3000,
        })
        setIsGenerating(false)
      }
    } catch (error) {
      console.error("Error handling PDF:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred during PDF generation.",
        variant: "destructive",
        duration:3000,      })
      setIsGenerating(false)
    }
  }

  const previewPDF = () => {
    window.open("/report/preview", "_blank")
    toast({
      title: "Preview Opened",
      description: "Your report preview is open in a new tab.",
      duration:3000,
    })
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">📄 PDF Generation</CardTitle>
        <CardDescription className="text-red-100">Generate and download professional PDF reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button
            onClick={previewPDF}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
            disabled={isGenerating}
          >
            <Eye className="h-6 w-6" />
            <span>Preview Report</span>
          </Button>

          <Button
            onClick={() => handlePrintOrDownload("print")}
            disabled={isGenerating}
            className="h-20 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Printer className="h-6 w-6" />
            <span>{isGenerating ? "Generating..." : "Print Report"}</span>
          </Button>

          <Button
            onClick={() => handlePrintOrDownload("download")}
            disabled={isGenerating}
            className="h-20 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="h-6 w-6" />
            <span>{isGenerating ? "Preparing..." : "Download PDF"}</span>
          </Button>
        </div>

        {/* PDF Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">PDF Settings (for Print Dialog)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Format</label>
                <select
                  value={pdfSettings.format}
                  onChange={(e) => setPdfSettings((prev) => ({ ...prev, format: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Legal">Legal (8.5 × 14 in)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
                <select
                  value={pdfSettings.orientation}
                  onChange={(e) => setPdfSettings((prev) => ({ ...prev, orientation: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Margins</label>
                <select
                  value={pdfSettings.margins}
                  onChange={(e) => setPdfSettings((prev) => ({ ...prev, margins: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="none">None</option>
                  <option value="minimum">Minimum</option>
                  <option value="normal">Normal</option>
                  <option value="maximum">Maximum</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                <select
                  value={pdfSettings.quality}
                  onChange={(e) => setPdfSettings((prev) => ({ ...prev, quality: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="draft">Draft</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="maximum">Maximum</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pdfSettings.includeGraphics}
                    onChange={(e) => setPdfSettings((prev) => ({ ...prev, includeGraphics: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Include Graphics</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pdfSettings.includeColors}
                    onChange={(e) => setPdfSettings((prev) => ({ ...prev, includeColors: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Include Colors</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Report Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">📋 Report Information</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Patient:</span> {reportData.patientInfo.name || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Sample Code:</span> {reportData.patientInfo.sampleCode || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Report Date:</span> {reportData.patientInfo.reportDate || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Total Pages:</span> ~47 pages (estimate)
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">📖 PDF Generation Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click "Preview Report" to review the content before generating PDF.</li>
            <li>• Use "Print Report" or "Download PDF" to open your browser's print dialog.</li>
            <li>• In the print dialog, select "Save as PDF" as the destination to download the report.</li>
            <li>
              • For optimal appearance, ensure "Background graphics" is enabled and margins are set to "None" in your
              print settings.
            </li>
            <li>• The report is optimized for A4 paper size in portrait orientation.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
