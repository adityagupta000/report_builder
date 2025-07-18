"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Trash2, Save, RotateCcw } from "lucide-react"
import type { GeneTestResult } from "@/types/report-types"

interface GeneResultsAdminProps {
  geneTestResults: GeneTestResult[]
  addGeneTestResult: () => void
  updateGeneTestResult: (index: number, field: keyof GeneTestResult, value: string) => void
  removeGeneTestResult: (index: number) => void
  onSave: () => void
  onReset: () => void
}

export default function GeneResultsAdmin({
  geneTestResults,
  addGeneTestResult,
  updateGeneTestResult,
  removeGeneTestResult,
  onSave,
  onReset,
}: GeneResultsAdminProps) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🧬 Gene Test Results</CardTitle>
        <CardDescription className="text-indigo-100">Manage the complete list of gene test results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Gene Test Results ({geneTestResults.length})</h3>
          <div className="flex gap-2">
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={addGeneTestResult} className="bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Gene Result
            </Button>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-4">
            {geneTestResults.map((result, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-800">Gene #{index + 1}</h4>
                  <Button onClick={() => removeGeneTestResult(index)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Gene Name</Label>
                    <Input
                      value={result.geneName}
                      onChange={(e) => updateGeneTestResult(index, "geneName", e.target.value)}
                      placeholder="e.g., ALDH2 Aldehyde dehydrogenase 2"
                      className="border-2 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Variation</Label>
                    <Input
                      value={result.variation}
                      onChange={(e) => updateGeneTestResult(index, "variation", e.target.value)}
                      placeholder="e.g., G>A"
                      className="border-2 focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Result</Label>
                    <Input
                      value={result.result}
                      onChange={(e) => updateGeneTestResult(index, "result", e.target.value)}
                      placeholder="e.g., GG"
                      className="border-2 focus:border-indigo-500 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {geneTestResults.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🧬</div>
            <p className="text-lg mb-4">No gene test results added yet</p>
            <Button onClick={addGeneTestResult} className="bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add First Gene Result
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
