import {
  protectedProcedure,
  router,
} from "../trpc.js";
import { User } from "../../db/models/userlogic/user.js";
import { Organization } from "../../db/models/userlogic/organization.js";
import {z} from "zod"
import { Form } from "../../db/models/forms.js";
import { TRPCError } from "@trpc/server";
import { auth } from "../../auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  authrelation: protectedProcedure.query(async ({ ctx }) => {
    const user = await User.create({
      betterAuthId: ctx.session.user.id,
      name: "Hatogoat",
    })
    const organisation = await Organization.create({
      name: "Meine Organisation",
      members: [user._id],
    });
    return organisation;
  }),
  configurefields: protectedProcedure.query( async({ ctx }) => {
    try{
      const user = await User.findOne({
          betterAuthId: ctx.session.user.id,
      })
      if(!user?._id){
          throw new TRPCError({
              code: "NOT_FOUND"
          })
      }
      const org = await Organization.findOne({
          members: user._id,
      })
      if(!org){
          throw new TRPCError({
              code: "NOT_FOUND"
          })
      }
      const betteruser = await auth.api.updateUser({
        body:{
          org: org._id.toString()
        },
        headers: fromNodeHeaders(ctx.headers),
      })
    }
    catch(error){
        if(error){
          console.log(error)
        }
    }
  }),
});