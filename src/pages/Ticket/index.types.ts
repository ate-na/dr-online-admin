import { FC } from "react";
import { ITicket } from "../../types/ticket.modal";

export interface ITicketProps {}

export type TTicket = FC<ITicketProps>;

export interface IState {
  openDeleteDialog?: ITicket | undefined;
  closeTicket?: ITicket | undefined;
  showTicket?: TTicket | undefined;
}

export enum Actions {
  DELETE = "DELETE",
  SHOW = "SHOW",
  CLOSE = "CLOSE",
}
