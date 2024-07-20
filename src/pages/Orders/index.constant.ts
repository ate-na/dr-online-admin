import { IColumns } from "../../components/kits/Table/index.types";
import { ActionApp } from "../../types/base.modal";
import { IOrderEntity } from "../../types/order.modal";
import { orderStatusTranslate } from "../../utils/getEnumTransformer";
import { IState } from "./index.types";

export const OrderColumns: IColumns[] = [
  { name: "سریال رزور", label: "id" },
  {
    name: "بیمار",
    label: "paitent",
    transform(data) {
      return `${data.patient.firstName} ${data.patient.lastName}`;
    },
  },
  {
    name: "پزشک",
    label: "therapist",
    transform(data) {
      return `${data.therapist.firstName} ${data.therapist.lastName}`;
    },
  },
  {
    name: "بازه زمانی",
    label: "startHour",
    transform(data) {
      return `${data.startHour}-${data.endHour}`;
    },
  },
  { name: "تاریخ", label: "date" },
  {
    name: "وضعیت",
    label: "status",
    transform(data) {
      return orderStatusTranslate(data.status);
    },
  },
];

export const intialState = {
  openFilterDialog: false,
  openDoneDialog: undefined,
  openCancelDialog: undefined,
  openHealthFileDialog: undefined,
  openCreateDialog: false,
};

export enum Actions {
  CANCEL = "Cancel",
  DONE = "Done",
  HEALTHFILE = "HealthFile",
  FILTER = "Filter",
  CREATE = "Create",
}

export const reducer = (
  state: IState,
  action: ActionApp<Actions, IOrderEntity>
) => {
  switch (action.type) {
    case Actions.CANCEL:
      return { ...state, openCancelDialog: action?.payload as IOrderEntity };
    case Actions.DONE:
      return { ...state, openDoneDialog: action?.payload as IOrderEntity };
    case Actions.FILTER:
      return { ...state, openFilterDialog: action?.payload as boolean };
    case Actions.HEALTHFILE:
      return {
        ...state,
        openHealthFileDialog: action?.payload as IOrderEntity,
      };
    case Actions.CREATE:
      return {
        ...state,
        openCreateDialog: action?.payload as boolean,
      };
    default:
      return { ...state };
  }
};
