'use client';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success('AI execution started');
      },
    })
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      Protect page
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>{JSON.stringify(testAi.data, null, 2)}</div>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending}>
        Test AI
      </Button>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
    </div>
  );
};

export default Page;
