import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lendingRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.lentBook.findMany({});
  }),

  create: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        person: z.string().min(1),
        
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.lentBook.create({
        data: {
          bookId: input.bookId,
          person: input.person,
        },
      });
    }),
});
