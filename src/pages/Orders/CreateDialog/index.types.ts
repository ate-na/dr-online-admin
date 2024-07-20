import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { createFormValidation } from "./index.constant";

export interface ICreateOrder extends IModalProps {}

export type TCreateOrder = FC<ICreateOrder>;

export type TCreateOrderForm = Zod.infer<typeof createFormValidation>;
