import { betterAuth } from "better-auth";
import { db } from "../db/mongodb.js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { openAPI } from "better-auth/plugins"
import { env } from "../config/env.js";

export const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        env.FRONTEND_URL,
    ],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        openAPI()
    ],
    user: {
        additionalFields: {
            org: {
                type: "string",
                required: false,
            },
        },
    },
});
