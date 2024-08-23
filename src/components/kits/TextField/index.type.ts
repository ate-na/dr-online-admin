import { FC } from "react";

interface ITextFieldProps {
  label: string;
  helperText: string;
  icon?: React.ReactNode;
  name: string;
  control: any;
  rows?: number;
  multiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}

export type TTextFieldFC = FC<ITextFieldProps>;
