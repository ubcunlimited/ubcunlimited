import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { getLeads, getLeadStats, updateLeadStatus } from "../db";
import { invokeLLM } from "../_core/llm";

// ─── SEMrush API helper ───────────────────────────────────────────────────────

const SEMRUSH_BASE = "https://api.semrush.com";
const DOMAIN = "ubcunlimited.com";

async function semrushGet(params: Record<string, string>): Promise<string> {
  const apiKey = process.env.SEMRUSH_API_KEY;
  if (!apiKey) throw new Error("SEMRUSH_API_KEY not configured");
  const qs = new URLSearchParams({ ...params, key: apiKey }).toString();
  const res = await fetch(`${SEMRUSH_BASE}/?${qs}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`SEMrush API error: ${res.status}`);
  return res.text();
}

/** Parse SEMrush CSV-style response into array of objects */
function parseSemrushCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(";");
  return lines.slice(1).map(line => {
    const values = line.split(";");
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? "").trim()]));
  });
}

// ─── Admin Router ─────────────────────────────────────────────────────────────

export const adminRouter = router({

  // ── Lead Inbox ────────────────────────────────────────────────────────────
  getLeads: adminProcedure
    .input(z.object({
      formType: z.string().optional(),
      status: z.string().optional(),
      dateFrom: z.date().optional(),
      dateTo: z.date().optional(),
      limit: z.number().min(1).max(200).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      return getLeads(input);
    }),

  getLeadStats: adminProcedure
    .query(async () => {
      return getLeadStats();
    }),

  updateLeadStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "qualified", "closed", "lost"]),
      adminNotes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await updateLeadStatus(input.id, input.status, input.adminNotes);
      return { success: true };
    }),

  // ── SEMrush: Domain Overview ──────────────────────────────────────────────
  getDomainOverview: adminProcedure
    .query(async () => {
      try {
        const text = await semrushGet({
          type: "domain_ranks",
          export_columns: "Dn,Rk,Or,Ot,Oc,Ad,At,Ac",
          domain: DOMAIN,
          database: "us",
        });
        const rows = parseSemrushCsv(text);
        return { success: true, data: rows[0] ?? null };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), data: null };
      }
    }),

  // ── SEMrush: Organic Keywords ─────────────────────────────────────────────
  getOrganicKeywords: adminProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(25) }))
    .query(async ({ input }) => {
      try {
        const text = await semrushGet({
          type: "domain_organic",
          export_columns: "Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td",
          domain: DOMAIN,
          database: "us",
          display_limit: String(input.limit),
          display_sort: "tr_desc",
        });
        const rows = parseSemrushCsv(text);
        return { success: true, data: rows };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), data: [] };
      }
    }),

  // ── SEMrush: Backlinks Overview ───────────────────────────────────────────
  getBacklinksOverview: adminProcedure
    .query(async () => {
      try {
        const text = await semrushGet({
          type: "backlinks_overview",
          target: DOMAIN,
          target_type: "root_domain",
          export_columns: "ascore,total,domains_num,urls_num,ips_num,follows_num,nofollows_num,texts_num,images_num",
        });
        const rows = parseSemrushCsv(text);
        return { success: true, data: rows[0] ?? null };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), data: null };
      }
    }),

  // ── SEMrush: Top Backlinks ────────────────────────────────────────────────
  getTopBacklinks: adminProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ input }) => {
      try {
        const text = await semrushGet({
          type: "backlinks",
          target: DOMAIN,
          target_type: "root_domain",
          export_columns: "page_ascore,source_url,source_title,anchor,target_url,type,first_seen,last_seen",
          display_limit: String(input.limit),
          display_sort: "page_ascore_desc",
        });
        const rows = parseSemrushCsv(text);
        return { success: true, data: rows };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), data: [] };
      }
    }),

  // ── SEMrush: Keyword Position Tracking (via domain_organic filtered) ──────
  getKeywordRankings: adminProcedure
    .input(z.object({
      keywords: z.array(z.string()).optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ input }) => {
      try {
        const text = await semrushGet({
          type: "domain_organic",
          export_columns: "Ph,Po,Pp,Nq,Cp,Ur,Tr",
          domain: DOMAIN,
          database: "us",
          display_limit: String(input.limit),
          display_sort: "po_asc",
          display_filter: "+Po|Lt|21", // top 20 positions
        });
        const rows = parseSemrushCsv(text);
        return { success: true, data: rows };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), data: [] };
      }
    }),

  // ── AI SEO Fix: Analyze SEMrush data and suggest fixes ───────────────────
  analyzeSeoIssues: adminProcedure
    .input(z.object({
      issueType: z.enum(["keywords", "backlinks", "content", "technical"]),
      context: z.string().max(4000),
    }))
    .mutation(async ({ input }) => {
      try {
        const systemPrompt = `You are an expert SEO consultant for UBC Unlimited (ubcunlimited.com), a Utah-based merchant services company.
Analyze the provided SEMrush data and give specific, actionable recommendations to improve the site's search performance.
Focus on practical fixes that can be implemented in the website code or content.
Format your response as JSON with this structure:
{
  "summary": "2-3 sentence overview",
  "issues": [
    {
      "severity": "high|medium|low",
      "title": "Issue title",
      "description": "What the problem is",
      "fix": "Specific actionable fix",
      "affectedPages": ["list of affected page paths if applicable"]
    }
  ],
  "quickWins": ["list of 3-5 quick wins"]
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analyze this SEMrush ${input.issueType} data for ubcunlimited.com and provide specific fixes:\n\n${input.context}` },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "seo_analysis",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  summary: { type: "string" },
                  issues: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        severity: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        fix: { type: "string" },
                        affectedPages: { type: "array", items: { type: "string" } },
                      },
                      required: ["severity", "title", "description", "fix", "affectedPages"],
                      additionalProperties: false,
                    },
                  },
                  quickWins: { type: "array", items: { type: "string" } },
                },
                required: ["summary", "issues", "quickWins"],
                additionalProperties: false,
              },
            },
          },
        });

        const rawContent = response.choices?.[0]?.message?.content;
        if (!rawContent) throw new Error("No response from AI");
        const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
        const parsed = JSON.parse(content);
        return { success: true, analysis: parsed };
      } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err), analysis: null };
      }
    }),

  // ── Check if SEMrush key is configured ───────────────────────────────────
  checkSemrushKey: adminProcedure
    .query(() => {
      return { configured: !!process.env.SEMRUSH_API_KEY };
    }),
});
