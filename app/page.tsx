import { CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-t-lg py-6">
          <CardTitle className="text-4xl font-extrabold tracking-tight">🧬 Nutrigenomics Report System</CardTitle>
          <CardDescription className="text-blue-100 mt-2 text-lg">
            Manage and view comprehensive genetic health reports
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-center text-gray-700 text-lg leading-relaxed">
            Welcome to the administration and viewing portal for your personalized nutrigenomics test reports. Here you
            can manage patient data, customize report content, and generate detailed PDF reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin" passHref>
              <Button className="w-full sm:w-auto px-8 py-3 text-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md">
                Go to Admin Panel
              </Button>
            </Link>
            <Link href="/report/preview" passHref>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 text-lg border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-md bg-transparent"
              >
                View Sample Report
              </Button>
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500 mt-6">Powered by Vercel & Next.js</div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6 mb-12 mt-12">
        <Link href="/admin/comprehensive-admin">
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

      {/* Features Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Perfect PDF Matching
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Exact layout matching the original PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>All 47 pages with correct positioning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Professional typography and colors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Print-ready PDF generation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Fully Dynamic Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Complete CRUD operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Patient information management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Gene test results editor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Content and styling controls</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-6 w-6" />
              Complete Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>All report sections editable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Branding and color customization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Import/export functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Real-time preview updates</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Report Sections */}
      <Card className="shadow-lg border-0 bg-white mb-12">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">📊 Report Sections Included</CardTitle>
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
                <p className="text-sm text-red-600">Macronutrients, sensitivities, meal patterns</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Nutrition</h4>
                <p className="text-sm text-blue-600">Vitamins, minerals, supplements</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Zap className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-800">Sports & Fitness</h4>
                <p className="text-sm text-green-600">Exercise types, performance factors</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <Heart className="h-8 w-8 text-yellow-600" />
              <div>
                <h4 className="font-semibold text-yellow-800">Lifestyle Conditions</h4>
                <p className="text-sm text-yellow-600">Health risks and strengths</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Dna className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-semibold text-purple-800">Metabolic Core</h4>
                <p className="text-sm text-purple-600">Gene analysis and impacts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h4 className="font-semibold text-indigo-800">Digestive Health</h4>
                <p className="text-sm text-indigo-600">Gut health, intolerances</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <Dna className="h-8 w-8 text-pink-600" />
              <div>
                <h4 className="font-semibold text-pink-800">Genes & Addiction</h4>
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
                <h4 className="font-semibold text-cyan-800">Allergies & Sensitivity</h4>
                <p className="text-sm text-cyan-600">Environmental sensitivities</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-lime-50 rounded-lg">
              <Heart className="h-8 w-8 text-lime-600" />
              <div>
                <h4 className="font-semibold text-lime-800">Preventive Health</h4>
                <p className="text-sm text-lime-600">Diagnostic tests, supplements</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <Users className="h-8 w-8 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-800">Family Genetic Impact</h4>
                <p className="text-sm text-amber-600">Inherited traits, family recommendations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">🚀 Advanced Features</CardTitle>
          <CardDescription className="text-orange-100">
            Professional-grade functionality for genomics reporting
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">🎯 Professional Output</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High-quality PDF generation with exact layout</li>
                <li>• Professional typography and color schemes</li>
                <li>• Print-ready output with proper page breaks</li>
                <li>• Responsive design for all screen sizes</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">⚙️ Data Management</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complete CRUD operations for all data</li>
                <li>• Import/export functionality for backups</li>
                <li>• Real-time preview with instant updates</li>
                <li>• Structured data types for all sections</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
