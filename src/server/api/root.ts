import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";

export const appRouter = createTRPCRouter({
    posts: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
