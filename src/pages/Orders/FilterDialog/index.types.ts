import { FC } from "react";
import { z } from "zod";
import { filterFormValidation } from "./index.contant";
import { IModalProps } from "../../../types/base.modal";
export interface IFilterDialog extends IModalProps {}

export type TFilerDialog = FC<IFilterDialog>;

export type TFilterForm = z.infer<typeof filterFormValidation>;
