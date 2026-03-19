import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";

// ─── Consultation ────────────────────────────────────────────────────────────

const consultationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  businessName: z.string().min(1),
  businessType: z.string().min(1),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
});

// ─── Quote ───────────────────────────────────────────────────────────────────

const quoteSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  businessName: z.string().min(1),
  businessType: z.string().min(1),
  monthlyVolume: z.string().optional(),
  currentProcessor: z.string().optional(),
  solutions: z.array(z.string()).optional(),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
});

// ─── Statement Review ────────────────────────────────────────────────────────

const statementReviewSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  businessName: z.string().min(1),
  businessType: z.string().optional(),
  currentProcessor: z.string().optional(),
  monthlyVolume: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
  // base64-encoded file upload (optional)
  fileData: z.string().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
});

// ─── Hero Lead ─────────────────────────────────────────────────────────────

const heroLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  businessType: z.string().min(1),
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const formsRouter = router({
  submitHeroLead: publicProcedure
    .input(heroLeadSchema)
    .mutation(async ({ input }) => {
      const lines = [
        `**New Homepage Lead — UBC Unlimited**`,
        ``,
        `**Name:** ${input.name}`,
        `**Phone:** ${input.phone}`,
        `**Business Type:** ${input.businessType}`,
        ``,
        `Source: Homepage hero micro-form. Follow up promptly.`,
      ].join("\n");
      await notifyOwner({
        title: `New Homepage Lead — ${input.name}`,
        content: lines,
      });
      return { success: true };
    }),

  submitConsultation: publicProcedure
    .input(consultationSchema)
    .mutation(async ({ input }) => {
      const lines = [
        `**New Consultation Request — UBC Unlimited**`,
        ``,
        `**Name:** ${input.firstName} ${input.lastName}`,
        `**Email:** ${input.email}`,
        `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`,
        `**Business Type:** ${input.businessType}`,
        input.preferredDate ? `**Preferred Date:** ${input.preferredDate}` : null,
        input.preferredTime ? `**Preferred Time:** ${input.preferredTime}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`,
        ``,
        `Please follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `New Consultation Request — ${input.firstName} ${input.lastName}`,
        content: lines,
      });

      return { success: true };
    }),

  submitQuote: publicProcedure
    .input(quoteSchema)
    .mutation(async ({ input }) => {
      const lines = [
        `**New Quote Request — UBC Unlimited**`,
        ``,
        `**Name:** ${input.firstName} ${input.lastName}`,
        `**Email:** ${input.email}`,
        `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`,
        `**Business Type:** ${input.businessType}`,
        input.monthlyVolume ? `**Monthly Volume:** ${input.monthlyVolume}` : null,
        input.currentProcessor ? `**Current Processor:** ${input.currentProcessor}` : null,
        input.solutions && input.solutions.length > 0
          ? `**Solutions Interested In:** ${input.solutions.join(", ")}`
          : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`,
        ``,
        `Please follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `New Quote Request — ${input.firstName} ${input.lastName}`,
        content: lines,
      });

      return { success: true };
    }),

  submitStatementReview: publicProcedure
    .input(statementReviewSchema)
    .mutation(async ({ input }) => {
      let fileUrl: string | null = null;

      // Upload statement file to S3 if provided
      if (input.fileData && input.fileName && input.fileType) {
        try {
          const buffer = Buffer.from(input.fileData, "base64");
          const ext = input.fileName.split(".").pop() ?? "pdf";
          const key = `statement-reviews/${nanoid()}-${Date.now()}.${ext}`;
          const result = await storagePut(key, buffer, input.fileType);
          fileUrl = result.url;
        } catch (err) {
          console.error("[StatementReview] File upload failed:", err);
          // Continue without the file — don't block the submission
        }
      }

      const lines = [
        `**New Statement Review Request — UBC Unlimited**`,
        ``,
        `**Name:** ${input.firstName} ${input.lastName}`,
        `**Email:** ${input.email}`,
        `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`,
        input.businessType ? `**Business Type:** ${input.businessType}` : null,
        input.currentProcessor ? `**Current Processor:** ${input.currentProcessor}` : null,
        input.monthlyVolume ? `**Monthly Volume:** ${input.monthlyVolume}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`,
        fileUrl ? `**Statement File:** ${fileUrl}` : `**Statement File:** Not uploaded`,
        ``,
        `Please review and follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `New Statement Review Request — ${input.firstName} ${input.lastName}`,
        content: lines,
      });

      return { success: true, fileUploaded: !!fileUrl };
    }),
});
