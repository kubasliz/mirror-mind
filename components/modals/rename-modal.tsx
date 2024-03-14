'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useRenameModal } from '@/store/use-rename-modal';

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update);

  const { isOpen, onClose, initialValues } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({ id: initialValues.id, title })
      .then(() => {
        toast.success('Board renamed');
        onClose();
      })
      .catch(() => {
        toast.error('Failed to rename board');
        onClose();
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename board</DialogTitle>
          <DialogDescription>Enter a new name for the board</DialogDescription>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              disabled={pending}
              required
              maxLength={60}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Board title"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancle
                </Button>
              </DialogClose>
              <Button disabled={pending} type="submit">
                Rename
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
