import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany();
    return tasks;
  }),
  addTask: publicProcedure
    .input(z.object({ task: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.task.create({
        data: {
          name: input.task,
        },
      });
      return todo;
    }),
  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const todo = await ctx.prisma.task.delete({
        where: {
          id,
        },
      });
      return todo;
    }),
});
