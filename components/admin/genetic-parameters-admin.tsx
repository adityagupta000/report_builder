"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner";
import { X, Plus, Save, Upload, Edit3, FileImage } from "lucide-react";
import type {
  GeneticParameter,
  CategoryData,
  ReportData,
  ApiResponse,
} from "@/types/report-types";

// Custom hook for data fetching

const useReportData = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch("/api/report-data");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: ReportData = await response.json();

      if (!jsonData.categories || !Array.isArray(jsonData.categories)) {
        throw new Error("Invalid data structure: categories must be an array");
      }

      setData(jsonData);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Failed to fetch report data:", err);
      toast.error(`Failed to load data: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default function GeneticParametersAdmin(): JSX.Element {
  // State with proper TypeScript types
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [geneticParameters, setGeneticParameters] = useState<
    GeneticParameter[]
  >([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Use custom hook
  const { data, loading, error, refetch } = useReportData();

  // Initialize data when fetched
  useEffect(() => {
    if (data) {
      setCategories(data.categories || []);
      setGeneticParameters(data.geneticParameters || []);
    }
  }, [data]);

  // Initial data fetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Type-safe event handlers
  const handleCategoryChange = (
    categoryIndex: number,
    field: keyof CategoryData,
    value: string | boolean | number
  ): void => {
    const updated = [...categories];
    (updated[categoryIndex] as any)[field] = value;
    setCategories(updated);
  };

  const handleParameterChange = (
    categoryIndex: number,
    paramIndex: number,
    value: string
  ): void => {
    const updated = [...categories];
    updated[categoryIndex].parameters[paramIndex] = value;
    setCategories(updated);
  };

  const handleImageError = (categoryId: string): void => {
    const newErrors = new Set(imageErrors);
    newErrors.add(categoryId);
    setImageErrors(newErrors);
  };

  const handleFileChange = async (
    categoryIndex: number,
    file: File
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success && result.url) {
        handleCategoryChange(categoryIndex, "imageUrl", result.url);

        const categoryId = categories[categoryIndex].id;
        const newErrors = new Set(imageErrors);
        newErrors.delete(categoryId);
        setImageErrors(newErrors);
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed");
    }
  };

  const addCategory = (): void => {
    const newCategory: CategoryData = {
      id: `category_${Date.now()}`,
      category: "NEW CATEGORY",
      imageUrl: "",
      description: "",
      parameters: Array(21).fill(""),
      isActive: true,
      order: categories.length + 1,
    };

    setCategories([...categories, newCategory]);
  };

  const removeCategory = async (categoryId: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to remove this category?"))
      return;

    const updated = categories.filter((cat) => cat.id !== categoryId);
    setCategories(updated);

    if (selectedCategory === categoryId) {
      setSelectedCategory("all");
    }

    try {
      const dataToSave = {
        ...data,
        categories: updated,
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: "1.0.0",
          totalCategories: updated.length,
          totalParameters: updated.reduce(
            (sum, cat) => sum + cat.parameters.filter((p) => p.trim()).length,
            0
          ),
        },
      };

      const response = await fetch("/api/report-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        toast.success("Category deleted and changes saved");
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to save changes");
      }
    } catch (error) {
      console.error("Failed to save after delete:", error);
      toast.error("An error occurred while saving changes");
    }
  };

  const addParameter = (categoryIndex: number): void => {
    const updated = [...categories];
    updated[categoryIndex].parameters.push("");
    setCategories(updated);
  };

  const removeParameter = (categoryIndex: number, paramIndex: number): void => {
    const updated = [...categories];
    updated[categoryIndex].parameters.splice(paramIndex, 1);
    setCategories(updated);
  };

  const saveData = async (): Promise<void> => {
    setIsSaving(true);

    try {
      if (!data) throw new Error("No base report data available");

      const dataToSave = {
        ...data,
        categories,
        geneticParameters,
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: "1.0.0",
          totalCategories: categories.length,
          totalParameters: categories.reduce(
            (sum, cat) => sum + cat.parameters.filter((p) => p.trim()).length,
            0
          ),
        },
      };

      const response = await fetch("/api/report-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.success !== false) {
        toast.success("Data saved successfully!");
        setIsEditing(false);
      } else {
        throw new Error(result.error || "Failed to save data");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Error saving data:", err);
      toast.error(`Save failed: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = (): void => {
    const dataToExport = { categories, geneticParameters };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading genetic parameters...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <X size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={refetch}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto ">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
                Genetic Parameters Table of Contents
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                ({categories.length} categories,{" "}
                {categories.reduce(
                  (sum, cat) =>
                    sum + cat.parameters.filter((p) => p.trim()).length,
                  0
                )}{" "}
                parameters)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={exportData} variant="outline" className="gap-2">
                <FileImage size={16} />
                Export JSON
              </Button>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="gap-2"
              >
                <Edit3 size={16} />
                {isEditing ? "View Mode" : "Edit Mode"}
              </Button>

              {isEditing && (
                <>
                  <Button
                    onClick={addCategory}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus size={16} />
                    Add Category
                  </Button>
                  <Button
                    onClick={saveData}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <Save size={16} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Category Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full border border-gray-300 rounded-lg">
              {filteredCategories.map((category, categoryIndex) => {
                const actualIndex = categories.findIndex(
                  (cat) => cat.id === category.id
                );
                return (
                  <div
                    key={category.id}
                    className="border-b border-black last:border-b-0"
                  >
                    {/* Category Row */}
                    <div className="border-b border-gray-300 last:border-b-0">
                      <div className="grid grid-cols-4 min-h-[140px]">
                        {/* Category Name & Image Column */}
                        <div className="border-r border-gray-300 p-4 flex flex-col items-center justify-center bg-gray-50">
                          {isEditing ? (
                            <div className="space-y-3 w-full">
                              <Input
                                value={category.category}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    actualIndex,
                                    "category",
                                    e.target.value
                                  )
                                }
                                className="text-center font-bold text-sm bg-white"
                                placeholder="Category Name"
                              />

                              <Textarea
                                value={category.description || ""}
                                onChange={(e) =>
                                  handleCategoryChange(
                                    actualIndex,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="text-xs bg-white resize-none h-16"
                                placeholder="Category description..."
                              />

                              <div className="flex flex-col items-center space-y-2">
                                {category.imageUrl &&
                                !imageErrors.has(category.id) ? (
                                  <Image
                                    src={category.imageUrl}
                                    alt={category.category}
                                    width={60}
                                    height={60}
                                    className="rounded-full border object-cover"
                                    onError={() =>
                                      handleImageError(category.id)
                                    }
                                  />
                                ) : (
                                  <div className="w-[60px] h-[60px] bg-white rounded-full border-2 border-dashed border-red-300 flex items-center justify-center">
                                    <Upload
                                      size={20}
                                      className="text-gray-400"
                                    />
                                  </div>
                                )}

                                <label className="cursor-pointer">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleFileChange(actualIndex, file);
                                      }
                                    }}
                                  />
                                  <div className="text-xs text-blue-600 hover:text-blue-800 underline">
                                    Upload
                                  </div>
                                </label>
                              </div>

                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeCategory(category.id)}
                                className="gap-1 w-full"
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <h2 className="text-base font-bold text-gray-700 mb-2">
                                {category.category}
                              </h2>

                              {category.description && (
                                <p className="text-xs text-gray-600 mb-3 leading-tight">
                                  {category.description}
                                </p>
                              )}

                              {category.imageUrl &&
                              !imageErrors.has(category.id) ? (
                                <Image
                                  src={category.imageUrl}
                                  alt={category.category}
                                  width={70}
                                  height={70}
                                  className="rounded-full border object-cover mx-auto"
                                  onError={() => handleImageError(category.id)}
                                />
                              ) : (
                                <div className="w-[70px] h-[70px] bg-gray-100 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto">
                                  <Upload size={24} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Parameters Columns */}
                        <div className="col-span-3 ">
                          <table className="w-full table-fixed border border-gray-300">
                            <tbody>
                              {Array.from({
                                length: Math.ceil(
                                  category.parameters.length / 3
                                ),
                              }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                  {[0, 1, 2].map((colIndex) => {
                                    const paramIndex =
                                      colIndex *
                                        Math.ceil(
                                          category.parameters.length / 3
                                        ) +
                                      rowIndex;
                                    const parameter =
                                      category.parameters[paramIndex] || "";

                                    return (
                                      <td
                                        key={colIndex}
                                        className="border border-gray-300 p-1"
                                      >
                                        {isEditing ? (
                                          <div className="flex items-center space-x-1 w-full">
                                            <Input
                                              value={parameter}
                                              onChange={(e) =>
                                                handleParameterChange(
                                                  actualIndex,
                                                  paramIndex,
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Parameter name"
                                              className="text-sm h-7 w-full"
                                            />
                                            {paramIndex <
                                              category.parameters.length && (
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  removeParameter(
                                                    actualIndex,
                                                    paramIndex
                                                  )
                                                }
                                                className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                              >
                                                <X size={12} />
                                              </Button>
                                            )}
                                          </div>
                                        ) : (
                                          parameter && (
                                            <span className="text-sm text-gray-700">
                                              {parameter}
                                            </span>
                                          )
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addParameter(actualIndex)}
                              className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700"
                            >
                              <Plus size={12} className="mr-1" />
                              Add Parameter
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileImage size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first category
              </p>
              <Button onClick={addCategory} className="gap-2">
                <Plus size={16} />
                Add First Category
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
