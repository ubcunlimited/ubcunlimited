/**
 * Scheduled endpoint handlers for Heartbeat cron callbacks.
 *
 * Each handler is mounted at /api/scheduled/<name> in server/_core/index.ts.
 * Auth: the Manus platform restricts /api/scheduled/* to cron callers only.
 * We read the task UID from the x-manus-cron-task-uid header for identification.
 */

import type { Request, Response } from "express";
import { runSeoAuditCycle } from "./seoAuditService";
import { getSeoAuditConfig } from "./db";

/**
 * POST /api/scheduled/seo-audit
 *
 * Triggered by the Heartbeat cron (weekly by default, or manually via admin portal).
 * Pulls SEMrush site audit data, stores it in the DB, and AI-analyzes each issue.
 */
export async function seoAuditScheduledHandler(req: Request, res: Response): Promise<void> {
  const taskUid = req.headers["x-manus-cron-task-uid"] as string | undefined;

  // Verify this is a legitimate cron call by checking the task UID matches our config
  // (The platform gateway restricts /api/scheduled/* to cron callers, so this is a secondary check)
  if (taskUid) {
    try {
      const config = await getSeoAuditConfig();
      if (config?.scheduleCronTaskUid && config.scheduleCronTaskUid !== taskUid) {
        console.warn("[SEO Audit Handler] Task UID mismatch — possible orphan cron:", taskUid);
        res.json({ ok: true, skipped: "orphan" });
        return;
      }
    } catch (err) {
      console.error("[SEO Audit Handler] Config check failed:", err);
      // Continue anyway — don't block the audit
    }
  }

  try {
    console.log("[SEO Audit Handler] Starting scheduled audit cycle...");
    const result = await runSeoAuditCycle();
    console.log("[SEO Audit Handler] Completed:", result);
    res.json({
      ok: true,
      runId: result.runId,
      totalIssues: result.totalIssues,
      errors: result.errors,
      warnings: result.warnings,
      notices: result.notices,
      healthScore: result.healthScore,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[SEO Audit Handler] Failed:", message);
    res.status(500).json({
      error: message,
      stack: err instanceof Error ? err.stack : undefined,
      context: { taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}
