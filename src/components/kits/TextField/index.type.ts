import { FC } from "react";

interface ITextFieldProps {
  label: string;
  helperText: string;
  icon: React.ReactNode;
  name: string;
  control: any;
}

export type TTextFieldFC = FC<ITextFieldProps>;
