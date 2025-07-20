"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
import { Save, RotateCcw, Upload, X } from "lucide-react";
import { useRef, useEffect } from "react";
import type { PatientInfo } from "@/types/report-types";

interface PatientInfoAdminProps {
  patientInfo: PatientInfo;
  updatePatientInfo: (field: keyof PatientInfo, value: string) => void;
  onSave: () => void;
  onReset: () => void;
}

export default function PatientInfoAdmin({
  patientInfo,
  updatePatientInfo,
  onSave,
  onReset,
}: PatientInfoAdminProps) {
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    signatureField: "signature1" | "signature2"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        updatePatientInfo(signatureField, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSignature = (
    signatureField: "signature1" | "signature2",
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    updatePatientInfo(signatureField, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">👤 Patient Information</CardTitle>
        <CardDescription className="text-blue-100">
          Complete patient details as they appear on the report cover page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <Button onClick={onReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={onSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700 required"
              >
                Patient Name *
              </Label>
              <Input
                id="name"
                value={patientInfo.name}
                onChange={(e) => updatePatientInfo("name", e.target.value)}
                placeholder="Enter full patient name"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-sm font-semibold text-gray-700 required"
              >
                Gender *
              </Label>
              <Select
                value={patientInfo.gender}
                onValueChange={(value) => updatePatientInfo("gender", value)}
              >
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="birthDate"
                className="text-sm font-semibold text-gray-700 required"
              >
                Birth Date *
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={patientInfo.birthDate}
                onChange={(e) => updatePatientInfo("birthDate", e.target.value)}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Sample Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Sample Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="sampleCode"
                className="text-sm font-semibold text-gray-700 required"
              >
                Sample Code *
              </Label>
              <Input
                id="sampleCode"
                value={patientInfo.sampleCode}
                onChange={(e) =>
                  updatePatientInfo("sampleCode", e.target.value)
                }
                placeholder="e.g., DNL1000000110"
                className="border-2 focus:border-blue-500 font-mono"
                required
              />
              <p className="text-xs text-gray-500">
                Unique identifier for the DNA sample
              </p>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="sampleDate"
                className="text-sm font-semibold text-gray-700 required"
              >
                Sample Collection Date *
              </Label>
              <Input
                id="sampleDate"
                type="date"
                value={patientInfo.sampleDate}
                onChange={(e) =>
                  updatePatientInfo("sampleDate", e.target.value)
                }
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="reportDate"
                className="text-sm font-semibold text-gray-700 required"
              >
                Report Date *
              </Label>
              <Input
                id="reportDate"
                type="date"
                value={patientInfo.reportDate}
                onChange={(e) =>
                  updatePatientInfo("reportDate", e.target.value)
                }
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Authorization & Verification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Authorization & Verification
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="reportAuth"
                className="text-sm font-semibold text-gray-700"
              >
                Report Authentication & Analytics
              </Label>
              {/* <Input
                id="reportAuth"
                value={patientInfo.reportAuth}
                onChange={(e) =>
                  updatePatientInfo("reportAuth", e.target.value)
                }
                placeholder="Enter report authentication details"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">
                Person/organization responsible for report authentication
              </p> */}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="genomicAnalytics"
                className="text-sm text-center font-semibold text-gray-700"
              >
                Genomic Data Analytics
              </Label>
              {/* <Input
                id="genomicAnalytics"
                value={patientInfo.genomicAnalytics}
                onChange={(e) =>
                  updatePatientInfo("genomicAnalytics", e.target.value)
                }
                placeholder="Enter genomic data analytics info"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">
                Laboratory or system used for genomic analysis
              </p> */}
            </div>
          </div>

          {/* Signature Upload Section */}
          <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-800">
              Digital Signatures
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Signature 1 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Primary Signature
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  {patientInfo.signature1 ? (
                    <div className="relative">
                      <img
                        src={patientInfo.signature1}
                        alt="Primary Signature"
                        className="max-w-full max-h-32 object-contain mx-auto"
                      />
                      <Button
                        onClick={() =>
                          removeSignature("signature1", fileInput1Ref)
                        }
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Upload primary signature
                      </p>
                      <Button
                        onClick={() => fileInput1Ref.current?.click()}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInput1Ref}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "signature1")}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Upload signature image (PNG, JPG, JPEG - Max 5MB)
                </p>
              </div>

              {/* Signature 2 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Secondary Signature
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  {patientInfo.signature2 ? (
                    <div className="relative">
                      <img
                        src={patientInfo.signature2}
                        alt="Secondary Signature"
                        className="max-w-full max-h-32 object-contain mx-auto"
                      />
                      <Button
                        onClick={() =>
                          removeSignature("signature2", fileInput2Ref)
                        }
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Upload secondary signature
                      </p>
                      <Button
                        onClick={() => fileInput2Ref.current?.click()}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInput2Ref}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "signature2")}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Upload signature image (PNG, JPG, JPEG - Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Rest of the verification fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="checkedBy"
                className="text-sm font-semibold text-gray-700"
              >
                Checked & Verified By
              </Label>
              <Input
                id="checkedBy"
                value={patientInfo.checkedBy}
                onChange={(e) => updatePatientInfo("checkedBy", e.target.value)}
                placeholder="Enter verifier name"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">
                Medical professional who verified the report
              </p>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="scientificContent"
                className="text-sm font-semibold text-gray-700"
              >
                Scientific Content Verified By
              </Label>
              <Input
                id="scientificContent"
                value={patientInfo.scientificContent}
                onChange={(e) =>
                  updatePatientInfo("scientificContent", e.target.value)
                }
                placeholder="Enter scientific content verifier"
                className="border-2 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">
                Scientific expert who verified the content accuracy
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="disclaimer"
            className="text-lg font-semibold text-gray-800"
          >
            Disclaimer
          </Label>
          <Textarea
            id="disclaimer"
            value={patientInfo.disclaimer}
            onChange={(e) => updatePatientInfo("disclaimer", e.target.value)}
            placeholder="Enter disclaimer text"
            rows={10}
            className="border-2 focus:border-green-500 text-sm leading-relaxed"
          />
        </div>

        <style jsx>{`
          .required::after {
            content: " *";
            color: #ef4444;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
