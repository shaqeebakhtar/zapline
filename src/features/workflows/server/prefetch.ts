import type { inferInput } from '@trpc/tanstack-react-query';
import { prefetch, trpc } from '@/trpc/server';

type Input = inferInput<typeof trpc.workflows.getAll>;

export function prefetchWorkflows(params: Input) {
  prefetch(trpc.workflows.getAll.queryOptions(params));
}
