import { FC } from "react";

interface IConfirmProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  agreeTitle: string;
  cancelTitle: string;
  agreeHandler: () => void;
  cancelHandler: () => void;
}

export type TConfirm = FC<IConfirmProps>;
