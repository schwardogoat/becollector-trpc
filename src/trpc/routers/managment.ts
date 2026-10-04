import {
  protectedProcedure,
  publicProcedure,
  router,
} from "../trpc.js";
import mongoose from "mongoose";
import { User } from "../../db/models/userlogic/user.js";
import { Organization } from "../../db/models/userlogic/organization.js";
import { z } from "zod"
import { betterAuth } from "better-auth";
import { auth } from "../../auth/auth.js";
import crypto from "node:crypto";

export const managementRouter = router({
  createOrg: publicProcedure
    .input(z.object({
        email: z.string(),
        name: z.string(),
        orgname: z.string(),
    }))
    .query(async ({ input }) => {
        const session = await mongoose.startSession();
        try{
            const code = crypto.randomInt(10000000, 100000000).toString();
            const betterauthentry = await auth.api.signUpEmail({
                body: {
                    email: input.email,
                    password: code,
                    name: "none",
                    org: "iam org"
                },
            });
            const user = new User({
                betterAuthId: betterauthentry.user.id,
                name: input.name,
                role: "owner",
            });

            await user.save({ session });

            const org = new Organization({
                name: input.orgname,
                members: [user._id],
            });

            await org.save({ session });
            return code;
        }
        finally{
            await session.endSession();
        }
    }),
});

//36615115
//62434804