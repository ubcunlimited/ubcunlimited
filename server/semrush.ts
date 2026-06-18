/**
 * SEMrush Site Audit API integration.
 *
 * Uses the SEMrush Projects / Site Audit API to pull issues for ubcunlimited.com.
 * Docs: https://developer.semrush.com/api/projects/site-audit/
 *
 * The Site Audit API requires:
 *  - An API key (SEMRUSH_API_KEY)
 *  - A project ID (the numeric ID of the site audit campaign in SEMrush)
 *
 * We derive the project ID from the SEMrush API by listing projects for the domain.
 */

import { ENV } from "./_core/env";

const SEMRUSH_API_BASE = "https://api.semrush.com";
const TARGET_DOMAIN = "ubcunlimited.com";

export interface SemrushIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: "error" | "warning" | "notice";
  affectedPages: number;
  rawData?: Record<string, unknown>;
}

export interface SemrushAuditResult {
  projectId: string | null;
  crawlId: string | null;
  errors: SemrushIssue[];
  warnings: SemrushIssue[];
  notices: SemrushIssue[];
  totalErrors: number;
  totalWarnings: number;
  totalNotices: number;
  crawledPages: number;
  healthScore: number;
  lastCrawlDate: string | null;
}

/**
 * Fetch the SEMrush project ID for ubcunlimited.com.
 * Returns null if not found or API key is missing.
 */
async function getSemrushProjectId(): Promise<string | null> {
  if (!ENV.semrushApiKey) return null;
  try {
    const url = `${SEMRUSH_API_BASE}/management/v1/projects?key=${ENV.semrushApiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[SEMrush] Failed to list projects:", res.status, await res.text());
      return null;
    }
    const data = await res.json() as { projects?: Array<{ project_id: string; url: string }> };
    const project = data.projects?.find(p =>
      p.url?.includes(TARGET_DOMAIN) || p.url?.includes("ubcunlimited")
    );
    return project?.project_id ?? null;
  } catch (err) {
    console.error("[SEMrush] Error fetching projects:", err);
    return null;
  }
}

/**
 * Get the latest completed crawl ID for a project.
 */
async function getLatestCrawlId(projectId: string): Promise<string | null> {
  if (!ENV.semrushApiKey) return null;
  try {
    const url = `${SEMRUSH_API_BASE}/reports/v1/projects/${projectId}/siteaudit/info?key=${ENV.semrushApiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[SEMrush] Failed to get audit info:", res.status, await res.text());
      return null;
    }
    const data = await res.json() as {
      data?: { last_audit?: { id: string; finish_date: string } };
    };
    return data.data?.last_audit?.id ?? null;
  } catch (err) {
    console.error("[SEMrush] Error fetching crawl info:", err);
    return null;
  }
}

/**
 * Fetch all issues from a completed crawl.
 */
