'use client'

import React, { forwardRef } from 'react'

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
} from '@/components/ui/alert-dialog'
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
            className="w-full rounded-sm py-1 text-xs font-semibold text-red-500 hover:text-red-700"
            disabled={isPending}
          >
            삭제하기
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 데이터는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
})

ArchiveDeleteButton.displayName = 'DeleteArchiveButton'
