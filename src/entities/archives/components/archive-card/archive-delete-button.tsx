'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteArchive } from '@/entities/archives/hooks';

import alert from '/public/images/icons/alert.svg';

interface ArchiveDeleteButtonProps {
  archiveId: number;
  currentPage: number;
}

export const ArchiveDeleteButton = forwardRef<
  HTMLButtonElement,
  ArchiveDeleteButtonProps
>(({ archiveId, currentPage }, ref) => {
  const { mutate: deleteArchiveMutation, isPending } = useDeleteArchive(
    currentPage - 1,
  );
  const queryClient = useQueryClient();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteArchiveMutation(archiveId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['archives', 'list', currentPage - 1],
        });
      },
    });
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className="w-full rounded-sm py-1 text-xs font-semibold"
            disabled={isPending}
          >
            삭제하기
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Image src={alert} alt="경고아이콘" />
            <AlertDialogTitle>카드를 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제한 카드는 복구할 수 없어요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center">
            <AlertDialogCancel className="grow">취소하기</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="grow bg-blue-500 text-white"
            >
              삭제하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
});

ArchiveDeleteButton.displayName = 'DeleteArchiveButton';
