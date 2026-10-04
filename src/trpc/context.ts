import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { auth } from "../auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export async function createTRPCContext({
  req,
}: CreateExpressContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return {
    session,
    headers: req.headers,
  };
}

export type TRPCContext = Awaited<
  ReturnType<typeof createTRPCContext>
>;