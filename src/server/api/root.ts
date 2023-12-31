import { createTRPCRouter } from "~/server/api/trpc";
import { bookRouter } from "~/server/api/routers/bookRouter";
import { lendingRouter } from "./routers/lendingRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  book: bookRouter,
  lentBook: lendingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
