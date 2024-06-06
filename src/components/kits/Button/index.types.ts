import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export type TButtonSize = "large" | "small" | "medium";

export type TButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "inherit";

export type TButtonVariant = "contained" | "outlined" | "text";

export interface IButtonProps extends PropsWithChildren {
  fullWidth?: boolean;
  color?: TButtonColor;
  variant?: TButtonVariant;
  size?: TButtonSize;
  loading?: boolean;
  loadingText?: string;
  loadingSpinnerSize?: string | number;
}

export type TButton = FC<IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>;
