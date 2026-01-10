import prisma from '@/lib/db';
import {
  baseProcedure,
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from '../init';
import { inngest } from '@/inngest/client';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    // throw new TRPCError({ code: 'BAD_REQUEST', message: 'Test error' });

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
