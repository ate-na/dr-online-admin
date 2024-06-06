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
}

export type TTextFieldFC = FC<ITextFieldProps>;
