
import { z } from "zod";
import {
  createTRPCRouter,  
  protectedProcedure,
} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.book.findMany({
            where: {
                userId: ctx.session.user.id
            }
        });
    }),

    create: protectedProcedure
        .input(z.object({ title: z.string().min(1), author: z.string().min(1), resumo: z.string().min(1) }))
        .mutation( ({ ctx, input }) => {
            return ctx.prisma.book.create({
                data: {
                    title: input.title,
                    author: input.author,
                    resumo: input.resumo,
                    userId: ctx.session.user.id
              }
          })
          
          
    }),

    delete: protectedProcedure
        .input(z.object({id: z.string()}))
        .mutation(({ctx, input}) => {
            return ctx.prisma.book.delete({
                where: {
                    id: input.id,
                }
            })
        })
});