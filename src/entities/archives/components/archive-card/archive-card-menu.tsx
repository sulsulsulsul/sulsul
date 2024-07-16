'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { forwardRef } from 'react'
import { ArchiveDeleteButton } from './archive-delete-button'
interface ArchiveCardMenuProps extends DropdownMenuProps {
  archiveId: number
}

export const ArchiveCardMenu = forwardRef<
  HTMLButtonElement,
  ArchiveCardMenuProps
>(({ archiveId, ...props }: ArchiveCardMenuProps, ref) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger data-testid="archive-card-menu-trigger" ref={ref}>
        <Image
          className="cursor-pointer"
          width={24}
          height={24}
          color="white"
          src={'/images/icons/icn-more.svg'}
          alt="more icon"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        <DropdownMenuItem className="text-red-500" asChild>
          <ArchiveDeleteButton
            data-testid="archive-delete-button"
            archiveId={archiveId}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ArchiveCardMenu.displayName = 'ArchiveCardMenu'
