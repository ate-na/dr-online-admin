import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";

export interface IReserveChart extends IModalProps {
  therapistId: number;
}

export type TReserveChart = FC<IReserveChart>;
