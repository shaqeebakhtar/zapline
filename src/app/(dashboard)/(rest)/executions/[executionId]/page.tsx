import { requireAuth } from '@/lib/auth-utils';

type Props = {
  params: Promise<{
    executionId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  await requireAuth();

  const { executionId } = await params;

  return <div>Execution Id: {executionId}</div>;
};

export default Page;
