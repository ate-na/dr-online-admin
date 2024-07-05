import { FC, PropsWithChildren } from "react";

interface IModal extends PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  title: string;
  flexDirection?: any;
  justifyContent?: string;
  alignItems?: string;
  bgcolor?: string;
}

export type TModal = FC<IModal>;
