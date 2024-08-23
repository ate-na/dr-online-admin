import { IBaseEntity, IDatasourcePageRes } from "./base.modal";
import { IPatient } from "./patient.modal";

export enum TicketStatus {
    Open = "Open",
    Close = "Close",
    Report = "Report",
}

export interface ITicket extends IBaseEntity {
  attachments: string[];
  content: string;
  answer?: string;
  answerAt?: Date;
  status: TicketStatus;
  createdAt: Date;
  closeAt: Date;
  title: string;
  patient: IPatient;
  parent?: ITicket;
  childrens?: ITicket[];
}


export type TTicketPage=IDatasourcePageRes<ITicket>