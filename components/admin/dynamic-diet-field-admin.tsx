"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Save,
  RotateCcw,
  Trash2,
  GripVertical,
  X,
  File,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  FieldInput,
  FieldTextarea,
  FieldSelect,
} from "@/components/admin/dynamic-field-helpers";
import type { DynamicDietFieldDefinition } from "@/types/report-types";

interface DynamicDietFieldAdminProps {
  dynamicDietFieldDefinitions: DynamicDietFieldDefinition[];
  onUpdateFields: (definitions: DynamicDietFieldDefinition[]) => void;
  onSave: () => void;
  onReset: () => void;
  categories: string[];
  onUpdateCategories: (updated: string[]) => void;
  patientDietAnalysisResults: PatientDietAnalysisResult[];
  onUpdateResults: (results: PatientDietAnalysisResult[]) => void;

  // ... other props
}

export default function DynamicDietFieldAdmin({
  dynamicDietFieldDefinitions,
  onUpdateFields,
  onSave,
  onReset,
  categories,
  onUpdateCategories,
  patientDietAnalysisResults,
  onUpdateResults,
}: DynamicDietFieldAdminProps) {
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [enteredScore, setEnteredScore] = useState<number>(5);
  const [fieldScores, setFieldScores] = useState<Record<string, number>>({});
  const [results, setResults] = useState<PatientDietAnalysisResult[]>([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const [localFields, setLocalFields] = useState<DynamicDietFieldDefinition[]>(
    dynamicDietFieldDefinitions
  );
  const [localCategories, setLocalCategories] = useState<string[]>(
    categories || []
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFieldData, setNewFieldData] = useState<
    Omit<DynamicDietFieldDefinition, "_uuid" | "id">
  >({
    label: "",
    category: localCategories[0] || "",
    min: 1,
    max: 10,
    highRecommendation: "",
    normalRecommendation: "",
    lowRecommendation: "",
  });
  const { toast } = useToast();

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !localCategories.includes(newCategory)) {
      const updated = [...localCategories, newCategory];
      setLocalCategories(updated);
      onUpdateCategories(updated);
    }
  };

  const handleDeleteCategory = (cat: string) => {
    if (confirm(`Delete "${cat}"?`)) {
      const updated = localCategories.filter((c) => c !== cat);
      setLocalCategories(updated);
      onUpdateCategories(updated);
    }
  };

  useEffect(() => {
    setLocalFields(dynamicDietFieldDefinitions);
  }, [dynamicDietFieldDefinitions]);

  useEffect(() => {
    setResults(patientDietAnalysisResults || []);
  }, [patientDietAnalysisResults]);

  const addNewField = () => {
    if (!newFieldData.label.trim()) {
      toast({
        title: "Validation Error",
        description: "Field label is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    const fieldId = newFieldData.label
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    const isDuplicate = localFields.some((field) => field.id === fieldId);
    if (isDuplicate) {
      toast({
        title: "Validation Error",
        description: "A field with this label (ID) already exists.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    const newField: DynamicDietFieldDefinition = {
      _uuid: uuidv4(),
      id: fieldId,
      ...newFieldData,
    };
    const updatedFields = [...localFields, newField];
    setLocalFields(updatedFields);
    onUpdateFields(updatedFields);
    setShowCreateModal(false);
    setNewFieldData({
      label: "",
      category: localCategories[0] || "",
      min: 1,
      max: 10,
      highRecommendation: "",
      normalRecommendation: "",
      lowRecommendation: "",
    });
    toast({
      title: "Field Added",
      description: `"${newField.label}" has been added. Remember to Save Changes.`,
      variant: "success",
      duration: 3000,
    });
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setNewFieldData({
      label: "",
      category: localCategories[0] || "",
      min: 1,
      max: 10,
      highRecommendation: "",
      normalRecommendation: "",
      lowRecommendation: "",
    });
  };

  const updateLocalField = (
    index: number,
    key: keyof DynamicDietFieldDefinition,
    value: any
  ) => {
    const updated = [...localFields];
    if (key === "id") {
      const newId = String(value)
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      const isDuplicate = localFields.some(
        (f, i) => i !== index && f.id === newId
      );
      if (isDuplicate) {
        toast({
          title: "Validation Error",
          description: "Field ID must be unique.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      updated[index] = { ...updated[index], [key]: newId };
    } else {
      updated[index] = { ...updated[index], [key]: value };
    }
    setLocalFields(updated);
    onUpdateFields(updated);
  };

  const handleBatchAddResults = () => {
    const newResults: PatientDietAnalysisResult[] = [];

    Object.entries(fieldScores).forEach(([fieldId, score]) => {
      const field = localFields.find((f) => f.id === fieldId);
      if (!field || score < field.min || score > field.max) return;

      let level: "LOW" | "NORMAL" | "HIGH" = "NORMAL";
      if (score <= 3) level = "LOW";
      else if (score >= 7) level = "HIGH";

      const recommendations = {
        LOW: field.lowRecommendation,
        NORMAL: field.normalRecommendation,
        HIGH: field.highRecommendation,
      };

      const recommendation = recommendations[level];

      newResults.push({
        fieldId,
        score,
        level,
        recommendation, // still storing the selected one
        recommendations,
        selectedLevel: level,
      });
    });

    const updated = [...results, ...newResults];
    setResults(updated);
    onUpdateResults(updated);
    setShowResultModal(false);
    setFieldScores({}); // Reset

    toast({
      title: "Results Saved",
      description: `${newResults.length} results added successfully.`,
      variant: "success",
      duration: 3000,
    });
  };

  const handleDeleteResult = (fieldId: string) => {
    const updated = results.filter((r) => r.fieldId !== fieldId);
    setResults(updated);
    onUpdateResults(updated);

    toast({
      title: "Result Deleted",
      description: `Analysis result for "${fieldId}" has been removed.`,
      variant: "destructive",
      duration: 3000,
    });
  };

  const deleteField = (idToDelete: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this field? This action cannot be undone."
      )
    ) {
      return;
    }
    const updatedFields = localFields.filter(
      (field) => field.id !== idToDelete
    );
    setLocalFields(updatedFields);
    onUpdateFields(updatedFields);
    toast({
      title: "Field Deleted",
      description: "Field removed. Remember to Save Changes.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(localFields);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setLocalFields(reordered);
    onUpdateFields(reordered);
    toast({
      title: "Fields Reordered",
      description: "Order updated. Remember to Save Changes.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <div>
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="text-xl sm:text-2xl">
            📊 Dynamic Diet Field Management
          </CardTitle>
          <CardDescription className="text-amber-100 text-sm sm:text-base">
            Define and manage the types of diet analysis fields for your
            reports.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Configured Fields
            </h3>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Section
              </Button>
              <Button
                onClick={() => setShowCreateModal(true)}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Field
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={() => setShowResultModal(true)}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Analysis Result
              </Button>

              <Button
                onClick={() => setShowResultsModal(true)}
                size="sm"
                className="w-full sm:w-auto"
              >
                <File className="h-4 w-4 mr-2" />
                View Saved Results
              </Button>

              <Button onClick={onSave} size="sm" className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>

          {/* Categories Management Section */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h4 className="font-semibold text-gray-700 mb-4 text-base sm:text-lg">
              Diet Field Categories
            </h4>

            <div className="space-y-3">
              {/* Categories List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {localCategories.map((cat) => (
                  <div
                    key={cat}
                    className="flex justify-between items-center bg-white px-3 py-2 rounded-md shadow-sm border"
                  >
                    <span className="text-sm font-medium truncate mr-2">
                      {cat}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(cat)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleAddCategory}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>

          {/* Fields List */}
          {localFields.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-lg">No dynamic diet fields defined yet.</p>
              <p className="text-sm mt-2">
                Click "Add New Field" to get started.
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="fields">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {localFields.map((field, index) => (
                      <Draggable
                        key={field._uuid}
                        draggableId={field._uuid}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg p-4 sm:p-6 bg-white shadow-sm transition-all duration-200 ${
                              snapshot.isDragging
                                ? "bg-gray-100 ring-2 ring-blue-500 shadow-lg"
                                : "hover:shadow-md"
                            }`}
                          >
                            {/* Field Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span
                                  {...provided.dragHandleProps}
                                  className="cursor-grab text-gray-400 flex-shrink-0 touch-none"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                    {index + 1}. {field.label}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                                    ID: {field.id}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteField(field.id)}
                                className="flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="hidden sm:inline ml-2">
                                  Delete
                                </span>
                              </Button>
                            </div>

                            {/* Field Form */}
                            <div className="space-y-4">
                              {/* Basic Info Row */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FieldInput
                                  label="Field ID"
                                  value={field.id}
                                  onChange={(val) =>
                                    updateLocalField(index, "id", val)
                                  }
                                  disabled
                                />
                                <FieldInput
                                  label="Label"
                                  value={field.label}
                                  onChange={(val) =>
                                    updateLocalField(index, "label", val)
                                  }
                                />
                                <FieldSelect
                                  label="Category"
                                  value={field.category}
                                  options={localCategories}
                                  onChange={(val) =>
                                    updateLocalField(index, "category", val)
                                  }
                                />
                              </div>

                              {/* Score Range Row */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FieldInput
                                  label="Min Score"
                                  type="number"
                                  value={field.min}
                                  onChange={(val) =>
                                    updateLocalField(index, "min", val)
                                  }
                                  min={0}
                                  max={field.max}
                                />
                                <FieldInput
                                  label="Max Score"
                                  type="number"
                                  value={field.max}
                                  onChange={(val) =>
                                    updateLocalField(index, "max", val)
                                  }
                                  min={field.min}
                                />
                              </div>

                              {/* Recommendations Row */}
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FieldTextarea
                                  label="High Recommendation"
                                  value={field.highRecommendation}
                                  onChange={(val) =>
                                    updateLocalField(
                                      index,
                                      "highRecommendation",
                                      val
                                    )
                                  }
                                />
                                <FieldTextarea
                                  label="Normal Recommendation"
                                  value={field.normalRecommendation}
                                  onChange={(val) =>
                                    updateLocalField(
                                      index,
                                      "normalRecommendation",
                                      val
                                    )
                                  }
                                />
                                <FieldTextarea
                                  label="Low Recommendation"
                                  value={field.lowRecommendation}
                                  onChange={(val) =>
                                    updateLocalField(
                                      index,
                                      "lowRecommendation",
                                      val
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
      </Card>

      {/* Create New Field Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
            <h3 className="text-lg font-bold mb-4 text-center">
              Add Diet Analysis Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto mb-6">
              {localFields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between"
                >
                  <label className="mr-4 w-2/3 font-medium">
                    {field.label}:
                  </label>
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    className="w-20 border rounded px-2 py-1"
                    value={fieldScores[field.id] ?? ""}
                    onChange={(e) =>
                      setFieldScores((prev) => ({
                        ...prev,
                        [field.id]: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowResultModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleBatchAddResults}>Save All</Button>
            </div>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-bold">
                Add New Diet Field Definition
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCreateModalClose}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    label="Field Label"
                    value={newFieldData.label}
                    onChange={(val) =>
                      setNewFieldData({ ...newFieldData, label: val })
                    }
                    placeholder="e.g., Gluten Sensitivity"
                    required
                  />
                  <FieldSelect
                    label="Category"
                    value={newFieldData.category}
                    options={localCategories}
                    onChange={(val) =>
                      setNewFieldData({ ...newFieldData, category: val })
                    }
                  />
                </div>

                {/* Score Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    label="Min Score"
                    type="number"
                    value={newFieldData.min}
                    onChange={(val) =>
                      setNewFieldData({ ...newFieldData, min: Number(val) })
                    }
                    min={0}
                    max={newFieldData.max}
                  />
                  <FieldInput
                    label="Max Score"
                    type="number"
                    value={newFieldData.max}
                    onChange={(val) =>
                      setNewFieldData({ ...newFieldData, max: Number(val) })
                    }
                    min={newFieldData.min}
                  />
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <FieldTextarea
                    label="High Recommendation"
                    value={newFieldData.highRecommendation}
                    onChange={(val) =>
                      setNewFieldData({
                        ...newFieldData,
                        highRecommendation: val,
                      })
                    }
                    placeholder="Recommendation for high score"
                  />
                  <FieldTextarea
                    label="Normal Recommendation"
                    value={newFieldData.normalRecommendation}
                    onChange={(val) =>
                      setNewFieldData({
                        ...newFieldData,
                        normalRecommendation: val,
                      })
                    }
                    placeholder="Recommendation for normal score"
                  />
                  <FieldTextarea
                    label="Low Recommendation"
                    value={newFieldData.lowRecommendation}
                    onChange={(val) =>
                      setNewFieldData({
                        ...newFieldData,
                        lowRecommendation: val,
                      })
                    }
                    placeholder="Recommendation for low score"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={handleCreateModalClose}
                className="w-full sm:w-auto bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={addNewField} className="w-full sm:w-auto">
                Add Field
              </Button>
            </div>
          </div>
        </div>
      )}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-4 max-h-[80vh] overflow-y-auto relative scrollbar-hide">
            <button
              onClick={() => setShowResultsModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Delete All Button */}
            <div className="mb-4 flex justify-end">
              <Button
                variant="destructive"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete all analysis results?"
                    )
                  ) {
                    setResults([]);
                    onUpdateResults([]);
                    toast({
                      title: "All Results Deleted",
                      description:
                        "All diet analysis results have been cleared.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Results
              </Button>
            </div>

            {results.length === 0 ? (
              <p className="text-gray-500 italic">No analysis results yet.</p>
            ) : (
              <div className="space-y-3">
                {results.map((res) => (
                  <div
                    key={res.fieldId}
                    className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{res.fieldId}</p>
                      <p className="text-sm text-gray-600">
                        Score: {res.score}, Level: {res.level}
                      </p>
                      <p className="text-sm text-gray-600">
                        Recommendation: {res.recommendation}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteResult(res.fieldId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
