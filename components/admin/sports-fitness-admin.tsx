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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Plus, Trash2, Settings } from "lucide-react";
import { useState } from "react";
import type { SportsAndFitness, ExerciseData } from "@/types/report-types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";

interface SportsFitnessAdminProps {
  sportsAndFitness: SportsAndFitness;
  updateSportsAndFitness: (
    section: keyof SportsAndFitness,
    field: string,
    data: Partial<ExerciseData>
  ) => void;
  onSave: () => void;
  onReset: () => void;
}

const levelImageMap: Record<string, string> = {
  high: "/sports/high.png",
  low: "/sports/low.png",
  average: "/sports/average.png",
  normal: "/sports/normal.png",
  enhanced: "/sports/enhanced.png",
};

export default function SportsFitnessAdmin({
  sportsAndFitness,
  updateSportsAndFitness,
  onSave,
  onReset,
}: SportsFitnessAdminProps) {
  const [activeSection, setActiveSection] =
    useState<keyof SportsAndFitness>("exerciseType");
  const [newFieldName, setNewFieldName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [showImageForm, setShowImageForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "category" | "field" | null;
    target: string;
    section?: keyof SportsAndFitness;
  }>({ type: null, target: "" });

  const imageOptions = Object.keys(customImages);

  const addNewCategory = () => {
    const key = newCategoryName.trim().replace(/\s+/g, "");
    if (!key || key in sportsAndFitness) {
      alert("Invalid or existing category name");
      return;
    }
    updateSportsAndFitness(key as keyof SportsAndFitness, "__init__", {
      level: "",
      description: "",
    });
    setNewCategoryName("");
    setActiveSection(key as keyof SportsAndFitness);
  };

  const addNewField = () => {
    const fieldKey = newFieldName.toLowerCase().replace(/\s+/g, "");
    const firstGroup = sportsAndFitness[activeSection][0];
    if (firstGroup.fields[fieldKey]) {
      alert("Field already exists.");
      return;
    }

    firstGroup.fields[fieldKey] = {
      label: newFieldName,
      level: "",
      description: "",
    };

    setNewFieldName("");
    updateSportsAndFitness(activeSection, fieldKey, {});
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const label = (formData.get("imageLabel") as string)?.trim().toLowerCase();
    const file = formData.get("imageFile") as File;

    if (!file || !label) {
      alert("Both label and image file are required.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("folder", "sports"); // tell backend to save in /sports

    try {
      const response = await fetch("/api/sports-images", {
        method: "POST",
        body: uploadData,
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Invalid JSON from server:", text);
        alert("Image upload failed: Server returned invalid response.");
        return;
      }

      if (result.success) {
        setCustomImages((prev) => ({
          ...prev,
          [label]: result.url,
        }));

        updateSportsAndFitness("customImages" as any, label, {
          label,
          url: result.url,
        });

        form.reset(); // ✅ Safe now
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("An error occurred while uploading.");
    }
  };

  const deleteField = (field: string) => {
    setDeleteConfirm({
      type: "field",
      target: field,
      section: activeSection,
    });
  };

  const deleteCategory = (section: keyof SportsAndFitness) => {
    setDeleteConfirm({
      type: "category",
      target: section,
    });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === "field" && deleteConfirm.section) {
      const updatedGroups = sportsAndFitness[deleteConfirm.section].map(
        (group) => {
          if (group.fields[deleteConfirm.target]) {
            const newFields = { ...group.fields };
            delete newFields[deleteConfirm.target];
            return { ...group, fields: newFields };
          }
          return group;
        }
      );

      updateSportsAndFitness(deleteConfirm.section, "__delete_field__", {
        fieldsOverride: updatedGroups,
      });
    } else if (deleteConfirm.type === "category") {
      updateSportsAndFitness(
        deleteConfirm.target as keyof SportsAndFitness,
        "__delete_category__",
        {}
      );

      const remaining = Object.keys(sportsAndFitness).filter(
        (key) => key !== deleteConfirm.target
      );
      setActiveSection(
        (remaining[0] as keyof SportsAndFitness) || "exerciseType"
      );
    }

    setDeleteConfirm({ type: null, target: "" });
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/sports-images");
        const data = await res.json(); // ✅ MISSING

        if (data.success) {
          const imageMap: Record<string, string> = {};
          data.images.forEach((img: { label: string; url: string }) => {
            imageMap[img.label.toLowerCase()] = img.url;
          });
          setCustomImages(imageMap);
        }
      } catch (err) {
        console.error("Failed to load images", err);
      }
    };

    fetchImages();
  }, []);

  const addCustomImage = (label: string, url: string) => {
    setCustomImages((prev) => ({ ...prev, [label]: url }));
  };

  const renderExerciseField = (
    section: keyof SportsAndFitness,
    field: string,
    data: ExerciseData,
    title: string
  ) => {
    const selectedImageKey = data.level?.toLowerCase();
    const imageUrl =
      customImages?.[selectedImageKey] || `/sports/${selectedImageKey}.png`;

    return (
      <Card
        key={field}
        className="border border-green-200 hover:border-green-300 transition-colors"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-green-800 truncate">
              {title}
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteField(field)}
              className="text-red-600 hover:bg-red-100 hover:text-red-700 flex-shrink-0 h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              Image Type
            </Label>
            <Select
              value={data.level}
              onValueChange={(value) =>
                updateSportsAndFitness(section, field, { level: value })
              }
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {imageOptions.map((option) => {
                  const cleanLabel = option.replace(/^\d+-/, ""); // remove timestamp prefix
                  return (
                    <SelectItem key={`image-${option}`} value={option}>
                      {cleanLabel.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {imageUrl && (
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt={data.level}
                  className="w-16 h-auto rounded border"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600">
              Description
            </Label>
            <Textarea
              value={data.description}
              onChange={(e) =>
                updateSportsAndFitness(section, field, {
                  description: e.target.value,
                })
              }
              rows={2}
              className="text-xs resize-none"
              placeholder="Enter description..."
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const getSectionTitle = (section: keyof SportsAndFitness) =>
    section.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  const getSectionIcon = (section: keyof SportsAndFitness) => {
    if (section.toLowerCase().includes("performance")) return "⚡";
    if (section.toLowerCase().includes("exercise")) return "🏃‍♂️";
    return "📊";
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="shadow-lg border-0 bg-white">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                🏃‍♂️ Sports & Fitness
              </CardTitle>
              <CardDescription className="text-green-100 text-sm">
                Configure exercise type suitability and performance factors
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={onSave}
                size="sm"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Category Navigation */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(
                  Object.keys(sportsAndFitness) as Array<keyof SportsAndFitness>
                ).map((section) => (
                  <div key={section} className="relative">
                    <Button
                      variant={
                        activeSection === section ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveSection(section)}
                      className="flex items-center gap-2 pr-8 text-xs sm:text-sm"
                    >
                      <span>{getSectionIcon(section)}</span>
                      <span className="capitalize hidden sm:inline">
                        {section.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="capitalize sm:hidden">
                        {section.slice(0, 8)}...
                      </span>
                    </Button>
                    <button
                      onClick={() => deleteCategory(section)}
                      className="absolute -right-1 -top-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      title="Delete Category"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="w-full sm:w-52 h-9 text-sm"
                />
                <Button size="sm" onClick={addNewCategory} className="h-9">
                  <Plus className="h-4 w-4 mr-1" /> Add Category
                </Button>
              </div>
            </div>

            {/* Field Management */}
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <Input
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="New field name"
                className="w-full sm:w-64 h-9 text-sm"
              />
              <Button
                size="sm"
                onClick={addNewField}
                className="h-9 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Field
              </Button>
            </div>

            {/* Custom Image Management */}
            <div className=" rounded-lg justify-start">
              <div className="flex items-center mb-3">
                <h4 className="text-sm font-medium mr-3 text-gray-700">
                  Custom Images
                </h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowImageForm(!showImageForm)}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {showImageForm ? "Hide" : "Add Image"}
                </Button>
              </div>

              {showImageForm && (
                <form
                  onSubmit={handleImageUpload}
                  encType="multipart/form-data"
                  className="flex flex-col sm:flex-row gap-2 items-center"
                >
                  <Input
                    type="text"
                    name="imageLabel"
                    placeholder="Image Name (e.g. dumbbell)"
                    className="w-full sm:w-40 h-9 text-sm"
                    required
                  />
                  <Input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    className="w-full sm:flex-1 h-9 text-sm"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-9 w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {Array.isArray(sportsAndFitness[activeSection]) &&
              sportsAndFitness[activeSection].map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-medium text-gray-700 border-l-4 border-green-400 pl-3">
                      {group.title}
                    </h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {Object.keys(group.fields).length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(group.fields).map(([fieldKey, fieldData]) =>
                      renderExerciseField(
                        activeSection,
                        fieldKey,
                        fieldData,
                        fieldData.label
                      )
                    )}
                  </div>
                </div>
              ))}

            {(!Array.isArray(sportsAndFitness[activeSection]) ||
              sportsAndFitness[activeSection].length === 0) && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-lg font-medium mb-2">No fields available</p>
                <p className="text-sm">Add some fields to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirm.type !== null}
        onOpenChange={() => setDeleteConfirm({ type: null, target: "" })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirm.type === "category"
                ? `Are you sure you want to delete the category "${deleteConfirm.target}"? This action cannot be undone and will remove all fields within this category.`
                : `Are you sure you want to delete the field "${deleteConfirm.target}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
