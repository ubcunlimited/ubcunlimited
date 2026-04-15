import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { notifyOwner } from "../_core/notification";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { verifyRecaptcha } from "../recaptcha";
import {
  getTestimonialSubmissions,
  insertTestimonialSubmission,
  updateTestimonialStatus,
} from "../db";
import { sendToWebhook } from "../webhook";

const INDUSTRY_VALUES = [
  "Restaurants",
  "Retail",
  "Medical",
  "Automotive",
  "eCommerce",
  "Salons & Spas",
  "Nonprofit",
  "Bars & Nightclubs",
  "Professional Services",
  "Other",
] as [string, ...string[]];

export const testimonialsRouter = router({
  // ─── Public: submit a testimonial for review ──────────────────────────────
  submit: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required").max(64),
        lastName: z.string().min(1, "Last name is required").max(64),
        phone: z.string().optional(),
        businessName: z
          .string()
          .min(2, "Business name is required")
          .max(256),
        location: z
          .string()
          .min(2, "City / location is required")
          .max(128),
        industry: z.enum(INDUSTRY_VALUES, {
          message: "Please select your industry",
        }),
        rating: z.number().int().min(1).max(5),
        quote: z
          .string()
          .min(20, "Please write at least 20 characters")
          .max(1500),
        email: z.string().email("Please enter a valid email address").optional(),
        recaptchaToken: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.recaptchaToken) {
        const rc = await verifyRecaptcha(input.recaptchaToken, "submit_testimonial");
        if (!rc.success) throw new TRPCError({ code: "BAD_REQUEST", message: "reCAPTCHA verification failed. Please try again." });
      }

      const fullName = `${input.firstName} ${input.lastName}`.trim();

      // Persist to database (status defaults to "pending")
      await insertTestimonialSubmission({
        name: fullName,
        businessName: input.businessName,
        location: input.location,
        industry: input.industry,
        rating: input.rating,
        quote: input.quote,
        email: input.email ?? null,
      // status defaults to "pending" via schema default
      });

      // Fire GHL webhook
      await sendToWebhook(
        "testimonial_submission",
        {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email ?? "",
          phone: input.phone ?? "",
        },
        {
          businessName: input.businessName,
          location: input.location,
          industry: input.industry,
          rating: input.rating,
          quote: input.quote,
        }
      );

      // Notify owner
      const stars = "★".repeat(input.rating) + "☆".repeat(5 - input.rating);
      const lines = [
        `**New Testimonial Submission — UBC Unlimited**`,
        ``,
        `**Name:** ${fullName}`,
        `**Business:** ${input.businessName}`,
        `**Location:** ${input.location}`,
        `**Industry:** ${input.industry}`,
        `**Rating:** ${stars} (${input.rating}/5)`,
        input.phone ? `**Phone:** ${input.phone}` : null,
        input.email ? `**Email:** ${input.email}` : null,
        ``,
        `**Testimonial:**`,
        `"${input.quote}"`,
        ``,
        `Review and approve at /admin/testimonials.`,
      ]
        .filter(Boolean)
        .join("\n");

      await notifyOwner({
        title: `New Testimonial — ${fullName} (${input.industry})`,
        content: lines,
      });

      return { success: true };
    }),

  // ─── Admin: list all submissions with optional status filter ─────────────
  adminList: adminProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected", "all"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      const status =
        input.status === "all" ? undefined : input.status;
      const rows = await getTestimonialSubmissions(status);
      return rows;
    }),

  // ─── Admin: approve or reject a submission ───────────────────────────────
  review: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(["approved", "rejected"]),
        adminNotes: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateTestimonialStatus(input.id, input.status, input.adminNotes);
      return { success: true };
    }),

  // ─── Public: list approved testimonials for the live page ────────────────
  listApproved: publicProcedure.query(async () => {
    const rows = await getTestimonialSubmissions("approved");
    return rows;
  }),
});
