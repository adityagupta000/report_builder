"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, RotateCcw, Plus, Trash2, Copy } from "lucide-react"
import { useState } from "react"
import type { MetabolicCore, MetabolicGeneData } from "@/types/report-types"

interface MetabolicCoreAdminProps {
  metabolicCore: MetabolicCore
  updateMetabolicCore: (field: keyof MetabolicCore, data: Partial<MetabolicGeneData>) => void
  onSave: () => void
  onReset: () => void
}

export default function MetabolicCoreAdmin({
  metabolicCore,
  updateMetabolicCore,
  onSave,
  onReset,
}: MetabolicCoreAdminProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const metabolicAreas = Object.keys(metabolicCore) as Array<keyof MetabolicCore>

  const filteredAreas = metabolicAreas.filter((area) => {
    const data = metabolicCore[area]
    const matchesSearch =
      area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.impact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.advice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.genes.some((gene) => gene.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const getImpactColor = (impact: string) => {
    if (impact.toLowerCase().includes("high") || impact.toLowerCase().includes("increased")) {
      return "bg-red-100 border-red-300 text-red-800"
    }
    if (impact.toLowerCase().includes("low") || impact.toLowerCase().includes("reduced")) {
      return "bg-green-100 border-green-300 text-green-800"
    }
    if (
      impact.toLowerCase().includes("normal") ||
      impact.toLowerCase().includes("average") ||
      impact.toLowerCase().includes("balanced")
    ) {
      return "bg-blue-100 border-blue-300 text-blue-800"
    }
    return "bg-gray-100 border-gray-300 text-gray-800"
  }

  const getImpactIcon = (impact: string) => {
    if (impact.toLowerCase().includes("high") || impact.toLowerCase().includes("increased")) {
      return "⚠️"
    }
    if (impact.toLowerCase().includes("low") || impact.toLowerCase().includes("reduced")) {
      return "✅"
    }
    if (
      impact.toLowerCase().includes("normal") ||
      impact.toLowerCase().includes("average") ||
      impact.toLowerCase().includes("balanced")
    ) {
      return "🔵"
    }
    return "⚪"
  }

  const addGene = (area: keyof MetabolicCore) => {
    const currentGenes = metabolicCore[area].genes
    updateMetabolicCore(area, { genes: [...currentGenes, ""] })
  }

  const removeGene = (area: keyof MetabolicCore, index: number) => {
    const currentGenes = metabolicCore[area].genes
    const newGenes = currentGenes.filter((_, i) => i !== index)
    updateMetabolicCore(area, { genes: newGenes })
  }

  const updateGene = (area: keyof MetabolicCore, index: number, value: string) => {
    const currentGenes = [...metabolicCore[area].genes]
    currentGenes[index] = value
    updateMetabolicCore(area, { genes: currentGenes })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🧬 Metabolic Core Analysis</CardTitle>
        <CardDescription className="text-purple-100">
          Comprehensive gene analysis and metabolic impacts - The STAR feature of genomics reporting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search metabolic areas or impacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 focus:border-purple-500"
            />
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

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                metabolicAreas.filter(
                  (area) =>
                    metabolicCore[area].impact.toLowerCase().includes("high") ||
                    metabolicCore[area].impact.toLowerCase().includes("increased"),
                ).length
              }
            </div>
            <div className="text-sm text-red-700">High Risk Areas</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                metabolicAreas.filter(
                  (area) =>
                    metabolicCore[area].impact.toLowerCase().includes("normal") ||
                    metabolicCore[area].impact.toLowerCase().includes("low") ||
                    metabolicCore[area].impact.toLowerCase().includes("reduced") ||
                    metabolicCore[area].impact.toLowerCase().includes("balanced"),
                ).length
              }
            </div>
            <div className="text-sm text-green-700">Normal/Low Risk</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metabolicAreas.reduce((total, area) => total + metabolicCore[area].genes.length, 0)}
            </div>
            <div className="text-sm text-blue-700">Total Genes</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{metabolicAreas.length}</div>
            <div className="text-sm text-purple-700">Metabolic Areas</div>
          </div>
        </div>

        {/* Metabolic Areas */}
        <div className="space-y-6">
          {filteredAreas.map((area) => {
            const data = metabolicCore[area]
            return (
              <Card key={area} className="border-2 border-purple-100 bg-purple-50/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                      <span>{getImpactIcon(data.impact)}</span>
                      <span>{area.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                    </CardTitle>
                    <Badge className={`${getImpactColor(data.impact)} border`}>{data.impact}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Genes Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Genes (Alleles)</Label>
                      <Button onClick={() => addGene(area)} size="sm" variant="outline" className="text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Gene
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {data.genes.map((gene, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={gene}
                            onChange={(e) => updateGene(area, index, e.target.value)}
                            placeholder="e.g., MTHFR (A>C)"
                            className="border-2 focus:border-purple-500 font-mono text-sm"
                          />
                          <Button
                            onClick={() => removeGene(area, index)}
                            size="sm"
                            variant="destructive"
                            className="px-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Genotype */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Your Genotype</Label>
                    <div className="flex gap-2">
                      <Input
                        value={data.genotype}
                        onChange={(e) => updateMetabolicCore(area, { genotype: e.target.value })}
                        placeholder="e.g., TT, GG, GG, GG, CC"
                        className="border-2 focus:border-purple-500 font-mono"
                      />
                      <Button
                        onClick={() => copyToClipboard(data.genotype)}
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Genetic Impact</Label>
                    <Input
                      value={data.impact}
                      onChange={(e) => updateMetabolicCore(area, { impact: e.target.value })}
                      placeholder="e.g., NORMAL METHYLATION"
                      className="border-2 focus:border-purple-500 font-semibold"
                    />
                  </div>

                  {/* Advice */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Advice & Recommendations</Label>
                    <Textarea
                      value={data.advice}
                      onChange={(e) => updateMetabolicCore(area, { advice: e.target.value })}
                      rows={3}
                      placeholder="Detailed advice based on genetic analysis..."
                      className="border-2 focus:border-purple-500 text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h4 className="font-semibold text-purple-800 mb-3">🌟 Metabolic Core - The STAR Feature</h4>
          <div className="text-sm text-purple-700 space-y-2">
            <p>
              <strong>Metabolic Core</strong> is the most comprehensive section that allows trained nutrigenomics
              experts to provide the best solutions for current health conditions and help prevent future risks.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h5 className="font-semibold mb-2">Key Features:</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Gene-by-gene analysis with specific alleles</li>
                  <li>Personalized genotype results</li>
                  <li>Direct health impact assessment</li>
                  <li>Actionable advice for each metabolic area</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Expert Usage:</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Functional medicine practitioners love this section</li>
                  <li>Enables precise intervention strategies</li>
                  <li>Supports both preventive and active management</li>
                  <li>Provides scientific basis for recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
