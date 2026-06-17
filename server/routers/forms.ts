import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";
import { insertBlogLead, insertLead } from "../db";
import { sendToWebhook } from "../webhook";
import { verifyRecaptcha } from "../recaptcha";
import { TRPCError } from "@trpc/server";

// ─── Shared ───────────────────────────────────────────────────────────────────

const recaptchaToken = z.string().optional();

// ─── Schemas ─────────────────────────────────────────────────────────────────

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
  recaptchaToken,
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
  recaptchaToken,
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
  recaptchaToken,
});

const heroLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().default(""),
  email: z.string().email().optional().or(z.literal("")).optional(),
  phone: z.string().min(7),
  businessType: z.string().min(1),
  city: z.string().optional(),
  source: z.string().optional(),
  recaptchaToken,
});

const leadCaptureSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  city: z.string().optional(),
  state: z.string().optional(),
  message: z.string().optional(),
  newsletter: z.boolean().optional(),
  sourcePage: z.string().optional(),
  recaptchaToken,
});

const blogLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().default(""),
  email: z.string().email(),
  phone: z.string().min(7).optional().default(""),
  sourcePage: z.string().max(256).optional(),
  recaptchaToken,
});

const testimonialSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().default(""),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional().default(""),
  businessName: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  rating: z.number().min(1).max(5),
  quote: z.string().min(10),
  agreed: z.boolean(),
  recaptchaToken,
});

const skyTabConfigSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().default(""),
  email: z.string().email().optional().or(z.literal("")).optional(),
  phone: z.string().min(7).optional().default(""),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  selectedHardware: z.array(z.string()).optional(),
  selectedAddOns: z.array(z.string()).optional(),
  recaptchaToken,
});

const skyTabPOSSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  businessName: z.string().min(1),
  businessType: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  currentPOS: z.string().optional(),
  notes: z.string().optional(),
  orderSummary: z.string().optional(),
  processingPlan: z.string().optional(),
  consent: z.boolean(),
  recaptchaToken,
});

const agentLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional().default(""),
  email: z.string().email(),
  phone: z.string().min(7),
  agentType: z.string().min(1),
  experience: z.string().optional(),
  recaptchaToken,
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const formsRouter = router({

  // ── Blog email lead ────────────────────────────────────────────────────────
  submitBlogLead: publicProcedure
    .input(blogLeadSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_blog_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName}`.trim();
      await insertBlogLead({ name: fullName, email: input.email, sourcePage: input.sourcePage ?? null });
      await insertLead({
        formType: "blog_lead",
        firstName: input.firstName,
        lastName: input.lastName ?? "",
        email: input.email,
        phone: input.phone ?? "",
        notes: JSON.stringify({ source_page: input.sourcePage }),
        sourcePage: input.sourcePage ?? null,
      });
      const lines = [
        `**New Blog Email Lead — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`, `**Email:** ${input.email}`,
        input.phone ? `**Phone:** ${input.phone}` : null,
        input.sourcePage ? `**Source Page:** ${input.sourcePage}` : null,
        ``, `This visitor opted in to receive the free processing fee guide from the blog sidebar.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Blog Lead — ${fullName}`, content: lines });
      await sendToWebhook("blog_lead", { firstName: input.firstName, lastName: input.lastName, phone: input.phone ?? "", email: input.email }, { source_page: input.sourcePage });
      return { success: true };
    }),

  // ── Agent / ISO lead ───────────────────────────────────────────────────────
  submitAgentLead: publicProcedure
    .input(agentLeadSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_agent_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName}`.trim();
      await insertLead({
        formType: "agent_lead",
        firstName: input.firstName,
        lastName: input.lastName ?? "",
        email: input.email,
        phone: input.phone,
        notes: JSON.stringify({ agent_type: input.agentType, experience: input.experience }),
      });
      const lines = [
        `**New Agent/ISO Partner Application — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        `**Role:** ${input.agentType}`,
        input.experience ? `**Experience:** ${input.experience}` : null,
        ``, `Source: /agent-iso partner application form.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Agent Application — ${fullName}`, content: lines });
      await sendToWebhook("agent_lead", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { agent_type: input.agentType, experience: input.experience });
      return { success: true };
    }),

  // ── Homepage / city hero micro-form ───────────────────────────────────────
  submitHeroLead: publicProcedure
    .input(heroLeadSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_hero_lead");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName ?? ""}`.trim();
      await insertLead({
        formType: "hero_lead",
        firstName: input.firstName,
        lastName: input.lastName ?? "",
        email: input.email ?? "",
        phone: input.phone,
        businessType: input.businessType,
        notes: JSON.stringify({ city: input.city, source: input.source }),
        sourcePage: input.source ?? null,
      });
      const lines = [
        `**New Homepage Lead — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`, `**Phone:** ${input.phone}`,
        input.email ? `**Email:** ${input.email}` : null,
        `**Business Type:** ${input.businessType}`,
        input.city ? `**City:** ${input.city}` : null,
        ``, `Source: Homepage / city hero micro-form. Follow up promptly.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Homepage Lead — ${fullName}`, content: lines });
      await sendToWebhook("hero_lead", { firstName: input.firstName, lastName: input.lastName ?? "", phone: input.phone, email: input.email ?? "" }, { business_type: input.businessType, city: input.city });
      return { success: true };
    }),

  // ── Embedded lead capture form ─────────────────────────────────────────────
  submitLeadCapture: publicProcedure
    .input(leadCaptureSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_lead_capture");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName}`.trim();
      await insertLead({
        formType: "lead_capture",
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        notes: JSON.stringify({ city: input.city, state: input.state, message: input.message, newsletter: input.newsletter }),
        sourcePage: input.sourcePage ?? null,
      });
      const lines = [
        `**New Lead Capture — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        input.city ? `**City:** ${input.city}` : null,
        input.state ? `**State:** ${input.state}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        input.newsletter ? `**Newsletter:** Yes` : null,
        input.sourcePage ? `**Source Page:** ${input.sourcePage}` : null,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Lead — ${fullName}`, content: lines });
      await sendToWebhook("lead_capture", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { city: input.city, state: input.state, message: input.message, newsletter: input.newsletter ?? false, source_page: input.sourcePage });
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
      await insertLead({
        formType: "consultation",
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        businessName: input.businessName,
        businessType: input.businessType,
        notes: JSON.stringify({ preferred_date: input.preferredDate, preferred_time: input.preferredTime, message: input.message, sms_consent: input.smsConsent }),
      });
      const lines = [
        `**New Consultation Request — UBC Unlimited**`, ``,
        `**Name:** ${input.firstName} ${input.lastName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`, `**Business Type:** ${input.businessType}`,
        input.preferredDate ? `**Preferred Date:** ${input.preferredDate}` : null,
        input.preferredTime ? `**Preferred Time:** ${input.preferredTime}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`, ``, `Please follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Consultation Request — ${input.firstName} ${input.lastName}`, content: lines });
      await sendToWebhook("consultation", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { business_name: input.businessName, business_type: input.businessType, preferred_date: input.preferredDate, preferred_time: input.preferredTime, message: input.message, sms_consent: input.smsConsent ?? false });
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
      await insertLead({
        formType: "quote_request",
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        businessName: input.businessName,
        businessType: input.businessType,
        monthlyVolume: input.monthlyVolume ?? null,
        notes: JSON.stringify({ current_processor: input.currentProcessor, solutions: input.solutions, message: input.message, sms_consent: input.smsConsent }),
      });
      const lines = [
        `**New Quote Request — UBC Unlimited**`, ``,
        `**Name:** ${input.firstName} ${input.lastName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`, `**Business Type:** ${input.businessType}`,
        input.monthlyVolume ? `**Monthly Volume:** ${input.monthlyVolume}` : null,
        input.currentProcessor ? `**Current Processor:** ${input.currentProcessor}` : null,
        input.solutions?.length ? `**Solutions Interested In:** ${input.solutions.join(", ")}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`, ``, `Please follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Quote Request — ${input.firstName} ${input.lastName}`, content: lines });
      await sendToWebhook("quote_request", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { business_name: input.businessName, business_type: input.businessType, monthly_volume: input.monthlyVolume, current_processor: input.currentProcessor, solutions_interested: input.solutions?.join(", "), message: input.message, sms_consent: input.smsConsent ?? false });
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
      await insertLead({
        formType: "statement_review",
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        businessName: input.businessName,
        businessType: input.businessType ?? null,
        monthlyVolume: input.monthlyVolume ?? null,
        notes: JSON.stringify({ current_processor: input.currentProcessor, message: input.message, sms_consent: input.smsConsent, statement_file_url: fileUrl }),
      });
      const lines = [
        `**New Statement Review Request — UBC Unlimited**`, ``,
        `**Name:** ${input.firstName} ${input.lastName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`,
        input.businessType ? `**Business Type:** ${input.businessType}` : null,
        input.currentProcessor ? `**Current Processor:** ${input.currentProcessor}` : null,
        input.monthlyVolume ? `**Monthly Volume:** ${input.monthlyVolume}` : null,
        input.message ? `**Message:** ${input.message}` : null,
        `**SMS Consent:** ${input.smsConsent ? "Yes" : "No"}`,
        fileUrl ? `**Statement File:** ${fileUrl}` : `**Statement File:** Not uploaded`,
        ``, `Please review and follow up at your earliest convenience.`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Statement Review Request — ${input.firstName} ${input.lastName}`, content: lines });
      await sendToWebhook("statement_review", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { business_name: input.businessName, business_type: input.businessType, current_processor: input.currentProcessor, monthly_volume: input.monthlyVolume, message: input.message, sms_consent: input.smsConsent ?? false, statement_file_url: fileUrl });
      return { success: true, fileUploaded: !!fileUrl };
    }),

  // ── Testimonial submission ─────────────────────────────────────────────────
  submitTestimonial: publicProcedure
    .input(testimonialSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_testimonial");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName ?? ""}`.trim();
      await insertLead({
        formType: "testimonial",
        firstName: input.firstName,
        lastName: input.lastName ?? "",
        email: input.email ?? "",
        phone: input.phone ?? "",
        businessName: input.businessName ?? null,
        notes: JSON.stringify({ location: input.location, industry: input.industry, rating: input.rating, quote: input.quote }),
      });
      const lines = [
        `**New Testimonial Submission — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`,
        input.email ? `**Email:** ${input.email}` : null,
        input.phone ? `**Phone:** ${input.phone}` : null,
        input.businessName ? `**Business:** ${input.businessName}` : null,
        input.location ? `**Location:** ${input.location}` : null,
        input.industry ? `**Industry:** ${input.industry}` : null,
        `**Rating:** ${"★".repeat(input.rating)}${"☆".repeat(5 - input.rating)} (${input.rating}/5)`,
        `**Quote:** "${input.quote}"`,
        `**Agreed to Terms:** ${input.agreed ? "Yes" : "No"}`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New Testimonial — ${fullName} (${input.rating}★)`, content: lines });
      await sendToWebhook("testimonial", { firstName: input.firstName, lastName: input.lastName ?? "", phone: input.phone ?? "", email: input.email ?? "" }, { business_name: input.businessName, location: input.location, industry: input.industry, rating: input.rating, quote: input.quote });
      return { success: true };
    }),

  // ── SkyTab Configurator quote ──────────────────────────────────────────────
  submitSkyTabConfig: publicProcedure
    .input(skyTabConfigSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_skytab_configurator");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      const fullName = `${input.firstName} ${input.lastName ?? ""}`.trim();
      await insertLead({
        formType: "skytab_config",
        firstName: input.firstName,
        lastName: input.lastName ?? "",
        email: input.email ?? "",
        phone: input.phone ?? "",
        businessName: input.businessName ?? null,
        businessType: input.businessType ?? null,
        notes: JSON.stringify({ hardware: input.selectedHardware?.join(", "), add_ons: input.selectedAddOns?.join(", ") }),
      });
      const lines = [
        `**New SkyTab Configurator Quote — UBC Unlimited**`, ``,
        `**Name:** ${fullName}`,
        input.email ? `**Email:** ${input.email}` : null,
        input.phone ? `**Phone:** ${input.phone}` : null,
        input.businessName ? `**Business:** ${input.businessName}` : null,
        input.businessType ? `**Business Type:** ${input.businessType}` : null,
        input.selectedHardware?.length ? `**Hardware:** ${input.selectedHardware.join(", ")}` : null,
        input.selectedAddOns?.length ? `**Add-Ons:** ${input.selectedAddOns.join(", ")}` : null,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New SkyTab Config Quote — ${fullName}`, content: lines });
      await sendToWebhook("skytab_config", { firstName: input.firstName, lastName: input.lastName ?? "", phone: input.phone ?? "", email: input.email ?? "" }, { business_name: input.businessName, business_type: input.businessType, hardware: input.selectedHardware?.join(", "), add_ons: input.selectedAddOns?.join(", ") });
      return { success: true };
    }),

  // ── SkyTab POS Builder order ───────────────────────────────────────────────
  submitSkyTabOrder: publicProcedure
    .input(skyTabPOSSchema)
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_skytab_order");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }
      await insertLead({
        formType: "skytab_order",
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        businessName: input.businessName,
        businessType: input.businessType ?? null,
        notes: JSON.stringify({ city: input.city, state: input.state, current_pos: input.currentPOS, processing_plan: input.processingPlan, order_summary: input.orderSummary, notes: input.notes }),
      });
      const lines = [
        `**New SkyTab POS Order — UBC Unlimited**`, ``,
        `**Name:** ${input.firstName} ${input.lastName}`, `**Email:** ${input.email}`, `**Phone:** ${input.phone}`,
        `**Business:** ${input.businessName}`,
        input.businessType ? `**Business Type:** ${input.businessType}` : null,
        input.city ? `**City:** ${input.city}` : null,
        input.state ? `**State:** ${input.state}` : null,
        input.currentPOS ? `**Current POS:** ${input.currentPOS}` : null,
        input.processingPlan ? `**Processing Plan:** ${input.processingPlan}` : null,
        input.orderSummary ? `\n**Order Summary:**\n${input.orderSummary}` : null,
        input.notes ? `\n**Additional Notes:** ${input.notes}` : null,
        `**Consent:** ${input.consent ? "Yes" : "No"}`,
      ].filter(Boolean).join("\n");
      await notifyOwner({ title: `New SkyTab POS Order — ${input.firstName} ${input.lastName}`, content: lines });
      await sendToWebhook("skytab_order", { firstName: input.firstName, lastName: input.lastName, phone: input.phone, email: input.email }, { business_name: input.businessName, business_type: input.businessType, city: input.city, state: input.state, current_pos: input.currentPOS, processing_plan: input.processingPlan, order_summary: input.orderSummary, notes: input.notes, consent: input.consent });
      return { success: true };
    }),
});
