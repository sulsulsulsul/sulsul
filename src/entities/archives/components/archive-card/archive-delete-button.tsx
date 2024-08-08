'use client'

import React, { forwardRef } from 'react'

import { AlertModal } from '@/components/shared/modal'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteArchive } from '@/entities/archives/hooks'

interface ArchiveDeleteButtonProps {
  archiveId: number
}

export const ArchiveDeleteButton = forwardRef<
  HTMLButtonElement,
  ArchiveDeleteButtonProps
>(({ archiveId }, ref) => {
  const { mutate, isPending } = useDeleteArchive()

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isPending) {
      return
    }
    mutate(archiveId)
  }

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
        <AlertModal
          onClick={handleDelete}
          title="카드를 삭제하시겠어요?"
          desc="삭제한 카드는 복구할 수 없어요."
          action="삭제하기"
        />
      </AlertDialog>
    </div>
  )
})

ArchiveDeleteButton.displayName = 'DeleteArchiveButton'
