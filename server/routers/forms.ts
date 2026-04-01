import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";
import { insertBlogLead } from "../db";
import { sendToWebhook } from "../webhook";
import { verifyRecaptcha } from "../recaptcha";
import { TRPCError } from "@trpc/server";

// ─── Schemas ─────────────────────────────────────────────────────────────────

const recaptchaToken = z.string().optional();

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
  recaptchaToken: recaptchaToken,
});

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
  recaptchaToken: recaptchaToken,
});

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
  fileData: z.string().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
  recaptchaToken: recaptchaToken,
});

const heroLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  businessType: z.string().min(1),
  recaptchaToken: recaptchaToken,
  city: z.string().optional(),
  email: z.string().optional(),
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const formsRouter = router({

  // ── Blog email lead ────────────────────────────────────────────────────────
  submitBlogLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(128),
        email: z.string().email("Please enter a valid email address"),
        sourcePage: z.string().max(256).optional(),
        recaptchaToken: recaptchaToken,
      })
    )
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_blog_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      await insertBlogLead({
        name: input.name,
        email: input.email,
        sourcePage: input.sourcePage ?? null,
      });

      const nameParts = input.name.trim().split(/\s+/);
      const firstName = nameParts[0] ?? input.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      const lines = [
        `**New Blog Email Lead — UBC Unlimited**`,
        ``,
        `**Name:** ${input.name}`,
        `**Email:** ${input.email}`,
        input.sourcePage ? `**Source Page:** ${input.sourcePage}` : null,
        ``,
        `This visitor opted in to receive the free processing fee guide from the blog sidebar.`,
      ].filter(Boolean).join("\n");

      await notifyOwner({ title: `New Blog Lead — ${input.name}`, content: lines });

      await sendToWebhook(
        "blog_lead",
        { firstName, lastName, phone: "", email: input.email },
        { source_page: input.sourcePage }
      );

      return { success: true };
    }),

  // ── Agent / ISO lead ───────────────────────────────────────────────────────
  submitAgentLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(7),
        agentType: z.string().min(1),
        experience: z.string().optional(),
        recaptchaToken: recaptchaToken,
      })
    )
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_agent_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const nameParts = input.name.trim().split(/\s+/);
      const firstName = nameParts[0] ?? input.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      const lines = [
        `**New Agent/ISO Partner Application — UBC Unlimited**`,
        ``,
        `**Name:** ${input.name}`,
        `**Email:** ${input.email}`,
        `**Phone:** ${input.phone}`,
        `**Role:** ${input.agentType}`,
        input.experience ? `**Experience:** ${input.experience}` : null,
        ``,
        `Source: /agent-iso partner application form.`,
      ].filter(Boolean).join("\n");

      await notifyOwner({ title: `New Agent Application — ${input.name}`, content: lines });

      await sendToWebhook(
        "agent_lead",
        { firstName, lastName, phone: input.phone, email: input.email },
        { agent_type: input.agentType, experience: input.experience }
      );

      return { success: true };
    }),

  // ── Homepage hero micro-form ───────────────────────────────────────────────
  submitHeroLead: publicProcedure
    .input(heroLeadSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_hero_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const nameParts = input.name.trim().split(/\s+/);
      const firstName = nameParts[0] ?? input.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      const lines = [
        `**New Homepage Lead — UBC Unlimited**`,
        ``,
        `**Name:** ${input.name}`,
        `**Phone:** ${input.phone}`,
        `**Business Type:** ${input.businessType}`,
        ``,
        `Source: Homepage hero micro-form. Follow up promptly.`,
      ].join("\n");

      await notifyOwner({ title: `New Homepage Lead — ${input.name}`, content: lines });

      await sendToWebhook(
        "hero_lead",
        { firstName, lastName, phone: input.phone, email: "" },
        { business_type: input.businessType }
      );

      return { success: true };
    }),

  // ── Consultation request ───────────────────────────────────────────────────
  submitConsultation: publicProcedure
    .input(consultationSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_consultation");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
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

      await sendToWebhook(
        "consultation",
        { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email },
        {
          business_name: input.businessName,
          business_type: input.businessType,
          preferred_date: input.preferredDate,
          preferred_time: input.preferredTime,
          message: input.message,
          sms_consent: input.smsConsent ?? false,
        }
      );

      return { success: true };
    }),

  // ── Quote request ──────────────────────────────────────────────────────────
  submitQuote: publicProcedure
    .input(quoteSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_quote");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
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
        input.solutions?.length
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

      await sendToWebhook(
        "quote_request",
        { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email },
        {
          business_name: input.businessName,
          business_type: input.businessType,
          monthly_volume: input.monthlyVolume,
          current_processor: input.currentProcessor,
          solutions_interested: input.solutions?.join(", "),
          message: input.message,
          sms_consent: input.smsConsent ?? false,
        }
      );

      return { success: true };
    }),

  // ── Statement review ───────────────────────────────────────────────────────
  submitStatementReview: publicProcedure
    .input(statementReviewSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_statement_review");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      let fileUrl: string | null = null;

      if (input.fileData && input.fileName && input.fileType) {
        try {
          const buffer = Buffer.from(input.fileData, "base64");
          const ext = input.fileName.split(".").pop() ?? "pdf";
          const key = `statement-reviews/${nanoid()}-${Date.now()}.${ext}`;
          const result = await storagePut(key, buffer, input.fileType);
          fileUrl = result.url;
        } catch (err) {
          console.error("[StatementReview] File upload failed:", err);
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

      await sendToWebhook(
        "statement_review",
        { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email },
        {
          business_name: input.businessName,
          business_type: input.businessType,
          current_processor: input.currentProcessor,
          monthly_volume: input.monthlyVolume,
          message: input.message,
          sms_consent: input.smsConsent ?? false,
          statement_file_url: fileUrl,
        }
      );

      return { success: true, fileUploaded: !!fileUrl };
    }),
});
