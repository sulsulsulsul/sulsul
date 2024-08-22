import { HTMLAttributes } from 'react';

export interface DialogListProp {
  dialogContents: MessageProp[][];
  visible?: boolean;
  iconMessage?: string;
  id: string;
  messageNumber?: number;
  hidden?: boolean;
  firstDialog?: boolean;
}

export interface OnBoardProp {
  messageListProp: DialogListProp[];
  buttonText: string;
  messageListProp: DialogListProp[];
  buttonText: string;
}
export interface MessageProp extends HTMLAttributes<HTMLDivElement> {
  message: string;
  message: string;
}
