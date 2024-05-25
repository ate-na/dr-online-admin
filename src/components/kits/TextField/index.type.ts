import { FC } from "react";

interface ITextFieldProps {
  label: string;
  helperText: string;
  icon?: React.ReactNode;
  name: string;
  control: any;
  rows?: number;
  multiline?: boolean;
}

export type TTextFieldFC = FC<ITextFieldProps>;
