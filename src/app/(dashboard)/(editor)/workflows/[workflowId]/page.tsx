import { requireAuth } from '@/lib/auth-utils';

type Props = {
  params: Promise<{
    workflowId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  await requireAuth();

  const { workflowId } = await params;

  return <div>Workflow Id: {workflowId}</div>;
};

export default Page;
