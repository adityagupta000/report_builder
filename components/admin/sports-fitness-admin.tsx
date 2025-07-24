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
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { SportsAndFitness, ExerciseData } from "@/types/report-types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

const defaultImageOptions = ["high", "low", "average", "normal", "enhanced"];

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

  const imageOptions = [...defaultImageOptions, ...Object.keys(customImages)];

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

  const deleteField = (field: string) => {
    const updatedSection = sportsAndFitness[activeSection].map((group) => {
      if (group.fields[field]) {
        const newFields = { ...group.fields };
        delete newFields[field];
        return { ...group, fields: newFields };
      }
      return group;
    });
    updateSportsAndFitness(activeSection, field, {});
  };

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
      levelImageMap[selectedImageKey] || customImages[selectedImageKey];

    return (
      <Card key={field} className="border-2 border-green-100 bg-green-50/30">
        <CardHeader className="pb-3 flex justify-between items-center">
          <CardTitle className="text-lg text-green-800">{title}</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteField(field)}
            className="text-red-600 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Image Label (select or type)
            </Label>
            <Select
              value={data.level}
              onValueChange={(value) =>
                updateSportsAndFitness(section, field, { level: value })
              }
            >
              <SelectTrigger className="border-2 focus:border-green-500">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {imageOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={data.level}
                className="w-24 h-auto mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              value={data.description}
              onChange={(e) =>
                updateSportsAndFitness(section, field, {
                  description: e.target.value,
                })
              }
              rows={3}
              className="border-2 focus:border-green-500 text-sm"
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
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🏃‍♂️ Sports & Fitness</CardTitle>
        <CardDescription className="text-green-100">
          Configure exercise type suitability and performance factors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="flex gap-2 top-1 right-1">
          <Button onClick={onReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {(
              Object.keys(sportsAndFitness) as Array<keyof SportsAndFitness>
            ).map((section) => (
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
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              className="w-52"
            />
            <Button size="sm" onClick={addNewCategory}>
              <Plus className="h-4 w-4 mr-1" /> Add Category
            </Button>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Input
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="New field name"
            className="w-64"
          />
          <Button size="sm" onClick={addNewField}>
            <Plus className="h-4 w-4 mr-1" /> Add Field
          </Button>
        </div>

        <div className="flex gap-2 items-center mt-4">
          <Input
            placeholder="Image label (e.g. superhigh)"
            className="w-40"
            onBlur={(e) => {
              const label = e.target.value.trim().toLowerCase();
              if (label) addCustomImage(label, "");
            }}
          />
          <Input
            placeholder="Image URL"
            className="w-72"
            onBlur={(e) => {
              const url = e.target.value.trim();
              const label = Object.keys(customImages).find(
                (k) => !customImages[k]
              );
              if (label && url) addCustomImage(label, url);
            }}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">
            {getSectionTitle(activeSection)}
          </h3>

          {sportsAndFitness[activeSection].map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <h3 className="text-xl font-semibold border-b-2 pb-2 text-gray-700">
                {group.title}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </CardContent>
    </Card>
  );
}
