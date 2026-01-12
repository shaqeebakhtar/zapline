import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Hook to fetch workflows using Suspense
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getAll.queryOptions());
};

export const useCreateWorkflow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created successfully`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions());
      },
      onError: ({ message }) => {
        toast.error(`Failed to create workflow: ${message}`);
      },
    })
  );
};
