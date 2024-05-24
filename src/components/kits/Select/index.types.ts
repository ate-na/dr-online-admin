import { FC } from "react";

interface ISelectItems {
  value: number | string;
  label: string;
}
interface ISelectProps {
  items: ISelectItems[];
  selectLabel: string;
  helperText?: string;
  name: string;
  control: any;
}
export type TSelect = FC<ISelectProps>;
