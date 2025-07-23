import { CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings,
  FileText,
  Eye,
  Download,
  Database,
  Dna,
  Activity,
  Heart,
  Brain,
  Utensils,
  Zap,
  AlertCircle,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Quick Actions */}
      <div className="w-full grid md:grid-cols-4 gap-6 mb-12 mt-12">
        <Link href="/admin">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Settings className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg">Admin Panel</h3>
              <p className="text-blue-100 text-sm">Manage all data</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/report/preview">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Eye className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg">Preview Report</h3>
              <p className="text-green-100 text-sm">View live report</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/report/pdf">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Download className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg">Generate PDF</h3>
              <p className="text-purple-100 text-sm">Export to PDF</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <Database className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg">Data Management</h3>
            <p className="text-orange-100 text-sm">CRUD operations</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Sections */}
      <Card className="w-full shadow-lg border-0 bg-white mb-12">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">
            📊 Report Sections Included
          </CardTitle>
          <CardDescription className="text-indigo-100">
            All sections from the original PDF with complete data management
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <Utensils className="h-8 w-8 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800">Diet Analysis</h4>
                <p className="text-sm text-red-600">
                  Macronutrients, sensitivities, meal patterns
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Nutrition</h4>
                <p className="text-sm text-blue-600">
                  Vitamins, minerals, supplements
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Zap className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-800">
                  Sports & Fitness
                </h4>
                <p className="text-sm text-green-600">
                  Exercise types, performance factors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <Heart className="h-8 w-8 text-yellow-600" />
              <div>
                <h4 className="font-semibold text-yellow-800">
                  Lifestyle Conditions
                </h4>
                <p className="text-sm text-yellow-600">
                  Health risks and strengths
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Dna className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-semibold text-purple-800">
                  Metabolic Core
                </h4>
                <p className="text-sm text-purple-600">
                  Gene analysis and impacts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h4 className="font-semibold text-indigo-800">
                  Digestive Health
                </h4>
                <p className="text-sm text-indigo-600">
                  Gut health, intolerances
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <Dna className="h-8 w-8 text-pink-600" />
              <div>
                <h4 className="font-semibold text-pink-800">
                  Genes & Addiction
                </h4>
                <p className="text-sm text-pink-600">Tendencies, advice</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
              <Brain className="h-8 w-8 text-teal-600" />
              <div>
                <h4 className="font-semibold text-teal-800">Sleep & Rest</h4>
                <p className="text-sm text-teal-600">Sleep patterns, quality</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
              <AlertCircle className="h-8 w-8 text-cyan-600" />
              <div>
                <h4 className="font-semibold text-cyan-800">
                  Allergies & Sensitivity
                </h4>
                <p className="text-sm text-cyan-600">
                  Environmental sensitivities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-lime-50 rounded-lg">
              <Heart className="h-8 w-8 text-lime-600" />
              <div>
                <h4 className="font-semibold text-lime-800">
                  Preventive Health
                </h4>
                <p className="text-sm text-lime-600">
                  Diagnostic tests, supplements
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <Users className="h-8 w-8 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-800">
                  Family Genetic Impact
                </h4>
                <p className="text-sm text-amber-600">
                  Inherited traits, family recommendations
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
