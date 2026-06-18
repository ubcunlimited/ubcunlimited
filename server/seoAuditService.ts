/**
 * SEO Audit Service
 *
 * Orchestrates:
 * 1. Pulling site audit data from SEMrush
 * 2. Storing results in the DB (seo_audit_runs + seo_audit_issues)
 * 3. AI-analyzing each issue with the LLM
 *
 * Called by:
 * - The scheduled heartbeat handler (/api/scheduled/seo-audit)
 * - The admin tRPC procedure (manual trigger)
 */

import {
  createSeoAuditRun,
  completeSeoAuditRun,
  failSeoAuditRun,
  insertSeoAuditIssues,
  updateSeoAuditIssueAnalysis,
  getSeoAuditIssues,
} from "./db";
import { fetchSemrushSiteAudit, type SemrushIssue } from "./semrush";
import { invokeLLM } from "./_core/llm";

/**
 * Run a full SEO audit cycle:
 * 1. Create a run record
 * 2. Pull SEMrush data
 * 3. Store all issues
 * 4. AI-analyze each issue
 * Returns the run ID.
 */
export async function runSeoAuditCycle(): Promise<{
  runId: number;
  totalIssues: number;
  errors: number;
  warnings: number;
  notices: number;
  healthScore: number;
}> {
  const runId = await createSeoAuditRun();

  try {
    console.log("[SEO Audit] Starting audit cycle, runId:", runId);
    const auditData = await fetchSemrushSiteAudit();

    const allIssues: SemrushIssue[] = [
      ...auditData.errors,
      ...auditData.warnings,
      ...auditData.notices,
    ];

    const totalIssues = allIssues.length;

    // Store all issues in DB
    if (totalIssues > 0) {
      await insertSeoAuditIssues(
        allIssues.map(issue => ({
          runId,
          severity: issue.severity,
          issueType: issue.id,
          description: issue.title + (issue.description ? `\n\n${issue.description}` : ""),
          affectedPages: issue.affectedPages,
          rawIssueData: JSON.stringify(issue.rawData ?? {}),
        }))
      );
    }

    // Complete the run record
    await completeSeoAuditRun(runId, {
      errors: auditData.totalErrors,
      warnings: auditData.totalWarnings,
      notices: auditData.totalNotices,
      totalIssues,
      rawData: JSON.stringify({
        projectId: auditData.projectId,
        crawlId: auditData.crawlId,
        healthScore: auditData.healthScore,
        crawledPages: auditData.crawledPages,
        lastCrawlDate: auditData.lastCrawlDate,
      }),
    });

    console.log(`[SEO Audit] Stored ${totalIssues} issues. Starting AI analysis...`);

    // AI-analyze all issues (run in parallel batches of 3 to avoid rate limits)
    const storedIssues = await getSeoAuditIssues({ runId });
    await analyzeIssuesBatch(storedIssues);

    console.log("[SEO Audit] Cycle complete.");
    return {
      runId,
      totalIssues,
      errors: auditData.totalErrors,
      warnings: auditData.totalWarnings,
      notices: auditData.totalNotices,
      healthScore: auditData.healthScore,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[SEO Audit] Cycle failed:", message);
    await failSeoAuditRun(runId, message);
    throw err;
  }
}

/**
 * AI-analyze a batch of issues (up to 3 at a time to avoid rate limits).
 */
async function analyzeIssuesBatch(
  issues: Array<{ id: number; severity: string; issueType: string; description: string; affectedPages: number }>
): Promise<void> {
  const BATCH_SIZE = 3;
  for (let i = 0; i < issues.length; i += BATCH_SIZE) {
    const batch = issues.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(issue => analyzeIssue(issue)));
    // Small delay between batches
    if (i + BATCH_SIZE < issues.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

/**
 * AI-analyze a single SEO issue and generate a specific fix for ubcunlimited.com.
 */
export async function analyzeIssue(issue: {
  id: number;
  severity: string;
  issueType: string;
  description: string;
  affectedPages: number;
}): Promise<void> {
  try {
    const prompt = `You are an expert SEO engineer analyzing issues for ubcunlimited.com, a Utah-based merchant services company built with React + Vite + TypeScript + Tailwind CSS.

SEO Issue to analyze:
- Severity: ${issue.severity.toUpperCase()}
- Issue Type: ${issue.issueType}
- Description: ${issue.description}
- Affected Pages: ${issue.affectedPages}

Provide a structured analysis in JSON format with these fields:
{
  "summary": "One sentence explaining the problem",
  "impact": "Why this hurts SEO rankings or user experience",
  "rootCause": "Most likely technical cause for a React SPA",
  "quickFix": "The fastest fix (1-2 sentences)",
  "detailedFix": "Step-by-step fix with specific file names and code examples where possible",
  "priority": "high|medium|low",
  "estimatedEffort": "minutes|hours|days"
}`;

    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert SEO engineer. Always respond with valid JSON only, no markdown code blocks." },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "seo_issue_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              impact: { type: "string" },
              rootCause: { type: "string" },
              quickFix: { type: "string" },
              detailedFix: { type: "string" },
              priority: { type: "string", enum: ["high", "medium", "low"] },
              estimatedEffort: { type: "string", enum: ["minutes", "hours", "days"] },
            },
            required: ["summary", "impact", "rootCause", "quickFix", "detailedFix", "priority", "estimatedEffort"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) return;

    const analysis = typeof content === "string" ? JSON.parse(content) : content;

    // Generate a specific code fix suggestion
    const fixResponse = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert React/TypeScript SEO engineer. Provide specific, actionable code fixes." },
        {
          role: "user",
          content: `Based on this SEO issue analysis for ubcunlimited.com (React + Vite + TypeScript SPA):

Issue: ${issue.issueType}
Quick Fix: ${analysis.quickFix}
Detailed Fix: ${analysis.detailedFix}

Write the specific code change needed. Format as:
FILE: <filename>
CHANGE: <description of what to change>
CODE:
\`\`\`tsx
<actual code snippet>
\`\`\`

If the fix requires multiple files, repeat the FILE/CHANGE/CODE block for each. Keep it concise and actionable.`,
        },
      ],
    });

    const fixContent = fixResponse?.choices?.[0]?.message?.content;
    const suggestedFix = typeof fixContent === "string" ? fixContent : JSON.stringify(fixContent);

    await updateSeoAuditIssueAnalysis(issue.id, {
      aiAnalysis: JSON.stringify(analysis),
      suggestedFix,
      fixStatus: "fix_ready",
    });
  } catch (err) {
    console.error(`[SEO Audit] Failed to analyze issue ${issue.id}:`, err);
    await updateSeoAuditIssueAnalysis(issue.id, {
      aiAnalysis: JSON.stringify({ error: "Analysis failed", details: String(err) }),
      fixStatus: "analyzed",
    });
  }
}
