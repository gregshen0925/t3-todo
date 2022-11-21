import { router } from "../trpc";
import { taskRouter } from "./task";

export const appRouter = router({
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
