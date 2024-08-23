import { FC } from "react";

interface ISelectItems {
  value: number | string | boolean;
  label: string;
}
interface ISelectProps {
  items: ISelectItems[];
  selectLabel: string;
  helperText?: string;
  name: string;
  control: any;
  disabled?: boolean;
  defaultValue?: any;
  multiple?: boolean;
}
export type TSelect = FC<ISelectProps>;
