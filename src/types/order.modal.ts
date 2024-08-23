import { IBaseEntity, IDatasourcePageRes } from "./base.modal";
import { IPatient } from "./patient.modal";
import { ITherapist, ITherapistScheduleType } from "./therapist.modal";

export enum OrderStatus {
  Done = "Done",
  Cancel = "Cancel",
  Pending = "Pending",
}

export interface IOrderEntity extends IBaseEntity {
  city: string;
  day: number;
  address: string;
  date: string;
  room: number;
  categories: { enName: string; faName: string }[];
  type: ITherapistScheduleType;
  startHour: string;
  endHour: string;
  status: OrderStatus;
  documentation: any;
  patient: IPatient;
  therapist: ITherapist;
}

export type TOrderPage = IDatasourcePageRes<IOrderEntity>;

export interface ICreateOrder {
  patient: number;
  therapist: number;
  categories: number[];
  date: string;
  day: number;
  endHour: string;
  location: number;
  room: number;
  startHour: string;
  time: string;
  type: string;
}

export interface IUpdateStatus {
  status: OrderStatus;
  id: number;
}
