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
import { Plus, Save, RotateCcw, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  FieldInput,
  FieldTextarea,
  FieldSelect,
} from "@/components/admin/dynamic-field-helpers";
import type { DynamicDietFieldDefinition } from "@/types/report-types";

interface DynamicDietFieldAdminProps {
  dynamicDietFieldDefinitions: DynamicDietFieldDefinition[];
  updateDynamicDietFieldDefinitions: (
    definitions: DynamicDietFieldDefinition[]
  ) => void;
  onSave: () => void;
  onReset: () => void;
}

export default function DynamicDietFieldAdmin({
  dynamicDietFieldDefinitions,
  updateDynamicDietFieldDefinitions,
  onSave,
  onReset,
}: DynamicDietFieldAdminProps) {
  const [localFields, setLocalFields] = useState<DynamicDietFieldDefinition[]>(
    dynamicDietFieldDefinitions
  );
  const [categories, setCategories] = useState<string[]>([
    "Macronutrients",
    "Meal Pattern",
    "Food Sensitivities",
    "Taste Sensitivities",
  ]); // Predefined categories for diet analysis
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFieldData, setNewFieldData] = useState<
    Omit<DynamicDietFieldDefinition, "_uuid" | "id">
  >({
    label: "",
    category: categories[0] || "", // Default to first category
    min: 1,
    max: 10,
    highRecommendation: "",
    normalRecommendation: "",
    lowRecommendation: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setLocalFields(dynamicDietFieldDefinitions);
  }, [dynamicDietFieldDefinitions]);

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
    updateDynamicDietFieldDefinitions(updatedFields);
    setShowCreateModal(false);
    setNewFieldData({
      label: "",
      category: categories[0] || "",
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
      category: categories[0] || "",
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
    updateDynamicDietFieldDefinitions(updated); // Update parent state immediately
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
    updateDynamicDietFieldDefinitions(updatedFields);
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
    updateDynamicDietFieldDefinitions(reordered); // Update parent state
    toast({
      title: "Fields Reordered",
      description: "Order updated. Remember to Save Changes.",
      variant:"warning",
      duration:3000,
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">
          📊 Dynamic Diet Field Management
        </CardTitle>
        <CardDescription className="text-amber-100">
          Define and manage the types of diet analysis fields for your reports.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="flex justify-start items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Configured Fields
          </h3>
        </div>

        <div className="flex justify-end mb-6">
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="mx-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Section
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="mx-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Field
          </Button>
          <Button onClick={onSave} size="sm" className="mx-1">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {localFields.length === 0 ? (
          <div className="text-center py-12 text-gray-500 italic">
            No dynamic diet fields defined yet.
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
                          className={`border rounded-lg p-4 bg-white shadow-sm transition-all duration-200 ${
                            snapshot.isDragging
                              ? "bg-gray-100 ring-2 ring-blue-500 shadow-lg"
                              : "hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span
                                {...provided.dragHandleProps}
                                className="cursor-grab text-gray-400"
                              >
                                <GripVertical className="h-5 w-5" />
                              </span>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {index + 1}. {field.label} (ID: {field.id})
                              </h4>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteField(field.id)}
                              className="ml-4"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* First row - 3 columns */}
                            <FieldInput
                              label="Field ID (Auto-generated from Label)"
                              value={field.id}
                              onChange={(val) =>
                                updateLocalField(index, "id", val)
                              }
                              disabled // ID is derived from label, not directly editable
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
                              options={categories}
                              onChange={(val) =>
                                updateLocalField(index, "category", val)
                              }
                            />
                            {/* Second row - 2 columns on left side */}
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
                            <div></div>{" "}
                            {/* Empty div for spacing on the right */}
                            {/* Third row - 3 columns */}
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

      {/* Create New Field Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Add New Diet Field Definition
            </h3>
            <div className="space-y-4">
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
                options={categories}
                onChange={(val) =>
                  setNewFieldData({ ...newFieldData, category: val })
                }
              />
              <div>
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
              <FieldTextarea
                label="High Recommendation"
                value={newFieldData.highRecommendation}
                onChange={(val) =>
                  setNewFieldData({ ...newFieldData, highRecommendation: val })
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
                  setNewFieldData({ ...newFieldData, lowRecommendation: val })
                }
                placeholder="Recommendation for low score"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleCreateModalClose}>
                Cancel
              </Button>
              <Button onClick={addNewField}>Add Field</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
