import { FC } from "react";
import { IModalProps } from "../../../types/base.modal";
import { IAdmin } from "../../../types/admin.modal";

export interface IFilterAdmin extends IModalProps {}

export type TFilterAdmin = FC<IFilterAdmin>;

export type TFilterAdminFormValidation = Partial<
  Omit<IAdmin, "password" | "id">
>;
