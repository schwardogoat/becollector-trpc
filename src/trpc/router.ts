import { router } from "./trpc.js";
import { userRouter } from "./routers/user.js";
import { managementRouter } from "./routers/managment.js";
import { formsRouter } from "./routers/bussinesslogic/forms.js";

export const appRouter = router({
  user: userRouter,
  management: managementRouter,
  form: formsRouter,
});

export type AppRouter = typeof appRouter;