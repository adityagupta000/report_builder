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
import { Save, Plus, Trash2, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

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
}

export default function NutritionAdmin({
  nutritionData: propNutritionData,
  updateNutritionData: propUpdateNutritionData,
  onSave: propOnSave,
}: NutritionAdminProps) {
  // Default data structure
  const defaultNutrientData: NutrientData = {
    score: 5,
    healthImpact: "",
    intakeLevel: "NORMAL INTAKE",
    source: "DIET",
  };

  // State management

  const nutritionData = propNutritionData;
  const [activeSection, setActiveSection] =
    useState<keyof NutritionData>("vitamins");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const updateNutritionData = propUpdateNutritionData;
  const { toast } = useToast();

  // New nutrient form state
  const [newNutrient, setNewNutrient] = useState({
    name: "",
    score: 5,
    healthImpact: "",
    intakeLevel: "NORMAL INTAKE",
    source: "DIET",
  });

  // CRUD Operations

  const addNutrient = (
    section: keyof NutritionData,
    nutrientData: typeof newNutrient
  ) => {
    if (!nutritionData || !nutrientData.name.trim()) {
      return false;
    }

    const fieldName = nutrientData.name.toLowerCase().replace(/\s+/g, "");

    if (nutritionData[section][fieldName]) {
      return false;
    }

    if (propUpdateNutritionData) {
      propUpdateNutritionData?.(section, fieldName, {
        score: nutrientData.score,
        healthImpact: nutrientData.healthImpact,
        intakeLevel: nutrientData.intakeLevel,
        source: nutrientData.source,
      });
    }

    return true;
  };

  const deleteNutrient = (section: keyof NutritionData, field: string) => {
    const updatedSection = { ...nutritionData?.[section] };
    delete updatedSection[field];

    propUpdateNutritionData?.(section, "", updatedSection);
  };

  const renameNutrient = (
    section: keyof NutritionData,
    oldField: string,
    newName: string
  ) => {
    if (!nutritionData || !newName.trim()) {
      return false;
    }

    const newField = newName.toLowerCase().replace(/\s+/g, "");

    if (newField === oldField) return true;
    if (nutritionData[section][newField]) return false;

    const updatedSection = { ...nutritionData[section] };
    updatedSection[newField] = updatedSection[oldField];
    delete updatedSection[oldField];

    propUpdateNutritionData?.(section, "", updatedSection);
    return true;
  };

  const onSave = async () => {
    try {
      const res = await fetch("/api/nutrition", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nutritionData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toast({
        title: "Success",
        description: "Nutrition data saved successfully!",
        variant: "success",
        duration: 3000,
      });
      if (propOnSave) propOnSave();
    } catch (err) {
      console.error("Save failed:", err);
      toast({
        title: "Save Failed",
        description: "Could not save data. Check console for details.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleAddNutrient = () => {
    if (addNutrient(activeSection, newNutrient)) {
      setNewNutrient({
        name: "",
        score: 5,
        healthImpact: "",
        intakeLevel: "NORMAL INTAKE",
        source: "DIET",
      });
      setIsAddDialogOpen(false);
    } else {
      toast({
        title: "Add Failed",
        description: "Invalid name or nutrient already exists!",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleRename = (field: string) => {
    if (renameNutrient(activeSection, field, editingName)) {
      setIsEditMode(null);
      setEditingName("");
    } else {
      toast({
        title: "Rename Failed",
        description: "Invalid name or nutrient already exists!",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const resetAddForm = () => {
    setNewNutrient({
      name: "",
      score: 5,
      healthImpact: "",
      intakeLevel: "NORMAL INTAKE",
      source: "DIET",
    });
  };

  if (!nutritionData) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading nutrition data...
      </div>
    );
  }

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
                propUpdateNutritionData?.(section, field, { score });
              }}
              className="border-2 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Health Impact</Label>
            <Input
              value={data.healthImpact}
              onChange={(e) =>
                propUpdateNutritionData?.(section, field, {
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
              propUpdateNutritionData?.(section, field, { intakeLevel: value })
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
              propUpdateNutritionData?.(section, field, { source: value })
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
        <CardTitle className="text-2xl">Nutrition Analysis</CardTitle>
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Add New{" "}
                    {getSectionTitle(activeSection).replace(/[^\w\s]/gi, "")}{" "}
                    Item
                  </DialogTitle>
                  <DialogDescription>
                    Enter the details for the new nutrient in the{" "}
                    {activeSection} section.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nutrientName">Nutrient Name *</Label>
                    <Input
                      id="nutrientName"
                      value={newNutrient.name}
                      onChange={(e) =>
                        setNewNutrient({ ...newNutrient, name: e.target.value })
                      }
                      placeholder="e.g., Vitamin E, Selenium, etc."
                      className="border-2 focus:border-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nutrientScore">Score (1-10)</Label>
                      <Input
                        id="nutrientScore"
                        type="number"
                        min="1"
                        max="10"
                        value={newNutrient.score}
                        onChange={(e) =>
                          setNewNutrient({
                            ...newNutrient,
                            score: Math.max(
                              1,
                              Math.min(10, Number.parseInt(e.target.value) || 1)
                            ),
                          })
                        }
                        className="border-2 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nutrientImpact">Health Impact</Label>
                      <Input
                        id="nutrientImpact"
                        value={newNutrient.healthImpact}
                        onChange={(e) =>
                          setNewNutrient({
                            ...newNutrient,
                            healthImpact: e.target.value,
                          })
                        }
                        placeholder="e.g., Skin & Vision"
                        className="border-2 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nutrientIntake">Intake Level</Label>
                    <Select
                      value={newNutrient.intakeLevel}
                      onValueChange={(value) =>
                        setNewNutrient({ ...newNutrient, intakeLevel: value })
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ENHANCED INTAKE">
                          ENHANCED INTAKE
                        </SelectItem>
                        <SelectItem value="NORMAL INTAKE">
                          NORMAL INTAKE
                        </SelectItem>
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
                    <Label htmlFor="nutrientSource">Source</Label>
                    <Select
                      value={newNutrient.source}
                      onValueChange={(value) =>
                        setNewNutrient({ ...newNutrient, source: value })
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
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      resetAddForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddNutrient}
                    disabled={!newNutrient.name.trim()}
                  >
                    Add Nutrient
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
      </CardContent>
    </Card>
  );
}
