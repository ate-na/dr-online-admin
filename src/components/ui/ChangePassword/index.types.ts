import { FC } from "react";
import { ICreateOrEditProps } from "../../../types/base.modal";
import { z } from "zod";
import { changePasswordFormValidaion } from "./index.contant";

export interface IChangePasswordDialog extends ICreateOrEditProps<any> {}

export type TChangePasswordDialog = FC<IChangePasswordDialog>;

export interface IChangePasswordData {
  currentPassword: string;
  password: string;
  id?: string;
}
export type TCreateOrEditFormValidation = z.infer<
  typeof changePasswordFormValidaion
>;
