import { TRPCError } from "@trpc/server";
import { User } from "../../../db/models/userlogic/user.js";
import {
  protectedProcedure,
  publicProcedure,
  router,
} from "../../trpc.js";
import { Organization } from "../../../db/models/userlogic/organization.js";
import { Form } from "../../../db/models/forms.js";
import {z} from "zod";

export const formsRouter = router({
    getAll: protectedProcedure.query( async({ ctx }) => {
        try{
            const org = ctx.session.user.org;
            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }
            const forms = await Form.find({
                org
            })
            return forms
        }
        catch(error){
            if(error){

            }
        }
    }),
    getOne: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .query(async ({ ctx, input }) => {
        try {
            const org = ctx.session.user.org;

            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }

            const form = await Form.findOne({
                _id: input.id,
                org
            }).lean();

            return form;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }),
    create: protectedProcedure.mutation( async({ ctx }) => {
        try{
            const org = ctx.session.user.org;
            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }
            const forms = await Form.create({
                org,
                data: '{"blocks":[],"name":"","image":""}',
                publicdata: '{"blocks":[],"name":"","image":""}',
            })
            return forms
        }
        catch(error){
            console.log(error)
            if(error){
                
            }
        }
    }),
    update: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.string()
        })
    )
    .mutation( async({ ctx, input }) => {
        try{
            const org = ctx.session.user.org;
            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }
            const result = await Form.updateOne(
                {
                    _id: input.id,
                    org,
                },
                {
                    $set: {
                        data: input.data,
                    },
                }
            );
            return result
        }
        catch(error){
            console.log(error)
        }
    }),
    publish: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.string()
        })
    )
    .mutation( async({ ctx, input }) => {
        try{
            const org = ctx.session.user.org;
            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }
            const result = await Form.updateOne(
                {
                    _id: input.id,
                    org,
                },
                {
                    $set: {
                        publicdata: input.data,
                    },
                }
            );
            return result
        }
        catch(error){
            console.log(error)
        }
    }),
    delete: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .mutation( async({ ctx, input }) => {
        try{
            const org = ctx.session.user.org;
            if (!org) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Ihrem Account konnte keine Organisation zugeordnet werden.",
                });
            }
            const forms = await Form.deleteOne({
                _id: input.id,
                org,
            })
            return forms
        }
        catch(error){
            console.log(error)
            if(error){

            }
        }
    })
});