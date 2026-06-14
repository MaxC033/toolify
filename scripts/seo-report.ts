#!/usr/bin/env tsx
/**
 * Weekly SEO Report Generator
 * Generates a Markdown report using Google Search Console data + Gemini analysis.
 * Run via: npx tsx scripts/seo-report.ts
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SITE_URL = process.env.SITE_URL || "https://toolify.vercel.app";

interface SearchConsoleSummary {
  totalClicks: number;
  totalImpressions: number;
  avgCTR: number;
  avgPosition: number;
  topPages: Array<{ page: string; clicks: number; impressions: number }>;
  topQueries: Array<{ query: string; clicks: number; impressions: number }>;
}

// Simulated Search Console data (replace with real API call once verified)
function getMockSearchConsoleData(): SearchConsoleSummary {
  return {
    totalClicks: Math.floor(Math.random() * 200),
    totalImpressions: Math.floor(Math.random() * 5000) + 100,
    avgCTR: parseFloat((Math.random() * 5).toFixed(2)),
    avgPosition: parseFloat((Math.random() * 50 + 5).toFixed(1)),
    topPages: [
      { page: "/tools/password-generator", clicks: 45, impressions: 1200 },
      { page: "/tools/word-counter", clicks: 32, impressions: 890 },
      { page: "/tools/color-palette-generator", clicks: 28, impressions: 750 },
    ],
    topQueries: [
      { query: "password generator online", clicks: 40, impressions: 1100 },
      { query: "word count checker", clicks: 30, impressions: 800 },
      { query: "color palette generator", clicks: 25, impressions: 700 },
    ],
  };
}

async function generateReport(data: SearchConsoleSummary): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn("⚠ GEMINI_API_KEY not set. Generating report without AI analysis.");
    return generateBasicReport(data);
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an SEO analyst. Analyze this week's Google Search Console data for ${SITE_URL} and provide:
1. A brief executive summary (2-3 sentences)
2. What's working well (top performers)
3. Opportunities to improve (specific actionable recommendations)
4. Next week priorities

Data:
- Total clicks: ${data.totalClicks}
- Total impressions: ${data.totalImpressions}
- Average CTR: ${data.avgCTR}%
- Average position: ${data.avgPosition}

Top pages: ${JSON.stringify(data.topPages, null, 2)}
Top queries: ${JSON.stringify(data.topQueries, null, 2)}

Be concise and actionable. Format as Markdown.`;

  const result = await model.generateContent(prompt);
  const aiAnalysis = result.response.text();

  return `# Weekly SEO Report — ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}

## 📊 Key Metrics

| Metric | Value |
|--------|-------|
| Total Clicks | ${data.totalClicks} |
| Total Impressions | ${data.totalImpressions.toLocaleString()} |
| Average CTR | ${data.avgCTR}% |
| Average Position | #${data.avgPosition} |

## 🔝 Top Pages

| Page | Clicks | Impressions |
|------|--------|-------------|
${data.topPages.map((p) => `| ${p.page} | ${p.clicks} | ${p.impressions} |`).join("\n")}

## 🔍 Top Queries

| Query | Clicks | Impressions |
|-------|--------|-------------|
${data.topQueries.map((q) => `| ${q.query} | ${q.clicks} | ${q.impressions} |`).join("\n")}

## 🤖 AI Analysis

${aiAnalysis}

---
*Generated automatically by Toolify SEO Report · ${new Date().toISOString()}*
`;
}

function generateBasicReport(data: SearchConsoleSummary): string {
  return `# Weekly SEO Report — ${new Date().toLocaleDateString()}

| Metric | Value |
|--------|-------|
| Total Clicks | ${data.totalClicks} |
| Total Impressions | ${data.totalImpressions} |
| Avg CTR | ${data.avgCTR}% |
| Avg Position | #${data.avgPosition} |

Generated without AI analysis (no GEMINI_API_KEY).
`;
}

async function main() {
  console.log("📊 Generating weekly SEO report...");

  const data = getMockSearchConsoleData();
  const report = await generateReport(data);

  // Save report
  const reportsDir = path.join(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const filename = `seo-report-${new Date().toISOString().split("T")[0]}.md`;
  const filepath = path.join(reportsDir, filename);
  fs.writeFileSync(filepath, report, "utf-8");

  console.log(`✅ Report saved to: ${filepath}`);
  console.log("\n--- REPORT PREVIEW ---\n");
  console.log(report.substring(0, 500) + "...");
}

main().catch(console.error);
