import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';

const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      Protect page
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
