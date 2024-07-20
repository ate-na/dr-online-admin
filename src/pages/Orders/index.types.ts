import { FC } from "react";
import { IOrderEntity } from "../../types/order.modal";

interface IOrders {}

export type TOrders = FC<IOrders>;

export interface IState {
  openFilterDialog: boolean;
  openDoneDialog: IOrderEntity | undefined;
  openCancelDialog: IOrderEntity | undefined;
  openHealthFileDialog: IOrderEntity | undefined;
  openCreateDialog: boolean;
}
