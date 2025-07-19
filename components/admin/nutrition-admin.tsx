"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save, RotateCcw, Plus, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";

interface NutrientData {
  score: number;
  healthImpact: string;
  intakeLevel: string;
  source: string;
}

interface NutritionData {
  vitamins: Record<string, NutrientData>;
  fattyAcids: Record<string, NutrientData>;
  elements: Record<string, NutrientData>;
  complexNutrients: Record<string, NutrientData>;
}

interface NutritionAdminProps {
  nutritionData?: NutritionData;
  updateNutritionData?: (
    section: keyof NutritionData,
    field: string,
    data: Partial<NutrientData>
  ) => void;
  onSave?: () => void;
  onReset?: () => void;
}

export default function NutritionAdmin({
  nutritionData: propNutritionData,
  updateNutritionData: propUpdateNutritionData,
  onSave: propOnSave,
  onReset: propOnReset,
}: NutritionAdminProps) {
  // Default data structure
  const defaultNutrientData: NutrientData = {
    score: 5,
    healthImpact: "",
    intakeLevel: "NORMAL INTAKE",
    source: "DIET",
  };

  const initialNutritionData: NutritionData = {
    vitamins: {
      vitaminA: {
        score: 6,
        healthImpact: "Vision & Immune",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      vitaminB12: {
        score: 8,
        healthImpact: "Energy & Nerves",
        intakeLevel: "ENHANCED INTAKE (METHYLCOBALAMIN)",
        source: "SUPPLEMENTS",
      },
      vitaminC: {
        score: 4,
        healthImpact: "Immune & Collagen",
        intakeLevel: "NORMAL INTAKE",
        source: "DIET",
      },
      vitaminD: {
        score: 9,
        healthImpact: "Bones & Immune",
        intakeLevel: "ENHANCED INTAKE & SUN EXPOSURE",
        source: "DIET & SUN EXPOSURE",
      },
      folate: {
        score: 7,
        healthImpact: "DNA & Blood",
        intakeLevel: "ENHANCED INTAKE (L METHYLFOLATE)",
        source: "DIET & SUPPLEMENTS",
      },
    },
    fattyAcids: {
      omega3: {
        score: 8,
        healthImpact: "Heart & Brain",
        intakeLevel: "ENHANCED INTAKE",
        source: "ENHANCED INTAKE (VEG/FISH OIL) & DIET",
      },
      omega6: {
        score: 3,
        healthImpact: "Inflammation",
        intakeLevel: "RESTRICTED INTAKE",
        source: "DIET",
      },
    },
    elements: {
      iron: {
        score: 6,
        healthImpact: "Blood & Energy",
        intakeLevel: "ENHANCED INTAKE (VEG SOURCES)",
        source: "DIET",
      },
      zinc: {
        score: 5,
        healthImpact: "Immune & Healing",
        intakeLevel: "NORMAL INTAKE",
        source: "DIET",
      },
      magnesium: {
        score: 7,
        healthImpact: "Muscle & Nerve",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET & SUPPLEMENTS",
      },
    },
    complexNutrients: {
      antioxidants: {
        score: 5,
        healthImpact: "Cell Protection",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
      polyphenols: {
        score: 4,
        healthImpact: "Anti-inflammatory",
        intakeLevel: "ENHANCED INTAKE",
        source: "DIET",
      },
    },
  };

  // State management
  const [nutritionData, setNutritionData] = useState<NutritionData>(
    propNutritionData || initialNutritionData
  );
  const [activeSection, setActiveSection] =
    useState<keyof NutritionData>("vitamins");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNutrientName, setNewNutrientName] = useState("");
  const [isEditMode, setIsEditMode] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // CRUD Operations
  const updateNutritionData = (
    section: keyof NutritionData,
    field: string,
    data: Partial<NutrientData>
  ) => {
    setNutritionData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          ...data,
        },
      },
    }));

    // Call prop function if provided
    if (propUpdateNutritionData) {
      propUpdateNutritionData(section, field, data);
    }
  };

  const addNutrient = (section: keyof NutritionData, name: string) => {
    if (
      !name.trim() ||
      nutritionData[section][name.toLowerCase().replace(/\s+/g, "")]
    ) {
      return false;
    }

    const fieldName = name.toLowerCase().replace(/\s+/g, "");
    setNutritionData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [fieldName]: { ...defaultNutrientData },
      },
    }));
    return true;
  };

  const deleteNutrient = (section: keyof NutritionData, field: string) => {
    setNutritionData((prev) => {
      const newSection = { ...prev[section] };
      delete newSection[field];
      return {
        ...prev,
        [section]: newSection,
      };
    });
  };

  const renameNutrient = (
    section: keyof NutritionData,
    oldField: string,
    newName: string
  ) => {
    if (
      !newName.trim() ||
      newName.toLowerCase().replace(/\s+/g, "") === oldField
    ) {
      return false;
    }

    const newFieldName = newName.toLowerCase().replace(/\s+/g, "");
    if (nutritionData[section][newFieldName] && newFieldName !== oldField) {
      return false; // Name already exists
    }

    setNutritionData((prev) => {
      const newSection = { ...prev[section] };
      const data = newSection[oldField];
      delete newSection[oldField];
      newSection[newFieldName] = data;

      return {
        ...prev,
        [section]: newSection,
      };
    });
    return true;
  };

  const onSave = () => {
    console.log("Saving nutrition data:", nutritionData);
    if (propOnSave) {
      propOnSave();
    } else {
      alert("Nutrition data saved successfully!");
    }
  };

  const onReset = () => {
    setNutritionData(initialNutritionData);
    if (propOnReset) {
      propOnReset();
    }
  };

  const handleAddNutrient = () => {
    if (addNutrient(activeSection, newNutrientName)) {
      setNewNutrientName("");
      setIsAddDialogOpen(false);
    } else {
      alert("Invalid name or nutrient already exists!");
    }
  };

  const handleRename = (field: string) => {
    if (renameNutrient(activeSection, field, editingName)) {
      setIsEditMode(null);
      setEditingName("");
    } else {
      alert("Invalid name or nutrient already exists!");
    }
  };

  const renderNutrientField = (
    section: keyof NutritionData,
    field: string,
    data: NutrientData,
    title: string
  ) => (
    <Card key={field} className="border-2 border-green-100 bg-green-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-green-800 flex items-center justify-between">
          {isEditMode === field ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="text-lg font-semibold border-2 focus:border-green-500"
                onKeyPress={(e) => e.key === "Enter" && handleRename(field)}
              />
              <Button size="sm" onClick={() => handleRename(field)}>
                ✓
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditMode(null);
                  setEditingName("");
                }}
              >
                ✗
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span>{title}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditMode(field);
                  setEditingName(title);
                }}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${
                data.score >= 7
                  ? "border-red-500 text-red-700"
                  : data.score >= 4
                  ? "border-yellow-500 text-yellow-700"
                  : "border-green-500 text-green-700"
              }`}
            >
              Score: {data.score}/10
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteNutrient(section, field)}
              className="text-red-600 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Score (1-10)</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={data.score}
              onChange={(e) => {
                const score = Math.max(
                  1,
                  Math.min(10, Number.parseInt(e.target.value) || 1)
                );
                updateNutritionData(section, field, { score });
              }}
              className="border-2 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Health Impact</Label>
            <Input
              value={data.healthImpact}
              onChange={(e) =>
                updateNutritionData(section, field, {
                  healthImpact: e.target.value,
                })
              }
              placeholder="e.g., Skin & Vision"
              className="border-2 focus:border-green-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Intake Level</Label>
          <Select
            value={data.intakeLevel}
            onValueChange={(value) =>
              updateNutritionData(section, field, { intakeLevel: value })
            }
          >
            <SelectTrigger className="border-2 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENHANCED INTAKE">ENHANCED INTAKE</SelectItem>
              <SelectItem value="NORMAL INTAKE">NORMAL INTAKE</SelectItem>
              <SelectItem value="RESTRICTED INTAKE">
                RESTRICTED INTAKE
              </SelectItem>
              <SelectItem value="ENHANCED INTAKE (METHYLCOBALAMIN)">
                ENHANCED INTAKE (METHYLCOBALAMIN)
              </SelectItem>
              <SelectItem value="ENHANCED INTAKE (L METHYLFOLATE)">
                ENHANCED INTAKE (L METHYLFOLATE)
              </SelectItem>
              <SelectItem value="ENHANCED INTAKE & SUN EXPOSURE">
                ENHANCED INTAKE & SUN EXPOSURE
              </SelectItem>
              <SelectItem value="ENHANCED INTAKE (VEG SOURCES)">
                ENHANCED INTAKE (VEG SOURCES)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Source</Label>
          <Select
            value={data.source}
            onValueChange={(value) =>
              updateNutritionData(section, field, { source: value })
            }
          >
            <SelectTrigger className="border-2 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DIET">DIET</SelectItem>
              <SelectItem value="SUPPLEMENTS">SUPPLEMENTS</SelectItem>
              <SelectItem value="DIET & SUPPLEMENTS">
                DIET & SUPPLEMENTS
              </SelectItem>
              <SelectItem value="DIET & SUN EXPOSURE">
                DIET & SUN EXPOSURE
              </SelectItem>
              <SelectItem value="ENHANCED INTAKE (VEG/FISH OIL) & DIET">
                ENHANCED INTAKE (VEG/FISH OIL) & DIET
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const getSectionTitle = (section: keyof NutritionData) => {
    switch (section) {
      case "vitamins":
        return "💊 Vitamins";
      case "fattyAcids":
        return "🐟 Fatty Acids";
      case "elements":
        return "⚡ Essential Elements";
      case "complexNutrients":
        return "🌿 Complex Nutrients";
      default:
        return section;
    }
  };

  const getSectionIcon = (section: keyof NutritionData) => {
    switch (section) {
      case "vitamins":
        return "💊";
      case "fattyAcids":
        return "🐟";
      case "elements":
        return "⚡";
      case "complexNutrients":
        return "🌿";
      default:
        return "📊";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">💊 Nutrition Analysis</CardTitle>
        <CardDescription className="text-green-100">
          Configure vitamins, minerals, fatty acids, and complex nutrients with
          full CRUD operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(nutritionData) as Array<keyof NutritionData>).map(
              (section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(section)}
                  className="flex items-center gap-2"
                >
                  <span>{getSectionIcon(section)}</span>
                  <span className="capitalize">
                    {section.replace(/([A-Z])/g, " $1")}
                  </span>
                </Button>
              )
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Add New{" "}
                    {getSectionTitle(activeSection).replace(/[^\w\s]/gi, "")}{" "}
                    Item
                  </DialogTitle>
                  <DialogDescription>
                    Enter the name for the new nutrient in the {activeSection}{" "}
                    section.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nutrientName">Nutrient Name</Label>
                    <Input
                      id="nutrientName"
                      value={newNutrientName}
                      onChange={(e) => setNewNutrientName(e.target.value)}
                      placeholder="e.g., Vitamin E, Selenium, etc."
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddNutrient()
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setNewNutrientName("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddNutrient}
                    disabled={!newNutrientName.trim()}
                  >
                    Add Nutrient
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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
            {Object.entries(nutritionData[activeSection]).map(([key, item]) =>
              renderNutrientField(
                activeSection,
                key,
                item as NutrientData,
                key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
              )
            )}
          </div>

          {Object.keys(nutritionData[activeSection]).length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-500 text-lg mb-2">
                No items in this section
              </div>
              <div className="text-gray-400 text-sm">
                Click "Add New" to add your first nutrient
              </div>
            </div>
          )}
        </div>

        {/* Section Guidelines */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">
            📋 {getSectionTitle(activeSection)} Guidelines:
          </h4>
          <div className="text-sm text-green-700 space-y-2">
            {activeSection === "vitamins" && (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Score 1-3: Low requirement, normal dietary intake sufficient
                </li>
                <li>
                  Score 4-6: Moderate requirement, enhanced dietary intake
                  recommended
                </li>
                <li>
                  Score 7-10: High requirement, supplementation may be needed
                </li>
                <li>Consider bioavailable forms for better absorption</li>
              </ul>
            )}
            {activeSection === "elements" && (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Essential minerals required for various metabolic processes
                </li>
                <li>
                  Balance is key - both deficiency and excess can be harmful
                </li>
                <li>Consider interactions between different minerals</li>
                <li>Monitor through regular blood tests</li>
              </ul>
            )}
            {activeSection === "fattyAcids" && (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Omega-3 fatty acids are essential for heart and brain health
                </li>
                <li>Consider EPA:DHA ratio for optimal benefits</li>
                <li>
                  Vegetarian sources include flaxseed, chia seeds, walnuts
                </li>
                <li>Fish oil supplements for non-vegetarians</li>
              </ul>
            )}
            {activeSection === "complexNutrients" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Antioxidants help protect against cellular damage</li>
                <li>Anti-inflammatory compounds reduce chronic inflammation</li>
                <li>Best obtained from colorful fruits and vegetables</li>
                <li>Synergistic effects when consumed together</li>
              </ul>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                Object.values(nutritionData[activeSection]).filter(
                  (item: any) => item.score >= 7
                ).length
              }
            </div>
            <div className="text-sm text-red-700">High Priority</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {
                Object.values(nutritionData[activeSection]).filter(
                  (item: any) => item.score >= 4 && item.score < 7
                ).length
              }
            </div>
            <div className="text-sm text-yellow-700">Moderate Priority</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                Object.values(nutritionData[activeSection]).filter(
                  (item: any) => item.score < 4
                ).length
              }
            </div>
            <div className="text-sm text-green-700">Low Priority</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(nutritionData[activeSection]).length}
            </div>
            <div className="text-sm text-blue-700">Total Items</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
