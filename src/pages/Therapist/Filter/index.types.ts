import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { therapistFilterValidation } from "./index.constant";
import zod from 'zod'

export interface IFilterTherapist extends IModalProps {}

export type TFilterTherapist = FC<IFilterTherapist>;

export type TFilterFormValidation = zod.infer<typeof therapistFilterValidation>;
