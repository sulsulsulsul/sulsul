import { HTMLAttributes } from 'react';

export interface DialogListProp {
  dialogContents: MessageProp[][];
  hidden?: boolean;
  iconMessage?: string;
  id: string;
  firstDialog?: boolean;
}

export interface OnBoardProp {
  messageListProp: DialogListProp[];
  buttonText: string;
}
export interface MessageProp extends HTMLAttributes<HTMLDivElement> {
  message: string;
}
