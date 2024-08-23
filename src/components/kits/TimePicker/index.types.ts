import { FC } from "react";

export interface ITimePickerProps {
  control: any;
  name: string;
  label: string;
  disabled?: boolean;
}

export type TTimePicker = FC<ITimePickerProps>;
