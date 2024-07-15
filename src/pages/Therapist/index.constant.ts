import { IColumns } from "../../components/kits/Table/index.types";
import { EGender, ITherapist } from "../../types/therapist.modal";
import { ActionApp, Actions, IState } from "./index.types";

export const TherapistColumns: IColumns[] = [
  { label: "id", name: "سریال پزشک" },
  {
    label: "name",
    name: "نام و نام خانوادگی",
    transform: (data) => {
      return data.firstName + "" + data.lastName;
    },
  },
  { label: "phone", name: "شماره تماس 1" },
  { label: "phone2", name: "شماره تماس 2" },
  {
    label: "gender",
    name: "جنسیت",
    transform: (data: ITherapist) => {
      return data.gender === EGender.male
        ? "مرد"
        : data.gender === EGender.female
        ? "زن"
        : "نامشخص";
    },
  },
];

export const intialState = {
  openCreateDialog: false,
  openDeleteDialog: undefined,
  openEditDialog: undefined,
  openFilterDialog: false,
  openDetailDialog: undefined,
  openChartReserveDetail: undefined,
  openChangePasswordDialog: undefined,
};

export const reducer = (state: IState, action: ActionApp): IState => {
  switch (action.type) {
    case Actions.CHART:
      return {
        ...state,
        openChartReserveDetail: action?.payload as ITherapist,
      };
    case Actions.DETAIL:
      console.log("called", {
        ...state,
        openDetailDialog: action?.payload as ITherapist,
      });
      return { ...state, openDetailDialog: action?.payload as ITherapist };
    case Actions.CREATE:
      return { ...state, openCreateDialog: action?.payload as boolean };
    case Actions.EDIT:
      return { ...state, openEditDialog: action?.payload as ITherapist };
    case Actions.DELETE:
      return { ...state, openDeleteDialog: action?.payload as ITherapist };
    case Actions.FILTER:
      return { ...state, openFilterDialog: action?.payload as boolean };
    case Actions.CHANGE_PASSWORD:
      return {
        ...state,
        openChangePasswordDialog: action?.payload as ITherapist,
      };
    default:
      return { ...state };
  }
};
