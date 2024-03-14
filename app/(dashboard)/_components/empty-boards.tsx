'use client';

import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';

export const EmptyBoards = () => {
  const router = useRouter();

  const { organization } = useOrganization();
  const { mutate, pending }: { mutate: Function; pending: boolean } = useApiMutation(
    api.board.create
  );

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: 'Untitled'
    })
      .then(() => {
        toast.success('Board created');
        router.push('/board/${id}');
      })
      .catch(() => {
        toast.error('Failed to create board');
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" width={150} height={150} alt="Empty favorites" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Get started by creating your first board.
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};
