import ComprehensiveReportViewer from "@/components/comprehensive-report-viewer";
import type { ComprehensiveReportData } from "@/types/report-types";

async function getReportData(): Promise<ComprehensiveReportData | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/report-data`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch report data: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return data as ComprehensiveReportData;
  } catch (error) {
    console.error("Error fetching report data:", error);
    return null;
  }
}

export default async function ReportPreviewPage() {
  const reportData = await getReportData();

  if (!reportData) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load report data for preview.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <ComprehensiveReportViewer reportData={reportData} />
    </div>
  );
}
