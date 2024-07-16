import { FC } from "react";
import { ITherapist } from "../../types/therapist.modal";

interface ILoginTherapistProps {}

export type TTherapistFC = FC<ILoginTherapistProps>;

export interface IState {
  openCreateDialog: boolean;
  openDeleteDialog: ITherapist | undefined;
  openEditDialog: ITherapist | undefined;
  openFilterDialog: boolean;
  openDetailDialog: ITherapist | undefined;
  openChartReserveDetail: ITherapist | undefined;
  openChangePasswordDialog: ITherapist | undefined;
}



export enum Actions {
  CREATE = "Create",
  EDIT = "Edit",
  DELETE = "Delete",
  CHART = "Chart",
  DETAIL = "Detail",
  FILTER = "Filter",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}
