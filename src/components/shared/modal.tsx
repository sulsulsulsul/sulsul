'use client';

import React from 'react';
import Image from 'next/image';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import alert from '/public/images/icons/alert.svg';

interface AlertModalProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  desc: string;
  action: string;
  className?: string;
}

export const AlertModal = ({
  onClick,
  title,
  desc,
  action,
  className,
}: AlertModalProps) => {
  return (
    <AlertDialogContent className={className}>
      <AlertDialogHeader className="items-center">
        <Image src={alert} alt="경고아이콘" />
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription
          className="text-center"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </AlertDialogHeader>
      <AlertDialogFooter className="justify-center">
        <AlertDialogCancel className="grow">취소하기</AlertDialogCancel>
        <AlertDialogAction
          onClick={onClick}
          className="grow bg-blue-500 text-white"
        >
          {action}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
