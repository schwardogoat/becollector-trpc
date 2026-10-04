import cors from "cors";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import { appRouter } from "./trpc/router.js";
import { createTRPCContext } from "./trpc/context.js";
import { auth } from "./auth/auth.js";
import { connectDB } from "./db/models/mongoose.js";
import { env } from "./config/env.js";

await connectDB()

const app = express();

app.use(cors({origin: env.FRONTEND_URL, credentials: true, methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS",],allowedHeaders: ["Content-Type","Authorization",],}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

const port = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
