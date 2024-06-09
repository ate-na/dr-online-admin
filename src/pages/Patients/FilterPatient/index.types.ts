import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { IPatient } from "../../../types/patient.modal";

export interface IFilterPatient extends IModalProps {}

export type TFilterPatient = FC<IFilterPatient>;

export type TFilterPatientFormValidation = Partial<
  Omit<IPatient, "password" | "id">
>;
