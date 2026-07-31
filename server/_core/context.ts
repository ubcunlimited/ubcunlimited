import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

/**
 * Public-first build: no third-party auth provider is wired up yet.
 * `user` is always null, so protected/admin procedures are inaccessible
 * until a real auth provider is connected (phase 2).
 */
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  return { req: opts.req, res: opts.res, user: null };
}
