import {
  initTRPC,
  TRPCError,
} from "@trpc/server";

import type { TRPCContext } from "./context.js";

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Sie sind nicht autorisiert, diese Funktion auszuführen.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  },
);