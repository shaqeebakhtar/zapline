import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    });

    return {
      success: true,
      message: 'AI execution started',
    };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'test@test.com',
      },
    });

    return {
      success: true,
      message: 'Workflow created',
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
