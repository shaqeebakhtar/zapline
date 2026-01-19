import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTRPC } from '@/trpc/client';
import { useWorkflowsParams } from './use-workflows-params';

// Hook to fetch workflows using Suspense
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getAll.queryOptions(params));
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created successfully`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
      },
      onError: ({ message }) => {
        toast.error(`Failed to create workflow: ${message}`);
      },
    })
  );
};

export const useRemoveWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} removed`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        );
      },
      onError: ({ message }) => {
        toast.error(`Failed to remove workflow: ${message}`);
      },
    })
  );
};

export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
};

export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} updated successfully`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }));
      },
      onError: ({ message }) => {
        toast.error(`Failed to update workflow: ${message}`);
      },
    })
  );
};