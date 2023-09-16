import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"


export const postRouter = createTRPCRouter({

    create: protectedProcedure
        .input(z.object({
            content: z.string(),
            title: z.string()
        }))
        .mutation(async ({ input: { title, content }, ctx }) => {
            try {
                const post = await ctx.db.post.create({
                    data: { title, content, authorId: ctx.session.user.id },
                });
                return post;
            } catch (error) {

                console.error("Hata oluştu:", error);
                throw new Error("Bir hata oluştu.");
            }
        }),
    getPostsByUserId: publicProcedure.query(async ({ ctx }) => { 
        try {
            const posts = await ctx.db.post.findMany({
                where:{
                    authorId:ctx.session?.user.id
                },
                orderBy:{createdAt:"desc"}
            });
            return posts;
        } catch (error) {
            
        }
    })
})


