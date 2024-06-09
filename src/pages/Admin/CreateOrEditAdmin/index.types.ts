import { FC } from "react";
import { IAdmin } from "../../../types/admin.modal";
import { ICreateOrEditProps } from "../../../types/base.modal";
import { z } from "zod";
import { adminFormValidation } from "../index.constants";

interface ICreateOrEditAdminProps extends ICreateOrEditProps<IAdmin> {}

export type TCreateOrEditAdmin = FC<ICreateOrEditAdminProps>;

export type TCreateOrEditFormValidation = z.infer<typeof adminFormValidation>;
