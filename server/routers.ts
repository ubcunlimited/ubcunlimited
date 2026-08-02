import { ENV } from "./_core/env";
import { publicProcedure, router } from "./_core/trpc";
import { formsRouter } from "./routers/forms";
import { testimonialsRouter } from "./routers/testimonials";
import { z } from "zod";

export const appRouter = router({
  // All API routes must start with '/api/' so the gateway can route correctly.
  forms: formsRouter,
  testimonials: testimonialsRouter,

  agent: router({
    verifyPassword: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(({ input }) => {
        const correct = ENV.agentPortalPassword;
        // If no password is configured, deny access.
        if (!correct) return { success: false };
        return { success: input.password === correct };
      }),
  }),
});

export type AppRouter = typeof appRouter;