async function getCrawlIssues(projectId: string, crawlId: string): Promise<SemrushIssue[]> {
  if (!ENV.semrushApiKey) return [];
  try {
    const url = `${SEMRUSH_API_BASE}/reports/v1/projects/${projectId}/siteaudit/issues?crawl_id=${crawlId}&key=${ENV.semrushApiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[SEMrush] Failed to get issues:", res.status, await res.text());
      return [];
    }
    const data = await res.json() as {
      data?: Array<{
        id?: string;
        title?: string;
        description?: string;
        category?: string;
        type?: string; // "error" | "warning" | "notice"
        count?: number;
        pages_count?: number;
      }>;
    };
    if (!data.data) return [];
    return data.data.map(issue => ({
      id: issue.id ?? issue.title ?? "unknown",
      title: issue.title ?? "Unknown Issue",
      description: issue.description ?? "",
      category: issue.category ?? "General",
      severity: normalizeSeverity(issue.type ?? "notice"),
      affectedPages: issue.pages_count ?? issue.count ?? 0,
      rawData: issue as Record<string, unknown>,
    }));
  } catch (err) {
    console.error("[SEMrush] Error fetching issues:", err);
    return [];
  }
}

/**
 * Fetch audit overview stats (health score, crawled pages, etc.).
 */
async function getAuditOverview(projectId: string, crawlId: string): Promise<{
  healthScore: number;
  crawledPages: number;
  lastCrawlDate: string | null;
}> {
  if (!ENV.semrushApiKey) return { healthScore: 0, crawledPages: 0, lastCrawlDate: null };
  try {
    const url = `${SEMRUSH_API_BASE}/reports/v1/projects/${projectId}/siteaudit/info?crawl_id=${crawlId}&key=${ENV.semrushApiKey}`;
    const res = await fetch(url);
    if (!res.ok) return { healthScore: 0, crawledPages: 0, lastCrawlDate: null };
    const data = await res.json() as {
      data?: {
        crawl_status?: { pages_crawled?: number };
        health_score?: number;
        finish_date?: string;
      };
    };
    return {
      healthScore: data.data?.health_score ?? 0,
      crawledPages: data.data?.crawl_status?.pages_crawled ?? 0,
      lastCrawlDate: data.data?.finish_date ?? null,
    };
  } catch {
    return { healthScore: 0, crawledPages: 0, lastCrawlDate: null };
  }
}

function normalizeSeverity(type: string): "error" | "warning" | "notice" {
  const t = type.toLowerCase();
  if (t === "error" || t === "errors") return "error";
  if (t === "warning" || t === "warnings") return "warning";
  return "notice";
}

/**
 * Main entry point: pull the full site audit from SEMrush.
 * Returns structured issues ready to be stored in the DB.
 */
export async function fetchSemrushSiteAudit(): Promise<SemrushAuditResult> {
  const empty: SemrushAuditResult = {
    projectId: null, crawlId: null,
    errors: [], warnings: [], notices: [],
    totalErrors: 0, totalWarnings: 0, totalNotices: 0,
    crawledPages: 0, healthScore: 0, lastCrawlDate: null,
  };

  if (!ENV.semrushApiKey) {
    console.warn("[SEMrush] No API key configured");
    return empty;
  }

  const projectId = await getSemrushProjectId();
  if (!projectId) {
    console.warn("[SEMrush] No project found for", TARGET_DOMAIN);
    return { ...empty };
  }

  const crawlId = await getLatestCrawlId(projectId);
  if (!crawlId) {
    console.warn("[SEMrush] No completed crawl found for project", projectId);
    return { ...empty, projectId };
  }

  const [issues, overview] = await Promise.all([
    getCrawlIssues(projectId, crawlId),
    getAuditOverview(projectId, crawlId),
  ]);

  const errors = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");
  const notices = issues.filter(i => i.severity === "notice");

  return {
    projectId,
    crawlId,
    errors,
    warnings,
    notices,
    totalErrors: errors.length,
    totalWarnings: warnings.length,
    totalNotices: notices.length,
    crawledPages: overview.crawledPages,
    healthScore: overview.healthScore,
    lastCrawlDate: overview.lastCrawlDate,
  };
}

/**
 * Domain overview: organic keywords, traffic, authority score.
 */
export async function fetchSemrushDomainOverview(): Promise<{
  organicKeywords: number;
  organicTraffic: number;
  authorityScore: number;
  backlinks: number;
  topKeywords: Array<{ keyword: string; position: number; volume: number }>;
} | null> {
  if (!ENV.semrushApiKey) return null;
  try {
    const params = new URLSearchParams({
      type: "domain_ranks",
      key: ENV.semrushApiKey,
      domain: TARGET_DOMAIN,
      database: "us",
      export_columns: "Dn,Rk,Or,Ot,Oc,Ad,At,Ac",
    });
    const res = await fetch(`${SEMRUSH_API_BASE}/?${params}`);
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split("\n");
    if (lines.length < 2) return null;
    const headers = lines[0].split(";");
    const values = lines[1].split(";");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });

    // Fetch top keywords separately
    const kwParams = new URLSearchParams({
      type: "domain_organic",
      key: ENV.semrushApiKey,
      domain: TARGET_DOMAIN,
      database: "us",
      display_limit: "10",
      export_columns: "Ph,Po,Nq",
    });
    const kwRes = await fetch(`${SEMRUSH_API_BASE}/?${kwParams}`);
    const kwText = kwRes.ok ? await kwRes.text() : "";
    const kwLines = kwText.trim().split("\n").slice(1);
    const topKeywords = kwLines.slice(0, 10).map(line => {
      const [keyword, position, volume] = line.split(";");
      return {
        keyword: keyword ?? "",
        position: parseInt(position ?? "0", 10),
        volume: parseInt(volume ?? "0", 10),
      };
    }).filter(k => k.keyword);

    return {
      organicKeywords: parseInt(row["Organic Keywords"] ?? row["Or"] ?? "0", 10),
      organicTraffic: parseInt(row["Organic Traffic"] ?? row["Ot"] ?? "0", 10),
      authorityScore: parseInt(row["Authority Score"] ?? row["Rk"] ?? "0", 10),
      backlinks: parseInt(row["Backlinks"] ?? "0", 10),
      topKeywords,
    };
  } catch (err) {
    console.error("[SEMrush] Domain overview error:", err);
    return null;
  }
}
