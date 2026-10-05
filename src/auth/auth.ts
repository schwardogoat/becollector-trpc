import { betterAuth } from "better-auth";
import { db } from "../db/mongodb.js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { openAPI } from "better-auth/plugins"
import { env } from "../config/env.js";

export const auth = betterAuth({
    // VORSICHT!, hier sollte später teil wieder weg, und vue und trpc beide über eine domain laufen.
    advanced: {
        useSecureCookies: true,
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
        ipAddress: {
            ipAddressHeaders: [
                "x-forwarded-for",
                "x-real-ip",
            ],
        },
    },
    //VORSSICHT ENDE
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
