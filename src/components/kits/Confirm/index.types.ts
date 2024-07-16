import { FC } from "react";

interface IConfirmProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  agreeTitle: string;
  cancelTitle: string;
  agreeHandler: () => void;
  cancelHandler: () => void;
  loading?: boolean;
  description?: string;
}

export type TConfirm = FC<IConfirmProps>;
