
import { z } from "zod";
import {
  createTRPCRouter,  
  protectedProcedure,
} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.book.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });
    }),

    create: protectedProcedure
        .input(z.object({ title: z.string(), author: z.string(), resumo: z.string(),  }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.book.create({
                data: {
                    title: input.title,
                    author: input.author,
                    resumo: input.resumo,
                    userId: ctx.session.user.id,
              }
          })
    })
});