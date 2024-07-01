import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { therapistFilterValidation } from "./index.constant";

export interface IFilterTherapist extends IModalProps {}

export type TFilterTherapist = FC<IFilterTherapist>;

export type TFilterFormValidation = Zod.infer<typeof therapistFilterValidation>;
